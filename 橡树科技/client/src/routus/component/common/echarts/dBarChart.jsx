/**
 * Created by liulingli on 2017/5/25.
 * 堆叠柱状图
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

export class DBarChart extends Component{
  componentWillMount(){
    this.className = this.props.className;
    this.title = this.props.option.title;
    this.dBarOption =  {
      color: ['#3398DB', '#2ec7c9', '#b6a2de'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:this.props.option.legendData
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
          data :this.props.option.xAxisData
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : this.props.option.seriesData
    };
    this.tableData = this.props.option.tableData;
  }
  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.className = nextProps.className;
      this.title = nextProps.option.title;
      this.dBarOption = {
        color: ['#3398DB', '#2ec7c9', '#b6a2de'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: nextProps.option.legendData
        },
        grid: {
          top: '45',
          left: '30',
          right: '30',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: nextProps.option.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: nextProps.option.seriesData
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
        option={this.dBarOption}
        tableData={this.tableData}
        echartId={this.props.echartId}
        showBtn={this.props.showBtn}
      />
    )
  }
}