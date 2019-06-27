/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-医嘱
 */
import React, {Component} from "react";
import qs from "qs";
import {message, Radio} from "antd";
import {clone} from "../../../../../common/function";
import {GroupTable} from "./groupTable";
const RadioGroup = Radio.Group;

export class DoctorRecord extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      type: "all",
      loading: false,
      columns: [
        {
          title: "长/临",
          dataIndex: "repeatIndicator",
          width: 55,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          },
          filters: [{
            text: "长期",
            value: "长期",
          }, {
            text: "临时",
            value: '临时',
          }],
          onFilter: (value, record) => record.repeatIndicator.indexOf(value) === 0,
        }, {
          title: "类别",
          dataIndex: "orderClass",
          width: 35,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "开始时间",
          dataIndex: "startDateTime",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "医嘱内容",
          dataIndex: "orderText",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "剂量",
          dataIndex: "dosage",
          width: 50,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "单位",
          dataIndex: "dosageUnits",
          width: 50,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "途径",
          dataIndex: "administration",
          width: 50,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "频次",
          dataIndex: "frequency",
          width: 55,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "计价属性",
          dataIndex: "billingAttr",
          width: 60,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "阴阳性",
          dataIndex: "performResult",
          width: 50,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "执行时间",
          dataIndex: "performSchedule",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "停止时间",
          dataIndex: "stopDateTime",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "医生说明",
          dataIndex: "freqDetail",
          width: 80,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "摆药",
          dataIndex: "drugBillingAttr",
          width: 45,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "下达医生",
          dataIndex: "doctor",
          width: 60,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "停止医生",
          dataIndex: "stopDoctor",
          width: 60,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }, {
          title: "护士",
          dataIndex: "nurse",
          width: 60,
          render: (text, record, index) => {
            return <label title={text}>{record.isChild ? text : ""}</label>
          }
        }
      ],
      dataSource: [],
      orderNoJson: {},
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      this.setState({
        data: nextProps.data
      });
      this.queryFetch();
    }
  }

  componentDidMount() {
    this.queryFetch();
  }

  onChange = (e) => {
    let value = e.target.value;
  }
  /*
   * 根据patientID和visitID查询患者医嘱信息
   * */
  queryFetch = () => {
    this.setState({
      loading: true
    })
    let {data} = this.state;
    let param = {
      patientId: data.patientId,
      visitId: data.clinicNo,
      hspCode: data.hspCode,
      orderType: "all"
    };
    fetch("/caseHistory/patientOrder/loadOrder", {method: "POST", body: qs.stringify(param)}).then(response => {
      if (response.success) {
        let data = response.data ;
        let newData = [];
        //解析数组，给医嘱分组并添加key值,orderNo相同的为一组
        let orderNoJson = {}; //json对象缓存orderNo,判断orderNo是否重复出现
        let indexArray = [];
        let k = -1;
        for (let i = 0; i < data.length; i++) {
          let orderNo = data[i].orderNo;
          if (orderNoJson[orderNo] === undefined) {
            let doctor = clone(data[i]);
            doctor["key"] = orderNo;
            newData.push(doctor);
            let newDoctor = clone(doctor);
            k++;
            newDoctor["index"] = k;
            newDoctor['isChild'] = true,
            orderNoJson[orderNo] = [];
            orderNoJson[orderNo].push(newDoctor);
          } else {
            let newDoctor = clone(data[i]);
            newDoctor["index"] = k;
            newDoctor["key"] = i;
            newDoctor['isChild'] = true,
            orderNoJson[orderNo].push(newDoctor);
          }
        }
        this.setState({
          dataSource: newData,
          orderNoJson: orderNoJson,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
        message.error(response.message);
      }
    })
  }

  render() {
    let {type, columns, dataSource, orderNoJson, loading, data} = this.state;
    return (
      <div className="doctor-record">
        <h2 className="title">
          <p>{data.hspName}</p>
          <p>医嘱查看</p>
        </h2>
        <div className="query-table">
          <GroupTable
            bordered
            size="small"
            className="doctor-record-table"
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            orderNoJson={orderNoJson}
            pagination={false}
            scroll={{x: 1450, y: '100%'}}
          />
        </div>
      </div>
    )
  }
}