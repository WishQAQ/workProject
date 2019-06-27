/**
 * description:左侧菜单组件
 */
import React, {Component} from "react";
import {Icon, Menu} from "antd";
const {SubMenu} = Menu;
const MenuItemGroup = Menu.ItemGroup;

export class ComponentSiderMenu extends Component {

  componentWillMount() {
    this.state = {
      keyName: this.props.keyName
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.keyName != nextState.keyName) {
      this.setState({
        keyName: nextProps.keyName
      })
    }
  }

  menuSelect = ({item, key, keyPath}) => {
    this.props.getMenuKey(key);
  }

  render() {
    let {keyName} = this.state;
    return (
      <div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[keyName]}
          defaultOpenKeys={['1']}
          onClick={this.menuSelect}
        >
          <MenuItemGroup>
            <SubMenu key="1" title={<span><Icon type="switcher"/>数据报表</span>}>
              <Menu.Item key="1-1">
                <Icon type="area-chart"/>医院费用
              </Menu.Item>
              <Menu.Item key="1-2">
                <Icon type="area-chart"/>病历详情
              </Menu.Item>
              <SubMenu key="2-0" title={<span><Icon type="switcher"/>医改统计</span>}>
                <Menu.Item key="2-1">
                  <Icon type="bar-chart"/>单机构统计
                </Menu.Item>
                <Menu.Item key="2-2">
                  <Icon type="bar-chart"/>单医院同比
                </Menu.Item>
              </SubMenu>
            </SubMenu>
          </MenuItemGroup>
        </Menu>
      </div>
    )
  }
}