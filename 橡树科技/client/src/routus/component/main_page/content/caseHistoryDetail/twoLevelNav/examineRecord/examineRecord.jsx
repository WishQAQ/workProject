/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-检验
 */
import React, {Component} from "react";
import qs from "qs";
import {message, Table} from "antd";

export class ExamineRecord extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      loading: false,
      exam: {
        title: "乙肝两对半测定(定性)"
      },
      columns: [
        {
          title: "项目名称",
          dataIndex: "name",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "结果",
          dataIndex: "result",
          width: 80,
        }, {
          title: "异常",
          dataIndex: "abnormal",
          width: 80,
        }, {
          title: "单位",
          dataIndex: "units",
          width: 80,
        }, {
          title: "参考值",
          dataIndex: "reference",
          width: 100,
        }
      ],
      dataSource: [
        {key: 0, name: "红细胞数目", result: "3.99", abnormal: "↓↓", units: "10.9/L", reference: "4.00-10.00"},
        {key: 1, name: "红细胞数目", result: "5.99", abnormal: "", units: "10.9/L", reference: "4.00-10.00"},
        {key: 2, name: "红细胞数目", result: "5.99", abnormal: "", units: "10.9/L", reference: "4.00-10.00"},
        {key: 3, name: "红细胞数目", result: "12.99", abnormal: "↓↓", units: "10.9/L", reference: "4.00-10.00"}
      ]
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

  /*
   * 根据patientID和visitID查询检验记录
   * */
  queryFetch = () => {
    let {data} = this.state;
    let param = {
      visited: data.visited,
      patientId: data.patientId
    };
    fetch("url", {method: "POST", body: qs.stringify(param)}).then(response => {
      if (response.success) {
        let data = response.data;
        this.setState({
          medicalRecord: data.medicalRecord,
          patientInfo: data.patientInfo
        })
      } else {
        message.error(response.message);
      }
    })
  }
  /* 异常的项目显示为红色 */
  rowClassName = (record, index) => {
    if (record.abnormal.length > 0) {
      return "abnormal";
    }
    return "";
  }

  render() {
    let {exam, loading, columns, dataSource, data} = this.state;
    return (
      <div className="examine-record">
        <h2 className="title">
          <p>{data.hspName}</p>
          <p>{exam.title}检验报告</p>
        </h2>
        <div className="examine-content">
          <div className="exam-info">
            <table className="examine-table">
              <colgroup>
                <col width="20%"/>
                <col width="20%"/>
                <col width="20%"/>
                <col width="20%"/>
                <col width="20%"/>
              </colgroup>
              <tbody>
              <tr>
                <td><span>姓名：</span>胡定明</td>
                <td><span>性别：</span>男</td>
                <td><span>年龄：</span>47</td>
                <td><span>床号：</span>1</td>
                <td><span>检验主题：</span>{exam.title}</td>
              </tr>
              <tr>
                <td><span>标本：</span>静脉血</td>
                <td><span>检验科室：</span>检验科</td>
                <td><span>申请时间：</span>胡定明</td>
                <td><span>申请医生：</span>胡定明</td>
                <td><span>检验状态：</span>确认报告</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="query-table">
            <Table
              bordered
              size="small"
              rowClassName={this.rowClassName}
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              scroll={{x: 600, y: '100%'}}
            />
          </div>
        </div>
      </div>
    )
  }
}