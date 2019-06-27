/**
 * 护理记录单
 * Created by mou on 2018/2/28.
 */
import React from 'react'
import {Select} from 'pkg/common/select'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {DragMove} from 'pkg/common/dragging'
import {HintInput} from 'pkg/common/input'
import {NumberInput} from 'pkg/common/number-input'
import {Rounded} from 'pkg/common/rounded'
import {HintInput as AgInput} from 'pkg/common/ag/input'
import {AgRadioGroup} from 'pkg/common/ag/radio'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {Radio, Button} from 'antd'
import css from './style/index.scss'
const RadioGroup = Radio.Group
const deptDict = [
    {deptName: '急诊科', deptCode: 'deptCode'},
    {deptName: '急诊内科', deptCode: 'deptCode1'},
    {deptName: '急诊外科', deptCode: 'deptCode2'}
]

let tableData = []
for (let i = 0; i < 100; i++) {
    tableData.push({
        id: i,
        name: '急诊护理' + i,
        type: 1,
        pointType: 1,
        dept: '急诊科',
        autograph: 1,
        pageRow: 1,
        changePage: '无',
        summary: '无',
        deadTime: 3
    })
}

const dragTableColumnDef = [
    {
        headerName: '',
        field: '',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 34,
        cellClass: css.agBodyCheckbox,
        headerClass: css.agCheckbox
    },
    {
        headerName: '护理记录单名称',
        field: 'name',
        cellClass: css.cellClass
    },
]

const agConfigType = [
    {text: '患者', value: 1},
    {text: '科室', value: 0}
]

const configPointType = [
    {text: '全院', value: 1},
    {text: '科室', value: 0}
]
const autograph = [
    {text: '无', value: 0},
    {text: '单人', value: 1},
    {text: '多人', value: 2}
]
export default class Config extends React.Component {
    tableColumnDef = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            maxWidth: 34,
            cellClass: css.agBodyCheckbox,
            headerClass: css.agCheckbox
        },
        {
            headerName: '护理记录单名称',
            field: 'name',
            editable: true,
            cellClass: css.cellOne,
            cellEditorFramework: AgInput,
            /* cellEditorParams: {
             onChange: this.onChange,
             // value:'unimekdjd '
             }*/
        },
        {
            headerName: '类型',
            field: 'type',
            cellClass: css.cellOne,
            cellRendererFramework: AgRadioGroup,
            cellRendererParams: {
                name: 'type',
                agChildren: agConfigType,
                //  onChange: this.onChange,
                value: 0
            }
        },
        {
            headerName: '权限类型',
            field: 'pointType',
            cellClass: css.cellOne,
            cellRendererFramework: AgRadioGroup,
            cellRendererParams: {
                name: 'pointType',
                agChildren: configPointType,
                //    onChange: this.onChange,
                value: 0
            }
        },
        {
            headerName: '科室',
            field: 'dept',
            tooltipField: 'dept',
            editable: true,
            cellClass: `${css.cellOne} ${css.visible}`,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                showSearch: true,
                data: deptDict,
                dataOption: {value: 'deptName', key: 'deptCode'},
                //   onChange: this.onChange,
                open: true,
                allowClear: true,
                //    value: 'deptCode1'
            }
        },
        {
            headerName: '签名字段',
            field: 'autograph',
            cellClass: css.cellOne,
            cellRendererFramework: AgRadioGroup,
            cellRendererParams: {
                name: 'autograph',
                agChildren: autograph,
                //     onChange: this.onChange,
                value: 0
            }
        },
        {
            headerName: '页行',
            field: 'pageRow',
            editable: true,
            cellClass: css.cellOne,
            cellEditorFramework: AgInput,
            width: 70,
            cellEditorParams: {
                verification: {
                    regex: /^[1-9]\d*$/,
                    eventonver: 'change'
                },
                //    onChange: this.onChange,
                value: 0
            }
        },
        {
            headerName: '换页事件',
            field: 'changePage',
            editable: true,
            cellClass: css.cellOne,
            cellEditorFramework: AgInput,
            cellEditorParams: {
                //   onChange: this.onChange,
                // value:'unimekdjd '
            }
        },
        {
            headerName: '概述',
            field: 'summary',
            editable: true,
            cellClass: css.cellOne,
            cellEditorFramework: AgInput,
            cellEditorParams: {
                //    onChange: this.onChange,
                value: 0
            }
        },
        {
            headerName: '最后修改事件期限',
            field: 'deadTime',
            editable: true,
            cellClass: css.cellOne,
            cellEditorFramework: AgInput,
            cellEditorParams: {
                verification: {
                    regex: /^[1-9]\d*$/,
                    eventonver: 'change'
                },
                //  onChange: this.onChange,
                value: 0
            }
        },
    ]

    onChange = (v) => {
        // 改变值
    }

    render() {
        return (<div className={css.recordConfig}>
            <div className={css.recordConfigSearch}>
                <div>
                    <span className={css.type}>类型:</span>
                    <RadioGroup
                        name="type"
                        defaultValue={1}
                    >
                        <Radio value={1}>患者</Radio>
                        <Radio value={0}>科室</Radio>
                    </RadioGroup>
                </div>
                <div>
                    <span className={css.type}>权限类型:</span>
                    <RadioGroup
                        name="pointType"
                        defaultValue={1}
                    >
                        <Radio value={1}>全院</Radio>
                        <Radio value={0}>科室</Radio>
                    </RadioGroup>
                </div>
                <div>
                    <div className={css.recordConfigName}>
                        <Select
                            showSearch={true}
                            placeholder="输入护理记录单名称"
                            data={deptDict ? deptDict : []}
                            dataOption={{value: 'deptName', key: 'deptCode'}}
                            className={css.recordConfigNameSelect}
                        />
                        <span>
                           <IconFont iconName={'icon-sousuo_sousuo'}/>
                    </span>
                    </div>
                </div>
                <Button className={css.add}><IconFont iconName={'icon-icontianjia01'}/>新增</Button>
                <Button className={css.delete}><IconFont iconName={'icon-jianqu'}/>删除</Button>
                <Button className={css.save}><IconFont iconName={'icon-baocun1'}/>保存</Button>
                <Button className={css.save}><IconFont iconName={'icon-zicaidan_hover'}/>明细</Button>
            </div>
            <div className={css.configTable}>
                <Table
                    suppressCellSelection={false}
                    stopEditingWhenGridLosesFocus={true}
                    singleClickEdit={true}
                    rowSelection={'multiple'}
                    agtableClassName={css.myAgTable}
                    pageclassName={css.myAgPage}
                    columnDefs={this.tableColumnDef}
                    rowData={tableData}
                    rowHeight={28}
                    headerHeight={28}
                    pagination={true}
                    paginationAutoPageSize={true}
                    pageSize={1 ? 1 : 0}
                    clickpage={true}
                    total={tableData.length ? tableData.length : 0}
                    onShowSizeChange={() => {
                        // e
                    }}
                    onCellValueChanged={(e) => {
                        //  e
                    }}
                />
            </div>
            {/* 护理单元记录明细 */}
            <DragMove
                title={'明细'}
                visible={false}
                okText={`保存`}
                cancelText="取消"
                width={690}
                cwidth={690}
                cheight={564}
                className={css.dragConfig}
            >
                <div className={css.recordConfigDrag}>
                    <div>
                        <p className={css.title}>
                            <span>字段列表</span>
                            <Button className={css.add}><IconFont iconName={'icon-icontianjia01'}/>新增</Button>
                            <Button className={css.delete}><IconFont iconName={'icon-jianqu'}/>删除</Button>
                        </p>
                        <div className={css.dragLeftContent}>
                            <HintInput addonAfter={<IconFont iconName={'icon-sousuo_sousuo'}/>} placeholder={'输入名称'}
                                       className1={css.name}
                            />
                            <div className={css.dragTable}>
                                <Table
                                    agtableClassName={css.myAgTable}
                                    columnDefs={dragTableColumnDef}
                                    rowData={tableData}
                                    rowHeight={30}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={css.title}>
                            <span>明细</span>
                        </p>
                        <div className={css.rightDetail}>
                            <Rounded
                                className={css.dragRounded} leftShow={'父类名称'}>
                                <Select
                                    className={css.dragSelect}
                                    showSearch={true}
                                    data={deptDict ? deptDict : []}
                                    dataOption={{value: 'deptName', key: 'deptCode'}}
                                />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                asterisk={true}
                                leftShow={'列名称'}>
                                <HintInput />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                asterisk={true}
                                leftShow={'列标题'}>
                                <HintInput />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                leftShow={'列宽度'}>
                                <NumberInput/>
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                asterisk={true}
                                leftShow={'值类型'}>
                                <Select
                                    className={css.dragSelect}
                                    showSearch={true}
                                    data={deptDict ? deptDict : []}
                                    dataOption={{value: 'deptName', key: 'deptCode'}}
                                />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                asterisk={true}
                                leftShow={'排序号'}>
                                <NumberInput/>
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                asterisk={true}
                                leftShow={'数据元'}>
                                <Select
                                    className={css.dragSelect}
                                    showSearch={true}
                                    data={deptDict ? deptDict : []}
                                    dataOption={{value: 'deptName', key: 'deptCode'}}
                                />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                leftShow={'动态值'}>
                                <Select
                                    className={css.dragSelect}
                                    showSearch={true}
                                    data={deptDict ? deptDict : []}
                                    dataOption={{value: 'deptName', key: 'deptCode'}}
                                />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                asterisk={true}
                                leftShow={'字段名称'}>
                                <Select
                                    className={css.dragSelect}
                                    showSearch={true}
                                    data={deptDict ? deptDict : []}
                                    dataOption={{value: 'deptName', key: 'deptCode'}}
                                />
                            </Rounded>
                            <Rounded
                                className={css.dragRounded}
                                leftShow={'单位'}>
                                <HintInput />
                            </Rounded>
                        </div>
                    </div>
                </div>
            </DragMove>
        </div>)
    }
}

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