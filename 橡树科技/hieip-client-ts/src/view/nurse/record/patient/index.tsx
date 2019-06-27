/**
 * 人员——护理记录单书写
 * Created by mou on 2018/2/28.
 */
import React from 'react'
import {Row, Col} from 'antd'
import Left from 'view/nurse/record/patient/left'
import Right from 'view/nurse/record/patient/right'
import {LazyLoader} from 'tools/lazyLoader'
import css from './style/index.scss'
export default class Patient extends React.Component {
    render() {
        return (  <Row gutter={12} className={css.recordDept}>
            <Col span={4}>
                <LazyLoader lazyModule={Left}/>
            </Col>
            <Col span={20}>
                <LazyLoader lazyModule={Right}/>
            </Col>
        </Row>)
    }
}