import React from 'react'
import classnames from 'classnames'
import { HintInput, Props as HintInputProps } from 'pkg/common/input'
import styles from './style/index.scss'
import { Label } from 'pkg/common/label'

interface InfoItemProps extends HintInputProps {
    /** label标签值 */
    labelVal?: string
    /** 是否显示星号 */
    asterisk?: boolean
    /** 顶层容器类名 */
    infoItemClass?: string
    /** label标签容器类名 */
    labelClass?: string
    /** 输入框容器类名 */
    inputClass?: string
    /** 单位值 */
    unitVal?: string
    /** 宽度 */
    width?: string | number
}

export class InfoItem extends React.Component<InfoItemProps, any> {
    static defaultProps = {
        asterisk: false
    }

    render() {
        const {
            labelVal,
            asterisk,
            infoItemClass,
            labelClass,
            inputClass,
            unitVal,
            width,
            ...rest
        } = this.props

        const rootClasses = classnames(
            {
                [`${styles.root}`]: true,   // 默认样式
                [`${styles.signItemRoot}`]: !!unitVal // 带单位样式
            },
            infoItemClass
        )

        const labelClasses = classnames(
            {
                [`${styles.itemLabel}`]: true,
                [`${styles.signItemLabel}`]: !!unitVal  // 带单位样式
            },
            labelClass
        )

        const inputClasses = classnames(
            [`${styles.itemInput}`],
            inputClass
        )

        return (
            <div
                className={rootClasses}
            >
                <div className={labelClasses}>
                    <Label asterisk={asterisk}>{labelVal}</Label>
                </div>
                <div className={inputClasses}>
                    <HintInput
                        {...rest}
                        style={{ width: `${width}` }}
                    />
                </div>
                {
                    unitVal &&
                    <div className={styles.signUnit}>{unitVal}</div>
                }
            </div>
        )
    }
}