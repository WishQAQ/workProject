/**
 * 检查页面 by hhc
 */

import React from 'react'
import css from './style/exam.scss'
// model
import { Col, Row } from 'antd'
// my
import RightApply from './rightApply'

import ApplyInfo from './leftApply/applyTop'
import ApplyTable from './leftApply/applyBottom'
import { LazyLoader } from 'tools/lazyLoader'

export default class Exam extends React.Component {
    render() {
        return (
            <Row>
                <Col span={20} className={css.leftMain}>
                    <LazyLoader lazyModule={ApplyInfo}/>
                    <LazyLoader lazyModule={ApplyTable}/>
                </Col>
                <Col span={4}>
                    <LazyLoader lazyModule={RightApply}/>
                </Col>
            </Row>
        )
    }
}