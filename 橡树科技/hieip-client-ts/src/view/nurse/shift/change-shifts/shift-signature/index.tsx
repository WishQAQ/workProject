/**
 * 签名弹框
 * create by wx 2018.02.01
 */
import React from 'react'
import * as style from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {HintInput} from 'pkg/common/input'

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {shiftSignatureService, ShiftSignatureState} from 'service/nurse/shift/change-shifts/shift-signature'

export default class ShiftSignature extends FluxComponent<ShiftSignatureState> {
    title = '签名弹框'
    shiftSignatureService = shiftSignatureService

    render() {
        const {modalVisible}=this.state
        return (
            <DragMove className={style.signatureModal}
                      title={'签名'}
                      okText={'确定'}
                      cancelText={'取消'}
                      onCancel={shiftSignatureService.modalClose}
                      visible={modalVisible}>
                <Rounded leftShow={'用户名'}
                         className={style.rounded}>
                    <HintInput onChange={(v)=>v}/>
                </Rounded>
                <Rounded leftShow={'密码'}
                         className={style.rounded}>
                    <HintInput onChange={(v)=>v}/>
                </Rounded>
            </DragMove>
        )
    }
}