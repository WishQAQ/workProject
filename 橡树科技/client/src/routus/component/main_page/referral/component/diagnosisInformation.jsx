/**
 * description:分诊信息
 * author: mou
 * time:2018-1-6
 */
import React from 'react'
import {Card} from './card'
import {Button, Radio, Select} from 'antd'
import {LabelAddComponent} from './labelAddComponent'
import style from './style/diagnosisInfo.scss'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const ButtonGroup = Button.Group;
export class DiagnosisInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = () => {

  };
  handleBlur = () => {
    console.log('blur');
  };

  handleFocus = () => {
    console.log('focus');
  };

  render() {
    return (<Card title="分诊信息" className={style.diagonsisInfo}>
      <div className={style.btn}>
          <ButtonGroup>
            <Button type="success"><i className={`icon iconfont ${style.iconSize1}`}>&#xe624;</i>预约挂号</Button>
            <Button type="success"><i className={`icon iconfont ${style.iconSize1}`}>&#xe624;</i>远程会诊</Button>
            <Button type="success"><i className={`icon iconfont ${style.iconSize1}`}>&#xe60a;</i>病情详情</Button>
            <Button type="success"><i className={`icon iconfont ${style.iconSize1}`}>&#xe607;</i>发送</Button>
          </ButtonGroup>
      </div>
      <div className={style.other}>
        <LabelAddComponent label="分诊医院" weight className={`${style.hospital}`}>
          <RadioGroup onChange={this.onChange} defaultValue="a">
            <RadioButton value="a">西南医院</RadioButton>
            <RadioButton value="b">新桥医院</RadioButton>
            <RadioButton value="c">公共医疗</RadioButton>
            <RadioButton value="d">肿瘤医院</RadioButton>
          </RadioGroup>
          <Select
            className={style.comWay}
            showSearch
            defaultValue="jack"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            dropdownClassName={style.doctorOption}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">门诊</Option>
            <Option value="lucy">急诊</Option>
            <Option value="tom">住院</Option>
          </Select>
          <Select
            className={style.hospitalName}
            showSearch
            defaultValue="jack"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            dropdownClassName={style.doctorOption}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">西南医院</Option>
            <Option value="lucy">陈家桥医院</Option>
            <Option value="tom">井口医院</Option>
          </Select>
        </LabelAddComponent>
        <LabelAddComponent label="分诊科室" weight className={`${style.dept}`}>
          <RadioGroup onChange={this.onChange} defaultValue="a">
            <RadioButton value="a">神经外科</RadioButton>
            <RadioButton value="b">儿科</RadioButton>
            <RadioButton value="c">综合</RadioButton>
            <RadioButton value="d">创伤</RadioButton>
            <RadioButton value="e">腹痛</RadioButton>
            <RadioButton value="f">胸痛</RadioButton>
            <RadioButton value="g">神经内科</RadioButton>
            <RadioButton value="h">眼科</RadioButton>
            <RadioButton value="i">骨科</RadioButton>
            <RadioButton value="j">妇科</RadioButton>
            <RadioButton value="k">耳鼻喉</RadioButton>
            <RadioButton value="l">儿科</RadioButton>
          </RadioGroup>
        </LabelAddComponent>
        <LabelAddComponent label="医生" weight className={`${style.doctor}`}>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="选择医生"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            dropdownClassName={style.doctorOption}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </LabelAddComponent>
      </div>
    </Card>)
  }
}
 
 
 