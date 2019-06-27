/**
 * description:搜索組件
 * author: mou
 * time:2017-11-10
 */
import React from 'react'
import {Input, DatePicker, Select, Switch, message, Button, Radio} from 'antd';
import moment from "moment"
import Authority from './../../common/authority/index'//权限
import api from './../api'
import css from '../../../less/main/main.scss'
const ButtonGroup = Button.Group;
const {MonthPicker} = DatePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

//类型
const types = [
  {No: 'year', text: '年'},
  {No: 'month', text: '月'},
  {No: 'day', text: '日'},
];
//年
const years = [
  {No: '3', text: '近三年'},
  {No: '5', text: '近五年'},
  {No: '8', text: '近八年'},
  {No: '10', text: '近十年'},
];
export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadHospitals: [],
      type: '',
      selHospitalsNo: '',
      year: '',
      beginMonth: '',
      endMonth: '',
      beginDay: '',
      endDay: '',
      baseName: 'medicalReform.HspYg.',
      selData: [],//查到的数据
      show: false,
      check: false,
      timeFrom: null,
      timeTo: null,
      settle: null,
      inOut: ''
    };
  };

  componentWillMount() {
    const {loadHospitals, loadDept} = api;
    loadHospitals(loadHospitals => {
      let all = [];
      let hosName = [];
      for (let i = 0; i < loadHospitals.length; i++) {
        loadHospitals[i].value = loadHospitals[i].abbreviation;
        loadHospitals[i].key = loadHospitals[i].hospitalNo;
        all.push(loadHospitals[i].hospitalNo);
        hosName.push(loadHospitals[i].abbreviation)
      }
      loadHospitals.unshift({
        value: '全部',
        abbreviation: '全部',
        key: all.toString(),
        hospitalNo: all.toString()
      });
      this.setState({loadHospitals});
      this.props.getHosName(hosName, 'hosName')
    });
    loadDept(loadDept => {
      let arr = [];
      for (let i = 0; i < loadDept.length; i++) {
        arr.push(loadDept[i]['deptName'])
      }
      this.props.getHosName(arr, 'deptName')
    })
  }

  //切换总的表格显示
  toggleToChart = () => {
    let {selHospitalsNo, type, timeFrom, timeTo,inOut,settle} = this.state;
    this.setState({
      check: !this.state.check,
    });
    if (!this.selBeforeCheck()) {
      this.setState({
        check: false,
      });
      return false
    }
    if (this.props.type && this.props.type === 'cost') {
      this.props.selData(selHospitalsNo, type, timeFrom, timeTo, 'detail', 'loading',inOut,settle);
    }else{
      this.props.selData(selHospitalsNo, type, timeFrom, timeTo, 'detail', 'loading');
    }
  };
  //查询前检测是否选择了查询条件
  selBeforeCheck = () => {
    let {selHospitalsNo, type, year, beginMonth, endMonth, beginDay, endDay, inOut} = this.state;
    if (selHospitalsNo === '') {
      message.warning('请选择要查询的医院');
      return false
    }
    if (type === '') {
      message.warning('请选择类型');
      return false
    }
    switch (type) {
      case 'year':
        if (year === '') {
          message.warning('请选择时间');
          return false
        }
        break;
      case 'month':
        if (beginMonth === '') {
          message.warning('请选择开始时间');
          return false
        }
        if (endMonth === '') {
          message.warning('请选择结束时间');
          return false
        }
        if (beginMonth >= endMonth) {
          message.warning('开始月份必须小于结束月份');
          return false;
        }
        break;
      case 'day':
        if (beginDay === '') {
          message.warning('请选择开始时间');
          return false
        }
        if (endDay === '') {
          message.warning('请选择结束时间');
          return false
        }
        if (beginDay >= endDay) {
          message.warning('开始日期必须小于结束日期');
          return false;
        }
        break
    }
    if (this.props.type && this.props.type === 'cost') {
      if (inOut === '') {
        message.warning('请选择全部、在院、或出院');
        return false
      }
    }
    return true
  };
  //查询数据
  selData = () => {
    let {selHospitalsNo, type, timeFrom, timeTo, check, inOut, settle} = this.state;
    if (!this.selBeforeCheck()) {
      return false
    }
    if (check) {
      this.setState({
        check: !check
      })
    }
    this.setState({
      show: true
    });
    this.setState({
      timeTo,
      timeFrom,
    });
    if (this.props.type && this.props.type === 'cost') {
      this.props.selData(selHospitalsNo, type, timeFrom, timeTo, '', 'loading', inOut, settle)
    } else {
      this.props.selData(selHospitalsNo, type, timeFrom, timeTo, '', 'loading');
    }
  };
  //医院、类型、年份、发生金额、全部、在院
  handleChange = (type, value) => {
    switch (type) {
      case 'hospital':
        this.setState({
          selHospitalsNo: value
        });
        this.props.changeValue(value, 'selHos');
        break;
      case 'type':
        this.setState({
          type: value
        });
        this.props.changeValue(value, 'timeType');
        break;
      case 'date':
        this.setState({
          year: value,
          timeFrom: moment().subtract(value - 1, 'year').year() + '-1-1',
          timeTo: moment().year() + '-12-31'
        }, () => {
          this.props.changeValue(this.state.timeFrom, 'timeFrom');
          this.props.changeValue(this.state.timeTo, 'timeTo');
        });
        break;
      default:
        this.setState({
          [type]: value.target.value
        });
        this.props.changeValue(value.target.value, type);
    }
  };
  //时间
  onChange = (type, date, dateString) => {
    switch (type) {
      case 'beginMonth':
        this.setState({
          beginMonth: dateString,
          timeFrom: dateString + '-1',
        });
        this.props.changeValue(dateString + '-1', 'timeFrom');
        break;
      case 'endMonth':
        this.setState({
          endMonth: dateString,
          timeTo: moment(dateString).endOf('month').format("YYYY-MM-DD"),
        });
        this.props.changeValue(dateString + '-30', 'timeTo');
        break;
      case 'beginDay':
        this.setState({
          beginDay: dateString,
          timeFrom: dateString,
        });
        this.props.changeValue(dateString, 'timeFrom');
        break;
      case 'endDay':
        this.setState({
          endDay: dateString,
          timeTo: dateString,
        });
        this.props.changeValue(dateString, 'timeTo');
        break;
    }
  };

  render() {
    let {loadHospitals, type, baseName} = this.state;
    return (<div className={css.search}>
      <div className={css.hospital}>
        <InputGroup compact>
          <Input className={css.label} defaultValue="医院" disabled={true}/>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            dropdownClassName={css.dropMenu}
            onChange={this.handleChange.bind(this, 'hospital')}
            placeholder={'请选择医院'}
            style={{width: 120}}>
            {loadHospitals.map((hospital, index) =>
              <Option value={hospital.key} key={index}>{hospital.value}</Option>
            )}
          </Select>
        </InputGroup>
  {/*      <label className={css.label}>医院</label>
        <Select
          dropdownClassName={css.dropMenu}
          showSearch
          style={{width: 120}}
          placeholder="请选择医院"
          optionFilterProp="children"
          onChange={this.handleChange.bind(this, 'hospital')}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {loadHospitals.map((hospital, index) =>
            <Option value={hospital.key} key={index}>{hospital.value}</Option>
          )}
        </Select>*/}
      </div>
      <div className={css.type}>
        <InputGroup compact>
          <Input className={css.label} defaultValue="类型" disabled={true}/>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            dropdownClassName={css.dropColor}
            onChange={this.handleChange.bind(this, 'type')}
            placeholder={'请选择类型'}
            style={{width: 100}}>
            {types.map((type, index) =>
              <Option value={type.No} key={index}>{type.text}</Option>
            )}
          </Select>
        </InputGroup>
     {/*   <label className={css.label}>类型</label>
        <Select
          dropdownClassName={css.dropColor}
          showSearch
          style={{width: 100}}
          placeholder="请选择类型"
          optionFilterProp="children"
          onChange={this.handleChange.bind(this, 'type')}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {types.map((type, index) =>
            <Option value={type.No} key={index}>{type.text}</Option>
          )}
        </Select>*/}
      </div>
      <div className={css.date}>
        {type === 'year' ?
          <div className={css.year}>
            <Select
              dropdownClassName={css.dropColor}
              showSearch
              style={{width: 120}}
              placeholder="请选择时间"
              optionFilterProp="children"
              onChange={this.handleChange.bind(this, 'date')}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {years.map((year, index) =>
                <Option value={year.No} key={index}>{year.text}</Option>
              )}
            </Select>
          </div>
          : type === 'month' ?
            <span><MonthPicker timePrecision={true}
                               onChange={this.onChange.bind(this, 'beginMonth')}/>
                         <span className={css.label}>至</span><MonthPicker timePrecision={true}
                                                                          onChange={this.onChange.bind(this, 'endMonth')}/>
                         </span> :
            <span><DatePicker onChange={this.onChange.bind(this, 'beginDay')}/>
                         <span className={css.label}>至</span><DatePicker onChange={this.onChange.bind(this, 'endDay')}/></span>}
      </div>
      {this.props.type && this.props.type === 'cost' ? <div className={css.btnGroup}>
        <RadioGroup onChange={this.handleChange.bind(this, 'inOut')}>
          <RadioButton value="A">全部</RadioButton>
          <RadioButton value="I">在院</RadioButton>
          <RadioButton value="O">出院</RadioButton>
        </RadioGroup>
        <RadioGroup onChange={this.handleChange.bind(this, 'settle')}>
          <RadioButton value="N">发生金额</RadioButton>
          <RadioButton value="Y">结算金额</RadioButton>
        </RadioGroup>
      </div> : null}
      {/*  <Authority
       baseName={baseName}
       lastName={['getHosppitalInfo', 'get1111']}
       isAnd={''}
       >*/}
      <div className={css.searchBtn} onClick={this.selData}><i
        className={`icon iconfont ${css.btnIcon}`}>&#xe604;</i>{/*<Icon type="search" className={css.btnIcon}/>*/}
      </div>
      {/*   </Authority>*/}
      <Switch checkedChildren="查询明细" unCheckedChildren="查询明细" onChange={this.toggleToChart}
              checked={this.state.check}/>
    </div>)
  }
}
 
 
 