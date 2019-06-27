import { BaseService } from 'tools/flux/BaseService'
import {
    MrRectificationIndexModelDtoLinkQuality,
    MrRectificationItemEntityLinkQuality
} from 'pkg/entity/medical'
import { JsonUtil } from 'tools/api/JsonUtil'

import { loginService } from 'service/user/login'
import { ApiDictInput, ApiLinkQualityRectification } from 'pkg/api/medical'
import { message } from 'pkg/common/message'
import { reformContentService } from 'service/medical/medical-reform/reform-content'
import { reformSidebarService } from 'service/medical/medical-reform/reform-sidebar'

/**
 * 病历整改通知书弹出框service
 * create By 李潇潇
 * create Time 2018-2-5
 */
export interface ReformNoticeModelState {
    isNoticeVisible?: boolean, // 是否显示病历整改通知书
    mrRectificationIndexModels?: Array<MrRectificationIndexModelDtoLinkQuality>, // 整改通知实体集
    mrRectificationIndexModel?: MrRectificationIndexModelDtoLinkQuality, // 整改通知实体模型

    mrRectNoticeItems?: Array<MrRectificationItemEntityLinkQuality>,// 病案通知指定的病历缺陷
    mrRectIndexMap?: {}, // 储存所有的缺陷信息
    mrRectIndexNames?: string[],// 病案通知左侧显示内容

    time?: number,// 通知主记录整改期限
    itemTime?: number,// 通知明细记录整改期限
    itemQcMark?: string,// 通知明细整改备注

    deptName?: string, // 主记录质控科室名称
}

class ReformNoticeModelService extends BaseService<ReformNoticeModelState> {
    defaultState = {
        isNoticeVisible: false,
        mrRectIndexNames: [],
        mrRectificationIndexModels: [],
        time: 1,
        itemTime: 1
    }

    /**
     * 显示病历整改通知书
     */
    onReformNoticeShow = (map?) => {
        this.dispatch2({ mrRectNoticeItems: [] })
        let names = []
        let totalScore = 0
        let bigMap = {}
        if (map) {
            for (let key in map) {
                if (map.hasOwnProperty(key)) {
                    names.push(key)
                    let value = map[key]
                    let newMap = {}
                    for (let i = 0; i < value.length; i++) {
                        let data = value[i]
                        let key1 = data.gradingItemCode
                        let v = newMap[key1]
                        if (!v) {
                            data.errorNumbers = 1
                            data.errorTotalScore = data.gradingItemScore
                        } else {
                            data.errorNumbers = v.errorNumbers + 1
                            data.errorTotalScore = v.gradingItemScore * (data.errorNumbers)
                        }
                        newMap[key1] = data
                    }
                    let list = []
                    for (let key2 in newMap) {
                        if (newMap.hasOwnProperty(key2)) {
                            list.push(newMap[key2])
                            totalScore = totalScore + newMap[key2].errorTotalScore
                        }
                    }
                    bigMap[key] = list
                }
            }
            let noticeItems = []
            for (let obj in bigMap) {
                if (bigMap.hasOwnProperty(obj)) {
                    bigMap[obj].map(v => {
                        noticeItems.push(v)
                    })
                }
            }

            const { user } = loginService.state
            this.loadData(user.deptCode)
            this.dispatch2({
                isNoticeVisible: true,
                mrRectIndexMap: bigMap,
                mrRectNoticeItems: noticeItems,
                mrRectIndexNames: names,
                mrRectificationIndexModel: {
                    patName: user.name, // 质控人
                    userName: user.name,// 质控人
                    // deptName: deptName,// 质控科室
                    rectificationDateTime: new Date(),

                    qcUserId: user.id,
                    qcUserName: user.userName,
                    qcDeptCode: user.deptCode,
                    qcDeptName: user.deptCode,
                    mrScore: totalScore,//  整改扣分，如果为0，则说明本次质控未发现问题
                    isNoProblem: totalScore === 0 ? 1 : 0 // 本次质控是否无问题 0：否 1:是
                },
            })
        }
    }

    /**
     * 查询字典数据
     * @param deptCode 科室编码
     * @returns {Promise<void>}
     */
    loadData = (deptCode) => {
        return ApiDictInput.loadData(null, 'deptDict', deptCode).then((data) => {
            this.dispatch({ deptName: data[0].value })
        }).catch(msg => message.tip(msg || '查询字典数据失败!'))
    }
    /**
     * 在map里面获取缺陷信息
     */
    getMrRectItems = (val) => {
        const { mrRectIndexMap } = this.state
        this.dispatch2({ mrRectNoticeItems: mrRectIndexMap ? mrRectIndexMap[val] : [] })
    }
    /**
     * 隐藏病历整改通知书
     */
    onReformNoticeHide = () => {
        this.dispatch({ isNoticeVisible: false })
    }
    /**
     * 病历通知确认更新
     */
    onNoticeOk = () => {
        const { mrRectIndexMap, itemQcMark, time, itemTime } = this.state
        const { currentPatient } = reformContentService.state
        const { currentPatientMedical } = reformSidebarService.state

        let saveList: Array<MrRectificationIndexModelDtoLinkQuality> = []
        if (mrRectIndexMap) {
            const { mrRectificationIndexModel } = this.state
            if (JsonUtil.isEmpty(time) || JsonUtil.isEmpty(itemTime)) {
                message.tip('请选择整改期限', 'warning', 'center')
                return
            }

            for (let key in mrRectIndexMap) {
                if (mrRectIndexMap.hasOwnProperty(key)) {
                    mrRectificationIndexModel.time = time.toString()      // 主记录整改期限
                    mrRectificationIndexModel.itemTime = itemTime.toString() // 明细记录整改期限
                    mrRectificationIndexModel.patientId = currentPatient.patientId  // 主记录患者ID
                    mrRectificationIndexModel.visitId = currentPatient.visitId   // 主记录住院次数
                    mrRectificationIndexModel.rectificationDateTime = new Date() // 主记录通知发送时间
                    mrRectificationIndexModel.fileId = key // 病历号
                    mrRectificationIndexModel.rectificationLevel = 1  //  todo 整改级别处理
                    mrRectificationIndexModel.rectificationStatus = currentPatientMedical.status  // 主记录状态
                    mrRectificationIndexModel.statusName = currentPatientMedical.statusName // 主记录状态名称
                    mrRectificationIndexModel.fileVisitType = currentPatientMedical.fileVisitType // 主记录病历类型
                    mrRectificationIndexModel.receiveUserId = currentPatientMedical.signatureId // 主记录接收人ID
                    mrRectificationIndexModel.receiveDeptCode = currentPatientMedical.deptCode // 主记录接收科室
                    mrRectificationIndexModel.hospitalNo = currentPatientMedical.hospitalNo // 主记录医院编码
                    let data = JsonUtil.clone(mrRectificationIndexModel)
                    mrRectIndexMap[key].qcMark = itemQcMark // 明细记录整改备注
                    data.mrRectificationItems = JsonUtil.clone(mrRectIndexMap[key])
                    saveList.push(data)
                }
            }
        }
        this.insertInfo(saveList)
        this.onReformNoticeHide()
    }
    // 数据绑定
    onChangeDataSet = (value, path) => {
        if (value) {
            if ('mrRectificationIndexModel.rectificationDateTime' === path) {
                this.dispatch(JsonUtil.json(path, this.state, value))
            } else {
                if (typeof (value) === 'object')
                    this.dispatch(JsonUtil.json(path, this.state, value.target.value))
                else
                    this.dispatch(JsonUtil.json(path, this.state, value))
            }
        }
    }
    /**
     * 下拉框取值(整改期限处理)
     */
    onSelectChange = (value, path) => {
        this.dispatch(JsonUtil.json(path, this.state, value))
        const { time, itemTime } = this.state
        if (time && itemTime && (itemTime > time)) {
            message.tip('明细信息的整改期限不能超过主记录的整改期限，请重新选择', 'warning', 'center')
            this.dispatch({ itemTime: 1 })
            return
        }
    }

    /**
     * 添加整改记录
     *
     */
    insertInfo = (saveList?) => {
        ApiLinkQualityRectification.insertInfo(saveList).then(() => {
            message.tip('整改通知发送成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '保存失败', 'error', 'center')
        })
        this.dispatch2({ mrRectificationIndexModels: [] })
    }
}

export const reformNoticeModelService = new ReformNoticeModelService('reformNoticeModel')
