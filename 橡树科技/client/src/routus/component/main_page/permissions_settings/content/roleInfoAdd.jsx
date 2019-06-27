/**
 * description:角色信息新增
 * author: mou
 * time:2018-1-18
 */
import React from 'react'
import {Input, InputNumber} from 'antd'
import css from '../style/content/infoAdd.scss'
const InputGroup = Input.Group;
export class RoleInfoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: {}
    };
  }

  componentWillMount() {
    this.setState({
      param: this.props.param,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      param: nextProps.param
    })
  }

  onChange = (type, e) => {
    this.props.onChange(type, e)
  };

  render() {
    const {param} = this.state;
    return (<div className={css.infoAdd}>
      <Input addonBefore="编码" value={param.code} onChange={this.onChange.bind(this, 'code')}/>
      <Input addonBefore={<p><span>角色名称</span><span className={css.mast}>*</span></p>} value={param.name}
             onChange={this.onChange.bind(this, 'name')}/>
      <div className={css.flex}>
        <div>
          <p>排序号</p>
        </div>
        <InputNumber value={param.sortNo} onChange={this.onChange.bind(this, 'sortNo')}/>
      </div>
     {/* <Input addonBefore="输入码" value={param.inputCode} onChange={this.onChange.bind(this, 'inputCode')}/>*/}
    </div>)
  }
}
 
 
 