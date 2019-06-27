// 患者病历管理侧边栏

import * as React from 'react'
import MedicalDefects from './medical-defect'
import MedicalHistory from './medical-history'
import {LazyLoader} from 'tools/lazyLoader'
import styles from './style/index.scss'

export default class MedicalSidebar extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <LazyLoader lazyModule={MedicalHistory}/>
                <LazyLoader lazyModule={MedicalDefects}/>
            </div>
        )
    }
}