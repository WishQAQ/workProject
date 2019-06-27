/**
 * 数据元
 * 韦祎伟
 */
import React from 'react'
import styles from './index.scss'
import { LazyLoader } from 'tools/lazyLoader'
import { Col, Row } from 'antd'

import DataCite from './data-cite'
import DataItem from './data-item'
import DataList from './data-list'

export default class DataElement extends React.Component<any, any> {

    render() {
        return (
            <div className={styles.root}>
                <Row>
                    <Col span={14} style={{ paddingRight: '12px' }}>
                        <LazyLoader lazyModule={DataList}/>
                    </Col>
                    <Col span={10}>
                        <div style={{ height: '50%' }}>
                            <LazyLoader lazyModule={DataItem}/>
                        </div>
                        <div style={{ height: '50%' }}>
                            <LazyLoader lazyModule={DataCite}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}