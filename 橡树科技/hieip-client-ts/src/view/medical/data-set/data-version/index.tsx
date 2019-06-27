import React from 'react'
import styles from './style/index.scss'

import { Table } from 'pkg/common/table'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { dataSetService, DataSetState } from 'service/medical/data-set'
import { Btn } from 'pkg/common/button'
import moment from 'moment'

export default class DataVersion extends FluxComponent<DataSetState> {
    title = '数据集版本信息'
    dataSetService = dataSetService
    columns = [
        {
            headerName: '版本号',
            field: 'dsVersion',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.dsVersion : ''
                }
            },
            editable: false
        },
        {
            headerName: '发布时间',
            field: 'dsOperateTime',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            },
            editable: false
        },
        {
            headerName: '发布人',
            field: 'dsOperatorName',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.dsOperatorName : ''
                }
            },
            editable: false
        }
    ]

    render() {
        let { versions } = this.state
        return (
            <div className={styles.versionRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据集版本管理</div>
                    <Btn btnParam={{
                        className: styles.buttonOther, icon: 'edit',
                        onClick: dataSetService.publishVersion
                    }} text={'发布'}/>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={this.columns}
                        rowData={versions ? versions : []}
                        onCellClicked={dataSetService.versionsOpt}
                    />
                </div>
            </div>
        )
    }
}