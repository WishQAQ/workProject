/**
 * Created by liulingli on 2017/7/4.
 * desc : 病历详情-入院-处方记录 嵌套子表格
 */
import React, {Component} from "react";
import {Table} from "antd";

export class NestTable extends Component {
  componentWillMount() {
    this.state = {
      loading: this.props.loading,
      columns: this.props.columns,
      dataSource: this.props.dataSource,
      childColumns: this.props.childColumns,
      scroll: this.props.scroll,
      childDataSource: this.props.childDataSource
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.dataSource !== nextState.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource
      })
    }
  }

  expandedRowRender = (record) => {
    let {childColumns, childDataSource} = this.state;
    if (childDataSource && childDataSource.length > 0) {
      return (
        <Table
          bordered
          size="small"
          className="nest-table"
          columns={childColumns}
          dataSource={childDataSource}
          pagination={false}
        />
      )
    } else {
      return "";
    }
  }
  expandedRowKeys = (dataSource) => {
    let keyRow = [];
    for (let i = 0; i < dataSource.length; i++) {
      keyRow.push(dataSource[i].key)
    }
    return keyRow;
  }

  render() {
    let {loading, columns, dataSource, scroll} = this.state;
    return (
      <Table
        /* bordered*/
        size="small"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={this.expandedRowRender}
        expandedRowKeys={this.expandedRowKeys(dataSource)}
        pagination={false}
        scroll={scroll}
      />
    )
  }
}