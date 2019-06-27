/**
 * description:权限点新增
 * author: mou
 * time:2018-1-18
 */
import React from 'react'
import {Input, Checkbox} from 'antd'
import css from '../style/content/pointAdd.scss'
const CheckboxGroup = Checkbox.Group;
const options = [
  {label: '读', value: 'read'},
  {label: '写', value: 'write'},
];
export class PointAdd extends React.Component {
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
      param: nextProps.param,
    })
  }

  onChange = (type, e) => {
    this.props.onChange(type, e)
  };

  render() {
    const {param} = this.state;
    return (<div className={css.infoAdd}>
      <Input addonBefore={<p><span>权限点前缀名称</span><span className={css.mast}>*</span></p>} value={param.className}
             onChange={this.onChange.bind(this, 'className')}/>
      <Input addonBefore={<p><span>编码</span><span className={css.mast}>*</span></p>} value={param.appCode}
             onChange={this.onChange.bind(this, 'appCode')}/>
      <Input addonBefore={<p><span>名称</span><span className={css.mast}>*</span></p>} value={param.appName}
             onChange={this.onChange.bind(this, 'appName')}/>
      <Input addonBefore="注释" value={param.comments} onChange={this.onChange.bind(this, 'comments')}/>
      <div className={css.pointCheck}>
        <Checkbox onChange={this.onChange.bind(this, 'read')} checked={param.read === '1' ? true : false}>读</Checkbox>
        <Checkbox onChange={this.onChange.bind(this, 'write')} checked={param.write === '1' ? true : false}>写</Checkbox>
      </div>
    </div>)
  }
}
 
 
 