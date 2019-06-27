import {BaseService} from 'tools/flux/BaseService'
import {patientBasicService} from 'service/pat-manage/patien-opt/patient-basic'
import {loginService} from 'service/user/login'
import {message} from 'pkg/common/message'
import {JsonUtil} from '../../../../../tools/api/JsonUtil'
import {OperationScheduleEntityPatManageOperation, Page} from '../../../../../packages/entity'
import {ApiComm, ApiDictData, ApiDictInput, ArrayData} from 'pkg/api'
import moment from 'moment'

export interface InformationState {
    submitData?: OperationScheduleEntityPatManageOperation  // 保存功能所需数据
    /**
     * inputTable字典表
     */
    startIndex?: number,                          // 所有 inputTable的默认开始下标
    pageSize?: number,                            // 所有 inputTable的默认每页显示条数
    columns?: Array<string>,                      // 所有 inputTable的colums
    diagnosisDict?: ArrayData<any>,               // 术前诊断
    diagnosisDictColumns?: Array<any>,           // 术前诊断columns
    doctorDict?: ArrayData<any>,                  // 助手医生、手术医生、麻醉医生、输血医生
    doctorDictColumns?: Array<any>,              // 助手医生、手术医生、麻醉医生、输血医生 columns
    nurseDict?: ArrayData<any>,                   // 第一台护士、第二台护士、第一供应护士、第二供应护士
    nurseDictColumns?: Array<any>,               // 第一台护士、第二台护士、第一供应护士、第二供应护士 columns
    anaesthesiaDict?: ArrayData<any>,            // 麻醉方式
    anaesthesiaDictColumns?: Array<any>,        // 麻醉方式columns
    operatingRoomDict?: ArrayData<any>,         // 手术室
    operatingRoomDictColumns?: Array<any>,     // 手术室columns
    operationPositionDict?: ArrayData<any>,     // 手术部位
    operationPositionDictColumns?: Array<any>, // 手术部位columns
    deptDict?: ArrayData<any>,                   // 手术科室
    deptDictColumns?: Array<any>,               // 手术科室columns
    /**
     * select字典表
     */
    loadPatientStatusDict?: ArrayData<any>,     // 病情
    /**
     * 自定义初始化数据，无字典表
     */
    provideWay?: Array<any>,                     // 供输血方式
    operatingRoomNo?: Array<any>,               // 手术间（跟手术室相关联）
    isolationIndicator?: Array<any>,            // 隔离标志
    applyTime?: string                            // 申请时间
    operatingRoomName?: string                   // 手术室名称
    canSubmit?: any,
}

class InformationService extends BaseService<InformationState> {

    defaultState = {
        submitData: <OperationScheduleEntityPatManageOperation>{},
        /**
         * inputTable字典表
         */
        startIndex: 1,
        pageSize: 7,
        columns: [
            'diagnosisDict',
            'doctorDict',
            'nurseDict',
            'anaesthesiaDict',
            'operatingRoomDict',
            'operationPositionDict',
            'deptDict'
        ],
        diagnosisDict: <ArrayData<any>>[],
        diagnosisDictColumns: [],
        doctorDict: <ArrayData<any>>[],
        doctorDictColumns: [],
        nurseDict: <ArrayData<any>>[],
        nurseDictColumns: [],
        anaesthesiaDict: <ArrayData<any>>[],
        anaesthesiaDictColumns: [],
        operationPositionDict: <ArrayData<any>>[],
        operationPositionDictColumns: [],
        operatingRoomDict: <ArrayData<any>>[],
        operatingRoomDictColumns: [],
        deptDict: <ArrayData<any>>[],
        deptDictColumns: [],
        /**
         * select字典表
         */
        loadPatientStatusDict: <ArrayData<any>>[],
        /**
         * 自定义初始化数据，无字典表
         */
        operatingRoomNo: [],
        provideWay: [
            {inputCode: 'xk', key: 1, value: '血库供血'},
            {inputCode: 'zt', key: 2, value: '自体输血'},
            {inputCode: 'qs', key: 3, value: '亲属供血'},
            {inputCode: 'hh', key: 4, value: '混合供血'},
            {inputCode: 'qt', key: 5, value: '其他'}
        ],
        isolationIndicator: [
            {key: 1, value: '正常'},
            {key: 2, value: '隔离'},
            {key: 3, value: '放射'}
        ],
        emergencyIndicator: [
            {key: 0, value: '择期'},
            {key: 1, value: '急诊'},
            {key: 3, value: '科内'},
            {key: 4, value: '急救'}
        ],
        applyTime: '',
        operatingRoomName: '',
        canSubmit: {},
    }

    serviceWillMount() {
        let {columns} = this.state
        this.loadMultipleColumns(columns)                               // 加载所有InputTable的头部
        this.initialize()
    }

    /**
     * 根据path 返回对应表头数组
     * @param path
     * @returns {any}
     */
    getColumns = (path) => {
        return this.state[path]
    }

    /**
     * 设置值: 公共对外值改变
     * @param path
     * @param data
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 初始化所有inputTable 的columns
     * @returns {Promise<void>}
     */
    loadMultipleColumns = (inputTables) => {
        return ApiDictInput.loadMultipleColumns(inputTables).then((data) => {
            if (!JsonUtil.isEmpty(data)) {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key + 'Columns'] = data[key]
                    }
                }
            }
            this.dispatch(this.state)
        }).catch(err => {
            message.tip(err || '查询字典数据列失败!', 'warning')
        })
    }

    /**
     * 多层次json对象处理: 根据路径获取值
     * 根据路径获取值,路径乘积以句号(.)隔开
     * 单对象例子: "mhSplit.patientVisit.name"
     * 数组对象例子: "mhSplit.triageRecord.0.pvId",其中 0 是数字,表示数组第1个对象
     * @param keys 路径数组或字符串
     * @param json 设置值对象
     * @param defaultResult 默认返回结果,不传值或传入值类型为undefined时,默认返回空字符串
     * @returns {any}
     */
    getJsonByKey = (keys: any, json: any, defaultResult?: any) => {
        if (!json) return defaultResult ? defaultResult : ''
        if (typeof(keys) === 'string') keys = keys.split('.')
        for (let i = 0; i < keys.length; i++) {
            json = json[keys[i]]
            if (!json) return defaultResult ? defaultResult : ''
        }
        return json
    }

    /**
     * 根据传入的参数，给对应的inputTable赋值
     * @param dictCode 字典编码
     * @param {} page 分页
     * @param {string} inputCode 输入码
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string) => {
        return ApiDictInput.loadData(page, dictCode, inputCode).then((data) => {
            this.setStateJson2(dictCode, data)
            return data
        }).catch(err => {
            message.tip(err || '查询数据失败!', 'warning')
        })
    }

    /**
     * 每个inputTable根据触发条件不同返回不同的值
     * @param event
     * @param dict
     * @param isRelated 有关联的state路径
     */
    callBackMethods = (event, dict, isRelated) => {
        let dataType = dict.dataType
        let myData
        if (typeof (dataType) === 'object') {
            myData = {}
            if (event.data) {
                Object.keys(dataType).forEach((key) => {
                    myData[key] = event.data[dataType[key]]
                })
            }
        }
        if (typeof (dataType) === 'string' || typeof (dataType) === 'number') {
            myData = event.value
        }
        let loadPosition = dict.position
        let loadPage = {startIndex: event.pageCurrent, pageSize: event.pageSize}
        let loadValue = event.value
        switch (event.type) {
            case 'clickEvent': {
                this.loadData(loadPosition, loadPage, loadValue).then(data => {
                    this.setStateJson2(loadPosition, data)
                })
                break
            }
            case 'pageEvent': {
                this.loadData(loadPosition, loadPage, loadValue).then(data => {
                    this.setStateJson2(loadPosition, data)
                })
                break
            }
            case 'blurEvent': {
                this.setStateJson2(loadPosition, [])
                break
            }
            // 点击某一选项
            case 'enterEvent': {
                if ( this.state.canSubmit.opsBodyPart === 1) {
                    let obj=this.state.canSubmit
                    obj.opsBodyPart=0
                    this.dispatch2({
                        canSubmit:obj
                    })
                }
                if ( this.state.canSubmit.anesthesiaMethod === 1) {
                    let obj=this.state.canSubmit
                    obj.anesthesiaMethod=0
                    this.dispatch2({
                        canSubmit:obj
                    })
                }
                if (isRelated !== '') {
                    ApiDictData.loadOperatingRoom(event.data.key).then((data) => {
                        this.dispatch2({
                            operatingRoomNo: data
                        })
                    })
                }
                this.setStateJson2(dict.field, myData)
                break
            }
            // input输入值
            case 'changeEvent': {
                if (dict.field.split('.')[1] === 'opsBodyPart') {
                    let obj=this.state.canSubmit
                    obj.opsBodyPart=1
                    this.dispatch2({
                        canSubmit:obj
                    })
                }
                if (dict.field.split('.')[1] === 'anesthesiaMethod') {
                    let obj=this.state.canSubmit
                    obj.anesthesiaMethod=1
                    this.dispatch2({
                        canSubmit:obj
                    })
                }
                if (isRelated !== '') {
                    this.dispatch2({
                        operatingRoomNo: []
                    })
                    this.setStateJson2(isRelated, '')
                }
                if (typeof myData === 'object') {
                    myData[dict.showType] = event.value
                }
                this.setStateJson2(dict.field, myData)
                this.loadData(loadPosition, loadPage, loadValue).then(data => {
                    this.setStateJson2(loadPosition, data)
                })
                break
            }
            default: {
                if (isRelated !== '') {
                    this.dispatch2({
                        operatingRoomNo: []
                    })
                    this.setStateJson2(isRelated, '')
                }
                if (typeof myData === 'object') {
                    myData[dict.showType] = event.value
                }
                this.setStateJson2(dict.field, myData)
                this.loadData(loadPosition, loadPage, loadValue).then(data => {
                    this.setStateJson2(loadPosition, data)
                })
            }
        }
    }

    /**
     * 自动完成框筛选事件,遍历执行
     * @param input
     * @param option
     * @param path 只能是state下的第一层路径
     * @returns {boolean}
     */
    filterOption = (input, option, path) => {
        // 每一项的五笔拼音输入码
        let inputCode = this.state[path][option.key].inputCode.toLowerCase()
        // 每一项的固定值
        let value = option.props.children.toLowerCase()
        // 本次输入的值
        let userInput = input.toLowerCase()
        if (inputCode) {
            return (value.indexOf(userInput) >= 0 || inputCode.indexOf(userInput) >= 0)
        } else {
            return (value.indexOf(userInput) >= 0)
        }
    }

    /**
     * 下拉框
     * @param val
     * @param option
     * @param path
     */
    selectSetValue = (val, option, path) => {
        let value = option.props.children ? option.props.children : ''
        this.setStateJson2(path, value)
    }

    /**
     * 数字输入框
     * @param value
     * @param path
     */
    onChange = (value, path) => {
        this.setStateJson2(path, value)
    }

    /**
     * 单选按钮
     * @param event
     * @param path
     */
    radioChange = (event, path) => {
        this.setStateJson2(path, event.key)
    }

    /**
     * 选择预约时间
     * @param value
     * @param path
     */
    chooseDate = (value, path) => {
        let now = (new Date()).getTime()
        if (value.getTime() - now < 0) {
            message.tip('手术时间不能选择过去时间!', 'warning')
            return
        } else {
            this.setStateJson2(path, value)
        }
    }

    /**
     * 初始化申请时间，申请医生
     */
    applyTimeAndDoctor = (path1, path2, path3) => {
        this.setStateJson2(path1, {
            id: loginService.state.user.id,
            name: loginService.state.user.name
        })
        ApiComm.loadNowDate().then((data) => {
            let date = moment(data).format('YYYY-MM-DD hh:mm:ss')
            this.dispatch2({
                applyTime: date
            })
            this.setStateJson2(path2, date)
            this.setStateJson2(path3, date)
        })
    }

    /**
     * 返回需要提交的数据对象
     * @returns {Promise<any>}
     */
    getData = () => {
        let data = this.state.submitData
        if (!data.clinicDiag) {
            message.tip('术前诊断不能为空!', 'warning')
            throw new Error('术前诊断不能为空!')
        }
        if (!data.scheduledDateTime) {
            message.tip('手术时间不能为空!', 'warning')
            throw new Error('手术时间不能为空!')
        }
        if (!data.operatingRoom) {
            message.tip('手术室不能为空!', 'warning')
            throw new Error('手术室不能为空!')
        }
        if (!data.operatingRoomNo) {
            message.tip('手术间不能为空!', 'warning')
            throw new Error('手术间不能为空!')
        }
        if (!data.opsBodyPart) {
            message.tip('手术体位不能为空!', 'warning')
            throw new Error('手术体位不能为空!')
        }
        if (!data.operatingDept) {
            message.tip('手术科室不能为空!', 'warning')
            throw new Error('手术科室不能为空!')
        }
        if (!data.surgeon) {
            message.tip('手术医生不能为空!', 'warning')
            throw new Error('手术医生不能为空!')
        }
        if (!data.anesthesiaMethod) {
            message.tip('麻醉方式不能为空!', 'warning')
            throw new Error('麻醉方式不能为空!')
        }

        // 点选 id判断
        if (!data.operatingRoom.id === undefined) {
            message.tip('手术室只能点选!', 'warning')
            throw new Error('手术室只能点选，不能随意输入值!')
        }
        if (!data.operatingDept.id === undefined) {
            message.tip('手术科室只能点选!', 'warning')
            throw new Error('手术室只能点选，不能随意输入值!')
        }
        if (!data.surgeon.id === undefined) {
            message.tip('手术医生只能点选!', 'warning')
            throw new Error('手术室只能点选，不能随意输入值!')
        }
        if(this.state.canSubmit.opsBodyPart === 1 ){
            message.tip('手术体位只能点选!', 'warning')
            throw new Error('手术室只能点选，不能随意输入值!')
        }
        if(this.state.canSubmit.anesthesiaMethod === 1){
            message.tip('麻醉方式只能点选!', 'warning')
            throw new Error('手术室只能点选，不能随意输入值!')
        }
        data.pvId = patientBasicService.state.model.pvId
        data.applyDept = {id: patientBasicService.state.model.deptCode}
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    }

    /**
     * 初始化数据
     */
    initialize = () => {
        this.dispatch2({
            submitData: {},
        })
        this.setStateJson2(
            'submitData.isolationIndicator', 1)                      // 初始化 隔离标志 单选按钮值
        this.setStateJson2(
            'submitData.emergencyIndicator', 0)                      // 初始化 申请标志 单选按钮值
        this.applyTimeAndDoctor(
            'submitData.applyDoctor',
            'submitData.applyDateTime',
            'submitData.scheduledDateTime')  //  初始化 申请时间、申请医生、手术时间（预约时间）
        ApiDictData.loadPatientStatusDict().then((data) => {    // 加载病情select
            this.dispatch2({loadPatientStatusDict: data})
        })
    }

    /**
     * 点击历史记录，加载数据
     * @param data
     */
    loadSubmitData = (data) => {
        this.dispatch2({
            submitData: data
        })
    }

}

export const informationService = new InformationService('information')