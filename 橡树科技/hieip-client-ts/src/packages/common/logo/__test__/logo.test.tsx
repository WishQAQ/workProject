import React from 'react'
import { Logo } from '../index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('LOGO 测试', () => {
    it('should 初始化', function () {
        const logo = mount(<Logo/>)
        expect(logo.props().big).toEqual(false)
        expect(logo.state().big).toEqual(false)
        // expect(logo.find("img").getDOMNode().className.match(/^logo/))
    })

    it('should 改为大LOGO', function () {
        const logo = mount(<Logo/>)
        logo.setProps({ big: true })
        expect(logo.state().big).toEqual(true)
    })

    it('should 改为小logo', function () {
        const logo = mount(<Logo/>)
        logo.setProps({ big: true })
        expect(logo.state().big).toEqual(true)
        logo.setProps({ big: false })
        expect(logo.state().big).toEqual(false)
    })
})
