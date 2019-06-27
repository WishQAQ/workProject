import * as React from 'react'
import * as style from './index.sass'
import classNames from 'classnames'
import {Button} from 'antd'
import {message} from 'pkg/common/message'
import {BrowserWindow} from 'tools/window'

interface ToolbarProps {
    /**
     * 是否开启沉浸模式
     */
    immerse?: boolean
    /**
     * 是否显示最小化按钮
     */
    minimize?: boolean
    /**
     * 是否显示关闭按钮
     */
    close?: boolean
    /**
     * 禁用功能按钮
     */
    disable?: boolean
    className?: string
}

export class Toolbar extends React.Component<ToolbarProps> {
    static defaultProps = {
        close: true,
        minimize: false,
        immerse: false,
        disable: false
    }

    static confirmClose() {
        message.confirm('现在要关闭登录窗口吗？', '嗯', '点错了').then(function (res) {
            if (res && res.value) {
                BrowserWindow.getFocusedWindow().close()
            }
        })
    }

    render() {
        const {immerse, disable, close, className, minimize, ...other} = this.props
        return (
            <div
                className={classNames(style.toolbar, 'app-region-drag', className, {[style.immerse]: immerse})} {...other}>
                {!close || <Button type="danger" shape="circle" icon="close" disabled={disable}
                                   className={classNames(style.close, 'no-drag')} onClick={Toolbar.confirmClose}/>}
                {!minimize || <Button>最小化</Button>}
            </div>
        )
    }
}