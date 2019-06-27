/**
 * 封装antd input 组件成一个只能输入正数的组件
 * create by wx 2018.01.18
 */
'use strict'
import * as React from 'react'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input/Input'
import { SearchProps } from 'antd/lib/input/Search'
import classNames from 'classnames'

export interface Props extends InputProps, SearchProps {
    classname1?: string,
    isfloat?: boolean // 是否是小数
}

export class NumberInput extends React.Component<Props, any> {
    onChange = (e) => {
        const { value } = e.target
        let reg = /^[1-9]\d*$/
        if (this.props.isfloat) reg = /^([1-9]\d*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '') {
            this.props.onChange(value)
        }
    }

    onBlur = (e) => {
        const { value, onBlur, onChange } = this.props
        if (value) {
            if (value.toString().charAt(value.length - 1) === '.') {
                onChange(value.slice(0, -1))
            }
        }
        if (onBlur) {
            onBlur(e)
        }
    }

    render() {
        const { classname1 } = this.props
        const rest: Props = Object.assign({}, this.props)
        delete rest.isfloat
        delete rest.classname1
        return (
            <div className={classNames(classname1)}>
                <Input {...rest}
                       onChange={this.onChange}
                       onBlur={this.onBlur}/>
            </div>
        )
    }
}