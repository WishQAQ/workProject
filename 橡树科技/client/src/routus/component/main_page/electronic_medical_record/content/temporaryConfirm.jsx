/**
 * 临时分诊确认
 */
import React from 'react'
import css from '../eleMedical.scss'
import { Radio , Table , Button , Icon , Menu , Input , DatePicker ,Select} from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const Option = Select.Option;
function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(date, dateString) {
    console.log(date, dateString);
}

const RadioGroup=Radio.Group;
const columns = [{
    title: '医院名称',
    dataIndex: 'name',
}];
const data1 = [];
for (let i = 0; i < 100; i++) {
    data1.push({
        key: i,
        name: `重庆医院${i}`,
    });
}

const menu2 = (
    <Menu>
        <Menu.Item key="0">
            类别2
        </Menu.Item>
        <Menu.Item key="1">
            类别3
        </Menu.Item>
        <Menu.Divider />
    </Menu>
);


const columns2 = [{
    title: '类别',
    dataIndex: 'category',
    width: '7.5%',
}, {
    title: '患者姓名',
    dataIndex: 'username',
    width: '10%',
}, {
    title: '项目名称',
    dataIndex: 'name',
    width: '18%',
}, {
    title: '数量',
    dataIndex: 'quantity',
    width: '7%',
}, {
    title: '价格',
    dataIndex: 'price',
    width: '7%',
}, {
    title: '状态',
    dataIndex: 'status',
    width: '7%',
}, {
    title: '申请时间',
    dataIndex: 'time',
    width: '14%',
}, {
    title: '开单科室',
    dataIndex: 'department',
    width: '10%',
}, {
    title: '开单医生',
    dataIndex: 'doctor',
    width: '10%',
}, {
    title: '执行科室',
    dataIndex: 'carried',
    width: '10%',
}];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        category: `类别${i}`,
        username: `患者${i}`,
        name:`项目${i}`,
        quantity:`数量`,
        price:`价格`,
        status:`状态`,
        time:`2018-3-17`,
        department:`开单科室${i}`,
        doctor:`开单医生${i}`,
        carried: `执行科室`,
    });
}

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};




export class TemporaryConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    render(){
        const { startValue, endValue, endOpen } = this.state;
        return(
            <div className={css.temporaryConfirm}>
                <div className={css.grading}>
                    <div className={css.gradingLeft}>
                        <p className={css.gradingLeftTltle}>医院列表</p>
                        <div className={css.gradingLeftLine}>
                            <div className={css.gradingLeftBtn}>
                                <Radio.Group name="radiogroup" defaultValue={1}>
                                    <Radio value={1}>全院</Radio>
                                    <Radio value={2}>科室</Radio>
                                </Radio.Group>
                            </div>
                            <Table
                                className={css.gradingLeftTable}
                                columns={columns}
                                dataSource={data1}
                                scroll={{ y: 590 }}
                                pagination={false}
                                bordered={true}
                                size="small"
                            />
                        </div>
                    </div>
                </div>

                <div className={css.tepoTop}>
                <div className={css.temporary}>
                    <div className={css.temporaryTop}>
                        <div>
                            <RangePicker onChange={onChange} />
                        </div>
                        <div>
                            <Input.Group>
                                <Input
                                    className={css.labelLeft}
                                    defaultValue="项目"
                                    disabled={true}
                                />
                                <Select
                                    dropdownClassName={css.dropMenu}
                                    placeholder={'请选择项目'}
                                    style={{width: 160}}>
                                </Select>
                            </Input.Group>
                        </div>
                        <div  className={css.teporary3}>

                            <Button className={css.btn2} icon="enter">确认</Button>

                            <Button className={css.btn2} icon="rollback">撤销</Button>

                            <Button className={css.btn2}><Icon type="clock-circle-o" />历史记录</Button>
                        </div>
                    </div>

                    <div>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns2}
                            dataSource={data}
                            bordered={true}
                            pagination={false}
                            scroll={{ y: 550 }}
                            size={'small'}
                        />
                    </div>
                </div>
                </div>
            </div>

        )
    }
}
