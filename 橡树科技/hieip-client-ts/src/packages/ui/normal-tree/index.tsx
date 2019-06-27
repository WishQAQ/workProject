/**
 * 检查专用图形树
 */
import React from 'react'
import css from './style/index.scss'
import { IconFont } from 'pkg/common/icon'

export interface TreeProps {
    examTreeData: Array<TreeData> // 首级树
    examTreeDataSec?: Array<SecTreeData> // 次级数
    onClick?: (event: React.MouseEvent<HTMLElement>) => void // 一级查询
    treeClick?: (event: React.MouseEvent<HTMLElement>) => void // 二级查询
    open?: boolean // 点击二级树打开
}

export interface TreeState {
    oneTree: number // 点击的树
    secTree: number // 点击二层树
}

interface TreeData {
    serialNo?: number
    examClassName?: string
    name?: string
}

interface SecTreeData {
    inputCode?: string
    description?: string
    descriptionCode?: string
}

export default class NormalTree extends React.Component<TreeProps, TreeState> {
    constructor(props) {
        super(props)
        this.state = {
            oneTree: -1,
            secTree: -1
        }
    }

    /**
     * 点击首层请求数据
     */
    clickFetch = (click, e, data) => {
        if (this.props.onClick) {
            this.props.onClick(data)
        }
        if (this.state.oneTree === click) {
            this.setState({ oneTree: -1, secTree: -1 })
        }
        else {
            this.setState({ oneTree: click, secTree: -1 })
        }
    }

    /**
     * 二层点击
     */
    secondClick = (click, e) => {
        e.stopPropagation()
        this.setState({ secTree: click })
    }

    /**
     * 双击获取数据
     */
    secondDoubleClick = (e, data) => {
        e.stopPropagation()
        if (this.props.treeClick) {
            this.props.treeClick(data)
        }
    }

    render() {
        let { examTreeData, examTreeDataSec, open } = this.props
        let { oneTree, secTree } = this.state
        return (
            <div className={css.treeMain}>
                <ul className={css.treeOne}>
                    {examTreeData.map((e, index) => {
                        return <li
                            onClick={(event) => this.clickFetch(index, event, e)}
                            key={`first${index}`}
                        >
              <span className={`${oneTree === index ? css.treeOneSelect : ''}`}>
                <IconFont iconName={'icon-jia-'}/>{e.name}</span>
                            {open && oneTree === index ? <ul className={css.treeSec}>
                                {examTreeDataSec.map((q, i) => {
                                    return <li key={i} onClick={(e) => e.stopPropagation()}>
                                        <IconFont iconName={'icon-wenjian'} iconClass={css.fontClass}/>
                                        <span className={`${css.fontStyle} ${secTree === i ? css.treeOneSelect : ''}`}
                                              onClick={(e) => this.secondClick(i, e)}
                                              onDoubleClick={(e) => this.secondDoubleClick(e, q)}
                                        >
                      {q.description}
                    </span>
                                    </li>
                                })}
                            </ul> : false}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}