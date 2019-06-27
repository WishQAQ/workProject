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
import {
    billSignatureModalService,
    BillSignatureModalState as State
} from '../../../../../service/pat-manage/patien-opt/bill/bill-signature-modal'

export default class BillSignatureModal extends FluxComponent<State> {
    title = '计价单:签名'
    billSignatureModalService = billSignatureModalService

    render() {
        const {isShow, userName, password} = this.state
        return (
            !isShow ? null : <DragMove
                className={style.signatureModal}
                title={'签名'}
                okText={'确定'}
                cancelText={'取消'}
                onOk={billSignatureModalService.loadSignature}
                onCancel={() => billSignatureModalService.onCancel()}
                visible={true}>
                <Rounded
                    leftShow={'用户名'}
                    className={style.rounded}>
                    <HintInput value={userName} onChange={(v) => billSignatureModalService.setStateJson(v.target.value, 'userName')}/>
                </Rounded>
                <Rounded
                    leftShow={'密码'}
                    className={style.rounded}>
                    <HintInput
                        type={'password'}
                        value={password}
                        onChange={(v) => billSignatureModalService.setStateJson(v.target.value, 'password')}/>
                </Rounded>
            </DragMove>
        )
    }
}