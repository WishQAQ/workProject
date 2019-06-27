import React from 'react'
import classnames from 'classnames'
import { Checkbox, Spin } from 'antd'
import styles from './style/index.scss'

export interface JudgmentBasisProps {
    /** 判定依据 */
    data: Array<object>
    /** 判定依据所需字段：[名称,等级] */
    option: JudgmentBasisOption
    /** 点击判定依据 */
    onClick: (datas: Array<any>, v: object, k: number, n: boolean) => void
    /** 样式 */
    className?: string
    style?: React.CSSProperties
}

export interface JudgmentBasisState {
    index: Array<string>
}

export interface JudgmentBasisOption {
    name?: string
    level?: string
}

/**
 * 判定依据
 */
export class JudgmentBasis extends React.Component<JudgmentBasisProps, JudgmentBasisState> {
    constructor(props) {
        super(props)
        this.state = {
            index: []
        }
    }

    onClick(v, k) {
        let data = this.props.data
        let index = this.state.index
        let n = index.indexOf(k)
        let datas = []
        if (n === -1) {
            index.push(k)
        } else {
            index.splice(n, 1)
        }
        this.setState({ index: index })
        for (let i = 0; i < index.length; i++) {
            datas.push(data[index[i]])
        }
        this.props.onClick(datas, v, k, n === -1)
    }

    /**
     * render
     * @return {JSX} *
     */
    render() {
        let { index } = this.state
        let { data, option, onClick, className, style } = this.props
        return (
            <div className={classnames(className, styles.judgmentBasis)}>
                <ul>
                    {
                        data && data.length && option ? Object.keys(data).map((v) => {
                            let name = data[v][option.name]
                            let level = data[v][option.level]
                            return <li key={v} title={name}
                                       onClick={() => this.onClick(data[v], v)}>
                                <Checkbox className={styles.checkBox} checked={index.indexOf(v) !== -1}/>
                                <p className={styles[`level${level}`]}>{level}</p>
                                <span>{name}</span>
                            </li>
                        }) : <Spin/>
                    }
                </ul>
            </div>
        )
    }
}