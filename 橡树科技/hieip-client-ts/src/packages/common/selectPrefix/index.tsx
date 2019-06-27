/**
 *
 * create by lq
 *
 * 具有前缀的select组件
 *
 */

import React from 'react'
import classnames from 'classnames'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import styles from './style/index.scss'

interface SelectItemProps extends SelectProps {
    /** 外层容器内联样式 */
    style?: React.CSSProperties
    /** 前缀值 */
    prefixVal?: string
    /** 外层包裹容器类名 */
    className?: string
    /** 前缀容器类名 */
    prefixClassName?: string
    /** 选择器容器类名 */
    selectClassName?: string
    /** 其余props与antd Select组件一致 */
    /** 是否显示信号 */
    asterisk?: boolean
}

export class SelectPrefix extends React.Component<SelectItemProps, any> {
    render() {
        const { prefixVal, className, prefixClassName, selectClassName, asterisk,...rest } = this.props

        const rootClasses = classnames(
            [styles.selectPrefix],
            className
        )

        const prefixClasses = classnames(
            [styles.prefix],
            prefixClassName
        )

        const selectClasses = classnames(
            [styles.select],
            selectClassName
        )

        return (
            <div className={rootClasses}>
                <span className={prefixClasses}>
                    {prefixVal}
                    {asterisk ? <span className={styles.asterisk}>*</span> : false}
                 </span>
                <Select className={selectClasses} {...rest} />
            </div>
        )
    }
}