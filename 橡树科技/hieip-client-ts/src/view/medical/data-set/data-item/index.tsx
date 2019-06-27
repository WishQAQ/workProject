import React from 'react'
import styles from './style/index.scss'

import { Table } from 'pkg/common/table'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { dataSetService, DataSetState } from 'service/medical/data-set'
import { InputTable } from 'pkg/common/inputTable'
import { Btn } from 'pkg/common/button'

export default class DataItem extends FluxComponent<DataSetState> {
    title = '数据集包含的数据组/元'
    dataSetService = dataSetService
    columns = [
        {
            headerName: '数据元编码',
            field: 'id',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.id : ''
                }
            },
            editable: true,
            cellClass: (params) => {
                return styles.agRowEdit
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                //  oValue:this.state.cvName?this.state.cvName:'',
                className: styles.testInput,
                data: [],
                option: {
                    total: this.state ? this.state.inputLength : 0,
                    columns: [],
                    pageSize: 6,
                    showValue: 'id',
                    columnsCallData: (v, callback) => {
                        dataSetService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '270px',
                isRenderShow: true,
                isMask: false,
                callData: (v, calback) => dataSetService.showMessage(v, calback)
            }
        },
        {
            headerName: '数据元名称',
            field: 'deName',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.deName : ''
                }
            },
            editable: false,
            cellClass: (params) => {
                return styles.agRowEdit
            }
        },
        {
            headerName: '重复次数',
            field: 'dsRepeatCount',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.dsRepeatCount : ''
                }
            },
            editable: true,
            cellClass: (params) => {
                return styles.agRowEdit
            }
        }
    ]

    render() {
        let { bdDeIndices } = this.state
        return (
            <div className={styles.itemRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据集包含的数据组/元</div>
                    <Btn btnParam={{
                        className: styles.buttonOther, icon: 'save',
                        onClick: dataSetService.insertInto
                    }} text={'保存'}/>
                    <Btn btnParam={{
                        className: styles.buttonAdd, icon: 'plus-circle',
                        onClick: dataSetService.insertAdd
                    }} text={'新增'}/>
                    <Btn btnParam={{
                        className: styles.buttonDelete, icon: 'minus-circle',
                        onClick: dataSetService.delUpdate
                    }} text={'删除'}/>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={this.columns}
                        rowData={bdDeIndices ? bdDeIndices : []}
                        total={bdDeIndices ? bdDeIndices.length : 1}
                        onGridReady={dataSetService.insertTable}
                        onCellClicked={dataSetService.onClinkUpdate}
                        singleClickEdit={true}
                        suppressCellSelection={false}
                        stopEditingWhenGridLosesFocus={true}
                    />
                </div>
            </div>
        )
    }
}