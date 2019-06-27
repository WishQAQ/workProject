/**
 * Created by mod on 2018/1/10.
 * 电子病历
 * 病案签收页面 server 对接
 */

import {BaseService} from 'tools/flux/BaseService'
import {Page} from 'pkg/entity'
import {
    ApiPatientFileSign,
    ApiSystemDictParam,
    ArrayData,
    ApiDictInput
} from 'pkg/api/medical'
import {DeptDictEntityDict, PatientFileSignModelDtoPatient} from 'pkg/entity/medical'
import {message} from 'pkg/common/message'
import {loginService} from 'service/user/login'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface MedicalSignState {
    /** 开始时间 */
    startDate?: Date
    /** 结束时间 */
    endDate?: Date
    /** 住院号 */
    inpNo?: string
    /** 患者id */
    patientId?: string
    /** 是否签收 */
    signFlag?: boolean
    /** 保存科室 集合 */
    dept?: ArrayData<DeptDictEntityDict>
    /** 弹窗 */
    visible?: boolean
    /** 保存表格数据 */
    data?: ArrayData<PatientFileSignModelDtoPatient>
    /** 提交签收时间 */
    mrSubmitTime?: Date
    /** 当前登陆医师 */
    username?: string
    /** 分页 */
    page?: Page

    /** 数据总条数 */
    total?: number
    /** 批量签收病历集合 */
    mrSigns?: Array<PatientFileSignModelDtoPatient>,
    /** 查询条件 */
    inputData?: string,

    /*input 模糊查询组件的表编码*/
    dictCode?: string
    /*input 模糊查询组件的分页*/
    inputPage?: Page
    /* input 模糊查询组件的 模糊查询值*/
    inputCode?: string
    /*input 模糊查询组件的数据长度*/
    inputLength?: number
    /*input 模糊查询组件的数据*/
    inputTableData?: any
    /*input 模糊查询组件的title*/
    inputTitle?: any[]
    /** inputCode 多选对象数组 */
    deptObjectCode?: Array<any>,
    /** 科室编码，多选  */
    deptCode?: string,
}

class MedicalSignService extends BaseService<MedicalSignState> {
    /** 表格api */
    medicalSignApi ?: any
    defaultState = {
        signFlag: false,
        visible: false,
        startDate: null,
        endDate: null,
        inpNo: null,
        patientId: null,
        username: loginService.state.user.name,
        page: {
            startIndex: 1,
            pageSize: 100
        },
        inputPage: {
            pageSize: 7,
            startIndex: 1
        },
        total: 0,
        inputData: '',
        dictCode: 'deptDict'
    }

    /**
     * 加载service加载的数据
     */
    serviceWillMount() {
        this.reset()
    }

    /**
     * 表格加载获取数据
     */
    onGridReady = (parms) => {
        this.medicalSignApi = parms
        this.onReverSource()
    }

    /**
     * 表格滚动加载
     */
    onReverSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.FindPatientFileSign(params.startRow).then((data: any) => {
                    const {total} = this.state
                    let lastRow: number = 0
                    if (data) {
                        if (total <= params.endRow) lastRow = data.length
                        else if (total > params.endRow && lastRow < total) {
                            lastRow = params.startRow + data.length
                            if (lastRow % params.endRow === 0 && total > lastRow) {
                                lastRow = lastRow + 1
                            }
                        } else lastRow = total ? total : 0
                    }
                    params.successCallback(data, lastRow)
                })
            }
        }
        this.medicalSignApi.api.setDatasource(dataSource)
    }

    /**
     * 查询表格数据
     * @constructor
     */
    FindPatientFileSign(starIndex) {
        const {startDate, endDate, inputData, deptCode, signFlag, page} = this.state
        page.startIndex = starIndex ? starIndex : page.startIndex
        return new Promise(resolve => {
            ApiPatientFileSign.FindPatientFileSign(startDate, endDate, inputData, deptCode, signFlag, page)
                .then(data => {
                    if (data && '[]' !== JSON.stringify(data)) {
                        this.dispatch2({total: data.total, page})
                    } else {
                        this.dispatch({total: 0})
                    }
                    resolve(data)
                }).catch(err => {
                message.tip(err || '查询字典数据列失败!', 'error', 'center')
            })
        })
    }

    /**
     * time
     */
    onChangeTime = (value) => {
        this.dispatch2({
            startDate: value[0],
            endDate: value[1]
        })
    }

    /**
     * 输入框
     */
    onChangeInput = (e) => {
        this.dispatch2({inputData: e.target.value})
    }
    /**
     * 是否签收改变
     */
    onChangeRadio = (value) => {
        this.dispatch({signFlag: value.target.value === 1})
        this.onReverSource()
    }
    /**
     * 表格 右键
     * @param menuIndex
     * @param dataIndex
     */
    // tableMenuClick = (menuIndex, dataIndex) => {
    //     // let signs = []
    //     // signs.push(this.state.data[dataIndex])
    //     // this.dispatch2({mrSigns: signs})
    //     const {signFlag} = this.state
    //     if (!signFlag) { // 右键签收
    //         this.patientFileSign()
    //     } else { // 右键取消签收
    //         this.cancelSign()
    //     }
    // }

    /**
     * ag表格左右键点击取当前行数据
     * @param e
     */
    agTableClick = (e) => {
        let signs = []
        signs.push(e ? e.data : {})
        this.dispatch2({mrSigns: signs})
    }

    /**
     *  弹窗关闭
     */
    onCancel = () => {
        this.dispatch2({visible: false, mrSubmitTime: null})
    }
    /**
     *  确定签收
     */
    onOk = () => {
        if (!this.state.mrSubmitTime) {
            message.tip('纸质病历上交时间')
        } else this.patientFileSign()
        this.onCancel()
    }

    /**
     * 弹窗时间
     */
    dragChangeTime = (value) => {
        this.dispatch({mrSubmitTime: value})
    }

    /**
     * 点击查询按钮
     */
    search = () => {
        const {page} = this.state
        page.startIndex = 1
        this.dispatch2({page})
        this.onReverSource()
    }

    /**
     * 点击签收按钮
     * signFlag===true
     * 签收
     * else
     * 取消签收
     */
    onSign = () => {
        const {signFlag, mrSigns} = this.state
        if (mrSigns && mrSigns.length > 0) {
            if (!signFlag) {
                ApiSystemDictParam.GetIsShowMrSubmitInfo().then(data => {
                    if (Number.parseInt(data) === 1) {
                        this.dispatch2({visible: true})
                    } else {
                        this.patientFileSign()
                    }
                })
            } else {
                this.cancelSign()
            }
        } else {
            message.tip('请勾选要签收的行!', 'warning', 'center')
        }
    }

    /**
     * 发起签收
     */
    patientFileSign = () => {
        const {mrSigns, mrSubmitTime} = this.state
        if (JsonUtil.isEmpty(mrSigns)) {
            message.tip('请至少选择一行!', 'warning', 'center')
            return
        }
        mrSigns.forEach(v => {
            v.mrSubimitUserId = loginService.state.user.empNo
            v.mrSubmitTime = mrSubmitTime
        })
        ApiPatientFileSign.PatientFileSign(mrSigns).then(() => {
            message.tip('签收成功!', 'success', 'center')
            this.onReverSource()
        }).catch(err => {
            this.dispatch2({visible: false})
            message.tip(err || '签收失败!', 'error', 'center')
        })
        this.dispatch2({mrSigns: []})
    }

    /**
     * 取消签收
     */
    cancelSign = () => {
        const {mrSigns} = this.state
        if (JsonUtil.isEmpty(mrSigns)) {
            message.tip('请至少选择一行!', 'warning', 'center')
            return
        }
        ApiPatientFileSign.CancleSign(mrSigns).then(() => {
            message.tip('取消签收成功!', 'success', 'center')
            this.onReverSource()
        }).catch(err => {
            message.tip(err || '取消签收失败!', 'error', 'center')
        })
        this.dispatch2({mrSigns: []})
    }

    /**
     * 查询input 模糊查询组件的title
     */
    loadColumns = () => {
        let {dictCode} = this.state
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            this.dispatch2({inputTitle: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData = () => {
        let {dictCode, inputPage, inputCode} = this.state
        return ApiDictInput.loadData(inputPage, dictCode, inputCode).then((data) => {
            this.dispatch({inputLength: data.total, inputTableData: data})
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 获取患者列表中某一行数据
     */
    showMessage = (v) => {
        switch (v.type) {
            case 'pageEvent': { // 分页事件，上下页加载信息
                this.dispatch({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })

                this.loadData()
                break
            }
            case 'enterEvent': { // 点击确认
                this.dispatch({
                    inputCode: v.data.value,
                    deptObjectCode: v.multiValue,
                    deptCode: v.value.join()
                })
                break
            }
            case 'removeEvent': {
                this.dispatch({
                    deptObjectCode: v.multiValue,
                    deptCode: v.value.join()
                })
                break
            }
            case 'changeEvent': { // 输入框模糊搜索，加载信息
                this.dispatch({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })

                this.loadData()
                break
            }
            case 'clickEvent': {
                this.loadColumns()
                this.loadData()
                break
            }
            default:
                break
        }
    }
    /**
     * 病案多选
     *
     * @param event
     */
    onSelectChange = (event) => {
        let mrSigns = []
        this.dispatch2({mrSigns: []})
        if (event) {
            event.forEach(val => {
                mrSigns.push(val.data)
            })
        }
        this.dispatch2({mrSigns: mrSigns})
    }
    /**
     * 病案签收导出csv
     */
    expCsv = () => {
        this.medicalSignApi.api.exportDataAsCsv()
        // agApi.api.exportDataAsExcel({})
    }
}

export const medicalSignService = new MedicalSignService('medicalSign')