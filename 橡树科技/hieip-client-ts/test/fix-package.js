const filePath = process.argv[2]

if (filePath) {
    const fs = require('fs')
    let fileString = fs.readFileSync(filePath).toString()
    const replace = {
        packages: 'pkg',
        view: 'view',
        tools: 'tools',
        service: 'service',
    }
    fileString = fileString.replace(/from ["']src\/(packages|view|tools|service)/g, function (n, n1) {
        return n.replace('src/' + n1, replace[n1])
    })
    fs.writeFileSync(filePath, fileString)
}