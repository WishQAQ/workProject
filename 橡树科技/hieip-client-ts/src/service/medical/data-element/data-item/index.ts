import { BaseService } from 'tools/flux/BaseService'
import { BdCvItemsEntityDataSet } from 'pkg/entity/medical'

export interface DataItemState {

    /**  异常信息提示 */
    errorMessage?: string

    /**  状态 */
    isStatus?: boolean

    /**  值域项 */
    bdCvItemsList?: BdCvItemsEntityDataSet[]
}

class DataItemService extends BaseService<DataItemState> {
    defaultState = {
        isStatus: false
    }

    serviceWillMount() {
        this.reset()
    }

    /**
     * 值域项
     */
    select = (bdCvItems?: BdCvItemsEntityDataSet[]) => {
        this.dispatch2({ bdCvItemsList: bdCvItems })
    }
    /**
     * 清空值域项
     */
    delete = () => {
        this.dispatch2({ bdCvItemsList: [] })

    }
}

export const dataItemService = new DataItemService('dataItem')