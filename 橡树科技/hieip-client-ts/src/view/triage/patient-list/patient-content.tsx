import * as React from 'react'
import moment from 'moment'
import { Layout } from 'antd'
import { Table } from 'pkg/common/table/table'
import * as css from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { ApiDictState, patientConenteService } from 'service/triage/patient-list/patient-conente'
import { JsonUtil } from 'tools/api/JsonUtil'

const { Content } = Layout

/** 测试 表格表头 */
const columns = [
    {
        headerName: '就诊号',
        field: 'visitId',
        width: 67
    }, {
        headerName: '病人编号',
        field: 'patientId',
        width: 83
    }, {
        headerName: '病人姓名',
        field: 'name',
        width: 83
    }, {
        headerName: '性别',
        field: 'sex',
        width: 51
    }, {
        headerName: '出生日期',
        field: 'dateOfBirth',
        width: 83,
        valueFormatter: (params) => {
            return patientConenteService.publicTimeShow(params)
        }
    }, {
        headerName: '就诊时间',
        field: 'visitDate',
        width: 83,
        valueFormatter: (params) => {
            return patientConenteService.publicTimeShow(params)
        }
    }, {
        headerName: '分诊时间',
        field: 'triageDate',
        width: 83,
        valueFormatter: (params) => {
            return patientConenteService.publicTimeShow(params)
        }
    }, {
        headerName: '分诊耗时',
        field: 'triageDuration',
        width: 73,
        valueFormatter: (params) => {
            let val = params.value
            val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
            return val
        }
    }, {
        headerName: '级别',
        field: 'actTriageLevel',
        width: 51
    }, {
        headerName: '去向',
        field: 'triageTarget',
        width: 63
    }, {
        headerName: '其他去向',
        field: 'otherTriageTarget',
        width: 83
    }, {
        headerName: '费别',
        field: 'chargeType',
        width: 61
    }, {
        headerName: '绿色通道',
        field: 'greenRoad',
        width: 83
    }, {
        headerName: '其他标识',
        field: 'specialSign',
        width: 83
    }, {
        headerName: '群伤',
        field: 'bulkinjuryId',
        width: 51,
        valueFormatter: (params) => {
            let value = JsonUtil.getJsonByKey('data.bulkinjuryId', params, 0)
            return value.length === 0 || parseInt(value, 0) === 0 ? '否' : '是'
        }
    }, {
        headerName: '操作员',
        field: 'triageBy',
        width: 68
    }, {
        headerName: '检验结果',
        field: 'hasVitalSign',
        width: 65
    }, {
        headerName: '是否退号',
        field: 'isBackNum',
        width: 65
    }]

export default class PatientContent extends FluxComponent<ApiDictState> {
    title = 'PatientContent'
    patientConenteService = patientConenteService

    render(): JSX.Element {
        let { menu } = this.state
        return (
            <Content>
                <div className={css.patient_container}>
                    <Table
                        columnDefs={columns}
                        ContextMenuList={menu}
                        menuClik={patientConenteService.menuClik}
                        menuclassName={'munuclass2'}
                        rowModelType={'infinite'}
                        onGridReady={patientConenteService.onGridReady}
                        onCellClicked={patientConenteService.showCurRowMessage}
                        onCellContextMenu={patientConenteService.showCurRowMessage}
                    />
                </div>
            </Content>
        )
    }
}
