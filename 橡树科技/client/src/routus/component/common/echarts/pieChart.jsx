/**
 * Created by liulingli on 2017/5/24.
 * 环形图表
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

export class PieChart extends Component{
  componentWillMount(){
    this.className = this.props.className;
    this.title = this.props.option.title;
    this.pieOption =  {
      color: ['#3398DB', '#2ec7c9', '#b6a2de'],
      grid: {
        top:'10',
        left: '30',
        right: '30',
        bottom: '20',
        containLabel: true
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x: 'center',
        y:'top',
        data: this.props.option.legendData
      },
      series: [{
        name: this.props.option.title,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        labelLine: {
          normal: {
            show: true
          }
        },
        data:this.props.option.seriesData,
      }]
    };
    this.tableData = this.props.option.tableData;
  }
  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.className = nextProps.className;
      this.title = nextProps.option.title;
      this.pieOption =  {
        color: ['#3398DB', '#2ec7c9', '#b6a2de'],
        grid: {
          top:'10',
          left: '30',
          right: '30',
          bottom: '20',
          containLabel: true
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y:'top',
          data: nextProps.option.legendData
        },
        series: [{
          name: nextProps.option.title,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          labelLine: {
            normal: {
              show: true
            }
          },
          data:nextProps.option.seriesData,
        }]
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
        option={this.pieOption}
        tableData={this.tableData}
        echartId={this.props.echartId}
        showBtn={this.props.showBtn}
      />
    )
  }
}