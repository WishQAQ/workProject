import React from 'react'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { loginService, LoginState } from 'service/user/login/index'
import classNames from 'classnames'
import { Logo } from 'pkg/common/logo'
import * as style from './index.scss'
import Form, { FormItem } from 'pkg/common/form'
import { Button, Checkbox, Col, Input, Row } from 'antd'
import { Toolbar } from 'pkg/common/toolbar'
import { extend } from 'jquery'
import { homeService, HomeState } from 'service/home/index'
import back from './images/backage.svg'
import { IconFont } from 'pkg/common/icon'

export default class Login extends FluxComponent<LoginState & HomeState> {
    title: string = '登录'
    loginService = loginService
    homeService = homeService
    formItem: Array<Array<FormItem>> = [
        [{
            name: 'username',
            elementName: Input,
            elementProps: {
                prefix: <IconFont iconName="icon-yonghu-"/>,
                placeholder: '用户名'
            }
        }],
        [{
            name: 'password',
            elementName: Input,
            elementProps: {
                prefix: <IconFont iconName="icon-mima"/>,
                placeholder: '密码',
                type: 'password'
            }
        }],
        [{
            name: 'remember',
            elementName: Checkbox,
            elementProps: {
                children: '记住账号'
            },
            valuePropName: 'checked',
            initialValue: true
        }, {
            elementName: Button,
            elementProps: {
                type: 'primary',
                htmlType: 'submit',
                className: style.submitButton,
                children: '登录'
            }
        }]
    ]

    render() {
        const { username, password, errorMessage, version, logging, autoFocus } = this.state
        extend(true, this.formItem, [[{
            initialValue: username,
            elementProps: {
                disabled: logging,
                autoFocus: autoFocus === 'username',
                onKeyUp: this.loginService.onKeyUp
            }
        }], [{
            initialValue: password,
            elementProps: {
                disabled: logging,
                autoFocus: autoFocus === 'password'
            }
        }], [{
            elementProps: { disabled: logging }
        }, {
            elementProps: { loading: logging }
        }]])
        return (
            <div className={style.page}>
                <div className={style.header}>
                    <div className={style.back} dangerouslySetInnerHTML={{ __html: back }}/>
                    <Toolbar disable={logging}/>
                    <Logo big={true} className={classNames(style.logo, 'app-region-drag')}/>
                </div>
                <div className={style.content}>
                    <Row>
                        <Col span={16} offset={4}>
                            <Form item={this.formItem} onSubmit={loginService.login}/>
                        </Col>
                    </Row>
                </div>
                {errorMessage ?
                    <div className={classNames(style.footer, style.errorMessage)}>
                        <IconFont iconName="icon-quxiao1" iconClass={style.errorIcon}/>
                        <span>
                            {errorMessage}
                        </span>
                    </div>
                    :
                    <div className={style.footer}>医护一体化急诊信息平台 {version} | © 2016-2018 重庆橡树信息科技有限公司 </div>
                }
            </div>
        )
    }
}
