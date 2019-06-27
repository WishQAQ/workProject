/**
 * Created by mou on 2017/12/7.
 */
import * as React from 'react'
import { Tabs } from 'antd'
import { Right } from './right'
import { Left } from './left'
import { Ascor, Soceresult } from '../socre/socreitemtype'
import style from './style/pain.scss'

import { Score } from '../socre/score'

const TabPane = Tabs.TabPane

/** props */
interface PainProps {
    data?: any,
    active?: number
    other?: Ascor
    onChange?: (obj: any) => void
    onClickIs?: (obj: any) => void
    onOKis?: () => void
    smtable?: (num?: any) => void
}

/** state */
interface StateType {
    onClick?: React.ReactEventHandler<any>
    other?: Ascor,
    tabsactive?: number
    data?: any
    flexDT?: any
    handleOk?: () => Ascor
    handleReset?: (obj: any) => Ascor
    activebtn?: () => void
}

/**
 * 疼痛评分
 */
export class Pain extends React.Component<PainProps, StateType> {
    constructor(props) {
        super(props)
        this.state = {
            tabsactive: 0,
            flexDT: []
        }
        this.callback = this.callback.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.onClickIs = this.onClickIs.bind(this)
        this.activebtn = this.activebtn.bind(this)
        this.handChange = this.handChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    /** 初始化state  */
    componentWillMount() {
        const { data } = this.props
        this.setState({
            other: this.props.other,
            data,
            flexDT: [
                { ...this.props.other, smname: data.data[0].type },
                { ...this.props.other, smname: data.data[1].type },
                { ...this.props.other, smname: data.data[2].type }
            ]
        })
    }

    /**
     * render
     * @returns {JSX.Element}
     */
    render(): JSX.Element {
        const { data, flexDT, tabsactive } = this.state
        const operations = tabsactive === 1 ? (
            <div className={style.tab_beizh}>
                <div>{data.data[1].data[0].application[0]}:</div>
                <div>{data.data[1].data[0].application[1]}</div>
            </div>
        ) : null
        return (
            <Tabs tabPosition={'left'}
                  className={style.pain}
                  onChange={this.callback}
                  tabBarExtraContent={operations}
                  defaultActiveKey={tabsactive.toString()}
            >

                {data.data.map((tab: any, index) =>
                    <TabPane tab={<Left icon={tab.icon} text={tab.text}/>} key={index}>
                        {index === 1 ? <Score
                                onChange={this.handChange}
                                data={{ data: tab.data, grade: data.grade }}
                                other={flexDT[index]}
                            /> :
                            <Right rightContent={tab.rightContent} other={flexDT[index]}
                                   onChange={this.RightonChange}/>}</TabPane>
                )}
            </Tabs>
        )
    }

    /**
     * 切换菜单
     * @param key
     */
    private callback = (key) => {
        const { flexDT, data } = this.state
        this.setState({ tabsactive: Number.parseInt(key, 0) })

        const result: any = Isitclickable(data.data[key].data, flexDT[key].radioK)

        this.props.smtable(result)
    }

    /**
     *  第二项分值
     * @param {Ascor} obj
     */
    private handChange(obj: Ascor) {
        const { tabsactive, flexDT, data } = this.state
        flexDT[tabsactive] = obj
        this.setState({ flexDT })
        this.onClickIs(Isitclickable(data.data[tabsactive].data, flexDT[tabsactive].radioK))
    }

    /**
     * 改变评分
     * @param score
     */
    private RightonChange = (score) => {
        const { data, tabsactive, flexDT } = this.state
        const { onOKis } = this.props
        /** 返回等级  颜色 */
        let obj: Soceresult = data.grade(score)
        /** 记录分数 */
        flexDT[tabsactive].totalScores = score

        flexDT[tabsactive] = Object.assign({}, flexDT[tabsactive], obj)
        this.setState({ flexDT })
        if (onOKis) {
            onOKis()
        }
    }

    /** 重置 */
    private handleReset(obj) {
        const { tabsactive, flexDT } = this.state
        /** 清空值  */
        flexDT[tabsactive].color = '#01BF9D'
        flexDT[tabsactive].radioK = {}
        flexDT[tabsactive].socregcs = {}
        flexDT[tabsactive].socreothers = {}
        flexDT[tabsactive].totalScores = 0
        flexDT[tabsactive].danger = ''
        flexDT[tabsactive].rule = ''
        this.setState({ flexDT })
    }

    /** 确认 */
    private handleOk(): any {
        const { tabsactive, flexDT } = this.state
        return flexDT[tabsactive]
    }

    /**
     * 返回点击状态
     */
    private onClickIs(active: any) {
        const { onClickIs } = this.props
        if (onClickIs) {
            onClickIs(active)
        }
    }

    /** 判断按钮状态 */
    private activebtn() {
        const { tabsactive, flexDT, data } = this.state
        const { onOKis, onClickIs } = this.props
        if (tabsactive === 1) {
            const result: any = Isitclickable(data.data[tabsactive].data, flexDT[tabsactive].radioK)
            if (onClickIs) {
                onClickIs(result)
            }
        } else {
            if (onOKis) {
                onOKis()
            }
        }
    }
}

/**
 * 判断length是否相等
 * @param arr
 * @param {Object} obj
 */
function Isitclickable(arr: any = [], obj: any = {}) {
    let length: number = 0
    let reset: number = 0
    arr.map(row => {
        row.data.map(v => {
            length++
        })
    })
    for (const prop in obj) {
        if (prop) {
            reset++
        }
    }
    let result: boolean = length === reset
    return { result, reset }
}
