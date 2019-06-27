import React from 'react'
import styles from './style/index.scss'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {dataVersionService, DataVersionState} from 'service/medical/data-range/data-version/index'
import {Table} from 'pkg/common/table'
import moment from 'moment'
import {dataItemService} from 'service/medical/data-range/data-item'
import {Btn} from 'pkg/common/button'

// 声明数据类型
const title = [
    {
        headerName: '版本号',
        field: 'cvVersion',
        tooltipField: '版本号',
        editable: false
    },
    {
        headerName: '发布时间',
        field: 'cvPublishTime',
        tooltipField: '发布时间',
        editable: false,
        valueFormatter: (params) => {
            let val = params.value
            val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
            return val
        }
    },
    {
        headerName: '发布人',
        field: 'cvPublisherName',
        tooltipField: '发布人',
        editable: false
    }
]
export default class RangeVersionView extends FluxComponent<DataVersionState> {
    title = 'RangeVersionView'
    rangeVersionService = dataVersionService

    render() {
        let {bdCvVersions} = this.state
        return (
            <div className={styles.versionRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>值域版本管理</div>
                    <Btn btnParam={{
                        className: styles.buttonOther, icon: 'edit',
                        onClick: dataVersionService.publishVersion
                    }} text={'发布'}/>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={title}
                        rowData={bdCvVersions}
                        onGridReady={dataVersionService.onGridReady}
                        onCellClicked={dataVersionService.handlerRowClicked}
                    />
                </div>
            </div>
        )
    }
}