import { BaseService } from '../../../../tools/flux/BaseService/index'
import { BdDeIndexEntityDataSet } from '../../../../packages/entity/medical'

/**
 * 值域引用情况Service
 */
export interface DataCiteState {
    /*值域引用情况*/
    bdDeCites?: Array<BdDeIndexEntityDataSet>,
}

class DataCiteService extends BaseService<DataCiteState> {
    rangeCiteagApi: any
    /**
     * 页面初始化时的默认值，当state更新是会被替换
     */
    defaultState = {
        bdDeCites: []
    }

    serviceWillMount() {
        this.reset()
    }

    /**
     * 为属性赋值预加载
     * @param bdDeCites
     */
    assignment = (bdDeCites) => {
        this.dispatch({ bdDeCites: bdDeCites })
        // 动态为表格赋值
        this.rangeCiteagApi.api.setRowData(bdDeCites)
    }
    /**
     * 删除缓存数据
     */
    delete = () => {
        this.dispatch2({ bdDeCites: [] })
        this.rangeCiteagApi.api.setRowData([])
    }
    /**
     * 加载ag Table
     * @param parm
     */
    onGridReady = (parm) => {
        this.rangeCiteagApi = parm
    }
}

export const dataCiteService = new DataCiteService('dataCite')