/**
 *  固定值
 */
import React from 'react'
import { Layout } from 'antd'
import FixedValueContent from './bd-fixed-content/index'
import style from './style/index.scss'
import { LazyLoader } from 'tools/lazyLoader'
import FixedValueHeader from './bd-fixed-slider'

export default class FixedValue extends React.Component<any, any> {
    render() {
        return (
            <div className={style.fixedValue}>
                <Layout>
                    <LazyLoader lazyModule={FixedValueHeader}/>
                    <LazyLoader lazyModule={FixedValueContent}/>
                </Layout>
            </div>
        )
    }
}
