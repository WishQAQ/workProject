//多机构收入与支出
import React from "react";
import {Header} from './component/header'
import {NullInfo} from './../common/nullInfo'
import {Echart} from './component/chart'
import {Card, Row, Col, Button} from 'antd';
import css from './style/medical_income.scss'    //引入sass样式表
export class Income extends React.Component {
    state = {
        show: false,
        title: '医疗收入',
        totalOption: {series: []},
        publicOption: {series: []},
        menZhenOption: {series: []},
        zhuYuanOption: {series: []},
        toggleText: '门诊',
        toggleData: ['mzMzybbxIncome', 'mzMzgrzfIncome', 'mzMzfybIncome', 'mzGxytbIncome', 'mzTnbtbIncome', 'mzXtxtbIncome'],
        x: ['hospital', 'hospital', 'hospital'],  //0医疗收入，1门诊，2住院
        data: '',
        endYear: '',
        beginYear: '',
        hospital: '',
        hospitalKeys: '',
        dateType: '',
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
    //切换
    toggle = () => {
        let {toggleText, data, endYear, beginYear, hospital, hospitalKeys} = this.state;
        let pubMZ = ['mzMzybbxIncome', 'mzMzgrzfIncome', 'mzMzfybIncome', 'mzGxytbIncome', 'mzTnbtbIncome', 'mzXtxtbIncome'];
        let pubZY = ['zyMzfybIncome', 'zyMzybbxIncome', 'zyMzgrzfIncome', 'zyGxytbIncome', 'zyTnbtbIncome', 'zyXtxtbIncome'];
        if (toggleText === '门诊') {
            this.setState({
                toggleText: '住院',
                toggleData: pubZY
            }, () => {
                this.renderCanvas(data, endYear, beginYear, hospital, hospitalKeys, 'public');
            })
        } else {
            this.setState({
                toggleText: '门诊',
                toggleData: pubMZ
            }, () => {
                this.renderCanvas(data, endYear, beginYear, hospital, hospitalKeys, 'public');
            })
        }
    };
    //获取相应的data
    getData = (data, i, xAxisData, id) => {
        let totalData = [];
        totalData[i] = [];
        if (data[id]) {
            let c = 0, arr = [];
            for (let key in data[id]) {
                if (data[id]) {
                    totalData[i] = [];
                    totalData[i].push(c);
                    data[id][key] !== null ? totalData[i].push(parseFloat(data[id][key].mzJcIncome)) : totalData[i].push(0);
                    data[id][key] !== null ? totalData[i].push(parseFloat(data[id][key].zyIncome)) : totalData[i].push(0);
                    c++;
                    arr.push(totalData[i]);
                }
            }
            return arr;
        }
    };
    //设置canvas的option
    renderCanvas = (data, endYear, beginYear, hospital, hospitalKeys, type) => {
        this.setState({
            data: data,
            endYear: endYear,
            beginYear: beginYear,
            hospital: hospital,
            hospitalKeys: hospitalKeys,
        });
        let {toggleData, x} = this.state;
        if (data) {
            //公共部分
            let xAxisData = [];//x轴的时间
            for (let key in data[hospitalKeys[0]]) {
                let date = key;
                xAxisData.push(date)
            }
            let hospitalName = this.mergeArray(hospital, hospitalKeys);
            //医疗收入公共部分
            let publicSerize, detailOptions, pubName;
            let publicLengend = ['医保报销', '个人自付', '非医保患者', '高血压特病患者', '糖尿病特病患者', '血透析患者'];
            let publicOption = {
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
                    tooltip: {},
                    legend: {
                        x: 'right',
                        y: '3%',
                        type: 'scroll',
                        data: publicLengend,
                    },
                    calculable: true,
                    grid: {
                        top: 60,
                        bottom: 66,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type': 'category',
                            'axisLabel': {'interval': 0, rotate: 40},
                            'data': [],
                            splitLine: {show: false},
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: this.state.toggleText + '收入（万元）'
                        }
                    ],
                    dataZoom: [
                        {
                            show: false,
                            realtime: true,
                            xAxis: [0]
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            xAxis: [0]
                        }
                    ],
                    series: [
                        {name: '医保报销', type: 'bar'},
                        {name: '个人自付', type: 'bar'},
                        {name: '非医保患者', type: 'bar'},
                        {name: '高血压特病患者', type: 'bar'},
                        {name: '糖尿病特病患者', type: 'bar'},
                        {name: '血透析患者', type: 'bar'},
                    ],
                },
                options: []
            };
            //门诊
            let detailSerise, sonSeries;
            let legendNames = ['mzMzzcfIncome', 'mzZcybbxIncome', 'mzJcIncome', 'mzHyIncome', 'mzZlIncome', 'mzSsIncome', 'mzWsclIncome', 'mzYpIncome', 'mzQtIncome'];
            //指定图表的配置项和数据
            let menZhenOption = {
                baseOption: {
                    dataZoom: [
                        {
                            show: false,
                            realtime: true,
                            xAxis: [0]
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            xAxis: [0]
                        }
                    ],
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
                    tooltip: {},
                    legend: {
                        x: 'right',
                        y: '10%',
                        data: ['诊察费', '诊查费(医保报销)', '检查', '化验', '治疗', '手术', '卫生材料', '药品', '其他门诊'],
                    },
                    calculable: true,
                    grid: {
                        top: 80,
                        bottom: 66,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type': 'category',
                            'axisLabel': {'interval': 0, rotate: 40},
                            'data': [],
                            splitLine: {show: false}
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '门诊收入（万元）'
                        }
                    ],
                    series: [
                        {name: '诊察费', type: 'bar'},
                        {name: '诊查费(医保报销)', type: 'bar'},
                        {name: '检查', type: 'bar'},
                        {name: '化验', type: 'bar'},
                        {name: '治疗', type: 'bar'},
                        {name: '手术', type: 'bar'},
                        {name: '卫生材料', type: 'bar'},
                        {name: '药品', type: 'bar'},
                        {name: '其他门诊', type: 'bar'},
                    ],
                },
                options: []

            };
            //住院
            let optionZy, detailOption;
            let legendNamesZy = ['zyCwIncome', 'zyZcfIncome', 'zyJcIncome', 'zyHyIncome', 'zyZlIncome', 'zySsIncome', 'zyHlIncome', 'zyWsclIncome', 'zyYpIncome', 'zyQtzyIncome'];
            let zhuYuanOption = {
                baseOption: {
                    dataZoom: [
                        {
                            show: false,
                            realtime: true,
                            xAxis: [0]
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            xAxis: [0]
                        }
                    ],
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
                    tooltip: {},
                    legend: {
                        x: 'right',
                        y: '10%',
                        data: ['床位', '住院诊查', '检查', '化验', '治疗', '手术', '护理', '卫生材料', '药品', '其他住院'],
                    },
                    calculable: true,
                    grid: {
                        top: 80,
                        bottom: 66,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type': 'category',
                            'axisLabel': {'interval': 0, rotate: 40},
                            'data': [],
                            splitLine: {show: false}
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '住院收入（万元）'
                        }
                    ],
                    series: [
                        {name: '床位', type: 'bar'},
                        {name: '住院诊查', type: 'bar'},
                        {name: '检查', type: 'bar'},
                        {name: '化验', type: 'bar'},
                        {name: '治疗', type: 'bar'},
                        {name: '手术', type: 'bar'},
                        {name: '护理', type: 'bar'},
                        {name: '卫生材料', type: 'bar'},
                        {name: '药品', type: 'bar'},
                        {name: '其他住院', type: 'bar'},
                    ],
                },
                options: []
            };
            switch (type) {
                case 'public':
                    if (x[0] === 'hospital') {
                        pubName = toggleData;
                        publicSerize = [];
                        detailOptions = [];
                        for (let i = 0; i < xAxisData.length; i++) {
                            publicSerize = [];
                            // 分类legend
                            for (let a = 0; a < pubName.length; a++) {
                                let _k = pubName[a];
                                let arr = [];
                                for (let b = 0; b < hospitalKeys.length; b++) {
                                    let _kk = hospitalKeys[b];
                                    let _hospitalData = data[_kk] ? data[_kk] : {};
                                    let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                    arr.push(obj[_k] ? obj[_k] : 0);
                                }
                                publicSerize.push({data: arr});
                            }
                            detailOptions[detailOptions.length] = {
                                series: publicSerize
                            };
                        }
                        publicOption.baseOption.timeline.data = xAxisData;
                        publicOption.baseOption.timeline.currentIndex = 0;
                        publicOption.baseOption.xAxis[0].data = hospital;
                        publicOption.options = detailOptions;

                    } else {
                        publicSerize = [];
                        detailOptions = [];
                        pubName = toggleData;
                        //医院
                        for (let i = 0; i < hospitalName.length; i++) {
                            publicSerize = [];
                            let name = hospitalName[i].name;
                            //legend
                            for (let j = 0; j < pubName.length; j++) {
                                let legend = pubName[j];
                                //年
                                let arr = [];
                                for (let k = 0; k < xAxisData.length; k++) {
                                    let year = xAxisData[k];
                                    let hospitalData = data[name] ? data[name] : {};
                                    let obj = hospitalData[year] ? hospitalData[year] : {};
                                    arr.push(obj[legend] ? obj[legend] : 0);
                                }
                                publicSerize.push({data: arr})
                            }
                            detailOptions[detailOptions.length] = {
                                series: publicSerize
                            };
                        }
                        publicOption.baseOption.timeline.currentIndex = 0;
                        publicOption.baseOption.timeline.data = hospital;
                        publicOption.baseOption.xAxis[0].data = xAxisData;
                        publicOption.options = detailOptions;
                    }
                    this.setState({
                        publicOption
                    });
                    break;
                case 'menzhen':
                    if (x[1] === 'hospital') {
                        detailSerise = [];
                        sonSeries = [];
                        for (let i = 0; i < xAxisData.length; i++) {
                            sonSeries = [];
                            // 分类legend
                            for (let a = 0; a < legendNames.length; a++) {
                                let _k = legendNames[a];
                                let arr = [];
                                for (let b = 0; b < hospitalKeys.length; b++) {
                                    let _kk = hospitalKeys[b];
                                    let _hospitalData = data[_kk] ? data[_kk] : {};
                                    let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                    arr.push(obj[_k] ? obj[_k] : 0);
                                }
                                sonSeries.push({data: arr});
                            }
                            detailSerise[detailSerise.length] = {
                                title: {text: xAxisData[i] + '年门诊收入'},
                                series: sonSeries
                            };
                        }
                        menZhenOption.baseOption.timeline.currentIndex = 0;
                        menZhenOption.baseOption.timeline.data = xAxisData;
                        menZhenOption.baseOption.xAxis[0].data = hospital;
                        menZhenOption.options = detailSerise
                    } else {
                        detailSerise = [];
                        sonSeries = [];
                        for (let i = 0; i < hospitalName.length; i++) {
                            sonSeries = [];
                            let name = hospitalName[i].name;
                            //legend
                            for (let j = 0; j < legendNames.length; j++) {
                                let legend = legendNames[j];
                                //年
                                let arr = [];
                                for (let k = 0; k < xAxisData.length; k++) {
                                    let year = xAxisData[k];
                                    let hospitalData = data[name] ? data[name] : {};
                                    let obj = hospitalData[year] ? hospitalData[year] : {};
                                    arr.push(obj[legend] ? obj[legend] : 0);
                                }
                                sonSeries.push({data: arr})
                            }
                            detailSerise[detailSerise.length] = {
                                title: {text: hospitalName[i].text + '门诊收入'},
                                series: sonSeries
                            };
                        }
                        menZhenOption.baseOption.timeline.currentIndex = 0;
                        menZhenOption.baseOption.timeline.data = hospital;
                        menZhenOption.baseOption.xAxis[0].data = xAxisData;
                        menZhenOption.options = detailSerise
                    }
                    this.setState({
                        menZhenOption
                    });
                    break;
                case 'zhuyuan':
                    if (x[2] === 'hospital') {
                        optionZy = [];
                        detailOption = [];
                        for (let i = 0; i < xAxisData.length; i++) {
                            optionZy = [];
                            // 分类legend
                            for (let a = 0; a < legendNamesZy.length; a++) {
                                let _k = legendNamesZy[a];
                                let arr = [];
                                for (let b = 0; b < hospitalKeys.length; b++) {
                                    let _kk = hospitalKeys[b];
                                    let _hospitalData = data[_kk] ? data[_kk] : {};
                                    let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                    arr.push(obj[_k] ? obj[_k] : 0);
                                }
                                optionZy.push({data: arr});
                            }
                            detailOption[detailOption.length] = {
                                title: {text: xAxisData[i] + '年住院收入'},
                                series: optionZy
                            };
                        }
                        zhuYuanOption.baseOption.timeline.currentIndex = 0;
                        zhuYuanOption.baseOption.timeline.data = xAxisData;
                        zhuYuanOption.baseOption.xAxis[0].data = hospital;
                        zhuYuanOption.options = detailOption;
                    } else {
                        optionZy = [];
                        detailOption = [];
                        for (let i = 0; i < hospitalName.length; i++) {
                            optionZy = [];
                            let name = hospitalName[i].name;
                            //legend
                            for (let j = 0; j < legendNamesZy.length; j++) {
                                let legend = legendNamesZy[j];
                                //年
                                let arr = [];
                                for (let k = 0; k < xAxisData.length; k++) {
                                    let year = xAxisData[k];
                                    let hospitalData = data[name] ? data[name] : {};
                                    let obj = hospitalData[year] ? hospitalData[year] : {};
                                    arr.push(obj[legend] ? obj[legend] : 0);
                                }
                                optionZy.push({data: arr})
                            }
                            detailOption[detailOption.length] = {
                                title: {text: hospitalName[i].text + '住院收入'},
                                series: optionZy
                            };
                        }
                        zhuYuanOption.baseOption.timeline.currentIndex = 0;
                        zhuYuanOption.baseOption.timeline.data = hospital;
                        zhuYuanOption.baseOption.xAxis[0].data = xAxisData;
                        zhuYuanOption.options = detailOption;
                    }
                    this.setState({
                        zhuYuanOption
                    });
                    break;
                default:
                    //医疗收入
                    let schema = [
                        {name: '医疗收入', index: 0, text: '医疗收入'},
                        {name: '门诊收入', index: 1, text: '门诊收入'},
                        {name: '住院收入', index: 2, text: '住院收入'},
                    ];
                    let itemStyle = {
                        normal: {
                            opacity: 0.8,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    };
                    let serize = [];//具体数据
                    publicSerize = [];
                    detailOptions = [];
                    pubName = toggleData;
                    for (let i = 0; i < hospitalName.length; i++) {
                        serize.push({
                            name: hospitalName[i].text,
                            type: 'scatter',
                            itemStyle: itemStyle,
                            data: this.getData(data, i, xAxisData, hospitalName[i].name)
                        });
                    }
                    for (let i = 0; i < xAxisData.length; i++) {
                        publicSerize = [];
                        // 分类legend
                        for (let a = 0; a < pubName.length; a++) {
                            let _k = pubName[a];
                            let arr = [];
                            for (let b = 0; b < hospitalKeys.length; b++) {
                                let _kk = hospitalKeys[b];
                                let _hospitalData = data[_kk] ? data[_kk] : {};
                                let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                arr.push(obj[_k] ? obj[_k] : 0);
                            }
                            publicSerize.push({data: arr});
                        }
                        detailOptions[detailOptions.length] = {
                            series: publicSerize
                        };
                    }
                    let totalOption = {
                        backgroundColor: '#304654',
                        color: ['#dd4444', '#fec42c', '#80F1BE', '#0E81BC', '#E8188D'],
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            right: 10,
                            top: 20,
                            bottom: 20,
                            data: hospital,
                            pageIconColor: '#AAAAAA',
                            color: '#fff',
                            pageTextStyle: {
                                color: '#fff'
                            },
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        grid: {
                            x: '10%',
                            x2: 150,
                            y: '18%',
                            y2: '20%'
                        },
                        tooltip: {
                            padding: 10,
                            backgroundColor: '#222',
                            borderColor: '#777',
                            borderWidth: 1,
                            formatter: function (obj) {
                                let value = obj.value;
                                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                                    + obj.name + obj.seriesName + '</div>'
                                    + schema[1].text + '：' + value[1] + '<br>'
                                    + schema[2].text + '：' + value[2] + '<br>'
                            }
                        },
                        xAxis: {
                            name: '时间',
                            type: 'category',
                            nameGap: 16,
                            boundaryGap: true,
                            axisLabel: {interval: 0, rotate: 40},
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14,
                                align: 'right',
                            },
                            data: xAxisData,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#eee'
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: '收入（万元）',
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 16
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#eee'
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        dataZoom: [
                            {
                                show: false,
                                realtime: true,
                                singleAxis: [0],
                                textStyle: {
                                    color: '#fff'
                                },
                            },
                            {
                                type: 'inside',
                                realtime: true,
                                singleAxis: [0],
                                textStyle: {
                                    color: '#fff'
                                },
                            }
                        ],
                        series: serize
                    };
                    publicOption.baseOption.timeline.data = xAxisData;
                    publicOption.baseOption.xAxis[0].data = hospital;
                    publicOption.options = detailOptions;
                    detailSerise = [];
                    sonSeries = [];
                    for (let i = 0; i < xAxisData.length; i++) {
                        sonSeries = [];
                        // 分类legend
                        for (let a = 0; a < legendNames.length; a++) {
                            let _k = legendNames[a];
                            let arr = [];
                            for (let b = 0; b < hospitalKeys.length; b++) {
                                let _kk = hospitalKeys[b];
                                let _hospitalData = data[_kk] ? data[_kk] : {};
                                let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                arr.push(obj[_k] ? obj[_k] : 0);
                            }
                            sonSeries.push({data: arr});
                        }
                        detailSerise[detailSerise.length] = {
                            title: {text: xAxisData[i] + '年门诊收入'},
                            series: sonSeries
                        };
                    }
                    //指定图表的配置项和数据
                    for (let i = 0; i < xAxisData.length; i++) {
                        sonSeries = [];
                        // 分类legend
                        for (let a = 0; a < legendNames.length; a++) {
                            let _k = legendNames[a];
                            let arr = [];
                            for (let b = 0; b < hospitalKeys.length; b++) {
                                let _kk = hospitalKeys[b];
                                let _hospitalData = data[_kk] ? data[_kk] : {};
                                let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                arr.push(obj[_k] ? obj[_k] : 0);
                            }
                            sonSeries.push({data: arr});
                        }
                        detailSerise[detailSerise.length] = {
                            title: {text: xAxisData[i] + '年门诊收入'},
                            series: sonSeries
                        };
                    }
                    menZhenOption.baseOption.timeline.data = xAxisData;
                    menZhenOption.baseOption.xAxis[0].data = hospital;
                    menZhenOption.options = detailSerise;
                    //使用刚指定的配置项和数据显示图表
                    optionZy = [];
                    detailOption = [];
                    for (let i = 0; i < xAxisData.length; i++) {
                        optionZy = [];
                        // 分类legend
                        for (let a = 0; a < legendNamesZy.length; a++) {
                            let _k = legendNamesZy[a];
                            let arr = [];
                            for (let b = 0; b < hospitalKeys.length; b++) {
                                let _kk = hospitalKeys[b];
                                let _hospitalData = data[_kk] ? data[_kk] : {};
                                let obj = _hospitalData[xAxisData[i]] ? _hospitalData[xAxisData[i]] : {};
                                arr.push(obj[_k] ? obj[_k] : 0);
                            }
                            optionZy.push({data: arr});
                        }
                        detailOption[detailOption.length] = {
                            title: {text: xAxisData[i] + '年住院收入'},
                            series: optionZy
                        };
                    }
                    zhuYuanOption.baseOption.timeline.data = xAxisData;
                    zhuYuanOption.baseOption.xAxis[0].data = hospital;
                    zhuYuanOption.options = detailOption;
                    this.setState({
                        show: true,
                    }, () => {
                        this.setState({
                            menZhenOption: menZhenOption,
                            zhuYuanOption: zhuYuanOption,
                            totalOption: totalOption,
                            publicOption: publicOption
                        })
                    });
                    break;
            }
        }
    };
    //切换X轴
    toggleX = (type) => {
        let {data, endYear, beginYear, hospital, hospitalKeys, x} = this.state;
        switch (type) {
            case 'public':
                x[0] === 'hospital' ? x[0] = 'year' : x[0] = 'hospital';
                break;
            case 'menzhen':
                x[1] === 'hospital' ? x[1] = 'year' : x[1] = 'hospital';
                break;
            case 'zhuyuan':
                x[2] === 'hospital' ? x[2] = 'year' : x[2] = 'hospital';
                break;
        }
        this.setState({
            x
        }, () => {
            this.renderCanvas(data, endYear, beginYear, hospital, hospitalKeys, type)
        });
    };
    //render之后执行
    componentDidMount() {
        let main = this.refs.main;   //查找内容区
        let mainHeight = main.clientHeight; //获取内容区的高度
        let cardLeft = main.children[0].children[0].children;  //查找卡片(左边）
        let cardRight = main.children[0].children[1].children;  //查找卡片(右边）
        let height = (mainHeight - 32) / 2 + 'px';     //每个卡片的高度
        cardLeft[0].style.height = height;
        cardLeft[1].style.height = height;
        cardRight[0].style.height = height;
        cardRight[1].style.height = height;
    }

    render() {
        let {title, show, totalOption, publicOption, menZhenOption, zhuYuanOption, toggleText} = this.state;
        return (<div className={css.income}>
            <Header renderCanvas={this.renderCanvas} title={title} multiple={true}/>
            <div className={css.main} ref="main">
                <Row gutter={16}>
                    <Col className="gutter-row" span={10}>
                        <Card title="医疗收入（总）">
                            {show ? <Echart id="total" className={css.canvas} option={totalOption}/> : <NullInfo/>}
                        </Card>
                        <Card title="医疗收入（公共部分）">
                            {show ? <div className={css.btn}><Button type="primary"
                                                                     onClick={this.toggle}>{toggleText}</Button>
                            </div> : null}
                            {show ? <div className={`${css.btn2} ${css.btn}`}><Button type="primary"
                                                                                      onClick={this.toggleX.bind(this, 'public')}>切换</Button>
                            </div> : null}
                            {show ? <Echart id="public" className={css.canvas} option={publicOption}/> : <NullInfo/>}
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={14}>
                        <Card title="门诊收入（明细）">
                            {show ? <div className={`${css.btn3} ${css.btn}`}><Button type="primary"
                                                                                      onClick={this.toggleX.bind(this, 'menzhen')}>切换</Button>
                            </div> : null}
                            {show ? <Echart id="menzhen" className={css.canvas} option={menZhenOption}/> : <NullInfo/>}
                        </Card>
                        <Card title="住院收入（明细）">
                            {show ? <div className={`${css.btn3} ${css.btn}`}><Button type="primary"
                                                                                      onClick={this.toggleX.bind(this, 'zhuyuan')}>切换</Button>
                            </div> : null}
                            {show ? <Echart id="zhuYuan" className={css.canvas} option={zhuYuanOption}/> : <NullInfo/>}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>)
    }
}