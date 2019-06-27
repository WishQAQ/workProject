/**
 *  病历召回申请
 *  create by wx
 */
import React from 'react'
import * as style from './style/index.scss'
import RecallHeader from './recall-header'
import RecallMainTop from './recall-main-top'
import RecallMainBottom from './recall-main-bottom'
import { LazyLoader } from 'tools/lazyLoader'

export default class MedicalRecall extends React.Component<any, any> {
    render() {
        return (
            <div className={style.medicalRecall}>
                <LazyLoader lazyModule={RecallHeader}/>
                <LazyLoader lazyModule={RecallMainTop}/>
                <LazyLoader lazyModule={RecallMainBottom}/>
            </div>
        )
    }
}