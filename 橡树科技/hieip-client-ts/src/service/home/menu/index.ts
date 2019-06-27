import { BaseService } from 'src/tools/flux/BaseService/index'
import { routeService, RouteState } from 'service/RouteService'

export interface Menu {
    /**
     * 菜单名
     */
    name: string
    /**
     * 菜单跳转的路由
     */
    route?: keyof RouteState
    /**
     * 子菜单
     */
    children?: Array<Menu>
    /** 模块图标 */
    icon?: string
}

export interface MenuState {
    /**
     * 当前用户拥有的所有菜单
     */
    menus?: Array<Menu>
    /**
     * 当前选中的菜单集合
     */
    current?: string[]
}

class MenuService extends BaseService<MenuState> {
    routeService = routeService
    /**
     * 改变菜单
     */
    changeMenu = ({ item, key, keyPath }) => {
        this.dispatch2({ current: [key] })
        routeService.push(key)
    }
    setMenus = (menus: Array<Menu>) => {
        this.dispatch2({ menus: menus })
    }
}

export const menuService = new MenuService('menu')