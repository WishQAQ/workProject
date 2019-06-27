/**
 * description: 首页
 * author: mou
 * time:  2017-11-6
 */
import React from 'react';
import {browserHistory} from "react-router";
import {Layout, Menu, Icon, Dropdown, Modal,Spin} from 'antd';
import {User} from 'core'
import eventProxy from './eventProxy'
import css from '../../less/main/main.scss'
import api from './api'
const SubMenu = Menu.SubMenu;
const {Header, Sider, Content} = Layout;
const scoreDialog = [{
  buttonStyle: {minWidth: "0", height: "30px"},
  buttonLabelStyle: {lineHeight: "30px"},
  flatButtonStyle: {lineHeight: "24px"},
  dialogTitleStyle: {padding: "3px", fontSize: "16px"},
  dialogBodyStyle: {padding: "0px", padding: "25px 10px 10px", backgroundColor: "#FFF", textAlign: 'center'},
  actionsContainerStyle: {padding: "2px", textAlign: "center", borderTop: 0},
  contentStyle: {transform: "translate(0px, 65px)"},
  style: {width: '30%'}
}];
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuIndex: this.props.children.props.location.pathname,
      roles: [],
      title: '',
      loading:false
    };
  };

  getMap = (map, menus) => {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].children && menus[i].children.length === 0) {
        map[menus[i].url] = menus[i].name
      } else {
        this.getMap(map, menus[i].children)
      }
    }
  };

  componentWillMount() {
    const roles = JSON.parse(User.getRoles());
    const menus1 = User.info().menusModel;
    let map = {};
    this.getMap(map, menus1);
    this.setState({
      menus: menus1,
      map: map,
      roles: roles,
      title: map[this.props.children.props.location.pathname]
    });
    if (this.props.children.props.location.pathname === '/regionData/eleMedical') {
      this.setState({
        collapsed: !this.state.collapsed,
      })
    }
    // 监听 msg 事件
    eventProxy.on('title', (msg) => {
      this.setState({
        title:msg
      });
    });
  }

  //收缩显示左侧菜单
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  //左侧菜单点击切换
  siderMenuClick = (item) => {
    const map = this.state.map;
    this.setState({
      title: map[item.key],
      menuIndex: item.key
    });
    console.log(item)
    browserHistory.push(item.key);
  };


  exitLogin = () => {
    Modal.confirm({
      content: '您确定要注销吗？',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        User.logout();
        browserHistory.replace("/");
      }
    });
  };
  closecan = () => {
    User.logout();
    browserHistory.replace("/");
  };
  onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
  };
  renderMenuItem = (menus) => {
    return menus.map(menu => (menu.children && menu.children.length ?
        (
          <Menu.SubMenu title={menu.name} key={menu.url}>
            {this.renderMenuItem(menu.children)}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={menu.url} title={menu.name}>
            <i className={`icon iconfont ${menu.icon} ${css.menuIcon}`}/>
            <span>{menu.name}</span>
          </Menu.Item>
        )
    ));
  };
  //得到第一个URL
  getUrl = (res, url, c) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].children && res[i].children.length === 0) {
        url[c] = res[i].url;
        c++;
      } else {
        this.getUrl(res[i].children, url, c++)
      }
    }
  };
  //切换角色
  handleMenuClick = (e) => {
    const {changeRole} = api;
    const param = {
      roleId: e.key
    };
    this.setState({
      loading:true
    });
    changeRole(param, res => {
      if(res.success){
        const data=res.data;
        if (User.login(data)) {
          let url = [];
          let map = {};
          this.getUrl(data.menusModel, url, 0);
          this.getMap(map, data.menusModel);
          this.setState({
            menus: data.menusModel,
            map: map,
            title: map[url[0]],
            menuIndex:url[0],
            loading:false
          });
          browserHistory.push(url[0]);
        }
      }else{
        this.setState({
          loading:false
        });
        console.error("response error", res);
      }
    })
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {/*  <Menu.Item>
         <a href="javascript:void (0)">修改信息</a>
         </Menu.Item>*/}
        {/*  <Menu.Item disabled>切换身份</Menu.Item>*/}
        {this.state.roles.map((role, index) =>
          <Menu.Item key={role.roleId}>
            <a href="javascript:void (0)">{role.roleName}</a>
          </Menu.Item>
        )}
      </Menu>
    );
    let {menus, title,loading} = this.state;
    return (
      <div className={css.home}>
        <Spin spinning={loading} wrapperClassName={css.homeLoading}>
        <Layout className={css.layOut}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            className={css.siderLeft}
            collapsedWidth="80"
            width="160"
            onCollapse={this.onCollapse}
          >
            <div className={css.logo}>
         {/*     <div className={`${css.logoIcon} ${this.state.collapsed ? css.logoIconSize : null}`}></div>*/}
              <div className={css.toggleIcon}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </div>
            </div>
            <Menu theme="white" mode="inline" selectedKeys={[this.state.menuIndex]}
                  onClick={this.siderMenuClick} inlineIndent="10">
              {menus.map(menu => (menu.children && menu.children.length ?
                  (
                    <Menu.SubMenu
                      title={
                        <span><Icon type={menu.icon}/><span>{menu.name}</span></span>
                      }
                      key={menu.name}
                    >
                      {this.renderMenuItem(menu.children)}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item key={menu.url} title={menu.name}>
                      <Icon type={menu.icon}/>
                      {menu.name}
                    </Menu.Item>
                  )
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header className={css.header}>
              <div className={css.title}>{title}</div>
              <div className={css.right}>
                <Dropdown overlay={menu}>
                  <a className={`ant-dropdown-link ${css.calUnderLine}`} href="javascript:void (0)">
                    <span className={css.userName}>{User.info().user.name}</span>
                    <span className={css.userImg}></span>
                  </a>
                </Dropdown>
                <i className={`icon iconfont ${css.exict}`} onClick={this.exitLogin}>&#xe626;</i>
              </div>
            </Header>
            <Content className={css.content}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
        </Spin>
      </div>
    );
  }
}