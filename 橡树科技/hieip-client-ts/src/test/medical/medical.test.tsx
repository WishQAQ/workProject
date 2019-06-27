import React from 'react'
import {Layout} from 'antd'
import {LazyLoader} from 'tools/lazyLoader'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {loginService, LoginState} from 'service/user/login/index'
import {routeService, RouteState} from 'service/RouteService'
import {HomeService, HomeState} from 'service/home/index'
import DataElement from 'view/medical/data-element'
import DataRange from 'view/medical/data-range'
import DataSet from 'view/medical/data-set'
import FixedValue from 'view/medical/bd-fixed'
import Keyword from 'view/medical/keyword'
import Medical from 'view/medical/medical'
import QualityMaintenance from 'view/medical/quality-maintenance'
import TplMaintenance from 'view/medical/tpl-maintenance'
import MedicalRecordArchiving from 'view/medical/record-archiving'
import MedicalRecord from 'view/medical/medical-record'
import MedicalSign from 'view/medical/medical-sign'
import MedicalCatalogue from 'view/medical/medical-catalogue'
import Translate from 'view/medical/translate'
import ReactDOM from 'react-dom'
import ClassParagraphs from 'view/nurse/classes/class-paragraphs'
import NurseGroup from 'view/nurse/classes/nurse-group'
import SchedulingIndex from 'view/nurse/classes/scheduling-index'
import ShiftsChange from 'view/nurse/shift/change-shifts'
import ExchangeClasses from 'view/nurse/classes/exchange-classes'

class MedicalTest extends FluxComponent<HomeState & RouteState & LoginState> {
    title: string = '电子病历测试首页'
    routeService = routeService
    loginService = loginService

    render() {
        let {
            route_data_element,
            route_data_range,
            route_data_set,
            route_fixed_value,
            route_keyword,
            route_quality_maintenance,
            route_medical,
            route_tpl_maintenance,
            route_record_archiving,
            route_translate,
            route_medical_record,
            route_medical_sign,
            route_medical_catalogue,
            route_nurse_class_paragraphs,
            route_nurse_nurse_group,
            route_nurse_scheduling_index,
            route_nurse_exchange_classes
        } = this.state
        const isLogin = HomeService.isLogin()
        return (
            isLogin ?
                <Layout>
                    {route_medical_record && <LazyLoader lazyModule={MedicalRecord}/>}
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
                    {route_tpl_maintenance && <LazyLoader lazyModule={TplMaintenance}/>}
                    {route_translate && <LazyLoader lazyModule={Translate}/>}
                    {route_nurse_class_paragraphs && <LazyLoader lazyModule={ClassParagraphs}/>}
                    {route_nurse_nurse_group && <LazyLoader lazyModule={NurseGroup}/>}
                    {route_nurse_scheduling_index && <LazyLoader lazyModule={SchedulingIndex}/>}
                    {route_nurse_exchange_classes && <LazyLoader lazyModule={ShiftsChange}/>}
                    {route_nurse_exchange_classes && <LazyLoader lazyModule={ExchangeClasses}/>}
                </Layout>
                : <div>请先登录</div>
        )

    }
}

ReactDOM.render(<MedicalTest/>, document.getElementById('root'))