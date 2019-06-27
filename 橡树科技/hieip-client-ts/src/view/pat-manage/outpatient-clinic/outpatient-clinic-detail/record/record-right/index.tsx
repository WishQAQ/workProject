// basic
import React from 'react'
import moment from 'moment'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// medical
import { Medical, ReadMode } from 'medical-draft'

export interface State {
}

export default class OutpatientClinicRecordRight extends React.Component<any, State> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {} = this.state
        return (
            <div className={styles.root}>
                <Medical
                    editorState={null}
                    pageHeader={null}
                    pageFooter={null}
                    readMode={ReadMode.readWrite}
                    isShowTabbar={false}
                />
            </div>
        )
    }
}