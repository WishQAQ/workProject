/**
 * description:菜单权限点
 * author: mou
 * time:2018-1-19
 */
import React from 'react'
import {Button, Checkbox, Input, Icon, Modal} from 'antd'
import css from '../style/content/menuPoint.scss'
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
export class MenuPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleVsHospital: {},
      checkMenus: [],
      checkRoles: [],
      checkGrants: [],
      defaultMenu: '',
      defaultRole: '',
      defaultGrant: '',
      activeModalTab: '',
      checkVal: '',
      isCache: false,//缓存
    };
  }

  componentWillMount() {
    this.setState({
      roleVsHospital: this.props.roleVsHospital,
      checkMenus: this.props.checkMenus,
      checkRoles: this.props.checkRoles,
      checkGrants: this.props.checkGrants,
      defaultMenu: this.props.defaultMenu,
      defaultRole: this.props.defaultRole,
      defaultGrant: this.props.defaultGrant,
      activeModalTab: this.props.activeModalTab,
      checkVal: this.props.checkVal,
      isCache: this.props.isCache,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      roleVsHospital: nextProps.roleVsHospital,
      checkMenus: nextProps.checkMenus,
      checkRoles: nextProps.checkRoles,
      checkGrants: nextProps.checkGrants,
      defaultMenu: nextProps.defaultMenu,
      defaultRole: nextProps.defaultRole,
      defaultGrant: nextProps.defaultGrant,
      activeModalTab: nextProps.activeModalTab,
      checkVal: nextProps.checkVal,
      isCache: nextProps.isCache,
    })
  }

  onChange = (type, val) => {
    if (type === 'checkRoles') {
      this.props.getCheckVal(val);
      /*   const {checkVal, isCache} = this.state;
       let react=this;
       if (checkVal !== '' && !isCache) {
       confirm({
       content: '您确定不保存之前的配置吗？',
       onOk() {
       react.props.getCheckValues('checkMenus',[]);
       react.props.getCheckValues('checkGrants',[]);
       return false
       },
       onCancel(){}
       })
       }*/
    }
    /*    if (type === 'checkRoles') {
     let {checkRoles} = this.state;
     if (checkRoles && checkRoles.length) {
     let react = this;
     confirm({
     content: '你要更换设置的角色吗？',
     onOk() {
     let checkVal = [];
     let set = new Set(checkRoles);
     let tp;
     val.filter(v => {
     if (!set.has(v)) {
     tp = false;
     console.log(1);
     return checkVal = val;
     } else {
     console.log(2);
     tp = true;
     }
     });
     console.log(checkRoles,'checkRoles====');
     console.log(val,'val=====');
     if (tp) {
     let tp2;
     for (let i = 0; i < checkRoles.length; i++) {
     tp2 = false;
     for (let j = 0; j < val.length; j++) {
     if (checkRoles[i] !== val[j]) {
     tp2 = true;
     }
     }
     if (tp2) {
     checkVal.push(checkRoles[i]);
     }
     }
     }
     react.props.getCheckValues(type, val)
     },
     onCancel() {},
     });
     } else {
     this.props.getCheckValues(type, val);
     }
     } else {
     this.props.getCheckValues(type, val);
     }*/
    this.props.getCheckValues(type, val);
  };
  isCheck=(val)=>{
    this.props.getSelectCheck(val);
  };
  renderDom = (dict, get, key1, key2, type) => {
    const {defaultMenu, defaultRole, defaultGrant, checkVal} = this.state;
    let tmp = [];
    let isCheck;
    let defaultValue;
    if (type === 'defaultRole') {
      defaultValue = defaultRole
    } else if (type === 'defaultMenu') {
      defaultValue = defaultMenu
    } else {
      defaultValue = defaultGrant
    }
    if (dict && dict.length) {
      for (let i = 0; i < dict.length; i++) {
        if (get && get.length) {
          for (let j = 0; j < get.length; j++) {
            isCheck = false;
            if (dict[i][key1] === get[j]) {
              isCheck = true;
              break;
            }
          }
        }
        if (isCheck) {
          if (type === 'defaultRole') {
            tmp.push(<p className={css.bodyOne} key={i}>
              <Checkbox value={dict[i][key1]}
                        className={dict[i][key1] === defaultValue ? css.defaultCheck : dict[i][key1] !== checkVal ? css.defaultSelect : ''}/>
              <span onClick={this.isCheck.bind(this,dict[i][key1])} className={css.text}>{dict[i][key2]}</span>
              <Button type="primary" ghost className={css.hidden}
                      onClick={this.setDefaultMenu.bind(this, type, dict[i][key1])}>
                {key1 === 'hospitalNo' ? '设为默认医院' : '设为默认角色'}</Button></p>)
          } else {
            tmp.push(<p className={css.bodyOne} key={i}>
              <Checkbox value={dict[i][key1]}
                        className={dict[i][key1] === defaultValue ? css.defaultCheck : null}>{dict[i][key2]}</Checkbox>
              <Button type="primary" ghost className={css.hidden}
                      onClick={this.setDefaultMenu.bind(this, type, dict[i][key1])}>
                {type === 'defaultMenu' ? '设为默认菜单' : '设为默认权限'}</Button></p>)
          }
        } else {
          tmp.push(<p className={css.bodyOne} key={i}>
            <Checkbox value={dict[i][key1]}>{dict[i][key2]}</Checkbox></p>)
        }
      }
    }
    return tmp;
  };
  setDefaultMenu = (type, val) => {
    this.props.setDefaultValue(type, val);
  };
  getFuzzyValue = (type, e) => {
    this.props.getFuzzyValue(type, e.target.value)
  };

  render() {
    const {roleVsHospital, checkGrants, checkRoles, checkMenus, activeModalTab} = this.state;
    return (<div className={css.menuPoint}>
      {activeModalTab === 'role' ? <div className={`${css.bodyContent}`}>
        <div className={css.bodyCheck}>
          <CheckboxGroup onChange={this.onChange.bind(this, 'checkRoles')} value={checkRoles}>
            <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyRole}/>}
                   onChange={this.getFuzzyValue.bind(this, 'role')}/>
            {this.renderDom(roleVsHospital.roleDict ? roleVsHospital.roleDict.data : [], checkRoles, 'id', 'name', 'defaultRole')}
          </CheckboxGroup>
        </div>
      </div> : <div className={`${css.bodyContent}`}>
        <div className={css.bodyCheck}>
          <CheckboxGroup onChange={this.onChange.bind(this, 'checkRoles')} value={checkRoles}>
            <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyHospital}/>}
                   onChange={this.getFuzzyValue.bind(this, 'hospital')}/>
            {this.renderDom(roleVsHospital.hospitalDict ? roleVsHospital.hospitalDict.data : [], checkRoles, 'hospitalNo', 'hospitalName', 'defaultRole')}
          </CheckboxGroup>
        </div>
      </div>}
      <div className={`${css.bodyContent}`}>
        <div className={css.bodyCheck}>
          <CheckboxGroup onChange={this.onChange.bind(this, 'checkMenus')} value={checkMenus}>
            <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyMenu}/>}
                   onChange={this.getFuzzyValue.bind(this, 'menu')}/>
            {this.renderDom(roleVsHospital.menuDict.data, checkMenus, 'id', 'name', 'defaultMenu')}
          </CheckboxGroup>
        </div>
      </div>
      <div className={`${css.bodyContent}`}>
        <div className={css.bodyCheck}>
          <CheckboxGroup onChange={this.onChange.bind(this, 'checkGrants')} value={checkGrants}>
            <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyGrant}/>}
                   onChange={this.getFuzzyValue.bind(this, 'grant')}/>
            {this.renderDom(roleVsHospital.grantsDict.data, checkGrants, 'appCode', 'appName', 'defaultGrant')}
          </CheckboxGroup>
        </div>
      </div>
      {/* <div className={css.btn}>
       <Button type="primary" onClick={this.props.sure} className={css.sure}> 确定</Button>
       </div>*/}
    </div>)
  }

}
 
 
 