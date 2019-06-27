import moment, { Moment } from 'moment'
import qs from 'qs'
import $ from 'jquery'

export class ApiUtil {

    public static formatMomentToString(moment: Moment) {
        return moment.format('YYYY-MM-DD[T]HH:mm:ss[+08:00]')
    }

    public static formatStringToMoment(str: string) {
        return moment(str, 'YYYY-MM-DD[T]hh:mm:ss[Z]')
    }

    public static formatBody1(body) {
        const keys = Object.keys(body)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = body[key]
            if (val && typeof val === 'object') {
                if (moment.isMoment(val)) {
                    body[key] = this.formatMomentToString(val as Moment)
                } else if ('getDate' in val) {
                    body[key] = this.formatMomentToString(moment(val))
                } else {
                    if($.isEmptyObject(val)){
                        delete body[key]
                    }else{
                        ApiUtil.formatBody1(val)
                    }
                }
            }
        }
        return body
    }

    public static formatBody(body: any) {
        const newBody = this.formatBody1(body)
        const keys = Object.keys(newBody)
        const paramObject = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = newBody[key]
            if (val && typeof val === 'object') paramObject[key] = JSON.stringify(val)
            else if (val || val !== 'undefined' || val !== null) paramObject[key] = val
        }
        return qs.stringify(paramObject)
    }

    public static formatResult(result: any) {
        const keys = Object.keys(result)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val = result[key]
            if (val && typeof val === 'string' && val.indexOf('T') > 0 && val.lastIndexOf('Z') === val.length - 1
                && /^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}Z$/.test(val)) {
                result[key] = this.formatStringToMoment(val)
            }
        }
        return result
    }
}