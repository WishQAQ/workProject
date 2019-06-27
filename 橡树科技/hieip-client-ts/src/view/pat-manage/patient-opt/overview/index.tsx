/**
 * 患者概述
 * Created by mou on 2017/12/19.
 */
import * as React from 'react'
import { LazyLoader } from 'src/tools/lazyLoader/index'
import { Col, Row } from 'antd'
import Right from './right/right'
import MainContent from './main/index'
import css from './style/index.scss'

interface SummaryPatientProps {

}

interface StateType {

}

export default class SummaryPatient extends React.Component<SummaryPatientProps, StateType> {

    render() {
        return (
            <Row className={css.summary}>
                <Col span={20}>
                    <LazyLoader lazyModule={MainContent}/>
                </Col>
                <Col span={4}>
                    <LazyLoader lazyModule={Right}/>
                </Col>
            </Row>
        )
    }
}