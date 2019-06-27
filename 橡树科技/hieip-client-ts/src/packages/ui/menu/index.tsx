/**
 * Created by mod on 2017/12/25.
 */

'use strict'
import * as React from 'react'
import { Tree } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import * as style from './style/index.scss'

const TreeNode = Tree.TreeNode

interface RenderMenuHeadProps extends TreeProps {
    fixedata?: Array<any>,
    fixetype?: string,
    onClick?: (selectedKeys: any, e: any) => void
}

export default class RenderMenu extends React.Component<RenderMenuHeadProps> {
    render() {
        return (
            <div className={style.menu}>
                <Tree onSelect={this.handleClick}>
                    {this.renderMenuItem(this.props.fixedata, this.props.fixetype)}
                </Tree>
            </div>
        )
    }

    /** 生成菜单 */
    private renderMenuItem = (data: any = [], type: string) => {
        return data.map((row, index) => {
            return <TreeNode title={row[type]} key={index} dataRef={row[type]}/>
        })
    }
    private handleClick = (e, e1) => {
        const { onClick } = this.props
        if (onClick) onClick(e, e1)
    }
}