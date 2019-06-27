/**
 * Created by mou on 2017/12/18.
 */
import * as React from 'react'
import {Btn} from 'pkg/common/button'
import {Icon, Input} from 'antd'
import {Table} from 'pkg/common/table'
import css from '../style/index.scss'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {inputDictService, InputDictState} from 'service/system-config/select-input-dict/left'
import {InputTable} from '../../../../packages/common/inputTable'

export default class Left extends FluxComponent<InputDictState> {
    title = '控件'
    inputDictService = inputDictService
    columns = [
        {
            headerName: '名称',
            field: 'dictName',
            cellRendererFramework: Input,
            ovalue: 'dictName',
            cellRendererParams: {
                onChange: inputDictService.onchange
            }
        },
        {
            headerName: '视图(表)名',
            field: 'tableName',
            editable: true,
            cellEditorFramework: InputTable,
            cellEditorParams: {
                data: this.state ? this.state.tableNames : [],
                option: {
                    total: this.state ? this.state.tableNames.total : 0,
                    columns: [{title: '表名', field: 'value'}],
                    pageSize: 7,
                    showValue: 'value',
                },
                isMask: true,
                callData: (v, calback) => {
                    switch (v.type) {
                        case 'enterEvent': {
                            inputDictService.selectedTable(v)
                        }
                        case 'blurEvent':
                            break
                        case 'pageEvent': {
                            inputDictService.emergencyTable(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize}).then(data => {
                                calback(data)
                            })
                            break
                        }
                        case 'changeEvent': {
                            inputDictService.emergencyTable(v.value, {startIndex: v.pageCurrent, pageSize: v.pageSize}).then(data => {
                                calback(data)
                            })
                            break
                        }
                        default:
                            inputDictService.emergencyTable('', {startIndex: 1, pageSize: 7}).then(data => {
                                calback(data)
                            })
                            break
                    }
                }
            }
        },
    ]

    render() {
        const {inputDict} = this.state
        return (
            <div className={css.left}>
                <div className={css.left_title}>
                    数据列表
                    <div>
                        <Btn text="新增" btnParam={{className: css.left_btn, onClick: inputDictService.verification}}/>
                        <Btn text="删除" btnParam={{className: css.left_btn, onClick: inputDictService.delete}}/>
                    </div>
                </div>
                <div className={css.left_search}>
                    <Input addonAfter={<Icon type="search" onClick={inputDictService.select}/>}
                           placeholder="名称" onChange={inputDictService.onchangeUpdate.bind(this, 'name')}/>
                </div>
                <div style={{height: `calc(100% - 69px)`}}>
                    <Table
                        rowHeight={28}
                        columnDefs={this.columns}
                        rowData={inputDict}
                        headerHeight={28}
                        onCellClicked={inputDictService.showCurRowMessage}
                        onGridReady={inputDictService.onGridReady}
                    />
                </div>
            </div>
        )
    }
}

export interface EntryProps {
    /**
     * input值
     */
    value: string
    /**
     * 改变值方法
     */
    onChange: (type: string | number, e: any) => void
    /** 键名 */
    jc: string
}