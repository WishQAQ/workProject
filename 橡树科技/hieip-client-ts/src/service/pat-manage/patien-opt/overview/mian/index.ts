import {BaseService} from 'tools/flux/BaseService'
import {ApiPatManageOverview, ApiDictData, ArrayData, ApiPatManageAllergyHistory} from 'pkg/api'
import {
    DataDictEntityDict, DiagnosisEntityPatManageDiagnosis, MhPatientVisitEntitySplit,
    MhScoreRecordEntitySplit, MhTriageRecordEntitySplit, MhVitalSignRecordEntitySplit, OverviewEntityPatManageOverview,
    PatientAllergyHistoryModelDtoPatManageAllergy, TransferRecEntityPatManageTransfer, ShiftChangePatientLogEntityShift
} from 'pkg/entity'
import {JsonUtil} from 'tools/api/JsonUtil'
import {patientBasicService} from '../../patient-basic'
import {Page, PatientAllergyHistoryEntityPatManageAllergy} from '../../../../../packages/entity'
import {ApiDictInput} from '../../../../../packages/api'
import {message} from '../../../../../packages/common/message'
import {loginService} from 'service/user/login'

export interface OverviewServiceState {
    /**
     * 患者id
     */
    pvId?: number
    deptCode?: number // 患者科室
    /**
     * 患者概述信息
     */
    overview?: OverviewEntityPatManageOverview
    /**
     * 分诊-患者分诊信息记录
     */
    patientVisit?: MhPatientVisitEntitySplit

    /**
     * 分诊-分诊记录表
     */
    triageRecord?: MhTriageRecordEntitySplit

    /**
     * 分诊-生命体征记录表
     */
    vitalSignRecord?: MhVitalSignRecordEntitySplit[]

    /**
     *  分诊-评分记录表
     */
    scoreRecordList?: MhScoreRecordEntitySplit[]

    /**
     * 急诊患者诊断
     */
    diagnosisList?: DiagnosisEntityPatManageDiagnosis[]

    /**
     *   转科记录表实体
     */
    transferRecList?: TransferRecEntityPatManageTransfer[]

    /**
     * 交班信息
     */
    changePatientLog?: ShiftChangePatientLogEntityShift[]

    /**
     * 患者过敏药品史
     */
    patientAllergy?: PatientAllergyHistoryModelDtoPatManageAllergy[]

    allergy?: object
    /**
     * 操作行下标
     */
    rowIndex?: number
    /**
     * 状态
     */
    isStatus?: boolean

    open?: boolean

    openAllergy?: boolean

    field?: any

    operation?: boolean

    chargeTypeList?: DataDictEntityDict[]

    identityList?: DataDictEntityDict[]

    parameter?: Array<PatientAllergyHistoryEntityPatManageAllergy>

    allergySelect?: ArrayData<PatientAllergyHistoryEntityPatManageAllergy>   // 过敏史编辑查询
}

let allergyApi // 过敏史表格api

class OverviewService extends BaseService<OverviewServiceState> {
    agApi?: any
    defaultState = {
        pvId: null,
        deptCode: 230101,
        isStatus: false,
        open: false,
        openAllergy: false,
        field: {
            patientVisit: ' 分诊-患者分诊信息记录', triageRecord: ' 分诊-分诊记录表', vitalSignRecord: '分诊-生命体征记录表',
            scoreRecordList: '分诊-评分记录表', diagnosisList: '急诊患者诊断', transferRecList: '转科记录表实体',
            changePatientLog: '交班信息', patientAllergy: '患者过敏药品史'
        },
        allergy: {allergyMedicineNameallergyMedicineName: '过敏药物名称', serialNo: '序号'},
    }

    /**
     * 初始化加载
     */
    serviceWillMount() {
        this.dispatch2({pvId: patientBasicService.state.model.pvId})
        this.loadOverview()
        this.drugSelect()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 患者概述信息
     */
    loadOverview = () => {
        const {pvId} = this.state
        return ApiPatManageOverview.loadOverview(pvId).then(data => {
            this.setData(data)
        }).catch(err => {
            message.tip( err || '获取患者概述信息失败', 'error')
        })
    }

    /**
     * 根据患者信息id查询过敏药物信息
     */
    drugSelect = () => {
        const {pvId} = this.state
        return ApiPatManageAllergyHistory.select(pvId).then(data => {
            this.dispatch2({allergySelect: data})
            allergyApi.api.setRowData(data)
        }).catch(err => {
            message.tip( err || '获取患者概述信息失败1', 'error')
        })
    }

    /**
     * 编辑过敏史保存
     */
    drugSave = () => {
        let {allergySelect} = this.state
        ApiPatManageAllergyHistory.save(allergySelect).then(data => {
            this.drugSelect()
            message.tip('保存成功', 'success')
        }).catch(msg => message.tip(msg || '保存错误', 'error'))
    }
    /**
     * 公共设置data值
     * @param data
     */
    setData = (data) => {
        if (data) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.state[key] = data[key]
                }
            }
        }
        this.dispatch(this.state)
    }

    dict() {
        return ApiPatManageOverview.dict().then(data => {
            this.setData(data)
        }).catch(err => {
            message.tip( err || '获取患者信息修改需要的字典表信息失败', 'error')
        })
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */

    /**
     * 异常信息提醒
     */
    lifecycleByState(state: OverviewServiceState) {
        // if (state.errorMessage) this.dispatch({errorMessage: null}, 5000)
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data))
    }

    /**
     * 数组优化传值方法
     * @param data - 数据
     * @param path - 路径 不用拼写
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, data))
    }
    /* =====分界线: 二、前端处理: 结束===== */

    /**
     * 编辑信息事件弹框
     */
    editInfo = () => {
        this.dispatch({open: true})
        this.dict()
    }
    /**
     * 关闭弹框
     */
    handleClose = () => {
        this.dispatch({open: false})
    }

    /**
     * 打开编辑窗口
     */
    open = () => {
        this.dispatch({openAllergy: true})
    }

    /**
     * 关闭弹框
     */
    close = () => {
        this.dispatch({openAllergy: false})
    }

    /**
     * 新增过敏史
     */
    addMasterLine = () => {
        let {allergySelect, pvId} = this.state
        let record = loginService.state.user.name
        let userId = loginService.state.user.id
        let areaName = patientBasicService.state.model.areaName
        let areaId = patientBasicService.state.model.areaId
        if (allergySelect.length <= 20) {
            allergySelect.push({
                pvId: pvId, // 病人id
                recorder: userId, // 操作者id
                recorderName: record, // 操作者姓名
                areaName: areaName, // 区域名
                areaId: areaId, // 区域id
            })
            this.agApi.api.setRowData(allergySelect)   // 刷新表格
            this.agApi.api.ensureIndexVisible(allergySelect.length - 1)   // 控制滚动条
            this.agApi.api.startEditingCell({rowIndex: allergySelect.length - 1, colKey: 'allergyMedicineName'}) // 控制滚动条同时自动加载table
            this.dispatch2({allergySelect})
        }
    }
    /**
     * 过敏史弹框表格API
     */
    onGridReady = (params) => {
        this.agApi = params
    }
    /**
     * 过敏史表格API
     */
    onGridReadyAllergy = (params) => {
        allergyApi = params
    }

    /**
     * 保存数据的方法
     */
    // save = () => {
    //     let stopEditingWhenGridLosesFocus = this.defaultState
    //     this.dispatch2({stopEditingWhenGridLosesFocus: false})
    //     console.log(1)
    // }

    /**
     * 删除一行的数据的方法
     */
    logicDelete = () => {
        let {rowIndex, allergySelect} = this.state
        allergySelect.splice(rowIndex, 1)
        this.dispatch2({allergySelect})
        this.agApi.api.setRowData(allergySelect)
        this.loadOverview()
    }

    /**
     * 获取患者列表中某一行数据
     */
    showCurRow = (record) => {
        this.dispatch({rowIndex: record.rowIndex})
    }

    /**
     * 查询字典数据
     * @param dictCode 字典编码
     * @param {Page} page 分页
     * @param {string} inputCode 输入码
     * @param {string} params 参数
     * @returns {Promise<any>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string, params?: string) => {
        page = page ? page : {startIndex: 1, pageSize: 7}
        return ApiDictInput.loadData(page, dictCode, inputCode, params).then((data) => {
            return data
        }).catch(msg => message.tip(msg || '查询字典数据失败!'))
    }

    /**
     * 查询字典数据列
     * @param dictCode 字典编码
     * @returns {Promise<void>}
     */
    loadColumns = (dictCode) => {
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            return data
        }).catch(err => {
            message.tip(err.msg || '查询字典数据列失败!', 'warning')
        })
    }

    /**
     * inputTable事件判断
     */
    inputTableDevelop = (view, callback) => {
        let {allergySelect} = this.state
        let rowIndex = view.props.rowIndex
        switch (view.type) {
            case 'pageEvent':
                this.loadData('alergyDrugsDict', {startIndex: view.pageCurrent, pageSize: view.pageSize}).then(data => {
                    callback(data)
                })
                break
            case 'changeEvent':
                this.loadData('alergyDrugsDict', null, view.value).then(data => {
                    callback(data)
                })
                break
            case 'enterEvent':
                this.loadData('alergyDrugsDict').then(data => {
                    callback(data)
                })
                let data = allergySelect[rowIndex]
                data.allergyMedicineName = view.value
                data.allergyMedicineCode = view.data.key
                this.setStateJson2(data, 'allergySelect', rowIndex)
                this.agTabUpdate(allergySelect, rowIndex, ['allergyMedicineCode'], this.agApi.api)
                break
            default:
                this.loadData('alergyDrugsDict').then(data => {
                    callback(data)
                })
                break
        }
    }

    /**
     * 表格值变化触发事件
     * @param params - 表格参数
     */
    cellValueChange = (params) => {
        let rowNode = this.agApi.api.getRowNode(params.node.id) // 更改行id
    }

    /**
     * ag表格更新行数据
     * @param modelList 表格数据数组
     * @param rowIndex 当前行索引
     * @param {Array<any>} others 更新值
     */
    agTabUpdate(modelList, rowIndex, others?: Array<any>, api?: any) {
        let dataList = []
        api = api ? api : this.agApi.api
        api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                others.forEach((v) => {
                    data[v] = modelList[rowIndex][v]
                })
                dataList.push(data)
            }
        })
        api.updateRowData({update: dataList})
    }

}

export const overviewService = new OverviewService('overview')
