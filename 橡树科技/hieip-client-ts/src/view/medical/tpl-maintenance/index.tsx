/**
 *  大模板, 小模板页面
 *
 */
import React from 'react'
import { Layout } from 'antd'
import style from './style/index.scss'
import { LazyLoader } from 'tools/lazyLoader'
import TplMaintenanceSlider from './tpl-maintenance-slider'
import TplMaintenanceContent from './tpl-maintenance-content'
import BigModal from './big-modal'
import SamllModal from './small-modal'
import ClassifyModal from './classify-modal'

export default class TplMaintenance extends React.Component<any, any> {
    render() {
        return (
            <div className={style.tplMaintenance}>
                <Layout>
                    <LazyLoader lazyModule={TplMaintenanceSlider}/>
                    <LazyLoader lazyModule={TplMaintenanceContent}/>
                </Layout>
                <LazyLoader lazyModule={BigModal}/>
                <LazyLoader lazyModule={SamllModal}/>
                <LazyLoader lazyModule={ClassifyModal}/>
            </div>
        )
    }
}
