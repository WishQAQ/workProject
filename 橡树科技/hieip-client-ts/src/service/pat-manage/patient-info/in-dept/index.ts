import { BaseService } from 'tools/flux/BaseService'
import { ApiDictData, ApiPatManageTransferRec } from 'pkg/api'
import { BedDictEntityPatManageTransferDict, DataDictEntityDict as DataDict, MhPatientVisitEntitySplit, Page } from 'pkg/entity'
import { message } from 'pkg/common/message'
import { JsonUtil } from 'tools/api/JsonUtil'
import { ApiDictInput, ArrayData } from '../../../../packages/api'
import { DeptDictEntityUser, PatInHouseEntityPatManageTransfer, UserEntityUser } from '../../../../packages/entity'
import { patInfoHeaderService } from '../header'
import { loginService } from '../../../user/login'

/**
 * ag表格api
 */
let agApi

/*
 * 字典表
 */
export interface Dict {
    /*
     * 急诊病情状态
     */
    patientStatusDict?: DataDict[]
    /*
     * 医生信息
     */
    doctor?: DataDict[]
    /*
     * 急诊护理等级
     */
    nursingClassDict?: DataDict[]
    /**
     * 员工列
     */
    staffDictColumns?: Array<any>

    /**
     * 员工数据
     */
    staffDict?: ArrayData<any>
    /**
     * 床号数据
     */
    hVdBedDict?: ArrayData<any>
}

export interface InDeptState extends Dict {
    /*
     * 床位信息
     */
    bedDict?: Array<BedDictEntityPatManageTransferDict>
    /*
     * 可入科患者信息
     */
    mhPatientVisit?: Array<MhPatientVisitEntitySplit>,
    /*
   * 可入科患者信息
   */
    mhPvList?: Array<MhPatientVisitEntitySplit>
    /**
     * 弹出框
     */
    modals?: string
    /**
     * 分页
     */
    page?: Page
    /**
     * 开始时间
     */
    timeFrom?: Date
    /**
     * 结束时间
     */
    timeTo?: Date
    /**
     * 输入码
     */
    inputCode?: string,
    /**
     * 入科model
     */
    model?: PatInHouseEntityPatManageTransfer
    // 床号信息
    hVdBedDictColumns?: Array<any>
    // 科室
    deptDicts?: ArrayData<DeptDictEntityUser>
    /**
     * 获取科室id查询护士
     */
    deptCode?: number
    /**
     * 护士
     */
    nurses?: ArrayData<UserEntityUser>
}

class InDeptService extends BaseService<InDeptState> {
    defaultState = {
        /*
         * 床位信息
         */
        bedDict: [],
        /*
         * 可入科患者信息
         */
        mhPatientVisit: [],
        /*
         * 急诊病情状态
         */
        patientStatusDict: [],
        /*
         * 医生信息
         */
        doctor: [],
        /*
         * 急诊护理等级
         */
        nursingClassDict: [],
        /**
         * 可入科患者信息
         */
        mhPvList: [],
        /**
         * 弹出框
         */
        modals: '',
        /**
         * 员工列
         */
        staffDictColumns: [],
        hVdBedDictColumns: [], // 床号信息
        /**
         * 员工数据
         */
        staffDict: <ArrayData<any>><any>[],
        /**
         * 床号数据
         */
        hVdBedDict: <ArrayData<any>><any>[],
        /**
         * 入科model
         */
        model: {}
    }

    /**
     * 加载service加载的数据
     */
    serviceWillMount() {
        // this.loadColumns('hVdBedDict')
        // this.loadStaffDictColumns()
        // this.loadStaffDict()
        //  this.loadNursingClassDict()
        this.loadInDept()     // 查询待入科患者
        //  this.loadDiagnosisDict() // 查询科室
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
    /**
     * 页面刷新
     * @param params
     */
    onGridReady = (params) => {
        agApi = params
        agApi.api.sizeColumnsToFit()
    }
    /**
     * 查询字典数据列
     * @param dictCode
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @returns {Promise<void>}
     */
    loadColumns = (dictCode) => {
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            this.setStateJson2(dictCode + 'Columns', data)
        }).catch(err => {
            message.tip(err || '查询字典数据列失败!', 'warning')
        })
    }
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
                let deptDict = this.state.model
                deptDict.doctorInCharge = { id: v.data.key }
                this.dispatch({ model: deptDict })
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
    /*
     * 医生信息
     */
    loadDoctor = (inputCode?: string, page?: Page) => {
        const { model } = this.getState()
        let deptCode = model ? (model.areaId ? model.areaId.id : '') : ''
        if (page === undefined) {
            page = ({
                startIndex: 1,
                pageSize: 7
            })
        }
        return ApiDictData.loadDoctor(page, inputCode, deptCode).then((data) => {
            this.dispatch2({ staffDict: data })
        }).catch((msg) => {
            message.tip('加载医生信息失败，请联系管理员', 'warning')
        })
    }
    /*
     * 急诊护理等级
     */
    loadNursingClassDict = (page?: Page, inputCode?: string) => {
        this.loadData('hNursingClassDict', page, inputCode)
    }
    /*
     * 床位信息
     */
    loadBedDict = (page, inputCode, status, areaId) => {
        return ApiPatManageTransferRec.loadBedDict(page, inputCode, status, areaId).then((data) => {
            message.tip('查询床位信息成功!', 'success')
            this.dispatch({ bedDict: data })
        }).catch(err => {
            message.tip(err || '查询床位信息失败!', 'warning')
        })
    }
    /*
     * 可入科患者信息
     */
    loadInDept = () => {
        const { page, timeFrom, timeTo, inputCode } = this.state
        return ApiPatManageTransferRec.loadInDept(page, timeFrom, timeTo, inputCode).then((data) => {
            this.dispatch({ mhPvList: data })
            if(agApi) agApi.api.setRowData(data)
        }).catch(err => {
            message.tip(err || '查询可入科患者信息失败!', 'warning')
        })
    }
    /*
     * 入科
     */
    inDept = () => {
        const { model } = this.state
        return ApiPatManageTransferRec.inDept(model).then((data) => {
            this.loadInDept()
            message.tip('入科成功', 'success')
        }).catch(err => {
            message.tip(err || '入科失败!', 'warning')
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
     * modal框取消按钮
     */
    onHideModal = () => {
        patInfoHeaderService.tabs('')
    }
    /**
     * 获取选中行数据
     * @param event
     */
    selectTheLine = (event) => {
        let id = loginService.state.user.id
        let data = this.state.model
        if (event.node.selected) {
            data.pvId = event.data
            data.operator = { id: id }
        }
        this.dispatch({ model: data })
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
                let deptDict = this.state.model
                deptDict.deptCode = { id: v.data.key, deptName: v.data.value }
                this.dispatch({ model: deptDict, deptCode: v.data.key })
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
    // loadDiagnosisDict = (inputCode?: string, page?: Page) => {
    //     if (page === undefined) {
    //         page = ({
    //             startIndex: 1,
    //             pageSize: 7
    //         })
    //     }
    //     return ApiDictData.loadDeptDict(page, inputCode).then((deptDicts) => {
    //         this.dispatch({deptDicts: deptDicts})
    //     }).catch((msg) => {
    //         message.tip('查询失败，请联系管理员', 'warning')
    //     })
    // }
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
                let deptDict = this.state.model
                deptDict.nurseInCharge = { id: v.data.key }
                this.dispatch({ model: deptDict, deptCode: v.data.key })
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
        const { deptCode } = this.getState()
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
     * 入科时间
     * @param value
     */
    dateChange = (value) => {
        let admWardDateTime = this.state.model
        admWardDateTime.admWardDateTime = value
        this.dispatch({ model: admWardDateTime })
    }

}

export const inDeptService = new InDeptService('inDept')
