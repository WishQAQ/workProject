/**
 * Created by liulingli on 2017/6/20.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，单个患者信息病历详情
 */
import React, {Component} from "react";
import moment from "moment";
import {arraySort, clone} from "../../../common/function";
import {YearItem} from "./caseHistory/yearItem";

export class CaseHistory extends Component {
  componentWillMount() {
    this.state = {
      clinicRecList: this.props.clinicRecList,
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.clinicRecList !== nextState.clinicRecList) {
      this.setState({
        clinicRecList: nextProps.clinicRecList
      })
    }
  }

  parseClinicRecList = (clinicRecList) => {
    if (clinicRecList.length === 0) {
      return (
        <div className="no-info">
          <i className="iconfont icon-404"/><span>该患者没有病历详情信息</span>
        </div>
      );
    } else {
      return (
        <div className="info">
          {this.createHtml(this.parseData(clinicRecList))}
        </div>
      )
    }
  };

  /* 将得到的病历数据解析成特定的格式 */
  parseData = (clinicRecList) => {
    // 1.按年份分组
    let caseHistory = {};
    for (let i = 0; i < clinicRecList.length; i++) {
      let happenDate = clinicRecList[i].clinicDate;
      let happenYear = moment(happenDate).format('YYYY');
      if (!caseHistory[happenYear]) {
        caseHistory[happenYear] = [];
      }
      caseHistory[happenYear].push(clinicRecList[i])
    }
    // 缓存数据，之后计算该年份下医院出现次数
    let cacheHistory = clone(caseHistory);
    // 2.按月份日期分组
    for (let key in caseHistory) {
      let data = caseHistory[key];
      let monthDays = {};
      for (let j = 0; j < data.length; j++) {
        let happenDate = data[j].clinicDate;
        let monthDay = moment(happenDate).format('MM-DD');
        if (!monthDays[monthDay]) {
          monthDays[monthDay] = []
        }
        monthDays[monthDay].push(data[j])
      }
      caseHistory[key] = monthDays;
    }
    // 3.按医院分组
    for (let key in caseHistory) {
      let data = caseHistory[key];
      for (let j in data) {
        let dayData = data[j];
        let hospitals = {};
        for (let k = 0; k < dayData.length; k++) {
          let hospital = dayData[k].hspName;
          if (!hospitals[hospital]) {
            hospitals[hospital] = [];
          }
          hospitals[hospital].push(dayData[k]);
        }
        data[j] = hospitals;
      }
    }
    // 4.计算医院出现次数
    let times = {};
    for (let key in cacheHistory) {
      let data = cacheHistory[key];
      let hosJson = {};
      for (let i = 0; i < data.length; i++) {
        let hospital = data[i].hspName;
        hosJson[hospital] = hospital;
      }
      let time = 0;
      let hospital;
      for (let i in hosJson) {
        time++;
        hospital = i;
      }
      times[key] = {};
      times[key]['time'] = time;
      times[key]['hospital'] = hospital;
    }
    // 5.解析排序，按时间倒序排列，如果该年只出现一家医院，则只在年份上显示医院，如果出现多家则在月份上显示医院
    // 定义病历详情数组
    let caseHistoryArray = [];
    for (let key in caseHistory) {
      let time = times[key].time;
      let data = caseHistory[key];
      //将data转换成数组
      let dataArray = [];
      for (let i in data) {
        //将医院以数组形式显示
        let hosArray = [];
        for (let j in data[i]) {
          hosArray.push({
            hospital: j,
            data: data[i][j]
          })
        }
        dataArray.push({
          date: i,
          data: hosArray
        });
      }
      function getNumber(json) {
        //将时间格式转换成数字
        let dateString = ('2017/' + json.date).replace(/-/g, '/');
        let num = new Date(dateString)
        return num;
      }

      //按时间排序
      dataArray = arraySort(dataArray, getNumber, 0);
      if (time > 1) {
        caseHistoryArray.push({
          year: key,
          data: dataArray,
        });
      } else {
        caseHistoryArray.push({
          year: key,
          data: dataArray,
          hospital: times[key].hospital
        });
      }
    }
    //年份排序
    function getYear(json) {
      return parseInt(json.year);
    }

    caseHistoryArray = arraySort(caseHistoryArray, getYear, 0);
    return caseHistoryArray;
  };
  /* 根据解析的数据生成内容 */
  createHtml = (history) => {
    let {...other} = this.props;
    return (
      <div className="history">
        {
          history.map((yearData, i) => {
            return <YearItem key={i} yearData={yearData} {...other}/>
          })
        }
      </div>
    )
  };

  render() {
    let {clinicRecList} = this.state;
    return (
      <div className="case-history">
        {this.parseClinicRecList(clinicRecList)}
      </div>
    )
  }
}