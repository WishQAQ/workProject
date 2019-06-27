/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-检查
 */
import React, {Component} from "react";
import qs from "qs";

export class InspectRecord extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      inspect: {
        title: "彩超"
      }
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
   * 根据patientID和visitID查询检查记录
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

  render() {
    let {inspect, data} = this.state;
    return (
      <div className="inspect-record">
        <h2 className="title">
          <p>{data.hspName}</p>
          <p>{inspect.title}检查报告</p>
        </h2>
        <div className="inspect-content">
          <div className="inspect-info">
            <table className="inspect-table">
              <colgroup>
                <col width="25%"/>
                <col width="25%"/>
                <col width="25%"/>
                <col width="25%"/>
              </colgroup>
              <tbody>
              <tr>
                <td><span>检查类型：</span>{inspect.type}</td>
                <td><span>检查项目：</span>彩超</td>
                <td><span>申请医生：</span>胡定明</td>
                <td><span>申请时间：</span>2017-07-02 12:00:00</td>
              </tr>
              <tr>
                <td><span>检查医生：</span>胡定明</td>
                <td><span>检查状态：</span>确认报告</td>
                <td><span>检查时间：</span>2017-07-03 12:00:00</td>
                <td><span>报告时间：</span>2017-07-03 12:00:00</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="query-table">
            <table className="inspect-table-result">
              <colgroup>
                <col width="80px"/>
                <col width="720px"/>
              </colgroup>
              <tbody>
              <tr>
                <th>图像</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>检查参数</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>检查所见</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>结果</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>印象</th>
                <td>{}</td>
              </tr>
              <tr>
                <th>建议</th>
                <td>{}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}