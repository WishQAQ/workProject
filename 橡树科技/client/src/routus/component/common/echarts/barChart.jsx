/**
 * Created by liulingli on 2017/5/24.
 * desc 柱状图（单个图例）
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

export class BarChart extends Component{
    constructor(props) {
        super(props);
        this.className = this.props.className;
        this.title = this.props.option.title;
        this.barOption =  {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var tar = params[0];
                    return tar.axisValueLabel+":"+ tar.value.toFixed(4);
                }
            },
            grid: {
                top:'45',
                left: '30',
                right: '30',
                bottom: '0',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.props.option.xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:this.props.option.name,
                    type:'bar',
                    itemStyle:{
                        normal:{
                            label : {
                                show : false,
                                position : 'top',
                                formatter : "{c}",
                                textStyle : {
                                    fontSize : '14',
                                    fontFamily : '微软雅黑',
                                    fontWeight : 'bold',
                                    color:'#3398DB'
                                }
                            }
                        }

                    },
                    barWidth: '60%',
                    data:this.props.option.seriesData,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                }
            ]
        };
        this.tableData = this.props.option.tableData;
    }

    componentWillUpdate(nextProps){
        if(this.props !== nextProps){
            this.className = nextProps.className;
            this.title = nextProps.option.title;
            this.barOption =  {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top:'45',
                    left: '30',
                    right: '30',
                    bottom: '0',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : nextProps.option.xAxisData,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                tooltip:{
                    formatter: function (params) {
                        var tar = params[0];
                        return tar.axisValueLabel+ ":"+tar.value.toFixed(4);
                    }
                },
                series : [
                    {
                        name:nextProps.option.name,
                        type:'bar',
                        itemStyle:{
                            normal:{
                                label : {
                                    show : false,
                                    position : 'top',
                                    formatter : "{c}",
                                    textStyle : {
                                        fontSize : '14',
                                        fontFamily : '微软雅黑',
                                        fontWeight : 'bold',
                                        color:'#3398DB'
                                    }
                                }
                            }

                        },
                        barWidth: '60%',
                        data:nextProps.option.seriesData,
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                    }
                ]
            };
            this.tableData = nextProps.option.tableData;
        }

    }
    render(){
        let {...other} = this.props;
        return(
            <EchartContainer
                {...other}
                alone={this.props.alone}
                type={this.props.type}
                className={this.className}
                title={this.title}
                option={this.barOption}
                tableData={this.tableData}
                echartId={this.props.echartId}
                showBtn={this.props.showBtn}
            />
        )
    }
}
