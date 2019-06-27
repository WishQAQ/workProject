import React from 'react'
import { LazyLoader } from 'tools/lazyLoader'
import Information from './information'
import BoolTable from './table'
import HistoryTable from './history-table'
import styles from './index.scss'

export default class Blood extends React.Component {
    // title: '手术申请';
    render() {
        return (
            <div className={styles.operation}>
                <div>
                    <div>
                        <LazyLoader lazyModule={Information}/>
                    </div>
                    <div>
                        <LazyLoader lazyModule={BoolTable}/>
                    </div>
                </div>
                <div>
                    <LazyLoader lazyModule={HistoryTable}/>
                </div>
            </div>
        )
    }
}