/**
 * 用血table
 * Created by wx 2018.01.19
 */
import {BaseService} from 'tools/flux/BaseService'
import {ApiDictData, ApiDictInput, ApiPatManageBlood, ArrayData} from 'pkg/api'
import {BloodApplyEntityPatManageBlood, BloodCapacityEntityPatManageBlood, DataDictEntityDict} from 'pkg/entity'
import {Page} from 'pkg/entity/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'
import {informationService} from '../information'
import {historyTableService} from '../history-table'
import {ApiComm} from '../../../../../packages/api'
import {patientBasicService} from '../../patient-basic'
import {loginService} from '../../../../user/login'

export interface BoolTableState {
    bloodCapacityData?: ArrayData<BloodCapacityEntityPatManageBlood>,// 表格数据
    bloodComponentDictColumns?: ArrayData<any>,//  血液要求头部数据
    bloodComponentDictData?: ArrayData<any>,// 血液要求数据
    isDisable?: boolean,// 是否禁用各个控件
    bloodUnitDictData?: ArrayData<DataDictEntityDict>, // 血量单位
    rowIndex?: number,// 选中行下标
    nowDate?: Date,// 最小预约选择时间
}

class BoolTableService extends BaseService<BoolTableState> {
    tableApi ?: any
    defaultState = {
        isDisable: false,
        bloodCapacityData: <ArrayData<BloodCapacityEntityPatManageBlood>>[],
        bloodComponentDictColumns: <ArrayData<any>>[],
        bloodComponentDictData: <ArrayData<any>>[],
        rowIndex: null
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        // 清空数据
        this.dispatch2({
            isDisable: false,
            bloodCapacityData: <ArrayData<BloodCapacityEntityPatManageBlood>>[]
        })
        // 加载血液要求inputTable表头数据
        this.loadMultipleColumns(['bloodComponentDict'])
        // 加载血量数据
        ApiDictData.loadBloodUnitDict().then((data) => {
            this.setStateJson2('bloodUnitDictData', data)
        }).catch((msg) => {
            message.error(msg || '血量信息获取失败！')
        })
        this.getServiceTime()
    }

    /**
     * 获得服务器时间
     */
    getServiceTime = () => {
        ApiComm.loadNowDate().then((time) => {
            this.setStateJson2('nowDate', time)
        })
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
        }).catch(msg => message.tip(msg || '查询血液要求数据列失败!'))
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
            this.setStateJson2(dictCode + 'Data', data)
            return data
        }).catch(msg => message.tip(msg || '查询字典数据失败!'))
    }

    /**
     * 设置值: 公共对外值改变
     * @param path 路径
     * @param data 设置值
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 设置值: 公共对外值改变
     * @param path 路径
     * @param data 设置值
     */
    setStateJson3 = (data, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, data))
    }

    /**
     * 表格api
     * @param params 参数
     */
    onGridReady = (params) => {
        this.tableApi = params
    }
    /**
     * 表格内容渲染
     *
     */
    agRender = () => {
        const {bloodCapacityData} = this.state
        this.tableApi.api.setRowData(bloodCapacityData)
    }

    /**
     * 加载表格数据
     * @param appNo string 申请单号
     */
    loadBloodCapacity = (appNo: string) => {
        ApiPatManageBlood.loadBloodCapacity(appNo).then((data) => {
            this.dispatch2({
                bloodCapacityData: data,
                isDisable: true
            })
            this.agRender()
        }).catch((msg) => {
            message.error(msg || '表格信息获取失败！')
        })
    }

    /**
     * agTab焦点
     * @param rowIndex 行索引
     * @param colKey 列名
     * @param api api
     */
    agTabFocus = (rowIndex, colKey, api?: any) => {
        api = api ? api : this.tableApi.api
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
        this.tableApi.api.forEachNode(function (node) {
            if (data[node.rowIndex]) {
                node.setSelected(true)
            } else {
                node.setSelected(false)
            }
        })
    }

    /**
     * 新增按钮事件
     */
    add = () => {
        let {bloodCapacityData} = this.state
        bloodCapacityData.push({})
        let rowIndex = bloodCapacityData.length - 1
        this.dispatch2({
            bloodCapacityData: bloodCapacityData,
            rowIndex
        })
        this.agRender()
        // 设置焦点
        this.agTabFocus(rowIndex, 'fastSlowName')
    }
    /**
     * 保存事件
     */
    save = () => {
        const {informationData} = informationService.state
        if (!informationData.bloodType || (!informationData.bloodType.id && informationData.bloodType.id !== 0)) {
            message.tip('【血型编码】不能为空,请选择【血型】!')
            return
        }
        if (!informationData.bloodTypeRh || (!informationData.bloodTypeRh.id && informationData.bloodTypeRh.id !== 0)) {
            message.tip('【Rh血型编码】不能为空,请选择【Rh血型】!')
            return
        }
        let data = informationData
        data.pvId = patientBasicService.state.model.pvId
        data.applyDept = {id: patientBasicService.state.model.deptCode}
        data.applyDoctor = {id: loginService.state.user.id}
        if (!data) {
            message.tip('请填写完整！')
            return
        }
        let {bloodCapacityData} = this.state
        if (!bloodCapacityData || bloodCapacityData.length === 0) {
            message.tip('请至少填写一条【血液要求】数据！')
            return
        }

        for (let i = 0; i < bloodCapacityData.length; i++) {
            let model = bloodCapacityData[i]
            if (!model.transCapacity && model.transCapacity !== 0) {
                message.tip('【血量】不能为空!')
                return
            }
            if (!model.bloodComponent || (!model.bloodComponent.id && model.bloodComponent.id !== 0)) {
                message.tip('【血液要求编码】不能为空,请选择【血液要求】!')
                return
            }
            if (!model.fastSlow || model.fastSlow.length === 0) {
                message.tip('【用血安排】不能为空!')
                return
            }
            if (!model.transDate || model.transDate === null) {
                message.tip('【预定输血时间】不能为空!')
                return
            }
            if (!model.unit || (!model.unit.id && model.unit.id !== 0)) {
                message.tip('【血液单位编码】不能为空,请选择【血液单位】!')
                return
            }
        }
        // 保存
        ApiPatManageBlood.save(data, bloodCapacityData).then(() => {
            historyTableService.getHistoryTableData()
            informationService.isDisable(true)
            this.dispatch2({isDisable: true})
            message.tip('保持成功！')
        }).catch((msg) => {
            message.error(msg || '保存失败！')
        })
    }
    /**
     * 删除事件
     */
    delete = () => {
        let {rowIndex, bloodCapacityData} = this.state
        if (rowIndex !== 0 && rowIndex || rowIndex === 0) {
            message.linkAge('确定要删除?', null, '确认', '取消', () => {
                bloodCapacityData.splice(rowIndex, 1)
                this.setStateJson2('bloodCapacityData', bloodCapacityData)
                this.dispatch({rowIndex: null})
                this.agRender()
            })
        } else {
            message.tip('请选择要删除行！')
        }
    }
    /**
     * 清空按钮事件
     */
    clear = () => {
        this.dispatch2({
            isDisable: false,
            bloodCapacityData: <ArrayData<BloodCapacityEntityPatManageBlood>>[]
        })
        this.agRender()
        // 清空基本信息表格数据
        informationService.clearInformationData()
    }
    /**
     * 打印事件
     */
    print = () => {
        // console.log('打印')
    }
    /**
     * 血液要求inputTable选择确认事件
     * @param e Event
     */
    bloodComponentEnterEvent = (e) => {
        let {bloodCapacityData} = this.state
        bloodCapacityData[e.props.rowIndex].bloodComponent = {id: e.data.key, bloodComponentName: e.data.value}
        this.dispatch2({bloodCapacityData})
    }

    /**
     * 血液要求inputTable輸入模糊查詢事件
     * @param e{} Event
     * @param callback 回掉函數
     */
    bloodComponentChangeEvent = (e, callback) => {
        this.loadData('bloodComponentDict', {startIndex: e.pageCurrent, pageSize: e.pageSize}, e.value || '').then((data) => {
            callback(data)
        })
    }
    /**
     * 血液要求inputTable翻页事件
     * @param e{} Event
     * @param callback 回调函数
     */
    bloodComponentPageEvent = (e, callback) => {
        this.loadData('bloodComponentDict', {startIndex: e.pageCurrent, pageSize: e.pageSize}).then((data) => {
            callback(data)
        })
    }
    /**
     * 血液要求inputTable翻页事件
     * @param callback 回调函数
     */
    defaultBloodComponentChange = (callback) => {
        this.loadData('bloodComponentDict').then((data) => {
            callback(data)
        })
    }
    /**
     * 用血安排选择安排
     * @param v {}值对象
     * @param e {} Event
     */
    fastSlowChange = (v, e) => {
        let {bloodCapacityData} = this.state
        bloodCapacityData[e.rowIndex].fastSlow = v.id
        this.dispatch({
            bloodCapacityData: bloodCapacityData
        })
    }
    /**
     * 血量单位选择事件
     * @param v {} 点击选项值
     * @param e {} Event
     */
    unitChange = (v, e) => {
        let {bloodCapacityData} = this.state
        bloodCapacityData[e.rowIndex].unit = {
            id: v.key,
            name: v.value
        }
        this.dispatch2({bloodCapacityData})
    }
    /**
     *  表格编辑值改变事件
     * @param e {} Event
     */
    onCellValueChanged = (e) => {
        // 获取改变值列名
        let columnName = e.column.colId
        // 获取改变值
        let data = e.newValue
        // 获取改变值当前索引
        let rowIndex = e.rowIndex
        if (columnName && columnName !== 'bloodComponent' && columnName !== 'unit') {
            this.setStateJson3(data, 'bloodCapacityData', rowIndex, columnName)
        }
    }
    /**
     * 左点击事件
     * @param e Event
     */
    onRowClicked = (e) => {
        this.dispatch({
            rowIndex: e.rowIndex
        })
    }
}

export const boolTableService = new BoolTableService('table')