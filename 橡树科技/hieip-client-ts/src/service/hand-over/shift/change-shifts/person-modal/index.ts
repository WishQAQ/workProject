/**
 * 个人交接记录弹框
 * Created by wx 2018.02.01
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {signatureModalService} from 'service/hand-over/shift/change-shifts/signature-modal'

export interface PersonModalState{
    modalVisible?:boolean,// 控制弹框是否显示

}
class PersonModalService extends BaseService<PersonModalState>{
    /**
     * table api
     * @type {null}
     */
    tableApi?:any

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
        this.dispatch({
            modalVisible:true
        })
    }
    /**
     * 渲染表格
     * @param params {}
     */
    onGridReady = (params)=>{
        this.tableApi = params.api
    }
    /**
     * 根据是否交接设置每行显示颜色
     * @param params 数据
     * @param style 样式
     * @returns {any}
     */
    setRowClass = (params, style) => {
        let style1
        style1 = `${style.agCommonCell}`
        if (params.data.status === '未交班') style1 = `${style.agRedCell}`
        return style1
    }

    /**
     * 交接按钮事件
     */
    shiftBtn=()=>{
        // 打开签名弹框
        signatureModalService.openModal()
    }

}
export const personModalService = new PersonModalService('personModalService')