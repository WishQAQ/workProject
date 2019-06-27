/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import * as css from './style/index.scss'
import { Button, Input, Radio, Select } from 'antd'
import { Rounded } from 'src/packages/common/rounded'
import { Table } from 'src/packages/common/table/index'
import { DragMove } from 'src/packages/common/dragging'
import * as style from 'view/triage/patient-list/style/patient-head.scss'
import * as moment from 'moment'
import debug from 'debug'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { maintainFileServiceService, MaintainFileState } from 'src/service/medical/medical/components/written/maintain-file'

const RadioGroup = Radio.Group
const Option = Select.Option

const log = debug('trace:病历:medical')

const columns = [{
    headerName: '#',
    valueFormatter: (params) => {
        return params.node.rowIndex + 1
    }
}, {
    headerName: '患者ID',
    field: 'patientId'
}, {
    headerName: '病历名称',
    field: 'topic'
}, {
    headerName: '申请类型',
    field: 'applyType'
}, {
    headerName: '申请人',
    field: 'applyUserName'
}, {
    headerName: '申请科室',
    field: 'applyDeptName'
}, {
    headerName: '申请原因',
    field: 'applyReason'
}, {
    headerName: '申请日期',
    field: 'applyDateTime',
    valueFormatter: (params) => {
        let val = params.value
        val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
        return val
    }
}, {
    headerName: '状态',
    field: 'status'
}, {
    headerName: '批准人',
    field: 'approveUserName'
}, {
    headerName: '批准科室',
    field: 'deptName'
}, {
    headerName: '批准日期',
    field: 'approveDateTime'
}, {
    headerName: '申请开放病历审批备注',
    field: 'applyRemark'
}]

export default class MaintainFile extends FluxComponent<MaintainFileState> {
    title = '申请列表'
    maintainFileServiceService = maintainFileServiceService

    render() {
        let { mrPatientFile, mrPatientFileLenght, page, visible } = this.state
        return (
            <div>
                <DragMove
                    className={css.patientModal_diao}
                    title="病历维护申请列表"
                    visible={visible}
                    onOk={() => this.props.handSearch('tain-ok')}
                    onCancel={maintainFileServiceService.cancel}
                    okText="确认"
                    cancelText="取消"
                    width={'50%'}
                    cwidth={837}
                    cheight={493}
                >
                    <div className={css.newFileContainer}>
            <span className="show" style={{ marginRight: 10 }}>
                <label style={{ marginRight: 10 }}>状态:</label>
                <RadioGroup onChange={e => this.props.radioGroupChange('tain-zhuangtai', e.target.value)}>
                  <Radio value={1}>未处理</Radio>
                  <Radio value={2}>已处理</Radio>
                </RadioGroup>
              </span>
                        <Rounded
                            className={`${css.fileNameInput} ${css.newFileRounded}`}
                            leftShow={'文件名'}>
                            <Input placeholder="请输入文件名"
                                   onChange={e => this.props.radioGroupChange('tain-wenjianm', e.target.value)}/>
                        </Rounded>
                        <Button type="primary"
                                icon="search"
                                className={css.searchBtn}
                                onClick={() => this.props.handSearch('tain-search')}
                        >查询</Button>
                    </div>
                    <div style={{ height: 338, border: '1px solid #e1e1e1' }}>
                        <Table
                            columnDefs={columns}
                            rowData={mrPatientFile ? mrPatientFile : []}
                            rowSelection={'multiple'}
                            onSelectionChanged={(node) => this.props.handSearch('print-tableselect', node.api.getSelectedNodes())}
                            onCellClicked={node => this.props.handSearch('tableClick', node.data)}
                            onGridReady={maintainFileServiceService.onGridReady}
                            pageSize={page ? page.pageSize : 0}
                            pagination={true}
                            paginationAutoPageSize={true}
                            total={mrPatientFileLenght ? mrPatientFileLenght : 0}
                            clickpage={true}
                            singleClickEdit={false}
                            onShowSizeChange={maintainFileServiceService.onShowSize}
                        />
                    </div>
                </DragMove>
            </div>
        )
    }
}