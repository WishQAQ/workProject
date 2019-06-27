import React, {ComponentLifecycle} from 'react'
import {listStore} from 'tools/flux/ListStore'
import {extend} from 'jquery'
import {BaseService} from 'tools/flux/BaseService'
import hash from 'object-hash'
import debug from 'debug'

const trace = debug('trace:框架:FluxComponent')

/**
 * 所有页面都需要继承自该类
 */
export abstract class FluxComponent<S = {}> extends React.Component<any, S> {
  private static serviceStateChangeMap = new Map()

  /**
   * 当前页面的标题
   */
  abstract title: string

  private reactRender: () => any
  private services: BaseService[] = []
  private mount = false
  private id: string
  private lifeCycle = {} as React.Component<any, any>

  stateChange(action: BaseService, callback: () => void) {
    if (this.mount) {
      trace('%s 接收到 state 更新，由 %s 发起 : %o', this.title, action.serviceName, action.state)
      if (!action.state) {
        trace('%s 接收到 state 更新，但是 state 为空，放弃', this.title)
        return
      }
      this.margeState(callback)
      trace('%s 触发 state 生命周期触发器', action.serviceName)
      action.lifecycleByState(action.state, false)
    } else {
      trace('%s 接收到 state 更新，由 %s 发起，但页面已经被卸载', this.title, action.serviceName)
    }
  }

  constructor(props) {
    super(props)
    this.id = hash([Date.now(), Math.random()])
    this.lifeCycle.componentWillMount = this.componentWillMount
    this.lifeCycle.componentWillUpdate = this.componentWillUpdate
    this.lifeCycle.componentWillUnmount = this.componentWillUnmount
    this.lifeCycle.shouldComponentUpdate = this.shouldComponentUpdate
    this.componentWillMount = this.addChangeListener.bind(this, false)
    this.componentWillUpdate = this.addChangeListener.bind(this, true)
    this.componentWillUnmount = this.removeChangeListener
    this.reactRender = this.render.bind(this)
    this.render = this.lazyRender
    window.setTimeout(this.fluxInit.bind(this), 0)
  }

  private fluxInit() {
    const keys = Object.keys(this)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val: BaseService = this[key]
      if (val && typeof val === 'object' && val.isService === true) {
        this.services.push(val)
      }
    }
    if (trace.enabled) {
      if (!this.title) throw new Error('页面' + (this as any).__proto__.constructor.name + '没有指定title')
      trace('扫描到页面 %s 有 %d 个 Service', this.title || (this as any).__proto__.constructor.name, this.services.length)
    }
    this.margeState(() => {
      for (let i = 0; i < this.services.length; i++) {
        const service = this.services[i]
        const serviceHash = hash([service.type, this.title], {ignoreUnknown: true})
        if (!FluxComponent.serviceStateChangeMap.has(serviceHash)) {
          let stateChange = FluxComponent.serviceStateChangeMap.set(serviceHash, this.stateChange.bind(this, service))
            .get(serviceHash)
          trace('添加一个监听 %s 属于 %s', serviceHash, service.serviceName)
          listStore.addChangeListener(service.type, stateChange)
        }
      }
    })
  }

  private addChangeListener(update: boolean) {
    this.mount = true
    for (let i = 0; i < this.services.length; i++) {
      const service = this.services[i]
      trace('%s 触发 %s 的挂载事件', this.title, service.serviceName);
      (service as any).__serviceWillMount()
    }
    if (update) {
      if (typeof this.lifeCycle.componentWillUpdate === 'function') {
        this.lifeCycle.componentWillUpdate.apply(this)
      }
    } else {
      if (typeof this.lifeCycle.componentWillMount === 'function') {
        this.lifeCycle.componentWillMount.apply(this)
      }
    }
  }

  private margeState(callback?: () => void) {
    trace('合并service的state')
    const serviceCount = this.services.length
    if (serviceCount === 0) {
      this.setState(this.state || {}, callback)
      trace('没有service跳过合并')
    } else if (serviceCount === 1) {
      const service = this.services[0]
      if (trace.enabled) trace('当前获取到的state: %o', service.state)
      this.setState(Object.assign(this.state || {}, service.state || {}), callback)
    } else {
      let state = this.state || {}
      for (let i = 0; i < serviceCount; i++) {
        const service: BaseService = this.services[i]
        state = Object.assign(state, service.state)
      }
      trace('合并后的state: %o', state)
      this.setState(state, callback)
    }
  }

  private removeChangeListener() {
    this.mount = false
    trace('页面 %s 移除', this.title)
    for (let i = 0; i < this.services.length; i++) {
      const service = this.services[i]
      const serviceHash = hash([service.type, this.title], {ignoreUnknown: true})
      if (FluxComponent.serviceStateChangeMap.has(serviceHash)) {
        listStore.removeChangeListener(service.type, FluxComponent.serviceStateChangeMap.get(serviceHash))
        FluxComponent.serviceStateChangeMap.delete(serviceHash);
        (service as any).__serviceWillUnmount()
      }
    }
    if (typeof this.lifeCycle.componentWillUnmount === 'function') {
      this.lifeCycle.componentWillUnmount.apply(this)
    }
  }

  private lazyRender() {
    trace('flux render count %s %s', this.title, this.id)
    if (!this.state) return null
    return this.reactRender.apply(this)
  }
}