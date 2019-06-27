/**
 * 交接班 Created by mou
 *
 */
import React from 'react'
import Search from './search'
import MidTable from './table'
import ShiftDetail from './shift-detail'
import { LazyLoader } from 'tools/lazyLoader'
import * as style from './style/index.scss'
import ChangeShiftsModal from './modal/index'
import PersonModal from './person-modal/index'
import SignatureModal from './signature-modal/index'

export default class ChangeShifts extends React.Component<{}, {}> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={style.changeShifts}>
                <LazyLoader lazyModule={Search}/>
                <LazyLoader lazyModule={MidTable}/>
                <LazyLoader lazyModule={ShiftDetail}/>
                <LazyLoader lazyModule={ChangeShiftsModal}/>
                <LazyLoader lazyModule={PersonModal}/>
                <LazyLoader lazyModule={SignatureModal}/>
            </div>
        )
    }
}