import React from 'react'
import classNames from 'classnames'
import { Checkbox, Spin } from 'antd'
import jquery from 'jquery'
// css
import styles from './style/index.scss'

export interface CInputTableState {
    /** 表格是否显示 */
    isShow: boolean
    /** 当前行index */
    index: number
    /** 原数据 */
    data: any
    /** 定位用 */
    top: number
    /** 定位用 */
    left: number
    /** 是否反向 */
    isReverse: boolean
    /** 表格基础规范 */
    option: Option
    /** 当前页 */
    current: number
    /** 数据从第几条开始(startIndex) */
    pageCurrent: number
    /** 总页数 */
    pageTotal: number
    /** 从外部传来的值&选择表格的文字 */
    value: string
    /** input输入的值 */
    inputValue: string
    /** 多选模式下显示的值 */
    multiValue: Array<any>
    /** 多选模式下保存的key值 */
    multiKey: Array<number>
}

export interface CInputTableProps {
    /** 数据 */
    data: any
    /** 表格基本规范 */
    option: Option
    /** 回传方法
     * clickEvent（点击打开弹框事件）
     * pageEvent（翻页事件）
     * enterEvent（确认事件）
     * changeEvent（输入事件）
     * blurEvent（失去焦点事件）
     * removeEvent（点击删除多选tag）
     */
    callBackMethods?: (v: object) => void
    /** 是否保存输入的值（不能与多选模式一起使用） */
    isSaveChange?: boolean
    /** 是否启用遮罩层 */
    isMask?: boolean
    /** className */
    className?: string
    /** style */
    style?: React.CSSProperties
    /** 是否禁用 */
    disabled?: boolean
    /** input值（单选模式下：应当传入string，多选模式下：应当传入一个数组对象） */
    oValue?: any
    /** 表格自带的value */
    value?: any
    /** 加载组件后就打开弹窗 */
    isRenderShow?: boolean
    /** 为表格设置最大高度 */
    maxHeight?: number
    /** 是否能选多个值 */
    isMulti?: boolean
    /** 表格以左推进的位置 */
    tableLeft?: number
    /** 表格宽度 */
    tableWidth?: string
    /** 重新返回表格数据
     * clickEvent（点击打开弹框事件）
     * pageEvent（翻页事件）
     * enterEvent（确认事件）
     * changeEvent（输入事件）
     * blurEvent（失去焦点事件）
     * removeEvent（点击删除多选tag）
     */
    callData?: (data?: any, callback?: any) => void
    /** 文本框提示文字 */
    placeholder?: string
}

export interface Option {
    /** 数据总条数 */
    total: number
    /** 表头 */
    columns: Array<Columns>
    /** 每页显示数据条数 */
    pageSize: number
    /** 显示用的字段 */
    showValue: string
    /** 多选模式下要保存的key值 */
    multiSaveKey?: string
    /** 用value子级值来显示 */
    valueChildren?: string
    /** 主动获取表头 */
    columnsCallData?: (props?: object, callback?: any) => void
}

export interface Columns {
    /** 表头名称 */
    title: string
    /** 数据中需要使用的字段 */
    field: string
    /** 宽（百分比） */
    width?: number
}

let flag = true

/**
 * 下拉表格组件
 */
export class InputTable extends React.Component<CInputTableProps, CInputTableState> {
    static defaultProps = {
        isMask: true,
        disabled: false,
        isRenderShow: false,
        tableLeft: 0
    }
    // 回传的数据
    callBack: any = {
        page: 0, // 页码
        pageCurrent: 1, // 数据从第几条开始(startIndex)
        data: [], // 行数据
        value: '', // input输入的值,多选情况下是个数组并记录所有选中的key值集合
        multiValue: [],// 多选情况下会纪录所有选中的对象的集合
        pageSize: 0, // 页面要显示的数据条数
        type: '', // 触发的事件类型('clickEvent','pageEvent'、'enterEvent'、'changeEvent'、'blurEvent'、'removeEvent')
        props: this.props // ag表格props
    }
    my = null
    input = null
    multiInput = null
    table = null
    multi = null

    /**
     * constructor
     * @param {object} args
     */
    constructor(Props) {
        super(Props)
        flag = true
        this.state = {
            isShow: false, // 表格是否显示
            index: 0, // 当前行index
            data: [], // 原数据
            top: 0, // 定位用
            left: 0, // 定位用
            isReverse: false, // 是否反向
            option: { // 表格基础规范
                total: 0,
                columns: [],
                pageSize: 0,
                showValue: ''
            },
            current: 1, // 当前页
            pageCurrent: 1, // 数据从第几条开始(startIndex)
            pageTotal: 0, // 总页数
            value: '', // 从外部传来的值&选择表格的文字
            inputValue: '', // input输入的值
            multiValue: [], // 多选模式下显示的值
            multiKey: [] // 多选模式下保存的key值
        }
    }

    /**
     * props发生改变
     * @param {object} props
     */
    componentWillReceiveProps(props) {
        this.willAndReceiveProps(props)
    }

    /**
     * 渲染前
     */
    componentWillMount() {
        this.willAndReceiveProps()
    }

    /**
     * 渲染后
     */
    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll)
        this.my.addEventListener('keydown', this.isKey)
        setTimeout(() => {
            if (this.props.isRenderShow) {
                this.inputClick()
                this.setState({ isShow: true })
                this.inputFocus()
                this.onPosition()
            }
        }, 10)
        this.callData()
    }

    /**
     * 销毁
     */
    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll)
        this.my.removeEventListener('keydown', this.isKey)
        flag = false
    }

    /** 渲染前和props发生改变统一方法 */
    willAndReceiveProps(prop?) {
        let props = prop || this.props
        let { oValue, value } = props
        this.pageTotal(props.option)
        let option = this.dataAddCheckbox(props)
        this.setState({
            option: option,
            data: props.data
        })
        if (!props.data.length) {
            this.setState({ current: 1 })
        }
        if (!props.isMulti) {
            let v
            if (oValue !== undefined) {
                v = oValue
            } else if (value !== undefined) {
                v = value
            } else {
                v = this.state.value
            }
            if (option.valueChildren && typeof (v) === 'object') {
                v = v[option.valueChildren]
            }
            this.setState({ value: v, inputValue: v })
        } else if (typeof (oValue) === 'object') {
            let v = oValue
            let multiKey = []
            for (let i = 0; i < v.length; i++) {
                multiKey.push(v[i][option.multiSaveKey])
            }
            if (option.valueChildren) {
                oValue = oValue[option.valueChildren]
            }
            this.setState({ multiValue: oValue, multiKey: multiKey })
        }
    }

    /**
     * 阻止按键事件传播
     * @param {object} event
     */
    isKey = (event) => {
        /** left & right & PgUp & PgDown & Home & End */
        if ([33, 34, 35, 36, 38, 40].indexOf(event.keyCode) > -1) {
            event.stopPropagation()
            event.preventDefault()
        } else if ([37, 39].indexOf(event.keyCode) > -1) {
            /** top & bottom */
            event.stopPropagation()
        }
        if (this.props.isMulti) {
            event.stopPropagation()
        }
        this.onKeyDown(event)
    }
    /**
     * 键盘按键
     * @param {object} e
     */
    onKeyDown = (e) => {
        let { value, inputValue, data, index, option, current, pageTotal, isShow } = this.state
        let { isSaveChange } = this.props
        if (!isShow || !data.length) return false
        let callBack = {
            page: 1,
            pageCurrent: 1,
            data: [],
            value: inputValue,
            pageSize: option.pageSize,
            type: '',
            props: this.props
        }
        switch (e.keyCode) {
            // TAB
            case 9:
                this.setState({ isShow: false })
                break
            // ESC
            case 27:
                callBack.type = 'blurEvent'
                this.callBackMethods(callBack)
                this.callData(callBack)
                this.setState({ isShow: false, inputValue: !isSaveChange ? value : inputValue })
                break
            // Enter
            case 13: {
                if (data[index]) {
                    this.rowClick(data[index])
                } else {
                    callBack.type = 'blurEvent'
                    this.callBackMethods(callBack)
                    this.callData(callBack)
                    this.setState({ isShow: false, inputValue: value })
                }
                break
            }
            // PageUp
            case 33: {
                if (current - 1 > 0) {
                    callBack.page = current - 1
                    callBack.pageCurrent = current - 2 > 0 ? (current - 2) * option.pageSize + 1 : 1
                    callBack.type = 'pageEvent'
                    this.callBackMethods(callBack)
                    this.callData(callBack)
                    this.setState({ index: 0, current: callBack.page, pageCurrent: callBack.pageCurrent })
                }
                break
            }
            // PageDown
            case 34: {
                // 当前页数小于最大页数
                if (current < pageTotal) {
                    callBack.page = current + 1
                    callBack.pageCurrent = current * option.pageSize + 1
                    callBack.type = 'pageEvent'
                    this.callBackMethods(callBack)
                    this.callData(callBack)
                    this.setState({ index: 0, current: callBack.page, pageCurrent: callBack.pageCurrent })
                }
                break
            }
            // Home
            case 36: {
                callBack.type = 'pageEvent'
                this.callBackMethods(callBack)
                this.callData(callBack)
                this.setState({ index: 0, current: callBack.page, pageCurrent: callBack.pageCurrent })
                break
            }
            // End
            case 35: {
                callBack.page = pageTotal
                callBack.pageCurrent = ((option.total / option.pageSize) - 1) * option.pageSize
                callBack.type = 'pageEvent'
                this.callBackMethods(callBack)
                this.callData(callBack)
                this.setState({ index: 0, current: callBack.page, pageCurrent: callBack.pageCurrent })
                break
            }
            // 上
            case 38: {
                if (index - 1 >= 0) {
                    this.setState({ index: index - 1 })
                } else {
                    if (current - 1 > 0) {
                        callBack.page = current - 1
                        callBack.pageCurrent = current - 2 > 0 ? (current - 2) * option.pageSize + 1 : 1
                        callBack.type = 'pageEvent'
                        this.callBackMethods(callBack)
                        this.callData(callBack)
                        this.setState({ index: option.pageSize - 1, current: callBack.page, pageCurrent: callBack.pageCurrent })
                    }
                }
                break
            }
            // 下
            case 40: {
                // 当前页数小于最大页数
                if (current <= pageTotal) {
                    if (index + 1 <= option.pageSize - 1 && typeof (data[index + 1]) !== 'undefined') {
                        this.setState({ index: index + 1 })
                    } else {
                        if (current !== pageTotal) {
                            callBack.page = this.state.current + 1
                            callBack.pageCurrent = current * option.pageSize + 1
                            callBack.type = 'pageEvent'
                            this.callBackMethods(callBack)
                            this.callData(callBack)
                            this.setState({ index: 0, current: callBack.page, pageCurrent: callBack.pageCurrent })
                        }
                    }
                } else {// 最后一页
                    if (index + 1 < option.total % option.pageSize) {
                        this.setState({ index: this.state.index + 1 })
                    }
                }
                break
            }
            // F9
            case 120: {
                this.setState({ isShow: true })
                this.onPosition()
                break
            }
            default:
                break
        }
        if (!this.props.isMulti) {
            this.inputFocus()
        } else {
            this.multiInputFocus()
        }
    }
    /** 判断弹框显示方向 */
    onPosition = () => {
        if (this.my) {
            let props = this.props
            let clientHeight = document.documentElement.clientHeight
            let $my = jquery(this.my)
            let $multi = jquery(this.multi)
            let $input = jquery(this.input)
            let offsetTop = $my.offset().top
            let offsetLeft = $my.offset().left
            let myHeight = $my.height()
            let inputHeight = props.isMulti ? $multi.height() : $input.height()
            let scrollTop = document.body.scrollTop
            if (clientHeight - offsetTop + scrollTop + myHeight > 320) {
                this.setState({
                    top: offsetTop - scrollTop + myHeight,
                    left: offsetLeft + (this.props.tableLeft || 0),
                    isReverse: false
                })
            } else {
                this.setState({
                    top: offsetTop - scrollTop + myHeight - inputHeight - 5,
                    left: offsetLeft + (this.props.tableLeft || 0),
                    isReverse: true
                })
            }
            setTimeout(() => {
                if (this.props.isMulti && this.multiInput) {
                    this.multiInput.focus()
                }
            }, 50)
        }
    }
    /**
     * 点击上/下页
     * @param {number} val
     */
    onCurrentChange = (val) => {
        let e = { keyCode: val }
        this.onKeyDown(e)
    }
    /**
     * 滚动事件
     * @param {string} v
     */
    handleScroll = (v) => {
        if (this.state.isShow) {
            v.preventDefault()
            if (v.deltaY > 0) {
                let e = { keyCode: 40 }
                this.onKeyDown(e)
            } else {
                let e = { keyCode: 38 }
                this.onKeyDown(e)
            }
        }
    }
    /** 显示 */
    isShow = () => {
        this.onPosition()
        this.setState({ isShow: true })
        this.inputClick()
    }
    /** 隐藏 */
    isHide = () => {
        this.setState({ isShow: false })
    }
    /** 改变input值 */
    onChange = (v) => {
        let value = v.target.value
        this.setState({ inputValue: value, current: 1 })
        let { option } = this.state
        let callBack = {
            page: 1,
            pageCurrent: 1,
            data: [],
            value: value,
            pageSize: option.pageSize,
            type: 'changeEvent',
            props: this.props
        }
        this.callBackMethods(callBack)
        this.callData(callBack)
    }

    /** 选择行 */
    rowClick(v) {
        let { option, multiValue, multiKey } = this.state
        let val = v[option.showValue]
        let callBack = {
            page: 0,
            pageCurrent: 1,
            data: v,
            value: val,
            multiValue: [],
            pageSize: option.pageSize,
            type: 'enterEvent',
            props: this.props
        }
        /** 单选 */
        if (!this.props.isMulti) {
            this.callBackMethods(callBack)
            this.callData(callBack)
            this.isHide()
            this.setState({
                index: 0, current: 1, value: val, inputValue: val
            })
        } else { // 多选
            let multiValues = multiValue // 获取本地当前多选值
            let multiKeys = multiKey // 获取本地当前多选key值
            let key = v[option.multiSaveKey] // 传进来参数的key值
            let f = -1 // 判断multiValues中是否有重复 && 若重复则会纪录要删除的位置
            for (let i = multiValues.length - 1; i >= 0; i--) {
                let x = multiValues[i][option.multiSaveKey]
                if (x === key) { // key值相等,则不用push,并记录位置
                    f = i
                }
            }
            let k = multiKeys.indexOf(key) // 判断多选key值是否重复 && 若重复则会纪录要删除的位置
            if (f === -1 && k === -1) { // 没有重复
                multiValues.push(v)
                multiKeys.push(key)
            } else { // 重复了
                multiValues.splice(f, 1)
                multiKeys.splice(k, 1)
            }
            callBack.value = multiKeys
            callBack.multiValue = multiValues
            this.multiInputFocus()
            this.callBackMethods(callBack)
            this.callData(callBack)
            this.setState({ inputValue: '', multiValue: multiValues, multiKey: multiKeys })
        }
    }

    /** 使input获得焦点 */
    inputFocus() {
        if (this.input) {
            this.input.focus()
        }
    }

    /** 使multiInput获得焦点 */
    multiInputFocus() {
        if (this.multiInput) {
            this.multiInput.focus()
        }
    }

    /** 点击遮罩层 */
    maskClick = () => {
        let { inputValue, option, value } = this.state
        let { isSaveChange } = this.props
        this.callBack = {
            page: 1,
            pageCurrent: 1,
            data: [],
            value: inputValue,
            pageSize: option.pageSize,
            type: 'blurEvent',
            props: this.props
        }
        this.callBackMethods(this.callBack)
        this.callData(this.callBack)
        this.setState({
            isShow: false,
            inputValue: !isSaveChange ? value : inputValue
        })
    }

    /** AG显示的值 */
    getValue() {
        /** 允许保存输入的值 */
        if (this.props.isSaveChange) {
            return this.state.inputValue
        } else if (this.props.isMulti) {
            /** 多选模式 */
            let { multiValue, option } = this.state
            let v = []
            for (let i = 0; i < multiValue.length; i++) {
                v.push(multiValue[i][option.showValue])
            }
            return v.join(';')
        } else {
            /** 普通模式 */
            return this.state.value
        }
    }

    /** 点击input输入框 */
    inputClick = () => {
        if (!this.state.isShow) {
            let { option, inputValue, value } = this.state
            let callBack = {
                page: 1,
                pageCurrent: 1,
                data: [],
                value: inputValue || value || '',
                multiValue: [],
                pageSize: option.pageSize,
                type: 'clickEvent',
                props: this.props
            }
            this.callBackMethods(callBack)
        }
    }
    /** 回传数据方法 */
    callBackMethods = (data) => {
        if (this.props.callBackMethods) {
            this.props.callBackMethods(data)
        }
    }
    /** 计算页数 */
    pageTotal = (option) => {
        let pageTotal = (option.total / option.pageSize)
        let is = pageTotal.toString()
        if (is.indexOf('.') !== -1) {
            pageTotal++
        }
        pageTotal = parseInt(pageTotal.toString(), 0)
        this.setState({ pageTotal: pageTotal })
    }
    /** 多选模式下给数据加上复选框 */
    dataAddCheckbox = (props?) => {
        let prop = props || this.props
        let { option, isMulti } = prop
        let columns = option.columns
        if (isMulti && columns && columns.length && columns[0].field !== 'checkBox') {
            option.columns.unshift({ title: '', field: 'checkBox', width: 10 })
        }
        return option
    }
    /** 点击多选X */
    onTagClick = (t, v, k) => {
        let { multiValue, multiKey, option } = this.state
        multiValue.splice(k, 1)
        let key = multiKey.indexOf(v[option.multiSaveKey])
        if (key !== -1) {
          multiKey.splice(key,
              1)
        }
        let callBack = {
            page: 0,
            pageCurrent: 1,
            data: v,
            value: multiKey,
            multiValue: multiValue,
            pageSize: option.pageSize,
            type: 'removeEvent',
            props: this.props
        }
        this.callBackMethods(callBack)
        this.callData(callBack)
        this.setState({ inputValue: '', multiValue: multiValue, multiKey: multiKey })
        t.stopPropagation()
    }

    /** 重新取得表格数据 */
    callData(v?) {
        let { option, inputValue, value } = this.state
        if (this.props.callData) {
            let callBack = this.callBack
            /** 没有传值，则认为是第一页的初始数据 */
            if (!v) {
                callBack.page = 1
                callBack.pageCurrent = 1
                callBack.value = inputValue || value || ''
                callBack.pageSize = option.pageSize
            }
            this.props.callData(v || callBack, (data) => {
                option.total = data ? data.total : 0
                this.pageTotal(option)
                if (flag) {
                    this.setState({ data: data, option: option })
                }
            })
        }
        if (option.columnsCallData) {
            option.columnsCallData(this.props, (data) => {
                if (flag) {
                    option.columns = data
                    this.setState({ option: option })
                }
            })
        }
    }

    /**
     * render
     * @return {JSX}
     */
    render() {
        const { className, style, disabled, isMask, maxHeight, isMulti, tableWidth, placeholder } = this.props
        const {
            data, option, isShow, top, left, isReverse, index, current, pageTotal,
            inputValue, multiValue, multiKey
        } = this.state
        const multiSaveKey = option.multiSaveKey
        const columns: any = option.columns
        return (
            <div
                style={style}
                className={classNames(className, styles.inputTable)}
                ref={(x) => this.my = x}>
                {isMask && isShow ? <span onClick={this.maskClick}
                                          className={`${styles.inputTableSpan}`}/> : null}
                {
                    !isMulti ? <input
                            title={!isMulti ? inputValue : multiValue.join(',')}
                            className={classNames(styles.input)}
                            value={!isMulti ? inputValue||'' : multiValue.join(',')}
                            ref={(x) => this.input = x}
                            onFocus={this.isShow}
                            onChange={this.onChange}
                            disabled={disabled}
                            placeholder={placeholder || ''}
                            readOnly={isMulti || false}/> :
                        <div className={`${styles.multi} ${isShow ? styles.multiBorder : ''}`} ref={(x) => this.multi = x}
                             onClick={!disabled ? !isShow ? this.isShow : this.isHide : null}>
                            {
                                multiValue ? Object.keys(multiValue).map((v) =>
                                        <span key={v}>
                    <p>{multiValue[v][option.showValue]}</p>
                    <a onClick={(t) => this.onTagClick(t, multiValue[v], v)}>x</a>
                  </span>
                                ) : null
                            }
                        </div>
                }
                {
                    isShow ?
                        <div ref={(x) => this.table = x}
                             className={`${styles.table} ${isReverse ? styles.transform : ''}`}
                             style={{ top: top, left: left, width: tableWidth || 'auto' }}>
                            {
                                isMulti ?
                                    <input
                                        className={styles.multiInput}
                                        value={inputValue}
                                        ref={(x) => this.multiInput = x}
                                        onChange={this.onChange}/> : null
                            }
                            {<div className={styles.tableHead}>
                                {
                                    columns && columns.length ? columns.map((v, k) =>
                                        <div key={k} style={{ width: v.width ? `${v.width}%` : '100%' }}
                                             className={columns[k].field === 'checkBox' ? styles.flex : ''}>
                                            {v.title}</div>
                                    ) : null
                                }
                            </div>}
                            <div className={styles.tableBox}
                                 style={{ maxHeight: `${maxHeight ? `${maxHeight}px` : 'auto'}` }}>
                                {
                                    columns && columns.length && data && data.length ? data.map((v, k) =>
                                        <div key={k} className={k === index ? styles.acitve :
                                            multiKey.indexOf(v[multiSaveKey]) !== -1 ? styles.acitve2 : ''}
                                             onClick={() => this.rowClick(v)}>
                                            {
                                                columns.map((val, key) => {
                                                    return <div key={key}
                                                                style={{ width: val.width ? `${val.width}%` : '100%' }}
                                                                className={columns[key].field === 'checkBox' ?
                                                                    styles.flex : ''}
                                                                title={v[val.field]}>
                                                        {columns[key].field !== 'checkBox' ?
                                                            v[val.field]
                                                            : <Checkbox className={styles.checkbox}
                                                                        checked={multiKey.indexOf(v[multiSaveKey]) !== -1}/>}
                                                    </div>
                                                })
                                            }
                                        </div>
                                    ) : <Spin className={styles.loading}/>
                                }
                            </div>
                            <div className={styles.page}>
                                <ul>
                                    <li>
                                        <button onClick={() => this.onCurrentChange(33)}>上页</button>
                                    </li>
                                    <li>
                                        <button onClick={() => this.onCurrentChange(34)}>下页</button>
                                    </li>
                                </ul>
                                <ul>
                                    <li>第{current}页</li>
                                    <li>/</li>
                                    <li>共{pageTotal}页</li>
                                </ul>
                            </div>
                        </div> : null
                }
            </div>
        )
    }
}
