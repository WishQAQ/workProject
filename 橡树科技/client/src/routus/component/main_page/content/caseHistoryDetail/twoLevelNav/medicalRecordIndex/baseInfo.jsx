/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者病案信息-基本信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';
import {Table, Checkbox} from 'antd';
export class BaseInfo extends Component {
  componentWillMount() {
    this.state = {
      baseInfo: {}
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.baseInfo !== nextState.baseInfo) {
      this.setState({
        baseInfo: nextProps.baseInfo
      });
    }
  }

  render() {
    let {baseInfo} = this.state;
    return (
      <table className="base-info">
        <tbody>
        <tr>
          <th>名字</th>
          <td><input type="text" value={baseInfo.name || ""} id="name" disabled/></td>
          <th>性别</th>
          <td>
            <input type="text" value={baseInfo.sex || ""} id="sex" disabled/>
            {/*   <select id="sex" value={baseInfo.sex||""} disabled>
             <option value="">{}</option>
             <option value="0">未知</option>
             <option value="1">男</option>
             <option value="2">女</option>
             <option value="9">未定</option>
             </select>*/}
          </td>
          <th>出生日期</th>
          <td><input type="text" value={baseInfo.dateOfBirth ? moment(baseInfo.dateOfBirth).format("YYYY-MM-DD") : ""}
                     id="dateOfBirth" disabled/></td>
          <th>年龄</th>
          <td><input type="text" value={baseInfo.age || ""} id="age" disabled/></td>
          <th>国籍</th>
          <td><input type="text" value={baseInfo.citizenship || ""} id="citizenship" disabled/></td>
        </tr>
        <tr>
          <th>年龄不足一周岁</th>
          <td>
            <input type="text" value={baseInfo.babyAgeDay || ""} id="babyAgeDay" disabled/>
            <div className="input-group-addon">月</div>
          </td>
          <th>新生儿出生体重</th>
          <td>
            <input type="text" value={baseInfo.babyBirthWeight || ""} id="babyBirthWeight" disabled/>
            <div className="input-group-addon">克</div>
          </td>
          <th>新生儿入院体重</th>
          <td><input type="text" value={baseInfo.babyAdminWeight || ""} id="babyAdminWeight" disabled/></td>
          <th>出生地</th>
          <td colSpan="3"><input type="text" value={baseInfo.birthPlace || ""} id="birthPlace" disabled/></td>
        </tr>
        <tr>
          <th>籍贯</th>
          <td><input type="text" value={baseInfo.jg || ""} id="jiguan" disabled/></td>
          <th>民族</th>
          <td><input type="text" value={baseInfo.nation || ""} id="nation" disabled/></td>
          <th>身份证号</th>
          <td><input type="text" value={baseInfo.idNo || ""} id="idNo" disabled/></td>
          <th>职业</th>
          <td><input type="text" value={baseInfo.occupation || ""} id="occupation" disabled/></td>
          <th>婚姻</th>
          <td>
            <select id="maritalStatus" value={baseInfo.maritalStatus || ""} disabled>
              <option value="">{}</option>
              <option value="1">未婚</option>
              <option value="2">已婚</option>
              <option value="3">丧偶</option>
              <option value="4">离婚</option>
              <option value="9">其他</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>现住址</th>
          <td colSpan="5"><input type="text" value={baseInfo.mailingAddress || ""} id="mailingAddress" disabled/></td>
          <th>电话</th>
          <td><input type="text" value={baseInfo.homeTel || ""} id="homeTel" disabled/></td>
          <th>邮编</th>
          <td><input type="text" value={baseInfo.zipCode || ""} id="zipCode" disabled/></td>
        </tr>
        <tr>
          <th>户口地址</th>
          <td colSpan="7"><input type="text" value={baseInfo.nomen || ""} id="nomen" disabled/></td>
          <th>邮编</th>
          <td><input type="text" value={baseInfo.zipCode || ""} id="homeZip" disabled/></td>
        </tr>
        <tr>
          <th>工作单位及地址</th>
          <td colSpan="5"><input type="text" value={baseInfo.serviceAgency || ""} id="serviceAgency" disabled/></td>
          <th>单位电话</th>
          <td><input type="text" value={baseInfo.workTel || ""} id="workTel" disabled/></td>
          <th>邮编</th>
          <td><input type="text" value={baseInfo.workZip || ""} id="workZip" disabled/></td>
        </tr>
        <tr>
          <th>联系人姓名</th>
          <td><input type="text" value={baseInfo.nextOfKin || ""} id="nextOfKin" disabled/></td>
          <th>关系</th>
          <td><input type="text" value={baseInfo.relationship || ""} id="relationship" disabled/></td>
          <th>地址</th>
          <td colSpan="3"><input type="text" value={baseInfo.nextOfKinAddr || ""} id="nextOfKinAddr" disabled/></td>
          <th>电话</th>
          <td><input type="text" value={baseInfo.nextOfKinPhone || ""} id="nextOfKinPhone" disabled/></td>
        </tr>
        <tr>
          <th>入院日期</th>
          <td><input type="text"
                     value={baseInfo.admissionDateTime ? moment(baseInfo.admissionDateTime).format('YYYY-MM-DD') : ""}
                     id="admissionDateTime" disabled/></td>
          <th>入院科别</th>
          <td><input type="text" value={baseInfo.deptAdmissionTo || ""} id="deptAdmissionTo" disabled/></td>
          <th>病房</th>
          <td><input type="text" value={baseInfo.bedAdmissionTo || ""} id="bedAdmissionTo" disabled/></td>
          <th>转科科别</th>
          <td colSpan="3"><input type="text" value={baseInfo.zkkb || ""} id="name" disabled/></td>
        </tr>
        <tr>
          <th>出院日期</th>
          <td><input type="text"
                     value={baseInfo.dischargeDateTime ? moment(baseInfo.dischargeDateTime).format('YYYY-MM-DD') : ""}
                     id="dischargeDateTime" disabled/></td>
          <th>出院科别</th>
          <td><input type="text" value={baseInfo.deptDischargeFrom || ""} id="deptDischargeFrom" disabled/></td>
          <th>病房</th>
          <td><input type="text" value={baseInfo.bedAdmissionTo || ""} id="bedAdmissionTo" disabled/></td>
          <th>实际住院</th>
          <td colSpan="3"><input type="text" value={baseInfo.ryts || ""} id="ryts" disabled/></td>
        </tr>
        <tr>
          <th>入院途径</th>
          <td colSpan="9">
            <select value={baseInfo.rytj || ""} disabled>
              <option value="">{}</option>
              <option value="1">急诊</option>
              <option value="2">门诊</option>
              <option value="3">基层医疗机构转入</option>
              <option value="4">上级医疗机构转入</option>
              <option value="5">其他医疗机构转入</option>
              <option value="9">其他</option>
            </select>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}