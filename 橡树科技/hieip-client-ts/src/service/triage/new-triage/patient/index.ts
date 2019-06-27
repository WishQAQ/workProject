import {BaseService} from 'tools/flux/BaseService'
import {ApiDictData, ApiSplitMhPatientVisit} from 'pkg/api'
import {DataDictEntityDict as DataDict, MhPatientVisitModelEntitySplit, Page} from 'pkg/entity'
import {triageService} from 'service/triage/new-triage/triage'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiDictInput} from '../../../../packages/api'
import {InputDictModelDtoDict} from '../../../../packages/entity'
import {scoreService} from '../score'

export interface ServiceState {
    /**
     * 业务: 患者信息数据缓存
     */
    patientVisit?: MhPatientVisitModelEntitySplit
}

/**
 * 字典表
 */
export interface Dict extends ServiceState {
    /**
     * 性别
     */
    sexDict?: DataDict[]
    /**
     * 费别信息
     */
    chargeTypeDict?: DataDict[]
    /**
     * 身份信息
     */
    identityDict?: DataDict[]
    /**
     * 民族信息
     */
    nationDict?: DataDict[]
    /**
     * 来院方式
     */
    regFromDict?: DataDict[]
    /**
     * 绿色通道
     */
    greenRoadDict?: DataDict[]
    /**
     * 其他方式
     */
    otherDict?: DataDict[]
    /**
     * 病人评分
     */
    scoreTypeDict?: DataDict[]
    /**
     * 暂存所有key值
     */
    keys?: Array<any>
    /**
     * 过敏药品
     */
    alergyDrugsDict?: DataDict[]
    /**
     * 过敏药品列
     */
    alergyDrugsDictColumns?: Array<InputDictModelDtoDict>
}

export interface PatientState extends Dict {

}

class PatientService extends BaseService<PatientState> {
    defaultState = {
        /**
         * 过敏药品
         */
        alergyDrugsDict: [],
        /**
         * 性别
         */
        sexDict: [],
        /**
         * 费别信息
         */
        chargeTypeDict: [],
        /**
         * 身份信息
         */
        identityDict: [],
        /**
         * 民族信息
         */
        nationDict: [],
        /**
         * 来院方式
         */
        regFromDict: [],
        /**
         * 绿色通道
         */
        greenRoadDict: [],
        /**
         * 其他方式
         */
        otherDict: [],
        /**
         * 病人评分
         */
        scoreTypeDict: [],

        /**
         * 业务: 患者信息数据缓存
         */
        patientVisit: {},
        /**
         * 暂存所有key值
         */
        keys: [],
        /**
         * 过敏药品列
         */
        alergyDrugsDictColumns: [],
    }

    serviceWillMount() {
        this.loadAlergyDrugsDictColumns()
        this.loadDictSex()
        this.loadChargeType()
        this.loadIdentity()
        this.loadNation()
        this.loadRegFrom()
        this.loadGreenRoad()
        this.loadOther()
        this.loadScoreType()
        this.loadTempSave()
        this.loadAlergyDrugsDict()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */
    /**
     * 查询字典数据列
     * @param dictCode 字典编码
     * @returns {Promise<void>}
     */
    loadColumns = (dictCode) => {
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            this.setStateJson2(dictCode + 'Columns', data)
        }).catch(msg => {
            message.tip(msg || '查询字典数据列失败!', 'warning')
        })
    }
    /**
     * 查询字典数据
     * @param dictCode
     * @param {} page
     * @param {string} inputCode
     * @returns {Promise<void>}
     */
    loadData = (dictCode, page?: Page, inputCode?: string) => {
        page = page ? page : {startIndex: 1, pageSize: 7}
        return ApiDictInput.loadData(page, dictCode, inputCode).then((data) => {
            this.setStateJson2(dictCode, data)
        }).catch(msg => {
            message.tip(msg || '查询字典数据失败!', 'warning')
        })
    }

    /**
     * 过敏药品
     */
    loadAlergyDrugsDictColumns = () => {
        this.loadColumns('alergyDrugsDict')
    }
    /**
     * 过敏药品
     */
    loadAlergyDrugsDict = (page?: Page, inputCode?: string) => {
        this.loadData('alergyDrugsDict', page, inputCode)
    }
    /**
     * 性别
     */
    loadDictSex = () => {
        return ApiDictData.loadDictSex().then((data) => {
            this.dispatch({sexDict: JsonUtil.copyProps(data, 'value,key', 'children,value', true)})
        }).catch(msg => {
            message.tip(msg || '查询性别失败!', 'warning')
        })
    }
    /**
     * 费别信息
     */
    loadChargeType = () => {
        return ApiDictData.loadChargeType().then((data) => {
            this.dispatch({chargeTypeDict: JsonUtil.copyProps(data, 'value,key', 'children,value', true)})
        }).catch(msg => {
            message.tip(msg || '查询费别信息失败!', 'warning')
        })
    }
    /**
     * 身份信息
     */
    loadIdentity = () => {
        return ApiDictData.loadIdentity().then((data) => {
            this.dispatch({identityDict: JsonUtil.copyProps(data, 'value,key', 'children,value', true)})
        }).catch(msg => {
            message.tip(msg || '查询身份信息失败!', 'warning')
        })
    }
    /**
     * 民族信息
     */
    loadNation = () => {
        return ApiDictData.loadNation().then((data) => {
            this.dispatch({nationDict: JsonUtil.copyProps(data, 'value,key', 'children,value', true)})
        }).catch(msg => {
            message.tip(msg || '查询民族信息失败!', 'warning')
        })
    }
    /**
     * 来院方式
     */
    loadRegFrom = () => {
        return ApiDictData.loadRegFrom().then((data) => {
            this.dispatch({regFromDict: JsonUtil.copyProps(data, 'value,key', 'children,value', true)})
        }).catch(msg => {
            message.tip(msg || '查询来院方式失败!', 'warning')
        })
    }
    /**
     * 绿色通道
     */
    loadGreenRoad = () => {
        return ApiDictData.loadGreenRoad().then((data) => {
            this.dispatch({greenRoadDict: data})
        }).catch(msg => {
            message.tip(msg || '查询绿色通道失败!', 'warning')
        })
    }
    /**
     * 其他方式
     */
    loadOther = () => {
        return ApiDictData.loadOther().then((data) => {
            this.dispatch({otherDict: data})
        }).catch(msg => {
            message.tip(msg || '查询其他方式失败!', 'warning')
        })
    }
    /**
     * 病人评分
     */
    loadScoreType = () => {
        return ApiDictData.loadScoreType().then((data) => {
            this.dispatch({scoreTypeDict: JsonUtil.copyProps(data, 'value,key', 'children,value', true)})
        }).catch(msg => {
            message.tip(msg || '查询病人评分失败!', 'warning')
        })
    }

    /**
     * 暂存分诊信息
     */
    loadTempSave = () => {
        return ApiSplitMhPatientVisit.loadTempSave().then((data) => {
            this.dispatch2({keys: data})
        })
        //     .catch(err => {
        //   message.tip(msg || '查询暂存分诊信息失败!',  'warning')
        // })
    }
    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 查询暂存分诊信息
     */
    loadTempSaveByKey = (key) => {
        return ApiSplitMhPatientVisit.loadTempSaveByKey(key).then((data) => {
            triageService.setStateJson('mhSplit', data)
            triageService.initState()// 初始化数据
        })
        //     .catch(err => {
        //   message.tip(msg || '查询暂存分诊信息失败!',  'warning')
        // })
    }
    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

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
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 设置值: 公共对外值改变
     */
    setPatient = (model) => {
        let data
        for (let key in model) {
            if (model.hasOwnProperty(key)) {
                data = model[key]
            }
        }
        let key = JsonUtil.getJsonByKey('name', data)
        let value = JsonUtil.getJsonByKey('value', data)
        if (key === 'crbFlag') {
            triageService.setStateJson('mhSplit.triageRecord.' + key, value)
        }
        if (key === 'bulkinjuryName') {
            key = 'bulkinjuryId'
            triageService.setStateJson('mhSplit.patientVisit.' + key, value)
            JsonUtil.json('patientVisit.bulkinjuryName', this.state, '')
            JsonUtil.json('patientVisit.bulkinjuryId', this.state, '')
            this.dispatch({patientVisit: this.state.patientVisit})
            // 清除群伤后, 将 start评分 删除
            if (!value || value.trim().length === 0) {
                const {scoreing} = scoreService.state
                let list = []
                scoreing.forEach((v: any) => {
                    if (v.name !== 'start') {
                        list.push(v)
                    }
                })
                scoreService.setStateJson2('scoreing', list)
            }
        }
        triageService.setStateJson('mhSplit.patientVisit.' + key, value)
    }
    /* =====分界线: 对外值改变: 结束===== */
    /* =====分界线: 二、前端处理: 结束===== */
}

export const patientService = new PatientService('patient')
