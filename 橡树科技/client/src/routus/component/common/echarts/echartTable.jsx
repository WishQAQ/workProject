/**
 * Created by liulingli on 2017/5/22.
 */
import React, {Component} from 'react';
import classNames from 'classnames';
import { Table } from 'antd';

export class EchartTable extends Component{
  render(){
    return(
      <div className="card-table query-table">
        <Table
          pagination={false}
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          scroll={{x:720, y: 250 }}
          size="small"
          bordered
        />
      </div>
    )
  }
}
