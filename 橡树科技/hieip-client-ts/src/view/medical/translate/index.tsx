/**
 * Created by mod on 2017/12/25.
 *
 * 电子病历 模板制作页面
 *
 */

import * as React from 'react'
import { Layout } from 'antd'
import { LazyLoader } from 'src/tools/lazyLoader'
import TranslateContent from './components/content'
import TranslateSider from './components/sider'
import * as css from './style/index.scss'

export default class Translate extends React.Component {

    render() {
        return (
            <div className={css.translate}>
                <Layout style={{ height: '100%' }}>
                    <LazyLoader lazyModule={TranslateSider}/>
                    <LazyLoader lazyModule={TranslateContent}/>
                </Layout>
            </div>
        )
    }
}