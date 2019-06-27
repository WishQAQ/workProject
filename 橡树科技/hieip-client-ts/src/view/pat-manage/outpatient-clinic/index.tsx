// basic
import React from 'react'
// scss
import styles from './style/index.scss'
// tools
import {LazyLoader} from 'tools/lazyLoader'
// page
import OutpatientClinicDetail from './outpatient-clinic-detail/index'
import OutpatientClinicList from './outpatient-clinic-list/index'
import OutpatientClinicInformation from './outpatient-clinic-information/index'

export default class OutpatientClinic extends React.Component<any,any>{
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.left}><LazyLoader lazyModule={OutpatientClinicList}/></div>
                <div className={styles.right}>
                    <LazyLoader lazyModule={OutpatientClinicInformation}/>
                    <LazyLoader lazyModule={OutpatientClinicDetail}/>
                </div>
            </div>
        )
    }
}