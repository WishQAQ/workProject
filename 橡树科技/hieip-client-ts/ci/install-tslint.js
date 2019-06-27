const install = require('./install-utils')
const json = require('../package.json')
const fs = require('fs')
const path = require('path')

const names = Object.keys(json.devDependencies).concat(Object.keys(json.dependencies)).filter(name =>
    name.indexOf('tslint') >= 0)
names.push('typescript')

const notExists = []

for (let i = 0; i < names.length; i++) {
    const name = names[i]
    if (!fs.existsSync(path.join(__dirname, '../node_modules', name))) {
        notExists.push(name)
    }
}

if (notExists.length > 0) {
    install(`npm install ${notExists.join(' ')}`)
}
