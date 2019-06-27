/**
 * 模糊查询
 * Created by 牟娟 on 2017/12/18.
 */
import * as React from 'react'
import { LazyLoader } from 'tools/lazyLoader'
import { Col, Row } from 'antd'
import Left from './left/left'
import Right from './right/right'
import css from './style/index.scss'

export default class InputDict extends React.Component {

    render() {
        return (
            <Row gutter={12} className={css.fuzzy}>
                <Col span={4}>
                    <LazyLoader lazyModule={Left}/>
                </Col>
                <Col span={20} className={css.padding}>
                    <LazyLoader lazyModule={Right}/>
                </Col>
            </Row>
        )
    }
}