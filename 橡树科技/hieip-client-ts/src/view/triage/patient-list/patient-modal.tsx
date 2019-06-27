/**
 *     患者列表弹窗
 *     Created by wx on 2017/12/12
 *
 *    新分诊 下面 患者列表页面
 */

import React from 'react'
import { Button } from 'antd'
import * as style from './style/patient-modal.scss'
import { TimePicker } from 'pkg/common/timePicker'
import { Table } from 'pkg/common/table/table'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { patientModelService, PatientModelState } from 'service/triage/patient-list/patient-modal/index'
import { DragMove } from 'pkg/common/dragging'
import moment from 'moment'
import {IconFont} from 'pkg/common/icon'

/** 测试 表格表头 */
const columns = [
    {
        headerName: '事件时间',
        field: 'happenDate',
        valueFormatter: (params) => {
            let val = params.value
            val = moment(val).format('YYYY-MM-DD HH:mm:ss')
            return val
        },
        width: 150
    }, {
        headerName: '概要说明',
        field: 'title',
        width: 150
    }, {
        headerName: '事件类型',
        field: 'injuryTypeName',
        width: 150
    }, {
        headerName: '详细说明',
        field: 'memo',
        width: 342
    }]

export default class PatientModal extends FluxComponent<PatientModelState> {
    title = 'PatientModal'
    patientModelService = patientModelService

    render() {
        let { visible, mhGroupInjuryEntitySplit, happenDateStart, happenDateEnd } = this.state
        return (
            <div>
                <DragMove
                    className={style.patientModal_diao}
                    title="查询群伤事件"
                    visible={visible}
                    onOk={patientModelService.updateMhGroupInjury}
                    onCancel={patientModelService.hideModal}
                    okText="确认"
                    cancelText="取消"
                    width={'50%'}
                    cwidth={1000}
                    cheight={493}
                >
                    <div className={style.patientModalBody}>
                        <div className={style.patientModalBodyHeader}>
                            <TimePicker isRange={true}
                                        oValue={happenDateStart}
                                        oValue2={happenDateEnd}
                                        className={style.patientModalBodyDate}
                                        dateChange={patientModelService.onChange}
                                        startPlaceholder="开始时间"
                                        endPlaceholder="结束时间"
                            />
                            <Button
                                type={'primary'}
                                onClick={patientModelService.loadMhGroupInjury}>
                                <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                            </Button>
                        </div>
                        <div style={{ height: 350 }}>
                            <Table
                                columnDefs={columns}
                                rowData={mhGroupInjuryEntitySplit}
                                onGridReady={patientModelService.onGridReady}
                                onCellClicked={patientModelService.showCurRowMessage1}
                                onCellDoubleClicked={patientModelService.updateMhGroupInjury}
                            />
                        </div>
                    </div>
                </DragMove>
            </div>
        )
    }

}
