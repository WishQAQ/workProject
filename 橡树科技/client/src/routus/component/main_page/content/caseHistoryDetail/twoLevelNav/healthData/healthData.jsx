/**
 * Created by liulingli on 2017/7/8.
 * desc : 患者近五年的健康数据
 */
import React, {Component} from "react";
import classNames from "classnames";
import qs from 'qs';
import moment from 'moment';
import {message} from 'antd';
import {FlexContent,CardContainer,CardHeader,CardText} from "../../../../../common/card";
import {DBarChart,ScatterChart} from "../../../../../common/echarts";
import {NullInfo} from "../../../../../common/nullInfo";
import {Carousel} from '../../../../../common/carousel';


export class HealthData extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      costOption:{
        title : "费用分析",
        subtext:"费用总和,数据来自xxxx-xxxx年",
        legendData:['药品','检验','手术','检查','其他','总费用'],
        xAxisData:[],
        seriesData:[
          {
            name:'药品',
            type:'bar',
            stack: "cost",
            data:[]
          },
          {
            name:'检验',
            type:'bar',
            stack: "cost",
            data:[]
          },
          {
            name:'手术',
            type:'bar',
            stack: "cost",
            data:[]
          },
          {
            name:'检查',
            type:'bar',
            stack: "cost",
            data:[]
          },
          {
            name:'其他',
            type:'bar',
            stack: "cost",
            data:[]
          }, {
            name:'总费用',
            type:'line',
            stack: "totalCost",
            data:[]
          },
        ],
        tableData:{
          columns:[],
          dataSource:[],
        }
      },
      timeOption:{
        title : "时间分析",
        subtext:"时间分析,数据来自xxxx-xxxx年",
        legendData:['门诊','住院','出院','检查','检验','手术'],
        xAxisData:[],
        seriesData:[
          {name:"门诊",symbolSize :20, type:'scatter',data:[]},
          {name:"住院",symbolSize :18, type:'scatter',data:[]},
          {name:"出院",symbolSize :16, type:'scatter',data:[]},
          {name:"检查",symbolSize :14, type:'scatter',data:[]},
          {name:"检验",symbolSize :12, type:'scatter',data:[]},
          {name:"手术",symbolSize :10, type:'scatter',data:[]},
        ],
        tableData:{
          columns:[],
          dataSource:[],
        }
      }
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data
      })
      this.fetchData(nextProps.data.patChart);
    }
  }

  componentDidMount(){
    this.fetchData(this.state.data.patChart);
  }
  /**
   * 特殊需求，根据传入年份与当前年份的前五年获取下标
   * 获取数组下标
   */
  getSub = (year) =>{
    year =  parseInt(year);
    let date = new Date();
    let beginYear = date.getFullYear() - 5;
    return year - beginYear;
  }
  /* let data = {
   "fee":[//近年内费用统计数据
   {//某年的费用统计数据，可重复0次或n次，fee为0的节点可能没有，即缺省统计项的费用为0
   "year":"2017",//年份
   "item":"检查",//统计项目
   "fee":"32.4"//项目总费用
   }
   ],
   "time":[//近年内时间点分布数据
   {//时间点分布数据，可重复0次或n次
   "day":"2014-03-23",//分布时间点
   "item":"门诊"//分布项目
   }
   ]
   };*/
  fetchData = (data) =>{
    console.log(data);
    let zone = data.zone;
    console.log(zone);
    let beginDate = parseInt(zone[1]);
    let endDate = parseInt(zone[0]);
    let costXAxisData = [];
    let timeXAxisData = [beginDate+"年"];
    for(let i=beginDate;i<=endDate;i++){
      costXAxisData.push(i+"年");
      timeXAxisData.push((i+1)+"年")
    }
    //解析
    let feeSeriesData = [];
    let timeSeriesData = [];
    let feiArray = (data.fee?data.fee.data||[]:[]);
    let timeArray = (data.time?data.time.data||[]:[]);
    //近5年费用初始化
    let ypFee = [0,0,0,0,0,0]; //药品
    let jcFee = [0,0,0,0,0,0]; //检查
    let jyFee = [0,0,0,0,0,0]; //检验
    let ssFee = [0,0,0,0,0,0]; //手术
    let qtFee = [0,0,0,0,0,0]; //其他
    let totalFee = [0,0,0,0,0,0];// 总费用
    for(let i=0;i<feiArray.length;i++){
      let year = feiArray[i].year;
      let fee = feiArray[i].fee||0;
      let sub = this.getSub(year);
      switch(feiArray[i].item){
        case "药品" : ypFee[sub] = fee;break;
        case "检查" : jcFee[sub] = fee;break;
        case "检验" : jyFee[sub] = fee;break;
        case "手术" : ssFee[sub] = fee;break;
        case "其他" : qtFee[sub] = fee;break;
        default :break;
      }
    }
    //计算总费用
    for(let i=0;i<totalFee.length;i++){
      totalFee[i] = ypFee[i] + jcFee[i] + jyFee[i] + ssFee[i] + qtFee[i];
    }
    // 近五年项目分布初始化
    /*'门诊','住院','出院','检查','检验','手术'*/
    let mzItem = [];
    let zyItem = [];
    let cyItem = [];
    let jcItem = [];
    let jyItem = [];
    let ssItem = [];
    for(let i=0;i<timeArray.length;i++){
      let item = timeArray[i].item;
      let date = timeArray[i].day;
      //生成散点图需要的数据
      let year = parseInt(moment(date).format('YYYY')); //年份，转换成数字类型
      let month = parseInt(moment(date).format('MM'));  //月份，转换成数字类型
      let day = parseInt(moment(date).format('DD'));  //天数，转换成数字类型
      /**
       * 计算当前日期的当前年份占比
       * 1. 计算该日期当前年份的总天数，闰年366天，平年365天
       * 2. 计算该日期的从年初到日期的天数
       */
      let totalDays = year % 4 === 0 ? 366 : 365; // 初始化总天数
      let days = day; // 初始化截止天数
      for(let i=0;i<month;i++){
        days += parseInt(moment(new Date(year,i+1,0)).format('DD'));
      }
      let monthDays = parseInt(moment(new Date(year,month,0)).format('DD'));
      let yearPer =  parseFloat(parseFloat(year + days/totalDays).toFixed(2));
      let monthPer = parseFloat(parseFloat(month + day/monthDays).toFixed(2));
      let itemArray = [yearPer,monthPer];
      switch (item){
        case "门诊" : mzItem.push(itemArray);break;
        case "住院" : zyItem.push(itemArray);break;
        case "出院" : cyItem.push(itemArray);break;
        case "检查" : jcItem.push(itemArray);break;
        case "检验" : jyItem.push(itemArray);break;
        case "手术" : ssItem.push(itemArray);break;
        default : break;
      }
    }
    this.setState({
      costOption:{
        title : "费用分析",
        subtext:"费用总和,数据来自"+beginDate+"-"+endDate+"年",
        legendData:['药品','检验','手术','检查','其他','总费用'],
        xAxisData:costXAxisData,
        seriesData:[
          {
            name:'药品',
            type:'bar',
            stack: "cost",
            data:ypFee
          },
          {
            name:'检验',
            type:'bar',
            stack: "cost",
            data:jyFee
          },
          {
            name:'手术',
            type:'bar',
            stack: "cost",
            data:ssFee
          },
          {
            name:'检查',
            type:'bar',
            stack: "cost",
            data:jcFee
          },
          {
            name:'其他',
            type:'bar',
            stack: "cost",
            data:qtFee
          }, {
            name:'总费用',
            type:'line',
            stack: "totalCost",
            data:totalFee
          },
        ],
        tableData:{
          columns:[],
          dataSource:[],
        }
      },
      timeOption:{
        title : "时间分析",
        subtext:"时间分析,数据来自"+beginDate+"-"+endDate+"年",
        legendData:['门诊','住院','出院','检查','检验','手术'],
        xAxisData:timeXAxisData,
        seriesData:[
          {name:"门诊",symbolSize :20, type:'scatter',data:mzItem},
          {name:"住院",symbolSize :18, type:'scatter',data:zyItem},
          {name:"出院",symbolSize :16, type:'scatter',data:cyItem},
          {name:"检查",symbolSize :14, type:'scatter',data:jcItem},
          {name:"检验",symbolSize :12, type:'scatter',data:jyItem},
          {name:"手术",symbolSize :10, type:'scatter',data:ssItem},
        ],
        tableData:{
          columns:[],
          dataSource:[],
        }
      },
    })
  }
  render() {
    let {className} = this.props;
    let {data,costOption,timeOption} = this.state;
    return (
      <div className={classNames("health-data", className)}>
        <h3 className="title">{data.name}近六年健康数据</h3>
        <FlexContent className="health-echart">
          <CardContainer>
            <CardText>
              <Carousel totalNum={2} curIndex={0}>
                <DBarChart
                  alone={true}
                  type={1}
                  option={costOption}
                  isNull={false}
                  echartId="echart0"
                  showBtn={false}
                />
                <ScatterChart
                  alone={true}
                  type={1}
                  option={timeOption}
                  isNull={false}
                  echartId="echart1"
                  showBtn={false}
                />
              </Carousel> : <NullInfo/>
              }
            </CardText>
          </CardContainer>
        </FlexContent>
      </div>
    )
  }
}