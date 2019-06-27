/**
 * 体温单
 * Created by wx
 */
import React, {Component} from 'react'
import * as style from './style/index.scss'
import moment from 'moment'
import {DatePicker, message, Spin} from 'antd'
import {getNewDate} from './temp-chart'
import {GridTable} from './grid-table'
import {Colgroup} from './col-group'
import {PatientInfo} from './patient-info'
import {TableInfo} from './table-info'
import {SvgCenter} from './svg-center'
import {IconFont} from 'pkg/common/icon'

interface Moment {
    startMoment: number
    interval: number
}

interface Props {
    beginDate?: string // 开始时间
    hospital?: string // 医院
    patientList?: any // object 患者信息
    dayOps?: Array<any> // 产后/术后天数
    breathingList?: Array<any> // 呼吸次数
    dayList?: Array<any> // 住院天数
    dayMap?: any // object  每日录入信息
    pointTime?: any // object 时间段录入信息
    onChangeBeginDay?: (date) => void // 时间框选择事件
    onDateChange?: (data) => void // 时间框选择事件
    loading?: boolean // 是否显示加载样式
    momentObj?: Moment // 生成时刻的配置数据
}
interface State{
    momentList?:Array<number> // 一天的时间列表
}

const gridW = 16 // 画布一个格子宽度
const gridH = 16 // 画布格子高度
const dayNum = 7 // 显示天数（显示7天的数据）
const wrapW = 160 // 画布左右刻度的宽度和
export class TemperatureChart extends Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            momentList: [], // 一天的时间列表
        }
    }

    componentWillMount() {
        let {pointTime,beginDate, momentObj}=this.props
        this.handlePointTime(pointTime,beginDate, momentObj)
    }

    /**
     * 根据beginTime和momentObj1为pointTime里面的所有对象添加date和hour属性
     * @param pointTime Array<any> 时间段录入信息
     * @param beginTime string 开始显示时间
     * @param momentObj1 Moment 生成时刻的配置数据
     */
    handlePointTime=(pointTime:Array<any>,beginTime:string, momentObj1?:Moment)=>{
        let momentObj = momentObj1?momentObj1:{startMoment:2,interval:4}
        // 获得并设置一天的时间列表
        let momentList = this.getMoment(momentObj)
        this.setState({momentList:momentList})

        let keys = Object.keys(pointTime)
        for(let i = 0; i < keys.length; i++){
            pointTime[keys[i]].forEach((obj,j)=>{
                this.calulate(obj,beginTime,momentList,momentObj)
            })
        }
    }

    /**
     * 为pointTime中的每一个数据对象添加date和hour用于后面位置的显示(表示obj这个点应该显示在date这个日期hour这个时刻下)
     * @param obj object pointTime中的每一个数据对象
     * @param beginDate string 开始显示时间
     * @param momentList Array<number> 一天时刻列表
     * @param momentObj Moment 生成时刻的配置数据
     */
    calulate = (obj,beginDate:string,momentList:Array<number>,momentObj:Moment)=>{
        let endDate = obj.dataTime
        let momentNum = momentList.length
        let distance = moment(endDate).diff(moment(beginDate))
        let d = Math.floor(distance / 1000 / 3600 / 24)
        let h = Math.floor((distance / 1000 / 3600 - d * 24))
        let m = Math.floor((distance / 1000 / 60 - d * 24 * 60 - h * 60))
        let s = Math.floor((distance / 1000 - d * 24 * 60 * 60 - h * 60 * 60 - m * 60))
        let interval = momentObj.interval
        for (let i = 0; i < momentList.length; i++) {
            let listtime = moment('2017-01-01T' + (momentList[i] < 10 ? '0' + momentList[i] : momentList[i]) + ':00:00')
            let listtimeBefore = listtime.subtract(interval / 2, 'hour').diff(moment('2017-01-01'))
            let listtimeAfter = listtime.add(interval, 'hour').diff(moment('2017-01-01'))
            let endtime = moment('2017-01-01T'+ (h < 10 ? '0' + h : h)
                + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)).diff(moment('2017-01-01'))
            if (i === 0) {
                if (listtimeBefore > endtime) {// 说明在前一天
                    let date=moment(endDate).subtract('1','day').format('YYYY-MM-DD')
                    obj.date = date
                    obj.hour = momentList[momentNum-1]
                } else if (listtimeBefore <= endtime && endtime < listtimeAfter) {
                    obj.date = moment(endDate).format('YYYY-MM-DD')
                    obj.hour = momentList[0]
                }
            } else if (i === momentNum - 1) {
                if (listtimeBefore <= endtime && endtime < listtimeAfter) {
                    obj.date = moment(endDate).format('YYYY-MM-DD')
                    obj.hour = momentList[momentNum - 1]
                } else if (endtime > listtimeAfter) { // 后一天
                    let date = moment(endDate).add('1','day').format('YYYY-MM-DD')
                    obj.date = date
                    obj.hour = momentList[0]
                }
            } else {
                if (listtimeBefore <= endtime && endtime < listtimeAfter) {
                    obj.date = moment(endDate).format('YYYY-MM-DD')
                    obj.hour = momentList[i]
                }
            }
        }
    }

    /**
     * 生成一天时刻数据
     * @param {object} moment 生成时刻配置信息
     */
    getMoment = (moment?: Moment) => {
        let momentList = []
        let startMoment = moment ? moment.startMoment : 2
        let interval = moment ? moment.interval : 4
        // 如果传入的间隔interval不是24的约数，则让其为4
        if (24 % interval || interval === 24 || interval <= 0) interval = 4
        // 计算获得每天时刻数
        for (let i = 0; i * interval < 24; i++) {
            if ((startMoment + i * interval) === 24) {
                if (momentList[0] !== 0) momentList.unshift(0)
            } else if((startMoment + i * interval) > 24){
                if(momentList[0]-interval>=0)momentList.unshift(momentList[0]-interval)
            }else momentList.push(startMoment + interval * i)
        }
        return momentList
    }

    /**
     * 按钮切换开始时间
     * @param curDate 当前时间
     * @param disDays 传入Number类型时为与当前时间相差天数，字符串为其他类型'first'为第一周，'last'最后一周
     */
    changeBeginDay = (curDate, disDays) => {
        let admissionDateTime = this.props.patientList.admissionDateTime // 入院时间
        // 出院时间，如果还未出院，则默认为当前时间
        let dischargeDateTime = this.props.patientList.dischargeDateTime || moment(new Date()).format('YYYY-MM-DD')
        let admissionDay = new Date(moment(admissionDateTime).format('YYYY-MM-DD'))
        let dischargeDay = new Date(moment(dischargeDateTime).format('YYYY-MM-DD'))
        let newDate
        if (typeof disDays === 'string') {
            if (disDays === 'first') { // 第一周,开始时间为入院时间
                newDate = admissionDateTime
            } else if (disDays === 'last') { // 最后一周，开始时间为出院时间，如果还未出院，则为传入当前时间
                newDate = getNewDate(dischargeDateTime, -6)
            }
        } else {
            newDate = getNewDate(curDate, disDays)
        }
        let beginDate = new Date(moment(newDate).format('YYYY-MM-DD'))
        if (beginDate < admissionDay) {
            message.config({
                top: 300
            })
            message.info('开始时间不能小于入院时间')
            return
        } else if (beginDate > dischargeDay) {
            message.config({
                top: 300
            })
            message.info('开始时间不能大于出院时间')
            return
        }
        this.props.onChangeBeginDay(newDate)
    }

    /**
     * 时间控件切换开始开始
     * @param date
     * @param dateString
     */
    onDateChange = (date, dateString) => {
        if (dateString !== '') {
            this.props.onDateChange(dateString)
        }
    }
    /**
     * 确定选择范围 入院时间 - 出院时间
     * @param currentDate
     */
    disabledDate = (currentDate) => {
        let curDate = new Date(moment(currentDate).format('YYYY-MM-DD'))
        let admissionDateTime = this.props.patientList.admissionDateTime // 入院时间
        let dischargeDateTime = this.props.patientList.dischargeDateTime || moment(new Date()).format('YYYY-MM-DD')
        // 出院时间，如果还未出院，则默认为当前时间
        let admissionDay = new Date(moment(admissionDateTime).format('YYYY-MM-DD'))
        let dischargeDay = new Date(moment(dischargeDateTime).format('YYYY-MM-DD'))
        return curDate < admissionDay || curDate > dischargeDay
    }

    render() {
        let {
            beginDate,
            patientList,
            hospital,
            dayOps,
            dayList,
            pointTime,
            breathingList,
            dayMap,
            loading
        } = this.props
        const {momentList}=this.state
        let dayMomentNum = momentList.length
        let tempCartSvgWidth = dayMomentNum * gridW * dayNum + wrapW +2
        return (
            <div className={style.temperatureChart}>
                <Spin spinning={loading}>
                    <div className={style.footBtn}>
                        <DatePicker
                            size="small"
                            format="YYYY-MM-DD"
                            value={moment(beginDate)}
                            onChange={this.onDateChange}
                            disabledDate={this.disabledDate}
                        />
                    </div>
                    <div className={style.tempChartContent}>
                        <div className={style.tempCartSvg} style={{width: (tempCartSvgWidth>900?900:tempCartSvgWidth) + 'px'}}>
                            <div className={style.fixedDiv}>
                                <PatientInfo hospital={hospital} patientList={patientList}/>
                            </div>
                            <div className={style.flowDiv}>
                                <table className={style.showInfo}>
                                    <Colgroup gridW={gridW}
                                              dayMomentNum={dayMomentNum}
                                              dayNum={dayNum}/>
                                    <TableInfo beginDate={beginDate}
                                               momentList={this.state.momentList}
                                               dayMomentNum={dayMomentNum}
                                               dayNum={dayNum}
                                               dayOps={dayOps}
                                               dayList={dayList}/>
                                </table>
                                <div className={style.svgCenter}>
                                    <SvgCenter data={pointTime}
                                               curDate={beginDate}
                                               momentList={this.state.momentList}
                                               gridW={gridW}/>
                                </div>
                                <table className={style.tableSvg}>
                                    <Colgroup gridW={gridW}
                                              dayMomentNum={dayMomentNum}
                                              dayNum={dayNum}/>
                                    <GridTable breathingList={breathingList}
                                               dayMap={dayMap}
                                               dayMomentNum={dayMomentNum}
                                               dayNum={dayNum}/>
                                </table>
                            </div>
                            <ul className={style.listBtn}>
                                <li onClick={this.changeBeginDay.bind(this, beginDate, 'first')}>
                                    <IconFont iconName={'icon-wendang'}/><span>第一周</span>
                                </li>
                                <li onClick={this.changeBeginDay.bind(this, beginDate, -7)}>
                                    <IconFont iconName={'icon-wendang'}/><span>上一周</span>
                                </li>
                                <li onClick={this.changeBeginDay.bind(this, beginDate, 7)}>
                                    <IconFont iconName={'icon-wendang'}/><span>下一周</span>
                                </li>
                                <li onClick={this.changeBeginDay.bind(this, beginDate, 'last')}>
                                    <IconFont iconName={'icon-wendang'}/><span>最后一周</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}
