/**
 * description:电子病历共享头部
 * author: mou
 * time:2017-12-11
 */
import React from 'react'
import {Input, Select, Radio, DatePicker, Icon, message} from 'antd'
import css from './../eleMedical.scss'
import {extend} from 'jquery'
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import api from './../../api'
import {Store} from "core";

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: [],//医院字典表
            query: {
                hospitalCode: '',//医院
                //  flag: '',//标志
                patientName: '',//id,姓名,档案号,身份证号
                telephone: '',//电话号码
                sex: 0,//性别
                dateBirth: '',//出生日期
            }
        };
    };

    componentWillMount() {
        try {
            let patientInfo=Store.session.get('patientInfo');
            let query = patientInfo?JSON.parse(patientInfo.replace(/%22/g,'\"')):null
            if(query){
                extend(true,this.state.query,query)
                this.props.selData(this.state.query)
            }
        }catch (e){
            message.error('患者信息传入有误')
        }
        const {loadHospitals} = api;
        loadHospitals(loadHospitals => {
            let all = [];
            let hosName = [];
            for (let i = 0; i < loadHospitals.length; i++) {
                loadHospitals[i].value = loadHospitals[i].abbreviation;
                loadHospitals[i].key = loadHospitals[i].hospitalNo;
                all.push(loadHospitals[i].hospitalNo);
                hosName.push(loadHospitals[i].abbreviation)
            }
            this.setState({
                hospitals: loadHospitals
            });
        });
    }

    onChange = (type, e, dateString) => {
        let {query} = this.state;
        switch (type) {
            case 'hospitalCode':
                query.hospitalCode = e;
                break;
            case 'dateBirth':
                query.dateBirth = dateString;
                break;
            default:
                query[type] = e.target.value;
                break;
        }
        this.setState({
            query
        });
    };
    keyDown = (type, e) => {
        if (e.keyCode === 13) {
            this.selData();
        }
    };
    selData = () => {
        const {query} = this.state;
        let condition = false;
        for (let i in query) {
            if (query[i] !== '') {
                condition = true;
                break;
            }
        }
        if (!condition) {
            message.warning('请输入或选择查询条件');
            return false
        }
        this.props.selData(this.state.query)
    };

    render() {
        const {hospitals, query} = this.state;
        return (<div className={css.search}>
            <InputGroup compact>
                <Input className={css.label} defaultValue="医院" disabled={true}/>
                <Select
                    dropdownClassName={css.dropMenu}
                    onChange={this.onChange.bind(this, 'hospitalCode')}
                    placeholder={'请选择医院'}
                    style={{width: 160}}>
                    {hospitals.map((hospital, index) =>
                        <Option value={hospital.key} key={index}>{hospital.value}</Option>
                    )}
                </Select>
            </InputGroup>
            {/* <Input value={query.flag} placeholder="患者住院标志" className={css.flag} onChange={this.onChange.bind(this, 'flag')}/>*/}
            <Input value={query.patientName} placeholder="患者姓名/身份证号/健康档案号/医保号/ID" className={css.num}
                   onChange={this.onChange.bind(this, 'patientName')}
                   onKeyDown={this.keyDown.bind(this, 'patientName')}/>
            <Input value={query.telephone} placeholder="电话号码" className={css.phone}
                   onChange={this.onChange.bind(this, 'telephone')} onKeyDown={this.keyDown.bind(this, 'telephone')}/>
            <label className={css.sex}>性别:</label>
            <RadioGroup name="sex" value={query.sex} onChange={this.onChange.bind(this, 'sex')}>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
                <Radio value={0}>未知</Radio>
            </RadioGroup>
            <DatePicker onChange={this.onChange.bind(this, 'dateBirth')} placeholder="出生日期"/>
            <div className={css.searchBtn} onClick={this.selData}><i
                className={`icon iconfont ${css.btnIcon}`}>&#xe604;</i>
            </div>
        </div>)
    }
}
 
 
 