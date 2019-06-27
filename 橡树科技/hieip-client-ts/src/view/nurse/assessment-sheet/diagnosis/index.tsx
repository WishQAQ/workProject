/**
 * 评估单诊断
 * Created by mou on 2018/3/9.
 */
import React from 'react'
import {Table} from 'pkg/common/table'
import {HintInput} from 'pkg/common/input'
import {IconFont} from 'pkg/common/icon'
import css from './style/index.scss'
let tableLeftData = []
for (let i = 0; i < 100; i++) {
    tableLeftData.push({
        id: i,
        name: '护理诊断' + i,
    })
}
let tableRightData = []
for (let i = 0; i < 200; i++) {
    tableRightData.push({
        id: i,
        diagnosisCode: i,
        diagnosisName: '护理诊断',
        diagnosisEnglishName: 'diagnosis nurse',
        define: '帮助修复的诊断',
        type: '辅助性'
    })
}
const tableLeftColumnDef = [
    {
        headerName: '',
        field: '',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 34,
        cellClass: css.agBodyCheckbox,
        headerClass: css.agCheckbox
    },
    {
        headerName: '护理记录单名称',
        field: 'name',
    },
]
const tableRightColumnDef = [
    {
        headerName: '',
        field: '',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 34,
        cellClass: css.agBodyCheckbox,
        headerClass: css.agCheckbox
    },
    {
        headerName: '诊断编码',
        field: 'diagnosisCode',
    },
    {
        headerName: '诊断名称',
        field: 'diagnosisName',
    },
    {
        headerName: '诊断英文名称',
        field: 'diagnosisEnglishName',
    },
    {
        headerName: '定义',
        field: 'define',
    },
    {
        headerName: '类型',
        field: 'type',
    },
]
const leftMenu = ['修改']
const rightMenu = ['修改', '相关因素与症状', '护理目标']
export default class Diagnosis extends React.Component {

    render() {
        return (<div className={css.diagnosis}>
            <div className={css.left}>
                <div className={css.up}>
                    <p>护理诊断分类</p>
                    <div>
                        <HintInput addonAfter={<IconFont iconName={'icon-sousuo_sousuo'}/>} placeholder={'请输入患者姓名/床号/ID'}
                                   className1={css.hintInput}
                        />
                    </div>
                </div>
                <Table
                    rowSelection={'multiple'}
                    agtableClassName={css.myAgTable}
                    pageclassName={css.myAgPage}
                    columnDefs={tableLeftColumnDef}
                    rowData={tableLeftData}
                    ContextMenuList={leftMenu ? leftMenu : []}
                    rowHeight={28}
                    headerHeight={30}
                    pagination={true}
                    paginationAutoPageSize={true}
                    pageSize={1 ? 1 : 0}
                    clickpage={true}
                    total={tableLeftData.length ? tableLeftData.length : 0}
                    onShowSizeChange={() => {
                        // e
                    }}
                    onCellValueChanged={(e) => {
                        //  e
                    }}
                />
            </div>
            <div className={css.right}>
                <Table
                    rowSelection={'multiple'}
                    agtableClassName={css.myAgTable}
                    pageclassName={css.myAgPage}
                    columnDefs={tableRightColumnDef}
                    rowData={tableRightData}
                    ContextMenuList={rightMenu ? rightMenu : []}
                    rowHeight={28}
                    headerHeight={30}
                    pagination={true}
                    paginationAutoPageSize={true}
                    pageSize={1 ? 1 : 0}
                    clickpage={true}
                    total={tableRightData.length ? tableRightData.length : 0}
                    onShowSizeChange={() => {
                        // e
                    }}
                    onCellValueChanged={(e) => {
                        //  e
                    }}
                />
            </div>
        </div>)
    }
}