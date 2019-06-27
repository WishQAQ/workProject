/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-处方记录
 */
import React, {Component} from "react";
import qs from "qs";
import {Table} from "antd";

export class PrescriptionRecord extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      columns: [
        {
          title: "类型",
          dataIndex: "prescType",
          width: 50,
        }, {
          title: "处方名称",
          dataIndex: "bindingPrescTitle",
          width: 80,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "处方号",
          dataIndex: "prescNo",
          width: 80,
        }, {
          title: "处方日期",
          dataIndex: "prescDate",
          width: 120,
        }, {
          title: "剂数",
          dataIndex: "repetition",
          width: 40,
        }, {
          title: "每剂煎药次数",
          dataIndex: "countPerRepetition",
          width: 80,
        }, {
          title: "计价",
          dataIndex: "costs",
          width: 50,
        }, {
          title: "用法",
          dataIndex: "usage",
          width: 100,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "发药时间",
          dataIndex: "dispensingDatetime",
          width: 120,
        }, {
          title: "发药人",
          dataIndex: "dispensingProvider",
          width: 80,
        }, {
          title: "药局",
          dataIndex: "dispensary",
          width: 80,
        }, {
          title: "预交金额",
          dataIndex: "prepayment",
          width: 80,
        }, {
          title: "是否代煎",
          dataIndex: "decoction",
          width: 50,
        }
      ],
      childColumns: [
        {
          title: "处方号",
          dataIndex: "prescNo",
          width: 80
        }, {
          title: "药品名称",
          dataIndex: "drugName",
          width: 80,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "规格",
          dataIndex: "drugSpec",
          width: 80
        }, {
          title: "厂商",
          dataIndex: "firmId",
          width: 80,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "单次剂量",
          dataIndex: "dosage",
          width: 60
        }, {
          title: "单位",
          dataIndex: "dosageUnits",
          width: 60
        }, {
          title: "途径",
          dataIndex: "administration",
          width: 60
        }, {
          title: "频次",
          dataIndex: "frequency",
          width: 60
        }, {
          title: "医生说明",
          dataIndex: "freqDetail",
          width: 120,
          render: (text, record, index) => {
            return <label title={text}>{text}</label>
          }
        }, {
          title: "总量",
          dataIndex: "quantity",
          width: 60
        }, {
          title: "单价",
          dataIndex: "packageUnits",
          width: 60
        }, {
          title: "计价",
          dataIndex: "costs",
          width: 60
        }, {
          title: "应收",
          dataIndex: "payments",
          width: 80
        },
      ],
      dataSource: [],
      childDataSource: [],
      loading: true,
      childLoading: false,
      index: 0
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
   * 根据patientID和visitID查询患者处方
   * */
  queryFetch = () => {
    let {data} = this.state;
    let param = {
      visitId: data.clinicNo,
      patientId: data.patientId,
      hspCode: data.hspCode,
    };
    fetch("/caseHistory/patientPrescription/getHspPatientPrescList", {
      method: "POST",
      body: qs.stringify(param)
    }).then(response => {
      if (response.success) {
        let data = response.data ;
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
        if (dataSource.length > 0) {
          this.queryChildFetch(this.state.data, dataSource[0], 0);
        }
      } else {
        this.setState({
          loading: false
        })
        throw new Error(response.message);
      }
    })
  }
  /*
   * 查询子处方
   * */
  queryChildFetch = (data, pres, index) => {
    //moment(pres.prescDate).format("YYYY-MM-DD[T]HH:mm:ss[+08:00]"),
    let param = {
      hspCode: data.hspCode,
      prescDate: pres.prescDate,
      prescNo: pres.prescNo
    }
    fetch("/caseHistory/patientPrescription/getHspPatientPresc", {
      method: "POST",
      body: qs.stringify(param)
    }).then(response => {
      if (response.success) {
        let data = eval("(" + response.data + ")");
        let childDataSource = [];
        for (let i = 0; i < data.length; i++) {
          let childPres = data[i];
          childPres["key"] = i;
          childDataSource.push(childPres)
        }
        this.setState({
          childDataSource: childDataSource,
          index: index,
          childLoading: false
        })
      } else {
        throw new Error(response.error)
      }
    })
  }
  onRowClick = (record, index) => {
    let data = this.state.data;
    this.queryChildFetch(data, record, index);
  }
  rowClassName = (record, index) => {
    if (index === this.state.index) {
      return "ant-table-row-active";
    } else {
      return "";
    }
  }

  render() {
    let {loading, columns, dataSource, childLoading, childColumns, childDataSource, data} = this.state;
    return (
      <div className="prescription-record">
        <h2 className="title">
          <p>{data.hspName}</p>
          <p>处方记录</p>
        </h2>
        <div className="prescription-content">
          <h3 className="title">处方列表</h3>
          <div className="total-record">
            <div className="query-table">
              <Table
                bordered
                size="small"
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                onRowClick={this.onRowClick.bind(this)}
                rowClassName={this.rowClassName}
                pagination={false}
                scroll={{x: 1350, y: '100%'}}
              />
            </div>
          </div>
          <h3 className="title">子处方列表</h3>
          <div className="child-record">
            <div className="query-table">
              <Table
                bordered
                size="small"
                loading={childLoading}
                columns={childColumns}
                dataSource={childDataSource}
                pagination={false}
                scroll={{x: 1250, y: '100%'}}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}