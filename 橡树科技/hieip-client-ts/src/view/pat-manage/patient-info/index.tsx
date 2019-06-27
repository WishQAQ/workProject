/**
 *
 * 患者管理主页面 by liqiang
 *
 */
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { LazyLoader } from 'tools/lazyLoader'
import { IPatientControlProps, IPatientControlState } from './patientInfo'
import styles from './index.scss'
// 头部
import Header from './header'
// 患者列表（床头卡）
import PatientList from './card'
// 患者列表（表格）
import PatientTable from './patient-table'
// 患者入科modal框
import IntoModal from './in-dept'
// 出科召回modal框
import RecallModal from './transfer-in-dept'
// 换床modal框
import TransferBunkModal from './change-bed'

/**
 *
 * 患者管理页面
 *
 */
@DragDropContext(HTML5Backend)
export default class PatientInfo extends React.Component<IPatientControlProps, IPatientControlState> {
    render() {
        return (
            <div className={styles.root}>
                <LazyLoader lazyModule={Header}/>
                <LazyLoader lazyModule={PatientList}/>
                <LazyLoader lazyModule={PatientTable}/>
                <LazyLoader lazyModule={IntoModal}/>
                <LazyLoader lazyModule={RecallModal}/>
                <LazyLoader lazyModule={TransferBunkModal}/>
            </div>
        )
    }
}
