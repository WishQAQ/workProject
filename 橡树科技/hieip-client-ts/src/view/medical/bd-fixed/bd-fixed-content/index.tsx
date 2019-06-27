import React from 'react'
import {Button, Input, Layout} from 'antd'
import style from './style/index.scss'
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {HintInput as agInput} from 'pkg/common/ag/input'
import {SelectItem} from 'pkg/ui/SelectItem'
import {MyCodeMirror} from 'pkg/common/code-mirror'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {bdFixedIndexService, BdFixedIndexState} from 'service/medical/bd-fixed'
import {InputTable} from 'pkg/common/inputTable'

const {Content} = Layout
const Option = SelectItem.Option

export default class FixedValueContent extends FluxComponent<BdFixedIndexState> {
    title = '固定值'
    bdFixedIndexService = bdFixedIndexService
    // 表格字段
    columns = [
        {
            headerName: '字段名称',
            field: 'fieldName',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.fieldName : ''
                }
            },
            editable: true,
            cellEditorFramework: agInput,
            cellEditorParams: {}
        },
        {
            headerName: '对应java名称',
            field: 'code',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.code : ''
                }
            },
            editable: true,
            cellEditorFramework: agInput,
            cellEditorParams: {}
        },
        {
            headerName: '名称',
            field: 'name',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.name : ''
                }
            },
            editable: true,
            cellEditorFramework: agInput,
            cellEditorParams: {}
        },
        {
            headerName: '元素ID',
            field: 'dsName',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.deName : ''
                }
            },
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                //  oValue:this.state.cvName?this.state.cvName:'',
                // className: styles.testInput,
                data: [],
                option: {
                    total: this.state ? this.state.bdDeDataTotal : 0,
                    columns: [],
                    pageSize: 6,
                    showValue: 'value',
                    columnsCallData: (v, callback) => {
                        bdFixedIndexService.loadColumns().then(data => {
                            callback(data)
                        })
                    }
                },
                tableWidth: '270px',
                isRenderShow: true,
                isMask: false,
                callData: (v, calback) => bdFixedIndexService.callBack(v, calback)
            }
        },
        {
            headerName: '说明',
            field: 'example',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.example : ''
                }
            },
            editable: true,
            cellEditorFramework: agInput,
            cellEditorParams: {}
        }
    ]

    render() {
        const {paramList, selectRow} = this.state
        return (
            <div className={`${style.fixedValueContent} ${style.btnStyle}`}>
                <Content>
                    <div className={style.contentHeader}>
                        <span>信息</span>
                        <Button className={`${style.btn} ${style.greenBtn}`} onClick={bdFixedIndexService.saveBdFixed}>
                            <IconFont iconName={'icon-baocun1'}/>保存
                        </Button>
                        <Button className={`${style.btn}`} onClick={bdFixedIndexService.pageToEmpty}>
                            <IconFont iconName={'icon-iconfontshequyijujue'}/>
                            清空
                        </Button>
                    </div>
                    <div className={style.contentMain}>
                        <div className={style.contentForm}>
                            <LabelBox
                                type="#353535"
                                asterisk={false}
                                text="名称"
                                labelWidth={40}
                                className={style.myLabelBoxLayOut}
                                className2={style.myLabelBoxLabel}>
                                <HintInput
                                    className={style.boxInput}
                                    value={selectRow.fixedName}
                                    onChange={(v) => bdFixedIndexService.setStateJson('selectRow.fixedName', v.target.value)}
                                />
                            </LabelBox>
                            <SelectItem
                                showSearch={true}
                                labelVal="类型"
                                value={selectRow.fixedType && selectRow.fixedType.toString()}
                                onChange={(v) => bdFixedIndexService.setStateJson('selectRow.fixedType', v)}
                                labelClass={style.label}
                                selectItemClass={style.selItem}
                                selectClass={style.sel}
                                defaultValue=""
                                dropdownClassName={style.dropdownClassName}
                            >
                                <Option key="1" value="1">诊断信息</Option>
                                <Option key="2" value="2">患者信息</Option>
                            </SelectItem>
                            <LabelBox
                                type="#353535"
                                asterisk={false}
                                labelWidth={40}
                                text="说明"
                                className={style.myLabelBoxLayOut}
                                className2={style.myLabelBoxLabel}>
                                <HintInput
                                    className={style.boxInput}
                                    value={selectRow.fixedExample}
                                    onChange={(v) => bdFixedIndexService.setStateJson('selectRow.fixedExample', v.target.value)}
                                />
                            </LabelBox>
                        </div>
                        <div className={style.sqlLanguage}>
                            <div className={style.sqlLanguageTitle}>
                                <span>sql语句</span>
                                <Button className={`${style.btn} ${style.greenBtn}`} onClick={bdFixedIndexService.parse}>
                                    <IconFont iconName={'icon-jiexi'}/>
                                    解析
                                </Button>
                            </div>
                            <MyCodeMirror
                                fixedSql={selectRow.fixedSql || ''}
                                onChange={bdFixedIndexService.onDelTableElement}
                            />
                        </div>
                        <div className={style.tableRow}>
                            <div>
                                <div className={style.tableWrap}>
                                    <div className={style.tableHead}>
                                        <span className={style.mainTitle}>sql参数</span>
                                        <Button className={`${style.btn} ${style.redBtn} ${style.iconSpan}`}
                                                onClick={this.bdFixedIndexService.deleteParamList}>
                                            <IconFont iconName={'icon-jianqu'}/>
                                            删除
                                        </Button>
                                        <Button className={`${style.btn} ${style.blueBtn} ${style.iconSpan}`}
                                                onClick={this.bdFixedIndexService.insertParamLine}>
                                            <IconFont iconName={'icon-tianjia'}/>新增
                                        </Button>
                                    </div>
                                    <div className={style.sqlList}>
                                        {
                                            paramList && paramList.map((param: any, index) => {
                                                return <HintInput
                                                    key={index} value={param}
                                                    autoFocus={index === paramList.length - 1}
                                                    onClick={this.bdFixedIndexService.onParamClick.bind(this, index)}
                                                    onChange={this.bdFixedIndexService.changeSqlParam.bind(this, index)}
                                                />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={style.tableWrap}>
                                    <div className={style.tableHead}>
                                        <span className={style.mainTitle}>sql数据</span>
                                        <Button className={`${style.btn} ${style.blueBtn}`} onClick={bdFixedIndexService.insertSqlData}>
                                            <IconFont iconName={'icon-tianjia'}/>
                                            新增
                                        </Button>
                                        <Button className={`${style.btn} ${style.redBtn}`}
                                                onClick={bdFixedIndexService.deleteSqlData}>
                                            <IconFont iconName={'icon-jianqu'}/>
                                            删除
                                        </Button>
                                    </div>
                                    <Table
                                        columnDefs={this.columns}
                                        singleClickEdit={true}
                                        onRowClicked={bdFixedIndexService.onSqlDataClick}
                                        suppressCellSelection={false}
                                        stopEditingWhenGridLosesFocus={true}
                                        rowClass={style.textCenter}
                                        onGridReady={bdFixedIndexService.onGridReady}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}
