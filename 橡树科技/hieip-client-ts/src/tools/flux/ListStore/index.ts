import {EventEmitter} from 'events'
import {extend} from 'jquery'
import {store} from 'tools/Store'
import IM from 'immutable'
import debug from 'debug'
import hash from 'object-hash'
import {isElectron} from 'tools/window'

const trace = debug('trace:框架:存储器')

class ListStore extends EventEmitter {
    private stateKey = 'state'
    private state = IM.Map<string, any>()
    private history = []
    private current = -1
    private dbReady = false
    private listenerMap = new Map<string, EventEmitter>()
    private lazyUpdateState = {}

    constructor() {
        super()
        if(!isElectron)return
        trace('新加载页面，准备恢复state')
        store.defaultDB.getItem(this.stateKey).then(state => {
            this.dbReady = true
            if (state) {
                this.state = this.state.merge(IM.Map(state))
                trace('成功恢复state')
                this.emitAllChange()
            } else {
                trace('没有state更新')
                this.emitAllChange()
            }
            this.emit('ready')
            trace('触发state就绪事件')
        })
    }

    get ready() {
        return this.dbReady
    }

    getState(type: string) {
        return this.state.get(type, {})
    }

    setState(type: string, state: any, callback?: () => void) {
        this.state = this.state.set(type, state)
        trace('暂存 %s state: %o', type, state)
        if (this.dbReady) {
            if (this.lazyUpdateState[type]) {
                window.clearTimeout(this.lazyUpdateState[type])
            }
            this.lazyUpdateState[type] = window.setTimeout(() => {
                this.lazyUpdateState[type] = undefined
                trace('添加state历史')
                this.history.push(this.state.asImmutable())
                this.current++
                trace('离线存储 %s 的 state', type)
                this.emitChange(type, callback)
                store.defaultDB.setItem(this.stateKey, this.state.toJS()).then(() => {
                    trace('成功存储 %s 的 state', type)
                }).catch(err => {
                    const json = this.state.toJS()
                    let errorCount = 0
                    trace('存储 %s 的 state 失败，原因： %s ,\n%s', type, err, JSON.stringify(json, (key, value) => {
                        const id = hash([Date.now(), Math.random()])
                        if (!value) return value
                        if (Array.isArray(value)) return value
                        if (typeof value === 'function') {
                            trace('[' + id + '] error function: %o', value)
                            errorCount++
                            return '查找到一个方法在state里对应id：' + id
                        }
                        if (typeof value === 'object' && value.__proto__.constructor.name !== 'Object') {
                            trace('[' + id + '] error object: %o', value)
                            errorCount++
                            return '查找到一个非法对象在state里对应id：' + id
                        }
                        return value
                    }, 2))
                    throw new Error('state储存错误，共计错误' + errorCount + '个')
                })
            }, 0)
        } else {
            trace('离线存储未就绪')
        }
    }

    upState(type: string, state: any, callback?: () => void) {
        trace('合并与储存 %s 的 state', type)
        const oldState = this.state.get(type, {})
        this.setState(type, extend(true, oldState, state), callback)
    }

    backState(callback?: () => void) {
        if (this.current >= 0) {
            trace('回退到上一版本state')
            this.state = this.history[this.current--]
            this.emitAllChange(callback)
        }
    }

    prevState(callback?: () => void) {
        if (this.history.length > 0 && this.current !== this.history.length - 1) {
            trace('前进到上一版本state')
            this.state = this.history[++this.current]
            this.emitAllChange(callback)
        }
    }

    emitChange(type: string, callback?: () => void) {
        let emitter = this.listenerMap.get(type)
        trace('触发 %s 的 state 变更事件', type)
        if (emitter) {
            emitter.emit('change', callback)
            trace('%s 的 state 变更事件已触发', type)
        } else trace('没有找到 %s 的 state 变更事件', type)
    }

    emitAllChange(callback = () => undefined) {
        Promise.all(this.state.keySeq().map(type => {
            return new Promise(resolve => {
                let emitter = this.listenerMap.get(type)
                if (emitter) emitter.emit('change', resolve)
                else {
                    trace('没有找到 %s 的 state 变更事件', type)
                    resolve()
                }
            })
        }).toArray()).then(callback)
    }

    addChangeListener(type: string, listener: (...args: any[]) => void) {
        trace('添加 %s 的 state 变更事件', type)
        let emitter = this.listenerMap.get(type)
        if (!emitter) {
            trace('%s 的 state 变更事件池未初始化', type)
            this.listenerMap.set(type, emitter = new EventEmitter())
            emitter.setMaxListeners(15)
        }
        emitter.on('change', listener)
        if (this.dbReady) {
            trace('离线储存已就绪，直接触发 %s 的变更事件', type)
            if (this.lazyUpdateState[type]) window.clearTimeout(this.lazyUpdateState[type])
            this.lazyUpdateState[type] = setTimeout(() => {
                this.lazyUpdateState[type] = undefined
                this.emitChange(type)
            }, 0)
        }
        trace('%s 的 state 变更事件已添加', type)
    }

    removeChangeListener(type, listener) {
        trace('移除 %s 的 state 变更事件', type)
        let emitter = this.listenerMap.get(type)
        if (emitter) {
            emitter.removeListener('change', listener)
            trace('%s 的 state 变更事件已移除', type)
        } else trace('%s 的 state 变更事件未找到', type)
    }

}

export const listStore = new ListStore()

if (window) {
    (window as any).listStore = listStore
}
