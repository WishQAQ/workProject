import React from 'react'
import { Select } from 'pkg/common/select'
import { DragMove } from 'pkg/common/dragging'
import { Rounded } from 'pkg/common/rounded'
import { Table } from 'pkg/common/table'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { ReformDefectModelState, reformDefectModelService } from 'service/medical/medical-reform/reform-defect-modal'

const Option = Select.Option

// 病案评分表头
const gradeColumns = [
    {
        headerName: '#',
        width: 35,
        checkboxSelection: true,
        suppressMenu: true,
        pinned: true,
        cellClass: styles.tableFirst
    },
    {
        headerName: '项目编码',
        field: 'gradingItemCode',
        width: 100,
        cellClass: styles.tableCol,
        headerClass: styles.tableHeader
    },
    {
        headerName: '评分项目',
        field: 'gradingItemName',
        width: 300,
        cellClass: styles.tableCol,
        headerClass: styles.tableHeader
    },
    {
        headerName: '扣分标准',
        field: 'gradingItemStandard',
        width: 70,
        cellClass: styles.tableCol,
        headerClass: styles.tableHeader
    }
]

/**
 * 病案评分弹出框 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class DefectModalView extends FluxComponent<ReformDefectModelState> {
    title = 'DefectModalView'
    reformDefectModelService = reformDefectModelService

    render() {
        const { codeName, isDefectVisible, mrRectificationItems, mrGradingClasses } = this.state

        return (
            <DragMove
                title="病案评分条目"
                visible={isDefectVisible}
                width={570}
                move={true}
                onOk={reformDefectModelService.onDefectOk}
                onCancel={reformDefectModelService.onReformDefectHide}
                okText="确定"
                cancelText="取消"
            >
                <Rounded leftShow={'病案评分类别'} style={{ width: '70%' }}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="病案分类别"
                        value={codeName}
                        data={mrGradingClasses}
                        onSelect={(val, option: any) => reformDefectModelService.onChangeDataSet(val, option)}
                        // onChange={(v) => reformDefectModelService.onChangeDataSet(v)}
                        dataOption={{
                            value: 'gradingClassName',
                            key: 'gradingClassCode'
                        }}
                    >
                        {
                            mrGradingClasses ? (mrGradingClasses.map(item =>
                                <Option key={item.gradingClassCode} value={item.gradingClassName}>
                                    {item.gradingClassName}
                                </Option>)) : null
                        }
                    </Select>
                </Rounded>
                <div className={styles.table}>
                    <Table
                        rowSelection="multiple"
                        rowData={mrRectificationItems}
                        columnDefs={gradeColumns}
                        onCellClicked={(v) => reformDefectModelService.onClickChange(v)}
                        onSelectionChanged={(node) => reformDefectModelService.onSelectChange(node.api.getSelectedNodes())}
                    // onGridReady={params => reformDefectModelService.onGridReady(params)}
                    // pagination={true}
                    // paginationAutoPageSize={true}
                    // clickpage={true}
                    // onShowSizeChange={clickPage => reformDefectModelService.onChangePag(clickPage)}
                    // pageSize={page ? page.pageSize : 0}
                    // total={defectTypeTotal ? defectTypeTotal : 0}
                    />
                </div>
            </DragMove>
        )
    }
}