/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';
import {message, Spin} from 'antd';
import {clone} from "../../../../../common/function";
import api from '../../../../electronic_medical_record/api'
import {PatientInfo} from './patientInfo';
import {MedicalRecord} from './medicalRecord';

let flag = true

export class MedicalRecordIndex extends Component {
  componentWillMount() {
    flag=true
    this.state = {
      data: this.props.data,
      patientInfo: {},
      medicalRecord: {},
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data
      });
      this.queryFetch();
    }
  }

  componentDidMount() {
    this.queryFetch();
  }

  componentWillUnmount(){
    flag=false
  }

  /***
   * 返回唯一的key
   * @param arr
   * @returns {*}
   */
  backUniqueKey = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].key = i;
    }
    return arr;
  };
  /*
   * 根据patientID和visitID查询患者病案信息
   * */
  queryFetch = () => {
    const {data} = this.state;
    const {loadData} = api;
    let param = {
      action: 'inpFirstPage',
      message: data
    };
    this.setState({
      loading: true
    });
    loadData(param, response => {
      if (response.success) {
        let data = response.data;
        data.diagnosis = data.diagnosis && data.diagnosis.length ? this.backUniqueKey(data.diagnosis) : data.diagnosis;
        data.operation = data.operation && data.operation.length ? this.backUniqueKey(data.operation) : data.operation;
        this.setState({
          medicalRecord: {
            patientInfo: data.patientInfo && data.patientInfo.length ? data.patientInfo[0] : {},
            diagnosisData: data.diagnosis || [],
            operationData: data.operation || [],
          },
          patientInfo: data.patientInfo && data.patientInfo.length ? data.patientInfo[0] : {},
          loading: false
        })
      } else {
        this.setState({
          loading: false
        });
        console.error("response error", response);
      }
    });
  };

  render() {
    let {patientInfo, medicalRecord, data, loading} = this.state;
    return (
      <div className="medical-record-index">
        <Spin spinning={loading}>
          <h2 className="title">
            <p>{data.hspName}</p>
            <p>病案首页</p>
          </h2>
          <PatientInfo patientInfo={patientInfo}/>
          <MedicalRecord medicalRecord={medicalRecord}/>
        </Spin>
      </div>
    )
  }
}