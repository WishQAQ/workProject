//单机构医疗服务量和床位情况
import React from "react";
import {Header} from './component/header'
import {NullInfo} from './../common/nullInfo'
import {Echart} from './component/chart'
import {Card,Row,Col} from 'antd';
import css from './style/medical_income.scss'    //引入sass样式表

export class ServiceAndBed extends React.Component {
    state = {
        title: '单机构医疗服务量和床位使用情况',
        show: false,
        mjzOption: {series: []},
        publicOption: {series: []},
        menZhenOption: {series: []},
        zhuYuanOption: {series: []},
        toggleText: '门诊',
        toggleData: ['mzMzybbxIncome', 'mzMzgrzfIncome', 'mzMzfybIncome', 'mzGxytbIncome', 'mzTnbtbIncome', 'mzXtxtbIncome'],
    };
    renderCanvas = (data, endYear, beginYear, hospital, hospitalKeys) => {
        let xAxisData = [];//x轴的时间
        for (let key in data[hospitalKeys[0]]) {
            let date = key;
            xAxisData.push(date)
        }
        //门急诊人次
        let mjzLegendName = ['cyrsQuantity', 'jzrFrequency', 'ptmzrFrequency', 'zjmzrFrequency', 'fzrmzrFrequency', 'zrmzrFrequency'];
        let mjzLengendData = ['出院', '急诊', '普通门诊', '专家门诊', '副主任医师门诊', '主任医师门诊'];
        let to = [];
        for (let i = 0; i < mjzLegendName.length; i++) {
            for (let j = 0; j < mjzLengendData.length; j++) {
                if (i === j) {
                    to.push({
                        text: mjzLengendData[j],
                        name: mjzLegendName[i],
                    });
                }
            }
        }
        let mjzSerise = [];
        for (let i = 0; i < to.length; i++) {
            let arr = [];
            for (let j = 0; j < xAxisData.length; j++) {
                let year = xAxisData[j];
                if (data[hospitalKeys] && data[hospitalKeys][year]) {
                    arr.push(data[hospitalKeys][year][to[i].name])
                } else {
                    arr.push(0)
                }
            }
            if (to[i].text === '出院' || to[i].text === '急诊') {
                mjzSerise.push({
                    name: to[i].text,
                    type: 'bar',
                    data: arr
                })
            } else {
                mjzSerise.push({
                    name: to[i].text,
                    type: 'bar',
                    stack: '门诊人次数',
                    data: arr
                })
            }
        }
        let mjzOption = {
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: mjzLengendData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {interval: 0, rotate: 40},
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '人数（人）',
                    left: 0,
                    minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                }
            ],
            series: mjzSerise
        };
        //门急诊人次(detail)
        let mjzLegendDetailName = ['mjzSnybhzFrequency', 'mjzSwybhzFrequency', 'mjzGxytbhzFrequency', 'mjzTnbtbhzFrequency'];
        let mjzLengendDetailData = ['市内医保患者', '市外医保患者', '高血压特病患者', '糖尿病特病患者'];
        let mjzDetail = [];
        for (let i = 0; i < mjzLegendDetailName.length; i++) {
            for (let j = 0; j < mjzLengendDetailData.length; j++) {
                if (i === j) {
                    mjzDetail.push({
                        text: mjzLengendDetailData[j],
                        name: mjzLegendDetailName[i],
                    });
                }
            }
        }
        let mjzDetailSerise = [];
        for (let i = 0; i < mjzDetail.length; i++) {
            let arr = [];
            for (let j = 0; j < xAxisData.length; j++) {
                let year = xAxisData[j];
                if (data[hospitalKeys] && data[hospitalKeys][year]) {
                    arr.push(data[hospitalKeys][year][mjzDetail[i].name])
                } else {
                    arr.push(0)
                }
            }
            if (mjzDetail[i].text === '高血压特病患者' || mjzDetail[i].text === '糖尿病特病患者') {
                mjzDetailSerise.push({
                    name: mjzDetail[i].text,
                    type: 'bar',
                    data: arr
                })
            } else {
                mjzDetailSerise.push({
                    name: mjzDetail[i].text,
                    type: 'bar',
                    stack: '门诊人次数',
                    data: arr
                })
            }
        }
        let mjzDetailOption = {
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: mjzLengendDetailData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {interval: 0, rotate: 40},
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '人数（人）',
                    left: 0,
                    minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                }
            ],
            series: mjzDetailSerise
        };
        //出院人次数
        let leaveLegendDetailName = ['cySnybhzQuantity', 'cySwybhzQuantity', 'cyGxytbhzQuantity', 'cyTnbtbhzQuantity'];
        let leaveLengendDetailData = ['市内医保患者', '市外医保患者', '高血压特病患者', '糖尿病特病患者'];
        let leaveDetail = [];
        for (let i = 0; i < leaveLegendDetailName.length; i++) {
            for (let j = 0; j < leaveLengendDetailData.length; j++) {
                if (i === j) {
                    leaveDetail.push({
                        text: leaveLengendDetailData[j],
                        name: leaveLegendDetailName[i],
                    });
                }
            }
        }
        let leaveDetailSerise = [];
        for (let i = 0; i < leaveDetail.length; i++) {
            let arr = [];
            for (let j = 0; j < xAxisData.length; j++) {
                let year = xAxisData[j];
                if (data[hospitalKeys] && data[hospitalKeys][year]) {
                    arr.push(data[hospitalKeys][year][leaveDetail[i].name])
                } else {
                    arr.push(0)
                }
            }
            if (leaveDetail[i].text === '高血压特病患者' || leaveDetail[i].text === '糖尿病特病患者') {
                leaveDetailSerise.push({
                    name: leaveDetail[i].text,
                    type: 'bar',
                    data: arr
                })
            } else {
                leaveDetailSerise.push({
                    name: leaveDetail[i].text,
                    type: 'bar',
                    stack: '门诊人次数',
                    data: arr
                })
            }
        }
        let leaveDetailOption = {
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: leaveLengendDetailData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {interval: 0, rotate: 40},
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '人数（人）',
                    left: 0,
                    minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                }
            ],
            series: leaveDetailSerise
        };
        //床位使用情况
        let bedLegendDetailName = ['sjkfzcrsSituation', 'sjzyzcrsSituation', 'cyzzyzcrsSituation'];
        let bedLengendDetailData = ['实际开放', '实际占用', '出院者占用'];
        let bedDetail = [];
        for (let i = 0; i < bedLegendDetailName.length; i++) {
            for (let j = 0; j < bedLengendDetailData.length; j++) {
                if (i === j) {
                    bedDetail.push({
                        text: bedLengendDetailData[j],
                        name: bedLegendDetailName[i],
                    });
                }
            }
        }
        let bedDetailSerise = [];
        for (let i = 0; i < bedDetail.length; i++) {
            let arr = [];
            for (let j = 0; j < xAxisData.length; j++) {
                let year = xAxisData[j];
                if (data[hospitalKeys] && data[hospitalKeys][year]) {
                    arr.push(data[hospitalKeys][year][bedDetail[i].name])
                } else {
                    arr.push(0)
                }
            }
            bedDetailSerise.push({
                name: bedDetail[i].text,
                type: 'line',
                data: arr
            })

        }
        let bedDetailOption = {
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: bedLengendDetailData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {interval: 0, rotate: 40},
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '床数（床）',
                    left: 0,
                    minInterval: 1,//设置成1保证坐标轴分割刻度显示成整数。
                }
            ],
            series: bedDetailSerise
        };
        //设置option
        this.setState({
            show: true,
        },()=>{
            this.setState({
                mjzOption: mjzOption,
                menZhenOption: mjzDetailOption,
                zhuYuanOption: leaveDetailOption,
                publicOption: bedDetailOption
            })
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
        const {title, show, mjzOption, menZhenOption, zhuYuanOption, publicOption} = this.state;
        return (<div className={css.ServiceAndBed}>
            <Header renderCanvas={this.renderCanvas} title={title} multiple={false}/>
            <div className={css.main} ref="main">
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Card title="门急诊人次数">
                            {show ? <Echart id="total" className={css.canvas} option={mjzOption}/> : <NullInfo/>}
                        </Card>
                        <Card title="床位使用情况">
                            {show ? <Echart id="menzhen" className={css.canvas} option={publicOption}/> : <NullInfo/>}
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Card title="门急诊人数（明细）">
                            {show ? <Echart id="public" className={css.canvas} option={menZhenOption}/> : <NullInfo/>}
                        </Card>
                        <Card title="出院人数（明细）">
                            {show ? <Echart id="zhuYuan" className={css.canvas} option={zhuYuanOption}/> : <NullInfo/>}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>)
    }
}