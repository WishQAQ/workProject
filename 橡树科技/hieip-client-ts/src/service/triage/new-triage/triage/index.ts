import {BaseService} from 'tools/flux/BaseService'
import {ApiDictData, ApiSplitMhPatientVisit} from 'pkg/api'
import {DataDictEntityDict as DataDict, MhSplitEntitySplit} from 'pkg/entity'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {vitalSignService} from 'service/triage/new-triage/vital-sign'
import {scoreService} from 'service/triage/new-triage/score'
import {patientService} from 'service/triage/new-triage/patient'
import {ApiComm} from '../../../../packages/api'

/**
 * 业务: 路径
 */
export interface Path {
    /**
     * 路径: 分诊级别
     */
    ACT_TRIAGE_LEVEL?: string
    /**
     * 路径: 自动分诊级别
     */
    AUTO_TRIAGE_LEVEL?: string
    /**
     * 路径: 分诊去向
     */
    TRIAGE_TARGET?: string
    /**
     * 路径: 其他分诊去向
     */
    OTHER_TRIAGE_TARGET?: string
    /**
     * 路径: 调整级别理由
     */
    TRIAGE_MEMO?: string
    /**
     * 路径: 调整级别理由
     */
    CHANGE_LEVEL?: string
}

/**
 * 业务: 普通
 */
export interface Service extends Path {
    /**
     * 业务: 分诊级别显示值
     */
    triageLevel?: string
}

/**
 * 字典表
 */
export interface Dict extends Service {
    /**
     * 分诊级别
     */
    triageLevelDict?: DataDict[]
    /**
     * 其他分诊去向
     */
    triageOtherDict?: DataDict[]
    /**
     * 分诊去向
     */
    triageTargetDict?: DataDict[]
    /**
     * 分诊级别更改理由
     */
    mhChangeReasonDict?: DataDict[]
}

export interface TriageState extends Dict {
    /**
     * 查询分诊详情信息
     */
    mhSplit?: MhSplitEntitySplit
    /**
     * 默认模型数据
     */
    model?: Object
    /**
     * 开始分诊时间
     */
    startRecordDate?: Date
}

class TriageService extends BaseService<TriageState> {
    defaultState = {
        /**
         * 分诊级别
         */
        triageLevelDict: [],
        /**
         * 其他分诊去向
         */
        triageOtherDict: [],
        /**
         * 分诊去向
         */
        triageTargetDict: [],
        /**
         * 分诊级别更改理由
         */
        mhChangeReasonDict: [],
        /**
         * 查询分诊详情信息
         */
        mhSplit: <MhSplitEntitySplit>{},
        /**
         * 业务: 分诊级别显示值
         */
        triageLevel: '',

        /* =====分界线: 路径默认值: 开始===== */
        /**
         * 路径: 分诊级别
         */
        ACT_TRIAGE_LEVEL: 'mhSplit.triageRecord.actTriageLevel',
        /**
         * 路径: 自动分诊级别
         */
        AUTO_TRIAGE_LEVEL: 'mhSplit.triageRecord.autoTriageLevel',
        /**
         * 路径: 分诊去向
         */
        TRIAGE_TARGET: 'mhSplit.triageRecord.triageTarget',
        /**
         * 路径: 其他分诊去向
         */
        OTHER_TRIAGE_TARGET: 'mhSplit.triageRecord.otherTriageTarget',
        /**
         * 路径: 分诊级别更改理由
         */
        TRIAGE_MEMO: 'mhSplit.triageRecord.triageMemo',
        /**
         * 路径: 分诊级别更改
         */
        CHANGE_LEVEL: 'mhSplit.triageRecord.changeLevel',
        /* =====分界线: 路径默认值: 结束===== */

        model: {
            'patientVisit': {
                'patientId': '1',
                'visitId': 1,
                'visitDate': '2017-12-21T00:00:00Z',
                'visitNo': 1,
                'name': '1',
                'sex': 1,
                'dateOfBirth': '2017-12-12T12:00:00Z',
                'chargeType': 1,
                'identity': 3,
                'idNo': '111111111111111',
                'nation': 3,
                'nextOfKinPhone': '1',
                'nextOfKin': '11',
                'happenDate': '2017-11-29T12:00:00Z',
                'mailingAddress': '11',
                'registerFrom': 1,
                'greenRoad': '脑出血,心血管,心血管,脑出血,脑出血,心血管,心血管,脑出血,脑出血,心血管,心血管,脑出血',
                'specialSign': '发热门诊,三无人员,三无人员,发热门诊,发热门诊,三无人员,三无人员,发热门诊,发热门诊,三无人员,三无人员,发热门诊',
                'status': 0,
                'registerDate': '2017-12-21T17:43:47Z',
                'updateSign': 0,
                'settledIndicator': 0,
                'isDel': 0
            },
            'triageRecord': {
                'pvId': 11,
                'triageDate': '2017-12-22T12:01:19Z',
                'triageBy': 1,
                'triageTarget': 1001,
                'otherTriageTarget': 25,
                'actTriageLevel': 3,
                'hasVitalSign': 1,
                'hasScoreRecord': 1,
                'hasAccordingRecord': 1,
                'isDel': 0
            },
            'vitalSignRecord': [
                {
                    'pvId': 11,
                    'recordDate': '2017-12-22T12:01:19Z',
                    'itemId': {
                        'id': 2,
                        'vitalSigns': '心率'
                    },
                    'itemValue': '11'
                },
                {
                    'pvId': 11,
                    'recordDate': '2017-12-22T12:01:19Z',
                    'itemId': {
                        'id': 4,
                        'vitalSigns': '腋下体温'
                    },
                    'itemValue': '11'
                }
            ],
            'scoreRecordList': [
                {
                    'pvId': 11,
                    'recordDate': '2017-12-22T12:01:19Z',
                    'scoreType': 'gcs',
                    'scoreValue': 2,
                    'scoreDescription': '9',
                    'scoreContent':
                    '{"bol":1,"color":"#FA8630","content":"GCS评分9","danger":""' +
                    ',"explain":"昏迷程度以睁眼、语言、运动三者分数加总来评估，正常人的昏迷指数是满分15分，昏迷程度越重者的昏迷指数越低分轻度昏迷：' +
                    '13分到14分。中度昏迷：9分到12分。重度昏迷：3分到8分。低于3分：因插管气切无法发声的重度昏迷者会有2T的评分。","indexes":2,"name":"gcs"' +
                    ',"radioK":{"language":"1__无发音","motion":"5__对疼痛刺激定位反应","openeyes":"3__语言吩咐睁眼"}' +
                    ',"rule":2,"socregcs":{},"socreothers":{"language":"1__无发音","motion":"5__对疼痛刺激定位反应","openeyes":"3__语言吩咐睁眼"}' +
                    ',"subtitle":"评分内容","summary":"当前评分分级为","title":"GCS评分","totalScores":9}'
                },
                {
                    'pvId': 11,
                    'recordDate': '2017-12-22T12:01:19Z',
                    'scoreType': 'wound',
                    'scoreValue': 3,
                    'scoreDescription': '13',
                    'scoreContent':
                    '{"bol":1,"color":"#FFCC19","content":"创伤评分13","danger":""' +
                    ',"explain":"总分越小，伤情越重；总分14-16分，生存率96%；总分4-13分' +
                    '，抢救效果显著；总分1-3分，死亡率>96%。一般以TS<12分作为重伤的标准。' +
                    '","indexes":1,"name":"wound","radioK":{"amplitude":"1__浅或困难",' +
                    '"compression":"3__70-90","degree":"2__正常","frequency":"3__25-35"' +
                    ',"language":"5__语言交谈","motion":"6__按吩咐动作","opeyes":"4__自发睁眼"}' +
                    ',"rule":3,"socregcs":{"language":"5__语言交谈","motion":"6__按吩咐动作"' +
                    ',"opeyes":"4__自发睁眼"},"socreothers":{"amplitude":"1__浅或困难"' +
                    ',"compression":"3__70-90","degree":"2__正常","frequency":"3__25-35"}' +
                    ',"subtitle":"评分内容","summary":"当前评分分级为","title":"创伤评分","totalScores":13}'
                }
            ],
            'accordingRecordList': [],
            'greenRoadRecList': [
                {
                    'greenRoad': 1
                },
                {
                    'greenRoad': 2
                }
            ],
            'specialSignRecList': [
                {
                    'specialSign': 2
                },
                {
                    'specialSign': 1
                }
            ]
        }
    }

    serviceWillMount() {
        this.loadNowDate()
        this.loadTriageLevel()
        this.loadTriageTarget()
        this.loadTriageOther()
        this.loadMhChangeReason()
        this.loadSplitInfo()
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */
    /**
     * 分诊级别
     */
    loadTriageLevel = () => {
        return ApiDictData.loadTriageLevel().then((data) => {
            this.dispatch({triageLevelDict: data})

        }).catch(msg => {
            message.tip(msg || '查询分诊级别失败!', 'warning')
        })
    }
    /**
     * 其他分诊去向
     */
    loadTriageOther = () => {
        return ApiDictData.loadTriageOther().then((data) => {
            this.dispatch({triageOtherDict: data})
        }).catch(msg => {
            message.tip(msg || '查询其他分诊去向失败!', 'warning')
        })
    }
    /**
     * 分诊去向
     */
    loadTriageTarget = () => {
        return ApiDictData.loadTriageTarget().then((data) => {
            this.dispatch({triageTargetDict: data})

        }).catch(msg => {
            message.tip(msg || '查询分诊去向失败!', 'warning')
        })
    }
    /**
     * 分诊级别更改理由
     */
    loadMhChangeReason = () => {
        return ApiDictData.loadMhChangeReason().then((data) => {
            this.dispatch({mhChangeReasonDict: data})
        }).catch(msg => {
            message.tip(msg || '查询分诊级别更改理由失败!', 'warning')
        })
    }

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 获得服务器时间
     */
    loadNowDate = () => {
        ApiComm.loadNowDate().then((time) => {
            this.dispatch2({startRecordDate: time})
        })
    }

    /**
     * 查询分诊详情信息
     */
    loadSplitInfo = (pvId?: any) => {
        if (!pvId || pvId.length === 0) pvId = JsonUtil.getJsonByKey('mhSplit.patientVisit.id', this.state)
        if (!pvId || pvId.length === 0) {
            this.dispatch({mhSplit: {}})
            this.initState()// 初始化数据
            return
        }
        return ApiSplitMhPatientVisit.loadSplitInfo(pvId).then((data) => {
            this.dispatch({mhSplit: data})
            this.initState()// 初始化数据
        })
        //     .catch(err => {
        //   message.tip(msg || '查询分诊详情信息失败!',  'warning')
        // })
    }
    /**
     * 根据身份证号查询已诊患者
     */
    loadPatientIdByIdNo = (idNo) => {
        return ApiSplitMhPatientVisit.loadPatientIdByIdNo(idNo).then((data) => {
            message.tip(data, 'warning')
        }).catch(msg => {
            message.tip(msg || '查询根据身份证号已诊患者失败!', 'warning')
        })
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /**
     * 暂存分诊
     */
    tempSave = () => {
        if (JsonUtil.isEmpty(JsonUtil.getJsonByKey('mhSplit.patientVisit.patientId', this.state))) {
            message.tip('患者编号不能为空!', 'warning')
            return
        }
        if (JsonUtil.isEmpty(JsonUtil.getJsonByKey('mhSplit.patientVisit.name', this.state))) {
            message.tip('患者姓名不能为空!', 'warning')
            return
        }
        this.saveGetValue()
        const {mhSplit} = this.state
        return ApiSplitMhPatientVisit.tempSave(mhSplit).then((data) => {
            message.tip(data, 'warning')
            // 刷新暂存记录
            patientService.loadTempSave()
        }).catch(msg => {
            message.tip(msg || '暂存分诊失败!', 'warning')
        })
    }
    /**
     * 保存分诊
     */
    save = () => {
        const {triageLevel, TRIAGE_TARGET, OTHER_TRIAGE_TARGET, CHANGE_LEVEL, TRIAGE_MEMO} = this.state
        let temp = JsonUtil.getJsonByKey('mhSplit.patientVisit.patientId', this.state)
        if (!temp || temp.length === 0) {
            message.tip('患者编号不能为空!', 'warning')
            return
        }
        temp = JsonUtil.getJsonByKey('mhSplit.patientVisit.name', this.state)
        if (!temp || temp.length === 0) {
            message.tip('患者姓名不能为空!', 'warning')
            return
        }
        temp = triageLevel
        if (!temp || temp.length === 0) {
            message.tip('分级级别不能为空!', 'warning')
            return
        }
        temp = JsonUtil.getJsonByKey(TRIAGE_TARGET, this.state)
        if (!temp || temp.length === 0) {
            message.tip('分级去向不能为空!', 'warning')
            return
        }
        // temp = JsonUtil.getJsonByKey(OTHER_TRIAGE_TARGET, this.state)
        // if (!temp || temp.length === 0) {
        //     message.tip('分级其他去向不能为空!', 'warning')
        //     return
        // }
        temp = JsonUtil.getJsonByKey(CHANGE_LEVEL, this.state)
        if (!JsonUtil.isEmpty(temp)) {
            temp = JsonUtil.getJsonByKey(TRIAGE_MEMO, this.state)
            if (!temp || temp.length === 0) {
                message.tip('已手工修改分诊等级,分诊修改理由不能为空!', 'warning')
                return
            }
        }
        this.saveGetValue()
        const model = this.state.mhSplit
        // 开始分诊时间
        model.triageRecord.startRecordDate = this.state.startRecordDate
        return ApiSplitMhPatientVisit.save(model).then((data) => {
            this.setStateJson('mhSplit', {})
            message.tip(data || '保存成功!', 'warning')
        }).catch(msg => {
            message.tip(msg || '保存分诊失败!', 'warning')
        })
    }

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */

    /* =====分界线: 对外值改变: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
        if (path === 'mhSplit') {
            this.initState()// 刷新数据
        }
    }
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (path, data) => {
        const {ACT_TRIAGE_LEVEL, AUTO_TRIAGE_LEVEL, TRIAGE_TARGET, OTHER_TRIAGE_TARGET, CHANGE_LEVEL} = this.state
        // 特殊处理: 分诊级别显示值改变
        if (path === ACT_TRIAGE_LEVEL) {
            // 如果已有自动评分,设置改变级别
            if (JsonUtil.isEmpty(JsonUtil.getJsonByKey(AUTO_TRIAGE_LEVEL, this.state))) {
                this.setStateJson(CHANGE_LEVEL, data.target.value)
            }
            this.dispatch({'triageLevel': data.target.value})
        }
        if (path === AUTO_TRIAGE_LEVEL) {
            this.dispatch({'triageLevel': data})
        }
        // Select主键传值改变
        // if (path === TRIAGE_MEMO) {
        //     data = data.value
        // }

        this.dispatch(JsonUtil.json(path, this.state, data))
        if (path === 'mhSplit') {
            this.initState()// 刷新数据
        }
        if (path === TRIAGE_TARGET) {
            let triageTarget = JsonUtil.getJsonByKey(TRIAGE_TARGET, this.state)
            let otherTriageTarget = JsonUtil.getJsonByKey(OTHER_TRIAGE_TARGET, this.state)
            if (triageTarget === otherTriageTarget) {
                message.tip('分诊去向与其他分诊去向不能相同!', 'warning')
                this.dispatch(JsonUtil.json(path, this.state, ''))
                return
            }
        }
        if (path === this.state.OTHER_TRIAGE_TARGET) {
            let triageTarget = JsonUtil.getJsonByKey(TRIAGE_TARGET, this.state)
            let otherTriageTarget = JsonUtil.getJsonByKey(OTHER_TRIAGE_TARGET, this.state)
            if (triageTarget === otherTriageTarget) {
                message.tip('分诊去向与其他分诊去向不能相同!', 'warning')
                this.dispatch(JsonUtil.json(path, this.state, ''))
                return
            }
        }
    }

    /**
     * 业务: 对外值改变(生命体征)
     * @param model 生命体征数据
     */
    vitalSignDataChange = (model) => {
        vitalSignService.setStateJson('data', JsonUtil.arrayToObj(model, 'itemId.id', 'itemValue'))
    }

    /**
     * 业务: 保存时获取所有业务值
     */
    saveGetValue = () => {
        // 1.特殊处理
        // 绿色通道: // 特殊处理: 由于组件原因,要置空多选控件,要将值设置为空
        let greenRoadRecList = JsonUtil.arrayToList(JsonUtil.getJsonByKey('mhSplit.patientVisit.greenRoad', this.state, null), 'greenRoad')
        JsonUtil.json('mhSplit.greenRoadRecList', this.state, greenRoadRecList)
        // 其他方式 // 特殊处理: 由于组件原因,要置空多选控件,要将值设置为空
        let specialSignRecList =
            JsonUtil.arrayToList(JsonUtil.getJsonByKey('mhSplit.patientVisit.specialSign', this.state, null), 'specialSign')
        JsonUtil.json('mhSplit.specialSignRecList', this.state, specialSignRecList)

        // 1.1.生命体征
        const {data} = vitalSignService.state
        let json = JsonUtil.objToArray(data, 'itemId.id', 'itemValue')
        JsonUtil.json('mhSplit.vitalSignRecord', this.state, json)

        // 1.2.评分
        const {scoreing, tags} = scoreService.state

        // 1.2.1.评分
        let scoreRecordList = []
        scoreing.forEach((model: any) => {
            let data: any = {}
            if (model.title === '新增')
                return
            data.scoreType = model.name
            data.scoreValue = model.rule
            data.scoreDescription = model.totalScores
            data.scoreContent = model
            scoreRecordList.push(data)
        })
        JsonUtil.json('mhSplit.scoreRecordList', this.state, scoreRecordList)
        // 1.2.1.新增评分
        let accordingRecordList = []
        tags.forEach((model: any) => {
            let data: any = {}
            data.criterionTypeId = model.typeId
            data.criterionMainId = model.mainId
            data.criterionItemId = model.id
            data.itemDescription = model.itemDescription
            data.emergencyLevel = model.emergencyLevel
            data.typeName = model.name
            accordingRecordList.push(data)
        })
        JsonUtil.json('mhSplit.accordingRecordList', this.state, accordingRecordList)
        // 过敏史
        let allergy = []
        JsonUtil.getJsonByKey('mhSplit.patientVisit.allergy', this.state, []).forEach((model: any) => {
            let data: any = {}
            data.allergyMedicineCode = model.key
            data.allergyMedicineName = model.value
            allergy.push(data)
        })
        JsonUtil.json('mhSplit.patientAllergyHistoryList', this.state, allergy)
    }

    // 查询患者,初始化值
    initState = () => {
        let patientVisit = JsonUtil.getJsonByKey('mhSplit.patientVisit', this.state, {})
        // if (patientVisit === "") return;
        /*=====对外值改变(患者信息):开始===== */
        let allergy = []
        // 过敏史
        JsonUtil.getJsonByKey('mhSplit.patientAllergyHistoryList', this.state, []).forEach((data: any) => {
            let model: any = {}
            model.key = data.allergyMedicineCode
            model.value = data.allergyMedicineName
            allergy.push(model)
        })
        patientVisit.allergy = allergy
        patientVisit.crbFlag = JsonUtil.getJsonByKey('mhSplit.triageRecord.crbFlag', this.state)
        patientVisit.greenRoad = JsonUtil.listToArray(JsonUtil.getJsonByKey('mhSplit.greenRoadRecList', this.state, []), 'greenRoad')
        patientVisit.specialSign = JsonUtil.listToArray(JsonUtil.getJsonByKey('mhSplit.specialSignRecList', this.state, []), 'specialSign')
        patientService.setStateJson('patientVisit', patientVisit)
        /*=====对外值改变(患者信息):结束===== */

        /*=====对外值改变(生命体征):开始===== */
        this.vitalSignDataChange(JsonUtil.getJsonByKey('mhSplit.vitalSignRecord', this.state))
        /*=====对外值改变(生命体征):结束===== */

        /*=====页面显示值改变(分诊级别显示):开始===== */
        const {ACT_TRIAGE_LEVEL, AUTO_TRIAGE_LEVEL} = this.state
        let triageLevel = JsonUtil.getJsonByKey(ACT_TRIAGE_LEVEL, this.state)
        const authTriageLevel = JsonUtil.getJsonByKey(AUTO_TRIAGE_LEVEL, this.state)
        if (!triageLevel || triageLevel === '') triageLevel = authTriageLevel
        triageLevel = triageLevel.toString()
        this.dispatch({triageLevel: triageLevel})
        /*=====页面显示值改变(分诊级别显示):结束===== */

        /*=====对外值改变(评分):开始===== */
        // 评分
        let scoreRecordList = JsonUtil.getJsonByKey('mhSplit.scoreRecordList', this.state, [])
        let scoreing = []
        scoreRecordList.forEach((model) => {
            let data = JSON.parse(model.scoreContent)
            scoreing.push(data)
        })

        let accordingRecordList = JsonUtil.getJsonByKey('mhSplit.accordingRecordList', this.state, [])
        let tags = []
        accordingRecordList.forEach((model) => {
            let data: any = {}
            data.typeId = model.criterionTypeId
            data.mainId = model.criterionMainId
            data.id = model.criterionItemId
            data.content = model.itemDescription
            data.itemDescription = model.itemDescription
            data.rule = model.emergencyLevel
            data.name = model.typeName
            tags.push(data)
            let data1: any = JsonUtil.clone(data)
            data1.title = '新增'

            scoreing.push(data1)
        })
        scoreService.setStateJson2('scoreing', scoreing)
        scoreService.setStateJson2('tags', tags)
        /*=====对外值改变(评分):结束===== */
    }
    /* =====分界线: 对外值改变: 结束===== */

    /**
     * 获取默认分诊详情信息
     */
    loadDefaultInfo = () => {
        this.dispatch({mhSplit: this.state.model})
        this.initState()// 初始化数据
    }

    /* =====分界线: 二、前端处理: 结束===== */
}

export const triageService = new TriageService('triage')
