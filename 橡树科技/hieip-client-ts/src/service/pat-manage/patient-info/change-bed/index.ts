import { BaseService } from 'tools/flux/BaseService'
import { ApiPatManageInDept, ApiPatManageTransferRec } from 'pkg/api'
import { message } from 'pkg/common/message'
import { patientTableService } from 'service/pat-manage/patient-info/patient-table'
import { JsonUtil } from 'tools/api/JsonUtil'
import { patInfoHeaderService } from 'service/pat-manage/patient-info/header'
import { InDeptEntityPatManage } from 'pkg/entity'

export interface ChangeBedState {
    modals?: string
    bedLabel1?: string
    bedLabel2?: string
    bed1?: InDeptEntityPatManage
    bed2?: InDeptEntityPatManage
}

class ChangeBedService extends BaseService<ChangeBedState> {
    defaultState = {
        modals: '',
        bedLabel1: '',
        bedLabel2: '',
        bed1: <InDeptEntityPatManage>{},
        bed2: <InDeptEntityPatManage>{}
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 入科患者信息: 根据床位查询患者
     */
    loadBedCard = (index) => {
        let bedLabel = this.state['bedLabel' + index]
        if (JsonUtil.isEmpty(bedLabel)) {
            message.tip('空床位不能查询!', 'warning')
            this.dispatch2(JsonUtil.json('bed' + index, this.state, {}))
            return
        }
        return ApiPatManageInDept.loadBedCard({ bedLabel: bedLabel }, null, null, null, null).then((data) => {
            // 特殊处理: 根据床位查询患者,只取第一条数据
            let model
            if (JsonUtil.isEmpty(data)) {
                model = {}
                message.tip('床位【' + bedLabel + '】无患者!', 'warning')
            } else model = data[0]
            this.dispatch2(JsonUtil.json('bed' + index, this.state, model))
        }).catch(err => {
            message.tip(err.msg || '查询入科患者信息失败!', 'warning')
        })
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /**
     * 转床
     */
    changeBed = () => {
        let model = {}
        const { bed1, bed2 } = this.state
        let admWardPvId = bed1.pvId
        let dischargePvId = bed2.pvId
        if (JsonUtil.isEmpty(admWardPvId) && JsonUtil.isEmpty(dischargePvId)) {
            message.tip('都為空床位不允许换床,换床失败!', 'warning')
            return
        }
        let admWardBedLabel = bed1.bedLabel
        if (!admWardBedLabel || admWardBedLabel.length === 0) {
            message.tip('门诊患者不允许换床,换床失败!', 'warning')
            return
        }
        let dischargeBedLabel = bed2.bedLabel
        if (!dischargeBedLabel || dischargeBedLabel.length === 0) {
            message.tip('门诊患者不允许换床,换床失败!', 'warning')
            return
        }
        if (!JsonUtil.isEmpty(admWardPvId)) {
            JsonUtil.json('admWardAreaId.id', model, bed2.areaId)
            JsonUtil.json('dischargeAreaId.id', model, bed1.areaId)
            JsonUtil.json('admWardBedLabel', model, bed2.bedLabel)
            JsonUtil.json('dischargeBedLabel', model, bed1.bedLabel)
            JsonUtil.json('operator.id', model, 1)
        } else {
            JsonUtil.json('admWardAreaId.id', model, bed1.areaId)
            JsonUtil.json('dischargeAreaId.id', model, bed2.areaId)
            JsonUtil.json('admWardBedLabel', model, bed1.bedLabel)
            JsonUtil.json('dischargeBedLabel', model, bed2.bedLabel)
            JsonUtil.json('operator.id', model, 1)
        }
        return ApiPatManageTransferRec.changeBed(model).then((data) => {
            message.tip(data || '转床成功!', 'warning')
            patientTableService.loadBedCard()
            this.onHideModal()
        })
    }
    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }
    /**
     * modal框取消按钮
     */
    onHideModal = () => {
        patInfoHeaderService.tabs('')
        this.dispatch({
            bedLabel1: '',
            bedLabel2: '',
            bed1: <InDeptEntityPatManage>{},
            bed2: <InDeptEntityPatManage>{}
        })
        changeBedService.setStateJson('bed1', {})
        changeBedService.setStateJson('bed2', {})
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const changeBedService = new ChangeBedService('changeBed')
