import React from 'react'
import classnames from 'classnames'
import { Layout } from 'antd'
import { Label } from 'pkg/common/label'
import styles from './style/index.scss'

const { Header, Footer, Sider, Content } = Layout

interface LabelBoxProps {
    /**
     * 字体颜色
     */
    type?: 'primary' | 'dashed' | 'danger' | string
    /**
     * 是否显示星号
     * @default false
     */
    asterisk?: boolean
    /**
     * 星号位置 - asterisk为true生效
     * @default right
     */
    riskPosition?: 'left' | 'right'
    /**
     * class接口
     */
    className?: string
    className2?: string
    /**
     * label显示的文字
     */
    text?: string
    /**
     * label宽度
     */
    labelWidth?: number
    /** style */
    style?: React.CSSProperties
    /** label的style */
    labelStyle?: React.CSSProperties
}

export class LabelBox extends React.Component<LabelBoxProps, any> {
    static defaultProps = {
        asterisk: false,
        labelStyle: {}
    }

    render() {
        const {
            type, asterisk, riskPosition, className, className2, labelWidth, text,
            style, labelStyle
        } = this.props
        return (
            <Layout className={classnames(styles.labelBox, className)} style={style}>
                {text ?
                    <Sider width={labelWidth}>
                        <Label
                            style={labelStyle}
                            type={type}
                            asterisk={asterisk}
                            riskPosition={riskPosition}
                            className={classnames(styles.label, className2)}>{text}</Label>
                    </Sider> : null}
                <Content style={{ overflow: 'visible' }}>
                    <div>
                        {this.props.children}
                    </div>
                </Content>
            </Layout>
        )
    }
}
