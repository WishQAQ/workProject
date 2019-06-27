import React from 'react'
import styles from './style/index.scss'
import {Table} from 'pkg/common/table'
import {dataItemService, DataItemState} from 'service/medical/data-range/data-item/index'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {Btn} from 'pkg/common/button'

// 声明数据类型
const title = [
    {
        headerName: '值',
        field: 'cvValue',
        tooltipField: '值',
        editable: true,
        cellClass: () => {
            return styles.agRowEdit
        }
    },
    {
        headerName: '值含义',
        field: 'cvValueText',
        tooltipField: '值含义',
        editable: true,
        cellClass: () => {
            return styles.agRowEdit
        }
    },
    {
        headerName: '计算值',
        field: 'cvCalculatedValue',
        tooltipField: '计算值',
        editable: true,
        cellClass: () => {
            return styles.agRowEdit
        }
    },
    {
        headerName: '分组标记',
        field: 'cvGroupIdentifier',
        tooltipField: '分组标记',
        editable: true,
        cellClass: () => {
            return styles.agRowEdit
        }
    },
    {
        headerName: '说明',
        field: 'cvMemo',
        tooltipField: '说明',
        editable: true,
        cellClass: () => {
            return styles.agRowEdit
        }
    }
]
export default class RangeItemView extends FluxComponent<DataItemState> {
    title = 'RangeItemView'
    dataItemService = dataItemService

    render() {
        let {bdCvItems} = this.state
        return (
            <div className={styles.itemRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>值域数据项管理</div>
                    <Btn btnParam={{
                        className: styles.buttonOther, icon: 'save',
                        onClick: dataItemService.newVersion
                    }} text={'保存'}/>
                    <Btn btnParam={{
                        className: styles.buttonAdd, icon: 'plus-circle',
                        onClick: dataItemService.newUpdate
                    }} text={'新增'}/>
                    <Btn btnParam={{
                        className: styles.buttonDelete, icon: 'minus-circle',
                        onClick: dataItemService.delUpdate
                    }} text={'删除'}/>
                </div>
                {/* 表格 */}
                <div className={styles.mainTable}>
                    <Table
                        agtableClassName={styles.myAgTable}
                        columnDefs={title}
                        rowData={bdCvItems}
                        onGridReady={dataItemService.onGridReady}
                        singleClickEdit={true}
                        onRowClicked={dataItemService.onClinkUpdate}
                        suppressCellSelection={false}
                        stopEditingWhenGridLosesFocus={true}
                        suppressScrollOnNewData={true}
                    />
                </div>
            </div>
        )
    }
}