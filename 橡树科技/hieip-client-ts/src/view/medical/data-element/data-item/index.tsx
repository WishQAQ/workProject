import React from 'react'
import styles from './style/index.scss'
import { Table } from 'pkg/common/table'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { dataItemService, DataItemState } from 'src/service/medical/data-element/data-item'

// 测试数据
let title = [
    {
        headerName: '值',
        field: 'cvValue',
        tooltipField: '值',
        editable: false
    },
    {
        headerName: '值含义',
        field: 'cvValueText',
        tooltipField: '值含义',
        editable: false
    },
    {
        headerName: '计算值',
        field: 'cvCalculatedValue',
        tooltipField: '计算值',
        editable: false
    },
    {
        headerName: '分组标记',
        field: 'cvGroupIdentifier',
        tooltipField: '分组标记',
        editable: false
    },
    {
        headerName: '说明',
        field: 'cvMemo',
        tooltipField: '说明',
        editable: false
    }
]

export default class DataItem extends FluxComponent<DataItemState> {
    title = '值域'
    dataItemService = dataItemService

    render() {
        let { bdCvItemsList } = this.state
        return (
            <div className={styles.itemRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据元对应值域信息</div>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={title}
                        rowData={bdCvItemsList ? bdCvItemsList : []}
                    />
                </div>
            </div>
        )
    }
}