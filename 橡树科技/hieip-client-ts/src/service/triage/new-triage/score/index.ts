import { BaseService } from 'tools/flux/BaseService'
import { ApiUserSysParamMhCriterion } from 'pkg/api'
import { MhCriterionItemEntityUserSysTriage, MhCriterionMainEntityUserSysTriage, MhCriterionTypeEntityUserSysTriage } from 'pkg/entity'
import { message } from 'pkg/common/message'
import { JsonUtil } from 'tools/api/JsonUtil'
import { triageService } from 'service/triage/new-triage/triage'

export interface ScoreState {
    /**
     * 普通评分打开or关闭
     */
    scoreOpen?: boolean
    /**
     * 控制打开的第几个评分
     */
    scoreTabs?: number
    /**
     * 得分详情
     */
    scoreing?: Array<object>
    /**
     * 得分详情要使用的字段集
     */
    scoreingOption?: object
    /**
     * 评分按钮集
     */
    scoreBtnGroup?: Array<string>
    /**
     * 评分按钮集
     */
    scoreBtnGroup2?: Array<string>
    /**
     * 普通评分基础数据
     */
    scoreitem?: Array<object>
    /**
     * 新增评分已选中的数据
     */
    tags?: Array<object>
    /**
     * 新增评分已选中的数据要使用的字段集
     */
    tagsOption?: object
    /**
     * 分类名字
     */
    typeName?: string
    /**
     * 得分详情中的最小等级
     */
    minLevel?: number
    /**
     * 分类ID
     */
    typeId?: number
    /**
     * 主述ID
     */
    mainId?: number
    /**
     * 判定依据ID
     */
    itemId?: number
    /**
     * 判定依据主诉
     */
    mhCriterionMain?: Array<MhCriterionMainEntityUserSysTriage>
    /**
     * 判定依据分类管理
     */
    mhCriterionType?: Array<MhCriterionTypeEntityUserSysTriage>
    /**
     * 判定依据项目
     */
    mhCriterionItem?: Array<MhCriterionItemEntityUserSysTriage>
    /**
     * 搜索判定依据
     */
    searchFindMainVal?: string
    /**
     * 失败信息
     */
    message?: string
    /**
     * 新增TAB的index
     */
    tabIndex?: number
    /**
     * 判定依据多选集
     */
    judgmentBasisCheck?: Array<object>
}

class ScoreService extends BaseService<ScoreState> {
    defaultState = {
        /**
         * 判定依据主诉
         */
        mhCriterionMain: [],
        /**
         * 判定依据分类管理
         */
        mhCriterionType: [],
        /**
         * 判定依据项目
         */
        mhCriterionItem: [],
        /**
         * 失败信息
         */
        message: '',

        isLogin: true,
        /**
         * 普通评分打开or关闭
         */
        scoreOpen: false,
        /**
         * 控制打开的第几个评分
         */
        scoreTabs: -1,
        /**
         * 得分详情
         */
        scoreing: [],
        /**
         * 得分详情要使用的字段集
         */
        scoreingOption: { value: 'title', level: 'rule', content: 'content' },
        /**
         * 新增评分已选中的数据
         */
        tags: [],
        /**
         * 新增评分已选中的数据要使用的字段集
         */
        tagsOption: { value: 'name', tip: 'itemDescription', classifyId: 'typeId' },
        /**
         * 评分按钮集: 一般
         */
        scoreBtnGroup: ['疼痛评分', '创伤评分', 'GCS评分', 'REMS评分', 'MEWS评分'],
        /**
         * 评分按钮集: 群伤
         */
        scoreBtnGroup2: ['疼痛评分', '创伤评分', 'GCS评分', 'REMS评分', 'MEWS评分', 'START评分'],
        /**
         * 普通评分基础数据
         */
        scoreitem: [
            {
                title: '疼痛评分',
                name: 'ache',
                subtitle: '疼痛评分',
                summary: '当前评分分级为',
                color: '#01BF9D',  // 等级颜色
                radioK: [],      // 记录历史评分
                socregcs: {},       //
                socreothers: {},         // 单个 item ping分
                totalScores: 0,              // 总分
                rule: '',             // 等级
                danger: '',           // 危险程度
                indexes: 0,           // 当前页面下标
                bol: 1, // 是否点击,默认为0 既已点击 所有必点，
            },
            {
                name: 'wound',
                title: '创伤评分',
                subtitle: '评分内容',
                explain: '总分越小，伤情越重；总分14-16分，生存率96%；总分4-13分，抢救效果显著；总分1-3分，死亡率>96%。一般以TS<12分作为重伤的标准。',
                summary: '当前评分分级为',
                color: '#eee',  // 等级颜色
                radioK: {},      // 记录历史评分
                socregcs: {},       //
                socreothers: {},         // 单个 item ping分
                totalScores: 0,              // 总分
                rule: '',             // 等级
                danger: '',           // 危险程度
                indexes: 1,           // 当前页面下标
                bol: 1, // 是否点击,默认为0 既已点击 所有必点，

            },
            {
                name: 'gcs',
                title: 'GCS评分',
                subtitle: '评分内容',
                explain: '昏迷程度以睁眼、语言、运动三者分数加总来评估，正常人的昏迷指数是满分15分，' +
                    '昏迷程度越重者的昏迷指数越低分轻度昏迷：13分到14分。中度昏迷：9分到12分。' +
                    '重度昏迷：3分到8分。低于3分：因插管气切无法发声的重度昏迷者会有2T的评分。',
                summary: '当前评分分级为',
                color: '#eee',
                radioK: {},
                socregcs: {},       //
                socreothers: {},         // 单个 item ping分
                totalScores: 0,
                rule: '',
                danger: '',
                indexes: 2,
                bol: 1,

            },
            {
                name: 'rems',
                title: 'REMS评分',
                subtitle: '评分内容',
                summary: '当前评分分级为',
                color: '#eee',
                radioK: {},
                socregcs: {},       //
                socreothers: {},         // 单个 item ping分
                totalScores: 0,
                rule: '',
                danger: '',
                indexes: 3,
                bol: 1,
                valuation: '',
            },
            {
                name: 'news',
                title: 'MEWS评分',
                subtitle: '评分内容',
                summary: '当前评分分级为',
                color: '#eee',
                radioK: {},
                socregcs: {},       //
                socreothers: {},         // 单个 item ping分
                totalScores: 0,
                rule: '',
                danger: '',
                indexes: 4,
                bol: 1,
            }, {
                name: 'start',
                title: 'Start评分',
                subtitle: '评分内容',
                summary: '当前评分分级为',
                text2: '',
                color: '#FF375B',
                radioK: { walk: '2__否', breathing: '2__否', airway: '2__否' },      // 记录历史评分
                socregcs: {},       //
                socreothers: {},         // 单个 item ping分
                totalScores: '',              // 总分
                rule: '死亡',             // 等级
                danger: '',           // 危险程度
                indexes: 0,           // 当前页面下标
                bol: 1, // 是否点击,默认为0 既已点击 所有必点，
            }
        ],
        /**
         * 分类ID
         */
        typeId: null,
        /**
         * 主述ID
         */
        mainId: null,
        /**
         * 判定依据ID
         */
        itemId: null,
        /**
         * 新增TAB的index
         */
        tabIndex: 0,
        /**
         * 判定依据多选集
         */
        judgmentBasisCheck: []
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    serviceWillMount() {
        this.findAllType()
    }

    /**
     * 判定依据分类管理
     */
    findAllType = () => {
        return ApiUserSysParamMhCriterion.findAllType().then((data) => {
            this.dispatch2({ mhCriterionType: data })
        }).catch(msg => {
            message.tip(msg || '查询判定依据分类管理失败!', 'warning')
        })
    }
    /**
     * 判定依据主诉
     */
    findMainByTypeId = (typeId, inputCode) => {
        return ApiUserSysParamMhCriterion.findMainByTypeId(typeId, inputCode).then((data) => {
            this.dispatch2({ mhCriterionMain: data })
        }).catch(msg => {
            message.tip(msg || '查询判定依据主诉失败!', 'warning')
        })
    }
    /**
     * 判定依据项目
     */
    findItemByMainId = (mainId, inputCode) => {
        return ApiUserSysParamMhCriterion.findItemByMainId(mainId, inputCode).then((data) => {
            this.dispatch2({ mhCriterionItem: data, mainId: mainId })
        }).catch(msg => {
            message.tip(msg || '查询判定依据项目失败!', 'warning')
        })
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /* =====分界线: 病人评分,by:董俊杰: 开始===== */

    /**
     * 打开普通评分
     */
    openScore = (v, tabs?: number) => {
        this.dispatch({ scoreOpen: v, scoreTabs: tabs, tabIndex: 4 })
    }
    /**
     * 得分详情&&点击普通评分
     */
    scoreing = (v) => {
        let value: any = this.clone(v)
        let scoreing: any = this.state.scoreing
        let json = []
        value.forEach((val) => {
            if (val.rule !== '' && val.name !== 'start') {
                json.push(val)
                json[json.length - 1].rule = this.levelSwitch(val.rule)
                json[json.length - 1].emergencyLevel = json[json.length - 1].rule
                json[json.length - 1].content = `${val.title}${val.totalScores}`
            } else if (val.name === 'start' && val.totalScores !== '') {
                json.push(val)
                json[json.length - 1].rule = this.levelSwitch(val.rule)
                json[json.length - 1].emergencyLevel = json[json.length - 1].rule
                json[json.length - 1].content = `${val.title}：${val.totalScores}`
            }
        })
        if (scoreing && scoreing.length) {
            let xz = []
            for (let i = 0; i < scoreing.length; i++) {
                if (scoreing[i].title === '新增') {
                    xz.push(scoreing[i])
                }
            }
            scoreing = [...json, ...xz]
        } else {
            scoreing = []
            scoreing = json
        }
        this.minLevel(scoreing)
        this.dispatch2({ scoreing: scoreing })
    }
    /**
     * 新增评分标签,已选中的
     */
    tagsMethods = (val) => {
        let tags = this.state.tags
        if (!tags || !tags.length) {
            tags = []
        }
        tags.push({ name: this.state.typeName, typeId: this.state.typeId, ...val })
        this.dispatch({ tags: tags })
    }

    /** 搜索判断依据 */
    searchFindMain(e) {
        const v = e.target.value
        this.findItemByMainId(this.state.mainId, v)
        this.dispatch({ searchFindMainVal: v })
        //
    }

    /**
     * 关闭新增评分标签
     */
    tagsClose = (v) => {
        let tags: any = this.state.tags
        let scoreing: any = this.state.scoreing
        for (let i in tags) {
            if (v.itemDescription === tags[i].itemDescription && v.id === tags[i].id) {
                tags.splice(i, 1)
                break
            }
        }
        for (let i in scoreing) {
            if (v.itemDescription === scoreing[i].itemDescription && v.id === scoreing[i].id) {
                scoreing.splice(i, 1)
                break
            }
        }
        this.minLevel(scoreing)
        this.dispatch2({ tags: tags })
    }

    /**
     * 等级转换
     * @param {string} v
     */
    levelSwitch(v) {
        switch (v) {
            case '死亡':
                return 0
            case '一级':
                return 1
            case '二级':
                return 2
            case '三级':
                return 3
            case '四级':
                return 4
            default:
                return v
        }
    }

    /**
     * 删除得分
     * @param {object} v
     */
    scoreingRemove = (v) => {
        let json = this.getState().scoreing
        if (v.title === '新增') {
            this.tagsClose(v)
        } else {
            json.forEach((val: any, key) => {
                if (v.indexes === val.indexes) {
                    json.splice(key, 1)
                }
            })
        }
        this.minLevel(json)
        this.dispatch({ scoreing: json })
    }

    /**
     * 点击判定依据多选框
     */
    judgmentBasisCheck = (v) => {
        this.dispatch2({ judgmentBasisCheck: v })
    }

    /**
     * 点击判定依据确定
     */
    judgmentBasisClick = (v) => {
        let value: any = this.clone(v)
        value.title = '新增'
        value.rule = value.emergencyLevel
        value.content = value.itemDescription
        let scoreing = this.state.scoreing
        if (scoreing) {
            scoreing.push(value)
        } else {
            scoreing = []
            scoreing.push(value)
        }
        this.tagsMethods(v)
        this.minLevel(scoreing)
        this.dispatch({ scoreing: scoreing })
    }

    /**
     * 获取所有得分中最小等级
     */
    minLevel = (data) => {
        let scoreing: any = this.clone(data)
        let sort: any = scoreing.sort((a: any, b: any) => a.emergencyLevel - b.emergencyLevel)
        let minLevel
        if (sort.length) minLevel = sort[0].emergencyLevel
        else minLevel = null
        this.dispatch({ minLevel: minLevel })
        // 改变分诊等级
        triageService.setStateJson(triageService.state.AUTO_TRIAGE_LEVEL, minLevel ? minLevel : '')
    }

    /**
     * 克隆对象
     * @param {object} obj
     * @return {*}
     */
    clone = (obj) => {
        let newobj = obj.constructor === Array ? [] : {}
        if (typeof obj !== 'object') {
            return
        } else {
            for (let i in obj) {
                if (obj.hasOwnProperty(i)) {
                    newobj[i] = typeof obj[i] === 'object' ? this.clone(obj[i]) : obj[i]
                }
            }
        }
        return newobj
    }

    /**
     * tab选项卡事件
     */
    onTabClick = (v, n?) => {
        switch (v) {
            case 0: { // 第1个tab
                if (n) {
                    let judgmentBasisCheck = this.state.judgmentBasisCheck
                    for (let i = 0; i < judgmentBasisCheck.length; i++) {
                        this.judgmentBasisClick(judgmentBasisCheck[i])
                    }
                }
                this.findAllType()
                this.dispatch2({
                    mhCriterionMain: [],
                    mhCriterionItem: [],
                    typeId: null,
                    mainId: null,
                    tabIndex: v
                })
                break
            }
            case 1: { // 第2个tab
                if (n) { // 有传值的情况
                    this.findMainByTypeId(n.id, null)
                    this.dispatch({ typeName: n.groupName, typeId: n.id, tabIndex: v })
                } else if (this.state.tabIndex >= 2 && this.state.typeId) {
                    this.dispatch({ tabIndex: v })
                } else {
                    message.tip('请先选择分类', 'warning')
                }
                break
            }
            case 2: { // 第3个tab
                if (n) { // 有传值的情况
                    this.findItemByMainId(n.id, null)
                    this.dispatch({ tabIndex: v })
                } else if (this.state.tabIndex >= 3 && this.state.mainId) {
                    this.dispatch({ tabIndex: v })
                } else {
                    message.tip('请先选择分类或主诉', 'warning')
                }
                break
            }
            case 3: {
                this.dispatch({ tabIndex: v })
            }
            default:
                break
        }
    }

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
    /* =====分界线: 对外值改变: 结束===== */

    /* =====分界线: 病人评分,by:董俊杰: 结束===== */
    /* =====分界线: 二、前端处理: 结束===== */
}

export const scoreService = new ScoreService('score')
