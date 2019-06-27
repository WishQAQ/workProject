/**
 * 出科召回弹框
 */
import React from 'react'
import { Button, Input, Modal } from 'antd'
import { TimePicker } from 'pkg/common/timePicker'
import { Select } from 'pkg/common/select'
import { Table } from 'pkg/common/table'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { transferInDeptService, TransferInDeptState as State } from 'service/pat-manage/patient-info/transfer-in-dept'
import { JsonUtil } from 'tools/api/JsonUtil'
import moment from 'moment'
import { SelectPrefix } from 'pkg/common/selectPrefix'
import { Rounded } from 'pkg/common/rounded'
import { InputTable } from 'pkg/common/inputTable'
import { TimePickerPrefix } from 'pkg/common/timePickerPrefix'
import {IconFont} from 'pkg/common/icon'

const Option = Select.Option

// 表头
/**
 * 格式化时间
 * @param params
 */
function gshTimes(params) {
    let val = params.value
    val = val && moment(val).format('YYYY-MM-DD HH:mm')
    return val
}

const columnTitle = [
    {
        headerName: '患者ID',
        width: 100,
        field: 'patientId'
    },
    {
        headerName: '姓名',
        width: 100,
        field: 'name'
    },
    {
        headerName: '患者性别',
        field: 'sex',
        width: 60,
        cellRendererFramework: params => {
            return JsonUtil.getJsonByKey('sex.name', params.data)
        }
    },
    {
        headerName: '年龄/岁',
        width: 80,
        field: 'age'
    },
    {
        headerName: '入科时间',
        width: 140,
        field: 'admWardDateTime',
        valueFormatter: gshTimes
    },
    {
        headerName: '会诊时间',
        width: 140,
        filed: 'ApplyDateTime',
        valueFormatter: gshTimes
    }
]

export default class RecallModal extends FluxComponent<State> {
    title = '患者信息.出科召回'
    transferInDeptService = transferInDeptService

    render() {
        const { modals, timeFrom, timeTo, nursingClassDict, patientStatusDict } = this.state
        return (
            JsonUtil.isEqualStr(modals, 'transferInDept') ?
                <Modal
                    title="出科召回"
                    visible={true}
                    footer={null}
                    width={702}
                    onCancel={transferInDeptService.onHideModal}
                    className={styles.transferModel}
                >
                    <div className={styles.recallHeader}>
                        <TimePicker
                            isRange={true}
                            dateChange={transferInDeptService.starAndEndDate}
                            oValue={timeFrom}
                            oValue2={timeTo}
                            className={styles.transferTimePicker}
                        />
                        <Input className={styles.searchInput} onChange={transferInDeptService.searchRecallPatients}
                               placeholder="请输入患者编号/姓名/性别"/>
                        <Button onClick={transferInDeptService.loadTransferInDept} className={styles.transferSearchBtn}>
                            <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                        </Button>
                    </div>
                    <div className={styles.transferTable}>
                        <Table
                            columnDefs={columnTitle}
                            rowData={this.state.mhPvList}
                            onGridReady={transferInDeptService.onGridReady}
                            menuclassName={'recallTable'}
                            onRowSelected={transferInDeptService.selectTheLine}
                        />
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.footerItem}>
                            <Rounded
                                leftShow={'床号'}
                                asterisk={true}
                            >
                                <InputTable
                                    className={styles.transferInputTable}
                                    data={this.state.hVdBedDict}
                                    option={{
                                        total: this.state ? this.state.hVdBedDict.total : 0,
                                        columns: this.state ? this.state.hVdBedDictColumns : [],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    maxHeight={185}
                                    oValue={this.state.data ? this.state.data.bedLabel : ''}
                                    callBackMethods={(e: any) => {
                                        transferInDeptService.setStateJson('data', {
                                            bedLabel: e.data.bedLabel,
                                            areaId: { id: e.data.areaId, name: e.data.areaName }
                                        })
                                        switch (e.type) {
                                            case 'blurEvent':
                                            case 'enterEvent':
                                                break
                                            default:
                                                transferInDeptService.loadData(
                                                    'hVdBedDict',
                                                    {
                                                        startIndex: e.pageCurrent,
                                                        pageSize: e.pageSize
                                                    },
                                                    e.value)
                                                break
                                        }
                                    }}
                                />
                            </Rounded>
                        </div>
                        <div className={styles.footerItem}>
                            <TimePickerPrefix
                                asterisk={true}
                                prefixVal="时间"
                                dateChange={(value) => transferInDeptService.dateChange(value)}
                                className={styles.transferTime}
                            />
                        </div>
                        <div className={styles.footerItem}>
                            <Rounded
                                leftShow={'科室'}
                                asterisk={true}
                            >
                                <InputTable
                                    className={styles.transferInputTable}
                                    data={this.state.deptDicts || []}
                                    option={{
                                        total: this.state.deptDicts ? this.state.deptDicts.total : 0,
                                        columns: [{ title: '名称', field: 'value' }],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    callBackMethods={(v: any) =>
                                        transferInDeptService.inputTableType(v)
                                    }
                                />
                            </Rounded>
                        </div>
                        <div className={styles.footerItem}>
                            <Rounded
                                leftShow={'医生'}
                                asterisk={true}
                            >
                                <InputTable
                                    className={styles.transferInputTable}
                                    data={this.state.staffDict || []}
                                    option={{
                                        total: this.state.staffDict ? this.state.staffDict.total : 0,
                                        columns: [{ title: '医生', field: 'value' }],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    callBackMethods={transferInDeptService.doctorType}
                                />
                            </Rounded>
                        </div>
                        <div className={styles.footerItem}>
                            <SelectPrefix
                                asterisk={true}
                                className={styles.selectItem}
                                showSearch={false}
                                placeholder="请选择护理级别"
                                prefixVal="护理级别"
                                onChange={(e) => {
                                    transferInDeptService.setStateJson('data.nursingClass.id', e)
                                }}
                            >
                                {
                                    nursingClassDict.map(data => {
                                        return <Option key={data.key} value={data.key}>{data.value}</Option>
                                    })
                                }
                            </SelectPrefix>
                        </div>
                        <div className={styles.footerItem}>
                            <SelectPrefix
                                asterisk={true}
                                className={styles.selectItem}
                                showSearch={false}
                                placeholder="请选择病情级别"
                                prefixVal="病情级别"
                                onChange={(e) => {
                                    transferInDeptService.setStateJson('data.patientStatus.id', e)
                                }}
                            >
                                {
                                    patientStatusDict.map(data => {
                                        return <Option key={data.key} value={data.key}>{data.value}</Option>
                                    })
                                }
                            </SelectPrefix>
                        </div>
                        <div className={styles.footerItem}>
                            <Rounded
                                leftShow={'护士'}
                                asterisk={true}
                            >
                                <InputTable
                                    className={styles.transferInputTable}
                                    data={this.state.nurses || []}
                                    option={{
                                        total: this.state.nurses ? this.state.nurses.total : 0,
                                        columns: [{ title: '护士', field: 'value' }],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    callBackMethods={transferInDeptService.nurseType}
                                />
                            </Rounded>
                        </div>
                    </div>
                    <div className={styles.lastBtn}>
                        <Button className={styles.recallBtn} onClick={transferInDeptService.transferInDept} type="primary">
                            <IconFont iconName={'icon-iocnchexiao'}/>{'召回'}
                        </Button>
                    </div>
                </Modal> : null
        )
    }
}