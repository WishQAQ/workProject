import {BaseService} from 'tools/flux/BaseService'
import {DiagnosisModelDtoPatient, Page} from 'pkg/entity/medical'
import {message} from 'pkg/common/message'
import {ApiDictInput, ApiPatientMrMedicalHome} from 'pkg/api/medical'
import {basicService} from '../basic/index'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface DiagnosisState {
    /* ---界面所需变量--------------------*/
    addVisible?: boolean,
    /*诊断阶段字典*/
    diagStage?: Array<any>,
    /*诊断类型字典*/
    diagType?: Array<any>,
    /*checkbox选中状态*/
    checkboxStatus?: boolean,
    /* 诊断类别 1：西医, 0:中医 */
    diagnosisFlag?: Array<any>,

    /*----service所需变量-------------------*/
    /*诊断左页面单模型,仅用于展示所有的诊断类型*/
    diagnosisLeft?: DiagnosisModelDtoPatient,
    /*诊断单模型*/
    diagnosisEntity?: DiagnosisModelDtoPatient,
    /*诊断多模型*/
    diagnosisEntities?: Array<DiagnosisModelDtoPatient>,
    /*缓存后台数据*/
    diagMap?: {},
    /*诊断类型的数据条数*/
    diagTypeCount?: {}
    agTableIndex?: number,
    /*是否点击过agTable*/
    isAgClick?: boolean,
    /** input 模糊查询组件的表编码 */
    dictCode?: string,
    /** input 模糊查询组件的分页 */
    inputPage?: Page,
    /** input 模糊查询组件的 模糊查询值 */
    inputCode?: string,
    /* 是否已有主诊断 */
    isMainDiag?: boolean,

    /* 单个主诊断判断使用 */
    diagnosisMainDiagIndex?: number
    diagMapIndex?: string

    /* 诊断序号*/
    diagNo?: string,
    /* 子诊断序号*/
    diagSubNo?: number,
}

/**
 * 李潇潇
 * 病案首页--诊断Service
 */
class DiagnosisService extends BaseService<DiagnosisState> {
    /*诊断api*/
    diagnosisApi?: any
    defaultState = {
        addVisible: false,
        agTableIndex: 0,
        isAgClick: false,
        checkboxStatus: false,
        diagnosisLeft: {},
        diagnosisSubNo: 0,
        diagSubNo: 0,
        inputPage: {
            startIndex: 1,
            pageSize: 7
        },
        saveDiagnosis: {
            diagnosisType: '',
            diagnosis: []
        },
        isMainDiag: false,
        dictCode: 'diagnosisProject',
        diagnosisEntity: {},
        diagnosisEntities: [],
        diagType: [
            {code: '0', inputCode: 'QT', value: '其他'},
            {code: '1', inputCode: 'ZYZD', value: '中医诊断'},
            {code: '2', inputCode: 'XYZD', value: '西医诊断'}
        ]
    }

    /*---------------------页面方法  BEGIN----------------------*/
    /**
     * 获取agTable api
     */
    onGridReady = (api) => {
        this.diagnosisApi = api
    }
    /**
     * 单击表格某一行 获取该行下标和改行数据
     * @param e
     */
    handlerRowClicked = (e) => {
        this.dispatch({agTableIndex: e.rowIndex, diagnosisEntity: e.data, isAgClick: true})
    }
    /*---------------------页面方法   END----------------------*/

    /*---------------------service方法  BEGIN----------------------*/

    /*页面预加载,指定病人的所有诊断信息,用于更新后的保存*/
    loadDiagnosis = (pId?, vId?) => {
        this.dispatch2({diagMap: {}, diagnosisEntities: []})

        let patientId = pId ? pId : basicService.state.patientId
        let visitId = vId ? vId : basicService.state.visitId
        ApiPatientMrMedicalHome.findDiagnosisByPatientId(patientId, visitId).then(data => {
            let map = {}
            let countMap = {}
            data.forEach((model) => {
                let type = model.diagnosisType
                let data = map[type]
                if (!data) data = []
                data.push(model)
                map[type] = data

                let typeData = countMap[type]
                if (!typeData) typeData = 0
                typeData++
                countMap[type] = typeData

                if (model && (model.isMainDiagnosis === '1')) {
                    this.dispatch({diagnosisMainDiagIndex: data.length - 1, diagMapIndex: type})
                }
            })
            this.dispatch2({diagMap: map, diagTypeCount: countMap})
        }).catch(err => {
            message.tip(err || '加载失败', 'error', 'center')
        })
    }

    /**
     * 获取诊断类别的信息
     */
    getDiagType = (item) => {
        this.dispatch({diagnosisLeft: item})
        //  点击查询前将缓存诊断信息的集合清空
        this.dispatch2({diagnosisEntities: []})
        this.findDiagnosisByPatientId()
    }
    /**
     * 点击其他诊断类型或直接保存时调用为diagMap赋值的方法
     */
    diagMapSetData = () => {
        // 点击前保存原来更新的诊断信息
        const {diagnosisLeft, diagMap, diagnosisEntities} = this.state
        if (diagnosisLeft) diagMap[diagnosisLeft.diagnosisCode] = diagnosisEntities
        this.dispatch2({diagMap})
    }
    /**
     * 根据患者id和住院标识和诊断类型重新查询患者的诊断信息
     */
    findDiagnosisByPatientId = () => {
        const {diagnosisLeft, diagMap} = this.state
        let newDiagMap = diagMap[diagnosisLeft.diagnosisCode]
        if (!newDiagMap) newDiagMap = []
        if (newDiagMap && newDiagMap.length !== 0) {
            newDiagMap.forEach(model => {
                model.diagnosisTypeName = diagnosisLeft.diagnosisTypeName
            })
        }
        let i = 0
        newDiagMap.forEach(val => {
            if (!val.diagnosisSubNo || val.diagnosisSubNo !== 0)
                i += 1
        })
        this.dispatch2({diagnosisEntities: newDiagMap, diagnosisEntity: {}, diagNo: i.toString()})
        this.diagnosisApi.api.setRowData(newDiagMap)
    }
    /**
     * 添加一行诊断信息
     */
    addDiagEntity = () => {
        // 诊断详细信息，用于页面的添加删除
        const {diagnosisEntities, diagnosisLeft, diagNo, diagMap, diagTypeCount} = this.state
        let no = Number(diagNo) + 1

        if (!diagnosisLeft || '{}' === JSON.stringify(diagnosisLeft)) {
            message.tip('请选择需要添加的诊断类别', 'warning', 'center')
            return
        }

        diagnosisEntities.push(<DiagnosisModelDtoPatient>{
            type: 'insert',
            diagnosisNo: no,
            diagnosisDate: new Date(),
            diagnosisType: diagnosisLeft.diagnosisCode,// 诊断类别
            diagnosisTypeName: diagnosisLeft.diagnosisTypeName,// 诊断类别
        })
        if (diagTypeCount[diagnosisLeft.diagnosisCode])
            diagTypeCount[diagnosisLeft.diagnosisCode]++
        else diagTypeCount[diagnosisLeft.diagnosisCode] = 1

        this.diagnosisApi.api.setRowData(diagnosisEntities)
        // 聚焦到新增的那行的第一个元素
        this.diagnosisApi.api.startEditingCell({
            rowIndex: diagnosisEntities.length - 1,
            colKey: 'diagnosisFlagDesc'// 新增时聚焦的字段
        })

        diagMap[diagnosisLeft.diagnosisCode] = diagnosisEntities
        this.dispatch2({diagNo: no.toString(), diagnosisEntities, diagMap, diagTypeCount})
    }
    /**
     * 添加一行子诊断信息
     */
    addDiagChildEntity = () => {
        // 诊断详细信息，用于页面的添加删除
        const {diagnosisEntities, diagnosisEntity, diagnosisLeft, diagMap, diagNo, diagTypeCount} = this.state
        if (!diagnosisEntity || '{}' === JSON.stringify(diagnosisEntity) || diagnosisEntity === null) {
            message.tip('请选择需要添加子诊断的诊断', 'warning', 'center')
            return
        }
        diagnosisEntities.push(<DiagnosisModelDtoPatient>{
            type: 'insert',
            diagnosisDate: new Date(),
            diagnosisNo: diagnosisEntity.diagnosisNo,
            diagnosisSubNo: Number(diagNo),
            diagnosisFlagDesc: diagnosisEntity.diagnosisFlagDesc,
            diagnosisFlag: diagnosisEntity.diagnosisFlag,
            otherTypeName: diagnosisEntity.otherTypeName,// 诊断阶段名称
            diagnosisTypeName: diagnosisEntity.diagnosisTypeName,// 诊断名称
            diagnosisType: diagnosisEntity.diagnosisType,// 诊断类型
            diagnosisOtherType: diagnosisEntity.diagnosisOtherType // 诊断阶段代码
        })

        if (diagTypeCount[diagnosisLeft.diagnosisCode])
            diagTypeCount[diagnosisLeft.diagnosisCode]++
        else diagTypeCount[diagnosisLeft.diagnosisCode] = 1

        this.diagnosisApi.api.setRowData(diagnosisEntities)
        // 聚焦到新增的那行的第一个元素
        this.diagnosisApi.api.startEditingCell({
            rowIndex: diagnosisEntities.length - 1,
            colKey: 'diagnosisDesc'// 新增时聚焦的字段
        })
        diagMap[diagnosisLeft.diagnosisCode] = diagnosisEntities
        this.dispatch2({diagnosisEntities, diagMap, diagTypeCount})
    }
    /**
     * 删除一行诊断信息
     */
    delDiagEntity = () => {
        let {diagnosisEntities, agTableIndex, isAgClick, diagnosisLeft, diagMap, diagTypeCount} = this.state
        if (!isAgClick) {
            message.tip('请选择需要删除的诊断信息', 'warning', 'center')
            return
        }
        diagnosisEntities.splice(agTableIndex, 1)
        diagMap[diagnosisLeft.diagnosisCode] = diagnosisEntities

        if (diagTypeCount[diagnosisLeft.diagnosisCode])
            diagTypeCount[diagnosisLeft.diagnosisCode] -= 1
        else diagTypeCount[diagnosisLeft.diagnosisCode] = 0

        this.dispatch2({diagnosisEntities, diagTypeCount, isAgClick: false})
        this.diagnosisApi.api.setRowData(diagnosisEntities)
    }
    /**
     * 诊断类型下拉框取值
     * @param v
     */
    diagnosisTypeSelect = (v) => {
        const {agTableIndex} = this.state
        let list = this.state.diagnosisEntities
        list[agTableIndex].diagnosisFlag = v.code
        list[agTableIndex].diagnosisFlagDesc = v.value
        this.dispatch2({diagnosisEntities: list})
    }
    /**
     * 诊断阶段下拉框取值
     * @param v
     */
    diagnosisOtherTypeSelect = (v) => {
        const {agTableIndex} = this.state
        let list = this.state.diagnosisEntities
        list[agTableIndex].diagnosisOtherType = v.code
        this.dispatch2({diagnosisEntities: list})
    }
    /**
     * 入院病情下拉框取值
     * @param v
     */
    admissionConditionsSelect = (v) => {
        const {agTableIndex} = this.state
        let list = this.state.diagnosisEntities
        list[agTableIndex].operTreatIndicator1 = v.code
        this.dispatch2({diagnosisEntities: list})
    }
    /**
     * 出院情况下拉框取值
     * @param v
     */
    dischargeConditionsSelect = (v) => {
        const {agTableIndex} = this.state
        let list = this.state.diagnosisEntities
        list[agTableIndex].treatResult1 = v.code
        this.dispatch2({diagnosisEntities: list})
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, data))
    }
    /**
     * 主诊断设置值: 只能有一个被选中
     */
    mainDiagSetData = (path, data, rowIndex) => {
        const {diagMap} = this.state

        if (path === 'diagnosisEntities.isMainDiagnosis' && (data === '1' || data === 1)) {
            const {diagnosisLeft, diagnosisMainDiagIndex, diagMapIndex, diagnosisEntities} = this.state
            if (typeof(diagnosisMainDiagIndex) === 'number') {
                if (diagnosisLeft.diagnosisCode === diagMapIndex) {
                    diagnosisEntities[diagnosisMainDiagIndex].isMainDiagnosis = '0'
                } else {
                    diagMap[diagMapIndex][diagnosisMainDiagIndex].isMainDiagnosis = '0'
                }

                if (diagnosisMainDiagIndex + 1 >= diagMap[diagnosisLeft.diagnosisCode].length)
                    diagMap[diagnosisLeft.diagnosisCode][diagnosisMainDiagIndex].isMainDiagnosis = '0'

                diagnosisEntities[diagnosisMainDiagIndex].isMainDiagnosis = '0'
                this.dispatch2({diagMap, diagnosisMainDiagIndex: rowIndex, diagMapIndex: diagnosisLeft.diagnosisCode})
            } else {
                this.dispatch2({diagnosisMainDiagIndex: rowIndex, diagMapIndex: diagnosisLeft.diagnosisCode})
            }
        } else {
            this.dispatch2({diagnosisMainDiagIndex: null, diagMapIndex: null})
        }

        let keys = path.split('.')
        if (keys.length === 2) path = keys[0] + '.' + rowIndex + '.' + keys[1]
        else return
        this.dispatch(JsonUtil.json(path, this.state, data))
        this.diagnosisApi.api.setRowData(this.state.diagnosisEntities)
    }
    /**
     * 查询input 模糊查询组件的tltle
     */
    loadColumns = () => {
        let {dictCode} = this.state
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败!', 'error', 'center')
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData = () => {
        let {dictCode, inputPage, inputCode} = this.state
        return ApiDictInput.loadData(inputPage, dictCode, inputCode).then((data) => {
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * inputTable 组件的方法
     */
    showMessage = (v, calback) => {
        switch (v.type) {
            case 'pageEvent':
            case 'changeEvent': {
                this.dispatch2({inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent}, inputCode: v.value})
                this.loadData().then(data => {
                    calback(data)
                })
                break
            }
            case 'enterEvent': {
                let {agTableIndex} = this.state
                this.dispatch(JsonUtil.json('diagnosisEntities.' + agTableIndex + '.diagnosisCode', this.state, v.data.diagnosisCode))
                this.dispatch(JsonUtil.json('diagnosisEntities.' + agTableIndex + '.diagnosisDesc', this.state, v.data.diagnosisName))
                break
            }
            case 'clickEvent': {
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })
                this.loadColumns()
                this.loadData()
                break
            }
            default:
                this.loadData().then(data => {
                    calback(data)
                })
        }
    }

    /*---------------------service方法   END----------------------*/
}

export const diagnosisService = new DiagnosisService('diagnosis')