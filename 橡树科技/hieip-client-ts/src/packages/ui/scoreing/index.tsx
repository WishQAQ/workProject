import React from 'react'
import classNames from 'classnames'
import { IconFont, IconProps } from 'pkg/common/icon'
import style from './style/index.scss'

export interface ScoreingProps extends IconProps {
    /** 需要显示的数据 */
    data: Array<object>
    /** 显示数据需要的字段 */
    option: Option
    /** 整体样式 */
    styles?: React.CSSProperties
    /** 点击X */
    click: (v: object) => void
    /** class */
    className?: string
}

export interface Option {
    value?: string
    level?: string
    content?: string
}

export interface ScoreState {
    /** 计算头部的高度 */
    height: number
}

/**
 * 得分详情
 */
export class Scoreing extends React.Component<ScoreingProps, ScoreState> {
    scoreBlock = null

    constructor(ScoreingProps) {
        super(ScoreingProps)
        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        this.setState({ height: document.getElementsByClassName('scoreing_Span')[0].clientHeight })
    }

    render() {
        let { height } = this.state
        let { data, option, styles, click, iconName, className } = this.props
        return (
            <div className={classNames(style.scoreing, style[className])} style={styles}>
                <div className={`scoreing_Span ${style.scoreBlock1} ${style.scoreSpan}`}>
                    <span>自动评分项</span>
                    <span>层级</span>
                    <span/>
                    <span>操作</span>
                </div>
                <div className={style.scoreBlock2} style={{ height: `calc(100% - ${height}px)` }}>
                    {
                        option ? Object.keys(data).map((v) =>
                            <div key={v} className={style.scoreSpan}>
                                <span>
                                    <button className={style[`level${data[v][option.level]}`]}>
                                        {data[v][option.value]}
                                    </button>
                                </span>
                                <span>
                                    <i className={style[`level${data[v][option.level]}`]}>
                                        {data[v][option.level]}
                                    </i>
                                </span>
                                <span title={data[v][option.content]}>
                                    <p>{data[v][option.content]}</p>
                                </span>
                                <span onClick={click.bind(this, data[v])}>
                                    <IconFont iconName={iconName} hover={true}/>
                                </span>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
