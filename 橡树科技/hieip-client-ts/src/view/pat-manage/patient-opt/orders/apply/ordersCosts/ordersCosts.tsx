import React from 'react'
import css from './style/index.scss'
// model
import {DragMove} from 'pkg/common/dragging'
import {Table} from 'pkg/common/table'
import {Button} from 'antd'
import {Select} from 'pkg/common/ag/select'
import {HintInput} from 'pkg/common/ag/input'
import {InputTable} from 'pkg/common/inputTable'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {orderService, OrderState} from 'service/pat-manage/patien-opt/orders/apply/orders/index'
import {orderCostService, OrderCostState} from 'service/pat-manage/patien-opt/orders/apply/ordersCosts/ordersCosts'
import hash from 'object-hash'

export default class Billing extends FluxComponent<OrderState & OrderCostState> {
    title = '计费弹框'
    orderService = orderService
    orderCostService = orderCostService

    billingColumn = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 25,
            minWidth: 25,
            maxWidth: 25,
            cellStyle: {
                paddingLeft: '3px',
                paddingTop: '7px'
            }
        },
        {
            headerName: '类别',
            field: 'itemClassName',
            valueFormatter: (params) => {
                return orderCostService.showCurrentValue(params, 'itemClassName')
            },
            cellClass: (params) => {
                return css.commonClass
            },
        },
        {
            headerName: '计价规则',
            field: 'backbillRule',
            editable: (event) => {
                return orderCostService.editOrNot(event)
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {key: '按次', value: '按次'},
                    {key: '按日', value: '按日'},
                    {key: '只记一次', value: '只记一次'},
                    {key: '不计价', value: '不计价'}
                ],
                dataOption: {key: 'key', value: 'value'},
                className: css.agSelect,
                onClick: (e, v) => {
                    orderService.setStateJson2(e.key, 'showCosts', v.rowIndex, 'backbillRule')
                },
            },
            cellClass: (params) => {
                return css.commonClass
            },
        },
        {
            headerName: '计价项目',
            field: 'itemName',
            editable: (event) => {
                return orderCostService.editOrNot(event)
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                data: [],
                option: {
                    total: 0,
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        orderCostService.clinicPriceListColumn(callback)
                    }
                },
                isRenderShow: true,
                isMask: true,
                tableLeft: -250,
                callData: (v, callback) => {
                    orderCostService.clinicPriceList(v, callback)
                },
            },
            cellClass: (params) => {
                return css.commonClass
            },
        },
        {
            headerName: '数量',
            field: 'amount',
            editable: (event) => {
                return orderCostService.editOrNot(event)
            },
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {eventonver: 'change', regex: /^[1-9]\d*$/}
            },
            cellClass: (params) => {
                return css.commonClass
            },
        },
        {
            headerName: '单位',
            field: 'units',
            cellClass: (params) => {
                return css.commonClass
            },
        },
        {
            headerName: '规格',
            field: 'itemSpec',
            cellClass: (params) => {
                return css.commonClass
            },
        }
    ]

    render() {
        let {billingOpen, showCosts} = this.state
        return (
            <DragMove
                title={'医嘱计费信息'}
                visible={billingOpen}
                onCancel={orderService.billingClose}
                className={css.billingDragMove}
                width={800}
                cwidth={800}
                cheight={450}
            >
                <div>
                    <div className={css.billingTable}>
                        <Table
                            columnDefs={this.billingColumn}
                            rowData={showCosts}
                            onCellClicked={orderCostService.singleClick}
                            onGridReady={orderCostService.onGridReady}
                            suppressCellSelection={false} // 开启单元格选中
                            stopEditingWhenGridLosesFocus={true} // 焦点离开关闭编辑模式
                            singleClickEdit={true} // 点击启动编辑加载组件
                            suppressDragLeaveHidesColumns={true} // 关闭拖动列到表格外删除列
                            suppressMovableColumns={true} // 关闭拖动换列
                        />
                    </div>
                    <div className={css.billingBtn}>
                        <Button
                            className={css.billingAdd}
                            onClick={orderCostService.addNewCosts}
                        >
                            {'新增'}
                        </Button>
                        <Button
                            type={'danger'}
                            className={css.delButton}
                            onClick={orderCostService.delCosts}
                        >
                            {'删除'}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={orderCostService.saveCosts}>
                            {'保存'}
                        </Button>
                    </div>
                </div>
            </DragMove>
        )
    }
}