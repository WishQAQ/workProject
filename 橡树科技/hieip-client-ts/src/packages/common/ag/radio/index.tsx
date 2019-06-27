import React, {Component} from 'react'
import {Radio} from 'antd'
import {RadioGroupProps} from 'antd/lib/radio/interface'

const RadioGroup = Radio.Group

export interface AgRadio{
    value?:any,
    text?:string
}

export interface AgRadioProps extends RadioGroupProps {
    /**
     * 类名
     */
    className?: string
    /**
     * 孩子
     */
    agChildren?: Array<AgRadio>
}

export class AgRadioGroup extends Component<AgRadioProps, any> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <RadioGroup
                name={this.props.name}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
                className={this.props.className}
            >
                {
                    !this.props.agChildren ? null : (
                        this.props.agChildren === [] ? null : (
                            this.props.agChildren.map((item, key) => {
                                return (
                                    <Radio value={item.value} key={key}>{item.text}</Radio>
                                )
                            })
                        )
                    )
                }
            </RadioGroup>
        )
    }
}