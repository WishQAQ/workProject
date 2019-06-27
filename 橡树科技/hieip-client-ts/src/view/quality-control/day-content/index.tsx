/**
 * 质控统计类型为‘日’的展示页面内容
 * create by wx
 */
import React from 'react'
import * as style from './style/index.scss'
import {IconFont} from 'pkg/common/icon'
import {Echarts} from 'pkg/common/quality-control-echarts'
import {Radio} from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {qualityControlService, QualityControlState} from 'service/quality-control'

interface Option {
    type?: Array<string>,// 图表的类型
    isAnnular?: boolean, // 是否是环形pie类型
    color?: Array<string>,// 每个图表中要用的颜色
    barXData?: Array<string>, // bar柱形图中X轴显示数据
    data?: Array<any>,// 显示数据
    legend?: any,// 图列数据
    stack?: boolean,// 是否堆叠
    stackData?: Array<Array<any>>,// 堆叠显示数据
}

export default class QualityControlDay extends React.Component<any,any> {
    // title = '质控统计类型选择为日的页面'
    // // qualityControlService = qualityControlService

    echOption1 = {
        color: ['#3db5e7'],
        grid: {
            left: 22,
            right: 22,
            bottom: 16,
            top: 20,
            containLabel: true
        },
        tooltip: {
            backgroundColor: '#fff',
            textStyle: {
                fontSize: 12
            },
            padding: [8, 12],
            formatter: function (params) {
                return `<div style="color:${params.color}">${params.name}<br/><span style="font-size: 16px">${params.value}</span></div>`
            },
            position: function (point, params, dom, rect, size) {
                // 固定在顶部以上5px的位置
                return [rect.x - (size.contentSize[0] - rect.width) / 2, rect.y - size.contentSize[1] - 5]
            },
            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);text-align:center'
        },
        xAxis: {
            data: ['皮肤科', '儿科', '神经内科', '神经外科', '胸痛', '妇科'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(200,200,200,0)', 'rgba(246,246,246,1)']
                }
            }
        },
        dataZoom: [{ // 缩放效果
            type: 'inside',
            show: true
        }],
        series: [
            {
                name: '分诊科室去向',
                type: 'bar',
                data: [380, 520, 480, 570, 480, 380],
                barWidth: 30,
                label: {
                    show: true,
                    position: 'top',
                    distance: 5
                }
            }
        ]
    }
    echOption2 = {
        grid: {
            left: 22,
            right: 22,
            bottom: 16,
            top: 20,
            containLabel: true
        },
        tooltip: {},
        xAxis: {
            data: ['一级(红区)', '二级(红区)', '三级(黄区)', '四级(绿区)'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(200,200,200,0)', 'rgba(246,246,246,1)']
                }
            }
        },
        series: [
            {
                name: '分诊分级分布',
                type: 'bar',
                data: [1, 200, 480, 570],
                barWidth: 30,
                label: {
                    show: true,
                    position: 'top',
                    distance: 5
                },
                itemStyle: {
                    color: function (params) {
                        var colorList = ['#FF375B', '#FA8630', '#EEB815', '#01BF9D']
                        return colorList[params.dataIndex]
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    textStyle: {
                        fontSize: 12
                    },
                    padding: 12,
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);text-align:center',
                    formatter: function (params) {
                        return `<span style="color:${params.color}">${params.name}</span>` +
                            `<br/><span style="font-size: 16px;color:${params.color}">${params.value}</span>`
                    },
                    position: function (point, params, dom, rect, size) {
                        // 固定在顶部以上5px的位置
                        return [rect.x - (size.contentSize[0] - rect.width) / 2, rect.y - size.contentSize[1] - 5]
                    }
                }
            },
            {
                type: 'pie',
                center: ['80%', 55],
                radius: 50,
                hoverOffset: 5,
                selectedMode: 'single',
                startAngle: 300, // 开始角度
                selectedOffset: 2,
                data: [
                    {
                        value: 380,
                        name: '红区'
                    },
                    {
                        value: 480,
                        name: '黄区'
                    },
                    {
                        value: 570,
                        name: '绿区'
                    }],
                itemStyle: {
                    color: function (params) {
                        var colorList = ['#FF375B', '#EEB815', '#01BF9D']
                        return colorList[params.dataIndex]
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    textStyle: {
                        fontSize: 12
                    },
                    padding: 12,
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);text-align:center',
                    formatter: function (params) {
                        return `<span style="color:${params.color}">${params.name}人数</span>` +
                            `<br/><span style="font-size: 16px;color:${params.color}">${params.value}</span>`
                    }
                }
            }
        ]
    }
    echOption3 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                shadowStyle: {
                    opacity: 0.2
                }
            },
            backgroundColor: '#fff',
            padding: [8, 12],
            textStyle: {
                color: '#353535',
                fontSize: 12
            },
            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12)',
            formatter: function (params) {
                let html = ''
                params.forEach((obj, i) => {
                    if (i === 0) {
                        html += `<span style="font-weight: bold">${obj.name}</span><br/>` +
                            `<span style="display: inline-block;margin-right: 5px;width: 15px;height: 9px;background:${obj.color}">` +
                            `</span><span>${obj.seriesName}:${obj.value}</span><br/>`
                    } else {
                        html += `<span style="display: inline-block;margin-right: 5px;width: 15px;height: 9px;background:${obj.color}">` +
                            `</span><span>${obj.seriesName}:${obj.value}</span><br/>`
                    }
                })
                return html
            }
        },
        legend: {
            data: [{name: '男性', icon: 'rect'}, {name: '女性', icon: 'rect'}, {name: '未知', icon: 'rect'}],
            x: 60,
        },
        color: ['#3DB5E7', '#FF8E8E', '#9DC4C9'],
        grid: {
            left: 22,
            right: 22,
            bottom: 16,
            top: 50,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['5岁以下', '5-14岁', '15-29岁', '30-44岁', '45-59岁', '60-74岁', '75-84岁', '85岁以上']
        },
        yAxis: {
            type: 'value',
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(246,246,246,1)', 'rgba(200,200,200,0)']
                }
            }
        },
        series: [
            {
                name: '男性',
                type: 'bar',
                stack: '堆叠', // stack值一样的堆叠在一起
                barWidth: 30,
                data: [20, 50, 20, 135, 105, 256, 576, 858],
            },
            {
                name: '女性',
                type: 'bar',
                stack: '堆叠',
                barWidth: 30,
                data: [10, 59, 35, 201, 135, 411, 354, 566]
            },
            {
                name: '未知',
                type: 'bar',
                stack: '堆叠',
                barWidth: 30,
                data: [2, 15, 2, 45, 5, 30, 7, 50]
            }
        ]
    }
    echOption4 = {
        color: ['#3DB5E7', '#FF8E8E', '#9DC4C9'],
        tooltip: {
            backgroundColor: '#fff',
            padding: [8, 12],
            textStyle: {
                fontSize: 12
            },
            formatter: function (params) {
                return `<div style="color:${params.color}">${params.name}占比<br/><span style="font-size: 16px">${params.value}</span></div>`
            },
            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);text-align:center',
        },
        grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            containLabel: true
        },
        series: [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: [40, 50],
                hoverOffset: 5,
                selectedMode: 'single',
                startAngle: 300, // 开始角度
                selectedOffset: 2,
                data: [
                    {
                        value: 380,
                        name: '男性'
                    },
                    {
                        value: 480,
                        name: '女性'
                    },
                    {
                        value: 570,
                        name: '未知'
                    }]
            }
        ]
    }
    echOption5 = {
        grid: {
            left: 22,
            right: 22,
            bottom: 16,
            top: 20,
            containLabel: true
        },
        series: [
            {
                name: '准确率',
                type: 'gauge',
                splitNumber: 10,
                radius: '85%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#D3767B'], [0.8, '#55A5DB'], [1, '#20B7BB']],
                        width: 10,
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                },
                title: {
                    // 其余属性默认使用全局文本样式
                    fontWeight: 'bolder',
                    fontSize: 16,
                    fontStyle: 'italic'
                },
                detail: {
                    // 其余属性默认使用全局文本样式
                    formatter: '{value}%',
                    fontWeight: 'bolder',
                },
                data: [{value: 95, name: '准确率'}]
            }
        ]
    }
    echOption6 = {
        legend: {
            data: ['A', 'B', 'C']
        },
        grid: {
            left: 22,
            right: 22,
            bottom: 16,
            top: 20,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis'
        },
        angleAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        },
        radiusAxis: {},
        polar: {},
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a'
        }, {
            type: 'bar',
            data: [2, 4, 6, 1, 3, 2, 1],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a'
        }, {
            type: 'bar',
            data: [1, 2, 3, 4, 1, 2, 5],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a'
        }]
    }

    isTable = [false, false]
    dataOption1 = {
        type: ['bar'],
        color: ['#3db5e7'],
        barXData: ['皮肤科', '儿科', '神经内科', '神经外科', '胸痛', '妇科'],
        data: [380, 520, 480, 570, 480, 380]
    }
    dataOption2 = {
        type: ['bar'],
        color: ['#7DAAAF'],
        barXData: ['心血管', '孕产妇', '急性心梗', '创伤', '脑出血'],
        data: [380, 200, 300, 570, 450]
    }
    // 堆叠bar
    dataOption4 = {
        type: ['bar'],
        stack: true,// 是否堆叠
        barXData: ['5岁以下', '5-14岁', '15-29岁', '30-44岁', '45-59岁', '60-74岁', '75-84岁', '85岁以上'],
        stackData: [[20, 50, 20, 135, 105, 256, 576, 858], [10, 59, 35, 201, 135, 411, 354, 566], [2, 15, 2, 45, 5, 30, 7, 50]],
        color: ['#3DB5E7', '#FF8E8E', '#9DC4C9'],
        legend: {
            data: [{name: '男性', icon: 'rect'}, {name: '女性', icon: 'rect'}, {name: '未知', icon: 'rect'}],
            position: 'left',
        },
    }
    // 准确率仪表
    dataOption5 = {
        type: ['gauge'],
        data: [{value: 98, name: '准确率'}]
    }
    dataOption6 = {
        type: ['pie'],
        isAnnular: true,// 是环形
        color: ['#A86565', '#307396', '#F18709', '#9DC4C9'],
        data: [{name: '群伤人员', value: 2500}, {name: '三无人员', value: 500}, {name: '发热门诊', value: 1200}, {
            name: '其他',
            value: 1000
        }],
        legend: {
            position: 'left',
            orient: 'vertical',
            data: [
                {name: '群伤人员', icon: 'circle'},
                {name: '三无人员', icon: 'circle'},
                {name: '发热门诊', icon: 'circle'},
                {name: '其他', icon: 'circle'},
            ]
        }
    }
    dataOption7 = {
        type: ['pie'],
        isAnnular: false,// 是环形
        color: ['#FF7F57', '#EEB815'],
        data: [{name: '挂号后补分诊', value: 2500}, {name: '其他', value: 1550}],
        legend: {
            position: 'left',
            orient: 'vertical',
            data: [
                {name: '挂号后补分诊', icon: 'circle'},
                {name: '其他', icon: 'circle'},
            ]

        }
    }

    setEchOption = (optiondata: Option) => {
        let echOption: any = {}
        if (optiondata.type[0] === 'bar') { // 如果只画柱形图
            echOption = {
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: optiondata.barXData
                },
                yAxis: {
                    splitArea: { // 背景颜色
                        show: true,
                        areaStyle: {
                            color: ['rgba(200,200,200,0)', 'rgba(246,246,246,1)']
                        }
                    }
                },
                dataZoom: [{ // 缩放效果
                    type: 'inside',
                    show: true
                }],
                series: []
            }
            if (optiondata.stack) { // 如果是堆叠
                echOption.tooltip = {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            opacity: 0.2
                        }
                    },
                    backgroundColor: '#fff',
                    padding: [8, 12],
                    textStyle: {
                        color: '#353535',
                        fontSize: 12
                    },
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12)',
                    formatter: function (params) {
                        let html = ''
                        params.forEach((obj, i) => {
                            if (i === 0) {
                                html += `<span style="font-weight: bold">${obj.name}</span><br/>` +
                                    `<span style="display: inline-block;margin-right: 5px;width: 15px;height: 9px;` +
                                    `background:${obj.color}">` +
                                    `</span><span>${obj.seriesName}:${obj.value}</span><br/>`
                            } else {
                                html += `<span style="display: inline-block;margin-right: 5px;width: 15px;` +
                                    `height: 9px;background:${obj.color}">` +
                                    `</span><span>${obj.seriesName}:${obj.value}</span><br/>`
                            }
                        })
                        return html
                    }
                }
                echOption.xAxis.type = 'category'
                optiondata.stackData.forEach((item, i) => {
                    let series = {
                        name: optiondata.legend.data[i].name,
                        type: 'bar',
                        stack: '堆叠', // stack值一样的堆叠在一起
                        barWidth: 30,
                        data: item,
                    }
                    echOption.series.push(series)
                })
            } else {
                echOption.tooltip = {
                    backgroundColor: '#fff',
                    textStyle: {
                        fontSize: 12
                    },
                    padding: [8, 12],
                    formatter: function (params) {
                        return `<div style="color:${params.color}">${params.name}<br/>` +
                            `<span style="font-size: 16px">${params.value}</span></div>`
                    },
                    position: function (point, params, dom, rect, size) {
                        // 固定在顶部以上5px的位置
                        return [rect.x - (size.contentSize[0] - rect.width) / 2, rect.y - size.contentSize[1] - 5]
                    },
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);text-align:center;'
                }
                echOption.series = [
                    {
                        type: 'bar',
                        barWidth: 30,
                        label: {
                            show: true,
                            position: 'top',
                            distance: 5
                        },
                        data: optiondata.data
                    }
                ]
            }
            if (optiondata.color) {// 如果柱形图的颜色
                echOption.color = []
                echOption.color = optiondata.color
            }
            if (optiondata.legend) { // 判断是否需要图列
                echOption.legend = {}
                if (optiondata.legend.position === 'left') {
                    echOption.legend.left = 22
                }
                if (optiondata.legend.orient) {
                    echOption.legend.orient = optiondata.legend.orient
                }
                if (optiondata.legend.data) {
                    echOption.legend.data = optiondata.legend.data
                }
            }
        }
        else if (optiondata.type[0] === 'pie') {
            echOption = {
                tooltip: {},
                series: [
                    {
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: '80%',
                        hoverOffset: 5,
                        selectedMode: 'single',
                        startAngle: 300, // 开始角度
                        selectedOffset: 2,
                        tooltip: {
                            backgroundColor: '#fff',
                            textStyle: {
                                fontSize: 12
                            },
                            padding: 12,
                            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);text-align:center',
                            formatter: function (params) {
                                return `<span style="color:${params.color}">${params.name}人数</span>` +
                                    `<br/><span style="font-size: 16px;color:${params.color}">${params.value}</span>`
                            }
                        }
                    }
                ]
            }
            if (optiondata.isAnnular) {// 如果是环形
                echOption.series[0].radius = ['60%', '80%']
            }
            if (optiondata.color) {// 如果柱形图的颜色
                echOption.color = optiondata.color
            }
            if (optiondata.legend) { // 判断是否需要图列
                echOption.legend = {
                    itemWidth: 10,
                    itemHeight: 10,
                }
                if (optiondata.legend.position === 'left') { // 图列位置
                    echOption.legend.left = 22
                }
                if (optiondata.legend.orient) {
                    echOption.legend.orient = optiondata.legend.orient
                }
                if (optiondata.legend.data) {
                    echOption.legend.data = optiondata.legend.data
                }
            }
            echOption.series[0].data = optiondata.data
        }
        else if (optiondata.type[0] === 'gauge') {
            echOption = {
                series: [
                    {
                        type: 'gauge',
                        splitNumber: 10,
                        radius: '85%',
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.2, '#D3767B'], [0.8, '#55A5DB'], [1, '#20B7BB']],
                                width: 10,
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 15,        // 属性length控制线长
                        },
                        splitLine: {           // 分隔线
                            length: 20,         // 属性length控制线长
                        },
                        title: {
                            // 其余属性默认使用全局文本样式
                            fontWeight: 'bolder',
                            fontSize: 16,
                            fontStyle: 'italic'
                        },
                        detail: {
                            // 其余属性默认使用全局文本样式
                            formatter: '{value}%',
                            fontWeight: 'bolder',
                        }
                    }
                ]
            }
            echOption.series[0].data = optiondata.data
        }
        echOption.grid = {
            left: 22,
            right: 22,
            bottom: 16,
            top: 20,
            containLabel: true
        }
        if (optiondata.legend) {
            echOption.grid.top = 50
        }
        return echOption
    }

    render() {
        return (
            <div className={style.echartsWrap}>
                <div className={`${style.echartsContent} ${style.left}`}>
                    <div className={style.contentHeader}>
                        <span>分诊科室去向</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    {
                        this.isTable[0] ?
                            (
                                <div className={style.echartsTable}>
                                    <div className={style.table}>
                                        <div style={{width: '70px'}}>
                                            <div>
                                                <svg className={style.svg}>
                                                    <text x="5%" y="20" fill="#353535">数量</text>
                                                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#e1e1e1"
                                                          strokeWidth="1"/>
                                                    <text x="60%" y="15" fill="#353535">科室</text>
                                                </svg>
                                            </div>
                                            <div>总数</div>
                                        </div>
                                        <div style={{width: `calc((100% - 70px)/${6})`}}>
                                            <div>
                                                皮肤科
                                            </div>
                                            <div>380</div>
                                        </div>
                                        <div style={{width: `calc((100% - 70px)/${6})`}}>
                                            <div>
                                                皮肤科
                                            </div>
                                            <div>380</div>
                                        </div>
                                        <div style={{width: `calc((100% - 70px)/${6})`}}>
                                            <div>
                                                皮肤科
                                            </div>
                                            <div>380</div>
                                        </div>
                                        <div style={{width: `calc((100% - 70px)/${6})`}}>
                                            <div>
                                                皮肤科
                                            </div>
                                            <div>380</div>
                                        </div>
                                        <div style={{width: `calc((100% - 70px)/${6})`}}>
                                            <div>
                                                皮肤科
                                            </div>
                                            <div>380</div>
                                        </div>
                                        <div style={{width: `calc((100% - 70px)/${6})`}}>
                                            <div>
                                                皮肤科
                                            </div>
                                            <div>380</div>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            (
                                <Echarts echOption={this.setEchOption(this.dataOption1)}
                                         echClassName={style.echarts}/>
                            )
                    }
                </div>
                <div className={`${style.echartsContent} ${style.right}`}>
                    <div className={style.contentHeader}>
                        <span>分诊绿色通道人员统计</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="c"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.setEchOption(this.dataOption2)}
                             echClassName={style.echarts}/>
                </div>
                <div className={`${style.echartsContent} ${style.left}`}>
                    <div className={style.contentHeader}>
                        <span>分诊分级分布</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.echOption2}
                             echClassName={style.echarts}/>
                </div>
                <div className={`${style.echartsContent} ${style.right}`}>
                    <div className={style.contentHeader}>
                        <span>分诊年龄分布统计</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.setEchOption(this.dataOption4)}
                             echClassName={style.echarts}/>
                    <Echarts echOption={this.echOption4}
                             echClassName={style.echartsS}/>
                </div>
                <div className={`${style.echartsContent} ${style.echartsContentS} ${style.left}`}>
                    <div className={style.contentHeader}>
                        <span>分诊准确率统计</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.setEchOption(this.dataOption5)}
                             echClassName={style.echarts}/>
                </div>
                <div className={`${style.echartsContent} ${style.echartsContentS} ${style.center}`}>
                    <div className={style.contentHeader}>
                        <span>分诊群伤、三无、发热门诊人员统计</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.setEchOption(this.dataOption6)}
                             echClassName={style.echarts}/>
                </div>
                <div className={`${style.echartsContent} ${style.echartsContentS} ${style.right}`}>
                    <div className={style.contentHeader}>
                        <span>挂号后补分诊分布</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.setEchOption(this.dataOption7)}
                             echClassName={style.echarts}/>
                </div>
                <div className={`${style.echartsContent} ${style.echartsContentS} ${style.center}`}>
                    <div className={style.contentHeader}>
                        <span>分诊准确率统计</span>
                        <RadioGroup defaultValue="a">
                            <RadioButton value="a"><IconFont iconName={'icon-tubiaoqiehuan'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="b"><IconFont iconName={'icon-biaoge1'}
                                                             hover={true}/></RadioButton>
                            <RadioButton value="d"><IconFont iconName={'icon-xiazai1'}
                                                             hover={true}/></RadioButton>
                        </RadioGroup>
                    </div>
                    <Echarts echOption={this.echOption6}
                             echClassName={style.echarts}/>
                </div>
            </div>
        )
    }
}