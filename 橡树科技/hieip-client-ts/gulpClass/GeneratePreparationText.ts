import * as webpack from 'webpack'
import webpackConfig from '../webpack.config'
import * as gutil from 'gulp-util'
import * as fs from 'fs'
import * as path from 'path'

class ProgressPlugin {
    apply(compiler) {
        const files = new Set()
        let cwd = process.cwd().replace(/\\/g, '/') + '/'
        const handler = function (percentage, msg, ...details) {
            if (percentage < 1) {
                percentage = Math.floor(percentage * 100)
                msg = `${percentage}% ${msg}`
                details.forEach(detail => {
                    if (!detail) return
                    if (detail.length > 40) {
                        if (detail.indexOf('!') > 0) {
                            detail = `${detail.substr(detail.lastIndexOf('!') + 1)}`
                        }
                    }
                    detail = detail.replace(/\\/g, '/').replace(cwd, '')
                    files.add(detail)
                    msg += ` ${detail}`
                })
            }
            goToLineStart(msg)
            process.stderr.write(msg)
        }
        let lastModulesCount = 0
        let moduleCount = 500
        let doneModules = 0
        const activeModules = []

        const update = function update() {
            handler(
                0.1 + (doneModules / Math.max(lastModulesCount, moduleCount)) * 0.9,
                'building modules',
                `${doneModules}/${moduleCount} modules`,
                `${activeModules.length} active`,
                activeModules[activeModules.length - 1]
            )
        }

        const moduleDone = function moduleDone(module) {
            doneModules++
            const ident = module.identifier()
            if (ident) {
                const idx = activeModules.indexOf(ident)
                if (idx >= 0) activeModules.splice(idx, 1)
            }
            update()
        }
        compiler.plugin('compilation', (compilation) => {
            if (compilation.compiler.isChild()) return
            lastModulesCount = moduleCount
            moduleCount = 0
            doneModules = 0
            handler(0, 'compiling')
            compilation.plugin('build-module', function (module) {
                moduleCount++
                const ident = module.identifier()
                if (ident) {
                    activeModules.push(ident)
                }
                update()
            })
            compilation.plugin('failed-module', moduleDone)
            compilation.plugin('succeed-module', moduleDone)
            let cachePath = './node_modules/.dll.module.cache'
            compilation.plugin('before-hash', () => {
                gutil.log(gutil.colors.green(`\n查找完成，正在写入缓存: ${cachePath}\n`))
                const dll = []
                const moduleFile = new Map<string, string[]>()
                const moduleMainLock = new Map<string, boolean>()
                const userText = []
                const excludeText = []
                if (fs.existsSync('./preparation.user.text')) {
                    fs.readFileSync('./preparation.user.text').toString().split(/\r?\n/).forEach(line => {
                        if (line.startsWith('//')) return
                        if (line.startsWith('!')) excludeText.push(line.substr(1))
                        else if (line && line.trim().length > 2) userText.push(line.trim())
                    })
                }

                function getFileModule(file, baseUrl = path.join(__dirname, '../node_modules')) {
                    const fileSplit = file.split('/')
                    let filePath = ''
                    for (let i = 0; i < fileSplit.length; i++) {
                        filePath += '/' + fileSplit[i]
                        let modulePath = path.join(baseUrl, filePath, 'package.json')
                        if (fs.existsSync(modulePath)) {
                            const json = require(modulePath)
                            let main = path.join(baseUrl, filePath, json.module || json.main || 'index.js')
                            if (!fs.existsSync(main)) main = '没有主路径'
                            return {
                                name: json.name,
                                main: main.replace(cwd, '').replace('node_modules/', '')
                            }
                        }
                    }
                }

                function dllPush(file) {
                    for (let i = 0; i < excludeText.length; i++) {
                        const exclude = excludeText[i]
                        if (file.startsWith(exclude)) return
                    }
                    if (file.startsWith('.')) return dll.push(file)
                    let modulePackage
                    if (file.indexOf('/node_modules/') > 0) {
                        let subFile = file.split('/node_modules/')
                        let subModule = getFileModule(subFile[1], path.join(__dirname, '../node_modules', subFile[0], 'node_modules'))
                        subModule.name = path.join(subFile[0], 'node_modules', subModule.name)
                        modulePackage = subModule
                    } else {
                        modulePackage = getFileModule(file)
                    }
                    if (!moduleFile.has(modulePackage.name)) moduleFile.set(modulePackage.name, [])
                    if (file.startsWith(modulePackage.main)) {
                        moduleMainLock.set(modulePackage.name, true)
                        moduleFile.set(modulePackage.name, moduleFile.get(modulePackage.name).filter(t => !t.endsWith('.js')))
                    }
                    if (moduleMainLock.has(modulePackage.name) && file.endsWith('.js')) return
                    if (modulePackage.main === file) return
                    moduleFile.get(modulePackage.name).push(file)
                }

                [...files].forEach(file => {
                    if (file.startsWith('node_modules/')) {
                        if (file.startsWith('node_modules/webpack')) return
                        if (file.indexOf(' ') >= 0) return
                        if (file.indexOf('?') >= 0) return
                        dllPush(file.replace('node_modules/', ''))
                    } else {
                        userText.forEach(line => {
                            if (file.startsWith(line)) {
                                dllPush(`./${file}`)
                            }
                        })
                    }
                })
                dll.push(...moduleMainLock.keys());
                [...moduleFile.values()].forEach(module => {
                    module.forEach(m => dll.push(m))
                })
                if (dll.length > 0) {
                    dll.sort()
                    fs.writeFileSync(cachePath, dll.join('\n'))
                }
                process.exit(0)
            })
        })

        let lineCaretPosition = 0

        function goToLineStart(nextMessage) {
            let str = ''
            for (; lineCaretPosition > nextMessage.length; lineCaretPosition--) {
                str += '\b \b'
            }
            for (let i = 0; i < lineCaretPosition; i++) {
                str += '\b'
            }
            lineCaretPosition = nextMessage.length
            if (str) process.stderr.write(str)
        }
    }
}

export class GeneratePreparationText {
    public start() {
        return new Promise(() => {
            webpackConfig.plugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('development')
                    }
                }),
                new ProgressPlugin()
            ]
            webpack(webpackConfig).run(err => {
                gutil.log(gutil.colors.red(err.toString()))
            })
        })
    }
}