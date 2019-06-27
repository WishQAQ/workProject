/**
 *  格式时间工具
 * Created by mod on 2017/12/5
 */

'use strict'

import * as moment from 'moment'

export namespace moments {
    export function formatYMDHms8() {
        // console.log(this)

        moment(this).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]')
    }

    export function formatYMDHms() {
        return moment(this).format('YYYY-MM-DD hh:mm:ss')
    }

    export function formatYMDHm() {
        return moment(this).format('YYYY-MM-DD hh:mm')
    }

    export function formatYMDH() {
        return moment(this).format('YYYY-MM-DD hh')
    }
}

let time = 'Wed Dec 06 2017 19:20:11 GMT+0800 (中国标准时间)'

// moments(time).formatYMDHms8();