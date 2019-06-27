/**
 *  图片 组件
 * Created by mod on 2017/12/5
 */

'use strict'
import * as React from 'react'
import { ColorIcon } from '../colorIcon'

export interface ImgProps {
    /** 图片名称 */
    name: string
    /** 图片 classname */
    className?: string
    /** 图片 style */
    style?: React.CSSProperties
}

/**
 * 所有图片资源
 * 请先加载后在使用
 */
const imagsours: object = {}

export class Images extends React.Component<ImgProps, any> {

    render(): JSX.Element {
        const { name } = this.props
        let source
        if (name === '1') {
            source = 'icon-nantouxiang'
        } else if (name === '2') {
            source = 'icon-nvtouxiang'
        } else {
            source = 'icon-wumingshi'
        }
        return (
            <div className={this.props.className || ''} style={this.props.style || {}}>
                <ColorIcon iconName={source} />
                {/* <img src={require(`./image/${source}`)} /> */}
            </div>
        )
    }
}