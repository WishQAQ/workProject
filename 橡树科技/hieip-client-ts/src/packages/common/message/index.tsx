import React from 'react'
import {default as swal, SweetAlertType} from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import css from './style/message.sass'

class Message {
    /**
     * 普通弹框
     * @param {string} title - 头部信息
     * @param {string} message - 内容
     * @param {"sweetalert2".SweetAlertType} type - 5个内置类型 success |  error |  warning |  info | question
     * @return {any}
     */
    normal(title: string, message: string, type: SweetAlertType) {
        return swal(title, message, type)
    }

    /**
     * 可定位定时弹框
     * @param {string} title - 头部信息
     * @param {string} text - 内容
     * @param {string} position - 'top' | 'top-left' | 'top-right' |
     * 'center' | 'center-left' | 'center-right' |'bottom' | 'bottom-left' | 'bottom-right'
     * @param {number} time - 消失时间 if(null) - 不消失
     * @param {"sweetalert2".SweetAlertType} type - 内置类型
     * @return {any}
     */
    positionTime(title: string, text: string, type: SweetAlertType,
                 position: 'top' | 'top-left' | 'top-right' | 'center' | 'center-left' |
                     'center-right' | 'bottom' | 'bottom-left' | 'bottom-right',
                 time: number) {
        return swal({title: title, text: text, type: type, position: position, timer: time})
    }

    /**
     * 普通下部提示框(无遮罩层，可操作元素)
     * @param {string} text - 内容
     * @param {"sweetalert2".SweetAlertType} type - 内置类型
     * * @param {string} position - 'top' | 'top-left' | 'top-right' |
     * 'center' | 'center-left' | 'center-right' |'bottom' | 'bottom-left' | 'bottom-right'
     * @return {any}
     */
    tip(text: string, type?: SweetAlertType, position?: 'top' | 'top-left' | 'top-right' | 'center' | 'center-left' |
        'center-right' | 'bottom' | 'bottom-left' | 'bottom-right', time?: number) {
        return swal({
            text: text, timer: time || 2500, background: '#fff', position: position || 'bottom', type: type,
            backdrop: false, showConfirmButton: false, customClass: `${css.normalTip}`,
            width: 'auto', animation: false
        })
    }

    /**
     * loading等待提示框 - 成功与失败
     * @param {string} loadText - 等待文字
     * @param {number} loadTime - 等待时间
     * @param {boolean} res - 执行结果
     * @param {string} successText - 成功文字
     * @param {string} failText - 失败文字
     */
    loadingOrNot(loadText: string, loadTime: number, res: boolean, successText?: string, failText?: string) {
        return swal({
            text: loadText, timer: loadTime, onOpen: () => {
                swal.showLoading()
            }
        }).then((result) => {
            if (result.value === res && res) {
                return swal({text: successText, type: 'success', timer: 1000, showConfirmButton: false})
            }
            else if (result.value && !res) {
                return swal({text: failText, type: 'error', timer: null, showConfirmButton: false})
            }
        })
    }

    /**
     * 普通等待提示框 - 默认不可操作和取消
     * @param {string} text - 内容
     * @param {number} time - 时间默认为null
     * @param {boolean} outSide - 外部点击关闭弹框
     * @param {boolean} clickESC - esc关闭弹框
     */
    loading(text: string, time?: number, outSide?: boolean, clickESC?: boolean) {
        return swal({
            text: text, timer: time || null, allowOutsideClick: outSide || false, allowEscapeKey: clickESC || false,
            onOpen: () => {
                swal.showLoading()
            }
        })
    }

    /**
     * 成功提示框
     * @param {string} text - 内容
     * @param {number} time - 显示时间默认1200
     * @return {any}
     */
    success(text: string, time?: number) {
        return swal({text: text, timer: time || 1200, type: 'success', showConfirmButton: false})
    }

    /**
     * 确认取消confirm框
     * @param {string} text - 内容
     * @param {string} ensureText - 确定内容
     * @param {string} cancelText - 取消内容
     * @return {any}
     */
    confirm(text: string, ensureText?: string, cancelText?: string) {
        return swal({
            text: text, showCancelButton: true, confirmButtonText: ensureText || '确定',
            cancelButtonText: cancelText || '取消'
        })
    }

    /**
     * 错误提示框 - 纯文字
     * @param {string} text - 内容
     * @param {number} time - 时间
     * @return {any}
     */
    error(text: string, time?: number) {
        return swal({text: '错误:' + text, timer: time})
    }

    /**
     * 警告框 - 纯文字
     * @param {string} text - 内容
     * @param {number} time - 时间
     * @return {any}
     */
    warning(text: string, time?: number) {
        return swal({text: '警告:' + text, timer: time})
    }

    /**
     * 可与后台进行操作弹框
     * @param {string} text - 内容
     * @param {number} time - 消失时间
     * @param {() => void} confirmEvent - 确定事件
     * @param {() => void} cancelEvent - 取消事件
     * @param {string} confirmText - 确定文字
     * @param {string} cancelText - 放弃文字
     * @param {string} className - 类名
     */
    linkAge(text: string, time?: number,
            confirmText?: string,
            cancelText?: string,
            confirmEvent?: () => void,
            cancelEvent?: () => void,
            className?: string) {
        return swal({
            text: text, timer: time, showCancelButton: true, confirmButtonText: confirmText,
            cancelButtonText: cancelText, customClass: className, allowOutsideClick: false, allowEscapeKey: false
        }).then((result) => {
            if (result.value) {
                if (confirmEvent) {
                    confirmEvent()
                }
            }
            else if (result.dismiss === swal.DismissReason.cancel) {
                if (cancelEvent) {
                    cancelEvent()
                }
                swal.close()
            }
        })
    }

    /**
     * 无确定取消按钮提示框
     * @param {string} text
     * @param {"sweetalert2".SweetAlertType} type
     * @return {any}
     */
    popModel(text: string, type?: SweetAlertType) {
        return swal({
            text: text, timer: 2000, type: type, showConfirmButton: false, showCancelButton: false,
            allowOutsideClick: false, backdrop: false
        })
    }

    /**
     * 带按钮提示框
     * @param {string} text
     * @param {"sweetalert2".SweetAlertType} type
     * @param {boolean} showConfirmButton
     * @param {string} confirmButtonText
     * @param {boolean} showCancelButton
     * @param {string} cancelButtonText
     */
    accessary(text: string,
              type?: SweetAlertType,
              showConfirmButton?: boolean,
              confirmButtonText?: string,
              showCancelButton?: boolean,
              cancelButtonText?: string) {
        return swal({
            text: text, type: type, showConfirmButton: showConfirmButton, confirmButtonText: confirmButtonText,
            showCancelButton: showCancelButton, cancelButtonText: cancelButtonText
        })
    }

    /**
     * 关闭弹框
     */
    close() {
        swal.close()
    }
}

export const message = new Message()
