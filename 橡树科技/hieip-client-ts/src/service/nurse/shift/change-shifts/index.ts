
import {BaseService} from 'tools/flux/BaseService'
import {shiftIndexService} from 'service/nurse/shift/change-shifts/shift-index'

export interface ShiftMainState{

}

class ShiftMainService extends BaseService<ShiftMainState>{
    defaultState={
    }
    getInfo=(wardCode)=>{
        shiftIndexService.getInfo('230102')
    }

}
export const shiftMainService = new ShiftMainService('shiftMain')