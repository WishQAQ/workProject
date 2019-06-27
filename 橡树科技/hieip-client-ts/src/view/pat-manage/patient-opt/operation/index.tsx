import React from 'react'
import { Layout } from 'antd'
import { LazyLoader } from 'tools/lazyLoader'
import Information from './information'
import Table from './table'
import HistoryTable from './historyTable'
import styles from './index.scss'

const { Header, Footer, Sider, Content } = Layout

export default class Operation extends React.Component {
    // title: '手术申请';
    render() {
        return (
            <div className={styles.operation}>
                <div>
                    <div>
                        <LazyLoader lazyModule={Information}/>
                    </div>
                    <div>
                        <LazyLoader lazyModule={Table}/>
                    </div>
                </div>
                <div>
                    <LazyLoader lazyModule={HistoryTable}/>
                </div>
            </div>
        )
    }
}