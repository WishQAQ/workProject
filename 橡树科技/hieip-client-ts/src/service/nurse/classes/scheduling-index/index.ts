import {BaseService} from 'tools/flux/BaseService'
import {ApiClassesSchedulingIndex, ApiDictDictionaries, ApiClassesExchange} from 'pkg/api/nurse'
import {message} from 'pkg/common/message'
import React from 'react'
import moment from 'moment'
import {
    DateModelDtoClasses,
    DeptDictDtoDict,
    NurseGroupVsStaffModelDtoClasses,
    NurseSchedulingIndexModelDtoClasses,
    NurseGroupVsClassesModelDtoClasses
} from 'pkg/entity/nurse'
import {JsonUtil} from 'tools/api/JsonUtil'
import {Print} from 'service/medical/print'
import scheduling from 'pkg/print-template/scheduling.ejs'

export interface SchedulingIndexState {
    // 护理单元id
    wardCode?: string
    // 时间
    time?: Date
    // 护理单元list
    wardList?: Array<DeptDictDtoDict>
    // 一周时间list
    dayDate?: Array<DateModelDtoClasses>
    // 分组允许班段字典
    classesDict?: Map<any, any>
    // 分组人员信息
    staffSchedulingList?: Array<NurseGroupVsStaffModelDtoClasses>
    // 时间点班段信息
    schedulingList?: Map<string, Array<NurseSchedulingIndexModelDtoClasses>>,
    // 是否打开批量操作
    isOpen?: boolean
    // 弹出框的x
    clientX?: any
    // 弹出框的Y
    clientY?: any
    // 拖动调班框是否显示
    isVisible?: boolean
    // 调换班段对象1
    shift1?: NurseSchedulingIndexModelDtoClasses
    // 调换班段对象2
    shift2?: NurseSchedulingIndexModelDtoClasses
    // 申请原因
    applyReason?: any
    // 总分组,以及下面的人员
    classesVsStaff?: Array<NurseGroupVsClassesModelDtoClasses>
    // 当前选中的时间
    currentTime?: any
}

/**
 * 排班service
 */
class SchedulingIndexService extends BaseService<SchedulingIndexState> {
    defaultState = {
        time: new Date(),
        isOpen: false
    }

    /**
     * 设置当前选中的护理单元
     */
    setWardCode(wardCode) {
        if (!wardCode) {
            message.tip('默认的护理单元id,不能为空')
            return
        }
        this.dispatch({wardCode: wardCode})
        // 获取所有护理单元
        this.getWardList()
        // 查询数据
        let time = moment(this.state.time).format('YYYY-MM-DD').toString()
        this.findSchedulingInfo(time, wardCode)
    }

    serviceWillMount() {
        this.setWardCode('230102')
    }

    /**
     * 改变值
     * @param name
     * @param value
     */
    changeValue = (value, ...name) => {
        this.dispatch2(JsonUtil.json2(name, this.state, value))
    }

    /**
     * 获取所有的护理单元
     */
    getWardList() {
        ApiDictDictionaries.finStaffVsGroup().then(data => {
            this.dispatch2({wardList: data})
        }).catch(msg => message.tip(msg || '查询护理单元失败', 'error', 'center'))
    }

    /**
     * 查询数据
     */
    findInfo = () => {
        let {wardCode, time} = this.state
        let currentTime = moment(time).format('YYYY-MM-DD').toString()
        this.findSchedulingInfo(currentTime, wardCode)
    }

    /**
     * 查询用户,排班信息
     */
    findSchedulingInfo = (currentTime, wardCode) => {
        ApiClassesSchedulingIndex.finAll(currentTime, wardCode).then(data => {
            let staffSchedulingList = JsonUtil.getJsonByKey('schedulingIndex', data, [])
            let map = new Map<string, Array<NurseSchedulingIndexModelDtoClasses>>()
            staffSchedulingList.forEach((d, index) => {
                d.schedulingIndex.forEach((l, index) => {
                        let list = map.get(l.time)
                        if (!list) {
                            list = new Array<NurseSchedulingIndexModelDtoClasses>()
                            map.set(l.time, list)
                        }
                        list.push(l)
                    }
                )
            })
            this.dispatch2({
                dayDate: JsonUtil.getJsonByKey('dayDate', data, []),
                classesDict: JsonUtil.getJsonByKey('classesDict', data, []),
                classesVsStaff: JsonUtil.getJsonByKey('classesVsStaff', data, []),
                staffSchedulingList: staffSchedulingList,
                schedulingList: map
            })
        }).catch(msg => message.tip(msg || '查询排班信息失败', 'error', 'center'))
    }
    /**
     * 批量操作数据
     */
    getScheduleBatchOperate = (time, e: React.MouseEvent<any>) => {
        this.dispatch({isOpen: true, clientX: e.clientX, clientY: e.clientY, currentTime: time})
    }
    /**
     * 拖动调班
     */
    onShift = () => {
        this.dispatch2({
            isVisible: true
        })
    }
    /**
     * 班段信息切换
     */
    changeSchedule = (time, index, value, e) => {
        let {schedulingList} = this.state
        schedulingList.get(time)[index].schedulingClassesId = value
        this.dispatch2({
            schedulingList: schedulingList
        })
        // 改变总数,如果value 是undefined ,那么需要减去之前的
        // TODO
    }
    /**
     * 换班
     */
    shiftSchedule = (value1, value2) => {
        if (value1.classesName && value2.classesName) {
            this.dispatch2({
                shift1: value1,
                shift2: value2,
                isVisible: true
            })
        } else {
            message.tip('不能与没有选择班段的进行调换', 'error', 'center')
        }
    }
    /**
     * 关闭申请调班
     */
    closeShiftSchedule = () => {
        this.dispatch({isVisible: false, shift1: null, shift2: null})
    }
    /**
     * 关闭批量操作框
     */
    closeAboutScreen = () => {
        this.dispatch({isOpen: false})
    }
    /**
     * 批量设置班段
     */
    batchOperation = (time, value) => {
        let {schedulingList} = this.state
        schedulingList.set(time, value)
        this.dispatch2({schedulingList: schedulingList, isOpen: false})
    }
    /**
     * 保存换班申请
     */
    saveApply = () => {
        let {applyReason, shift1, shift2, wardCode} = this.state
        if (!applyReason) {
            message.tip('申请原因不能为空', 'warning', 'center')
            return
        }
        let data = {
            wardCode: wardCode,
            reason: applyReason,
            schedulingIndexId: shift1.schedulingClassesId,
            exchangeUserId: shift2.userId,
            exchangeSchedulingIndexId: shift2.schedulingClassesId
        }
        ApiClassesExchange.save(data).then(data => {
            this.dispatch2({
                applyReason: '',
                isVisible: false,
                shift1: null,
                shift2: null
            })
            message.tip('调班申请成功', 'success', 'center')
        }).catch(msg => message.tip(msg || '保存失败', 'error', 'center'))
    }
    /**
     * 保存排班信息
     */
    save = () => {
        let list = []
        let {schedulingList, wardCode} = this.state
        for (let [key, value] of schedulingList) {
            value.map(value => {
                if (value.schedulingClassesId || value.id) { // 不为空的情况下才传后台去
                    list.push({
                        time: moment(key).format('YYYY-MM-DD'),
                        wardCode: wardCode,
                        schedulingClassesId: value.schedulingClassesId,
                        nurseGroupId: value.nurseGroupId,
                        userId: value.userId,
                        id: value.id
                    })
                }
            })
        }
        ApiClassesSchedulingIndex.save(list).then(data => {
            message.tip('保存成功', 'success', 'center')
            this.setWardCode('230102')
        }).catch(msg => message.tip(msg || '保存失败', 'error', 'center'))
    }
    /** 获取打印数据 */
    print = () => {
        const {wardCode, time} = this.state
        ApiClassesSchedulingIndex.finSheduling(0, wardCode, moment(time).format('YYYY-MM-DD')).then((data:any) => {
            if (data.schedulingIndex.length > 0) {
                for (let i = 0; i < data.dayDate.length; i++) {
                    data.dayDate[i].time = moment(data.dayDate[i].time).format('YYYY-MM-DD')
                }
                this.emitPrint(data)
            } else {
                message.tip('暂无排班数据', 'info', 'center')
            }

        }).catch(msg => message.tip(msg || '打印数据获取失败', 'error', 'center'))
    }
    /**
     * 打印
     * @param data
     */
    emitPrint = (data) => {
        fetch(scheduling).then(res => res.text()).then(text => {
            let obj = {
                data: data,
                contents: text,
            }
            Print.message(obj).then((response) => {
                // console.log(response)
            })
        })
    }
}
export const schedulingIndexService = new SchedulingIndexService('schedulingIndex')