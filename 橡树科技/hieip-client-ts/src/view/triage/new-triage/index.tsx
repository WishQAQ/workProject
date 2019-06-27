import React from 'react'
import { Col, Row } from 'antd'
import { LazyLoader } from 'tools/lazyLoader'
import SickInfoPanel from './patient'
import Vital from './vital-sign'
import PatientScore from './score'
import Grading from './triage'
import styles from './index.scss'

export default class Triage extends React.Component {
    // title: '新分诊';
    render() {
        return (
            <Row className={styles.split}>
                <Col span={9} className={styles.leftBasicInfo}>
                    <div className="sickInfoPanel"><LazyLoader lazyModule={SickInfoPanel} /></div>
                    <LazyLoader lazyModule={Vital} />
                </Col>
                <Col span={15}>
                    <LazyLoader lazyModule={PatientScore} />
                    <LazyLoader lazyModule={Grading} />
                </Col>
            </Row>
        )
    }
}