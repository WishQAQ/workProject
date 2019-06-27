import React from 'react'
import classNames from 'classnames'
import { Tooltip } from 'antd'
import { Btn } from 'pkg/common/button'
import { IconFont } from 'pkg/common/icon'
import styles from './style/index.scss'

export interface ClassifyProps {
    /** 标签数据 */
    data: Array<object>
    /** 分类所需字段 */
    option: TagsOption
    /** 关闭标签 */
    onTagClose: (v: object) => void
    /** className */
    className?: string
    /** 样式 */
    style?: React.CSSProperties
}

export interface TagsOption {
    tip?: string
    value?: string
    classifyId?: number // 所选分类ID
}

/**
 * 增加评分弹窗
 */
export class Tags extends React.Component<ClassifyProps> {
    render() {
        let { data, option, onTagClose, className, style } = this.props
        return (
            <div className={classNames(className, styles.tags)} style={style}>
                {
                    data ? Object.keys(data).map((v) =>
                            <Tooltip key={v} title={data[v][option.tip]}>
              <span className={styles.tagsSpan}>
                {data[v][option.value]}
                  <span onClick={() => onTagClose(data[v])}>
                  <IconFont iconName="icon-iconfontshequyijujue"/>
                </span>
              </span>
                            </Tooltip>
                    ) : null
                }
            </div>
        )
    }
}
