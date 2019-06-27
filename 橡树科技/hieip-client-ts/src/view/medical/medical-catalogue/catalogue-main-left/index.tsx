import React from 'react'
import style from './style/index.scss'
import {Table} from 'pkg/common/table'
import {MedicalCatalogueSate, medicalCatalogueService} from 'service/medical/medical-catalogue/index'
import {FluxComponent} from 'tools/flux/FluxComponent'

export default class CatalogueMainLeftView extends FluxComponent<MedicalCatalogueSate> {
    title = 'CatalogueMainLeftView'
    medicalCatalogueService = medicalCatalogueService

    columns = [
        {
            headerName: '#',
            width: 35,
            maxWidth: 35,
            checkboxSelection: true
        },
        {
            headerName: '患者ID',
            field: 'patientId',
            width: 72
        },
        {
            headerName: '患者姓名',
            field: 'name',
            width: 93
        },
        {
            headerName: '性别',
            field: 'sex',
            width: 50
        },
        {
            headerName: '住院次数',
            field: 'visitId',
            width: 93
        },
        {
            headerName: '出院时间',
            field: 'dischargeDateTime',
            width: 93
        },
        {
            headerName: '出院科室',
            field: 'deptName',
            width: 93
        }
    ]

    render(): JSX.Element {
        return (
            <div className={style.catalogueLeftTable}>
                <div className={style.tableHead}>
                    患者列表
                </div>
                <div className={style.tableContent}>
                    <Table
                        columnDefs={this.columns}
                        onGridReady={medicalCatalogueService.onGridReady}
                        customWith={true}
                        onCellClicked={v => medicalCatalogueService.agTableClick(v)}
                        onSelectionChanged={(node) => medicalCatalogueService.onSelectChange(node.api.getSelectedNodes())}
                        suppressRowClickSelection={false}
                        menuclassName={'medical-sign-rmenu'}
                        rowSelection={'multiple'}
                        rowModelType={'infinite'}
                    />
                </div>
            </div>
        )
    }
}