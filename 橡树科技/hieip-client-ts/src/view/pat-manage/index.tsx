/**
 * 患者管理公共区域
 * by hhc
 */
import React from 'react'
import css from './index.scss'
// model
import { Col, Row } from 'antd'
import PatientMenu from './patient-opt/patient-menu'
import PatientBasic from './patient-opt/patient-basic'
import { LazyLoader } from 'tools/lazyLoader'
import classNames from 'classnames'
// test
import SummaryPatient from './patient-opt/overview'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { routeService, RouteState } from 'service/RouteService'
import Lab from 'view/pat-manage/patient-opt/lab/apply'
import Exam from 'view/pat-manage/patient-opt/exam/apply'
import Diagnosis from 'view/pat-manage/patient-opt/diagnosis'
import Operation from 'view/pat-manage/patient-opt/operation'
import Blood from 'view/pat-manage/patient-opt/blood'
import Orders from 'view/pat-manage/patient-opt/orders/apply'
import VitalSignsRec from 'view/pat-manage/patient-opt/vital-signs-rec'
import TempChart from 'view/pat-manage/patient-opt/temp-chart'
import Bill from './patient-opt/bill'

export default class PatientOverview extends FluxComponent<RouteState> {
    title = '患者管理'
    routeService = routeService

    render() {
        let route
        let state = this.state
        if (state.route_patient_manage) route = SummaryPatient
        if (state.route_patient_manage_overview) route = SummaryPatient
        if (state.route_patient_manage_orders_apply) route = Orders
        if (state.route_patient_manage_lab_apply) route = Lab
        if (state.route_patient_manage_exam_apply) route = Exam
        if (state.route_patient_manage_diagnosis) route = Diagnosis
        if (state.route_patient_manage_operation) route = Operation
        if (state.route_patient_manage_blood) route = Blood
        if (state.route_patient_manage_bill) route = Bill
        if (state.route_patient_manage_vital_signs_rec) route = VitalSignsRec
        if (state.route_patient_manage_temp_chart) route = TempChart
        return (
            <Row>
                <Col span={4}>
                    {/*公共菜单*/}
                    <LazyLoader lazyModule={PatientMenu}/>
                </Col>
                <Col span={20}>
                    {/*基础信息*/}
                    <Row className={classNames(css.main, css.title)}>
                        <LazyLoader lazyModule={PatientBasic}/>
                    </Row>
                    {/*内容*/}
                    <Row className={classNames(css.main, css.content)}>
                        <Col span={24}>
                            {state.route_patient_manage_jump ? null :
                              typeof(route) === 'function' ? <LazyLoader lazyModule={route}/> : null}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}