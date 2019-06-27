/**
 * 分级诊疗
 */
import React from 'react'
import css from '../eleMedical.scss'
import { Radio , Table , Button , Icon , Input , Select } from 'antd';


const { TextArea } = Input;
const RadioGroup=Radio.Group;
const columns = [{
    title: '患者姓名',
    dataIndex: 'name',
    width:'65px',
}, {
    title: '医院',
    dataIndex: 'hospital',
    width:'83px',
}, {
    title: '状态',
    dataIndex: 'address',
    width:'53px',
}, {
    title: '时间',
    dataIndex: 'time',
}];
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `病人${i}`,
        hospital: `井口社区`,
        address: `未知`,
        time:`2018-3-1`,
    });
}

const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export class Grading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div className={css.grading}>
                <div className={css.gradingLeft}>
                    <p className={css.gradingLeftTltle}>患者列表</p>
                    <div className={css.gradingLeftLine}>
                        <div className={css.gradingLeftBtn}>
                            <RadioGroup name="radiogroup" defaultValue={1}>
                                <Radio value={1}>全院</Radio>
                                <Radio value={2}>科室</Radio>
                                <Radio value={3}>个人</Radio>
                            </RadioGroup>
                        </div>
                        <Table
                            className={css.gradingLeftTable}
                            columns={columns}
                            dataSource={data}
                            scroll={{ y: 590 }}
                            pagination={false}
                            bordered={true}
                            size="small"
                        />
                    </div>
                </div>

                <div className={css.gradingRight}>
                    <div className={css.gradingInfo}>
                        <div className={css.gradingIfoTop}>
                            <p>患者姓名：<span>病人1</span></p>
                            <p>编号：<span>1234</span></p>
                            <p>发病时间:<span>2017-3-16</span></p>
                            <p>身份证号：<span>123345201...</span></p>
                            <p>出生日期：<span>1990-10-01</span></p>
                        </div>
                        <div>
                            <p>电话：<span>18612341234</span></p>
                            <p>费别：<span>自费</span></p>
                            <p>联系人：<span>某某</span></p>
                            <p>地址：<span>重庆市九区....</span></p>
                            <p>
                                <span className={css.gradingSpanLeft}>身份：<span>123</span></span>
                                <span>民族：<span>汉族</span></span>
                            </p>
                        </div>
                    </div>

                    <div className={css.basicInfo}>
                        <div className={css.basicInfoTitle}>
                            <p>基本信息</p>
                            <Button.Group>
                                <Button className={css.basicBtn} size='small'><Icon type="fork" />远程会诊</Button>
                                <Button className={css.basicBtn} size='small'><Icon type="layout" />病情详情</Button>
                                <Button className={css.basicBtn} size='small'><Icon type="check" />确定</Button>
                                <Button className={css.basicBtnDanger} size='small' type="danger"><Icon type="close" />拒绝</Button>
                            </Button.Group>
                        </div>
                        <div className={css.basicTable}>
                            <span className={css.basicTitle}>疾病名称</span>
                            <Input className={css.basicInput} />
                        </div>
                        <div className={css.basicTable}>
                            <span className={css.basicTitle1}>疾病状态</span>
                            <div className={css.basicGroup}>
                                <RadioGroup name="radiogroup" defaultValue={1}>
                                    <Radio value={1}>轻</Radio>
                                    <Radio value={2}>重</Radio>
                                    <Radio value={3}>急</Radio>
                                </RadioGroup>
                            </div>
                            <span className={css.basicTitle}>治疗难易度</span>
                            <div className={css.basicGroup}>
                                <RadioGroup name="radiogroup" defaultValue={1}>
                                    <Radio className={css.levelOne} value={1}>一级</Radio>
                                    <Radio className={css.levelTwo} value={2}>二级</Radio>
                                    <Radio className={css.levelThree} value={3}>三级</Radio>
                                    <Radio className={css.levelFour} value={4}>四级</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className={css.basicTable}>
                            <span className={css.basicText}>分诊原因</span>
                            <TextArea rows={12} />
                        </div>
                        <div className={css.basicTable}>
                            <span className={css.basicTextThree}>分诊医院</span>
                            <Select
                                className={css.basicTableSelect}
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="hospital1">分诊医院一</Option>
                                <Option value="hospital2">分诊医院二</Option>
                                <Option value="hospital3">分诊医院三</Option>
                            </Select>
                            <span className={css.basicTextThree}>分诊科室</span>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="department1">分诊科室一</Option>
                                <Option value="department2">分诊科室二</Option>
                                <Option value="department3">分诊科室三</Option>
                            </Select>
                            <span className={css.basicTextThree}>分诊医生</span>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="doctors1">分诊医生一</Option>
                                <Option value="doctors2">分诊医生二</Option>
                                <Option value="doctors3">分诊医生三</Option>
                            </Select>
                        </div>
                        <div className={css.basicTable}>
                            <span className={css.basicText}>分诊意见</span>
                            <TextArea rows={12} />
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
