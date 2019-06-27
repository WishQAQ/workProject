/**
 *  病历召回主体第一个表格
 *  create by wx
 */
import React from 'react'
import * as style from './style/index.scss'
import { Table } from 'pkg/common/table'
import moment from 'moment'

import debug from 'debug'

const log = debug('trace:病历:medical')

export default class RecallMainTop extends React.Component<any, any> {
    columns = [
        {
            headerName: '患者ID',
            field: 'patientID'
        },
        {
            headerName: '姓名',
            field: 'name'
        },
        {
            headerName: '性别',
            field: 'sex'
        },
        {
            headerName: '住院号',
            field: 'enterNum'
        },
        {
            headerName: '住院次',
            field: 'enterCount'
        },
        {
            headerName: '出院日期',
            field: 'leaveTime',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD')
                return val
            }
        },
        {
            headerName: '出院科室',
            field: 'leaveOffice'
        },
        {
            headerName: '医生病历',
            field: 'doctorMedical'
        },
        {
            headerName: '出院病区',
            field: 'leavePlace'
        },
        {
            headerName: '出院日',
            field: 'leaveDate',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD')
                return val
            }
        },
        {
            headerName: '签收日期',
            field: 'qsrq',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD')
                return val
            }
        },
        {
            headerName: '签收人',
            field: 'qsr'
        },
        {
            headerName: '编目人',
            field: 'bmr'
        },
        {
            headerName: '归档日期',
            field: 'recordTime',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD')
                return val
            }
        },
        {
            headerName: '归档人',
            field: 'recordPeople'
        }
    ] // 表头
    rowData = [
        {
            patientID: 1,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 2,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 3,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 4,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 5,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 6,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 7,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        },
        {
            patientID: 8,
            name: '张三',
            sex: '男',
            enterNum: 2,
            enterCount: 2,
            leaveTime: new Date(),
            leaveOffice: '外科',
            doctorMedical: '外科',
            leavePlace: '外科',
            leaveDate: new Date(),
            qsrq: new Date(),
            qsr: '张三',
            bmr: 'aaaa',
            recordTime: new Date(),
            recordPeople: 'aaaa'
        }
    ]

    render() {
        return (
            <div className={style.recallMainTop}>
                <Table columnDefs={this.columns}
                       rowData={this.rowData}
                       rowSelection={'multiple'}
                       onSelectionChanged={(node) => log(node.api.getSelectedNodes())}/>
            </div>
        )
    }
}