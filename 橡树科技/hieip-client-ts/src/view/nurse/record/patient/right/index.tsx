/**
 * 科室——护理记录单书写右侧内容
 * Created by mou on 2018/3/1.
 */
import React from 'react'
import {ColorIcon} from 'pkg/common/colorIcon'
import {Rounded} from 'pkg/common/rounded'
import {Select} from 'pkg/common/select'
import {TimePicker} from 'pkg/common/timePicker'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {HintInput as AgInput} from 'pkg/common/ag/input'
import {AgRadioGroup} from 'pkg/common/ag/radio'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {Button} from 'antd'
import css from './style/index.scss'
let sex = 1
let sexIcon
sex === 1 ? sexIcon = 'icon-nantouxiang' : sex === 2 ? sexIcon = 'icon-nvtouxiang' : sexIcon = 'icon-wumingshi'
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
let menu=['新增','删除','导入数据']
export default class Right extends React.Component {
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

    render() {
        return (<div className={css.content}>
            <ul className={css.baseInfo}>
                <li>
                    <ColorIcon iconName={sexIcon} className={css.colorIcon}/>
                    <span className={css.bold}>姓名：</span>
                    <span className={css.normal}>张三</span>
                </li>
                <li>
                    <span className={css.bold}>年龄：</span>
                    <span className={css.normal}>22</span>
                </li>
                <li>
                    <span className={css.bold}>护理单元：</span>
                    <span className={css.normal}>阳光家园急诊内科</span>
                </li>
                <li>
                    <span className={css.bold}>床号：</span>
                    <span className={css.normal}>123456</span>
                </li>
                <li>
                    <span className={css.bold}>患者ID：</span>
                    <span className={css.normal}>123456</span>
                </li>
                <li>
                    <span className={css.bold}>住院号：</span>
                    <span className={css.normal}>123456</span>
                </li>
                <li>
                    <span className={css.bold}>主管护士：</span>
                    <span className={css.normal}>刘大壮</span>
                </li>
                <li>
                    <span className={css.bold}>主治医生：</span>
                    <span className={css.normal}>木林森</span>
                </li>
            </ul>
            <div className={css.operation}>
                <div className={css.operationRound}>
                    <Rounded
                        className={css.roundContent}
                        leftShow={'记录单名称'}>
                        <Select
                            className={css.optionSelect}
                            showSearch={true}
                            data={deptDict ? deptDict : []}
                            dataOption={{value: 'deptName', key: 'deptCode'}}
                        />
                    </Rounded>
                </div>
                <div className={css.timePicker}>
                    <div>
                        <TimePicker
                            startPlaceholder={'开始时间'}
                            endPlaceholder={'结束时间'}
                            timePrecision={0}
                            format={'YYYY-MM-DD HH:mm'}
                            oValue={'2018-3-2 18:00:00'}
                            dateChange={(v) => {
                                // console.log(v)
                            }}
                        />
                    </div>
                    <div>
                        <TimePicker
                            startPlaceholder={'开始时间'}
                            endPlaceholder={'结束时间'}
                            timePrecision={0}
                            format={'YYYY-MM-DD HH:mm'}
                            oValue={'2018-3-3 19:00:00'}
                            dateChange={(v) => {
                                // console.log(v)
                            }}
                        />
                    </div>
                </div>
                <Button className={`${css.save} ${css.search}`}><IconFont iconName={'icon-sousuo_sousuo'}/>查询</Button>
                <Button className={css.add}><IconFont iconName={'icon-icontianjia01'}/>新增</Button>
                <Button className={css.delete}><IconFont iconName={'icon-jianqu'}/>删除</Button>
                <Button className={css.save}><IconFont iconName={'icon-baocun1'}/>保存</Button>
                <Button className={css.save}><IconFont iconName={'icon-ordinaryprint'}/>打印</Button>
                <Button className={css.save}><IconFont iconName={'icon-xie'}/>签名</Button>
            </div>
            <div className={css.deptTable}>
                <Table
                    suppressCellSelection={false}
                    stopEditingWhenGridLosesFocus={true}
                    singleClickEdit={true}
                    rowSelection={'multiple'}
                    agtableClassName={css.myAgTable}
                    pageclassName={css.myAgPage}
                    columnDefs={this.tableColumnDef}
                    rowData={tableData}
                    ContextMenuList={menu ? menu : []}
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
        </div>)
    }
}