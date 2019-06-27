/**
 *  关键词
 *  韦祎伟
 */
import React from 'react'
import { LazyLoader } from 'tools/lazyLoader'
import styles from './index.scss'

import SortList from './sort-list'
import SortDetail from './sort-detail'

export default class Keyword extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <LazyLoader lazyModule={SortList}/>
                </div>
                <div className={styles.right}>
                    <LazyLoader lazyModule={SortDetail}/>
                </div>
            </div>
        )
    }
}