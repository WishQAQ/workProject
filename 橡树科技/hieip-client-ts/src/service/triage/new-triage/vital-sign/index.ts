import {BaseService} from 'tools/flux/BaseService'
import {ApiSplitMhPatientVisit} from 'pkg/api'
import {VitalSignDictEntitySplitDict} from 'pkg/entity'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {triageService} from '../triage'

export interface ServiceState {
    /**
     * 业务: 生命体征数据缓存
     */
    data?: Object
}

export interface VitalSignState extends ServiceState {
    /**
     * 查询生命体征字典表
     */
    vitalSignDict?: Array<VitalSignDictEntitySplitDict>
}

class VitalSignService extends BaseService<VitalSignState> {
    defaultState = {
        /**
         * 查询生命体征字典表
         */
        vitalSignDict: [],
    }

    serviceWillMount() {
        this.loadVitalSignDict()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 查询生命体征字典表
     */
    loadVitalSignDict = () => {
        return ApiSplitMhPatientVisit.loadVitalSignDict().then((data) => {
            this.dispatch({vitalSignDict: data})
        }).catch(msg => {
            message.tip(msg || '查询生命体征字典表失败!', 'warning')
        })
    }
    /**
     * 查询生命体征
     */
    loadVitalSigns = () => {
        alert('需要对接设备接口!')
    }
    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /**
     * 特殊处理: 生命体征值
     */
    setVitalSigns = (data, index, ...path) => {
        const {vitalSignDict} = this.state
        let regular = vitalSignDict[index].regular
        // 有非数字字符时,替换
        if (regular) {
            data = data.replace(new RegExp(regular, 'g'), '')// 替换非数字字符
        }
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }
    /**
     * 特殊处理: 生命体征值,判断设置分诊级别
     */
    setVitalSigns2 = (data, index, ...path) => {
        this.setVitalSigns(data, index, ...path)
        const {vitalSignDict} = this.state
        let triageLevel2 = vitalSignDict[index].triageLevel
        let maxSigns = vitalSignDict[index].maxSigns
        let minSigns = vitalSignDict[index].minSigns
        let value = parseFloat(data)
        if (value) {
            const {triageLevel} = triageService.state
            if (!triageLevel || triageLevel === null || triageLevel === '') {
                triageService.setStateJson2('triageLevel', triageLevel2)
            } else if (value > parseFloat(maxSigns) || value < parseFloat(minSigns)) {
                if (parseInt(triageLevel, 0) > triageLevel2) {
                    triageService.setStateJson2('triageLevel', triageLevel2)
                }
            }
        }
    }
    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /* =====分界线: 对外值改变: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data))
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }
    /* =====分界线: 对外值改变: 结束===== */

    /* =====分界线: 二、前端处理: 结束===== */
}

export const vitalSignService = new VitalSignService('vitalSign')