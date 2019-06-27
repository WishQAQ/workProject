import { BaseService } from 'tools/flux/BaseService'
import { ApiPatManageInDept } from 'pkg/api'
import { message } from 'pkg/common/message'
import { JsonUtil } from 'tools/api/JsonUtil'
import { cardService } from 'service/pat-manage/patient-info/card'
import { patientTableService } from 'service/pat-manage/patient-info/patient-table'
import { inDeptService } from 'service/pat-manage/patient-info/in-dept'
import { transferInDeptService } from 'service/pat-manage/patient-info/transfer-in-dept'
import { changeBedService } from 'service/pat-manage/patient-info/change-bed'
import { loginService } from '../../../user/login'

export interface PatInfoHeaderState {
    /**
     * 抢救区中位数
     */
    redAvg?: number

    /**
     * 面板切换
     */
    cardorList?: boolean
    /**
     * 弹出框
     */
    modals?: string
    /**
     * 模糊查询输入框
     */
    inputCode?: string

    patientNum?: any
    patientLevel?: any
    patientPartition?: any
    params?: any
}

class PatInfoHeaderService extends BaseService<PatInfoHeaderState> {
    defaultState = {
        redAvg: 0,

        // isTableStyle: false,    // 控制表格面板切换  card
        // intoVisible: false,     // 入科面板弹出      inDept
        // recallVisible: false,    // 出科面板弹出     outpDept

        /**
         * 面板切换
         */
        cardorList: true,
        /**
         * 弹出框
         */
        modals: '',

        patientNum: [
            { key: 'myPatient', name: '我的病人', count: 0 },
            { key: 'allPatient', name: '全部病人', count: 0 }
        ],
        patientLevel: [
            { key: 'firstLevel', name: '一级', count: 0 },
            { key: 'secondLevel', name: '二级', count: 0 },
            { key: 'thirdLevel', name: '三级', count: 0 },
            { key: 'fourthLevel', name: '四级', count: 0 }
        ],
        patientPartition: [
            { key: 'redPartition', name: '红区', count: 0 },
            { key: 'yellowPartition', name: '黄区', count: 0 },
            { key: 'greenPartition', name: '绿区', count: 0 }
        ],
        params: {
            'firstLevel': '一级',
            'secondLevel': '二级',
            'thirdLevel': '三级',
            'fourthLevel': '四级',

            'redPartition': '红区',
            'yellowPartition': '黄区',
            'greenPartition': '绿区'
        },
        /**
         * 模糊查询输入框
         */
        inputCode: ''
    }

    serviceWillMount() {
        this.loadRedAvg()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */

    /* =====分界线: 1.2、其它查询: 结束===== */
    /**
     * 抢救区中位数
     */
    loadRedAvg = () => {
        return ApiPatManageInDept.loadRedAvg().then((data) => {
            this.dispatch2({ redAvg: data })
        }).catch(err => {
            message.tip(err.msg || '查询抢救区中位数失败!', 'warning')
        })
    }

    /**
     * 获取登录者
     * @returns {number}
     */
    loadRoleType = () => {
        /*角色类型*/
        let type = 1
        let propStaffId
        switch (type) {
            case 1:
                propStaffId = 'doctor'
                break
            case 2:
                propStaffId = 'nurse'
                break
            default:
                message.tip('当前角色类型设置类型,功能提示[我的病人]默认为0!', 'warning')
                break
        }
        return propStaffId
    }

    loadCount = (data) => {
        let staffId = 1
        let propStaffId = this.loadRoleType()

        /*我的病人*/
        let myPatient = 0
        /*全部病人*/
        let allPatient = 0
        /*一级*/
        let firstLevel = 0
        /*二级*/
        let secondLevel = 0
        /*三级*/
        let thirdLevel = 0
        /*四级*/
        let fourthLevel = 0
        /*红区*/
        let redPartition = 0
        /*黄区*/
        let yellowPartition = 0
        /*绿区*/
        let greenPartition = 0
        data.map((model) => {
            /*我的病人： 条件: 当前操作者*/
            if (staffId === model[propStaffId]) {
                myPatient += 1
            }
            /*全部病人： 条件: 患者信息id不为空*/
            if (!JsonUtil.isEmpty(model.pvId)) {
                allPatient += 1
            }
            let triageLevel = model.triageLevel
            let areaName = model.areaName
            if (!JsonUtil.isEmpty(triageLevel)) {
                switch (triageLevel) {
                    case '一级':
                        /*一级*/
                        firstLevel += 1
                        break
                    case '二级':
                        /*二级*/
                        secondLevel += 1
                        break
                    case '三级':
                        /*三级*/
                        thirdLevel += 1
                        break
                    case '四级':
                        /*四级*/
                        fourthLevel += 1
                        break
                    default:
                        break
                }
            }
            if (!JsonUtil.isEmpty(areaName)) {
                switch (areaName) {
                    case '红区':
                        /*红区*/
                        redPartition += 1
                        break
                    case '黄区':
                        /*黄区*/
                        yellowPartition += 1
                        break
                    case '绿区':
                        /*绿区*/
                        greenPartition += 1
                        break
                    default:
                        break
                }
            }
        })
        this.dispatch(
            {
                patientNum: [
                    { key: 'myPatient', name: '我的病人', count: myPatient },
                    { key: 'allPatient', name: '全部病人', count: allPatient }
                ],
                patientLevel: [
                    { key: 'firstLevel', name: '一级', count: firstLevel },
                    { key: 'secondLevel', name: '二级', count: secondLevel },
                    { key: 'thirdLevel', name: '三级', count: thirdLevel },
                    { key: 'fourthLevel', name: '四级', count: fourthLevel }
                ],
                patientPartition: [
                    { key: 'redPartition', name: '红区', count: redPartition },
                    { key: 'yellowPartition', name: '黄区', count: yellowPartition },
                    { key: 'greenPartition', name: '绿区', count: greenPartition }
                ]
            }
        )
    }
    /*====================分界线: 1、查询: 结束====================*/

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
     *
     * @param value
     */
    patientNum = (value) => {
        let roleType = this.loadRoleType()
        let staffId = loginService.state.user.id
        patientTableService.setStateJson('inDeptParams.' + roleType, value === 'myPatient' ? staffId : '')
    }
    /**
     *
     * @param value
     */
    patientLevel = (value) => {
        const { params } = this.state
        patientTableService.setStateJson('inDeptParams.triageLevel', params[value])
    }
    /**
     *
     * @param value
     */
    patientPartition = (value) => {
        const { params } = this.state
        patientTableService.setStateJson('inDeptParams.areaName', params[value])
    }

    /**
     * 打印腕带
     */
    onPrintStraps = () => {
        alert('打印腕带')
    }
    /**
     * switch变化时的回调函数
     */
    onSwitchChange = (checked) => {
        this.dispatch2({ cardorList: checked })
        cardService.setStateJson('cardorList', !checked)// 设置床卡数据
        patientTableService.setStateJson('cardorList', !checked)// 设置床卡数据
    }

    /**
     * 弹出框
     * @param modals
     */
    tabs = (modals) => {
        this.dispatch2({ modals: modals })
        inDeptService.setStateJson('modals', modals)// 设置患者入科
        transferInDeptService.setStateJson('modals', modals)// 设置患者召回
        changeBedService.setStateJson('modals', modals)// 设置床卡右键菜单: 换床
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const patInfoHeaderService = new PatInfoHeaderService('patInfoHeader')
