import React from 'react'
import styles from './style/index.scss'
import {Icon, Input, Menu} from 'antd'
import {ContextMenu, ContextMenuTrigger, MenuItem} from 'react-contextmenu'
import {DragMove} from 'pkg/common/dragging'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {sortListService, SortListState} from 'service/medical/keyword/sort-list'

// 导航菜单
const SubMenu = Menu.SubMenu

export default class SortListView extends FluxComponent<SortListState> {

    title = 'SortListView'
    sortListService = sortListService

    render() {

        // 解构赋值
        let {
            cruxTypes,
            updateVisible,
            addVisible,
            openKeys,
            cruxTypeEntity
        } = this.state

        // 页面生成
        return (
            <div className={styles.root}>
                {/* 头部 */}
                <div className={styles.header}>
                    <div className={styles.addSort}>
                        <h3>关键词</h3>
                        <button onClick={sortListService.handleShowAdd}>
                            <Icon type="plus" className={styles.plus}/>
                        </button>
                    </div>
                    <div className={styles.hint}>注：右键可编辑</div>
                </div>
                {/* 列表 */}
                <div className={styles.main}>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        onOpenChange={sortListService.onOpenChange}
                    >
                        {
                            cruxTypes ? (cruxTypes.map((item: any, index) => {
                                    return (
                                        <SubMenu key={item.id}
                                                 onTitleClick={sortListService.handlerRowClicked.bind(this, index, item)}
                                                 title={
                                                     <span>
                                                         <ContextMenuTrigger id={item.id.toString()}>
                                                             <div className={`well ${styles.subMenu} `}>
                                                                {item.cruxName}({item.count})
                                                             </div>
                                                         </ContextMenuTrigger>
                                                         {/* 分类名称 右键 弹出框 */}
                                                         <ContextMenu id={item.id.toString()}>
                                                            <MenuItem onClick={sortListService.handleShowAlter}>
                                                                修改
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() => sortListService.deleteCruxType(item.id)}>
                                                                删除
                                                            </MenuItem>
                                                         </ContextMenu>
                                                     </span>
                                                 }
                                        >
                                            {
                                                typeof (item.children) !== 'object' ? null : (item.children.map((value, key) => {
                                                    if (value) {
                                                        return (
                                                            <Menu.Item key={key}>
                                                                <div className="well">
                                                                    {value.name}
                                                                </div>
                                                            </Menu.Item>
                                                        )
                                                    } else
                                                        return []
                                                }))
                                            }
                                        </SubMenu>
                                    )
                                })
                            ) : null
                        }
                    </Menu>
                </div>

                {/* 添加按钮 弹出框 */}
                <DragMove
                    title="添加分类名称"
                    visible={addVisible}
                    onOk={sortListService.saveCruxType}
                    okText="保存"
                    onCancel={sortListService.handleCancelAdd}
                >
                    <div>
                        <Input placeholder="输入分类名称" value={cruxTypeEntity ? cruxTypeEntity.cruxName : ''}
                               onChange={(v) => sortListService.inputData(v.target.value, 'cruxTypeEntity', 'cruxName')}/>
                    </div>
                </DragMove>
                {/* 修改按钮 弹出框 */}

                <DragMove
                    title="修改名称"
                    visible={updateVisible}
                    onOk={sortListService.saveCruxType}
                    okText="确定"
                    onCancel={sortListService.handleCancelAlter}
                >
                    <div>
                        <Input placeholder="输入分类名称" value={cruxTypeEntity ? cruxTypeEntity.cruxName : ''}
                               onChange={(v) => sortListService.inputData(v.target.value, 'cruxTypeEntity', 'cruxName')}/>
                    </div>
                </DragMove>
            </div>
        )
    }
}