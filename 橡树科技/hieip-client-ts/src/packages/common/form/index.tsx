import React, { ComponentClass } from 'react'
import { Form } from 'antd'
import { Map } from 'immutable'
import { FormComponentProps } from 'antd/lib/form'
import classNames from 'classnames'
import { ValidateCallback } from 'antd/es/form'
import { GetFieldDecoratorOptions } from 'antd/es/form/Form'

export interface FormItem extends GetFieldDecoratorOptions {
    name?: string
    elementName: ComponentClass<any>
    elementProps: any
}

interface FormProps extends FormComponentProps {
    className?: string
    item: Array<Array<FormItem>>
    onSubmit?: (err: any, value: any) => void
}

class IForm extends React.Component<FormProps> {
    shouldComponentUpdate(nextProps: FormProps) {
        return Map(nextProps) !== Map(this.props)
    }

    render() {
        const { form, className, item } = this.props
        const { getFieldDecorator } = form
        return (
            <Form onSubmit={this.handleSubmit} className={classNames('i-form', className)}>
                {item.map((v, i) => (
                    <Form.Item key={i}>
                        {v.map((vv, ii) => {
                            vv.elementProps.key = i * 100 + ii
                            if (vv.name) {
                                return getFieldDecorator(vv.name, vv)(
                                    React.createElement(vv.elementName, vv.elementProps)
                                )
                            } else {
                                return React.createElement(vv.elementName, vv.elementProps)
                            }
                        })}
                    </Form.Item>
                ))}
            </Form>
        )
    }

    private handleSubmit = (e) => {
        e.preventDefault()
        const { form, onSubmit } = this.props
        form.validateFields((err, values) => {
            if (onSubmit) {
                onSubmit(err, values)
            }
        })
    }

    private validateFields(callback: ValidateCallback) {
        this.props.form.validateFields(callback)
    }
}

export default Form.create()(IForm)