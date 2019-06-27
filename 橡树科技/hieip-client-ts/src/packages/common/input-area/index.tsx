/**
 * 文本域
 */
import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'

const { TextArea } = Input

export interface InputAreaProps extends TextAreaProps {
    /**
     * 样式类名
     */
    className?: string
    /**
     * 最小行
     */
    minRow?: number
    /**
     * 最大行
     */
    maxRow?: number
    /**
     * onchange
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    /**
     * placeholder
     */
    placeholder?: any
}

export interface InputAreaState {
    value: string
}

export class InputArea extends React.Component<InputAreaProps, InputAreaState> {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(next) {
        if (this.state.value !== next.value) {
            this.setState({ value: next.value })
        }
    }

    render() {
        let { className, minRow, maxRow, placeholder } = this.props
        let { value } = this.state
        return (
            <div>
        <TextArea
            className={className}
            value={value}
            autosize={{ minRows: minRow, maxRows: maxRow }}
            onChange={this.handleChange}
            placeholder={placeholder}
        />
            </div>
        )
    }

    private handleChange(e: any) {
        let { value } = e.target
        let { onChange } = this.props
        if (onChange) onChange(e)
        this.setState({ value: value })
    }
}