/**
 * Created by mod on 2017/12/25.
 *
 * 电子病历 病案签收
 *
 */

import * as React from 'react'
import {Layout} from 'antd'
import {LazyLoader} from 'src/tools/lazyLoader'
import MedicalSignContentView from './components/content'
import MedicalSignHeadView from './components/header'
import * as css from './style/index.scss'

export default class MedicalSign extends React.Component {

    render() {
        return (
            <div className={css.medicalSign}>
                <Layout style={{height: '100%'}}>
                    <LazyLoader lazyModule={MedicalSignHeadView}/>
                    <LazyLoader lazyModule={MedicalSignContentView}/>
                </Layout>
            </div>
        )
    }
}