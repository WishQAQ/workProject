import React from 'react'
import style from './style/index.scss'
import { Table } from 'pkg/common/table'
import { Layout } from 'antd'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { recordArchivingService, RecordArchivingState } from 'service/medical/record-archiving/index'

const columns = [
    {
        headerName: '',
        checkboxSelection: true,
        minWidth: 34,
        maxWidth: 34
    }, {
        headerName: '出院日期',
        field: 'dischargeDateTime',
        width: 120,
        valueFormatter: (parms) => recordArchivingService.gshTimes(parms, false)
    }, {
        headerName: '签收时间',
        field: 'mrBackDateTime',
        width: 120,
        valueFormatter: (parms) => recordArchivingService.gshTimes(parms, false)
    }, {
        headerName: '病案状态',
        width: 70,
        field: 'mrDoctorStatus'
    }, {
        headerName: '住院号',
        width: 75,
        field: 'inpNo'
    }, {
        headerName: '患者ID',
        width: 90,
        field: 'patientId'
    }, {
        headerName: '住院次数',
        field: 'visitId',
        width: 70
    }, {
        headerName: '姓名',
        width: 80,
        field: 'name'
    }, {
        headerName: '性别',
        width: 50,
        field: 'sex'
    }, {
        headerName: '出院科室',
        width: 80,
        field: 'deptName'
    }, {
        headerName: '出院病区',
        width: 100,
        field: 'areaName'
    }, {
        headerName: '入院日期',
        field: 'admissionDateTime',
        width: 120,
        valueFormatter: (parms) => recordArchivingService.gshTimes(parms, false)
    }, {
        headerName: '出生日期',
        width: 110,
        field: 'dateOfBirth',
        valueFormatter: (parms) => recordArchivingService.gshTimes(parms, true)
    }
]

export default class RecordArchivingContentView extends FluxComponent<RecordArchivingState> {
    title = 'RecordArchivingContentView'
    recordArchiving = recordArchivingService

    render() {
        return (
            <Layout.Content className={style.recordArchivingContent}>
                <Table
                    columnDefs={columns}
                    onSelectionChanged={(node) => recordArchivingService.onSelectChange(node.api.getSelectedNodes())}
                    onCellClicked={recordArchivingService.handlerRowClicked}
                    onGridReady={recordArchivingService.onGridReady}
                    suppressRowClickSelection={false}
                    rowSelection={'multiple'}
                    rowModelType={'infinite'}
                />
            </Layout.Content>
        )
    }
}
