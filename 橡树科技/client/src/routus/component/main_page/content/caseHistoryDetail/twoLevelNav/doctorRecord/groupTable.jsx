/**
 * Created by liulingli on 2017/7/1.
 * desc : 嵌套子表格，实现表格分组，即多个tbody效果
 */
import React, {Component} from "react";
import {Table} from "antd";

export class GroupTable extends Component {
  componentWillMount() {
    this.state = {
      columns: this.props.columns,
      dataSource: this.props.dataSource,
      loading: this.props.loading,
      orderNoJson: this.props.orderNoJson,
      index: 0,
      scroll: this.props.scroll
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.dataSource !== nextState.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource
      })
    }
    if (nextProps.loading !== nextState.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
    if (nextProps.orderNoJson !== nextState.orderNoJson) {
      this.setState({
        orderNoJson: nextProps.orderNoJson
      })
    }
  }

  onSubRowClick = (record, index) => {
    let curIndex = record.index;
    this.setState({
      index: curIndex
    })
  }
  expandedRowRender = (record) => {
    let {columns, orderNoJson, scroll} = this.state;
    let orderNo = record.orderNo;
    let dataSource = orderNoJson[orderNo];
    if (dataSource && dataSource.length > 0) {
      return (
        <Table
          bordered
          size="small"
          className="tbody-table"
          onRowClick={this.onSubRowClick}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{x: scroll.x + 1}}
        />
      )
    } else {
      return "";
    }
  }
  rowClassName = (record, index) => { //给选中的当前行添加背景色
    if (index === this.state.index) {
      return "ant-table-row-active ant-group-row"
    }
    return "ant-group-row";
  };
  defaultExpandedRowKeys = (dataSource) => {
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
        bordered
        className="group-table"
        rowClassName={this.rowClassName}
        loading={loading}
        columns={columns}
        expandedRowRender={this.expandedRowRender}
        expandedRowKeys={this.defaultExpandedRowKeys(dataSource)}
        dataSource={dataSource}
        pagination={false}
        scroll={scroll}
      />
    )
  }
}