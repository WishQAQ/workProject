import {BaseService} from 'tools/flux/BaseService'
import {message} from 'pkg/common/message'

export interface OutPatientPrescriptionState {

}

class OutPatientPrescriptionService extends BaseService<OutPatientPrescriptionState> {

}

export const outPatientPrescriptionService = new OutPatientPrescriptionService('outPatientPrescription')