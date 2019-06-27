import * as React from 'react'
import { CheckboxProps } from 'antd/lib/checkbox/Checkbox'

export interface Props extends CheckboxProps {

}

export class Button extends React.Component<Props, {}> {
    render() {
        const { value } = this.props
        return (
            <label className="ant-radio-button-wrapper">
                            <span className="ant-radio-button">
                                <input type="checkbox" className="ant-radio-button-input"
                                       value={value}/>
                                <span className="ant-radio-button-inner"/>
                            </span>
                <span>{this.props.children}</span>
            </label>
        )
    }
}