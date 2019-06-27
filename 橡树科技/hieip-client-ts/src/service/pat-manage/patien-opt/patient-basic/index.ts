import {BaseService} from 'tools/flux/BaseService'
import {loginService} from 'service/user/login'
import {InDeptEntityPatManage, PatInHouseEntityPatManageTransfer} from 'pkg/entity'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'
import {DataDictEntityDict, PatInHouseEntitySplit} from 'pkg/entity'
import {ArrayData} from 'pkg/api/nurse'
import {ApiDictData, ApiPatManageTransferRec} from 'pkg/api'
import {type} from 'os'

export interface PatientBasicState {
    model?: InDeptEntityPatManage,
    open?: boolean,
    patientData?: ArrayData<DataDictEntityDict>, // 病情等级下拉数据
    nurData?: ArrayData<DataDictEntityDict>, // 护理等级下拉数据
    transferData?: PatInHouseEntityPatManageTransfer, // 转区所需数据
    pReason?: ArrayData<DataDictEntityDict>, // 原因
    pIntro?: ArrayData<DataDictEntityDict>, // 说明
    patientValue?: string,// 病情选项值
    nurValue?: string, // 护理等级选项值
}

class PatientBasicService extends BaseService<PatientBasicState> {
    defaultState = {
        model: {},
        transferData: {},
    }

    /**
     * 初始化加载
     */
    serviceWillMount() {
        this.loadPatientStatusDict(),
            this.loadNursingClassDict()

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
        this.dispatch(JsonUtil.json(path, this.state, data))
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (data, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }

    publicSetNewValue = (e, path) => {
        let value = e.target ? e.target.value : e
        let {transferData} = this.state
        transferData[path] = value
        this.dispatch2({transferData})
    }

    /**
     * 保存转区
     */
    saveData = () => {
        let {transferData, model} = this.state
        transferData.pvId = {id: model.pvId}
        transferData.operator = {id: loginService.state.user.id}
        transferData.doctorInCharge = {id: loginService.state.user.id}
        transferData.areaId = {id: model.areaId}
        return ApiPatManageTransferRec.transferArea(transferData).then(data => {
            message.tip('success')
        }).catch(err => {
            message.tip(err || '保存转区失败', 'warning')
        })
    }
    /**
     * 查询急诊病情状态字典
     * @returns {Promise<void>}
     */
    loadPatientStatusDict = () => {
        return ApiDictData.loadPatientStatusDict().then(data => {
            this.dispatch2({patientData: data})
        }).catch(err => {
            message.tip(err || '查询急诊病情状态字典失败', 'warning')
        })

    }
    /**
     * 查询急诊护理等级字典表
     *
     */
    loadNursingClassDict = () => {
        return ApiDictData.loadNursingClassDict().then(data => {
            this.dispatch2({nurData: data})
        }).catch(err => {
            message.tip(err || '查询急诊护理等级字典表失败', 'warning')
        })

    }

    /**
     * 转区弹框打开状态
     */
    bBox = () => {
        this.dispatch2({open: true})
    }
    /**
     * 转区弹框关闭状态
     */
    handleClose = () => {
        this.dispatch({open: false})
    }
    /* =====分界线: 二、前端处理: 结束===== */

}

export const patientBasicService = new PatientBasicService('patientBasic')
