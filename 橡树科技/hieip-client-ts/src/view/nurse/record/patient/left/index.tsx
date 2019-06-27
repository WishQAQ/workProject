/**
 * 科室——护理记录单书写左侧表格
 * Created by mou on 2018/3/1.
 */
import React from 'react'
import {HintInput} from 'pkg/common/input'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import css from './style/index.scss'
const tableColumnDef = [
    {
        headerName: '床号',
        field: 'bedNo',
    },
    {
        headerName: '患者姓名',
        field: 'name',
    }
]
let tableData = []
for (let i = 0; i < 100; i++) {
    tableData.push({
        bedNo: i,
        name: '李思丽' + i
    })
}
export default class Left extends React.Component {
    render() {
        return (<div className={css.content}>
            <h5 className={css.title}>患者信息列表</h5>
            <HintInput addonAfter={<IconFont iconName={'icon-sousuo_sousuo'}/>} placeholder={'请输入患者姓名/床号/ID'}
                       className1={css.hintInput}
            />
            <div className={css.agTable}>
                <Table
                    agtableClassName={css.myAgTable}
                    columnDefs={tableColumnDef}
                    rowData={tableData}
                    rowHeight={24}
                    headerHeight={24}
                />
            </div>
        </div>)
    }
}