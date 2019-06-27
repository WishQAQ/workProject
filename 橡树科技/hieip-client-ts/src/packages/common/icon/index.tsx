import React from 'react'
import classNames from 'classnames'
import 'oak-icon/index.css'
import css from './style/icon.sass'

export interface IconProps {
    /**
     * 图标名称
     */
    iconName: string
    /**
     * 图标样式修改
     */
    iconClass?: string
    /**
     * 是否开启hover - 默认为false
     */
    hover?: boolean
}

/**
 * 图标公用组件
 */
export class IconFont extends React.PureComponent<IconProps> {

    /**
     * 虚拟dom渲染
     * @return {any}
     */
    render() {
        let { iconName, iconClass, hover, ...other } = this.props
        return (
            <i className={classNames('iconfont', iconName,
                iconClass, { [css.iconHover]: hover })}{...other}
            />
        )
    }
}