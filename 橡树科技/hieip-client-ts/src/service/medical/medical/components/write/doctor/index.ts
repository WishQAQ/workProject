import {BaseService} from 'tools/flux/BaseService'
import {OrdersDtoOak} from 'pkg/entity/medical'
import {ApiPatientMedical,} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import debug from 'debug'
import {Page} from 'pkg/entity/medical'

const log = debug('trace:病历:medical')

export interface DoctorState {
    /* 分页 */
    page?: Page
    /* 患者id*/
    patientId?: string,
    /* 住院标识 */
    visitId?: number
    /* 医嘱类型  */
    orderClass?: string
    /*  */
    repeatIndicator?: string
    /* 医嘱状态 */
    state?: string
    /* 医嘱信息集合 */
    order?: OrdersDtoOak[]
    /* 医嘱总数量 */
    orderLenght?: number
    /* 提取内容集合 */
    info?: any
}

class DoctorService extends BaseService<DoctorState> {
    doctorApi: any
    defaultState = {
        orderLenght: 0,
        page: {pageSize: 20, startIndex: 1},
        orderClass: '',
        orderType: [],
        repeatIndicator: '',
        info: ['时间+内容+剂量+单位+用法', '内容+剂量+单位+用法+频次', '内容+剂量+单位+频次', '内容+剂量+单位+用法',
            '内容+剂量', '内容+剂量+单位', '剂量+频次', '内容', '出院带药']
    }
    /**
     * 获取信息
     */
    acquisition = (patient?: string, visit?: number) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({patientId: patient, visitId: visit})
            resolve()
        }).then(() => {
            this.getPatientOrder(patient, visit)
        })
    }

    /**
     * 医嘱提取
     */
    getPatientOrder = (pid: string = '', vid: number = null) => {
        let {page, patientId, visitId, orderClass, repeatIndicator, state} = this.state
        return ApiPatientMedical.getPatientOrder(page, pid || patientId, vid || visitId, orderClass, repeatIndicator, state)
            .then((data: any) => {
                this.dispatch2({order: data, orderLenght: data.total})
                this.doctorApi.api.setRowData(data)
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })
    }

    /**
     *  分页
     */
    onGridReady = (parms) => {
        let {page} = this.state
        // 将table赋值给agApi，通过agApi动态为table赋值
        this.doctorApi = parms
        /** 获取当前表格能显示多少行 */
        page.pageSize = parms.api.paginationGetPageSize()
        this.dispatch2({page})
    }

    /**
     * 点击分页执行
     * @param clickPage
     */
    onShowSizeChange = (clickPage) => {
        let {page} = this.state
        page.startIndex = (page.pageSize * (clickPage - 1)) + 1
        if (clickPage === 1) {
            page.startIndex = 1
        }
        this.dispatch({page})
        this.getPatientOrder()
    }

    obscurePatientFile = () => {
        let {page} = this.state
        page.startIndex = 1
        this.dispatch2({page: page})
        this.getPatientOrder()
    }
    /**
     * 单选框改变值和输入框
     */
    onChange = (names?: string, e?: any) => {
        return new Promise(resolve => {
            this.dispatch2({[names]: e.target.value})
            resolve()
        }).then(() =>
            this.obscurePatientFile())
    }
}

export const doctorService = new DoctorService('doctor')