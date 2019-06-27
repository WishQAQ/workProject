/**
 * Created by mod on 2018/1/8.
 *
 * 电子病历 医疗文档中心
 *
 */

import * as React from 'react'
import { Layout } from 'antd'
import { LazyLoader } from 'src/tools/lazyLoader'
import DocumentContent from './components/content'
import DocumentSider from './components/sider'
import * as css from '../translate/style/index.scss'

export default class MedicalDocument extends React.Component {

    render() {
        return (
            <div className={css.translate}>
                <Layout style={{ height: '100%' }}>
                    <LazyLoader lazyModule={DocumentSider}/>
                    <LazyLoader lazyModule={DocumentContent}/>
                </Layout>
            </div>
        )
    }
}