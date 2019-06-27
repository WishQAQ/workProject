/**
 * 临检分诊
 */
import React from 'react'
import css from '../eleMedical.scss'
import { DatePicker , Button , Table , Input , Select , Icon } from 'antd';

const { RangePicker } = DatePicker;

const Option = Select.Option;
function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(date, dateString) {
    console.log(date, dateString);
}

const columns = [{
    title: '类别',
    dataIndex: 'category',
    width: '7%',
}, {
    title: '患者姓名',
    dataIndex: 'username',
    width: '8%',
}, {
    title: '项目名称',
    dataIndex: 'name',
    width: '25%',
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
    width: '15%',
}, {
    title: '开单科室',
    dataIndex: 'department',
    width: '8%',
}, {
    title: '开单医生',
    dataIndex: 'doctor',
    width: '8%',
}, {
    title: '执行科室',
    dataIndex: 'carried',
    width: '8%',
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


export class Temporary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    render(){
        return(
            <div className={css.temporary}>
                <div className={css.temporaryTop}>
                    <div>
                        <Input.Group>
                            <Input
                                className={css.labelLeftLong}
                                defaultValue="申请状态"
                                disabled={true}
                            />
                            <Select
                                className={css.labelLeftBlue}
                                dropdownClassName={css.dropMenu}
                                placeholder={'未分诊'}
                                style={{width: 80}}>
                            </Select>
                        </Input.Group>
                    </div>
                    <div>
                        <RangePicker
                            onChange={onChange}
                            style={{width: 180}}
                        />
                    </div>
                    <div>
                        <Input.Group>
                            <Input
                                className={css.labelLeft}
                                defaultValue="类别"
                                disabled={true}
                            />
                            <Select
                                dropdownClassName={css.dropMenu}
                                placeholder={'请选择类别'}
                                style={{width: 100}}>
                            </Select>
                        </Input.Group>
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
                                style={{width: 100}}>
                            </Select>
                        </Input.Group>
                    </div>
                    <div>
                        <Input.Group>
                            <Input
                                className={css.labelLeftLong}
                                defaultValue="开单科室"
                                disabled={true}
                            />
                            <Select
                                dropdownClassName={css.dropMenu}
                                placeholder={'请选择科室'}
                                style={{width: 100}}>
                            </Select>
                        </Input.Group>
                    </div>
                    <div  className={css.teporary3}>
                        <Button className={css.btn1} icon="search"></Button>

                        <Button className={css.btn2} icon="enter">发送</Button>

                        <Button className={css.btn2} icon="rollback">撤销</Button>

                        <Button className={css.btn2} icon="upload">导出</Button>

                        <Button className={css.btn2}><Icon type="clock-circle-o" />历史记录</Button>
                    </div>
                </div>

                <div className={css.temporaryInfo}>
                    <div className={css.teporaryInfoTop}>
                        <div>
                            <Input.Group>
                                <Input
                                    className={css.labelLeftLong}
                                    defaultValue="分诊医院"
                                    disabled={true}
                                />
                                <Select
                                    dropdownClassName={css.dropMenu}
                                    placeholder={'请选择项目'}
                                    style={{width: 200}}>
                                </Select>
                            </Input.Group>
                        </div>
                        <div>
                            <Input.Group>
                                <Input
                                    className={css.labelLeftLong}
                                    defaultValue="分诊医院"
                                    disabled={true}
                                />
                                <Select
                                    dropdownClassName={css.dropMenu}
                                    placeholder={'请选择项目'}
                                    style={{width: 200}}>
                                </Select>
                            </Input.Group>
                        </div>
                        <div>
                            <Input.Group>
                                <Input
                                    className={css.labelLeftLong}
                                    defaultValue="分诊医院"
                                    disabled={true}
                                />
                                <Select
                                    dropdownClassName={css.dropMenu}
                                    placeholder={'请选择项目'}
                                    style={{width: 200}}>
                                </Select>
                            </Input.Group>
                        </div>
                    </div>
                    <div className={css.teporaryInfoBtm}>
                            <span>备注</span>
                            <Input/>
                    </div>
                </div>

                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        bordered={true}
                        pagination={false}
                        scroll={{ y: 550 }}
                        size='small'
                    />
                </div>

            </div>

        )
    }
}