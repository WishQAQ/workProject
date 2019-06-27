import {BaseService} from 'tools/flux/BaseService'
import {loginService} from 'service/user/login'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiPatManageDiagnosis, ArrayData} from 'pkg/api'
import {DiagnosisEntityPatManageDiagnosis} from 'pkg/entity'
import {outpatientClinicListService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-list'

export interface OutpatientClinicDetailState {
    showDiagnosisBox?: boolean // 诊断弹框代开状态
    diagnosisData?: ArrayData<DiagnosisEntityPatManageDiagnosis> // 查询诊断数据
}

class OutpatientClinicDetailService extends BaseService<OutpatientClinicDetailState> {
    defaultState = {
        showDiagnosisBox: false,
        diagnosisData: <ArrayData<DiagnosisEntityPatManageDiagnosis>><any>[],
    }

    /**
     * 查询当前患者诊断信息
     */
    findByPvId = () => {
        let pvId = outpatientClinicListService.state.curPvId
        return ApiPatManageDiagnosis.findByPvId(pvId).then((data) => {

            this.dispatch2({diagnosisData: data})
        }).catch(err => {
            message.tip(err || '查询患者诊断失败', 'error')
        })
    }

    /**
     * 诊断类型显示值判断
     */
    showDiagnosisTypeD = (params) => {
        let value = ''
        if (!params.data.diagnosisTypeName) {
            value = params.data.diagnosisType.name
        }
        else {
            value = params.data.diagnosisTypeName
        }
        return value
    }

    /**
     * 诊断弹框打开状态
     */
    diagnosisOpen = () => {
        this.dispatch2({showDiagnosisBox: true})
        this.findByPvId()
    }
    /**
     * 诊断弹框关闭状态
     */
    diagnosisClose = () => {
        this.dispatch2({showDiagnosisBox: false})
    }
}

export const outpatientClinicDetailService = new OutpatientClinicDetailService('OutpatientClinicDetailService')