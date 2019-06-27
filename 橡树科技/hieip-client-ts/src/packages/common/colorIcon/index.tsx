import React from 'react'
import css from './style/colorIcon.scss'
import 'oak-icon/index.js'
import classNames from 'classnames'

export interface ColorProps {
    /**
     * 图标名称
     */
    iconName: string
    /**
     * 样式
     */
    className?: string
}

export class ColorIcon extends React.Component<ColorProps> {
    render() {
        let { iconName, className } = this.props
        return (
            <div className={classNames(className, css.iconContainer)}>
                <svg className={css.icon} aria-hidden="true">
                    <use xlinkHref={`#${iconName}`}/>
                </svg>
            </div>
        )
    }
}