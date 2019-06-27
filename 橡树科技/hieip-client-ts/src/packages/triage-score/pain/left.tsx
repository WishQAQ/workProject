/**
 * Created by mou on 2017/12/7.
 */
import * as React from 'react'
import { Label } from 'pkg/common/label'
import { IconFont } from 'pkg/common/icon'
import style from './style/pain.scss'

interface LeftProps {
    text?: string,
    icon?: string,
    onClick?: React.ReactEventHandler<any>
}

interface StateType {
    onClick?: React.ReactEventHandler<any>
}

export class Left extends React.Component<LeftProps, StateType> {

    render() {
        let { text, icon } = this.props
        return (
            <p className={style.left}>
                <Label>{text}</Label>
                <IconFont iconName={icon}/>
            </p>
        )
    }
}