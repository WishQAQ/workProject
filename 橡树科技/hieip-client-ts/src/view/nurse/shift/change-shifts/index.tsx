/**
 * 交接班 Created by mou
 *
 */
import React from 'react'
import * as style from './style/index.scss'
import ShiftIndex from 'view/nurse/shift/change-shifts/shift-index'
import PersonModal, {default as ShiftRecord} from 'view/nurse/shift/change-shifts/shift-record'
import SignatureModal, {default as ShiftSignature} from 'view/nurse/shift/change-shifts/shift-signature'
import {LazyLoader} from 'tools/lazyLoader'
import NewShift from 'view/nurse/shift/change-shifts/new-shift'
import {shiftMainService} from 'service/nurse/shift/change-shifts'

export default class ShiftsChange extends React.Component<{}, {}> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={style.changeShifts}>
                <LazyLoader lazyModule={ShiftIndex}/>
                <LazyLoader lazyModule={PersonModal}/>
                <LazyLoader lazyModule={SignatureModal}/>
                <LazyLoader lazyModule={NewShift}/>
                <LazyLoader lazyModule={ShiftRecord}/>
                <LazyLoader lazyModule={ShiftSignature}/>
            </div>
        )
    }
}