import {BaseService} from '../../../../../../tools/flux/BaseService/index'
import {PatientFilePrintModelDtoPatient,Page,MrTemplateClassModelDtoTemplate}
from '../../../../../../packages/entity/medical'
import {message} from '../../../../../../packages/common/message/index'
import {ApiPatientMedical, ApiPatientMrFilePrintLog}
from '../../../../../../packages/api/medical'
export interface PrintFileState {
    /**  打印：开始时间  */
    startTime?: any
    /** 打印：结束时间  */
    endTime?: any
    /**  打印：未打印  */
    printFlag?: boolean
    /**  打印：可打印 */
    ifPrintFlag?: boolean
    /** 打印：名称  */
    name?: string
    /**  打印table中的数据 */
    patientFile?: PatientFilePrintModelDtoPatient[]
    /** 患者id  */
    patientId?: string
    /**  住院标识  */
    visitId?: number
    /** 科室   */
    deptCode?: string
    /**  分页   */
    page?:Page
    /**  分类code */
    mrClass?: string
    /**  分类集合  */
    mrModle?:MrTemplateClassModelDtoTemplate[]
    /**  打印数据的长度 */
    patientFileLenght?:number
    /**  是否打开打印弹框 */
    visible?:boolean
    time?:any
}
class PrintFileService extends BaseService<PrintFileState> {
    patientFileApi:any
    defaultState = {
        page:{pageSize:100,startIndex:1},
        printFlag:false,
        ifPrintFlag:false,
        mrClass:'',
        visible:false,
        time:''
    }
    serviceWillMount(){
        this.reset()
    }
    /**
     * 获取患者信息
     */
    patient=(id?:string ,visit?:number,dept?:string,classs?:string,visibles?:boolean)=>{
        this.dispatch({patientId:id,visitId:visit,deptCode:dept,mrClass:classs,visible:visibles})
        return ApiPatientMedical.findTemplateClass(id,visit,dept).then((data: any) => {
            this.dispatch({mrModle:data })
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 打印查询
     */
    findPatientFile = (starIndex?) => {
        let {startTime, endTime, patientId, visitId, printFlag, ifPrintFlag, name, page, mrClass, deptCode} = this.getState()
        page.startIndex = starIndex ? starIndex : page.startIndex
        if (/Invalid/.test(startTime)){
            startTime=''
        }
        if (/Invalid/.test(endTime)){
            endTime=''
        }
        return new Promise(resolve => {
            return ApiPatientMrFilePrintLog.FindPatientFile
            (startTime, endTime, patientId, visitId, printFlag, ifPrintFlag, name, page, mrClass, deptCode).then(data => {
                resolve(data)
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })
        } )
    }

    /**
     * 改变分页需要的状态
     */
    onGridReady = (params) => {
        this.patientFileApi= params
        this.onReverSource()
    }

    /**
     * 分页
     */
    onReverSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.findPatientFile(params.startRow).then((data: any) => {
                    params.successCallback(data, data.total?data.total:0)
                })
            }
        }
        this.patientFileApi.api.setDatasource(dataSource)
    }
    /**
     * 值改变的方法
     */
    radioGroupChange=(name,e)=>{
        return new Promise(resolve => {
            let {page}=this.state
            page.startIndex=1
        this.dispatch({[name]:e==='全部'?'':e,page})
            resolve()
        }).then(()=>this.onReverSource())

    }
    /**
     * 点击查询的方法
     */
    obscurePatientFile=()=>{
        let {page} = this.getState()
        page.startIndex=1
        this.dispatch2({page})
        this.onReverSource()
    }
    showOnchange=(e)=>{
        this.dispatch2({startTime:e?e[0]:'',endTime:e?e[1]:''})
    }
    /**
     * 模板名称输入
     */
    inputChange = (e) =>{
        this.dispatch2({name: e.target.value})
    }
    /**
     * 单选按钮值改变的方法
     */
    onchange=(e)=>{
        return new Promise(resolve => {
            let {page}=this.state
            page.startIndex=1
            if (e.target.value===2){
                this.dispatch2({printFlag:true,ifPrintFlag:false,page})
            }
            else if (e.target.value===3){
                this.dispatch2({ifPrintFlag:true,printFlag:false,page})
            }else{
                this.dispatch2({ifPrintFlag:false,printFlag:false,page})

            }
            resolve()
        }).then(()=>this.onReverSource())

    }
    /**
     * 取消的方法
     */
    cancel=()=>{
      this.dispatch({visible:false,startTime:'',endTime:''})
    }
}

export const printFileService = new PrintFileService('printFile')