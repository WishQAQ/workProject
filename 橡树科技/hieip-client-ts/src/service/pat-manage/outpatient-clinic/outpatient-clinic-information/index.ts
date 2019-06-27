import {BaseService} from 'tools/flux/BaseService'
import {loginService} from 'service/user/login'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import moment from 'moment'
import {MhPatientVisitModelEntitySplit, OutpPatsEntityPatManageOutp} from 'pkg/entity'
import {outpatientClinicListService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-list'

export interface OutpatientClinicInfoState {
    curAgPatInfo?:any
}

class OutpatientClinicInfoService extends BaseService<OutpatientClinicInfoState> {

    defaultState = {
        curAgPatInfo:{}
    }

    setCurAgPatInfo=(data)=>{
        this.dispatch2({
            curAgPatInfo:data
        })
    }

    openModify = () => {
        let pvid = outpatientClinicListService.state.curPvId
        if(pvid === null){
            message.tip('当前没有选中病人!', 'warning')
            return
        }
        outpatientClinicListService.openModify(String(pvid))
    }
}

export const outpatientClinicInfoService = new OutpatientClinicInfoService('outpatientClinicInfo')