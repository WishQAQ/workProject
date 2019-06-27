import React from 'react'
import classnames from 'classnames'
import { OptGroupProps, OptionProps, Select, SelectProps } from 'pkg/common/select'
import styles from './style/index.scss'
import { Label } from 'pkg/common/label'

export interface SelectItemProps extends SelectProps {
    /** label标签名 */
    labelVal?: string
    /** 是否显示星号 */
    asterisk?: boolean
    /** 容器类名 */
    selectItemClass?: string
    /** label标签容器类名 */
    labelClass?: string
    /** 选择框容器类名 */
    selectClass?: string
}

const Option = Select.Option
const OptGroup = Select.OptGroup

export class SelectItem extends React.Component <SelectItemProps, any> {
    static Option = Option as React.ClassicComponentClass<OptionProps>
    static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>
    static defaultProps = {
        asterisk: false,
        startColor: '#fce9ed'
    }

    render() {
        const {
            labelVal,
            asterisk,
            selectItemClass,
            labelClass,
            selectClass,
            ...rest
        } = this.props

        const rootClasses = classnames(
            [`${styles.root}`],
            selectItemClass
        )

        const labelClasses = classnames(
            [`${styles.itemLabel}`],
            labelClass
        )

        const selectClasses = classnames(
            [`${styles.itemSelect}`],
            selectClass
        )

        return (
            <div className={rootClasses}>
                <div className={labelClasses}>
                    <Label asterisk={asterisk}>{labelVal}</Label>
                </div>
                <div className={selectClasses}>
                    <Select {...rest} />
                </div>
            </div>
        )
    }
}