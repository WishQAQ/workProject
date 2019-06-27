/**
 * 我的工单
 */
import React from 'react'
import style from './style/workOrder.scss'
import {Button, Radio, Icon, DatePicker, Input, Select} from 'antd'
import qs from "qs";
import moment from 'moment'
// import {AgTable} from '../permissions_settings/component/agTable'
import {AgGridReact} from "ag-grid-react"; //引入AG表格
const {RangePicker} = DatePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/**
 * 表格头
 */

const columns = [{
    headerName: '类型',
    field: 'orderClassName',
    width:100,
    maxWidth:100,
    minWidth:100,
}, {
    headerName: '标题',
    field: 'subject',
    width:160,
    maxWidth:160,
    minWidth:160,
}, {
    headerName: '当前步骤',
    field: 'stepName',
    width:120,
    maxWidth:120,
    minWidth:120,
}, {
    headerName: '关键词',
    field: 'keyWord',
    width:240,
    maxWidth:240,
    minWidth:240,
}, {
    headerName: '申请时间',
    field: 'submitTime',
    width:150,
    maxWidth:150,
    minWidth:150,
}, {
    headerName: '申请人',
    field: 'submitter',
    width:100,
    maxWidth:100,
    minWidth:100,
}, {
    headerName: '联系电话',
    field: 'phone',
    width:140,
    maxWidth:140,
    minWidth:140,
}];

export class WorkOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderRadio: 0, //默认值：全部工单
            tableData: [], //表格
            currentStepId: [], //当前步骤
            subject: '', //标题名
            selectArray: [],
            selectId: [], //工单ID
            orderArray: [], //工单查询条件
            startDate: '2017-01-01 13:32:42',
            endDate: '2019-01-01 13:32:42',
        }
    }


    componentWillMount() {
        this.fetchSelect()
        this.workOrder()
    }

    workOrder=()=> {
        let {orderRadio, currentStepId, subject, startDate, endDate } = this.state
        let param = {
            orderRadio: orderRadio,
            currentStepId: currentStepId,
            subject: subject,
            startDate: startDate,
            endDate: endDate,
        }

        fetch('/workOrders/loadWorkOrders', {
            method: 'POST',
            body: qs.stringify(param)
        }).then(response => {
            this.setState({tableData: response.data})
        })
    }

    fetchSelect() {
        fetch('/workOrders/baseInfo/loadWorkflowStepDict', {
            method: 'POST',
        }).then(response => {
            this.setState({selectArray: response.data})
            console.log(response.data);
        })
    }

    /**
     * 工单分类按钮
     */
    workRadio = (e) => {
        this.setState({orderRadio: e.target.value}, () => {
            this.workOrder()
        });
    }

    /**
     * 当前步骤
     */
    handleChange = (value, option) => {
        this.setState({currentStepId: value})
    }

    /**
     * 标题名Input框
     */
    workTitle = (event) => {
        this.setState({subject: event.target.value})
    }

    /**
     * 开始结束时间
     */
    onChange = (startDate, endDate) => {
        this.setState({startDate: startDate,endDate:endDate})
    }

    /**
     * 格式化时间显示
     */
    // orderTime = () => {
    //     let orderTime = moment(this.state.timeFrom).format('YYYY-MM-DD[T]HH:mm:ss[+08:00]');
    //     this.workOrder(orderTime);
    // }


    render() {
        let {tableData, currentStepId, selectArray} = this.state
        return (
            <div className={style.workOrder}>
                <div className={style.workOrderTop}>
                    <RadioGroup onChange={this.workRadio} defaultValue="0">
                        <RadioButton value="0">所有工单</RadioButton>
                        <RadioButton value="1">我发起的工单</RadioButton>
                        <RadioButton value="2">代办工单</RadioButton>
                    </RadioGroup>
                    <Button className={style.workOrderBlue}><Icon type="folder-add"/>新增工单</Button>
                </div>
                <div className={style.workOrderBtm}>
                    <div className={style.workOrderMain}>
                        <Input
                            className={style.workOrderLeft}
                            defaultValue="当前步骤"
                            disabled={true}
                        />
                        <Select
                            className={style.workOrderRight}
                            onSelect={this.handleChange}
                            style={{width: 120}}>
                            {selectArray ? selectArray.map((current) =>
                                <Option value={`${current.id}`} key={current.id}>{current.stepName}</Option>
                            ) : null}
                        </Select>
                    </div>
                    <div className={style.workOrderMain}>
                        <Input
                            value={this.state.subject}
                            onChange={this.workTitle}
                            placeholder="请输入标题名"
                            style={{width: '160px'}}
                        />
                    </div>
                    <div className={style.workOrderMain}>
                        <RangePicker onChange={this.onChange}/>
                    </div>
                    <div className={style.workOrderMain}>
                        <Button onClick={this.workOrder} type="primary" icon="search"/>
                    </div>
                </div>

                <div className={style.workOrderTable}>
                    <AgGridReact
                        ref="agGridReact"
                        columnDefs={columns}
                        rowData={tableData}
                        rowHeight={30}
                        enableColResize={false}
                        customWith={true}
                    >
                    </AgGridReact>
                </div>
            </div>
        )
    }
}
