import React from 'react'
import classnames from 'classnames'
import styles from './style/index.scss'

export interface TabState {
    index: number
}

export interface TabProps {
    /** tabs数据 */
    tabs: Array<TabsObject>
    /** 样式 */
    className?: string
    /** 额外的头部 */
    extraHeard?: JSX.Element | JSX.Element[]
    /** 额外的内容 */
    extraContent?: JSX.Element | JSX.Element[]
    /** 定位到第几个选项卡 */
    index?: number
    /** 一开始加载时定位到的选项卡 */
    defaultIndex?: number
    /** 点击选项卡事件 */
    onClick?: (v: number) => void
}

export interface TabsObject {
    value: string
    content: JSX.Element
}

/**
 * TAB
 */
export class Tab extends React.Component<TabProps, TabState> {
    /**
     * 构造函数
     * @param {object} props
     */
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    /** 渲染前 */
    componentWillMount() {
        let { index, defaultIndex } = this.props
        if (index || index === 0) {
            this.setState({ index: index })
        } else if (defaultIndex || defaultIndex === 0) {
            this.setState({ index: defaultIndex })
        }
    }

    /** props发生改变 */
    componentWillReceiveProps(props) {
        let index = props.index
        if ((index || index === 0) && index !== this.state.index) {
            this.setState({ index: index })
        }
    }

    /** 点击tag */
    onTagClick(k) {
        let { index } = this.props
        if (!index && index !== 0) {
            this.setState({ index: k })
        }
        if (this.props.onClick) {
            this.props.onClick(k)
        }
    }

    /**
     * @returns {any}
     */
    render() {
        let { tabs, className, extraHeard, extraContent } = this.props
        let { index } = this.state
        return (
            <div className={classnames(className, styles.tab)}>
                <div className={styles.header}>
                    {
                        tabs.map((v, k) =>
                            <div key={k}
                                 className={`${index === k ? styles.active : ''} ${styles.card}`}
                                 onClick={() => this.onTagClick(k)}>
                                {tabs[k].value}</div>
                        )
                    }
                    {extraHeard}
                </div>
                <div className={styles.content}>
                    {extraContent}
                    {
                        tabs.map((v, k) =>
                            index === k ? <div key={k}>{tabs[k].content}</div> : null
                        )
                    }
                </div>
            </div>
        )
    }
}