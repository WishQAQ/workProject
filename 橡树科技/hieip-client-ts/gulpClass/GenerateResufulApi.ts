/// <reference path="../node_modules/@types/node/index.d.ts"/>
import * as gutil from 'gulp-util'
import * as path from 'path'
import * as fs from 'fs'

const baseDir = path.resolve(__dirname, '..')

export interface RestfulApiProps {
    sourceModulePath: string
    controllerPackage: string
    mappingPath: string
    importApi: string
    fromApi: string
    outFileName: string
}

/**
 * 转换java实体类到entity模块
 */
export class GenerateRestfulApi {
    private sourceModulePath: string
    private controllerPackage: string
    private mappingPath: string
    private importApi: string
    private fromApi: string
    private outFileName: string
    private serverPath: string
    private javaPath: string
    private apiModulePath: string
    private mapping: string
    private apiPath: string
    private apiList: any
    private entityList: Set<any>
    private types: any

    constructor(props: RestfulApiProps) {
        this.sourceModulePath = props.sourceModulePath
        this.controllerPackage = props.controllerPackage
        this.mappingPath = props.mappingPath
        this.importApi = props.importApi
        this.fromApi = props.fromApi
        this.outFileName = props.outFileName
        this.serverPath = path.resolve(baseDir, this.sourceModulePath)
        this.javaPath = 'src/main/java'
        this.apiModulePath = path.resolve(baseDir, 'src/packages/api')
        this.mapping = null
        this.apiPath = path.resolve(this.serverPath, this.javaPath,
            this.controllerPackage.replace(/\./g, '/'))
        this.apiList = {}
        this.entityList = new Set<any>()
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
            'Blob': 'string',
        }
    }

    public taskStart() {
        return new Promise((resolve) => {
            gutil.log(gutil.colors.green('scan api in:'), gutil.colors.blue(path.relative(baseDir, this.apiPath)))
            this.recursiveEntity(this.apiPath)
            this.writeApi()
            resolve()
        })
    }

    private writeApi() {
        let list = Object.keys(this.apiList).map(k => this.apiList[k]).join('')
        let entity = []
        let entityList = [...this.entityList]
        let types = Object.keys(this.types).map(v => this.types[v])
        types.push('void')
        types.push('any')
        types.push(' any')
        types.push('Map')
        types.push('Set')
        types.push('ArrayData')
        for (let i = 0; i < entityList.length; i++) {
            let e = entityList[i]
            if (types.indexOf(e) >= 0) continue
            entity.push(e)
        }
        const arrayData = `export interface ArrayData<T> extends Array<T> {\n    total: number\n}`
        list = `/* tslint:disable */
import { ${this.importApi} } from '../../tools/api';
import {\n    ${entity.join(',\n    ')}\n} from '${this.fromApi}';\n
${arrayData}\n\n${list}`
        fs.writeFileSync(path.join(this.apiModulePath, this.outFileName), list)
        gutil.log(gutil.colors.green(`api count: ${[...new Set(list)].length}`))
    }

    private conversionApi(route) {
        gutil.log(gutil.colors.green('conversion api:'), gutil.colors.blue(path.relative(this.apiPath, route)))
        const bean = this.readJava(route)
        if (bean.isController) {
            const controller = this.readController(bean.java)
            // console.log(JSON.stringify(controller, null, 2));
            this.apiList[controller.fullName] = this.formatApi(controller)
            gutil.log(gutil.colors.green('conversion api: OK'))
        } else {
            gutil.log(gutil.colors.red('conversion api: ERROR'))
        }
    }

    private formatApi(controller) {
        if (!controller.name) return
        if (controller.methods.length === 0) return
        const classDoc = controller.classDoc ? controller.classDoc : ''
        let methodBody = `${classDoc}export class Api${controller.name} {\n`
        methodBody += `    private static baseUrl = '${controller.baseUrl}';\n`
        const methods = controller.methods
        for (let i = 0; i < methods.length; i++) {
            const method = methods[i], args = method.args, argList = [], argsName = []
            for (let j = 0; j < args.length; j++) {
                const arg = args[j]
                if (!arg.type) throw '无效类型[' + controller.fullName + ']:' + JSON.stringify(method, null, 2)
                argList.push(`${arg.name}?: ${arg.type}`)
                argsName.push(arg.name)
                this.addImportEntityType(arg.type)
            }
            if (!method.returnType) throw '无效返回类型[' + controller.fullName + ']:' + JSON.stringify(method, null, 2)
            this.addImportEntityType(method.returnType)
            let methodDoc = method.doc ? method.doc : ''
            methodBody += `\n${methodDoc}`
                + `    public static ${method.name}(${argList.join(', ')}): Promise<${method.returnType}> {\n`
            methodBody += `        return apiUtil.connection<${method.returnType}>`
                + `("${method.method}", Api${controller.name}.baseUrl, "${method.url}", {${argsName.join(', ')}});\n`
            methodBody += `    }\n`
        }
        methodBody += `}\n\n`
        return methodBody
    }

    private addImportEntityType(type: string) {
        if (type.indexOf('<') > 0) {
            const t1 = type.split(/[<>]/)
            // console.log(t1);
            t1[1].split(',').forEach(t => this.entityList.add(t))
        } else {
            this.entityList.add(type)
        }
    }

    private readController(java: string) {
        const controller: any = {}
        controller.packageName = /package\s+([\w.]+);/.exec(java)
        if (controller.packageName) controller.packageName = controller.packageName[1]
        controller.className = /public\s+class\s+(\w+)\s+/.exec(java)
        if (controller.className) controller.className = controller.className[1]
        if (controller.className && controller.packageName) controller.fullName = `${controller.packageName}.${controller.className}`
        controller.name = java.match(/@(Rest)?Controller\("([\w.]+)"\)/)
        if (controller.name) controller.name = this.formatControllerName(controller.name[2])
        this.formatControllerMethodsAndReturn(java, controller)
        return controller
    }

    private formatControllerMethodsAndReturn(java: string, controller: any): void {
        const rM = /@(Post|Get|Head|Put|Request)Mapping\("([\w\-/]+)"\)/g
        const methods = []
        let methodArray
        while ((methodArray = rM.exec(java)) !== null) {
            let $name = methodArray[2], index = methodArray.index, doc = '', prevLine, startIndex = index,
                isController = false, method = methodArray[1].toUpperCase()
            if (!method) method = 'POST'
            if (method === 'REQUEST') method = 'POST'
            let endR = java.lastIndexOf(' */', index)
            let startR = java.lastIndexOf('/*', index)
            if (endR >= 0 && startR >= 0 && startR > endR) {
                gutil.log(gutil.colors.yellow('无效方法:'), gutil.colors.red($name))
                continue
            }
            while ((prevLine = this.prevLine(startIndex, java)) !== null) {
                startIndex = prevLine.startIndex
                if (prevLine.line.indexOf('*') >= 0 || prevLine.line.indexOf('@') >= 0) {
                    if (prevLine.line.indexOf('@') >= 0) {
                        if (/@(Rest)?Controller/.test(prevLine.line)) {
                            isController = true
                        }
                        continue
                    }
                    doc = prevLine.line + '\n' + doc
                } else break
            }
            if (isController) {
                controller.baseUrl = $name
                controller.classDoc = doc
                continue
            }
            startIndex = index
            let methodBody = ''
            while (!/}$/.test((prevLine = this.nextLine(startIndex, java)).line)) {
                methodBody += prevLine.line + '\n'
                startIndex = prevLine.endIndex
            }
            methodBody = methodBody + prevLine.line
            methodBody = methodBody.replace(/(\n|\s+|(,\s+)?required = (false|true),?|(,\s+)?defaultValue = ".*?",?)/g, ' ')
            methodBody = methodBody.replace(/PageResult/g, 'JsonResult')
            let argsMatch = /(public|private)\s+([\w][\w<>\s,]+[\w<>])\s+\w+\s*?\((.*?)?\)\s*(throws\s+[\w,]+)?\s*{/.exec(methodBody)
            let args = [], returnType
            if (argsMatch) {
                if (argsMatch[1] === 'private') gutil.log(gutil.colors.yellow('接口不能是私有:'), gutil.colors.blue(controller.fullName))
                const returnTypeInArgs = argsMatch[2]
                if (returnTypeInArgs) {
                    if (returnTypeInArgs === 'JsonResult') {
                        returnType = this.conversionReturnType('Object', java)
                    } else if (returnTypeInArgs.indexOf('JsonResult<') >= 0) {
                        const type1 = /^JsonResult<\s*(\w[\w\s,<[\]>]+)>$/.exec(returnTypeInArgs)
                        if (!type1) throw '0001:\n' + returnTypeInArgs + '\n' + methodBody
                        const type = type1[1]
                        returnType = this.conversionReturnType(type, java)
                    } else if (returnTypeInArgs === 'void') {
                        returnType = 'void'
                    } else if (returnTypeInArgs.indexOf('<') > 0) {
                        returnType = this.conversionReturnType(returnTypeInArgs, java)
                    } else if (returnTypeInArgs.indexOf('[') > 0) {
                        returnType = this.conversionType(returnTypeInArgs.split('[')[0], java)
                    } else {
                        returnType = this.conversionType(returnTypeInArgs, java)
                    }
                }
                if (!returnType) throw '无效返回类型:\n' + returnTypeInArgs + '\n' + methodBody
                if (argsMatch[3]) {
                    const argList = argsMatch[3].split(',')
                    for (let i = 0; i < argList.length; i++) {
                        const a = argList[i].replace(/@RequestParam(\(required = (false|true)\)|\(\s*\))?\s+/g, '')
                        if (!a || a.indexOf('HttpServletRequest ') >= 0) continue
                        const aMatch = /@RequestParam\((\s*(value|name)\s*=\s*)?"(\w+)"\s*\)\s+([\w<[\]>]+)/.exec(a)
                        let _name, type
                        if (aMatch) {
                            _name = aMatch[3]
                            type = aMatch[4]
                        } else {
                            const aArray = a.trim().split(/\s+/)
                            _name = aArray[1].trim()
                            type = aArray[0].trim()
                        }
                        if (type.indexOf('<') > 0) {
                            const typeMatch = /\w+<([\w[\]]+)>/.exec(type)
                            type = `Array<${this.conversionType(typeMatch[1], java)}>`
                        } else if (type.indexOf('[') > 0) {
                            type = this.conversionType(type.split('[')[0], java)
                            if (Object.values(this.types).indexOf(type) >= 0) type = 'string'
                            else type = `Array<${type}>`
                        } else {
                            type = this.conversionType(type, java)
                        }
                        if (!type) throw Error(`无效类型 ${argList[i]}`)
                        args.push({name: _name, type})
                    }
                }
            } else {
                throw '获取参数失败:\n' + methodBody
            }
            const url = $name
            $name = this.conversionMethodName($name)
            if ($name) methods.push({name: $name, doc, args, url, returnType, method})
        }
        controller.methods = methods
    }

    private conversionMethodName(name) {
        if (!/[a-zA-Z]/.test(name)) return null
        name = name.replace(/\/([a-zA-Z])?/, (r, n1: string) => n1 && n1.toUpperCase())
        return name
    }

    private conversionReturnType(types: string, java: string) {
        if (types.indexOf('<') > 0) {
            return types.replace(/List<|Set</g, 'ArrayData<').replace(/\w+/g, (r) => {
                const rr = this.conversionType(r, java)
                if (rr) r = rr
                return r
            })
        } else {
            return this.conversionType(types, java)
        }
    }

    private conversionType(type: string, java: string) {
        let newType = this.types[type]
        if (!newType) {
            if (!this.mapping) {
                this.mapping = require(this.mappingPath)
            }
            const keys = Object.keys(this.mapping)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                if (key.endsWith(`.${type}`) && java.indexOf(`import ${key.substr(0, key.length - type.length)}`) > 0) {
                    return this.mapping[key]
                }
            }
        }
        return newType
    }

    private prevLine(index: number, java: string) {
        let endIndex = java.lastIndexOf('\n', index)
        let startIndex = java.lastIndexOf('\n', endIndex - 1)
        let prevLine = java.substring(startIndex + 1, endIndex)
        if (prevLine.indexOf('\n') >= 0) throw Error('获取上一行失败')
        return {endIndex, startIndex, prevIndex: index, line: prevLine}
    }

    private nextLine(index: number, java: string) {
        let startIndex = java.indexOf('\n', index)
        let endIndex = java.indexOf('\n', startIndex + 1)
        let nextLine = java.substring(startIndex + 1, endIndex)
        if (nextLine.indexOf('\n') >= 0) throw Error('获取下一行失败')
        return {startIndex, endIndex, prevIndex: index, line: nextLine}
    }

    private formatControllerName(name) {
        name = name.replace('Controller', '')
        name = [...new Set<string>(name.replace(/\.?([A-Z])/g, (r, n1) => `.${n1.toLowerCase()}`).split('.'))].join('.')
        name = name.replace(/\.([a-zA-Z])/g, (r, n1) => n1.toUpperCase())
        name = name.replace(/^([a-zA-Z])/g, (r, n1) => n1.toUpperCase())
        return name
    }

    private readJava(route) {
        let java = fs.readFileSync(route).toString()
        java = java.replace(/\r?\n/g, '\n')
        return {
            isController: /@(Rest)?Controller/.test(java),
            isServer: /@Service/.test(java),
            java: java
        }
    }

    /**
     * 递归搜索所有实体类
     * @param route
     */
    private recursiveEntity(route) {
        // console.log(route);
        if (fs.existsSync(route)) {
            if (fs.statSync(route).isDirectory()) {
                const dir = fs.readdirSync(route)
                for (let i = 0; i < dir.length; i++) {
                    this.recursiveEntity(path.join(route, dir[i]))
                }
            } else {
                if (path.extname(route) === '.java') {
                    this.conversionApi(route)
                }
            }
        }
    }

}
