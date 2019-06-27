/**
 * 检查申请
 */
import React from 'react'
import css from '../style/exam.scss'
// model
import ApplyInfo from './applyTop'
import ApplyTable from './applyBottom'
import { LazyLoader } from 'tools/lazyLoader'

export default class LeftApply extends React.Component {

    render() {
        return (
            <div className={css.leftMain}>
                <LazyLoader lazyModule={ApplyInfo}/>
                <LazyLoader lazyModule={ApplyTable}/>
            </div>
        )
    }
}