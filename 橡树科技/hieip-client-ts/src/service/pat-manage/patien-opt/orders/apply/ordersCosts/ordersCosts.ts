/**
 * 综合医嘱计价service
 */
import {BaseService} from 'tools/flux/BaseService'
import {patientBasicService} from '../../../patient-basic'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'
import {orderService} from '../orders'
import {ArrayData, ApiDictInput} from 'pkg/api'
import {Page, OrdersCostsEntityPatManageOrders} from 'pkg/entity'

let costsApi // 表格api
export interface OrderCostState {
    newAddCosts?: ArrayData<OrdersCostsEntityPatManageOrders> // 新增计价数据
    delCosts?: ArrayData<OrdersCostsEntityPatManageOrders> // 删除后计价数据
    clickData?: OrdersCostsEntityPatManageOrders // 单击获取数据
    showIndex?: number // 计价行标
    editData?: Array<any> // 选中的可编辑数据
    addOrDel?: boolean // 在保存时判断增删
}

class OrderCost extends BaseService<OrderCostState> {
    defaultState = {
        clickData: {},
        newAddCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[],
    }

    /**
     * 表格runder时 加载api
     * @param params - 参数
     */
    onGridReady = (params) => {
        costsApi = params
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
            return data
        }).catch(msg => message.tip(msg || '查询字典数据失败!', 'error'))
    }

    /**
     * 数组优化传值方法
     * @param data - 数据
     * @param path - 路径 不用拼写
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }

    /**
     * 查询计价项目列规则
     */
    clinicPriceListColumn = (callback) => {
        this.loadColumns('clinicPriceList').then(data => {
            callback(data)
        })
    }

    /**
     * 根据数据判断是否可编辑
     * @param event - event
     */
    editOrNot = (event) => {
        let flag = event.node.data.backbillFlag
        return flag !== 1
    }

    /**
     * 查询计价项目数据 inputTable
     */
    clinicPriceList = (v, callback) => {
        let page = {startIndex: v.pageCurrent, pageSize: v.pageSize}
        switch (v.type) {
            case 'enterEvent':
                this.loadData('clinicPriceList', page, v.data.value, '').then(data => {
                    callback(data)
                })
                orderService.setStateJson2(v.data.itemClass, 'showCosts', v.props.rowIndex, 'itemClass')
                break
            default:
                this.loadData('clinicPriceList', page, v.value, '').then(data => {
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
        let field = params.colDef.field // 行的列规则
        let rowIndex = params.rowIndex // 行的index
    }

    /**
     * 单击获取一行数据
     * @param params - 参数
     */
    singleClick = (params) => {
        // console.log(params)
        this.dispatch2({clickData: params.data, showIndex: params.rowIndex})
    }

    /**
     * 新增加一条计价规则
     */
    addNewCosts = () => {
        // showCosts - orderService单击行分出的计价
        // saveCosts - orderService查询的全部已保存计价
        let {showCosts, orderSingle, saveCosts, saveCostsLength} = orderService.state
        let pvId = patientBasicService.state.model.pvId
        showCosts.push({
            pvId: pvId,
            orderNo: orderSingle.orderNo,
            orderSubNo: saveCosts.length + 1,
            backbillFlag: 3,
            amount: 1,
        })
        costsApi.api.setRowData(showCosts)
        // 克隆数组 分割新添加的数据
        let add = JsonUtil.clone(showCosts)
        add.splice(0, saveCostsLength)
        this.dispatch2({newAddCosts: add, addOrDel: true})
    }

    /**
     * 删除计费
     */
    delCosts = () => {
        let {editData} = this.state
        // console.log(editData)
        let {showCosts} = orderService.state
        /*数组记录被删除的数据*/
        let del = JsonUtil.clone(showCosts)
        if (editData.length) {
            for (let i = editData.length - 1; i >= 0; i--) {
                showCosts.splice(editData[i], 1)
            }
            costsApi.api.setRowData(showCosts)
            this.dispatch2({addOrDel: false, delCosts: del})
        }
        else {
            message.tip('请选择正确行删除', 'warning')
        }
    }

    /**
     * 保存计费
     */
    saveCosts = () => {
        // newAddCosts - 新增加的计价数据
        let {newAddCosts, addOrDel, delCosts} = this.state
        let {saveCosts, showCosts} = orderService.state
        if (addOrDel) {
            let newSave = saveCosts.concat(newAddCosts)
            orderService.setStateJson2(newSave, 'saveCosts')
            orderService.billingSaveClose()
            this.dispatch2({newAddCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[]})
        }
        else {
            /* 抽取第一条计价orderNo 用于剔除原数组所有数据再拼写回去 */
            if (delCosts[0].orderNo) {
                let orderNumber = delCosts[0].orderNo
                for (let i = saveCosts.length - 1; i >= 0; i--) {
                    if (saveCosts[i].orderNo === orderNumber) {
                        saveCosts.splice(i, 1)
                    }
                }
                let afterDel = saveCosts.concat(showCosts)
                orderService.setStateJson2(afterDel, 'saveCosts')
                orderService.billingSaveClose()
                this.dispatch2({delCosts: <ArrayData<OrdersCostsEntityPatManageOrders>><any>[]})
            }
        }
    }

    /**
     * 多选select
     */
    moreSelect = (nodes) => {
        let editData = []
        nodes.forEach((value) => {
            if (value.data.backbillFlag !== 1) {
                editData.push(value.rowIndex)
            }
        })
        this.dispatch2({editData: editData})
    }

    /**
     * 判断显示所需的值
     * @param params - 参数
     * @param path - 字段
     */
    showCurrentValue = (params, path) => {
        let value = ''
        switch (path) {
            case 'itemClassName':
                if (params.data.itemClass === 'A' && params.data.itemClass === 'B') {
                    value = '药品'
                }
                else if (!params.data.itemClass) {
                    value = ''
                }
                else {
                    value = '非药品'
                }
                break
            default:
                break
        }
        return value
    }

    /**
     * ag表格更新行数据
     * @param modelList 表格数据数组
     * @param rowIndex 当前行索引
     * @param {Array<any>} others
     */
    agTabUpdate(modelList, rowIndex, others?: Array<any>) {
        let dataList = []
        costsApi.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            if (index === rowIndex) {
                let data = rowNode.data
                others.forEach((v) => {
                    data[v] = modelList[rowIndex][v]
                })
                dataList.push(data)
            }
        })
        costsApi.api.updateRowData({update: dataList})
    }
}

export const orderCostService = new OrderCost('orderCost')