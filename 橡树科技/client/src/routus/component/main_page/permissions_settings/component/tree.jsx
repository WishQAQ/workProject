/**
 * description:权限配置内容组件
 * author: mou
 * time:2018-1-25
 */
import React from 'react'
import {Tree, Button, Modal, Input, message} from 'antd'
import classNames from 'classnames'
import css from '../style/component/tree.scss'
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
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
export class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      // checkedKeys: ['0-0-0'],
      // selectedKeys: [],
      roleVsHospital: {},//请求到的数据
      data: [],
      checkData: [],
      key: [],
      isCache: '',//是否点击了确定
      isFirst: '',//第一次点击勾选
      activeCheck: '',//当前点击的值
      searchValue: '',
      clickFont: '',//点击的文字
    };
  }

  /** render前，只执行一次 */
  componentWillMount() {
    this.setState({
      data: this.props.data,
      checkData: this.props.checkData,
      expandedKeys: this.props.checkData,
      keys: this.props.keys,
      defaultValue: this.props.defaultValue,
      autoExpandParent: true,
      isCache: this.props.isCache,
      isFirst: this.props.isFirst,
      activeCheck: this.props.activeCheck,
      clickFont:''
    })
  }

  /** 数据更新 执行 */
  componentWillReceiveProps(nextProps) {
    this.numToString(nextProps.checkData, checkData => {
      this.setState({
        data: nextProps.data,
        checkData: checkData,
        expandedKeys: checkData,
        keys: nextProps.keys,
        defaultValue: nextProps.defaultValue,
        autoExpandParent: true,
        isCache: nextProps.isCache,
        isFirst: nextProps.isFirst,
        activeCheck: nextProps.activeCheck,
        clickFont:''
      })
    });
  }

  /**
   * 把数字数组转化为string数组
   * @param checkData
   * @param callback
   */
  numToString = (checkData, callback) => {
    for (let i = 0; i < checkData.length; i++) {
      checkData[i] = checkData[i].toString();
    }
    callback(checkData)
  };

  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  /**
   * 勾选
   * @param type
   * @param checkedKeys
   */
  onCheck = (type, checkedKeys) => {
    const {isCache, isFirst} = this.state;
    if (type === 'checkRoles') {
      //不是第一次点击并且没有点击确定
      if (!isCache && !isFirst) {
        const react = this;
        confirm({
          content: '您确定要不保存之前配置的权限和菜单吗？',
          onOk(){
            react.props.changeIsCache(true);
          },
          onCancel(){
            checkedKeys.splice(checkedKeys.length - 1, 1);
            react.props.getCheckValues(type, checkedKeys, 'sure');
          }
        });
      } else {
        this.props.getCheckValues(type, checkedKeys);
      }
    } else {
      this.props.getCheckValues(type, checkedKeys);
    }
  };
  onSelect = (selectedKeys, info) => {
    this.setState({selectedKeys});
  };
  /**
   * 渲染dom
   * @param data
   */
  renderTreeNodes = (data) => {
    const {keys, checkData, defaultValue, activeCheck, searchValue, clickFont} = this.state;
    let index, beforeStr, afterStr;
    return data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode title={item[[keys[1]]]} key={item[keys[0]].toString()}
                    dataRef={item}>
            {item.children && this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      let key = item[keys[0]];
      let name = item[[keys[1]]];
      let buttonText = this.setButtonText();
      let isFuzzy;
      if (keys[2] === 'defaultMenu') {
        isFuzzy = (searchValue !== '') && (item.name.indexOf(searchValue) > -1);
        if (isFuzzy) {
          index = item.name.indexOf(searchValue);
          beforeStr = item.name.substr(0, index);
          afterStr = item.name.substr(index + searchValue.length);
        }
      }

      if (checkData.indexOf(key.toString()) === -1) {
        if (isFuzzy) {
          return <TreeNode title={<span><span onClick={this.getValue.bind(this, keys[keys.length - 1],key)}>{beforeStr}<span
            style={{color: '#f50'}}>{searchValue}</span>{afterStr}</span></span>}
                           key={key.toString()} className={css.one}/>;
        } else {
          return <TreeNode title={<span><span onClick={this.getValue.bind(this, keys[keys.length - 1],key)}
                                              style={{color: clickFont === key && keys[2] === 'defaultRole' ? '#108EE9' : ''}}>{name}</span></span>}
                           key={key.toString()} className={css.one}/>;
        }
      } else {
        if (isFuzzy) {
          return <TreeNode title={<span><span onClick={this.getValue.bind(this, keys[keys.length - 1],key)}>{beforeStr}<span
            style={{color: '#f50'}}>{searchValue}</span>{afterStr}</span>
            {keys[2] !== 'defaultGrant' ? <Button type="primary" ghost className={css.defaultBtn}
                                                  onClick={this.setDefaultValue.bind(this, keys[2], key)}>{buttonText}</Button> : ''}</span>}
                           key={key.toString()}
                           className={defaultValue === key ? css.default : parseInt(activeCheck) === key ? css.active : css.one}/>;
        } else {
          return <TreeNode title={<span><span onClick={this.getValue.bind(this, keys[keys.length - 1],key)}
                                              style={{color: clickFont === key && keys[2] === 'defaultRole' ? '#108EE9' : ''}}>{name}</span>
            {keys[2] !== 'defaultGrant' ? <Button type="primary" ghost className={css.defaultBtn}
                                                  onClick={this.setDefaultValue.bind(this, keys[2], key)}>{buttonText}</Button> : ''}</span>}
                           key={key.toString()}
                           className={defaultValue === key ? css.default : parseInt(activeCheck) === key ? css.active : css.one}/>;
        }
      }
    });
  };
  /** 设置按钮文字 */
  setButtonText = () => {
    const {keys} = this.state;
    let buttonText = "";
    switch (keys[2]) {
      case 'defaultRole':
        buttonText = '设置默认角色';
        break;
      case 'defaultHospital':
        buttonText = '设置默认医院';
        break;
      case 'defaultMenu':
        buttonText = '设置默认菜单';
        break;
        /* case 'defaultGrant':
         buttonText = '设置默认权限';*/
        break;
    }
    return buttonText;
  };
  /** 点击文字获取菜单和权限 */
  getValue = (type,val) => {
    const {checkData, keys} = this.state;
    if (checkData.indexOf(val.toString()) !== -1) {
      this.setState({
        clickFont: val
      });
      this.props.getSelectCheck && this.props.getSelectCheck(type,val);
    } else {
      if (keys[keys.length - 1] === 'checkRoles')
        message.info('请先选中当前项，才能获取当前项所拥有的菜单和权限')
    }
  };
  /**
   * 设置默认选中的值
   * @param type
   * @param val
   */
  setDefaultValue = (type, val) => {
    this.props.setDefaultValue(type, val)
  };
  onChange = (e) => {
    const {data} = this.state;
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
    const {className} = this.props;
    const {data, checkData, autoExpandParent, keys, expandedKeys, searchValue} = this.state;
    return (
      <div>
        {keys[2] === 'defaultMenu' ?
          <Search onChange={this.onChange.bind(this)} className={css.searchInput} value={searchValue}/> : ''}
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={keys[2] === 'defaultMenu' ? expandedKeys : checkData}
          autoExpandParent={autoExpandParent}
          onCheck={this.onCheck.bind(this, keys[keys.length - 1])}
          checkedKeys={checkData}
          onSelect={this.onSelect}
          selectedKeys={checkData}
          className={classNames(css.tree, className)}
        >
          {this.renderTreeNodes(data)}
        </Tree>
      </div>

    );
  }
}
 
 
 