import React from 'react'
import css from '../style/exam.scss'
// model
import { Card } from 'pkg/ui/card'
import { Rounded } from 'pkg/common/rounded'
import { InputTable } from 'pkg/common/inputTable'
import { Select } from 'pkg/common/select'
// other
import { IconFont } from 'pkg/common/icon'
import { Table } from 'pkg/common/table'
import { Button, Col, Row } from 'antd'
// service
import { FluxComponent } from 'tools/flux/FluxComponent'
import { examService, ExamState } from 'service/pat-manage/patien-opt/exam/apply'
import { AgCheckBox } from 'pkg/common/ag/checkbox'
// ui
import NormalTree from 'pkg/ui/normal-tree'

export default class ApplyTable extends FluxComponent<ExamState> {
    title = '检查下部'
    examService = examService

    /**
     * 表头
     */
    tableArr = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 25,
            cellClass: (params) => {
                return css.checkCenter
            }
        },
        {
            headerName: '检查项目',
            field: 'itemName'
        },
        {
            headerName: '检查类型',
            field: 'examClass'
        },
        {
            headerName: '检查费用',
            field: 'costs'
        }
    ]

    render() {
        let {
            examClassDict, examClassDictColumns,
            examDict, examDictColumns, examPerformByDict,
            examClassTree, examSubClassTree, examClassDictValue, examDictValue, examPerformByDictValue,
            examItemTreeTable, openTree
        } = this.state
        return (
            <div className={css.applyBottomOpt}>
                <Card
                    extra={
                        <div className={css.applyTitle}>
                            <Rounded leftShow={'检查类型'} className={css.roundedStyle}>
                                <InputTable
                                    data={examClassDict || []}
                                    option={{
                                        total: examClassDict ? examClassDict.total : 0,
                                        columns: examClassDictColumns || [],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    callBackMethods={(v: any) =>
                                        examService.inputTableEvent(v, 'examClassDict', 'examClassDictValue')
                                    }
                                    className={css.applySelect}
                                    oValue={examClassDictValue}
                                />
                            </Rounded>
                            <Rounded leftShow={'发往科室'} className={css.roundedStyle}>
                                <Select
                                    data={examPerformByDict || []}
                                    dataOption={{ value: 'value', key: 'key' }}
                                    value={examPerformByDictValue || ''}
                                    className={css.deptSelect}
                                />
                            </Rounded>
                            <Rounded leftShow={'项目名称'} className={css.roundedStyle}>
                                <InputTable
                                    data={examDict || []}
                                    option={{
                                        total: examDict ? examDict.total : 0,
                                        columns: examDictColumns || [],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    callBackMethods={(v: any) =>
                                        examService.inputTableEvent(v, 'examDict', 'examDictValue')
                                    }
                                    className={css.applySelect}
                                    tableWidth={'610px'}
                                    oValue={examDictValue}
                                />
                            </Rounded>
                            <Button className={css.delBtn} type={'danger'} onClick={examService.delChooseData}>
                                <IconFont iconName={'icon-zuishaohua'}/>
                                删除
                            </Button>
                        </div>}
                    className={css.titleStyle}
                >
                    <Row className={css.mainApply}>
                        <Col span={6} style={{ height: '100%' }}>
                            {examClassTree ?
                                <NormalTree
                                    examTreeData={examClassTree}
                                    examTreeDataSec={examSubClassTree ? examSubClassTree : []}
                                    onClick={examService.examClassTree}
                                    treeClick={examService.loadItemCost}
                                    open={openTree}
                                />
                                : <div
                                    key={'no'}
                                    className={css.noTreeData}
                                >
                                    {'暂无数据'}
                                </div>}
                        </Col>
                        <Col span={18} style={{ borderLeft: '1px solid #e1e1e1' }}>
                            <Table
                                columnDefs={this.tableArr}
                                rowData={examItemTreeTable}
                                onCellClicked={examService.historyItemsOnClick}
                                onSelectionChanged={examService.historyItemsOnSelect}
                                rowSelection={'multiple'}
                                onGridReady={examService.historyItemsGridReady}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}