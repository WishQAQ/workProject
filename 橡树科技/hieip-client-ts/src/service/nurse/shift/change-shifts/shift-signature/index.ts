/**
 * 签名弹框
 * create by wx 2018.02.01
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface ShiftSignatureState{
    modalVisible?:boolean,// 控制弹框是否显示

}

class ShiftSignatureService extends BaseService<ShiftSignatureState>{
    defaultState={
        modalVisible:false,
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
     * 弹框关闭事件
     */
    modalClose = ()=>{
        this.dispatch({
            modalVisible:false
        })
    }
    /**
     * 弹框打开事件
     * @param {object} data 打开弹框所要展示的数据
     */
    openModal = (data?:object)=>{
        this.dispatch({
            modalVisible:true
        })
    }
}
export const shiftSignatureService = new ShiftSignatureService('shiftSignature')