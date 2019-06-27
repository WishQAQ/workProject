import React from 'react'
import css from './style/event.scss'
import classNames from 'classnames'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {groupInjuryService, GroupInjuryState} from 'service/triage/group-injury'
import {TimePicker} from 'pkg/common/timePicker'
import {HintInput} from 'pkg/common/input'
import {NumberInput} from 'pkg/common/number-input'
import {Table} from 'pkg/common/table'
import {DragMove} from 'pkg/common/dragging'
import {Input, Tooltip, Button} from 'antd'
import {Rounded} from 'pkg/common/rounded'
import {Select} from 'pkg/common/select'
import moment from 'moment'
import {InputArea} from 'pkg/common/input-area'
import {IconFont} from 'pkg/common/icon'

const Option = Select.Option

export default class HurtEvent extends FluxComponent<GroupInjuryState> {
    title = '群伤事件表'
    groupInjuryService = groupInjuryService

    columns = [
        {
            headerName: '时间',
            field: 'happenDate',
            valueFormatter: (params) => {
                if (params.value) {
                    let val = params.value
                    val = moment(val).format('YYYY-MM-DD hh:mm:ss')
                    return val
                }
            }
        },
        {
            headerName: '类型',
            field: 'injuryTypeName'
        },
        {
            headerName: '人数',
            field: 'injuryNum'
        },
        {
            headerName: '名称',
            field: 'title'
        },
        {
            headerName: '说明',
            field: 'memo',
            cellRendererFramework: Tip
        }
    ]

    render() {
        let {data, addModelOpen, startDate, endDate, injuryType, selectRow, modelTitle, backInjuryType} = this.state
        let arr = ['修改', '删除']
        return (
            <div className={css.hurtEventMain}>
                <div className={css.hurtTitle}>
                    <span className={css.smallTitle}>{'群伤管理事件'}</span>
                    <Button className={css.addBtn}
                            onClick={groupInjuryService.showAddModel}
                    >
                        <IconFont iconName={'icon-tianjia'}/>{'新增'}
                    </Button>
                    <span className={css.titleTip}>{'注:右键可编辑'}</span>
                </div>
                <div className={css.filterCondition}>
                    <TimePicker
                        className={css.timePickerStyle}
                        isRange={true}
                        contiguousCalendarMonths={false}
                        oValue={startDate}
                        oValue2={endDate}
                        dateChange={groupInjuryService.changeTimeValue}
                    />
                    <div className={css.inquire}>
                        <Input
                            className={css.inquireCondition}
                            placeholder={'请输入群伤概要/备注/类型'}
                            onChange={groupInjuryService.searchByCondition}
                        />
                        <Button
                            className={css.inquireBtn}
                            onClick={groupInjuryService.findGILike}
                        >
                            <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                        </Button>
                    </div>
                </div>
                <div className={css.hurtTable}>
                    <Table
                        columnDefs={this.columns}
                        rowData={data}
                        onRowClicked={groupInjuryService.findPvById}
                        onGridReady={groupInjuryService.getHurtAgApi}
                        menuclassName={'hurtEventRightMenu'}
                        ContextMenuList={arr}
                        menuClik={groupInjuryService.menuClick}
                    />
                </div>
                <DragMove
                    title={`${modelTitle}群伤事件`}
                    visible={addModelOpen}
                    onOk={modelTitle === '增加' ? groupInjuryService.save : groupInjuryService.updateGI}
                    onCancel={groupInjuryService.hiddenAddModel}
                    mask={true}
                    className={css.addModel}
                    width={332}
                    zIndex={100}
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <Rounded leftShow={'事件类型'} className={css.eventType}>
                        <Select className={css.addSelect}
                                onChange={groupInjuryService.getInjury.bind(this, 'injuryTypeId')}
                                value={backInjuryType}
                        >
                            {injuryType ? injuryType.map((e, index) => {
                                return <Option key={index} value={e.serialNo}>{e.name}</Option>
                            }) : false}
                        </Select>
                    </Rounded>
                    <Rounded leftShow={'时间'} className={classNames(css.eventType, css.specialTime)}>
                        <TimePicker
                            className={css.addTime}
                            // format={'YYYY-MM-DD hh:mm:ss'}
                            // timePrecision={1}
                            dateChange={groupInjuryService.getInjury.bind(this, 'happenDate')}
                            oValue={selectRow ? (selectRow.happenDate ? selectRow.happenDate : new Date()) : new Date()}
                        />
                    </Rounded>
                    <Rounded leftShow={'群伤人数'} className={css.eventType}>
                        <NumberInput
                            className={css.addInput}
                            onChange={groupInjuryService.getInjury.bind(this, 'injuryNum')}
                            value={selectRow.injuryNum || null}
                        />
                    </Rounded>
                    <Rounded leftShow={'事件名称'} className={css.eventType}>
                        <HintInput
                            className={css.addInput}
                            onChange={groupInjuryService.getInjury.bind(this, 'title')}
                            value={selectRow.title || ''}
                        />
                    </Rounded>
                    <div>
                        <InputArea placeholder={'详细说明'}
                                   className={css.addInput}
                                   onChange={groupInjuryService.getInjury.bind(this, 'memo')}
                                   value={selectRow.memo || ''}
                                   maxRow={2}
                                   minRow={2}
                        />
                    </div>
                </DragMove>
            </div>
        )
    }
}

export interface TipProps {
    /**
     * 继承props
     */
    value: string
}

class Tip extends React.Component<TipProps> {
    render() {
        return (
            <Tooltip title={this.props.value} overlayClassName={css.tipStyle}>
                {this.props.value}
            </Tooltip>
        )
    }
}