import React from 'react'
import css from './style/label.sass'
import classNames from 'classnames'

export interface LabelProps {
    /**
     * 字体颜色
     */
    type?: 'primary' | 'dashed' | 'danger' | string
    /**
     * 是否显示星号
     * @default false
     */
    asterisk?: boolean
    /**
     * 星号位置 - asterisk为true生效
     * @default right
     */
    riskPosition?: 'left' | 'right'
    /**
     * class接口
     */
    className?: string
    /**
     * 样式
     */
    style?: React.CSSProperties
}

/**
 * Label公共组件
 */
export class Label extends React.Component<LabelProps> {

    componentWillReceiveProps() {
        return false
    }

    /**
     * 渲染并return element
     * @return {any}
     */
    render() {
        let { asterisk, type, riskPosition, className, style } = this.props
        let color = ''
        switch (type) {
            case 'primary':
                color = '#3db5e7'
                break
            case 'dashed':
                color = '#fa8630'
                break
            case 'danger':
                color = '#ff375b'
                break
            default:
                color = type
                break
        }
        style = { color: color, ...style }
        let pos
        switch (riskPosition) {
            case 'left':
                pos = `${css.leftStart}`
                break
            case 'right':
                pos = `${css.rightStart}`
                break
            default:
                pos = `${css.rightStart}`
                break
        }
        return (
            <span style={style} className={classNames(css.label, className)}>
                {asterisk && riskPosition === 'left' ? <i className={classNames(css.startColor, pos)}>{'*'}</i> : false}
                {this.props.children}
                {asterisk && riskPosition === 'right' || asterisk && riskPosition === undefined ?
                    <i className={classNames(css.startColor, pos)}>{'*'}</i> : false}
            </span>
        )
    }
}