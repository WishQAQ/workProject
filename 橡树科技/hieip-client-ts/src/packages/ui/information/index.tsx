import React from 'react'
import classNames from 'classnames'
import { Col, Row } from 'antd'
import { LabelBox } from '../labelBox'
import styles from './style/index.scss'

export interface Formation {
    /** 遍历对象 */
    data: Array<Tem>
    /** 该组件className */
    className?: string
    /** labelBox组件外框className */
    layoutClassName?: string
}

export interface Tem {
    text?: string
    col: number
    asterisk?: boolean
    /** labelBox左侧文字className */
    labelClassName?: string
    /** labelBox左侧宽度 */
    labelWidth: number
    /** labelBox左侧style */
    labelStyle?: React.CSSProperties
    /** 组件 */
    component: any
}

export class Information extends React.Component<Formation> {

    render() {
        const { data, className, layoutClassName } = this.props
        return (
            <div className={classNames(className, styles.information)}>
                <Row>
                    {data && data.length ?
                        Object.keys(data).map((v: any) =>
                            <Col span={data[v].col} key={v}>
                                <LabelBox
                                    text={data[v].text || ''}
                                    asterisk={data[v].asterisk || false}
                                    className={classNames(layoutClassName, styles.labelBox)}
                                    className2={data[v].labelClassName || ''}
                                    labelWidth={data[v].labelWidth}
                                    labelStyle={data[v].labelStyle || null}>
                                    {data[v].component || null}
                                </LabelBox>
                            </Col>
                        ) : null}
                </Row>
            </div>
        )
    }
}