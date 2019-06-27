/**
 *
 * Created by jahv on 2017/4/12.
 */
import localForage from 'localforage'

localForage.config({
    driver: localForage.INDEXEDDB,
    name: 'OAK-DB',
    storeName: 'default',
    version: 1.0,
    description: '橡树科技'
})

class StoreAtt {
    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    get(name: string) {
        let value = this.storage.getItem(name)
        if (!value) return null
        return JSON.parse(value)
    }

    // noinspection JSUnusedGlobalSymbols
    append(name: string, value: any) {
        let old: any = this.storage.getItem(name)
        if (old) old = JSON.parse(old)
        else old = []
        if (typeof old.length !== 'number') old = [old]
        old.push(value)
        this.storage.setItem(name, JSON.stringify(old))
    }

    set(name, value) {
        this.storage.setItem(name, JSON.stringify(value))
    }

    remove(name) {
        this.storage.removeItem(name)
    }
}

class StoreEntity {
    local = new StoreAtt(window.localStorage)
    session = new StoreAtt(window.sessionStorage)

    private dbMap = new Map<string, LocalForageDbMethods>()
    private _defaultDB: LocalForageDbMethods

    // noinspection JSUnusedGlobalSymbols
    get defaultDB(): LocalForageDbMethods {
        if (!this._defaultDB) this._defaultDB = this.db('default')
        return this._defaultDB
    }

    db(dbName: string): LocalForageDbMethods {
        let _dbName = 'default_' + dbName
        let db = this.dbMap.get(_dbName)
        if (!db) this.dbMap.set(_dbName, db = localForage.createInstance({
            name: _dbName,
            version: parseInt(window.localStorage.getItem('db_version'), 10) || 1
        }))
        return db
    }
}

export const store = new StoreEntity()