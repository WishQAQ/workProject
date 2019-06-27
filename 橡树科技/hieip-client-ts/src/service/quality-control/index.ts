/**
 * 质控统计
 * Created by wx
 */
import {BaseService} from 'tools/flux/BaseService'
import {ApiStatisticsSplitTriage} from 'pkg/api'

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

export interface QualityControlState{
    selType?:string // 选择类型的值

}
class QualityControlService extends BaseService<QualityControlState> {
    defaultState={
        selType:''
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        ApiStatisticsSplitTriage.loadTriageReport('day',new Date('2017-01-01'),new Date('2017-12-31')).then((data)=>{
            // console.log(data)
        })
    }

    /**
     * 类型select的选择时间
     * @param v string 默认传递参数
     */
    selTypeChange=(v)=>{
        this.dispatch2({selType:v})
    }

    /**
     *  根据传入参数生成所需option
     * @param {Option} optiondata
     * @returns {any}
     */
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
                }else if(optiondata.legend.position === 'center'){
                    echOption.legend.left = 'center'
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
}

export const qualityControlService = new QualityControlService('qualityControl')