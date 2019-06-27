/**
 * 归档 create by wx
 */
import React from 'react'
import RecordArchivingHeadView from './record-archiving-head'
import RecordArchivingContentView from './record-archiving-content'
import {LazyLoader} from 'tools/lazyLoader'
import style from './style/index.scss'
import {Layout} from 'antd'

export default class MedicalRecordArchiving extends React.Component<any, any> {
    render() {
        return (
            <div className={style.RecordArch}>
                <Layout>
                    <LazyLoader lazyModule={RecordArchivingHeadView}/>
                    <LazyLoader lazyModule={RecordArchivingContentView}/>
                </Layout>
            </div>
        )
    }
}
