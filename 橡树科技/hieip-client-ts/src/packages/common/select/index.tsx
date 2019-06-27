import * as React from 'react'
import * as PropTypes from 'prop-types'
import classnames from 'classnames'
import {Select as AntdSelect} from 'antd'
import {OptGroupProps as AntdOptGroupProps, OptionProps as AntdOptionProps, SelectProps as AntdSelectProps} from 'antd/lib/select'

import * as styles from './style/select.scss'

const Option = AntdSelect.Option
const OptGroup = AntdSelect.OptGroup

interface DataVal {
    indexCode: string | number
    value: string | number
    id?: string | number
}

/**
 *
 * selectProps接口
 *
 */
export interface SelectProps extends AntdSelectProps {
    data?: any
    dataOption?: any
    maxTagCount?: number
    maxTagPlaceholder?: string
}

/**
 *
 * OptionProps接口
 *
 */
export interface OptionProps extends AntdOptionProps {
    value?: any
    title?: string
    disabled?: boolean
    children?: React.ReactNode
}

/**
 *
 * OptionGroup接口
 *
 */
export interface OptGroupProps extends AntdOptGroupProps {
    label: React.ReactNode | string
    key: string
}

const SelectPropTypes = {
    data: PropTypes.any,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    showSearch: PropTypes.bool,
    notFoundContent: PropTypes.any,
    optionLabelProp: PropTypes.string,
    optionFilterProps: PropTypes.string,
    transitionName: PropTypes.string,
    placeholder: PropTypes.string,
    filterOption: PropTypes.func
}

/**
 *
 * 下拉单选，多选组件
 *
 */
export class Select extends React.Component<SelectProps, any> {
    static Option = Option as React.ClassicComponentClass<OptionProps>
    static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>
    static propTypes = SelectPropTypes
    static defaultProps = {
        showSearch: false,
        notFoundContent: '未查找到数据',
        optionFilterProps: 'children',
        filterOption: (input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) !== -1
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    filter = (data) => {
        if (data && Object.prototype.toString.call(data) !== '[object Array]') {
            let newData = []
            let indexData = Object.keys(data)
            for (let i = 0, len = indexData.length; i <= len; i++) {
                if (Object.prototype.toString.call(data[indexData[i]]) === '[object Object]') {
                    newData.push(data[indexData[i]])
                }
            }
            this.setState({data: newData})
        }else{
            this.setState({
                data:data
            })
        }
    }

    componentWillMount() {
        let {data} = this.props
        this.filter(data)
    }

    componentWillReceiveProps(props) {
        let {data} = props
        this.filter(data)
    }

    render() {
        const {...rest} = this.props
        let {dataOption} = rest
        let {data} = this.state

        const selectClassnames = classnames({
            [`${styles.root}`]: true
        }, this.props.className)

        if (data && data.length !== 0) {
            return (
                <AntdSelect
                    {...rest}
                    className={selectClassnames}
                >
                    {
                        !dataOption ?
                            data.map((item, key) => {
                                return (
                                    <Option
                                        key={key}
                                        value={item}
                                        title={item}
                                    >
                                        {item}
                                    </Option>
                                )
                            }) :
                            Object.keys(data).map(item => {
                                return (
                                    <Option
                                        key={item}
                                        value={data[item][dataOption.key]}
                                        title={data[item][dataOption.value]}
                                    >
                                        {data[item][dataOption.value]}
                                    </Option>
                                )
                            })
                    }
                </AntdSelect>
            )
        } else {
            return (
                <AntdSelect
                    {...rest}
                    className={selectClassnames}
                />
            )
        }
    }

    // filterOption={data ? (input, option: any) => {
    //           if (data[option.key].inputCode) {
    //             return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //               || data[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //           } else {
    //             return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //           }
    //         } : false}
}
