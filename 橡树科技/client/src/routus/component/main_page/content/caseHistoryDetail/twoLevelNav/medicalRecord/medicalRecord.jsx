/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-门诊-病历查看
 */
import React, {Component} from "react";
import qs from "qs";
import {Spin} from "antd";

export class MedicalRecord extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      medicalRecord: {},
      type: 1,
      loading: true,
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      this.setState({
        data: nextProps.data,
      });
      this.queryFetch();
    }
  }

  componentDidMount() {
    this.queryFetch();
    this.getWidth();
    document.addEventListener("resize", this.getWidth);
  }

  componentWillUnmount() {
    document.removeEventListener("resize", this.getWidth);
  }

  /*
   * 根据visitNo和hspCode、time查询门诊病历
   * */
  queryFetch = () => {
    let {data} = this.state;
      console.log("时间==",data);
    let param = {
      visitNo: data.clinicNo,
      time: data.clinicDate,
      hspCode: data.hspCode
    };
    fetch("/caseHistory/PatientMedicalHistory/getHspOutpEmr", {
      method: "POST",
      body: qs.stringify(param)
    }).then(response => {
      if (response.success) {
        if (response.data !== "") {
          let data = response.data;
          if(data.length>0){
              this.setState({
                  medicalRecord: data[0],
                  loading: false,
              })
          }else{
              this.setState({
                  loading: false,
              });
          }
        } else {
          this.setState({
            loading: false,
          })
        }
      } else {
        this.setState({
          loading: false,
        })
        throw new Error(response.message);
      }
    })
  }
  getWidth = () => {
    let width = document.body.offsetWidth;
    if (width <= 1024) {
      this.setState({
        type: 1,
      })
    } else {
      this.setState({
        type: 2
      })
    }
  }

  render() {
    let {loading, data, medicalRecord, type} = this.state;
    return (
      <div className="medical-record">
        <Spin spinning={loading}>
          <h2 className="title">
            <p>{data.hspName}</p>
            <p>病历查看</p>
          </h2>
          <div className="medical-record-table">
            <table>
              <colgroup>
                <col width="50px"/>
                <col width="50px"/>
                <col width="40px"/>
                <col width="40px"/>
                <col width="40px"/>
                <col width="45px"/>
                <col width="40px"/>
                <col width="40px"/>
                <col width="60px"/>
                <col width="120px"/>
                <col width="45px"/>
                <col width="60px"/>
              </colgroup>
              <tbody>
              <tr>
                <th>ID</th>
                <td>{medicalRecord.patiendId}</td>
                <th>性别</th>
                <td>{medicalRecord.sex}</td>
                <th>年龄</th>
                <td>{medicalRecord.age}</td>
                <th>费别</th>
                <td>{medicalRecord.chargeType}</td>
                <th>就诊日期</th>
                <td>{medicalRecord.time}</td>
                <th>医生</th>
                <td>{medicalRecord.doctor}</td>
              </tr>
              <tr>
                <th>主诉</th>
                <td colSpan={11}>{medicalRecord.illnessDesc}</td>
              </tr>
              <tr>
                <th>月经史</th>
                <td colSpan={11}>{medicalRecord.menses}</td>
              </tr>
              <tr>
                <th>过去史</th>
                <td colSpan={11}>{medicalRecord.anamnesis}</td>
              </tr>
              <tr>
                <th>家族史</th>
                <td colSpan={11}>{medicalRecord.familyIll}</td>
              </tr>
              <tr>
                <th>现病史</th>
                <td colSpan={11}>{medicalRecord.medHistory}</td>
              </tr>
              <tr>
                <th>过敏史</th>
                <td colSpan={11}>{medicalRecord.individual}</td>
              </tr>
              <tr>
                <th>体检</th>
                <td colSpan={11}>{medicalRecord.bodyExam}</td>
              </tr>
              <tr>
                <th>建议</th>
                <td colSpan={11}>{medicalRecord.medicalRecord}</td>
              </tr>
              <tr>
                <th>诊断</th>
                <td colSpan={11}>{medicalRecord.diagDesc}</td>
              </tr>
              <tr>
                <th>处理</th>
                <td colSpan={11}>{medicalRecord.advice}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
    )
  }
}