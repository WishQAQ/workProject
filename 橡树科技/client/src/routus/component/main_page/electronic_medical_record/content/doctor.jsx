/**
 * description:医嘱、处置、处方
 * author: mou
 * time:2017-12-12
 */
import React from 'react'
import {Radio, Table, Button, Spin,message} from 'antd'
import api from '../api'
import css from '../eleMedical.scss'
const RadioGroup = Radio.Group;
export class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      titles: {},
      rowData: [],
      value: '',//radio值
      selData: [],//查询的数据备份
      loading: false,
    };
  };

  componentWillMount() {
    this.setState({
      data: this.props.data,
      columns: this.props.columns,
      titles: this.props.titles,
    }, () => {
      this.loadData(this.state.data)
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      data: next.data,
      columns: next.columns,
      titles: next.titles,
    }, () => {
      this.loadData(this.state.data)
    })
  }

  loadData = (data) => {
    const {loadData, addArrKey} = api;
    let param = {};
    const title = this.state.titles.title;
    if (title === '医嘱浏览') {
      param.action = 'patientOrdersList'
    } else if (title === '处方查看') {
      param.action = 'outpPresc'
    } else if (title === '处置查看') {
      param.action = 'outpDispose'
    }
    param.message = data;
    this.setState({
      loading: true
    });
    loadData(param, response => {
      if (response.success) {
        let data = response.data;
        if(data===undefined || data.length===0 || data===null){
          message.warning('暂无相关数据');
          this.setState({
            loading: false,
            rowData:[],
            selData:[]
          });
          return false;
        }
        data && data.length ? data = addArrKey(data) : data;
        this.setState({
          rowData: data,
          selData: data,
          loading: false
        })
      } else {
        this.setState({
          loading: false,
          rowData:[],
          selData:[]
        });
        console.error("response error", response);
      }
    })
  };
  onChange = (e) => {
    const {titles, selData} = this.state;
    let rowData;
    if (titles.title === '医嘱浏览') {
      switch (e.target.value) {
        //全部
        case 1:
          rowData = selData;
          break;
        //长期
        case 2:
          rowData = this.filter(selData, '长期');
          break;
        //临时
        case 3:
          rowData = this.filter(selData, '临时');
          break
      }
      this.setState({value: e.target.value, rowData})
    }
  };
  filter = (data, type) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (type === data[i].repeatIndicator) {
        arr.push(data[i])
      }
    }
    return arr;
  };
  /*  rowClassName = (record, index) => {
   const {activeIndex} = this.props;
   if (activeIndex === index) {
   return "ant-table-row-active";
   }
   rowClassName={this.rowClassName}
   };*/

  render() {
    const {value, columns, titles, rowData, loading} = this.state;
    return (<div className={css.doctor}>
      <div className={css.condition}>
        <span>{titles.title}</span>
        {titles.otherType === 'radioGroup' ? <RadioGroup onChange={this.onChange} value={value}>
          {titles.other.map((one, index) =>
            <Radio value={one.value} key={one.label}>{one.label}</Radio>
          )}
        </RadioGroup> : null}
      </div>
      <Spin spinning={loading}>
        <Table bordered columns={columns} dataSource={rowData} pagination={false} scroll={{y: '100%'}}/>
      </Spin>
    </div>)
  }
}
 
 
 