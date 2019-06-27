/**
 * 检验页面 by hhc
 */

import React from 'react'
import { Col, Row } from 'antd'
import { LazyLoader } from 'tools/lazyLoader'
// model
import RightApply from './rightApply'
import LeftMain from './leftApply'

export default class Lab extends React.Component {
    render() {
        return (
            <Row>
                <Col span={20}>
                    <LazyLoader lazyModule={LeftMain}/>
                </Col>
                <Col span={4}>
                    <LazyLoader lazyModule={RightApply}/>
                </Col>
            </Row>
        )
    }
}