/**
 * 基础自动质控项目
 */
import React from 'react'
import * as style from './style/index.scss'
import { LazyLoader } from 'tools/lazyLoader'
import QualityMaintenanceLeft from './quality-maintenance-left'
import QualityMaintenanceRight from './quality-maintenance-right'

export default class QualityMaintenance extends React.Component<any, any> {
    render() {
        return (
            <div className={style.qualityMaintenance}>
                <div className={style.leftWrap}>
                    <LazyLoader lazyModule={QualityMaintenanceLeft}/>
                </div>
                <div className={style.rightWrap}>
                    <LazyLoader lazyModule={QualityMaintenanceRight}/>
                </div>
            </div>
        )
    }

}