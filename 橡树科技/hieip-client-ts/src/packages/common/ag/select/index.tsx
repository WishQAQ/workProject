import React from 'react'
import classnames from 'classnames'
import jquery from 'jquery'
import { AgGridReactProps } from 'ag-grid-react'
import { Checkbox } from 'antd'
import { IconFont } from 'pkg/common/icon'
import styles from './style/select.scss'

export interface AgSelectProps extends AgGridReactProps {
    /** 数据 */
    data: Array<object>
    /** 数据规范 */
    dataOption: Data
    /** 是否多选 */
    isMulti?: boolean
    /** 是否能模糊查询 */
    isSearch?: boolean
    /** 选中 */
    onClick?: (v: object | string, e: object) => void
    /** 重新返回表格数据 */
    callData?: (data?: any, callback?: any) => void
    /** 返回是否打开下拉框 */
    callOpen?: (bol: boolean) => void
    /** 值（key值）,单选模式下：应当传入string，多选模式下：应当传入一个数组对象 */
    value?: any
    /** open的初始状态 */
    open?: boolean
    /** ag表格传来的行号 */
    rowIndex?: number
    /** ag表格传来的列属性 */
    column?: Column
    /** 下拉框最大显示高度 */
    maxHeight?: number
    /** className */
    className?: string
    /** style */
    style?: React.CSSProperties
    /** 是否保留筛选的值（不能与多选模式一起使用） */
    isSaveSearch?: boolean
    /** 是否启用遮罩层 */
    isMask?: boolean
}

export interface Column {
    colId?: string
}

export interface AgSelectState {
    /** 数据 */
    data: Array<object>
    /** 打开or关闭下拉框 */
    open: boolean
    /** 显示的值 */
    value: string
    /** 筛选的值 */
    searchValue: string
    /** 保存的多选的数组对象 */
    multiVal: Array<any>
    /** 纪录原数据选中数据的序号 */
    index: Array<any>
    /** 筛选的数据 */
    searchData: Array<any>
    /** 筛选的数据真实长度（去掉false） */
    searchDataLh: number
    /** 键盘控制选中 */
    keyboardIndex: number
    /** 下拉框最大显示高度 */
    maxHeight: number
    /** 下拉框属性 */
    popupWidht: number
    popupTop: number
    popupLeft: number
    /** 是否往上显示 */
    isReverse: boolean
}

export interface Data {
    value: string
    key: string
    inputCode?: string
    disabled?: string
}

let flag = true

/**
 * 下拉组件
 */
export class Select extends React.Component<AgSelectProps, AgSelectState> {
    static defaultProps = {
        isMulti: false,
        isSaveSearch: false,
        isSearch: false,
        isMask: true
    }
    select = null
    search = null
    input = null
    popup = null
    ul = null
    noSearch = null

    /**
     * 构造函数
     * @param {object} props
     */
    constructor(props) {
        super(props)
        flag = true
        this.state = {
            data: [],
            open: false,
            value: '',
            searchValue: '',
            multiVal: [],
            index: [],
            searchData: [],
            searchDataLh: 0,
            keyboardIndex: 0,
            maxHeight: 150,
            popupWidht: 0,
            popupTop: 0,
            popupLeft: 0,
            isReverse: false
        }
    }

    /**
     * props发生改变
     * @param {object} props
     */
    componentWillReceiveProps(props) {
        let { data } = props
        let newData = []
        if(data && !data.length && Object.keys(data)[0]){
            let od = Object.keys(data)
            for(let i = 0;i < od.length;i++){
                if (typeof data[od[i]] !== 'string') {
                    newData.push(data[i])
                }
            }
        }
        if(newData.length) data = newData
        /** 本地数据为空 */
        if (data && data.length && this.state.data.length === 0) {
            this.setState({ data: data })
        }
        /** 不是多选 && 外部有value && 外部value!==本地value */
        if (!props.isMulti && (props.value || props.value === '') && props.value !== this.state.value) {
            this.setState({ value: props.value, searchValue: props.value })
        } else if (props.isMulti) {
            if (typeof (props.value) === 'object') { // 数据类型为数组对象
                let inde = this.methodsIndex(props.value,data,props.dataOption)
                this.setState({ multiVal: props.value,index:inde })
            }
        }
        /** 筛选 && 筛选数据为空 */
        if (props.isSearch && this.state.searchData.length === 0) {
            this.setState({ searchData: data, searchDataLh: data.length })
        }
    }

    /**
     * 渲染前
     */
    componentWillMount() {
        let props = this.props
        let { data, isSearch, maxHeight, value, dataOption, isMulti } = props
        let newData = []
        if(data && !data.length && Object.keys(data)[0]){
            let od = Object.keys(data)
            for(let i = 0;i < od.length;i++){
                if (typeof data[od[i]] !== 'string') {
                    newData.push(data[i])
                }
            }
        }
        if(newData.length) data = newData
        /** 更新本地数据 */
        if (data && data.length) {
            this.setState({ data: data })
            /** 筛选 */
            if (isSearch) {
                this.setState({ searchData: data, searchDataLh: data.length })
            }
        }
        /** 最大高度 */
        if (maxHeight) {
            this.setState({ maxHeight: maxHeight })
        }
        if (value && value !== this.state.value) {
            this.setState({ value: value, searchValue: value })
            if (isMulti) {
                if (typeof (value) === 'object') { // 数据类型为数组对象
                    let inde = this.methodsIndex(value,data,dataOption)
                    this.setState({multiVal: value, index: inde})
                }
            }
        }
    }

    /**
     * 渲染完成后
     */
    componentDidMount() {
        setTimeout(() => {
            if (this.select) {
                this.direction()
                if (this.props.open) {
                    this.callData()
                    if(this.props.callOpen) this.props.callOpen(true)
                    this.setState({ open: this.props.open })
                }
                window.addEventListener('wheel', this.handleScroll)
                this.select.addEventListener('keydown', this.isKey)
                if (this.props.open) {
                    if (this.props.isSearch && this.props.isMulti) {
                        this.search.focus()
                    } else if (this.props.isSearch) {
                        this.input.focus()
                    } else if (!this.props.isSearch) {
                        this.noSearch.focus()
                    }
                }
            }
        }, 20)
    }

    /**
     * 销毁
     */
    componentWillUnmount() {
        flag = false
        window.removeEventListener('wheel', this.handleScroll)
        // document.removeEventListener('mousedown', this.isKey)
    }

    /**
     * 从新计算index
     */
    methodsIndex(value,data,dataOption){
        let inde = []
        for(let i = 0;i < value.length;i++){
            let vk = value[i][dataOption.key]
            for(let i2 = 0;i2<data.length;i2++){
                if(vk === data[i2][dataOption.key]){
                    inde[i2] = {k:i2,key:vk}
                    break
                }
            }
        }
        for(let i = 0;i<inde.length;i++){
            if(!inde[i]){
                inde[i] = false
            }
        }
        return inde
    }

    /**
     * 鍵盤事件
     * @param {object} event
     */
    isKey = (event) => {
        /** 如果下拉框并没有打开，则结束 */
        if (!this.state.open) {
            return
        }
        /** 阻止AG默认事件 */
        if ([33, 34, 35, 36, 37, 38, 40].indexOf(event.keyCode) > -1) {
            event.stopPropagation()
        }
        let { keyboardIndex, searchData, data } = this.state
        let { isSearch } = this.props

        if ([38, 40, 13].indexOf(event.keyCode) > -1) {
            /** 属性 */
            let ul = jquery(document.getElementsByClassName(styles.ul))[0]
            let clientHeight = ul && ul.children[0] ? ul.children[0].clientHeight : 33
            let group = parseInt((this.state.maxHeight / clientHeight).toString(), 0)
            // let index = jquery(styles.keyActive).index()
            let lh = isSearch ? searchData.length : data.length
            /** 上 */
            if (event.keyCode === 38) {
                let index = keyboardIndex - 1
                let indexF = -1 // 获取searchData中最后一条不为false的数据
                let ft = false
                if (isSearch) { // 筛选模式
                    // 判断该键盘选项是否存在（筛选时非符合条件push的false）
                    for (let i = searchData.length - 1; i >= 0; i--) {
                        if (indexF === -1 && searchData[i]) { // 尚未获取到最后一条不为false的数据 && 数据为真
                            indexF = i
                        }
                        if (searchData[index]) { // 该条数据不为false
                            break
                        } else { // 数据为false
                            index--
                        }
                    }
                    if (index < 0) {
                        index = indexF
                        ft = true
                    } // 小于0则跳转到最后一条有效数据的下标上
                } else { // 普通模式
                    if (index < 0) {
                        index = data.length - 1
                        ft = true
                    } // 小于0则跳到最后
                }
                this.setState({ keyboardIndex: index }, () => {
                    setTimeout(() => {
                        if (ft) {
                            this.ul.scrollTop = 999
                        } else {
                            if ((lh - index) > group) {
                                this.ul.scrollTop -= clientHeight
                            }
                        }
                    }, 100)
                })
                event.preventDefault()
            }
            /** 下 */
            if (event.keyCode === 40) {
                let index = keyboardIndex + 1
                let indexF = -1 // 获取searchData中第一条不为false的数据
                if (isSearch) { // 筛选模式
                    // 判断该键盘选项是否存在（筛选时非符合条件push的false）
                    for (let i = 0; i < searchData.length; i++) {
                        if (indexF === -1 && searchData[i]) { // 尚未获取到第一条不为false的数据 && 数据为真
                            indexF = i
                        }
                        if (searchData[index]) { // 该条数据不为false
                            break
                        } else { // 数据为false
                            index++
                        }
                    }
                    if (index > searchData.length) { // 超出数据长度，以第一条有正确数据的下标为准
                        index = indexF
                    }
                } else { // 普通模式
                    if (index >= data.length) index = 0 // 超出长度则回到第一条
                }
                this.setState({ keyboardIndex: index }, () => {
                    setTimeout(() => {
                        if (index === 0) {
                            this.ul.scrollTop = 0
                        } else {
                            if ((index + 1) > group) {
                                this.ul.scrollTop += clientHeight
                            }
                        }
                    }, 100)
                })
                event.preventDefault()
            }
            /** 回车 */
            if (event.keyCode === 13) {
                let { dataOption } = this.props
                let { keyboardIndex } = this.state
                if (keyboardIndex !== -1) {
                    this.setState({ searchValue: data[keyboardIndex][dataOption.value] })
                    this.onClick(data[this.state.keyboardIndex], this.state.keyboardIndex)
                }
                /** 如果是多选，就阻止ag默认的回车事件 */
                if (this.props.isMulti) {
                    event.stopPropagation()
                }
            }
        }
    }

    /**
     * 返回ag表格最终显示的值
     */
    getValue() {
        /** 重新为该cell获取焦点 */
        this.props.api.setFocusedCell(this.props.rowIndex, this.props.column.colId)
        /** 返回最终值 */
        return this.state.value
    }

    /**
     * 判断下拉框显示位置
     */
    direction() {
        let select = this.select
        let $select = jquery(select).offset()
        let top = $select.top
        let isReverse = false
        if (document.documentElement.clientHeight - top - select.clientHeight < this.state.maxHeight) {
            isReverse = true
            top = top - select.clientHeight - 6
        }
        top = top + select.clientHeight + 3
        this.setState({
            popupWidht: select.clientWidth,
            popupTop: top,
            popupLeft: $select.left,
            isReverse: isReverse
        })
    }

    /**
     * 打开or关闭下拉菜单
     */
    isOpen = () => {
        let { open, value, searchValue } = this.state
        let { isSearch, isMulti, isSaveSearch, callOpen } = this.props
        let opens = !open
        if (opens) { // 打开下拉框
            this.direction()
            this.callData()
            if(callOpen) callOpen(true)
        } else {
            this.setState({ keyboardIndex: 0 })
            if (!isSaveSearch) { // 不需要保存输入的值
                this.setState({ searchValue: value })
            } else if (this.props.onClick) { // 需要保存，将输入的值回传
                this.props.onClick(searchValue, this.props)
            }
            if(callOpen) callOpen(false)
        }
        this.setState({ open: opens }, () => {
            if (opens && this.search) {
                if (isSearch) {
                    if (isMulti) {
                        this.search.focus()
                    } else {
                        this.input.focus()
                    }
                } else {
                    this.noSearch.focus()
                }
            }
        })
        /** 重置筛选数据 */
        if (opens && isSearch && !isSaveSearch) { // 关闭下拉框 && 有筛选功能 && 不用保存输入的值
            this.setState({ searchData: this.state.data, searchDataLh: this.state.data.length })
        }
    }
    /**
     * 点击下拉选项
     */
    onClick = (v, k) => {
        let { index, multiVal } = this.state
        let { isMulti, dataOption, isSaveSearch } = this.props
        if (!v) {
            return false
        }
        if (dataOption.disabled && !v[dataOption.disabled]) {
            return false
        }
        /** 单选 */
        if (!isMulti) {
            this.setState({
                value: v[dataOption.value] || '',
                searchValue: v[dataOption.value] || '', open: false
            }, () => {
                if (this.props.onClick) {
                    if (!isSaveSearch) {
                        this.props.onClick(v, this.props)
                    } else {
                        this.props.onClick(v[dataOption.value], this.props)
                    }
                }
            })
        } else {
            /** 多选 */
            /** 将点击的与已点击的key值进行比较 */
            let n = multiVal.findIndex((val) => val[dataOption.key] === v[dataOption.key])
            /** 没有找到，则可以添加进去 */
            if (n === -1) {
                /** 已K值（原数据序号）进行push */
                index[k] = {}
                index[k].k = k // 序号
                index[k].key = v[dataOption.key] // 数据key值
                multiVal.push(v)
                let sz = []
                for (const value of multiVal) {
                    sz.push(value[dataOption.value])
                }
                this.setState({ value: sz.join(';'), index: index })
            } else {
                /** 找到了，删除对应的值 */
                delete index[k]
                // index.splice(k, 1)
                multiVal.splice(n, 1)
                let sz = []
                for (const value of multiVal) {
                    sz.push(value[dataOption.value])
                }
                this.setState({ value: sz.join(';'), index: index })
            }
            if (this.search) {
                this.search.focus()
            }
            if (this.props.onClick) {
                this.props.onClick(multiVal, this.props)
            }
        }
    }
    /** 点击多选X */
    onTagClick = (t, v, k) => {
        let { multiVal, index } = this.state
        let { dataOption } = this.props
        multiVal.splice(k, 1)
        for (let i = 0;i < index.length; i++) {
            if ((index[i] || index[i] === 0) && index[i].key === v[dataOption.key]) {
                delete index[i]
                // index.splice(i, 1)
                break
            }
        }
        this.setState({ multiVal: multiVal, index: index })
        if (this.props.onClick) {
            this.props.onClick(multiVal, this.props)
        }
        t.stopPropagation()
    }
    /**
     * 筛选
     */
    onSearch = (v) => {
        let val = v.target.value
        let data = this.state.data
        let dataOption = this.props.dataOption
        let searchData = []
        let searchDataLh = 0
        for (const value of data) {
            if (value[dataOption.value].indexOf(val) !== -1 ||
                (dataOption.inputCode && value[dataOption.inputCode].toLowerCase().indexOf(val.toLowerCase()) >= 0)) {
                searchData.push(value)
                searchDataLh++
            } else {
                searchData.push(false)
            }
        }
        if (this.props.isSaveSearch) {
            this.props.onClick(val, this.props)
        }
        this.setState({ searchData: searchData, searchDataLh: searchDataLh, searchValue: val, keyboardIndex: -1 })
    }
    /** 清空（仅限单选模式） */
    clear = () => {
        this.setState({
            value: '',
            searchValue: ''
        })
        this.props.onClick('', this.props)
    }

    /** 重新取得数据 */
    callData() {
        if (this.props.callData) {
            let {callData, isMulti, isSearch, dataOption } = this.props
            callData(this.props, (data,value?) => {
                if (flag) {
                    this.setState({ data: data || [], searchData: isSearch ? data : [] })
                    if(value){
                        this.setState({ value: value, searchValue: value })
                        if (isMulti) {
                            if (typeof (value) === 'object') { // 数据类型为数组对象
                                let inde = []
                                for(let i = 0;i < value.length;i++){
                                    let vk = value[i][dataOption.key]
                                    for(let i2 = 0;i2 < data.length;i2++){
                                        if(vk === data[i2][dataOption.key]){
                                            inde[i2] = {k:i2,key:vk}
                                            break
                                        }
                                    }
                                }
                                for(let i = 0;i<inde.length;i++){
                                    if(!inde[i]){
                                        inde[i] = false
                                    }
                                }
                                this.setState({multiVal: value, index: inde})
                            }
                        }
                    }
                }
            })
        }
    }

    /**
     * 滚动事件
     * @param {string} v
     */
    handleScroll = (v) => {
        if (this.state.open) {
            v.preventDefault()
            if (v.deltaY > 0) {
                this.ul.scrollTop += 20
                // let e = { keyCode: 40, stopPropagation:()=>null, preventDefault: ()=> null }
                // this.isKey(e)
            } else {
                this.ul.scrollTop -= 20
                // let e = { keyCode: 38, stopPropagation:()=>null, preventDefault: ()=> null }
                // this.isKey(e)
            }
        }
    }

    /**
     * JSX
     * @return *
     */
    render() {
        let {
            data, value, multiVal, open, index, searchData, keyboardIndex, maxHeight,
            popupWidht, popupTop, popupLeft, isReverse, searchValue
        } = this.state
        let { dataOption, isMulti, isSearch, isMask, className, style } = this.props
        let box = { width: popupWidht, top: popupTop, left: popupLeft }
        let ul = { maxHeight: maxHeight }
        return (
            <div ref={(x) => this.select = x} className={classnames(className, styles.select)} style={style}>
                {!isSearch ? <input ref={x => this.noSearch = x} className={styles.hide}/> : null}
                {!isMulti ? <span><input ref={(x) => this.input = x} onClick={this.isOpen} type="text"
                                         value={isMulti ? value : searchValue} onChange={this.onSearch} readOnly={!isSearch}/>
                        <i onClick={() => this.clear()}><IconFont iconName={'icon-icon'}/></i></span> :
                    <div className={styles.multi} onClick={this.isOpen}>
                        {
                            Object.keys(multiVal).map((v) =>
                                <span key={v}>
                                    <p>{multiVal[v][dataOption.value]}</p>
                                    <a onClick={(t) => this.onTagClick(t, multiVal[v], v)}>x</a>
                                </span>
                            )
                        }
                    </div>}
                {open && isMask ? <span className={styles.mask} onClick={this.isOpen}/> : null}
                {
                    open ?
                        <div ref={(x) => this.popup = x} style={box}
                             className={`${styles.box} ${isReverse ? styles.isReverse : null}`}>
                            {
                                isMulti && isSearch ?
                                    <div>
                                        <input ref={(x) => this.search = x} type="text" onChange={this.onSearch}/>
                                    </div>
                                    : null
                            }
                            <ul ref={(x) => this.ul = x} className={styles.ul} style={ul}>
                                {
                                    !isSearch ?
                                        data ? data.map((value, id) =>
                                            <li key={id} onClick={() => this.onClick(value, id)}
                                                className={
                                                    classnames(id === (index[id] ? index[id].k : -1) ? styles.active : null,
                                                        id === keyboardIndex ? styles.keyActive : null,
                                                        dataOption.disabled && !data[id][dataOption.disabled] ? styles.pointer : null)
                                                }>
                                                {
                                                    isMulti ?
                                                        <Checkbox checked={id === (index[id] ? index[id].k : -1)}
                                                                  className={styles.checkbox}/>
                                                        : null
                                                }
                                                {value[dataOption.value]}
                                            </li>
                                        ) : <li className={styles.noDrop}>暂无数据</li> :
                                        searchData && Array.from(new Set(searchData)).join() !== 'false' ?
                                            searchData.map((value, id) =>
                                                value ? <li key={id} onClick={() => this.onClick(value, id)}
                                                            className={
                                                                classnames(id === (index[id] ? index[id].k : -1) ? styles.active : null,
                                                                    id === keyboardIndex ? styles.keyActive : null,
                                                                    dataOption.disabled && !data[id][dataOption.disabled] ? styles.pointer
                                                                        : null)
                                                            }>
                                                    {
                                                        isMulti ?
                                                            <Checkbox checked={id === (index[id] ? index[id].k : -1)}
                                                                      className={styles.checkbox}/>
                                                            : null
                                                    }
                                                    {value[dataOption.value]}
                                                </li> : null
                                            ) : null
                                }
                            </ul>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}
