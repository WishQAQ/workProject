/**
 * 医嘱处方专用checkbox
 */
import React from 'react'
import {CheckboxProps} from 'antd/lib/checkbox/Checkbox'
import {Checkbox as AgOrderCheck} from 'antd'

export interface CheckProps extends CheckboxProps {
  /**
   * 传入的类名
   */
  className?: string
  /**
   * 自带选中事件
   */
  onChoose?: (check: boolean, params: object) => void
}

export interface CheckState {
  check: boolean
}

export class AgOrderCheckBox extends React.Component<CheckProps, CheckState> {
  constructor(props) {
    super(props)
    this.state = {
      check: false, // 选中状态
    }
  }

  componentWillMount() {
    this.setState({check: this.props.value})
  }

  /**
   * 选中返回数据
   * @param e - event
   * @param params - 表格参数
   */
  choose = (e, params) => {
    if (this.props.onChoose) {
      this.props.onChoose(e.target.checked, params)
    }
    this.setState({check: e.target.checked})
  }

  render() {
    let {className, ...rest} = this.props
    let {check} = this.state
    return (
      <AgOrderCheck
        className={className}
        onChange={(e) => {
          this.choose(e, this.props)
        }}
        checked={check}
        {...rest}
      />
    )
  }
}