/**
 * 公共圆角复合组件
 */
import React from 'react'
import css from './style/rounded.sass'
import classNames from 'classnames'
// model
import { Label, LabelProps } from 'pkg/common/label'
import { Btn, Props } from 'pkg/common/button'

export interface RoundedProps extends LabelProps, Props {
    /**
     * 左侧显示的值
     */
    leftShow?: string
    /**
     * 按钮值
     */
    btnText?: string
    /**
     * 按钮事件
     */
    onClick?: React.FormEventHandler<any>
    /**
     * class接口
     */
    className?: string,
    /** 样式 */
    style?: React.CSSProperties,
}

export class Rounded extends React.Component<RoundedProps> {

    render() {
        let {
            leftShow, asterisk, riskPosition,
            btnText, onClick, className,
            style
        } = this.props
        return (
            <div className={classNames(className, css.mainRound, 'label-rounded')} style={style || {}}>
                <Label asterisk={asterisk}
                       riskPosition={riskPosition}
                       className={css.leftLabel}
                >
                    {leftShow}</Label>
                <div className={classNames(css.componentStyle)}>
                    {this.props.children}
                </div>
                {btnText ? <div className={classNames(css.rightBtn)}>
                    <Btn text={btnText} btnParam={{ onClick }}/>
                </div> : false}
            </div>
        )
    }
}