import React from 'react'

import styles from './style/index.scss'

import { Table } from 'pkg/common/table'
import { dataSetService, DataSetState } from 'service/medical/data-set'
import { FluxComponent } from 'tools/flux/FluxComponent'

export default class DataCite extends FluxComponent<DataSetState> {
    title = '数据集引用数据'
    dataSetService = dataSetService
    columns = [
        {
            headerName: '系统名称',
            field: 'mrName',
            editable: false
        },
        {
            headerName: '引用时间',
            field: 'createDateTime',
            editable: false
        }
    ]

    render() {
        let { templateIndex } = this.state
        return (
            <div className={styles.citeRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据集引用情况</div>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        columnDefs={this.columns}
                        rowData={templateIndex ? templateIndex : []}
                        agtableClassName={styles.myAgTable}
                    />
                </div>
            </div>
        )
    }
}