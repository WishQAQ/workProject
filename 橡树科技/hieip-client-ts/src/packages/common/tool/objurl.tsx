/**
 * 解析url 参数， 返回json格式对象
 */
export function anysurl(): object {
    const url: string = window.location.search.substring(1)
    let result: object = {}
    let indodata: string = decodeURIComponent(url)
    let str: any = indodata.split('&')
    for (let i = 0; i < str.length; i++) {
        let u = str[i].split('=')
        result[u[0]] = u[1]
    }
    return result
}