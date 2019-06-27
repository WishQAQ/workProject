/**
 * 统计界面
 */

import React from 'react'
import style from './style/statistics.scss'

export class Statistics extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className={style.statistics}>
                统计页面
            </div>
        )
    }
}