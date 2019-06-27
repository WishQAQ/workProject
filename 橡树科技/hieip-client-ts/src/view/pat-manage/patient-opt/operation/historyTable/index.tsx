import React from 'react'
import {Table} from 'pkg/common/table'
import {Card} from 'pkg/ui/card'
import {FluxComponent} from 'tools/flux/FluxComponent'
import styles from './style/index.scss'
// service
import {historyTableService, HistoryTableState} from 'service/pat-manage/patien-opt/operation/history-table/index'
import {JsonUtil} from '../../../../../tools/api/JsonUtil'

export default class HistoryTable extends FluxComponent<HistoryTableState> {

    title: '手术申请.历史纪录'
    historyTableService = historyTableService

    columns = [
        {
            headerName: '手术名称',
            field: 'itemName',
            tooltipField: 'itemName',
            cellClass: (params) => {
                return styles.textCenter
            },
            width: 80
        },
        {
            headerName: '确认标志',
            field: 'ackIndicator',
            tooltipField: 'ackIndicator',
            cellClass: (params) => {
                return `${styles.textCenter}`
            },
            width: 80
        },
        {
            headerName: '申请人',
            field: 'applyDoctor',
            tooltipField: 'applyDoctor',
            cellClass: (params) => {
                return styles.textCenter
            },
            width: 60
        },
        {
            headerName: '状态',
            field: 'status',
            tooltipField: 'status',
            cellClass: (params) => {
                return `${styles.textCenter}`
            },
            width: 40
        }
    ]

    /**
     * 根据状态是否为作废设置样式
     * @param params 默认参数
     * @returns {{background: string}} 返回设置的样式
     */
    getRowStyle = (params) => {
        if (params.data.status && params.data.status === '作废预约') {
            return {background: '#ffe4e9', color: '#ff375b'}
        }
    }

    render() {
        let {rowData} = this.state
        return (
            <Card text={`历史纪录(${rowData.length})`} className={styles.card}>
                <div className={styles.table}>
                    <Table
                        columnDefs={this.columns}
                        rowData={rowData}
                        onGridReady={historyTableService.onGridReady}
                        singleClickEdit={true}
                        stopEditingWhenGridLosesFocus={true}
                        suppressCellSelection={false}
                        enableCellChangeFlash={true}
                        onCellValueChanged={(a) => a}
                        ContextMenuList={['作废']}
                        getRowStyle={this.getRowStyle}
                        menuClik={historyTableService.rightClick}
                        menuclassName={'operationHistory'}
                        onSelectionChanged={historyTableService.getSelectRows}
                        onCellClicked={historyTableService.leftLoad}
                        onCellContextMenu={historyTableService.leftLoad}
                    />
                </div>
            </Card>
        )
    }
}