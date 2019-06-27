/**
 * Created by oakm on 2017/12/26.
 */
'use strict'
import {BaseService} from 'tools/flux/BaseService'
import {Page,MrPatientFileEditApplyModelDtoPatient} from 'pkg/entity/medical'
import {message} from 'pkg/common/message'
import {ApiPatientMrFileEditApply} from 'pkg/api/medical'
export interface MaintainFileState {
    /* 分页 */
    page?:Page
    /* 科室 */
    deptCode?: string
    /* 患者标识 */
    patientId?: string
    /* 住院标识 */
    visitId?: number
    /* 分类code */
    mrClass?: string
    /* 默认患者病历 */
    mrPatientFile?:MrPatientFileEditApplyModelDtoPatient[]
    /* 患者病历数量 */
    mrPatientFileLenght?:number
    /* 是否关闭弹框 */
    visible?:boolean
}
class MaintainFileService extends BaseService<MaintainFileState> {

    applyApi:any

    defaultState = {
        visible:false,
        page:{pageSize: 30, startIndex: 1}
    }

    serviceWillMount(){
        this.reset()
    }
    /**
     * 从病历列表中获取数据
     */
    patient=(id?:string ,visit?:number,dept?:string,classs?:string,visibles?:boolean)=>{
        this.dispatch({patientId:id,visitId:visit,deptCode:dept,mrClass:classs,visible:visibles})
    }
    /**
     * 申请
     */
    findShen = () => {
        return ApiPatientMrFileEditApply.FindByPage().then(data => {
            this.dispatch2({mrPatientFile: data,mrPatientFileLenght:data.total})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 分页
     */
    onGridReady = (parms) => {
        let {page} = this.state
        // 将table赋值给agApi，通过agApi动态为table赋值
        this.applyApi = parms
        /** 获取当前表格能显示多少行 */
        page.pageSize = parms.api.paginationGetPageSize()
        this.dispatch2({page:page})
        this.findShen()
    }

    /**
     * 点击分页执行
     */
    onShowSize = (clickPage) => {
        let {page} = this.state
        page.startIndex = page.pageSize * (clickPage - 1)
        if (clickPage === 1){
            page.startIndex = 1
        }
        this.dispatch2({page:page})
        this.findShen()
    }
    /**
     * 选中一行的事件
     */
    templateIndexOpt=(params)=>{
        this.dispatch({})
    }
    /**
     * 值改变调用的方法
     */
    onchange=(name,e)=>{
        this.dispatch({[name]:e})

    }
    /**
     * 点击查询的方法
     */
    onClick=()=>{
        let {page} = this.state
        page.startIndex=1
        this.dispatch({page:page})
    }
    /**
     * 点击取消的方法
     */
    cancel=()=>{
        this.dispatch({visible:false})
    }
}

export const maintainFileServiceService = new MaintainFileService('maintainFile')