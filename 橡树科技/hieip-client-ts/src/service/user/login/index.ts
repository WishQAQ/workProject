import {BaseService} from 'tools/flux/BaseService'
import {ApiUserIndex} from 'pkg/api'
import {LoginSessionDto, UserEntityUser as UserData} from 'pkg/entity/index'
import {authService} from 'service/auth'
import {HomeService} from 'service/home'
import debug from 'debug'
import {message} from 'pkg/common/message'
import {ApiSystemLogin} from 'pkg/api/medical'

const trace = debug('trace:服务:登录服务')

/**
 * 用户与密码储存接口
 */
export interface UserPass {
    /**
     * 对应用户名
     */
    key?: string
    /**
     * 对应用户密码
     */
    value?: string,
    /**
     * 对应显示的值
     */
    children?: string
}

/**
 * 登录数据接口
 */
export interface LoginState extends UserPass {
    /**
     * token
     */
    token?: string
    /**
     * 用户源数据
     */
    user?: UserData

    loginSession?: LoginSessionDto
    /**
     * 用户保存的用户密码集合
     */
    userList?: UserPass[]
    /**
     * 登录时错误消息
     */
    errorMessage?: string
    /**
     * 登录中...
     */
    logging?: boolean,
    /**
     * 用户名
     */
    username?: string,
    /**
     * 密码
     */
    password?: string,
    /**
     * 选中角色id
     */
    roleId?: string,
    /**
     * 焦点
     */
    autoFocus?: string
}

/**
 * 登录服务
 */
export class LoginService extends BaseService<LoginState> {
    defaultState = {
        username: '',
        password: '',
        autoFocus: 'userName',
        userList: [{key: '0', value: 'cq', children: 'cq'}, {key: '0', value: 'cq1', children: 'cq1'}]
    }

    lifecycleByState(state: LoginState, init) {
        trace('检查state生命周期[%s]: %o', init, state)
        const time = init ? 0 : 5000
        if (state.errorMessage) this.dispatch({errorMessage: null}, time)
        if (state.logging) this.dispatch({logging: false}, time)
    }

    /**
     * 登录方法
     * @param error
     * @param form
     * @return {Promise<void>}
     */
    login = (error, form) => {
        if (!error) {
            const {remember, username, password} = form
            if (!username || !password) {
                this.dispatch({errorMessage: '用户名和密码不能为空'})
                return
            }
            trace('用户手动登录服务器', username)
            this.dispatch({logging: true})
            // if (process.env.NODE_ENV === 'development') {
            //     if (localStorage.debug) {
            //         trace('测试模式跳过登录')
            //         return setTimeout(() => (homeService.login()), 1000)
            //     }
            // }
            return this._login(username, password, remember)
        }
    }
    /**
     * 电子病历登陆
     */
    medicalLogin = (appId,key,hospitalCode,empId) => {
         // 电子病历登陆
         if(appId && key && hospitalCode && empId ){
            return ApiSystemLogin.login(appId,key,hospitalCode,empId).then(data=>{
                HomeService.login()
                this.dispatch({user: data.user, logging: false, token: data.token, loginSession: data})
            }).catch(err=>{
                HomeService.logout()
                message.error(err)
            })
        }else{
            message.error('请输入用户名和密码')
        }
    }
    _login = (username, password, remember) => {
        return ApiUserIndex.login(username, password).then((data) => {
            trace('身份被服务器接受[%s]', username)
            // 登录成功才缓存用户信息
            HomeService.login()
            if (remember) this.saveUser(username, password)
            this.dispatch({user: data.user, logging: false, token: data.token, loginSession: data})
            authService.resetPoint(data)
            HomeService.bigWindow()
        }).catch(err => {
            trace('身份被服务器拒绝[%s]: %s', username, err.msg)
            HomeService.logout()
            this.dispatch({errorMessage: err.message || err.msg || '网络繁忙，请稍候再试！', logging: false})
            throw err
        })
    }
    /**
     * 选中默认缓冲的用户
     */
    changeUser = (value) => {
        let data = <UserPass>{}
        this.state.userList.forEach((d) => {
            if (d.value === value) {
                data = d
                return
            }
        })
        return this._login(data.value, data.key, false)
    }
    /**
     * 退出登录
     */
    logout = () => {
        HomeService.logout()
        this.dispatch2({user: <UserData>{}, loginSession: <LoginSessionDto>{}, username: '', password: '', roleId: ''})
    }
    /**
     * 角色改变重新加载
     */
    changeRole = (value) => {
        return ApiUserIndex.changeRole(value).then((data) => {
            // 重新加载权限和菜单
            authService.resetPoint(data)
            this.dispatch({loginSession: data, roleId: value})
        }).catch((err) => {
            message.error(err.message || err.msg || '网络繁忙，请稍候再试！')
            throw err
        })
    }
    /**
     * 焦点事件处理
     * @param event
     */
    onKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.dispatch({autoFocus: 'password'})
        }
    }

    /**
     * 保存用户
     * 密码暂不存储
     * @param {string}  username 对应key
     * @param {string} password 对应value
     */
    private saveUser(username: string, password: string) {
        const userList = this.state.userList
        trace('储存用户[%s]', username)
        if (userList.filter(item => item.key === username).length === 0) {
            let user = <UserPass>{key: username, value: password, children: username}
            userList.push(user)
        }
        this.dispatch({username, password, userList})
    }
}

export const loginService = new LoginService('login')
