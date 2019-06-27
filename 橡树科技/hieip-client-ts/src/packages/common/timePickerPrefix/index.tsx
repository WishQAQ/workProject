import React from 'react'
import classnames from 'classnames'
import { Props as TimePickerProps, TimePicker } from 'pkg/common/timePicker'
import styles from './style/index.scss'

export interface PickerPrefixProps extends TimePickerProps {
    /** 前缀值 */
    prefixVal?: string
    /** 外层包裹容器类名 */
    className?: string
    /** 前缀容器类名 */
    prefixClassName?: string
    /** 选择器容器类名 */
    timePickerClassName?: string
    /** 外层容器内联样式 */
    style?: React.CSSProperties
    /** 其余props与TimePicker一致 */

    /** 是否显示星号 */
    asterisk?: boolean
}

export class TimePickerPrefix extends React.Component<PickerPrefixProps, any> {
    render() {
        const { prefixVal, className, prefixClassName, timePickerClassName, asterisk,...rest } = this.props
        return (
            <div className={classnames(
                [styles.timePickerPrefix],
                className
            )}>
                {
                    prefixVal &&
                    <span className={classnames(
                        [styles.prefixLabel],
                        prefixClassName
                    )}>{prefixVal}{asterisk ? <span className={styles.start}>*</span> : false}</span>
                }
                <div className={classnames(
                    [styles.timePicker],
                    timePickerClassName
                )}>
                    <TimePicker {...rest} />
                </div>
            </div>
        )
    }
}