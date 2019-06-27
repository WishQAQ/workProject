import {ApiSplitMhPatientVisit} from 'pkg/api'
import {BaseService} from 'tools/flux/BaseService'
import {MhGroupInjuryModelDtoSplit} from 'pkg/entity'
import {message} from 'pkg/common/message'
import {routeService} from 'service/RouteService'
import {triageService} from 'service/triage/new-triage/triage'
import {patientConenteService} from 'service/triage/patient-list/patient-conente'

/**
 * agApi
 */
let agApi

export interface PatientModelState {
    /**
     * 分页: 开始行数
     */
    startIndex?: number
    /**
     * 分页: 分页数
     */
    pageSize?: number
    /**
     * 返回的新分诊的患者信息
     */
    triagePatsViewEntitySplit?: MhGroupInjuryModelDtoSplit[]

    /**
     * 状态
     */
    visible?: boolean
    /**
     * 状态
     */
    isStatus1?: boolean
    /**
     * 查询群伤事件的开始时间
     */
    happenDateStart?: Date

    /**
     * 查询群伤事件的结束时间
     */
    happenDateEnd?: Date

    /**
     * 根据条件查询到群伤事件的信息
     */
    mhGroupInjuryEntitySplit?: MhGroupInjuryModelDtoSplit[]

    /**
     * 患者id
     */
    pvId?: string

    /**
     *  右键菜单：为1表示退号  0 为群伤关联
     */
    menuindex?: number
    /**
     * 选择行数的下标
     */
    dataindex?: number

    /**
     * 群伤id
     */
    bulkinjuryId?: string
}

class PatientModelService extends BaseService<PatientModelState> {
    defaultState = {
        startIndex: 1,
        pageSize: 50,
        isStatus: false,
        pvId: '1',
        bulkinjuryId: '2',
        visible: false,
        isStatus1: false
    }

    /* =====分界线: 一、后台处理: 开始===== */
    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /**
     *  service加载的时候加载的数据
     */
    serviceWillMount() {
        this.loadMhGroupInjury()
    }

    /* =====分界线: 1.1、字典表查询: 结束===== */
    /* =====分界线: 1.2、其它查询: 开始===== */
    /* =====分界线: 1.2、其它查询: 结束===== */
    /**
     * 获取群伤事件
     */
    loadMhGroupInjury = () => {
        let {happenDateStart, happenDateEnd} = this.state
        return ApiSplitMhPatientVisit.loadMhGroupInjury(happenDateStart, happenDateEnd).then(data => {
            this.reset({mhGroupInjuryEntitySplit: data})
            // this.dispatch2({happenDateStart: null, happenDateEnd: null})
            if (agApi) agApi.api.setRowData(data)
        }).catch(err => message.tip(err || '查询群伤事件失败', 'error'))
    }
    /* =====分界线: 1、查询: 结束===== */
    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /**
     * 关联群伤事件
     */
    updateMhGroupInjury = () => {
        const {pvId, bulkinjuryId} = this.state
        if (bulkinjuryId) {
            return ApiSplitMhPatientVisit.updateMhGroupInjury(pvId, bulkinjuryId).then(data => {
                this.dispatch({visible: false})
                message.tip(data || '保存成功', 'success')
                patientConenteService.onReverSource()
            }).catch(err => {
                message.tip(err || '群伤关联失败', 'warning')
            })
        }
        else {
            message.tip('请选择正确数据进行关联', 'error')
        }
    }

    /**
     * 退号操作
     */
    isBackNo = () => {
        const {pvId} = this.state
        return ApiSplitMhPatientVisit.isBackNo(pvId).then(data => {
            message.tip('更新挂号状态成功', 'success')
            patientConenteService.onReverSource()
        }).catch(err => {
            message.tip(err || '更新挂号状态失败', 'error')
        })
    }

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */

    // /**
    //  *  异常信息提醒
    //  */
    // lifecycleByState(state: PatientModelState) {
    //     if (state.errorMessage) this.dispatch({errorMessage: null}, 5000)
    // }

    /**
     *  获取群伤事件中某一行数据
     */
    showCurRowMessage1 = (record) => {
        this.dispatch({bulkinjuryId: record.data.id})
    }
    /**
     *  获取患者列表选中的患者id
     */
    showCurRowMessage = (record) => {
        this.dispatch({pvId: record.data.pvId})
    }
    /**
     *  table右键功能的值判断进行弹框
     */
    menuClik = (menuindex) => {
        switch (menuindex) {
            case '群伤关联':
                this.dispatch({visible: true})
                break
            case '退号':
                message.linkAge('确定要退号?', null, '确认', '取消', this.isBackNo)
                break
            case '分诊修改':
                const {pvId} = this.state
                if (pvId && pvId.toString().trim().length > 0) {
                    // 跳转分诊界面
                    triageService.setStateJson('mhSplit.patientVisit.id', pvId)
                    routeService.push('route_new_triage')
                } else {
                    message.tip('请选择一行')
                }
                break
            default:
                break
        }
    }
    /**
     *  关闭弹框
     */
    hideModal = () => {
        this.dispatch({visible: false})
    }

    /**
     * 分页
     */
    onGridReady = (params) => {
        agApi = params
        let {mhGroupInjuryEntitySplit} = this.state
        if (mhGroupInjuryEntitySplit) {
            agApi.api.setRowData(mhGroupInjuryEntitySplit)
        }
    }
    /**
     * 时间赋值
     */
    onChange = (v) => {
        this.dispatch({
            happenDateStart: v[0],
            happenDateEnd: v[1]
        })
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const
    patientModelService = new PatientModelService('patientModel')