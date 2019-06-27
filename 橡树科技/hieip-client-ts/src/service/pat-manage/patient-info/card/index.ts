import { BaseService } from 'tools/flux/BaseService'
import { JsonUtil } from 'tools/api/JsonUtil'
import { changeBedService } from 'service/pat-manage/patient-info/change-bed'
import { message } from 'pkg/common/message'
import { patInfoHeaderService } from 'service/pat-manage/patient-info/header'
import { routeService } from 'service/RouteService'

export interface CardState {
    card?: Array<any>
    menu?: any
    cardorList?: boolean
    isVisible?: boolean
    currentItem?: any
    bed1?: any
    recallVisible: boolean
    bed2?: any
    targetResult?: any
    intoVisible?: boolean
    isCardStyle?: boolean
    isTableStyle?: boolean
    currentValue?: any
    targetValue?: any
    routes?: any
}

class CardService extends BaseService<any> {
    defaultState = {
        card: [],
        menu: ['换床'],

        cardorList: true,          // 显示患者面板和患者表格的切换标志
        isVisible: false,             // 是否显示换床弹出框

        bed1: null,            // 拖放源数据
        bed2: null,           // 目标源数据
        currentValue: '',             // 当前拖放源床位号
        targetValue: '',               // 目标拖放源床位号
        routes: {
            'icon-aixin': 'route_overview',
            'icon-yaoxue': 'route_orders_apply',
            'icon-fangshe': 'route_exam_apply',
            'icon-jianyanyubingli': 'route_lab_apply',
            'icon-xindian': 'route_exam_apply',
            'icon-dianhua1': 'route_con_apply',
            'icon-jiaobanguanli1': ''
        }
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 换床
     * @param bed1 - 拖放源数据
     * @param bed2 - 目标源数据
     */
    onTransferPatient = (bed1, bed2) => {
        this.dispatch2({ bed1, bed2 })
        changeBedService.setStateJson('bed1', bed1)
        changeBedService.setStateJson('bed2', bed2)
        message.linkAge('你确定要换床?', null, '确认', '取消', this.onHandleConfirm, this.onHandleCancel)
    }

    /**
     * 弹出窗口取消回调函数
     */
    onHandleCancel = () => {
        this.dispatch2({
            isVisible: false,
            recallVisible: false,
            intoVisible: false
        })
    }

    /**
     * 换床弹出窗口确认按钮的回调函数
     */
    onHandleConfirm = () => {
        this.dispatch2({ isVisible: false })
        changeBedService.changeBed()
    }

    /**
     * 当前床位号绑定
     */
    onCurrentInputChange = (value) => {
        this.dispatch2({ currentValue: value })
    }

    /**
     * 目标床位号绑定
     */
    onTargetInputChange = (value) => {
        this.dispatch2({ targetValue: value })
    }

    /**
     * 右键菜单
     * @param index
     */
    menuClick = (index, key) => {
        if (!JsonUtil.isEmpty(index)) {
            switch (index) {
                case 1:
                    let bed1 = JsonUtil.getJsonByKey('card.' + key, this.state)
                    changeBedService.setStateJson('', {
                        'bed1': bed1, // 默认第一个床位的数据
                        'bed2': {}, // 默认第二个床位的数据
                        'bedLabel1': bed1.bedLabel, // 默认第一个床位的床位号
                        'bedLabel2': '' // 默认第二个床位的床位号
                    })
                    patInfoHeaderService.tabs('changeBed') // 换床
                    break
                default:
                    break
            }
        }
    }

    /**
     * 跳转页面
     */
    routeClick = (key) => {
        routeService.push(JsonUtil.getJsonByKey('routes.' + key, this.state))
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const cardService = new CardService('card')
