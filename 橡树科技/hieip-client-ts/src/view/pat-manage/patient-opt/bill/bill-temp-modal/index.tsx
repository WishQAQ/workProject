/**
 * 计价单弹框
 * create by wx 2018.02.02
 */
import React from 'react'
import style from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {RadioGroup} from 'pkg/common/radioGroup'
import {Table} from 'pkg/common/table'
import {Input} from 'antd'
import {HintInput} from 'pkg/common/ag/input'
import {FluxComponent} from '../../../../../tools/flux/FluxComponent'
import {billTempModalService, BillTempModalState as State} from '../../../../../service/pat-manage/patien-opt/bill/bill-temp-modal'

const Search = Input.Search

export default class BillTempModal extends FluxComponent<State> {
    title = '计价单:计价模板'
    billTempModalService = billTempModalService

    leftColumnDefs = [
        {
            headerName: '',
            field: 'athlete',
            width: 12,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: '模板名称',
            field: 'name',
            width: 38,
        },
        {
            headerName: '类型',
            field: 'typeName',
            width: 25,
        },
        {
            headerName: '科室',
            field: 'deptCode',
            width: 25,
            valueFormatter: params => {
                let model = params.data.deptCode
                return model ? (typeof(model) === 'object' ? (model.deptName || '') : (params.value || '')) : ''
            },
        },
    ]
    rightColumnDefs = [
        {
            headerName: '',
            field: 'athlete',
            width: 5,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: '类型',
            field: 'itemClass',
            width: 10,
            cellClass: () => {
                return `${style.textCenter}`
            },
        },
        {
            headerName: '名称',
            field: 'itemName',
            width: 35,
            cellClass: () => {
                return `${style.textCenter}`
            },
        },
        {
            headerName: '规格',
            field: 'itemSpec',
            width: 10,
            cellClass: () => {
                return `${style.textCenter}`
            },
        },
        {
            headerName: '单位',
            field: 'units',
            width: 10,
            cellClass: () => {
                return `${style.textCenter}`
            },
        },
        {
            headerName: '数量',
            field: 'amount',
            width: 10,
            cellClass: () => {
                return `${style.textCenter}`
            },
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^[1-9]\d*$/,
                    eventonver: 'change',
                }
            }
        },
        {
            headerName: '执行科室',
            field: 'performedBy',
            width: 15,
            cellClass: () => {
                return `${style.textCenter}`
            },
            valueFormatter: params => {
                let model = params.data.performedBy
                return model ? (typeof(model) === 'object' ? (model.deptName || '') : (params.value || '')) : ''
            },
        },
        {
            headerName: '申请科室',
            field: 'deptCode',
            width: 15,
            cellClass: () => {
                return `${style.textCenter}`
            },
            valueFormatter: params => {
                let model = params.data.deptCode
                return model ? (typeof(model) === 'object' ? (model.deptName || '') : (params.value || '')) : ''
            },
        },
    ]

    render() {
        const {isShow, flag, modelList, dataList} = this.state
        return (
            !isShow ? null :
                <DragMove className={style.billModal}
                          title={'模板'}
                          okText={'确定'}
                          cancelText={'取消'}
                          cwidth={960}
                          cheight={620}
                          onOk={billTempModalService.setTemp}
                          onCancel={() => billTempModalService.setStateJson(false, 'isShow')}
                          visible={true}>
                    <div className={style.header}>
                        <Rounded leftShow={'类型:'} className={`${style.rounded}`}>
                            <RadioGroup value={flag || ''}
                                        onChange={(e: any) => billTempModalService.setStateJson(e.key, 'flag')}
                                        data={[{key: '全部', value: '全部'}, {key: '个人', value: '个人'}, {key: '科室', value: '科室'},]}
                                        dataOption={{value: 'value', key: 'key'}}/>
                        </Rounded>
                        <div className={style.searchInput}>
                            <Search
                                // value={inputCode || ''}
                                placeholder="输入模板名称"
                                onSearch={this.billTempModalService.select}
                                onChange={(e) => billTempModalService.setStateJson(e.target.value, 'inputCode')}
                                enterButton={true}/>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div className={style.mainLeft}>
                            <Table rowSelection={'multiple'}
                                // onSelectionChanged={(v)=>console.log(v.api.getSelectedNodes())} // 多选事件
                                   columnDefs={this.leftColumnDefs}
                                   rowData={modelList}
                                   onCellClicked={(e) => billTempModalService.selectOutpBillingItems(e.data.id)}
                                   onGridReady={billTempModalService.onGridReady}
                            />
                        </div>
                        <div className={style.mainRight}>
                            <div className={style.rightTable}>
                                <Table rowSelection={'multiple'}
                                       onGridReady={billTempModalService.onGridReadyItem}
                                       onSelectionChanged={(node) => billTempModalService.agTabSelectRow(node.api.getSelectedNodes())}
                                       columnDefs={this.rightColumnDefs}
                                       rowData={dataList}
                                       suppressCellSelection={false}
                                       stopEditingWhenGridLosesFocus={true}
                                       singleClickEdit={true}/>
                            </div>
                        </div>
                    </div>
                </DragMove>
        )
    }
}