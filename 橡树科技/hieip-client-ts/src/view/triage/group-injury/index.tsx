import React from 'react'
import css from './index.scss'
import HurtEvent from './hurt-event/index'
import HurtList from './hurt-list/index'
import { LazyLoader } from 'tools/lazyLoader'
import { Col, Row } from 'antd'

export default class GroupHurt extends React.Component {
    render() {
        return (
            <Row className={css.mainHurt}>
                <Col span={6}>
                    <LazyLoader lazyModule={HurtEvent}/>
                </Col>
                <Col span={18}>
                    <LazyLoader lazyModule={HurtList}/>
                </Col>
            </Row>
        )
    }
}
