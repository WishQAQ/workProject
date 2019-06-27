/**
 * description:ag 表格
 * author: mou
 * time:2018-1-16
 */
import React from 'react'
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import classNames from 'classnames'
import css from '../style/component/agTable.scss'
import '../../../../less/common/ag.less'

export class AgTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],//表头
    };
    this.api = null;
    this.onGridReady = this.onGridReady.bind(this);
  }

  componentWillMount() {
    this.setState({
      columns: this.props.columns,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
    });
  }

  //获取表格基础api
  onGridReady(params) {
    this.gridApi = params.api;
    this.onReverSource();
    this.gridApi.hideOverlay();
    this.gridApi.sizeColumnsToFit();
  }

  onReverSource = () => {
    const {data} = this.props;
    let dataSource = {
      rowCount: null,
      getRows: (params) => {
        data(params.startRow + 1, (result) => {
          let lastRow = -1;
          if (result.length < params.endRow + 1) {
            lastRow = result.length -1;
          }
          params.successCallback(result, lastRow + 1)
        });
      }
    };
    this.gridApi.setDatasource(dataSource)
  };
  onSelection = () => {
    let selectData = this.gridApi.getSelectedNodes();
    this.props.onSelection(selectData);
  };

  render() {
    const {columns,} = this.state;
    const className = this.props.className;
    return (
      <div className={`${classNames('ag-fresh', css.agTable, className)}`}>
        <AgGridReact
          columnDefs={columns}
          //  overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}  暂无数据样式
          enableSorting={false}//ag表格自动排序
          enableColResize={true}//能否改变列宽
          onCellClicked={this.props.rowClick}//行点击
          onSelectionChanged={this.onSelection}//行选择
          getRowClass={this.getRowClass}//行样式
          headerHeight={30}//标题高
          rowHeight={30}//行高
          suppressCellSelection={true}//是否启用键盘导航
          singleClickEdit={false}//单击启用编辑模式
          stopEditingWhenGridLosesFocus={false}//网格失去焦点时停止单元格编辑
          onGridReady={this.onGridReady}//基础api
          suppressScrollOnNewData={true}//获取新数据不会滚动到顶部
          suppressDragLeaveHidesColumns={true}//让列无法拖拽出去隐藏
          ref="agGridReact"
          rowModelType={'infinite'}
          rowSelection={'multiple'}//行选择
          cacheOverflowSize={1}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={1}
          maxBlocksInCache={2}
        >
        </AgGridReact>
      </div>
    )
  }
}
 
 
 