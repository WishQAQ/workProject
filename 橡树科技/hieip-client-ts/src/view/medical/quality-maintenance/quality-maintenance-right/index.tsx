import React from 'react'
import style from './style/index.scss'
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {Select} from 'pkg/common/select'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {Btn} from 'pkg/common/button'
import styles from 'view/pat-manage/patient-opt/operation/table/style/index.scss'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {
    qcMrMonitorItemsRightService,
    QcMrMonitorItemsRightState as State
} from 'service/medical/quality-maintenance/quality-maintenance-right'
import {InputTable} from 'pkg/common/inputTable'

export default class QualityMaintenanceRight extends FluxComponent<State> {
    title = '质控项目'
    qcMrMonitorItemsRightService = qcMrMonitorItemsRightService
    // 表头数据
    columns = [
        {
            headerName: '',
            field: 'athlete',
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            width: 40

        },
        {
            headerName: '#',
            width: 42,
            valueFormatter: (params) => {
                return params.node.rowIndex + 1
            }
        },
        {
            headerName: '触发类型',
            field: 'monitorTypeName',
            tooltipField: 'monitorTypeName',
            cellClass: () => {
                return `${styles.textCenter} ${styles.visible}`
            },
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                data: [
                    {id: 1, name: '事件类型', monitorTypeCommDict: 'mrMonitorEventDict'},
                    {id: 2, name: '病历状态触发', monitorTypeCommDict: 'patientFileStatusDict'},
                    {id: 3, name: '医嘱触发', monitorTypeCommDict: 'localOrderTypeDict'}
                ],
                allowClear: true,
                className: style.agSel,
                dataOption: {value: 'name', key: 'id'},
                onClick: (v, e) =>
                    qcMrMonitorItemsRightService.monitorTypeChange('dataList.' + e.rowIndex + '.monitorType', v.id, e.rowIndex),
                open: true
            }
        },
        {
            headerName: '触发动作',
            field: 'monitorActionName',
            tooltipField: 'monitorActionName',
            cellClass: () => {
                return `${styles.textCenter} ${styles.visible}`
            },
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                data: [{id: 1, name: '触发质控', open: true}, {id: 2, name: '停止质控', open: true}],
                dataOption: {value: 'name', key: 'id', disabled: 'open'},
                onClick: (v, e) => qcMrMonitorItemsRightService.setStateJson('dataList.' + e.rowIndex + '.monitorAction', v.id),
                open: true,
                allowClear: true,
                callData: (e: any, callback) =>
                    qcMrMonitorItemsRightService.monitorActionChange(e.rowIndex, callback)
            }
        },
        {
            headerName: '质控事件',
            field: 'eventName',
            tooltipField: 'eventName',
            cellClass: () => {
                return `${styles.textCenter} ${styles.visible}`
            },
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                style: {width: '100%', height: 30},
                data: [],
                isRenderShow: true,
                option: {
                    total: 0,
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        let monitorType = qcMrMonitorItemsRightService.loadMonitorTypeCommDictData(e.rowIndex)
                        qcMrMonitorItemsRightService.loadColumns(monitorType).then(data => {
                            callback(data)
                        })
                    }
                },
                callData: (e: any, callback) => qcMrMonitorItemsRightService.inputTable(e, callback)
            }
        },
        {
            headerName: '事件动作',
            field: 'eventActionName',
            tooltipField: 'eventActionName',
            cellClass: () => {
                return `${styles.textCenter} ${styles.visible}`
            },
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                data: [{id: 1, name: '添加'}, {id: 2, name: '取消'}],
                dataOption: {value: 'name', key: 'id'},
                onClick: (v, e) =>
                    qcMrMonitorItemsRightService.setStateJson('dataList.' + e.rowIndex + '.eventAction', v.id),
                open: true,
                callData: (e) => qcMrMonitorItemsRightService.eventAction(e.rowIndex),
                allowClear: true
            }
        }
    ]

    render() {
        const {
            dataList, model, monitorTypeDict, doctOrNurseFlagDict, mulTimeFlagDict,
            mrGradingItemsDictColumns, mrGradingItemsDict,
            deptDictColumns, deptDict
        } = this.state
        return (
            <div className={style.qualityMaintenanceRight}>
                <div className={style.basicInfo}>
                    <div className={style.basicInfoTitle}>基本信息</div>
                    <div className={style.basicInfoForm}>
                        <div className={style.basicInfoFormRow}>
                            <LabelBox text={'条目名称'}
                                      labelWidth={93}
                                      asterisk={true}
                                      className={`${style.label} ${style.bigInput}`}
                                      className2={style.labelStyle}>
                                <HintInput
                                    value={model.monitorItemName}
                                    onChange={qcMrMonitorItemsRightService.setStateJson.bind(this, 'model.monitorItemName')}/>
                            </LabelBox>
                            <LabelBox text={'监控类别'}
                                      labelWidth={93}
                                      asterisk={true}
                                      className={`${style.label} ${style.smallInput}`}
                                      className2={style.labelStyle}>
                                <Select data={monitorTypeDict}
                                        allowClear={true}
                                        dataOption={{value: 'name', key: 'id', inputCode: 'inputCode'}}
                                        value={model.monitorType ? model.monitorType.toString() : ''}
                                        onChange={qcMrMonitorItemsRightService.setStateJson.bind(this, 'model.monitorType')}
                                        dropdownClassName={style.dropDownSel}
                                        className={style.sel}/>
                            </LabelBox>
                            <LabelBox text={'条目时限'}
                                      asterisk={model.monitorType && model.monitorType.toString() === '1'}
                                      labelWidth={93}
                                      className={`${style.label} ${style.smallInput}`}
                                      className2={style.labelStyle}>
                                <HintInput
                                    value={model.monitorLimit ? model.monitorLimit.toString() : ''}
                                    onChange={qcMrMonitorItemsRightService.setInputNumber.bind(this, 'model.monitorLimit', 5)}/>
                            </LabelBox>
                        </div>
                        <div className={style.basicInfoFormRow}>
                            <LabelBox text={'病案评分'}
                                      labelWidth={93}
                                      asterisk={true}
                                      className={`${style.label} ${style.bigInput70}`}
                                      className2={style.labelStyle}>
                                <InputTable
                                    className={style.inputTable}
                                    style={{width: '100%', height: 30}}
                                    data={mrGradingItemsDict}
                                    option={{
                                        total: mrGradingItemsDict.total,
                                        columns: mrGradingItemsDictColumns,
                                        pageSize: 7,
                                        showValue: 'value',
                                        multiSaveKey: 'key'
                                    }}
                                    oValue={model.scoreItemName || ''}
                                    callBackMethods={(e: any) => {
                                        let data: any = model || {}
                                        switch (e.type) {
                                            case 'blurEvent':
                                                break
                                            case 'enterEvent':
                                                data.scoreItemName = e.data.value
                                                data.scoreItemId = e.data.key
                                                qcMrMonitorItemsRightService.setStateJson('model', data)
                                                break
                                            case 'changeEvent':
                                                data = model || {}
                                                data.scoreItemName = e.value || ''
                                                data.scoreItemId = null
                                                qcMrMonitorItemsRightService.setStateJson('model', data)
                                                qcMrMonitorItemsRightService.loadData(
                                                    'mrGradingItemsDict',
                                                    {
                                                        startIndex: e.pageCurrent,
                                                        pageSize: e.pageSize
                                                    },
                                                    e.value || '')
                                                break
                                            default:
                                                qcMrMonitorItemsRightService.setStateJson('model.scoreItemName', e.value || '')
                                                qcMrMonitorItemsRightService.loadData(
                                                    'mrGradingItemsDict',
                                                    {
                                                        startIndex: e.pageCurrent,
                                                        pageSize: e.pageSize
                                                    },
                                                    e.value || '')
                                                break
                                        }
                                    }}
                                />
                            </LabelBox>
                            <LabelBox text={'科室'}
                                      labelWidth={93}
                                      className={`${style.label} ${style.bigInput30}`}
                                      className2={style.labelStyle}>
                                <InputTable
                                    className={style.inputTable}
                                    style={{width: '100%', height: 30}}
                                    data={deptDict}
                                    option={{
                                        total: deptDict.total,
                                        columns: deptDictColumns,
                                        pageSize: 7,
                                        showValue: 'value',
                                        multiSaveKey: 'key'
                                    }}
                                    oValue={model.deptName || ''}
                                    callBackMethods={(e: any) => {
                                        switch (e.type) {
                                            case 'blurEvent':
                                                break
                                            case 'enterEvent':
                                                let data: any = model || {}
                                                data.deptName = e.data.value
                                                data.deptCode = e.data.key
                                                qcMrMonitorItemsRightService.setStateJson2('model', data)
                                                break
                                            case 'changeEvent':
                                                data = model || {}
                                                data.deptName = e.value || ''
                                                data.deptCode = null
                                                qcMrMonitorItemsRightService.setStateJson('model', data)
                                                qcMrMonitorItemsRightService.loadData(
                                                    'deptDict',
                                                    {
                                                        startIndex: e.pageCurrent,
                                                        pageSize: e.pageSize
                                                    },
                                                    e.value || '')
                                                break
                                            default:
                                                qcMrMonitorItemsRightService.setStateJson('model.deptName', e.value)
                                                qcMrMonitorItemsRightService.loadData(
                                                    'deptDict',
                                                    {
                                                        startIndex: e.pageCurrent,
                                                        pageSize: e.pageSize
                                                    },
                                                    e.value || '')
                                                break
                                        }
                                    }}
                                />
                            </LabelBox>
                        </div>
                        <div className={`${style.basicInfoFormRow} ${style.basicInfoFormRowLast}`}>
                            <LabelBox text={'书写次数间隔天数'}
                                      asterisk={model.monitorType && model.monitorType.toString() === '0'}
                                      labelWidth={117}
                                      className={`${style.label} ${style.bigInput}`}
                                      className2={`${style.labelStyle} ${style.bigLabelStyle}`}>
                                <HintInput
                                    value={model.monitorIntervalDays || ''}
                                    onChange={qcMrMonitorItemsRightService.setInputNumber.bind(this, 'model.monitorIntervalDays', 2)}/>
                            </LabelBox>
                            <LabelBox text={'医护标志'}
                                      labelWidth={93}
                                      className={`${style.label} ${style.smallInput}`}
                                      className2={style.labelStyle}>
                                <Select data={doctOrNurseFlagDict}
                                        allowClear={true}
                                        dataOption={{value: 'name', key: 'id', inputCode: 'inputCode'}}
                                        value={model.doctOrNurseFlag ? model.doctOrNurseFlag.toString() : ''}
                                        onChange={qcMrMonitorItemsRightService.setStateJson.bind(this, 'model.doctOrNurseFlag')}
                                        dropdownClassName={style.dropDownSel}
                                        className={style.sel}/>
                            </LabelBox>
                            <LabelBox text={'多次标志'}
                                      labelWidth={93}
                                      className={`${style.label} ${style.smallInput}`}
                                      className2={style.labelStyle}>
                                <Select data={mulTimeFlagDict}
                                        allowClear={true}
                                        dataOption={{value: 'name', key: 'id', inputCode: 'inputCode'}}
                                        value={model.mulTimeFlag ? model.mulTimeFlag.toString() : ''}
                                        onChange={qcMrMonitorItemsRightService.setStateJson.bind(this, 'model.mulTimeFlag')}
                                        dropdownClassName={style.dropDownSel}
                                        className={style.sel}/>
                            </LabelBox>
                        </div>
                    </div>
                </div>
                <div className={style.tableWrap}>
                    <div className={style.tableHead}>
                        <span className={style.mainTitle}>质控项目</span>
                        <Btn text={<span><IconFont iconName={'icon-baocun1'}
                                                   hover={true}/><span>保存</span></span>}
                             btnParam={{
                                 className: `${style.btn} ${style.greenBtn}`,
                                 onClick: this.qcMrMonitorItemsRightService.save
                             }}/>
                        <Btn text="新增"
                             btnParam={{
                                 icon: 'plus-circle', className: `${style.btn} ${style.blueBtn}`,
                                 onClick: qcMrMonitorItemsRightService.agTabAdd
                             }}

                        />
                        <Btn text="删除" btnParam={{
                            type: 'danger', icon: 'minus-circle', className: `${style.btn} ${style.redBtn}`,
                            onClick: qcMrMonitorItemsRightService.agTabDel
                        }}/>
                    </div>
                    <div className={style.tableContent}>
                        <Table
                            columnDefs={this.columns}
                            rowData={dataList}
                            rowSelection={'multiple'}
                            onSelectionChanged={(node) =>
                                qcMrMonitorItemsRightService.setStateJson2('dataListSelectRow', node.api.getSelectedNodes())}
                            onGridReady={qcMrMonitorItemsRightService.onGridReady}
                            singleClickEdit={true}
                            suppressCellSelection={false}
                        />
                    </div>
                </div>
            </div>
        )
    }
}