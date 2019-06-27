import React from 'react'
import css from '../style/index.scss'
// model
import { Card } from 'pkg/ui/card'
import { Table } from 'pkg/common/table'
import { DragMove } from 'pkg/common/dragging'
// 修改过敏史编辑时加的inputTable
import{ InputTable } from 'pkg/common/inputTable'
import { Button } from 'antd'
import { overviewService, OverviewServiceState } from 'service/pat-manage/patien-opt/overview/mian'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { HintInput } from 'pkg/common/ag/input'
import { Select } from 'pkg/common/ag/select'
import moment from 'moment'
import {IconFont} from 'pkg/common/icon'
import {billDetailService} from '../../../../../service/pat-manage/patien-opt/bill/bill-detail'

export interface State {
    open?: boolean // 过敏史修改
}

export default class MainContents extends FluxComponent<OverviewServiceState> {
    title = '过敏史修改'
    overviewService = overviewService
    /**
     * 诊断列规则
     */
    recent = [
        {
            headerName: '诊断类别',
            field: 'diagnosisType',
            valueFormatter: (params) => {

                return params.value ? params.value.name : ''
            }
        },
        {
            headerName: '诊断',
            field: 'diagnosisDesc'
        },
        {
            headerName: '医生',
            field: 'doctor.name'
        }
    ]

    /**
     * 过敏列规则
     */
    allergy = [
        {
            headerName: '过敏药物',
            field: 'allergyMedicineName'
        },
        {
            headerName: '描述',
            field: 'description'
        }
    ]

    /**
     * 流转
     */
    circulation = [
        {
            headerName: '流转时间',
            field: 'operatorDateTime',
            valueFormatter: (params) => {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            }
        },
        {
            headerName: '转出区域',
            field: 'dischargeDeptCode.name'
        },
        {
            headerName: '转入区域',
            field: 'admWardDeptCode.name'
        },
        {
            headerName: '原因',
            field: 'reason'
        }
    ]

    /**
     * 交接班列规则
     */
    handOver = [
        {
            headerName: '交接班日期',
            field: 'createTime',
            width: 200,
            valueFormatter: (params) => {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            }
        },
        {
            headerName: '交接班内容',
            field: 'transferContent'
        }
    ]

    /**
     * 过敏修改
     */
    allergyTitle = [
        {
            headerName: '过敏药物',
            field: 'allergyMedicineName',
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                data: [],
                option: {
                    total: 0,
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        overviewService.loadColumns('alergyDrugsDict').then(data => {
                            callback(data)
                        })
                    }
                },
                isRenderShow: true,
                isMask: false,
                tableLeft: 0,
                callData: (v, callback) => {
                    overviewService.inputTableDevelop(v, callback)
                },
            },
        },
        {
            headerName: '过敏药物编码',
            field: 'allergyMedicineCode'
        },
        {
            headerName: '描述',
            field: 'description',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '记录时间',
            field: 'recordTime',
            valueFormatter: (params) => {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            }
        },
        {
            headerName: '记录人',
            field: 'recorderName'
        },
        {
            headerName: '就诊区域',
            field: 'areaName'
        }
    ]

    render() {
        let { diagnosisList, patientAllergy, transferRecList, changePatientLog, openAllergy , allergySelect} = this.state

        /****模拟数据**** */
        return (
            <div className={css.mainContent}>
                <div>
                    <div className={css.recent}>
                        <Card text={'最近诊断'} className={css.cardStyle}>
                            <Table
                                columnDefs={this.recent}
                                rowData={diagnosisList ? diagnosisList : []}
                            />
                        </Card>
                    </div>
                    <div className={css.patientInfo}>
                        <div>
                            <Card text={'过敏史信息'}
                                  className={css.cardStyle}
                                  extra={<div className={css.allergyEdit}>
                                      <Button type="primary"
                                              className={css.allergyBtn}
                                              onClick={overviewService.open}>
                                          <IconFont iconName={'icon-xiugai'}/>{'编辑'}
                                      </Button>
                                  </div>}
                            >
                                <Table
                                    columnDefs={this.allergy}
                                    rowData={allergySelect ? allergySelect : []}
                                    onGridReady={overviewService.onGridReadyAllergy}
                                />
                            </Card>
                        </div>
                        <div>
                            <Card text={'交接班记录'} className={css.cardStyle}>
                                <Table
                                    columnDefs={this.handOver}
                                    rowData={changePatientLog ? changePatientLog : []}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
                <div>
                    <Card text={'流转记录'} className={css.cardStyle}>
                        <Table
                            columnDefs={this.circulation}
                            rowData={transferRecList ? transferRecList : []}
                        />
                    </Card>
                </div>
                <DragMove
                    title={<div className={css.newTitle}>
                        <b>编辑过敏史</b>
                    </div>}
                    visible={openAllergy}
                    onCancel={overviewService.close}
                    className={css.allergyModel}
                    width={740}
                    zIndex={100}
                >
                    <div className={css.allergyTable}>
                        <Table
                            columnDefs={this.allergyTitle}
                            rowData={allergySelect ? allergySelect : []}
                            onCellClicked={overviewService.showCurRow} // 表格单击行数据
                            onGridReady={overviewService.onGridReady}     // 页面第一次刷新时存储在内的所以事件自动执行
                            suppressCellSelection={false}           // 开启单元格选中
                            stopEditingWhenGridLosesFocus={true} // 焦点离开关闭编辑模式
                            rowClass={css.rowClass}
                            onCellValueChanged={overviewService.cellValueChange} // 值改变事件
                            singleClickEdit={true} // 点击启动编辑加载组件
                            suppressDragLeaveHidesColumns={true} // 关闭拖动列到表格外删除列
                            suppressMovableColumns={true} // 关闭拖动换列
                        />
                    </div>
                    <div className={css.compileBtn}>
                        <Button type="primary" onClick={overviewService.addMasterLine}>增加</Button>
                        <Button type="primary" onClick={overviewService.drugSave}>保存</Button>
                        <Button type="primary" onClick={overviewService.logicDelete}>删除</Button>
                    </div>
                </DragMove>
            </div>
        )
    }
}