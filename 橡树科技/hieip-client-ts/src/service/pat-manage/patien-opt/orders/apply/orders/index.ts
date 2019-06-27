/**
 * 综合医嘱service
 */
import {BaseService} from 'tools/flux/BaseService'
import {patientBasicService} from '../../../patient-basic'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'
import {
    ClinicItemClassDictEntityPatManageOrdersClinic, OrdersEntityPatManageOrders, Page,
    AdministrationDictEntityPatManageOrdersClinic, DosageUnitsDictEntityPatManageOrdersDict,
    PerformFreqDictEntityPatManageOrdersDict, ExplainDoctorDictEntityExplain, OrdersCostsEntityPatManageOrders
} from 'pkg/entity'
import {ApiAppData, ApiComm, ApiDictInput, ApiPatManageOrders, ArrayData} from 'pkg/api'
import moment from 'moment'
import {loginService} from 'service/user/login'

let ordersTableApi // 储存agApi
let orderNumber = 0 // 存储增删插入操作时拟定的orderNo值

export interface Order extends OrdersEntityPatManageOrders {
    open?: boolean // 双击编辑
    // 药品保存时所需额外字段 非药品不需要
    dosePerUnit?: number // 剂量
    doseUnits?: string // 单位
    doctorLimit?: number // 判断医生是否有权限下药品
    bz?: string  // 医保说明
    drugClass?: string // 等同医嘱类型
    drugSpec?: string  // 规格 保存所需
    firmId?: string  // 厂商 保存所需
    key?: string  // 药品编码
    storage?: string  // 药房
    toxiProperty?: string  // 分单所需
    drugIndicatorCode?: string // 分单所需
}

export interface OrderState {
    orderData?: ArrayData<Order> // 医嘱表数据
    orderSingle?: Order // 单条医嘱信息
    orderItemClass?: ArrayData<ClinicItemClassDictEntityPatManageOrdersClinic>  // 医嘱类型字典
    administrationDict?: ArrayData<AdministrationDictEntityPatManageOrdersClinic> // 给药途径字典
    dosageUnitsDict?: ArrayData<DosageUnitsDictEntityPatManageOrdersDict> // 医嘱剂量单位字典
    performFreqDict?: ArrayData<PerformFreqDictEntityPatManageOrdersDict> // 医嘱频率字典
    explainDoctorDict?: ArrayData<ExplainDoctorDictEntityExplain> // 医嘱说明字典
    startDateTime?: Date // 获取服务器时间
    pvId?: number // 病人信息id
    orderClass?: string // 医嘱类型
    repeatIndicator?: number // 长期医嘱标识
    billingOpen?: boolean // 计费弹框打开状态
    tempOpen?: boolean // 快速医嘱弹框状态
    menuList?: ArrayData<any> // 医嘱右键菜单
    columnsTitle?: string // 暂存inputTable的列头值 优化请求方式
    rowIndex?: number // 医嘱表格行号
    cellId?: string // 医嘱表格列名
    saveCostsLength?: number // 医嘱状态为已保存计价条数
    orderLength?: number // 查询不可编辑的医嘱长度 排序用
    editData?: Array<any> // 选中的可编辑数据
    showNewVersion?: number // 为2是新急诊医嘱界面 为1是医护一体医嘱界面(计价在下边)
    /***计价***/
    saveCosts?: ArrayData<OrdersCostsEntityPatManageOrders> // 已保存计价医嘱计价
    otherCosts?: ArrayData<OrdersCostsEntityPatManageOrders> // 其他不可编辑计价
    showCosts?: ArrayData<OrdersCostsEntityPatManageOrders> // 显示医嘱计价Array
    canControl?: boolean // 根据医嘱状态判断是否是可编辑的计价项
}

class OrderService extends BaseService<OrderState> {
    defaultState = {
        orderData: <ArrayData<Order>><any>[],
        orderSingle: {},
        billingOpen: false,
        tempOpen: false,
        menuList: <ArrayData<any>>[],
        columnsTitle: '',
        rowIndex: -1,
        showNewVersion: 1, // 医护一体
        saveCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[],
        otherCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[],
        canControl: false,
    }

    serviceWillMount() {
        // this.loadOrders() // 加载时查询医嘱
        this.loadClinicItemClassDict() // 急诊诊疗项目分类字典
        // this.loadOrdersCosts(null, null, 5, null, '', null) // 已保存计价
        this.loadNowDate() // 查询服务器时间
    }

    /**
     * 查询服务器时间
     */
    loadNowDate = () => {
        ApiComm.loadNowDate().then((data) => {
            this.dispatch2({
                startDateTime: data
            })
        })
    }

    /**
     * 获取医嘱ag表格api
     * @param params - api
     */
    ordersTableApi = (params) => {
        ordersTableApi = params
    }

    /**
     * 查询配置参数 - 及使用哪个版本
     */
    whichVersion = () => {
        return ApiAppData.loadAppGrant('patManage', 'costs-back').then((data) => {
            this.dispatch2({showNewVersion: data})
        }).catch(msg => {
            message.tip(msg || '查询退费权限失败!')
        })
    }

    /**
     * 公共设值方法
     * @param path -- 字段
     * @param data -- 值
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
        this.dispatch(JsonUtil.json2(path, this.state, data))
        if (path[0] === 'orderData') { // 因为爱
            this.agTabUpdate(this.state.orderData, path[1], [path[2]])
        }
    }

    /**
     * 在药品和长临下拉框点击时关闭双击强制打开编辑
     */
    closeDoubleEdit = (path, rowIndex) => {
        let {orderData} = this.state
        let model = orderData[rowIndex]
        // 将需要关闭的字段设置为false - 不能编辑
        this.dispatch(JsonUtil.json(path, this.state, false))
        let others = ['frequency', 'performSchedule']
        switch (orderData[rowIndex].orderClass) {
            case 'A':
            case 'B':
                break
            default:
                model.dosage = null
                model.dosageUnits = ''
                model.administration = ''
                others.push('dosage')
                others.push('dosageUnits')
                others.push('administration')
                break
        }
        model.frequency = ''
        model.performSchedule = ''
        this.setStateJson2(model, 'orderData', rowIndex)
        this.agTabUpdate(orderData, rowIndex, others)
    }

    /**
     * 根据医嘱状态添加样式
     * @param params - 数据
     * @param css - css样式
     */
    setRowClass = (params, css) => {
        let data = params.data
        let style = ``
        if (data.orderStatus === -1 || data.orderStatus === 5) {
            style = `${css.publicAgText} ${css.agInputTable}`
        }
        else {
            switch (data.orderStatus) {
                case 1:
                    style = `${css.agStopEdit} ${css.newOrder}`
                    break
                case 2:
                    style = `${css.agStopEdit} ${css.doOrder}`
                    break
                case 3:
                    style = `${css.agStopEdit} ${css.stopOrder}`
                    break
                case 4:
                    style = `${css.agStopEdit} ${css.delOrder}`
                    break
                case 6:
                    style = `${css.agStopEdit} ${css.alreadyOrder}`
                    break
                default:
                    style = `${css.publicAgText} ${css.agInputTable}`
                    break
            }
        }
        return style
    }

    /**
     * 查询字典数据列 - inputTable
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
     * 查询字典数据列
     * @param dictCode 字典名
     * @returns {Promise<void>}
     */
    loadColumns = (dictCode) => {
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            return data
        }).catch(msg => message.tip(msg || '查询字典数据列失败!'))
    }

    /**
     * 查询字典数据 - inputTable
     * @param dictCode 字典编码
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @param params
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string, params?: string) => {
        page = page ? page : {startIndex: 1, pageSize: 7}
        return ApiDictInput.loadData(page, dictCode, inputCode, params).then((data) => {
            this.setStateJson(dictCode, data)
            return data
        }).catch(msg => message.tip(msg || '查询字典数据失败!', 'error'))
    }

    /**
     * 根据医嘱类别判断inputTable的表头值 - 医嘱内容
     * @param {number} rowIndex - 表格行
     * @param callback
     */
    orderTextDictCol = (rowIndex: number, callback) => {
        const {orderData} = this.state
        let orderClass: any = JsonUtil.getJsonByKey(rowIndex + '.orderClass', orderData)
        switch (orderClass) {
            case 'A':
            case 'B':
                this.loadColumns('ordersDrugDict').then(data => {
                    callback(data)
                })
                break
            default:
                this.loadColumns('clinicItemNameDict').then(data => {
                    callback(data)
                })
                break
        }
    }

    /**
     * inputTable 事件
     * @param v - evnet
     * @param callback - function
     */
    orderTextDict = (v, callback) => {
        const {orderData} = this.state
        let add = orderData[v.props.rowIndex]
        let rowNode = ordersTableApi.api.getRowNode(v.props.node.id) // 更改行id
        let orderClass: any = JsonUtil.getJsonByKey(v.props.rowIndex + '.orderClass', orderData)
        switch (v.type) {
            case 'enterEvent':
                this.orderTextChange(orderClass, callback, v, '')
                if (add.orderClass === 'A' || add.orderClass === 'B') {
                    /*药品选择时 字段保存
                    dosePerUnit 剂量
                    doseUnits 单位
                    doctorLimit 判断医生是否有权限下药品
                    bz 医保说明
                    drugClass = orderClass
                    drugSpec 规格 保存所需
                    firmId 厂商 保存所需
                    key 药品编码
                    storage 药房
                    toxiProperty & drugIndicatorCode 分单所需*/
                    add.doctorLimit = v.data.doctorLimit
                    add.bz = v.data.bz
                    add.drugClass = v.data.drugClass
                    // add.drugSpec = v.data.drugSpec
                    add.firmId = v.data.firmId
                    add.key = v.data.key
                    add.storage = v.data.storage
                    add.toxiProperty = v.data.toxiProperty
                    add.drugIndicatorCode = v.data.drugIndicatorCode
                    if (add.dosage) {
                        if (add.dosage === null) {
                            add.dosage = v.data.dosePerUnit
                        }
                    }
                    else {
                        add.dosage = v.data.dosePerUnit
                    }
                    if (add.dosageUnits) {
                        if (add.dosageUnits === '') {
                            add.dosageUnits = v.data.doseUnits
                        }
                    }
                    else {
                        add.dosageUnits = v.data.doseUnits
                    }
                }
                else {
                    if (add.doctorLimit) {
                        add.doctorLimit = null
                        add.bz = ''
                        add.drugClass = ''
                        // add.drugSpec = ''
                        add.firmId = ''
                        add.key = ''
                        add.storage = ''
                        add.toxiProperty = ''
                        add.drugIndicatorCode = ''
                    }
                    if (add.orderClass === '') {
                        add.orderClass = v.data.drugClass
                    }
                }
                add.orderCode = v.data.key
                add.orderSpec = v.data.drugSpec
                add.orderText = v.value
                this.agTabUpdate(orderData, v.props.rowIndex, ['dosageUnits', 'dosage'])
                this.loadOrdersCostsNoSave(add, v.props)
                break
            case 'changeEvent':
                this.orderTextChange(orderClass, callback, v, v.value)
                add.dosage = null
                add.dosageUnits = ''
                this.agTabUpdate(orderData, v.props.rowIndex, ['dosageUnits', 'dosage'])
                break
            default:
                this.orderTextChange(orderClass, callback, v, v.value)
                break
        }
    }

    /**
     * 固定表头请求
     * @param v - evnet
     * @param callback callback - function
     * @param path - 路径字段
     */
    noChangeColumns = (v, callback, path) => {
        this.loadColumns(path).then((data) => {
            callback(data)
        })
    }

    /**
     * 请求医嘱内容
     * @param orderClass - 医嘱单
     * @param callback 回调
     * @param v 传值对象
     * @param values
     */
    orderTextChange = (orderClass, callback, v, values) => {
        let page = {startIndex: v.pageCurrent, pageSize: v.pageSize}
        let areaId = patientBasicService.state.model.areaId
        switch (orderClass) {
            case 'A':
                this.loadData('ordersDrugDict', page, values, JSON.stringify({
                    configType: 'dispe',
                    chineseorwestern: 0,
                    station: 'doc',
                    areaId: areaId
                })).then(data => {
                    callback(data)
                })
                break
            case 'B':
                this.loadData('ordersDrugDict', page, values, JSON.stringify({
                        configType: 'dispe',
                        chineseorwestern: 1,
                        station: 'doc',
                        areaId: areaId
                    }
                )).then(data => {
                    callback(data)
                })
                break
            default:
                this.loadData('clinicItemNameDict', page, values).then(data => {
                    callback(data)
                })
                break
        }
    }

    /**
     * 急诊诊疗项目分类字典 - 普通select
     */
    loadClinicItemClassDict = () => {
        return ApiPatManageOrders.loadClinicItemClassDict().then((data) => {
            this.dispatch({orderItemClass: data})
        }).catch(msg => message.tip(msg || '查询项目分类字典失败', 'error'))
    }

    /**
     * inputTable 判断公共方法
     * @param v - 传输值
     * @param dict - 字典名
     * @param path - 路径名
     * @param callback - 回调事件
     */
    inputTableCellBack = (v, dict, path, callback) => {
        let page = {startIndex: v.pageCurrent, pageSize: v.pageSize}
        switch (v.type) {
            case 'enterEvent':
                // 根据频率和途径判断执行时间
                if (dict === 'performFreqDict') {
                    this.setStateJson('orderData.' + v.props.rowIndex + '.freqIntervalUnits', v.data.freqIntervalUnits)
                    let admin = JsonUtil.getJsonByKey('orderData.' + v.props.rowIndex + '.administration', this.state)
                    if (v.value && admin) this.loadPerformSchedule(v.value, admin, v)
                }
                else if (dict === 'administrationDict') {
                    let freq = JsonUtil.getJsonByKey('orderData.' + v.props.rowIndex + '.freqCounter', this.state)
                    if (v.value && freq) this.loadPerformSchedule(freq, v.value, v)
                }
                else {
                    this.setStateJson(`orderData.${v.props.rowIndex}.${v.props.column.colId}`, v.value)
                }
                break
            default:
                this.loadData(dict, page, v.value).then((data) =>
                    callback(data)
                )
                break
        }
    }

    /**
     * 查询执行时间默认值
     * @param {string} freqDesc - 执行频率
     * @param {string} administration - 给药途径
     * @param params
     */
    loadPerformSchedule = (freqDesc?: string, administration?: string, params?: any) => {
        return ApiPatManageOrders.loadPerformSchedule(freqDesc, administration).then((data) => {
            let value = data ? data : ''
            let rowNode = ordersTableApi.api.getRowNode(params.props.node.id)
            rowNode.setDataValue('performSchedule', value)
            this.setStateJson('orderData.' + params.props.rowIndex + '.performSchedule', value)
        }).catch(msg => message.tip(msg || '查询默认执行时间失败', 'error'))
    }

    /**
     * 查询符合条件的医嘱
     * @return {Promise<OrdersEntityPatManageOrders>}
     */
    loadOrders = () => {
        let {orderClass, repeatIndicator, pvId} = this.state
        let pvid = pvId ? pvId : patientBasicService.state.model.pvId
        if (!pvid) {
            message.tip('患者信息id不能为空', 'error')
            return
        }
        return ApiPatManageOrders.loadOrders(pvid, orderClass, repeatIndicator).then((data) => {
            this.dispatch2({
                orderData: data,
                orderSingle: {},
                orderLength: data.total || 0,
                showCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[],
            })
            this.loadOrdersCosts(null, null, 5, null, '', null) // 已保存计价
        }).catch(msg => message.tip(msg || '未查询出数据', 'error'))
    }

    /**
     * 增加医嘱
     */
    addOrder = () => {
        let {orderData, startDateTime} = this.state
        let info = orderData[orderData.length - 1]
        orderNumber -= 1 // 拟定的orderNo值
        if (info && info.pvId && (info.orderStatus === -1 || info.orderStatus === 5)) {
            let data = JsonUtil.clone(info)
            orderData.push({
                pvId: data.pvId, // 患者id
                orderingDept: {id: patientBasicService.state.model.deptCode}, // 申请科室
                doctor: {id: loginService.state.user.id}, // 申请医生
                repeatIndicator: data.repeatIndicator, // 默认临时
                orderClass: data.orderClass, // 默认西药
                startDateTime: data.startDateTime, // 开始时间
                drugBillingAttr: 0, // 默认正常计价
                orderStatus: -1, // 默认状态未保存
                orderNo: orderNumber, // 拟定的orderNo值
                orderSubNo: 1, // 新增医嘱子医嘱序号为1
            })
        }
        else {
            orderData.push({
                pvId: patientBasicService.state.model.pvId, // 患者id
                orderingDept: {id: patientBasicService.state.model.deptCode}, // 申请科室
                doctor: {id: loginService.state.user.id}, // 申请医生
                repeatIndicator: 0, // 默认临时
                orderClass: 'A', // 默认西药
                startDateTime: startDateTime, // 开始时间
                drugBillingAttr: 0, // 默认正常计价
                orderStatus: -1, // 默认状态未保存
                orderNo: orderNumber, // 拟定的orderNo值
                orderSubNo: 1, // 新增医嘱子医嘱序号为1
            })
        }
        this.dispatch2({
            orderData: orderData,
            showCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[],
            canControl: true,
            rowIndex: orderData.length + 1,
        })
        ordersTableApi.api.stopEditing()  // 停止编辑
        ordersTableApi.api.setRowData(orderData)  // 刷新表格
        ordersTableApi.api.ensureIndexVisible(orderData.length - 1)  // 控制滚动条
        ordersTableApi.api.startEditingCell({rowIndex: orderData.length - 1, colKey: 'orderText'})
        ordersTableApi.api.forEachNode((node) => {
            if (node.rowIndex === orderData.length - 1) {
                node.setSelected(true)
            }
        })
    }

    /**
     * 插入医嘱
     */
    insertOrder = () => {
        let {rowIndex, orderSingle, orderData, startDateTime} = this.state
        orderNumber -= 1 // 拟定的orderNo值
        if (rowIndex && (orderSingle.orderStatus === -1 || orderSingle.orderStatus === 5)) {
            let insert = rowIndex - 1 ? rowIndex : 0
            orderData.splice(insert, 0, {
                pvId: patientBasicService.state.model.pvId, // 患者id
                orderingDept: {id: patientBasicService.state.model.deptCode}, // 申请科室
                doctor: {id: loginService.state.user.id}, // 申请医生
                repeatIndicator: 0, // 默认临时
                orderClass: 'A', // 默认西药
                startDateTime: startDateTime, // 开始时间
                drugBillingAttr: 0, // 默认正常计价
                orderStatus: -1, // 默认状态未保存
                orderNo: orderNumber, // 拟定的orderNo值
            })
            ordersTableApi.api.setRowData(orderData)  // 刷新表格
            ordersTableApi.api.stopEditing()  // 停止编辑
            ordersTableApi.api.ensureIndexVisible(orderData.length - 1)  // 控制滚动条
            this.dispatch2({
                orderData,
                showCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[],
                canControl: true,
                rowIndex: insert,
            })
            ordersTableApi.api.forEachNode((node) => {
                if (node.rowIndex === rowIndex) {
                    node.setSelected(true)
                }
            })
            ordersTableApi.api.startEditingCell({rowIndex: rowIndex, colKey: 'orderText'})
        }
        else {
            message.tip('请选择正确插入行', 'warning')
        }
    }

    /**
     * 删除医嘱
     */
    delOrder = () => {
        let {editData, orderData} = this.state
        if (editData.length) {
            for (let i = editData.length - 1; i >= 0; i--) {
                orderData.splice(editData[i], 1)
            }
        }
        else {
            message.tip('请选择正确行进行删除', 'error')
        }
        ordersTableApi.api.setRowData(orderData)
        ordersTableApi.api.stopEditing()  // 停止编辑
        ordersTableApi.api.ensureIndexVisible(editData[0])  // 控制滚动条
        this.dispatch2({
            orderData,
            editData: [],
            orderSingle: {},
            rowIndex: -1,
            canControl: false,
            showCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[]
        })
    }

    /**
     * 保存医嘱
     */
    saveOrders = (orderStatus: number) => {
        let {orderData, orderLength, saveCosts} = this.state
        let modelList = []
        for (let i = orderLength; i < orderData.length; i++) {
            modelList.push(orderData[i])
        }
        // console.log(orderData)
        return ApiPatManageOrders.save(
            orderStatus,
            patientBasicService.state.model.pvId,
            loginService.state.user.doctorRank,
            '',
            modelList,
            saveCosts
        ).then((data) => {
            message.tip(data || '保存成功', 'success')
        }).catch(msg => message.tip(msg || '保存失败', 'error'))
    }

    /**
     * 判断是否是可编辑状态
     */
    editOrNot = (event) => {
        if (event.node && event.node.data) {
            let data = event.node.data
            return !(data.orderStatus !== -1 && data.orderStatus !== 5)
        }
        else {
            return false
        }
    }

    /**
     * 表格值变化触发事件
     * @param params - 表格参数
     */
    cellValueChange = (params) => {
        // console.log(params)
        let colId = params.column.colId // 行的列规则
        let rowIndex = params.rowIndex // 行的index
        let rowNode = ordersTableApi.api.getRowNode(params.node.id) // 更改行id
        // 执行时间格式判断
        if (colId === 'performSchedule') {
            const freq = JsonUtil.getJsonByKey('orderData.' + rowIndex + '.freqIntervalUnits', this.state)
            let value = params.value // 用户键入的执行时间值
            let reg = /\s/ // 空格
            let reg2 = /^[0-9]*$/ // 数字
            if (value !== '' && value.charCodeAt() < 255 && reg.exec(value) === null) {
                let symbol = [] // 判断; - :符号预存数组
                let symNum = 0 // 预存包含3种符号的种数
                symbol[0] = value.toString().indexOf(':') !== -1 // 冒号
                symbol[1] = value.toString().indexOf('-') !== -1 // 横线
                symbol[2] = value.toString().indexOf(';') !== -1 // 分号
                for (let i = 0; i < symbol.length; i++) {
                    if (symbol[i]) {
                        symNum++
                    }
                }
                switch (freq) {
                    case '周':
                        if (symNum <= 1 && symbol[2]) {
                            let splitValue = value.toString().split('') // 彻底拆分
                            let splitValueNum = 0 // 彻底拆分计数,计算横线个数
                            let semicolon = value.toString().split(';') // 以分号拆分
                            let semicolonNum = 0 // 以分号拆分计数,计算数字个数
                            let exceed = false // 键入值是否大于等于7
                            for (let i = 0; i < splitValue.length; i++) {
                                if (splitValue[i] === ';') {
                                    splitValueNum++
                                }
                            }
                            for (let i = 0; i < semicolon.length; i++) {
                                if (semicolon[i] !== '') {
                                    semicolonNum++
                                }
                                if (semicolon[i] !== '' && parseInt(semicolon[i], 10) > 7) {
                                    exceed = true
                                }
                            }
                            // 说明横线两边皆有数字 && 没有重复的天数 && 都为数字 && 且数字都未超过7
                            if (semicolonNum === splitValueNum && semicolon.length === Array.from(new Set(semicolon)).length &&
                                reg2.test(semicolon.join('')) && !exceed && semicolonNum >= 1 && semicolonNum <= 7) {
                                rowNode.setDataValue('performSchedule', value)
                            }
                            else {
                                message.tip('执行格式有误', 'error')
                                rowNode.setDataValue('performSchedule', '')
                            }
                        }
                        else {
                            message.tip('执行格式有误', 'error')
                            rowNode.setDataValue('performSchedule', '')
                        }
                        break
                    case '': // 频率单位为空时
                        // message.tip('频次不能为空', 'error')
                        break
                    default: // 频率单位除空和周之外的其他
                        if (symNum <= 1) { // 判断当前符号数为1时
                            if (symbol[0]) { // 包含符号为:时
                                let splitValue = value.toString().split(':') // 按:切割判断
                                if (splitValue.length === 2 && reg2.test(splitValue[0])
                                    && reg2.test(splitValue[1]) && parseInt(splitValue[0], 10) < 24
                                    && parseInt(splitValue[1], 10) < 60) { // 冒号两边都有 && 左边和右边都为数字 && 左边小于24右边小于60
                                    let time = ''
                                    if (parseInt(splitValue[0], 10) < 10) { // 输入小时时判断1位或2位，1位则自动加0
                                        time += `0${parseInt(splitValue[0], 10)}`
                                    } else {
                                        time += parseInt(splitValue[0], 10)
                                    }
                                    if (parseInt(splitValue[1], 10) < 10) { // 输入分钟时判断1位或2位，1位则自动加0
                                        time += `:0${parseInt(splitValue[1], 10)}`
                                    } else {
                                        time += `:${parseInt(splitValue[1], 10)}`
                                    }
                                    rowNode.setDataValue('performSchedule', time)
                                }
                            }
                            else if (symbol[1]) { // 包含符号 -
                                let splitValue = value.toString().split('') // 全部拆分
                                let lineNum = 0 // 彻底拆分计数 计算横线个数
                                let splitLine = value.toString().split('-') // 以横线拆分
                                let num = 0 // 横线拆分计数,计算数字个数
                                let exceed = false // 是否大于等于24
                                for (let i = 0; i < splitValue.length; i++) { // 判断横线个数
                                    if (splitValue[i] === '-') {
                                        lineNum++
                                    }
                                }
                                for (let i = 0; i < splitLine.length; i++) { // 判断数字个数
                                    if (splitLine[i] !== '') {
                                        num++
                                    }
                                    if (splitLine[i] !== '' && parseInt(splitLine[i], 10) > 23) { // 输入不大于24
                                        exceed = true
                                    }
                                }
                                if (num - lineNum === 1 && reg2.test(splitLine.join('')) && !exceed) {
                                    rowNode.setDataValue('performSchedule', value)
                                }
                                else {
                                    message.tip('执行格式有误', 'error')
                                    rowNode.setDataValue('performSchedule', '')
                                }
                            }
                            else if (symbol[2]) { // 判断分号
                                let splitValue = value.toString().split('') // 全部拆分
                                let semicolonNum = 0 // 彻底拆分计数 计算分号个数
                                let splitSemicolon = value.toString().split(';') // 以分号拆分
                                let num = 0 // 横线拆分计数,计算数字个数
                                let exceed = false // 是否大于等于7
                                for (let i = 0; i < splitValue.length; i++) {
                                    if (splitValue[i] === ';') { // 计算分号个数
                                        semicolonNum++
                                    }
                                }
                                for (let i = 0; i < splitSemicolon.length; i++) {
                                    if (splitSemicolon[i] !== '') { // 排除空 计算数字
                                        num++
                                    }
                                    if (splitSemicolon[i] !== '' && parseInt(splitSemicolon[i], 10) > 7) { // 天数不大于7
                                        exceed = true
                                    }
                                }
                                // 说明横线两边皆有数字 && 没有重复的天数 && 都为数字 && 且数字都未超过7
                                if (num === semicolonNum &&
                                    splitSemicolon.length === Array.from(new Set(splitSemicolon)).length &&
                                    reg2.test(splitSemicolon.join('')) && !exceed && num >= 1 && num <= 7) {
                                    rowNode.setDataValue('performSchedule', value)
                                }
                                else {
                                    message.tip('执行格式有误', 'error')
                                    rowNode.setDataValue('performSchedule', '')
                                }
                            }
                            else { // 不带符号 只有数字
                                let correct = ''
                                if (reg2.test(value) && parseInt(value, 10) >= 0 && parseInt(value, 10) < 24) {
                                    if (parseInt(value, 10) < 10) {
                                        correct = `0${parseInt(value, 10)}:00`
                                    } else {
                                        correct = `${parseInt(value, 10)}:00`
                                    }
                                    rowNode.setDataValue('performSchedule', correct)
                                }
                            }
                        }
                        else {
                            message.tip('执行时间格式错误', 'error')
                            rowNode.setDataValue('performSchedule', '')
                        }
                        break
                }
            }
            // rowNode.setDataValue('performSchedule', timeValue)
        }
        // 根据医嘱类型不同 清空医嘱内容
        else if (colId === 'orderClassName') {
            if (params.newValue !== params.oldValue) {
                rowNode.setDataValue('orderText', '')
                this.setStateJson2('', 'orderData', rowIndex, 'orderText')//  state值设置
            }
        }
        else {
            if (params.value) {
                this.setStateJson2(params.value, 'orderData', rowIndex, colId)
            }
        }
    }

    /**
     * 医嘱单表格回显正确值
     * @param params - 医嘱列规则参数
     * @param path - 列规则名
     */
    displayCorrectValue = (params, path) => {
        let value = '' // 回显公用字段
        switch (path) {
            case 'repeatIndicatorName': // 长临医嘱标识
                if (!params.data.repeatIndicatorName) {
                    switch (params.data.repeatIndicator) {
                        case 0:
                            value = '临时'
                            break
                        case 1:
                            value = '长期'
                            break
                        default:
                            value = ''
                            break
                    }
                } else {
                    value = params.data.repeatIndicatorName
                }
                break
            case 'orderClassName': // 医嘱类别
                if (!params.data.orderClassName) {
                    switch (params.data.orderClass) {
                        case 'A':
                            value = '西药'
                            break
                        case 'B':
                            value = '中药'
                            break
                        default:
                            value = '非药品'
                            break
                    }
                } else {
                    value = params.data.orderClassName
                }
                break
            case 'drugBillingAttrName': // 计价属性
                if (!params.data.drugBillingAttrName) {
                    switch (params.data.drugBillingAttr) {
                        case 0:
                            value = '正常计价'
                            break
                        case 1:
                            value = '自带药'
                            break
                        case 2:
                            value = '手工计价'
                            break
                        case 3:
                            value = '不计价'
                            break
                        case 4:
                            value = '不摆药'
                            break
                        case 5:
                            value = '出院带药'
                            break
                        default:
                            value = ''
                            break
                    }
                } else {
                    value = params.data.drugBillingAttrName
                }
                break
            case 'stopDoctor': // 停止医生
                if (params.data.stopDoctor && params.data.stopDoctor.name) {
                    value = params.data.stopDoctor.name
                }
                else {
                    value = ''
                }
                break
            case 'orderStatusName': // 医嘱状态
                if (!params.data.orderStatusName) {
                    switch (params.data.orderStatus) {
                        case 2:
                            value = '执行'
                            break
                        case 3:
                            value = '停止'
                            break
                        case 4:
                            value = '作废'
                            break
                        case 5:
                            value = '保存'
                            break
                        case 6:
                            value = '提交'
                            break
                        case -1:
                            value = '未保存'
                            break
                        default:
                            value = ''
                            break
                    }
                }
                else {
                    value = params.data.orderStatusName
                }
                break
            case '':
                if (params.data.processingNurse && params.data.processingNurse.name) {
                    value = params.data.processingNurse.name
                }
                else {
                    value = ''
                }
                break
            default:
                break
        }
        return value
    }

    /**
     * 医嘱表公共转换时间方法
     * @param params - 表格参数
     */
    displayTime = (params) => {
        let time = params.value
        time = time && moment(time).format('YYYY-MM-DD hh:mm')
        return time
    }

    /**
     * 多选框触发事件
     */
    selectOrderData = (nodes) => {
        let editData = []
        let {orderLength} = this.state
        let length = orderLength ? orderLength : 0
        nodes.forEach((value) => {
            if (length <= value.rowIndex) {
                editData.push(value.rowIndex)
            }
        })
        this.dispatch2({editData: editData})
    }

    /**
     * 鼠标移入事件显示title
     * @param params
     */
    mouseOver = (params) => {
        // console.log(params)
    }

    /**
     * 快速医嘱 - 医嘱模板打开状态
     */
    tempShow = () => {
        this.dispatch({tempOpen: true})
    }

    /**
     * 医嘱模板关闭
     */
    tempClose = () => {
        this.dispatch({tempOpen: false})
    }

    /****************计价*****************/

    /**
     * 根据医嘱内容查询医嘱费用 - 只适用主医嘱
     */
    loadOrdersCostsNoSave = (data, singleRowData?: any) => {
        let costsArr = []
        costsArr.push(data)
        return ApiPatManageOrders.loadOrdersCostsNoSave(costsArr).then((data) => {
            let {saveCosts} = this.state
            // let orderNo = singleRowData.node.data.orderNo
            // let list = []
            // let row = 0
            // if (!saveCosts.length) {
            //     list = data
            // }
            // else {
            //     for (let i = 0; i < saveCosts.length; i++) {
            //         if (saveCosts[i].orderNo === orderNo && saveCosts[i].backbillFlag !== 3) {
            //             continue
            //         } else if (saveCosts[i].orderNo === orderNo && saveCosts[i].backbillFlag === 3) {
            //             if (row === 0) {
            //                 list.concat(data)
            //             }
            //             row++
            //         }
            //         list.push(saveCosts[i])
            //     }
            // }
            for (let i = 0; i < data.length; i++) {
                saveCosts.push(data[i])
            }
            this.dispatch2({saveCosts})
            this.billingShow()
        }).catch(msg => message.tip(msg || '查询相关费用出错', 'error'))
    }

    /**
     * 页面加载查询状态为已保存计价
     */
    loadOrdersCosts = (orderNo?: number, orderSubNo?: number, orderStatus?: number, flag?: number, serialNo?: string, prescNo?: number) => {
        let {pvId, otherCosts} = this.state
        pvId = pvId ? pvId : patientBasicService.state.model.pvId
        return ApiPatManageOrders.loadOrdersCosts(pvId, orderNo, orderSubNo, orderStatus,
            flag, serialNo, prescNo).then((data) => {
            if (orderStatus === 5) {
                this.dispatch2({saveCosts: data})
            }
            else {
                for (let i = 0; i < data.length; i++) {
                    otherCosts.push(data[i])
                }
                this.showCosts(otherCosts)
                this.dispatch2({otherCosts})
            }
        }).catch(msg => message.tip(msg || '未查询出数据', 'error'))
    }

    /**
     * 计费弹框打开状态 - 并根据选中数据查询相关计价费用
     * 可编辑状态的或已保存的计价
     */
    billingShow = () => {
        let {orderSingle, saveCosts, showNewVersion, otherCosts} = this.state
        let arr = Object.keys(orderSingle)
        if (arr.length !== 0) {
            /* 判断是否可编辑*/
            switch (orderSingle.orderStatus) {
                case -1:
                case 5:
                    if (saveCosts) {
                        this.showCosts(saveCosts)
                    }
                    else {
                        message.tip('未查询到相关计价', 'error')
                    }
                    this.dispatch2({canControl: true})
                    break
                default: // 判断点击的数据状态是否是不可编辑状态
                    let have = false
                    if (otherCosts && otherCosts.length) {
                        for (let i = 0; i < otherCosts.length; i++) {
                            if (otherCosts[i].orderNo === orderSingle.orderNo) {
                                have = true
                                break
                            }
                            else have = false
                        }
                        if (have) {
                            /*如果缓存数据有相应数据，直接去缓存数据，否则请求后台*/
                            this.showCosts(otherCosts)
                        }
                        else {
                            this.loadOrdersCosts(orderSingle.orderNo)
                        }
                    }
                    else {
                        this.loadOrdersCosts(orderSingle.orderNo)
                    }
                    this.dispatch2({canControl: false})
                    break
            }
            // console.log(show)
            if (showNewVersion) {
                this.dispatch({billingOpen: true})
            }
        }
        else {
            message.tip('请选择正确的医嘱内容查询费用', 'warning')
        }
    }

    /**
     * 公共显示计价方法
     */
    showCosts = (data?: ArrayData<OrdersCostsEntityPatManageOrders>) => {
        let {orderSingle} = this.state
        let show = <ArrayData<OrdersCostsEntityPatManageOrders>><any>[]
        data.forEach((v, i, a) => {
            if (v.orderNo === orderSingle.orderNo) {
                show.push(v)
            }
        })
        this.dispatch2({showCosts: show, saveCostsLength: show.length})
    }

    /**
     * 计费弹框关闭状态
     */
    billingClose = () => {
        this.dispatch({billingOpen: false})
    }

    /**
     * 计费保存 - 关闭
     */
    billingSaveClose = () => {
        this.billingClose()
    }

    /**
     * 返回state判断
     */
    backState = () => {
        return this.state
    }

    /**
     * 单击获取当前行数据并设置行号及行id
     * @param params - ag参数
     */
    setRowIndex = (params) => {
        // console.log(params)
        let {showNewVersion} = this.state
        this.dispatch({
            orderSingle: params.data,
            rowIndex: params.rowIndex,
            cellId: params.column.colId
        })
        this.billingShow()
    }

    /**
     * 表格右键获取数据
     * @param params
     */
    rightClick = (params) => {
        params.node.setSelected(true) // 设置右键选中
        this.dispatch({orderSingle: params.data})
    }

    /**
     * 医嘱右键菜单
     * @param menuIndex - 菜单index
     * @param dataIndex - 数据index
     */
    ordersRightMenu = (menuIndex, dataIndex) => {
        //
    }

    /**
     * ag表格更新行数据
     * @param modelList 表格数据数组
     * @param rowIndex 当前行索引
     * @param {Array<any>} others
     */
    agTabUpdate(modelList, rowIndex, others?: Array<any>) {
        let dataList = []
        ordersTableApi.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                others.forEach((v) => {
                    data[v] = modelList[rowIndex][v]
                })
                dataList.push(data)
            }
        })
        ordersTableApi.api.updateRowData({update: dataList})
    }

    /****子医嘱*****/
    /**
     * 子医嘱操作
     */
    subOrder = () => {
        let {orderData, rowIndex} = this.state
        let orderStatus = orderData[rowIndex] ? orderData[rowIndex].orderStatus : false
        /* 判断是否选择行 所选行的医嘱状态*/
        if (rowIndex !== -1 && (orderStatus === -1 || orderStatus === 5)) {

            /*判断选择行是否为药品*/
            let orderClass = orderData[rowIndex].orderClass
            if (orderClass === 'A' || orderClass === 'B') {
                /* 所选行上一条数据状态*/
                let prevOrder = orderData[rowIndex - 1] ? orderData[rowIndex - 1].orderStatus : false
                /* 判断所选行的上一行是否有数据 或状态是否为不可编辑 满足条件则向下添加子医嘱*/
                if (prevOrder === -1 || prevOrder === 5) {
                    // console.log('向上')
                }
                else {
                    // console.log('向下')
                }
            }
            else {
                message.tip('请选择正确主医嘱添加子医嘱', 'warning')
            }
        }
        else {
            message.tip('请选择正确主医嘱添加子医嘱', 'warning')
        }
    }
}

export const
    orderService = new OrderService('orderService')