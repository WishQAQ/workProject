import React from 'react'
import { IconFont, IconProps } from 'pkg/common/icon'
import { Label, LabelProps } from 'pkg/common/label'
import css from './style/iconLabel.sass'
import classNames from 'classnames'

export interface IconFontProps extends IconProps, LabelProps {
    /**
     * 显示值
     */
    values?: string
    /**
     * 预留class位
     */
    className?: string
    /**
     * 点击事件
     */
    onClick?: React.FormEventHandler<any>
    /**
     * style样式
     */
    style?: React.CSSProperties
}

export class IconLabel extends React.Component<IconFontProps> {

    handleClick = (e) => {
        const onClick = this.props.onClick
        if (onClick) {
            onClick(e)
        }
    }

    /**
     * 渲染虚拟dom
     * @return {any}
     */
    render() {
        let { iconName, hover, values, className, style } = this.props
        return (
            <div className={classNames(css.maskDiv, className, { [css.maskHover]: hover })}
                 onClick={(e) => this.handleClick(e)}
                 style={style}
            >
                <IconFont iconName={iconName}/>
                <Label>{values}</Label>
            </div>
        )
    }
}