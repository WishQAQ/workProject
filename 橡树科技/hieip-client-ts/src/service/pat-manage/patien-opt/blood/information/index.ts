/**
 * 用血information
 * Created by wx 2018.01.17
 */
import {BaseService} from 'tools/flux/BaseService'
import {ApiDictData, ArrayData} from 'pkg/api'
import {BloodApplyEntityPatManageBlood, DataDictEntityDict} from 'pkg/entity'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'

export interface InformationState {
    informationData?: BloodApplyEntityPatManageBlood,// 表格数据
    informationDataInit?: BloodApplyEntityPatManageBlood,// 表格数据初始化
    bloodTypeData?: ArrayData<DataDictEntityDict>,// 血型数据
    bloodTypeRhData?: ArrayData<DataDictEntityDict>,// rh数据
    historyData?: Array<HistoryData>, // 孕产史数据
    isDisable?: boolean,// 是否禁用各个控件
}

interface HistoryData {
    name: string,
    id: string,
    value: string,
    disable: boolean
}

class InformationService extends BaseService<InformationState> {
    defaultState = {
        isDisable: false,
        informationData: {
            priorityIndicator: 0,// 急
            bloodPaperIndicator: '0',// 献血证
            notice: '1',// 知情同意书
            apanage: '1', // 属地
            bloodCause: '手术',// 输血目的
            bloodInuse: '血库',// 血源
            irregularAntibodyScreening: '1' // 不规则抗体筛查
        },
        informationDataInit: {
            priorityIndicator: 0,// 急
            bloodPaperIndicator: '0',// 献血证
            notice: '1',// 知情同意书
            apanage: '1', // 属地
            bloodCause: '手术',// 输血目的
            bloodInuse: '血库',// 血源
            irregularAntibodyScreening: '1' // 不规则抗体筛查
        },
        bloodTypeData: null,
        bloodTypeRhData: null,
        historyData: [
            {name: '输血史', id: 'transfusionHistory', value: '', disable: true},
            {name: '孕', id: 'pregnancy', value: '', disable: true},
            {name: '产', id: 'parturition', value: '', disable: true}
        ]
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        let {informationDataInit} = this.state
        // 清空数据
        this.clearInformationData()
        // 查询血型
        ApiDictData.loadBloodType().then((data) => {
            this.dispatch({
                bloodTypeData: data
            })
        })
        // 查询rh
        ApiDictData.loadBloodTypeRh().then((data) => {
            this.dispatch({
                bloodTypeRhData: data
            })
        })
        //  孕产史初始化值
        this.historyDataInit(informationDataInit)
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }
    /**
     * 是否禁用事件
     * @param {boolean} v
     */
    isDisable = (v: boolean) => {
        this.dispatch({
            isDisable: v
        })
    }
    /**
     * history-table左点击设置information的值
     * @param {} v
     */
    setInformationData = (v: BloodApplyEntityPatManageBlood) => {
        this.setStateJson2('informationData', v)
        this.dispatch({
            isDisable: true
        })
        this.historyDataInit(v)
    }
    /**
     * 清空表格数据并初始化
     */
    clearInformationData = () => {
        const {informationDataInit} = this.state
        this.dispatch2({
            informationData: {},
            historyData: [
                {name: '输血史', id: 'transfusionHistory', value: '', disable: true},
                {name: '孕', id: 'pregnancy', value: '', disable: true},
                {name: '产', id: 'parturition', value: '', disable: true}
            ]
        })
        this.dispatch({
            informationData: informationDataInit
        })
        this.isDisable(false)
    }

    /**
     * 孕产史初始化值
     * @param informationData
     */
    historyDataInit = (informationData) => {
        if (informationData.transfusionHistory) {
            this.historyData('transfusionHistory', informationData.transfusionHistory, false)
        } else {
            this.historyData('transfusionHistory', '', true)
        }
        if (informationData.pregnancy) {
            this.historyData('pregnancy', informationData.pregnancy, false)
        } else {
            this.historyData('pregnancy', '', true)
        }
        if (informationData.parturition) {
            this.historyData('parturition', informationData.parturition, false)
        } else {
            this.historyData('parturition', '', true)
        }
    }
    /**
     * 孕产史数据改变
     * @param {string} name
     * @param {string} inputV
     * @param {boolean} checkV
     */
    historyData = (name?: string, inputV?: string, checkV?: boolean) => {
        let {historyData} = this.state
        this.state.historyData.forEach((item, i) => {
            if (item.id === name) {
                item.disable = checkV
                item.value = inputV
            }
        })
        this.dispatch({
            historyData: historyData
        })
    }

    /**
     * 加急框的事件
     * @param e
     */
    urgentChange = (e) => {
        this.setValue('priorityIndicator', Number(e.target.checked))
    }
    /**
     * 献血证选择事件
     * @param e
     */
    bloodPaperIndicatorChange = (e) => {
        this.setValue('bloodPaperIndicator', Number(e.target.checked) + '')
    }
    /**
     * 设置值
     * @param name
     * @param v
     */
    setValue = (name, v) => {
        let {informationData} = this.state
        informationData[name] = v
        this.dispatch({
            informationData: informationData
        })
        // console.log(this.state.informationData)
    }
    /**
     * 知情同意书
     * @param v
     */
    noticeChange = (v) => {
        this.setValue('notice', v.value)
    }
    /**
     * 白细胞事件
     * @param v
     */
    leucocyteChange = (v) => {
        this.setValue('leucocyte', Number(v))
    }
    /**
     * 属地选择事件
     * @param v
     */
    apanageChange = (v) => {
        this.setValue('apanage', v.value)
    }
    /**
     * 血型选择事件
     * @param val
     * @param option
     */
    bloodTypeChange = (val, option: any) => {
        let {bloodTypeData} = this.state
        this.setStateJson2('informationData.bloodType', {id: Number(bloodTypeData[val - 1].key), name: bloodTypeData[val - 1].value})
        // informationData.bloodType.id = Number(bloodTypeData[val-1].key)
        // informationData.bloodType.name = bloodTypeData[val-1].value
        // this.dispatch({
        //   informationData:informationData
        // })
    }

    /** select自动完成框筛选事件 */
    filterOption(input, option, datas) {
        if (datas[option.key].inputCode) {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                || datas[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } else {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
    }

    /**
     * rh选择事件
     * @param val
     */
    bloodTypeRhChange = (val) => {
        let {bloodTypeRhData} = this.state
        this.setStateJson2('informationData.bloodTypeRh', {id: Number(bloodTypeRhData[val - 1].key), name: bloodTypeRhData[val - 1].value})
    }
    /**
     * 输血孕产史checkbox
     * @param e
     * @param id
     */
    historyCheckBox = (e, id) => {
        this.historyData(id, '', !e.target.checked)
    }
    /**
     * 输血孕产史input
     * @param v
     * @param id
     */
    historyInput = (v, id) => {
        this.historyData(id, v, false)
        this.setValue(id, v)
    }
    /**
     * 输血目的
     * @param v
     */
    bloodCauseChange = (v) => {
        this.setValue('bloodCause', v.value)
    }
    /**
     * 输血反应禁忌
     * @param e
     */
    bloodTabooChange = (e) => {
        this.setValue('bloodTaboo', e.target.value)
    }
    /**
     * altChange
     * @param v
     */
    altChange = (v) => {
        this.setValue('alt', v)
    }
    /**
     * altBlur
     * @param e
     */
    altBlur = (e) => {
        if (e.target.value) this.setValue('alt', Number(e.target.value))
    }
    /**
     * hbeag
     * @param v
     */
    hbeagChange = (v) => {
        this.setValue('hbeag', v)
    }
    /**
     * hbsab
     * @param v
     */
    hbsabChange = (v) => {
        this.setValue('hbsab', v)
    }
    /**
     * hbcab
     * @param v
     */
    hbcabChange = (v) => {
        this.setValue('hbcab', v)
    }
    /**
     * hbeab
     * @param v
     */
    hbeabChange = (v) => {
        this.setValue('hbeab', v)
    }
    /**
     * 血红蛋白事件
     * @param v
     */
    hematinChange = (v) => {
        this.setValue('hematin', v)
    }
    hematinBlur = (e) => {
        if (e.target.value) {
            this.setValue('hematin', Number(e.target.value))
        }
    }
    /**
     * 血小板
     * @param v
     */
    plateletChange = (v) => {
        this.setValue('platelet', Number(v))
    }
    /**
     * 血源
     * @param v
     */
    bloodInuseChange = (v) => {
        this.setValue('bloodInuse', v.value)
    }
    /**
     * 感染项检测里的事件
     * @param e
     * @param name
     */
    hcvHivChange = (e, name) => {
        this.setValue(name, e.target.value)
    }
    /**
     * 末次输血时间
     * @param v
     */
    lastBloodDateChange = (v) => {
        this.setValue('lastBloodDate', v)
    }
    /**
     * 不规则抗体筛查
     * @param v
     */
    informationService = (v) => {
        // console.log(v)
        // let {informationData} = this.state
        // informationData.irregularAntibodyScreening = v.value
        this.setValue('irregularAntibodyScreening', v.value)
    }
}

export const informationService = new InformationService('bloodInformation')