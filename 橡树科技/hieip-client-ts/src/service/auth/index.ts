import { loginService, LoginState } from 'service/user/login/index'
import { BaseService } from 'tools/flux/BaseService'
import { point } from 'pkg/entity/point'
import { extend } from 'jquery'
import { Menu, menuService } from 'service/home/menu/index'
import { routeService } from 'service/RouteService'
import { menus } from 'pkg/entity/menus'
import { subMenus } from 'pkg/entity/subMenus'
import { config } from 'tools/config'
import { hash } from 'tools/hash'

export interface AuthState extends LoginState {
    userPrint?: any
}

class AuthService extends BaseService<AuthState> {
    private static defaultPoint = null
    private static defaultSubMenus = null

    resetPointKey(json) {
        const keys = Object.keys(json)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = json[key]
            if (typeof val === 'object') this.resetPointKey(val)
            else json[key] = this.hasAdmin ? true : this.state.userPrint[val] != null ? this.state.userPrint[val] : false
        }
    }

    resetSubMenus(json) {
        const keys = Object.keys(json)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = json[key]
            if (typeof val === 'object' && 'hash' in val) {
                json[key].show = this.hasAdmin ? true : this.state.userPrint[val.hash] ? this.state.userPrint[val.hash] : false
            } else if (typeof val === 'object') this.resetPointKey(val)
        }
    }

    get hasAdmin() {
        return parseInt(config.admin, 0) === hash.hashCode(loginService.state.username)
    }

    refreshMenus(menu: any) {
        const keys = Object.keys(menu)
        const menuObject = [] as Menu[]
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (key === 'icon') continue
            const val = menu[key]
            if ('hash' in val) {
                if (this.hasAdmin || this.state.userPrint[val.hash] === true) {
                    menuObject.push({
                        name: key,
                        route: val.route
                    })
                }
            } else {
                menuObject.push({
                    name: key,
                    icon: val.icon,
                    children: this.refreshMenus(val)
                })
            }
        }
        return menuObject
    }

    resetPoint(data) {
        if (!this.hasAdmin && (!data || !data.menuAndPointJson)) {
            throw Error('获取权限点失败')
        }
        this.dispatch2({ userPrint: this.hasAdmin ? {} : JSON.parse(data.menuAndPointJson.value) })
        // 初始化,第一次要设置默认权限
        if (AuthService.defaultPoint === null) {
            AuthService.defaultPoint = extend(true, {}, point)
        }
        if (AuthService.defaultSubMenus === null) {
            AuthService.defaultSubMenus = extend(true, {}, subMenus)
        }
        const copyPoint = extend(true, {}, AuthService.defaultPoint)
        this.resetPointKey(copyPoint)
        // 1.赋值权限
        extend(true, point, copyPoint)
        localStorage.setItem('point', JSON.stringify(point))
        // 2.赋值菜单
        menuService.setMenus(this.refreshMenus(menus))
        // 3. 赋值页面子菜单
        const copySubMenus = extend(true, {}, AuthService.defaultSubMenus)
        this.resetSubMenus(copySubMenus)
        // extend(true, subMenus, copySubMenus)
        // 4. 设置默认菜单路径
        routeService.push(this.hasAdmin ? 'route_new_triage' : data.menuAndPointJson.defaultMenu)
    }
}
const point2 = localStorage.getItem('point')
if (point2) {
    extend(true, point, JSON.parse(point2))
}
export const authService = new AuthService('auth')