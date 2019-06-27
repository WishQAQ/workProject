import React from 'react'
import {Btn} from 'pkg/common/button'
import {Table} from 'pkg/common/table'
import {InputTable} from 'pkg/common/inputTable'
import {IconFont} from 'pkg/common/icon'
import {FluxComponent} from 'tools/flux/FluxComponent'
import styles from './style/index.scss'
import classNames from 'classnames'
// service
import {tableService, TableState} from 'service/pat-manage/patien-opt/operation/table'

export default class OperationTable extends FluxComponent<TableState> {

    title: '手术申请.表格'
    tableService = tableService
    contentMenu = ['删除', '作废']
    operationDictPageSize = 7
    columns = [
        {
            headerName: '手术名称',
            field: 'itemName',
            tooltipField: 'itemName',
            width: 150,
            cellClass: (params) => {
                return styles.textCenter
            },
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                className: styles.inputTable,
                data: [],
                option: {
                    total: 0,
                    columns: [],
                    pageSize: this.operationDictPageSize,
                    showValue: 'value',
                    columnsCallData: ({}, callback) => {
                        callback(tableService.getColumns('operationDictColumns'))
                    }
                },
                isRenderShow: true,
                isMask: false,
                callData: (event, calback) => {
                    switch (event.type) {
                        case 'enterEvent': {
                            tableService.selected(event)
                            break
                        }
                        case 'blurEvent': {
                            if (!event.data.value) {
                                break
                            }
                            tableService.setStateJson2(`agTableData.${event.props.rowIndex}`, {
                                itemCode: event.data.key,
                                itemName: event.data.value
                            })
                            break
                        }
                        case 'changeEvent': {
                            if (event.data.key) {
                                tableService.setStateJson2(`agTableData.${event.props.rowIndex}`, {
                                    itemCode: event.data.key,
                                    itemName: event.data.value
                                })
                            } else {
                                tableService.setStateJson2(`agTableData.${event.props.rowIndex}.itemName`, event.value)
                            }
                            tableService.loadData('operationDict', {
                                startIndex: event.pageCurrent,
                                pageSize: event.pageSize
                            }, event.value).then(data => {
                                calback(data)
                            })
                            break
                        }
                        default:
                            tableService.loadData('operationDict', {
                                startIndex: event.pageCurrent,
                                pageSize: event.pageSize
                            }, event.value).then(data => {
                                calback(data)
                            })
                    }
                }
            }
        }, {
            headerName: '手术等级',
            field: 'operationLevel',
            tooltipField: 'operationLevel',
            width: 150,
            cellClass: (params) => {
                return `${styles.textCenter}`
            }
        }, {
            headerName: '手术规模',
            field: 'operationScale',
            tooltipField: 'operationScale',
            width: 150,
            cellClass: (params) => {
                return styles.textCenter
            }
        }
    ]

    render() {

        let {agTableData} = this.state

        return (
            <div className={styles.operationTable}>
                <div className={styles.btnGroup}>
                    <Btn text={<span><IconFont iconName={'icon-icontianjia01'}/>新增</span>}
                         btnParam={{className: styles.btnAdd, onClick: () => tableService.onAddMethod(), disabled: this.state.isOpen}}/>
                    <Btn text={<span><IconFont iconName={'icon-baocun2'}/>保存</span>}
                         btnParam={{className: styles.btnSave, onClick: () => tableService.submitData(), disabled: this.state.isOpen}}/>
                    <Btn text={<span><IconFont iconName={'icon-jianqu'}/>删除</span>}
                         btnParam={{className: styles.btnDelete, onClick: () => tableService.delete(), disabled: this.state.isOpen}}/>
                    <Btn text={<span><IconFont iconName={'icon-baocun2'}/>清空</span>}
                         btnParam={{className: styles.btnSave, onClick: () => tableService.empty()}}/>
                    <Btn text={<span><IconFont iconName={'icon-baocun2'}/>打印</span>}
                         btnParam={{className: styles.btnSave, onClick: () => tableService.print()}}/>
                </div>
                <div className={classNames(styles.table, tableService.state.isOpen ? styles.isOpen : null)}>
                    <Table
                        columnDefs={this.columns}
                        rowData={agTableData}
                        onGridReady={tableService.onGridReady}
                        singleClickEdit={true}
                        stopEditingWhenGridLosesFocus={true}
                        suppressCellSelection={false}
                        enableCellChangeFlash={true}
                        suppressScrollOnNewData={true}
                        // onCellValueChanged={(a) => a}
                        // onSelectionChanged={tableService.getSelectRows}
                        onRowClicked={tableService.getSelectRows}
                        ContextMenuList={['删除']}
                        menuClik={tableService.rightClick}
                        menuclassName={'operationTable'}
                    />
                </div>
            </div>
        )
    }
}
