import React from 'react'
import {Layout} from 'antd'
import {LazyLoader} from 'tools/lazyLoader'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {loginService, LoginState} from 'service/user/login/index'
import {routeService, RouteState} from 'service/RouteService'
import {homeService, HomeService, HomeState} from 'service/home/index'
import Login from 'view/login'
import PageHeader from 'view/home/header'
import PatientList from 'view/triage/patient-list'
import Triage from 'view/triage/new-triage'
import GroupHurt from 'view/triage/group-injury'
import PatientOverview from 'view/pat-manage'
import DataElement from 'view/medical/data-element'
import DataRange from 'view/medical/data-range'
import DataSet from 'view/medical/data-set'
import FixedValue from 'view/medical/bd-fixed'
import Keyword from 'view/medical/keyword'
import Medical from 'view/medical/medical'
import QualityMaintenance from 'view/medical/quality-maintenance'
import InputDict from 'view/system-config/select-input-dict'
import style from 'view/home/index.scss'
import TplMaintenance from 'view/medical/tpl-maintenance'
import PatientInfo from 'view/pat-manage/patient-info'
import MedicalRecordArchiving from 'view/medical/record-archiving'
import Paragraphs from 'view/hand-over/classes/paragraphs'
import NursingUnit from 'view/hand-over/classes/nursing-unit'
import MedicalRecord from 'view/medical/medical-record'
import {JsonUtil} from 'tools/api/JsonUtil'
import MedicalSign from 'view/medical/medical-sign'
import MedicalCatalogue from 'view/medical/medical-catalogue'
import Translate from 'view/medical/translate'
import ChangeShifts from 'view/hand-over/shift/change-shifts'
import MedicalReform from 'view/medical/medical-reform'
import NurseGroup from 'view/nurse/classes/nurse-group'
import SchedulingIndex from 'view/nurse/classes/scheduling-index'
import ClassParagraphs from 'view/nurse/classes/class-paragraphs'
import OutpatientClinic from 'view/pat-manage/outpatient-clinic'
import ExchangeClasses from 'view/nurse/classes/exchange-classes'
import ShiftsChange from 'view/nurse/shift/change-shifts'
import Config from 'view/nurse/record/config'
import Dept from 'view/nurse/record/dept'
import Patient from 'view/nurse/record/patient'
import AssessmentSheet from 'view/nurse/assessment-sheet'
import QualityControl from 'view/quality-control'

export default class Home extends FluxComponent<HomeState & RouteState & LoginState> {
    title: string = '首页'
    homeService = homeService
    routeService = routeService
    loginService = loginService

    render() {
        let {
            route_new_triage,
            route_patient_list,
            route_group_injury,
            route_select_input_dict,
            route_data_element,
            route_data_range,
            route_data_set,
            route_fixed_value,
            route_keyword,
            route_quality_maintenance,
            route_medical,
            route_tpl_maintenance,
            route_patient_info,
            route_record_archiving,
            route_paragraphs,
            route_nursing_unit,
            route_translate,
            route_medical_record,
            route_medical_sign,
            route_medical_catalogue,
            route_change_shifts,
            route_medical_reform,
            route_nurse_class_paragraphs,
            route_nurse_nurse_group,
            route_nurse_scheduling_index,
            route_outpatient_clinic,
            route_nurse_exchange_classes,
            route_nurse_shift_change,
            route_nurse_record_config,
            route_nurse_record_dept,
            route_nurse_record_patient,
            route_nurse_assessment_sheet,
            route_quality_control,
            route
        } = this.state
        const isLogin = HomeService.isLogin()
        return (
            isLogin ?
                <Layout>
                    <LazyLoader lazyModule={PageHeader}/>
                    <div className={style.content}>
                        {route_medical_record && <LazyLoader lazyModule={MedicalRecord}/>}
                        {route_new_triage && <LazyLoader lazyModule={Triage}/>}
                        {route_patient_list && <LazyLoader lazyModule={PatientList}/>}
                        {route_group_injury && <LazyLoader lazyModule={GroupHurt}/>}
                        {route_patient_info && <LazyLoader lazyModule={PatientInfo}/>}
                        {route_paragraphs && <LazyLoader lazyModule={Paragraphs}/>}
                        {route_nursing_unit && <LazyLoader lazyModule={NursingUnit}/>}
                        {route_change_shifts && <LazyLoader lazyModule={ChangeShifts}/>}
                        {JsonUtil.isEmpty(route) ? null : route.startsWith('route_patient_manage') &&
                            <LazyLoader lazyModule={PatientOverview}/>}
                        {route_select_input_dict && <LazyLoader lazyModule={InputDict}/>}
                        {route_data_element && <LazyLoader lazyModule={DataElement}/>}
                        {route_data_range && <LazyLoader lazyModule={DataRange}/>}
                        {route_data_set && <LazyLoader lazyModule={DataSet}/>}
                        {route_fixed_value && <LazyLoader lazyModule={FixedValue}/>}
                        {route_keyword && <LazyLoader lazyModule={Keyword}/>}
                        {route_record_archiving && <LazyLoader lazyModule={MedicalRecordArchiving}/>}
                        {route_quality_maintenance && <LazyLoader lazyModule={QualityMaintenance}/>}
                        {route_medical && <LazyLoader lazyModule={Medical}/>}
                        {route_medical_sign && <LazyLoader lazyModule={MedicalSign}/>}
                        {route_medical_catalogue && <LazyLoader lazyModule={MedicalCatalogue}/>}
                        {route_medical_reform && <LazyLoader lazyModule={MedicalReform}/>}
                        {route_tpl_maintenance && <LazyLoader lazyModule={TplMaintenance}/>}
                        {route_translate && <LazyLoader lazyModule={Translate}/>}
                        {route_nurse_class_paragraphs && <LazyLoader lazyModule={ClassParagraphs}/>}
                        {route_nurse_nurse_group && <LazyLoader lazyModule={NurseGroup}/>}
                        {route_nurse_scheduling_index && <LazyLoader lazyModule={SchedulingIndex}/>}
                        {route_outpatient_clinic && <LazyLoader lazyModule={OutpatientClinic}/>}
                        {route_nurse_exchange_classes && <LazyLoader lazyModule={ExchangeClasses}/>}
                        {route_nurse_shift_change && <LazyLoader lazyModule={ShiftsChange}/>}
                        {route_nurse_record_config && <LazyLoader lazyModule={Config}/>}
                        {route_nurse_record_dept && <LazyLoader lazyModule={Dept}/>}
                        {route_nurse_record_patient && <LazyLoader lazyModule={Patient}/>}
                        {route_nurse_assessment_sheet && <LazyLoader lazyModule={AssessmentSheet}/>}
                        {route_quality_control && <LazyLoader lazyModule={QualityControl}/>}
                    </div>
                </Layout>
                :
                <LazyLoader lazyModule={Login}/>
        )

    }
}
