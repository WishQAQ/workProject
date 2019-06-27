import {Checkbox, Icon} from 'antd'
import React from 'react'
import moment from 'moment'
import {Btn} from 'pkg/common/button'
import {Table} from 'pkg/common/table'
import styles from './style/index.scss'
import {Select} from 'pkg/common/ag/select'
import {TimePicker} from 'pkg/common/timePicker'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {basicService} from 'service/medical/medical-record/basic'
import {diagnosisService, DiagnosisState} from 'service/medical/medical-record/diagnosis/index'
import {InputTable} from 'pkg/common/inputTable'
import classnames from 'classnames'

/**
 * 病案首页诊断信息页面
 */
export default class DiagnosisRecordView extends FluxComponent<DiagnosisState> {
    title = 'DiagnosisRecordView'
    diagnosisService = diagnosisService

    // 测试数据
    columns = [
        {
            headerName: '诊断类型',
            field: 'diagnosisFlagDesc',
            width: 90,
            editable: (params) => {
                if (params.node.data.diagnosisSubNo > 0) return false
                else return true
            },
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                const val = params.value
                const subNo = params.node.data.diagnosisSubNo
                return subNo > 0 ? '' : (val ? (val === '1' ? '西医' : (val === '0' ? '中医' : val)) : '')
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {code: '0', inputCode: 'ZY', value: '中医'},
                    {code: '1', inputCode: 'XY', value: '西医'}
                ],
                dataOption: {
                    value: 'value',
                    key: 'code',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    diagnosisService.diagnosisTypeSelect(v)
                }
            }
        },
        {
            headerName: '诊断阶段',
            field: 'otherTypeName',
            width: 100,
            editable: (params) => {
                if (params.node.data.diagnosisSubNo > 0) return false
                else return true
            },
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                if (params.node.data.diagnosisSubNo > 0) return ''
                else return params.value
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {code: '0', inputCode: 'QT', value: '其他'},
                    {code: '1', inputCode: 'CBZD', value: '初步诊断'},
                    {code: '2', inputCode: 'BCZD', value: '补充诊断'},
                    {code: '3', inputCode: 'XZZD', value: '修正诊断'}
                ],
                dataOption: {
                    value: 'value',
                    key: 'code',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    diagnosisService.diagnosisOtherTypeSelect(v)
                }
            }
        },
        {
            headerName: '诊断类别',
            field: 'diagnosisTypeName',
            width: 95,
            editable: false,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                if (params.node.data.diagnosisSubNo > 0) return ''
                else return params.value
            }
        },
        {
            headerName: '诊断描述',
            field: 'diagnosisDesc',
            width: 150,
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
                    showValue: 'diagnosisName',
                    columnsCallData: (v, callback) => {
                        diagnosisService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '300px',
                isRenderShow: true,
                isMask: false,
                callData: (v, callback) => {
                    diagnosisService.showMessage(v, callback)
                }
            }
        },
        {
            headerName: '诊断编码',
            field: 'diagnosisCode',
            width: 80,
            editable: false,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '诊断日期',
            field: 'diagnosisDate',
            width: 150,
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
                timePrecision: 1,
                format: 'YYYY-MM-DD HH:mm:ss',
                className: styles.timePicker,
                minDate: moment(new Date()).subtract(100, 'y').toDate(),
                maxDate: moment(new Date()).add(100, 'y').toDate()
            }
        },
        {
            headerName: '治疗结果',
            field: 'treatResult',
            width: 70,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '病理号',
            field: 'pathologicalNo',
            width: 60,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '出院情况',
            field: 'treatResult1',
            width: 100,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {code: '1', inputCode: 'ZY', value: '治愈'},
                    {code: '2', inputCode: 'HZ', value: '好转'},
                    {code: '3', inputCode: 'WY', value: '未愈'},
                    {code: '4', inputCode: 'SW', value: '死亡'},
                    {code: '5', inputCode: 'QT', value: '其他'}
                ],
                dataOption: {
                    value: 'value',
                    key: 'code',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    diagnosisService.dischargeConditionsSelect(v)
                }
            }
        },
        {
            headerName: '诊断备注',
            field: 'diagnosisNote',
            width: 70,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '入院病情',
            field: 'operTreatIndicator1',
            width: 85,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {code: '1', inputCode: 'CBZD', value: '有'},
                    {code: '2', inputCode: 'BCZD', value: '临床未确定'},
                    {code: '3', inputCode: 'XZZD', value: '情况不明'},
                    {code: '4', inputCode: 'QT', value: '无'}
                ],
                dataOption: {
                    value: 'value',
                    key: 'code',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    diagnosisService.admissionConditionsSelect(v)
                }
            }
        },
        {
            headerName: '天数',
            field: 'treatDays',
            width: 58,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '入院情况',
            field: 'admissionConditions',
            width: 90,
            editable: true,
            cellClass: () => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '传染标识',
            field: 'contagious',
            width: 58,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'contagious')
                }
            }
        },
        {
            headerName: '手术部位感染',
            field: 'operationPartInfect',
            width: 80,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'operationPartInfect')
                }
            }
        },
        {
            headerName: '发生医院感染',
            field: 'infectIndicator',
            width: 100,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'infectIndicator')
                }
            }
        },
        {
            headerName: '院内感染',
            field: 'infection',
            width: 58,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'infection')
                }
            }
        },
        {
            headerName: '主诊断',
            field: 'isMainDiagnosis',
            width: 58,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.mainDiagSetData('diagnosisEntities.isMainDiagnosis', value ? '1' : '0', rowIndex)
                }
            }
        },
        {
            headerName: '确诊',
            field: 'confirmedIndicator',
            width: 58,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'confirmedIndicator')
                }
            }
        },
        {
            headerName: '手术',
            field: 'operTreatIndicator',
            width: 58,
            // editable: true,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'operTreatIndicator')
                }
            }
        },
        {
            headerName: '介入',
            field: 'insertIndicator',
            width: 58,
            cellClass: () => {
                return styles.agRowEdit
            },
            valueFormatter: (params) => {
                return params ? params.value : ''
            },
            cellRendererFramework: Checkboxs,
            cellRendererParams: {
                getValue: (value, rowIndex) => {
                    diagnosisService.setStateJson2(value ? '1' : '0', 'diagnosisEntities', rowIndex, 'insertIndicator')
                }
            }
        }
    ]

    render() {
        const {diagnosis, disableAll} = basicService.state
        const {diagnosisEntities, diagTypeCount} = this.state

        return (
            <div className={styles.root}>
                {/* 按钮 */}
                <div className={classnames(styles.btnGroup, `${disableAll ? styles.pointer : ''}`)}>
                    <Btn btnParam={{
                        className: styles.buttonAlter,
                        icon: 'plus-circle',
                        onClick: diagnosisService.addDiagEntity
                    }}
                         text={'插入诊断'}/>
                    <Btn btnParam={{
                        className: styles.buttonAlter,
                        icon: 'plus-circle',
                        onClick: diagnosisService.addDiagChildEntity
                    }}
                         text={'插入子诊断'}/>
                    <Btn btnParam={{
                        className: styles.buttonDelete,
                        icon: 'minus-circle',
                        onClick: diagnosisService.delDiagEntity
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
                <div className={styles.left}>
                    <header className={styles.listHeader}>
                        诊断类别
                        (<span>{diagnosis ? diagnosis.length : 0}</span>)
                    </header>
                    <ul className={styles.myUl}>
                        {
                            diagnosis ? diagnosis.map((item, key) => {
                                return (
                                    <li key={key} className={styles.myLi}
                                        onClick={diagnosisService.getDiagType.bind(this, item)}>
                                        {item.diagnosisTypeName}({diagTypeCount[item.diagnosisCode] || 0})
                                        <button
                                            onClick={diagnosisService.addDiagEntity}
                                            className={styles.btn}>
                                            <Icon type="plus-square-o" className={styles.plus}/>
                                        </button>
                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                </div>
                <div className={classnames(styles.table, `${disableAll ? styles.pointer : ''}`)}>
                    <Table
                        columnDefs={this.columns}
                        rowData={diagnosisEntities ? diagnosisEntities : []}
                        onGridReady={diagnosisService.onGridReady}
                        onCellClicked={diagnosisService.handlerRowClicked}
                        singleClickEdit={true}
                        suppressCellSelection={false}
                        stopEditingWhenGridLosesFocus={true}
                        customWith={true}
                    />
                </div>
            </div>
        )
    }
}

export interface CheckboxsProps {
    value: any,
    getValue: any,
    rowIndex: number
}

class Checkboxs extends React.Component<CheckboxsProps> {
    handleClick = (e, rowIndex) => {
        this.props.getValue(e.target.checked, rowIndex)
    }

    render() {
        let {value, rowIndex} = this.props
        value = value === '1' || value === '是'
        // value = (value === '1' || value === '是') ? true : false
        return (
            <Checkbox defaultChecked={value} onChange={
                (event) => this.handleClick(event, rowIndex)
            }
            />
        )
    }
}