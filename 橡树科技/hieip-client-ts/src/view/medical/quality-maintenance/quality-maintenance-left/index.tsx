import React from 'react'
import style from './style/index.scss'
import {Btn} from 'pkg/common/button'
import {Table} from 'pkg/common/table'
import {Input} from 'antd'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {
    qcMrMonitorItemsLeftService,
    QcMrMonitorItemsLeftState as State
} from 'service/medical/quality-maintenance/quality-maintenance-left'

const Search = Input.Search

export default class QualityMaintenanceLeft extends FluxComponent<State> {
    title = '基础自动质控项目'
    qcMrMonitorItemsLeftService = qcMrMonitorItemsLeftService

    columns = [
        {
            headerName: '',
            field: 'athlete',
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            width: 100
        },
        {
            headerName: '条目名称',
            field: 'monitorItemName'
        },
        {
            headerName: '时限',
            field: 'monitorLimit'
        }
    ]

    render() {
        const {modelList, qcName} = this.state
        return (
            <div className={style.qualityMaintenanceLeft}>
                <div className={style.leftHeader}>
                    <span>基础自动质控项目</span>
                    <Btn text="删除"
                         btnParam={{
                             icon: 'minus-circle', className: `${style.btn} ${style.redBtn}`,
                             onClick: qcMrMonitorItemsLeftService.deleteQcMrMonitorItems
                         }}/>
                    <Btn text="新增"
                         btnParam={{
                             icon: 'plus-circle', className: `${style.btn} ${style.espBtn}`,
                             onClick: this.qcMrMonitorItemsLeftService.toAdd
                         }}/>
                </div>
                <div className={style.searchInput}>
                    <Search
                        placeholder="输入条目名称"
                        // value={qcName ? qcName : ''}
                        defaultValue={qcName ? qcName : ''}
                        onSearch={qcMrMonitorItemsLeftService.findQcMrMonitorItems}
                        onChange={v => qcMrMonitorItemsLeftService.setStateJson(v, 'qcName')}
                        enterButton={true}/>
                </div>
                <div className={style.leftTable}>
                    <Table
                        columnDefs={this.columns}
                        rowData={modelList}
                        rowSelection={'multiple'}
                        onCellClicked={v => qcMrMonitorItemsLeftService.setStateJson(v, 'modelListIndex')}
                        onGridReady={qcMrMonitorItemsLeftService.onGridReady}
                        onSelectionChanged={(node) =>
                            qcMrMonitorItemsLeftService.setStateJson('modelListSelectRow', node.api.getSelectedNodes())
                        }/>
                </div>
            </div>
        )
    }
}