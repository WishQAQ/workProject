// basic
import React from 'react'
import moment from 'moment'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// lazyLoader
import {LazyLoader} from 'tools/lazyLoader'
// page
import OutpatientClinicRecordLeft from './record-left/index'
import OutpatientClinicRecordRight from './record-right/index'

export interface State {}

export default class OutpatientClinicRecord extends React.Component<any, State> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {} = this.state
        return (
            <div className={styles.root}>
                <div className={styles.sidebar}>
                    <LazyLoader lazyModule={OutpatientClinicRecordLeft}/>
                </div>
                <div className={styles.medical}>
                    <LazyLoader lazyModule={OutpatientClinicRecordRight}/>
                </div>
            </div>
        )
    }
}