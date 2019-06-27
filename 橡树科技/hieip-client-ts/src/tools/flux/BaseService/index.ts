import {extend} from 'jquery'
import debug from 'debug'
import {listStore} from 'tools/flux/ListStore'
import {serviceStore} from 'tools/flux/BaseService/ServiceStore'

const trace = debug('trace:框架:BaseService')
const debugData = debug('data:框架:BaseService');

(window as any).services = serviceStore

type CallBack = () => void

/**
 * 基础service，所有service都需要继承
 */
export class BaseService<S={}> {
    static serviceInitPool = []
    static serviceInitTimer = null
    /**
     * service的类型
     */
    public type: string
    /**
     * 当前service的名字
     * 注意是异步获取
     */
    public serviceName: string
    /**
     * 默认state
     */
    private _defaultState: S = <S>{}
    private moment = false

    constructor(type: string) {
        this.type = type
        BaseService.serviceInitPool.push(() => {
            listStore.upState(this.type, extend(true, {}, this._defaultState))
            trace('执行Service初始化')
            this.initService()
            this.serviceName = (this as any).__proto__.constructor.name
            const services = (window as any).services
            services.push(this)
        })
        if (BaseService.serviceInitTimer !== null) window.clearTimeout(BaseService.serviceInitTimer)
        BaseService.serviceInitTimer = setTimeout(() => {
            const pool = BaseService.serviceInitPool
            for (let i = 0; i < pool.length; i++) {
                pool[i]()
            }
            const load = (window as any).servicesLoad
            if (typeof load === 'function') load()
        }, 0)
    }

    protected initService() {
        //
    }

    /**
     * 给外部查询对象是否是service
     * @return {boolean}
     */
    get isService() {
        return true
    }

    /**
     * 默认state设置
     * @param {S} value
     */
    protected set defaultState(value: S) {
        setTimeout(() => {
            if (trace.enabled) {
                trace('%s 设置默认 state', this.serviceName)
            }
            if (this._defaultState !== null && Object.keys(this._defaultState).length === 0) {
                this.dispatch(value)
            }
            this._defaultState = value
        }, 0)
    }

    protected serviceWillMount() {
        //
    }

    /**
     * 服务被卸载执行
     */
    protected serviceWillUnmount() {
        //
    }

    /**
     * 获取当前service的state
     * @return {S}
     * @deprecated
     */
    public getState(): Readonly<S> {
        return this.state
    }

    /**
     * 获取当前service的state
     * @return {S}
     */
    get state(): Readonly<S> {
        return listStore.getState(this.type)
    }

    /**
     * 重置当前state
     * @param {S} state
     * @param callback
     */
    protected reset(state: S = this._defaultState, callback?: () => void) {
        listStore.setState(this.type, state, callback)
        trace('%s 正在重置state', this.serviceName)
    }

    /**
     * 更新当前state
     * 提示：同一方法以及同步调用方法时，多次调用dispatch更新state只会触发一次更新
     * @param {S} state
     * @param time 延迟更新state时间
     * @param callback
     */
    protected dispatch(state: S, time?: number | CallBack, callback?: CallBack) {
        if (typeof time === 'number' && time > 0) {
            setTimeout(this.dispatch.bind(this, state), time)
            trace('%s 发起延迟state更新 %d', this.serviceName, time)
        } else {
            if (typeof time === 'function') callback = time
            listStore.upState(this.type, state, callback)
            trace('%s 合并state', this.serviceName)
            debugData('%o', state)
        }
    }

    /**
     * 更新当前state
     * 提示：同一方法以及同步调用方法时，多次调用dispatch更新state只会触发一次更新
     * @param {S} state
     * @param time 延迟更新state时间
     * @param callback
     */
    protected dispatch2(state: S, time?: number, callback?: CallBack) {
        if (typeof time === 'number' && time > 0) {
            setTimeout(this.dispatch.bind(this, state), time)
            trace('%s 发起延迟state更新 %d', this.serviceName, time)
        } else {
            if (typeof time === 'function') callback = time
            listStore.setState(this.type, Object.assign(this.state, state), callback)
            trace('%s 合并state', this.serviceName)
            debugData('%o', state)
        }
    }

    /**
     * 绑定state
     */
    public bindState(filed: keyof S, change: (filed: keyof S, ...args: any[]) => any) {
        trace('state 绑定在 %s', filed)
        return (event: any) => {
            // console.log(change,filed,'=====')
            const value = change ? change(filed, arguments) : event.value || event.target ? event.target.value : ''
            if (value) trace('被动绑定获取到新值 %s', value)
            else trace('被动绑定没有获取到新值')
            this.dispatch(<S>{[filed]: value})
        }
    }

    /**
     * 固定值等异步state任务
     */
    public stateTask(stateName: keyof S, task: Promise<any>) {
        if (this.state[stateName]) {
            return Promise.resolve(this.state[stateName])
        } else {
            return task.then(res => {
                this.dispatch(<S>{[stateName]: res})
                return res
            })
        }
    }

    /**
     * state周期检查
     * @param {S} state
     * @param {boolean} init
     */
    lifecycleByState(state: S, init: boolean) {
        //
    }

    /**
     * 服务被挂载执行
     * @private
     */
    private __serviceWillMount() {
        if (this.moment) {
            trace('%s 已经挂载', this.serviceName)
            return
        }
        trace('%s 正在挂载', this.serviceName)
        this.moment = true
        const state = this.getState()
        trace('%s 正在加载，触发state生命周期触发器', this.serviceName)
        if (!state) {
            debugData('触发state生命周期触发器失败state为空')
        }
        if (state) {
            this.lifecycleByState(state, false)
            this.serviceWillMount()
        }
    }

    private __serviceWillUnmount() {
        trace('%s 正在卸载', this.serviceName)
        this.moment = false
        this.serviceWillUnmount()
    }
}