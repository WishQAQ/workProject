import {BaseService} from 'tools/flux/BaseService'
import { Page, MrTemplateClassModelDtoTemplate,MrPatientFileIndexModelDtoPatient}
    from 'pkg/entity/medical'
import {message} from 'pkg/common/message'
import {ApiTemplateMrIndex,ApiTemplateMrClass,ApiDictInput,ApiPatientMrFileIndex}
    from 'pkg/api/medical'
// import {} from '../../../../../../packages/entity/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {MrTemplateIndexEntityTemplate} from 'pkg/entity/medical'
// import * as moment from 'moment'
// import _date = moment.unitOfTime._date
export interface ModifyFileState {
    /** input 模糊查询组件的表编码 */
    dictCode?: string
    /** 模糊查询组件的表编码 */
    dictCode1?:string
    /** input 模糊查询组件的分页 */
    inputPage?:Page
    /** input 模糊查询组件的 模糊查询值  */
    inputCode?: string
    /** input 模糊查询组件的数据长度 */
    inputLength?:number
    /**  */
    inputLength1?:number
    /** nput 模糊查询组件的数据 */
    inputDate?:any
    /** input 模糊查询组件的数据  */
    inputDate1?:any
    /** input 模糊查询组件的title  */
    inputTitle?:any[]
    /** input 模糊查询组件的title */
    inputTitle1?:any[]
    /** 异常信息 */
    errorMessage?:string
    /** 分类集合 */
    mrModle?:MrTemplateClassModelDtoTemplate[]
    /** 类型 */
    mrType?:string
    /** 修改弹框显示和隐藏状态 */
    visible?:boolean
    /** 模板索引对象 */
    mrTemplateModel?:MrTemplateIndexEntityTemplate
    /** 起草文书 */
    mrPatientsModle?:MrPatientFileIndexModelDtoPatient
}

class ModifyFileService extends BaseService<ModifyFileState> {
    defaultState = {
        dictCode:'YSZC',
        inputPage: {
            startIndex: 1,
            pageSize: 6
        },
        inputLength:0,
        dictCode1:'YHXX',
        inputPage1: {
            startIndex: 1,
            pageSize: 6
        },
        inputLength1:0,
        visible:false
    }
    serviceWillMount(){
        this.reset()
    }
    /**
     * 选中一行修改的数据
     */
    patient=(mrPatients?: MrPatientFileIndexModelDtoPatient,visibles?:boolean,type?:string)=>{
        ApiTemplateMrIndex.getMrTemplateIndexUpdateFlag(mrPatients.fileNo).then((data: any) => {
            this.dispatch2({visible:visibles,mrPatientsModle:mrPatients})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
        this.findMrTemplate()
    }

    /**
     * 获取分类
     */
    findMrTemplate=()=>{
        return ApiTemplateMrClass.findMrTemplate().then((data: any) => {
            this.dispatch({mrModle:data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }

    /**
     * 查询input 模糊查询组件的tltle
     */
    loadColumns=(code?:string)=>{
        return ApiDictInput.loadColumns(code).then((data) => {
            if (code==='YSZC'){
                this.dispatch({inputTitle:data})
            }else{
                this.dispatch({inputTitle1:data})
            }

        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData=(code?:string,page?:Page,inputName?:string)=>{
        return ApiDictInput.loadData(page,code,inputName).then((data) => {
            if (code==='YSZC'){
                this.dispatch2({inputDate:data,inputLength:data.total})
            }else{
                this.dispatch2({inputDate1:data,inputLength1:data.total})
            }

        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 修改起草
     */
    subUpdate=()=>{
        let {mrPatientsModle}=this.state
        return ApiPatientMrFileIndex.SubUpdate(mrPatientsModle,1,'','',).then((data) => {
            this.dispatch({visible:false})
            message.success('成功')
        }).catch(err => {
            message.tip(err || '修改失败', 'error', 'center')
        })
    }
    /**
     * 根据表格编号改变值
     */
    updateInfo=(name)=>{
        if (name==='YHXX'){
            JsonUtil.json('mrPatientsModle.topicDoctorName',this.state,this)
            JsonUtil.json('mrPatientsModle.topicDoctorId',this.state,this)
        }else{
            JsonUtil.json('mrPatientsModle.topicTitleName',this.state,this)
            JsonUtil.json('mrPatientsModle.topicTitleId',this.state,this)
        }
    }
    /**
     * 获取患者列表中某一行数据
     */
    showMessage = (v,name?:string) => {
        let page={}
        let code=''
        let inputName=''
        switch (v.type) {
            case 'pageEvent': {
                page={pageSize: v.pageSize, startIndex: v.pageCurrent}
                code=name
                inputName=v.value
                this.loadData(code,page,inputName)
                break
            }
            case 'enterEvent': {
                this.updateInfo(name)
                break
            }
            case 'changeEvent': {
                this.updateInfo(name)
                page={pageSize: v.pageSize, startIndex: 1}
                code=name
                inputName=v.value
                this.loadData(code,page,inputName)
                break
            }
            default:
                page={pageSize: 6, startIndex: 1}
                code=name
                inputName=v.value
                this.loadData(code,page,inputName)
                this.loadColumns(code)
        }
    }
    /**
     * 点击取消的方法
     */
    cancel=()=>{
        this.dispatch({visible:false})
    }
    /**
     * 改变值后的方法
     */
    radioGroupChange=(name,e)=>{
        let {mrPatientsModle}=this.state
        mrPatientsModle[name]=e.target.value
        this.dispatch2({mrPatientsModle})
    }
}

export const modifyFileService = new ModifyFileService('modifyFile')