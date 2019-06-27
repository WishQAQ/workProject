/**
 * 体温单 患者住院手术信息
 */
import React, {Component} from 'react'
import {getNewDate} from '../temp-chart'
import * as style from '../style/index.scss'

interface TableInfoProps{
    beginDate?:string
    dayOps?:Array<any> // 产后/术后天数
    dayList?:Array<any> // 住院天数
    momentList:Array<any> //  一天的时间列表
    dayMomentNum:number // 一天显示的时刻数
    dayNum:number //  显示天数
}
export class TableInfo extends Component<TableInfoProps,any> {
    constructor(props){
        super(props)
        this.state={
            beginDate:'',
            daysArray:[],
            timesArray:[]
        }
    }
    componentWillMount() {
        let daysArray=this.getDaysArray(this.props.beginDate)
        let timesArray=this.getTimes()
        this.setState({
            beginDate:this.props.beginDate,
            daysArray:daysArray,
            timesArray:timesArray
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        if(nextProps.beginDate !==this.state.beginDate){
            let daysArray=this.getDaysArray(nextProps.beginDate)
            this.setState({daysArray:daysArray})
        }
    }

    /*
     * @method getDaysArray 生成显示天数
     * @param {String} beginDate 开始时间
     * */
    getDaysArray = (beginDate) => {
        const showDays = this.props.dayNum
        // 根据当前日期和显示天数生成日期数组
        let daysArray = []
        for (let i = 0; i < showDays; i++) {
            let newDate = getNewDate(beginDate, i)
            daysArray.push(newDate)
        }
        return daysArray
    }
    /*
     * @method getTimes 生成每天的时刻
     * */
    getTimes = () => {
        // 生成timesArray
        let timesArray = []
        for(let i = 0;i<this.props.dayNum;i++){
            for(let j = 0;j<this.props.dayMomentNum;j++){
                timesArray.push(<td key={i+''+j} className={j<(this.props.dayMomentNum-1)?'':style.borderR}>{this.props.momentList[j]}</td>)
            }
        }
        return timesArray
    }

    render() {
        let {daysArray, timesArray} = this.state
        return (
            <tbody>
            <tr>
                <td>日期</td>
                {daysArray.map((v, i) => {
                    return <td key={i} colSpan={this.props.dayMomentNum} className={style.borderR}>{v}</td>
                })}
                <td />
            </tr>
            <tr>
                <td>住院天数</td>
                {daysArray.map((v, i) => {
                    return <td key={i} colSpan={this.props.dayMomentNum} className={style.borderR}>{this.props.dayList[i]}</td>
                })}
                <td />
            </tr>
            <tr>
                <td>术后/产后天数</td>
                {daysArray.map((v, i) => {
                    return <td key={i} colSpan={this.props.dayMomentNum} className={style.borderR}>{this.props.dayOps[i]}</td>
                })}
                <td />
            </tr>
            <tr>
                <td>时间</td>
                {timesArray.map((v, i) => {
                    return v
                })}
                <td/>
            </tr>
            </tbody>
        )
    }
}
