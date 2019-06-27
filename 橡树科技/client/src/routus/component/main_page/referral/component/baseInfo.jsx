/**
 * description:就诊转院——基本信息
 * author: mou
 * time:2018-1-5
 */
import React from 'react'
import {Card} from './card'
import {LabelAddComponent} from './labelAddComponent'
import {Input, Select, DatePicker, Radio} from 'antd'
import style from './style/baseInfo.scss'
import eventProxy from "../../eventProxy";
import qs from "qs";

const Search = Input.Search;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export class BaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '基本信息',
            selectArray:[],
            buttonArray:[],
            data:{},
            patientInfo: {
                hospitalCode: '', // 医院编码
                idNumber: '',// 身份证号
                timeOfOnset: '', // 发病时间
                dateOfBirth: 'birthday',// 出生年月日
                personToContact: '', // 联系人
                address: '', // 地址
                methodOfHospital: '', // 来院方式
                deptName: '', // 科室
                nameOfDisease: '', // 疾病名称
                stateOfDisease: '', // 疾病状态
                treatmentDifficulty: '', // 治疗难易程度
                divisionHospitals: '', // 分诊医院
                divisionDept: '', // 分诊科室
                dispatcherDoct: '', // 分诊医生
                reasonsForDivision: '',// 分诊原因
                divisionStatus: '', // 分诊状态 0是已分诊 1是已接收 2 拒绝 3取消分诊
                dispatchAdvice: '', // 分诊建议
                receiveDate: '',// 接诊时间
                receiveDoct: '', // 接诊医生

                empi: '', // 区域id
                name: '', // 患者姓名
                sex: '', // 患者性别
                telephone: '',// 电话号码
                birthday: '',// 出生日期
                race: '', // 民族
                chargeType: '', // 费别
                identity: '', // 身份
                nativePlace: '', // 籍贯
                idCard: '', // 身份证号码
                insuranceNo: '', // 医保号
                guardianIdno: '', // 监护人证件号码
                homeAddress: '', // 家庭地址
                linkmanName: '', // 联系人姓名
                linkmanMobile: '', // 联系人电话
                guardianName: '', // 监护人姓名
                guardianIdType: '', // 监护人证件类型
                email: '', // 电子邮箱
                lastVisitDate: '',// 上次就诊日期
                siType: '', // 医保类型 1, 市职工医保 2，城乡居民 3，市内非医保 4，市外医保 5，市外非医保
                birthPlace: '', // 出生地址
                nationality: '', // 国籍
                healthCard: '', // 健康档案号
                phoneNumberHome: '', // 家庭电话
                phoneNumberBusiness: '', // 单位电话号码
                updateBy: '', // 经办人员姓名
                insuredCategories: '', // 参保类别 1 职工参保；2 居民参保；3 离休干部
                insuranceCategories: '', // 险种类别 1、医疗保险 2、工伤保险 3、生育保险
                updateTime: '',// 更新时间
                createDate: '',// 创建时间
                bloodtype: '', // 血型
            },
        }
    }

    componentWillMount() {
        this.fetchSelect()
        // 监听 msg 事件
        eventProxy.on('base', (msg) => {
            console.log(JSON.parse(msg));
        });
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    //     this.setState({idcard: this.props.data})
    // }

    fetchSelect = () =>{
        let {patientInfo} = this.state
        fetch('/triageDict/loadComeHspDict', {   //来院方式
            method: 'GET'
        }).then(response => {
            console.log(response);
            this.setState({selectArray: response.data})
        });
        fetch('/workOrders/baseInfo/findDeptByCompanyNo', {   //科室
            method: 'post',
            body: qs.stringify(patientInfo)
        }).then(response => {
            console.log(response);
            this.setState({buttonArray: response.data})
        });
    }

    /**
     * 患者姓名
     */
    poeplName = (event) => {
        let base = this.state.patientInfo
        base.name = event.target.value
        this.setState({patientInfo: base})
    }

    /**
     * 患者编码
     */
    poeplEmpi = (event) => {
        let base = this.state.patientInfo
        base.empi = event.target.value
        this.setState({patientInfo: base})
    }

    /**
     * 电话
     */
    poeplTelephone = (event) => {
        let base = this.state.patientInfo
        base.telephone = event.target.value
        this.setState({patientInfo: base})
    }

    /**
     * 身份证号
     */
    poeplIdCard = (event) => {
        let base = this.state.patientInfo
        base.idCard = event.target.value
        this.setState({patientInfo:base})
    }

    /**
     * 费别
     */
    poeplChargeType = (event) => {
        let base = this.state.patientInfo
        base.chargeType = event.target.value
        this.setState({patientInfo: base})
    }

    /**
     * 联系人
     */
    poeplLinkmanName = (event) => {
        let base = this.state.patientInfo
        base.linkmanName = event.target.value
        this.setState({patientInfo:base})
    }

    /**
     * 身份
     */
    poeplIdentity = (event) => {
        let base = this.state.patientInfo
        base.identity = event.target.value
        this.setState({patientInfo:base})
    }

    /**
     * 民族
     */
    poeplRace = (event) => {
        let base = this.state.patientInfo
        base.race = event.target.value
        this.setState({patientInfo:base})
    }

    /**
     * 家庭电话
     */
    poeplHomeAddress = (event) => {
        let base = this.state.patientInfo
        base.homeAddress = event.target.value
        this.setState({patientInfo:base})
    }

    onChange = () => {
        console.log('onChange');
    };
    onOk = () => {
        console.log('onOk');
    };

    render() {
        const {title} = this.state;
        let {patientInfo , selectArray , buttonArray} = this.state
        return (<Card title={title} className={style.baseInfo}>
            <div className={style.query}>
                <p className={`${style.btn} ${style.btnActive}`}><i className="icon iconfont">&#xe66d;</i>建档</p>
                <p className={style.btn}><i className="icon iconfont">&#xe66a;</i>清空</p>
                <p className={style.btn}><i className="icon iconfont">&#xe669;</i>医保卡</p>
                <p className={style.btn}><i className="icon iconfont">&#xe668;</i>身份证</p>
                <Search
                    placeholder="暂存记录"
                    onSearch={value => console.log(value)}
                    className={style.search}
                />
            </div>
            <div className={style.content}>
                <div className={style.portrait}>
                    <div>
                        <img src="/public/images/womanT.png" alt="女"/>
                        <Select defaultValue="0" className={style.sex}>
                            <Option value="1">女</Option>
                            <Option value="2">男</Option>
                            <Option value="0">未知</Option>
                        </Select>
                    </div>
                    <div className={style.input}>
                        <Input value={patientInfo ? patientInfo.name : ''}
                               onChange={this.poeplName}
                               addonBefore="患者姓名"
                               className={style.inputOne}/>
                        <Input value={patientInfo ? patientInfo.empi : ''}
                               onChange={this.poeplEmpi}
                               addonBefore="患者编码"
                               className={style.inputOne}/>
                    </div>
                </div>
                <div className={style.padding}>
                    <Input value={patientInfo ? patientInfo.idCard : ''}
                           onChange={this.poeplIdCard}
                           addonBefore="身份证号"
                           className={`${style.inputOne} ${style.id}`}/>
                </div>
                <div className={`${style.flex} ${style.costAndPhone}`}>
                    <Input value={patientInfo ? patientInfo.chargeType : ''}
                           onChange={this.poeplChargeType}
                           addonBefore="费别"
                           className={`${style.inputOne} ${style.cost}`}/>
                    <Input value={patientInfo ? patientInfo.telephone : ''}
                           onChange={this.poeplTelephone}
                           addonBefore="电话"
                           className={`${style.inputOne} ${style.phone}`}/>
                </div>
                <LabelAddComponent border label="发病时间" className={style.happenTime}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder=" " onChange={this.onChange}
                                onOk={this.onOk}
                                className={style.openTime}/>
                </LabelAddComponent>
                <div className={`${style.flex} ${style.contacts}`}>
                    <LabelAddComponent border label="出生日期" className={style.bithday}>
                        <DatePicker format="YYYY-MM-DD" placeholder=" " onChange={this.onChange} onOk={this.onOk}/>
                    </LabelAddComponent>
                    <Input value={patientInfo ? patientInfo.linkmanName : ''}
                           onChange={this.poeplLinkmanName}
                           addonBefore="联系人"
                           className={`${style.inputOne}`}/>
                </div>
                <div className={`${style.flex} ${style.nationAndIdentity}`}>
                    <Input value={patientInfo ? patientInfo.identity : ''}
                           onChange={this.poeplIdentity}
                           addonBefore="身份"
                           className={style.inputOne}/>
                    <Input value={patientInfo ? patientInfo.race : ''}
                           onChange={this.poeplRace}
                           addonBefore="民族"
                           className={style.inputOne}/>
                </div>
                <div className={style.address}>
                    <Input value={patientInfo ? patientInfo.homeAddress : ''}
                           onChange={this.poeplHomeAddress}
                           addonBefore="地址"
                           className={style.inputOne}/>
                </div>
                <LabelAddComponent weight label="来院方式" className={style.comWay}>
                    <RadioGroup onChange={this.onChange} defaultValue="a">
                        {selectArray.map((current, index) =>
                            <RadioButton value={`${current.id}`} key={index}>{current.method}</RadioButton>
                        )}
                    </RadioGroup>
                </LabelAddComponent>
                <LabelAddComponent weight label="科室" className={style.dept}>
                    <RadioGroup
                        onChange={this.onChange}
                        defaultValue="a">
                        {buttonArray.map((current, index) =>
                            <RadioButton value={`${current.id}`} key={index}>{current.method}</RadioButton>
                        )}
                    </RadioGroup>
                </LabelAddComponent>
            </div>
        </Card>)
    }
}

 
 
 