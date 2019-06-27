import React from 'react'
import { Col, Row } from 'antd'
import PatientMenu from './patient-menu'
import { LazyLoader } from 'tools/lazyLoader'

export default class PatientOverview extends React.Component {
    render() {
        return (
            <Row>
                <Col span={6}>
                    <LazyLoader lazyModule={PatientMenu}/>
                </Col>
            </Row>
        )
    }
}