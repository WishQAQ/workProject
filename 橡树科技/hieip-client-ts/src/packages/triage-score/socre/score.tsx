/**
 *     评分 组合组件
 *     Created by mod on 2017/12/8
 *
 *    评分组件 传入data 对象。 返回 计算后分数结果值
 *    使用类型 socreitemtype.tsx
 *
 */

'use strict'

import * as React from 'react'
import { ScoreTrem } from './scoretrem'
import { Aggregate, Ascor, DataType, Soceresult } from './socreitemtype'

let DT: any = {
    data: [
        {
            name: '',
            type: 'start',
            data: [
                {
                    name: '伤员能否行走',
                    type: 'walk',
                    data: [
                        { name: '是', value: 1 },
                        { name: '否', value: 2 }
                    ]
                }, {
                    name: '是否还有呼吸',
                    type: 'breathing',
                    data: [
                        { name: '是', value: 1 },
                        { name: '否', value: 2 }
                    ]
                }, {
                    name: '开放气道，是否还有呼吸',
                    type: 'airway',
                    data: [
                        { name: '是', value: 1 },
                        { name: '否', value: 2 }
                    ]
                }, {
                    name: '呼吸频率是否≥30/min',
                    type: 'brequency',
                    data: [
                        { name: '是', value: 1 },
                        { name: '否', value: 2 }
                    ]
                }, {
                    name: '能否触及脉搏',
                    type: 'pulse',
                    data: [
                        { name: '是', value: 1 },
                        { name: '否', value: 2 }
                    ]
                }, {
                    name: '评估意识状态，能否听命令做简单动作',
                    type: 'consciousness',
                    data: [
                        { name: '是', value: 1 },
                        { name: '否', value: 2 }
                    ]
                }
            ]
        }
    ]
}

/** state */
interface ScoreState extends Ascor {
    other?: Ascor
    data?: DataType
    active?: number
}

/**    评分组件 */
export class Score extends React.Component<Aggregate, ScoreState> {
    constructor(args) {
        super(args)
        this.state = {}
        this.onHandChange = this.onHandChange.bind(this)
    }

    /** 初始化state  */
    componentWillMount() {
        if (this.props.other.name === 'start') {
            const d = JSON.parse(JSON.stringify(this.props.data))
            d.data[0].data = d.data[0].data.splice(0, 3)
            this.setState({
                other: this.props.other,
                data: d,
                active: this.props.active
            })
        } else {
            this.setState({
                other: this.props.other,
                data: this.props.data,
                active: this.props.active
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.other !== this.state.other) {
            this.setState({ other: nextProps.other })
        }
    }

    /**
     * @returns {any}
     */
    render(): JSX.Element {
        const { data, other } = this.state

        return <ScoreTrem
            data={data.data}
            other={other}
            onChange={this.onHandChange}
        />
        // if (other.name === 'start') {
        //     return <ScoreTrem
        //         data={data.data}
        //         other={other}
        //         onChange={this.onHandChange}
        //     />
        // } else {
        //     return <ScoreTrem
        //         data={data.data}
        //         other={other}
        //         onChange={this.onHandChange}
        //     />
        // }
    }

    /**
     * radio 触发事件
     * @param e      gcsscoreue 值
     * @param type   项类型
     * @param term   大项类型 区分 gcs and other
     */
    private onHandChange(e?, type?: string, term?: string) {
        const { value } = e.target
        const { other } = this.state
        const { onChange } = this.props
        const data: any = this.state.data

        let { socregcs, socreothers } = other

        /**
         * 计分
         * @type {number}
         */

        if (term === 'gcs') {
            /** 计算 gcs 评分 */
            socregcs[type] = value
        } else {
            /** 计算 其他 评分 */
            socreothers[type] = value
        }

        /** 求得总分 */
        let totalScores: number = addscore(socreothers) + (data.coreGSC ? data.coreGSC(addscore(socregcs)) : 0)
        if (data.grade) {
            /** 计算出等级 和颜色 */

            const resultGrade: Soceresult = data.grade(totalScores)
            /** 等级 */
            other.rule = resultGrade.rule
            /** 颜色 */
            other.color = resultGrade.color
        }

        /** 评危险率 */
        if (data.rate) data.valuation = data.rate(totalScores)

        /** 已经点击 */
        other.radioK = Object.assign({}, socreothers, socregcs)
        /** 总分 */
        other.totalScores = totalScores

        if (term === 'start') {
            this.showrow(value, type)
        } else {
            /** 返回结果 */
            if (onChange) {
                onChange(other)
            }
        }
    }

    /** start 评分  */
    private showrow = (value, type) => {
        const { other } = this.state
        const { onChange } = this.props
        let rule: string = ''
        let rok: any = {}
        let T = '1__是'
        let F = '2__否'
        let newobj = JSON.parse(JSON.stringify(DT))

        let newdata = newobj.data[0].data

        /** 开放气道，是否还有呼吸 */
        if (type === 'airway') {
            if (1 === parseInt(value.split('__')[0], 0)) {
                newdata = [newdata[0], newdata[1], newdata[2]]
                rule = ' 一级'
                rok = {
                    walk: F,
                    breathing: F,
                    airway: T
                }
            } else {
                newdata = [newdata[0], newdata[1], newdata[2]]
                rule = ' 死亡'
                rok = {
                    walk: F,
                    breathing: F,
                    airway: F
                }
            }
            /** 评估意识状态，能否听命令做简单动作 */
        } else if (type === 'consciousness') {
            if (1 === parseInt(value.split('__')[0], 0)) {
                rule = '三级'
                newdata = [newdata[0], newdata[1], newdata[3], newdata[4], newdata[5]]
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: F,
                    pulse: T,
                    consciousness: T
                }
            } else {
                rule = '一级'
                newdata = [newdata[0], newdata[1], newdata[3], newdata[4], newdata[5]]
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: F,
                    pulse: T,
                    consciousness: F
                }
            }
            /** 能否触及脉搏 */
        } else if (type === 'pulse') {
            if (1 === parseInt(value.split('__')[0], 0)) {
                rule = '一级'
                newdata = [newdata[0], newdata[1], newdata[3], newdata[4], newdata[5]]
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: F,
                    pulse: T,
                    consciousness: F
                }
            } else {
                rule = '一级'
                newdata = [newdata[0], newdata[1], newdata[3], newdata[4]]
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: F,
                    pulse: F
                }
            }
            /** 伤员能否行走 */
        } else if (type === 'walk') {
            if (1 === parseInt(value.split('__')[0], 0)) {
                newdata = [newdata[0]]
                rule = '四级'
                rok = {
                    walk: T
                }
            } else {
                newdata = [newdata[0], newdata[1], newdata[2]]
                rule = '死亡'
                rok = {
                    walk: F,
                    breathing: F,
                    airway: F
                }
            }
            /** 是否还有呼吸 */
        } else if (type === 'breathing') {
            if (1 === parseInt(value.split('__')[0], 0)) {
                newdata = [newdata[0], newdata[1], newdata[3], newdata[4]]
                rule = '四级'
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: F,
                    pulse: F
                }
            } else {
                newdata = [newdata[0], newdata[1], newdata[2]]
                rule = '死亡'
                rok = {
                    walk: F,
                    breathing: F,
                    airway: F
                }
            }
            /** 呼吸频率是否≥30/min */
        } else if (type === 'brequency') {
            if (1 === parseInt(value.split('__')[0], 0)) {
                newdata = [newdata[0], newdata[1], newdata[3]]
                rule = '一级'
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: T
                }
            } else {
                newdata = [newdata[0], newdata[1], newdata[3], newdata[4]]
                rule = '一级'
                rok = {
                    walk: F,
                    breathing: T,
                    brequency: F,
                    pulse: F
                }
            }
        }
        newobj.data[0].data = newdata
        other.rule = rule
        other.radioK = rok
        this.setState({ data: newobj, other })
        if (onChange) {
            onChange(other)
        }
    }
}

/**
 *  递增分数
 * @param obj
 * @returns {number}
 */
function addscore(obj): number {
    let sorce: number = 0
    for (const prop in obj) {
        if (prop) {
            let key = obj[prop].split('__')
            sorce += Number.parseInt(key[0], 0)
        }
    }
    return sorce
}
