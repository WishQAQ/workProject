import React from 'react'
import moment from 'moment'
import {Btn} from 'pkg/common/button'
import {Table} from 'pkg/common/table'
import styles from './style/index.scss'
import {Select} from 'pkg/common/ag/select'
import {TimePicker} from 'pkg/common/timePicker'
import {InputTable} from 'pkg/common/inputTable'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {basicService} from 'service/medical/medical-record/basic'
import {SurgerySate, surgeryService} from 'service/medical/medical-record/surgery/index'
import classnames from 'classnames'

/**
 * 病案首页手术信息页面
 */
export default class SurgeryRecordView extends FluxComponent<SurgerySate> {
    title = 'SurgeryRecordView'
    surgeryService = surgeryService

// ag表头数据
    columns = [
        {
            headerName: '手术名称',
            field: 'operationDesc',
            width: 170,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                className: styles.testInput,
                data: [],
                option: {
                    total: 7,
                    columns: [],
                    pageSize: 7,
                    showValue: 'operationName',
                    columnsCallData: (v, callback) => {
                        surgeryService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '500px',
                isRenderShow: true,
                isMask: false,
                callData: (v, callback) => {
                    surgeryService.showMessage(v, callback, '', 'operationDict')
                }
            }
        },
        {
            headerName: '手术编码',
            field: 'operationCode',
            width: 80,
            editable: false,
            cellClass: () => {
                return styles.agRowEdit
            }
        },

        {
            headerName: '手术级别',
            field: 'operationLevel',
            width: 80,
            editable: false,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '开始时间',
            field: 'operatingDate',
            width: 118,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            },
            cellEditorFramework: TimePicker,
            cellEditorParams: {
                format: 'YYYY-MM-DD HH:mm:ss',
                timePrecision: 1,
                className: styles.timePicker,
            }
        },
        {
            headerName: '结束时间',
            field: 'operationEndDate',
            width: 118,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            },
            cellEditorFramework: TimePicker,
            cellEditorParams: {
                format: 'YYYY-MM-DD HH:mm:ss',
                timePrecision: 1,
                className: styles.timePicker
            }
        },
        {
            headerName: '术者',
            field: 'operator',
            width: 112,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                className: styles.testInput,
                data: [],
                option: {
                    pageSize: 7,
                    showValue: 'userName',
                    columnsCallData: (v, callback) => {
                        surgeryService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '200px',
                isRenderShow: true,
                isMask: false,
                callData: (v, callback) => {
                    surgeryService.showMessage(v, callback, '.operator', 'workers')
                }
            }
        },
        {
            headerName: '1助',
            field: 'firstAssistant',
            width: 112,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                className: styles.testInput,
                data: [],
                option: {
                    pageSize: 7,
                    showValue: 'userName',
                    columnsCallData: (v, callback) => {
                        surgeryService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '200px',
                isRenderShow: true,
                isMask: false,
                callData: (v, callback) => {
                    surgeryService.showMessage(v, callback, '.firstAssistant', 'workers')
                }
            }
        },
        {
            headerName: '2助',
            field: 'secondAssistant',
            width: 112,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                className: styles.testInput,
                data: [],
                option: {
                    pageSize: 7,
                    showValue: 'userName',
                    columnsCallData: (v, callback) => {
                        surgeryService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '200px',
                isRenderShow: true,
                isMask: false,
                callData: (v, callback) => {
                    surgeryService.showMessage(v, callback, '.secondAssistant', 'workers')
                }
            }
        },
        {
            headerName: '麻醉医师',
            field: 'anesthesiaDoctor',
            width: 112,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                className: styles.testInput,
                data: [],
                option: {
                    pageSize: 7,
                    showValue: 'userName',
                    columnsCallData: (v, callback) => {
                        surgeryService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '200px',
                isRenderShow: true,
                isMask: false,
                callData: (v, callback) => {
                    surgeryService.showMessage(v, callback, '.anesthesiaDoctor', 'workers')
                }
            }
        },
        {
            headerName: '麻醉方式',
            field: 'anaesthesiaMethod',
            width: 112,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [],
                dataOption: {
                    value: 'anaesthesiaName',
                    key: 'anaesthesiaCode',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    surgeryService.anaesthesiaMethodSelect(v, 'surgeries.anaesthesiaMethod')
                },
                open: true,
                callData: (v, callback) => {
                    // v 当前选中的对象  callback 回调函数
                    callback(basicService.state.anaesthesiaDict)
                }
            }
        },
        {
            headerName: '切口等级',
            field: 'heal',
            width: 112,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {code: '1', inputCode: 'JIA', value: '甲'},
                    {code: '2', inputCode: 'YI', value: '乙'},
                    {code: '3', inputCode: 'BING', value: '丙'},
                    {code: '9', inputCode: 'DING', value: '其他'}
                ],
                dataOption: {
                    value: 'value',
                    key: 'code',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    surgeryService.healSelect(v)
                }
            }
        },
        {
            headerName: '愈合情况',
            field: 'woundGrade',
            width: 102,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {code: '1', inputCode: 'O', value: 'O'},
                    {code: '2', inputCode: 'I', value: 'I'},
                    {code: '3', inputCode: 'II', value: 'II'},
                    {code: '4', inputCode: 'III', value: 'III'}
                ],
                dataOption: {
                    value: 'value',
                    key: 'code',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    surgeryService.woundGradeSelect(v)
                }
            }
        }
    ]

    render() {
        const {disableAll} = basicService.state
        const {surgeries} = this.state

        return (
            <div className={classnames(styles.root, `${disableAll ? styles.pointer : ''}`)}>
                {/* 按钮 */}
                <div className={styles.btnGroup}>
                    <Btn btnParam={{
                        className: styles.buttonAdd,
                        icon: 'plus-circle',
                        onClick: surgeryService.addSurgeryEntity
                    }}
                         text={'新增'}/>
                    <Btn btnParam={{
                        className: styles.buttonDelete,
                        icon: 'minus-circle',
                        onClick: surgeryService.delSurgeryEntity
                    }}
                         text={'删除'}/>
                    <Btn btnParam={{
                        className: styles.buttonAlter,
                        icon: 'save',
                        onClick: basicService.saveDiag
                    }}
                         text={'保存'}/>
                    <Btn btnParam={{
                        className: styles.buttonSearch,
                        icon: 'printer',
                        onClick: basicService.print
                    }}
                         text={'打印'}/>
                </div>
                <Table
                    columnDefs={this.columns}
                    rowData={surgeries ? surgeries : []}
                    onGridReady={surgeryService.onGridReady}
                    onCellClicked={surgeryService.handlerRowClicked}
                    singleClickEdit={true}
                    suppressCellSelection={false}
                    suppressScrollOnNewData={true}
                    stopEditingWhenGridLosesFocus={true}
                />
            </div>
        )
    }
}