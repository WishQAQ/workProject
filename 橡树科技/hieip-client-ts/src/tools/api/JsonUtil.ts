import $ from 'jquery'

export class JsonUtil {
    /**
     * 克隆对象
     * @param data 对象
     * @returns {any[] | {}}
     */
    public static clone(data: any) {
        return $.extend(true, Array.isArray(data) ? [] : {}, data)

    }

    /**
     * 根据路径设置值,路径乘积以句号(.)隔开
     * JsonUtil.json直接从本对象指向的内存地址改变
     * @param path 路径
     * @param json 设置值对象,可不设置,默认为默认状态最高级
     * @param event 设置值,默认将event.target赋与value值,当其类型为undefined时,将event直接赋与value值,否则将event.target.value赋与value值
     * @deprecated
     */
    public static json = (path: string | string[], json: any, event: any) => {
        if (!json) return json
        let value = typeof event === 'object' ? 'target' in event ? event.target.value : event : event
        // 路径长度为0时,直接返回值
        if (path.length === 0) return value
        let keys = Array.isArray(path) ? path : path.split('.')
        return JsonUtil.jsonChange(keys, json, value, 0)
    }

    /**
     * 根据路径设置值,路径乘积以句号(.)隔开
     * JsonUtil.json直接从本对象指向的内存地址改变
     * @param path 路径
     * @param json 设置值对象,可不设置,默认为默认状态最高级
     * @param event 设置值,默认将event.target赋与value值,当其类型为undefined时,将event直接赋与value值,否则将event.target.value赋与value值
     */
    public static json2 = (path: string[], json: any, event: any) => {
        if (!json) return json
        let value = typeof event === 'object' ? 'value' in event ? event.value : event : event
        // 路径长度为0时,直接返回值
        if (path.length === 0) return value
        return JsonUtil.jsonChange(path, json, value, 0)
    }

    /**
     * 多层次json对象处理: 根据路径获取值
     * 根据路径获取值,路径乘积以句号(.)隔开
     * 单对象例子: "mhSplit.patientVisit.name"
     * 数组对象例子: "mhSplit.triageRecord.0.pvId",其中 0 是数字,表示数组第1个对象
     * @param keys 路径数组或字符串
     * @param json 设置值对象
     * @param defaultResult 默认返回结果,不传值或传入值类型为undefined时,默认返回空字符串
     * @returns {any}
     */
    public static getJsonByKey = (keys: any, json: any, defaultResult?: any) => {
        if (!json) return defaultResult ? defaultResult : ''
        if (typeof(keys) === 'string') keys = keys.split('.')
        for (let i = 0; i < keys.length; i++) {
            json = json[keys[i]]
            if (!json) return defaultResult ? defaultResult : ''
        }
        return json
    }

    /**
     * 多层次json对象处理: 根据路径获取值
     * 根据路径获取值,路径乘积以句号(.)隔开
     * 单对象例子: "mhSplit.patientVisit.name"
     * 数组对象例子: "mhSplit.triageRecord.0.pvId",其中 0 是数字,表示数组第1个对象
     * @param keys 路径数组或字符串
     * @param json 设置值对象
     * @param defaultResult 默认返回结果,不传值或传入值类型为undefined时,默认返回空字符串
     * @returns {any}
     */
    public static getJsonByKey2 = (keys: any, json: any, defaultResult: any) => {
        if (JsonUtil.isEmpty(json)) return defaultResult
        if (typeof(keys) === 'string') keys = keys.split('.')
        for (let i = 0; i < keys.length; i++) {
            json = json[keys[i]]
            if (JsonUtil.isEmpty(json)) return defaultResult
        }
        return json
    }

    /**
     * 根据属性名将数组转化为对象
     * @param array 数组
     * @param key 属性名
     * @param value 属性名
     * @returns {{}}
     */
    public static arrayToObj = (array: Array<any>, key: string, value: string) => {
        if (!array) return {}
        let model = {}
        let keys = key.split('.')
        let values = value.split('.')
        array.forEach((data) => {
            let k = JsonUtil.getJsonByKey(keys, data)
            model[k] = JsonUtil.getJsonByKey(values, data)
        })
        return model
    }
    /**
     * 根据属性名将对象转化为数组
     * @param data 转化对象
     * @param key key路径名
     * @param value value路径名
     * @param model 被转化对象(转化后数组的下一层级对象,已有值为默认值)
     * @returns {any}
     */
    public static objToArray = (data: any, key: string, value: string, model?: any) => {
        model = model || {}// model无公共值时,默认空json对象
        let keys = key.split('.')
        let values = value.split('.')
        let list = []
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                let v = JsonUtil.jsonChange(keys, JsonUtil.clone(model), i, 0)
                v = JsonUtil.jsonChange(values, v, data[i], 0)
                list.push(v)
            }
        }
        return list
    }

    /**
     * 复制数组中的对象的属性值 (暂未处理多层次对象)
     * @param data 原数组
     * @param keys 原属性值
     * @param values 新属性值
     * @param flag 强转标示,目前将字符串类型的数字强转为数字
     * @returns {Array}
     */
    public static copyProps = (data: Array<any>, keys?: any, values?: any, flag?: any) => {
        if (typeof(keys) === 'string') keys = keys.split(',')
        if (typeof(values) === 'string') values = values.split(',')
        let length = keys.length
        if (length !== values.length) throw new Error('设置原字段长度与复制字段长度必须一致!')
        let list = []
        data.forEach((model) => {
            for (let i = 0; i < length; i++) {
                let value = model[keys[i]]
                if (flag) {
                    value = Number(value)
                    if (isNaN(value))
                        value = model[keys[i]]
                }
                model[values[i]] = value
            }
            list.push(model)
        })
        return list
    }

    /**
     * 将集合的某个特殊字段转数组 (暂未处理多层次对象)
     * 与 arrayToList 相对
     * @param data 原数组
     * @param key 原属性值
     * @param flag 强转标示,目前将字符串类型的数字强转为数字
     * @returns {Array}
     */
    public static listToArray = (data: Array<any>, key?: string, flag?: any) => {
        if (typeof(data) === 'undefined') return []
        if (typeof(key) === 'undefined') key = 'key'
        let list = []

        data.forEach((model) => {
            let value = model[key]
            value = value.toString()
            if (flag) {
                value = Number(value)
                if (isNaN(value))
                    value = model[key]
            }
            list.push(value)
        })
        return list
    }

    /**
     * 将数组的某个特殊字段转集合 (暂未处理多层次对象)
     * 与 listToArray 相对
     * @param data 原数组
     * @param key 原属性值
     * @param flag 强转标示,目前将字符串类型的数字强转为数字
     * @returns {Array}
     */
    public static arrayToList = (data: Array<any>, key?: string, flag?: any) => {
        if (JsonUtil.isEmpty(data)) return []
        if (typeof(key) === 'undefined') key = 'key'
        let list = []
        data.forEach((e) => {
            let model = {}
            let value = e
            if (flag) {
                value = Number(value)
                if (isNaN(value))
                    value = e
            }
            model[key] = value
            list.push(model)
        })
        return list
    }

    /**
     * 是否为空
     * null或undefined或data为空字符串,皆为空,返回true,否则返回false
     * @param data 值
     * @returns {boolean}
     */
    public static isEmpty = (data: any) => {
        return data === null || (!data) || data.length === 0
    }

    /**
     * 判断两字符串是相同
     * @param data
     * @param {string} result
     * @returns {boolean}
     */
    public static isEqualStr = (data: any, result: string) => {
        return data !== null && data && data === result
    }

    /**
     * 判断是否为数字
     * @param data 值
     * @returns {boolean | boolean}
     */
    public static isNumber = (data: any) => {
        return data ? !isNaN(data) && data !== '' : false
    }

    /**
     * 本方法不对外开放
     * 多层次json对象处理: 根据路径设置值
     * 根据路径设置值,路径乘积以句号(.)隔开
     * 单对象例子: "mhSplit.patientVisit.name"
     * 数组对象例子: "mhSplit.triageRecord.0.pvId",其中 0 是数字,表示数组第1个对象
     * @param keys 路径数组
     * @param json 设置值对象
     * @param value 设置值
     * @param index 索引
     * @returns {any}
     */
    private static jsonChange = (keys: string[], json: any, value: any, index: number) => {
        if (index >= keys.length) return json// index不能大于等于数组的长度
        let key = keys[index]// 根据index获取值
        if (index < keys.length - 1) {
            // 当json无值且路径未结束时,强制定义且初始化,属性类型为数字时,定义为数据,否则为单个对象
            if (!json[key]) {
                if (typeof(key) === 'number') {
                    json[key] = []
                } else {
                    json[key] = {}
                }
            }
            json[key] = JsonUtil.jsonChange(keys, json[key], value, index + 1)
        } else {
            json[key] = value
        }
        return json
    }
}