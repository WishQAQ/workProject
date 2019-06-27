import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import jquery from 'jquery'
import styles from './style/select.scss'
import {isCombinedNodeFlagSet} from 'tslint'

export interface TimeinputProps {
    value: Date | string
    onChange: (e: Date) => void
    open: boolean
}

export interface TimeinputState {
    v: string
    val: Val
    show: boolean
    top: number
    left: number
    dropWidth: number
}

interface Val {
    value1: string
    value2: string
    value3: string
}

/**
 * 时间输入框
 */
export class Timeinput extends React.Component<TimeinputProps, TimeinputState> {
    input1: any
    input2: any
    input3: any
    h: Array<string | number> = []
    m: Array<string | number> = []
    s: Array<string | number> = []
    box: any
    /**
     * constructor
     * @param {object} args
     */
    constructor(props) {
        super(props)
        this.state = {
            v: '',
            val: {
                value1: '', value2: '', value3: ''
            },
            show: false,
            top: 0,
            left: 0,
            dropWidth: 0
        }
    }
    /** 渲染前执行 */
    componentWillMount() {
        this.wpl()
        for (let i = 0; i < 60; i++) {
            if (i < 24) {
                if (i < 10) {
                    this.h.push(`0${i}`)
                } else {
                    this.h.push(i)
                }
            }
            if (i < 10) {
                this.m.push(`0${i}`)
                this.s.push(`0${i}`)
            } else {
                this.m.push(i)
                this.s.push(i)
            }
        }
    }
    /** 渲染后执行 */
    componentDidMount() {
        setTimeout(() => {
            this.position()
            if (this.props.open) {
                this.setState({ show: true })
                this.input1.focus()
            }
        }, 150)
    }
    /** props发生改变 */
    componentWillReceiveProps(props) {
        this.wpl(props)
    }
    /** will和props统一方法 */
    wpl(props?) {
        let prop = props || this.props
        let value = prop.value
        let sp = null
        let { val } = this.state
        if (typeof (value) === 'object') {
            let m = moment(value).format('HH:mm:ss')
            sp = m.split(':')
        } else {
            if(value){
                sp = value.split(':')
            }
        }
        if (sp) {
            val.value1 = sp[0] || '00'
            val.value2 = sp[1] || '00'
            val.value3 = sp[2] || '00'
            this.setState({ val: val })
        }else {
            val.value1 = ''
            val.value2 = ''
            val.value3 = ''
            this.setState({ val: val })
        }
    }
    /** 改变下拉定位 */
    position() {
        let box: any = document.getElementsByClassName(styles.box)[0]
        if (box) {
            let dropWidth = box.clientWidth
            let left = jquery(box).offset().left
            let top = jquery(box).offset().top
            let height = box.clientHeight
            let documentHeight = window.outerHeight
            if (documentHeight - top - height < 150) {
                this.setState({ top: top - 150 - height + 3, left: left, dropWidth: dropWidth + 5 })
            } else {
                this.setState({ top: top + 5, left: left, dropWidth: dropWidth + 5 })
            }
        }
    }
    /** 改变光标位置 */
    sectionChange(obj, spos, end?) {
        var tobj: any = obj
        if (spos < 0) {
            spos = tobj.value.length
        }
        if (tobj.setSelectionRange) {
            setTimeout(() => {
                tobj.setSelectionRange(spos, end || spos)
                tobj.focus()
            }, 10)
        }
    }
    /** 获取焦点方法 */
    onFocus(e) {
        this[e].select()
        this.setState({ show: true })
        this.position()
    }
    /** 失去焦点方法 */
    onBlur(e, v) {
        let { val } = this.state
        if (val[v] === '') {
            val[v] = '00'
            this.setState({ val: val })
        } else if (v === 'value1') {
            if (parseInt(val[v], 10) >= 24) {
                val[v] = '23'
                this.setState({ val: val })
            } else if (parseInt(val[v], 10) < 0) {
                val[v] = '00'
                this.setState({ val: val })
            }
        } else {
            if (parseInt(val[v], 10) >= 60) {
                val[v] = '59'
                this.setState({ val: val })
            } else if (parseInt(val[v], 10) < 0) {
                val[v] = '00'
                this.setState({ val: val })
            }
        }
        this.setState({ val: val })
    }
    /** 键盘up事件 */
    onKeyUp(e, v) {
        let code = e.keyCode
        let input = this[v]
        let selectionStart = input.selectionStart
        let selectionEnd = input.selectionEnd
        let val = v.charAt(v.length - 1)
        switch (code) {
            case 35: {
                this.sectionChange(this.input3, this.input3.value.length)
                break
            }
            case 36: {
                this.sectionChange(this.input1, 0)
                break
            }
            case 8:
            case 37: {
                if (selectionStart === 0 && val !== '1') {
                    let vl = `input${parseInt(val, 10) - 1}`
                    let ip = this[vl]
                    this.sectionChange(ip, ip.value.length)
                }
                break
            }
            case 39: {
                if (selectionStart === input.value.length && val !== '3') {
                    let vl = `input${parseInt(val, 10) + 1}`
                    let ip = this[vl]
                    this.sectionChange(ip, 0)
                }
                break
            }
            default: {
                if ((selectionStart === selectionEnd && selectionEnd === 2)) {
                    if (val !== '3') {
                        let vl = `input${parseInt(val, 10) + 1}`
                        this[vl].focus()
                        return
                    }
                }
                break
            }
        }
    }
    /** 改变值事件 */
    onChange(e, v) {
        let { val } = this.state
        if(/^[0-9]{0,2}$/.test(e.target.value)){
            val[v] = e.target.value
            this.setState({ val: val })
            if (this.props.onChange) {
                let d = moment(this.props.value).format('YYYY-MM-DD')
                let date = `${d} ${val.value1 || '00'}:${val.value2 || '00'}:${val.value3 || '00'}`
                this.props.onChange(moment(date).toDate())
            }
        }
    }
    /** 点击下拉选项 */
    clickDropTime(v, e) {
        let { val } = this.state
        val[e] = v
        this.setState({ val: val })
        if (this.props.onChange) {
            let d = moment(this.props.value).format('YYYY-MM-DD')
            let date = `${d} ${val.value1 || '00'}:${val.value2 || '00'}:${val.value3 || '00'}`
            this.props.onChange(moment(date).toDate())
        }
    }
    /** ag表格显示的值 */
    getValue() {
        let { val } = this.state
        let d = moment(this.props.value).format('YYYY-MM-DD')
        let date = `${d} ${val.value1 || '00'}:${val.value2 || '00'}:${val.value3 || '00'}`
        return moment(date).toDate()
    }
    
    /**
     * render
     * @return {XML}
     */
    render() {
        let { val, show, top, left, dropWidth } = this.state
        return (
            <div ref={x => this.box = x} className={styles.box}>
                <input
                    ref={x => this.input1 = x}
                    type="text"
                    maxLength={2}
                    value={val.value1}
                    onChange={(e) => this.onChange(e, 'value1')}
                    onFocus={() => this.onFocus('input1')}
                    onBlur={() => this.onBlur('input1', 'value1')}
                    onKeyUp={(e) => this.onKeyUp(e, 'input1')}
                />
                <a>:</a>
                <input
                    ref={x => this.input2 = x}
                    type="text"
                    maxLength={2}
                    value={val.value2}
                    onChange={(e) => this.onChange(e, 'value2')}
                    onFocus={() => this.onFocus('input2')}
                    onBlur={() => this.onBlur('input2', 'value2')}
                    onKeyUp={(e) => this.onKeyUp(e, 'input2')}
                />
                <a>:</a>
                <input
                    ref={x => this.input3 = x}
                    type="text"
                    maxLength={2}
                    value={val.value3}
                    onChange={(e) => this.onChange(e, 'value3')}
                    onFocus={() => this.onFocus('input3')}
                    onBlur={() => this.onBlur('input3', 'value3')}
                    onKeyUp={(e) => this.onKeyUp(e, 'input3')}
                />
                {show ? <div className={styles.dropDown} style={{ top: `${top} px`, left: `${left} px`, width: `${dropWidth} px` }}>
                    <ul>
                        {
                            this.h.map((v, k) =>
                                <li key={k} onClick={() => this.clickDropTime(v, 'value1')}>{v}</li>
                            )
                        }
                    </ul>
                    <ul>
                        {
                            this.m.map((v, k) =>
                                <li key={k} onClick={() => this.clickDropTime(v, 'value2')}>{v}</li>
                            )
                        }
                    </ul>
                    <ul>
                        {
                            this.s.map((v, k) =>
                                <li key={k} onClick={() => this.clickDropTime(v, 'value3')}>{v}</li>
                            )
                        }
                    </ul>
                </div> : null}
            </div>
        )
    }
}
