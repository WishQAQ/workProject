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
import {signatureModalService, SignatureModalState} from 'service/hand-over/shift/change-shifts/signature-modal'

export default class SignatureModal extends FluxComponent<SignatureModalState> {
    title = '签名弹框'
    signatureModalService = signatureModalService

    render() {
        const {modalVisible}=this.state
        return (
            <DragMove className={style.signatureModal}
                      title={'签名'}
                      okText={'确定'}
                      cancelText={'取消'}
                      onCancel={signatureModalService.modalClose}
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