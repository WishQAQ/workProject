/*
  create by wx 电子病历模板制作左边导航
 */
import React from 'react'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import * as style from './style/index.scss'
import { Layout, Tabs, Tree } from 'antd'
import { tplMaintenanceSliderService, TplMaintenanceSliderState } from 'service/medical/tpl-maintenance/tpl-maintenance-slider'
import debug from 'debug'
import { Tab } from '../../../../packages/ui/tab'

const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const log = debug('trace:病历:medical')
export default class TplMaintenanceSlider extends FluxComponent<TplMaintenanceSliderState> {
    title = '电子病历模板制作左边导航'
    tplMaintenanceSliderService = tplMaintenanceSliderService
    onRightClick = ({ event, node }) => {
        log('右键', event, node)
    }

    // 右键菜单点击事件
    onBigHandleClick(e, data) {
        e.stopPropagation()
        log(data)
    }

    /*// Menu点击切换事件
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
      if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({openKeys})
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        })
      }
    }

    // menuItem的点击事件
    onMenuItemClick(item) {
      log('menu点击事件', item.key)
    }
    // 子菜单点击事件
    onTitleClick = (item)=>{
        log('submenu点击事件读取后台数据渲染子分类', item.key)

    }*/

    /**
     * 切换大模板，小模板
     * @param key
     */
    tabsCallback(key) {
        log('模板切换值：', key)
    }

    render() {
        let { defaultActiveKey, mrTemplateClass } = this.state
        let _defaultActiveKey = defaultActiveKey ? defaultActiveKey.toString() : '1'
        let rightClickMenu = [
            {
                menuName: '新增子分类',
                menuClick: this.tplMaintenanceSliderService.onRightClick.bind(this, '新增子分类')
            },
            {
                menuName: '删除子分类',
                menuClick: this.tplMaintenanceSliderService.onRightClick.bind(this, '删除子分类')
            },
            {
                menuName: '添加模板',
                menuClick: this.tplMaintenanceSliderService.onRightClick.bind(this, '添加模板')
            },
            {
                menuName: '修改分类',
                menuClick: this.tplMaintenanceSliderService.onRightClick.bind(this, '修改分类')
            }
        ]
        return (
            <div className={style.slider}>
                <Tab
                    className={style.tabs}
                    onClick={(k) => tplMaintenanceSliderService.tabChange(k + 1)}
                    tabs={[
                        {
                            value: '大病历模板维护',
                            content: this.renderMenus(mrTemplateClass, rightClickMenu)
                        }, {
                            value: '小病历模板维护',
                            content: this.renderMenus(mrTemplateClass, rightClickMenu)
                        }
                    ]} />
                {/* <Tabs type="card" activeKey={_defaultActiveKey}
                    onChange={tplMaintenanceSliderService.tabChange}>
                    <TabPane tab={'大病历模板维护'} key={'1'}>
                        {this.renderMenus(mrTemplateClass, rightClickMenu)}
                    </TabPane>
                    <TabPane tab={'小病历模板维护'} key={'2'}>
                        {this.renderMenus(mrTemplateClass, rightClickMenu)}
                    </TabPane>
                </Tabs> */}
            </div>
        )
    }

    // 子菜单数据渲染
    renderTreeNodes = (data, rightClickMenu, root) => {
        return data && data.map((item, i) => {
            if (item.children) {
                return (
                    <TreeNode title={
                        <span>
                            <ContextMenuTrigger id={item.mrClassCode}>
                                {item.mrClassName} ({item.templateIndexCount})
                           </ContextMenuTrigger>
                            <ContextMenu id={item.mrClassCode} className={style.contextMenu}>
                                {/*判断如果是第一个菜单则不要第三个右键菜单项*/}
                                {root === 0
                                    ? this.ContextMenu(item, rightClickMenu, 2)
                                    : this.ContextMenu(item, rightClickMenu, -1)}
                            </ContextMenu>
                        </span>
                    } key={item.id.toString()} dataRef={item}>
                        {this.renderTreeNodes(item.children, rightClickMenu, 1)}
                    </TreeNode>
                )
            } else {
                return <TreeNode title={
                    <span>
                        <ContextMenuTrigger id={item.mrClassCode}>
                            {item.mrClassName} ({item.templateIndexCount})
                       </ContextMenuTrigger>
                        <ContextMenu id={item.mrClassCode} className={style.contextMenu}>
                            {root === 0
                                ? this.ContextMenu(item, rightClickMenu, 2)
                                : this.ContextMenu(item, rightClickMenu, -1)}
                        </ContextMenu>
                    </span>
                } dataRef={item} key={item.id.toString()} />
            }
        })
    }
    /*
    菜单渲染
    * */
    private renderMenus = (menu, rightClickMenu) => {
        let defaultExpandedKeys = this.state.defaultExpandedKeys
        return (
            <Layout.Sider className={style.tree}>
                <Tree showLine={true}
                    autoExpandParent={true}
                    expandedKeys={defaultExpandedKeys ? defaultExpandedKeys : []}
                    onSelect={this.tplMaintenanceSliderService.onTreeItemClick}>
                    {this.renderTreeNodes(menu, rightClickMenu, 0)}
                </Tree>
            </Layout.Sider>
        )
    }

    /**
     * 右键菜单列表
     * @returns {any[]}
     * @constructor
     */
    private ContextMenu = (item, rightMenuList, num) => {
        return rightMenuList.map((item2, j) => {
            if (j === num) return
            return (
                <MenuItem key={j} data={{ item: item, keyName: item.mrClassCode }} onClick={item2.menuClick}>
                    {item2.menuName}
                </MenuItem>
            )
        })
    }
}
