import * as React from 'react'
import { ReactNode } from 'react'
import * as styles from './style/index.sass'
import classNames from 'classnames'

export interface Props {
    /**
     * class名称
     */
    className?: string
    /**
     * 文字
     */
    text?: string
    /**
     * title显示组件
     */
    extra?: ReactNode
    /**
     * style样式
     */
    style?: React.CSSProperties
}

/**
 * 布局卡片
 */
export class Card extends React.Component<Props, {}> {
    /**
     * 渲染虚拟DOM，并返回ReactElement
     * @return {XML}
     */
    render() {
        let { className, text, extra, style } = this.props
        return (
            <div className={classNames(className, styles.card)} style={style}>
                <div className={styles.head}>
                    <p className={styles.headP}>{text}</p>
                    {extra}
                </div>
                {this.props.children}
            </div>
        )
    }
}