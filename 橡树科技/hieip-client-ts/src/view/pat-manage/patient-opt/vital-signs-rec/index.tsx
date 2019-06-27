/**
 * 护理信息录入
 * create by wx 2018.02.02
 */
import React from 'react'
import * as style from './style/index.scss'
import {HintInput} from 'pkg/common/ag/input'
import {TimePicker as DatePicker} from 'pkg/common/timePicker'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {Select as AgSelect} from 'pkg/common/ag/select'
import moment from 'moment'
import {Timeinput} from 'pkg/common/ag/timeInput'
import {NumberInput} from 'pkg/common/number-input'
import {message} from 'pkg/common/message'

export default class VitalSignsRec extends React.Component<any, any> {
    columnDefs = [
        {
            headerName: '',
            field: 'athlete',
            suppressSizeToFit:true,
            width: 40,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: '时间点',
            field: 'time',
            tooltipField:'time',
            suppressSizeToFit:true,
            width: 150,
            editable: true,
            valueFormatter: (params) => {
                return moment(params.data.time).format('HH:mm:ss')
            },
            cellEditorFramework: Timeinput,
            cellEditorParams: {
                value:new Date(),
                // onChange:this.agTimeChange,
                open:true
            }
        },
        {
            headerName: '心率',
            field: 'heartRate',
            tooltipField:'heartRate',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,// 小數的驗證規則
                    eventonver: 'blur'
                },
            }
        },
        {
            headerName: '脉搏',
            field: 'pulse',
            tooltipField:'pulse',
            editable: true,
            cellEditorFramework:HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '腋下体温',
            field: 'oxterTemp',
            tooltipField:'oxterTemp',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '直肠体温',
            field: 'bowelTemp',
            tooltipField:'bowelTemp',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '口内体温',
            field: 'mouthTemp',
            tooltipField:'mouthTemp',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '呼吸',
            field: 'breath',
            tooltipField:'breath',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '辅助呼吸',
            field: 'assistBreath',
            tooltipField:'assistBreath',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '物理降温',
            field: 'cooling',
            tooltipField:'cooling',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '疼痛',
            field: 'pain',
            tooltipField:'pain ',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^([1-9]\d*)(\.[0-9]*)?$/,
                    eventonver: 'change'
                }
            }
        },
        {
            headerName: '事件',
            field: 'event1',
            tooltipField: 'event1',
            valueFormatter: (params) => {
                let str=''
                let event = params.data.event
                if(event) event.forEach((item,i)=>{
                    str += item.name +';'
                })
                return str
            },
            suppressSizeToFit:true,
            width: 150,
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                className:style.AgSel,
                data: [],
                value: [],
                allowClear: true,
                dataOption: {value: 'name', key: 'id'},
                open: true,
                isMulti: true,
                // onClick: (v,params)=>console.log(v,params) , // change 選擇事件
                callData: (params, callBack) => {
                    callBack([
                            {id: 1, name: '事件1'},
                            {id: 2, name: '事件2'},
                            {id: 3, name: '事件3'}
                        ],
                        this.state.agTableData[params.rowIndex].event
                    )
                }
            }
        },
    ]

    tableData = [
        {
            title: '体重',
            value: '45',
            unit: 'kg'
        },
        {
            title: '排除液量',
            value: '45',
            unit: 'ml'
        },
        {
            title: '摄入液量',
            value: '45',
            unit: 'ml'
        },
        {
            title: '小便量',
            value: '45',
            unit: 'ml'
        },
        {
            title: '大便次数',
            value: '45',
            unit: '次'
        },
        {
            title: '总出量',
            value: '45',
            unit: 'ml'
        },

        {
            title: '血压',
            value: '45',
            unit: 'mmHg'
        },
    ]

    constructor(props) {
        super(props)
        this.state = {
            stopEditing: false,
            agApi:null,
            agTableData: [
                {
                    pain: 2.2,
                    time: new Date('2018-01-12 2:00:00'),
                    event:[{id: 1, name: '事件1'},
                        {id: 2, name: '事件2'},
                        {id: 3, name: '事件3'}]
                },
                {
                    pain: 2.5,
                    time: new Date(),
                    event:[{id: 1, name: '事件1'},]
                }
            ]
        }
    }

    /**
     * 表格值改变事件
     * @param params 默认参数
     */
    onCellValueChanged=(params)=>{
        if(params.column.colId==='time'){
            this.state.agTableData[params.rowIndex].time=params.value
        }
        // if(params.column.colId==='heartRate'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该心率较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='pulse'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该脉搏较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='oxterTemp'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该腋下体温较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='bowelTemp'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该直肠体温较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='mouthTemp'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该口内体温较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='breath'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该呼吸较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='assistBreath'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该辅助呼吸较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='cooling'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该物理降温较异常，应进行详细检查！')
        // }
        // if(params.column.colId==='pain'){
        //     if(40>Number(params.value)||Number(params.value)>160) message.confirm('该疼痛较异常，应进行详细检查！')
        // }
    }
    /**
     * ag表格数据渲染
     * @param params
     */
    onGridReady = (params)=>{
        this.setState({agApi:params.api})
    }
    /**
     * 新增事件
     */
    add=()=>{
        let {agTableData}=this.state
        agTableData.push({
            time: new Date(),
        })
        this.setState({agTableData:agTableData},()=>{
            this.state.agApi.setRowData(this.state.agTableData)
            this.state.agApi.startEditingCell({
                rowIndex: this.state.agTableData.length-1,
                colKey: 'time'
            })
        })
    }

    /**
     * 每日录入一次获取焦点时样式设置
     * @param e Event
     */
    onFocus = (e) => {
        e.target.parentElement.parentElement.style.background = '#bbe0ef'
    }
    /**
     * 每日录入一次失去焦点时样式设置
     * @param e Event
     */
    onBlur = (e) => {
        e.target.parentElement.parentElement.style.background = 'transparent'
    }

    render() {
        return (
            <div className={style.vitalSignsRec}>
                <div className={style.header}>
                    <div className={style.timeSearch}>
                        <DatePicker className={style.time}
                                    startPlaceholder={'时间查询'}
                                    isRange={false}/>
                        <span className={style.searchBtn}>
                            <IconFont iconName={'icon-sousuo_sousuo'}/>
                        </span>
                    </div>
                    <button className={`${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-baocun1'} hover={true}/>
                        <span>保存</span>
                    </button>
                    <button className={`${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-jiadian_tiwenji'} hover={true}/>
                        <span>体温单显示</span>
                    </button>
                </div>
                <div className={style.moreTable}>
                    <div className={style.tableTitle}>
                        <span>每日录入多次</span>
                        <button className={`${style.btn} ${style.blueBtn} ${style.smallBtn}`} onClick={this.add}>
                            <IconFont iconName={'icon-tianjia'} hover={true}/>
                            <span>新增</span>
                        </button>
                        <button className={`${style.btn} ${style.redBtn} ${style.smallBtn}`}>
                            <IconFont iconName={'icon-jianqu'} hover={true}/>
                            <span>删除</span>
                        </button>
                    </div>
                    <div className={style.contentWrap}>
                        <Table columnDefs={this.columnDefs}
                               rowData={this.state.agTableData}
                               suppressCellSelection={false}
                               onGridReady={this.onGridReady}
                               stopEditingWhenGridLosesFocus={true}
                               singleClickEdit={true}
                               onCellValueChanged={this.onCellValueChanged} // 编辑事件
                               rowSelection={'multiple'}/>
                    </div>
                </div>
                <div className={style.onceTable}>
                    <div className={style.tableTitle}>
                        <span>每日录入一次</span>
                    </div>
                    <div className={style.onceTableContent}>
                        {
                            this.tableData.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <span>{item.title}</span>
                                        <div className={style.inputWrap}
                                             onBlur={this.onBlur}
                                             onFocus={this.onFocus}>
                                            <NumberInput className={style.input}
                                                         value={item.hasOwnProperty('value') ? item.value : ''}
                                                // onChange={}
                                                // onBlur={}
                                                         isfloat={true}/>
                                            <span>{item.unit}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}