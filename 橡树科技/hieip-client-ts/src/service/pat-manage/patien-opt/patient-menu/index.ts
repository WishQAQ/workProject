import {BaseService} from 'tools/flux/BaseService'
import {InDeptEntityPatManage} from '../../../../packages/entity'
import {ApiPatManageInDept, ApiUserSysAreaDict} from '../../../../packages/api'
import {JsonUtil} from '../../../../tools/api/JsonUtil'
import {message} from '../../../../packages/common/message'
import {routeService} from '../../../RouteService'
import {patientBasicService} from '../patient-basic'
import {point} from 'pkg/entity/point'
import {authService} from '../../../auth'
import {subMenus} from '../../../../packages/entity/subMenus'

export interface PatientMenuState {
    /**
     * 区域字典index
     */
    areaDictIndex?: number
    /**
     * 区域字典
     */
    areaDict?: Array<any>
    /**
     * 区域字典
     */
    areaDictList?: Array<any>

    /**
     * 入科患者信息
     */
    inDept?: Array<InDeptEntityPatManage>
    /**
     * 入科患者信息查询参数
     */
    inDeptParams?: InDeptEntityPatManage

    /**
     * 路由
     */
    routes?: any
}

class PatientMenuService extends BaseService<PatientMenuState> {
    defaultState = {
        /**
         * 区域字典index
         */
        areaDictIndex: 0,
        /**
         * 区域字典
         */
        areaDict: [],
        /**
         * 区域数据
         */
        areaDictList: [],

        /**
         * 入科患者信息
         */
        inDept: [],
        /**
         * 入科患者信息查询参数
         */
        inDeptParams: <InDeptEntityPatManage>{},

        /**
         * 路由
         */
        routes: [
            // {name: '概览', route: 'route_patient_manage_overview', icon: 'icon-gaishu'},
            // {name: '诊断', route: 'route_patient_manage_diagnosis', icon: 'icon-zhenduan-'},
            // {name: '医嘱', route: 'route_patient_manage_orders_apply', icon: 'icon-wodeyizhu1'},
            // {name: '检查', route: 'route_patient_manage_exam_apply', icon: 'icon-jiancha'},
            // {name: '检验', route: 'route_patient_manage_lab_apply', icon: 'icon-jianyanbaogao'},
            // {name: '手术', route: 'route_patient_manage_operation', icon: 'icon-shoushu'},
            // {name: '用血', route: 'route_patient_manage_blood', icon: 'icon-yongxie'},
            // {name: '会诊', route: 'route_patient_manage_con_apply', icon: 'icon-huizhen'},
            // {name: '电子病历', route: '', icon: 'icon-dianzibingli'},
            // {name: '报告调阅', route: '', icon: 'icon-baogaotiaoyue'},
            // {name: '医嘱执行', route: '', icon: 'icon-yizhuzhihang'},
            // {name: '出入量维护', route: '', icon: 'icon-churuliangweihu'},
            // {name: '观察项维护', route: '', icon: 'icon-guanchaxiangweihu'},
            // {name: '导管维护', route: '', icon: 'icon-daoguanweihu'},
            // {name: '病情记录', route: '', icon: 'icon-bingqingjilu'},
            // {name: '特护单', route: '', icon: 'icon-tehudan'},
            // {name: '病历详情', route: '', icon: 'icon-binglixiangqing'},
            // {name: '计价单', route: 'route_patient_manage_bill', icon: 'icon-feiyong'},
            // {name: '护理信息录入', route: 'route_patient_manage_vital_signs_rec', icon: 'icon-hulixinxiluru'},
            // {name: '体温单', route: 'route_patient_manage_temp_chart', icon: 'icon-jiadian_tiwenji'},
            // {name: '本院病史', route: '', icon: 'icon-yiyuan-copy'}
        ]
    }

    /**
     * 初始化加载
     */
    serviceWillMount() {
        this.loadPoint()
        this.loadAreaDict() // * 查询患者列表已在 loadAreaDict() 成功查询返回值后查询
    }

    /**
     * 获取用户权限点
     */
    loadPoint = () => {
        let userPoint = authService.state.userPrint
        let menu = subMenus.患者管理.患者
        let routes = []
        if (menu)
            for (let key in menu) {
                if (userPoint[menu[key].hash]) {
                    routes.push({name: key, route: menu[key].route, icon: menu[key].icon, hash: menu[key].hash})
                }
            }
        this.dispatch2({routes})
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 区域字典
     */
    loadAreaDict = () => {
        return ApiUserSysAreaDict.select().then(data => {
            this.dispatch2({areaDict: data})
            this.loadBedCard() // 查询患者列表,必须在区域字典之后
        }).catch(err => {
            message.tip(err.msg || '查询区域字典失败', 'warning')
        })
    }
    /**
     * 入科患者信息
     */
    loadBedCard = () => {
        let startIndex, pageSize
        const {inDeptParams} = this.state
        return ApiPatManageInDept.loadBedCard(inDeptParams, startIndex, pageSize, '0,1').then((data) => {
            this.dispatch2({inDept: data})
            this.initTableData()
        })
        //   .catch(err => {
        //     message.tip(err.msg || '查询入科患者信息失败', 'warning')
        // })
    }
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
        this.dispatch(JsonUtil.json(path, this.state, data))
    }
    /**
     * 选择行
     * @param index 选择行索引
     */
    loadPatInfo = (index) => {
        const {areaDictList, areaDictIndex} = this.state
        patientBasicService.setStateJson('model', JsonUtil.getJsonByKey(areaDictIndex + '.inDept.' + index, areaDictList))
        const route = routeService.state.route
        routeService.push('route_patient_manage_jump', () => {
            setTimeout(() => routeService.push(route), 0)
        })
    }
    /**
     * 初始化表格数据
     */
    initTableData = () => {
        // 数据统计
        let {inDept, areaDict} = this.state
        let areaDictList = JsonUtil.clone(areaDict)
        inDept.forEach((model) => {
            let areaId = JsonUtil.getJsonByKey('areaId', model)
            areaDictList.forEach((area) => {
                let id = area.id
                let num = area.num
                // num为空时,默认为0
                if (JsonUtil.isEmpty(num)) {
                    area.num = 0
                    num = 0
                }
                if (id === areaId) {
                    num += 1
                    area.num = num
                    if (!area.inDept)
                        area.inDept = []
                    area.inDept.push(model)
                }
            })
        })
        if (areaDictList && areaDictList.length > 0) {
            this.dispatch2({areaDictList, areaDictIndex: 1})
            this.loadPatInfo(1)
        } else {
            this.dispatch2({areaDictList, areaDictIndex: null})
        }
    }

    // loadAreaPatInfo=(index)=>{
    //     if (areaDictList && areaDictList.length > 0) {
    //         this.dispatch2({areaDictList, areaDictIndex: 1})
    //         this.loadPatInfo(1)
    //     } else {
    //         this.dispatch2({areaDictList, areaDictIndex: null})
    //     }
    // }

    /**
     * 跳转页面
     */
    routeClick = (key) => {
        let route = JsonUtil.getJsonByKey2('routes.' + key + '.route', this.state, '')
        if (!JsonUtil.isEmpty(route)) {
            routeService.push('route_patient_manage_jump', () => {
                setTimeout(() => routeService.push(route), 0)
            })
        } else {
            message.tip('未配置路由!')
        }
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const patientMenuService = new PatientMenuService('patientMenu')
