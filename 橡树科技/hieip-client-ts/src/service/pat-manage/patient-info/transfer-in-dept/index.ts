import { BaseService } from 'tools/flux/BaseService'
import { JsonUtil } from 'tools/api/JsonUtil'
import { patInfoHeaderService } from '../header'
import { message } from 'pkg/common/message'
import { ApiDictData, ApiDictInput, ApiPatManageTransferRec, ArrayData } from '../../../../packages/api'
import {
    BedDictEntityPatManageTransferDict, DataDictEntityDict as DataDict, DeptDictEntityUser, MhPatientVisitEntitySplit, Page,
    PatInHouseEntityPatManageTransfer, UserEntityUser
} from '../../../../packages/entity'
import { loginService } from '../../../user/login'

/**
 * ag表格
 */
let agApiParams

export interface TransferInDeptState {
    modals?: string
    // 患者出院开始时间
    timeFrom?: Date
    // 患者出院结束时间
    timeTo?: Date
    // 选中的召回患者
    data?: PatInHouseEntityPatManageTransfer
    // 查询分页
    page?: Page
    // 患者姓名、编号
    inputCode?: string
    // 可召回患者信息
    mhPvList?: Array<MhPatientVisitEntitySplit>
    /*
     * 急诊护理等级
     */
    nursingClassDict?: DataDict[]
    /**
     * 护士
     */
    nurses?: ArrayData<UserEntityUser>
    /**
     * 医生
     */
    staffDict?: ArrayData<UserEntityUser>
    /*
     * 急诊病情状态
     */
    patientStatusDict?: DataDict[]
    // 科室
    deptDicts?: ArrayData<DeptDictEntityUser>
    /**
     * 获取科室id查询护士
     */
    deptCode?: number
    /**
     * 床位表头
     */
    hVdBedDictColumns?: Array<any>
    /**
     * 医生表头
     */
    staffDictColumns?: Array<any>
    /*
     * 床位信息
     */
    hVdBedDict?: ArrayData<BedDictEntityPatManageTransferDict>
}

class TransferInDeptService extends BaseService<TransferInDeptState> {
    defaultState = {
        modals: '',
        /*
        * 急诊护理等级
        */
        nursingClassDict: [],
        /*
        * 急诊病情状态
        */
        patientStatusDict: []
    }

    /**
     * 加载service加载的数据
     */
    serviceWillMount() {
        this.loadTransferInDept() // 查询可召回患者
        this.loadMultipleColumns() // 查询弹窗标题栏
        this.loadData('hNursingClassDict') // 查询急诊护理等级
        this.loadData('hVdBedDict') // 查询床号
        this.loadData('deptDict') // 查询科室
        this.loadData('hPatientStatusDict') // 急诊病情状态
        this.loadDoctor()  // 查询医生
        this.loadNurse() // 查询护士
    }

    /**
     * 加载多个
     * @returns {Promise<any>}
     */
    loadMultipleColumns = () => {
        let add = ['staffDict', 'hVdBedDict']
        return ApiDictInput.loadMultipleColumns(add).then((data) => {
            let hVdBedDict = data.hVdBedDict
            let staffDictColumns = data.staffDict
            this.dispatch({ hVdBedDictColumns: hVdBedDict, staffDictColumns: staffDictColumns })
        }).catch(err => {
            message.tip(err || '查询字典数据列失败!', 'warning')
        })
    }
    /* =====分界线: 1、查询: 开始===== */
    /*
     * 查询可召回患者
     */
    loadTransferInDept = () => {
        const { page, timeFrom, timeTo, inputCode } = this.state
        return ApiPatManageTransferRec.loadTransferInDept(page, timeFrom, timeTo, inputCode).then((data) => {
            this.dispatch({ mhPvList: data })
            if(agApiParams) agApiParams.api.setRowData(data)
        }).catch(err => {
            message.tip(err || '查询可召回患者信息失败!', 'warning')
        })
    }
    /**
     * 召回患者
     * @returns {Promise<void>}
     */
    transferInDept = () => {
        const { data } = this.getState()
        if (data.pvId === null) {
            message.tip('请选择要召回的患者', 'warning')
            return
        } else if (data.operator === null) {
            message.tip('未获取到登录信息，请刷新后再试', 'warning')
            return
        } else if (data.deptCode === null) {
            message.tip('未获取到科室信息，请刷新后再试', 'warning')
            return
        } else if (data.doctorInCharge === null) {
            message.tip('医生不能为空，请选择医生', 'warning')
            return
        } else if (data.nurseInCharge === null) {
            message.tip('主管护士不能为空，请选择主管护士', 'warning')
            return
        } else if (data.nursingClass === null) {
            message.tip('护理等级不能为空，请选择护理等级', 'warning')
            return
        } else if (data.patientStatus === null) {
            message.tip('病情不能为空，请选择病情状况', 'warning')
            return
        } else if (data.bedLabel === null) {
            message.tip('床号不能为空，请选择床号', 'warning')
            return
        } else if (data.areaId === null) {
            message.tip('区域不能为空，请选择正在使用的床号', 'warning')
            return
        }
        return ApiPatManageTransferRec.transferInDept(data).then((data) => {
            this.loadTransferInDept()
            message.tip('患者成功召回科室', 'warning')
        }).catch(err => {
            message.tip(err || '召回患者失败!', 'warning')
        })
    }
    /**
     * 查询员工
     */
    // loadStaffDict = (page?: Page, inputCode?: string) => {
    //     this.loadData('staffDict', page, inputCode)
    // }
    /**
     * 医生查询校验
     * @param v
     */
    doctorType = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadDoctor(v.value, { startIndex: v.pageCurrent, pageSize: v.pageSize })
                break
            }
            case 'enterEvent': {
                let deptDict = this.state.data
                deptDict.doctorInCharge = { id: v.data.key }
                this.dispatch({ data: deptDict })
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadDoctor(v.value, { startIndex: v.pageCurrent, pageSize: v.pageSize })
                break
            }
            default:
                break
        }
    }
    /**
     * 查询医生
     * @param {string} inputCode
     * @param {Page} page
     * @returns {Promise<void>}
     */
    loadDoctor = (inputCode?: string, page?: Page) => {
        const { data } = this.getState()
        let deptCode = data ? (data.areaId ? data.areaId.id : '') : ''
        if (page === undefined) {
            page = ({
                startIndex: 1,
                pageSize: 7
            })
        }
        return ApiDictData.loadDoctor(page, inputCode, deptCode).then((data) => {
            this.dispatch({ staffDict: data })
        }).catch((msg) => {
            message.tip('加载医生信息失败，请联系管理员', 'warning')
        })
    }
    /**
     * 护士查询校验
     * @param v
     */
    nurseType = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadNurse(v.value, { startIndex: v.pageCurrent, pageSize: v.pageSize })
                break
            }
            case 'enterEvent': {
                let deptDict = this.state.data
                deptDict.nurseInCharge = { id: v.data.key }
                this.dispatch({ data: deptDict })
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadNurse(v.value, { startIndex: v.pageCurrent, pageSize: v.pageSize })
                break
            }
            default:
                break
        }
    }
    /**
     * 查询护士
     * @returns {Promise<ArrayData<DataDictEntityDict> | void>}
     */
    loadNurse = (inputCode?: string, page?: Page) => {
        const { data } = this.getState()
        let deptCode = data ? (data.areaId ? data.areaId.id : '') : ''
        if (page === undefined) {
            page = ({
                startIndex: 1,
                pageSize: 7
            })
        }
        return ApiDictData.loadNurse(page, inputCode, deptCode).then((data) => {
            this.dispatch({ nurses: data })
        }).catch((msg) => {
            message.tip('加载护士信息失败，请联系管理员', 'warning')
        })
    }
    /**
     * 科室查询校验
     * @param v
     */
    inputTableType = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadData('deptDict', { startIndex: v.pageCurrent, pageSize: v.pageSize })
                break
            }
            case 'enterEvent': {
                let deptDict = this.state.data
                deptDict.deptCode = { id: v.data.key, deptName: v.data.value }
                this.dispatch({ data: deptDict, deptCode: v.data.key })
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadData('deptDict', { startIndex: v.pageCurrent, pageSize: v.pageSize })
                break
            }
            default:
                break
        }
    }
    /**
     * 科室信息查询
     * @returns {Promise<void>}
     */
    loadDiagnosisDict = (inputCode?: string, page?: Page) => {
        if (page === undefined) {
            page = ({
                startIndex: 1,
                pageSize: 7
            })
        }
        return ApiDictData.loadDeptDict(page, inputCode).then((deptDicts) => {
            this.dispatch({ deptDicts: deptDicts })
        }).catch((msg) => {
            message.tip('查询失败，请联系管理员', 'warning')
        })
    }
    /* =====分界线: 1.1、字典表查询: 开始===== */
    /**
     * 查询字典数据
     * @param dictCode 字典编码
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string) => {
        page = page ? page : { startIndex: 1, pageSize: 7 }
        return ApiDictInput.loadData(page, dictCode, inputCode).then((data) => {
            if (dictCode === 'hPatientStatusDict') {
                this.dispatch({ patientStatusDict: data })
            } else if (dictCode === 'hNursingClassDict') {
                this.dispatch({ nursingClassDict: data })
            } else if (dictCode === 'deptDict') {
                this.dispatch({ deptDicts: data })
            }
            this.setStateJson2(dictCode, data)
        }).catch(err => {
            message.tip(err || '查询字典数据失败!', 'warning')
        })
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data))
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 获取选中行数据
     * @param event
     */
    selectTheLine = (event) => {
        let id = loginService.state.user.id
        let data = this.state.data
        if (event.node.selected) {
            data.pvId = event.data
            data.operator = { id: id }
        }
        this.dispatch({ data: data })
    }
    /**
     * 根据输入的患者编号姓名查询
     * @param e
     */
    searchRecallPatients = (e) => {
        this.dispatch({ inputCode: e.target.value })
    }
    /**
     * 入科时间
     * @param value
     */
    dateChange = (value) => {
        let admWardDateTime = this.state.data
        admWardDateTime.admWardDateTime = value
        this.dispatch({ data: admWardDateTime })
    }
    starAndEndDate = (value) => {
        this.dispatch({ timeFrom: value[0], timeTo: value[1] })
    }
    /**
     * 页面刷新
     * @param params
     */
    onGridReady = (params) => {
        agApiParams = params
        agApiParams.api.sizeColumnsToFit()
    }
    /**
     * modal框取消按钮
     */
    onHideModal = () => {
        patInfoHeaderService.tabs('')
    }
}

export const transferInDeptService = new TransferInDeptService('transferInDept')
