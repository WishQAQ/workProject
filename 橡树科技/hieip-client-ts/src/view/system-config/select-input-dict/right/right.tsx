/**
 * Created by mou on 2017/12/19.
 */
import * as React from 'react'
import {Btn} from 'pkg/common/button'
import {Input, InputNumber, Radio} from 'antd'
import {Table} from 'pkg/common/table'
import {Select} from 'pkg/common/select'
import {Select as AgSelect} from 'pkg/common/ag/select'
import css from '../style/index.scss'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {RightInputDicState, rightInputDictService} from 'service/system-config/select-input-dict/right'
import moment from 'moment'
import {AgCheckBox} from '../../../../packages/common/ag/checkbox'
import {InputTable} from '../../../../packages/common/inputTable'

export default class RightInputDict extends FluxComponent<RightInputDicState> {
    title = 'rightInputDict'
    rightInputDictService = rightInputDictService
    columns = [
        {
            headerName: '字段名称',
            field: 'colName',
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                data: this.state ? this.state.colNames : [],
                option: {
                    total: this.state && this.state.colNames ? this.state.colNames.total : 0,
                    columns: [
                        {title: '名称', field: 'value'},
                        {title: '表名', field: 'key'}],
                    pageSize: 7,
                    showValue: 'value',
                },
                isRenderShow: true,
                isMask: false,
                callData: (v, calback) => {
                    switch (v.type) {
                        case 'enterEvent': {
                            rightInputDictService.selected(v)
                        }
                        case 'blurEvent':
                            break
                        case 'pageEvent':
                        case 'changeEvent': {
                            rightInputDictService.queryControl(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize}).then(data => {
                                calback(data)
                            })
                            break
                        }
                        default:
                            rightInputDictService.queryControl('', {startIndex: 1, pageSize: 7}).then(data => {
                                calback(data)
                            })
                            break
                    }
                }
            }
        },
        {
            headerName: 'java字段名称',
            field: 'colNameJava',
            valueFormatter: (params) => {
                return params.value ? params.value.name : ''
            }
        },
        {
            headerName: '唯一标识',
            field: 'dictCode',
            valueFormatter: (params) => {
                return params.value ? params.value.name : ''
            }
        },
        {
            headerName: '是否必须',
            field: 'isMust',
            valueFormatter: (params) => {
                return params.value === 1 ? '是' : '否'
            },
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                data: [
                    {key: 0, value: '否'},
                    {key: 1, value: '是'}
                ],
                dataOption: {value: 'value'},
                onClick: (v) => {
                    rightInputDictService.doctorselect(v)
                },
                open: true,
            }
        },
        {
            headerName: '序列号',
            field: 'serialNo',
            valueFormatter: (params) => {
                return params.value ? params.value.name : ''
            }
        }
    ]
    init = (list) => {
        return [
            {
                headerName: '列名称',
                field: 'colName',
                cellRendererFramework: DropDown,
                cellRendererParams: {
                    cellRenderer: DropDown,
                    jc: 'colName',
                    keyValue: list,
                    onChange: rightInputDictService.onchange
                }
            },
            {
                headerName: '显示名称',
                field: 'colShowName',
                cellRendererFramework: Entry,
                cellRendererParams: {
                    cellRenderer: Entry,
                    jc: 'colShowName',
                    onChange: rightInputDictService.onchangMain
                }
            }, {
                headerName: '是否显示',
                field: 'flagShow',
                cellRendererFramework: SinSelect,
                cellRendererParams: {
                    cellRenderer: SinSelect,
                    jc: 'flagShow',
                    onChange: rightInputDictService.onchangMain
                }
            }, {
                headerName: '序列号',
                field: 'showSerialNo',
                cellRendererFramework: Entry,
                cellRendererParams: {
                    cellRenderer: Entry,
                    jc: 'showSerialNo',
                    onChange: rightInputDictService.onchangMain
                }
            }, {
                headerName: '模糊条件',
                field: 'isLike',
                cellRendererFramework: SinSelect,
                cellRendererParams: {
                    cellRenderer: SinSelect,
                    jc: 'isLike',
                    onChange: rightInputDictService.onchangMain
                }
            }, {
                headerName: '显示宽度',
                field: 'showWidth',
                cellRendererFramework: Entry,
                cellRendererParams: {
                    cellRenderer: Entry,
                    jc: 'showWidth',
                    onChange: rightInputDictService.onchangMain
                }
            },
        ]
    }

    render() {
        let {inputDictList, tableDict} = this.state
        let column = this.init(tableDict)
        return (
            <div className={css.right}>
                <div>
                    <Btn text="保存" btnParam={{className: css.right_btn, onClick: rightInputDictService.save}}/>
                    <Btn text="新增" btnParam={{className: css.right_btn, onClick: rightInputDictService.addMasterLine}}/>
                    <Btn text="删除" btnParam={{className: css.right_btn, onClick: rightInputDictService.logicDelete}}/>
                </div>
                <div>
                    <div className={css.firstRight}>
                        <Table
                            rowHeight={28}
                            columnDefs={column}
                            rowData={inputDictList}
                            headerHeight={28}
                            onGridReady={rightInputDictService.onGridReady}
                            onCellClicked={rightInputDictService.showCurRow}
                        />
                    </div>
                    <div>
                        <span>模糊查询控件参数</span>
                        <Btn text="新增" btnParam={{className: css.right_btn, onClick: rightInputDictService.addMasterLine1}}/>
                        <Btn text="删除" btnParam={{className: css.right_btn, onClick: rightInputDictService.controlsDelete}}/>
                    </div>
                    <div className={css.secondRigth}>
                        <Table
                            rowHeight={28}
                            columnDefs={this.columns}
                            rowData={this.state.selectInput}
                            headerHeight={28}
                            onGridReady={rightInputDictService.onGridReady1}
                            onCellClicked={rightInputDictService.showCurRow1}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export interface EntryProps {
    /** input值 */
    value: string | number,
    /** 改变值方法 */
    onChange: (type: string | number, e: any) => void
    /** 键名 */
    jc: string
}

class Entry extends React.Component<EntryProps> {
    onChange = (key: string, e: any) => {
        let val
        if (key === 'colShowName' || key === 'showWidth') {
            val = e.target.value
        } else {
            val = e
        }
        this.props.onChange(key, val)
    }

    render() {
        if (typeof this.props.value === 'number') {
            return <InputNumber defaultValue={this.props.value} onChange={this.onChange.bind(this, this.props.jc)}/>
        } else {
            return <Input defaultValue={this.props.value} onChange={this.onChange.bind(this, this.props.jc)}/>
        }
    }
}

const RadioGroup = Radio.Group

export interface SinSelectProps {
    /** radioGroup的值 */
    value: number,
    /** 改变值方法 */
    onChange: (type: string | number, e: any) => void
    /** 键名 */
    jc: string
}

class SinSelect extends React.Component<SinSelectProps> {
    onChange = (key, e) => {
        this.props.onChange(key, e.target.value)
    }

    render() {
        return (
            <RadioGroup name="radiogroup" defaultValue={this.props.value}
                        onChange={this.onChange.bind(this, this.props.jc)}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
            </RadioGroup>
        )
    }
}

const Option = Select.Option

export interface DropDownProps {
    /** 值 */
    value: string,
    /** 改变值方法 */
    onChange: (type: string | number, e: any) => void
    /** 键名 */
    jc: string,
    keyValue: Map<string, boolean>
}

class DropDown extends React.Component<DropDownProps> {
    onChange = (key, e) => {
        this.props.onChange(key, e)
    }

    render() {

        return (
            <Select
                showSearch={true}
                defaultValue={this.props.value}
                onChange={this.onChange.bind(this, this.props.jc)}
            >{
                this.props.keyValue ? [...this.props.keyValue].map((value) => {
                    return <Option key={value[0]} value={value[0]} disabled={value[1]}>{value[0]}</Option>
                }) : ''
            }
            </Select>
        )
    }
}
