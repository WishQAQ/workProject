/**
 * 检查右边已开申请列表 by hhc
 */
import React from 'react'
import css from '../style/exam.scss'
// component
import { Card } from 'src/packages/ui/card'
import { Table } from 'src/packages/common/table'
// service
import { examService, ExamState } from 'service/pat-manage/patien-opt/exam/apply/index.ts'
import { FluxComponent } from 'tools/flux/FluxComponent'

export default class RightApply extends FluxComponent<ExamState> {
    title = '已开检查申请'
    examService = examService

    tableTitle = [
        {
            headerName: '检查主题',
            field: 'itemName'
        },
        {
            headerName: '状态',
            field: 'status'
        },
        {
            headerName: '申请时间',
            field: 'applyDateTime'
        }
    ]

    render() {
        let { alreadyOpen } = this.state
        let menu = ['作废']
        return (
            <Card text={`已开申请列表`}
                  className={css.applyList}
            >
                <Table
                    columnDefs={this.tableTitle}
                    rowData={alreadyOpen}
                    menuclassName={'examApplyRightMenu'}
                    ContextMenuList={menu}
                    onCellClicked={examService.fetchAlreadyOpen}
                    menuClik={examService.alreadyOpenRightMenu}
                    onGridReady={examService.alreadyOpenGridReady}
                />
            </Card>
        )
    }
}