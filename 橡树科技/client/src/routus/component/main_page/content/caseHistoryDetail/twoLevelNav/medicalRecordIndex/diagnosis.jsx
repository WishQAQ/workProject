/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者病案信息-诊断信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';
import {Table, Checkbox} from 'antd';

export class Diagnosis extends Component {
  componentWillMount() {
    this.state = {
      columns: [{
        title: '诊断类别',
        dataIndex: 'diagnosisType',
        width: 105,
        render: (text, record, index) => {
          return <label title={text}>{this.setDisType(text)}</label>
        }
      }, {
        title: '诊断日期',
        dataIndex: 'diagnosisDate',
        width: 148,
        render: (text, record, index) => {
          return <input type="text" value={text ? moment(text).format('YYYY-MM-DD') : ""} title={text || ""} disabled/>
        }
      }, {
        title: '诊断描述',
        dataIndex: 'diagnosisDesc',
        width: 100,
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '疾病编码',
        dataIndex: 'diagnosisCode',
        width: 100,
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '疾病名称',
        dataIndex: 'diagnosisName',
        width: 149,
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '治疗结果',
        dataIndex: 'treatResult',
        width: 100,
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '入院病情',
        dataIndex: 'operTreatIndicator',
        width: 100,
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '天数',
        dataIndex: 'treatDays',
        width: 100,
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '手术',
        dataIndex: 'operation',
        width: 87,
        render: (text, record, index) => {
          return <Checkbox checked={text || false} disabled/>
        }
      }, {
        title: '介入',
        dataIndex: 'insertIndicator',
        width: 87,
        render: (text, record, index) => {
          return <Checkbox checked={text || false} disabled/>
        }
      }],
      data: this.props.data
    };
  }

  setDisType = (value) => {
    let v=JSON.stringify(value);
    switch (v) {
      case '1':
        return '门诊诊断';
        break;
      case '2':
        return '入院初诊';
        break;
      case '3':
        return '出院诊断';
        break;
      case '8':
        return '病理诊断';
        break;
      case '6':
        return '院内感染';
        break;
      case '7':
        return '损伤和中毒的外部原因';
        break;
      case '4':
        return '手术并发症';
        break;
      case '5':
        return '并发症';
        break;
      case 'A':
        return '中医门诊诊断';
        break;
      case 'B':
        return '中医入院诊断';
        break;
      case 'C':
        return '中医出院诊断';
        break;
    }
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  render() {
    let {columns, data} = this.state;
    console.log("dai")
    console.log(data)
    return (
      <div className="query-table">
        <Table
          bordered
          size="small"
          className="diagnosis "
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{y: '100%'}}
        />
      </div>
    )
  }
}
