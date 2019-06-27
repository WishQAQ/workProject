/**
 * description:医院新增
 * author: yu
 * time:2018-3-9
 */
import React from 'react'
import {Input, Select ,Radio} from 'antd'
import  api from '../api'
import css from '../style/content/peopleInfoAdd.scss'
const Option = Select.Option;
const RadioGroup = Radio.Group;
export class HospitalInfoAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // hospitals: [],//医院字典表
            // findAllDoctorTitleDict: [],//职称字典表
            // findAllJobClassDict: [],//工作字典表
            radioClick: '1',
            param:{},
            radioValue: '1',
            selectValue: '',
        };
    }
    componentWillMount() {
        // this.getHospitals();
        // this.findAllDoctorTitleDict();
        // this.findAllJobClassDict();
        console.log(this.state.radioValue)
        this.setState({
            param: this.props.param,
            radioValue: this.props.param.emrEnable
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            param: nextProps.param,
            radioValue: this.props.param.emrEnable
        })
    }

    onChange = (type, e) => {
        console.log(type)
        console.log(e.target.value)
        this.props.onChange(type, e);
    };
    /**
     * input值改变时
     * @param type
     * @param e
     */
    onChangeHos = (type,e) => {
        this.props.onChange(type,e)
    }
    /**
     * radio框被改变时
     * @param e
     */
    radioOnChange (e) {
        console.log(e.target.value)
        this.setState({
            radioValue: e.target.value
        })
    }

    /**
     * 下拉框 值改变时
     * @param e
     */
    selectChange = (e) => {
        console.log(e)
        this.setState({
            selectValue: e.label
        })
    }
    render() {
        const options = [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
        ];
        const {param, selectValue} = this.state;
        return (<div className={css.infoAdd}>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore={<div><span>单位简称</span><span className={css.mast}>*</span>
                        <Select
                            labelInValue
                            defaultValue={{ key: '选择类别' }}
                            style={{ width: 100}}
                            className={css.selectMargin}
                            onChange={this.selectChange.bind(this)}>
                            <Option value="danwei">单位</Option>
                            <Option value="yiyuan">医院</Option>
                            <Option value="sheguan">社管中心</Option>
                        </Select>
                    </div>
                    } value={selectValue} onChange={this.onChangeHos.bind(this, '')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore={<p><span>病人ID前缀</span></p>} value={param.patientIdHead} onChange={this.onChangeHos.bind(this, 'patientIdHead')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore={<p><span>同步服务器地址</span></p>} value={param.serverIp} onChange={this.onChangeHos.bind(this, 'serverIp')}/>
                </div>
            </div>

            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore={<p><span>同步服务器端口</span></p>} value={param.serverPort} onChange={this.onChangeHos.bind(this, 'serverPort')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="单位号" value={param.hospitalNo} onChange={this.onChangeHos.bind(this, 'hospitalNo')}/>
                </div>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="单位名称简称" value={param.abbreviation} onChange={this.onChangeHos.bind(this, 'abbreviation')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore='单位全称' value={param.hospitalNameFull} onChange={this.onChangeHos.bind(this, 'hospitalNameFull')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="单位商户号" value={param.hospitalAccount} onChange={this.onChangeHos.bind(this, 'hospitalAccount')}/>
                </div>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="病历链接数据源" value={param.dataSource} onChange={this.onChangeHos.bind(this, 'dataSource')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <span className={`${css.RadioSpan1} ${css.radioSpan}`}>是否启用区域EMR</span>
                    <span className={`${css.RadioSpan2} ${css.radioSpan}`}>
                        <RadioGroup options={options} className={css.radio} value={this.state.radioValue} onChange={this.radioOnChange.bind(this)}/>
                    </span>
                </div>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="亚德程序编码" value={param.citywideApplicationCode} onChange={this.onChangeHos.bind(this, 'citywideApplicationCode')}/>
                </div>
            </div>
            <div className={css.flex}>
                <div className={`${css.flex1} ${css.marginLeft6}`}>
                    <Input addonBefore="亚德单位名称" value={param.citywideApplicationName} onChange={this.onChangeHos.bind(this, 'citywideApplicationName')}/>
                </div>
            </div>
        </div>)
    }
}
