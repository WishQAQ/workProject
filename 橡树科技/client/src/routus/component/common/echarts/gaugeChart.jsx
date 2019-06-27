/**
 * Created by liulingli on 2017/5/25.
 * 仪表盘图表
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

//仪表盘图表
export class GaugeChart extends Component{
  componentWillMount(){
    this.className = this.props.className;
    this.title = this.props.option.title;
    this.seriesData = this.props.option.seriesData;
    this.gaugeOption = {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}"
      },
      series: [
        {
          name: this.seriesData[0].name,
          type: 'gauge',
          detail: {formatter: '{value}'},
          title : {
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 16,
              fontStyle: 'italic'
            }
          },
          data: [{value:this.seriesData[0].value, name:this.seriesData[0].name}]
        }
      ]
    };
    this.tableData = this.props.option.tableData;
  }
  componentWillUpdate(nextProps) {
    if (this.props !==nextProps) {
      this.className = nextProps.className;
      this.title = nextProps.option.title;
      this.seriesData = nextProps.option.seriesData;
      this.gaugeOption = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        grid: {
          top:'20',
          left: '30',
          right: '30',
          bottom: '5',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            restore: {show: true},
            saveAsImage: {show: true}
          },
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: [
          {
            name: this.seriesData[0].name,
            type: 'gauge',
            radius: '90%',
            center:['45%','55%'],
            detail: {formatter: '{value}%'},
            title : {
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 16,
                fontStyle: 'italic'
              }
            },
            data: [{value:this.seriesData[0].value, name:this.seriesData[0].name}]
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
        option={this.gaugeOption}
        tableData={this.tableData}
        echartId={this.props.echartId}
        showBtn={this.props.showBtn}
      />
    )
  }
}
