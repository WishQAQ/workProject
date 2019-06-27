import React from 'react'
import css from './style/special.scss'
import {IconFont} from 'pkg/common/icon'

export interface SpecialProps {
    /**
     * 列规则数据
     */
    columns?: Array<TitleRole>
    /**
     * 列数据
     */
    dataSource?: Array<object>
    /**
     * 表头高
     */
    rowHeight?: number
    /**
     * 数据行高
     */
    rowDataHeight?: number
    /**
     * 二级菜单数据
     */
    secondListData?: Array<SecondParams>
    /**
     * 三级菜单数据
     */
    thirdListData?: Array<ThirdParams>
    /**
     * 一级操作
     */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    /**
     * 二级菜单操作
     */
    menuClick?: (event: React.MouseEvent<HTMLElement>) => void
    /**
     * 三级菜单操作
     */
    lastClick?: (event: React.MouseEvent<HTMLElement>) => void
}

/**
 * 主列表参数
 */
export interface TitleRole {
    /**
     * 列索引
     */
    field: string
    /**
     * 列名
     */
    headerName: string
}

/**
 * 二级菜单参数
 */
export interface SecondParams {
    /**
     * 表头
     */
    name: string
    /**
     * 图标
     */
    icon: string
}

/**
 * 三级菜单参数
 */
export interface ThirdParams {
    /**
     * 三级列规则
     */
    name: string
}

/**
 * 组件state
 */
interface SpecialState {
    selected: number
    open: boolean
    children: number
    nextChild: number
}

export class SpecialTable extends React.Component<SpecialProps, SpecialState> {
    constructor(props) {
        super(props)
        this.state = {
            selected: -1, // 被选项
            open: false, // 展开菜单
            children: -1, // 二级被选项
            nextChild: -1 // 三级子菜单
        }
    }

    /**
     * 一级菜单选中
     * @param selected
     */
    chooseWhich = (selected, e) => {
        if (this.props.onClick) {
            this.props.onClick(selected)
        }
        if (this.state.selected === selected) {
            this.setState({selected: -1})
        } else {
            this.setState({selected: selected})
        }
    }

    /**
     * 二级菜单选中并阻止默认冒泡事件
     * @param which
     * @param e
     */
    childrenWhich = (which, e) => {
        e.stopPropagation()
        if (this.props.menuClick) {
            this.props.menuClick(which)
        }
        if (this.state.children === which) {
            this.setState({children: -1})
        }
        else {
            this.setState({children: which})
        }
    }

    /**
     * 三级菜单选中并阻止默认冒泡事件
     * @param which
     * @param e
     */
    nextWhich = (which, e) => {
        e.stopPropagation()
        if (this.props.lastClick) {
            this.props.lastClick(which)
        }
        if (this.state.nextChild === which) {
            this.setState({nextChild: -1})
        }
        else {
            this.setState({nextChild: which})
        }
    }

    render() {
        let {columns, dataSource, rowHeight, rowDataHeight, secondListData, thirdListData} = this.props
        let {selected, children, nextChild} = this.state
        return (
            <div className={css.table}>
                <ul className={css.autoList}>
                    <li>
                        {columns.map((e, mainIndex) => {
                            return <span key={mainIndex}
                                         style={{
                                             width: `calc(100% / ${columns.length})`,
                                             height: rowHeight || 25,
                                             lineHeight: rowHeight || '25px'
                                         }}>{e.headerName}</span>
                        })}
                    </li>
                    {dataSource.map((e, dataIndex) => {
                        return <li key={dataIndex}
                                   onClick={this.chooseWhich.bind(this, dataIndex)}
                                   className={selected === dataIndex ? `${css.rowSelected}` : ''}
                        >
                            {columns.map((r, colIndex) => {
                                return <span key={colIndex}
                                             style={{
                                                 width: `calc(100% / ${columns.length})`,
                                                 padding: '3px 0',
                                                 float: 'left'
                                             }}
                                >{e[r.field]}</span>
                            })}
                            {dataIndex === selected ? <ul
                                className={`${css.nextMenu}`}
                            >
                                {secondListData.map((e, i) => {
                                    return <li
                                        key={i}
                                        onClick={this.childrenWhich.bind(this, i)}
                                        className={children === i ? `${css.rowSelected}` : ''}
                                    >
                                        <p style={{
                                            height: rowDataHeight || '25px',
                                            lineHeight: rowDataHeight || '25px',
                                            marginBottom: 5
                                        }}>
                                            <IconFont iconName={e.icon} iconClass={css.iconClass}/>{e.name}
                                        </p>
                                        {children === i ? <ul className={css.thirdMenu}>
                                            {thirdListData.map((e, s) => {
                                                return <li
                                                    key={s}
                                                    onClick={this.nextWhich.bind(this, s)}
                                                    className={`${css.childrenList} ${nextChild === s ? `${css.childrenChoose}` : ''}`}
                                                >
                                                    <p className={css.lastMenu}>{e.name}</p>
                                                </li>
                                            })}
                                        </ul> : false}
                                    </li>
                                })}
                            </ul> : false
                            }
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
