/**
 * Created by liulingli on 2017/7/8.
 * desc 散点图
 */
import React, { Component } from 'react';
import {EchartContainer} from './echartContainer';

export class ScatterChart extends Component{
  constructor(props) {
    super(props);
    this.className = this.props.className;
    this.option = this.props.option;
    this.title = this.props.option.title;
    this.barOption =  {
      title : {
        subtext: this.option.subtext
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '6%',
        containLabel: true
      },
      tooltip : {
        //trigger: 'axis',
        showDelay : 0,
        formatter : function (params) {
          if (params.value.length > 1) {
            let year = parseInt(params.value[0]);
            let month = Math.floor(params.value[1]);
            let totaldays = new Date(year,month,0).getDate();
            let day = Math.round((params.value[1]-month)*totaldays);
            if(day<9){
              day = "0" + day;
            }
            return  year+"-"+month+"-"+day;
          }
        },
        axisPointer:{
          show: false,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1
          }
        }
      },
      legend: {
        data: this.option.legendData,
        left: 'right'
      },
      xAxis : [
        /*{
          type: 'category',
          min: 0,
          data: this.option.xAxisData
        }*/
        {
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: '{value} 年'
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          max:12,
          min:1,
          interval: 1,
          scale:true,
          axisLabel : {
            formatter: '{value} 月'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series : this.option.seriesData
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
        grid: {
          left: '3%',
          right: '3%',
          bottom: '6%',
          containLabel: true
        },
        tooltip : {
          //trigger: 'axis',
          showDelay : 0,
          formatter : function (params) {
            if (params.value.length > 1) {
              let year = parseInt(params.value[0]);
              let month = Math.floor(params.value[1]);
              let totaldays = new Date(year,month,0).getDate();
              let day = Math.round((params.value[1]-month)*totaldays);
              if(day<9){
                day = "0" + day;
              }
              return  year+"-"+month+"-"+day;
            }
          },
          axisPointer:{
            show: false,
            type : 'cross',
            lineStyle: {
              type : 'dashed',
              width : 1
            }
          }
        },
        legend: {
          data: nextProps.option.legendData,
          left: 'right'
        },
        xAxis : [
         /* {
            type: 'category',
            min: 0,
            data: this.option.xAxisData
          }*/
          {
            type : 'value',
            scale:true,
            max:2018,
            min:2012,
            interval: 1,
            axisLabel : {
              formatter: '{value} 年'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            max:12,
            min:1,
            interval: 1,
            scale:true,
            axisLabel : {
              formatter: '{value} 月'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series : nextProps.option.seriesData
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
