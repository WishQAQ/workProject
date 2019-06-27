/**
 * Created by liulingli on 2017/6/19.
 * desc : 病历详情 患者信息
 */
import React, {Component} from "react";
import classNames from "classnames";
import moment from "moment";

export class PatientInfo extends Component {
  componentWillMount() {
    this.state = {
      patientInfo: this.props.patientInfo
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.patientInfo !== nextState.patientInfo) {
      this.setState({
        patientInfo: nextProps.patientInfo
      })
    }
  }

  render() {
    let {sex, name, insuranceNo, birthday, healthCard, idNo, empi, nation} = this.state.patientInfo;
    let className = sex === '女' ? "icon-girl" : sex === '男' ? "icon-man" : "icon-weizhi";
    return (
      <ul className="info-list">
        <li><i className={classNames("iconfont sex-icon", className)}/></li>
        <li>患者姓名：<span>{name ? name : "-"}</span></li>
        <li>医保号：<span>{insuranceNo ? insuranceNo : "-"}</span></li>
        <li>健康档案号：<span>{healthCard ? healthCard : "-"}</span></li>
        <li>身份证号：<span>{idNo ? idNo : "-"}</span></li>
        <li>出生日期：<span>{birthday ? moment(birthday).format("YYYY-MM-DD") : "-"}</span></li>
        <li>民族：<span>{nation ? nation : "-"}</span></li>
        <li>区域ID：<span>{empi ? empi : "-"}</span></li>
      </ul>
    )
  }
}