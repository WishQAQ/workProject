/* eslint-disable no-console,no-undef */
const childProcess = require('child_process')
const path = require('path')

console.log('正在安装第三方组件')

function spawn (command, cwd) {
    return function () {
        return new Promise(function (resolve, reject) {
            if (cwd) {
                console.log('>', cwd)
            }
            console.log('>', command)
            const commands = command.split(' ')
            const cmd = commands.splice(0, 1)
            const install = childProcess.spawn(cmd[0], commands, {cwd: cwd, env: process.env, stdio: 'inherit'})
            install.on('close', function (code) {
                if (code !== 0) {
                    reject(code)
                } else {
                    resolve(code)
                }
            })
        })
    }
}

function execute (i, commandList) {
    if (i === commandList.length) {
        return Promise.resolve(0)
    }
    console.log('执行第', i + 1, '个任务')
    return (commandList[i]()).then(function () {
        console.log('第', i + 1, '个任务执行完成')
        return execute(i + 1, commandList)
    })
}

exports = module.exports = function (shell) {
    const commandList = shell.trim().split('\n').map(line => {
        const sh = /(^cwd\s+([^\s]+)\s+)?(.*?$)/.exec(line.trim())
        if (sh) {
            const result = [sh[3]]
            if (sh[2]) {
                result.push(path.join(process.cwd(), sh[2]))
            }
            return result
        }
        return null
    }).filter(sh => sh).map(sh => spawn(sh[0], sh[1]))
    execute(0, commandList).catch(function () {
        console.error('安装第三方包失败')
    })
}
