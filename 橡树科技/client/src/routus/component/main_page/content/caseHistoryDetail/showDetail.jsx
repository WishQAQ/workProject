/**
 * Created by liulingli on 2017/6/22.
 * desc : 病历详情 展示内容
 */
import React, {Component} from "react";
import {Temperature} from "./twoLevelNav/temperatureChart/temperature";
import {MedicalRecordIndex} from "./twoLevelNav/medicalRecordIndex/medicalRecordIndex";
import {AdmissionNote} from "./twoLevelNav/admissionNote/admissionNote";
import {DoctorRecord} from "./twoLevelNav/doctorRecord/doctorRecord";
import {ExamineRecord} from "./twoLevelNav/examineRecord/examineRecord";
import {InspectRecord} from "./twoLevelNav/inspectRecord/inspectRecord";
import {ManagementRecord} from "./twoLevelNav/managementRecord/managementRecord";
import {MedicalRecord} from "./twoLevelNav/medicalRecord/medicalRecord";
import {PrescriptionRecord} from "./twoLevelNav/prescriptionRecord/prescriptionRecord";
import {Prescription} from "./twoLevelNav/prescription/prescription";
import {HealthData} from "./twoLevelNav/healthData/healthData";

export class ShowDetail extends Component {
  componentWillMount() {
    this.state = {
      type: this.props.type, //显示组件类别
      data: this.props.data, //患者信息
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.type !== this.state.type) {
      this.setState({
        type: nextProps.type
      })
    }
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  /**
   * @methos 根据传入type确定应展示的组件
   * @param type
   * @param data
   * @returns {XML}
   */
  getComponent = (type, data) => {
    console.log(data);
    switch (type) {
      case 'basy' :
        return <MedicalRecordIndex data={data}/>;
        break; //病案首页
      case 'twd' :
        return <Temperature data={data}/>;
        break; //体温单
      case 'cfjl' :
        return <PrescriptionRecord data={data}/>;
        break; //处方记录
      case 'yz' :
        return <DoctorRecord data={data}/>;
        break; //医嘱
      case 'zybl' :
        return <AdmissionNote data={data}/>;
        break; //住院病历
      case 'jc' :
        return <InspectRecord data={data}/>;
        break; //检查
      case 'jy' :
        return <ExamineRecord data={data}/>;
        break; //检验
      case 'blck' :
        return <MedicalRecord data={data}/>;
        break; //病历查看
      case 'cf' :
        return <Prescription data={data}/>;
        break; //处方
      case 'cz' :
        return <ManagementRecord data={data}/>;
        break; //处置
      case 'jk' :
        return <HealthData data={data}/>;
        break; //患者近五年健康数据
      default :
        return;
    }
  };

  render() {
    let {type, data} = this.state;
    return (
      <div className="show-detail">
        {this.getComponent(type, data)}
      </div>
    )
  }
}