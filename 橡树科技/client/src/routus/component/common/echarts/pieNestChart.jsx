/**
 * Created by liulingli on 2017/5/24.
 * 嵌套环形图表
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

export class PieNestChart extends Component{
  componentWillMount(){
    this.className = this.props.className;
    this.title = this.props.option.title;
    this.seriesData = this.props.option.seriesData||[];
    this.pieNestOption =  {
      grid: {
        top:'20',
        left: '30',
        right: '30',
        bottom: '5',
        containLabel: true
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color:this.props.option.color,
      legend: {
        orient: 'vertical',
        x: 'left',
        data: this.props.option.legendData||[]
      },
      series: [
        {
          name:this.title,
          type:'pie',
          selectedMode: 'single',
          radius: [0, '40%'],

          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.seriesData[0]||[],
        },
        {
          name: this.props.option.title,
          type: 'pie',
          radius: ['50%', '80%'],
          label: {
            normal: {
              position: 'outer'
            }
          },
          data: this.seriesData[1]||[],
        }]
    };
    this.tableData = this.props.option.tableData;
  }
  componentWillUpdate(nextProps) {
    if (this.props != nextProps) {
      this.className = nextProps.className;
      this.title = nextProps.option.title;
      this.seriesData = nextProps.option.seriesData||[];
      this.pieNestOption =  {
        grid: {
          top:'20',
          left: '30',
          right: '30',
          bottom: '5',
          containLabel: true
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:nextProps.option.color,
        legend: {
          orient: 'vertical',
          x: 'left',
          data: nextProps.option.legendData
        },
        series: [
          {
            name:this.title,
            type:'pie',
            selectedMode: 'single',
            radius: [0, '45%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:this.seriesData[0]||[],
          },
          {
            name: this.title,
            type: 'pie',
            radius: ['55%', '80%'],
            label: {
              normal: {
                position: 'outer'
              }
            },
            data:this.seriesData[1]||[],
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
        option={this.pieNestOption}
        tableData={this.tableData}
        echartId={this.props.echartId}
        showBtn={this.props.showBtn}
      />
    )
  }
}