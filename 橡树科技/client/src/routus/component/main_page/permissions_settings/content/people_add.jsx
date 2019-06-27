/**
 * 医院信息弹窗界面
 */
import React from 'react'
import css from '../style/content/peopleAdd.scss'
import { Input , Button , Select , Table , Icon } from 'antd'

const Search = Input.Search;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const columns = [{
    dataIndex: 'name',
    width: '100%',
}];
const data = [{
    key: '1',
    name: 'John Brown',
}, {
    key: '2',
    name: 'Jim Green',
}, {
    key: '3',
    name: 'Joe Black',
}, {
    key: '4',
    name: 'Disabled User',
}, {
    key: '5',
    name: 'Dbled',
}, {
    key: '6',
    name: 'sabled User',
}, {
    key: '7',
    name: 'bled User',
}, {
    key: '8',
    name: 'led User',
}, {
    key: '9',
    name: 'ed User',
}
    , {
        key: '10',
        name: 'ed User',
    }
    , {
        key: '11',
        name: 'ed User',
    }
    , {
        key: '12',
        name: 'ed User',
    }
    , {
        key: '13',
        name: 'ed User',
    }
    , {
        key: '14',
        name: 'ed User',
    }
    , {
        key: '15',
        name: 'ed User',
    }
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};


function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export class PeopleAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return (
            <div className={css.peopleAdd}>
                <div className={css.backgroundTitle}>
                    <span>部门名称</span>
                    <ButtonGroup>
                        <Button size="small" ghost><Icon type="plus-circle-o" />新增</Button>
                        <Button size="small" ghost><Icon type="minus" />删除</Button>
                    </ButtonGroup>
                    <div className={css.people8}>
                        <Search
                            placeholder="输入部门名称"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                    </div>
                    <div className={css.people8}>
                        <Table
                            rowSelection={{type: 'checkbox'}}
                            size="small"
                            scroll={{ y: 430 }}
                            filterMultiple={false}
                            pagination={false}
                            showHeader={false}
                            bordered={true}
                            columns={columns}
                            dataSource={data}
                        />
                    </div>
                </div>
                <div className={`${css.backgroundTitle} ${css.centerLine}`}>
                    <span>明细</span>
                    <div className={css.people8}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </div>
                    <div className={css.people8}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </div>
                    <div className={css.people8}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </div>

                </div>
            </div>
        )
    }
}