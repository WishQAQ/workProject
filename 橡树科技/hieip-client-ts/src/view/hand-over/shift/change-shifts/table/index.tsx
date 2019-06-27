/**
 * 交接班中间表格
 * Created by mou.
 */
import React from 'react'
import {Table} from 'pkg/common/table'
import style from './style/midTable.scss'

export default class MidTable extends React.Component<any, any> {
    columns = [
        {
            headerName: '班次',
            field: 'shift'
        },
        {
            headerName: '现有人数',
            field: 'existingNumbers'
        },
        {
            headerName: '新入',
            field: 'new'
        },
        {
            headerName: '死亡',
            field: 'die'
        },
        {
            headerName: '师干',
            field: 'shiGan'
        },
        {
            headerName: '军人',
            field: 'shiGan'
        },
        {
            headerName: '急诊',
            field: 'emergency'
        },
        {
            headerName: '综合',
            field: 'comprehensive'
        },
        {
            headerName: '胸痛',
            field: 'chestPain'
        },
        {
            headerName: '腹痛',
            field: 'abdominalPain'
        },
        {
            headerName: '创伤',
            field: 'trauma'
        },
        {
            headerName: '发热',
            field: 'fever'
        },
        {
            headerName: '骨科',
            field: 'orthopaedics'
        },
        {
            headerName: '神内',
            field: 'god'
        },
        {
            headerName: '儿科',
            field: 'pediatrics'
        },
        {
            headerName: '妇产科',
            field: 'maternity'
        },
        {
            headerName: '耳鼻喉',
            field: 'otorhinolaryngology'
        },
        {
            headerName: '总数',
            field: 'total'
        },
        {
            headerName: '备注',
            field: 'remarks'
        }
    ]
    rowData = [
        {
            shift: '早班',
            existingNumbers: 200,
            new: 15,
            total: 215
        },
        {
            shift: '中班',
            existingNumbers: 500,
            new: 16,
            total: 516
        },
        {
            shift: '夜班',
            existingNumbers: 400,
            new: 17,
            total: 417
        },
    ]

    render() {
        return (
            <div className={style.midTable}>
                <Table rowHeight={26}
                       headerHeight={26}
                       columnDefs={this.columns}
                       rowData={this.rowData}/>
            </div>)
    }
}