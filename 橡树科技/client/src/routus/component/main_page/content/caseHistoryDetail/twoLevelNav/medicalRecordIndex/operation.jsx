/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-病案首页-患者病案信息-手术信息
 */
import React, {Component} from 'react';
import qs from 'qs';
import moment from 'moment';
import {Table, Checkbox} from 'antd';

export class Operation extends Component {
  componentWillMount() {
    this.state = {
      columns: [{
        title: '手术名称',
        dataIndex: 'operationDesc',
        width: '9%',
        render: (text, record, index) => {
          return <label title={text || ""}>{text}</label>
        }
      }, {
        title: '手术编码',
        dataIndex: 'operationCode',
        width: '8%',
        render: (text, record, index) => {
          return <input type="text" value={text || ""} title={text || ""} disabled/>
        }
      }, {
        title: '开始时间',
        dataIndex: 'operatingDate',
        width: '10%',
        render: (text, record, index) => {
          return <input type="text" value={text?moment(text).format('YYYY-MM-DD'):null} title={text || ""} disabled/>
        }
      }, {
        title: '结束时间',
        dataIndex: 'operatingEndDate',
        width: '10%',
        render: (text, record, index) => {
          return <input type="text" value={text?moment(text).format('YYYY-MM-DD'):null} title={text || ""} disabled/>
        }
      }, {
        title: '手术级别',
        dataIndex: 'operationLevel',
        width: '10%',
        render: (text, record, index) => {
          return (
            <select value={text} disabled>
              <option value="0">0级</option>
              <option value="1">一级</option>
              <option value="2">二级</option>
              <option value="3">三级</option>
              <option value="4">四级</option>
              <option value="5">无手术</option>
            </select>
          )
        }
      }, {
        title: '术者',
        dataIndex: 'operator',
        width: '5%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }, {
        title: 'Ⅰ助',
        dataIndex: 'firstAssistant',
        width: '5%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }, {
        title: 'Ⅱ助',
        dataIndex: 'secondAssistant',
        width: '5%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }, {
        title: '麻醉医师',
        dataIndex: 'anesthesiaDoctor',
        width: '8%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }, {
        title: '麻醉方式',
        dataIndex: 'anaesthesiaMethod',
        width: '10%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }, {
        title: '切口等级',
        dataIndex: 'woundGrade',
        width: '10%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }, {
        title: '愈合情况',
        dataIndex: 'heal',
        width: '10%',
        render: (text, record, index) => {
          return <input type="text" value={text||""} title={text || ""} disabled/>
        }
      }],
      data: this.props.data
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  render() {
    let {columns, data} = this.state;
    return (
      <div className="query-table">
        <Table
          bordered
          size="small"
          className="diagnosis"
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{y: '100%'}}
        />
      </div>
    )
  }
}
