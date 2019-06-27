/**
 * 体温单 生成参考表格、左右侧刻度
 */
import React, {Component} from 'react'
import * as style from '../style/index.scss'
import classNames from 'classnames'
import {parseMapData} from '../temp-chart'
import {SvgLeft} from '../svg-left'
import {SvgRight} from '../svg-right'

interface GridTableProps{
    breathingList?: Array<any> // 呼吸次数
    dayMap?: any // object  每日录入信息
    dayMomentNum:number //  一天显示的时刻数
    dayNum:number // 显示天数
}
export class GridTable extends Component<GridTableProps,any> {
    constructor(props){
        super(props)
        this.state={
            breathingList:null,
            dayMap:null,
            dayMomentNum:6,
            gridArray:null // 存放tbody里的元素
        }
    }
    componentWillMount() {
        this.setState( {
            breathingList: this.props.breathingList,
            dayMap: this.props.dayMap,
            dayMomentNum:this.props.dayMomentNum
        })
        const {breathingList,dayMap,dayMomentNum,dayNum}=this.props
        let gridArray = this.createTable(breathingList,dayMap,dayMomentNum,dayNum)
        this.setState({
            gridArray:gridArray
        })
    }

    componentWillReceivePorps(nextProps) {
        const {breathingList,dayMap,dayMomentNum,dayNum}=nextProps
        this.setState({
            breathingList: breathingList,
            dayMap: dayMap,
            dayMomentNum:dayMomentNum
        })
        let gridArray = this.createTable(breathingList,dayMap,dayMomentNum,dayNum)
        this.setState({
            gridArray:gridArray
        })
    }

    createTable = (breathingList, dayMap,dayMomentNum,dayNum) => {
        let gridArray = []
        // 生成dayMomentNum*dayNum+2列55行的格子和刻度
        for (let i = 0; i < 55; i++) {// 有table有55行tr
            gridArray[i] = []
            if (i === 0) {
                // 生成左边温度刻度
                gridArray[i].push(<td key={0} rowSpan={55}>
                    <div className={style.svgLeft}>
                        <SvgLeft />
                    </div>
                </td>)
                // 生成中间dayMomentNum*dayNum列的小格子
                for (let j = 0; j < dayMomentNum*dayNum; j++) {
                    if ((j + 1) % dayMomentNum === 0) {
                        gridArray[i].push(<td key={j + 1} className={style.borderR}/>)
                    } else {
                        gridArray[i].push(<td key={j + 1}/>)
                    }
                }
                // 生成右边心率脉搏刻度
                gridArray[i].push(<td key={dayMomentNum*dayNum+1} rowSpan={55}>
                    <div className={style.svgRight}>
                        <SvgRight />
                    </div>
                </td>)
            } else {
                for (let j = 0; j < dayMomentNum*dayNum; j++) {
                    if ((j + 1) % dayMomentNum === 0) {
                        gridArray[i].push(<td key={j + 1} className={style.borderR}/>)
                    } else {
                        gridArray[i].push(<td key={j + 1}/>)
                    }
                }
            }
        }
        // 生成呼吸信息
        let hxData = breathingList // 获取呼吸数据
        let len = gridArray.length
        gridArray[len] = []
        gridArray[len].push(<td key={0} className={style.hx}>呼吸</td>)
        for (let i = 0; i < dayMomentNum*dayNum; i++) {
            let align = i % 2 === 0 ? 'top' : 'bottom'
            if ((i + 1) % dayMomentNum === 0) {
                gridArray[len].push(<td style={{verticalAlign: align}}
                                        key={i + 1}
                                        className={`${style.borderR} ${style.hx}`}>{hxData[i]}</td>)
            } else {
                gridArray[len].push(<td style={{verticalAlign: align}} key={i + 1} className={style.hx}>{hxData[i]}</td>)
            }
        }
        gridArray[len].push(<td key={dayMomentNum*dayNum+1} className={style.hx}/>)

        // 生成每日录入信息
        let dayInput = parseMapData(dayMap) // 获取每日录入数据
        let title = dayInput.titleArray
        let value = dayInput.valueArray
        for (let i = 0; i < title.length; i++) {
            let length = gridArray.length
            gridArray[length] = []
            gridArray[length].push(<td key={0} className={style.every}>{title[i].name + '(' + title[i].units + ')'}</td>)
            for (let j = 0; j < value[i].length; j++) {
                gridArray[length].push(<td key={1 + j}
                                           colSpan={dayMomentNum}
                                           className={`${style.every} ${style.borderR}`}>{value[i][j]}</td>)
            }
            gridArray[length].push(<td key={value[i].length + 1} className={style.every}/>)
        }
        return gridArray
    }

    render() {
        return (
            <tbody>
            {this.state.gridArray.map((tr, i) => {
                return (
                    <tr className={classNames(style.height, ((i + 1) % 5 === 0 && i < 55 ? style.borderB : ''))} key={i}>
                        {
                            tr.map((td, j) => {
                                return td
                            })
                        }
                    </tr>
                )
            })}
            </tbody>
        )
    }
}