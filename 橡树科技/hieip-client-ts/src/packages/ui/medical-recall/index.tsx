import React from 'react'
import * as style from './style/index.scss'
import { Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group

export default class PartialMatchFilter extends React.Component<any, any> {
    input

    constructor(props?: any) {
        super(props)
        this.state = {
            text: []
        }
    }

    isFilterActive = () => {
        return this.state.text !== null && this.state.text !== undefined && this.state.text !== ''
    }

    doesFilterPass = (params) => {
        if (this.state.text.length === 1) {
            if (this.state.text[0] === 1) {
                return params.node.selected
            } else if (this.state.text[0] === 2) {
                return !params.node.selected
            }
        } else {
            return true
        }
    }

    onChange = (v) => {
        this.setState({
            text: v
        }, () => {
            this.props.filterChangedCallback()
        })
    }

    render() {
        const checkboxOption = [
            { label: '已选病历', value: 1 },
            { label: '未选病历', value: 2 }
        ]
        return (
            <div className={style.agTitleMenu}>
                <CheckboxGroup options={checkboxOption} onChange={this.onChange}/>
            </div>
        )
    }
}