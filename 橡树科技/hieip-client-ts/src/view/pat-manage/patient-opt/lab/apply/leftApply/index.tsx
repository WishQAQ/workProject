/**
 * 检验申请页面
 */
import React from 'react'
import css from '../style/lab.scss'
import TopApply from './topApply'
import MiddleApply from './middleApply'
import BottomApply from './bottomApply'
import { LazyLoader } from 'tools/lazyLoader'

export default class LeftMain extends React.Component {
    render() {
        return (
            <div className={css.LeftMain}>
                <LazyLoader lazyModule={TopApply}/>
                <div className={css.leftChild}>
                    <LazyLoader lazyModule={MiddleApply}/>
                    <LazyLoader lazyModule={BottomApply}/>
                </div>
            </div>
        )
    }
}