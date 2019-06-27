import React from 'react'
import {LazyLoader} from '../../../../tools/lazyLoader'
import BillDetail from './bill-detail'
import BillSignatureModal from './bill-signature-modal'
import BillTempModal from './bill-temp-modal'

export default class Bill extends React.Component {
    // title: '计价单';
    render() {
        return (
            <div>
                <LazyLoader lazyModule={BillDetail}/>
                <LazyLoader lazyModule={BillSignatureModal}/>
                <LazyLoader lazyModule={BillTempModal}/>
            </div>
        )
    }
}