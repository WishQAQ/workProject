import React from 'react'
import classnames from 'classnames'
import { Table } from 'pkg/common/table'
import { IconLabel } from 'pkg/ui/iconLabel'
import { IconFont } from 'pkg/common/icon'

import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { patientTableService, PatientTableState as State } from 'service/pat-manage/patient-info/patient-table'
import { JsonUtil } from 'tools/api/JsonUtil'
import moment from 'moment'

const menu = ['右键1', '右键2']

export default class PatientTable extends FluxComponent<State> {
    title = '患者信息.患者列表'
    patientTableService = patientTableService

    render() {
        let { cardorList, inDept, triageLevelDict } = this.state
        const columnTitle = [
            {
                headerName: '床号',
                width: 90,
                field: 'bedLabel',
                cellRendererFramework: params => {
                    const data = params.data
                    const bedUnit = data.bedUnit
                    return <IconLabel
                        iconName={bedUnit === '床' ? 'icon-chuangwei' : (bedUnit === '座位' ? 'icon-zuowei' : '')}
                        values={JsonUtil.isEmpty(data.bedLabel) ? '门' : data.bedLabel}
                        className={styles.bunkNumber}
                    />
                }
            },
            {
                headerName: '分诊级别',
                field: 'triageLevel',
                width: 70,
                cellRendererFramework: params => {
                    const triageLevel = JsonUtil.getJsonByKey('data.triageLevel', params)
                    return (<span className={classnames({
                        [styles.sickClass]: true,
                        [styles.sickClassFirst]: triageLevel === '一级',
                        [styles.sickClassSecond]: triageLevel === '二级',
                        [styles.sickClassThird]: triageLevel === '三级',
                        [styles.sickClassFourth]: triageLevel === '四级'
                    })}>{triageLevelDict[triageLevel]}</span>)
                }
            },
            {
                headerName: '姓名',
                field: 'name',
                width: 80
            },
            {
                headerName: '患者性别/年龄',
                field: 'age',
                width: 100
            },
            {
                headerName: '医生',
                field: 'doctorName',
                width: 100
            },
            {
                headerName: '护理等级',
                field: 'careLevel',
                width: 100
            },
            {
                headerName: '绿色通道',
                field: 'greenRoad',
                width: 150
            },
            {
                headerName: '入科时间',
                field: 'admWardDateTime',
                width: 120,
                valueFormatter: (params) => {
                    return params.data.admWardDateTime ? moment(params.data.admWardDateTime).format('YYYY-MM-DD HH:MM:SS') : ''
                },
            },
            {
                headerName: '滞留时间',
                field: 'residenceTime',
                width: 120,
                cellRendererFramework: params => {
                    const data = params.data
                    return <span style={{ color: 'red' }}>{data.retentionTime}</span>
                }
            },
            {
                headerName: '生命特征',
                field: 'virtalSign',
                width: 60,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-aixin" iconClass={classnames({
                        [styles.vitalSigns]: true,
                        [styles.vitalSignsActive]: data.vitalSigns
                    })}/>
                }
            },
            {
                headerName: '医嘱',
                field: 'drugOrders',
                width: 50,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-aixin" iconClass={classnames({
                        [styles.doctorAdvice]: true,
                        [styles.adviceActive]: data.doctorAdvice
                    })}/>
                }
            },
            {
                headerName: '放射',
                field: 'examOrders',
                width: 50,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-fangshe" iconClass={classnames({
                        [styles.radiate]: true,
                        [styles.radiateActive]: data.radiate
                    })}/>
                }
            },
            {
                headerName: '检验',
                field: 'labOrders',
                width: 50,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-jianyanyubingli" iconClass={classnames({
                        [styles.examine]: true,
                        [styles.examineActive]: data.examine
                    })}/>
                }
            },
            {
                headerName: '心电',
                field: 'ecg',
                width: 50,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-xindian" iconClass={classnames({
                        [styles.ecg]: true,
                        [styles.ecgActive]: data.ecg
                    })}/>
                }
            },
            {
                headerName: '会诊',
                field: 'cons',
                width: 50,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-dianhua1" iconClass={classnames({
                        [styles.consutants]: true,
                        [styles.consutantsActive]: data.consutants
                    })}/>
                }
            },
            {
                headerName: '是否交接',
                field: 'shift',
                width: 80,
                cellRendererFramework: params => {
                    const data = params.data
                    return <IconFont iconName="icon-jiaobanguanli1" iconClass={classnames({
                        [styles.shiftExChange]: true,
                        [styles.shiftExChangeActive]: data.shift
                    })}/>
                }
            }
        ]
        return (
            cardorList === true ?
                <div className={styles.bunkWrapper}>
                    <Table
                        columnDefs={columnTitle}
                        rowData={inDept}
                        ContextMenuList={menu}
                        menuclassName={'munuclass2'}
                        menuClik={(a, b) => 'a, b'}
                        onCellDoubleClicked={(v) => v}
                    />
                </div> : null
        )
    }
}