import { IDBFactory, IDBKeyRange, reset } from 'shelving-mock-indexeddb'

(global as any).indexedDB = (window as any).indexedDB = new IDBFactory();
(global as any).IDBKeyRange = (window as any).IDBKeyRange = IDBKeyRange

const type = 'test'
const state = { name: 'test' }

describe('储存器测试', function () {
    it('should 全局暴露测试', function () {
        expect('window' in global).toEqual(true)
        const listStore = require('..')
        expect('listStore' in listStore).toEqual(true)
        expect('listStore' in window).toEqual(true)
    })

    it('should 读写state测试', function () {
        const listStore = require('..')
        listStore.listStore.setState(type, state)
        expect(listStore.listStore.getState(type)).toEqual(state)
    })

    it('should 设置state时触发测试', function () {
        return new Promise((resolve) => {
            const listStore = require('..')
            listStore.listStore.addChangeListener(type, resolve)
            listStore.listStore.setState(type, state)
        })
    })
})