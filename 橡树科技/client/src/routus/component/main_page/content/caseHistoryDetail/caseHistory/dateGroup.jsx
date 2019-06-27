/**
 * Created by liulingli on 2017/6/22.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，单个患者信息病历详情按日期分组
 */
import React, {Component} from "react";
import {HospitalData} from "./hospitalData";

export class DateGroup extends Component {
  componentWillMount() {
    this.state = {
      dateData: this.props.dateData, //日期数组
      isHosp: this.props.isHosp, //是否显示医院
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.dateData !== nextState.dateData) {
      this.setState({
        dateData: nextProps.dateData
      })
    }
    if (nextProps.isHosp !== nextState.isHosp) {
      this.setState({
        isHosp: nextProps.isHosp
      })
    }
  }

  render() {
    let {dateData, isHosp} = this.state;
    let {...other} = this.props;
    return (
      <div className="date-group">
        <p className="show-month">{dateData.date}<i className="point"/></p>
        <div className="hosp-total">
          {
            dateData.data.map((hosp, i) => {
              return <HospitalData key={i} hospData={hosp} isHosp={isHosp} { ...other } />
            })
          }
        </div>
      </div>
    )
  }
}