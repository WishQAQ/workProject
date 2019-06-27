/**
 * 用血history-table
 * Created by wx 2018.01.17
 */
import {BaseService} from 'tools/flux/BaseService'
import {ApiPatManageBlood,ArrayData} from 'pkg/api'
import {BloodApplyEntityPatManageBlood} from 'pkg/entity'
import {patientBasicService} from '../../patient-basic'
import {informationService} from '../information'
import {boolTableService} from '../table'
import {message} from 'pkg/common/message'

export interface HistoryTableState {
    historyTableData?: ArrayData<BloodApplyEntityPatManageBlood>,// 表格内容数据
    rowData?: BloodApplyEntityPatManageBlood,// 左点击的一行数据
}
class HistoryTableService extends BaseService<HistoryTableState> {
     tableApi ?:any
    defaultState = {
        historyTableData: <ArrayData<BloodApplyEntityPatManageBlood>><any>[],
        rowData: null
    }

  /**
   * 页面加载执行
   */
  serviceWillMount() {
    // 页面数据加载
    this.getHistoryTableData()
  }

  /**
   * 请求历史记录并更新表格数据
   */
  getHistoryTableData=()=>{
    ApiPatManageBlood.loadBloodApply(patientBasicService.state.model.pvId).then((data)=>{
      this.dispatch({
        historyTableData:data
      })
      // console.log(data)
      this.tableApi.api.setRowData(data)
    })
  }

  /**
   * 表格api
   * @param parms
   */
  onGridReady = (params) => {
    this.tableApi = params
  }
  /**
   * 左点击事件
   * @param v
   */
  onRowClicked = (v)=>{
    // 设置基本信息表格数据
    informationService.setInformationData(v.data)
    // 设置血液表格数据
    boolTableService.loadBloodCapacity(v.data.appNo)
  }
  /**
   * 右键点击事件
   * @param menuIndex 右键菜单点击下标
   * @param dataIndex 右键点击对应表格的行数据下标
   */
  menuClik = (menuIndex, dataIndex)=>{
    let {historyTableData} = this.state
    if(historyTableData[dataIndex].status === '3'){
      message.tip('已作废，不能再次作废')
    } else {
      message.linkAge('确定要作废?', null, '确认', '取消', ()=> this.delete(historyTableData[dataIndex].appNo))
    }
  }
  delete = (appNo)=>{
    ApiPatManageBlood.cancel(appNo).then((data)=>{
      this.getHistoryTableData()
    })
  }
}

export const historyTableService = new HistoryTableService('historyTable')