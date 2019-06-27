import * as React from 'react'
import { ButtonProps } from 'antd/lib/button/button'
import { Badge, Button } from 'antd'
import { BadgeProps } from 'antd/lib/badge/index'
import * as style from './style/button.scss'
import classNames from 'classnames'

export interface Props {
    /**
     * button内容
     */
    text?: any
    /**
     * 继承buttonProps
     */
    btnParam?: ButtonProps
    /**
     * 继承badgeProps
     */
    badgeParam?: BadgeProps
}

/**
 * 公共button组件
 */
export class Btn extends React.Component<Props, {}> {
    render() {
        let { btnParam, badgeParam, text } = this.props

        if (btnParam && btnParam.className) {
            return <Button className={classNames(style.pubBtn, btnParam.className)} {...btnParam}>{text}</Button>
        }
        else if (btnParam && btnParam.className && badgeParam) {
            return <Button className={classNames(style.pubBtn, btnParam.className)} {...btnParam}>
                <Badge {...badgeParam}/>{text}
            </Button>
        }
        else if (badgeParam) {
            return <Badge {...badgeParam}/>
        }
        else if (btnParam) {
            return <Button className={classNames(style.pubBtn)} {...btnParam}>{text}</Button>
        }
        else {
            return <Button className={classNames(style.pubBtn)}>{text}</Button>
        }
    }
}