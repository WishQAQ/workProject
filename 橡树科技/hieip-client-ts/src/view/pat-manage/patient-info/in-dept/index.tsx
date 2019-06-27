/**
 * 患者入科弹框
 */
import React from 'react'
import { Button, Input, Modal } from 'antd'
import { Select } from 'pkg/common/select'
import { SelectPrefix } from 'pkg/common/selectPrefix'
import { TimePickerPrefix } from 'pkg/common/timePickerPrefix'
import { Table } from 'pkg/common/table'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { inDeptService, InDeptState as State } from 'service/pat-manage/patient-info/in-dept'
import { JsonUtil } from 'tools/api/JsonUtil'
import { Rounded } from 'pkg/common/rounded'
import { InputTable } from 'pkg/common/inputTable'
import moment from 'moment'
import {IconFont} from 'pkg/common/icon'

const Option = Select.Option

const columnTitle = [
    {
        headerName: '患者编号',
        field: 'patientId',
        width: 80
    },
    {
        headerName: '就诊号',
        field: 'visitId',
        width: 80
    },
    {
        headerName: '患者姓名',
        field: 'name',
        width: 60
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
        headerName: '出生日期',
        field: 'dateOfBirth',
        valueFormatter: (params) => {
            if (params.value) {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD hh:mm:ss')
                return val
            }
        },
        width: 100
    },
    {
        headerName: '分诊时间',
        field: 'triageTime',
        valueFormatter: (params) => {
            if (params.value) {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD hh:mm:ss')
                return val
            }
        },
        width: 100
    },
    {
        headerName: '就诊时间',
        field: 'registerDate',
        valueFormatter: (params) => {
            if (params.value) {
                let val = params.value
                val = moment(val).format('YYYY-MM-DD hh:mm:ss')
                return val
            }
        },
        width: 100
    },
    {
        headerName: '身份',
        field: 'identity',
        width: 60,
        cellRendererFramework: params => {
            return JsonUtil.getJsonByKey('identity.name', params.data)
        }
    },
    {
        headerName: '费别',
        field: 'chargeType',
        width: 60,
        cellRendererFramework: params => {
            return JsonUtil.getJsonByKey('chargeType.name', params.data)
        }
    },
    {
        headerName: '身份证号',
        field: 'idNo',
        width: 130
    },
    {
        headerName: '国家',
        field: 'citizenship',
        width: 80,
        cellRendererFramework: params => {
            return JsonUtil.getJsonByKey('citizenship.name', params.data)
        }
    }
]

export default class IntoModal extends FluxComponent<State> {
    title = '患者入科'
    inDeptService = inDeptService

    /**
     *
     * modal框确定按钮
     *
     */
    onShowModal = () => {
        alert('confirm')
    }

    /**
     *
     * 患者编号Input框change事件
     *
     */
    onPatientIdChange = (e) => {
        // const {value} = e.target
    }

    /**
     *
     * 查询按钮点击事件
     *
     */
    onSearchClick = () => {
        alert('search')
    }

    /**
     *
     * 入科确认按钮
     *
     */
    onConfirmInto = () => {
        alert('confirm')
    }

    render() {
        const { modals, mhPvList, inputCode, model } = this.state
        return (
            JsonUtil.isEqualStr(modals, 'inDept') ?
                <Modal
                    title="患者入科"
                    visible={true}
                    footer={null}
                    width={1300}
                    onCancel={inDeptService.onHideModal}
                    className={styles.inDeptModel}
                >
                    <div className={styles.intoHeader}>
                        <Input
                            className={styles.searchInput}
                            addonBefore="患者编号"
                            placeholder="请输入患者编号"
                            value={inputCode}
                            onChange={inDeptService.setStateJson.bind(this, 'inputCode')}
                        />
                        <Button onClick={inDeptService.loadInDept}>
                            <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                        </Button>
                    </div>
                    <div className={styles.intoTable}>
                        <Table
                            columnDefs={columnTitle}
                            rowData={mhPvList}
                            onGridReady={inDeptService.onGridReady}
                            onRowSelected={inDeptService.selectTheLine}
                        />
                    </div>
                    <div className={styles.intoFooter}>
                        <Rounded
                            leftShow={'床号'}
                            className={styles.roundedFont}
                            asterisk={true}
                        >
                            <InputTable
                                data={this.state.hVdBedDict || []}
                                option={{
                                    total: this.state.hVdBedDict.total || 0,
                                    columns: this.state.hVdBedDictColumns || [],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                maxHeight={185}
                                oValue={JsonUtil.getJsonByKey('bedLabel', model) || ''}
                                callBackMethods={(e: any) => {
                                    model.bedLabel=e.data.bedLabel
                                    model.areaId={ id: e.data.areaId, name: e.data.areaName }
                                    inDeptService.setStateJson('model', model)
                                    switch (e.type) {
                                        case 'blurEvent':
                                        case 'enterEvent':
                                            break
                                        default:
                                            inDeptService.loadData(
                                                'hVdBedDict',
                                                {
                                                    startIndex: e.pageCurrent,
                                                    pageSize: e.pageSize
                                                },
                                                e.value)
                                            break
                                    }
                                }}
                                className={styles.inDeptInputTable}
                            />
                        </Rounded>
                        <TimePickerPrefix
                            prefixVal="时间"
                            dateChange={(value) => inDeptService.dateChange(value)}
                            className={`${styles.bunkNum} ${styles.timeStyle}`}
                            asterisk={true}
                        />
                        <Rounded
                            leftShow={'医生'}
                            className={styles.roundedFont}
                            asterisk={true}
                        >
                            <InputTable
                                data={this.state.staffDict || []}
                                option={{
                                    total: this.state.staffDict ? this.state.staffDict.total : 0,
                                    columns: [{ title: '医生', field: 'value' }],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                callBackMethods={inDeptService.doctorType}
                                className={styles.inDeptInputTable}
                            />
                        </Rounded>
                        <SelectPrefix
                            asterisk={true}
                            className={`${styles.bunkNum} ${styles.inDeptSelect}`}
                            style={{ width: '60%' }}
                            showSearch={false}
                            placeholder="请选择护理级别"
                            prefixVal="护理级别"
                            onChange={(e) => {
                                inDeptService.setStateJson('model.nursingClass.id', e)
                            }}
                        >
                            {
                                JsonUtil.getJsonByKey('nursingClassDict', this.state).map(data => {
                                    return <Option key={data.key} value={data.key}>{data.value}</Option>
                                })
                            }
                        </SelectPrefix>
                        <SelectPrefix
                            asterisk={true}
                            className={`${styles.bunkNum} ${styles.inDeptSelect}`}
                            style={{ width: '60%' }}
                            showSearch={false}
                            placeholder="请选择病情级别"
                            prefixVal="病情级别"
                            onChange={(e) => {
                                inDeptService.setStateJson('model.patientStatus.id', e)
                            }}
                        >
                            {
                                JsonUtil.getJsonByKey('patientStatusDict', this.state).map(data => {
                                    return <Option key={data.key} value={data.key}>{data.value}</Option>
                                })
                            }
                        </SelectPrefix>
                        <Rounded
                            leftShow={'科室'}
                            className={styles.roundedFont}
                            asterisk={true}
                        >
                            <InputTable
                                data={this.state.deptDicts || []}
                                option={{
                                    total: this.state.deptDicts ? this.state.deptDicts.total : 0,
                                    columns: [{ title: '名称', field: 'value' }],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                // oValue={clinicDiag}
                                callBackMethods={(v: any) =>
                                    inDeptService.inputTableType(v)
                                }
                                className={styles.inDeptInputTable}
                            />
                        </Rounded>
                        <Rounded
                            leftShow={'护士'}
                            className={styles.roundedFont}
                            asterisk={true}
                        >
                            <InputTable
                                data={this.state.nurses || []}
                                option={{
                                    total: this.state.nurses ? this.state.nurses.total : 0,
                                    columns: [{ title: '护士', field: 'value' }],
                                    pageSize: 7,
                                    showValue: 'value'
                                }}
                                callBackMethods={inDeptService.nurseType}
                                className={styles.inDeptInputTable}
                            />
                        </Rounded>
                    </div>
                    <div className={styles.bottomBtn}>
                        <Button className={styles.intoBtn} onClick={inDeptService.inDept} type="primary">
                            <IconFont iconName={'icon-xie'}/>{'入科'}
                        </Button>
                    </div>
                </Modal> : null
        )
    }
}