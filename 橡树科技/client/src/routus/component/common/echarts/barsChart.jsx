/**
 * Created by liulingli on 2017/7/8.
 * desc 柱状图（多个图例）
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

export class BarsChart extends Component{
  constructor(props) {
    super(props);
    this.className = this.props.className;
    this.option = this.props.option;
    this.title = this.props.option.title;
    this.barOption =  {
      title : {
        subtext: this.option.subtext
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '6%',
        containLabel: true
      },
      legend: {
        data: this.option.legendData,
        left: 'right',
        padding:2,
        itemGap:2
      },
      xAxis: [
        {
          type: 'category',
          data: this.option.xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          axisLabel: {
            formatter: '{value} 元'
          }
        }
      ],
      series:this.option.seriesData,
    };
    this.tableData = this.option.tableData;
  }

  componentWillUpdate(nextProps){
    if(this.props !== nextProps){
      this.className = nextProps.className;
      this.title = nextProps.option.title;
      this.barOption =  {
        title : {
          subtext: nextProps.option.subtext
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '6%',
          containLabel: true
        },
        legend: {
          data: nextProps.option.legendData,
          left: 'right',
          padding:2,
          itemGap:2
        },
        xAxis: [
          {
            type: 'category',
            data: nextProps.option.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            axisLabel: {
              formatter: '{value} 元'
            }
          }
        ],
        series:nextProps.option.seriesData,
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
