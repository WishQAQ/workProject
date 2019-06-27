/**
 * 继承api和字典表
 */
import {BaseService} from 'tools/flux/BaseService'
import {loginService} from 'service/user/login'
import {patientBasicService} from 'service/pat-manage/patien-opt/patient-basic'
import {ApiDictData, ApiDictInput, ApiPatManageExam, ArrayData, ApiPatManageExamMould} from 'pkg/api'
import {
    DataDictEntityDict, ExamAppointsEntityPatManageExam, ExamItemsEntityPatManageExam, ExamModelEntityPatManageExam,
    ExamRptPatternEntityPatManageExamDict, ExamSubclassDictEntityPatManageExamDict, Page
} from 'pkg/entity/index'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message/index'
import {ExamMouldClassEntityPatManageExamMould, ExamMouldProjectEntityPatManageExamMould} from '../../../../../packages/entity'

let examReason
export interface ExamState {
    temOpen?: boolean // 模板弹框打开状态
    reportOpen?: boolean // 报告弹框打开状态
    data?: ExamAppointsEntityPatManageExam // 检查实体类ExamAppointsEntityPatManageExam
    diagnosisDict?: ArrayData<any> // 诊断信息
    diagnosisDictColumns?: Array<any> // 诊断信息标题
    examClassDict?: ArrayData<any> // 检查类型
    examClassDictColumns?: Array<any> // 检查类型标题
    examClassDictValue?: string // 检查类型value
    examPerformByDict?: ArrayData<any> // 发往科室
    examPerformByDictValue?: string // 发往科室value
    examDict?: ArrayData<any>  // 检查项目
    examDictColumns?: Array<any>  // 检查项目标题
    examDictValue?: string // 检查项目value
    deptCodeKey?: number // 发往科室key
    historyItems?: ArrayData<ExamItemsEntityPatManageExam> // 历史检查记录
    alreadyOpen?: ArrayData<ExamModelEntityPatManageExam> // 已开检查申请数据
    examClass?: string  // 查询检查子类别
    examSubClass?: string // 查询检查详细类别
    examClassTree?: ArrayData<ExamSubclassDictEntityPatManageExamDict> // 查询检查子类别数据[]
    examSubClassTree?: ArrayData<ExamRptPatternEntityPatManageExamDict> // 查询检查详细类别数据[]
    examItemCost?: number // 查询检查详细类别费用
    examItemTreeTable?: ExamItemsEntityPatManageExam[] // 检查类型表格数据
    historyRowIndex?: number // 历史检查申请表行号
    indexGroup?: any[] // 多行选择index集合
    serialNo?: number // 点击树状图切换类型是给予提示
    openTree?: boolean // 树状图打开
    mList?: ArrayData<ExamMouldClassEntityPatManageExamMould> // 检查申请模板明细表类的集合
    radioChoose?: string // 查询模板radio值
}

class ExamService extends BaseService<ExamState> {
    historyItemsApi?: any   // 历史检查记录agApi
    alreadyOpenApi?: any    // 已开检查申请agApi
    defaultState = {
        temOpen: false,
        reportOpen: false,
        examClassDictValue: '',
        examPerformByDictValue: '',
        examDictValue: '',
        examClassTree: <ArrayData<ExamSubclassDictEntityPatManageExamDict>><any>[],
        examSubClassTree: <ArrayData<ExamRptPatternEntityPatManageExamDict>><any>[],
        examItemTreeTable: <ArrayData<ExamItemsEntityPatManageExam>><any>[],
        examPerformByDict: <any>[],
        serialNo: -1,
        openTree: false,
        data: {},
        radioChoose: '全院'
    }

    serviceWillMount() {
        /***查询字典表***/
        this.loadMultipleColumns(['examClassDict', 'diagnosisDict', 'examDict'])
        this.loadData('examClassDict')
        this.loadData('diagnosisDict')
        this.loadData('examDict')
        /***查询字典表***/
        /***查询已开检查申请***/
        this.loadExamRec()
    }

    /**
     * 设置公共check值
     */
    commonCheck = (path, data) => {
        if (data.target.checked === true) {
            data = 1
        }
        else {
            data = 0
        }
        this.setStateJson(path, data)
    }

    /**
     * 公共取值方法
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data))
    }

    /**
     * dictCode转换
     */
    setNeedKey = (dictCode, v) => {
        switch (dictCode) {
            case 'examClassDict':
                this.dispatch({examClass: v.value, deptCodeKey: v.data.key})
                this.dispatch2({
                    examClassTree: <ArrayData<ExamSubclassDictEntityPatManageExamDict>><any>[],
                    examSubClassTree: <ArrayData<ExamRptPatternEntityPatManageExamDict>><any>[]
                })
                this.loadExamSubclassDict(v.value)
                break
            case 'examPerformByDict':
                this.dispatch({deptCodeKey: v.data.key})
                break
            default:
                break
        }
    }

    /**
     * 查询字典数据列
     * @param dictCode 字典名
     * @returns {Promise<void>}
     */
    loadMultipleColumns = (dictCode) => {
        return ApiDictInput.loadMultipleColumns(dictCode).then((data) => {
            if (!JsonUtil.isEmpty(data)) {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key + 'Columns'] = data[key]
                    }
                }
            }
            this.dispatch(this.state)
        }).catch(msg => message.error(msg || '查询字典数据列失败!'))
    }

    /**
     * 查询字典数据
     * @param dictCode 字典编码
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string) => {
        page = page ? page : {startIndex: 1, pageSize: 7}
        return ApiDictInput.loadData(page, dictCode, inputCode).then((data) => {
            this.setStateJson(dictCode, data)
            return data
        }).catch(msg => message.tip(msg || '查询字典数据失败!', 'error'))
    }

    /**
     * 字典表input table公共方法
     */
    inputTableEvent = (v, dictCode, path) => {
        switch (v.type) {
            case 'enterEvent':
                this.setStateJson(path, v.data.value)
                this.setNeedKey(dictCode, v)
                // 项目名称选择,特殊处理,选择后,直接添加到已选项目
                if (path === 'examDictValue') {
                    this.loadItemCost({
                        description: v.data.value,
                        descriptionCode: v.data.key,
                        examClass: v.data.examClass,
                        examSubClass: v.data.examSubClass
                    })
                }
                break
            case 'clickEvent':
            case 'pageEvent':
            case 'changeEvent':
                this.setStateJson(path, v.value)
                this.loadData(dictCode, {startIndex: v.pageCurrent, pageSize: v.pageSize}, v.value || '')
                break
            default:
                break
        }
    }

    /**
     * 一级检查树点击 - 查询二级树
     */
    examClassTree = (e?: any) => {
        let {examClass, serialNo, examItemTreeTable} = this.state
        return new Promise((resolve, reject) => {
            if (serialNo === -1 || serialNo === e.serialNo) {
                this.dispatch({serialNo: e.serialNo, openTree: true})
            }
            else if (serialNo !== e.serialNo && examItemTreeTable.length > 0) {
                this.dispatch({serialNo: e.serialNo, openTree: false})
                message.linkAge('是否切换检查类型', null, '是', '取消',
                    () => this.clearConstData(), () => {
                        return
                    })
            }
            resolve()
        }).then(() => {
            let {openTree} = this.state
            if (openTree) {
                this.dispatch({examSubClass: e.name})
                this.loadExamRptPattern(examClass, e.name, '')
            }
        })
    }

    /**
     * 切换类别时清空数据
     */
    clearConstData = () => {
        let clearArr = <ArrayData<ExamItemsEntityPatManageExam>><any>[]
        this.historyItemsApi.api.setRowData(clearArr)
        this.dispatch2({examItemTreeTable: clearArr, openTree: true})
    }

    /**
     * 查询子类别 - 一级树
     */
    loadExamSubclassDict = (examClass?: string) => {
        return new Promise((resolve, reject) => {
            this.loadFirstTree(examClass)
            resolve()
        }).then(() => {
            this.loadExamPerformByDict(examClass)
        })
    }

    /**
     * 加载一级树
     */
    loadFirstTree = (examClass) => {
        return ApiPatManageExam.loadExamSubclassDict(examClass).then((data) => {
            this.dispatch2({examClassTree: data})
        }).catch(msg => message.tip(msg || '未查询到检查子类别', 'error'))
    }

    /**
     * 联动查询科室
     */
    loadExamPerformByDict = (examClass?: string) => {
        return ApiDictData.loadExamPerformByDict(examClass).then((data) => {
            this.dispatch2({examPerformByDict: data, examPerformByDictValue: data[0].value || ''})
        }).catch(msg => message.tip(msg || '未查询到科室', 'error'))
    }

    /**
     * 查询详细类别 - 二级树
     */
    loadExamRptPattern = (examClass?: string, examSubClass?: string, inputCode?: string) => {
        return ApiPatManageExam.loadExamRptPattern(examClass, examSubClass, inputCode).then((data) => {
            this.dispatch2({examSubClassTree: data})
        }).catch(msg => message.tip(msg || '未查询到检查类别', 'error'))
    }

    /**
     * 根据详细类别查询费用
     */
    loadItemCost = (e?: any) => {
        let itemName = e.description
        let tableData = []
        let same: boolean = false
        let {examItemTreeTable, examClass} = this.state
        return new Promise((resolve, reject) => {
            this.fetchConst(itemName)
            resolve()
        }).then(() => {
            tableData = examItemTreeTable
            if (tableData.length > 0) {
                tableData.forEach((v, i, a) => {
                    if (v.itemCode === e.descriptionCode) {
                        same = true
                    }
                })
                if (!same) {
                    tableData.push(<ExamItemsEntityPatManageExam>{
                        itemName: itemName,
                        examClass: e.examClass,
                        examSubClass: e.examSubClass,
                        itemCode: e.descriptionCode,
                        costs: this.state.examItemCost
                    })
                }
                else {
                    message.tip('已存在项目', 'info')
                    same = false
                }
            }
            else if (tableData.length === 0) {
                tableData.push(<ExamItemsEntityPatManageExam>{
                    itemName: itemName,
                    examClass: examClass,
                    examSubClass: e.examSubClass,
                    itemCode: e.descriptionCode,
                    costs: this.state.examItemCost
                })
            }
            this.historyItemsApi.api.setRowData(tableData)
            this.dispatch({examItemTreeTable: tableData})
        })
    }

    /**
     * 根据详细类别查询费用 - 调用方法
     */
    fetchConst = (itemName) => {
        return ApiPatManageExam.loadItemCost(itemName).then((data) => {
            this.dispatch({examItemCost: data})
        }).catch(msg => message.tip(msg || '未查询到费用', 'error'))
    }

    /**
     * 保存检查
     */
    save = () => {
        let {data, examItemTreeTable, deptCodeKey, examClass, examSubClass} = this.state
        if (!examItemTreeTable || examItemTreeTable.length === 0) {
            message.tip('请至少选择一个项目!')
            return
        }
        let modelList = examItemTreeTable
        data.pvId = patientBasicService.state.model.pvId
        data.performedBy = {id: deptCodeKey}
        data.applyDept = {id: patientBasicService.state.model.deptCode}
        data.applyDoctor = {id: loginService.state.user.id}
        data.examClass = examClass
        data.examSubClass = examSubClass
        return ApiPatManageExam.save(data, modelList).then(() => {
            message.tip('保存成功', 'success')
            this.loadExamRec()
        }).catch(msg => message.tip(msg || '保存失败', 'error'))
    }

    /**
     * 历史检查项表格api
     */
    historyItemsGridReady = (params) => {
        this.historyItemsApi = params
        params.api.sizeColumnsToFit()
    }

    /**
     * 历史检查项select选择
     */
    historyItemsOnSelect = (event) => {
        let index = []
        let indexGroups = event.api.getSelectedNodes()
        // console.log(indexGroups)
        indexGroups.forEach((v, i, a) => {
            index.push(v.rowIndex)
        })
        this.dispatch2({indexGroup: index})
    }

    /**
     * 历史检查表格点击
     */
    historyItemsOnClick = (parmas) => {
        this.dispatch({historyRowIndex: parmas.rowIndex})
    }

    /**
     * 删除所选数据
     */
    delChooseData = () => {
        let {examItemTreeTable, historyRowIndex, indexGroup} = this.state
        let opData = examItemTreeTable
        if (indexGroup.length === 1) {
            opData.forEach((v, i, a) => {
                if (historyRowIndex === i) {
                    opData.splice(i, 1)
                }
            })
            this.historyItemsApi.api.setRowData(opData)
            this.dispatch2({indexGroup: [], examItemTreeTable: opData})
        }
        else if (indexGroup.length > 1) {
            for (let i = indexGroup.length - 1; i >= 0; i--) {
                opData.splice(indexGroup[i], 1)
            }
            this.historyItemsApi.api.setRowData(opData)
            this.dispatch2({indexGroup: [], examItemTreeTable: opData})
        }
        else {
            this.dispatch({indexGroup: []})
        }
    }

    /**
     * 已开检查表格api
     */
    alreadyOpenGridReady = (params) => {
        this.alreadyOpenApi = params
        params.api.sizeColumnsToFit()
    }

    /**
     * 查询已开检查申请
     * @param pvId
     */
    loadExamRec = (pvId?: number) => {
        pvId = pvId ? pvId : patientBasicService.state.model.pvId
        return ApiPatManageExam.loadExamRec(pvId).then((data) => {
            this.alreadyOpenApi.api.forEachNode(function (node) {
                if (node.rowIndex === data.length - 1) {
                    node.setSelected(true)
                }
            })
            this.alreadyOpenApi.api.setRowData(data)
            this.dispatch({alreadyOpen: data})
        }).catch(msg => message.tip(msg || '查询已开申请失败', 'error'))
    }

    /**
     * 已开申请右键操作
     */
    alreadyOpenRightMenu = (menuIndex, dataIndex) => {
        //
    }

    /**
     * 点击已开申请查询历史记录
     */
    fetchAlreadyOpen = (params) => {
        let pvId = params.data.pvId
        let appNo = params.data.appNo
        this.fetchMainInfo(pvId, appNo)
        this.fetchChildInfo(appNo)
    }

    /**
     * 查询历史主表信息
     */
    fetchMainInfo = (pvId, appNo) => {
        return ApiPatManageExam.loadExamAppoints(pvId, appNo).then((data) => {
            this.dispatch2({data: data ? data[0] : {}})
        }).catch(msg => message.tip(msg || '查询历史主表记录失败', 'error'))
    }

    /**
     * 查询历史子表信息
     */
    fetchChildInfo = (appNo) => {
        return ApiPatManageExam.loadExamItems(appNo).then((data) => {
            this.historyItemsApi.api.setRowData(data)
            this.dispatch2({examItemTreeTable: data})
        }).catch(msg => message.tip(msg || '查询历史子表记录失败', 'error'))
    }

    /**
     * 模板弹框打开
     */
    temOpen = () => {
        this.dispatch({temOpen: true})
    }

    /**
     * 模板弹框关闭
     */
    temClose = () => {
        this.dispatch({temOpen: false})
    }

    /**
     * 报告弹框打开
     */
    reportOpen = () => {
        this.dispatch({reportOpen: true})
    }

    /**
     * 报告弹框关闭
     */
    reportClose = () => {
        this.dispatch({reportOpen: false})
    }

    /**
     * 清空
     */
    cleanAll = () => {
        this.dispatch2({data: {}, examItemTreeTable: []})
    }

    /**
     * 请求检查模板
     * @param {string} inputName - 查询框输入值
     */
    examMould = (inputName?: string) => {
        let {radioChoose} = this.state
        ApiPatManageExamMould.select(inputName,radioChoose).then(data =>{
            this.dispatch2({mList: data})
        }).catch(err => message.tip(err || '查询模板数据错误', 'error'))
    }

    /*
    * 模板类型选择
    * **/
    chose = (v) => {
        this.dispatch({radioChoose: v.target.value})
        this.examMould('')
    }

    /*
    *  模板类型查询输入事件
    * */
    handelChange = (e) => {
        // console.log(e.target.value)
        this.examMould(e.target.value)
    }

    /*
    *  模板类型确认事件
    * */
    mouldOk =(e) => {
        let {mList} = this.state
        this.temClose()
        // console.log(mList)
    }
}

export const examService = new ExamService('Exam')