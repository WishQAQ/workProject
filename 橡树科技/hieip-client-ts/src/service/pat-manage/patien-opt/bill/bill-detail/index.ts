import {BaseService} from 'tools/flux/BaseService'
import {ApiSplitMhPatientVisit} from 'pkg/api'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiAppData, ApiDictData, ApiDictInput, ApiPatManageOutpOrdersBillDetail, ArrayData} from '../../../../../packages/api'
import {DataDictEntityDict, OutpBillDetailEntityPatManageOutpOrders, Page} from '../../../../../packages/entity'
import {patientBasicService} from '../../patient-basic'
import {loginService} from '../../../../user/login'
import {billSignatureModalService} from '../bill-signature-modal'

export interface Params {
    /**
     * 开始时间
     */
    startTime ?: Date
    /**
     * 结束时间
     */
    endTime ?: Date
    /**
     * 标示
     */
    flag ?: number
    /**
     * 项目类型
     */
    itemClass ?: string
    /**
     * 输入码
     */
    inputCode ?: string
    /**
     * 执行科室
     */
    performedBy ?: number
    /**
     * 录入医生
     */
    orderedByDoctor ?: number
    /**
     * 录入科室
     */
    orderedByDept ?: number
}

export interface OutpBill extends OutpBillDetailEntityPatManageOutpOrders {
    /**
     * 类型名称
     */
    itemClassName?: string
    /**
     * 是否可编辑:1:可编辑
     */
    editable?: number
}

export interface DataDict extends DataDictEntityDict {
    /**
     * agSelect是否可选择
     */
    open?: boolean
}

export interface BillDetailState {
    /**
     * 退费/保存缓存数据
     */
    dataList?: Array<OutpBill>
    /**
     * 急诊门诊医生收费明细
     */
    modelList?: Array<OutpBill>
    /**
     * 表格数据当前选中行索引
     */
    modelListIndex?: number
    /**
     * 表格数据input框选中行
     */
    modelListSelectRow?: Array<any>
    /**
     * 表格数据查询长度
     */
    modelListLength?: number
    /**
     * 查询急诊门诊医生收费明细参数
     */
    params?: Params
    /**
     * 价表项目分类字典
     */
    billItemClassDict?: Array<DataDict>
    /**
     * 价表字典视图
     */
    clinicPriceList?: ArrayData<any>
    /**
     * 价表字典视图列
     */
    clinicPriceListColumns?: Array<any>
    /**
     * 患者信息id
     */
    pvId?: number
    /**
     * 是否可退费
     */
    costsBack?: boolean
    /**
     * 整退
     */
    COSTS_BACK?: string
    /**
     * 操作: 用于签名判断执行函数
     */
    operate?: string
}

let agApi

/**
 * @author: bgq
 */
class BillDetailService extends BaseService<BillDetailState> {
    defaultState = {
        /**
         * 退费/保存缓存数据
         */
        dataList: [],
        /**
         * 急诊门诊医生收费明细
         */
        modelList: [],
        /**
         * 查询急诊门诊医生收费明细参数
         */
        params: {
            flag: 1,
            startTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
            endTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
            orderedByDoctor: loginService.state.user.id,
            orderedByDept: patientBasicService.state.model.deptCode
        },
        /**
         * 价表项目分类字典
         */
        billItemClassDict: [],
        /**
         * 价表字典视图
         */
        clinicPriceList: <ArrayData<any>><any>[],
        /**
         * 价表字典视图列
         */
        clinicPriceListColumns: [],
        /**
         * 患者信息id
         */
        pvId: patientBasicService.state.model.pvId,
        /**
         * 是否可退费
         */
        costsBack: false,
        /**
         * 操作: 用于签名判断执行函数
         */
        operate: '',
    }

    serviceWillMount() {
        this.dispatch2({
            pvId: patientBasicService.state.model.pvId,
            params: {
                flag: 1,
                startTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
                endTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
                orderedByDoctor: loginService.state.user.id,
                orderedByDept: patientBasicService.state.model.deptCode
            },
        })
        /**
         * 加载所有inputTable字典表
         */
        this.loadMultipleColumns(['clinicPriceList'])
        /**
         * 查询价表项目分类字典
         */
        this.loadBillItemClassDict()
        /**
         * 查询计价单
         */
        this.loadCosts()
        /**
         * 查询退费权限
         */
        this.loadAppGrant()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */
    /**
     * 查询价表项目分类字典
     */
    loadBillItemClassDict = () => {
        return ApiDictData.loadBillItemClassDict().then((data) => {
            // 特殊处理: 禁用药品选项
            if (data && data.length > 0) {
                data.forEach((v?: DataDict) => {
                    v.open = !(v.key === 'A' || v.key === 'B')
                })
            }
            this.dispatch({billItemClassDict: data})
        }).catch(msg => {
            message.tip(msg || '查询价表项目分类字典失败!')
        })
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
     * @param dictCode 字典名
     * @returns {Promise<void>}
     */
    loadMultipleColumns = (dictCode) => {
        return ApiDictInput.loadMultipleColumns(dictCode).then((data) => {
            if (!JsonUtil.isEmpty(data)) {
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.state[key + 'Columns'] = data[key]
                    }
                }
            }
            this.dispatch(this.state)
        }).catch(msg => message.tip(msg || '查询字典数据列失败!'))
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
    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 查询计价单
     */
    loadCosts = () => {
        const {params, pvId} = this.state
        return ApiPatManageOutpOrdersBillDetail.loadCosts(
            null,
            pvId,
            params.startTime,
            params.endTime,
            params.flag,
            params.itemClass,
            params.inputCode,
            params.performedBy,
            params.orderedByDoctor,
            params.orderedByDept
        ).then((data) => {
            this.dispatch2({modelList: data, modelListLength: data.length})
            agApi.api.setRowData(data)  // 刷新表格
            agApi.api.ensureIndexVisible(data.length - 1)  // 控制滚动条
        }).catch(msg => {
            message.tip(msg || '查询计价单失败!')
        })
    }

    /**
     * 查询退费计价单
     */
    loadCostsBack = () => {
        const {params, pvId} = this.state
        return ApiPatManageOutpOrdersBillDetail.loadCostsBack(
            null,
            pvId,
            params.startTime,
            params.endTime,
            params.flag,
            params.itemClass,
            params.inputCode,
            params.performedBy,
            params.orderedByDoctor,
            params.orderedByDept
        ).then((data) => {
            this.dispatch2({modelList: data, modelListLength: 0})
            agApi.api.setRowData(data)
        }).catch(msg => {
            message.tip(msg || '查询退费计价单失败!')
        })
    }

    /**
     * 查询退费权限
     */
    loadAppGrant = () => {
        return ApiAppData.loadAppGrant('patManage', 'costs-back').then((data) => {
            this.dispatch2({COSTS_BACK: data})
        }).catch(msg => {
            message.tip(msg || '查询退费权限失败!')
        })
    }
    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /**
     * 保存签名
     */
    saveSignature = () => {
        const {modelList, modelListLength} = this.state

        // 保存校验
        if (modelList.length <= modelListLength) {
            message.tip('没有可保存的数据!')
            return
        }
        let dataList = []
        for (let i = modelListLength; i < modelList.length; i++) {
            let model = modelList[i]
            if (!model.itemCode || model.itemCode.length === 0) {
                message.tip('【项目编码】不能为空,请选择【项目名称】!')
                this.agTabFocus(i, 'itemName')
                return
            }
            if (!model.amount && model.amount !== 0) {
                message.tip('【数量】不能为空!')
                this.agTabFocus(i, 'amount')
                return
            }
            if (model.amount <= 0) {
                message.tip('【数量】不能大于或小于0!')
                this.agTabFocus(i, 'amount')
                return
            }
            if (!model.orderedByDept || (!model.orderedByDept.id && model.orderedByDept.id !== 0)) {
                message.tip('【录入科室编码】不能为空,请选择【录入科室】!')
                this.agTabFocus(i, 'orderedByDept')
                return
            }
            if (!model.performedBy || (!model.performedBy.id && model.performedBy.id !== 0)) {
                message.tip('【执行科室编码】不能为空,请选择【执行科室】!')
                this.agTabFocus(i, 'performedBy')
                return
            }
            if (!model.itemPrice && model.itemPrice !== 0) {
                message.tip('【单价】不能为空,请选择其它【项目名称】!')
                this.agTabFocus(i, 'itemName')
                return
            }
            dataList.push(model)
        }
        this.dispatch2({dataList})
        // 【点保存/退费按键时签名
        const {BILL_SIGNATURE} = billSignatureModalService.state
        if (BILL_SIGNATURE === '1') {
            this.save()
        } else {
            this.dispatch2({'operate': 'save'})
            billSignatureModalService.setStateJson(true, 'isShow')
        }
    }

    /**
     * 保存急诊门诊医生收费明细
     */
    save = () => {
        const {dataList, pvId} = this.state
        return ApiPatManageOutpOrdersBillDetail.save(dataList, pvId).then((data) => {
            this.dispatch({modelList: data})
            this.loadCosts()
            message.tip('保存成功!')
        }).catch(msg => {
            message.tip(msg || '保存失败!')
        })
    }
    /**
     * 退费签名
     */
    costsBackSignature = () => {
        agApi.api.stopEditing()
        message.linkAge('您确定要退费吗?', null, '确定', '取消', this.costsBackSignatureOk)
    }
    /**
     * 确定退费
     */
    costsBackSignatureOk = () => {
        const {modelList, modelListSelectRow} = this.state
        if (modelListSelectRow.length === 0) {
            message.tip('请至少选择一行数据!')
            return
        }
        let dataList = []
        for (let i = 0; i < modelListSelectRow.length; i++) {
            let model = modelList[i]
            if (!model.amount && model.amount !== 0) {
                message.tip('【数量】不能为空!')
                this.agTabFocus(i, 'amount')
                return
            }
            if (model.amount <= 0) {
                message.tip('【数量】不能大于或小于0!')
                this.agTabFocus(i, 'amount')
                return
            }
            dataList.push(model)
        }
        this.dispatch2({dataList})
        // 【点保存/退费按键时签名
        const {BILL_SIGNATURE} = billSignatureModalService.state
        if (BILL_SIGNATURE === '1') {
            this.costsBack()
        } else {
            this.dispatch2({'operate': 'costsBack'})
            billSignatureModalService.setStateJson(true, 'isShow')
        }
    }
    /**
     * 退费
     */
    costsBack = () => {
        const {dataList, params, pvId} = this.state
        return ApiPatManageOutpOrdersBillDetail.costsBack(dataList,
            pvId,
            params.orderedByDept,
            params.orderedByDoctor
        ).then((data) => {
            message.tip(data || '退费成功!')
            this.loadCostsBack()
        }).catch(msg => {
            message.tip(msg || '退费失败!')
        })
    }

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /* =====分界线: 对外值改变: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJsonByPath = (path, data) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (data, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, data))
    }

    /**
     * 设置时间
     * @param data 时间选择返回值
     * @param {string[]} paths 多个时间的不同路径
     * @param pathComm 公共路径
     */
    dateChange = (data, paths: string[], ...pathComm) => {
        let model = JsonUtil.getJsonByKey2(pathComm, this.state, {})
        paths.forEach((path, index) => {
            model[path] = data[index]
        })
        this.dispatch(JsonUtil.json2(pathComm, this.state, model))
    }
    /* =====分界线: 对外值改变: 结束===== */
    /**
     * inputTable 处理
     * @param e api
     * @param dictCode 字典编码
     * @param params 参数
     * @param path 路径
     */
    inputTable = (e, dictCode, params, ...path) => {
        switch (e.type) {
            case 'blurEvent':
                break
            case 'enterEvent':
                this.setStateJsonByPath(path, e.data.value)
                break
            case 'changeEvent':
                this.setStateJsonByPath(path, e.value)
                this.loadData(
                    dictCode,
                    {
                        startIndex: e.pageCurrent,
                        pageSize: e.pageSize
                    },
                    e.value || '',
                    params || '')
                break
            default:
                this.setStateJsonByPath(path, e.value)
                this.loadData(
                    dictCode,
                    {
                        startIndex: e.pageCurrent,
                        pageSize: e.pageSize
                    },
                    e.value || '',
                    params || '')
                break
        }
    }

    /**
     *
     * @param e
     * @param dictCode
     * @param {(e) => void} callback
     * @param {string[]} paths
     * @param {string[]} datas
     * @param {string[]} pathComm
     */
    agInputTable = (e, dictCode, callback?: (e) => void, paths?: string[], datas?: string[], pathComm?: string[]) => {
        let rowIndex = e.props.rowIndex
        let model = JsonUtil.getJsonByKey2(pathComm, this.state, {})
        switch (e.type) {
            case 'blurEvent':
                break
            case 'enterEvent':
                let data = e.data
                paths.forEach((path, index) => {
                    model[path] = data[datas[index]]
                })
                this.setStateJson(model, 'modelList', rowIndex, pathComm)
                if ('orderedByDept' === pathComm[pathComm.length - 1]) {
                    this.agTabFocus(rowIndex, 'performedBy')
                } else if ('performedBy' === pathComm[pathComm.length - 1]) {
                    this.agTabEndFocus(rowIndex)
                }
                break
            case '':
                this.loadDataInputTabel(dictCode, e, callback)
                break
            case 'changeEvent':
                // model[paths[0]] = e.value
                // this.setStateJson2(model, 'modelList', rowIndex, pathComm)
                this.loadDataInputTabel(dictCode, e, callback)
                break
            default:
                if (paths.length === 1) {
                    model[paths[0]] = e.value
                } else {
                    model[paths[0]] = null
                    model[paths[1]] = e.value
                }
                this.setStateJson(model, 'modelList', rowIndex, pathComm)
                this.loadDataInputTabel(dictCode, e, callback)
                break
        }
    }

    /**
     * inputTable 处理
     * @param e api
     * @param dictCode 字典编码
     * @param {(e) => void} callback 回调函数
     */
    inputTableItemName = (e, dictCode, callback?: (e) => void) => {
        let rowIndex = e.props.rowIndex
        let params = JSON.stringify({itemClass: this.state.modelList[rowIndex].itemClass || ''})
        let others = ['itemCode', 'itemName', 'itemSpec', 'units', 'performedBy', 'itemPrice', 'amount', 'costs', 'charges']
        const {modelList} = this.state
        let model = modelList[rowIndex]
        switch (e.type) {
            case 'blurEvent':
                break
            case 'enterEvent':
                let data = e.data
                model.itemClass = data.itemClass
                model.itemClassName = data.itemClassName
                model.itemCode = data.key
                model.itemName = data.value
                model.itemSpec = data.itemSpec
                model.units = data.units
                /**
                 * 执行科室特殊处理:
                 * 1.项目对应的【执行科室】:取项目对应的【执行科室】;
                 * 2.已选择的【执行科室】:【执行科室】不改变;
                 * 3.当前患者的【科室】:取当前患者的【科室】
                 */
                if (!JsonUtil.isEmpty(data.performedBy)) {
                    // 项目对应的【执行科室】不为空时,取项目对应的【执行科室】
                    model.performedBy = {
                        id: data.performedBy,
                        deptName: data.performedByName
                    }
                } else {
                    // 已选择的【执行科室】为空时,取当前患者的【科室】,否则【执行科室】不改变
                    if (JsonUtil.isEmpty(model.performedBy) || JsonUtil.isEmpty(model.performedBy.id)) {
                        model.performedBy = {
                            id: patientBasicService.state.model.deptCode,
                            deptName: patientBasicService.state.model.deptName
                        }
                    }
                }
                model.itemPrice = data.price
                // 数量无值时，默认为1
                model.amount = JsonUtil.isEmpty(model.amount) ? 1 : model.amount
                // 计算计价金额
                model.costs = model.amount * data.price
                // 设置【实收费用】,【实收费用】在未计算优惠价格时,同【计价金额】
                model.charges = model.costs
                this.setStateJson2(model, 'modelList', rowIndex)
                others.push('itemClass')
                others.push('itemClassName')
                // 更新ag表格行数据
                this.agTabUpdate(this.state.modelList, rowIndex, others)
                // enter转tab: 【项目名称】=>【数量】
                this.agTabFocus(rowIndex, 'amount')
                break
            case  '':
                // this.setStateJson2(e.value || '', 'modelList', rowIndex, 'itemName')
                this.loadDataInputTabel(dictCode, e, callback, params)
                break
            case 'changeEvent':
                // others.forEach((key) => {
                //     if (key !== 'performedBy' && key !== 'amount') {
                //         model[key] = null
                //     }
                // })
                // 设置缓存值
                this.setStateJson2(model, 'modelList', rowIndex)
                // 请求数据源
                this.loadDataInputTabel(dictCode, e, callback, params)
                // 更新ag表格行数据
                this.agTabUpdate(this.state.modelList, rowIndex, others)
                break
            default:
                // 请求数据源
                this.loadDataInputTabel(dictCode, e, callback, params)
                break
        }
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
     * 获取项目类型数据源
     * @param callback 回调函数
     */
    agDataItemClass = (callback) => {
        callback(this.state.billItemClassDict)
    }

    /**
     * ag项目类型改变
     * @param data 值
     * @param rowIndex ag列索引
     */
    agChangeItemClass = (data, rowIndex) => {
        switch (data.key) {
            case 'A':
            case 'B':
                message.tip('药品不能手工录入计费!')
                // this.agInputTable(this.state.modelList, rowIndex)
                break
            default:
                const {modelList} = this.state
                let model = modelList[rowIndex]
                model.itemClass = data.key
                model.itemClassName = data.value
                model.amount = 1
                model.billDate = new Date()
                model.orderedByDoctor = {
                    id: loginService.state.user.id,
                    name: loginService.state.user.name
                }
                model.orderedByDept = {
                    id: patientBasicService.state.model.deptCode,
                    deptName: patientBasicService.state.model.deptName
                }
                this.setStateJson(model, 'modelList', rowIndex)
                this.agTabUpdate(this.state.modelList, rowIndex,
                    [
                        'itemClass',
                        'itemClassName',
                        'itemCode',
                        'itemName',
                        'itemSpec',
                        'units',
                        'itemPrice',
                        'amount',
                        'costs',
                        'charges',
                    ])
                this.agTabFocus(rowIndex, 'itemName')
                break
        }
    }

    /**
     * ag表格更新行数据
     * @param modelList 表格数据数组
     * @param rowIndex 当前行索引
     * @param {Array<any>} others
     */
    agTabUpdate(modelList, rowIndex, others?: Array<any>) {
        let dataList = []
        agApi.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                others.forEach((v) => {
                    data[v] = modelList[rowIndex][v]
                })
                dataList.push(data)
            }
        })
        agApi.api.updateRowData({update: dataList})
    }

    /**
     * ag表格删除
     */
    agTabDel = () => {
        let {modelList, modelListSelectRow} = this.state
        agApi.api.stopEditing()
        if (modelListSelectRow.length === 0) {
            message.tip('请至少选择一行数据!')
            return
        }
        for (let i = modelListSelectRow.length - 1; i >= 0; i--) {
            modelList.splice(modelListSelectRow[i], 1)
        }
        agApi.api.setRowData(modelList)
        this.dispatch2({modelList, modelListSelectRow: []})
    }

    /**
     * ag表格添加
     */
    agTabAdd = () => {
        let api = agApi.api
        let {modelList} = this.state
        let data = {
            editable: 1, // 是否可编辑
            amount: 1,
            billDate: new Date(),
            orderedByDoctor: {
                id: loginService.state.user.id,
                name: loginService.state.user.name
            },
            orderedByDept: {
                id: patientBasicService.state.model.deptCode,
                deptName: patientBasicService.state.model.deptName
            },
            performedBy: {
                id: patientBasicService.state.model.deptCode,
                deptName: patientBasicService.state.model.deptName
            }
        }
        if (!modelList) modelList = []
        modelList.push(data)
        this.dispatch2({modelList: modelList})
        api.stopEditing()  // 停止编辑
        api.setRowData(modelList)  // 刷新表格
        api.ensureIndexVisible(modelList.length - 1)  // 控制滚动条
        // 设置焦点
        this.agTabFocus(modelList.length - 1, 'itemName', api)
    }

    /**
     * agTab焦点
     * @param rowIndex 行索引
     * @param colKey 列名
     * @param api api
     */
    agTabFocus = (rowIndex, colKey, api?: any) => {
        api = api ? api : agApi.api
        // 清除ag表格焦点
        // api.clearFocusedCell() // 开启后,由于 inputTable 设置值,在agTab中不显示,则先注释
        // 清除ag表格中主键焦点,停止编辑模式
        // api.stopEditing() // 开启后,由于 inputTable 设置值,在agTab中不显示,则先注释
        setTimeout(() => {
            // 设置ag表格焦点
            api.setFocusedCell(rowIndex, colKey)
            // 设置ag表格中主键焦点,开启模式
            api.startEditingCell({rowIndex: rowIndex, colKey: colKey})
            let data = {}
            data[rowIndex] = true
            this.agTabSelect(data)
        }, 10)
    }

    /**
     * 设置选择行
     * @param data json对象 {'列索引':'布尔值 true或false '}
     */
    agTabSelect = (data) => {
        agApi.api.forEachNode(function (node) {
            if (data[node.rowIndex]) {
                node.setSelected(true)
            } else {
                node.setSelected(false)
            }
        })
    }

    /**
     * ag表格选择
     */
    agTabSelectRow = (nodes) => {
        let modelListSelectRow = []
        const {modelListLength} = this.state
        let length = modelListLength ? modelListLength : 0
        if (nodes) {
            nodes.forEach((node) => {
                if (length <= node.rowIndex) {
                    modelListSelectRow.push(node.rowIndex)
                }
            })
        }
        this.dispatch2({modelListSelectRow})
    }

    /**
     * 触发值改变
     * @param e api
     */
    onCellValueChanged = (e) => {
        // 获取改变值列名
        let columnName = e.column.colId
        // 获取改变值
        let data = e.newValue
        // 获取改变值当前索引
        let rowIndex = e.rowIndex
        if (columnName === 'itemClassName' || columnName === 'itemName') {
            // 设置值
            this.setStateJson(data, 'modelList', e.rowIndex, columnName)
        }
        // 单独处理【数量】值改变
        else if (columnName === 'amount') {
            const {modelList} = this.state
            let model = modelList[rowIndex]
            // 获取单价
            let itemPrice = model.itemPrice
            // 获取数量,为数字时,直接取值,否则默认为1
            model.amount = JsonUtil.isNumber(data) ? data : 1
            // 判断单价是否为数字,为数字时计算金额,否则将金额置空
            if (JsonUtil.isNumber(itemPrice)) {
                // 计算金额,并保留4位小数,第5位小数,零舍余入
                model.costs = this.toFixed(model.amount * itemPrice)
                // 设置【实收费用】,【实收费用】在未计算优惠价格时,同【计价金额】
                model.charges = model.costs
            } else {
                // 置空金额
                model.costs = null
                // 设置【实收费用】,【实收费用】在未计算优惠价格时,同【计价金额】
                model.charges = null
            }
            // 设置值
            // this.setStateJson2(model, 'modelList', rowIndex)
            // 刷新表格
            this.agTabUpdate(modelList, rowIndex,
                [
                    'itemPrice',
                    'amount',
                    'costs',
                    'charges',
                ])
            // 退费时,不管焦点设置
            const {costsBack} = this.state
            if (costsBack) return
            this.agTabEndFocus(rowIndex, modelList)
        }
    }

    /**
     * 设置行最后一个的enter转tab
     * @param rowIndex 索引
     * @param {Array<any>} modelList 数组
     */
    agTabEndFocus = (rowIndex, modelList?: Array<any>) => {
        modelList = this.state.modelList
        /**
         * enter转tab: 【数量/执行科室】=> 【项目名称】
         * 1.当前选择行为最后一行时,添加一行,焦点指定到【项目名称】
         * 2.当前选择行小于最后一行时,直接将焦点指定到当前选择行的下一行的【项目名称】
         * 3.当前选择行大于最后一行时,给出异常提示
         */
        if (modelList.length - 1 === rowIndex) {
            // 1.当前选择行为最后一行时,添加一行,焦点指定到【项目名称】,★特殊: 由于 【this.agTabAdd()】 函数中已将焦点指定到【项目名称】,这里只需要直接调用即可
            this.agTabAdd()
        } else if (modelList.length - 1 > rowIndex) {
            // 2.当前选择行小于最后一行时,直接将焦点指定到当前选择行的下一行的【项目名称】
            this.agTabFocus(rowIndex + 1, 'itemName')
        } else {
            //  3.当前选择行大于最后一行时,给出异常提示
            message.tip('异常信息: 【当前选中行索引】大于【表格数据长度】!')
        }
    }

    /**
     * 保留4位小数,第5位小数,零舍余入(注: 指0则舍去,直接不要;其余的1-9的数字向上进1)
     * @param {number} data
     * @returns {number}
     */
    toFixed = (data) => {
        return data ? Math.ceil(data.toFixed(5) * 10000) / 10000 : 0
    }

    /**
     * 可退费
     * @param data
     */
    costsBackChange = (data) => {
        this.dispatch2({costsBack: data})
        if (this.state.costsBack) {
            this.loadCostsBack()
        } else {
            this.loadCosts()
        }
    }

    /**
     * 页面刷新
     * @param params
     */
    onGridReady = (params) => {
        agApi = params
        agApi.api.sizeColumnsToFit()
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const billDetailService = new BillDetailService('billDetail')