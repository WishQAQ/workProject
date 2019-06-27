/**
 *  病历召回主体病历列表表格
 *  create by wx
 */
import React from 'react'
import * as style from './style/index.scss'
import { Table } from 'pkg/common/table'
import { Checkbox, Input } from 'antd'
import { IconFont } from 'pkg/common/icon'
import moment from 'moment'
import PartialMatchFilter from 'pkg/ui/medical-recall'
import debug from 'debug'

const CheckboxGroup = Checkbox.Group

const Search = Input.Search

const log = debug('trace:病历:medical')

export default class RecallMainBottom extends React.Component<any, any> {
    options = [
        { label: '全部', value: '1' },
        { label: '病案首页', value: '2' },
        { label: '所有病历', value: '3' }
    ]

    /**
     * 时间处理
     */
    public timeDeal = (params) => {
        let val = params.value
        val = val && moment(val).format('YYYY-MM-DD')
        return val
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: [],
            columns: [
                {
                    headerName: '',
                    field: 'athlete',
                    headerCheckboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    checkboxSelection: true,
                    width: 40,
                    // maxWidth: 40,
                    // minWidth:40,
                    cellClass: () => {
                        return style.checkBoxTitle
                    },
                    filter: 'partialMatchFilter'
                },
                {
                    headerName: '文档名称',
                    field: 'fileName',
                    suppressFilter: true
                },
                {
                    headerName: '创建人',
                    field: 'createName',
                    suppressFilter: true
                },
                {
                    headerName: '创建时间',
                    field: 'createTime',
                    valueFormatter: (params) => {
                        this.timeDeal(params)
                    },
                    suppressFilter: true
                },
                {
                    headerName: '最后修改时间',
                    field: 'lastModifytime',
                    valueFormatter: (params) => {
                        this.timeDeal(params)
                    },
                    suppressFilter: true
                },
                {
                    headerName: '文档属性',
                    field: 'fileAttr',
                    suppressFilter: true
                },
                {
                    headerName: '首次签名时间',
                    field: 'firstTime',
                    valueFormatter: (params) => {
                        this.timeDeal(params)
                    },
                    suppressFilter: true
                },
                {
                    headerName: '最后修改人',
                    field: 'lastModifyName',
                    suppressFilter: true
                }
            ], // 表头数据
            tableData: [
                {
                    fileName: '文件名1',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名2',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名3',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名4',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名5',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名6',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名7',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名8',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名9',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                },
                {
                    fileName: '文件名10',
                    createName: 'aaaa',
                    createTime: new Date(),
                    lastModifytime: new Date(),
                    fileAttr: '文件属性1',
                    firstTime: new Date(),
                    lastModifyName: 'aaa'
                }
            ], // 模拟数据
            frameworkComponents: { partialMatchFilter: PartialMatchFilter }
        }
    }

    render() {
        return (
            <div className={style.recallMainBottom}>
                <div className={style.tableHead}>
                    <span className={style.mainTitle}>质控项目</span>
                    <CheckboxGroup options={this.options}
                                   defaultValue={['1']}
                                   className={style.checkGroup}
                                   onChange={(v) => log(v)}/>
                    <Search
                        onSearch={(v) => v}
                        className={style.searchInput}
                        enterButton={<IconFont iconName={'icon-sousuo-'}/>}
                    />
                </div>
                <div className={style.tableContent}>
                    <Table
                        columnDefs={this.state.columns}
                        rowData={this.state.tableData}
                        enableFilter={true}
                        rowSelection={'multiple'}
                        frameworkComponents={this.state.frameworkComponents}
                        clickpage={true}
                        pageSize={8}
                        total={10}
                        // onShowSizeChange={}分页事件
                        onSelectionChanged={(node) => log(node.api.getSelectedNodes())}
                        // onCellValueChanged={(a) => log(a)}
                    />
                </div>
            </div>
        )
    }
}