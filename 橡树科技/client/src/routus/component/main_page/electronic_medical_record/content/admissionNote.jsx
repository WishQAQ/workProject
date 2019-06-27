/**
 * description:电子病历首页
 * author: mou
 * time:2017-12-13
 */
import React from 'react'
import {Table, Modal, message} from 'antd';
import {NullInfo} from './../../../common/nullInfo'
import qs from "qs";
import {Echart} from '../../../report_form/component/chart'
import eventProxy from '../../eventProxy'
import moment from 'moment'
import css from '../eleMedical.scss'
import {browserHistory} from "react-router";
//就诊信息
const visitInfoColumns = [
  {
    title: '医院名称',
    dataIndex: 'hospitalName',
    width: '28%',
  }, {
    title: '日期',
    dataIndex: 'time',
    width: '18%',
    render: (value) => {
      return moment(value).format('YYYY-MM-DD')
    }
  }, {
    title: '（住/出）科室',
    dataIndex: 'deptName',
    width: '20%',
  }, {
    title: '就诊类型',
    dataIndex: 'visitType',
    width: '15%',
  }, {
    title: '诊断概要',
    dataIndex: 'visitOutline',
    width: '20%',
    render: (text) => <span className={css.col} title={text}>{text}</span>,
  }
];
//用药
const medicalInfoColumns = [
  {
    title: '药品名称',
    dataIndex: 'drugName',
    width: '25%',
    render: (text) => <span className={css.col2} title={text}>{text}</span>,
  }, {
    title: '规格',
    dataIndex: 'specifications',
    render: (text) => <span className={css.specifications} title={text}>{text}</span>,
    width: '15%',
  }, {
    title: '数量',
    dataIndex: 'num',
    width: '10%',
  }, {
    title: '发药医院',
    dataIndex: 'medicineHospitalName',
    width: '28%',
  }, {
    title: '时间',
    dataIndex: 'time',
    width: '22%',
    render: (value) => {
      return moment(value).format('YYYY-MM-DD')
    }
  }
];
//检验情况
const testInfoColumns = [
  {
    title: '类别',
    dataIndex: 'category',
    width: '10%',
  }, {
    title: '标本',
    dataIndex: 'specimen',
    width: '10%',
  }, {
    title: '医院',
    dataIndex: 'hospitalName',
    width: '24%',
  }, {
    title: '科室',
    dataIndex: 'deptName',
    width: '14%',
    render: (text) => <span className={css.col50} title={text}>{text}</span>,
  }, {
    title: '项目',
    dataIndex: 'itemName',
    render: (text) => <span className={css.col50} title={text}>{text}</span>,
    width: '14%',
  }, {
    title: '时间',
    dataIndex: 'time',
    width: '14%',
  }
];
//检查
const inspectInfoColumns = [
  {
    title: '类别',
    dataIndex: 'category',
    width: '10%',
  }, {
    title: '医院',
    dataIndex: 'hospitalName',
    width: '20%',
    render: (text) => <span className={css.col90} title={text}>{text}</span>,
  }, {
    title: '科室',
    dataIndex: 'deptCode',
    width: '14%',
  }, {
    title: '部位',
    dataIndex: 'position',
    render: (text) => <span className={css.col50} title={text}>{text}</span>,
    width: '14%',
  }, {
    title: '报告时间',
    dataIndex: 'reportingTime',
    width: '14%',
    render: (value) => {
      return value ? moment(value).format('YYYY-MM-DD') : ''
    },
  }, /*{
   title: '子主题',
   dataIndex: '',
   width: '14%',
   },*/ {
    title: '项目',
    dataIndex: 'itemName',
    width: '14%',
    render: (text) => <span className={css.col50} title={text}>{text}</span>,
  }
];
//诊断
const diagnosisInfoColumns = [
  {
    title: '诊断类型',
    dataIndex: 'diagnosticType',
    width: '20%',
  }, {
    title: '诊断名称',
    dataIndex: 'diagnosticName',
    width: '30%',
    render: (text) => <span className={css.diagnosticName} title={text}>{text}</span>,
  }, {
    title: '诊断时间',
    dataIndex: 'diagnosticDate',
    width: '20%',
  }, {
    title: '医院',
    dataIndex: 'hospitalName',
    width: '30%',
  }
];

export class AdmissionNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicOption: {series: []},
      visible: false,
      contentData: {
        patientInfo: {},
        visitInfo: [],
        medicationInfo: [],
        testInfo: [],
        inspectInfo: [],
        diagnosisInfo: [],
      },//总的数据
    };
  };

  componentWillMount() {
    this.setState({
      contentData: this.props.contentData
    }, () => {
      this.renderCanvas();
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      contentData: next.contentData
    }, () => {
      this.renderCanvas();
    })
  }

  renderCanvas = () => {
    let xAxis = [];
    let {illnessInfo} = this.state.contentData;
    if (illnessInfo && illnessInfo.length) {
      for (let i = 0; i < illnessInfo.length; i++) {
        illnessInfo[i].timeFrom = moment(illnessInfo[i].timeFrom).format('YYYY-MM-DD');
        illnessInfo[i].timeTo = moment(illnessInfo[i].timeTo).format('YYYY-MM-DD');
        illnessInfo[i].type = parseInt(illnessInfo[i].type)
      }
      let optionData = [];//病危
      let optionData2 = [];//病重
      for (let i = 0; i < illnessInfo.length; i++) {
        if (illnessInfo[i].timeFrom !== illnessInfo[i].timeTo) {
          xAxis.push(illnessInfo[i].timeFrom, illnessInfo[i].timeTo);//x轴时间
        } else {
          xAxis.push(illnessInfo[i].timeFrom);//x轴时间
        }
      }
      //数据
      for (let i = 0; i < illnessInfo.length; i++) {
        let type = illnessInfo[i].type;
        let timeFrom = illnessInfo[i].timeFrom;
        let timeTo = illnessInfo[i].timeTo;
        if (type === 1) {
          if (timeFrom === timeTo) {
            optionData.push(type);
            optionData2.push('')
          } else {
            optionData.push(type, type);
            optionData2.push('', '')
          }

        } else {
          if (timeFrom === timeTo) {
            optionData2.push(type);
            optionData.push('');
          } else {
            optionData2.push(type, type);
            optionData.push('', '');
          }
        }
      }
      let publicOption = {
        /*       visualMap: {
         show: false,
         dimension: 0,
         pieces: [],  //pieces的值由动态数据决定
         outOfRange: {
         color: 'green'
         }
         },*/
        color: ['#A86565', '#FF375B', '#A86565'],
        legend: {
          right:20,
          data: ['病危', '病重']
        },
        grid: {
          bottom: 30,
          top: 30,
          right: 20,
          left: 40,
        },
        xAxis: [{
          type: "category",
          "axisLine": {
            lineStyle: {
              color: '#90979c'
            }
          },
          "splitLine": {
            "show": false
          },
          "axisTick": {
            "show": false
          },
          "splitArea": {
            "show": false
          },
          "axisLabel": {
            "interval": 0,
          },
          "data": xAxis,
        }],
        yAxis: [{
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              if (value === 1) {
                return '病危'
              } else if (value === 2) {
                return '病重'
              }
            }
          },
          splitArea: {
            show: false
          },

        }],
        dataZoom: [{
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
          {
            name: '病危',
            type: "line",
            data: optionData
          }, {
            name: '病重',
            type: "line",
            data: optionData2
          },
        ],
      };
      /*      let j = 0;
       let data2 = publicOption.series[2].data;
       //连续为300时，颜色变为红色
       for (let i = 0; i < data2.length; i++) {
       if (data2[i] === 2 && data2[i + 1] === 2) {
       publicOption.visualMap.pieces[j] = {gte: i, lte: i + 1, color: '#FF375B'};
       } else {
       publicOption.visualMap.pieces[j] = {gte: i, lte: i + 1, color: '#A86565'};
       }
       j++;
       }*/
      this.setState({
        publicOption: publicOption
      })
    }
  }
  ;
  cancelVisible = () => {
    this.setState({visible: false});
  };
  showMedical = () => {
    let {patientInfo} = this.state.contentData;
    let data = {};
    if (patientInfo.idNo) {// 身份证号码
      data.idCard = patientInfo.idNo;
      data.idType = "1";
    } else if (patientInfo.insuranceNo) {// 医保号
      data.idCard = patientInfo.insuranceNo;
      data.idType = "2";
    }
    data.patientName = patientInfo.patientName;
    data.doctorName = "陈倩";
    data.appCode = "SPB-JC-HIS";
    data.orgCode = "500106002000008";
    data.orgName = "沙坪坝区陈家桥医院";
    let url = "http://10.185.97.2:20402/ehrEmrCall";
    let randomNumber = Math.random() * 900000 | 100000;
    let appUser = "jiahe";
    let appPass = "123456";
    let _randomNumber1 = window.btoa(encodeURIComponent("123456789"));
    let token = encodeURIComponent(_randomNumber1.substr(0, 6) + window.btoa(appUser + "@" + appPass + randomNumber) + _randomNumber1.substr(6));
    let patient = new Buffer(JSON.stringify(data)).toString('base64');
    let _patientInfo = encodeURIComponent(_randomNumber1.substr(0, 6) + patient + _randomNumber1.substr(6));
    this.setState({visible: true, iframeSrc: url + "?token=" + token + "&reqData=" + _patientInfo + "&way=2"});
  };
  /**
   * 健康档案信息
   */
  healthFile = () => {
    let {patientInfo} = this.state.contentData;
    if (!patientInfo.idNo) {
      message.error('身份证号码不能为空');
      return;
    }
    // 查询url
    fetch("/wss/wss/healthUrl", {
      method: "get",
      body: qs.stringify(patientInfo.idNo)
    }).then(json => {
      if (json.success) {
        this.setState({visible: true, iframeSrc: json.data});
      } else {
        message.error("无法访问公卫");
      }
    });
  };
  showReferral = () => {
    eventProxy.trigger('title', '分级医疗');
      const {patientInfo} = this.state.contentData;
    eventProxy.trigger('base', JSON.stringify(patientInfo));
    browserHistory.push('/regionData/referral');
  };

  render() {
    const {patientInfo, visitInfo, medicationInfo, testInfo, inspectInfo, diagnosisInfo, illnessInfo} = this.state.contentData;
      const {publicOption, iframeSrc} = this.state;
    return (<div className={css.admissionNode}>
      <div className={css.info}>
        <p>
          <span>{patientInfo.sex === '男' ? <i className={css.nan}></i> : patientInfo.sex === '女' ?
            <i className={css.nv}></i> :
            <i className={css.noSex}></i>}患者姓名:<span>{patientInfo.patientName}</span></span>
          <span>血型:<span>{patientInfo.bloodType}</span></span>
          <span>年龄:<span>{patientInfo.age}</span></span>
          <span>出生日期:<span>{patientInfo.birthday}</span></span>
          <span>医保号:<span>{patientInfo.insuranceNo}</span></span>
          <span>过敏药物:<span>{patientInfo.anaphylaxis}</span></span>
        </p>
        <p>
          <span>职业:<span>{patientInfo.occupation}</span></span>
          <span>婚姻:<span>{patientInfo.marriage}</span></span>
          <span>民族:<span>{patientInfo.nation}</span></span>
          <span>籍贯:<span>{patientInfo.nativePlace}</span></span>
          <span>家族遗传史:<span>{patientInfo.familyHereditaryHistory}</span></span>
          <span>身份证号:<span>{patientInfo.idNo}</span></span>
        </p>
      </div>
      <div className={css.node}>
        <div className={css.admissionContent}>
          <div className={css.adcLeft}>
            <p>就诊信息</p>
            <Table bordered columns={visitInfoColumns} dataSource={visitInfo} pagination={false}
                   scroll={{y: '100%'}}/>
          </div>
          <div className={css.adcRight}>
            <div className={css.special}>
              {illnessInfo && illnessInfo.length > 0 ?
                <div>
                  <p className={css.patientIll}>患者病情趋势图</p>
                  <Echart id="public" className={css.canvas} option={publicOption}/>
                </div>
                : <div>
                  <p className={css.patientIll}>患者病情趋势图</p>
                  <NullInfo/>
                </div>}
              <div className={css.other}>
                <div onClick={this.healthFile.bind(this)} className={css.archives}><i
                  className={`icon iconfont ${css.jkda}`}>&#xe673;</i>健康档案
                </div>
                <div onClick={this.showMedical.bind(this)} className={css.record}><i
                  className={`icon iconfont ${css.gxdzbl}`}>&#xe608;</i>共享电子病历
                </div>
                <div onClick={this.showReferral.bind(this)} className={css.classification}><i
                  className={`icon iconfont ${css.fjyl}`}>&#xe665;</i>分级医疗
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css.admissionContent}>
          <div className={css.adcLeft}>
            <p>近期用药情况</p>
            <Table bordered columns={medicalInfoColumns} dataSource={medicationInfo} pagination={false}
                   scroll={{y: '100%'}}/>
          </div>
          <div className={css.adcRight}>
            <p>近期检验情况</p>
            <Table bordered columns={testInfoColumns} dataSource={testInfo} pagination={false} scroll={{y: '100%'}}/>
          </div>
        </div>
        <div className={css.admissionContent}>
          <div className={css.adcLeft}>
            <p>近期检查情况</p>
            <Table bordered columns={inspectInfoColumns} dataSource={inspectInfo} pagination={false}
                   scroll={{y: '100%'}}/>
          </div>
          <div className={css.adcRight}>
            <p>近期诊断列表</p>
            <Table bordered columns={diagnosisInfoColumns} dataSource={diagnosisInfo} pagination={false}
                   scroll={{y: '100%'}}/>
          </div>
        </div>
      </div>
      <Modal
        footer={null}
        width="1324px"
        height="650px"
        style={{"top": 5}}
        title="亚德电子病历调阅"
        onCancel={this.cancelVisible.bind(this)}
        visible={this.state.visible}
      >
        <iframe style={{width: "100%", height: "500px"}} src={iframeSrc}></iframe>
      </Modal>
    </div>)
  }
}
 
 
 