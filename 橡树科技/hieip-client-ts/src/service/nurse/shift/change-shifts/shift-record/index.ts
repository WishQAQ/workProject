import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'
import {ApiShiftChange} from 'pkg/api/nurse'
import {NurseShiftChangeMasterModelDtoShift} from 'pkg/entity/nurse'
import moment from 'moment'
import {loginService} from 'service/user/login'

export interface ParamState {
    wardCode?: string,// 护理单元
    classesId?: number,// 班段
    patientId?: string,// 患者id
    visitId?: number, // 住院标志
    radio?: number, // 全部、未交接、已交接
    time?: string // 时间
}
export interface ShiftRecordState {
    modalVisible?: boolean,// 控制弹框是否显示
    modalLeftData?: Array<NurseShiftChangeMasterModelDtoShift>,// 弹框左侧数据
    modalRightData?: any,
    radioValue?: number, // 全部,未交接，已交接
    time?: string
    param?: ParamState
    edit?:boolean
    edit1?:boolean
}

class ShiftRecordService extends BaseService<ShiftRecordState> {
    /**
     * table api
     * @type {null}
     */
    tableApi?: any
    defaultState = {
        modalVisible: false,
        modalLeftData: [],
        param: {},
        modalRightData: {
            patientLog: {},
            shiftChangeMaster: {},
            statistics: {}
        },
        time: ''
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
    modalClose = () => {
        this.dispatch({
            modalVisible: false
        })
    }
    /**
     * 弹框打开事件
     * @param {object} data 打开弹框所要展示的数据
     */
    openModal = (data?: ParamState) => {
        let param = {
            wardCode: data.wardCode,// 护理单元
            classesId: data.classesId,// 班段
            patientId: data.patientId,// 患者id
            visitId: data.visitId, // 住院标志
            radio: data.radio === 2 ? null : data.radio, // 全部、未交接、已交接
            time: moment(data.time).format('YYYY-MM-DD') // 时间
        }
        ApiShiftChange.finShiftByRecord(param.wardCode, param.classesId,
            param.patientId, param.visitId, param.radio, param.time).then((data: any) => {
            if (data && data.length) {
                this.dispatch2({
                    modalLeftData: data,
                    modalVisible: true,
                    param: param,
                    radioValue: param.radio,
                    time: param.time
                })
            } else {
                this.dispatch2({
                    modalLeftData: data,
                    param: param,
                    radioValue: param.radio,
                    time: param.time,
                    modalRightData: {
                        patientLog: {},
                        shiftChangeMaster: {},
                        statistics: {}
                    },
                })
                message.tip('暂无交接记录', 'info', 'center')
            }
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 点击全部、已交接、未交接
     * @param e
     */
    changeModalLeftData = (e) => {
        let {param} = this.state
        param.radio = Number.parseInt(e.value)
        this.openModal(param)
    }
    /**
     * 更改事件
     * @param v
     */
    changeTime = (v) => {
        let {param} = this.state
        param.time = moment(v).format('YYYY-MM-DD')
        this.openModal(param)
        this.dispatch({
            time: moment(v).format('YYYY-MM-DD')
        })
    }
    /**
     * 左侧表格点击事件
     * @param rowData  点击表格行数据
     */
    selectDetail = (rowData) => {
        const {param} = this.state
        ApiShiftChange.finShiftByRecordInfo(rowData.id, param.wardCode, rowData.patientLog).then((data) => {
            this.dispatch({modalRightData: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 渲染表格
     * @param params {}
     */
    onGridReady = (params) => {
        this.tableApi = params.api
    }
    /**
     * 根据是否交接设置每行显示颜色
     * @param params 数据
     * @param style 样式
     * @returns {any}
     */
    setRowClass = (params, style) => {
        let style1
        style1 = `${style.agCommonCell}`
        if (params.data.status === '未交班') style1 = `${style.agRedCell}`
        return style1
    }

    /**
     * 交接按钮事件
     */
    shiftBtn = (e) => {
        let {patientLog} = this.state.modalRightData
        if (!patientLog.id) {
            patientLog.id = loginService.state.loginSession.user.empNo
        }
        if (e === '交班') {
            ApiShiftChange.savaLastUpdateUser(patientLog.id).then((data) => {
                message.tip(data || '交班成功', 'success', 'center')
                this.dispatch2({
                    modalVisible: false,
                    modalRightData: {
                        patientLog: {},
                        shiftChangeMaster: {},
                        statistics: {}
                    },
                    edit:false
                })
            }).catch(err => {
                message.tip(err || '交班失败', 'error', 'center')
            })
        }
        if (e === '接班') {
            ApiShiftChange.takeShift(patientLog.id).then((data) => {
                message.tip(data || '接班成功', 'success', 'center')
                this.dispatch2({edit1: false})
            }).catch(err => {
                message.tip(err || '接班失败', 'error', 'center')
            })
        }
    }

    addPatientLog = () => {
        let {modalRightData} = this.state
        ApiShiftChange.updatePatientLog(modalRightData.patientLog).then((data) => {
            message.tip(data || '保存成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '保存失败', 'error', 'center')
        })
    }
    /**
     * input框赋值的方法
     */
    inputOnchage = (name?: string, e?: any) => {
        let anys = name.split('.')
        let {modalRightData} = this.state
        modalRightData.patientLog[anys[1]] = e.target.value
        this.dispatch({modalRightData})
    }

    /**
     * 多行文本框值改变的方法
     */
    textAreaOnchange = (name?: string, e?: any) => {
        let anys = name.split('.')
        let {modalRightData} = this.state
        modalRightData.patientLog[anys[1]] = e.target.value
        this.dispatch({modalRightData})
    }
}
export const shiftRecordService = new ShiftRecordService('shiftRecord')