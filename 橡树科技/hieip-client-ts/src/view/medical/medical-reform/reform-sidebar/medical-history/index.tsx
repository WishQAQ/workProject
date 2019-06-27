import React from 'react'
import moment from 'moment'
import { Dropdown, Icon, Menu } from 'antd'
import { Table } from 'pkg/common/table'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { reformSidebarService, ReformSidebarState } from 'service/medical/medical-reform/reform-sidebar'

// 病历表格头
const medicalRowColumns = [
    {
        headerName: '标题名',
        field: 'fileName',
        tooltipField: 'fileName',
        width: 80   
    },
    {
        headerName: '标题时间',
        field: 'createDateTime',
        width:80,
        cellRendererFramework: (params) => {
            return <span>{moment(params.value).format('YYYY-MM-DD')}</span>
        }
    }
]

/**
 * 病历类别 上面部分 主要类别信息 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class MedicalHistoryView extends FluxComponent<ReformSidebarState> {
    title = 'MedicalHistoryView'
    reformSidebarService = reformSidebarService

    render() {
        const { currentMrClassName, currentMedicalTypeOptions } = this.state
        const medicalMenu = (
            <Menu onClick={({ item }) => reformSidebarService.onMenuItemClick(item)}>
                {
                    currentMedicalTypeOptions ?
                        (currentMedicalTypeOptions.map((item, index) => {
                            return (
                                <Menu.Item key={`${item.mrClassCode}`} value={item.mrClassName}>
                                    {item.mrClassName}({item.counts})
                                </Menu.Item>
                            )
                        })) : null
                }
            </Menu>
        )
        return (
            <div className={styles.medicalHistory}>
                <div className={styles.historyTitle}>
                    <Dropdown
                        overlay={medicalMenu}
                        placement="bottomLeft"
                        trigger={['click']}
                    >
                        <span className={styles.dropDown}>{currentMrClassName} <Icon type="down" /></span>
                    </Dropdown>
                    <span
                        className={styles.historyBtn}
                        onClick={reformSidebarService.onMedicalHistoryShow}
                    >
                        <Icon type="solution" />&nbsp;历史记录
                    </span>
                </div>
                <div className={styles.historyTable}>
                    <Table
                        columnDefs={medicalRowColumns}
                        onGridReady={(params) => reformSidebarService.onGridReady(params)}
                        onCellClicked={(params) => reformSidebarService.onClickChange(params)}
                        suppressRowClickSelection={false}
                        rowModelType={'infinite'}
                    />
                </div>
            </div>
        )
    }
}