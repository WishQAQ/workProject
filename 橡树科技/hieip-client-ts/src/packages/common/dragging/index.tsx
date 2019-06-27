/**
 *  拖动弹窗 组件
 * Created by mod on 2017/12/5
 */

'use strict'

import * as React from 'react'
import {ModalProps} from 'antd/lib/modal/Modal'
import * as style from './style.scss'

export interface ButtonGroup {
  antBtnText?: string,
  antBtnType?: string,
  otherClick?: any,
}

export interface DragMoveProps extends ModalProps {
  cwidth?: number
  cheight?: number
  top?: number
  left?: number
  move?: boolean // 是否可拖动
  otherButton?: Array<ButtonGroup> // 其它按钮
}

/**
 * DragMove 自定义弹出窗
 */
export class DragMove extends React.Component<DragMoveProps, any> {

  static defaultProps = {
    move: true,
    maskClosable: false
  }

  title = null
  box = null

  constructor(args) {
    super(args)
    this.handRemove = this.handRemove.bind(this)
    this.maskClosableClick = this.maskClosableClick.bind(this)
  }

  keyCommads = (e) => {
    const {onCancel, visible} = this.props
    if (e.which === 27 && visible && onCancel) {
      onCancel(e)
    }
  }

  /**
   * 点击蒙层是否关闭
   * @param e
   */
  maskClosableClick(e) {
    const {maskClosable, onCancel} = this.props
    if (maskClosable && onCancel) {
      onCancel(e)
    }
  }

  /**
   * jsx
   * @returns {any}
   */
  render(): JSX.Element {
    const {visible, mask, closable, move} = this.props
    return (
      <div>
        {visible ?
          <div
            style={{
              position: 'absolute',
              width: '100%'
            }}>
            {!mask ?
              <div
                onClick={this.maskClosableClick}
                style={{
                  position: 'fixed',
                  overflow: 'auto',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: 9,
                  outline: 0,
                  backgroundColor: 'rgba(0, 0, 0, .2)'
                }}/> : null}
            <div
              onKeyDown={this.keyCommads}
              className={`${!visible ? 'ant-modal-mask ant-modal-mask-hidden' : 'ant-modal'} ${style.deagging}`}
              style={{
                width: this.props.width || 520,
                zIndex: this.props.zIndex || 99,
                position: 'fixed',
                left: this.props.left || `calc(50% - ${(this.props.cwidth || 520) / 2}px)`,
                top: this.props.top || `calc(50% - ${(this.props.cheight || 260) / 2 }px)`,
                transition: 'box-shadow 0.3s',
                ...this.props.style || ''
              }}>
              <div
                ref={(x) => this.box = x}
                className={`ant-modal-content ${this.props.className || ''}`}
              >
                {!closable ? <button aria-label="Close"
                                     onClick={(e) => this.props.onCancel(e)}
                                     className="ant-modal-close">
                  <span className="ant-modal-close-x"/>
                </button> : null}
                <div className="ant-modal-header"
                     ref={(x) => this.title = x}
                     onMouseDown={move ? this.handRemove : null}
                >
                  <div className="ant-modal-title">{this.props.title || 'DragMove'}</div>
                </div>
                <div className="ant-modal-body">
                  {this.props.children}
                </div>
                {!this.props.footer ?
                  <div className="ant-modal-footer">
                    <div>
                      {
                        !this.props.otherButton ? null : (
                          this.props.otherButton.map((item, key) => {
                              return (
                                <button key={key} type="button"
                                        className={`ant-btn ant-btn-${
                                          item.antBtnType ? item.antBtnType : 'primary'}`}
                                        onClick={(e) => item.otherClick(e)}
                                >
                                  <span>{item.antBtnText || 'Other'}</span>
                                </button>
                              )
                            }
                          )
                        )
                      }
                      {this.props.okText ?
                        <button type="button"
                                className="ant-btn ant-btn-primary"
                                onClick={(e) => this.props.onOk(e)}
                        >
                          <span>{this.props.okText || 'Ok'}</span>
                        </button> : null
                      }
                      {
                        this.props.cancelText ?
                          <button type="button" className="ant-btn"
                                  onClick={(e) => this.props.onCancel(e)}
                          >
                            <span>{this.props.cancelText || 'Canle'}</span>
                          </button> :
                          null
                      }
                    </div>
                  </div> : null}
              </div>
            </div>
          </div> : null}
      </div>
    )
  }

  /**
   * 移动事件
   * @param e
   */
  private handRemove(e: React.MouseEvent<any>): void {
    let d: Document = document
    const box: any = this.box

    const title: any = this.title
    const Wwidth: number = window.innerWidth
    const Wheigth: number = window.innerHeight
    const Wbox: number = box.clientWidth
    const Hbox: number = box.clientHeight
    const boxtyle: any = box.style

    const T: number = box.offsetParent.offsetTop
    const L: number = box.offsetParent.offsetLeft

    title.style.cursor = 'move'
    let x: number = e.clientX - box.offsetLeft
    let y: number = e.clientY - box.offsetTop
    boxtyle.boxShadow = '0 0 14px #666'

    /**
     * 移动
     * @param e
     */
    const mousemove: any = (e: React.MouseEvent<any>) => {
      let moY: number = e.clientY - y
      let moX: number = e.clientX - x
      /**
       * 限制移动范围
       * @type {number|string}
       */

      boxtyle.top = moY > 0 ? moY > Wheigth - Hbox - T ? Wheigth - Hbox - T : moY : moY < -T ? -T : moY + 'px'
      boxtyle.left = moX > 0 ? moX > Wwidth - Wbox - L ? Wwidth - Wbox - L : moX : moX < -L ? -L : moX + 'px'
      boxtyle.boxShadow = '0 0 14px #666'
    }

    /**
     * 停止
     */
    const mouseup: () => void = () => {
      title.style.cursor = 'default'
      boxtyle.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
      d.removeEventListener('mousemove', mousemove)
      d.removeEventListener('mouseup', mouseup)
    }
    /**
     * 监听事件
     */
    d.addEventListener('mousemove', mousemove)
    d.addEventListener('mouseup', mouseup)
  }
}
