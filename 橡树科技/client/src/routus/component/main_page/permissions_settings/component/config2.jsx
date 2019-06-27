/**
 * description:权限、菜单配置
 * author: mou
 * time:2018-1-29
 */
import React from 'react'
import {Button, Input, Icon, Tree} from 'antd'
import css from '../style/component/config.scss'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children && node.children.length > 0) {
      if (node.children.some(item => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.id;
    const name = node.name;
    dataList.push({key, title: name});
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
  return dataList;
};
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
      autoExpandParent: true,
      expandedKeys: [],
      searchValue:'',
    };
  }

  componentWillMount() {
    const checkMenus = this.numToString(this.props.checkedMenus);
    const checkGrants = this.numToString(this.props.checkedGrant);
    this.setState({
      rolePoints: this.props.rolePoints,
      checkedMenus: checkMenus,
      expandedKeys: checkMenus,
      defaultMenu: this.props.defaultMenu,
      checkedGrant: checkGrants,
      defaultGrant: this.props.defaultGrant,
      autoExpandParent: true,
    })
  }

  componentWillReceiveProps(nextProps) {
    const checkMenus = this.numToString(nextProps.checkedMenus);
    const checkGrants = this.numToString(nextProps.checkedGrant);
    this.setState({
      rolePoints: nextProps.rolePoints,
      checkedMenus: checkMenus,
      expandedKeys: checkMenus,
      defaultMenu: nextProps.defaultMenu,
      checkedGrant: checkGrants,
      defaultGrant: nextProps.defaultGrant,
      autoExpandParent: true,
    })
  }

  /**
   * 把数字数组转化为string数组
   * @param checkData
   */
  numToString = (checkData) => {
    for (let i = 0; i < checkData.length; i++) {
      checkData[i] = checkData[i].toString();
    }
    return checkData;
  };
  onChange = (type, val) => {
    this.props.changeCheckedValue(type, val)
  };
  getFuzzyValue = (type, e) => {
    this.props.getFuzzyValue(type, e.target.value)
  };
  setDefaultValue = (type, id) => {
    this.props.setDefaultMenu(type, id);
  };
  /** 设置按钮文字 */
  setButtonText = (keys) => {
    let buttonText = "";
    switch (keys[2]) {
      case 'defaultMenu':
        buttonText = '设置默认菜单';
        break;
   /*   case 'defaultGrant':
        buttonText = '设置默认权限';
        break;*/
    }
    return buttonText;
  };
  /**
   * 渲染dom
   * @param data
   ** @param keys
   ** @param checkData
   ** @param defaultValue
   */
  renderTreeNodes = (data, keys, checkData, defaultValue) => {
    return data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode title={item[[keys[1]]]} key={item[keys[0]].toString()}
                    dataRef={item}>
            {item.children && this.renderTreeNodes(item.children, keys, checkData, defaultValue)}
          </TreeNode>
        );
      } else {
        let key = item[keys[0]];
        let name = item[[keys[1]]];
        let buttonText = this.setButtonText(keys);
        let isFuzzy;
        let index, beforeStr, afterStr;
        const {searchValue}=this.state;
        if (keys[2] === 'defaultMenu') {
          isFuzzy = (searchValue !== '') && (item.name.indexOf(searchValue) > -1);
          if (isFuzzy) {
            index = item.name.indexOf(searchValue);
            beforeStr = item.name.substr(0, index);
            afterStr = item.name.substr(index + searchValue.length);
          }
        }
        if (checkData.indexOf(key.toString()) === -1) {
          if(isFuzzy){
            return <TreeNode title={<span>{beforeStr}<span style={{color:'#f50'}}>{searchValue}</span>{afterStr}</span>}
                             key={key.toString()} className={css.one}/>;
          }else {
            return <TreeNode title={<span>{name}</span>}
                             key={key.toString()} className={css.one}/>;
          }
        } else {
          if(isFuzzy){
            return <TreeNode title={<span>{beforeStr}<span style={{color:'#f50'}}>{searchValue}</span>{afterStr}
              {keys[2]==='defaultMenu'?<Button type="primary" ghost className={css.defaultBtn}
                                               onClick={this.setDefaultValue.bind(this, keys[2], key)}>{buttonText}</Button>:''}</span>}
                             key={key.toString()}
                             className={defaultValue === key ? css.default : css.one}/>;
          }else {
            return <TreeNode title={<span>{name}
              {keys[2]==='defaultMenu'?<Button type="primary" ghost className={css.defaultBtn}
                                               onClick={this.setDefaultValue.bind(this, keys[2], key)}>{buttonText}</Button>:''}</span>}
                             key={key.toString()}
                             className={defaultValue === key ? css.default : css.one}/>;
          }
        }
      }
    });
  };
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = (type, checkKeys) => {
    this.props.changeCheckedValue(type, checkKeys)
  };
  onSelect = (selectedKeys, info) => {
    this.setState({selectedKeys});
  };
  onChanges = (e) => {
    const data = this.state.rolePoints.menuDict;
    const value = e.target.value;
    const dataList = generateList(data);
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, data);
      }
      return null;
    });
    expandedKeys.filter((item, i, self) => item && self.indexOf(item) === i);
    for (let i = 0; i < expandedKeys.length; i++) {
      if (expandedKeys[i] !== null && expandedKeys[i] !== undefined) {
        expandedKeys[i] = expandedKeys[i].toString();
      }
    }
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  render() {
    const {rolePoints, checkedMenus, defaultMenu, checkedGrant, defaultGrant, autoExpandParent, expandedKeys,searchValue} = this.state;
    return (
      <div className={css.config}>
        <div className={css.bodyContent}>
          <p className={css.bodyTitle}>菜单</p>
          <div className={css.bodyCheck}>
            <Search onChange={this.onChanges.bind(this)} className={css.searchInput} value={searchValue}/>
            {/*     <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyMenu}/>}
             onChange={this.getFuzzyValue.bind(this, 'menu')}/>*/}
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={this.onCheck.bind(this, 'checkedMenus')}
              checkedKeys={checkedMenus}
              onSelect={this.onSelect}
              selectedKeys={checkedMenus}
              className={css.tree}
            >
              {this.renderTreeNodes(rolePoints.menuDict, ['id', 'name', 'defaultMenu', 'checkMenus'], checkedMenus, defaultMenu)}
            </Tree>
          </div>
        </div>
        <div className={css.bodyContent}>
          <p className={css.bodyTitle}>权限点</p>
          <div className={css.bodyCheck}>
            <Input addonAfter={<Icon type="search" onClick={this.props.fuzzyGrant}/>}
                   onChange={this.getFuzzyValue.bind(this, 'grant')}/>
            <Tree
              checkable
              //onExpand={this.onExpand}
              //  expandedKeys={expandedKeys}
              // autoExpandParent={autoExpandParent}
              onCheck={this.onCheck.bind(this, 'checkedGrant')}
              checkedKeys={checkedGrant}
              onSelect={this.onSelect}
              selectedKeys={checkedGrant}
              className={css.tree}
            >
              {this.renderTreeNodes(rolePoints.grantsDict, ['appCode', 'appName', 'defaultGrant', 'checkedGrant'], checkedGrant, defaultGrant)}
            </Tree>
          </div>
        </div>
      </div>
    )
  }
}
 
 
 