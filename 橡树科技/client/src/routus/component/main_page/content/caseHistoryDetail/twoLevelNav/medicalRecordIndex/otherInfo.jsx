/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者病案信息-诊断信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';
import { Table,Checkbox } from 'antd';

export class OtherInfo extends Component{
  componentWillMount(){
    this.state= {
      otherInfo : {}
    }
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.otherInfo !== nextState.otherInfo){
      this.setState({
        otherInfo : nextProps.otherInfo
      });
    }
  }
  render(){
    let {otherInfo} = this.state;
    return (
      <table className="other-info">
        <tbody>
        <tr>
          <th>是否有过敏药</th>
          <td>
            <select value={otherInfo.ywgm||""} id="ywgm" disabled>
              <option value="">{}</option>
              <option value="1">无</option>
              <option value="2">有</option>
            </select>
          </td>
          <th>过敏药物</th>
          <td colSpan="5"><input type="text" value={otherInfo.alergyDrugs||""} id="alergyDrugs" disabled/></td>
        </tr>
        <tr>
          <th>死亡患者尸检</th>
          <td>
            <select value={otherInfo.autopsyIndicatorName||""} id="autopsyIndicatorName" disabled>
              <option value="">{}</option>
              <option value="1">是</option>
              <option value="2">否</option>
            </select>
          </td>
          <th>血型</th>
          <td>
            <select value={otherInfo.bloodType||""} id="bloodType" disabled>
              <option value="">{}</option>
              <option value="1">A   </option>
              <option value="2">B   </option>
              <option value="3">AB  </option>
              <option value="4">O   </option>
              <option value="5">不详  </option>
              <option value="6">未查  </option>
            </select>
          </td>
          <th>RH血型</th>
          <td>
            <select value={otherInfo.bloodTypeRh||""} id="bloodTypeRh" disabled>
              <option value="">{}</option>
              <option value="1">阴 </option>
              <option value="2">阳 </option>
              <option value="3">不详  </option>
              <option value="4">未查  </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>科主任</th>
          <td><input type="text" value={otherInfo.director||""} id="director" disabled/></td>
          <th>主（副主）任医生</th>
          <td><input type="text" value={otherInfo.chiefDoctor||""} id="chiefDoctor" disabled/></td>
          <th>主治医生</th>
          <td><input type="text" value={otherInfo.attendingDoctor||""} id="attendingDoctor" disabled/></td>
          <th>住院医师</th>
          <td><input type="text" value={otherInfo.doctorInCharge||""} id="doctorInCharge" disabled/></td>
        </tr>
        <tr>
          <th>责任护士</th>
          <td><input type="text" value={otherInfo.liabilityNurse||""} id="liabilityNurse" disabled/></td>
          <th>进修医师</th>
          <td><input type="text" value={otherInfo.advancedStudiesDoctor||""} id="advancedStudiesDoctor" disabled/></td>
          <th>实习医师</th>
          <td><input type="text" value={otherInfo.sxys||""} id="practiceDoctorOfGraduate" disabled/></td>
          <th>编码员</th>
          <td><input type="text" value={otherInfo.cataloger||""} id="cataloger" disabled/></td>
        </tr>
        <tr>
          <th>病案质量</th>
          <td>
            <select value={otherInfo.mrQuality||""} id="mrQuality" disabled>
              <option value="">{}</option>
              <option value="1">甲</option>
              <option value="2">乙 </option>
              <option value="3">丙 </option>
            </select>
          </td>
          <th>质控医师</th>
          <td><input type="text" value={otherInfo.doctorOfControlQuality||""} id="doctorOfControlQuality" disabled/></td>
          <th>质控护士</th>
          <td><input type="text" value={otherInfo.nurseOfControlQuality||""} id="nurseOfControlQuality" disabled/></td>
          <th>质控日期</th>
          <td><input type="text" value={otherInfo.dateOfControlQuality||""} id="dateOfControlQuality" disabled/></td>
        </tr>
        <tr>
          <th>离院方式</th>
          <td>
            <select value={otherInfo.dischargeDisposition||""} id="dischargeDisposition" disabled>
              <option value="">{}</option>
              <option value="1">医嘱离院 </option>
              <option value="2">医嘱转院 </option>
              <option value="3">医嘱转社区卫生服务机构/乡镇卫生院</option>
              <option value="4">非医嘱离院</option>
              <option value="5">死亡</option>
              <option value="9">其他 </option>
            </select>
          </td>
          <th>转院医疗机构名称</th>
          <td colSpan="5"><input type="text" value={otherInfo.zymcSq||""} id="zymcSq" disabled/></td>
        </tr>
        <tr>
          <th colSpan="2">是否有出院31天内再入院计划</th>
          <td>
            <select value={otherInfo.zryjh||""} id="zryjh" disabled>
              <option value="">{}</option>
              <option value="1">无</option>
              <option value="2">有</option>
            </select>
          </td>
          <th>目的</th>
          <td colSpan="4"><input type="text" value={otherInfo.zymd||""} id="zymd" disabled/></td>
        </tr>
        <tr>
          <th colSpan="2">昏迷时间（颅脑操作患者）:入院后</th>
          <td><input type="text" value={otherInfo.firstComaDay||""} id="firstComaDay" disabled/></td>
          <th>天</th>
          <td><input type="text" value={otherInfo.firstComaHour||""} id="firstComaHour" disabled/></td>
          <th>小时</th>
          <td><input type="text" value={otherInfo.firstComaMinute||""} id="firstComaMinute" disabled/></td>
          <th>分</th>
        </tr>
        <tr>
          <th colSpan="2">昏迷时间（颅脑操作患者）:入院前</th>
          <td><input type="text" value={otherInfo.backComaDay||""} id="backComaDay" disabled/></td>
          <th>天</th>
          <td><input type="text" value={otherInfo.backComaHour||""} id="backComaHour" disabled/></td>
          <th>小时</th>
          <td><input type="text" value={otherInfo.backComaMinute||""} id="backComaMinute" disabled/></td>
          <th>分</th>
        </tr>
        <tr>
          <th>抢救次数</th>
          <td><input type="text" value={otherInfo.emerTreatTimes||""} id="emerTreatTimes" disabled/></td>
          <th>挽救成功次数</th>
          <td><input type="text" value={otherInfo.escEmerTimes||""} id="escEmerTimes" disabled/></td>
          <th colSpan="2">门诊住院诊断是否符合</th>
          <td colSpan="2">
            <select value={otherInfo.inandout||""} id="inandout" disabled>
              <option value="">{}</option>
              <option value="1">是</option>
              <option value="2">否</option>
            </select>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}
