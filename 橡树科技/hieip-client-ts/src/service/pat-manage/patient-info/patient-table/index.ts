import { BaseService } from 'tools/flux/BaseService'
import { ApiPatManageInDept } from 'pkg/api'
import { InDeptEntityPatManage, VisitPatInfoViewEntityPatManage } from 'pkg/entity'
import { message } from 'pkg/common/message'
import { cardService } from 'service/pat-manage/patient-info/card'
import { patInfoHeaderService } from 'service/pat-manage/patient-info/header'
import { JsonUtil } from 'tools/api/JsonUtil'

export interface PatientTableState {
    /**
     * 指定患者就诊信息
     */
    visitPatInfoView?: VisitPatInfoViewEntityPatManage
    /**
     * 入科患者信息
     */
    inDept?: Array<InDeptEntityPatManage>
    /**
     * 入科患者信息查询参数
     */
    inDeptParams?: InDeptEntityPatManage
    /**
     * 未入科患者信息
     */
    notInDept?: Array<InDeptEntityPatManage>
    /**
     * 分诊级别
     */
    triageLevelDict?: any

    /**
     * 面板切换
     */
    cardorList?: boolean
}

class PatientTableService extends BaseService<PatientTableState> {
    defaultState = {
        /**
         * 指定患者就诊信息
         */
        visitPatInfoView: <VisitPatInfoViewEntityPatManage>{},
        /**
         * 未入科患者信息
         */
        notInDept: [],
        /**
         * 入科患者信息
         */
        inDept: [],
        /**
         * 入科患者信息查询参数
         */
        inDeptParams: <InDeptEntityPatManage>{},
        isTableStyle: true,

        /**
         * 分诊级别
         */
        triageLevelDict: {
            '一级': 1,
            '二级': 2,
            '三级': 3,
            '四级': 4
        },

        /**
         * 面板切换
         */
        cardorList: true
    }

    serviceWillMount() {
        this.dispatch2({inDeptParams:{}})  // 在重新render时 清空查询条件
        this.queryParams()
        this.loadVisitPatInfoView()
        this.loadNotInDept()
        this.loadBedCard()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 指定患者就诊信息
     */
    loadVisitPatInfoView = (pvId?: any) => {
        return ApiPatManageInDept.loadVisitPatInfoView(pvId).then((data) => {
            this.dispatch2({ visitPatInfoView: data })
        }).catch(err => {
            message.tip(err.msg || '查询指定患者就诊信息失败!', 'warning')
        })
    }
    /**
     * 未入科患者信息
     */
    loadNotInDept = (model?: any, startIndex?: any, pageSize?: any) => {
        return ApiPatManageInDept.loadNotInDept(model, startIndex, pageSize).then((data) => {
            this.dispatch2({ notInDept: data })
        }).catch(err => {
            message.tip(err.msg || '查询未入科患者信息失败!', 'warning')
        })
    }
    /**
     * 入科患者信息
     */
    loadBedCard = () => {
        let startIndex, pageSize, status, appFlag
        const { inDeptParams } = this.state
        return ApiPatManageInDept.loadBedCard(inDeptParams, startIndex, pageSize, status, appFlag).then((data) => {
            // 特殊处理: 患者信息id不为空,表示已入科患者
            let inDept = []
            data.forEach((model) => {
                if (!JsonUtil.isEmpty(model.pvId)) {
                    inDept.push(model)
                }
            })
            this.dispatch2({ inDept: inDept })
            patInfoHeaderService.loadCount(data)
            cardService.setStateJson('card', data)// 设置床卡数据
        }).catch(err => {
            message.tip(err.msg || '查询入科患者信息失败!', 'warning')
        })
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
        if (!JsonUtil.isEmpty(path)) {
            let paths = path.split('.')
            if (paths[0] === 'inDeptParams') {
                this.queryParams()
                this.loadBedCard()
            }
        }
    }

    /**
     * 查询参数变化
     */
    queryParams = () => {
        patInfoHeaderService.setStateJson('inputCode', JsonUtil.getJsonByKey('inDeptParams.name', this.state))
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const patientTableService = new PatientTableService('patientTable')
