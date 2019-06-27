/**
 * description:antd 表格
 * author: mou
 * time:2018-1-16
 */
import React from 'react'
import {Table} from 'antd'
import classNames from 'classnames'
import css from '../style/component/table.scss'
export class AntTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelection: [],
      columns: [],
      data: [],
      pagination: false,
    };
  }

  componentWillMount() {
    this.setState({
      rowSelection: this.props.rowSelection,
      columns: this.props.columns,
      data: this.props.data,
      pagination: this.props.pagination,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rowSelection: nextProps.rowSelection,
      columns: nextProps.columns,
      data: nextProps.data,
      pagination: nextProps.pagination,
    })
  }

  render() {
    const {rowSelection, columns, data, pagination} = this.state;
    const className = this.props.className;
    return (
      <Table className={classNames(css.infoTable, className)} rowSelection={rowSelection} columns={columns}
             dataSource={data}
             pagination={pagination} onRowClick={this.props.onRowClick} rowClassName={this.props.rowClassName} bordered
             scroll={{y: '100%'}}/>)
  }
}
 
 
 