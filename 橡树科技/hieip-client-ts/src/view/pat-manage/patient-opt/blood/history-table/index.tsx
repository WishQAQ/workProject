import React from 'react'
import {Table} from 'pkg/common/table'
import {Card} from 'pkg/ui/card'
import styles from './style/index.scss'
import moment from 'moment'

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {historyTableService, HistoryTableState} from 'service/pat-manage/patien-opt/blood/history-table'

export default class HistoryTable extends FluxComponent<HistoryTableState> {
    title = '用血'
    historyTableService = historyTableService

    // 表头信息
    columns = [
        {
            headerName: '申请单号',
            field: 'appNo',
            width: 27
        }, {
            headerName: '状态',
            field: 'status',
            width: 18,
            valueFormatter: (params) => {
                switch (params.data.status) {
                    case '1':
                        return '申请'
                    case '2':
                        return '接收'
                    case '3':
                        return '作废'
                    default:
                        break
                }
            }
        }, {
            headerName: '申请时间',
            field: 'applyDateTime',
            width: 55,
            tooltipField: 'applyDateTime',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            }
        }
    ]

    getRowStyle = (params) => {
        if(params.data.status === '3'){
            return {background: '#ffe4e9',color:'#ff375b'}
        }
    }

    render() {
        let {historyTableData} = this.state
        return (
            <Card text={`历史纪录(${22})`} className={styles.card}>
                <div className={styles.table}>
                    <Table
                        columnDefs={this.columns}
                        rowData={historyTableData}
                        getRowStyle={this.getRowStyle}
                        onGridReady={historyTableService.onGridReady}
                        onRowClicked={historyTableService.onRowClicked}
                        onCellContextMenu={historyTableService.onRowClicked}
                        ContextMenuList={['作废']}
                        menuClik={historyTableService.menuClik}
                    />
                </div>
            </Card>
        )
    }
}