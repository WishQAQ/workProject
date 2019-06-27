/**
 * 交接班弹框
 * Created by wx 2018.01.25
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {signatureModalService} from 'service/hand-over/shift/change-shifts/signature-modal'

export interface ChangeShiftsModalState{
    modalVisible?:boolean,// 控制弹框是否显示

}
class ChangeShiftsModalService extends BaseService<ChangeShiftsModalState>{
    /**
     * table api
     * @type {null}
     */
    tableApi ?:any

    defaultState={
        modalVisible:false,
    }
    /**
     * 页面加载执行
     */
    serviceWillMount() {
       // console
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }
    /**
     * 弹框关闭事件
     */
    modalClose = ()=>{
        this.dispatch({
            modalVisible:false
        })
    }
    /**
     * 弹框打开事件
     * @param {object} data 打开弹框所要展示的数据
     */
    openModal = (data?:object)=>{
        this.dispatch2({
            modalVisible:true
        })
    }
    /**
     * 渲染表格
     * @param params {}
     */
    onGridReady = (params)=>{
        // let {tableRowData} = this.state
        this.tableApi = params.api
        this.tableApi.sizeColumnsToFit()
        // params.api.setRowData(tableRowData)
    }
    /**
     * 交接按钮事件
     */
    shiftBtn=()=>{
        // 打开签名弹框
        signatureModalService.openModal()
    }

}
export const changeShiftsModalService = new ChangeShiftsModalService('ChangeShiftsModal')