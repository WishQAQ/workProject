/**
 * Created by liulingli on 2017/7/4.
 * desc : 体温单
 */
import React, {Component} from "react";
import qs from "qs";
import {TemperatureChart} from "./temperatureChart";

export class Temperature extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      beginDate: this.props.data.clinicDate,
      patientList: {
        name: "胡定明", //姓名
        sex: "男", //性别
        age: "65", //年龄
        admissionDateTime: "2017-03-04", //入院时间
        endemicName: "心内科", //科室
        bedNo: "123", //床号
        inpNo: "Z23456", //住院号
        medicalHao: "Z23456" //病案号
      },
      dayOps: ['1', '2', '3', '4', '5', '6', '7'], //产后/术后天数
      breathingList: ['60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70'], //手术天数
      dayList: ['1', '2', '3', '4', '5', '6', '7'], //住院天数
      dayMap: {
        "{name:'总入量',units:'ml'}": ["", "", "", "", "", "44", ""],
        "{name:'体重',units:'g'}": ["", "", "", "", "", "47.5", ""]
      }, //每日录入信息
      pointTime: {
        tt: [{dataTime: "2017-07-01 06:00:00", value: "9"}, {
          dataTime: "2017-07-01 10:00:00",
          value: "8"
        }, {dataTime: "2017-07-01 14:00:00", value: "9"}],
        xl: [{dataTime: "2017-07-01 06:00:00", value: "90"}, {
          dataTime: "2017-07-01 10:00:00",
          value: "95"
        }, {dataTime: "2017-07-01 14:00:00", value: "92"}],
        mb: [{dataTime: "2017-07-01 06:00:00", value: "100"}, {
          dataTime: "2017-07-01 10:00:00",
          value: "102"
        }, {dataTime: "2017-07-01 14:00:00", value: "104"}],
        evenDatas: [{dataTime: "2017-07-01 06:00:00", value: "入院"}],
        wd: [{dataTime: "2017-07-01 06:00:00", value: "35.5", type: "yw"}, {
          dataTime: "2017-07-01 06:00:00",
          value: "36",
          type: "kw"
        }, {dataTime: "2017-07-01 06:00:00", value: "36.5", type: "gw"}],
        hzfx: [{dataTime: "2017-07-01 06:00:00", date: "2017-04-15", hour: "10", value: "80"}],
      },// 时间段录入信息
      loading: true
    }
  }

  componentDidMount() {
    let {beginDate, data} = this.state;
    this.fetchData(data, beginDate);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      this.setState({
        data: nextProps.data,
        beginDate: nextProps.data.clinicDate,
      })
    }
    let {beginDate, data} = this.state;
    this.fetchData(data, beginDate);
  }

  /* 请求患者体温单数据 */
  fetchData = (data, beginDate) => {
    let param = {
      patientId: data.patientId,
      visitId: data.clinicNo,
      hspCode: data.hspCode,
      timeType: 4,
      time: beginDate
    };
    //console.log(param)
    fetch("/caseHistory/patientTemperature/getHspPatientTemperature", {
      method: "POST",
      body: qs.stringify(param)
    }).then(response => {
      if (response.success) {
        console.log("-------------",response.data);
        let data = response.data;
        let patientList = data.patientsInfo;
        let dataList = data.dataList;
        let dayMap = data.dayMap;
        //console.log("beginDay:"+dataList.beginDay)
        this.setState({
          patientList: patientList || {},
          beginDate: dataList.beginDay,
          dayOps: dataList.dayOps || [],
          dayList: dataList.dayList || [],
          breathingList: dataList.breathingList || [],
          dayMap: dataList.dayMap || {},
          pointTime: dataList.pointTime || {},
          loading: false
        })
      } else {
        this.setState({
          loading: false
        });
        throw new Error(response.message);
      }
    });
  }
  /**
   * 改变开始时间
   */
  changeBeginDay = (newDate) => {
    if (newDate !== this.state.beginDate) {
      let {data} = this.state;
      this.fetchData(data, newDate);
    }
  }

  render() {
    let {loading, data, beginDate, patientList, dayOps, breathingList, dayList, dayMap, pointTime} = this.state;
    return (
      <TemperatureChart
        beginDate={beginDate}
        hospital={data.hspName}
        patientList={patientList}
        dayOps={dayOps}
        breathingList={breathingList}
        dayList={dayList}
        dayMap={dayMap}
        pointTime={pointTime}
        changeBeginDay={this.changeBeginDay}
        loading={loading}
      />
    )
  }
}