/**
 * Created by mod on 2017/12/25.
 */

'use strict'
import * as React from 'react'
import RenderMenu from 'pkg/ui/menu'
import debug from 'debug'
import { TranStae } from './translate'

const log = debug('trace:病历:translate')

const Fixedata = [
    { name: '刷新诊断信息' },
    { name: '添加常用检查' }
]

export default class Btnoper extends React.Component<TranStae> {

    render() {
        return (
            <section style={{ height: '100%' }}>
                <RenderMenu
                    onClick={(title, e) => this.props.onChange('btnoper-menu', title, e)}
                    fixedata={Fixedata}
                    fixetype={'name'}
                />
            </section>
        )
    }
}