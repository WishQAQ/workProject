import {BaseService} from 'tools/flux/BaseService'
import {listStore} from 'tools/flux/ListStore'
import * as React from 'react'
import Button from 'antd/es/button/button'

export interface RouteState {
    route?: keyof RouteState
    /** 进入首页 */
    route_home?: boolean
    /** 新分诊 */
    route_new_triage?: boolean
    /** 患者管理 */
    route_patient_list?: boolean
    /** 群伤事件 */
    route_group_injury?: boolean
    /** 患者列表 */
    route_patient_manage?: boolean
    /** 患者管理 */
    route_patient_info?: boolean
    /** 概览 */
    route_patient_manage_overview?: boolean
    /** 医嘱下达 */
    route_patient_manage_orders_apply?: boolean
    /** 手术 */
    route_patient_manage_operation?: boolean
    /** 检查 */
    route_patient_manage_exam_apply?: boolean
    /** 检验 */
    route_patient_manage_lab_apply?: boolean
    /** 用血 */
    route_patient_manage_blood?: boolean
    /** 诊断 */
    route_patient_manage_diagnosis?: boolean
    /** 会诊 */
    route_patient_manage_con_apply?: boolean
    /** 计价单 */
    route_patient_manage_bill?: boolean
    /** 护理信息录入 */
    route_patient_manage_vital_signs_rec?: boolean
    /** 体温单 */
    route_patient_manage_temp_chart?: boolean
    /** 患者管理跳转页面 */
    route_patient_manage_jump?:boolean
    /** 模糊查询配置 */
    route_select_input_dict?: boolean
    /** 数据元 */
    route_data_element?: boolean
    /** 值域 */
    route_data_range?: boolean
    /** 数据集 */
    route_data_set?: boolean
    /** 固定值维护 */
    route_fixed_value?: boolean
    /** 关键词维护 */
    route_keyword?: boolean
    /** 质控维护 */
    route_quality_maintenance?: boolean
    /** 病案首页 */
    route_medical_record?: boolean
    /** 病历书写 */
    route_medical?: boolean
    /** 病历修改 */
    route_medical_reform?: boolean
    /** 病案归档 */
    route_record_archiving?: boolean
    /** 病历签收 */
    route_medical_sign?: boolean
    /** 病案编目 */
    route_medical_catalogue?: boolean
    /** 班段 */
    route_paragraphs?: boolean
    /** 护理单元 */
    route_nursing_unit?: boolean
    /** 交接班 */
    route_change_shifts?: boolean
    /** 模板维护 */
    route_tpl_maintenance?: boolean
    /** 模板制作 */
    route_translate?: boolean
    /** 护理排班 */
    route_nurse_class_paragraphs?: boolean
    /** 护理分组 */
    route_nurse_nurse_group?: boolean
    /**  排班 */
    route_nurse_scheduling_index?: boolean
    /**  门诊医生站 */
    route_outpatient_clinic?: boolean
    /** 调班管理 */
    route_nurse_exchange_classes?: boolean
    /**  交接班 */
    route_nurse_shift_change?: boolean
    /** 护理记录单 */
    route_nurse_record_config?: boolean
    /** 科室护理记录单书写 */
    route_nurse_record_dept?: boolean
    /** 人员护理记录单书写 */
    route_nurse_record_patient?: boolean
    /** 护理评估单设置 */
    route_nurse_assessment_sheet?: boolean
    /**  质控统计 */
    route_quality_control?: boolean
}

class RouteService extends BaseService<RouteState> {
    back(callback?: () => void) {
        listStore.backState(callback)
    }

    prev(callback?: () => void) {
        listStore.prevState(callback)
    }

    push(key: keyof RouteState, callback?: () => void) {
        const route = {[key]: true, route: key}
        const keys = Object.keys(this.state)
        for (let i = 0; i < keys.length; i++) {
            const key1 = keys[i]
            if (key1 !== 'route' && key1 !== key) route[key1] = false
        }
        this.reset(route, callback)
    }
}

export const routeService = new RouteService('root-route')

interface LinkProps<P> {
    element?: React.ComponentClass<P & { onClink: () => void }>
    elementProps?: P & { onClink?: () => void, children?: React.ReactNode }
    link: keyof RouteState
}

export class Link<P> extends React.Component<LinkProps<P>> {
    static defaultProps = {
        element: Button
    }

    private originalOnClink: () => void

    clinkLink = () => {
        const {link} = this.props
        routeService.push(link)
        if (this.originalOnClink) this.originalOnClink()
    }

    render() {
        const {element, elementProps, children, ...other} = this.props
        this.originalOnClink = elementProps.onClink
        elementProps.onClink = this.clinkLink
        if (children && !elementProps.children) elementProps.children = children
        return React.createElement(element, Object.assign(elementProps as P & { onClink: () => void }, other))
    }
}
