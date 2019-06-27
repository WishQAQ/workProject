/**
 *     患者列表页面
 *     Created by mod on 2017/12/12
 *
 *    新分诊 下面 患者列表页面
 */
import React from 'react'
import * as style from './style/index.scss'
import { Layout } from 'antd'
import PatientModal from 'view/triage/patient-list/patient-modal'
import PatientHead from './patient-head'
import { LazyLoader } from 'tools/lazyLoader'
import PatientContent from './patient-content'

/** patient1 患者列表页面  */
export default class PatientList extends React.Component {
    /** render return JSX */
    render(): JSX.Element {
        return (
            <div className={style.patientList}>
                <LazyLoader lazyModule={PatientModal}/>
                <Layout>
                    <LazyLoader lazyModule={PatientHead}/>
                    <LazyLoader lazyModule={PatientContent}/>
                </Layout>
            </div>
        )
    }
}
