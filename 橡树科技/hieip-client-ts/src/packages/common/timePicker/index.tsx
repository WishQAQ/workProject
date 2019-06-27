import React from 'react'
import moment from 'moment'
import jquery from 'jquery'
import classnames from 'classnames'
import {DateInput, DateRangeInput} from '@blueprintjs/datetime'
import {IDateInputProps} from '@blueprintjs/datetime/dist/dateInput'
import LocaleUtils from 'react-day-picker/moment'
import 'moment/locale/zh-cn'
import './style/index.less'

export interface State {
    /**
     * 弹出框显示相对位置
     * TOP_LEFT = 0
     * TOP = 1
     * TOP_RIGHT = 2
     * RIGHT_TOP = 3
     * RIGHT = 4
     * RIGHT_BOTTOM = 5
     * BOTTOM_RIGHT = 6
     * BOTTOM = 7
     * BOTTOM_LEFT = 8
     * LEFT_BOTTOM = 9
     * LEFT = 10
     * LEFT_TOP = 11
     */
    position?: number
    /** 值 */
    value?: string
}

export interface Props extends IDateInputProps {
    /** 输入时触发的外部事件 */
    dateChange?: (e: any) => void
    /** 显示的值 */
    oValue?: any
    /** 显示的值2 */
    oValue2?: any
    /**
     * 是否使用范围时间选择器
     * @default false
     */
    isRange?: boolean
    /**
     * 是否加载组件的同时获取焦点
     * @default false
     */
    autoFocus?: boolean
    /** Ref */
    ref?: any
    /** 提示文字 */
    startPlaceholder?: string
    /** 提示文字（如果是范围时间选择，这将是第二个时间输入框的提示文字，否则无意义） */
    endPlaceholder?: string
    /**
     * 底部时间选择器
     * MINUTE 0
     * SECOND 1
     * MILLISECOND 2
     */
    timePrecision?: number
    /**
     * 该属性在启用范围时间选择器时可以生效，效果为范围选择器分开选择时间且不同步，true为同步，false为异步
     */
    contiguousCalendarMonths?: boolean
}

/**
 * 公共时间组件
 */
let dateArr = []

export class TimePicker extends React.Component<Props, State> {
    static defaultProps = {
        minDate: moment(Date.now()).subtract(200, 'y').toDate(),
        maxDate: moment(Date.now()).add(200, 'y').toDate(),
    }
    /** ref */
    div = null
    dateInput = null
    /** 道具组 */
    sta = {
        inputProps: {
            /** 格式化输入日期 */
            onKeyUp(e) {
                let code = e.keyCode
                let value = e.target.value
                if (code >= 48 && code <= 57 || code >= 96 && code <= 105) {// 输入的为数字
                    let lf = true
                    // 输入的长度到达第3 位时开始判断是否已经结束‘年’的输入，n为null：无匹配年则判断第三位开始为月份输入
                    if (value.toString().length === 3) {
                        let n = null
                        // 寻找输入的与数组前两位的年数可有匹配的
                        for (let i in dateArr) {
                            if (i) {
                                let x = dateArr[i]
                                let x1 = (x % 100).toString()
                                let value1 = (value / 10).toString()
                                if (parseInt(x1, 0) === parseInt(value1, 0)) {
                                    n = x
                                    break
                                }
                            }
                        }
                        if (n) {
                            e.target.value = `${n}-${e.key}`// 组装赋值
                        } else {
                            e.target.value = value
                        }
                    } else
                    // 输入的长度到达第7 位时开始判断是否已经结束‘月’的输入
                    if (value.toString().length === 7) {
                        let last = value.split('')
                        let month = `${last[last.length - 2]}${last[last.length - 1]}`// 取得输入的月数
                        if (parseInt(month, 0) > 12) {// 输入的月大于12，则判断为当前在输入的为小于10月的月份
                            lf = false
                            let val = value.split('')
                            val.splice(5, 0, '0')
                            val.splice(7, 0, '-')
                            e.target.value = val.join('')
                        }
                    } else
                    // 输入的长度到达第10 位时开始判断是否已经结束‘日’的输入
                    if (value.toString().length === 10) {
                        let last = value.split('')
                        let before4 = value.toString().split('')
                        before4 = `${before4[0]}${before4[1]}${before4[2]}${before4[3]}`// 取得前四位
                        let month = `${last[last.length - 5]}${last[last.length - 4]}`// 取得输入的月数
                        let temp = new Date(parseInt(before4, 0), parseInt(month, 0), 0)// 转换为日期格式
                        let monthMax = temp.getDate()// 取得输入的年月有多少天
                        let inputMonth = `${last[last.length - 2]}${last[last.length - 1]}`// 输入的日期
                        if (parseInt(inputMonth, 0) > monthMax) {// 输入的日期大于输入月份的最大日期，则判断为当前在输入的为小于10月的月份
                            lf = false
                            let val = value.split('')
                            val.splice(8, 0, '0')
                            val.splice(10, 0, ' ')
                            e.target.value = val.join('')
                        }
                    } else
                    // 输入的长度到达第13 位时开始判断是否已经结束‘时’的输入
                    if (value.toString().length === 13) {
                        let last = value.split('')
                        let h = `${last[last.length - 2]}${last[last.length - 1]}`// 取得输入的时间
                        if (parseInt(h, 0) > 24) {// 输入的小时大于12，则判断小时的输入已经结束
                            lf = false
                            let val = value.split('')
                            val.splice(11, 0, '0')
                            val.splice(13, 0, ':')
                            e.target.value = val.join('')
                        }
                    } else
                    // 输入的长度到达第16 位时开始判断是否已经结束‘分’的输入
                    if (value.toString().length === 16) {
                        let last = value.split('')
                        let f = `${last[last.length - 2]}${last[last.length - 1]}`// 取得输入的时间
                        if (parseInt(f, 0) > 59) {// 输入的分钟大于60，则判断分钟的输入已经结束
                            lf = false
                            let val = value.split('')
                            val.splice(14, 0, '0')
                            val.splice(16, 0, ':')
                            e.target.value = val.join('')
                        }
                    }
                    //
                    if (value !== '' && lf) {// 输入的都是数字&&是否为空&&不为汉字
                        if (value.toString().indexOf('-') === -1 && value.toString().split('').length === 4) {// 年
                            let sz = value.split('')
                            sz.splice(4, 0, '-')
                            sz = sz.join('')
                            e.target.value = sz.toString()
                        } else {
                            let y = 0
                            value.toString().split('').find((x) => {
                                if (x === '-') y++
                            })
                            let sz = value.split('')
                            if (y === 1 && value.toString().split('').length === 7) {// 月
                                sz.splice(7, 0, '-')
                                sz = sz.join('')
                                e.target.value = sz.toString()
                            } else if (y === 2 && value.toString().split('').length === 10) {// 日
                                sz.splice(10, 0, ' ')
                                sz = sz.join('')
                                e.target.value = sz.toString()
                            } else if (y === 2 && value.toString().split('').length === 13) {// 时
                                sz.splice(13, 0, ':')
                                sz = sz.join('')
                                e.target.value = sz.toString()
                            } else if (y === 2 && value.toString().split('').length === 16) {// 分
                                sz.splice(16, 0, ':')
                                sz = sz.join('')
                                e.target.value = sz.toString()
                            }
                        }
                    }
                } else {
                    e.preventDefault()
                }
            },
            value: ''
        }
    }

    /**
     * 构造函数
     * @param {object} Props
     */
    constructor(Props) {
        super(Props)
        let dateMinY = moment(this.props.minDate).format('YYYY')
        let dateMaxY = moment(this.props.maxDate).format('YYYY')
        for (let i = parseInt(dateMinY, 0); i <= parseInt(dateMaxY, 0); i++) {
            dateArr.push(i)
        }
        this.state = {
            value: '',
            position: 7
        }
    }

    /**
     * 组件渲染前
     */
    componentDidMount() {
        let props = this.props
        setTimeout(() => {
            if (!props.isRange) {
                if (this.dateInput.inputRef) {
                    if (props.autoFocus) {
                        this.dateInput.inputRef.focus()
                        this.dateInput.inputRef.select()
                        this.dateInput.inputRef.addEventListener('keydown', this.isKey)
                    }
                    if (props.startPlaceholder) {
                        this.dateInput.inputRef.placeholder = props.startPlaceholder
                    }
                }
            } else if (props.isRange) {
                if (this.dateInput.startInputRef) {
                    if (props.autoFocus) {
                        this.dateInput.startInputRef.focus()
                        this.dateInput.startInputRef.select()
                    }
                    if (props.startPlaceholder) {
                        this.dateInput.startInputRef.placeholder = props.startPlaceholder
                    }
                    if (props.endPlaceholder) {
                        this.dateInput.endInputRef.placeholder = props.endPlaceholder
                    }
                }
            }
            if(this.dateInput.inputRef){
                this.dateInput.inputRef.addEventListener('keyup', this.isUpKey)
            }
        }, 150)
    }

    /**
     * 组件销毁
     */
    componentWillUnmount() {
        if (this.dateInput.inputRef) {
            this.dateInput.inputRef.removeEventListener('keydown', this.isKey)
        }
    }

    /**
     * 键盘事件
     * @param {object} event
     */
    isKey = (event) => {
        if ([35, 36, 37, 39, 38, 40].indexOf(event.keyCode) > -1) {
            event.stopPropagation()
        }
    }
    /** 键盘弹起事件 */
    isUpKey = (event) =>{
        if ([8, 46].indexOf(event.keyCode) > -1) {
            if(!event.target.value && this.props.dateChange) this.props.dateChange('')
        }
    }
    /** 输入
     * @param {date} v
     */
    onChange = (v) => {
        // console.log('v=', v)
        if (v) {
            this.setState({value: v})
            if (this.props.dateChange) {
                if (v[0]) {
                    v[0] = new Date(moment(v[0]).format('YYYY-MM-DD [00:00:00]'))
                }
                if (v[1]) {
                    v[1] = new Date(moment(v[1]).format('YYYY-MM-DD [00:00:00]'))
                }
                this.props.dateChange(v)
            }
        } else {
            this.setState({value: ''})
        }
    }
    /** 获取焦点 */
    focus = () => {
        let $div = jquery(this.div)
        let clientHeight = document.documentElement.clientHeight
        let offsetTop = $div.offset().top
        let offsetLeft = $div.offset().left
        let myHeight = jquery(this.div)[0].clientHeight
        let width = $div.width()
        let scrollTop = document.body.scrollTop
        let top = 0
        if (!this.props.isRange) {
            if (clientHeight - offsetTop + scrollTop - myHeight > 250) {
                top = offsetTop - scrollTop + myHeight
                this.setState({position: 7})
            } else {
                top = offsetTop - scrollTop + myHeight - 20
                this.setState({position: 1})
            }
        } else {
            if (this.div) {
                if (clientHeight - offsetTop + scrollTop - myHeight > 250) {
                    top = offsetTop - scrollTop + myHeight
                    this.setState({position: 7})
                } else {
                    top = offsetTop - scrollTop + myHeight - 20
                    this.setState({position: 1})
                }
            }
        }
        setTimeout(() => {
            jquery('.pt-overlay').css({top: `${top}px`, left: `${offsetLeft + width / 2}px`})
        }, 10)
    }
    /** 失去焦点 */
    blur = () => {
        let props = this.props
        if (!props.isRange) {
            if (props.startPlaceholder) {
                this.dateInput.inputRef.placeholder = props.startPlaceholder
            }
        } else if (props.isRange) {
            if (props.startPlaceholder) {
                setTimeout(() => this.dateInput.startInputRef.placeholder = props.startPlaceholder, 10)
            }
            if (props.endPlaceholder) {
                setTimeout(() => this.dateInput.endInputRef.placeholder = props.endPlaceholder, 10)
            }
        }
    }

    /** 外部方法主动获取焦点 */
    parentFocus() {
        this.dateInput.inputRef.focus()
        this.dateInput.inputRef.select()
    }

    getValue() {
        return this.state.value || this.props.value
    }

    /**
     * render
     * @return {XML}
     */
    render() {
        const {position} = this.state
        const {className, oValue, oValue2, format, timePrecision, disabled,
            isRange, minDate, maxDate, contiguousCalendarMonths} = this.props
        const {inputProps} = this.sta
        return (
            <div ref={(x) => this.div = x}
                 className={classnames(className)}
                 tabIndex={1}
                 onFocus={this.focus}
                 onBlur={this.blur}
                 style={{display: 'table'}}>
                {
                    !isRange ?
                        <DateInput
                            ref={(x) => this.dateInput = x}
                            format={format}
                            invalidDateMessage="格式错误"
                            outOfRangeMessage=""
                            value={oValue && oValue !== '' ? oValue : undefined}
                            inputProps={inputProps}
                            locale="zh-cn"
                            localeUtils={LocaleUtils}
                            onChange={this.onChange}
                            timePrecision={timePrecision}
                            minDate={minDate}
                            maxDate={maxDate}
                            disabled={disabled}
                            popoverProps={{position: position}}
                        /> :
                        <DateRangeInput
                            ref={(x) => this.dateInput = x}
                            format={format}
                            invalidDateMessage="格式错误"
                            outOfRangeMessage=""
                            value={[oValue && oValue !== '' ? oValue : undefined, oValue2 && oValue2 !== '' ? oValue2 : undefined]}
                            startInputProps={inputProps}
                            endInputProps={inputProps}
                            locale="zh-cn"
                            localeUtils={LocaleUtils}
                            onChange={this.onChange}
                            minDate={minDate}
                            maxDate={maxDate}
                            disabled={disabled}
                            popoverProps={{position: position}}
                            selectAllOnFocus={true}
                            allowSingleDayRange={true}
                            shortcuts={false}
                            contiguousCalendarMonths={contiguousCalendarMonths}
                        />
                }
            </div>
        )
    }
}
