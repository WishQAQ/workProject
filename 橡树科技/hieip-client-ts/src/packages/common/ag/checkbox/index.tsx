/**
 * ag用check
 * 其余专用属性为医嘱用
 */
import React from 'react'
import {CheckboxProps} from 'antd/lib/checkbox/Checkbox'
import {Checkbox as AgCheck} from 'antd'

export interface CheckProps extends CheckboxProps {
    /**
     * 传入的类名
     */
    className?: string
    /**
     * onCheck 事件
     */
    onCheck?: (key: number, row: object) => void
    /**
     * 医嘱专用判断条件 - 更改只读
     */
    data?: Order
}

/**
 * 医嘱专用判断条件 - 医嘱状态 - 更改只读
 */
export interface Order {
    orderStatus?: number
}

export interface CheckState {
    check: boolean // 是否选中
    key: number // key值
    disable: boolean // 禁用
}

export class AgCheckBox extends React.Component<CheckProps, CheckState> {
    constructor(props) {
        super(props)
        this.state = {
            check: false,
            key: 0,
            disable: false,
        }
    }

    componentWillMount() {
        this.checkedOrNot()
        this.specialCondition() // 禁用check - 医嘱专用
    }

    /**
     * 改变值 onchange事件
     * @param e
     */
    onChange = (e) => {
        this.setState({check: !this.state.check}, () => {
            let check = this.state.check
            if (check) this.setState({key: 1}, () => {
                this.backValue(this.state.key)
            })
            else this.setState({key: 0}, () => {
                this.backValue(this.state.key)
            })
        })
    }

    /**
     * 回调事件
     * @param key
     */
    backValue = (key) => {
        if (this.props.onCheck) {
            this.props.onCheck(key, this.props)
        }
    }

    /**
     * 是否通过特殊条件判断是否禁用 禁用check - 医嘱专用
     */
    specialCondition = () => {
        if (this.props.data.orderStatus) {
            if (this.props.data.orderStatus !== -1 && this.props.data.orderStatus !== 5) {
                this.setState({disable: true})
            }
            else {
                this.setState({disable: false})
            }
        }
    }

    render() {
        let {...rest} = this.props
        let {check, disable} = this.state
        return (
            <div>
                <AgCheck
                    checked={check}
                    onChange={(e) => this.onChange(e)}
                    disabled={disable}
                    {...rest}
                />
            </div>
        )
    }

    /**
     * 判断是否为选中
     */
    private checkedOrNot = () => {
        if (this.props.value === 0) {
            this.setState({check: false})
        }
        else if (this.props.value === 1) {
            this.setState({check: true})
        }
        else {
            this.setState({check: false})
        }
    }
}