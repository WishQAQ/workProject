import React from 'react'
import { Input, Layout } from 'antd'
import * as style from './style/index.scss'
import { Btn } from 'pkg/common/button'
import { Table } from 'pkg/common/table'
import moment from 'moment'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { tplMaintenanceContentService, TplMaintenanceContentState } from 'service/medical/tpl-maintenance/tpl-maintenance-content'

const { Content } = Layout
const Search = Input.Search
export default class TplMaintenanceContent extends FluxComponent<TplMaintenanceContentState> {
    title = '病历模板制作模板列表'
    tplMaintenanceContentService = tplMaintenanceContentService
    // 大病历表头格式
    columns = [
        {
            headerName: '文件编码',
            field: 'mrCode'
        },
        {
            headerName: '文件类型',
            field: 'mrClassName'
        },
        {
            headerName: '文件名称',
            field: 'mrName'
        },
        {
            headerName: '标题',
            field: 'topic'
        },
        {
            headerName: '创建时间',
            field: 'createDateTime',
            valueFormatter: (params) => {
                let val = params.value
                val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
                return val
            }
        },
        {
            headerName: '最后修改时间',
            field: 'lastModifyDateTime',
            valueFormatter: (params) => {
                let val1 = params.value
                val1 = val1 && moment(val1).format('YYYY-MM-DD HH:mm:ss')
                return val1
            }
        },
        {
            headerName: '新增一页',
            field: 'newPageFlag',
            width: 150,
            valueFormatter: params => {
                return params.value === 1 ? '是' : '否'
            }
        },
        {
            headerName: '修改标题',
            field: 'needChangeTopicFlag',
            valueFormatter: params => {
                return params.value === '1' ? '允许' : '不允许'
            }
        },
        {
            headerName: '签审级别',
            field: 'needParentSignFlag',
            valueFormatter: params => {
                return params.value === 0 ? '经治医生签字' : params.value === 1 ? '上级医生签字' : '主任医生签字'
            }
        },
        {
            headerName: '书写次数',
            field: 'writeTimes',
            valueFormatter: params => {
                // 0:不限制次数,1:单次书写,2:科室单次书写
                return params.value === 0 || !params.value ? '不限制次数' : params.value === 1 ? '单次书写' : '科室单次书写'
            }
        },
        {
            headerName: '状态',
            field: 'statusName'
        }
    ]
    smallColumns = [
        {
            headerName: '模板类型',
            field: 'mrClassName'
        },
        {
            headerName: '模板名称',
            field: 'mrName'
        },
        {
            headerName: '数据集',
            field: 'dsName'
        },
        {
            headerName: '最后修改时间',
            field: 'lastModifyDateTime',
            valueFormatter: (params) => {
                let val2 = params.value
                val2 = val2 && moment(val2).format('YYYY-MM-DD HH:mm:ss')
                return val2
            }
        }
    ]

    /*onDeleteRowData(e) {
      let {smallTableData, rowIndex, agApi} = this.state
      smallTableData.splice(rowIndex, 1)
      agApi.api.setRowData(smallTableData)
      this.setState({
        smallTableData: smallTableData
      })
    }
  */
    render() {
        const { dataList, mrClassFlag, templateName } = this.state
        return (
            <div className={style.tplMaintenanceContent}>
                <Content>
                    <div className={style.contentHead}>
                        <Search
                            placeholder="请输入名称过滤"
                            onSearch={this.tplMaintenanceContentService.onSearchInputChange.bind(this, 'search')}
                            onPressEnter={this.tplMaintenanceContentService.onSearchInputChange.bind(this, 'pressEnter')}
                            enterButton={true}
                            value={templateName}
                            onChange={this.tplMaintenanceContentService.onChangeValue}
                            className={style.searchInput}
                        />
                        <Btn text="修改"
                             btnParam={{ icon: 'edit', type: 'primary', onClick: this.tplMaintenanceContentService.onUpdateRowData }}/>
                        <Btn text="删除"
                             btnParam={{
                                 icon: 'minus-circle',
                                 type: 'danger',
                                 onClick: this.tplMaintenanceContentService.onDeleteRowData
                             }}/>
                    </div>
                    <div className={style.tableWrap}>
                        <Table
                            columnDefs={mrClassFlag === 1 ? this.columns : this.smallColumns}
                            rowData={dataList}
                            onGridReady={this.tplMaintenanceContentService.onGridReady}
                            onCellClicked={this.tplMaintenanceContentService.onRowClick}
                            onRowDoubleClicked={this.tplMaintenanceContentService.onRowDoubleClick}
                        />
                    </div>
                </Content>
            </div>
        )
    }
}
