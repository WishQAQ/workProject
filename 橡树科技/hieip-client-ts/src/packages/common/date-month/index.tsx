/**
 * create by wx
 */
import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import {DatePicker } from 'antd'
const {MonthPicker } = DatePicker

interface Props{
    startPlaceholder?:string
    endPlaceholder?:string
    className?:string
    onChange?:(startValue,endValue) => void
}
interface State{
    startValue:any
    endValue:any
    endOpen:boolean
}
export class DateMonth extends React.Component<Props,State> {
    constructor(props){
        super(props)
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }

    /**
     * 开始时间的禁选判断
     * @param startValue moment
     * @returns {any}
     */
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue
        if (!endValue) {
            if(startValue.isAfter(moment()))return true
            else return false
        }
        return startValue.isAfter(endValue) || startValue.isBefore(endValue.clone().subtract(12,'months'))
    }
    /**
     * 结束时间的禁选判断
     * @param endValue moment
     * @returns {any}
     */
    disabledEndDate = (endValue) => {
        let startValue = this.state.startValue
        if (!startValue) {
            if(endValue.isAfter(moment()))return true
            else return false
        }
        return endValue.isBefore(startValue) || endValue.isAfter(startValue.clone().add(12,'months'))
    }

    /**
     * 赋值
     * @param field string
     * @param value moment
     */
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        },()=>{
            this.props.onChange(this.state.startValue,this.state.endValue)
        })
    }
    /**
     * 开始时间选择事件
     * @param value moment
     */
    onStartChange = (value) => {
        this.onChange('startValue', value)
    }
    /**
     * 结束时间选择事件
     * @param value moment
     */
    onEndChange = (value) => {
        this.onChange('endValue', value)
    }
    /**
     * 开始时间的面板打开关闭回掉事件
     * @param open
     */
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true })
        }
    }
    /**
     * 结束时间的面板打开关闭回掉事件
     * @param open
     */
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open })
    }

    render() {
        const { startValue, endValue, endOpen } = this.state
        return (
            <div className={classNames(this.props.className)}>
                <MonthPicker
                    disabledDate={this.disabledStartDate}
                    value={startValue}
                    placeholder={this.props.startPlaceholder}
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                <MonthPicker
                    disabledDate={this.disabledEndDate}
                    value={endValue}
                    placeholder={this.props.endPlaceholder}
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        )
    }
}
