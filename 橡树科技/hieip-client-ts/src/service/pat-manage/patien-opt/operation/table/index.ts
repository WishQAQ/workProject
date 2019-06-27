import {BaseService} from 'tools/flux/BaseService'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiDictInput, ApiPatManageOperation, ArrayData} from 'pkg/api'
import {Page, ScheduledOperationNameEntityPatManageOperation} from 'pkg/entity'
import {informationService} from '../information'
import {historyTableService} from '../history-table'

export interface ScheduledOperationName extends ScheduledOperationNameEntityPatManageOperation {
    operationLevel?: string
}

export interface TableState {

    agTableData?: Array<ScheduledOperationName>, // 表格数据
    selectedData?: number // 选中行
    /**
     * 字典表
     */
    operationDict?: ArrayData<any>, // 手术名称
    operationDictColumns?: Array<any>,// 手术名称columns
    isOpen?: boolean                     // 显示状态

}

class TableService extends BaseService<TableState> {

    agApi?: any // AG列表的api

    defaultState = {
        agTableData: [],
        selectedData: null,
        /**
         * 字典表
         */
        operationDict: <ArrayData<any>>[],
        operationDictColumns: [],
        isOpen: false
    }

    serviceWillMount() {
        this.dispatch2({
            agTableData: []
        })
        this.loadMultipleColumns(['operationDict']) // 加载所有inputTable字典表
    }

    /**
     * 加载表格agApi
     *
     */
    onGridReady = (params) => {
        this.agApi = params
        params.api.sizeColumnsToFit()
    }

    /**
     * 获取选中行下标
     *
     */
    getSelectRows = (e) => {
        this.dispatch2({selectedData: e.rowIndex})
    }

    /**
     * 根据path 返回对应表头数组
     *
     */
    getColumns = (path) => {
        return this.state[path]
    }

    /**
     * 设置值: 公共对外值改变
     *
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 初始化所有inputTable 的columns
     * @returns {Promise<void>}
     */
    loadMultipleColumns = (inputTables) => {
        return ApiDictInput.loadMultipleColumns(inputTables).then((data) => {
            if (!JsonUtil.isEmpty(data)) {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key + 'Columns'] = data[key]
                    }
                }
            }
            this.dispatch(this.state)
        }).catch(err => {
            message.tip(err || '查询字典数据列失败!', 'warning')
        })
    }

    /**
     * 根据传入的参数，给对应的inputTable赋值
     * @param dictCode 字典编码
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string) => {
        return ApiDictInput.loadData(page, dictCode, inputCode).then((data) => {
            this.setStateJson2(dictCode, data)
            return data
        }).catch(err => {
            message.tip(err || '查询字典数据列失败!', 'warning')
        })
    }

    /**
     * 右键表格事件
     * 0：删除 1：作废
     */
    rightClick = (menuIndex?: number, dataIndex?: number) => {
        if (menuIndex === 0) {
            let agTableData = this.state.agTableData
            agTableData.splice(dataIndex, 1)
            this.dispatch2({agTableData: agTableData})
            this.agApi.api.setRowData(agTableData)
        }
    }

    /**
     * 删除选中行
     *
     */
    delete = () => {
        let selected = this.state.selectedData
        if (selected < 0) {
            message.tip('请选中要删除的项', 'warning')
            return
        } else {
            let agTableData = this.state.agTableData
            agTableData.splice(selected, 1)
            this.dispatch2({agTableData: agTableData})
            this.agApi.api.setRowData(agTableData)
        }
    }

    /**
     * 通过此方法修改表格上其他对应行列的数据
     *
     */
    updateValue = (props, rowIndex, xy) => {
        let itemsToUpdate = []
        this.agApi.api.forEachNodeAfterFilterAndSort((rowNode, index) => {
            if (index === rowIndex) {
                let data = rowNode.data
                xy.map((v) => {
                    data[v] = props[rowIndex][v]
                })
                itemsToUpdate.push(data)
            }
        })
        this.agApi.api.updateRowData({update: itemsToUpdate})
    }

    /**
     * 点击某一项，加载另外一项
     *
     */
    selected = (event) => {
        let {agTableData} = this.state
        let rowIndex = event.props.rowIndex
        let data = agTableData[rowIndex]
        data.itemCode = event.data.key
        data.itemName = event.data.value
        data.operationScale = event.data.operationScale || ''
        data.operationLevel = event.data.operationLevel || ''
        data.itemNo = event.data.RN
        agTableData[rowIndex] = data
        this.dispatch2({agTableData})
        this.updateValue(agTableData, rowIndex, ['itemName', 'operationScale', 'operationLevel', 'itemNo'])
        this.dispatch2({
            selectedData: rowIndex
        })
    }

    /**
     * 新增事件
     *
     */
    onAddMethod = () => {
        const {agTableData} = this.state
        // 模拟添加数据
        agTableData.push({
            itemName: '',
            operationScale: '',
            operationLevel: '',
            itemNo: null,
            itemCode: ''
        })
        // render表格数据
        this.agApi.api.setRowData(agTableData)
        // 设置焦点
        this.agTabFocus(agTableData.length - 1, 'itemName')
    }

    /**
     * agTab焦点
     * @param rowIndex 行索引
     * @param colKey 列名
     * @param api api
     */
    agTabFocus = (rowIndex, colKey, api?: any) => {
        api = api ? api : this.agApi.api
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
        this.agApi.api.forEachNode(function (node) {
            if (data[node.rowIndex]) {
                node.setSelected(true)
            } else {
                node.setSelected(false)
            }
        })
    }

    /**
     * 保存数据
     */
    submitData = () => {
        let list = this.state.agTableData
        if (list.length === 0) {
            message.tip('手术名称不能为空!', 'warning')
            throw new Error('手术名称不能为空!')
        }
        informationService.getData().then((data) => {
            ApiPatManageOperation.save(data, list).then((data) => {
                message.tip(data || '保存成功!', 'success')
                informationService.initialize()
                this.dispatch2({agTableData: []})
                historyTableService.onlordHistory()
            }).catch((err) => {
                message.tip(err || '保存失败!', 'warning')
            })
        })
    }

    /**
     * 清空数据
     */
    empty = () => {
        informationService.initialize()
        this.dispatch2({
            agTableData: [],
            isOpen: false
        })
        message.tip('已清空', 'success')
    }

    /**
     * 打印数据
     */
    print = () => {
        message.tip('该功能正在开发中', 'warning')
    }

    /**
     * 点击历史记录，加载数据
     * @param data
     */
    loadAgTableData = (data) => {
        this.dispatch2({agTableData: data})
        this.agApi.api.setRowData(data)
    }

    /**
     * 开启或关闭按钮是否能被点击
     * @param bool
     */
    openButton = (bool) => {
        if (bool) {
            this.dispatch2({
                isOpen: true
            })
        } else {
            this.dispatch2({
                isOpen: false
            })
        }
    }
}

export const tableService = new TableService('historyTable')