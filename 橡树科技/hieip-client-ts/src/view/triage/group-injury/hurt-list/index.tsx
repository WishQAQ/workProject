import React from 'react'
import css from './style/hurtList.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { groupInjuryService, GroupInjuryState } from 'service/triage/group-injury/index'
import { Card } from 'pkg/ui/card'
import moment from 'moment'
import { Table } from 'pkg/common/table'
import { JsonUtil } from 'tools/api/JsonUtil'

export default class HurtList extends FluxComponent<GroupInjuryState> {
    title = '群伤患者'
    groupInjuryService = groupInjuryService

    columns = [
        {
            headerName: '姓名',
            field: 'name'
        },
        {
            headerName: '性别',
            field: 'sex',
            valueFormatter: (params) => {
                return JsonUtil.getJsonByKey('data.sex.name', params)
            }
        },
        {
            headerName: '病人ID',
            field: 'patientId'
        },
        {
            headerName: '就诊号',
            field: 'visitNo'
        },
        {
            headerName: '分诊级别',
            field: 'triageRecord',
            valueFormatter: (params) => {
                return params.value ? params.value.actTriageLevel.name : ''
            }
        },
        {
            headerName: '分诊去向',
            field: 'triageRecord',
            valueFormatter: (params) => {
                return JsonUtil.getJsonByKey('data.triageRecord.triageTarget.name', params)
            }
        },
        {
            headerName: '其他去向',
            field: 'triageRecord',
            valueFormatter: (params) => {
                return JsonUtil.getJsonByKey('data.triageRecord.otherTriageTarget.name', params)
            }
        },
        {
            headerName: '就诊时间',
            field: 'visitDate',
            valueFormatter: (params) => {
                if (params.value) {
                    return moment(params.value ? params.value.visitDate : '').format('YYYY-MM-DD hh:mm:ss')
                }
            }
        },
        {
            headerName: '分诊时间',
            field: 'triageRecord',
            valueFormatter: (params) => {
                if (params.value) {
                    return moment(params.value ? params.value.triageDate : '').format('YYYY-MM-DD hh:mm:ss')
                }

            }
        },
        {
            headerName: '出生日期',
            field: 'dateOfBirth',
            valueFormatter: (params) => {
                if (params.value) {
                    return moment(params.value ? params.value.dateOfBirth : '').format('YYYY-MM-DD hh:mm:ss')
                }
            }
        },
        {
            headerName: '绿色通道',
            field: 'greenRoad'
        },
        {
            headerName: '其他标识',
            field: 'specialSign'
        }

    ]

    render() {
        let { data1 } = this.state
        let arr = ['分诊', '删除']
        return (
            <div className={css.hurtList}>
                <Card text={'群伤病人列表'} extra={
                    <span className={css.smallTip}>注:右键可编辑</span>}>
                    <Table
                        columnDefs={this.columns}
                        rowData={data1}
                        onGridReady={groupInjuryService.getHurtListApi}
                        menuclassName={'hurtListLeftMenu'}
                        ContextMenuList={arr}
                        menuClik={groupInjuryService.menuPvidClick}
                        onCellDoubleClicked={groupInjuryService.doubleClickRoute}
                    />
                </Card>
            </div>
        )
    }
}