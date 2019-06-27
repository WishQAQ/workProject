/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-门诊-处方查看
 */
import React, {Component} from "react";
import qs from "qs";
import {Table} from "antd";

export class Prescription extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      columns: [
        {
          title: "类别",
          dataIndex: "itemClass",
          width: 60
        }, {
          title: "项目名称",
          dataIndex: "drugName",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "数量",
          dataIndex: "amount",
          width: 60
        }, {
          title: "单位",
          dataIndex: "units",
          width: 60,
        }, {
          title: "频次",
          dataIndex: "frequency",
          width: 60,
        }, {
          title: "实收费用（元）",
          dataIndex: "charges",
          width: 140,
        }, {
          title: "计价金额",
          dataIndex: "costs",
          width: 120,
        }
      ],
      dataSource: [],
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
  }

  /*
   * 根据patientID和visitID查询患者处方
   * */
  queryFetch = () => {
    let {data} = this.state;
    console.log(data);
    let param = {
      visitNo: data.clinicNo,
      patientId: data.patientId,
      hspCode: data.hspCode,
      time: data.clinicDate
    }
    fetch("/caseHistory/patientPrescription/getHspOutpPrescList", {
      method: "POST",
      body: qs.stringify(param)
    }).then(response => {
      if (response.success) {
        let data =  response.data ;
        let dataSource = [];
        for (let i = 0; i < data.length; i++) {
          let pres = data[i];
          pres["key"] = i;
          dataSource.push(pres);
        }
        this.setState({
          dataSource: dataSource,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        });
        throw new Error(response.message);
      }
    })
  }

  render() {
    let {loading, columns, dataSource, data} = this.state;
    return (
      <div className="prescription">
        <h2 className="title">
          <p>{data.hspName}</p>
          <p>处方查看</p>
        </h2>
        <div className="query-table">
          <Table
            bordered
            size="small"
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{x: 600, y: '100%'}}
          />
        </div>
      </div>
    )
  }
}