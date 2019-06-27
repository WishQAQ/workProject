/**
 * description:菜单字典新增
 * author: mou
 * time:2018-1-18
 */
import React from 'react'
import {Input, InputNumber, Select} from 'antd'
import css from '../style/content/menuDictAdd.scss'
const Option = Select.Option;
export class MenuDictAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: {},
      menuDict: [],
    };
  }

  componentWillMount() {
    this.setState({
      param: this.props.param,
      menuDict: this.props.menuDict,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      param: nextProps.param,
      menuDict: nextProps.menuDict,
    })
  }

  onChange = (type, e) => {
    this.props.onChange(type, e)
  };

  render() {
    const {param, menuDict} = this.state;
    return (<div className={css.infoAdd}>
      <Input addonBefore={<p><span>菜单名称</span><span className={css.mast}>*</span></p>} value={param.name}
             onChange={this.onChange.bind(this, 'name')}/>
      <Input addonBefore="菜单编码" value={param.code} onChange={this.onChange.bind(this,'code')}/>
      <Input addonBefore={<p><span>URL地址</span><span className={css.mast}>*</span></p>} value={param.url}
             onChange={this.onChange.bind(this, 'url')}/>
      <div className={css.flex}>
        <div className={`${css.flex1}`}>
          <div>
            <p>排序号</p>
          </div>
          <InputNumber value={param.sortNo} onChange={this.onChange.bind(this, 'sortNo')}/>
        </div>
        <div className={`${css.flex1}`}>
          <div>
            <p>父类菜单</p>
          </div>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            dropdownClassName={css.dropMenu}
            style={{width: '100%'}}
            value={param.parentId.toString()}
            onChange={this.onChange.bind(this, 'parentId')}
          >
            {menuDict.map((menu, index) =>
              <Option value={menu.id.toString()} key={index}>{menu.name}</Option>
            )}
          </Select>
        </div>
      </div>
     {/* <Input addonBefore="输入码" value={param.inputCode} onChange={this.onChange.bind(this, 'inputCode')}/>*/}
      <Input addonBefore="图class" value={param.icon} onChange={this.onChange.bind(this, 'icon')}/>
    </div>)
  }
}
 
 
 