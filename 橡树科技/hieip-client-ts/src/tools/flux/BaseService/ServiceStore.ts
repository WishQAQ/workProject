import {BaseService} from 'tools/flux/BaseService/index'

type ServiceCallback<T extends BaseService<any>> = (service: T) => void

class ServiceStore {
    private loadPool = new Map<string, Array<ServiceCallback<any>>>()
    private serviceMap = new Map<string, BaseService<any>>()

    public load<T extends BaseService<any>>(serviceName: string, callback: ServiceCallback<T>) {
        if (this.serviceMap.has(serviceName)) {
            callback(this.serviceMap.get(serviceName) as T)
        } else {
            if (!this.loadPool.has(serviceName)) this.loadPool.set(serviceName, [])
            this.loadPool.get(serviceName).push(callback)
        }
    }

    public push(service: BaseService) {
        this.serviceMap.set(service.type, service)
        if (this.loadPool.has(service.type)) {
            const callbackPool = this.loadPool.get(service.type)
            for (let i = 0; i < callbackPool.length; i++) {
                const callback = callbackPool[i]
                callback(service)
            }
            this.loadPool.delete(service.type)
        }
    }
}

export const serviceStore = new ServiceStore()