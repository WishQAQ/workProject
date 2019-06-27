import {BaseService} from '../../../../tools/flux/BaseService/index'
import {ApiDataSetBdCvIndex} from '../../../../packages/api/medical'
import {BdCvItemsEntityDataSet, BdCvVersionsModelDtoDataSet} from '../../../../packages/entity/medical'
import {message} from '../../../../packages/common/message/index'
import {dataListService} from '../data-list/index'

/**
 * 值域数据项管理Service
 */
export interface DataItemState {
    /*值域数据项管理*/
    bdCvItems?: Array<BdCvItemsEntityDataSet>,
    /*单个值域数据项*/
    bdCvItem?: BdCvItemsEntityDataSet,
    /*仅用于添加数据项管理*/
    bdCvItemAdd?: BdCvItemsEntityDataSet,
    /*为后台提供值域数据项集合的模型*/
    bdCvVersionsModel?: BdCvVersionsModelDtoDataSet,
    /*值域是否有更新，为false时不允许更新*/
    isUpdate?: boolean,
    /*值域数据项下标*/
    itemIndex?: number
}

class DataItemService extends BaseService<DataItemState> {
    rangeItemagApi: any
    /**
     * 页面初始化时的默认值，当state更新是会被替换
     */
    defaultState = {
        /*值域数据项管理*/
        bdCvItems: [],
        isUpdate: false
    }

    serviceWillMount() {
        this.reset()
    }

    /*
     * 为属性赋值预加载
     */
    assignment = (bdCvItems) => {
        this.dispatch({bdCvItems: null})
        this.dispatch({bdCvItems: bdCvItems})
        this.rangeItemagApi.api.setRowData(bdCvItems)
    }
    /*
     * 分页
     */
    onGridReady = (parm) => {
        this.rangeItemagApi = parm
    }

    /*
     * 清空值域的值
     */
    delete = () => {
        this.dispatch2({bdCvItems: []})
    }
    /*
    * 添加一行
    */
    newUpdate = () => {
        const {bdCvItems} = this.state
        const {bdCvIndex} = dataListService.state
        if (!bdCvIndex) {
            message.tip('请选择相应的值域项', 'warning', 'center')
            return
        }
        // 获取默认选项值
        let maxNumber = 0
        bdCvItems.forEach((val) => {
            if (Number(val.cvValue) > maxNumber) {
                maxNumber = Number(val.cvValue)
            }
        })
        let _maxNumber = maxNumber > 0 && maxNumber < 10 ? '0' + (maxNumber + 1) : (maxNumber + 1)
        bdCvItems.push(<BdCvItemsEntityDataSet>{
            cvValue: _maxNumber, // 值
            cvId: bdCvIndex && bdCvIndex.id
        })
        this.rangeItemagApi.api.setRowData(bdCvItems)
        // 聚焦到新增的那行的第一个元素
        this.rangeItemagApi.api.startEditingCell({
            rowIndex: bdCvItems.length - 1,
            colKey: 'cvValue'
        })
        setTimeout(() => {
            this.rangeItemagApi.api.startEditingCell({
                rowIndex: bdCvItems.length - 1,
                colKey: 'cvValue'
            })
        }, 100)
        this.dispatch({bdCvItems: bdCvItems, isUpdate: true, bdCvItemAdd: null})
    }
    /*删除一行*/
    delUpdate = () => {
        this.dispatch({isUpdate: true})
        const {bdCvIndex} = dataListService.state
        if (!bdCvIndex || '{}' === JSON.stringify(bdCvIndex)) {
            message.tip('请选择相应的值域项', 'warning', 'center')
            return
        }
        const {bdCvItems, itemIndex} = this.state
        if (!(itemIndex + 1)) {
            message.tip('请选中对应的数据项', 'warning', 'center')
            return
        }
        bdCvItems.splice(itemIndex, 1)
        this.reset({bdCvItems: bdCvItems})
        this.rangeItemagApi.api.setRowData(this.state.bdCvItems)
    }
    /*点击行获取后台信息*/
    onClinkUpdate = (event) => {
        this.dispatch({isUpdate: true, itemIndex: event.rowIndex, bdCvItemAdd: event.data})
    }
    /**
     * 新建版本
     * @returns {Promise<any>} boolean
     */
    newVersion = () => {
        const {bdCvItems} = this.state
        const {bdCvIndex} = dataListService.state
        if (!bdCvIndex) {
            message.tip('请选择相应的值域项', 'warning', 'center')
            return
        }
        this.dispatch({
            bdCvVersionsModel: {
                bdCvItemsList: bdCvItems,
                cvId: bdCvIndex.id,
                cvVersion: bdCvIndex.cvVersion
            }
        })
        for (let i in bdCvItems) {
            if (bdCvItems.hasOwnProperty(i)) {
                if (!bdCvItems[i].cvValue || bdCvItems[i].cvValue === '') {
                    message.tip('值域项值不能为空', 'error', 'center')
                    return
                }
            }
        }
        return ApiDataSetBdCvIndex.newVersion(this.state.bdCvVersionsModel).then(() => {
            this.dispatch({isUpdate: false})
            message.tip('保存值域数据项成功', 'success', 'center')
            // dataListService.setRowData()
            dataListService.selectCvIndex(bdCvIndex.id, bdCvIndex.cvVersion + 1)
        }).catch(err => {
            message.tip(err.msg || '保存值域数据项失败', 'error', 'center')
        })
    }
}

export const dataItemService = new DataItemService('dataItem')