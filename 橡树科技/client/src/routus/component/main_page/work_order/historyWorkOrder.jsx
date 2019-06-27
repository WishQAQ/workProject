/**
 * 历史工单
 */

import React from 'react'
import style from './style/historyWorkOrder.scss'
import { Input , Select , DatePicker , Button , Table } from 'antd'

const Option = Select.Option;
const children = [];
const { RangePicker } = DatePicker;

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

/**
 * 表格头
 */

const columns = [{
    title: '类型',
    dataIndex: 'typeOf',
}, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
}, {
    title: '当前步骤',
    dataIndex: 'step',
}, {
    title: '关键词',
    dataIndex: 'keyWords',
}, {
    title: '申请时间',
    dataIndex: 'time',
}, {
    title: '申请人',
    dataIndex: 'people',
}, {
    title: '联系电话',
    dataIndex: 'phone',
}];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        typeOf: `bug维护`,
        title: `标题 ${i}`,
        step: `社管处理`,
        keyWords:`关键词1；关键词2；关键词3`,
        time:`2018-3-20 13:00`,
        people:`刘倩`,
        phone:`12313241234`,
    });
}



function handleChange (value) {
    console.log(`selected ${value}`);
}

function onChange (date, dateString) {
    console.log(date, dateString);
}






export class HistoryWorkOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }



    render(){
        return(
            <div className={style.historyWorkOrder}>
                <div className={style.historyWorkOrderTop}>
                    <div className={style.menuTop}>
                        <Input
                            placeholder="请输入标题名"
                            style={{width:160}}
                        />
                    </div>
                    <div className={style.menuTop}>
                        <Input
                            className={style.btnLeft}
                            defaultValue="关键词"
                            disabled={true}
                        />
                        <Select
                            className={style.btnRigth}
                            mode="tags"
                            style={{ width: 200 }}
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className={style.menuTop}>
                        <RangePicker onChange={onChange} />
                    </div>
                    <div className={style.menuTop}>
                        <Button type="primary" icon="search" />
                    </div>

                </div>

                <div className={style.table}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="small"
                        pagination={{ pageSize: 15 }}
                        bordered
                    />
                </div>

            </div>
        )
    }
}