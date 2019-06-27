import React from 'react'
import male from './image/male.png'
import female from './image/female.png'
import unknown from './image/unknow.png'
import css from './style/photo.sass'

export interface PhotoProps {
    /**
     * 性别传入
     */
    gender?: 'male' | 'female' | 'unknown'
}

export class Photo extends React.Component<PhotoProps> {
    render() {
        let which = { male, female, unknown }
        let { gender } = this.props
        return <img src={which[gender]} alt="portrait" className={css.defaultClass}/>
    }
}