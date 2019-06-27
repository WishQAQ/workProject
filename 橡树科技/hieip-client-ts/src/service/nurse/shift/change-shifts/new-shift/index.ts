/**
 * 交接班弹框
 * Created by wx 2018.01.25
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {
    NurseStatisticsItemDictModelDtoShift, ShiftPatMasterInfoModelDtoShift, NurseShiftChangeMasterEntityShift,
    NurseSchedulingClassesDictModelDtoClasses, NurseShiftChangeStatisticsModelDtoShift
} from 'pkg/entity/nurse'
import {ApiShiftChange} from 'pkg/api/nurse'
import {message} from 'pkg/common/message'
import {HintInput as AgInput} from 'pkg/common/ag/input'
import moment from 'moment'
import {Simulate} from 'react-dom/test-utils'
import {loginService} from 'service/user/login'
import select = Simulate.select

let tableApi // 表格api
export interface    NewShiftsModalState {
    /** 控制弹框是否显示 */
    modalVisible?: boolean
    /** 科室code */
    deptCode?: string
    /** 查询的类型 */
    opt?: number
    /**  患者信息 */
    patient?: ShiftPatMasterInfoModelDtoShift[]
    /**  统计title */
    columns?: NurseStatisticsItemDictModelDtoShift[]
    /** 班段信息 */
    classesDict?: NurseSchedulingClassesDictModelDtoClasses[]
    /** 开始时间 */
    begin?: string
    /** 结束时间 */
    end?: string
    colsAndData?: any
    /** 统计项目的title */
    cols?: any[]
    /** 统计项目的数据 */
    colsData?: any[]
    /** 交接班主表的信息 */
    shiftChangeMaster?: NurseShiftChangeMasterEntityShift
    /** 患者病情信息 */
    patientLog?: ShiftPatMasterInfoModelDtoShift
    patientList?: ShiftPatMasterInfoModelDtoShift[]
    /** 统计项目的信息 */
    statistics?: NurseShiftChangeStatisticsModelDtoShift[]
    name?: string
    time?: string
    /** 患者Id */
    patientId?: string
    patientMap?: any
    edit?: boolean
    edit1?: boolean
    /** 班段的值 */
    classValue?: string
}
class NewShiftsModalService extends BaseService<NewShiftsModalState> {

    defaultState = {
        modalVisible: false,
        opt: 0,
        begin: moment(new Date()).format('YYYY-MM-DD'),
        end: moment(new Date()).format('YYYY-MM-DD'),
        name: '',
        statistics: [],
        patientList: [],
        patientId: '',
        patientMap: new Map(),
        edit1: false,
        edit: false,
        classValue: ''
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        // console
    }

    onGridReady = (params) => {
        tableApi = params.api
        tableApi.sizeColumnsToFit()
    }
    /**
     * 弹框打开事件
     */
    openModal = (code?: string) => {
        let {opt, begin, end, name} = this.state
        if (!code) {
            message.tip('请选中需要查询的护理单元', 'warning', 'center')
            return
        }
        return new Promise((resolve, reject) => {
            return ApiShiftChange.newShift(opt, code, new Date(Date.parse(begin)),
                new Date(Date.parse(end)), name).then((data: any) => {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key] = data[key]
                    }
                }
                this.dispatch2(this.state)
                let shiftChangeMaster = {
                    wardCode: code,
                    classesId: data.classesDict[0].id,
                    classesTimeFrom: data.classesDict[0].timeOne,
                    classesTimeTo: data.classesDict[0].timeThree,
                }
                this.dispatch2({classValue: '0', shiftChangeMaster})
                resolve()
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })

        }).then(() => {
            let {colsAndData, classesDict} = this.state
            let _shiftChangeMaster = <NurseShiftChangeMasterEntityShift>{}
            _shiftChangeMaster.wardCode = code
            _shiftChangeMaster.classesId = classesDict[0].id
            _shiftChangeMaster.classesTimeFrom = classesDict[0].timeOne
            _shiftChangeMaster.classesTimeTo = classesDict[0].timeThree
            let _data = JsonUtil.getJsonByKey2('data.0', colsAndData, [])
            let _statistics = []
            for (let key in _data) {
                if (key) {
                    let _statisticsDate = <NurseShiftChangeStatisticsModelDtoShift>{}
                    _statisticsDate.itemCode = key
                    _statisticsDate.value = _data[key]
                    _statistics.push(_statisticsDate)
                }
            }
            this.dispatch2({
                modalVisible: true,
                deptCode: code,
                shiftChangeMaster: _shiftChangeMaster,
                statistics: _statistics
            })
        })

    }
    /**
     * 处理表格列规则
     * @param colsAndDataClone
     * @returns {any}
     */
    cloneCols = (colsAndDataClone) => {
        let {patientLog} = this.state
        let isEdit = patientLog ? (patientLog.successorId ? false : true) : true
        if (colsAndDataClone && colsAndDataClone.cols) {
            for (let key in colsAndDataClone.cols) {
                if (colsAndDataClone.cols[key]) {
                    colsAndDataClone.cols[key].editable = isEdit
                    colsAndDataClone.cols[key].cellEditorFramework = AgInput
                    colsAndDataClone.cols[key].cellEditorParams = {
                        verification: {
                            regex: /^[0-9]*$/,
                            eventonver: 'change'
                        },
                        onChange: (e) => newShiftsModalService.change(colsAndDataClone.cols[key].field, e.target.value)
                    }
                }
            }
            return colsAndDataClone
        }
    }
    /**
     * 改变统计的值
     * @param type
     * @param val
     */
    change = (type, val) => {
        let {colsAndData, statistics} = this.state
        colsAndData[type] = val
        for (let key in statistics) {
            if (key) {
                if (statistics[key].itemCode === type)
                    statistics[key].value = val
            }
        }
        this.dispatch2({colsAndData: colsAndData, statistics: statistics})
    }
    /**
     * 保存/更新交接班信息
     */
    save = () => {
        let {shiftChangeMaster, statistics, patientMap, begin} = this.state
        let list = []
        // map 转换成list
        patientMap.forEach((value: any) => {
            list = list.concat(value)
        })
        shiftChangeMaster.shiftTime = new Date(moment(begin).format('YYYY-MM-DD'))
        return ApiShiftChange.save(shiftChangeMaster, list, statistics).then((data) => {
            message.tip('保存成功', 'success', 'center')
            this.finAllShiftInfo()
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 点击全部多选框改变值的方法
     */
    onchange = (e) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({opt: e.target.checked ? 1 : 0})
            resolve()
        }).then(() => {
            this.finShiftVsPatient()
        })
    }
    /**
     *  查询患者信息
     */
    finShiftVsPatient = () => {
        let {opt, deptCode, name} = this.state
        return ApiShiftChange.finShiftVsPatient(opt, deptCode, name).then((data) => {
            this.dispatch2({patient: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 选中患者的信息
     */
    onCellClicked = (e) => {
        let {shiftChangeMaster} = this.state
        if (!shiftChangeMaster.classesId) {
            message.tip('请选择班段', 'warning', 'center')
            return false
        }
        return new Promise((resolve, reject) => {
            this.dispatch2({patientLog: e.data, patientId: e.data.patientId})
            resolve()
        }).then(() => {
            this.finAllShiftInfo()
        })
    }
    /**
     * 根据患者的id查询交接班的信息
     * @returns {Promise<void>}
     */
    finAllShiftInfo = () => {
        let {begin, deptCode, patientLog, shiftChangeMaster, colsAndData} = this.state
        return ApiShiftChange.finAllShiftInfo(moment(begin).format('YYYY-MM-DD'), deptCode, patientLog.patientId, patientLog.visitId,
            shiftChangeMaster.classesId).then((data: any) => {
            let obj = {}
            if (!data.colsAndData) {
                for (let i = 0; i < colsAndData.cols.length; i++) {
                    obj[colsAndData.cols[i].field] = null
                }
                data.colsAndData = [obj]
            }
            let _statistics = []
            let _data = data.colsAndData[0]
            for (let key in _data) {
                if (key) {
                    let _statisticsDate = <NurseShiftChangeStatisticsModelDtoShift>{}
                    _statisticsDate.itemCode = key
                    _statisticsDate.value = _data[key]
                    _statistics.push(_statisticsDate)
                }
            }
            this.dispatch2({
                colsAndData: {
                    cols: colsAndData.cols,
                    data: data.colsAndData
                },
                shiftChangeMaster: {
                    ...data.shiftChangeMaster
                },
                statistics: _statistics
            })
            this.dispatch({
                patientLog: {...data.patientLog}
            })
            if (tableApi)
                setTimeout(() => {
                    tableApi.sizeColumnsToFit()
                }, 50)
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }

    addPatientLog = () => {
        let {patientLog, patientList, patientId, patientMap} = this.state
        let _patientList = patientList
        if (patientId === '') {
            message.tip('请选择患者', 'warning', 'center')
            return false
        }
        if (!patientLog.id) {
            patientLog.id = loginService.state.loginSession.user.empNo
        }
        _patientList.push(patientLog)
        if (!patientMap.get(patientId)) {
            patientMap.set(patientId, patientLog)
        }
        this.dispatch2({patientList: _patientList, patientMap})
    }
    /**
     * input框赋值的方法
     */
    inputOnchage = (name?: string, e?: any) => {
        let anys = name.split('.')
        this.dispatch(JsonUtil.json2(anys, this.state, e))
    }

    /**
     * 时间控件改变值的方法
     */
    timeOnchage = (e) => {
        this.dispatch2({begin: moment(e).format('YYYY-MM-DD')})

    }
    /**
     * 患者模糊查询框值改变的方法
     */
    searchOnchage = (e) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({name: e})
            resolve()
        }).then(() => {
            this.finShiftVsPatient()
        })
    }
    /**
     * 弹框关闭事件
     */
    modalClose = () => {
        this.dispatch2({
            modalVisible: false,
            shiftChangeMaster: {},
            patientList: [],
            statistics: [],
            opt: 0,
            patientLog: {}
        })
    }
    /* /!**
     * 渲染表格
     *!/
     onGridReady = (params) => {
     this.tableApi = params.api
     this.tableApi.sizeColumnsToFit()
     }*/
    /**
     * 改变主表的信息方法
     */
    selectOnChange = (e?: string) => {
        let {shiftChangeMaster, classesDict} = this.state
        let _shiftChangeMaster = shiftChangeMaster
        let _classes = classesDict[e]
        _shiftChangeMaster.classesId = _classes.id
        _shiftChangeMaster.classesTimeFrom = _classes.timeOne
        _shiftChangeMaster.classesTimeTo = _classes.timeThree
        this.dispatch2({shiftChangeMaster: _shiftChangeMaster, classValue: e})
    }
    /**
     * 多行文本框值改变的方法
     */
    textAreaOnchange = (name?: string, e?: any) => {
        let anys = name.split('.')
        this.dispatch2(JsonUtil.json2(anys, this.state, e.target.value))
    }
    /**
     * 交接按钮事件
     */
    shiftBtn = (e?: any) => {
        let {patientLog} = this.state
        if (!patientLog.id) {
            patientLog.id = loginService.state.loginSession.user.empNo
        }
        if (e === '交班') {
            ApiShiftChange.savaLastUpdateUser(patientLog.id).then((data) => {
                message.tip(data || '交班成功', 'success', 'center')
                this.dispatch2({edit: false})
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

    /**
     * 检测输入的值是否是数字
     * @param val
     */
    regCellValue = (val) => {
        if (isNaN(Number.parseInt(val))) {
            message.tip('只能输入数字', 'warning', 'center')
            return false
        }
    }
}
export const newShiftsModalService = new NewShiftsModalService('newShifts')