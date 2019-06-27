/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者基本信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';

export class PatientInfo extends Component {
  componentWillMount() {
    this.state = {
      patientInfo: this.props.patientInfo || {}
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.patientInfo!==this.state.nextProps){
        this.setState({
            patientInfo: nextProps.patientInfo
        });
    }
  }
  render() {
    let {patientInfo} = this.state;
    return (
      <div className="patient-info">
        <table className="patient-info-table">
          <tbody>
            <tr>
              <th>病人ID：</th>
              <td><input type="text" value={patientInfo.patientId||""}  disabled/></td>
              <th>住院号：</th>
              <td><input type="text" value={patientInfo.inpNo||""} disabled /></td>
              <th>姓名：</th>
              <td><input type="text" value={patientInfo.name||""} disabled /></td>
              <th>性别：</th>
              <td><input type="text" value={patientInfo.sex||""} disabled /></td>
              <th>出生日期：</th>
              <td><input type="text" value={patientInfo.dateOfBirth?moment(patientInfo.dateOfBirth).format("YYYY-MM-DD"):""} disabled /></td>
            </tr>
            <tr>
              <th>历次住院：</th>
              <td><input type="text" value={patientInfo.visitId||""} disabled /></td>
              <th>入院科室：</th>
              <td><input type="text" value={patientInfo.deptAdmissionTo||""} disabled /></td>
              <th>入院时间：</th>
              <td><input type="text" value={patientInfo.admissionDateTime?moment(patientInfo.admissionDateTime).format("YYYY-MM-DD"):""} disabled /></td>
              <th>出院科室：</th>
              <td><input type="text" value={patientInfo.deptDischargeFrom||""} disabled /></td>
              <th>出院日期：</th>
              <td><input type="text" value={patientInfo.dischargeDateTime?moment(patientInfo.dischargeDateTime).format("YYYY-MM-DD"):""} disabled /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}