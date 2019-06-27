import { BaseService } from 'tools/flux/BaseService'
import { TriagePatsViewEntitySplit } from 'pkg/entity'
import { BdDsIndexEntityDataSet } from 'pkg/entity/medical'

export interface DataCiteState {

    /** 异常信息提示  */
    errorMessage?: string

    /**  状态  */
    isStatus?: boolean
    /**  分页: 开始行数  */
    startIndex?: number
    /**  分页: 分页数 */
    pageSize?: number

    /**  分诊患者信息 */
    model?: TriagePatsViewEntitySplit

    /**  返回的新分诊的患者信息  */
    triagePatsViewEntitySplit?: TriagePatsViewEntitySplit[]
    /** ag表格的属性  */
    agApi?: any

    /**  数据集  */
    dsIndexList?: BdDsIndexEntityDataSet[]
}

class DataCiteService extends BaseService<DataCiteState> {
    defaultState = {
        startIndex: 1,
        pageSize: 100,
        isStatus: false
    }

    serviceWillMount() {
        this.reset()
    }

    /**
     * 数据集
     */
    select = (dsIndex?: BdDsIndexEntityDataSet[]) => {
        this.dispatch2({ dsIndexList: dsIndex })
    }

    /**
     * 清空数据集
     */
    delete = () => {
        this.dispatch2({ dsIndexList: [] })
    }

}

export const dataCiteService = new DataCiteService('dataCite')