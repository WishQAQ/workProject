/**
 * 医嘱处方专用头部全选checkbox
 */
import React from 'react'
import {CheckboxProps} from 'antd/lib/checkbox/Checkbox'
import {Checkbox as AgOrderCheckHeader} from 'antd'

export interface CheckProps extends CheckboxProps {
  /**
   * 传入的类名
   */
  className?: string
  /**
   * 全选
   */
  selectAll?: (chooseAll: boolean) => void
}

export interface CheckState {
  check?: boolean // 选中
}

export class AgOrderCheckBoxHeader extends React.Component<CheckProps, CheckState> {
  constructor(props) {
    super(props)
    this.state = {
      check: false
    }
  }

  componentWillMount() {
    this.setState({check: false})
  }

  componentWillReceiveProps(next) {
    this.setState({check: next.checked})
  }

  /**
   * ag头部
   */
  selectAll = (e) => {
    if (this.props.selectAll) {
      this.props.selectAll(e.target.checked)
    }
    this.setState({check: e.target.checked})
  }

  render() {
    let {className, ...rest} = this.props
    let {check} = this.state
    return (
      <AgOrderCheckHeader
        className={className}
        onChange={(e) => {
          this.selectAll(e)
        }}
        checked={check}
        {...rest}
      />
    )
  }
}