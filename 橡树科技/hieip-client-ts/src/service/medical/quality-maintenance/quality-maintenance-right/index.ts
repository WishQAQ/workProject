import {BaseService} from 'tools/flux/BaseService'
import {message} from 'pkg/common/message'
import {ApiDictInput, ApiMonitorQcMrVsEvent, ArrayData} from 'pkg/api/medical'
import {
    Page, QcMrMonitorItemsModelDtoMonitor, QcMrMonitorVsEventModel2DtoMonitor,
    QcMrMonitorVsEventModelDtoMonitor
} from 'pkg/entity/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {string} from 'prop-types'
import {loginService} from 'service/user/login'
import {qcMrMonitorItemsLeftService} from '../quality-maintenance-left'

export interface QcMrMonitorItemsRightState {
    /**
     * 模糊查询自动质控项目结果选中行数据=>基本信息数据
     */
    model?: QcMrMonitorItemsModelDtoMonitor
    /**
     * 查询质控项目对应事件=>表格数据
     */
    dataList?: ArrayData<QcMrMonitorVsEventModel2DtoMonitor>
    /**
     * 表格数据当前选中行索引
     */
    dataListIndex?: number
    /**
     * 表格数据input框选中行
     */
    dataListSelectRow?: Array<any>

    /**
     * 监控类别字典
     */
    monitorTypeDict?: Array<any>
    /**
     * 医疗或护理标志字典
     */
    doctOrNurseFlagDict?: Array<any>
    /**
     * 多次标志字典
     */
    mulTimeFlagDict?: Array<any>

    /**
     * 病案评分列
     */
    mrGradingItemsDictColumns?: Array<any>
    /**
     * 病案评分数据
     */
    mrGradingItemsDict?: ArrayData<any>

    /**
     * 科室列
     */
    deptDictColumns?: Array<any>
    /**
     * 科室数据
     */
    deptDict?: ArrayData<any>

    /**
     * 质控事件字典表视图
     */
    mrMonitorEventDictColumns?: Array<any>

    /**
     * 病历状态字典表视图
     */
    patientFileStatusDictColumns?: Array<any>

    /**
     * 医嘱类型对照表视图
     */
    localOrderTypeDictColumns?: Array<any>
    /**
     * 触发动作
     */
    monitorActionDict?: Array<any>
    /**
     * 触发动作
     */
    monitorAction2Dict?: Array<any>

    /**
     * 通用inputTable字典
     */
    inputTableDict?: Array<any>
    /**
     * ag表格
     */
    params?: any
}

/**
 * @author: bgq
 */
class QcMrMonitorItemsRightService extends BaseService<QcMrMonitorItemsRightState> {
    agApi ?: any
    defaultState = {
        /**
         * 模糊查询自动质控项目结果选中行数据=>基本信息数据
         */
        model: {},
        /**
         * 查询质控项目对应事件=>表格数据
         */
        dataList: <ArrayData<QcMrMonitorVsEventModelDtoMonitor>><any>[],
        /**
         * 表格数据当前选中行索引
         */
        dataListIndex: null,
        /**
         * 表格数据input框选中行
         */
        dataListSelectRow: [],

        /**
         * 查询条件=>搜索输入框
         */
        qcName: '',

        /**
         * 监控类别字典
         */
        monitorTypeDict: [{id: '0', name: '时限'}, {id: '1', name: '书写次数'}],
        /**
         * 医疗或护理标志字典
         */
        doctOrNurseFlagDict: [{id: '0', name: '医疗'}, {id: '1', name: '护理'}],
        /**
         * 多次标志字典
         */
        mulTimeFlagDict: [{id: '0', name: '只有一次'}, {id: '1', name: '多次标志'}],

        /**
         * 病案评分列
         */
        mrGradingItemsDictColumns: [],
        /**
         * 病案评分数据
         */
        mrGradingItemsDict: <ArrayData<any>>[],
        /**
         * 科室列
         */
        deptDictColumns: [],
        /**
         * 科室数据
         */
        deptDict: <ArrayData<any>>[],

        /**
         * 质控事件字典表视图
         */
        mrMonitorEventDict: <ArrayData<any>>[],
        /**
         * 病历状态字典表视图
         */
        patientFileStatusDict: <ArrayData<any>>[],
        /**
         * 医嘱类型对照表视图
         */
        localOrderTypeDict: <ArrayData<any>>[],

        /**
         * 触发动作
         */
        monitorActionDict: [{id: 1, name: '触发质控', open: true}, {id: 2, name: '停止质控', open: true}],
        /**
         * 触发动作
         */
        monitorAction2Dict: [{id: 1, name: '触发质控', open: true}, {id: 2, name: '停止质控', open: false}],

        /**
         * 通用inputTable字典
         */
        inputTableDict: [
            {key: 'mrMonitorEventDict', 'value': '质控事件字典表视图字典'},
            {key: 'patientFileStatusDict', 'value': '病历状态字典表视图字典'},
            {key: 'localOrderTypeDict', 'value': '医嘱类型对照表视图字典'}
        ]
    }

    /**
     * 初始化加载
     */
    serviceWillMount() {
        /**
         * 加载所有inputTable字典表
         */
        this.loadMultipleColumns(['mrGradingItemsDict', 'deptDict', 'mrMonitorEventDict', 'patientFileStatusDict', 'localOrderTypeDict'])
    }

    /**
     * 模糊查询自动质控项目
     */
    findByMonitorItemId = (monitorItemId) => {
        if (JsonUtil.isEmpty(monitorItemId)) {
            message.tip('自动质控项目id不能为空!')
            return
        }
        let hosId = JsonUtil.getJsonByKey('loginSession.hospitalConfig.hospitalCode', loginService.state)
        if (JsonUtil.isEmpty(hosId)) {
            message.tip('医院编码获取失败!')
            return
        }
        ApiMonitorQcMrVsEvent.FindByMonitorItemId(monitorItemId, hosId).then(data => {
            this.dispatch2({dataList: data})
            this.agApi.api.setRowData(data)
        }).catch(msg => message.tip(msg || '模糊查询自动质控项目失败!'))
    }
    /**
     * 保存
     */
    save = () => {
        let {dataList, model} = this.state
        if (!model.monitorItemName || model.monitorItemName.length === 0) {
            message.tip('条目名称不能为空!')
            return
        }
        if (!model.monitorType && model.monitorType !== 0) {
            message.tip('监控类别不能为空!')
            return
        } else {
            if (model.monitorType.toString() === '1') {
                if (!model.monitorLimit && model.monitorLimit !== 0) {
                    message.tip('条目时限不能为空!')
                    return
                }
            } else if (model.monitorType.toString() === '0') {
                if (!model.monitorIntervalDays && model.monitorIntervalDays !== 0) {
                    message.tip('书写次数间隔天数不能为空!')
                    return
                }
            }
        }
        if (!model.scoreItemId || model.scoreItemId.length === 0) {
            message.tip('病案评分不能为空!')
            return
        }
        if (JsonUtil.isEmpty(dataList)) {
            message.tip('请至少添加一条质控项目!')
            return
        }
        let hosId = JsonUtil.getJsonByKey('loginSession.hospitalConfig.hospitalCode', loginService.state)
        if (JsonUtil.isEmpty(hosId)) {
            message.tip('医院编码获取失败!')
            return
        }
        // 科室为空时,默认为*
        if (JsonUtil.isEmpty(model.deptCode))
            model.deptCode = '*'
        model.hospitalId = hosId
        let flag = true
        for (let i = 0; i < dataList.length; i++) {
            let data = dataList[i]
            if (!data.monitorType && data.monitorType !== 0) {
                message.tip('触发类型不能为空!')
                flag = false
                break
            } else {
                let eventAction = JsonUtil.isEmpty(data.eventAction)
                if (data.monitorType.toString() === '3') {
                    if (eventAction) {
                        message.tip('触发类型为【医嘱触发】时,事件动作不能为空!')
                        flag = false
                        break
                    }
                } else {
                    if (!eventAction) {
                        message.tip('触发类型为【医嘱触发】时,才能录入事件动作!')
                        flag = false
                        break
                    }
                }
            }
            if (!data.monitorAction && data.monitorAction !== 0) {
                message.tip('触发动作不能为空!')
                flag = false
                break
            }
            if (!data.eventId || data.eventId.length === 0) {
                message.tip('质控事件不能为空!')
                flag = false
                break
            }
            dataList[i].hospitalNo = hosId // 设置医院编码
        }
        if (!flag)
            return
        ApiMonitorQcMrVsEvent.Save(model, dataList).then(data => {
            message.tip('保存成功!')
            if (!JsonUtil.isEmpty(data)) {
                // 如果为新增,保存成功后,不刷新左边列表; 否则刷新
                if (JsonUtil.isEmpty(model.id)) {
                    qcMrMonitorItemsLeftService.findQcMrMonitorItems() // 刷新左边数据
                }
                this.findByMonitorItemId(data)
                // this.toAdd()  // 刷新为空: 添加状态
            }
        }).catch(msg => message.tip(msg || '模糊查询自动质控项目失败!'))
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        if (!data) data = ''// 主要处理 ant.Select 组件,删除时传为 undefined
        this.dispatch(JsonUtil.json(path, this.state, data))
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 查询字典数据列
     * @param dictCode 字典名
     * @returns {Promise<void>}
     */
    loadColumns = (dictCode) => {
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            this.setStateJson2(dictCode + 'Columns', data)
            return data
        }).catch(msg => message.tip(msg || '查询字典数据列失败!'))
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
     * 查询字典数据
     * @param dictCode 字典编码
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string) => {
        page = page ? page : {startIndex: 1, pageSize: 7}
        return ApiDictInput.loadData(page, dictCode, inputCode).then((data) => {
            this.setStateJson2(dictCode, data)
            return data
        }).catch(msg => message.tip(msg || '查询字典数据失败!'))
    }

    /**
     * 触发事件类型 特殊操作: 1:事件类型(qc_mr_monitor_event_dict);2:病历状态触发(mr_patient_file_status_dict);3:医嘱触发(cdr_local_order_type_dict)
     * @param {number} rowIndex
     * @returns {any}
     */
    loadMonitorTypeCommDictData = (rowIndex: number) => {
        // 触发事件类型 特殊操作: 1:事件类型(qc_mr_monitor_event_dict);2:病历状态触发(mr_patient_file_status_dict);3:医嘱触发(cdr_local_order_type_dict)
        const {dataList} = this.state
        let monitorType: any = JsonUtil.getJsonByKey(rowIndex + '.monitorType', dataList)
        if (monitorType === 1 || monitorType === '1') monitorType = 'mrMonitorEventDict'
        if (monitorType === 2 || monitorType === '2') monitorType = 'patientFileStatusDict'
        if (monitorType === 3 || monitorType === '3') monitorType = 'localOrderTypeDict'
        return monitorType
    }

    /**
     * ag表格添加
     */
    agTabAdd = () => {
        let api = this.agApi.api
        let {dataList} = this.state
        let data = {}
        if (!dataList) dataList = <ArrayData<QcMrMonitorVsEventModelDtoMonitor>><any>[]
        dataList.push(data)
        api.stopEditing()  // 停止编辑
        api.setRowData(dataList)  // 刷新表格
        api.ensureIndexVisible(dataList.length - 1)  // 控制滚动条
        // setTimeout(() => {
        //     // 打开改行医嘱的焦点启用编辑模式
        //     api.startEditingCell({
        //         rowIndex: dataList.length - 1,
        //         colKey: 'orderText'
        //     })
        // }, 150)
    }

    /**
     * ag表格删除
     */
    agTabDel = () => {
        let {dataList, dataListSelectRow} = this.state
        this.agApi.api.stopEditing()
        for (let i = dataListSelectRow.length - 1; i >= 0; i--) {
            dataList.splice(dataListSelectRow[i].rowIndex, 1)
        }
        this.agApi.api.setRowData(dataList)
        this.dispatch2({dataList, dataListSelectRow: []})
    }

    /**
     * 页面刷新
     * @param params
     */
    onGridReady = (params) => {
        this.agApi = params
        this.agApi.api.sizeColumnsToFit()
    }

    /**
     * 只能录入正整数数字
     * @param path 路径
     * @param {number} maxLength 最大长度
     * @param data 值
     */
    setInputNumber = (path, maxLength: number, data) => {
        // 判断是否为 直接值或event
        if (data instanceof Object)
            data = data.target.value
        // 有非数字字符时,替换
        if (/[^\d]/.test(data)) {
            data = data.replace(/[^\d]/g, '')// 替换非数字字符
        }
        // 判断是否超过最大长度,超过则截取
        if (!JsonUtil.isEmpty(maxLength) && data.length > maxLength) {
            data = data.substr(0, maxLength)
        }
        // 根据路径设置值
        this.setStateJson(path, data)
    }
    /**
     * 新增
     */
    toAdd = () => {
        this.dispatch2({dataList: <ArrayData<QcMrMonitorVsEventModelDtoMonitor>><any>[], model: {}})
        this.agApi.api.setRowData([])
    }

    /**
     *
     * @param e
     * @param callback
     */
    inputTable = (e: any, callback) => {
        let rowIndex = e.props.rowIndex
        let value = this.state.dataList[rowIndex].monitorType
        if (!value && value !== 0) {
            message.tip('请选择先选择触发类型!')
            this.agApi.api.stopEditing() // inputTable异常: 业务处理,触发类型为空时,强制阻止js执行!
            return
        }
        switch (e.type) {
            case 'blurEvent':
            case 'enterEvent':
                qcMrMonitorItemsRightService.setStateJson('dataList.' + rowIndex + '.eventId', e.data.key || '')
                break
            default:
                let monitorType = qcMrMonitorItemsRightService.loadMonitorTypeCommDictData(rowIndex)
                if (!JsonUtil.isEmpty(monitorType)) {
                    qcMrMonitorItemsRightService.loadData(monitorType, {
                        startIndex: e.pageCurrent,
                        pageSize: e.pageSize
                    }, e.value || '').then(data => {
                        callback(data)
                    })
                }
                break
        }
    }

    /**
     * 触发动作改变
     * 1.医嘱才有事件动作
     * 2.病历状态只能是停止
     */
    monitorActionChange = (rowIndex, callback) => {
        const {dataList} = this.state
        let monitorType = dataList[rowIndex].monitorType
        switch (monitorType) {
            case 2:
                callback(this.state.monitorAction2Dict)
                message.tip('触发类型为【病历状态触发】时,触发动作只能选择【停止】!')
                break
            default:
                callback(this.state.monitorActionDict)
                break
        }
    }

    /**
     * 触发类型改变
     * 1.医嘱才有事件动作
     * 2.病历状态只能是停止
     */
    monitorTypeChange = (path, data, rowIndex) => {
        const {dataList} = this.state
        let model = dataList[rowIndex]
        let others = ['eventActionName', 'eventAction']
        // 如果改变时，改变后的触发类型与未改变的触发类型相同时,则置空质控事件;反之，则不置空质控事件
        if (model.monitorType !== data) {
            model.eventId = null
            model.eventName = ''
            others.push('eventId')
            others.push('eventName')
        }
        model.monitorType = data
        model.eventActionName = ''
        model.eventAction = null
        // [{id: 1, name: '事件类型', monitorTypeCommDict: 'mrMonitorEventDict'},
        //  {id: 2, name: '病历状态触发', monitorTypeCommDict: 'patientFileStatusDict'},
        //  {id: 3, name: '医嘱触发', monitorTypeCommDict: 'localOrderTypeDict'},]
        switch (data) {
            case 2:
                // 医嘱才有事件动作;病历状态只能是停止
                if (model.monitorAction && model.monitorAction.toString() === '2') {
                    model.monitorAction = null
                    model.monitorActionName = ''
                }
                others.push('monitorAction')
                others.push('monitorActionName')
                this.agTabUpdate(dataList, rowIndex, others)
                break
            case 3:
                break
            default:
                // 医嘱才有事件动作
                this.agTabUpdate(dataList, rowIndex, others)
                break
        }
        this.dispatch2({dataList})
    }

    /**
     * 事件动作改变
     * 1.触发类型为【医嘱触发】时才能选择事件动作
     */
    eventAction = (rowIndex) => {
        const {dataList} = this.state
        let monitorType = dataList[rowIndex].monitorType
        switch (monitorType) {
            case 3:
                break
            default:
                message.tip('触发类型为【医嘱触发】时才能选择事件动作!')
                this.agApi.api.stopEditing() // inputTable异常: 业务处理,触发类型为空时,强制阻止js执行!
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
        this.agApi.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                others.forEach((v) => {
                    data[v] = modelList[rowIndex][v]
                })
                dataList.push(data)
            }
        })
        this.agApi.api.updateRowData({update: dataList})
    }
}

export const qcMrMonitorItemsRightService = new QcMrMonitorItemsRightService('qcMrMonitorItemsRight')