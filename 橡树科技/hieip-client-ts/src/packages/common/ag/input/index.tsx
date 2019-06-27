/**
 *  封装 antd input 组件
 * Created by mod on 2017/12/5
 */

'use strict'

import React from 'react'
import { InputProps } from 'antd/lib/input/Input'
import { SearchProps } from 'antd/lib/input/Search'
import { Input as Ip } from 'antd'
import styles from './style/input.scss'

interface Verifcation {
    /** 匹配规则 */
    regex?: string
    /** 匹配错误提示信息 */
    message?: string
    /** 出发 事件  'change' | 'blur' */
    eventonver?: string
}

export interface Props extends InputProps, SearchProps {
    /** 验证规则 */
    verification?: Verifcation
    /** className */
    className?: string
    /** 值 */
    value: string
}

interface State {
    chagne: boolean
    value: string
    errflag: boolean
}

/**
 * HintInput
 */
export class HintInput extends React.Component<Props, State> {
    input = null

    constructor(args) {
        super(args)
        this.state = {
            chagne: !1,
            errflag: !1,
            value: ''
        }
        this.handChangge = this.handChangge.bind(this)
    }

    /**
     * 初始化时 value 有值移动为true
     */
    componentWillMount() {
        this.setState({ value: this.props.value })
    }

    /**
     * 渲染后
     */
    componentDidMount() {
        setTimeout(() => {
            if (this.input) {
                let input = this.input.children[0]
                input.focus()
                input.select()
                input.addEventListener('keydown', this.isKey)
            }
        }, 20)
    }

    /** AG表格接受的结果 */
    public getValue() {
        return this.state.value
    }

    /**
     * render 返回
     * @returns {any}
     */
    render(): JSX.Element {
        const { value } = this.state
        return (
            <div ref={(x) => this.input = x}>
                <Ip className={styles.input} onChange={this.handChangge} size="small" value={value}/>
            </div>
        )
    }

    /**
     * input 输入事件
     * @param e
     */
    private handChangge(e: any) {
        const { value } = e.target
        const { onChange, verification } = this.props
        if (verification) {
            if (verification.eventonver === 'change') {
                let errflag: boolean = Regex(verification.regex, value)
                if (errflag && value !== '') {
                    this.setState({ chagne: !!value, errflag })
                } else {
                    this.setState({ value: value, chagne: !!value, errflag })
                }
            } else {
                this.setState({ value: value, chagne: !!value })
            }
        } else {
            this.setState({ value: value, chagne: !!value })
        }
        if (onChange) {
            onChange(e)
        }
    }

    /**
     * 鍵盤事件
     * @param {object} event
     */
    private isKey = (event) => {
        if ([33, 34, 35, 36, 37, 39, 38, 40].indexOf(event.keyCode) > -1) {
            event.stopPropagation()
        }
    }
}

/**
 * 验证
 * @param regex
 * @param value
 * @returns {boolean}
 * @constructor
 */
function Regex(regex, value): boolean {
    return !new RegExp(regex).test(value)
}