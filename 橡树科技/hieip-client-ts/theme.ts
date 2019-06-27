import * as fs from 'fs'

const style: any = {}
fs.readFileSync('./src/style/color.scss').toString().split('\n').forEach(line => {
    line = line.trim()
    if (line) {
        if (line.charAt(0) === '$') {
            const s = line.split(/[;: $]/)
            style[s[1].replace(/-(\w)/g, (r, r1) => r1.toUpperCase())] = s[3]
        }
    }
})

export default {
    'primary-color': style.fontSelectColor,
    'animation-duration-slow': '.15s',
    'animation-duration-base': '.1s',
    'animation-duration-fast': '.05s',
    'icon-url': `"/ant-font"`
}
