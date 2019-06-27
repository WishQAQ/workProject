import * as React from 'react'
import moment from 'moment'
import {Layout} from 'antd'
import {Table} from 'src/packages/common/table/table'
import * as css from '../style/index.scss'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {medicalSignService, MedicalSignState} from 'service/medical/medical-sign'

function gshTimes(params, type) {
    let val = params.value
    if (type) {
        val = val && moment(val).format('YYYY-MM-DD')
    } else {
        val = val && moment(val).format('YYYY-MM-DD HH:mm')
    }
    return val
}

const columns = [
    {
        headerName: '#',
        checkboxSelection: true,
        minWidth: 35,
        maxWidth: 35
    },
    {
        headerName: '住院号',
        field: 'inpNo'
    }, {
        headerName: '患者ID',
        field: 'patientId'
    }, {
        headerName: '住院次数',
        field: 'visitId'
    }, {
        headerName: '姓名',
        field: 'name'
    }, {
        headerName: '性别',
        field: 'sex'
    }, {
        headerName: '出院科室',
        field: 'deptName'
    }, {
        headerName: '出院病区',
        field: 'wardName'
    }, {
        headerName: '出院日期',
        field: 'dischargeDateTime',
        valueFormatter: (parms) => gshTimes(parms, 1)
    }, {
        headerName: '入院日期',
        field: 'admissionDateTime',
        valueFormatter: (parms) => gshTimes(parms, 1)
    }, {
        headerName: '出生日期',
        field: 'dateOfBirth',
        valueFormatter: (parms) => gshTimes(parms, 1)
    }, {
        headerName: '经治医师',
        field: 'doctorInCharge'
    }, {
        headerName: '首次签收人',
        field: 'firstBackUserName'
    }, {
        headerName: '首次签收时间',
        field: 'firstBackTime',
        valueFormatter: (parms) => gshTimes(parms, 0)
    }
]

export default class MedicalSignContentView extends FluxComponent<MedicalSignState> {
    title = 'MedicalSignContentView'
    medicalSignService = medicalSignService

    render() {
        const {signFlag} = this.state

        return (
            <Layout.Content className={css.patient_container}>
                <Table
                    columnDefs={columns}
                    onGridReady={v => medicalSignService.onGridReady(v)}
                    onSelectionChanged={(node) => medicalSignService.onSelectChange(node.api.getSelectedNodes())}
                    suppressRowClickSelection={false}
                    menuclassName={'medical-sign-rmenu'}
                    ContextMenuList={signFlag ? ['取消签收'] : ['签收']}
                    menuClik={medicalSignService.onSign}
                    onCellClicked={medicalSignService.agTableClick}
                    onCellContextMenu={medicalSignService.agTableClick}
                    rowSelection={'multiple'}
                    rowModelType={'infinite'}
                    rowClassRules={{
                        [css.onColorSetCse]: (params) => {
                            return (1 === Number(params.data.pushBack)) || (2 === Number(params.data.pushBack))
                        },
                        [css.onColorSetGreen]: (params) => {
                            return 'B' === params.data.newborn
                        }
                    }}
                />
            </Layout.Content>
        )
    }
}
