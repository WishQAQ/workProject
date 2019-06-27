import {BaseService} from '../../../../../../tools/flux/BaseService/index'
import {MrTemplateIndexModelDtoTemplate, Page,MrTemplateClassModelDtoTemplate}
from '../../../../../../packages/entity/medical'
import {message} from '../../../../../../packages/common/message/index'
import {ApiTemplateMrIndex,ApiTemplateMrClass,ApiDictInput}
from '../../../../../../packages/api/medical'
import {JsonUtil} from '../../../../../../tools/api/JsonUtil'
import {medicalService} from '../../index'
export interface NewfileState {
    /** 分类code */
    mrClass?: string
    /**   */
    tempaleType?: number
    /** 模糊 */
    names?: string
    /** 分页 */
    page?: Page
    /**  */
    monitorCode?: string
    /** 默认科室 */
    deptCode?: string
    /** 患者id */
    patientId?: string
    /** 住院标识 */
    visitId?: number
    /** 模板集合 */
    templateIndex?: MrTemplateIndexModelDtoTemplate[]
    /** 模板分类的集合 */
    mrModle?:MrTemplateClassModelDtoTemplate[]
    /** input 模糊查询组件的表编码 */
    dictCode?: string
    /** input 模糊查询组件的表编码  */
    dictCode1?:string
    /**  input 模糊查询组件的分页  */
    inputPage?:Page
    /**  input 模糊查询组件的 模糊查询值 */
    inputCode?: string
    /** input 模糊查询组件的数据长度 */
    inputLength?:number
    /** input 模糊查询组件的数据长度 */
    inputLength1?:number
    /**  input 模糊查询组件的数据  */
    inputDate?:any
    /**  input 模糊查询组件的数据  */
    inputDate1?:any
    /** input 模糊查询组件的title */
    inputTitle?:any[]
    /** input 模糊查询组件的title  */
    inputTitle1?:any[]
    /**  */
    errorMessage?:string
    /**  */
    operation?:string
    /**  长度 */
    templateLenght?:number
    /** 分类  */
    classify?:string
    /**  模板名称 */
    template?:string
    /** 模板模板对象  */
    mrTemplate?:MrTemplateIndexModelDtoTemplate
    /** 关闭弹框的状态  */
    visible?:boolean
    /* 时间 */
    time?:any
    times?:any
}
class NewfileService extends BaseService<NewfileState> {
    mainagApi:any
    defaultState = {
        names:'',
        monitorcode:'',
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
        operation:'',
        templateLenght:0,
        page:{pageSize:100,startIndex:1},
        tempaleType:1,
        visible:false,
        times:''
    }
    /**
     * 患者信息
     */
    patient=(id?:string ,visit?:number,dept?:string,classs?:string,visibles?:boolean)=>{
     this.dispatch({patientId:id,visitId:visit,deptCode:dept,mrClass:classs,visible:visibles})
        this.findMrTemplate()
    }

    /**
     * 新增患者病例的模板查询
     */
    findByPage = (starIndex?) => {
        let {mrClass, tempaleType, names, page, deptCode, patientId, visitId,times} = this.state
        page.startIndex = starIndex ? starIndex : page.startIndex
        return new Promise(resolve => {
            return ApiTemplateMrIndex.findByPage(mrClass, tempaleType, names, page, times,
                '', deptCode, patientId, visitId).then(data => {
                resolve(data)
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })
        } )

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
                this.dispatch(JsonUtil.json('', this.state,v.data.id ? v.data.id : ''))
                break
            }
            case 'changeEvent': {
                page={pageSize: v.pageSize, startIndex: v.pageCurrent}
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
     * 改变分页需要的状态
     */
    onGridReady = (params) => {
        this.mainagApi= params
        this.onReverSource()
    }

    /**
     * 分页
     */
    onReverSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.findByPage(params.startRow).then((data: any) => {
                    params.successCallback(data, data.total?data.total:0)
                })
            }
        }
        this.mainagApi.api.setDatasource(dataSource)
    }

    /**
     * 选中一行的事件
     */
    templateIndexOpt=(params)=>{
        this.dispatch({mrTemplate:params.data})
    }

    /**
     * 模板名称输入
     */
    inputChange = (e) =>{
        this.dispatch2({names: e.target.value})
    }

    /**
     * 改变下拉框的值
     */
    onchange=(name,e)=>{
        return new Promise(resolve => {
            let {page}=this.state
            page.startIndex=1
            this.dispatch2({[name]:e?e:'',page})
            resolve()
        }).then(()=> this.onReverSource())
    }

    showOnchange=(name,e)=>{
        this.dispatch2({[name]:e?e:''})
    }

    /**
     * 点击查询的方法
     */
    onClick=()=>{
        return new Promise(resolve => {
            let {page}=this.state
            page.startIndex=1
            this.dispatch2({page})
            resolve()
        }).then(()=> this.onReverSource())
    }
    /**
     * 改变单选框的值
     */
    rodisOnchange=(name,e)=>{
        return new Promise(resolve => {
            let {page}=this.state
            page.startIndex=1
            this.dispatch2({[name]:e.target.value,page})
            resolve()
        }).then(()=> this.onReverSource())
    }

    /* 点击确认的方法 */
    onOk=()=>{
        let{mrTemplate,mrClass}=this.state
        this.dispatch2({mrTemplate:{modifyTopicTitle:0,needParentSignFlag:0,modifyTopic:0},visible:false,time:'',tempaleType:1})
        setTimeout(()=>{
            medicalService.insertPanes(mrTemplate)
        },100)
    }

    /**
     * 点击取消的方法
     */
    cancelEmpty=()=>{
        this.dispatch2({mrTemplate:{modifyTopicTitle:0,needParentSignFlag:0,modifyTopic:0},visible:false,time:'',tempaleType:1})
    }
    /**
     * 公共改变值的方法
     */
    onUpdate=(name?:string,e?:any)=>{
        this.dispatch2(JsonUtil.json(name,this.state, e.target.value))
    }
}

export const newfileServiceService = new NewfileService('newfile')