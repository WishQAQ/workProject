/**
 * 调班审批 by hhc
 */
import React from 'react'
import css from './style/index.scss'
// model
import { TimePicker } from 'pkg/common/timePicker'
import { Button, Input, Radio } from 'antd'
import { IconFont } from 'pkg/common/icon'
import { Table } from 'pkg/common/table'
import { DragMove } from 'pkg/common/dragging'
// service
import { FluxComponent } from 'tools/flux/FluxComponent'
import { approvedService, ApprovedState } from 'service/hand-over/classes/approved'

const { TextArea } = Input

export default class Approved extends FluxComponent<ApprovedState> {

    title = '调班审批'
    approvedService = approvedService

    tableTitle = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 30,
            cellClass: (params) => {
                return css.tableCheck
            }
        },
        {
            headerName: '申请人',
            field: 'applyUserName'
        },
        {
            headerName: '申请时间',
            field: 'applyTime'
        },
        {
            headerName: '调班详情',
            field: ''
        },
        {
            headerName: '被调班人',
            field: 'exchangeUserName'
        },
        {
            headerName: '申请原因',
            field: 'reason'
        },
        {
            headerName: '状态',
            field: 'state'
        },
        {
            headerName: '审核人',
            field: 'auditorUserName'
        },
        {
            headerName: '审核结果',
            field: 'explain'
        }
    ]

    render() {
        let {
            tableData,
            end,
            begin,
            range,
            startPlaceholder,
            endPlaceholder,
            defaultState,
            applyingState,
            agreeState,
            refuseState
        } = this.state

        let menu = ['同意', '拒绝']
        return (
            <div className={css.approvedMain}>
                {/*顶部搜索条件*/}
                <div className={css.approvedTitle}>
                    <TimePicker
                        isRange={true}
                        oValue={begin}
                        oValue2={end}
                        value={range}
                        dateChange={approvedService.dataChange}
                        startPlaceholder={startPlaceholder}
                        endPlaceholder={endPlaceholder}
                    />
                    <div className={css.smallCom}>
                        <b>类型:</b>
                        <Radio.Group defaultValue={defaultState} onChange={approvedService.getCurrentState}>
                            <Radio value={applyingState}>
                                {'申请'}
                            </Radio>
                            <Radio value={agreeState}>
                                {'同意'}
                            </Radio>
                            <Radio value={refuseState}>
                                {'拒绝'}
                            </Radio>
                        </Radio.Group>
                    </div>
                    <Button onClick={approvedService.search}>
                        <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                    </Button>
                </div>
                {/*审批表格*/}
                <div className={css.approvedTable}>
                    <Table
                        columnDefs={this.tableTitle}
                        rowData={tableData}
                        menuclassName={'approvedRightMenu'}
                        ContextMenuList={menu}
                        menuClik={approvedService.menuClick}
                        rowSelection={'multiple'}
                        onGridReady={approvedService.onGridReady}
                        onSelectionChanged={approvedService.getSelectRows}
                    />
                </div>
                {/*拒绝理由弹框*/}
                <DragMove
                    title={'拒绝理由'}
                    visible={this.state.open}
                    okText={'保存'}
                    onCancel={approvedService.close}
                    onOk={approvedService.refuse}
                    mask={true}
                    width={290}
                    className={css.refuseReason}
                >
          <TextArea
              rows={4}
              autosize={{ minRows: 4, maxRows: 4 }}
              onChange={approvedService.getTxtValue}
          />
                </DragMove>
            </div>
        )
    }
}