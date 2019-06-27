import {BaseService} from 'tools/flux/BaseService'
import {BrowserWindow, getMainWindow} from 'tools/window'
import {config} from 'tools/config'

export interface HomeState {
    /**
     * 当前系统版本
     */
    version?: string
}

export class HomeService extends BaseService<HomeState> {
    defaultState = {
        isLogin: false,
        version: process.env.npm_config_version || '开发版'
    }

    static smallWindow() {
        if (!BrowserWindow) return
        const win = getMainWindow()
        win.setResizable(false)
        win.setSize(config.window.minWidth, config.window.minHeight, false)
        win.center()
    }

    static isMaximized() {
        if (!BrowserWindow) return false
        const win = getMainWindow()
        return win.isMaximized()
    }

    static bigWindow() {
        if (!BrowserWindow) return
        const win = getMainWindow()
        if (win && !win.isMaximized()) {
            win.setResizable(true)
            win.setSize(window.innerWidth, window.innerHeight, false)
            win.center()
            win.maximize()
        }
    }

    static isLogin() {
        return !!sessionStorage.getItem('isLogin')
    }

    static login() {
        sessionStorage.setItem('isLogin', 'true')
    }

    static logout() {
        sessionStorage.removeItem('isLogin')
    }

    static minimizeWindow() {
        if (!BrowserWindow) return
        const win = getMainWindow()
        win.minimize()
    }

    serviceWillMount() {
        if (HomeService.isLogin()) {
            HomeService.bigWindow()
        } else {
            HomeService.smallWindow()
        }
    }

}

export const homeService = new HomeService('home')