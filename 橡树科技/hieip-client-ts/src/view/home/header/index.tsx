import * as React from 'react'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { loginService, LoginState } from 'service/user/login/index'
import { menuService, MenuState } from 'service/home/menu/index'
import { HomeService } from 'service/home'
import { Logo } from 'pkg/common/logo'
import { IconFont } from 'pkg/common/icon'
import style from './style/index.scss'
import { Badge, Menu, Popover, Select } from 'antd'

const Option = Select.Option

export default class PageHeader extends FluxComponent<LoginState & MenuState> {
    title: string = '主界面head'
    loginService = loginService
    menuService = menuService

    static initMessageTitle(messageNum) {
        return (
            <Menu mode="horizontal">
                <Menu.Item>新消息()</Menu.Item>
                <Menu.Item>新警告()</Menu.Item>
                <Menu.Item>待办()</Menu.Item>
            </Menu>
        )
    }

    static initMessageContent(messages) {
        return (
            <div>11</div>
        )
    }

    renderMenuItem(menus) {
        return menus.map(menu => (menu.children ?
                (
                    <Menu.SubMenu title={menu.name} key={menu.name}>
                        {this.renderMenuItem(menu.children)}
                    </Menu.SubMenu>
                ) : (
                    <Menu.Item key={menu.route}>{menu.name}</Menu.Item>
                )
        ))
    }

    render() {
        const { loginSession, menus, current } = this.state
        const roleId = loginSession.menuAndPointJson.roleId
        const userName = loginSession.user.name
        return (
            <div className={style.header}>
                <Logo className={style.logo}/>
                <div className={style.menus}>
                    <Menu onClick={this.menuService.changeMenu} selectedKeys={current} mode="horizontal">
                        {menus.map(menu => ((menu.children && menu.children.length > 0) &&
                            (
                                <Menu.SubMenu
                                    title={
                                        <span>
                                                <IconFont iconClass={style.menuIcon}
                                                          iconName={menu.icon ? menu.icon : ''}/>
                                            {menu.name}
                                            </span>}
                                    key={menu.name}
                                    className={style.mainMenu}
                                >
                                    {this.renderMenuItem(menu.children)}
                                </Menu.SubMenu>
                            )
                        ))}
                    </Menu>
                </div>
                <div className={style.patientInfo}>
                    <div className={style.logout} title="退出登录" onClick={this.loginService.logout}>
                        <IconFont iconClass={style.fontIcon} iconName={'icon-90'}/>
                    </div>
                    <div className={style.minimize} title="最小化" onClick={HomeService.minimizeWindow}>
                        <IconFont iconClass={style.fontIcon} iconName={'icon-zuixiaohua'}/>
                    </div>
                    <div className={style.userInfo}>
                        <Select className={style.roleList} defaultValue={roleId}
                                onChange={this.loginService.changeRole}>
                            {loginSession.roleList.map(data => {
                                return data.id ? <Option key={data.id}
                                                         value={data.id.toString()}>
                                    {data.name}
                                </Option> : null
                            })}
                        </Select>
                        <Popover title={PageHeader.initMessageTitle(0)} content={PageHeader.initMessageContent('')}>
                            <Badge count={111} overflowCount={100} className={style.meesageNum}>
                                <IconFont iconName="icon-xiaoxi" iconClass={style.messageIcon}/>
                            </Badge>
                        </Popover>
                    </div>
                    <div className={style.userName} title={userName}>
                        {userName}
                    </div>
                </div>
            </div>
        )
    }
}