/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者病案信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import {Diagnosis} from './diagnosis';
import {Operation} from './operation';
import {OtherInfo} from './otherInfo';
import {CostInfo} from "./costInfo";
import {BaseInfo} from "./baseInfo";

export class MedicalRecord extends Component {
  componentWillMount() {
    this.state = {
      medicalRecord: this.props.medicalRecord || {}
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.medicalRecord !== this.state.medicalRecord) {
      this.setState({
        medicalRecord: nextProps.medicalRecord
      })
    }
  }

  render() {
    let {medicalRecord} = this.state;
    return (
      <div className="medical-record">
        <Tabs type="card">
          <TabPane tab="基本信息" key="1">
            <BaseInfo baseInfo={medicalRecord.patientInfo}/>
          </TabPane>
          <TabPane tab="诊断信息" key="2">
            <Diagnosis data={medicalRecord.diagnosisData||[]}/>
          </TabPane>
          <TabPane tab="手术信息" key="3">
            <Operation data={medicalRecord.operationData||[]}/>
          </TabPane>
          <TabPane tab="其他信息" key="4">
            <OtherInfo otherInfo={medicalRecord.patientInfo}/>
          </TabPane>
          <TabPane tab="费用信息" key="5">
            <CostInfo costInfo={medicalRecord.patientInfo} zz/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}