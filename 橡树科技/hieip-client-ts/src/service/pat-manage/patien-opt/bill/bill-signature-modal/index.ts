import {BaseService} from 'tools/flux/BaseService'
import {ApiSplitMhPatientVisit} from 'pkg/api'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiAppData, ApiUserIndex} from '../../../../../packages/api'
import {UserEntityUser} from '../../../../../packages/entity'
import {loginService} from '../../../../user/login'
import {billDetailService} from '../bill-detail'

export interface BillSignatureModalState {
    /**
     * 是否显示页面
     */
    isShow?: boolean
    /**
     * 签名参数
     */
    BILL_SIGNATURE?: string
    /**
     * 用户名
     */
    userName?: string
    /**
     * 密码
     */
    password?: string
    /**
     * 用户
     */
    user?: UserEntityUser
}

class BillSignatureModalService extends BaseService<BillSignatureModalState> {
    defaultState = {
        /**
         * 是否显示页面
         */
        isShow: false,
        /**
         * 用户名
         */
        userName: loginService.state.user.userName,
        /**
         * 密码
         */
        password: '',
        /**
         * 用户
         */
        user: null
    }

    serviceWillMount() {
        /**
         * 查询签名参数
         */
        this.loadAppGrant()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */
    /**
     * 测试使用: 签名参数切换
     */
    appGrantChange = () => {
        const {BILL_SIGNATURE} = this.state
        let data = (BILL_SIGNATURE && '1' === BILL_SIGNATURE ? '0' : '1')
        this.dispatch2({
            BILL_SIGNATURE: data,
            isShow: data === '1',
            user: data === '1' ? null : loginService.state.user
        })
    }
    /**
     * 查询签名参数
     */
    loadAppGrant = () => {
        return ApiAppData.loadAppGrant('patManage', 'bill-signature').then((data) => {
            this.dispatch2({BILL_SIGNATURE: data, isShow: data === '1', user: data === '1' ? null : loginService.state.user})
        }).catch(msg => {
            message.tip(msg || '查询签名参数失败!')
        })
    }

    /**
     * 签名
     */
    loadSignature = () => {
        const {userName, password} = this.state
        if (!userName || userName.trim().length === 0) {
            message.tip('请录入【用户名】')
            return
        }
        if (!password || password.trim().length === 0) {
            message.tip('请录入【密码】')
            return
        }
        return ApiUserIndex.loadSignature(userName, password).then((data) => {
            this.dispatch2({user: data, isShow: false, password: ''})
            message.tip('签名成功!')
            // 【点保存/退费按键时签名】
            const {BILL_SIGNATURE} = this.state
            if (BILL_SIGNATURE !== '1') {
                // 判断签名成功,调用的函数
                const {operate} = billDetailService.state
                switch (operate) {
                    case 'save':
                        billDetailService.save()
                        break
                    case 'costsBack':
                        billDetailService.costsBack()
                        break
                    default:
                        break
                }
            }
        }).catch(msg => {
            message.tip(msg || '查询签名参数失败!')
        })
    }
    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /* =====分界线: 对外值改变: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (data, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }

    /**
     * 设置值: 公共对外值改变
     */
    onCancel = () => {
        const {BILL_SIGNATURE} = billSignatureModalService.state
        if (BILL_SIGNATURE === '1') {
            this.dispatch2({user: null, isShow: false})
        } else {
            this.dispatch2({isShow: false})
        }
    }
    /* =====分界线: 对外值改变: 结束===== */

    /* =====分界线: 二、前端处理: 结束===== */
}

export const billSignatureModalService = new BillSignatureModalService('billSignatureModal')