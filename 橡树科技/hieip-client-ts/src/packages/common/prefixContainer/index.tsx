/**
 *
 * 带前缀单选框
 *
 */

import React from 'react'
import classnames from 'classnames'
import styles from './style/index.scss'

interface RadioPrefixProps {
    /** 外层容器样式 */
    style?: React.CSSProperties
    /** 前缀值 */
    prefixVal?: string
    /** 外层容器类名 */
    className?: string
    /** 前缀容器类名 */
    prefixClassName?: string
    /** 单选框容器类名 */
    radioClassName?: string
}

export class PrefixContainer extends React.Component<RadioPrefixProps, any> {
    render() {
        const { prefixVal, className, prefixClassName, radioClassName } = this.props

        const rootClasses = classnames(
            [styles.readioPrefix],
            className
        )

        const prefixClasses = classnames(
            [styles.prefix],
            prefixClassName
        )

        const componentClasses = classnames(
            [styles.component],
            radioClassName
        )

        return (
            <div className={rootClasses}>
                <span className={prefixClasses}>{prefixVal}</span>
                <span className={componentClasses}>
          {this.props.children}
        </span>
            </div>
        )
    }
}