/* tslint:disable */
/// <reference path="../node_modules/@types/node/index.d.ts"/>
import * as path from 'path'
import * as fs from 'fs'

const baseDir = path.resolve(__dirname, '..')

/**
 * 转换java实体类到entity模块
 */
export class GeneratePoint {
    private static pointPath = path.resolve(baseDir, 'point.json')
    private static pointTsPath = path.resolve(baseDir, 'src/packages/entity/point.ts')
    private static menusTsPath = path.resolve(baseDir, 'src/packages/entity/menus.ts')
    private static subMenusTsPath = path.resolve(baseDir,"src/packages/entity/subMenus.ts")
    private static keyHash = new Set()

    static taskStart() {
        const json = require(GeneratePoint.pointPath)
        GeneratePoint.generatePointTs(json)
        GeneratePoint.generateMenus(json)
        GeneratePoint.generateSubMenus(json)
    }

    static generateMenus(json) {
        const menusJson = JSON.stringify(GeneratePoint.getMenus(json), null, 4)
        const ts = `export const menus = ${menusJson}`.replace(/\"/g,"'")
        fs.writeFileSync(GeneratePoint.menusTsPath, ts)
    }

    static getMenus(json, filedKey: string = '') {
        const keys = Object.keys(json)
        const obj = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (key === 'route') {
                const hash = GeneratePoint.hashCode(filedKey)
                if (GeneratePoint.keyHash.has(hash)) throw '菜单hash重复'
                GeneratePoint.keyHash.add(hash)
                return {
                    route: json[key].toLowerCase().replace(/\s+([a-z])/g, (r, r1) => '_' + r1),
                    hash: hash,
                    icon:json['icon']
                }
            } else if (typeof json[key] === 'object') obj[key] = GeneratePoint.getMenus(json[key], filedKey + key)
            else {
                obj[key] = json[key]
            }
        }
        return obj
    }

    static generatePointTs(json: any) {
        let pointJson = JSON.stringify(GeneratePoint.removePointFiled(json), null, 4)
        const ts = `export const point = ${pointJson}`.replace(/\"/g,"'")
        fs.writeFileSync(GeneratePoint.pointTsPath, ts)
    }

    static removePointFiled(json: any, filedKey: string = '') {
        const keys = Object.keys(json)
        const obj = {}
        if (keys.length === 0) {
            const hash = GeneratePoint.hashCode(filedKey)
            if (GeneratePoint.keyHash.has(hash)) throw 'hash重复'
            GeneratePoint.keyHash.add(hash)
            return hash
        }
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (key === 'route' || key === 'icon') continue
            const val = GeneratePoint.removePointFiled(json[key], key === 'point' ? filedKey : filedKey + key)
            if (key !== 'point') obj[key] = val
            else return val
        }
        return obj
    }

    static hashCode(strKey) {
        let hash = 0
        if (strKey) {
            for (let i = 0; i < strKey.length; i++) {
                hash = hash * 31 + strKey.charCodeAt(i)
                hash = hash & 0xFFFFFFFFF
            }
        }
        return hash + 0xFFFFFFFFF
    }
    static getSubMenus(json, filedKey: string = ''){
        const keys = Object.keys(json)
        const obj = {}
        if (keys.length === 0) {
            const hash = GeneratePoint.hashCode(filedKey)
            if (GeneratePoint.keyHash.has(hash)) throw 'hash重复'
            GeneratePoint.keyHash.add(hash)
            return hash
        }
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if(key==='icon'||key==='point'||key==='route') continue
            if(typeof json[key] === 'object'&& key ==='subMenu'){
                 return  GeneratePoint.getMenus(json[key])
            } else if(typeof json[key] === 'object'){
                obj[key]=GeneratePoint.getSubMenus(json[key])
            }else{
                obj[key] = {}
            }
        }
        return obj
    }

    static generateSubMenus(json: any) {
        let subMenusJson = JSON.stringify(GeneratePoint.getSubMenus(json), null, 4)
        const ts = `export const subMenus = ${subMenusJson}`.replace(/\"/g,"'")
        fs.writeFileSync(GeneratePoint.subMenusTsPath, ts)
    }
}
