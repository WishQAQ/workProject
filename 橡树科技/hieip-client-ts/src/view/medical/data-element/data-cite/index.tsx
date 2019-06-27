import React from 'react'
import styles from './style/index.scss'
import { Table } from 'pkg/common/table'

import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { dataCiteService, DataCiteState } from 'src/service/medical/data-element/data-cite'

const title = [
    {
        headerName: '引用类型',
        field: 'dsDgType',
        editable: false
    },
    {
        headerName: '编码',
        field: 'dsId',
        editable: false
    },
    {
        headerName: '名称',
        field: 'dsName',
        editable: false
    }
]

export default class DataCite extends FluxComponent<DataCiteState> {
    title = '数据元'
    dataCiteService = dataCiteService

    render() {
        let { dsIndexList } = this.state
        return (
            <div className={styles.citeRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据元引用情况</div>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={title}
                        rowData={dsIndexList ? dsIndexList : []}
                    />
                </div>
            </div>
        )
    }
}