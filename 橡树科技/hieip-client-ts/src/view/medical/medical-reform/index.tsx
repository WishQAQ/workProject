// 病历改整

import React from 'react'
import {LazyLoader} from 'tools/lazyLoader'
import styles from './style/index.scss'
import ReformHeaderView from 'view/medical/medical-reform/reform-header'
import ReformContentView from 'view/medical/medical-reform/reform-content'
import HistoryModal from './reform-history-modal'
import NoticeModal from './reform-notice-modal'
import DefectModal from './reform-defect-modal'

interface MedicalReformProps {
    [propName: string]: any
}

interface MedicalReformState {
    [propName: string]: any
}

export default class MedicalReform extends React.Component<MedicalReformProps, MedicalReformState> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.root}>
                <LazyLoader lazyModule={ReformHeaderView}/>
                <LazyLoader lazyModule={ReformContentView}/>
                <LazyLoader lazyModule={HistoryModal}/>
                <LazyLoader lazyModule={NoticeModal}/>
                <LazyLoader lazyModule={DefectModal}/>
            </div>
        )
    }
}
