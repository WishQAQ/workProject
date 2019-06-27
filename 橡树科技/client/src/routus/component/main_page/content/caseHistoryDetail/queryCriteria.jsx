/**
 * Created by liulingli on 2017/6/16.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询条件
 */
import React, {Component} from "react";
import {Button, Form, Input, Radio, Select} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export class QueryCriteria extends Component {
  componentWillMount() {
    this.hospital = [];
    this.hospitalKey = {}; //医院编码与医院名称的键值对
    this.state = {
      style: this.props.style,
      isRequired: false,
      anyName: this.props.anyName, //任意查询条件
      name: '', //患者姓名
      hspCode: '', //医院编码
      patientId: '', //患者id
      sex: '', //患者性别
      insuranceNo: '', //医保号
      idNo: '', //身份证号
      healthCard: '', //健康卡号
      personalTel: '', //联系电话
      maritalStatus: '', //婚姻状况
      mailingAddress: '', //通讯地址
    };

    //查询所有医院
    fetch("/dict/findAllHospital", {method: "POST"}).then(response => {
      this.hospital = [];
      if (response.success) {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.hospital.push(data[i].hospitalNo);
          this.hospitalKey[data[i].hospitalNo] = data[i].hospitalName;
        }
      }
    })
  }

  /*componentWillReceiveProps(nextProps, nextState){
   if(nextProps.style != nextState.style){
   this.setState({
   style : nextProps.style
   })
   }
   if(nextProps.anyName != nextState.anyName){
   this.setState({
   anyName : nextProps.anyName
   })
   }
   }*/
  componentWillUpdate(nextProps) {
    if (nextProps.style !== this.state.style) {
      this.setState({
        style: nextProps.style
      })
    }
    if (nextProps.anyName !== this.state.anyName) {
      this.setState({
        anyName: nextProps.anyName
      })
    }
  }

  /* 改变查询条件的值 */
  onChange = (e, key) => {
    let value;
    let oldState = this.state;
    if (Object.prototype.toString.call(e) === "[object String]") {
      //是字符串直接取值
      value = e;
    } else { //不是则节点获取值
      value = e.target.value;
    }
    this.props.onValueChange(key, value);
    oldState[key] = value;
    this.setState(oldState)
    this.props.form.setFieldsValue({
      hspCode: oldState.hspCode, //医院编码
      patientId: oldState.patientId //患者id
    });
    let isRequired = oldState.hspCode === '' && oldState.patientId === '';
    this.setState({
      isRequired: !isRequired
    })
  }
  /* enter键查询 */
  onKeyupEnter = (event) => {
    let keyCode = event.keyCode;
    if (keyCode === 13) { //enter键
      //执行查询
      this.query();
    }
  }
  /* 查询 */
  query = () => {
    this.props.onSearch();
  }
  /* 清空查询条件 */
  empty = () => {
    let oldState = this.state;
    for (let i in oldState) {
      if (i !== 'style' && i !== 'isRequired') {
        oldState[i] = '';
        this.props.onValueChange(i, '');
      }
    }
    this.setState(oldState);
    this.props.form.setFieldsValue({
      hspCode: '', //医院编码
      patientId: '' //患者id
    });
    this.props.onValueChange('hspCode', '');
    this.props.onValueChange('patientId', '');
  }

  render() {
    let {style, anyName, isRequired, name, hspCode, patientId, sex, insuranceNo, idNo, healthCard, personalTel, maritalStatus, mailingAddress} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="query-content" style={style}>
        <Form onSubmit={this.handleSubmit} onKeyUp={(event) => this.onKeyupEnter(event)}>
          <p className="prompt">
            <span>注：查询条件至少填一个，患者id,医院编码必须同时填写</span>
            <span className='clear'>
              <Button size="default" type="primary" onClick={this.empty}>清空</Button>
              <Button size="default" className="query" type="primary" onClick={() => this.query(anyName)} icon="search">查询</Button>
            </span>
          </p>
          <FormItem label="患者姓名">
            <Input
              size="default"
              placeholder="患者姓名"
              value={name}
              onChange={e => this.onChange(e, 'name')}
            />
          </FormItem>
          <FormItem label="性别">
            <RadioGroup
              size="default"
              value={sex}
              onChange={e => this.onChange(e, 'sex')}
            >
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
              <Radio value="">未知</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="患者ID">
            {getFieldDecorator('patientId', {
              rules: [{required: isRequired, message: '患者ID和医院编码必须同时填写', whitespace: false}],
            })(
              <Input
                size="default"
                placeholder="患者ID"
                onChange={e => this.onChange(e, 'patientId')}
              />
            )}
          </FormItem>
          <FormItem label="医院名称">
            {getFieldDecorator('hspCode', {
              rules: [{required: isRequired, message: '患者ID和医院名称必须同时填写', whitespace: false}],
            })(
              <Select
                showSearch
                size="default"
                placeholder="医院名称"
                onChange={e => this.onChange(e, 'hspCode')}
              >
                {/*<Option value=""></Option>*/}
                {this.hospital.map((v, i) => {
                  return <Option key={i} value={v} title={this.hospitalKey[v]}>{this.hospitalKey[v]}</Option>
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="医保号">
            <Input
              size="default"
              placeholder="医保号"
              value={insuranceNo}
              onChange={e => this.onChange(e, 'insuranceNo')}
            />
          </FormItem>
          <FormItem label="身份证号">
            <Input
              size="default"
              placeholder="身份证号码"
              value={idNo}
              onChange={e => this.onChange(e, 'idNo')}
            />
          </FormItem>
          <FormItem label="健康卡号">
            <Input
              size="default"
              placeholder="健康档案卡号"
              value={healthCard}
              onChange={e => this.onChange(e, 'healthCard')}
            />
          </FormItem>
          <FormItem label="电话号码">
            <Input
              size="default"
              placeholder="电话号码"
              value={personalTel}
              onChange={e => this.onChange(e, 'personalTel')}
            />
          </FormItem>
          <FormItem label="婚姻状况">
            <Input
              size="default"
              placeholder="婚姻状况"
              value={maritalStatus}
              onChange={e => this.onChange(e, 'maritalStatus')}
            />
          </FormItem>
          <FormItem label="通讯地址">
            <Input
              size="default"
              placeholder="通讯地址"
              value={mailingAddress}
              onChange={e => this.onChange(e, 'mailingAddress')}
            />
          </FormItem>
        </Form>
      </div>
    )
  }
}
QueryCriteria = Form.create()(QueryCriteria);