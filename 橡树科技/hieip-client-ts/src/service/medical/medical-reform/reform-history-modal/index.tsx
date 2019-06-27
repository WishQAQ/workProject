import {BaseService} from 'tools/flux/BaseService'
import {ApiLinkQualityRectification} from 'pkg/api/medical'
import {reformContentService} from 'service/medical/medical-reform/reform-content'
import {MrRectificationIndexItemModelEntityLinkQuality, QcMrPatientMonitorOnlineEntityMonitor} from 'pkg/entity/medical'
import {message} from 'pkg/common/message'

/**
 * 病历历史弹出框service
 * create By 李潇潇
 * create Time 2018-2-5
 */
export interface ReformHistoryModelState {
    isHistoryVisible?: boolean // 是否显示历史记录
    currentPanel?: string // 自动质控1 手动质控2 切换

    mrRectificationIndex?: Array<MrRectificationIndexItemModelEntityLinkQuality>, // 指定患者的病历历史记录（手动）
    qcMrRectificationIndex?: Array<QcMrPatientMonitorOnlineEntityMonitor>, // 指定患者的病历历史记录（自动）  todo 名称待定
}

class ReformHistoryModelService extends BaseService<ReformHistoryModelState> {
    defaultState = {
        isHistoryVisible: false,
        currentPanel: '1'
    }

    // 隐藏病历历史Modal框
    onMedicalHistoryHide = () => {
        this.dispatch({isHistoryVisible: false})
    }
    // 显示病历历史Modal框
    onMedicalHistoryShow = () => {
        this.qualityControl()
        this.dispatch({isHistoryVisible: true})
    }
    onTabChange = (key) => {
        this.dispatch({currentPanel: key})
    }
    /**
     * 根据选中的质控评分类别查询评分明细的信息
     */
    qualityControl = () => {
        const {currentPatient} = reformContentService.state
        ApiLinkQualityRectification.qualityControl(currentPatient ? currentPatient.patientId : ''
            , currentPatient ? currentPatient.visitId : null).then(data => {
            if (data) {
                for (let prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        switch (prop) {
                            case 'mrRectificationIndex': {
                                this.dispatch2({mrRectificationIndex: data[prop]})
                                break
                            }
                            case 'qcMrRectificationIndex': {
                                this.dispatch2({qcMrRectificationIndex: data[prop]})
                                break
                            }
                            default:
                                break
                        }
                    }
                }
            }
        }).catch(err => {
            message.tip(err || '加载历史记录出错', 'error', 'center')
        })
    }
}

export const reformHistoryModelService = new ReformHistoryModelService('reformHistoryModel')