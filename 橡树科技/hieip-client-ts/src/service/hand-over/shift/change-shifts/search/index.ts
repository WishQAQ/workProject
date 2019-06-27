/**
 * 交接班主页面头部搜索框
 * Created by wx 2018.01.25
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {changeShiftsModalService} from 'service/hand-over/shift/change-shifts/modal'

export interface SearchState {
    arr: Array<Arr>
}
interface Arr{
    name:string,
    key:string
}
class SearchService extends BaseService<SearchState> {
    defaultState = {
        arr: [
            {name: '分诊', key: '1'},
            {name: '分诊', key: '2'},
        ]
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
    /**
     * 新增按钮事件
     */
    add = () => {
        alert('1111')
        changeShiftsModalService.openModal()
    }
}

export const searchService = new SearchService('Search')