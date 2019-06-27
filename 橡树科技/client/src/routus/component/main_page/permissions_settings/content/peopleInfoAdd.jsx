/**
 * description:人员信息新增
 * author: mou
 * time:2018-1-18
 */
import React from 'react'
import {Input, Select} from 'antd'
import api from '../api'
import css from '../style/content/peopleInfoAdd.scss'

const Option = Select.Option;

export class PeopleInfoAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: [],//医院字典表
            findAllDoctorTitleDict: [],//职称字典表
            findAllJobClassDict: [],//工作字典表
            param: {},
        };
    }

    componentWillMount() {
        this.getHospitals();
        this.findAllDoctorTitleDict();
        this.findAllJobClassDict();
        this.setState({
            param: this.props.param,
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            param: nextProps.param,
        })
    }

    /** 获取医院字典表 */
    getHospitals = () => {
        const {loadHospitals} = api;
        loadHospitals(response => {
            if (response.success) {
                const hospitals = response.data;
                this.setState({
                    hospitals
                })
            } else {
                console.error("response error", response);
            }
        })
    };
    /** 获取职称字典表 */
    findAllDoctorTitleDict = () => {
        const {findAllDoctorTitleDict} = api;
        findAllDoctorTitleDict(response => {
            if (response.success) {
                const findAllDoctorTitleDict = response.data;
                this.setState({
                    findAllDoctorTitleDict
                })
            } else {
                console.error("response error", response);
            }
        })
    };
    findAllJobClassDict = () => {
        const {findAllJobClassDict} = api;
        findAllJobClassDict(response => {
            if (response.success) {
                const findAllJobClassDict = response.data;
                this.setState({
                    findAllJobClassDict
                })
            } else {
                console.error("response error", response);
            }
        })
    };
    onChange = (type, e) => {
        this.props.onChange(type, e);
    };

    render() {
        const {hospitals, findAllDoctorTitleDict, findAllJobClassDict, param} = this.state;
        return (<div className={css.infoAdd}>
            <Input addonBefore={<p><span>登录用户名</span><span className={css.mast}>*</span></p>} value={param.userName}
                   onChange={this.onChange.bind(this, 'userName')}/>
            <Input addonBefore={<p><span>加密后口令</span><span className={css.mast}>*</span></p>} value={param.password}
                   onChange={this.onChange.bind(this, 'password')} type={'password'}/>
            <div className={css.flex}>
                <div className={`${css.flex} ${css.flex1}`}>
                    <div>
                        <Input addonBefore={<p><span>姓名</span><span className={css.mast}>*</span></p>}
                               value={param.name}
                               onChange={this.onChange.bind(this, 'name')}/>
                    </div>
                </div>
                <div className={`${css.flex} ${css.flex1} ${css.marginLeft6}`}>
                    <div>
                        <p className={css.width40}>工作</p>
                    </div>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        dropdownClassName={css.dropMenu}
                        style={{width: '100%'}}
                        value={param.job}
                        onChange={this.onChange.bind(this, 'job')}
                    >
                        {findAllJobClassDict.map((job, index) =>
                            <Option key={index} value={job.jobClassName}>{job.jobClassName}</Option>
                        )}
                    </Select>
                </div>
            </div>
            <div className={css.flex}>
                <div>
                    <p className={css.width40}>职称</p>
                </div>
                <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    dropdownClassName={css.dropMenu}
                    style={{width: '100%'}}
                    value={param.title}
                    onChange={this.onChange.bind(this, 'title')}
                >
                    {findAllDoctorTitleDict.map((title, index) =>
                        <Option key={index} value={title.titleName}>{title.titleName}</Option>
                    )}
                </Select>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex} ${css.flex1}`}>
                    <div>
                        <p className={css.hospitalName}>医院名称<span className={css.mast}>*</span></p>
                    </div>
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        dropdownClassName={css.dropMenu}
                        style={{width: '100%'}}
                        value={param.hospitalCode}
                        onChange={this.onChange.bind(this, 'hospitalCode')}
                    >
                        {hospitals.map((hospital, index) =>
                            <Option value={hospital.hospitalNo}
                                    key={hospital.hospitalNo}>{hospital.abbreviation}</Option>
                        )}
                    </Select>
                </div>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="公卫ID" value={param.vsId} onChange={this.onChange.bind(this, 'vsId')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="公卫名称" value={param.vsName} onChange={this.onChange.bind(this, 'vsName')}/>
                </div>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="公卫账号" value={param.vsUserName}
                           onChange={this.onChange.bind(this, 'vsUserName')}/>
                </div>
            </div>
        </div>)
    }
}
 
 
 