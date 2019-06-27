/**
 * 字典表
 */

import {BaseService} from '../../../../../tools/flux/BaseService'
import {ApiDictData, ApiPatManageLab, ApiPatManageLabTemp, ArrayData} from '../../../../../packages/api'
import {
    ClinicItemNameDictEntityPatManageOrdersClinic, DataDictEntityDict, DeptDictEntityUser, LabModelEntityPatManageLab,
    LabTempEntityPatManageLabTemp, LabTestMasterEntityPatManageLab, Page
} from '../../../../../packages/entity'
import {message} from '../../../../../packages/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {loginService} from '../../../../user/login'
import {patientBasicService} from '../../patient-basic'

/**
 * 急诊检验
 */
export interface InspectionState {
    appNo?: number   // HIEIP.H_LAB_TEST_MASTER.APP_NO:  ●申请序号.原:TEST_NO
    priorityIndicator?: string  // HIEIP.H_LAB_TEST_MASTER.PRIORITY_INDICATOR:  ●急,反映此申请的紧急程度。0-普通 1-紧急
    itemName?: string  // HIEIP.H_LAB_TEST_ITEMS.ITEM_NAME:  主题,●检验项目
    status?: string  // HIEIP.H_LAB_TEST_MASTER.STATUS:  ●结果状态,见结果状态字典exam_result_status_dict,0:申请,1:收到申请,2:已执行,3:初步报告,4:确认报告,9:其他,7:作废
    clinicDiag?: string  // HIEIP.H_LAB_TEST_MASTER.CLINIC_DIAG:  ●临床诊断,主要临床诊断，正文描述
    specimen?: string  // HIEIP.H_LAB_TEST_MASTER.SPECIMEN:  ●标本
    notesForSpcm?: string  // HIEIP.H_LAB_TEST_MASTER.NOTES_FOR_SPCM:  ●标本说明
    performedBy?: DeptDictEntityUser  // HIEIP.H_LAB_TEST_MASTER.PERFORMED_BY:  ●执行科室,见h_dept_dict.id
    labItemClass?: string  // HIEIP.H_LAB_TEST_MASTER.LAB_ITEM_CLASS:  ●检验项目类别,hieip新加字段,存储检验项目类别,主要用于检验分单，分单规则默认为【执行科室】:【检验项目类别】:【标本】
    serialNo?: string  // HIEIP.H_LAB_TEST_MASTER.SERIAL_NO:  ●流水号,生成规则:select outp_order_serial_no.nextval from dual
    testCause?: string  // HIEIP.H_LAB_TEST_MASTER.TEST_CAUSE:  ●检验目的
    data?: ArrayData<LabTestMasterEntityPatManageLab>  // 急诊检验主记录
    Inspection?: LabTestMasterEntityPatManageLab // 急诊检验对象
    InspectionItems?: Array<any> // 急诊检验项目
    expand3?: string  // 临床诊疗项目查询条件 科室
    expand2?: string  // 临床诊疗项目查询条件 类别
    expand1?: string  // 临床诊疗项目查询条件 标本
    clinicItemNameDict?: ArrayData<ClinicItemNameDictEntityPatManageOrdersClinic> // 临床诊疗项目名称字典
    clinicItemName?: ArrayData<ClinicItemNameDictEntityPatManageOrdersClinic> // 临床诊疗项目名称字典
    dept?: ArrayData<DataDictEntityDict> // 查询急诊检验科室
    deptDict?: DataDictEntityDict // 选中科室
    checkcate?: DataDictEntityDict[] // 急诊检验项目类别字典
    specimens?: ArrayData<DataDictEntityDict> // 科室对应检验标本
    spection?: DataDictEntityDict[] // 检验项目明细
    inspecs?: ClinicItemNameDictEntityPatManageOrdersClinic[] // 双击选中的检验项目
    inspecsSelect?: Array<number> // 申请项目中多选选中项目
    selectInspecs?: ClinicItemNameDictEntityPatManageOrdersClinic[] // 页底选中的检验项目
    diagnosisName?: ArrayData<DataDictEntityDict> // 诊断信息
    cots?: number // 项目总费用
    model?: LabTempEntityPatManageLabTemp[] // 检验申请模板
    modelList?: LabTempEntityPatManageLabTemp[] // 检验申请模板明细
    name?: string // 检验模板名称
    radio?: string  // 检验模板类型 全院/科室/个人
    open?: boolean // 打开模板
    indexRows?: any  // 删除需要选中行
    openInspection?: ArrayData<LabModelEntityPatManageLab>  // 患者已开检验申请
    invalidOpen?: boolean // 作废按钮
    deleteOpen?: boolean // 删除按钮
    id?: number // 模板id
    reportOpen?: boolean // 检验报告弹窗状态
}

class InspectionService extends BaseService<InspectionState> {
    params?: any // ag表格，页面刷新使用
    para?: any // ag表格，页面刷新使用
    toObtain1?: any // 重新获取已开检验
    defaultState = {
        InspectionItems: [],
        model: [],
        modelList: [],
        data: <ArrayData<LabTestMasterEntityPatManageLab>><any>[],
        clinicItemNameDict: <ArrayData<ClinicItemNameDictEntityPatManageOrdersClinic>><any>[],
        expand3: '',
        expand2: '',
        expand1: '',
        spection: [],
        inspecs: [],
        selectInspecs: [],
        invalidOpen: true,
        deleteOpen: false,
        open: false,
        reportOpen: false
    }
    /**
     * 获取申请选中行
     */
    // selectTheLine = (event) => {
    //     console.log(event)
    //     let selectLine = this.state.selectInspecs ? this.state.selectInspecs : []
    //     let bloon = event.node.selected
    //     if (bloon) {
    //         selectLine.push(event.data)
    //     } else {
    //         for (let i = 0; i < selectLine.length; i++) {
    //             if (selectLine[i].itemCode === event.data.itemCode) {
    //                 selectLine.splice(i, 1)
    //             }
    //         }
    //     }
    //     this.dispatch2({selectInspecs: selectLine})
    // }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        this.loadDiagnosisDict()// 获取诊断名称
        this.loadLabSheetMaster()// 获取急诊科室
        this.loadLabItemClassDict() // 获取急诊检验项目类别
        this.loadLabItemsModel() // 获取分页检验项目
        this.loadLabItems() // 获取检验项目
        this.loadLabRec() // 查询已开检验
    }

    /**
     * 页面刷新
     * @param params 参数
     */
    onGridReady = (params) => {
        this.params = params
    }
    toObtain = (params) => {
        this.toObtain1 = params
    }
    /**
     * 右键显示
     * @param dataIndex 行索引
     * @returns {Promise<any>}
     */
    // indexof = (dataIndex) => {
    //     const {inspecs} = this.state
    //     let itemCode = inspecs[dataIndex].itemCode
    //     this.dispatch2({spection: []})
    //     this.loadLabPriceItems(itemCode)
    //     return new Promise(resolve => {
    //         resolve()
    //     })
    // }

    /**
     * 检验目的
     * @param e 参数
     */
    testingPurpose = (e) => {
        this.dispatch({testCause: e.target.value})
    }
    /**
     * 标本说明
     * @param e 参数
     */
    notesForSpcm = (e) => {
        this.dispatch({notesForSpcm: e.target.value})
    }
    /**
     * 模板名称
     * @param e 参数
     */
    selectname = (e) => {
        this.dispatch({name: e.target.value})
    }
    /**
     * 双击获取选中行，加载到下方页面
     * @param params 参数
     */
    index = (params) => {
        const {appNo, inspecs, inspecsSelect} = this.state
        let inspec = inspecs
        if (appNo !== null) {
            inspec = []
        }
        for (let i = 0; i < inspec.length; i++) {
            if (inspec[i].itemName === params.itemName) {
                message.tip('该项目已经选中，请选择其他项目', 'warning')
                return
            }
        }
        inspec.push(params)
        let rowIndex = inspec.length - 1
        this.dispatch2({inspecsSelect: [rowIndex], inspecs: inspec, invalidOpen: true, deleteOpen: false, appNo: null})
        this.params.api.setRowData(inspec)
        // 设置焦点
        this.agTabSelect(rowIndex)
    }

    /**
     * 设置选择行
     * @param rowIndex 索引值
     */
    agTabSelect = (rowIndex) => {
        this.params.api.forEachNode(function (node) {
            if (rowIndex === node.rowIndex) {
                node.setSelected(true)
            } else {
                node.setSelected(false)
            }
        })
    }
    /**
     * 查询急诊检验科室
     * @returns {Promise<void>}
     */
    loadLabSheetMaster = (inputCode?: string, page?: Page) => {
        if (!page) {
            page = {startIndex: 1, pageSize: 7}
        }
        return ApiDictData.loadLabSheetMaster(inputCode, page).then((dept) => {
            this.dispatch({dept: dept})
        }).catch((msg) => {
            message.tip(msg || '查询失败', 'warning')
        })
    }
    /**
     * 科室校验
     * @param v
     */
    inputTableDept = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadLabSheetMaster(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            case 'enterEvent': { // 事件
                this.dispatch({deptDict: v.data, expand3: v.data.key})
                this.loadLabItems()
                this.loadSpecimanDict()
                break
            }
            case 'blurEvent': {   // 輸入事件
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadLabSheetMaster(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            default:
                break
        }
    }
    /**
     * 查询急诊检验项目类别字典
     * @returns {Promise<void>}
     */
    loadLabItemClassDict = (inputCode?: string, page?: Page) => {
        if (!page) {
            page = {startIndex: 1, pageSize: 7}
        }
        return ApiDictData.loadLabItemClassDict(inputCode, page).then((checkcate) => {
            this.dispatch({checkcate: checkcate})
        }).catch((msg) => {
            message.tip(msg || msg || '查询失败', 'warning')
        })
    }
    /**
     * 查询急诊检验项目类别字典校验
     * @param v
     */
    inputTableLabItemClassDict = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadLabItemClassDict(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            case 'enterEvent': {
                this.dispatch({expand2: v.data.value})
                this.loadLabItems()
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadLabItemClassDict(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            default:
                break
        }
    }
    /**
     *  查询科室对应标本
     * @returns {Promise<void>}
     */
    loadSpecimanDict = (inputCode?: string, page?: Page) => {
        if (!page) {
            page = {startIndex: 1, pageSize: 7}
        }
        if (!this.state.deptDict) {
            message.tip('请选择检验科室', 'warning')
            return
        }
        let deptCode = this.state.deptDict.key
        return ApiDictData.loadSpecimanDict(deptCode, inputCode, page).then((specimens) => {
            this.dispatch({specimens: specimens})
        }).catch((msg) => {
            message.tip(msg || '查询失败', 'warning')
        })
    }
    /**
     * 查询科室对应标本校验
     * @param v
     */
    inputTableSpecimanDict = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadSpecimanDict(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            case 'enterEvent': {
                this.dispatch({expand1: v.data.value})
                this.loadLabItems()
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadSpecimanDict(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            default:
                break
        }
    }
    /**
     * 查询检验项目
     * @returns {Promise<void>}
     */
    loadLabItems = () => {
        const {expand3, expand2, expand1} = this.getState()
        return ApiPatManageLab.loadLabItems(expand3, expand2, expand1).then((clinicItemNameDict) => {
            // this.dispatch2({clinicItemNameDict: <ArrayData<ClinicItemNameDictEntityPatManageOrdersClinic>><any>[]})
            this.dispatch2({clinicItemNameDict: clinicItemNameDict})
        }).catch((msg) => {
            message.tip(msg || '查询检验项目失败', 'warning')
        })
    }
    /**
     * 分頁查询检验项目
     * @returns {Promise<void>}
     */
    loadLabItemsModel = (inputCode?: string, page?: Page) => {
        if (!page) {
            page = {startIndex: 1, pageSize: 7}
        }
        return ApiPatManageLab.loadLabItemsModel(inputCode, page).then((clinicItemName) => {
            this.dispatch({clinicItemName: clinicItemName})
        }).catch((msg) => {
            message.tip(msg || '查询失败', 'warning')
        })
    }
    /**
     * 分页检验项目校验
     * @param v
     */
    inputTableLabItem = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadLabItemsModel(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            case 'enterEvent': {
                this.index(v.data)
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadLabItemsModel(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize})
                break
            }
            default:
                break
        }
    }
    /**
     * 查询检验项目明细
     * @returns {Promise<void>}
     */
    loadLabPriceItems = (itemCode) => {
        this.dispatch2({spection: []})
        return ApiPatManageLab.loadLabPriceItems(itemCode).then((spection) => {
            this.dispatch2({spection: spection})
        }).catch((msg) => {
            message.tip(msg || '查询失败', 'warning')
        })
    }
    /**
     * 诊断信息查询
     * @returns {Promise<void>}
     */
    loadDiagnosisDict = (clinicDiag?: string, startIndex?: number, pageSize?: number) => {
        if (startIndex == null && pageSize == null) {
            startIndex = 1
            pageSize = 7
        }
        return ApiDictData.loadDiagnosisDict(clinicDiag, startIndex, pageSize).then((diagnosisName) => {
            this.dispatch({diagnosisName: diagnosisName})
        }).catch((msg) => {
            message.tip(msg || '查询失败，请联系管理员', 'warning')
        })
    }
    /**
     * 保存检验申请
     * @returns {Promise<void>}
     */
    save = () => {
        let inspec = []
        let datas = this.state.inspecs
        let testCause = this.state.testCause  // 检验目的
        let pvId = patientBasicService.state.model.pvId // 患者id
        let notesForSpcm = this.state.notesForSpcm  // 标本说明
        let deptCode = {id: patientBasicService.state.model.deptCode} // 申请科室
        let id = {id: loginService.state.user.id}
        let clinicDiag = this.state.clinicDiag  // 诊断
        if (JsonUtil.isEmpty(testCause)) {
            message.tip('检验目的不能为空', 'warning')
            return
        } else if (JsonUtil.isEmpty(clinicDiag)) {
            message.tip('患者诊断不能为空', 'warning')
            return
        } else if (JsonUtil.isEmpty(notesForSpcm)) {
            message.tip('标本说明不能为空', 'warning')
            return
        } else if (datas.length < 1) {
            message.tip('请选择你要保存的项目', 'warning')
            return
        }
        for (let i = 0; i < datas.length; i++) {
            inspec.push({
                pvId: pvId,
                applyDept: deptCode,
                applyDoctor: id, // 申请医生
                testCause: testCause, // 检验目的
                clinicDiag: clinicDiag,
                notesForSpcm: notesForSpcm,
                itemCode: datas[i].itemCode, // 项目编码
                itemName: datas[i].itemName, // 项目名称
                specimen: datas[i].expand1, // 标本
                labItemClass: datas[i].expand2, // 类别
                performedBy: {id: datas[i].expand3},  // 执行科室
                costs: datas[i].costs // 项目金额
            })
        }
        return ApiPatManageLab.save(inspec).then((data) => {
            this.loadLabRec()
            this.dispatch2({inspecs: []})
            this.params.api.setRowData([])
            message.tip(data || '保存成功', 'warning')
        }).catch((msg) => {
            message.tip(msg || msg || '保存失败', 'warning')
        })
    }
    /**
     * 查询历史急诊检验预约记录
     * @returns {Promise<void>}
     */
    loadLabTestMaster = () => {
        const {appNo} = this.state
        let pvId = patientBasicService.state.model.pvId
        if (!pvId) {
            message.tip('请选择患者', 'warning')
            return
        }
        return ApiPatManageLab.loadLabTestMaster(pvId, appNo).then((data) => {
            let inspec = []  // this.state.inspecs
            for (let i = 0; i < data.length; i++) {
                inspec.push({
                    appNo: data[i].appNo,
                    itemNo: data[i].itemNo,
                    itemCode: data[i].itemCode, // 项目编码
                    itemName: data[i].itemName, // 项目名称
                    expand1: data[i].specimen, // 标本
                    expand2: data[i].labItemClass, // 类别
                    expand3: data[i].performedBy,  // 执行科室
                    costs: data[i].costs // 项目金额
                })
            }
            let clinicDiag = data[0].clinicDiag
            let notesForSpcm = data[0].notesForSpcm
            let testCause = data[0].testCause
            this.dispatch2({
                inspecs: inspec,
                invalidOpen: false,
                deleteOpen: true,
                clinicDiag: clinicDiag,
                notesForSpcm: notesForSpcm,
                testCause: testCause
            })
            this.params.api.setRowData(inspec)
            // this.dispatch2({data: data, invalidOpen: false, deleteOpen: true})
            // this.state.params.api.setRowData(data)
        }).catch((msg) => {
            message.tip(msg || '查询历史记录失败', 'warning')
        })
    }

    /**
     * 查询检验模板数据
     * @returns {Promise<void>}
     */
    selectLabTemp = () => {
        const {name, radio} = this.getState()
        return ApiPatManageLabTemp.selectLabTemp(name, radio).then((model) => {
            this.dispatch2({model: model, open: true})
        }).catch((msg) => {
            message.tip(msg || '加载失败', 'warning')
        })
    }
    /**
     * 获取模板选中行
     */
    templateTheLine = (event) => {
        let id = event.data.id
        this.dispatch2({id: id})
    }
    /**
     * 查询检验模板数据明细
     * @returns {Promise<void>}
     */
    selectLabTempItems = () => {
        const {id} = this.state
        return ApiPatManageLabTemp.selectLabTempItems(id).then((modelList) => {
            let inspec = this.state.inspecs
            for (let i = 0; i < modelList.length; i++) {
                for (let j = 0; j < inspec.length; j++) {
                    if (inspec[j].itemName === modelList[i].itemName) {
                        message.tip('该项目已存在，不予加载', 'warning')
                    } else {
                        inspec.push({
                            itemCode: modelList[i].itemCode, // 项目编码
                            itemName: modelList[i].itemName, // 项目名称
                            expand1: modelList[i].expand1, // 标本
                            expand2: modelList[i].itemClass, // 类别
                            expand3: modelList[i].expand3,  // 执行科室
                            costs: modelList[i].costs // 项目金额
                        })
                    }
                }
            }
            this.dispatch2({inspecs: inspec, open: false})
            this.params.api.setRowData(inspec)
            // this.dispatch2({data: <ArrayData<LabTestMasterEntityPatManageLab>><any>[]})
            // let inspec = JsonUtil.getJsonByKey('data', this.state, [])
            // let pvId=patientBasicService.state.model.pvId
            // let deptCode={id: patientBasicService.state.model.deptCode}
            // let id={id: loginService.state.user.id}
            // let clinicDiag=this.state.clinicDiag
            // let notesForSpcm=this.state.notesForSpcm
            // let testCause=this.state.testCause
            // for (let i = 0; i < modelList.length; i++) {
            //     inspec.push({
            //         pvId: pvId,  // 患者id
            //         applyDept: deptCode, // 申请科室
            //         applyDoctor: id, // 申请医生
            //         testCause:testCause, // 检验目的
            //         clinicDiag:clinicDiag, // 诊断
            //         notesForSpcm:notesForSpcm, // 标本说明
            //         itemCode: modelList[i].itemCode, // 项目编码
            //         itemName: modelList[i].name, // 项目名称
            //         specimen: modelList[i].expand1, // 标本
            //         labItemClass: modelList[i].itemClass, // 类别
            //         performedBy: {id: modelList[i].expand3},  // 执行科室
            //         costs: modelList[i].price // 项目金额
            //     })
            // }
            //
            // this.dispatch2({data: inspec, open: false})
            // this.state.params.api.setRowData(inspec)
        }).catch((msg) => {
            message.tip(msg || '加载失败', 'warning')
        })
    }
    /**
     * 诊断校验
     * @param v
     */
    inputTableType = (v) => {
        switch (v.type) {
            case 'pageEvent': {// 分页事件
                this.loadDiagnosisDict(v.value, v.pageCurrent, v.pageSize)
                break
            }
            case 'enterEvent': {
                this.dispatch2({clinicDiag: v.data.value})
                break
            }
            case 'blurEvent': {
                break
            }
            case 'changeEvent': {// 改变值查询事件
                this.loadDiagnosisDict(v.value, v.pageCurrent, v.pageSize)
                break
            }
            default:
                break
        }
    }
    /**
     * 清空数据，恢复按钮行为
     */
    clear = () => {
        this.dispatch2({
            inspecs: [],
            deleteOpen: false,
            invalidOpen: true,
            testCause: '',
            clinicDiag: '',
            notesForSpcm: ''
        })
    }
    /**
     * 作废选中行
     */
    cancelBtnClick = () => {
        const {appNo, inspecsSelect} = this.state
        message.linkAge('确定要作废选中项吗?', null, '确认', '取消', () => this.cancel(appNo, inspecsSelect.toString()))
    }
    /**
     * 删除选中行
     */
    deleteline = () => {
        const {selectInspecs} = this.state
        if (selectInspecs === null) {
            message.tip('请选中要删除的项', 'warning')
            return
        }
        let list = this.state.inspecs ? this.state.inspecs : []
        for (let i = 0; i < selectInspecs.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (list[j].itemName === selectInspecs[i].itemName) {
                    list.splice(j, 1)
                    j--
                }
            }
        }
        message.tip('删除成功', 'warning')
        this.dispatch2({inspecs: list, selectInspecs: []})
        this.params.api.setRowData(list)
    }
    /**
     * 查询已开检验
     * @returns {Promise<void>}
     */
    loadLabRec = () => {
        let pvId = patientBasicService.state.model.pvId
        return ApiPatManageLab.loadLabRec(pvId).then((openInspection) => {
            this.dispatch2({openInspection: openInspection})
            this.toObtain1.api.setRowData(openInspection)
        }).catch((msg) => {
            message.tip(msg || '加载失败', 'warning')
        })
    }
    /**
     * 申请项目表多选事件
     * @param params 包括api和columApi
     */
    onSelectionChanged = (params) => {
        let inspecsSelect = []
        params.api.getSelectedNodes().forEach((item, i) => {
            inspecsSelect.push(item.rowIndex)
        })
        this.dispatch2({
            inspecsSelect: inspecsSelect
        })
    }

    /**
     * 右键作废事件
     * @param menuIndex 右键菜单下标
     * @param dataIndex 右击行下标
     */
    rightCancel = (menuIndex, dataIndex) => {
        let {openInspection} = this.state
        if (openInspection[dataIndex].status === '作废') {
            message.tip('已作废,不能再次作废！')
        } else {
            message.linkAge('确定要作废吗?', null, '确认', '取消', () => this.cancel(Number(openInspection[dataIndex].appNo)))
        }
    }
    /**
     * 作废事件
     * @param {number} appNo
     * @param {string} itemNos
     */
    cancel = (appNo: number, itemNos?: string) => {
        ApiPatManageLab.cancel(appNo).then(() => {
            this.loadLabRec() // 查询已开检验
            message.tip('作废成功！')
        }).catch((msg) => {
            message.tip(msg || '作废失败！')
        })
    }

    /**
     * 获取已开检验选中行
     */
    openTestLine = (event) => {
        if (event.node.selected) {
            let appNo = event.data.appNo
            this.dispatch2({appNo: appNo})
            this.loadLabTestMaster()
        }
    }
    /**
     * 关闭模板弹窗
     */
    close = () => {
        this.dispatch2({open: false})
    }
    /*****报告******/

    /**
     * 报告弹窗打开
     */
    reportOpen = () => {
        this.dispatch({reportOpen: true})
    }
    /**
     * 报告弹窗关闭
     */
    reportClose = () => {
        this.dispatch({reportOpen: false})
    }
}

export const inspectionService = new InspectionService('inspection')