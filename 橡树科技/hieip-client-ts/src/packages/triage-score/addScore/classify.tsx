import React from 'react'
import { Radio, Spin } from 'antd'
import classnames from 'classnames'
import styles from './style/index.scss'

export interface ClassifyProps {
    /** 分类 */
    data: Array<object>
    /** 分类所需字段：[名称,KEY值]，顺序固定 */
    option: ClassifyObject
    /** tags数据 */
    tags?: Array<object>
    /** 分类所需字段：[分类名,判定依据名,所选分类ID,所选判定依据ID]，顺序固定 */
    tagsOption?: TagsObject
    /** 点击分类 */
    onClick: (v: object) => void
    /** className */
    className?: string
    /** 样式 */
    style?: React.CSSProperties
}

export interface ClassifyObject {
    name?: string
    key?: string
}

export interface TagsObject {
    tip?: string
    value?: string
    classifyId?: string // 所选分类ID
}

/**
 * 分类 | 主诉
 */
export class Classify extends React.Component<ClassifyProps> {
    render() {
        let { data, option, onClick, tags, tagsOption, className, style } = this.props
        return (
            <div className={classnames(className, styles.classify)} style={style}>
                {
                    data && data.length && option ? Object.keys(data).map((v) => {
                        let name = data[v][option.name]
                        let key = data[v][option.key]
                        let bool: boolean = !!(tags && tags.find((x) =>
                            key === x[tagsOption.classifyId]))
                        return <span key={v} onMouseDown={(x) => onClick(data[v])}>
                            <Radio checked={bool}>
                                {name}
                            </Radio></span>
                    }) : <Spin/>
                }
            </div>
        )
    }
}
