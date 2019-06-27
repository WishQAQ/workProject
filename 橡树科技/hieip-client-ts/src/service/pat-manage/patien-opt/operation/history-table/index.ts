import {BaseService} from 'tools/flux/BaseService'
import {ApiPatManageOperation} from 'pkg/api'
import {OperationModelEntityPatManageOperation} from 'pkg/entity'
import {message} from 'pkg/common/message'
import {patientBasicService} from 'service/pat-manage/patien-opt/patient-basic'
import {informationService} from 'service/pat-manage/patien-opt/operation/information'
import {tableService} from 'service/pat-manage/patien-opt/operation/table'

export interface HistoryTableState {
    /**
     * 历史记录数据
     */
    rowData?: Array<OperationModelEntityPatManageOperation>,
    /**
     * 患者信息id
     */
    pvId?: number,
    /**
     * 被选择行
     */
    selectedRow?: OperationModelEntityPatManageOperation,
}

class HistoryTableService extends BaseService<HistoryTableState> {

    agApi?: any // AG列表的api

    defaultState = {
        agApi: null,
        rowData: [],
        pvId: patientBasicService.state.model.pvId,
        selectedRow: null
    }

    serviceWillMount() {
        this.onlordHistory()
    }

    /**
     * 表格重新加载时，加载表格agApi
     *
     */
    onGridReady = (params) => {
        this.agApi = params
        params.api.sizeColumnsToFit()
    }

    /**
     * 加载历史记录
     *
     */
    onlordHistory = () => {
        let pvId = this.getState().pvId
        ApiPatManageOperation.loadOperationRec(pvId).then((data) => {
            this.dispatch2({
                rowData: data
            })
        }).catch(err => {
            message.tip(err || '加载历史记录失败!', 'warning')
        })
    }

    /**
     * 获取选择行
     *
     */
    getSelectRows = () => {
        let selectedRow = this.agApi.api.getSelectedRows()
        this.dispatch2({
            selectedRow: selectedRow
        })
    }

    /**
     * 右键表格事件
     *
     */
    rightClick = (menuIndex?: number, dataIndex?: number) => {
        if (menuIndex === 0) {
            this.cancel(dataIndex)
        }
    }

    /**
     * 作废
     * @param rowIndex
     */
    cancel = (rowIndex) => {
        const {pvId, rowData} = this.state
        let appNo = rowData[rowIndex].appNo
        ApiPatManageOperation.cancel(pvId, appNo).then((data) => {
            message.tip(data || '作废成功!', 'success')
            this.onlordHistory()
        }).catch(err => {
            message.tip(err || '作废失败!', 'warning')
        })
    }

    /**
     * 加载数据
     * @param appNo
     */
    loadingData = (appNo) => {
        let pvid = this.state.pvId
        ApiPatManageOperation.loadOperationSchedule(pvid, appNo).then((data) => {
            informationService.loadSubmitData(data[0])
        }).catch((meg) => {
            message.tip(meg || '未查询到相关数据', 'warning')
        })
        ApiPatManageOperation.loadScheduledOperationName(pvid, appNo).then((data) => {
            tableService.loadAgTableData(data)
        }).catch((meg) => {
            message.tip(meg || '未查询到相关数据', 'warning')
        })
    }

    /**
     * 左键单击加载数据
     * @param event
     */
    leftLoad = (event) => {
        this.loadingData(this.state.rowData[event.rowIndex].appNo)
        tableService.openButton(true)
    }

}

export const historyTableService = new HistoryTableService('historyTable')