import React from 'react'
import {Icon, Layout, Menu} from 'antd'
import {ContextMenu, ContextMenuTrigger, MenuItem} from 'react-contextmenu'
import style from './style/index.scss'
import {bdFixedIndexService, BdFixedIndexState} from 'service/medical/bd-fixed'
import {FluxComponent} from 'tools/flux/FluxComponent'

export default class FixedValueHeader extends FluxComponent<BdFixedIndexState> {
    title = '固定值维护'
    bdFixedIndexService = bdFixedIndexService

    render() {
        const {data, openKeys} = this.state
        return (
            <div className={style.fixedValueHeader}>
                <Layout.Sider>
                    <div className={style.sliderBar}>固定值维护</div>
                    <div className={style.sliderTitle}><Icon type="file-text"/>固定值列表</div>
                    <Menu mode="inline"
                          openKeys={openKeys}
                          onOpenChange={bdFixedIndexService.onOpenChange}
                          className={style.sliderMenu}>
                        {
                            data && data.map((e: any, index) => {
                                return < Menu.SubMenu key={index}
                                                      onTitleClick={this.bdFixedIndexService.loadBdFixedInfo.bind(this, index, e.id)}
                                                      title={<span>
                                                                <ContextMenuTrigger id={e.fixedName}>
                                                                   {e.fixedName}
                                                                </ContextMenuTrigger>
                                                                <ContextMenu id={e.fixedName}>
                                                                    <MenuItem data={{key: index, name: e.fixedName}}
                                                                              onClick={bdFixedIndexService.deleteBdFixed.bind(this, e.id)}>
                                                                      删除
                                                                    </MenuItem>
                                                                  </ContextMenu>
                                                              </span>}>
                                    {
                                        e.children && e.children.map((e1, _index) => {
                                            return <Menu.Item key={_index}> {e1.name}</Menu.Item>
                                        })
                                    }
                                </ Menu.SubMenu>
                            })
                        }
                    </Menu>
                </Layout.Sider>
            </div>
        )
    }
}