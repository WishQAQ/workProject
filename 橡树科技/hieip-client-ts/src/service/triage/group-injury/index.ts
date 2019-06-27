/**
 * 字典表
 */

import {BaseService} from 'tools/flux/BaseService'
import {InjuryTypeEntityUser, MhGroupInjuryModelDtoSplit, MhPatientVisitEntitySplit} from 'pkg/entity'
import {ApiUserSysParamInjuryType, ApiUserSysTriageInjuryEvent} from 'pkg/api'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {triageService} from 'service/triage/new-triage/triage'
import {routeService} from 'service/RouteService'
import moment from 'moment'

/**
 * agApi
 */
let leftHurtAgApi
let rightHurtAgApi

/**
 * 群伤字典表
 */
export interface GroupInjuryState {
    startDate?: Date  // 查询群伤的开始时间
    endDate?: Date  // 查询群伤的结束时间
    likeName?: string  // 查询群伤的事件概要/备注/类型
    selectRow?: MhGroupInjuryModelDtoSplit
    data?: MhGroupInjuryModelDtoSplit[] // 群伤事件
    data1?: MhPatientVisitEntitySplit[]  // 群伤人员
    id?: number // 群伤人员id
    injuryNum?: number
    title?: string
    bulkinjuryId?: number
    injuryType?: Array<InjuryTypeEntityUser> // 群伤字典表
    addModelOpen?: boolean // 群伤事件打开状态
    modelTitle?: string // 弹框title
    backInjuryType?: string // 回显数值
    pvId?: number
}

class GroupInjuryService extends BaseService<GroupInjuryState> {
    defaultState = {
        likeName: '',
        data: [],
        data1: [],
        selectRow: <MhGroupInjuryModelDtoSplit>{},
        startDate: new Date(moment(new Date()).format('YYYY-MM-DD [00:00:00]')),
        endDate: new Date(moment(new Date()).format('YYYY-MM-DD [00:00:00]')),
        addModelOpen: false,
        modelTitle: '增加'
    }

    serviceWillMount() {
        setTimeout(() => {
            this.findAll()
            this.findGILike()
        }, 500)
    }

    /**
     * 群伤事件AG列表的api
     */
    getHurtAgApi = (api) => {
        leftHurtAgApi = api
        leftHurtAgApi.api.sizeColumnsToFit()
    }

    /**
     * 群伤人员ag列表的api
     * @param api
     */
    getHurtListApi = (api) => {
        rightHurtAgApi = api
        rightHurtAgApi.api.sizeColumnsToFit()
    }

    /**
     * 群伤查询条件改变状态
     */
    changeValue = (e) => {
        this.dispatch({likeName: e.target.value})
    }

    /**
     * 时间条件
     * @param timeRange - 时间范围值
     */
    changeTimeValue = (timeRange) => {
        this.dispatch({startDate: timeRange[0], endDate: timeRange[1]})
    }

    /**
     * 根据群伤的事件概要/备注/类型查询
     * @param e
     */
    searchByCondition = (e) => {
        this.dispatch({likeName: e.target.value})
    }

    /**
     * 查询群伤事件
     * @return {Promise<void>}
     */
    findGILike = () => {
        let {startDate, endDate, likeName} = this.state
        return ApiUserSysTriageInjuryEvent.findGILike(startDate, endDate, likeName).then((data) => {
            this.dispatch2({data: data})
            leftHurtAgApi.api.setRowData(data)
            rightHurtAgApi.api.setRowData([])
            // this.findPvById({data: this.state.selectRow})
        }).catch((msg) => {
            message.tip(msg || '查询错误')
        })
    }
    /**
     * 根据群伤id关联患者
     * @param record - 点击数据
     * @return {Promise<void>}
     */
    findPvById = (record) => {
        this.dispatch2({selectRow: record.data, id: record.data.id, injuryNum: record.data.injuryNum, title: record.data.title})
        return ApiUserSysTriageInjuryEvent.findPvById(record.data.id).then((data1) => {
            let injuryTypeName = record.data.injuryTypeName
            let memo = record.data.memo
            for (let i = data1.length; i < record.data.injuryNum; i++) {
                let model = <MhPatientVisitEntitySplit>{}
                model.name = injuryTypeName + '_' + memo + '_患者' + (i + 1)
                JsonUtil.json('sex.name', model, '未知')
                data1.push(model)
            }
            this.dispatch2({data1: data1})
            rightHurtAgApi.api.setRowData(data1)
        }).catch((msg) => {
            message.tip(msg || '查询错误')
        })
    }
    /**
     * 删除群伤患者
     * @return {Promise<void>}
     */
    deletePvTr = () => {
        const {bulkinjuryId} = this.state
        return ApiUserSysTriageInjuryEvent.deletePvTr(bulkinjuryId).then((data1) => {
            this.findGILike()
            this.hiddenAddModel()
            rightHurtAgApi.api.setRowData(data1)
            message.tip('删除成功', 'warning')
        }).catch((msg) => {
            message.tip(msg || '查询错误')
        })
    }
    /**
     * 获取群伤事件类型,获取群伤事件的时间,群伤人数,名称，备注
     * @param path - 路径
     * @param e
     */
    getInjury = (path, e) => {
        const {selectRow} = this.state
        selectRow[path] = e.target ? e.target.value : e
        this.dispatch({selectRow: selectRow})
        this.showBackType()
    }

    /**
     * 新增群伤事件
     * @returns {Promise<void>}
     */
    save = () => {
        let saveData = this.state.selectRow
        if (!saveData.happenDate) {
            saveData.happenDate = new Date()
        }
        if (this.ruleCheck(saveData)) {
            return ApiUserSysTriageInjuryEvent.save(saveData).then((data) => {
                this.findGILike()
                this.hiddenAddModel()
                this.dispatch2({selectRow: {}})
                message.tip(data || '添加成功', 'success')
            }).catch((msg) => {
                message.tip(msg || '添加失败')
            })
        }
    }

    /**
     * 删除群伤事件
     * @returns {Promise<void>}
     */
    deleteGI = () => {
        const {id} = this.state
        return ApiUserSysTriageInjuryEvent.deleteGI(id).then((data) => {
            // this.dispatch2({data: data})
            this.findGILike()
            message.tip('删除成功', 'warning')
        }).catch((msg) => {
            message.tip(msg || '删除失败')
        })
    }
    /**
     * 修改群伤
     * @returns {Promise<void>}
     */
    updateGI = () => {
        const {selectRow} = this.state
        if (this.ruleCheck(selectRow)) {
            return ApiUserSysTriageInjuryEvent.updateGI(selectRow).then((data) => {
                this.hiddenAddModel()
                this.findGILike()
                message.tip(data || '修改成功', 'warning')
            }).catch((msg) => {
                message.tip(msg || '修改失败')
            })
        }
    }

    /**
     * 群伤事件增加或修改规则校验
     */
    ruleCheck = (data?: MhGroupInjuryModelDtoSplit) => {
        let check: boolean = false
        if (!data.injuryTypeId) {
            message.tip('群伤事件填写错误', 'error')
            check = false
        }
        else if (!data.injuryNum) {
            message.tip('群伤人数填写错误', 'error')
            check = false
        }
        else if (!data.title) {
            message.tip('群伤名称填写错误', 'error')
            check = false
        }
        else {
            check = true
        }
        return check
    }

    /**
     * 查询群伤字典表
     * @return {Promise<void>}
     */
    findAll = () => {
        return ApiUserSysParamInjuryType.findAll().then((data) => {
            this.dispatch({injuryType: data})
        }).catch((msg) => {
            message.tip(msg || '查询失败')
        })
    }

    /**
     * 右键菜单
     */
    menuClick = (menuIndex, dataIndex) => {
        const {data} = this.state
        this.dispatch({selectRow: data[dataIndex]})
        if (menuIndex === 0) {
            this.showChangeModel()
            this.showBackType()
        }
        else if (menuIndex === 1) {
            this.dispatch({id: data[dataIndex].id})
            this.deleteGI()
        }
    }
    /**
     * 患者右键菜单
     */
    menuPvidClick = (menuIndex, dataIndex) => {
        const {data1} = this.state
        let value = JsonUtil.getJsonByKey(dataIndex + '.id', data1)
        if (menuIndex === 0) {
            // 跳转分诊界面
            let model = {
                id: value,
                name: JsonUtil.getJsonByKey(dataIndex + '.name', data1),
                bulkinjuryId: JsonUtil.getJsonByKey(dataIndex + '.id', data1),
                bulkinjuryName: JsonUtil.getJsonByKey(dataIndex + '.name', data1),
            }
            triageService.setStateJson('mhSplit', {patientVisit: model})
            routeService.push('route_new_triage')
        } else if (menuIndex === 1) {
            if (JsonUtil.isEmpty(value)) {
                // 为空时,更新人数： 人数-1
                this.state.selectRow.injuryNum -= 1
                this.dispatch({selectRow: this.state.selectRow})
                this.updateGI()
            } else {
                this.dispatch({bulkinjuryId: value})
                this.deletePvTr()
            }
        }
    }

    /**
     * 显示新增弹框
     */
    showAddModel = () => {
        this.dispatch2({addModelOpen: true, modelTitle: '增加', selectRow: {}})
    }

    /**
     * 显示修改弹框
     */
    showChangeModel = () => {
        this.dispatch({addModelOpen: true, modelTitle: '修改'})
    }

    /**
     * 隐藏新增弹框
     */
    hiddenAddModel = () => {
        let {selectRow} = this.state
        selectRow.injuryTypeName = ''
        selectRow.injuryNum = null
        selectRow.title = ''
        selectRow.memo = ''
        this.dispatch({addModelOpen: false, backInjuryType: '', selectRow: selectRow})
    }

    /**
     * 回显群伤类型
     */
    showBackType() {
        const {injuryType, selectRow} = this.state
        injuryType.forEach((e) => {
            if (e.serialNo === selectRow.injuryTypeId)
                this.dispatch({
                    backInjuryType: e.name
                })
        })
    }

    /**
     * 双击跳转到新分诊页面
     */
    doubleClickRoute = (params) => {
        this.menuPvidClick(0, params.rowIndex)
    }
}

export const groupInjuryService = new GroupInjuryService('groupInjury')