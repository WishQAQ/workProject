/**
 * 字典表
 */

import {BaseService} from 'tools/flux/BaseService'
import {ApiDictData, ApiPatManageDiagnosis, ArrayData} from 'pkg/api'
import {DataDictEntityDict, DiagnosisEntityPatManageDiagnosis, DiagnosisTypeDictEntityPatManageDiagnosis, UserEntityUser} from 'pkg/entity'
import {message} from 'pkg/common/message'
import {loginService} from '../../../user/login'
import {patientBasicService} from '../patient-basic'
import {JsonUtil} from '../../../../tools/api/JsonUtil'
import {Page} from '../../../../packages/entity'
import {ApiDictInput} from '../../../../packages/api'

/**
 * 急诊诊断
 */
export interface DiagnosisEntityState {
    data?: ArrayData<DiagnosisEntityPatManageDiagnosis> // 患者诊断数组
    errorMessage?: string // 错误消息
    pvId?: number // 患者ID
    diagnosisType?: DiagnosisTypeDictEntityPatManageDiagnosis  // 诊断类型
    diagnosisNo?: number // 诊断序号
    diagnosisCode?: string // 诊断编号
    diagnosisDesc?: string// 诊断
    diagnosisDate?: Date // 诊断日期
    isDel?: number// 删除标示,0:正常、1未删除
    diagnosisFlag?: number// 中西医诊断,1:中医,0 西医
    isMainDiagnosis?: number// 是否是主要诊断1:是 0:否
    hospitalInfection?: number// 是否是院内感染 1:是,0:否
    contagiousInfection?: number// 传染病感染:1:是 0;否
    selectRow?: DiagnosisEntityPatManageDiagnosis // 诊断对象
    dataModel?: DataDictEntityDict[]  // 诊断类型
    diagnosisName?: DataDictEntityDict[] // 诊断名称编码
    commonlyDiagnosis?: DataDictEntityDict[] // 常用诊断
    model?: DataDictEntityDict  // 常用诊断
    index?: number // 获取选中行的坐标
    inpuCode?: string // 诊断名称输入码
    tableColWidth?: number
    /**
     * 表格数据input框选中行
     */
    modelListSelectRow?: Array<any>
}

class DiagnosisEntityService extends BaseService<DiagnosisEntityState> {
    params?: any // ag表格
    defaultState = {
        data: <ArrayData<DiagnosisEntityPatManageDiagnosis>><any>[],
        selectRow: <DiagnosisEntityPatManageDiagnosis>{},
        diagnosisDate: new Date(),
        model: <DataDictEntityDict>{},
        commonlyDiagnosis: [],
        diagnosisType: <DiagnosisTypeDictEntityPatManageDiagnosis>{},
        /**
         * 表格数据input框选中行
         */
        modelListSelectRow: []
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        this.findByPvId()  // 查询患者诊断
        this.loadTempSave() // 获取常用诊断
        this.loadDiagnosisTypeDict() // 查询诊断类型
    }

    /**
     * 根据患者id查询患者诊断
     * @returns {Promise<void>}
     */
    findByPvId = () => {
        let pvId = patientBasicService.state.model.pvId // 患者id
        return ApiPatManageDiagnosis.findByPvId(pvId).then((data: any) => {
            data.map((e, i) => {
                switch (data[i].diagnosisFlag) {
                    case 0:
                        data[i].diagnosisFlags = '西医诊断'
                        break
                    case 1:
                        data[i].diagnosisFlags = '中医诊断'
                        break
                    default:
                        break
                }
            })
            this.dispatch2({data: data})
            this.params.api.setRowData(data)
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    /**
     * 保存诊断信息
     */
    save = () => {
        const {data} = this.state
        let pvId = patientBasicService.state.model.pvId
        for (let i = 0; i < data.length; i++) {
            let model = data[i]
            if (!model.diagnosisType) {
                message.tip('诊断类型不能为空', 'warning')
                return
            } else if (!model.diagnosisDesc || model.diagnosisDesc.length === 0) {
                message.tip('诊断名称不能为空', 'warning')
                return
            } else if (!model.diagnosisCode || model.diagnosisCode.length === 0) {
                message.tip('诊断代码不能为空', 'warning')
                return
            } else if (!model.doctor || (!model.doctor.id && model.doctor.id !== 0)) {
                message.tip('诊断医生不能为空', 'warning')
                return
            } else if (!model.diagnosisDate) {
                message.tip('诊断时间不能为空', 'warning')
                return
            }
        }
        // console.log(data)
        return ApiPatManageDiagnosis.save(data, pvId).then((data) => {
            this.findByPvId()
            message.tip(data || '保存成功', 'success')
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    // 页面增加一行
    increase = () => {
        let list = this.state.data
        let doctor = {id: loginService.state.user.id, name: loginService.state.user.name}
        list.push({
            diagnosisType: null,
            diagnosisFlag: null,
            diagnosisNo: list.length + 1,
            diagnosisCode: '',
            diagnosisDesc: '',
            doctor: doctor,
            contagiousInfection: 0,
            hospitalInfection: 0,
            isMainDiagnosis: 0,
            diagnosisDate: new Date(),
        })
        this.dispatch2({data: list})
        this.params.api.setRowData(list)
    }
    /**
     * 页面刷新
     * @param params
     */
    onGridReady = (params) => {
        this.params = params
        params.api.sizeColumnsToFit()
    }

    /**
     * ag表格更新行数据
     * @param modelList 表格数据数组
     * @param rowIndex 当前行索引
     * @param {Array<any>} others
     */
    agTabUpdate(modelList, rowIndex, others?: Array<any>) {
        let dataList = []
        this.params.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                others.forEach((v) => {
                    data[v] = modelList[rowIndex][v]
                })
                dataList.push(data)
            }
        })
        this.params.api.updateRowData({update: dataList})
    }

    /**
     * 更新行数据
     * @param value
     * @param rowIndex
     * @param xy
     */
    updateValue(value, rowIndex, xy) {
        let itemsToUpdate = []
        this.params.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                xy.map((v) => {
                    data[v] = value
                })
                itemsToUpdate.push(data)
            }
        })
        this.params.api.updateRowData({data: itemsToUpdate})
    }

    /**
     * 获取选中行
     * @param params
     */
    index = (params) => {
        let index = params.rowIndex
        this.dispatch({index: index})
    }
    /**
     * 删除选中行
     */
    deleteline = () => {
        const {index} = this.state
        if (index === null) {
            message.tip('请选中要删除的项', 'warning')
            return
        }
        let list = this.state.data
        if (list[index].pvId) {
            message.tip('不能删除已开的诊断', 'warning')
            return
        }
        list.splice(index, 1)
        this.dispatch2({data: list, index: null})
        this.params.api.setRowData(list)
    }

    /**
     * ag表格删除
     */
    agTabDel = () => {
        let {data, modelListSelectRow} = this.state
        this.params.api.stopEditing()
        if (modelListSelectRow.length === 0) {
            message.tip('请至少选择一行数据!')
            return
        }
        for (let i = modelListSelectRow.length - 1; i >= 0; i--) {
            data.splice(modelListSelectRow[i], 1)
        }
        this.params.api.setRowData(data)
        this.dispatch2({data, modelListSelectRow: []})
    }

    /**
     * 查询诊断类型
     * @returns {Promise<void>}
     */
    loadDiagnosisTypeDict = () => {
        const {dataModel} = this.state
        if (dataModel && dataModel.length > 0)
            return dataModel
        ApiDictData.loadDiagnosisTypeDict().then((dataModel) => {
            this.dispatch2({dataModel: dataModel})
            return dataModel
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    /**
     * 诊断信息查询
     * @returns {Promise<void>}
     */
    loadDiagnosisDict = (inputCode?: string, startIndex?: number, pageSize?: number) => {
        return ApiDictData.loadDiagnosisDict(inputCode, startIndex, pageSize).then((diagnosisName) => {
            this.dispatch2({diagnosisName: diagnosisName})
            return diagnosisName
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    /**
     * 暂存常用诊断
     */
    tempSave = (event) => {
        return ApiPatManageDiagnosis.tempSave(event).then((data) => {
            message.tip(data, 'success')
            this.loadTempSave()
            // this.dispatch({commonlyDiagnosis: data})
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    /**
     * 获取暂存常用诊断key列表
     * @returns {Promise<void>}
     */
    loadTempSave = () => {
        return ApiPatManageDiagnosis.loadTempSave().then((commonlyDiagnosis) => {
            this.dispatch2({commonlyDiagnosis: commonlyDiagnosis})
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    /**
     * 获取暂存常用诊断信息
     * @returns {Promise<void>}
     */
    loadTempSaveByKey = (index) => {
        const {data, commonlyDiagnosis} = this.state
        let model = commonlyDiagnosis[index.key]
        data.push({
            diagnosisCode: model.key,
            diagnosisDesc: model.value
        })
        this.dispatch2({data})
        this.params.api.setRowData(data)
    }
    /**
     * 删除暂存常用诊断
     * @returns {Promise<void>}
     */
    delTempSave = () => {
        const {model} = this.state
        return ApiPatManageDiagnosis.delTempSave(model).then((model) => {
            this.dispatch({model: model})
            message.tip('删除成功', 'success')
        }).catch((msg) => {
            this.dispatch({errorMessage: msg || '查询错误'})
        })
    }
    // 选中诊断名称时加载诊断编码
    selected = (event) => {
        this.tempSave(event.data)
        this.dispatch({diagnosisCode: event.data.inputCodeWb})
        let list = this.state.data
        let index = this.state.index
        list[index].diagnosisDesc = event.data.diagnosisDesc
        list[index].diagnosisCode = event.data.diagnosisCode
        this.dispatch2({data: list, diagnosisCode: event.data.diagnosisCode})
        this.agTabUpdate(list, event.props.rowIndex, ['diagnosisCode'])
    }
    /**
     * inputTable 处理
     * @param e api
     * @param dictCode 字典编码
     * @param {(e) => void} callback 回调函数
     */
    inputTableDiagnosisDesc = (e, dictCode, callback?: (e) => void) => {
        let rowIndex = e.props.rowIndex
        let others = ['diagnosisCode']
        const {data} = this.state
        let model = data[rowIndex]
        switch (e.type) {
            case 'blurEvent':
                break
            case 'enterEvent':
                model.diagnosisDesc = e.data.value
                model.diagnosisCode = e.data.key
                this.tempSave(e.data)
                this.dispatch({diagnosisCode: e.data.key})
                // 更新ag表格行数据
                this.agTabUpdate(data, rowIndex, others)
                break
            case  '':
                this.loadDataInputTabel(dictCode, e, callback)
                break
            default:
                others.forEach((key) => {
                    switch (key) {
                        case 'performedBy':
                        case 'amount':
                            break
                        default:
                            model[key] = null
                            break
                    }
                })
                // 设置缓存值
                this.setStateJson2(model, 'modelList', rowIndex)
                // 请求数据源
                this.loadDataInputTabel(dictCode, e, callback)
                // 更新ag表格行数据
                this.agTabUpdate(this.state.data, rowIndex, others)
                break
        }
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
            this.setStateJson2(data, dictCode)
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
            this.setStateJson2(dictCode + 'Columns', data)
            return data
        }).catch(err => {
            message.tip(err.msg || '查询字典数据列失败!', 'warning')
        })
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, data))
    }

    /**
     * inputTabe查询
     * @param {string} dictCode  字典编码
     * @param e api
     * @param {(e) => void} callback 回调函数
     * @param {string} params 参数
     */
    loadDataInputTabel = (dictCode: string, e, callback?: (e) => void, params?: string) => {
        this.loadData(
            dictCode,
            {
                startIndex: e.pageCurrent,
                pageSize: e.pageSize
            },
            e.value || '',
            params
        ).then((data) => {
            if (!JsonUtil.isEmpty(callback))
                callback(data)
        })
    }
    /**
     * 诊断类型data赋值
     * @param v
     */
    select = (v) => {
        let index = this.state.index
        let list = this.state.data
        let arrayList = []
        arrayList.push({
            diagnosisFlag: list[index].diagnosisFlag,
            diagnosisNo: list[index].diagnosisNo,
            diagnosisCode: list[index].diagnosisCode,
            diagnosisDesc: list[index].diagnosisDesc,
            doctor: list[index].doctor,
            contagiousInfection: list[index].contagiousInfection,
            hospitalInfection: list[index].hospitalInfection,
            isMainDiagnosis: list[index].isMainDiagnosis
        })
        list[index] = {diagnosisType: {id: v.key}}
        list[index].diagnosisFlag = arrayList[0].diagnosisFlag
        list[index].diagnosisNo = arrayList[0].diagnosisNo
        list[index].diagnosisCode = arrayList[0].diagnosisCode
        list[index].diagnosisDesc = arrayList[0].diagnosisDesc
        list[index].doctor = arrayList[0].doctor
        list[index].contagiousInfection = arrayList[0].contagiousInfection
        list[index].hospitalInfection = arrayList[0].hospitalInfection
        list[index].isMainDiagnosis = arrayList[0].isMainDiagnosis
        this.dispatch({data: list})
    }
    /**
     * 中西医诊断
     * @param v
     */
    doctorselect = (v) => {
        let index = this.state.index
        let list = this.state.data
        list[index].diagnosisFlag = v.id
        this.dispatch({data: list})
    }
    /**
     * 传染病是否选中
     * @param v 值
     */
    infectiousSelect = (v) => {
        let index = this.state.index
        let list = this.state.data
        // let contagiousInfection=JsonUtil.getJsonByKey(index+'.contagiousInfection',list,0)
        if (list[index].contagiousInfection === undefined || list[index].contagiousInfection !== 1) {
            list[index].contagiousInfection = 1
        } else {
            list[index].contagiousInfection = 0
        }
        this.dispatch({data: list})
    }
    /**
     * 院内诊断
     */
    diagnosisSelect = () => {
        let index = this.state.index
        let list = this.state.data
        if (list[index].hospitalInfection === null || list[index].hospitalInfection !== 1) {
            list[index].hospitalInfection = 1
        } else {
            list[index].hospitalInfection = 0
        }
        this.dispatch({data: list})
    }

    /**
     * 主诊断
     */
    primarySelect = () => {
        let index = this.state.index
        let list = this.state.data
        if (list[index].isMainDiagnosis === null || list[index].isMainDiagnosis !== 1) {
            list[index].isMainDiagnosis = 1
        } else {
            list[index].isMainDiagnosis = 0
        }
        this.dispatch({data: list})
    }

    /**
     * ag表格选择
     */
    agTabSelectRow = (nodes) => {
        let modelListSelectRow = []
        if (nodes) {
            nodes.forEach((node) => {
                modelListSelectRow.push(node.rowIndex)
            })
        }
        this.dispatch2({modelListSelectRow})
    }
}

export const diagnosisEntityService = new DiagnosisEntityService('diagnosis')