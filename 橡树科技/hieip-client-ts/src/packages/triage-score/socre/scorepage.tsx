/**
 *     评分 组件
 *     Created by mod on 2017/12/8
 *
 *    使用类型 socreitemtype.tsx
 *
 */

'use strict'

import * as React from 'react'
import * as css from '../style/soceitem.scss'
import { Button, Tabs } from 'antd'
import { Score } from './score'
import { Pain } from '../pain/pain'
import less from '../pain/images/6.png'
import little from '../pain/images/5.png'
import mild from '../pain/images/4.png'
import obvious from '../pain/images/3.png'
import serious from '../pain/images/2.png'
import huge from '../pain/images/1.png'

const TabPane = Tabs.TabPane

/** 等级颜色 */
const gradecolor: string[] = ['', '#FF375B', '#FA8630', '#FFCC19', '#01BF9D']
/**  评分数据 */
const datainfo = {
    ache: {
        data: [
            {
                icon: 'icon-xiayiyeqianjinchakangengduo',
                text: '数字评价量表(NRS)',
                type: 'nrs',
                rightContent: [
                    {
                        application: ['适用对象', '大于七岁、意识清醒：能有效沟通完整表达的人'],
                        painLevel: ['无痛', '', '有点痛', '', '轻微疼痛', '', '疼痛明显', '', '疼痛严重', '', '巨疼痛'],
                        branch: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    }
                ]
            },
            {
                icon: 'icon-xiayiyeqianjinchakangengduo',
                text: 'FLACC SCALE',
                type: 'flacc',
                data: [
                    {
                        application: ['适用对象', '2个月至7岁，不能有效沟通者(意识障碍、痴呆、为重虚弱者、不能完全表达疼痛)'],
                        data: [
                            {
                                name: '面部表情Face',
                                type: 'facial',
                                data: [
                                    { name: '无特定表情或笑容', value: 0 },
                                    { name: '偶尔面部扭曲或皱眉', value: 1 },
                                    { name: '持续颤抖下巴,紧缩下颚,紧皱眉头', value: 2 }
                                ]
                            }, {
                                name: '腿部活动',
                                type: 'legs',
                                data: [
                                    { name: '正常体位或放松状态', value: 0 },
                                    { name: '不适,无法休息,肌肉或神经紧张,肢体间断完全/伸展', value: 1 },
                                    { name: '踢或拉直腿,高张力,扩大肢体弯曲/伸展,发抖', value: 2 }
                                ]
                            }, {
                                name: '体位Activitv',
                                type: 'position',
                                data: [
                                    { name: '安静平稳,体位正常,可顺利移动', value: 0 },
                                    { name: '急促不安,来回移动,紧张,移动犹豫', value: 1 },
                                    { name: '蜷曲或痉挛,来回摆动,头部左右摇动,搓揉身体某部位', value: 2 }
                                ]
                            }, {
                                name: '哭闹Cry',
                                type: 'crying',
                                data: [
                                    { name: '不哭不闹', value: 0 },
                                    { name: '呻吟或啜泣,偶而哭泣,叹息', value: 1 },
                                    { name: '不断哭泣,尖叫或抽泣,呻吟', value: 2 }
                                ]
                            }, {
                                name: '可安慰度',
                                type: 'degree',
                                data: [
                                    { name: '平静,满足,放松,不要求安慰', value: 0 },
                                    { name: '可通过偶尔身体接触消除疑虑,分散注意力', value: 1 },
                                    { name: '安慰有困难', value: 2 }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                icon: 'icon-xiayiyeqianjinchakangengduo',
                text: '面部表情疼痛量表(FPS)',
                type: 'fps',
                rightContent: [
                    {
                        application: ['适用对象', '大于七岁、意识清醒：能有效沟通完整表达的人'],
                        painLevel: [<img key="1" src={less} alt="无痛"/>, '',
                            <img key="2" src={little} alt="有点痛"/>, '',
                            <img key="3" src={mild} alt="轻微疼痛"/>, '',
                            <img key="4" src={obvious} alt="疼痛明显"/>, '',
                            <img key="5" src={serious} alt="疼痛严重"/>, '',
                            <img key="6" src={huge} alt="巨疼痛"/>],
                        branch: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    }
                ]
            }
        ],
        grade: function (score: number): object {
            let rule: string, color: string
            if (score < 4) {
                rule = '四级'
                color = gradecolor[4]
            } else if (score >= 4 && score <= 5) {
                rule = '三级'
                color = gradecolor[3]
            } else if (score >= 6 && score <= 7) {
                rule = '二级'
                color = gradecolor[2]
            } else if (score >= 8) {
                rule = '一级'
                color = gradecolor[1]
            }
            return { rule, color }
        }
    },
    wound: {
        data: [
            {
                name: '',
                type: 'respiratory',
                data: [
                    {
                        name: '呼吸频率(次/分)',
                        type: 'frequency',
                        data: [
                            { name: '10-24', value: 4 },
                            { name: '25-35', value: 3 },
                            { name: '>35', value: 2 },
                            { name: '<10', value: 1 },
                            { name: '0', value: 0 }
                        ]
                    }, {
                        name: '呼吸幅度',
                        type: 'amplitude',
                        data: [
                            { name: '正常', value: 2 },
                            { name: '浅或困难', value: 1 }
                        ]
                    }, {
                        name: '收压缩(mmHg)',
                        type: 'compression',
                        data: [
                            { name: '>90', value: 4 },
                            { name: '70-90', value: 3 },
                            { name: '50-69', value: 2 },
                            { name: '<50', value: 1 },
                            { name: '0', value: 0 }
                        ]
                    }, {
                        name: '毛细血管充盈度',
                        type: 'degree',
                        data: [
                            { name: '正常', value: 2 },
                            { name: '迟缓', value: 1 },
                            { name: '无', value: 0 }
                        ]
                    }
                ]
            }, {
                name: 'GCS',
                type: 'gcs',         // gcs 评分 死值 不可改
                data: [
                    {
                        name: '睁眼',
                        type: 'opeyes',
                        data: [
                            { name: '自发睁眼', value: 4 },
                            { name: '语言吩咐睁眼', value: 3 },
                            { name: '疼痛刺激睁眼', value: 2 },
                            { name: '无睁眼', value: 1 }
                        ]
                    }, {
                        name: '语言',
                        type: 'language',
                        data: [
                            { name: '语言交谈', value: 5 },
                            { name: '言语错乱', value: 4 },
                            { name: '只能说出(不适当)单词', value: 3 },
                            { name: '只能发音', value: 2 },
                            { name: '无发音', value: 1 }
                        ]
                    }, {
                        name: '运动',
                        type: 'motion',
                        data: [
                            { name: '按吩咐动作', value: 6 },
                            { name: '对疼痛刺激定位反应', value: 5 },
                            { name: '对疼痛刺激屈曲反应', value: 4 },
                            { name: '异常屈曲(去皮层状态)', value: 3 },
                            { name: '异常伸展(去脑状态)', value: 2 },
                            { name: '无反应', value: 1 }
                        ]
                    }
                ]
            }
        ],
        grade: function (score: number): object {
            let rule: string, color: string
            if (score >= 14 && score <= 16) {
                rule = '四级'
                color = gradecolor[4]
            } else if (score >= 12 && score <= 13) {
                rule = '三级'
                color = gradecolor[3]
            } else if (score >= 4 && score <= 11) {
                rule = '二级'
                color = gradecolor[2]
            } else if (score <= 3) {
                rule = '一级'
                color = gradecolor[1]
            }
            return { rule, color }
        },
        coreGSC: function (gcsscore: number): number {
            if (gcsscore >= 1 && gcsscore <= 4) {
                return 1
            } else if (gcsscore >= 5 && gcsscore <= 7) {
                return 2
            } else if (gcsscore >= 8 && gcsscore <= 10) {
                return 3
            } else if (gcsscore >= 11) {
                return 4
            } else {
                return 0
            }
        }
    },
    gcs: {
        data: [
            {
                name: '',
                type: 'respiratory',
                data: [
                    {
                        name: '睁眼',
                        type: 'openeyes',
                        data: [
                            { name: '自发睁眼', value: 4 },
                            { name: '语言吩咐睁眼', value: 3 },
                            { name: '疼痛刺激睁眼', value: 2 },
                            { name: '无睁眼', value: 1 }
                        ]
                    }, {
                        name: '语言',
                        type: 'language',
                        data: [
                            { name: '语言交谈', value: 5 },
                            { name: '言语错乱', value: 4 },
                            { name: '只能说出(不适当)单词', value: 3 },
                            { name: '只能发音', value: 2 },
                            { name: '无发音', value: 1 }
                        ]
                    }, {
                        name: '运动',
                        type: 'motion',
                        data: [
                            { name: '按吩咐动作', value: 6 },
                            { name: '对疼痛刺激定位反应', value: 5 },
                            { name: '对疼痛刺激屈曲反应', value: 4 },
                            { name: '异常屈曲(去皮层状态)', value: 3 },
                            { name: '异常伸展(去脑状态)', value: 2 },
                            { name: '无反应', value: 1 }
                        ]
                    }
                ]
            }
        ],
        grade: function (score: number): object {
            let rule: string, color: string
            if (score === 15) {
                rule = '四级'
                color = gradecolor[4]
            } else if (score >= 13 && score <= 14) {
                rule = '三级'
                color = gradecolor[3]
            } else if (score >= 9 && score <= 12) {
                rule = '二级'
                color = gradecolor[2]
            } else if (score <= 8) {
                rule = '一级'
                color = gradecolor[1]
            }
            return { rule, color }
        }
    },
    rems: {
        data: [
            {
                name: 'GCS',
                type: 'gcs',
                data: [
                    {
                        name: '睁眼',
                        type: 'openeyes',
                        data: [
                            { name: '自发睁眼', value: 4 },
                            { name: '语言吩咐睁眼', value: 3 },
                            { name: '疼痛刺激睁眼', value: 2 },
                            { name: '无睁眼', value: 1 }
                        ]
                    }, {
                        name: '语言',
                        type: 'language',
                        data: [
                            { name: '语言交谈', value: 5 },
                            { name: '言语错乱', value: 4 },
                            { name: '只能说出(不适当)单词', value: 3 },
                            { name: '只能发音', value: 2 },
                            { name: '无发音', value: 1 }
                        ]
                    }, {
                        name: '运动',
                        type: 'motion',
                        data: [
                            { name: '按吩咐动作', value: 6 },
                            { name: '对疼痛刺激定位反应', value: 5 },
                            { name: '对疼痛刺激屈曲反应', value: 4 },
                            { name: '异常屈曲(去皮层状态)', value: 3 },
                            { name: '异常伸展(去脑状态)', value: 2 },
                            { name: '无反应', value: 1 }
                        ]
                    }
                ]
            }, {
                name: '',
                type: 'respiratory',
                data: [
                    {
                        name: '脉搏次/分',
                        type: 'pulse',
                        data: [
                            { name: '<40次/分', value: 4 },
                            { name: '40-54次/分', value: 3 },
                            { name: '55-69次/分', value: 2 },
                            { name: '70-109次/分', value: 0 },
                            { name: '110-139次/分', value: 2 },
                            { name: '140-179次/分', value: 3 },
                            { name: '>179次/分', value: 4 }
                        ]
                    }, {
                        name: 'Spo2',
                        type: 'spo2',
                        data: [
                            { name: '<75%', value: 4 },
                            { name: '75-85%', value: 3 },
                            { name: '86-89%', value: 1 },
                            { name: '>89%', value: 0 }
                        ]
                    }, {
                        name: '收压缩',
                        type: 'compression',
                        data: [
                            { name: '70-89mmHg', value: 2 },
                            { name: '90-127mmHg', value: 0 },
                            { name: '130-149mmHg', value: 2 },
                            { name: '150-179mmHg', value: 3 },
                            { name: '>179mmHg', value: 4 }
                        ]
                    }, {
                        name: '呼吸频率',
                        type: 'frequency',
                        data: [
                            { name: '6-9次/分', value: 2 },
                            { name: '10-11次/分', value: 1 },
                            { name: '12-24次/分', value: 0 },
                            { name: '25-34次/分', value: 1 },
                            { name: '35-49次/分', value: 2 },
                            { name: '>49次/分', value: 4 }
                        ]
                    }, {
                        name: '年龄',
                        type: 'age ',
                        data: [
                            { name: '<45岁', value: 0 },
                            { name: '45-54岁', value: 2 },
                            { name: '55-64岁', value: 3 },
                            { name: '65-74岁', value: 5 },
                            { name: '>74岁', value: 6 }
                        ]
                    }
                ]
            }
        ],
        grade: function (score: number): object {
            let rule: string, color: string
            if (score <= 11) {
                rule = '四级'
                color = gradecolor[4]
            } else if (score >= 12 && score <= 17) {
                rule = '二级'
                color = gradecolor[2]
            } else if (score >= 18) {
                rule = '一级'
                color = gradecolor[1]
            }
            return { rule, color }
        },
        rate: function (score: number): string {
            let danger: string
            if (score <= 11) {
                danger = '病死危险率为10%'
            } else if (score >= 12 && score <= 15) {
                danger = '10%<病死危险率<50%'
            } else if (score >= 16 && score <= 17) {
                danger = '病死危险率为50%'
            } else if (score >= 18 && score <= 23) {
                danger = '50%<病死危险率<100%'
            } else if (score >= 24) {
                danger = '病死危险率100%'
            }
            return danger
        },
        coreGSC: function (gcsscore: number): number {
            if (gcsscore >= 1 && gcsscore <= 4) {
                return 4
            } else if (gcsscore >= 5 && gcsscore <= 7) {
                return 3
            } else if (gcsscore >= 8 && gcsscore <= 10) {
                return 2
            } else if (gcsscore >= 11) {
                return 1
            } else {
                return 0
            }
        }
    },
    news: {
        data: [
            {
                name: '',
                type: 'respiratory',
                data: [
                    {
                        name: '心率',
                        type: 'heart',
                        data: [
                            { name: '<40次/分', value: 2 },
                            { name: '41-50次/分', value: 1 },
                            { name: '51-100次/分', value: 0 },
                            { name: '101-110次/分', value: 1 },
                            { name: '111-129次/分', value: 2 },
                            { name: '≥130次/分', value: 3 }
                        ]
                    }, {
                        name: '收压缩',
                        type: 'compression',
                        data: [
                            { name: '≤70mmHg', value: 3 },
                            { name: '71-80', value: 2 },
                            { name: '81-100', value: 1 },
                            { name: '101-199', value: 0 },
                            { name: '≥200mmHg', value: 2 }
                        ]
                    }, {
                        name: '呼吸频率',
                        type: 'frequency',
                        data: [
                            { name: '<9次/分', value: 2 },
                            { name: '9-14次/分', value: 0 },
                            { name: '15-20次/分', value: 1 },
                            { name: '21-29次/分', value: 2 },
                            { name: '≥30次/分', value: 3 }
                        ]
                    }, {
                        name: '体温',
                        type: 'temperature',
                        data: [
                            { name: '<35℃', value: 2 },
                            { name: '35.0-35.4℃', value: 0 },
                            { name: '≥38.5℃', value: 2 }
                        ]
                    }, {
                        name: '意识',
                        type: 'consciousness',
                        data: [
                            { name: '清楚', value: 0 },
                            { name: '对声音有反应', value: 1 },
                            { name: '对疼痛有反应', value: 2 },
                            { name: '无反应', value: 3 }
                        ]
                    }
                ]
            }
        ],
        grade: function (score: number): object {
            let rule: string, color: string
            if (score <= 3) {
                rule = '四级'
                color = gradecolor[4]
            } else if (score === 4) {
                rule = '三级'
                color = gradecolor[3]
            } else if (score >= 5 && score <= 9) {
                rule = '二级'
                color = gradecolor[2]
            } else if (score >= 10) {
                rule = '一级'
                color = gradecolor[1]
            }
            return { rule, color }
        }
    },
    start: {
        data: [
            {
                name: '',
                type: 'start',
                data: [
                    {
                        name: '伤员能否行走',
                        type: 'walk',
                        data: [
                            { name: '是', value: 1 },
                            { name: '否', value: 2 }
                        ]
                    }, {
                        name: '是否还有呼吸',
                        type: 'breathing',
                        data: [
                            { name: '是', value: 1 },
                            { name: '否', value: 2 }
                        ]
                    }, {
                        name: '开放气道，是否还有呼吸',
                        type: 'airway',
                        data: [
                            { name: '是', value: 1 },
                            { name: '否', value: 2 }
                        ]
                    }, {
                        name: '呼吸频率是否≥30/min',
                        type: 'brequency',
                        data: [
                            { name: '是', value: 1 },
                            { name: '否', value: 2 }
                        ]
                    }, {
                        name: '能否触及脉搏',
                        type: 'pulse',
                        data: [
                            { name: '是', value: 1 },
                            { name: '否', value: 2 }
                        ]
                    }, {
                        name: '评估意识状态，能否听命令做简单动作',
                        type: 'consciousness',
                        data: [
                            { name: '是', value: 1 },
                            { name: '否', value: 2 }
                        ]
                    }
                ]
            }
        ],
        grade: function (score: number): object {
            let rule: string, color: string
            if (score <= 3) {
                rule = '四级'
                color = gradecolor[4]
            } else if (score === 4) {
                rule = '三级'
                color = gradecolor[3]
            } else if (score >= 5 && score <= 9) {
                rule = '二级'
                color = gradecolor[2]
            } else if (score >= 10) {
                rule = '一级'
                color = gradecolor[1]
            }
            return { rule, color }
        }
    }
}

const scoreitem = [
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
        bol: 1 // 是否点击,默认为0 既已点击 所有必点，
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
        bol: 1 // 是否点击,默认为0 既已点击 所有必点，

    },
    {
        name: 'gcs',
        title: 'GCS评分',
        subtitle: '评分内容',
        explain: '昏迷程度以睁眼、语言、运动三者分数加总来评估，正常人的昏迷指数是满分15分，昏迷程度越重者的昏迷指数越低分轻度昏迷：13分到14分。中度昏迷：9分到12分。重度昏迷：3分到8分。低于3分：因插管气切无法发声的重度昏迷者会有2T的评分。',
        summary: '当前评分分级为',
        color: '#eee',
        radioK: {},
        socregcs: {},       //
        socreothers: {},         // 单个 item ping分
        totalScores: 0,
        rule: '',
        danger: '',
        indexes: 2,
        bol: 1

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
        valuation: ''
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
        bol: 1
    },
    {
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
        bol: 1 // 是否点击,默认为0 既已点击 所有必点，
    }
]

const dt = {
    color: '#eee',  // 等级颜色
    radioK: {},      // 记录历史评分
    socregcs: {},       //
    socreothers: {},         // 单个 item ping分
    totalScores: 0,              // 总分
    rule: '',             // 等级
    danger: ''           // 危险程度
}

/** state */
interface ScorePageState {
    active: number
    scoreItem: any
    /** 确定是否可点击 */
    isOk: boolean
    /** 重置是否可点击 */
    reset: boolean
}

/** 评分汇总 */
export class ScorePage extends React.Component<any, ScorePageState> {
    ttsoce = null

    constructor(props) {
        super(props)
        this.state = {
            isOk: !0,
            reset: !0,
            active: this.props.active || 0,
            scoreItem: this.props.scoreitem || scoreitem
        }
        this.onOKis = this.onOKis.bind(this)
        this.handOk = this.handOk.bind(this)
        this.smtable = this.smtable.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClickIs = this.onClickIs.bind(this)
        this.handReset = this.handReset.bind(this)
    }

    /** 渲染前 */
    componentWillMount() {
        const { active } = this.state
        if (!active || active === 5) {
            this.setState({ isOk: !1, reset: !1 })
        } else {
            const result = judgeEqual(datainfo[scoreitem[active].name].data, scoreitem[active].radioK)
            if (result.result) {
                this.setState({ reset: !1, isOk: !1 })
            } else {
                this.setState({ reset: result.reset ? !1 : !0, isOk: !0 })
            }
        }
    }

    /** 初始化 */
    componentDidMount() {
        // ttsoce = this.refs["ttsoce"] as Element
    }

    /**
     * @returns {any}
     */
    render(): JSX.Element {
        const { scoreItem, isOk, reset } = this.state
        return (
            <div className={css.score_trem}>
                <Tabs defaultActiveKey={this.state.active.toString()} onChange={this.callback}>
                    {scoreItem.map((row: any, i) => {
                        return <TabPane tab={row.title} key={i}>
                            {i !== 0 ? <Score
                                    data={datainfo[row.name]}
                                    onChange={this.onChange}
                                    other={row}/>
                                :
                                <Pain data={datainfo[row.name]}
                                      onChange={this.onChange}
                                      other={row}
                                      onClickIs={this.onClickIs}
                                      onOKis={this.onOKis}
                                      smtable={this.smtable}
                                      ref={(x) => this.ttsoce = x}/>}
                        </TabPane>
                    })}
                </Tabs>
                <div className={css.socre_btn}>
                    <Button type="primary" onClick={this.handOk} disabled={isOk}>确定</Button>
                    <Button type="primary" onClick={this.handReset} disabled={reset}>重置</Button>
                </div>
            </div>
        )
    }

    /** 确定 返回结果 */
    private handOk() {
        const { active, scoreItem } = this.state
        /** 判读是否是 疼痛评分 */
        if (!active) {
            let tt: any = this.ttsoce as Element
            let rest: any = tt.handleOk()
            scoreItem[active] = rest
            this.props.dataCallBack(scoreItem)
        } else {
            this.props.dataCallBack(scoreItem)
        }
    }

    /** 保存radio 点击结果 */
    private onChange(obj) {
        const { active, scoreItem } = this.state
        scoreItem[active] = obj
        let data = datainfo[obj.name].data
        if (judgeEqual(data, obj.radioK).result) {
            this.setState({ isOk: !1, scoreItem })
        } else {
            this.setState({ reset: !1, scoreItem })
        }
    }

    /** 重置 清空点击 */
    private handReset() {
        const { active, scoreItem } = this.state
        /** 清空 恢复默认值 */
        scoreItem[active].color = '#eee'
        scoreItem[active].radioK = {}
        scoreItem[active].socregcs = {}
        scoreItem[active].socreothers = {}
        scoreItem[active].totalScores = 0
        scoreItem[active].danger = ''
        scoreItem[active].rule = ''
        /** 判读是否是 疼痛评分 */
        if (!active) {
            let tt: any = this.ttsoce as Element
            tt.handleReset(dt)
            this.setState({ scoreItem, isOk: !0, reset: !0 })
        } else {
            this.setState({ scoreItem, isOk: !0, reset: !0 })
        }
    }

    /** 点击评分导航回掉 判断按钮是否可点 */
    private callback = (key) => {
        const k = parseInt(key, 0)
        const { scoreItem } = this.state
        /** 评分 */
        if (k) {
            if (k === 5) {
                this.setState({ scoreItem, isOk: !1, reset: !1 })
            } else {
                let data = datainfo[scoreItem[k].name].data
                const result = judgeEqual(data, scoreItem[k].radioK)
                if (result.result) {
                    this.setState({ active: k, reset: !1, isOk: !1, scoreItem })
                } else {
                    this.setState({ active: k, reset: result.reset ? !1 : !0, isOk: !0, scoreItem })
                }
            }
        } else {
            let tt: any = this.ttsoce as Element
            if (tt) {
                tt.activebtn()
            } else {
                this.setState({ active: k, reset: !1, isOk: !1 })
            }
        }
    }

    /** 疼通评分 菜单点击回掉* */
    private smtable(num?: any): void {
        if (num.result && num.reset === 0) {
            this.setState({ reset: !1, isOk: !1 })
        } else {
            if (num.result) {
                this.setState({ reset: !1, isOk: !1 })
            } else {
                this.setState({ reset: !0, isOk: !0 })
            }
        }
    }

    /** 改变 疼痛评分点击状态 */
    private onClickIs(rsult: any): void {
        if (rsult.result) {
            this.setState({ isOk: !1 })
        } else if (rsult.reset) {
            this.setState({ reset: !1 })
        }
    }

    /** 改变确定按钮状态 */
    private onOKis(): void {
        this.setState({ isOk: !1, reset: !1 })
    }
}

/**
 * 判断length是否相等
 * @param arr
 * @param {Object} obj
 */
function judgeEqual(arr: any = [], obj: object = {}): any {
    let length: number = 0
    let reset: number = 0
    arr.map(row => {
        row.data.map(v => {
            length++
        })
    })

    Object.keys(obj).forEach(v => {
        reset++
    })
    // Object.keys(obj).map((v) => reset++)
    let result: boolean = length === reset
    return { result, reset }
}
