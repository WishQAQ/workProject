import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/es/form/Form'

type gender = 'male' | 'female' | 'unKnown'

export interface FormItem extends GetFieldDecoratorOptions {
    [propName: string]: any
}

export interface InfoFormProps extends FormComponentProps {
    className?: string
    formItem?: Array<FormItem>

    [propName: string]: any
}

export interface SickInfoType {
    [propName: string]: any
}