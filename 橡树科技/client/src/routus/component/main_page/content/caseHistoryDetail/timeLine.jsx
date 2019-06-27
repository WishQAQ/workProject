/**
 * Created by liulingli on 2017/6/16.
 * desc : 病历详情左侧时间轴
 */
import React, {Component} from 'react';
import classNames from 'classnames';
import qs from 'qs';
import moment from 'moment';
import {message} from 'antd';
import {getOffset,isHtmlElement,compareObj} from '../../../common/function';
import {InputSelect} from './inputSelect';
import {QueryCriteria} from './queryCriteria';
import {QueryResultMore} from './queryResultMore';
import {QueryResultAlone} from './queryResultAlone';

export class TimeLine extends Component{
  //初始化查询条件
  formSeries = {
    year : 5
  };
  componentWillMount(){
    this.state = {
      style :{ //查询条件弹出层样式
        width : 0,
        top : 0,
        left : 0,
        display:'none',
      },
      target:'', //单击阶段
      isResult : false, // 在患者列表是否选择了单个患者
      isAlone:true, //是否查询出单个患者
      patientLists:[], //患者立标
      patientInfo:{}, //患者信息
      clinicRecList:undefined //区域就诊事件
    };
  }
  componentWillReceiveProps(nextProps,nextState){

  }
  componentDidMount(){
    //监听window的resize事件
    window.addEventListener("resize",this.getPosition);
  }
  componentWillUnmount(){
    //移除window的resize事件
    window.removeEventListener("resize",this.getPosition);

  }

  /**
   * @method 更多查询弹出框定位
   * @param event
   */
  getPosition = (event) =>{
    let target = event.target;
    let cachaTarget = this.state.target;
    let display = "block";
    //当resize事件时，记住当前弹出层的display
    if(target.offsetWidth === undefined){
      display = this.state.style.display;
    }
    if(isHtmlElement(target)&&cachaTarget !== ''){
      target = this.state.target;
    }
    if(target === ''||!target.offsetWidth){
      return;
    }
    let width = target.offsetWidth;
    let height = target.offsetHeight;
    let top = getOffset(target).top + height + 1 ;
    let left = getOffset(target).left;
    let afterStyle = {
      width : width*2,
      top : top,
      left : left,
      display:display
    };
    let beforeStyle = this.state.style;
    if(!compareObj(afterStyle,beforeStyle)){
      this.setState({
        style : afterStyle
      })
    }
  };
  /**
   * @method 隐藏更多查询条件
   */
  hide = () =>{
    if(this.state.style.display === 'block'){
      this.setState({
        style:{
          display:'none'
        }
      })
    }
  };

  /**
   * @method 查询输入框点击事件弹出更多查询条件
   * @param event
   */
  onClick = (event) =>{
    this.getPosition(event);
    this.setState({
      target : event.target
    })
  };

  onSearch = (value) =>{
    if(Object.prototype.toString.call(value) === "[object String]"){
      this.formSeries['anyName'] = value;
    }
    let validate = false;
    let hspCode = this.formSeries.hspCode||'';//医院编码
    let patientId = this.formSeries.patientId||'';//患者ID
    //医院编码和患者ID 是否一致
    let isCommon = false;
    if(hspCode === ''&&patientId !== ''||hspCode !== ''&&patientId === ''){
      isCommon = false;
    }else{
      isCommon = true;
    }
    for(let i in this.formSeries){
      if(this.formSeries[i] !== ''){
        validate = true;
        break;
      }
    };
    if(validate&&isCommon){ //验证通过
      fetch("/caseHistory/patientBaseInfo/loadPatientInfo",{method:"POST",body:qs.stringify(this.formSeries)}).then(response=>{
        if(response.success){
          let patientsInfo = response.data.patientsInfo;
          if(patientsInfo.length === 0){
            this.props.getPatientInfo(patientsInfo[0]||{});
            this.props.getDetailComponent('');
            this.setState({
              patientLists:patientsInfo,
              clinicRecList:[]
            });
            return;
          }
          //当只查询出一个患者时直接显示患者信息
          if(patientsInfo.length === 1){
            let patChart = eval("("+response.data.patChart+")");
            let healthData = patientsInfo[0];
            healthData.patChart = patChart;
            this.props.getPatientInfo(patientsInfo[0]);

            // 切换患者时右侧默认显示患者近5年健康数据
            this.props.getDetailComponent('jk',healthData);
            this.setState({
              patientLists:patientsInfo,
              clinicRecList : response.data.clinicRecList
            });
            return;
          }
          //当查询出多个患者时 列出多个患者列表，单击选中患者显示该患者信息
          if(patientsInfo.length>1){
            this.props.getPatientInfo({});
            this.props.getDetailComponent('');
            this.setState({
              isResult : true,
              isAlone:false,
              patientLists:patientsInfo
            })
          }
        }else{
          //报错
          this.props.getDetailComponent('');
          message.error(response.message);
        }
      })
    }else{ //验证未通过
      if(!isCommon){
        message.error("患者ID和医院编码必须同时填写");
      }else{
        message.error("请至少填一个查询条件");
      }
    }
    this.hide();
  };

  /**
   *
   * @param value
   */
  showChange =(value) =>{
    if(this.state.isResult !== value){
      this.setState({
        isResult : value
      })
    }
  };

  onValueChange =(key,value)=>{
    this.formSeries[key] = value;
  };

  onSearchChange = (value) =>{
    this.formSeries['anyName'] = value;
  };

  /* 加载单个患者的病历信息*/
  loadCaseHistory = (patientInfo) =>{
    let param = {
      idNo : patientInfo.idNo
    };
    fetch("/caseHistory/patientBaseInfo/loadClinicRecList",{method:"POST",body:qs.stringify(param)}).then(response=>{
      if(response.success){
        this.props.getPatientInfo(patientInfo,response.data);
        this.setState({
          clinicRecList : response.data,
          isAlone:true
        });
        this.props.getDetailComponent('jk',patientInfo);
      }else{
        message.error(response.message);
      }
    })
  };

  render(){
    let {style,isAlone,isResult,patientLists,patientInfo,clinicRecList} = this.state;
    let {...other} = this.props;
    return(
      <div className="time-line">
        <InputSelect
          hide={this.hide}
          onClick={this.onClick}
          onSearch={this.onSearch}
          onSearchChange={this.onSearchChange}
        >
          <QueryCriteria
            style={style}
            onSearch={this.onSearch}
            onValueChange={this.onValueChange}
          />
          {isAlone?
            <QueryResultAlone
              patientLists={patientLists}
              clinicRecList={clinicRecList}
              {...other}
            />
            :
            <QueryResultMore
              isShow={isResult}
              patientLists={patientLists}
              showChange={this.showChange}
              onLoad={this.loadCaseHistory}
            />
          }
        </InputSelect>
      </div>
    )
  }
}