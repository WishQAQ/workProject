import { BaseService } from 'tools/flux/BaseService'
import { ApiDictData, ApiSplitMhPatientVisit } from 'pkg/api'
import { DataDictEntityDict, TriagePatsViewEntitySplit } from 'pkg/entity'
import { patientConenteService } from 'service/triage/patient-list/patient-conente'
import { JsonUtil } from 'tools/api/JsonUtil'
import { ApiDictInput, ArrayData } from '../../../../packages/api'
import { Page } from '../../../../packages/entity'
import { message } from '../../../../packages/common/message'

export interface ApiDictState {
    /**
     * 字典表模糊查询的值
     */
    criterionMainId?: string
    /**
     * 判定主诉信息
     */
    criterionMainIdList?: DataDictEntityDict[]
    /**
     * 费用
     */
    chargeType?: string

    chargeTypeList?: DataDictEntityDict[]

    /**
     * 身份
     */
    identity?: string
    identityList?: DataDictEntityDict[]
    /**
     * 去向
     */
    triageTarget?: string
    triageTargetList?: DataDictEntityDict[]

    /**
     * 判定依据项目
     */
    triageGist?: string
    triageGistList?: DataDictEntityDict[]
    /**
     * 绿色通道
     */
    greenRoad?: string
    greenRoadList?: DataDictEntityDict[]

    /**
     * 异常信息提示
     */
    errorMessage?: string

    /**
     * 状态
     */
    isStatus?: boolean
    /**
     * 分页: 开始行数
     */
    startIndex?: number
    /**
     * 分页: 分页数
     */
    pageSize?: number
    /**
     * 分诊患者信息
     */
    model?: TriagePatsViewEntitySplit

    /**
     * 返回的新分诊的患者信息
     */
    triagePatsViewEntitySplit?: TriagePatsViewEntitySplit[]

    /**
     * 查询群伤事件的开始时间
     */
    happenDateStart?: Date

    /**
     * 查询群伤事件的结束时间
     */
    happenDateEnd?: Date

    /**
     * 员工列
     */
    staffDictColumns?: Array<any>
    /**
     * 员工数据
     */
    staffDict?: ArrayData<any>
}

class PatientHeadService extends BaseService<ApiDictState> {
    defaultState = {
        startIndex: 1,
        pageSize: 100,
        model: <TriagePatsViewEntitySplit>{},
        staffDictColumns: [],
        staffDict: <ArrayData<any>><any>[]
    }

    lifecycleByState(state: ApiDictState) {
        if (state.errorMessage) this.dispatch({ errorMessage: null }, 5000)
    }

    /* =====分界线: 一、后台处理: 开始===== */
    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */
    /**
     * 加载service加载的数据
     */
    serviceWillMount() {
        this.loadStaffDictColumns()
        this.dict()
        this.loadStaffDict()
    }

    /**
     * 字典表
     */
    dict = () => {
        return ApiSplitMhPatientVisit.dict().then(data => {
            if (data) {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key] = JsonUtil.copyProps(data[key], 'value', 'key')
                    }
                }
            }
            this.dispatch(this.state)
        }).catch(err => {
            message.tip(err || '获取绿色通道信息失败！', 'error')
        })
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
            message.tip(err.msg || '查询字典数据列失败!', 'warning')
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
            this.setStateJson2(dictCode, data)
        }).catch(err => {
            message.tip(err.msg || '查询字典数据失败!', 'warning')
        })
    }

    /**
     * 查询员工
     */
    loadStaffDictColumns = () => {
        this.loadColumns('staffDict')
    }
    /**
     * 查询员工
     */
    loadStaffDict = (page?: Page, inputCode?: string) => {
        this.loadData('staffDict', page, inputCode)
    }

    /**
     * 判定主诉
     */
    loadMhCriterionMainDict = () => {
        const { criterionMainId, startIndex, pageSize } = this.getState()
        return ApiDictData.loadMhCriterionMainDict(criterionMainId, startIndex, pageSize).then(data => {
            this.dispatch({ criterionMainIdList: data, isStatus: true })
        }).catch(err => {
            message.tip(err || '获取判定主诉信息失败！', 'error')
        })
    }

    /**
     * 判定依据项目
     */
    loadMhCriterionItemDict = () => {
        const { triageGist, startIndex, pageSize } = this.getState()
        return ApiDictData.loadMhCriterionItemDict(triageGist, startIndex, pageSize).then(data => {
            this.dispatch({ triageGistList: data, isStatus: true })
        }).catch(err => {
            message.tip(err || '获取判定依据项目失败！', 'error')
        })
    }

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 获取患者列表信息
     */
    loadTriagePatsView = () => {
        let { model, startIndex, pageSize } = this.getState()
        return ApiSplitMhPatientVisit.loadTriagePatsView(model, startIndex, pageSize).then(data => {
            patientConenteService.set(data)
            this.dispatch2({ happenDateEnd: null, happenDateStart: null })
        }).catch(err => {
            message.tip(err || '获取患者列表信息失败！', 'error')
        })
    }

    /** 设置请求参数 */
    statePatsView = (startIndex?: number) => {
        let { model, pageSize } = this.getState()
        return new Promise((resolve) => {
            return ApiSplitMhPatientVisit.loadTriagePatsView(model, startIndex, pageSize).then(data => {
                resolve(data)
            }).catch(err => {
                message.tip(err || '获取患者列表信息失败！', 'error')
            })
        })
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 清空按钮的点击事件
     */
    onchange = () => {
        this.dispatch2({ model: <TriagePatsViewEntitySplit>{} })
    }

    /**
     * 时间赋值
     */
    onChange = (v) => {
        this.dispatch({
            happenDateStart: v[0],
            happenDateEnd: v[1]
        })
    }

    /**
     * 时间赋值
     */
    onChangeTime = (v) => {
        this.dispatch({ model: { triageDateStart: v[0], triageDateEnd: v[1] } })
    }

    /**
     * 设置值: 公共对外值改变1
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data ? data : ''))
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const patientHeadService = new PatientHeadService('patientHead')