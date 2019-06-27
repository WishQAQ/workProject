/**
 * 新增工单
 */

import React from 'react'
import style from './style/workOrderAdd.scss'

export class WorkOrderAdd extends React.Component{
    constructor(props){
    super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className={style.workOrderAdd}>
                <div className={style.workOrderAddTop}>
                    <div></div>
                </div>
            </div>
        )
    }
}