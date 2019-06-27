import { hash } from '../index'

describe('hash算法测试', function () {
    it('should hash测试', function () {
        expect(68812145486).toEqual(hash.hashCode('admin'))
        expect(68719479917).toEqual(hash.hashCode('cq'))
    })
})