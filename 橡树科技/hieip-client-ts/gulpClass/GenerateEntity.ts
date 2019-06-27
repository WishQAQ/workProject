/// <reference path="../node_modules/@types/node/index.d.ts"/>
import * as gutil from 'gulp-util'
import * as path from 'path'
import * as fs from 'fs'

const baseDir = path.resolve(__dirname, '..')

export interface GenerateEntityProps {
    entityPackage: string
    sourceModulePath: string
    outDTsPath: string
    outMappingPath: string
}

/**
 * 转换java实体类到entity模块
 */
export class GenerateEntity {
    private entityPackage: string
    private sourceModulePath: string
    private outDTsPath: string
    private outMappingPath: string

    private serverPath: string
    private javaPath: string
    private entityModulePath: string
    private mapping: any
    private moreEntity: any
    private entityPath: string
    private getMethodMatch: RegExp
    private implementsMatch: RegExp
    private entityNameMatch: RegExp
    private packageMatch: RegExp
    private isEntityMatch: RegExp
    private notEntityMatch: RegExp
    private importMatch: RegExp
    private classDocMatch: RegExp
    private types: any
    private entityList: any

    constructor(props: GenerateEntityProps) {
        this.entityPackage = props.entityPackage
        this.sourceModulePath = props.sourceModulePath
        this.outDTsPath = props.outDTsPath
        this.outMappingPath = props.outMappingPath
        this.serverPath = path.resolve(baseDir, this.sourceModulePath)
        this.javaPath = 'src/main/java'
        this.entityModulePath = path.resolve(baseDir, 'src/packages/entity')
        this.mapping = {
            'user.User': 'UserData'
        }
        this.moreEntity = {
            'com.oak.auth.entity.AuthUser': ['id:number'],
            'com.oak.model.entity.system.BaseEntity': ['id:any'],
            'com.oak.model.entity.system.BaseModel': [],
            'com.oak.model.dto.Page': ['startIndex:number', 'pageSize:number', 'orderSql:string'],
            'com.oak.model.entity.system.ChildrenEntity': ['id:number', 'parentId:number', 'children:Array<ChildrenEntity>']
        }

        this.entityPath = path.resolve(this.serverPath, this.javaPath,
            this.entityPackage.replace(/\./g, '/'))
        this.getMethodMatch = /private\s+([a-zA-Z][\w[\]<>]*)\s+([a-zA-Z]\w*)\s*?;(\s*\/\/.*)?/g
        this.implementsMatch = /(implements|extends)\s+([a-zA-Z]\w+)/
        this.entityNameMatch = /public\s+class\s+([a-zA-Z]\w*)/
        this.packageMatch = /package\s+([\w.]+);/
        this.isEntityMatch = /\n\r?@Entity\n|extends\s+BaseEntity/
        this.notEntityMatch = /public\s+abstract/
        this.importMatch = /import\s+([\w.*]+);/g
        this.classDocMatch = /(\/\/.*$)|(\/\*\*(.|\s)*?\*\/)/g
        this.types = {
            'String': 'string',
            'Integer': 'number',
            'int': 'number',
            'Date': 'Date',
            'Long': 'number',
            'long': 'number',
            'Double': 'number',
            'double': 'number',
            'Object': 'any',
            'short': 'number',
            'Boolean': 'boolean',
            'boolean': 'boolean',
            'char': 'string',
            'Character': 'string',
            'byte[]': 'string',
            'Blob': 'string'
        }
        this.entityList = {}
    }

    public taskStart() {
        return new Promise((resolve) => {
            gutil.log(gutil.colors.green('scan entity in:'), gutil.colors.blue(path.relative(baseDir, this.entityPath)))
            this.conversionMoreEntity()
            this.recursiveEntity(this.entityPath)
            this.writeEntity()
            resolve()
        })
    }

    private writeEntity() {
        const keys = Object.keys(this.entityList)
        const entityList = []
        const entityMap = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const entity = this.entityList[key]
            entityMap[entity.fullName] = entity.name
            entityList.push(this.buildEntity(entity))
        }
        fs.writeFileSync(path.join(this.entityModulePath, this.outDTsPath),
            '/* tslint:disable */\n' + entityList.join('\n'))
        fs.writeFileSync(path.join(this.entityModulePath, this.outMappingPath), JSON.stringify(entityMap, null, 2))
        gutil.log(gutil.colors.green('完成合计: ' + keys.length))
    }

    private buildEntity(entity) {
        let importList = []
        let name = `export interface ${entity.name}`
        let ext = entity.ext && entity.ext.length > 0 ? (` extends ${entity.ext.map(e => {
            // importList.push(e.name);
            return e.name
        }).join(', ')}`) : ''
        const TypeValue = Object.keys(this.types).map(key => this.types[key])
        let fields = entity.methods.map(m => {
            if (TypeValue.indexOf(m[1]) < 0) {
                // importList.push(m[1]);
            }
            if (m.length > 2) {
                let z = m[2].split('// ')[1]
                if (z) z = z.replace(/[●;★]/g, '\n   * ')
                z = z ? `/**\n   * ${z}\n   */\n  ` : ''
                return `${z}${m[0]}?: ${m[1]}`
            } else return m.join('?: ')
        }).join(';\n  ')
        let importStr = importList.map(name => {
            let i = name.replace(/^([A-Z])/, (r, n1) => n1.toLowerCase())
            i = i.replace(/([A-Z])/g, (r, n1) => `-${n1.toLowerCase()}`)
            return `import {${name}} from './${i}';\n`
        }).join('')
        if (importStr) importStr += '\n'
        let doc = entity.classDoc ? `${entity.classDoc}\n` : ''
        return `${importStr}${doc}${name}${ext} {\n  ${fields}\n}\n`
    }

    private conversionMoreEntity() {
        const keys = Object.keys(this.moreEntity)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = this.moreEntity[key]
            const description = {fullName: key, name: key.substr(key.lastIndexOf('.') + 1), methods: []}
            for (let j = 0; j < val.length; j++) {
                const v = val[j]
                description.methods.push(v.split(':'))
            }
            this.entityList[description.fullName] = description
        }
    }

    private conversionEntity(route) {
        gutil.log(gutil.colors.green('conversion entity:'), gutil.colors.blue(path.relative(this.entityPath, route)))
        let java = fs.readFileSync(route).toString()
        java = java.replace(/\r?\n/g, '\n')
        if (!this.isEntityMatch.test(java) || this.notEntityMatch.test(java)) {
            const extendsMatch = /(extends|implements)\s+([\w<>]+)/.exec(java)
            if (extendsMatch) {
                const entityPackage = this.findClassInImport(
                    java.match(this.importMatch), extendsMatch[2])
                if (!entityPackage) return gutil.log(gutil.colors.red('无效的entity，放弃'))
            }
        }
        const entityDescription = this.conversionDescription(
            java.match(this.packageMatch),
            java.match(this.entityNameMatch),
            java.match(this.getMethodMatch),
            java.match(this.implementsMatch),
            java.match(this.importMatch),
            java.match(this.classDocMatch)
        )
        if (!entityDescription) return null
        this.entityList[entityDescription.fullName] = entityDescription
        // console.log(entityDescription);
        return entityDescription
    }

    private conversionDescription(pkg, name, getMethodList, im, imp, classDoc) {
        const description: any = {ext: []}
        if (!pkg || !pkg[1]) throw '无效package:' + pkg
        if (!name || !name[1]) throw '无效name:' + classDoc
        name = name[1]
        pkg = pkg[1]
        description.fullName = pkg + '.' + name
        let p = pkg + '.' + name
        p = p.substr(this.entityPackage.length + 1)
        description.name = this.mapping[p]
        if (!description.name) {
            p = name + pkg.substr(this.entityPackage.length)
            p = p.replace(/\.([a-zA-Z])/g, (r, n1) => n1.toUpperCase())
            p = p.replace(/^([a-z])/g, (r, n1) => n1.toUpperCase())
            description.name = p
        }
        this.entityList[description.fullName] = description
        description.methods = []
        im = im && im[2]
        if (!getMethodList) throw `实体${description.fullName}无效`
        for (let i = 0; i < getMethodList.length; i++) {
            const getMethod = getMethodList[i]
            const types = getMethod.match(/private\s+([a-zA-Z][\w[\]<>]*)\s+([a-zA-Z]\w*)\s*?;(\s*\/\/.*)?/)
            let pkgName = types[1], list = 0
            if (pkgName.indexOf('<') > 0) {
                let pkgNameMatch = pkgName.match(/(\w+)<(\w+)>/)
                pkgName = pkgNameMatch[2]
                list = 1
            }
            let type = this.types[pkgName]
            if (!type && pkgName === name) type = description.name
            if (!type) {
                const Class = this.findClassInImport(imp, pkgName)
                if (Class) {
                    let Type = this.entityList[Class]
                    if (!Type) Type = this.findEntityByPath(Class)
                    if (!Type) return null
                    type = Type.name
                }
                if (!type) {
                    let Class = pkg + '.' + pkgName
                    let Type = this.entityList[Class]
                    if (!Type) try {
                        Type = this.findEntityByPath(Class)
                    } catch (e) {
                        gutil.log(gutil.colors.yellow('在' + description.fullName + '里，' + e))
                        return null
                    }
                    type = Type.name
                }
            }
            if (type && list > 0) type = `Array<${type}>`
            if (!type) gutil.log(gutil.colors.yellow('没有映射类型'), gutil.colors.blue(pkgName))
            const methodName = types[2]
            description.methods.push([methodName, type, types[3] || ''])
        }
        const Class = this.findClassInImport(imp, im)
        if (Class && Class !== 'java.io.Serializable') {
            let entity = this.entityList[Class]
            if (!entity) entity = this.findEntityByPath(Class)
            description.ext.push(entity)
        }
        description.classDoc = classDoc ? classDoc[0] : ''
        return description
    }

    private findEntityByPath(route) {
        const p = path.resolve(this.serverPath, this.javaPath, route.replace(/\./g, '/') + '.java')
        if (!fs.existsSync(p))
            throw '读取实体' + route + '出错'
        return this.conversionEntity(p)
    }

    private findClassInImport(imp, Class) {
        if (!Array.isArray(imp)) return null
        if (!Class) return null
        for (let i = 0; i < imp.length; i++) {
            let item = imp[i]
            if (item.indexOf('.*') > 0 && item.indexOf(this.entityPackage) > 0) {
                let _p = item.substring(7, item.length - 1).replace('.*', '')
                item = _p.replace(/\./g, '/')
                const p = path.resolve(this.serverPath, this.javaPath, item)
                item = fs.readdirSync(p)
                for (let j = 0; j < item.length; j++) {
                    const it = item[j]
                    if (it.startsWith(`${Class}.`)) {
                        return _p + '.' + Class
                    }
                }
            }
            if (item.indexOf(`.${Class};`) > 0) {
                return item.substring(7, item.length - 1)
            }
        }
        const keys = Object.keys(this.moreEntity)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            if (key.endsWith(`.${Class}`)) {
                return key
            }
        }
        return null
    }

    /**
     * 递归搜索所有实体类
     * @param route
     */
    private recursiveEntity(route) {
        if (fs.existsSync(route)) {
            if (fs.statSync(route).isDirectory()) {
                const dir = fs.readdirSync(route)
                for (let i = 0; i < dir.length; i++) {
                    this.recursiveEntity(path.join(route, dir[i]))
                }
            } else {
                if (path.extname(route) === '.java') {
                    this.conversionEntity(route)
                }
            }
        }
    }

}
