/**
 * description:占一行的卡片组件
 * author: mou
 * time:2017-11-17
 */
import React from 'react';
import {Icon, Spin} from 'antd';
import css from '../../../less/main/content/outPrescriptions.scss';
import {NullInfo} from "../../common/nullInfo";
import {AgGridReact} from "ag-grid-react";
import {Echart} from './../../report_form/component/chart'//百度地图
export class BigCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      big: '',
      bigColumnDefs: [],
      rowData: [],
      title: '',
      leftOption: {series: []},
      rightOption: {series: []},
      leftId: '',
      rightId: '',
      show: '',
      bigId: '',
      loading: false,
      overlayNoRowsTemplate: "<span>暂无相关数据</span>"
    };
    this.onGridReady = this.onGridReady.bind(this);
  };

//获取表格基础api
  onGridReady(params) {
    this.state.api = params;
    this.gridApi = params.api;
    this.gridApi.hideOverlay();
    // params.api.sizeColumnsToFit();
    if(this.state.bigColumnDefs.length<6){
      this.gridApi.sizeColumnsToFit();
    }
  }

//在组件创建，并初始化了状态之后，在第一次绘制 render() 之前
  componentWillMount() {
    this.setState({
      big: this.props.big,
      show: this.props.show,
      title: this.props.title,
      leftId: this.props.leftId,
      rightId: this.props.rightId,
      bigColumnDefs: this.props.bigColumnDefs,
      rowData: this.props.rowData,
      leftOption: this.props.leftOption,
      rightOption: this.props.rightOption,
      bigId: this.props.bigId,
      loading: this.props.loading,
    });
  }

//已加载组件收到新的参数时调用
  componentWillReceiveProps(next) {
    this.setState({
      big: next.big,
      show: next.show,
      title: next.title,
      leftId: next.leftId,
      rightId: next.rightId,
      bigColumnDefs: next.bigColumnDefs,
      rowData: next.rowData,
      leftOption: next.leftOption,
      rightOption: next.rightOption,
      bigId: next.bigId,
      loading: next.loading,
    });
  }

  toggleChart = (type) => {
    this.props.toggleChart(type)
  };

  render() {
    let {loading, title, big, bigColumnDefs, rowData, leftOption, rightOption, leftId, rightId, show, bigId} = this.state;
    return (<div className={css.ageNum}>
      <div className={css.cardTitle}>{title}
        <i className={`icon iconfont ${css.toggleIcon} ${big ? css.un : css.on}`}
           onClick={this.toggleChart.bind(this, bigId)}>&#xe673;</i>
      </div>
      <Spin spinning={loading}>
        {!big ? <div className={`${css.agSty}`}>
          <AgGridReact
            columnDefs={bigColumnDefs}
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
        </div> : show ? <div className={css.flex}>
          <div className={css.left}>
            <Echart id={leftId} className={css.canvas} option={leftOption}/>
          </div>
          <div className={css.right}>
            <Echart id={rightId} className={css.canvas} option={rightOption}/>
          </div>
        </div> : <NullInfo className={css.tips}/>}</Spin>
    </div>)
  }
}
 
 
 