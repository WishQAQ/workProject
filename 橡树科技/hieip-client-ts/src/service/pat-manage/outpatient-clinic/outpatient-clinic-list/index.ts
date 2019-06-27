import {BaseService} from 'tools/flux/BaseService'
import {loginService} from 'service/user/login'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import moment from 'moment'
import {
    DataDictEntityDict, MhPatientVisitEntitySplit, MhPatientVisitModelEntitySplit, OutpPatsEntityPatManageOutp,
    VdClinicLabelEntityOutp
} from 'pkg/entity'
import {ApiDictData, ApiPatManageOutpClinicMaster, ApiPatManageOverview, ArrayData} from 'pkg/api'
import {outpatientClinicInfoService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-information'
import {outpatientClinicDetailRecordLeftService} from
        'service/pat-manage/outpatient-clinic/outpatient-clinic-detail/record/record-left'

export interface OutpatientClinicListState {
    rowDataList?: ArrayData<OutpPatsEntityPatManageOutp>
    rowDataDetail?: ArrayData<OutpPatsEntityPatManageOutp>
    outpDept?: ArrayData<DataDictEntityDict>
    modal?: OutpPatsEntityPatManageOutp
    curDept?: VdClinicLabelEntityOutp
    curPvId?: any
    curPatInfo?: MhPatientVisitModelEntitySplit
    curPatInfoModal?: MhPatientVisitEntitySplit
    dictSex?: ArrayData<DataDictEntityDict>
    dictChargeType ?: ArrayData<DataDictEntityDict>
    dictIdentity ?: ArrayData<DataDictEntityDict>
    chargeTypeIndex?: any
    identityIndex?: any
    defaultSelect?: any
    rowDataTurn?: any
    isTurnBox?: any
    isModifyBox?: any
    isFirstVisit?: any,
    nowIndicator?: any
    firstVisit?: any
    secondVisit?: any
    userInput?: any
}

class OutpatientClinicListService extends BaseService<OutpatientClinicListState> {

    listAgApi?: any   // AG列表的api
    detailAgApi?: any // AG列表的api

    defaultState = {
        modal: <OutpPatsEntityPatManageOutp>{},
        rowDataList: <ArrayData<OutpPatsEntityPatManageOutp>>[],
        rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
        outpDept: <ArrayData<DataDictEntityDict>>[],
        curPvId: null,
        curDept: <VdClinicLabelEntityOutp>{},
        curPatInfo: <MhPatientVisitModelEntitySplit>{},
        curPatInfoModal: <MhPatientVisitEntitySplit>{},
        chargeTypeIndex: 0,
        identityIndex: 0,
        dictSex: <ArrayData<DataDictEntityDict>>[],
        dictChargeType: <ArrayData<DataDictEntityDict>>[],
        dictIdentity: <ArrayData<DataDictEntityDict>>[],
        defaultSelect: [],
        rowDataTurn: [],
        isTurnBox: false,
        isModifyBox: false,
        // nowIndicator: 1,
        // firstVisit: 0,
        // secondVisit: 0,
        // userInput: '',
    }

    /**
     * 页面初始加载
     */
    serviceWillMount() {
        // 加载字典表数据
        this.loadDictSex()
        this.loadChargeType()
        this.loadIdentity()

        let outpDept = this.state.outpDept
        let modal = <OutpPatsEntityPatManageOutp>{}
        let nowIndicator, input
        // 非第一次加载页面
        if (outpDept.length !== 0) {
            // 根据当前modal、是否是当天、输入内容 来查询门诊病人信息
            modal = this.state.modal
            nowIndicator = this.state.nowIndicator
            input = this.state.userInput
            ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, input).then((data) => {
                this.dispatch2({
                    rowDataList: data,
                    rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                    curPvId:null
                })
                this.init()
            }).catch((err) => {
                message.tip(err || '查询门诊病人列表数据失败!', 'warning')
            })
        } else {
            // 第一次加载本页面
            // 加载科室outpDept
            // modal科室名，modal科室ID，默认为outpDept[0]科室
            // 复选框显示当天
            ApiDictData.loadDeptDict().then((data) => {
                this.dispatch({
                    outpDept: data,
                    userInput: '',
                    defaultSelect: ['today']
                })
                modal = {
                    visitDeptName: data[0].value,
                    visitDept: Number(data[0].key)
                }
            }).then(() => {
                // 某科室 初诊 的门诊病人人数
                this.loadDept(modal.visitDeptName, modal.visitDept, 0, false)
            }).then(() => {
                // 某科室 复诊 的门诊病人人数
                this.loadDept(modal.visitDeptName, modal.visitDept, 1, false)
            }).then(() => {
                // 某科室 登录医生 当天 初诊 所有病人信息
                modal.doctor = loginService.state.user.id
                modal.workedIndicator = 0
                nowIndicator = 1
                ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator).then((data) => {
                    this.dispatch2({
                        isFirstVisit: true,
                        rowDataList: data,
                        nowIndicator: nowIndicator,
                        modal: modal,
                        curPvId:null
                    })
                    this.init()
                }).catch((err) => {
                    message.tip(err || '查询门诊病人列表数据失败!', 'warning')
                })
            }).catch((err) => {
                message.tip(err || '查询科室列表数据失败!', 'warning')
            })
        }
    }

    /**
     * 清空患者信息
     */
    init =()=>{
        outpatientClinicInfoService.setCurAgPatInfo({})
        outpatientClinicDetailRecordLeftService.setTransferDept(null)
    }

    /**
     * 左键，右键加载
     * @param e
     * @returns {Promise<void>}
     */
    loadPatInfo = (e) => {
        this.loadAgOnePatInfo(e)
        ApiPatManageOutpClinicMaster.loadOutpPats({patientId: e.data.patientId}, null).then((data) => {
            this.dispatch2({
                rowDataDetail: data
            })
            setTimeout(()=>{
                this.detailAgApi.api.sizeColumnsToFit()
            },50)
        }).catch((err) => {
            message.tip(err || '查询门诊病人列表数据失败!', 'warning')
        })
    }

    /**
     * 加载Ag表格里的数据
     * @param e
     */
    loadAgOnePatInfo = (e)=>{
        let pvid = e.data.pvId
        this.dispatch2({
            curPvId:pvid
        })
        outpatientClinicInfoService.setCurAgPatInfo(e.data)
        outpatientClinicDetailRecordLeftService.setTransferDept(pvid)
    }

    /**
     * 表格右键弹框
     * @param {number} menuIndex
     * @param {number} dataIndex
     */
    menuClick = (menuIndex?: number, dataIndex?: number) => {
        let pvid = this.state.curPvId
        switch (menuIndex) {
            case 0:
                ApiPatManageOutpClinicMaster.loadVdClinicLabel().then((data) => {
                    this.dispatch2({
                        curDept: <VdClinicLabelEntityOutp>{},
                        rowDataTurn: data,
                        isTurnBox: true,
                    })
                }).catch((err) => {
                    message.tip(err || '查询门诊转诊号别视图失败!', 'warning')
                })
                break
            case 1:
                this.openModify(String(pvid))
                break
            case 2:
                message.tip('此功能尚在开发中...', 'warning')
                break
            default:
                throw new Error('没有该选项')
        }
    }

    /**
     * 修改患者信息弹框
     * @param pvid
     */
    openModify = (pvid:string)=>{
        ApiPatManageOverview.loadMhPatientVisitById(pvid).then((data) => {
            this.dispatch2({
                curPatInfo: data
            })
        }).catch((err) => {
            message.tip(err || '查询患者信息失败!', 'warning')
        })
        this.dispatch2({
            isModifyBox: true
        })
    }

    /**
     * 修改患者信息
     * @param type
     * @param rest
     */
    setPatInfo = (type, ...rest) => {
        let value = rest[0]
        if (type === 'chargeType') {
            this.dispatch2({
                chargeTypeIndex: rest[1]
            })
        }
        if (type === 'identity') {
            this.dispatch2({
                identityIndex: rest[1]
            })
        }
        let curPatInfo = this.state.curPatInfo
        curPatInfo[type] = value
        this.dispatch2({curPatInfo: curPatInfo})
    }

    /**
     * 保存患者信息：
     * @param num 1：保存、0：取消
     */
    closeModify = (num) => {
        if (num) {
            let modal = this.state.curPatInfoModal
            let data = this.state.curPatInfo
            // 患者ID 就诊号 姓名 性别 出生日期 费别 身份 身份证号码 联系人 联系人电话 地址
            modal.id = data.id
            modal.visitNo = data.visitId
            modal.name=data.name
            modal.sex = {id: data.sex}
            modal.dateOfBirth = new Date(data.dateOfBirth)
            modal.chargeType = {id: Number(data.chargeType)}
            modal.identity = {id: Number(data.identity)}
            modal.idNo= data.idNo
            modal.nextOfKin = data.nextOfKin
            modal.nextOfKinPhone=data.nextOfKinPhone
            modal.mailingAddress = data.mailingAddress
            if(modal.name === undefined || modal.name === ''){
                message.tip('姓名不能为空!', 'warning')
                return
            }
            if(modal.idNo === undefined || modal.idNo===''){
                message.tip('身份证号码不能为空!', 'warning')
                return
            }
            if(String(modal.dateOfBirth)==='Invalid Date'){
                message.tip('日期不能为空!', 'warning')
                return
            }
            ApiPatManageOverview.updateMhPatientVisitById(modal).then(()=>{
                let {modal, nowIndicator, userInput} = this.state
                ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, userInput).then((data) => {
                    this.dispatch2({
                        rowDataList: data,
                        rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                        curPvId:null
                    })
                    this.init()
                }).catch((err) => {
                    message.tip(err || '查询门诊病人列表数据失败!', 'warning')
                })
                this.dispatch2({
                    isModifyBox: false
                })
                message.tip( '保存成功!', 'success')
            }).catch((err)=>{
                message.tip(err || '保存失败!', 'warning')
            })
        } else {
            this.dispatch2({
                isModifyBox: false
            })
        }

    }

    /**
     * 转科：某行被点击时保存这行的信息
     * @param agRowData
     */
    loadCurRow = (agRowData) => {
        this.dispatch2({
            curDept: agRowData.data
        })
    }

    /**
     * 转科：
     * @param num 1：转科、0：取消
     */
    closeTurn = (num) => {
        if (num) {
            let modal = this.state.modal
            let curDept = this.state.curDept
            let array = Object.keys(curDept)
            if (array.length === 0) {
                message.tip('请选择转科科室!', 'warning')
                return
            } else if (Number(curDept.clinicDept) === Number(modal.visitDept)) {
                message.tip('请选择不同科室!', 'warning')
                return
            } else if (curDept.doctor === undefined) {
                message.tip('请选择转科医生!', 'warning')
                return
            } else {
                let {curPvId, nowIndicator, userInput} = this.state
                ApiPatManageOutpClinicMaster.outpReferral(curDept, curPvId).then(() => {
                    this.loadDept(modal.visitDeptName, modal.visitDept, 0)
                    this.loadDept(modal.visitDeptName, modal.visitDept, 1)
                    ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, userInput).then((data) => {
                        this.dispatch2({
                            rowDataList: data,
                            rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                            curPvId:null
                        })
                        this.init()
                    }).catch((err) => {
                        message.tip(err || '查询门诊病人列表数据失败!', 'warning')
                    })
                    this.dispatch2({
                        isTurnBox: false,
                    })
                    message.tip('转科成功!', 'success')
                }).catch((err) => {
                    message.tip(err || '转科失败!', 'warning')
                })
            }
        } else {
            this.dispatch2({
                isTurnBox: false
            })
        }
    }

    /**
     * 转科：根据选取行传来的数据，加载该科室的所有医生信息
     * @param agData
     * @param callback
     */
    setDoctor = (agData, callback) => {
        ApiDictData.loadDoctor(agData.node.data.clinicDept).then((data) => {
            callback(data)
        }).catch((err) => {
            message.tip(err || `查询科室所有医生信息失败!`, 'warning')
        })
    }

    /**
     * 转科：设置医生的id
     * @param v
     */
    setDoctorId = (v) => {
        let curDept = this.state.curDept
        curDept.doctor = Number(v.key)
        this.dispatch2({
            curDept: curDept
        })
    }

    /**
     * 转科：点击搜索按钮 或 按下回车键时
     * @param input
     */
    searchTurnInput = (input) => {
        let modal = <VdClinicLabelEntityOutp>{}
        modal.clinicDeptName = input
        ApiPatManageOutpClinicMaster.loadVdClinicLabel(modal).then((data) => {
            this.dispatch2({
                rowDataTurn: data
            })
        }).catch((err) => {
            message.tip(err || '查询门诊转诊号别视图失败!', 'warning')
        })
    }

    /**
     * 头部：科室选择 下拉框
     * @param key
     * @param option
     */
    handleChange = (key, option) => {
        let modal = this.state.modal
        let nowIndicator = this.state.nowIndicator
        let userInput = this.state.userInput
        modal.visitDeptName = option.props.children
        modal.visitDept = Number(option.props.value)
        this.loadDept(modal.visitDeptName, modal.visitDept, 0)
        this.loadDept(modal.visitDeptName, modal.visitDept, 1)
        this.detailAgApi.api.deselectAll()
        this.listAgApi.api.deselectAll()
        ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, userInput).then((data) => {
            this.dispatch2({
                modal: modal,
                rowDataList: data,
                rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                curPvId:null
            })
            this.init()
        }).catch((err) => {
            message.tip(err || '查询门诊病人列表数据失败!', 'warning')
        })
    }

    /**
     * 头部：点击切换 初诊、复诊
     * @param num 0：初诊 1：复诊
     */
    toggleBtnClick = (num) => {
        let {nowIndicator, userInput} = this.state
        let status, modal = this.state.modal
        if (num === 0) {
            status = true
            modal.workedIndicator = 0
        }
        if (num === 1) {
            status = false
            modal.workedIndicator = 1
        }
        ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, userInput).then((data) => {
            this.dispatch2({
                isFirstVisit: status,
                modal: modal,
                rowDataList: data,
                rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                curPvId:null
            })
            this.init()
        }).catch((err) => {
            message.tip(err || '查询门诊病人列表数据失败!', 'warning')
        })
    }

    /**
     * 搜索框：点击搜索按钮 或 按下回车键时
     * @param input 用户输入的值
     */
    searchInput = (input) => {
        let {modal, nowIndicator} = this.state
        ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, input).then((data) => {
            this.dispatch2({
                rowDataList: data,
                rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                curPvId:null
            })
            this.init()
        }).catch((err) => {
            message.tip(err || '查询门诊病人列表数据失败!', 'warning')
        })
    }

    /**
     * 搜索框：保存用户每一次输入的值
     * @param e
     */
    loadInput = (e) => {
        this.dispatch2({
            userInput: e.target.value
        })
    }

    /**
     * 复选框：
     * @param array 已选中的复选框
     * @returns {Promise<void>}
     */
    searchTodayOrAllDept = (array) => {
        let {userInput} = this.state
        let nowIndicator = this.state.nowIndicator
        let modal = this.state.modal
        // 非当天，非全科
        if (array.length === 0) {
            nowIndicator = null
            modal.doctor = loginService.state.user.id
        }
        if (array.length === 1) {
            // 当天，非全科
            if (array[0] === 'today') {
                nowIndicator = 1
                modal.doctor = loginService.state.user.id
            }
            // 非当天，全科
            if (array[0] === 'allDept') {
                nowIndicator = null
                modal.doctor = null
            }
        }
        // 当天，全科
        if (array.length === 2) {
            nowIndicator = 1
            modal.doctor = null
        }
        ApiPatManageOutpClinicMaster.loadOutpPats(modal, nowIndicator, userInput).then((data) => {
            this.dispatch2({
                modal: modal,
                nowIndicator: nowIndicator,
                defaultSelect: array,
                rowDataList: data,
                rowDataDetail: <ArrayData<OutpPatsEntityPatManageOutp>>[],
                curPvId:null
            })
            this.init()
        }).catch((err) => {
            message.tip(err || '查询门诊病人列表数据失败!', 'warning')
        })
    }

    /**
     * 加载某科室的所有初诊人数、复诊人数
     * @param visitDeptName 科室名称
     * @param visitDept 科室ID
     * @param workedIndicator 0：初诊、1：复诊
     */
    loadDept = (visitDeptName, visitDept, workedIndicator, isRefresh = true) => {

        let modal = <OutpPatsEntityPatManageOutp>{}
        modal.visitDeptName = visitDeptName
        modal.visitDept = visitDept
        modal.workedIndicator = workedIndicator

        ApiPatManageOutpClinicMaster.loadOutpPats(modal).then((data) => {
            if (isRefresh) {
                if (workedIndicator === 0) {
                    this.dispatch2({
                        firstVisit: data.length
                    })
                }
                if (workedIndicator === 1) {
                    this.dispatch2({
                        secondVisit: data.length
                    })
                }
            }
            else {
                if (workedIndicator === 0) {
                    this.dispatch({
                        firstVisit: data.length
                    })
                }
                if (workedIndicator === 1) {
                    this.dispatch({
                        secondVisit: data.length
                    })
                }
            }
        }).catch((err) => {
            message.tip(err || '查询门诊病人列表数据失败!', 'warning')
        })
    }

    /**
     * 加载性别字典表
     */
    loadDictSex = () => {
        ApiDictData.loadDictSex().then(data => {
            this.dispatch2({
                dictSex: data
            })
        })
    }

    /**
     * 加载费别字典表
     */
    loadChargeType = () => {
        ApiDictData.loadChargeType().then(data => {
            this.dispatch2({
                dictChargeType: data
            })
        })
    }

    /**
     * 加载费别字典表
     */
    loadIdentity = () => {
        ApiDictData.loadIdentity().then(data => {
            this.dispatch2({
                dictIdentity: data
            })
        })
    }

    // 加载list agApi
    onGridReadyList = (params) => {
        this.listAgApi = params
    }

    // 加载detail agApi
    onGridReadyDetail = (params) => {
        this.detailAgApi = params
    }
}

export const outpatientClinicListService = new OutpatientClinicListService('outpatientClinicList')