/**
 * description:电子病历共享
 * author: mou
 * time:2017-12-11
 */
import React from 'react'
import {Modal, Row, Col, Spin, message} from 'antd'
import {Search} from './componet/search'
import {Left} from './componet/left1'
import {Doctor} from './content/doctor'
import {PresRecord} from './content/presRecord'
import {OutMdicalRecords} from './content/outMedicalRecords'
import {Inspect} from './content/inspect'
import {Checkout} from './content/checkout'
import {Temperature} from './content/temperature'
import {AdmissionNode} from './content/admissionNote'
import {MedicalRecordIndex} from "./../content/caseHistoryDetail/twoLevelNav/medicalRecordIndex/medicalRecordIndex";//病案首页
import {AdmissionNote} from "./../content/caseHistoryDetail/twoLevelNav/admissionNote/admissionNote";  //门诊病历详情
import moment from 'moment'
import api from './api'
import css from './eleMedical.scss'

//医嘱
const columns = [
  {
    title: '长/临',
    dataIndex: 'repeatIndicator',
    width: 56,
  }, {
    title: '类别',
    dataIndex: 'className',
    width: 56,
  }, {
    title: '开始时间',
    dataIndex: 'startDateTime',
    width: 120,
    render: (value) => {
      return value ? moment(value).format('YYYY-MM-DD') : ''
    }
  }, {
    title: '医嘱内容',
    dataIndex: 'orderText',
    width: 120,
    render: (value) => {
      return <span className={css.orderText} title={value}>{value}</span>
    }
  }, {
    title: '阴',
    dataIndex: 'performResult',
    width: 56,
  }, {
    title: '剂量',
    dataIndex: 'dosage',
    width: 56,
  }, {
    title: '单位',
    dataIndex: 'dosageUnits',
    width: 56,
  }, {
    title: '途径',
    dataIndex: 'administration',
    width: 94,
  }, {
    title: '频次',
    dataIndex: 'frequency',
    width: 56,
  }, {
    title: '执行时间',
    dataIndex: 'verifyDateTime',
    width: 152,
    render: (value) => {
      return value ? moment(value).format('YYYY-MM-DD') : ""
    }
  }, {
    title: '停止时间',
    dataIndex: 'stopDateTime',
    width: 152,
    render: (value) => {
      return value ? moment(value).format('YYYY-MM-DD') : ""
    }
  }
];
//处方
const prescriptionColumns = [
  {
    title: '类别',
    dataIndex: 'itemClass',
    width: 56,
  }, {
    title: '项目名称',
    dataIndex: 'drugName',
    width: 152,
  }, {
    title: '数量',
    dataIndex: 'amount',
    width: 102,
  }, {
    title: '单位',
    dataIndex: 'units',
    width: 56,
  }, {
    title: '频次',
    dataIndex: 'frequency',
    width: 56,
  }
];
//处置
const handleColumns = [
  {
    title: '类别',
    dataIndex: 'itemClass',
    width: 56,
  }, {
    title: '项目名称',
    dataIndex: 'drugName',
    width: 152,
  }, {
    title: '数量',
    dataIndex: 'amount',
    width: 102,
  }, {
    title: '单位',
    dataIndex: 'units',
    width: 56,
  }, {
    title: '频次',
    dataIndex: 'frequency',
    width: 56,
  }
];
export class EleMedical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,  //模态框是否显示
      loading: false,
      patientList: [],  //查询的用户列表
      patientInfo: {
        patientInfo: {
          patientName: '',
          sex: '',
          bloodType: '',
          age: '',
          insuranceNo: '',
          idNo: '',
          anaphylaxis: '',
          marriage: '',
          occupation: '',
          nativePlace: '',
          nation: '',
          familyHereditaryHistory: ''
        },     //基本信息
        visitInfo: [],
        medicationInfo: [],
        testInfo: [],
        inspectInfo: [],
        diagnosisInfo: [],
        clinicRecList: [],//时间轴数据
      }, //主界面
      data: {},//查询参数
      content: '首页',//右侧显示内容
      empi: '',//检验趋势图参数
      temperatureParam: {},//传给temperature
      isSearch: false,
      rowIndex: '',
    };
  }

  componentWillMount() {
    if (this.props.location.pathname === "/regionData/eleMedical") {
      this.setState({
        content: '首页',
      })
    }
  }

  componentWillReceiveProps(next) {
    if (next.location.pathname === "/regionData/eleMedical") {
      this.setState({
        content: '首页',
      })
    }
  }

//查询患者信息
  selData = (dataPack) => {
    const {loadPatientInfo, addArrKey} = api;
    this.setState({
      loading: true,
      rowIndex: null
    });
    loadPatientInfo(dataPack, rest => {
      if (rest.success) {
        const data = rest.data;
        if (data === undefined || data.length === 0 || data === null) {
          message.warning('没有找到该用户的信息');
          this.setState({
            loading: false
          });
          return false;
        }
        //判断是否是数组
        if (Array.isArray(data)) {
          this.setState({
            visible: true,
            patientList: data,
            content: '首页',
            loading: false
          });
        } else {
          if (data) {
            data.visitInfo = Array.isArray(data.visitInfo) ? addArrKey(data.visitInfo) : data.visitInfo;
            data.medicationInfo = Array.isArray(data.medicationInfo) ? addArrKey(data.medicationInfo) : data.medicationInfo;
            data.testInfo = Array.isArray(data.testInfo) ? addArrKey(data.testInfo) : data.testInfo;
            data.inspectInfo = Array.isArray(data.inspectInfo) ? addArrKey(data.inspectInfo) : data.inspectInfo;
            data.diagnosisInfo = Array.isArray(data.diagnosisInfo) ? addArrKey(data.diagnosisInfo) : data.diagnosisInfo;
            data.clinicRecList = data.clinicRecList && data.clinicRecList.length ? this.sortDate(data.clinicRecList) : [];
            this.setState({
              emPi: data.empi,
              patientInfo: data,
            })
          }
          this.setState({
            content: '首页',
            loading: false,
            isSearch: true,
          });
        }
      } else {
        this.setState({
          loading: false
        });
        console.error("response error", rest);
      }

    });
  };
  sortDate = (clickList) => {
    for (let i = 0; i < clickList.length; i++) {
      for (let j = 0; j < clickList.length; j++) {
        if ((new Date(clickList[i].timeFrom.replace(/-/g, "\/"))) > (new Date(clickList[j].timeFrom.replace(/-/g, "\/")))) {
          let tmp = clickList[i];
          clickList[i] = clickList[j];
          clickList[j] = tmp;
        }
      }
    }
    return clickList;
  };
//查询用户信息（单个）
  selectUser = (emPi, index, e) => {
    const {loadClinicRecList, addArrKey} = api;
    const dataPack = {
      empi: emPi
    };
    this.setState({
      loading: true,
      rowIndex: index
    });
    loadClinicRecList(dataPack, rest => {
      if (rest.success) {
        const data = rest.data;
        data.visitInfo = Array.isArray(data.visitInfo) ? addArrKey(data.visitInfo) : data.visitInfo;
        data.medicationInfo = Array.isArray(data.medicationInfo) ? addArrKey(data.medicationInfo) : data.medicationInfo;
        data.testInfo = Array.isArray(data.testInfo) ? addArrKey(data.testInfo) : data.testInfo;
        data.inspectInfo = Array.isArray(data.inspectInfo) ? addArrKey(data.inspectInfo) : data.inspectInfo;
        data.diagnosisInfo = Array.isArray(data.diagnosisInfo) ? addArrKey(data.diagnosisInfo) : data.diagnosisInfo;
        data.clinicRecList = data.clinicRecList && data.clinicRecList.length ? this.sortDate(data.clinicRecList) : [];
        this.setState({
          visible: false,
          patientInfo: data,
          empi: emPi,
          loading: false,
          isSearch: true,
        })
      } else {
        this.setState({
          loading: false
        });
        console.error("response error", rest);
      }
    });
  };
  //循环返回参数
  backParam = (clinicRecList, patientId, key1, key2) => {
    let obj = {};
    for (let i = 0; i < clinicRecList.length; i++) {
      if (patientId.trim() === clinicRecList[i].patientId.trim()) {
        obj[key1] = clinicRecList[i].hospitalCode;
        obj[key2] = clinicRecList[i].patientId;
        break;
      }
    }
    return obj;
  };
  //切换菜单
  content = (active, key, other) => {
    const {clinicRecList} = this.state.patientInfo;
    let arr, date, type, dept, data = {}, param = {};
    switch (active) {
      case '病案首页':
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'patientId');
        break;
      case '体温单':
        for (let i = 0; i < clinicRecList.length; i++) {
          if (key.trim() === clinicRecList[i].patientId) {
            param['hospitalCode'] = clinicRecList[i].hospitalCode;
            param['patientId'] = clinicRecList[i].patientId;
            param['timeFrom'] = clinicRecList[i].timeFrom;
            param['timeTo'] = clinicRecList[i].TimeTo;
            param['hospitalName'] = clinicRecList[i].hospitalName;
            break;
          }
        }
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'patientId');
        this.setState({
          temperatureParam: param
        });
        break;
      case '处方记录':
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'patientId');
        break;
      case '医嘱':
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'patientId');
        break;
      case '门诊病历':
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'outPatientNumber');
        break;
      case '处方':
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'outPatientNumber');
        break;
      case '处置':
        data = this.backParam(clinicRecList, key, 'hospitalCode', 'outPatientNumber');
        break;
      case '检查':
        data = JSON.parse(other);
        break;
      case '检验':
        let otherInfo = JSON.parse(other);
        data = this.getCheckOutParam(clinicRecList, key, 'hospitalCode', 'patientId', 'clinicType');
        if (data.clinicType === 'M') {
          param.action = 'outpLabDetail';
          param.message = {
            hospitalCode: data.hospitalCode,
            outPatientNumber: data.patientId,
            testNo: otherInfo.testNo
          }
        } else {
          param.action = 'inpLabDetail';
          param.message = {
            patientId: data.patientId,
            testNo: otherInfo.testNo,
          };
        }
        param.testInfo = otherInfo;
        data = param;
        break;
      default:
        //住院病历
        const arr = JSON.parse(other);
        data.action = 'mrc';
        data.message = {
          src: arr.src,
          fileUniqueId: arr.fileUniqueId,
        };
        break;
    }
    this.setState({
      content: active,
      data
    })
  };
  getCheckOutParam = (clinicRecList, pId, key1, key2, key3) => {
    let obj = {};
    for (let i = 0; i < clinicRecList.length; i++) {
      if (pId.trim() === clinicRecList[i].patientId.trim()) {
        obj[key1] = clinicRecList[i].hospitalCode;
        obj[key2] = clinicRecList[i].patientId;
        obj[key3] = clinicRecList[i].clinicType;
        break;
      }
    }
    return obj;
  };
  contentNode = () => {
    const {content, patientInfo, data, empi, temperatureParam} = this.state;
    let titles;
    switch (content) {
      case '病案首页':
        return <MedicalRecordIndex data={data}/>;
        break;
      case '体温单':
        return <Temperature data={data} temperatureParam={temperatureParam}/>;
        break;
      case '处方记录':
        return <PresRecord data={data}/>;
        break;
      case '医嘱':
        titles = {
          title: '医嘱浏览',
          otherType: 'radioGroup',
          value: 1,
          other: [
            {value: 1, label: '全部'},
            {value: 2, label: '长期'},
            {value: 3, label: '临时'},
          ]
        };
        return <Doctor data={data} columns={columns} titles={titles}/>;
        break;
      case '检查':
        return <Inspect data={data}/>;
        break;
      case '检验':
        return <Checkout data={data} empi={empi}/>;
        break;
      case '门诊病历':
        return <OutMdicalRecords data={data}/>;
        break;
      case '处方':
        titles = {
          title: '处方查看',
          otherType: 'button',
          value: 1,
          other: '打印'
        };
        return <Doctor data={data} columns={prescriptionColumns} titles={titles}/>;
        break;
      case '处置':
        titles = {
          title: '处置查看',
          otherType: 'button',
          value: 1,
          other: '打印'
        };
        return <Doctor data={data} columns={handleColumns} titles={titles}/>;
        break;
      case '出院':
        return '出院';
        break;
      case '首页':
        return <AdmissionNode contentData={patientInfo}/>;
        break;
      default:
        return <AdmissionNote data={data}/>;
        break;
    }
  };

  handleOk = () => {
    setTimeout(() => {
      this.setState({visible: false});
    }, 3000);
  };
  handleCancel = () => {
    this.setState({visible: false});
  };

  /* changeMenu = (key) => {
   this.setState({
   activeIndex: key
   })
   };*/

  render() {
    const {visible, patientList, patientInfo, activeIndex, loading, isSearch, rowIndex} = this.state;
    return (
      <div className={css.eleMedical}>
        <Search selData={this.selData}/>
        <Spin spinning={loading}>
          <div className={css.content}>
            <Left content={this.content} isSearch={isSearch}
                  clinicRecList={patientInfo.clinicRecList}
                  birthday={patientInfo.patientInfo.birthday} patientInfo={patientInfo}/>
            <div className={css.right}>
              {this.contentNode()}
            </div>
          </div>
          <Modal
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            wrapClassName={css.modalIndex}
            mask={false}
          >
            {patientList.map((list, index) => {
              return <Row className={rowIndex === index ? `${css.row} ${css.color}` : `${css.row}`}
                          onClick={this.selectUser.bind(this, list.empi, index)} key={index}>
                <Col span={3}>{list.sex === '男' ? <i className={css.nan}></i> : list.sex === '女' ?
                  <i className={css.nv}></i> : <i className={css.noSex}></i>}{list.name}</Col>
                <Col span={4}>年龄：{list.age}</Col>
                <Col span={5}>出生日期：{list.birthday}</Col>
                <Col span={5}>医保号：{list.insuranceNo}</Col>
                <Col span={4}>职称：{list.identity}</Col>
              </Row>
            })}
          </Modal>
        </Spin>
      </div>
    )
  }
}
 
 
 