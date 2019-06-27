import React from 'react'
import moment from 'moment'
import { Tabs } from 'antd'
import { DragMove } from 'pkg/common/dragging'
import styles from './style/index.scss'
import { Table } from 'pkg/common/table'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { reformHistoryModelService, ReformHistoryModelState } from 'service/medical/medical-reform/reform-history-modal'

const TabPane = Tabs.TabPane
const historyColumns = [
    {
        headerName: '通知时间',
        field: 'rectificationDateTime',
        width: 150,
        valueFormatter: (params) => {
            let val = params.value
            val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
            return val
        }
    },
    {
        headerName: '质控人',
        field: 'qcUserName',
        width: 100
    },
    {
        headerName: '质控科室',
        field: 'qcDeptName',
        width: 100
    },
    {
        headerName: '接收人',
        field: 'receiveUserName',
        width: 100
    },
    {
        headerName: '接受科室',
        field: 'receiveDeptName',
        width: 100
    },
    {
        headerName: '状态',
        field: 'rectificationStatus',
        width: 100
    },
    {
        headerName: '整改扣分',
        field: 'mrScore',
        width: 100
    },
    {
        headerName: '整改级别',
        field: 'rectificationLevel',
        width: 100
    },
    {
        headerName: '整改期限',
        field: 'rectificationDeadline',
        width: 100
    },
    {
        headerName: '病历名称',
        field: 'fileId',
        width: 100
    },
    {
        headerName: '缺陷名称',
        field: 'gradingItemName',
        width: 100
    },
    {
        headerName: '扣分标准',
        field: 'gradingItemStandard',
        width: 100
    },
    {
        headerName: '缺陷次数',
        field: 'errorNumbers',
        width: 100
    },
    {
        headerName: '总扣分',
        field: 'errorTotalScore',
        width: 100
    },
    {
        headerName: '整改备注',
        field: 'qcMark',
        width: 150
    }
]
const qcHistoryColumns = [{
    headerName: '姓名',
    field: 'name',
    width: 80,
}, {
    headerName: '质控序号',
    field: 'monitorId',
    width: 50
}, {
    headerName: '质控代码',
    field: 'itemCode',
    width: 50
}, {
    headerName: '质控项目',
    field: 'itemName',
    width: 80,
}, {
    headerName: '开始时间',
    field: 'startDate',
    width: 100,
    valueFormatter: (params) => {
        if (params) {
            let dateValue = params.value
            dateValue = dateValue ? moment(dateValue).format('YYYY-MM-DD HH:mm:ss') : ''
            return dateValue
        }
    }
}, {
    headerName: '规定完成时间',
    field: 'endDate',
    width: 100,
    valueFormatter: (params) => {
        if (params) {
            let dateValue = params.value
            dateValue = dateValue ? moment(dateValue).format('YYYY-MM-DD HH:mm:ss') : ''
            return dateValue
        }
    }
}, {
    headerName: '手动停止时间',
    field: 'stopDate',
    width: 100,
    valueFormatter: (params) => {
        if (params) {
            let dateValue = params.value
            dateValue = dateValue ? moment(dateValue).format('YYYY-MM-DD HH:mm:ss') : ''
            return dateValue
        }
    }
}, {
    headerName: '完成日期',
    field: 'completeDate',
    width: 100,
    valueFormatter: (params) => {
        if (params) {
            let dateValue = params.value
            dateValue = dateValue ? moment(dateValue).format('YYYY-MM-DD HH:mm:ss') : ''
            return dateValue
        }
    }
}, {
    headerName: '录入时间',
    field: 'enterDate',
    width: 100,
    valueFormatter: (params) => {
        if (params) {
            let dateValue = params.value
            dateValue = dateValue ? moment(dateValue).format('YYYY-MM-DD HH:mm:ss') : ''
            return dateValue
        }
    }
}, {
    headerName: '剩余时间',
    field: 'leaveTime',
    width: 100,
}, {
    headerName: '超时标志',
    field: 'timeoutIndicator',
    width: 50
}, {
    headerName: '操作者姓名',
    field: 'operatorName',
    width: 80
}, {
    headerName: '病历文件序号',
    field: 'fillNo',
    width: 50
}, {
    headerName: '质控类型',
    field: 'monitorType',
    width: 120,
    valueFormatter: (params) => {
        if (params) {
            let value = params.value
            value = value === 0 ? '时限和内容监控' : (value === 1 ? '书写次数监控' : '')
            return value
        }
    }
}, {
    headerName: '数量监控文档应写次数',
    field: 'totalWriteTimes',
    width: 50
}, {
    headerName: '数量监控文档实写次数',
    field: 'finishedWriteTimes',
    width: 50
}, {
    headerName: '医院编码',
    field: 'hospitalNo',
    width: 50
}, {
    headerName: '科室编号',
    field: 'deptCode',
    width: 50
}, {
    headerName: '剩余时间文本',
    field: 'leaveTimeText',
    width: 50
}
]

/**
 * 病历整改历史记录 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class HistoryModalView extends FluxComponent<ReformHistoryModelState> {
    title = 'HistoryModalView'
    reformHistoryModelService = reformHistoryModelService

    render() {
        const { isHistoryVisible, currentPanel, mrRectificationIndex, qcMrRectificationIndex } = this.state
        return (
            <DragMove
                title="历史记录"
                visible={isHistoryVisible}
                width={1000}
                cwidth={1000}
                move={true}
                okText=""
                cancelText=""
                className={styles.root}
                onCancel={reformHistoryModelService.onMedicalHistoryHide}
            >
                <Tabs
                    type="card"
                    activeKey={currentPanel}
                    onChange={reformHistoryModelService.onTabChange}
                >
                    <TabPane tab="手动质控" key="1">
                        <div style={{ height: 300 }}>
                            <Table
                                menuShow={true}
                                columnDefs={historyColumns}
                                rowData={mrRectificationIndex ? mrRectificationIndex : []}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="自动质控" key="2">
                        <div style={{ height: 300 }}>
                            <Table
                                menuShow={true}
                                columnDefs={qcHistoryColumns}
                                rowData={qcMrRectificationIndex ? qcMrRectificationIndex : []}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </DragMove>
        )
    }
}