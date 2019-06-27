import React from 'react'
import moment from 'moment'
import {Table} from 'pkg/common/table'
import {InputTable} from 'pkg/common/inputTable'
import {IconFont} from 'pkg/common/icon'
import styles from './style/index.scss'
import {HintInput} from 'pkg/common/ag/input'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {TimePicker} from 'pkg/common/timePicker'

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {boolTableService, BoolTableState} from 'service/pat-manage/patien-opt/blood/table'

export default class BoolTable extends FluxComponent<BoolTableState> {
    title = '用血.血液表格'
    boolTableService = boolTableService

    getColumns =
        [
            {
                headerName: '用血安排',
                field: 'fastSlowName',
                tooltipField: 'fastSlowName',
                width: 150,
                cellClass: () => {
                    return `${styles.textCenter}`
                },
                valueFormatter: (params) => {
                    if (params.data.fastSlowName) {
                        return params.data.fastSlowName
                    } else {
                        switch (params.data.fastSlow) {
                            case '1':
                                return '急诊'
                            case '2':
                                return '计划'
                            case '3':
                                return '备血'
                            default:
                                return ''
                        }
                    }
                },
                editable: true,
                cellEditorFramework: AgSelect,
                cellEditorParams: {
                    data: [
                        {id: '1', name: '急诊'},
                        {id: '2', name: '计划'},
                        {id: '3', name: '备血'},
                    ],
                    allowClear: true,
                    dataOption: {value: 'name', key: 'id'},
                    onClick: (v, e) => boolTableService.fastSlowChange(v, e),
                    open: true,
                }
            }
            ,
            {
                headerName: '预定输血时间',
                field: 'transDate',
                tooltipField: 'transDate',
                width: 150,
                cellClass: () => {
                    return styles.textCenter
                },
                editable: true,
                cellEditorFramework: TimePicker,
                valueFormatter: (params) => {
                    if (params.data.transDate) {
                        return moment(params.data.transDate).format('YYYY-MM-DD')
                    } else {
                        return ''
                    }
                },
                cellEditorParams: {
                    minDate: new Date(),
                    autoFocus: true,
                }
            },
            {
                headerName: '血量',
                field: 'transCapacity',
                tooltipField: 'transCapacity',
                width: 150,
                cellClass: () => {
                    return `${styles.textCenter}`
                },
                editable: true,
                cellEditorFramework: HintInput,
                cellEditorParams: {
                    verification: {
                        regex: /^[1-9]\d*$/,
                        eventonver: 'change'
                    }
                }
            },
            {
                headerName: '血量单位',
                field: 'unitName',
                tooltipField: 'unitName',
                width: 150,
                cellClass: () => {
                    return `${styles.textCenter}`
                },
                valueFormatter: (params) => {
                    let model = params.data.unit
                    return model ? (typeof(model) === 'object' ? (model.name || '') : (params.value || '')) : ''
                },
                editable: true,
                cellEditorFramework: AgSelect,
                cellEditorParams: {
                    data: [],
                    allowClear: true,
                    dataOption: {value: 'value', key: 'key'},
                    open: true,
                    onClick: (v, e) => boolTableService.unitChange(v, e),
                    callData: (e, callBack) => {
                        callBack(this.state.bloodUnitDictData)
                    },
                }
            },
            {
                headerName: '血液要求',
                field: 'bloodComponentName',
                tooltipField: 'bloodComponentName',
                width: 150,
                cellClass: () => {
                    return styles.textCenter
                },
                // valueFormatter: (params) => {
                //     let model = params.data.bloodComponent
                //     return model ? (typeof(model) === 'object' ? (model.bloodComponentName || '') : (params.value || '')) : ''
                // },
                editable: true,
                cellEditorFramework: InputTable,
                cellEditorParams: {
                    className: styles.inputTable,
                    data: [],
                    option: {
                        total: 0,
                        columns: [],
                        pageSize: 7,
                        showValue: 'value',
                        columnsCallData: (e, callback) => {
                            callback(this.state.bloodComponentDictColumns)
                        }
                    },
                    isRenderShow: true,
                    isMask: false,
                    callData: (e, callback) => {
                        switch (e.type) {
                            case 'pageEvent':
                                boolTableService.bloodComponentPageEvent(e, callback)
                                break
                            case 'enterEvent':
                                boolTableService.bloodComponentEnterEvent(e)
                                break
                            case 'changeEvent':
                                boolTableService.bloodComponentChangeEvent(e, callback)
                                break
                            default:
                                boolTableService.defaultBloodComponentChange(callback)
                                break
                        }
                    }
                }
            }
        ]

    render() {
        const {bloodCapacityData, isDisable} = this.state
        return (
            <div className={styles.bloodTable}>
                <div className={styles.btnGroup}>
                    <button className={isDisable ? `${styles.btn} ${styles.disableBtn}` : `${styles.btn} ${styles.blueBtn}`}
                            disabled={isDisable}
                            onClick={boolTableService.add}>
                        <IconFont iconName={'icon-icontianjia01'}/>
                        <span>新增</span>
                    </button>
                    <button className={isDisable ? `${styles.btn} ${styles.disableBtn}` : `${styles.btn} ${styles.greenBtn}`}
                            onClick={boolTableService.save}
                            disabled={isDisable}>
                        <IconFont iconName={'icon-baocun2'}/>
                        <span>保存</span>
                    </button>
                    <button className={isDisable ? `${styles.btn} ${styles.disableBtn}` : `${styles.btn} ${styles.redBtn}`}
                            onClick={boolTableService.delete}
                            disabled={isDisable}>
                        <IconFont iconName={'icon-jianqu'}/>
                        <span>删除</span>
                    </button>
                    <button className={`${styles.btn} ${styles.greenBtn}`} onClick={boolTableService.clear}>
                        <IconFont iconName={'icon-iconfontshequyijujue'}/>
                        <span>清空</span>
                    </button>
                    <button className={`${styles.btn} ${styles.greenBtn}`} onClick={boolTableService.print}>
                        <IconFont iconName={'icon-ordinaryprint'}/>
                        <span>打印</span>
                    </button>
                </div>
                <div className={isDisable ? `${styles.cursorDisable} ${styles.bloodtableWrap}` : `${styles.tableWrap}`}>
                    <div className={isDisable ? `${styles.table} ${styles.bloodTableDisable}` : `${styles.table}`}>
                        <Table
                            columnDefs={this.getColumns}
                            rowData={bloodCapacityData}
                            onGridReady={boolTableService.onGridReady}
                            stopEditingWhenGridLosesFocus={true}
                            onRowClicked={boolTableService.onRowClicked}
                            onCellValueChanged={boolTableService.onCellValueChanged}
                            singleClickEdit={true}
                            suppressCellSelection={false}
                        />
                    </div>
                </div>
            </div>
        )
    }
}