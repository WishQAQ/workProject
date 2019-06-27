/**
 * 排班主页面 by hhc
 */
import React from 'react'
import css from './style/index.scss'
// model
import { Select } from 'pkg/common/select'
import { Rounded } from 'pkg/common/rounded'
import { HintInput } from 'pkg/common/input'
import { TimePicker } from 'pkg/common/timePicker'
import { IconFont } from 'pkg/common/icon'
import { DragMove } from 'pkg/common/dragging'
import { AboutScreen } from 'pkg/ui/about-screening'
// other
import { Button, Input } from 'antd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ChangeSchedule from 'pkg/ui/schedule/changeSchedule.tsx'

const { TextArea } = Input

export interface State {
    open: boolean // 申请换班
    apply: string // 申请人
    applied: string // 被申请人
    shift: boolean // 大调班
    clientX: number // 鼠标x
    clientY: number // 鼠标y
}

@DragDropContext(HTML5Backend)

export default class Schedule extends React.Component<any, State> {
    /**
     * 下拉模拟数组
     */
    dropArr = [
        { name: '下拉', key: 1 },
        { name: '下拉', key: 2 },
        { name: '下拉', key: 3 },
        { name: '下拉', key: 4 },
        { name: '下拉', key: 5 },
        { name: '下拉', key: 6 }
    ]

    /**
     * 周天模拟数据
     */
    weekDays = [
        { name: '周一' }, { name: '周二' }, { name: '周三' },
        { name: '周四' }, { name: '周五' }, { name: '周六' }, { name: '周日' }
    ]

    /**
     * 模拟分组数据
     */
    groups = [
        {
            name: 'X组',
            children: [
                {
                    name: 'X1组', children: [
                        { name: 'X1-1组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] },
                        { name: 'X1-2组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] }
                    ]
                },
                {
                    name: 'X2组', children: [
                        { name: 'X2-1组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] },
                        { name: 'X2-2组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] }
                    ]
                },
                {
                    name: 'X3组', children: [
                        { name: 'X3-1组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] },
                        { name: 'X3-2组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] }
                    ]
                }
            ]
        },
        {
            name: 'Y组',
            children: [
                {
                    name: 'Y1组', children: [
                        { name: 'Y1-1组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] },
                        { name: 'Y1-2组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] }
                    ]
                },
                {
                    name: 'Y2组', children: [
                        { name: 'Y2-1组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] },
                        { name: 'Y2-2组', person: [{ people: '陈倩' }, { people: '陈倩' }, { people: '陈倩' }], children: [] }
                    ]
                },
                { name: 'Y3组', children: [{ name: '3-1组', children: [] }, { name: '3-2组', children: [] }] }
            ]
        },
        {
            name: 'Z组',
            children: [
                { name: 'Z1组', children: [{ name: 'Z1-1组' }, { name: 'Z1-2组' }] },
                { name: 'Z2组', children: [{ name: 'Z2-1组' }, { name: 'Z2-2组' }] },
                { name: 'Z3组', children: [{ name: 'Z3-1组' }, { name: 'Z3-2组' }] }
            ]
        }
    ]

    /**
     * 模拟分组周天
     */
    groupsWeek: any = [
        {
            person: '陈倩',
            schedule: [
                { mon: '早班', time: 1 },
                { tue: '中班', time: 2 },
                { wed: '晚班', time: 3 },
                { thu: '早班', time: 4 },
                { fri: '中班', time: 5 },
                { sat: '中班', time: 6 },
                { sun: '早班', time: 7 }
            ]
        },
        {
            person: '陈倩倩',
            schedule: [
                { mon: '晚班', time: 9 },
                { tue: '晚班', time: 10 },
                { wed: '早班', time: 11 },
                { thu: '早班', time: 12 },
                { fri: '晚班', time: 13 },
                { sat: '早班', time: 14 },
                { sun: '早班', time: 15 }
            ]
        },
        {
            person: '陈陈倩',
            schedule: [
                { mon: '中班', time: 10 },
                { tue: '晚班', time: 9 },
                { wed: '早班', time: 8 },
                { thu: '晚班', time: 7 },
                { fri: '中班', time: 6 },
                { sat: '晚班', time: 5 },
                { sun: '早班', time: 4 }
            ]
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            apply: '',
            applied: '',
            shift: false,
            clientX: 0,
            clientY: 0
        }
    }

    dateChange = () => {
        //  时间控件时间改变事件
    }

    /**
     * 申请换班
     * apply 申请者
     * change 被申请者
     */
    isChange = (apply, change) => {
        this.setState({ open: true, apply: apply.dataSource.person, applied: change.props.dataSource.person })
        // console.log(apply)
        // console.log(change)
    }

    /**
     * 关闭弹框
     */
    closeChange = () => {
        this.setState({ open: false })
    }

    /**
     * 大排班
     */
    shift = (e: React.MouseEvent<any>) => {
        this.setState({ shift: true, clientX: e.clientX, clientY: e.clientY })
    }

    shiftClose = () => {
        this.setState({ shift: false })
    }

    /**
     * 计算总时间
     */
    addTime = (data) => {
        let time = 0
        data.forEach((v) => {
            time += v.time
        })
        return time
    }

    render() {
        let sch = [
            { name: '早班', key: 1 },
            { name: '中班', key: 2 },
            { name: '夜班', key: 3 },
            { name: '小夜班', key: 4 },
            { name: '大夜班', key: 5 },
            { name: '休息', kye: 6 }]
        return (
            <div className={css.scheduleMain}>
                {/*顶部搜索*/}
                <div className={css.searchTitle}>
                    <Rounded leftShow={'护理单元'} className={css.searchRounded}>
                        <Select
                            data={this.dropArr}
                            dataOption={{ value: 'name', key: 'key' }}
                        />
                    </Rounded>
                    <Rounded leftShow={'排班人'} className={css.searchRounded}>
                        <HintInput/>
                    </Rounded>
                    <Rounded leftShow={'日期'} className={css.searchTime}>
                        <TimePicker
                            oValue={new Date()}
                            dateChange={this.dateChange}
                        />
                    </Rounded>
                    <Button type={'primary'}>
                        <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                    </Button>
                    <Button type={'primary'}>
                        <IconFont iconName={'icon-baocun2'}/>{'保存'}
                    </Button>
                </div>
                {/*排班主界面*/}
                <div className={css.schedule}>
                    <div className={css.personnel}>
                        <div className={css.piecePerson}>
                            <b>{'人员'}</b>
                        </div>
                        <div className={`${css.groupWeek} ${css.specialGroup}`}>
                            {this.weekDays.map((e, i) => {
                                return <div key={i} className={css.week}>
                                    <b>{e.name}</b>
                                    <span onClick={this.shift}>
                    <IconFont
                        iconName={'icon-iconfontshequyijujue'}
                        iconClass={`${css.iconApply}`}/>
                  </span>
                                </div>
                            })}
                        </div>
                        <div className={css.totalPerson}>
                            <b>{'总和'}
                                <p>{'(小时)'}</p>
                            </b>
                        </div>
                    </div>
                    <div className={css.groups} id={'groups'}>
                        <div className={css.groupFirst}>
                            {recursive(this.groups)}
                        </div>
                        <div className={css.groupWeek}>
                            {this.weekDays.map((e, i) => {
                                return <div key={i} className={css.groupWeeks}>
                                    {this.groupsWeek.map((e, index) => {
                                        return <ChangeSchedule
                                            key={index}
                                            dataSource={e}
                                            which={i}
                                            id={`${i}-${index}`}
                                            isChange={this.isChange}
                                            schedule={sch}
                                        />
                                    })}
                                </div>
                            })}
                        </div>
                        <div className={`${css.totalPerson} ${css.specialTotal}`}>
                            {this.groupsWeek.map((e, i) => {
                                return <div className={css.total} key={i}>
                                    {this.addTime(e.schedule)}
                                </div>
                            })}
                        </div>
                    </div>
                </div>

                <DragMove
                    title={'申请换班'}
                    visible={this.state.open}
                    okText={'提交申请'}
                    onCancel={this.closeChange}
                    width={315}
                    className={css.applyDrag}
                >
                    <div>
                        <div className={css.applyPerson}>
                            <div>
                                <div>
                                    <span><b className={css.label}>{'申请人:'}</b>{this.state.apply}</span>
                                </div>
                                <div>
                                    <span><b className={css.label}>{'申请班段:'}</b></span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span><b className={css.label}>{'被申请人:'}</b>{this.state.applied}</span>
                                </div>
                                <div>
                                    <span><b className={css.label}>{'申请班段:'}</b></span>
                                </div>
                            </div>
                        </div>
                        <div className={css.applyReason}>
                            <TextArea rows={2} autosize={{ minRows: 2, maxRows: 2 }}/>
                        </div>
                    </div>
                </DragMove>
            </div>
        )
    }
}

/**
 * div合集
 */
function recursive(arr: any) {
    let divArr = []
    if (arr.constructor === Array) {
        for (let i = 0; i < arr.length; i++) {
            let lastDiv = React.createElement('div', { key: arr[i].name }, arr[i].name)
            let secondDiv = React.createElement('div', {
                key: `${arr[i].name}${i}`,
                className: css.groupTitle,
                style: { height: '' }
            }, [lastDiv])
            let mainDiv = React.createElement('div', { className: css.groupMain, key: i, style: { height: '' } }, [secondDiv])
            divArr.push(
                mainDiv
            )
            if (arr[i].children) {
                moreFloor(arr[i].children, secondDiv)
            }
        }
    }
    countHeight(divArr)
    // console.log(divArr)
    let newDiv = React.createElement('div', null, divArr)
    return newDiv
}

/**
 * div分组多层级递归
 * @param ele
 * @param add
 */
function moreFloor(ele: any, add: any) {
    if (ele.constructor === Array) {
        ele.forEach(function (value, index, array) {
            let div2 = React.createElement('div',
                { className: css.items, key: `${value.name}${index}` }, value.name)
            let div1 = React.createElement('div',
                {
                    className: `${css.groupItem} ${index + 1 === ele.length ? css.borderBottom : ''}`, key: value.name,
                    style: { marginLeft: 40, width: `calc(100% - 40px)`, height: `` }, children: []
                }, [div2])
            if (value.children) {
                add.props.children[index + 1] = div1
                moreFloor(value.children, div1)
                if (value.person) {
                    value.person.forEach(function (value, index, array) {
                        let personDiv = React.createElement('div',
                            {
                                className: `${css.personItem}`,
                                key: `${index}${value.name}`
                            }, value.people)
                        div1.props.children[index + 1] = personDiv
                        div1.props.style.height = `calc(20px * ${array.length})`
                    })
                }
            }
        })
    }
}

/**
 * 递归计算高度
 */

function countHeight(arr?: any) {
    // console.log(arr)
    arr.forEach(function (v, i, a) {
        if (v.props.style && v.props.style.height === '') {
            if (v.props.children.constructor === Array) {
                countHeight(v.props.children)
            }
            // console.log(v)
            v.props.children.forEach((value, i) => {
                if (i > 0 && value.props.style.height !== '') {
                    if (v.props.style.height === '' || v.props.style.height === 'calc()') {
                        v.props.style.height = value.props.style.height
                    }
                    else if (v.props.style.height !== '') {
                        v.props.style.height = (v.props.style.height).concat(` + ${value.props.style.height}`)
                    }
                }
            })
            v.props.style.height = `calc(${v.props.style.height})`
        }
        return arr
    })
}