import {BaseService} from 'tools/flux/BaseService'
import {QcMrMonitorItemsModelDtoMonitor} from 'pkg/entity/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {loginService} from 'service/user/login'
import {message} from 'pkg/common/message'
import {ApiMonitorQcMrItems, ArrayData} from 'pkg/api/medical'
import {qcMrMonitorItemsRightService} from '../quality-maintenance-right'

export interface QcMrMonitorItemsLeftState {
    /**
     * 模糊查询自动质控项目结果=>表格数据
     */
    modelList?: ArrayData<QcMrMonitorItemsModelDtoMonitor>
    /**
     * 表格数据当前选中行索引
     */
    modelListIndex?: number
    /**
     * 表格数据input框选中行
     */
    modelListSelectRow?: Array<any>
    /**
     * 查询条件=>搜索输入框
     */
    qcName?: string
}

/**
 * @author: bgq
 */
class QcMrMonitorItemsLeftService extends BaseService<QcMrMonitorItemsLeftState> {
    agApi?: any
    defaultState = {
        /**
         * 模糊查询自动质控项目结果=>表格数据
         */
        modelList: <ArrayData<QcMrMonitorItemsModelDtoMonitor>><any>[],
        /**
         * 表格数据当前选中行索引
         */
        modelListIndex: null,
        /**
         * 表格数据input框选中行
         */
        modelListSelectRow: []
    }

    /**
     * 初始化加载
     */
    serviceWillMount() {
        this.findQcMrMonitorItems()
    }

    /**
     * 模糊查询自动质控项目
     */
    findQcMrMonitorItems = () => {
        let hosId = JsonUtil.getJsonByKey('loginSession.hospitalConfig.hospitalCode', loginService.state)
        if (JsonUtil.isEmpty(hosId)) {
            message.tip('医院编码获取失败!')
            return
        }
        const {qcName} = this.state
        ApiMonitorQcMrItems.findQcMrMonitorItems(qcName, hosId).then(data => {
            this.dispatch2({modelList: data})
            let {modelListSelectRow} = this.state
            // // 新增项目,设置选中最后一行
            if (JsonUtil.isEmpty(modelListSelectRow))
                modelListSelectRow.push({rowIndex: data.length - 1})
            // this.agSelectRow(modelListSelectRow, true)
            this.agApi.api.setRowData(data)
            let dataLength = data.length - 1
            this.agApi.api.forEachNode(function (node) {
                let key = node.rowIndex
                if (key === dataLength) {
                    node.setSelected(true)
                }
            })
        }).catch(msg => message.tip(msg || '模糊查询自动质控项目失败!'))
    }
    /**
     * 删除自动质控项目
     */
    deleteQcMrMonitorItems = () => {
        const {modelListSelectRow} = this.state
        // 多选框为空时,取单选行值
        if (JsonUtil.isEmpty(modelListSelectRow)) {
            message.tip('请至少选择一行!')
            return
        } else {
            message.linkAge('您确定要删除吗?', null, '确定', '取消', this.delete)
        }
    }

    /**
     * 删除自动质控项目
     */
    delete = () => {
        const {modelListSelectRow} = this.state
        let list = []  // 定义一个新数组
        // 转换数据
        modelListSelectRow.forEach((model) => {
            list.push(JsonUtil.getJsonByKey('data.id', model))
        })
        ApiMonitorQcMrItems.deleteQcMrMonitorItems(list).then(data => {
            message.tip(data || '删除自动质控项目成功!', 'warning', 'center')
            this.findQcMrMonitorItems()
            qcMrMonitorItemsRightService.toAdd()
        }).catch(msg => message.tip(msg || '删除自动质控项目失败!', 'warning', 'center'))
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (data, path) => {
        if (path === 'modelListIndex') {
            qcMrMonitorItemsRightService.setStateJson2('model', data.data)
            qcMrMonitorItemsRightService.findByMonitorItemId(JsonUtil.getJsonByKey('data.id', data))
            data = data.rowIndex
        }
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }

    /**
     * 新增
     */
    toAdd = () => {
        this.agSelectRow([])
        qcMrMonitorItemsRightService.toAdd()
    }

    /**
     * 改变选择行
     * @param modelListSelectRow
     */
    agSelectRow = (modelListSelectRow) => {
        const {modelList} = this.state
        let selectRow = {}
        modelListSelectRow.forEach((model) => {
            selectRow[model.rowIndex] = true
        })
        this.agApi.api.forEachNode(function (node) {
            node.setSelected(false)
        })
        this.agApi.api.setRowData(modelList)
        this.dispatch2({modelListSelectRow: modelListSelectRow})
    }

    /**
     * 页面刷新
     * table api
     * @param params
     */
    onGridReady = (params) => {
        this.agApi = params
        this.agApi.api.sizeColumnsToFit()
    }
}

export const qcMrMonitorItemsLeftService = new QcMrMonitorItemsLeftService('qcMrMonitorItemsLeft')