import {BaseService} from '../../../../tools/flux/BaseService/index'
import {ApiDataSetBdCvIndex} from '../../../../packages/api/medical'
import {BdCvItemsModelDtoDataSet} from '../../../../packages/entity/medical'
import {message} from '../../../../packages/common/message/index'
import {dataListService} from '../data-list/index'
import {dataItemService} from 'service/medical/data-range/data-item'

/**
 * 值域版本管理Service
 */
export interface DataVersionState {
    bdCvVersions?: Array<BdCvItemsModelDtoDataSet>,
    bdCvVersion?: BdCvItemsModelDtoDataSet,
    isPublishVersion?: boolean,
    isRelease?: boolean,
    rangeVersionIndex?: number,
}

class DataVersionService extends BaseService<DataVersionState> {
    rangeVersionagApi: any
    /**
     * 页面初始化时的默认值，当state更新是会被替换
     */
    defaultState = {
        /*值域版本管理*/
        bdCvVersions: [],
        bdCvVersion: {}
    }

    serviceWillMount() {
        this.reset()
    }

    /*为属性赋值预加载*/
    assignment = (bdCvVersions) => {
        this.dispatch({bdCvVersions: bdCvVersions})
        this.rangeVersionagApi.api.setRowData(bdCvVersions)
        let versions = []
        bdCvVersions.forEach((val) => {
            versions.push({
                name: val.cvVersion,
                id: val.cvVersion,
                indexCode: val.cvVersion
            })
        })
        dataListService.assignment(versions)
    }
    /**
     * 清空数据
     */
    delete = () => {
        this.dispatch2({bdCvVersions: []})
    }
    onGridReady = (parm) => {
        this.rangeVersionagApi = parm
    }
    /*获取值域版本某一行的数据和下标*/
    handlerRowClicked = (e) => {
        this.dispatch({rangeVersionIndex: e.rowIndex, bdCvVersion: e.data})
        const {bdCvVersion} = this.state
        const {bdCvIndex} = dataListService.state
        ApiDataSetBdCvIndex.selectBdCvItems(bdCvIndex.id, bdCvVersion.cvVersion).then(data => {
            dataItemService.assignment(data)
        }).catch(err => {
            message.tip(err || '数据查询失败', 'error', 'center')
        })
    }
    /**
     * 发布值域版本
     * @returns {Promise<any>} boolean
     */
    publishVersion = () => {
        let {bdCvVersion} = this.state
        let {bdCvIndex} = dataListService.state
        if (!bdCvIndex) {
            message.tip('请选择对应的值域项', 'warning', 'center')
            return
        }
        if (!bdCvVersion || bdCvVersion === null || '{}' === JSON.stringify(bdCvVersion)) {
            message.tip('请选中您要发布的版本！', 'warning', 'center')
            return
        }
        if (bdCvIndex.cvVersion === bdCvVersion.cvVersion) {
            message.tip('该值域版本已经发布，请重选', 'warning', 'center')
            return
        }
        return ApiDataSetBdCvIndex.publishVersion(bdCvIndex.id, bdCvVersion.cvVersion).then(() => {
            this.dispatch({isPublishVersion: true})
            dataListService.findAll()
            dataListService.listAssignment(bdCvVersion.cvVersion)
            this.dispatch2({bdCvVersion: {}})
            message.tip('发布值域版本成功', 'success', 'center')

        }).catch((err) => {
            message.tip(err || '发布值域版本失败', 'error', 'center')
        })
    }
}

export const dataVersionService = new DataVersionService('dataVersion')