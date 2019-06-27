// basic
import React from 'react'
import moment from 'moment'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// antd
import {Menu, Icon, Switch} from 'antd'
// oak Component
import {IconFont} from 'pkg/common/icon/index'
import {Table} from 'pkg/common/table'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {
    outpatientClinicDetailRecordLeftService, OutpatientClinicDetailRecordLeftState
} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-detail/record/record-left'

// 导航菜单
const SubMenu = Menu.SubMenu

export default class OutpatientClinicRecordLeft extends FluxComponent<OutpatientClinicDetailRecordLeftState> {

    title: '门诊医生站-病历-左边部分'
    outpatientClinicDetailRecordLeftService = outpatientClinicDetailRecordLeftService

    columnDefsList = [
        {
            headerName: '病历名称',
            field: 'fileName',
            width: 63,
            maxWidth: 63,
            minWidth: 63,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '创建人',
            field: 'creatorName',
            width: 53,
            maxWidth: 53,
            minWidth: 53,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '创建时间',
            field: 'createDateTime',
            width: 77,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
    ]

    render() {

        let {
            openKeys,
            medicalRecords,
            transferDept,
        } = this.state

        return (
            <div className={styles.root}>
                <div className={styles.deptList}>科室列表</div>
                {
                    transferDept.length !== 0 ? (
                        <Menu
                            onClick={outpatientClinicDetailRecordLeftService.transferDeptClick}
                            mode="inline"
                            className={styles.deptMenu}>
                            {
                                transferDept.map((item, key) => {
                                    return (
                                        <Menu.Item key={key}><IconFont iconName={'icon-keshi'}/>{item.deptName}</Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    ) : <div className={styles.emptyMenu}>
                        <div className={styles.emptyMenuBox}><span>暂无数据</span></div>
                    </div>
                }
                <div className={classNames(styles.deptList, styles.recordList)}>病历列表</div>
                {
                    medicalRecords.length !== 0 ? (
                        <Menu
                            mode="inline"
                            openKeys={openKeys}
                            onOpenChange={outpatientClinicDetailRecordLeftService.onOpenChange}
                            className={styles.recordMenu}
                            defaultOpenKeys={[]}
                        >
                            {
                                medicalRecords.map((item: any, key) => {
                                    return (
                                        <SubMenu key={key} onTitleClick={() => {
                                            outpatientClinicDetailRecordLeftService.loadRecord(item,key)
                                        }} className={styles.test} title={
                                            <div>
                                                <IconFont iconName={'icon-wendang'}/>
                                                <span>{item.mrClassName}</span>
                                            </div>
                                        }>
                                            <Menu.Item style={{height:
                                                    item.agData.length > 0 ? (24 * item.agData.length + 34) : 85
                                            }}>
                                                <Table
                                                    rowData={item.agData}
                                                    columnDefs={this.columnDefsList}
                                                    agtableClassName={classNames(styles.tableEc, styles.tableEc26)}
                                                    rowHeight={24}
                                                    onGridReady={(e)=>{outpatientClinicDetailRecordLeftService.loadApi(e,key)}}
                                                    // onRowClicked={(e)=>{
                                                    //     console.log(e)}}
                                                />
                                            </Menu.Item>
                                        </SubMenu>
                                    )
                                })
                            }
                        </Menu>
                    ) : <div className={classNames(styles.emptyMenu, styles.record)}>
                        <div className={styles.emptyMenuBox}><span>暂无数据</span></div>
                    </div>
                }
            </div>
        )
    }
}