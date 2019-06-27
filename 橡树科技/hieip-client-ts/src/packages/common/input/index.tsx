/**
 *  封装 antd input 组件
 * Created by mod on 2017/12/5
 */

'use strict'

import * as React from 'react'
import {InputProps} from 'antd/lib/input/Input'
import {SearchProps} from 'antd/lib/input/Search'
import {Icon, Input as Ip} from 'antd'
import classNames from 'classnames'
import * as css from './style/input.scss'

interface Verifcation {
    /** 匹配规则 */
    regex?: string
    /** 匹配错误提示信息 */
    message?: string
    /** 提示信息框样式 */
    style?: React.CSSProperties
    /** 出发 事件  'change' | 'blur' */
    eventonver?: string
}

interface Hintpany {
    /** 移动 label 样式 */
    style?: React.CSSProperties
    /** 移动距离 */
    movedtae?: number
}

export interface Props extends InputProps, SearchProps {
    /** 验证规则 */
    verification?: Verifcation
    /** 移动提示 */
    hintpany?: Hintpany
    /** className */
    className1?: string
    className2?: string
    /** 点击xx 回调 */
    suffixClick?: () => void
    /** 是否显示xx */
    suffixs?: boolean
    /** 文字颜色 - 生命体征用 */
    color?: string
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

    constructor(args) {
        super(args)
        this.state = {
            chagne: !1,
            errflag: !1,
            value: this.props.value || ''
        }

        this.handFous = this.handFous.bind(this)
        this.handBlur = this.handBlur.bind(this)
        this.suffixClick = this.suffixClick.bind(this)
        this.handChangge = this.handChangge.bind(this)
    }

    /**
     * 初始化时 value 有值移动为true
     */
    componentWillMount() {
        this.setState({chagne: !!this.props.value})
    }

    /** props发生改变 */
    componentWillReceiveProps(props) {
        if (this.state.value !== props.value) {
            this.setState({value: props.value, chagne: !!props.value})
        }
    }

    /**
     * render 返回
     * @returns {any}
     */
    public render(): JSX.Element {

        const {chagne} = this.state
        const {verification, hintpany, className1, className2, color} = this.props
        let labtop: number
        if (hintpany) {
            labtop = chagne ? hintpany.movedtae : 0
        }

        const args: Props = Object.assign({}, this.props)

        /**
         * 删除input 不必要的参数
         */
        delete args.verification
        delete args.hintpany
        delete args.style
        delete args.suffixs
        delete args.value
        delete args.className1
        delete args.className2
        delete args.onChange
        delete args.color
        if (hintpany) {
            delete args.placeholder
        }
        const suffix = this.props.suffixs ? this.props.value ?
            <Icon type="close-circle" onClick={this.suffixClick} style={{cursor: 'pointer'}}/> : null : null
        if (suffix) args.suffix = suffix
        return (
            <div style={{...this.props.style}} className={classNames(css.hindInput, className1)}>
                {hintpany ? <label className={css.label} style={{left: labtop, ...hintpany.style, zIndex: 5}}>
                    <span style={{verticalAlign: 'vinherit'}}>{this.props.placeholder}</span>
                </label> : null}
                <Ip onChange={this.handChangge}
                    onFocus={this.handFous}
                    onBlur={this.handBlur}
                    size="small"
                    className={className2}
                    value={this.state.value}
                    style={{color: color}}
                    {...args}
                />
                {this.state.errflag ?
                    <div className="ant-form-explain"
                         style={verification.style}>
                        {verification.message}</div>
                    : null
                }
            </div>
        )
    }

    /**
     * input 输入事件
     * @param e
     */
    private handChangge(e: any) {
        const {value} = e.target
        const {onChange, verification} = this.props
        if (verification) {
            if (verification.eventonver === 'change') {
                let errflag: boolean = Regex(verification.regex, value)
                this.setState({value: value, chagne: !!value, errflag})
            } else {
                this.setState({value: value, chagne: !!value})
            }
        }
        this.setState({value: value, chagne: !!value})
        if (onChange) onChange(e)
    }

    /**
     * input 获得焦点
     * @param e
     */
    private handFous(e: any) {
        this.setState({chagne: !0})
        const {onFocus} = this.props
        if (onFocus) onFocus(e)
    }

    /**
     * input 失去焦点
     * @param e
     */
    private handBlur(e: any) {
        const {value} = this.state
        const {onBlur, verification} = this.props
        if (verification) {
            if (verification.eventonver === 'blur') {
                let errflag: boolean = Regex(verification.regex, value)
                this.setState({value: value, chagne: !!value, errflag})
            } else {
                this.setState({value: value, chagne: !!value})
            }
        }
        this.setState({value: value, chagne: !!value})
        if (onBlur) onBlur(e)
    }

    /**
     * 清空图标
     */
    private suffixClick() {
        const {suffixClick} = this.props
        this.setState({value: ''})
        if (suffixClick) {
            suffixClick()
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