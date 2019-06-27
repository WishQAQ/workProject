import React from 'react'
import { Icon, Input, Select } from 'antd'
import { Table } from 'pkg/common/table'
import { DragMove } from 'pkg/common/dragging'
import { TimePicker } from 'pkg/common/timePicker'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { ReformNoticeModelState, reformNoticeModelService } from 'service/medical/medical-reform/reform-notice-modal'
import { reformSidebarService } from 'service/medical/medical-reform/reform-sidebar'

const Option = Select.Option

const defectColumns = [
    {
        headerName: '缺陷名称',
        field: 'gradingItemName',
        width: 200,
        cellClass: styles.defectNameCol,
        headerClass: styles.defectHeaderName
    }, {
        headerName: '扣分标准',
        field: 'gradingItemStandard',
        width: 100
    }, {
        headerName: '缺陷次数',
        field: 'errorNumbers',
        width: 100
    }, {
        headerName: '总扣分',
        field: 'errorTotalScore',
        width: 100
    }
]

/**
 * 病历整改通知书 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class NoticeModalView extends FluxComponent<ReformNoticeModelState> {
    title = 'NoticeModalView'
    reformNoticeModelService = reformNoticeModelService

    render() {
        const { mrRectificationIndexModel, isNoticeVisible, mrRectIndexNames, mrRectNoticeItems, time, itemTime, deptName } = this.state
        const { currentPatientMedical } = reformSidebarService.state
        // todo 整改级别待处理
        let level = currentPatientMedical ? currentPatientMedical.fileVisitType : ''
        return (
            <DragMove
                title="病历整改通知书"
                visible={isNoticeVisible}
                width={710}
                okText="确定"
                onOk={reformNoticeModelService.onNoticeOk}
                onCancel={reformNoticeModelService.onReformNoticeHide}>
                <div className={styles.header}>
                    <div className={styles.upper}>
                        <span className={styles.noticeTime}>
                            <span className={styles.title}>通知时间:</span>
                            <TimePicker
                                format={'YYYY-MM-DD HH:mm:ss'}
                                oValue={mrRectificationIndexModel ? mrRectificationIndexModel.rectificationDateTime : ''}
                                dateChange={(v) => reformNoticeModelService.onChangeDataSet(v,
                                    'mrRectificationIndexModel.rectificationDateTime')}
                            />
                        </span>
                        <span className={styles.infoUnit}>
                            <span className={styles.title}>
                                质控人:{mrRectificationIndexModel ? mrRectificationIndexModel.patName : ''}
                            </span>
                        </span>
                        <span className={styles.infoUnit}>
                            <span className={styles.title}>
                                质控科室: {deptName ? deptName : ''}
                            </span>
                        </span>
                        <span className={styles.infoUnit}>
                            <span className={styles.title}>
                                状态: <span className={styles.medicalState}>
                                    {currentPatientMedical ? currentPatientMedical.statusName : ''}
                                </span>
                            </span>
                        </span>
                        <span className={styles.timeLimit}>
                            <span className={styles.title}>主记录整改期限:</span>
                            <Select
                                size="small"
                                style={{ width: 70 }}
                                value={time + ' 天'}
                                onSelect={(v) => reformNoticeModelService.onSelectChange(v, 'time')}>
                                <Option value={1}>一天</Option>
                                <Option value={2}>二天</Option>
                                <Option value={3}>三天</Option>
                                <Option value={4}>四天</Option>
                                <Option value={5}>五天</Option>
                            </Select>
                        </span>
                    </div>
                    <div className={styles.under}>
                        <span className={styles.infoUnit}>
                            <span className={styles.title}>
                                整改级别: {level === 0 ? '科室质控' :
                                    (level === 1 ? '环节质控' :
                                        (level === 2 ? '终末质控' : (
                                            level === 9 ? '病案评分' : '未确定'
                                        )))}
                            </span>
                        </span>
                        <span className={styles.input}>
                            <Input
                                size="small"
                                placeholder="填写主记录整改备注"
                                onChange={(v) => reformNoticeModelService.onChangeDataSet(v, 'mrRectificationIndexModel.qcMark')} />
                        </span>
                    </div>
                </div>
                <div className={styles.reformContent}>
                    <div className={styles.sidebar}>
                        {mrRectIndexNames
                            ? (mrRectIndexNames.map((val, index) => {
                                return (
                                    <div
                                        className={styles.item}
                                        key={index}
                                        onClick={() => reformNoticeModelService.getMrRectItems(val)}>
                                        <span>{val}</span><Icon type="right" />
                                    </div>
                                )
                            }))
                            : null}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <div className={styles.contentItem}>
                                <span style={{ marginRight: 30 }}>
                                    <span className={styles.title}>
                                        接收人:
                                        <span className={styles.info}>
                                            {currentPatientMedical ? currentPatientMedical.signatureName : ''}
                                        </span>
                                    </span>
                                </span>
                                <span>
                                    <span className={styles.title}>
                                        接受科室:
                                        <span className={styles.info}>
                                            {currentPatientMedical ? currentPatientMedical.deptName : ''}
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <div className={styles.contentItem}>
                                <span
                                    style={{
                                        marginRight: 30
                                    }}>
                                    <span className={styles.title}>
                                        整改扣分:
                                        <span className={styles.info}>
                                            {mrRectificationIndexModel ? mrRectificationIndexModel.mrScore : ''}
                                        </span>
                                    </span>
                                </span>
                                <span className={styles.title}>
                                    整改期限:
                                    <Select
                                        size="small"
                                        style={{ width: 70, marginLeft: 5 }}
                                        value={itemTime + ' 天'}
                                        onSelect={(v) => reformNoticeModelService.onSelectChange(v, 'itemTime')}
                                    >
                                        <Option value={1}>一天</Option>
                                        <Option value={2}>二天</Option>
                                        <Option value={3}>三天</Option>
                                        <Option value={4}>四天</Option>
                                        <Option value={5}>五天</Option>
                                    </Select>
                                </span>
                            </div>
                        </div>
                        <div className={styles.contentTable}>
                            <Table
                                columnDefs={defectColumns}
                                rowData={mrRectNoticeItems ? mrRectNoticeItems : []} />
                        </div>
                        <div className={styles.contentFooter}>
                            <p>明细记录整改备注</p>
                            <Input.TextArea
                                className={styles.textArea}
                                placeholder={'填写明细记录整改备注'}
                                onChange={(v) => reformNoticeModelService.onChangeDataSet(v, 'itemQcMark')} />
                        </div>
                    </div>
                </div>
            </DragMove>
        )
    }
}