/**
 * description:体温表
 * author: mou
 * time:2017-12-13
 */
import React from 'react'
import qs from 'qs'
import {Icon, DatePicker, message} from 'antd'
import moment from 'moment'
import {TemperatureChart} from "./../../content/caseHistoryDetail/twoLevelNav/temperatureChart/temperatureChart";
import css from '../eleMedical.scss'
import api from '../api'
let timeFrom, timeTo;
export class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: {},
      time: '',
      beginDay: moment().format('YYYY-MM-DD'),
      patientInfo: {},//患者信息
      loading: true,
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
      temperatureParam: {},
      userInfo:{},
      patientList:{}
    };
  };

  componentWillMount() {
    this.setState({
      param: this.props.data,
      temperatureParam: this.props.temperatureParam,
      time:this.props.temperatureParam.timeFrom
    },()=>{
      this.renderData();
    });
    timeFrom = this.props.temperatureParam.timeFrom;
    timeTo = this.props.temperatureParam.timeTo
  }

  componentWillReceiveProps(next) {
    this.setState({
      param: next.data,
      temperatureParam: next.temperatureParam,
      time:next.temperatureParam.timeFrom
    },()=>{
      this.renderData();
    });
    timeFrom = next.temperatureParam.timeFrom;
    timeTo = next.temperatureParam.timeTo
  }

  renderData = () => {
    let param = {};
    param.action = 'temperature';
    param.message = {
      patientId: this.state.param.patientId,
      hospitalCode: this.state.param.hospitalCode,
      visitId: '',
      timeType: 4,
      time: this.state.time,
    };
    param.message = JSON.stringify(param.message);
    this.setState({
      loading:true
    });
    fetch('/wss/wss/loadWss1', {method: "POST", body: qs.stringify(param)}).then(response => {
      if (response.success) {
        const data = response.data;
        this.setState({
          beginDay: data.dataList.beginDay,
          breathingList: data.dataList.breathingList,
          dayList: data.dataList.dayList,
          dayMap: data.dataList.dayMap,
          dayOps: data.dataList.dayOps,
          pointTime: data.dataList.pointTime,
          patientInfo: data.patientsInfo,
        })
      } else {
        console.error("response error", response);
      }
    });
    let param2={
      action:'patTrans',
      message:{
        patientId: this.state.param.patientId,
        hospitalCode: this.state.param.hospitalCode,
        time:this.state.time,
      }
    };
    param2.message = JSON.stringify(param2.message);
    fetch('/wss/wss/loadWss', {method: "POST", body: qs.stringify(param2)}).then(response => {
      if (response.success) {
        response.data.admissionDateTime=timeFrom;
        response.data.dischargeDateTime=timeTo;
        this.setState({
          patientList:response.data,
        })
      } else {
        console.error("response error", response);
      }
    });
    this.setState({
      loading:false
    })
  };
/*  onChange = (date, dateString) => {
    const {temperatureParam} = this.state;
    if (dateString < temperatureParam.timeFrom) {
      message.warning('开始时间不能小于入院时间');
      return false
    }
    if (dateString > temperatureParam.timeTo) {
      message.warning('开始时间不能大于入院时间');
      return false
    }
    this.setState({
      time: dateString
    }, () => {
      this.renderData();
    })
  };*/

/*  change = (curDate, disDays, e) => {
    console.log(e.target);
    let dom=e.target.parentNode.querySelectorAll('li');
    for(let i=0;i<dom.length;i++){
      dom[i].className=''
    }
    e.target.className =css.active;
    let admissionDateTime = timeFrom; //入院时间
    let dischargeDateTime = timeTo || moment(new Date()).format("YYYY-MM-DD");//出院时间，如果还未出院，则默认为当前时间
    let admissionDay = new Date(moment(admissionDateTime).format("YYYY-MM-DD"));
    let dischargeDay = new Date(moment(dischargeDateTime).format("YYYY-MM-DD"));
    let newDate;
    if (typeof disDays === "string") {
      if (disDays === "first") { //第一周,开始时间为入院时间
        newDate = admissionDateTime;
      } else if (disDays === "last") { //最后一周，开始时间为出院时间，如果还未出院，则为传入当前时间
        newDate = timeTo;
      }
    } else {
      newDate = moment(curDate).add(disDays);
    }
    let beginDate = new Date(moment(newDate).format("YYYY-MM-DD"));
    if (beginDate < admissionDay) {
      message.warning("开始时间不能小于入院时间");
      return;
    } else if (beginDate > dischargeDay) {
      message.warning("开始时间不能大于出院时间");
      return;
    }
    this.setState({
      time: moment(beginDate).format("YYYY-MM-DD")
    }, () => {
      this.renderData();
    })
  };*/
  /**
   * 改变开始时间
   */
  changeBeginDay = (newDate) => {
    if (newDate !== this.state.beginDate) {
      this.setState({
        time:newDate
      },()=>{
        this.renderData();
      })
    }
  };
  render() {
    const {dayOps, breathingList, dayList, dayMap, pointTime,patientList, patientInfo, beginDay, loading,userInfo,temperatureParam} = this.state;
    return (<div className={css.temperature}>
{/*      <div className={css.condition}>
        <DatePicker onChange={this.onChange}/>
      </div>
      <div className={css.tempContent}>
        <p className={css.title}>{temperatureParam.hospitalName}<span>体温表</span></p>
        <div className={css.info}>
          <p>
            <span>{userInfo.sex === '男' ?<i className={css.nan}></i>:userInfo.sex === '女' ?<i className={css.nv}></i>:<i className={css.noSex}></i>}姓名:{userInfo.name}</span>
            <span>年龄:{userInfo.age}</span>
            <span>入院日期:{userInfo.treatDate}</span>
          </p>
          <p>
            <span>科室:{userInfo.deptName}</span>
            <span>床号:{userInfo.bedNo}</span>
            <span>住院号:{userInfo.medicalNo}</span>
            <span>病区号:{userInfo.medicalNo}</span>
          </p>
        </div>
        <hr className={css.hr}/>

      </div>*/}
      <TemperatureChart
        hospital={temperatureParam.hospitalName}
        beginDate={beginDay}
        patientList={patientList}
        dayOps={dayOps}
        breathingList={breathingList}
        dayList={dayList}
        dayMap={dayMap}
        pointTime={pointTime}
        changeBeginDay={this.changeBeginDay}
        loading={loading}
      />
    {/*  <ul className={css.aside}>
        <li><Icon type="printer"/>打印</li>
        <li onClick={this.change.bind(this, beginDay, -7)}><Icon type="calendar"/>上一周</li>
        <li onClick={this.change.bind(this, beginDay, 7)}><Icon type="calendar"/>下一周</li>
        <li onClick={this.change.bind(this, beginDay, 'first')}><Icon type="file"/>第一周</li>
        <li onClick={this.change.bind(this, beginDay, 'last')}><Icon type="file"/>最后一周</li>
      </ul>*/}
    </div>)
  }
}
 
 
 