import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Checkbox as AntdCheckbox } from 'antd'
import { CheckboxProps as antdCheckboxProps } from 'antd/lib/checkbox/Checkbox'
import { CheckboxGroupProps as antdCheckboxGroupProps } from 'antd/lib/checkbox/Group'

const CheckboxGroup = AntdCheckbox.Group

export interface CheckboxProps extends antdCheckboxProps {
}

export interface CheckboxGroupProps extends antdCheckboxGroupProps {
}

const CheckboxPropTypes = {
    autoFocus: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

/**
 *
 * Checkbox多选框组件
 *
 */
export class Checkbox extends React.Component<CheckboxProps, any> {
    static Group = CheckboxGroup
    static propTypes = CheckboxPropTypes
    static defaultProps = {
        autoFocus: false,
        checked: false,
        defaultChecked: false,
        indeterminate: false
    }

    render() {
        const { ...rest } = this.props
        return (
            <AntdCheckbox
                {...rest}
            />
        )
    }
}