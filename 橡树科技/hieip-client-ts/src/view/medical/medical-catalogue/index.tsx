/**
 *  病案编目
 *  create by wx
 */
import React from 'react'
import style from './style/index.scss'
import CatalogueHeaderView from './catalogue-header'
import CatalogueMainLeftView from './catalogue-main-left'
import {LazyLoader} from 'tools/lazyLoader'
import MedicalRecord from '../medical-record'

export default class MedicalCatalogue extends React.Component<any, any> {
    render() {
        return (
            <div className={style.medicalCatalogue}>
                <div className={style.header}>
                    <LazyLoader lazyModule={CatalogueHeaderView}/>
                </div>
                <div className={style.main}>
                    <div className={style.mainLeft}>
                        <LazyLoader lazyModule={CatalogueMainLeftView}/>
                    </div>
                    <div className={style.mainright}>
                        <LazyLoader lazyModule={MedicalRecord}/>
                    </div>
                </div>
            </div>
        )
    }
}