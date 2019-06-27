/**
 * description:卡片组件
 * author: mou
 * time:2017-11-9
 */
import React from 'react'
import {Icon, Spin} from 'antd';
import {AgGridReact} from "ag-grid-react"; //引入AG表格
import {Echart} from './../../report_form/component/chart'//百度地图
import {NullInfo} from './../../common/nullInfo'
import css from '../../../less/main/main.scss'
export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toCanvas: false,
      columnDefs: [],
      rowData: [],
      option: [],
      title: '',
      id: '',
      api: null,
      show: '',
      loading: "",
      overlayNoRowsTemplate: "<span>暂无相关数据</span>"
    };
    this.onGridReady = this.onGridReady.bind(this);
  };

//获取表格基础api
  onGridReady(params) {
    this.gridApi = params.api;
    this.state.api = params;
    this.gridApi.hideOverlay();
    this.gridApi.defaultColumnWidth = 100;
    if (this.state.columnDefs.length < 4) {
      this.gridApi.sizeColumnsToFit();
    }

  }

//切换图表
  toggleChart = (type) => {
    this.props.toggleChart(type);
  };
//行点击
  rowClick = () => {

  };
//在组件创建，并初始化了状态之后，在第一次绘制 render() 之前
  componentWillMount() {
    this.setState({
      toCanvas: this.props.isAg,
      title: this.props.title,
      columnDefs: this.props.column,
      rowData: this.props.row,
      option: this.props.option,
      id: this.props.id,
      show: this.props.show,
      loading: this.props.loading,
    });
  }

//已加载组件收到新的参数时调用
  componentWillReceiveProps(next) {
    this.setState({
      toCanvas: next.isAg,
      title: next.title,
      columnDefs: next.column,
      rowData: next.row,
      option: next.option,
      id: next.id,
      show: next.show,
      loading: next.loading
    });
  }

  render() {
    let {title, toCanvas, columnDefs, rowData, option, id, show, loading} = this.state;
    return (<div className={css.card}>
      <div className={css.cardTitle}>{title}
        <i className={`icon iconfont ${css.toggleIcon} ${toCanvas ? css.un : css.on}`}
           onClick={this.toggleChart.bind(this, id)}>&#xe673;</i>
      </div>
      <Spin spinning={loading}>
        {!toCanvas ? <div className={`${css.agSty}`}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            rowClass={css.row}
            enableColResize={true}//能否改变列宽
            onCellClicked={this.rowClick}//行点击
            headerHeight={28}//标题高
            rowHeight={28}//行高
            rowSelection='single'//单行选择
            suppressCellSelection={false}//是否启用键盘导航
            singleClickEdit={true}//单击启用编辑模式
            stopEditingWhenGridLosesFocus={true}//网格失去焦点时停止单元格编辑
            animateRows={true}//行动画
            onGridReady={this.onGridReady}//基础api
            suppressScrollOnNewData={true}//获取新数据不会滚动到顶部
            suppressDragLeaveHidesColumns={true}//让列无法拖拽出去隐藏
            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
          >
          </AgGridReact>
        </div> :
          show ? <Echart id={id} className={css.canvas} option={option}/> : <NullInfo className={css.tips}/>}</Spin>
    </div>)
  }
}
 
 
 