//多机构医疗服务量和床位情况
import React from "react";
import {Header} from './component/header'
import {NullInfo} from './../common/nullInfo'
import {Echart} from './component/chart'
import {Card, Button} from 'antd';
import css from './style/medical_income.scss'    //引入sass样式表

export class ServiceAndBeds extends React.Component {
    state = {
        show: false,
        title: '医疗服务量及床位使用情况',
        bedOption: {series: []},
        serviceOption: {series: []},
        compareOption: {series: []},
        x: ['hospital', 'hospital', 'hospital'],  //0医疗服务量，1床位情况，2门诊住院
        data: '',
        endYear: '',
        beginYear: '',
        hospital: '',
        hospitalKeys: ''
    };
    //合并两个数组
    mergeArray = (arr1, arr2) => {
        let arr = [];
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (i === j) {
                    arr.push({
                        name: arr2[j],
                        text: arr1[i]
                    })
                }
            }
        }
        return arr;
    };
    //设置option   年-》分类-》医院数据
    setOption = (data, year, legend, hospital, style) => {
        let series = [], options = [];
        //年
        for (let i = 0; i < year.length; i++) {
            //分类legend
            series = [];
            for (let j = 0; j < legend.length; j++) {
                let name = legend[j].name;
                let arr = [];
                //医院数据
                for (let k = 0; k < hospital.length; k++) {
                    let id = hospital[k].name;
                    let hospitalDataInfo = data[id] ? data[id] : {};
                    let obj = hospitalDataInfo[year[i]] ? hospitalDataInfo[year[i]] : {};
                    arr.push(obj[name] ? obj[name] : 0)
                }
                series.push({
                    itemStyle: style,
                    data: arr
                })
            }
            options.push({title: {text: ''}, series: series})
        }
        return options
    };
    //设置canvas的option
    renderCanvas = (data, endYear, beginYear, hospital, hospitalKeys, type) => {
        this.setState({
            data: data,
            endYear: endYear,
            beginYear: beginYear,
            hospital: hospital,
            hospitalKeys: hospitalKeys
        });
        let hospitalData = this.mergeArray(hospital, hospitalKeys);
        let xAxisDataYear = [];//时间轴
        for (let key in data[hospitalKeys[0]]) {
            let date = key;
            xAxisDataYear.push(date)
        }
        let {x} = this.state;
        if (data) {
            //医疗服务量
            let medicalLegendText = ['门诊', '急诊', '出院'];
            let medicalLegendName = ['mzrFrequency', 'jzrFrequency', 'cyrsQuantity'];
            let medicalLegendData = this.mergeArray(medicalLegendText, medicalLegendName);
            let itemStyle = {
                normal: {},
                emphasis: {
                    barBorderWidth: 1,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            }, xAxisDataMedical = [], series = [];
            for (let i = 0; i < medicalLegendText.length; i++) {
                if (medicalLegendText[i] === '出院') {
                    series.push({
                        name: medicalLegendText[i],
                        type: 'bar'
                    })
                } else {
                    series.push({
                        name: medicalLegendText[i],
                        stack: 'one',
                        type: 'bar'
                    })
                }

            }
            //医院名称
            for (let i = 0; i < hospitalData.length; i++) {
                xAxisDataMedical.push(hospitalData[i].text);
            }
            let medicalOptions = this.setOption(data, xAxisDataYear, medicalLegendData, hospitalData, itemStyle);
            let serviceOption = {
                baseOption: {
                    timeline: {
                        axisType: 'category',
                        autoPlay: false,
                        playInterval: 1000,
                        data: [],
                        height: 34,
                        controlStyle: {
                            itemSize: 18,
                        },
                        label: {
                            formatter: function (s) {
                                return s;
                            }
                        }
                    },
                    legend: {
                        data: [],
                        align: 'right',
                        right: 20,
                    },
                    brush: {
                        xAxisIndex: 0
                    },
                    tooltip: {},
                    xAxis: {
                        data: [],
                        silent: false,
                        axisLabel: {interval: 0, rotate: 40},
                        axisLine: {onZero: true, show: true,},
                        splitLine: {show: false},
                        splitArea: {show: false}
                    },
                    yAxis: {
                        inverse: true,
                        minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                        splitArea: {show: false},
                    },
                    grid: {
                        left: 100,
                        bottom: 70,
                    },
                    series: [],
                    dataZoom: [
                        {
                            show: false,
                            xAxisIndex: [0],
                        },
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            bottom: 0
                        }
                    ],
                },
                options: []
            };
            //床位
            let bedLegendText = ['实际开放', '实际占用', '出院者占用'];
            let bedLegendName = ['sjkfzcrsSituation', 'sjzyzcrsSituation', 'cyzzyzcrsSituation'];
            let bedLegendData = this.mergeArray(bedLegendText, bedLegendName);
            let bedOption = {
                baseOption: {
                    tooltip: {
                        position: 'top',
                        formatter: function (params) {
                            let value = params.value;
                            return value[1]
                        }
                    },
                    title: [],
                    singleAxis: [],
                    timeline: {
                        axisType: 'category',
                        autoPlay: false,
                        playInterval: 1000,
                        data: [],
                        height: 34,
                        controlStyle: {
                            itemSize: 18,
                        },
                        label: {
                            formatter: function (s) {
                                return s;
                            }
                        }
                    },
                    dataZoom: [
                        {
                            show: false,
                            realtime: true,
                            singleAxisIndex: [0, 1, 2]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            singleAxisIndex: [0, 1, 2]
                        }
                    ],
                },
                options: [],
            }, bedSeries;
            //门诊、住院
            let comName = ['门诊', '出院'];
            let comLegendText = ['市内医保患者', '市外医保患者', '高血压特病患者', '糖尿病特病患者'];
            let comLegendName = ['mjzSnybhzFrequency', 'mjzSwybhzFrequency', 'mjzGxytbhzFrequency', 'mjzTnbtbhzFrequency', 'cySnybhzQuantity', 'cySwybhzQuantity', 'cyGxytbhzQuantity', 'cyTnbtbhzQuantity'];
            let comSeries, comOption, sonOption, compareOption = {
                baseOption: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    legend: {
                        data: [],
                        x: 'right'
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    dataZoom: [
                        {
                            show: false,
                            realtime: true,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1]
                        }
                    ],
                    grid: [{
                        left: 50,
                        right: 50,
                        height: '35%'
                    }, {
                        left: 50,
                        right: 50,
                        top: '55%',
                        height: '35%'
                    }],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: [],
                            axisLabel: {interval: 0, rotate: 40},
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: [],
                            position: 'top',
                            axisLabel: {interval: 0, rotate: 40},
                        }
                    ],
                    yAxis: [
                        {
                            name: '门诊(人)',
                            type: 'value',
                            minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                        },
                        {
                            gridIndex: 1,
                            name: '住院(人)',
                            type: 'value',
                            inverse: true,
                            minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                        }
                    ],
                    series: [],
                    timeline: {
                        axisType: 'category',
                        autoPlay: false,
                        playInterval: 1000,
                        data: [],
                        height: 34,
                        controlStyle: {
                            itemSize: 18,
                        },
                        label: {
                            formatter: function (s) {
                                return s;
                            }
                        }
                    },
                },
                options: []
            };
            switch (type) {
                case 'service':
                    if (x[0] === 'hospital') {
                        let baseOption = serviceOption.baseOption;
                        let timeline = serviceOption.baseOption.timeline;
                        timeline.currentIndex = 0;
                        timeline.data = xAxisDataYear;
                        baseOption.legend.data = medicalLegendText;
                        baseOption.xAxis.data = xAxisDataMedical;
                        baseOption.series = series;
                        serviceOption.options = medicalOptions;
                    } else {
                        let medicalSeries = [], medicalSonSeries = [];
                        for (let i = 0; i < hospitalData.length; i++) {
                            medicalSeries = [];
                            let name = hospitalData[i].name;
                            //legend
                            for (let j = 0; j < medicalLegendData.length; j++) {
                                let legend = medicalLegendData[j].name;
                                //年
                                let arr = [];
                                for (let k = 0; k < xAxisDataYear.length; k++) {
                                    let year = xAxisDataYear[k];
                                    let hospitalData = data[name] ? data[name] : {};
                                    let obj = hospitalData[year] ? hospitalData[year] : {};
                                    arr.push(obj[legend] ? obj[legend] : 0);
                                }
                                medicalSeries.push({data: arr})
                            }
                            medicalSonSeries[medicalSonSeries.length] = {
                                title: {text: hospitalData[i].text + '门诊收入'},
                                series: medicalSeries
                            };
                        }
                        let baseOption = serviceOption.baseOption;
                        let timeline = serviceOption.baseOption.timeline;
                        timeline.data = xAxisDataMedical;
                        timeline.currentIndex = 0;
                        baseOption.legend.data = medicalLegendText;
                        baseOption.xAxis.data = xAxisDataYear;
                        baseOption.series = series;
                        serviceOption.options = medicalSonSeries;
                    }
                    this.setState({
                        serviceOption
                    });
                    break;
                case 'bed':
                    //legend
                    if (x[1] === 'hospital') {
                        //床位
                        bedOption.baseOption.timeline.data = xAxisDataYear;
                        bedOption.baseOption.timeline.currentIndex = 0;
                        //legend
                        for (let i = 0; i < bedLegendData.length; i++) {
                            //title
                            bedOption.baseOption.title.push({
                                textBaseline: 'middle',
                                top: (i + 0.5) * 100 / 7 + '%',
                                text: bedLegendData[i].text
                            });
                            //singleAxis
                            bedOption.baseOption.singleAxis.push({
                                left: 150,
                                type: 'category',
                                boundaryGap: false,
                                data: hospital,   //x 轴
                                top: (i * 100 / 7 + 5) + '%',
                                height: (100 / 7 - 10) + '%',
                            });
                            //options
                            bedOption.options[i] = {series: []};
                            for (let j = 0; j < xAxisDataYear.length; j++) {
                                bedOption.options[i].series.push({
                                    singleAxisIndex: j,
                                    coordinateSystem: 'singleAxis',
                                    type: 'scatter',
                                    data: [],
                                    symbolSize: function (dataItem) {
                                        if (dataItem[1] > 100) {
                                            return dataItem[1] * 0.1;
                                        } else if (dataItem[1] > 1000) {
                                            return dataItem[1] * 0.01;
                                        } else {
                                            return dataItem[1] * 1;
                                        }
                                    }
                                })
                            }
                        }
                        bedSeries = {};
                        let series;
                        //年
                        for (let i = 0; i < xAxisDataYear.length; i++) {
                            let year = xAxisDataYear[i];
                            series = [];
                            //legend
                            for (let j = 0; j < bedLegendData.length; j++) {
                                let name = bedLegendData[j].name;
                                //医院数据
                                for (let k = 0; k < hospitalData.length; k++) {
                                    let arr = [];
                                    let id = hospitalData[k].name;
                                    let hospitalInfo = data[id] ? data[id] : {};
                                    let obj = hospitalInfo[year] ? hospitalInfo[year] : {};
                                    arr.push(j, k, obj[name] ? obj[name] : 0);
                                    series.push(arr);
                                }
                            }
                            bedSeries[year] = series;
                        }
                        //年份
                        for (let i = 0; i < xAxisDataYear.length; i++) {
                            let year = xAxisDataYear[i];
                            for (let j = 0; j < bedSeries[year].length; j++) {
                                let dataItem0 = bedSeries[year][j][0];
                                let dataItem1 = bedSeries[year][j][1];
                                let dataItem2 = bedSeries[year][j][2];
                                bedOption.options[i].series[dataItem0] ? bedOption.options[i].series[dataItem0].data.push([dataItem1, dataItem2]) : 0;
                            }
                        }
                    } else {
                        bedOption.baseOption.timeline.data = hospital;
                        bedOption.baseOption.timeline.currentIndex = 0;
                        //legend
                        for (let i = 0; i < bedLegendData.length; i++) {
                            //title
                            bedOption.baseOption.title.push({
                                textBaseline: 'middle',
                                top: (i + 0.5) * 100 / 7 + '%',
                                text: bedLegendData[i].text
                            });
                            //singleAxis
                            bedOption.baseOption.singleAxis.push({
                                left: 150,
                                type: 'category',
                                boundaryGap: false,
                                data: xAxisDataYear,
                                top: (i * 100 / 7 + 5) + '%',
                                height: (100 / 7 - 10) + '%',
                            });
                            bedOption.options[i] = {series: []};
                            for (let j = 0; j < xAxisDataYear.length; j++) {
                                bedOption.options[i].series.push({
                                    singleAxisIndex: j,
                                    coordinateSystem: 'singleAxis',
                                    type: 'scatter',
                                    data: [],
                                    symbolSize: function (dataItem) {
                                        if (dataItem[1] > 100) {
                                            return dataItem[1] * 0.1;
                                        } else if (dataItem[1] > 1000) {
                                            return dataItem[1] * 0.01;
                                        } else {
                                            return dataItem[1] * 1;
                                        }
                                    }
                                })
                            }
                        }
                        bedSeries = {};
                        let optionsData;
                        //医院
                        for (let i = 0; i < hospitalData.length; i++) {
                            let name = hospitalData[i].name;
                            optionsData = [];
                            //legend
                            for (let j = 0; j < bedLegendName.length; j++) {
                                let legend = bedLegendName[j];
                                //year
                                for (let k = 0; k < xAxisDataYear.length; k++) {
                                    let arr = [];
                                    let year = xAxisDataYear[k];
                                    let hospitalData = data[name] ? data[name] : {};
                                    let obj = hospitalData[year] ? hospitalData[year] : {};
                                    arr.push(j, k, obj[legend] ? obj[legend] : 0);
                                    optionsData.push(arr);
                                }
                            }
                            bedSeries[name] = optionsData;
                        }
                        for (let i = 0; i < bedLegendData.length; i++) {
                            for(let k=0;k<hospitalData.length;k++){
                                let arr = bedSeries[hospitalData[i].name];
                                for (let j = 0; j < arr.length; j++) {
                                    bedOption.options[i].series[arr[j][0]] ? bedOption.options[i].series[arr[j][0]].data.push([arr[j][1], arr[j][2]]) : 0;
                                }
                            }
                        }
                    }
                    this.setState({
                        bedOption
                    });
                    break;
                case 'compare':
                    comSeries = [];
                    for (let i = 0; i < comName.length; i++) {
                        if (comName[i] === '门诊') {
                            for (let j = 0; j < comLegendText.length; j++) {
                                comSeries.push({
                                    name: comLegendText[j],
                                    type: 'line',
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                })
                            }
                        } else {
                            for (let j = 0; j < comLegendText.length; j++) {
                                comSeries.push({
                                    name: comLegendText[j],
                                    type: 'line',
                                    symbolSize: 8,
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    hoverAnimation: false,
                                })
                            }
                        }
                    }
                    comOption = [];
                    sonOption = [];
                    //门诊、急诊对比
                    if (x[2] === 'hospital') {
                        //年
                        for (let i = 0; i < xAxisDataYear.length; i++) {
                            sonOption = [];
                            //legend
                            for (let j = 0; j < comLegendName.length; j++) {
                                let arr = [];
                                //医院数据
                                for (let k = 0; k < hospitalKeys.length; k++) {
                                    let id = hospitalKeys[k];
                                    let hospitalInfo = data[id] ? data[id] : {};
                                    let obj = hospitalInfo[xAxisDataYear[i]] ? hospitalInfo[xAxisDataYear[i]] : {};
                                    arr.push(obj[comLegendName[j]] ? obj[comLegendName[j]] : 0)
                                }
                                sonOption.push({data: arr})
                            }
                            comOption.push({title: {text: ''}, series: sonOption})
                        }
                        compareOption.baseOption.legend.data = comLegendText;
                        compareOption.baseOption.xAxis[0].data = hospital;
                        compareOption.baseOption.xAxis[1].data = hospital;
                        compareOption.baseOption.series = comSeries;
                        compareOption.baseOption.timeline.data = xAxisDataYear;
                        compareOption.baseOption.timeline.currentIndex = 0;
                        compareOption.options = comOption;
                    } else {
                        for (let i = 0; i < hospitalData.length; i++) {
                            sonOption = [];
                            let name = hospitalData[i].name;
                            //legend
                            for (let j = 0; j < comLegendName.length; j++) {
                                let legend = comLegendName[j];
                                //年
                                let arr = [];
                                for (let k = 0; k < xAxisDataYear.length; k++) {
                                    let year = xAxisDataYear[k];
                                    let hospitalData = data[name] ? data[name] : {};
                                    let obj = hospitalData[year] ? hospitalData[year] : {};
                                    arr.push(obj[legend] ? obj[legend] : 0);
                                }
                                sonOption.push({data: arr})
                            }
                            comOption[comOption.length] = {
                                title: {text: hospitalData[i].text + '门诊收入'},
                                series: sonOption
                            };
                        }
                        compareOption.baseOption.legend.data = comLegendText;
                        compareOption.baseOption.xAxis[0].data = xAxisDataYear;
                        compareOption.baseOption.xAxis[1].data = xAxisDataYear;
                        compareOption.baseOption.series = comSeries;
                        compareOption.baseOption.timeline.data = hospital;
                        compareOption.baseOption.timeline.currentIndex = 0;
                        compareOption.options = comOption;
                    }
                    this.setState({
                        compareOption
                    });
                    break;
                default:
                    //服务量
                    let baseOption = serviceOption.baseOption;
                    let timeline = serviceOption.baseOption.timeline;
                    timeline.data = xAxisDataYear;
                    baseOption.legend.data = medicalLegendText;
                    baseOption.xAxis.data = xAxisDataMedical;
                    baseOption.series = series;
                    serviceOption.options = medicalOptions;
                    //床位
                    bedOption.baseOption.timeline.data = xAxisDataYear;
                    bedOption.baseOption.timeline.currentIndex = 0;
                    //legend
                    for (let i = 0; i < bedLegendData.length; i++) {
                        //title
                        bedOption.baseOption.title.push({
                            textBaseline: 'middle',
                            top: (i + 0.5) * 100 / 7 + '%',
                            text: bedLegendData[i].text
                        });
                        //singleAxis
                        bedOption.baseOption.singleAxis.push({
                            left: 150,
                            type: 'category',
                            boundaryGap: false,
                            data: hospital,   //x 轴
                            top: (i * 100 / 7 + 5) + '%',
                            height: (100 / 7 - 10) + '%',
                        });
                        //options
                        bedOption.options[i] = {series: []};
                        for (let j = 0; j < xAxisDataYear.length; j++) {
                            bedOption.options[i].series.push({
                                singleAxisIndex: j,
                                coordinateSystem: 'singleAxis',
                                type: 'scatter',
                                data: [],
                                symbolSize: function (dataItem) {
                                    if (dataItem[1] > 100) {
                                        return dataItem[1] * 0.1;
                                    } else if (dataItem[1] > 1000) {
                                        return dataItem[1] * 0.01;
                                    } else {
                                        return dataItem[1] * 1;
                                    }
                                }
                            })
                        }
                    }
                    bedSeries = {};
                    let series1;
                    //年
                    for (let i = 0; i < xAxisDataYear.length; i++) {
                        let year = xAxisDataYear[i];
                        series1 = [];
                        //legend
                        for (let j = 0; j < bedLegendData.length; j++) {
                            let name = bedLegendData[j].name;
                            //医院数据
                            for (let k = 0; k < hospitalData.length; k++) {
                                let arr = [];
                                let id = hospitalData[k].name;
                                let hospitalInfo = data[id] ? data[id] : {};
                                let obj = hospitalInfo[year] ? hospitalInfo[year] : {};
                                arr.push(j, k, obj[name] ? obj[name] : 0);
                                series1.push(arr);
                            }
                        }
                        bedSeries[year] = series1;
                    }

                    //年份
                    for (let i = 0; i < xAxisDataYear.length; i++) {
                        let year = xAxisDataYear[i];
                        for (let j = 0; j < bedSeries[year].length; j++) {
                            let dataItem0 = bedSeries[year][j][0];
                            let dataItem1 = bedSeries[year][j][1];
                            let dataItem2 = bedSeries[year][j][2];
                            bedOption.options[i].series[dataItem0] ? bedOption.options[i].series[dataItem0].data.push([dataItem1, dataItem2]) : 0;
                        }
                    }

                    comSeries = [];
                    for (let i = 0; i < comName.length; i++) {
                        if (comName[i] === '门诊') {
                            for (let j = 0; j < comLegendText.length; j++) {
                                comSeries.push({
                                    name: comLegendText[j],
                                    type: 'line',
                                    symbolSize: 8,
                                    hoverAnimation: false,
                                })
                            }
                        } else {
                            for (let j = 0; j < comLegendText.length; j++) {
                                comSeries.push({
                                    name: comLegendText[j],
                                    type: 'line',
                                    symbolSize: 8,
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    hoverAnimation: false,
                                })
                            }
                        }
                    }
                    comOption = [];
                    sonOption = [];
                    //年
                    for (let i = 0; i < xAxisDataYear.length; i++) {
                        sonOption = [];
                        //legend
                        for (let j = 0; j < comLegendName.length; j++) {
                            let arr = [];
                            //医院数据
                            for (let k = 0; k < hospitalKeys.length; k++) {
                                let id = hospitalKeys[k];
                                let hospitalInfo = data[id] ? data[id] : {};
                                let obj = hospitalInfo[xAxisDataYear[i]] ? hospitalInfo[xAxisDataYear[i]] : {};
                                arr.push(obj[comLegendName[j]] ? obj[comLegendName[j]] : 0)
                            }
                            sonOption.push({data: arr})
                        }
                        comOption.push({series: sonOption})
                    }
                    compareOption.baseOption.legend.data = comLegendText;
                    compareOption.baseOption.xAxis[0].data = hospital;
                    compareOption.baseOption.xAxis[1].data = hospital;
                    compareOption.baseOption.series = comSeries;
                    compareOption.baseOption.timeline.data = xAxisDataYear;
                    compareOption.options = comOption;
                    this.setState({
                        show: true,
                    }, () => {
                        this.setState({
                            serviceOption: serviceOption,
                            bedOption: bedOption,
                            compareOption: compareOption
                        })
                    });
                    break
            }
        }
    };
    //切换X轴
    toggleX = (type) => {
        let {data, endYear, beginYear, hospital, hospitalKeys, x} = this.state;
        switch (type) {
            case 'service':
                x[0] === 'hospital' ? x[0] = 'year' : x[0] = 'hospital';
                break;
            case 'bed':
                x[1] === 'hospital' ? x[1] = 'year' : x[1] = 'hospital';
                break;
            case 'compare':
                x[2] === 'hospital' ? x[2] = 'year' : x[2] = 'hospital';
                break;
        }
        this.setState({
            x
        }, () => {
            this.renderCanvas(data, endYear, beginYear, hospital, hospitalKeys, type)
        });
    };

    render() {
        let {title, show, serviceOption, bedOption, compareOption} = this.state;
        return (<div className={css.serviceAndBeds}>
            <Header renderCanvas={this.renderCanvas} title={title} multiple={true}/>
            <div className={css.main}>
                <div className={css.left}>
                    <Card title="医疗服务量">
                        {show ? <div className={`${css.btn} ${css.btn1}`}><Button type="primary"
                                                                                  onClick={this.toggleX.bind(this, 'service')}>切换</Button>
                        </div> : null}
                        {show ? <Echart id="service" className={css.canvas} option={serviceOption}/> : <NullInfo/>}
                    </Card>
                    <Card title="床位使用情况" className={css.bed}>
                        {show ? <div className={css.btn}><Button type="primary"
                                                                 onClick={this.toggleX.bind(this, 'bed')}>切换</Button>
                        </div> : null}
                        {show ? <Echart id="bed" className={css.canvas} option={bedOption}/> : <NullInfo/>}
                    </Card>
                </div>
                <div className={css.right}>
                    <Card title="门诊/住院服务量">
                        {show ? <div className={`${css.btn} ${css.btn2}`}><Button type="primary"
                                                                                  onClick={this.toggleX.bind(this, 'compare')}>切换</Button>
                        </div> : null}
                        {show ? <Echart id="compare" className={css.canvas} option={compareOption}/> : <NullInfo/>}
                    </Card>
                </div>
            </div>
        </div>)
    }
}