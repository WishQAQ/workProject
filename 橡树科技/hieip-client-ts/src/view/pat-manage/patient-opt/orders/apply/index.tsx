/**
 * 综合医嘱 by hhc
 */
import React from 'react'
import css from './index.scss'
import { LazyLoader } from 'tools/lazyLoader'
import MainOrder from './orders/orders'
import Billing from './ordersCosts/ordersCosts'
import Template from './template/template'

export default class Orders extends React.Component {

    render() {
        return (
            <div className={css.mainOrders}>
                <div>
                    <LazyLoader lazyModule={MainOrder}/>
                </div>
                <div>
                    <LazyLoader lazyModule={Billing}/>
                </div>
                <div>
                    <LazyLoader lazyModule={Template}/>
                </div>
            </div>
        )
    }
}