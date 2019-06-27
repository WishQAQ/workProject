import React from 'react'
import { render } from 'react-dom'
import { message } from 'pkg/common/message'
import { Button } from 'antd'

function tipSuccess() {
    message.tip('成功', 'success')
}

function tipWarning() {
    message.tip('警告', 'warning')
}

function tipError() {
    message.tip('错误', 'error')
}

function tipInfo() {
    message.tip('普通', 'info')
}

function tipQuestion() {
    message.tip('疑问', 'question')
}

function popModel() {
    message.popModel('测试提示框', 'error')
}

function myself() {
    message.accessary('自定义按钮', 'success', true, '确定')
}

render(<div>
    <div>
        <p>Message.Tip 小提示框</p>
        <Button onClick={tipSuccess}>{'成功success'}</Button>
        <Button onClick={tipWarning}>{'警告warning'}</Button>
        <Button onClick={tipError}>{'错误error'}</Button>
        <Button onClick={tipInfo}>{'普通info'}</Button>
        <Button onClick={tipQuestion}>{'疑问question'}</Button>
        <p>Message.popModel 提示框</p>
        <Button onClick={popModel}>{'无确定取消按钮提示框'}</Button>
        <p>Message.normal 带按钮提示框</p>
        <Button onClick={myself}>{'自定义按钮提示框'}</Button>
    </div>
</div>, document.getElementById('root'))