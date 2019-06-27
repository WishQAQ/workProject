import React from 'react'
import styles from './style/index.scss'
import {dataCiteService, DataCiteState} from 'service/medical/data-range/data-cite/index'
import {Table} from 'pkg/common/table'
import {FluxComponent} from 'tools/flux/FluxComponent'
// 测试数据
const title = [
    {
        headerName: '数据元编码',
        field: 'id',
        editable: false
    },
    {
        headerName: '数据元名称',
        field: 'deName',
        editable: false
    }
]

export default class RangeCiteView extends FluxComponent<DataCiteState> {
    title = 'RangeCiteView'
    dataCiteService = dataCiteService

    render() {
        return (
            <div className={styles.citeRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>值域引用情况</div>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={title}
                        onGridReady={dataCiteService.onGridReady}
                    />
                </div>
            </div>
        )
    }
}