/**
 * 体温单 svgCenter 绘制折线
 */
import React, {Component} from 'react'
import {drawEvent, drawHzhx, parseRePoint} from '../temp-chart'
import * as style from '../style/index.scss'

interface SvgCenterProps {
    curDate?: string // 选择的开始时间点
    data?: any // object 时间段录入信息
    momentList:Array<number> // 一天的时间列表
    gridW:number // 画布一个格子宽度
}

export class SvgCenter extends Component<SvgCenterProps, any> {

    render() {
        let {curDate, data,momentList,gridW} = this.props
        return (
            <svg className={style.svgCenterContent} style={{height: 16 * 55}}>
                {
                  data.eventDatas && drawEvent(data.eventDatas, curDate,momentList,gridW).map((v, i) => {
                        return v
                    })
                }
                {
                    data.hzfx && drawHzhx(data.hzfx, curDate,momentList,gridW).map((v, i) => {
                        return v
                    })
                }
                {
                    parseRePoint(data, curDate,momentList,gridW).map((v, i) => {
                        return v
                    })
                }
            </svg>
        )
    }
}