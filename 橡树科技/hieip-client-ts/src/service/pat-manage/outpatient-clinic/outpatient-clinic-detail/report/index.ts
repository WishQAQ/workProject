import {BaseService} from 'tools/flux/BaseService'
import {loginService} from 'service/user/login'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import moment from 'moment'
import {MhPatientVisitModelEntitySplit, OutpPatsEntityPatManageOutp} from 'pkg/entity'
import {outpatientClinicListService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-list'
import {ApiPatManageExamReport} from 'pkg/api'

export interface OutpatientClinicDetailReportState {
    operations?: any,
    rowDataExam?: any,
    rowDataInspect?: any,
    rowDataInspectDetail?: any,
    rowDataInspectContent?: any,
    examTitle?: any,
    examBody?: any,
    inspectTitle?: any,
    examDetailList?: any,
    inspectContentOption?: any,// echarts 内容
    isShowTrendBox?: any, // 是否显示趋势图弹框
    isShowTrendBoxTop?: any, // 趋势图弹框内联样式高度
    trendBoxDisplace?: any, // 控制表格是否位移
}

class OutpatientClinicDetailReportService extends BaseService<OutpatientClinicDetailReportState> {

    trendAgApi ?: any // 趋势图表格Api

    defaultState = {
        operations: '1',
        rowDataExam: [
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
        ],
        rowDataInspect: [
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
        ],
        rowDataInspectDetail: [
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
            {
                theme: '感染三项检测',
                status: '正常',
                applyTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            },
        ],
        rowDataInspectContent: [],
        isShowTrendBox: false,
        isShowTrendBoxTop: 0,
        examDetailList: [
            {name: '右踝部双足跟肿胀，触压痛，活动受限'},
            {name: '右踝部双足跟肿胀，触压痛，活动受限'},
            {name: '右踝部双足跟肿胀，触压痛，活动受限'},
            {name: '右踝部双足跟肿胀，触压痛，活动受限'},
        ],
        inspectContentOption: null,
        trendBoxDisplace: false
    }

    serviceWillMount() {
        let data = []
        for (let i = 0; i <= 50; i++) {
            data.push(
                {
                    theme: '不加热血反应素试验(TRUST)',
                    status: '阴性',
                    applyTime: '',
                    unit: 'PEIU/ML',
                    reference: '0-10',
                }
            )
        }
        this.dispatch2({
            rowDataInspectContent: data
        })
    }

    /**
     * 加载检查数据
     */
    // loadExamReportView = ()=>{
    //     ApiPatManageExamReport.loadExamReportView().then((data)=>{
    //         console.log(data)
    //     })
    // }

    /**
     * 设置趋势图的内容，设置趋势图的位置，显示趋势图弹框
     * @param props
     */
    setInspectContentOption = (e, props) => {
        // 表格到浏览器顶部的高度为220px
        // 弹框高289px
        let scrollHeight, height
        let mouseHeight = e.clientY
        if (this.trendAgApi.api.getVerticalPixelRange().top > 0) {
            scrollHeight = 26 - ((this.trendAgApi.api.getVerticalPixelRange().top) % 26) !== 26 ?
                26 - ((this.trendAgApi.api.getVerticalPixelRange().top) % 26) : 0
            mouseHeight -= scrollHeight
            height = e.clientY - ((mouseHeight - 220) % 26) + 30
        } else {
            height = mouseHeight - ((mouseHeight - 220) % 26) + 30
        }
        if (window.innerHeight < (height + 289)) {
            this.dispatch2({
                trendBoxDisplace: true
            })
        } else {
            this.dispatch2({
                trendBoxDisplace: false
            })
        }
        this.dispatch2({
            isShowTrendBoxTop: height,
            inspectContentOption: {
                title: {
                    text: '参考值',
                    padding: [19, 0, 0, 19],
                    textStyle: {
                        fontSize: 12,
                        color: '#353535'
                    }
                },
                grid: {
                    left: 14,
                    right: 14,
                    bottom: 20,
                    top: 44,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07'],
                    axisTick: {
                        alignWithLabel: true,
                        inside: true,
                    },
                    axisLabel: {
                        margin: 12,
                        color: '#353535'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#cdcdcd'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#353535'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#cdcdcd'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e1e1e1'
                        }
                    }
                },
                series: [
                    {
                        data: ['30.5', '50.6', '40.2', '50.6', '40.2', '60.8', '50.6'],
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: '#ff8787'
                        },
                        itemStyle: {
                            color: '#ff8787'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }
                ]
            },
            isShowTrendBox: true,
        })
    }

    /**
     * 关闭趋势图，清空趋势图的内容
     */
    showTrendBox = () => {
        this.dispatch({
            isShowTrendBox: false,
            inspectContentOption: []
        })
    }

    /**
     * 检查项目：选择某一行
     * @param e
     */
    handleClick = (e) => {
        // console.log('click ', e)
    }

    /**
     * 报告切换（检查 <=> 检验）
     * @param key
     */
    changeReport = (key) => {
        this.dispatch({
            operations: key
        })
    }

    // 加载趋势图表格API
    loadTrendApi = (params) => {
        this.trendAgApi = params
    }
}

export const outpatientClinicDetailReportService = new OutpatientClinicDetailReportService('outpatientClinicDetailReportService')