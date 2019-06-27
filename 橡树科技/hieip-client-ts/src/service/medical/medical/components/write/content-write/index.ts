import {BaseService} from 'tools/flux/BaseService'
import {
    MrTemplateClassModelDtoTemplate,
    MrPatientFileIndexModelDtoPatient, MrPatientFileContentHtmlEntityPatient
}
    from 'pkg/entity/medical'
import {ApiPatientMrFileIndex} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import debug from 'debug'
import {Page} from 'pkg/entity/medical'

const log = debug('trace:病历:medical')

export interface ContentWriteState {
    /* 分页 */
    page?: Page
    /* 患者id  */
    patientId?: string,
    /* 住院标识 */
    visitId?: number
    /* 文件类型 */
    mrClassCode?: string
    /* 身份类型  */
    patientType?: string
    /* 分类 */
    mrClass?: MrTemplateClassModelDtoTemplate[]
    /* 默认患者病历 */
    mrPatientFile?: MrPatientFileIndexModelDtoPatient[]
    /* 默认患者病历信息 */
    mrPatientFilemodle?: MrPatientFileIndexModelDtoPatient[]
    /* 病历文件id */
    fileId?: string
    /* 病历内容 */
    fileContent?: MrPatientFileContentHtmlEntityPatient
}

class ContentWriteService extends BaseService<ContentWriteState> {
    defaultState = {
        page: {pageSize: 6, startIndex: 1},
        patientType: ''
    }
    // serviceWillMount(){
    //     this.reset()
    // }
    /**
     * 获取病历信息
     */
    acquisition = (patient?: string, visit?: number) => {
        let {patientType} = this.state
        this.dispatch({patientId: patient, visitId: visit})
        return ApiPatientMrFileIndex.GetAllMrPatientFileIndex(patient, visit, patientType).then((data: any) => {
            if (data) {
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.state[key] = data[key]
                    }
                }
            }
            this.dispatch2(this.state)
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }

    /**
     * 根据分类查询患者病历信息
     *
     */
    getPatientFileIndex = () => {
        let {patientId, visitId, patientType, mrClassCode} = this.state
        return ApiPatientMrFileIndex.GetPatientFileIndex(patientId, visitId, patientType, mrClassCode).then((data: any) => {
            this.dispatch2({mrPatientFile: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /*
     *  选中一行病历查询病历的内容
     */
    selectLine = (e) => {
        return ApiPatientMrFileIndex.GetMrPatientFileHtml(e.data.id).then((data: any) => {
            this.dispatch2({fileContent: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /*
    * 下拉狂改变值的方法
    */
    onchange = (name?: string, e?: any) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({[name]: e})
            resolve()
        }).then(() => {
            this.getPatientFileIndex()
        })
    }

    /*
     * 文书类型改变的方法
     */
    writOnchange = (e) => {

        return new Promise((resolve, reject) => {
            this.dispatch2({mrClassCode: e.key})
            resolve()
        }).then(() => {
            this.getPatientFileIndex()
        })
    }
}

export const contentWriteService = new ContentWriteService('contentWrite')