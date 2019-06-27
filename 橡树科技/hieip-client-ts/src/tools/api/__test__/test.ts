import { ApiUtil } from '../ApiUtil'
import moment, { Moment } from 'moment'

describe('api', () => {
    it('should 测试时间字符传转moment', function () {
        const time = ApiUtil.formatStringToMoment('2015-12-23T02:12:54Z')
        expect(time.toDate().getTime()).toEqual(1450807974000)
    })
    it('should 测试moment转string', function () {
        const date = new Date(1450807974000)
        const str = ApiUtil.formatMomentToString(moment(date))
        expect(str).toEqual('2015-12-23T02:12:54+08:00')
    })
    it('should 测试接收数据转码', function () {
        const result = ApiUtil.formatResult({ time: '123443T12837z', time2: '2015-12-23T02:12:54Z' })
        expect(typeof result.time).toEqual('string')
        expect(moment.isMoment(result.time2)).toEqual(true)
        expect((result.time2 as Moment).format('YYYY-MM-DD hh:mm:ss')).toEqual('2015-12-23 02:12:54')
    })
    it('should 测试传出数据转码', function () {
        const date = new Date(1450807974000)
        const body = ApiUtil.formatBody({ time: 'abc%4232', time2: moment(date) })
        expect(body).toEqual(`time=abc%254232&time2=2015-12-23T02%3A12%3A54%2B08%3A00`)
    })
})