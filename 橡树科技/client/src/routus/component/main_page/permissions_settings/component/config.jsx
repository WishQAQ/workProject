/**
 * description:权限、菜单配置
 * author: mou
 * time:2018-1-18
 */
import React from 'react'
import {Button, Checkbox, Input, Icon} from 'antd'
import css from '../style/component/config.scss'
const CheckboxGroup = Checkbox.Group;

export class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,//按钮loading状态
      data: [],
      checkedMenus: [],//菜单选中的值
      defaultMenu: '',//默认菜单
      checkedGrant: [],//权限选中的值
      defaultGrant: '',//默认权限点
    };
  }

  componentWillMount() {
    this.setState({
      rolePoints: this.props.rolePoints,
      checkedMenus: this.props.checkedMenus,
      defaultMenu: this.props.defaultMenu,
      checkedGrant: this.props.checkedGrant,
      defaultGrant: this.props.defaultGrant,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rolePoints: nextProps.rolePoints,
      checkedMenus: nextProps.checkedMenus,
      defaultMenu: nextProps.defaultMenu,
      checkedGrant: nextProps.checkedGrant,
      defaultGrant: nextProps.defaultGrant,
    })
  }

  setDefaultMenu = (type, id) => {
    this.props.setDefaultMenu(type, id);
  };
  renderDom = (dict, get, key1, key2, type) => {
    const {defaultMenu, defaultGrant} = this.state;
    let defaultValue;
    if (type === 'defaultGrant') {
      defaultValue = defaultGrant
    } else {
      defaultValue = defaultMenu
    }
    let tmp = [];
    let isCheck;
    for (let i = 0; i < dict.length; i++) {
      for (let j = 0; j < get.length; j++) {
        isCheck = false;
        if (dict[i][key1] === get[j]) {
          isCheck = true;
          break;
        }
      }
      if (isCheck) {
        tmp.push(<p className={css.bodyOne} key={i}>
          <Checkbox value={dict[i][key1]} checked={isCheck}
                    className={dict[i][key1] === defaultValue ? css.defaultCheck : null}>{dict[i][key2]}</Checkbox>
          <Button type="primary" ghost className={css.hidden}
                  onClick={this.setDefaultMenu.bind(this, type, dict[i][key1])}>
            设为默认菜单</Button></p>)
      } else {
        tmp.push(<p className={css.bodyOne} key={i}>
          <Checkbox value={dict[i][key1]}>{dict[i][key2]}</Checkbox></p>)
      }
    }
    return tmp;
  };
  onChange = (type, val) => {
    this.props.changeCheckedValue(type, val)
  };
  getFuzzyValue = (type, e) => {
    this.props.getFuzzyValue(type, e.target.value)
  };

  render() {
    const {rolePoints, checkedMenus, checkedGrant} = this.state;
    return (
      <div className={css.config}>
        <div className={css.bodyContent}>
          <p className={css.bodyTitle}>菜单</p>
          <div className={css.bodyCheck}>
            <CheckboxGroup onChange={this.onChange.bind(this, 'checkedMenus')} value={checkedMenus}>
              <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyMenu}/>}
                     onChange={this.getFuzzyValue.bind(this, 'menu')}/>
              {this.renderDom(rolePoints.menuDict, checkedMenus, 'id', 'name', 'defaultMenu')}
            </CheckboxGroup>
          </div>
        </div>
        <div className={css.bodyContent}>
          <p className={css.bodyTitle}>权限点</p>
          <div className={css.bodyCheck}>
            <CheckboxGroup onChange={this.onChange.bind(this, 'checkedGrant')} value={checkedGrant}>
              <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyGrant}/>}
                     onChange={this.getFuzzyValue.bind(this, 'grant')}/>
              {this.renderDom(rolePoints.grantsDict, checkedGrant, 'appCode', 'appName', 'defaultGrant')}
            </CheckboxGroup>
          </div>
        </div>
      </div>
    )
  }
}
 
 
 