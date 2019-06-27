import { config } from 'tools/config'
import { ApiUtil } from './ApiUtil'
import { HomeService } from 'service/home'
import { loginService } from 'service/user/login'

class BaseApi {
    private host

    constructor(host) {
        this.host = host
    }

    connection<T>(method: string, baseUrl: string, url: string, body: any): Promise<T> {
        const headers: Headers = new Headers()
        if (HomeService.isLogin())
            headers.set('token', loginService.state.token)
        headers.set('content-type', 'application/x-www-form-urlencoded;charset=utf-8')
        const args: RequestInit = { method, headers }
        if (method === 'GET' || method === 'HEAD') {
            url = url + '?' + ApiUtil.formatBody(body)
        } else {
            args.body = ApiUtil.formatBody(body)
        }
        return new Promise((resolve, reject) => {
            window.fetch(`${this.host}${baseUrl}${url}`, args).then(res => {
                try {
                    let contentType = res.headers.get('content-type')
                    if (contentType && contentType.startsWith('application/json')) {
                        return res.json()
                    } else {
                        return res.text()
                    }
                } catch (e) {
                    // console.error(e)
                    return { success: false, msg: '网络繁忙，请稍候再试！', error: e }
                }
            }).then(value2 => {
                if (value2.success === true) {
                    const data = value2.data
                    if (data && value2.total) data.total = value2.total
                    resolve(data)
                } else {
                    reject(value2.msg)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export const apiUtil = new BaseApi(config.hieipServer)
export const medicalApi = new BaseApi(config.medicalServer)
export default apiUtil