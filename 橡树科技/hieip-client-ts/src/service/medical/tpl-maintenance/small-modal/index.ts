/**
 * 创建人:谢小慧
 * 创建时间: 2018-1-9
 * 内容: 小模板编辑
 */
import { BaseService } from '../../../../tools/flux/BaseService'
import { MrTempletSmallIndexModelDtoTemplate, SynchronousElementDictEntityDataSet } from '../../../../packages/entity/medical'
import { message } from '../../../../packages/common/message'
import { ApiDictInput, ApiTemplateMrIndex, ApiTemplateMrTempletSmallIndex } from '../../../../packages/api/medical'
import { JsonUtil } from '../../../../tools/api/JsonUtil'
import { tplMaintenanceContentService } from '../tpl-maintenance-content'

export interface SmallModalState {
    /** 是否显示 */
    smallModalVisible?: boolean
    /** 小模板数据 */
    data?: MrTempletSmallIndexModelDtoTemplate
    /** 数据集option 数据 */
    bdDsOptionList?: any[]
    /** 动态值集合 */
    synchronousElementList?: SynchronousElementDictEntityDataSet[],
    /** 数据集data 数据 */
    bdDsDataList?: any[],
    /** 数据集total 数据 */
    dataTotal?: number
}

class SmallModalService extends BaseService<SmallModalState> {
    defaultState = {
        smallModalVisible: false,
        dataTotal: 0,
        data: <MrTempletSmallIndexModelDtoTemplate>{}
    }
    /**
     * 设置值
     * @param data
     */
    setData = (data) => {
        this.dispatch2({ data: data, smallModalVisible: true })
        // 查询数据集字典
        ApiDictInput.loadColumns('SJJ').then(data => {
            this.dispatch({ bdDsOptionList: data })
        }).catch(msg => message.error(msg || '数据集字典查询失败'))
        // 获取所有的动态值
        ApiTemplateMrIndex.getSynchronousElementDict().then(data => {
            this.dispatch({ synchronousElementList: data })
        }).catch(msg => message.error(msg || '动态值加载失败'))
    }
    /**
     * 变量设置值
     * @param name
     * @param value
     */
    onDataValueChange = (name, value) => {
        this.dispatch2(JsonUtil.json(name, this.state, value))
    }
    /**
     * 取消操作
     */
    onModalCancel = () => {
        this.dispatch({ smallModalVisible: false })
    }
    /**
     * 保存数据
     */
    onModalOk = () => {
        let { data } = this.state
        if (!data.mrName && data.mrName.trim().length < 1) {
            message.error('模块名称不能为空')
            return
        }
        ApiTemplateMrTempletSmallIndex.SaveMrTempletSmallIndex(data).then(data => {
            message.success('小模板保存成功')
            this.dispatch({ smallModalVisible: false })
            tplMaintenanceContentService.reloadData()
        }).catch(msg => message.error(msg || '小模板保存失败'))
    }
    /**
     * 数据集下拉框模糊查询
     * @param e
     * @constructor
     */
    InputTableCallBack = (e) => {
        if (e.type === 'enterEvent') {// 选中数据
            // 设置data 的数据集id
            this.dispatch2(JsonUtil.json('data.dsCode', this.state, e.data.id))
        } else { // pageEvent
            ApiDictInput.loadData({ pageSize: e.pageSize, startIndex: e.pageCurrent }, 'SJJ', e.value).then(data => {
                let _data = this.state.data
                _data.dsName = e.value
                this.dispatch2({ 'bdDsDataList': data, 'dataTotal': data.total, data: _data })
            }).catch(msg => message.error(msg || '查询数据失败'))
        }
    }
}

export const smallModalService = new SmallModalService('smallModal')