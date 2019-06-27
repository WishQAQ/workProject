/**
 * description:门诊费用明细
 * author: mou
 * time:2017-11-13
 */
import React from 'react'
import {Row, Col, Icon} from 'antd';
import {Card} from './../component/card';                //引入卡片
import MyHeaderComponent from './../component/myHeaderComponent'//ag 筛选排序
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Search} from './../component/header'
import css from '../../../less/main/content/outPrescriptions.scss'
import api from './../api'
export class Cost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalColumnDefs: [],//总表列规则
            toRowData: [],//总表行数据
            costOption: {series: []},//门诊总费用、平均费用、总费用环比
            cost: true,
            costColumnDefs: [],
            rateOption: {series: []},//医保率、药占比
            rate: true,
            rateColumnDefs: [],
            rowData: [
                {
                    time: "1月",
                    deptName: "内科",
                    mzcfzs: 30000,
                    mzcfhb: 5000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "2月",
                    deptName: "外科",
                    mzcfzs: 32000,
                    mzcfhb: 6000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "3月",
                    deptName: "内科",
                    mzcfzs: 33000,
                    mzcfhb: 7000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "4月",
                    deptName: "外科",
                    mzcfzs: 31000,
                    mzcfhb: 8000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "5月",
                    deptName: "内科",
                    mzcfzs: 35000,
                    mzcfhb: 5000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "6月",
                    deptName: "外科",
                    mzcfzs: 37000,
                    mzcfhb: 6000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "7月",
                    deptName: "内科",
                    mzcfzs: 39000,
                    mzcfhb: 7000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "8月",
                    deptName: "外科",
                    mzcfzs: 400000,
                    mzcfhb: 8000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "9月",
                    deptName: "内科",
                    mzcfzs: 35000,
                    mzcfhb: 5000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "10月",
                    deptName: "外科",
                    mzcfzs: 38000,
                    mzcfhb: 6000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "11月",
                    deptName: "内科",
                    mzcfzs: 33000,
                    mzcfhb: 7000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "12月",
                    deptName: "外科",
                    mzcfzs: 32000,
                    mzcfhb: 8000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "7月",
                    deptName: "内科",
                    mzcfzs: 36000,
                    mzcfhb: 5000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "8月",
                    deptName: "外科",
                    mzcfzs: 39000,
                    mzcfhb: 6000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "9月",
                    deptName: "外科",
                    mzcfzs: 33000,
                    mzcfhb: 7000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
                {
                    time: "5月",
                    deptName: "内科",
                    mzcfzs: 10000,
                    mzcfhb: 8000,
                    mzghbfb: 50,
                    mzcfzyje: 1000,
                    mzcfxyje: 500,
                    mzcfcyje: 100,
                    mzcfzyzs: 200,
                    mzcfxyzs: 300,
                    mzcfcyzs: 400
                },
            ],//行
            show: false,
            cheNum: 0,
        };
        this.onGridReady = this.onGridReady.bind(this);
    };

    //获取表格基础api
    onGridReady(params) {
        this.gridApi = params.api;
        this.state.api = params;
        this.setState({
            toColumnDefs: this.createToColDefs(),//创建
        }, () => {
            this.gridApi.sizeColumnsToFit();
        });
    }

    //查询数据
    selData = (selHospitalsNo, type, year, beginMonth, endMonth, beginDay, endDay) => {
        const {selCost} = api;
        let dataPack = '59858562';
        selCost(dataPack, selCost => {
            let arr = [];
            arr.push(selCost);
            this.renderCanvas(arr);
        });
    };
    //返回列
    backArr = (arr, change) => {
        for (let i = 0; i < change.length; i++) {
            arr.push({
                headerName: change[i].text,
                field: change[i].name,
            })
        }
        return arr;
    };
    //大表创建列规则
    createToColDefs = () => {
        let {toRowData, cheNum} = this.state;
        return [
            {
                headerName: "月份",
                field: "time",
                headerComponent: MyHeaderComponent,
                headerComponentParams: {
                    enableFilter: true,
                    enableSorting: true,
                    suppressMenuHide: true,
                    enableMenu: true,
                    menuIcon: 'fa-bars',
                    rowData: toRowData,
                    cheNum: cheNum,//选中
                    myType: 'time',
                    type: ['time', 'deptName'],
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
                },
            },
            {
                headerName: "科室",
                field: "deptName",
                headerComponent: MyHeaderComponent,
                headerComponentParams: {
                    enableFilter: true,
                    enableSorting: true,
                    suppressMenuHide: true,
                    enableMenu: true,
                    myType: 'deptName',
                    type: ['time', 'deptName'],
                    rowData: toRowData,
                    cheNum: cheNum,//选中
                    data: ['外科', '内科'],
                    menuIcon: 'fa-bars',

                }
            },
            {
                headerName: "挂号总人数",
                field: "reTotal",
                marryChildren: true,
                children: [
                    {
                        headerName: "门诊",
                        field: "mzghzrs",
                        headerComponent: MyHeaderComponent,
                        headerComponentParams: {
                            enableFilter: true,
                            enableSorting: true,
                            suppressMenuHide: true,
                            enableMenu: false,
                            menuIcon: 'fa-bars',
                        }
                    },
                    {
                        headerName: "急诊",
                        field: "jzghzrs",
                        headerComponent: MyHeaderComponent,
                        headerComponentParams: {
                            enableFilter: true,
                            enableSorting: true,
                            suppressMenuHide: true,
                            enableMenu: false,
                            menuIcon: 'fa-bars',
                        }
                    },
                    {
                        headerName: "同比数",
                        field: "mzghbfb",
                    },
                ]
            },
            {
                headerName: "首次门诊",
                field: "firDoor",
                marryChildren: true,
                children: [
                    {
                        headerName: "总数",
                        field: "mzscjzrs",
                    },
                    {
                        headerName: "同比数",
                        field: "mzscjzbfb",
                    },
                ]
            },
            {
                headerName: "不同年龄段",
                field: "age",
                marryChildren: true,
                children: [
                    {
                        headerName: "0-2岁",
                        field: "mznl1",
                    },
                    {
                        headerName: "2-22岁",
                        field: "mznl2",
                    },
                    {
                        headerName: "22-42岁",
                        field: "mznl3",
                    },
                    {
                        headerName: "42-62岁",
                        field: "mznl4",
                    },
                    {
                        headerName: "62岁以上",
                        field: "mznl5",
                    },
                ]
            },
            {
                headerName: "门诊费用类别、医保率",
                field: "rate",
                marryChildren: true,
                children: [
                    {
                        headerName: "医保",
                        field: "mzfylbyb",
                    },
                    {
                        headerName: "自费",
                        field: "mzfylbzf",
                    },
                    {
                        headerName: "职工",
                        field: "mzfylbzg",
                    },
                    {
                        headerName: "居民",
                        field: "mzfylbjm",
                    },
                    {
                        headerName: "离休干部",
                        field: "mzfylblxgb",
                    },
                ]
            },
            {
                headerName: "中医挂号",
                field: "chiMedical",
                marryChildren: true,
                children: [
                    {
                        headerName: "总人数",
                        field: "zyghrs",
                    },
                    {
                        headerName: "同比数",
                        field: "zyghbfb",
                    },
                ]
            },
            {
                headerName: "男女挂号",
                field: "sex",
                marryChildren: true,
                children: [
                    {
                        headerName: "男",
                        field: "malers",
                    },
                    {
                        headerName: "女",
                        field: "Female",
                    },
                ]
            },
        ];
    };
    createColDefs = (type) => {
        let {rowData, cheNum} = this.state;
        let timeT = this.state.type;
        let time;
        if (timeT === 'year') {
            time = '年份';
        } else if (timeT === 'month') {
            time = '月份';
        } else {
            time = '日期';
        }
        let arr = [
            {
                headerName: time,
                field: "time",
                headerComponent: MyHeaderComponent,
                headerComponentParams: {
                    enableFilter: true,
                    enableSorting: true,
                    suppressMenuHide: true,
                    enableMenu: true,
                    menuIcon: 'fa-bars',
                    rowData: rowData,
                    cheNum: cheNum,//选中
                    myType: 'time',
                    id: '',
                    type: ['time', 'deptName'],
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
                },
            },
            {
                headerName: "科室",
                field: "deptName",
                headerComponent: MyHeaderComponent,
                headerComponentParams: {
                    enableFilter: true,
                    enableSorting: true,
                    suppressMenuHide: true,
                    enableMenu: true,
                    myType: 'deptName',
                    id: '',
                    type: ['time', 'deptName'],
                    rowData: rowData,
                    cheNum: cheNum,//选中
                    data: ['外科', '内科'],
                    menuIcon: 'fa-bars',
                }
            },
        ];
        switch (type) {
            case 'cost':
                let costText = ['总费用', '平均费用', '总费用环比'];
                let costLegName = ['zfy', 'pjfy', 'zfyyhb'];
                let costLeg = this.mergeArray(costText, costLegName);
                return this.backArr(this.setDifId(arr, type), costLeg);
                break;
            case 'rate':
                let rateText = ['输液费用', '医保率', '药占比'];
                let rateLegName = ['zyfy', 'ybbl', 'yzb'];
                let rateLeg = this.mergeArray(rateText, rateLegName);
                return this.backArr(this.setDifId(arr, type), rateLeg);
                break;
        }
    };
    //设置不同的id
    setDifId = (arr, id) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].headerComponentParams.id = id;
        }
        return arr;
    };
    //点击切换图表(小）
    toggleChart = (type) => {
        switch (type) {
            case 'cost':
                this.setState({
                    cost: !this.state.cost,
                    rowData: this.state.rowData,
                }, () => {
                    this.setState({
                        costColumnDefs: this.createColDefs('cost'),
                    })
                });
                break;
            case 'rate':
                this.setState({
                    rate: !this.state.rate,
                    rowData: this.state.rowData,
                }, () => {
                    this.setState({
                        rateColumnDefs: this.createColDefs('rate'),
                    })
                });
                break;
        }
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
    //获取option的series
    getSeries = (legend, xAxis, data, defType, speLegs) => {
        let series = [], c = 0;
        //legend->x轴->医院数据
        for (let i = 0; i < legend.length; i++) {
            let name = legend[i].name;
            let text = legend[i].text;
            let arr = [];
            for (let j = 0; j < xAxis.length; j++) {
                let time = xAxis[j];
                for (let k = 0; k < data.length; k++) {
                    arr.push(data[k][time][name])
                }
            }
            //判断是否有特殊的type
            if (speLegs) {
                if (speLegs[c].text === text) {
                    series.push({
                        name: text,
                        type: speLegs[c].type,
                        data: arr,
                        yAxisIndex: 1,
                    });
                    c++;
                } else {
                    series.push({
                        name: text,
                        type: defType,
                        data: arr,
                        itemStyle: {
                            normal: {
                                barBorderRadius: [500, 500, 0, 0]
                            },
                            emphasis: {
                                barBorderRadius: [500, 500, 0, 0]
                            },
                        },
                    })
                    ;
                }
            } else {
                series.push({
                    name: text,
                    type: defType,
                    data: arr,
                });
            }
        }
        return series;
    };
    //渲染canvas
    renderCanvas = (data) => {
//获取时间
        let times = [];
        for (let time in data[0]) {
            times.push(time)
        }
//门诊总费用、平均费用、总费用环比
        let costText = ['总费用', '平均费用', '总费用环比'];
        let costLegName = ['zfy', 'pjfy', 'zfyyhb'];
        let costLeg = this.mergeArray(costText, costLegName);
        let costSpec = [{type: 'line', text: '总费用环比'}];
        let costSeries = this.getSeries(costLeg, times, data, 'bar', costSpec);
        let costOption = {
            color: ['#3C9AE4', '#FF8787', '#2E8D87'],//图例颜色
            legend: {
                data: costText
            },
            grid: {
                bottom: '3%',
                containLabel: true
            },
            toolbox: {},
            xAxis: [
                {
                    type: 'category',
                    data: times
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '总费用',
                    min: 0,
                }, {
                    type: 'value',
                    name: '环比',
                    min: 'dataMin',
                    axisLabel: {}
                },
            ],
            series: costSeries
        };
//医保率、药占比
        let rateText = ['输液费用', '医保率', '药占比'];
        let rateLegName = ['zyfy', 'ybbl', 'yzb'];
        let rateLeg = this.mergeArray(rateText, rateLegName);
        let rateSpec = [{type: 'line', text: '医保率'}, {type: 'line', text: '药占比'}];
        let rateSeries = this.getSeries(rateLeg, times, data, 'bar', rateSpec);
        let rateOption = {
            tooltip: {
                trigger: 'axis',
            },
            color: ['#3C9AE4', '#7DAAAF', '#BE6868'],//图例颜色
            legend: {
                data: rateText
            },
            grid: {
                bottom: '3%',
                containLabel: true
            },
            toolbox: {},
            xAxis: [
                {
                    type: 'category',
                    data: times
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '金额',
                    min: 0,
                }, {
                    type: 'value',
                    scale: true,
                    name: '百分比',
                    min: 0,
                },
            ],
            series: rateSeries
        };

        this.setState({
            show: true,
            costOption: costOption,
            rateOption: rateOption,
        });
    };
    //切换总的表格显示
    toggleToChart = () => {
        const {selDetail} = api;
        let hospital = '59858562';
        selDetail(hospital, selDetail => {
            this.setState({
                agTable: !this.state.agTable,
                toRowData: selDetail
            })
        });
    };

    render() {
        let {toColumnDefs, toRowData, costOption, cost, costColumnDefs, rateOption, rate, rateColumnDefs, rowData, agTable, show,} = this.state;
        return (<div className={css.outPrescriptions}>
            <Search renderCanvas={this.renderCanvas} toggleToChart={this.toggleToChart} selData={this.selData}/>
            {agTable ? <div className={`ag-fresh ${css.agTable}`}>
                <AgGridReact
                    columnDefs={toColumnDefs}
                    rowData={toRowData}
                    enableColResize={true}//能否改变列宽
                    onCellClicked={this.rowClick}//行点击
                    headerHeight={30}//标题高
                    rowHeight={20}//行高
                    rowSelection='single'//单行选择
                    suppressCellSelection={false}//是否启用键盘导航
                    singleClickEdit={true}//单击启用编辑模式
                    stopEditingWhenGridLosesFocus={true}//网格失去焦点时停止单元格编辑
                    animateRows={true}//行动画
                    onGridReady={this.onGridReady}//基础api
                    suppressScrollOnNewData={true}//获取新数据不会滚动到顶部
                    ref="agGridReact"
                >
                </AgGridReact>
            </div> : <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Card title="门诊总费用、平均费用、总费用环比" option={costOption} id="cost" row={rowData} show={show}
                          column={costColumnDefs} isAg={cost} toggleChart={this.toggleChart.bind(this, 'cost')}/>
                </Col>
                <Col className="gutter-row" span={12}>

                    <Card title="医保率、药占比、输液费用" option={rateOption} id="outNum" row={rowData} show={show}
                          column={rateColumnDefs} isAg={rate} toggleChart={this.toggleChart.bind(this, 'rate')}/>
                </Col>
            </Row>}
        </div>)
    }
}
 
 
 