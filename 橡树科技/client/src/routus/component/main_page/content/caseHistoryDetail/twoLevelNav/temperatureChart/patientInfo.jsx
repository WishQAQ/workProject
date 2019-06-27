/**
 * Created by liulingli on 2017/7/5.
 * desc : 体温单 患者基本信息
 */
import React, {Component} from "react";
import moment from "moment";

export class PatientInfo extends Component {
  componentWillMount() {
    this.state = {
      hospital: this.props.hospital, //医院
      patientList: this.props.patientList, //患者基本信息
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hospital: nextProps.hospital, //医院
      patientList: nextProps.patientList, //患者基本信息
    })
  }

  render() {
    let {hospital, patientList} = this.state;
    return (
      <table className="patInfo">
        <tbody>
        <tr>
          <td colSpan="4">
            <h1>
              {hospital}
            </h1>
          </td>
        </tr>
        <tr>
          <td colSpan="4"><h3>体温表</h3></td>
        </tr>
        <tr className="percent4">
          <td><span className="btitle">姓名：</span><span className="bline">{patientList.name }</span></td>
          <td><span className="btitle">性别：</span><span className="bline">{patientList.sex }</span></td>
          <td><span className="btitle">年龄：</span><span className="bline">{patientList.age}</span></td>
          <td><span className="btitle">入院日期：</span><span className="bline">{moment(patientList.treatDate).format("YYYY-MM-DD")}</span></td>
        </tr>
        <tr className="percent4">
          <td><span className="btitle">科室：</span><span className="bline">{patientList.deptName}</span></td>
          <td><span className="btitle">床号：</span><span className="bline">{patientList.bedNo }</span></td>
          <td><span className="btitle">住院号：</span><span className="bline">{patientList.medicalNo}</span></td>
          <td><span className="btitle">病案号：</span><span className="bline">{patientList.medicalNo}</span></td>
        </tr>
        </tbody>
      </table>
    )
  }
}
