import {BaseService} from 'tools/flux/BaseService'
import {MrModelDtoPatient, Page} from 'pkg/entity/medical'

export interface ExpenseState {
    /* ---界面所需变量--------------------*/
    page?: Page
    /*----service所需变量-------------------*/
    /*患者基本信息*/
    patient?: MrModelDtoPatient,
}

/**
 * 李潇潇
 * 病案首页--费用Service
 */
class ExpenseService extends BaseService<ExpenseState> {
    defaultState = {
        page: {
            startIndex: 1,
            pageSize: 100
        }
    }

    /*---------------------service方法  BEGIN----------------------*/
    /**
     * 获取basic患者费用信息
     * @param expense
     */
    variableAssignment = (expense) => {
        this.reset()
        this.dispatch2({patient: expense})
    }
    /*---------------------service方法   END----------------------*/
}

export const expenseService = new ExpenseService('expense')