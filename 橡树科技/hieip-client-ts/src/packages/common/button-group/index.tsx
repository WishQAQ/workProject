import * as React from 'react'
import { Button } from './button'

export interface Props {
    defaultValue?: Array<string>
    value?: Array<string>
    onChange?: (checkedValue: Array<string>) => void
}

export interface State {
    value?: Array<string>
    children?: any,
}

let back = []

export class ButtonGroup extends React.Component<Props, State> {
    static ButtonOne = Button

    constructor(props) {
        super(props)
        this.state = {
            value: this.check(this.props.value, this.props.defaultValue),
            children: this.props.children
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value,
            children: props.children
        })
    }

    render() {
        return (
            <div onChange={this.onClick} className="ant-btn-group">
                {this.renderChildren(this.state.children)}
            </div>
        )
    }

    /**
     * 判断是否传值
     * @param value
     * @param defaultValue
     * @returns {Array<string>}
     */
    private check(value, defaultValue) {
        let arr: Array<string>
        if (value) {
            arr = value
        } else if (defaultValue) {
            arr = defaultValue
        } else {
            arr = []
        }
        return arr
    }

    /**
     * 点击设置class和值
     * @param e
     */
    private onClick = (e: any): any => {
        let up = e.target.parentNode
        let parent = e.target.parentNode.parentNode
        up.className === 'ant-radio-button' ?
            up.className = 'ant-radio-button ant-radio-button-checked' :
            up.className = 'ant-radio-button'// 设置class
        parent.className === 'ant-radio-button-wrapper' ?
            parent.className = 'ant-radio-button-wrapper ant-radio-button-wrapper-checked' :
            parent.className = 'ant-radio-button-wrapper'// 设置class
        let value = this.state.value
        let arr = this.state.value
        if (value && value.length > 0) {
            let val: number = value.indexOf(e.target.value)
            // 判断是否包含
            // 否
            if (val === -1) {
                arr.push(e.target.value)
                // 是
            } else {
                arr.splice(val, 1)
                back.splice(back[0], 1)
            }
        } else {
            arr.push(e.target.value)
        }
        this.setState({
            value: arr
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(back)
            }
        })
    }

    private renderChildren = (props: any): any => {
        let arr = []
        let dup
        let c = 0
        if (this.state.value.length > 0) {
            for (let i = 0; i < props.length; i++) {
                dup = false
                for (let j = 0; j < this.state.value.length; j++) {
                    if (props[i].props.value === this.state.value[j]) {
                        dup = true
                        break
                    }
                }
                if (dup === true) {
                    arr.push(
                        <label className="ant-radio-button-wrapper ant-radio-button-wrapper-checked"
                               key={props[i].props.value}>
                            <span className="ant-radio-button ant-radio-button-checked">
                                <input type="checkbox" className="ant-radio-button-input"
                                       value={props[i].props.value}/>
                                <span className="ant-radio-button-inner"/>
                            </span>
                            <span>{props[i].props.children}</span>
                        </label>
                    )
                    back[c] = (props[i].props)
                    c++
                } else {
                    arr.push(props[i])
                }
            }
            return arr
        } else {
            return props
        }
    }
}