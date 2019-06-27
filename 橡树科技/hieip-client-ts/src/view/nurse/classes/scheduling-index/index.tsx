/**
 * 排班主页面 by hhc
 */
import React from 'react'
import css from './style/index.scss'
// model
import {Select} from 'pkg/common/select'
import {Rounded} from 'pkg/common/rounded'
import {TimePicker} from 'pkg/common/timePicker'
import {IconFont} from 'pkg/common/icon'
import {DragMove} from 'pkg/common/dragging'
import {AboutScreen} from 'pkg/ui/about-screening'
import {Table} from 'pkg/common/table'
// other
import {Button, Input} from 'antd'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ChangeSchedule from 'pkg/ui/schedule/changeSchedule.tsx'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {SchedulingIndexState, schedulingIndexService} from 'service/nurse/classes/scheduling-index'
import{LoginState, loginService} from 'service/user/login'
import {point} from 'pkg/entity/point'
import moment from 'moment'
import {JsonUtil} from 'tools/api/JsonUtil'

const {TextArea} = Input
@DragDropContext(HTML5Backend)
export default class SchedulingIndex extends FluxComponent<SchedulingIndexState & LoginState> {
    title = '排班'
    schedulingIndexService = schedulingIndexService
    loginService = loginService
    /**
     * 排班表头
     */
    groupColumns = [
        {
            headerName: '分组',
            field: 'groupName',
            cellStyle: {
                lineHeight: '16px'
            }
        },
        {
            headerName: '人员',
            field: 'userName',
            cellStyle: {
                lineHeight: '16px'
            }
        },
    ]

    render() {
        let {
            wardList,
            time,
            wardCode,
            dayDate,
            staffSchedulingList,
            isOpen,
            clientY,
            clientX,
            isVisible,
            classesDict,
            schedulingList,
            shift1,
            shift2,
            classesVsStaff,
            user,
            currentTime
        } = this.state
        let disabled = !point.护理.排班.排班
        let userId = user ? user.empNo : ''
        let checkArray = schedulingList ? JsonUtil.clone(schedulingList.get(currentTime)) : []
        return (
            <div className={css.scheduleMain}>
                {/*顶部搜索*/}
                <div className={css.searchTitle}>
                    <Rounded leftShow={'护理单元'} className={css.searchRounded}>
                        <Select
                            data={wardList ? wardList : []}
                            value={wardCode?wardCode:''}
                            onChange={(e) => schedulingIndexService.changeValue(e, 'wardCode')}
                            dataOption={{value: 'deptName', key: 'deptCode'}}
                        />
                    </Rounded>
                    {/* <Rounded leftShow={'排班人'} className={css.searchRounded}>
           <HintInput value={''}/>
           </Rounded>*/}
                    <Rounded leftShow={'日期'} className={css.searchTime}>
                        <TimePicker
                            oValue={time ? time : ''}
                            dateChange={e => schedulingIndexService.changeValue(e, 'time')}
                        />
                    </Rounded>
                    <Button type={'primary'} onClick={schedulingIndexService.findInfo}>
                        <IconFont iconName={'icon-sousuo_sousuo'}/>{'查询'}
                    </Button>
                    {
                        disabled ? '' : <Button onClick={schedulingIndexService.save} type={'primary'}>
                            <IconFont iconName={'icon-baocun2'}/>{'保存'}
                        </Button>}
                    <Button type={'primary'} onClick={schedulingIndexService.print}>
                        <IconFont iconName={'icon-ordinaryprint'}/>{'打印'}
                    </Button>

                </div>
                {/*排班主界面*/}
                <div className={css.schedule}>
                    <div className={css.personnel}>
                        <div className={css.piecePerson}>
                            <b>{'分组人员'}</b>
                        </div>
                        <div className={`${css.groupWeek} ${css.specialGroup}`}>
                            {dayDate ? dayDate.map((e, i) => {
                                return <div key={i} className={css.week}>
                                    <b>
                                        {e.day}<br />
                                        <span>{moment(e.time).format('YYYY-MM-DD')}</span>
                                    </b>
                                    {
                                        disabled ?
                                            '' : <span onClick={(_e) => {
                                                schedulingIndexService.getScheduleBatchOperate(e.time, _e)
                                            }}>
                                                <IconFont
                                                    iconName={'icon-jiajia'}
                                                    iconClass={`${css.iconApply}`}/>
                                            </span>
                                    }
                                </div>
                            }) : []}
                        </div>
                        <div className={css.totalPerson}>
                            <b>{'总和'}
                                <p>{'(小时)'}</p>
                            </b>
                        </div>
                    </div>
                    <div className={css.groups} id={'groups'}>
                        <div className={css.groupFirst}>
                            <Table
                                columnDefs={this.groupColumns}
                                rowData={staffSchedulingList}
                                rowHeight={20}
                                headerHeight={0}
                            />
                        </div>
                        <div className={css.groupWeek}>
                            {
                                schedulingList ? [...schedulingList].map((value) => {
                                        return (<div key={value[0]} className={css.groupWeeks}>
                                            {
                                                value[1] && value[1].map((v, index) => {
                                                    let schedule = classesDict ? classesDict[v.nurseGroupId] : []
                                                    return <ChangeSchedule
                                                        key={index}
                                                        schedule={schedule}
                                                        value={v ? v.schedulingClassesId : null}
                                                        dataSource={v}
                                                        isDrag={userId === v.userId}
                                                        disabled={disabled}
                                                        isChange={schedulingIndexService.shiftSchedule}
                                                        onChange={(_value, e) => {
                                                            schedulingIndexService.changeSchedule(value[0], index, _value, e)
                                                        }}
                                                    />
                                                })
                                            }
                                        </div>)
                                    })
                                    : ''
                            }
                        </div>
                        <div className={`${css.totalPerson} ${css.specialTotal}`}>
                            {staffSchedulingList && staffSchedulingList.map((e, i) => {
                                return <div className={css.total} key={i}>
                                    {e.timeCount}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <AboutScreen
                    needArray={classesVsStaff}
                    checkArray={checkArray}
                    open={isOpen}
                    currentTime={currentTime}
                    onClick={(e) => {
                        schedulingIndexService.batchOperation(currentTime, e)
                    }}
                    handleClose={schedulingIndexService.closeAboutScreen}
                    x={clientX}
                    y={clientY}
                />
                <DragMove
                    title={'申请换班'}
                    visible={isVisible}
                    okText={'提交'}
                    onOk={schedulingIndexService.saveApply}
                    onCancel={schedulingIndexService.closeShiftSchedule}
                    width={315}
                    className={css.applyDrag}
                >
                    <div>
                        <div className={css.applyPerson}>
                            <div>
                                <div>
                                    <span><b className={css.label}>{'申请人:'}</b>{shift1 ? shift1.userName : ''}</span>
                                </div>
                                <div>
                                    <span><b className={css.label}>{'申请班段:'}</b>{shift1 ? shift1.classesName : ''}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span><b className={css.label}>{'被申请人:'}</b>{shift2 ? shift2.userName : ''}</span>
                                </div>
                                <div>
                                    <span><b className={css.label}>{'申请班段:'}</b>{shift2 ? shift2.classesName : ''}</span>
                                </div>
                            </div>
                        </div>
                        <div className={css.applyReason}>
                            <TextArea rows={2} autosize={{minRows: 2, maxRows: 2}} onChange={(e) => {
                                schedulingIndexService.changeValue(e.target.value, 'applyReason')
                            }}/>
                        </div>
                    </div>
                </DragMove>
            </div>
        )
    }
}
