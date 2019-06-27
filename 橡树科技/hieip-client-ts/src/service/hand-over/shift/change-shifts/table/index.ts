/**
 * 交接班主页面头部搜索框
 * Created by wx 2018.01.25
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface MidTableState{

}
class MidTableService extends BaseService<MidTableState>{
    defaultState={

    }
    /**
     * 页面加载执行
     */
    serviceWillMount() {
        // console
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }
}
export const midTableService = new MidTableService('MidTable')