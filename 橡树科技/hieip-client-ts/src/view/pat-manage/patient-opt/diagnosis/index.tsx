/**
 * 诊断页面
 */
import React from 'react'
import css from './style/diagnosis.scss'
// model
import {Table} from 'pkg/common/table'
import {IconFont} from 'pkg/common/icon'
import {Select} from 'pkg/common/ag/select'
import {InputTable} from 'pkg/common/inputTable'
import {TimePicker} from 'pkg/common/timePicker'
import {Button, Menu} from 'antd'
import {Card} from 'pkg/ui/card'
import {FluxComponent} from 'tools/flux/FluxComponent'
import moment from 'moment'
import {diagnosisEntityService, DiagnosisEntityState} from 'service/pat-manage/patien-opt/diagnnosis'
import {AgCheckBox} from 'pkg/common/ag/checkbox'
import classNames from 'classnames'
import {orderService} from 'service/pat-manage/patien-opt/orders/apply/orders'

const MenuItemGroup = Menu.ItemGroup
export default class Diagnosis extends FluxComponent<DiagnosisEntityState> {
    title = '急诊患者诊断表'
    diagnosisEntityService = diagnosisEntityService
    columns = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            maxWidth: 25,
            minWidth: 25,
            cellStyle: {
                paddingTop: '6px',
                paddingLeft: '3px',
            },
        },
        {
            headerName: '诊断类型',
            field: 'diagnosisTypeName',
            valueFormatter: params => {
                let model = params.data.diagnosisType
                return model ? (typeof(model) === 'object' ? (model.name || '') : (params.value || '')) : ''
            },
            editable: true,
            cellEditorFramework: Select,
            cellEditorParams: {
                data: this.state ? this.state.dataModel : [],
                dataOption: {value: 'value', key: 'key'},
                onClick: (v, e) => {
                    diagnosisEntityService.setStateJson2({id: v.key, name: v.value}, 'data', e.rowIndex, 'diagnosisType')
                },
                open: true,
                isSearch: true,
                maxHeight: 150,
                callData: (v, callback) => {
                    callback(diagnosisEntityService.loadDiagnosisTypeDict())
                },
                isMask: false,
            },
            cellClass: () => {
                return css.publicAlign
            }
        },
        {
            headerName: '中/西医诊断',
            field: 'diagnosisFlags',
            editable: true,
            cellEditorFramework: Select,
            cellEditorParams: {
                data: [
                    {name: '西医诊断', id: 0, inputCode: 'XLA'},
                    {name: '中医诊断', id: 1, inputCode: 'XLB'}
                ],
                dataOption: {value: 'name'},
                onClick: (v) => {
                    diagnosisEntityService.doctorselect(v)
                },
                isMask: false,
                open: true
            },
            cellClass: () => {
                return css.publicAlign
            }
        },
        {
            headerName: '诊断名称',
            field: 'diagnosisDesc',
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                data: this.state ? this.state.diagnosisName : [],
                option: {
                    total: this.state && this.state.diagnosisName ? this.state.diagnosisName.length : [],
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        diagnosisEntityService.loadColumns('diagnosisDict').then(data => {
                            callback(data)
                        })
                    }
                },
                isRenderShow: true,
                isMask: false,
                callData: (e, callback) => {
                    diagnosisEntityService.inputTableDiagnosisDesc(e, 'diagnosisDict', callback)
                }
            },
            cellClass: () => {
                return css.publicAlign
            }
        },
        {
            headerName: '诊断编码',
            field: 'diagnosisCode'
        },
        {
            headerName: '诊断医生',
            field: 'doctor',
            valueFormatter: (params) => {
                return params.value ? params.value.name : ''
            }
        },
        {
            headerName: '诊断时间',
            field: 'diagnosisDate',
            valueFormatter: (params) => {
                if (params.value) {
                    let val = params.value
                    val = moment(val).format('YYYY-MM-DD hh:mm:ss')
                    return val
                }
            },
            editable: true,
            cellEditorFramework: TimePicker,
            cellEditorParams: {
                className: css.timePicker,
                autoFocus: true,
            },
            cellClass: () => {
                return css.publicAlign
            }
        },
        {
            headerName: '传染病诊断',
            field: 'contagiousInfection',
            cellRendererFramework: AgCheckBox,
            cellRendererParams: {
                onCheck: (v) => diagnosisEntityService.infectiousSelect(v)
            },
            cellClass: `${css.tableCheck}`
        },
        {
            headerName: '院内诊断',
            field: 'hospitalInfection',
            cellRendererFramework: AgCheckBox,
            cellRendererParams: {
                onCheck: (v) => {
                    diagnosisEntityService.diagnosisSelect()
                }
            },
            cellClass: `${css.tableCheck}`
        },
        {
            headerName: '主诊断',
            field: 'isMainDiagnosis',
            cellRendererFramework: AgCheckBox,
            cellRendererParams: {
                onCheck: (v) => {
                    diagnosisEntityService.primarySelect()
                }
            },
            cellClass: `${css.tableCheck}`
        }
    ]

    render() {
        return (
            <div className={css.diagnosisMain}>
                <div className={css.mainLeft}>
                    <div className={css.diagnosisBtn}>
                        {/*<Button type="primary" onClick={diagnosisEntityService.findByPvId}>查询</Button>*/}
                        <Button onClick={diagnosisEntityService.increase} className={classNames(css.publicBtn, css.addDiagnosisBtn)}>
                            <IconFont iconName={'icon-tianjia'}/>{'新增'}
                        </Button>
                        <Button type={'primary'} onClick={diagnosisEntityService.save} className={classNames(css.publicBtn)}>
                            <IconFont iconName={'icon-baocun1'}/>{'保存'}
                        </Button>
                        <Button type={'danger'} onClick={diagnosisEntityService.agTabDel}
                                className={classNames(css.publicBtn, css.delDiagnosisBtn)}>
                            <IconFont iconName={'icon-jianqu'}/>{'删除'}
                        </Button>
                    </div>
                    <div className={css.diagnosisTable}>
                        <Table
                            columnDefs={this.columns}
                            rowData={this.state.data}
                            onRowClicked={diagnosisEntityService.index}
                            onSelectionChanged={(node) => diagnosisEntityService.agTabSelectRow(node.api.getSelectedNodes())}
                            suppressCellSelection={false}
                            stopEditingWhenGridLosesFocus={true}
                            rowClass={css.rowClass}
                            singleClickEdit={true}
                            onGridReady={diagnosisEntityService.onGridReady}
                        />
                    </div>
                </div>
                <div className={css.mainRight}>
                    <Card text={'常用诊断'}
                          className={css.used}
                    >
                        <Menu
                            className={css.oftenUsed}
                            onSelect={(v) => diagnosisEntityService.loadTempSaveByKey(v)}
                        >
                            <MenuItemGroup>
                                {this.state ? this.state.commonlyDiagnosis.map((e, i) => {
                                    return <Menu.Item key={i}>
                                        <span className={css.oftenUseText} title={e.value}>{e.value}</span>
                                        <span className={css.diagnosisAdd}><IconFont iconName={'icon-jia-'}
                                                                                     hover={true}/></span>
                                    </Menu.Item>
                                }) : false}
                            </MenuItemGroup>
                        </Menu>
                    </Card>
                </div>
            </div>
        )
    }
}