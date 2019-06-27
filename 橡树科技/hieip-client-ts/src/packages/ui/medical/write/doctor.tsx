/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import { Button, Divider, Radio, Select } from 'antd'
import * as css from './style/content.scss'
import { Table } from 'src/packages/common/table/table'
import moment from 'moment'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { doctorService, DoctorState } from 'service/medical/medical/components/write/doctor'

const RadioGroup = Radio.Group
const Option = Select.Option

function gshTimes(params) {
    let val = params.value
    val = val && moment(val).format('YYYY-MM-DD HH:mm')
    return val
}

const columns = [
    {
        headerName: '长/临',
        field: 'repeatIndicator'
    },
    {
        headerName: '类型',
        field: 'orderClass'
    },
    {
        headerName: '内容',
        field: 'orderText'
    },
    {
        headerName: '剂量',
        field: 'dosage'
    },
    {
        headerName: '单位',
        field: 'dosageUnits'
    },
    {
        headerName: '用药途径',
        field: 'administration'
    },
    {
        headerName: '持续时间',
        field: 'duration'
    },
    {
        headerName: '单位',
        field: 'durationUnits'
    },
    {
        headerName: '开始时间',
        field: 'startDateTime',
        valueFormatter: gshTimes
    },
    {
        headerName: '录入时间',
        field: 'enterDateTime',
        valueFormatter: gshTimes
    },
    {
        headerName: '停止时间',
        field: 'stopDateTime',
        valueFormatter: gshTimes
    },
    {
        headerName: '停止医生',
        field: 'stopDoctor'
    },
    {
        headerName: '执行频率',
        field: 'frequency'
    },
    {
        headerName: '计价属性',
        field: 'billingAttr'
    },
    {
        headerName: '药品计价属性',
        field: 'drugBillingAttr'
    },
    {
        headerName: '执行时间',
        field: 'performSchedule',
        valueFormatter: gshTimes
    },
    {
        headerName: '执行结果',
        field: 'performResult'
    }]

export default class Doctor extends FluxComponent<DoctorState> {
    title = '医嘱提取'
    doctorService = doctorService

    render() {
        let { orderLenght, page, state, repeatIndicator, info } = this.state
        const { rectClck } = this.props
        return (
            <div className={css.yizhu}>
                <div style={{ padding: '3px 10px' }}>
                    <span className="show">
                        <label style={{ fontWeight: 600 }}>医嘱标识：</label>
                        <RadioGroup
                            className={css.radio}
                            value={repeatIndicator ? repeatIndicator : ''}
                            onChange={doctorService.onChange.bind(this, 'repeatIndicator')}
                        >
                            <Radio value={''}>全部</Radio>
                            <Radio value={'0'}>临时</Radio>
                            <Radio value={'1'}>长期</Radio>
                        </RadioGroup>
                    </span>
                    <Divider type="vertical"/>
                    <span className="show">
                        <label style={{ fontWeight: 600 }}>状态：</label>
                        <RadioGroup
                            className={css.radio}
                            value={state ? state : ''}
                            onChange={doctorService.onChange.bind(this, 'state')}>
                            <Radio value={''}>全部</Radio>
                            <Radio value={'2'}>执行</Radio>
                            <Radio value={'1'}>新开</Radio>
                            <Radio value={'5'}>医生保存</Radio>
                            <Radio value={'6'}>医生提交</Radio>
                            <Radio value={'7'}>医生停止</Radio>
                            <Radio value={'8'}>医生作废</Radio>
                            <Radio value={'4'}>作废</Radio>
                            <Radio value={'3'}>停止</Radio>
                            <Radio value={'9'}>退回</Radio>
                        </RadioGroup>
                    </span>
                </div>
                <div style={{ height: 224 }}>
                    <Table
                        columnDefs={columns}
                        menuShow={true}
                        total={orderLenght ? orderLenght : 0}
                        pageSize={page ? page.pageSize : 20}
                        pagination={true}
                        clickpage={true}
                        onShowSizeChange={doctorService.onShowSizeChange}
                        paginationAutoPageSize={true}
                        onGridReady={doctorService.onGridReady}

                    />
                </div>
                <div className={css.btn}>
                    {
                        info ? info.map((row, index) => {
                            return <Button key={row}
                                           onClick={() => rectClck('yizhu-btn', index)}>{row}
                            </Button>
                        }) : ''
                    }
                </div>
            </div>
        )
    }
}