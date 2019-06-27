//头部
import React from "react";
import css from './../style/medical_income.scss'
import api from './../api'
import {MulSelect} from './mulSelect'
import {SinSelect} from './sinSelect'
import {Button, DatePicker, Card, message} from 'antd';
const {MonthPicker} = DatePicker;
import moment from "moment";
//类型
const types = [
    {No: 'year', text: '年'},
    {No: 'month', text: '月'},
    {No: 'day', text: '日'},
];
//年
const years = [
    {No: 3, text: '近三年'},
    {No: 5, text: '近五年'},
    {No: 8, text: '近八年'},
    {No: 10, text: '近十年'},
];
//输入框样式
const selectMultiple = [{
    style: {
        height: "28px",
        fontSize: "12px",
        width: "200px",
        border: '1px solid #dddddd',
        borderRadius: '4px',
        padding: '4px 7px',
        verticalAlign: 'middle'
    },
    labelStyle: {lineHeight: "28px", height: "28px", fontSize: "12px", top: "-4px", paddingRight: "24px"},
    iconStyle: {padding: "0px", width: "24px", height: "24px", color: "black", top: '0'},
    underlineStyle: {bottom: "0", backgroundColor: "black", color: "black", display: 'none'},
    hintStyle: {fontSize: "12px", bottom: "0", top: '0'},
}];
export class Header extends React.Component {
    state = {
        loadHospitals: [],//医院字典表
        selHospitalsName: [], //选择的医院名称
        selHospitalsNo: [],  //选择医院的id
        type: '',          //类型
        typeNo: '',
        year: '',
        beginYear: moment().format('YYYY'),   //开始年
        beginMonth: '',
        endMonth: '',
        beginDay: '',
        endDay: '',
        data: '',
    };
    //下拉多选
    select = (type, event, key, values, name, ids) => {
        switch (type) {
            case 'hospital':
                this.setState({
                    selHospitalsName: values,
                    selHospitalsNo: ids,
                });
                break;
            case 'type':
                this.setState({
                    type: values,
                });
                break;
            case 'year':
                this.setState({
                    year: values,
                });
                break

        }

    };
    //时间
    onChange = (type, date, dateString) => {
        switch (type) {
            case 'beginMonth':
                this.setState({
                    beginMonth: dateString
                });
                break;
            case 'endMonth':
                this.setState({
                    endMonth: dateString
                });
                break;
            case 'beginDay':
                this.setState({
                    beginDay: dateString
                });
                break;
            case 'endDay':
                this.setState({
                    endDay: dateString
                });
                break;
        }
    };
    //检测选择的时间是否和法
    checkDate = (type, beginDay, endDay, beginMonth, endMonth, hospital, year) => {
        if (hospital.length === 0) {
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
        return true
    };
    //查询医改数据
    handleClick = () => {
        const {selectHospitalsInfo} = api;
        let {type, year, beginDay, endDay, beginMonth, endMonth, selHospitalsName, selHospitalsNo, beginYear, endYear} = this.state;
        let hospitalCode = selHospitalsNo.join(';');
        //hospital = "450439539;450439619;517885999;450439555;67614539X;556773711;572124017;569914341;45043958X;450439512;450497317;450497325;450497333;450497341;45049735X;686223638;68621992X;569920944;573400669;82441271;08468940-6;59858562;450439563;125001063587003862;";
        if (!this.checkDate(type, beginDay, endDay, beginMonth, endMonth, selHospitalsName, year)) {
            return false
        }

        let dataPack = {
            hospitalCode: hospitalCode,
            type: type,
            timeFrom: '',
            timeTo: ''
        };
        if (type === 'year') {
            switch (year) {
                case 3:
                    endYear = moment().subtract(2, 'y').year();
                    break;
                case 5:
                    endYear = moment().subtract(4, 'y').year();
                    break;
                case 8:
                    endYear = moment().subtract(7, 'y').year();
                    break;
                case 10:
                    endYear = moment().subtract(9, 'y').year();
                    break;
            }
            dataPack.timeFrom = endYear.toString();
            dataPack.timeTo = beginYear;
        } else if (type === 'month') {
            dataPack.timeFrom = endMonth;
            dataPack.timeTo = beginMonth;
        } else {
            dataPack.timeFrom = endDay;
            dataPack.timeTo = beginDay;
        }
        selectHospitalsInfo(dataPack, selectHospitalsInfo => {
            this.setState({data: selectHospitalsInfo}, () => {
                this.props.renderCanvas(this.state.data, dataPack.timeFrom, dataPack.timeTo, selHospitalsName, selHospitalsNo, '')
            })
        });
    };
    //render之前获取医院字典表
    componentWillMount() {
        const {loadHospitals} = api;
        loadHospitals(loadHospitals => {
            this.setState({loadHospitals})
        })
    }

    render() {
        let {selHospitalsName, loadHospitals, type, year} = this.state;
        return (<div className={css.header}>
            <Card title={this.props.title}>
                <div className={css.hospital}>
                    <label>医院:</label>
                    <MulSelect
                        className="selectMultiple"
                        item={loadHospitals}
                        oValue={selHospitalsName}
                        selectMultiple={selectMultiple}
                        multiple={this.props.multiple}
                        select={this.select.bind(this, 'hospital')}
                    />
                </div>
                <div className={css.type}>
                    <label>类型:</label>
                    <SinSelect
                        className="selectMultiple"
                        item={types}
                        oValue={type}
                        selectMultiple={selectMultiple}
                        multiple={false}
                        select={this.select.bind(this, 'type')}
                    />
                </div>
                <div className={css.date}>
                    <label>时间:</label>
                    {type === 'year' ?
                        <span><SinSelect
                            className="selectMultiple"
                            item={years}
                            oValue={year}
                            selectMultiple={selectMultiple}
                            multiple={false}
                            select={this.select.bind(this, 'year')}
                        /></span>
                        : type === 'month' ?
                            <span><MonthPicker timePrecision={true} onChange={this.onChange.bind(this, 'beginMonth')}/>
                         —<MonthPicker timePrecision={true} onChange={this.onChange.bind(this, 'endMonth')}/>
                        </span> :
                            <span><DatePicker onChange={this.onChange.bind(this, 'beginDay')}/>
                        —<DatePicker onChange={this.onChange.bind(this, 'endDay')}/></span>}
                </div>
                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
            </Card>
        </div>)
    }
}