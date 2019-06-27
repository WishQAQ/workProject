import * as React from 'react'
import classnames from 'classnames'
import { Radio } from 'antd'
import styles from './style/index.scss'

const RadioGroups = Radio.Group
const RadioButton = Radio.Button

export interface RadioGroupProps {
    data: Array<object>
    dataOption: DataOption
    value?: any
    onChange?: (val: object) => void
    className?: string
    defaultValue?: any
    size?: 'large' | 'default' | 'small'
    name?: string
    isButton?: boolean
}

export interface DataOption {
    value: string
    key: string
}

export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    onChange = (v) => {
        let data = this.props.data
        let dataOption = this.props.dataOption
        let x = data.find((val) => {
            return val[dataOption.key] === v.target.value
        })
        this.props.onChange(x)
    }

    render() {
        let { data, dataOption, value, className, defaultValue, size, name, isButton } = this.props
        return (
            <RadioGroups onChange={this.onChange} value={value} name={name}
                         className={classnames(styles.radioGroup, className)} defaultValue={defaultValue}
                         size={size}>
                {
                    !isButton ?
                        data.map((val, key) =>
                            <Radio
                                key={key}
                                name={data[key][dataOption.key]}
                                value={data[key][dataOption.key]}>
                                {data[key][dataOption.value]}</Radio>
                        ) :
                        data.map((val, key) =>
                            <RadioButton
                                key={key}
                                name={data[key][dataOption.key]}
                                value={data[key][dataOption.key]}>
                                {data[key][dataOption.value]}</RadioButton>
                        )
                }
            </RadioGroups>
        )
    }
}