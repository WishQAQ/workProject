/**
 * 计价单主页面
 * create by wx 2018.02.01
 */
import React from 'react'
import style from './style/index.scss'
import {Table} from '../../../../../packages/common/table/'
import {Rounded} from '../../../../../packages/common/rounded/'
import {RadioGroup} from '../../../../../packages/common/radioGroup/'
import {Select} from '../../../../../packages/common/select/'
import {InputTable} from '../../../../../packages/common/inputTable/'
import {TimePicker} from '../../../../../packages/common/timePicker/'
import {Checkbox} from 'antd'
import {IconFont} from '../../../../../packages/common/icon/'
import {Select as AgSelect} from '../../../../../packages/common/ag/select/'
import {HintInput} from '../../../../../packages/common/ag/input/'
import moment from 'moment'
import {billDetailService, BillDetailState as State} from '../../../../../service/pat-manage/patien-opt/bill/bill-detail'
import {JsonUtil} from '../../../../../tools/api/JsonUtil'
import {FluxComponent} from '../../../../../tools/flux/FluxComponent'
import {billSignatureModalService, BillSignatureModalState} from '../../../../../service/pat-manage/patien-opt/bill/bill-signature-modal'
import {billTempModalService} from '../../../../../service/pat-manage/patien-opt/bill/bill-temp-modal'

export default class BillDetail extends FluxComponent<State & BillSignatureModalState> {
    title = '计价单'
    billDetailService = billDetailService
    billSignatureModalService = billSignatureModalService

    columnDefs = [
        {
            headerName: '',
            field: 'athlete',
            width: 30,
            minWidth: 30,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: (params) => {
                return 1 === params.data.editable || this.state.costsBack
            },
            valueFormatter: (params) => {
                return 1 === params.data.editable || this.state.costsBack ? '' : params.node.rowIndex + 1
            },
            cellClass: (params) => {
                return ((this.state.costsBack && '1' === this.state.COSTS_BACK) || 1 === params.data.editable) ?
                    `${style.textCenter} ${style.ableText}` : `${style.textCenter} ${style.disableText}`
            },
        },
        {
            headerName: '类别',
            field: 'itemClassName',
            tooltipField: 'itemClassName',
            width: 60,
            minWidth: 60,
            cellClass: (params) => {
                if (1 === params.data.editable) {
                    return `${style.textCenter} ${style.ableText}`
                } else {
                    return `${style.textCenter} ${style.disableText}`
                }
            },
            editable: (event) => { // 控制是否可以编辑
                return 1 === event.node.data.editable
            },
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                data: [],
                allowClear: true,
                dataOption: {value: 'value', key: 'key', disabled: 'open'},
                onClick: (v, e) => billDetailService.agChangeItemClass(v, e.rowIndex),
                callData: (e, callback) => billDetailService.agDataItemClass(callback),
                open: true,
                isMask: false,
            }
        },
        {
            headerName: '项目名称',
            field: 'itemName',
            tooltipField: 'itemName',
            width: 200,
            minWidth: 200,
            cellClass: (params) => {
                return 1 === params.data.editable ?
                    `${style.textCenter} ${style.ableText}` : `${style.textCenter} ${style.disableText}`
            },
            editable: (event) => { // 控制是否可以编辑
                return 1 === event.node.data.editable
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                style: {width: '100%', height: 30},
                data: [],
                isRenderShow: true,
                option: {
                    total: 0,
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        billDetailService.loadColumns('clinicPriceList').then(data => {
                            callback(data)
                        })
                    }
                },
                callData: (e: any, callback) => billDetailService.inputTableItemName(e, 'clinicPriceList', callback),
                isMask: false,
                open: true
            }
        },
        {
            headerName: '规格',
            field: 'itemSpec',
            tooltipField: 'itemSpec',
            width: 80,
            minWidth: 80,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
        },
        {
            headerName: '数量',
            field: 'amount',
            tooltipField: 'amount',
            width: 40,
            minWidth: 40,
            cellClass: (params) => {
                return ((this.state.costsBack && '1' === this.state.COSTS_BACK) || 1 === params.data.editable) ?
                    `${style.textCenter} ${style.ableText}` : `${style.textCenter} ${style.disableText}`
            },
            editable: (event) => { // 控制是否可以编辑
                return ((this.state.costsBack && '1' === this.state.COSTS_BACK) || event.node.data.editable === 1)
            },
            cellEditorFramework: HintInput,
            cellEditorParams: {
                verification: {
                    regex: /^((\d{1})|(([1-9]\d{1,3})))(\.\d{0,4})?$/,
                    eventonver: 'change'
                },
            }
        },
        {
            headerName: '退费数',
            field: 'operaterRefound',
            tooltipField: 'operaterRefound',
            width: 50,
            minWidth: 50,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
        },
        {
            headerName: '单位',
            field: 'units',
            tooltipField: 'units',
            width: 40,
            minWidth: 40,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
        },
        {
            headerName: '录入科室',
            field: 'orderedByDept',
            tooltipField: 'orderedByDept',
            width: 150,
            minWidth: 150,
            cellClass: (params) => {
                if (1 === params.data.editable) {
                    return `${style.textCenter} ${style.ableText}`
                } else {
                    return `${style.textCenter} ${style.disableText}`
                }
            },
            editable: (event) => { // 控制是否可以编辑
                return 1 === event.node.data.editable
            },
            valueFormatter: params => {
                let model = params.data.orderedByDept
                return model ? (typeof(model) === 'object' ? (model.deptName || '') : (params.value || '')) : ''
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                style: {width: '100%', height: 30},
                data: [],
                isRenderShow: true,
                option: {
                    valueChildren: 'deptName',
                    total: 0,
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        billDetailService.loadColumns('deptDict').then(data => {
                            callback(data)
                        })
                    }
                },
                callData: (e: any, callback) =>
                    billDetailService.agInputTable(e, 'deptDict', callback, ['id', 'deptName'], ['key', 'value'], ['orderedByDept']),
                isMask: false,
            }
        },
        {
            headerName: '录入者',
            field: 'orderedByDoctor',
            tooltipField: 'orderedByDoctor',
            width: 60,
            minWidth: 60,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
            cellRendererFramework: params => {
                return JsonUtil.getJsonByKey2('data.orderedByDoctor.name', params, '')
            },
            editable: false,
        },
        {
            headerName: '执行科室',
            field: 'performedBy',
            tooltipField: 'performedBy',
            width: 150,
            minWidth: 150,
            cellClass: (params) => {
                if (1 === params.data.editable) {
                    return `${style.textCenter} ${style.ableText}`
                } else {
                    return `${style.textCenter} ${style.disableText}`
                }
            },
            editable: (event) => { // 控制是否可以编辑
                return 1 === event.node.data.editable
            },
            valueFormatter: params => {
                let model = params.data.performedBy
                return model ? (typeof(model) === 'object' ? (model.deptName || '') : (params.value || '')) : ''
            },
            cellEditorFramework: InputTable,
            cellEditorParams: {
                style: {width: '100%', height: 30},
                data: [],
                isRenderShow: true,
                option: {
                    valueChildren: 'deptName',
                    total: 0,
                    columns: [],
                    pageSize: 7,
                    showValue: 'value',
                    columnsCallData: (e, callback) => {
                        billDetailService.loadColumns('deptDict').then(data => {
                            callback(data)
                        })
                    }
                },
                callData: (e: any, callback) =>
                    billDetailService.agInputTable(e, 'deptDict', callback, ['id', 'deptName'], ['key', 'value'], ['performedBy']),
                isMask: false,
            }
        },
        {
            headerName: '计价金额',
            field: 'costs',
            tooltipField: 'costs',
            width: 65,
            minWidth: 65,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
        },
        {
            headerName: '收费标识',
            field: 'chargeIndicator',
            tooltipField: 'chargeIndicator',
            width: 65,
            minWidth: 65,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
            valueFormatter: (params) => {
                let chargeIndicator = params.data.chargeIndicator
                return chargeIndicator && chargeIndicator === 1 ? '已收费' : '未收费'
            },
        },
        {
            headerName: '时间',
            field: 'billDate',
            tooltipField: 'billDate',
            width: 120,
            minWidth: 120,
            cellClass: () => {
                return `${style.textCenter} ${style.disableText}`
            },
            valueFormatter: (params) => {
                return params.data.billDate ? moment(params.data.billDate).format('YYYY-MM-DD HH:MM:SS') : ''
            },
        }
    ]

    /**
     * 根据是否退费设置样式
     * @param params 默认参数
     * @returns {{background: string}} 返回设置的样式
     */
    getRowStyle = (params) => {
        if (!JsonUtil.isEmpty(params.data.operaterRefound)) {
            return {background: '#b2b2b2', color: '#0000ff'}
        } else if (!JsonUtil.isEmpty(params.data.oriItemNo)) {
            return {background: '#b2b2b2', color: '#ff375b'}
        } else if (1 !== params.data.editable) {
            return {background: '#b2b2b2', color: '#353535'}
        }
        // // 【可编辑】为1时,数据显示为灰色
        // if (1 !== params.data.editable) {
        //     return {background: '#b2b2b2', color: '#353535'}
        // }
        // // 【退费数量】不为空时,数据为被退费数据
        // if (!JsonUtil.isEmpty(params.data.operaterRefound)) {
        //     return {background: '#b2b2b2', color: '#0000ff'}
        // }
        // // 【退费序号】不为空时,数据为退费数据,显示为红色
        // if (!JsonUtil.isEmpty(params.data.oriItemNo)) {
        //     return {background: '#b2b2b2', color: '#ff375b'}
        // }
    }

    render() {
        const {
            billItemClassDict,
            params,
            modelList,
            clinicPriceList,
            clinicPriceListColumns,
            costsBack,
            user,
            BILL_SIGNATURE
        } = this.state
        return (
            <div className={style.bill}>
                <div className={style.header}>
                    <Rounded leftShow={'类型:'} className={`${style.rounded} ${style.radioGroup} ${style.margin}`}>
                        <RadioGroup
                            value={params.flag}
                            onChange={(e: any) => billDetailService.setStateJson(e.key, 'params', 'flag')}
                            data={[{key: 1, value: '全部'}, {key: 2, value: '个人'}, {key: 3, value: '科室'},]}
                            dataOption={{value: 'value', key: 'key'}}
                        />
                    </Rounded>
                    <Rounded
                        leftShow={'类别'}
                        className={`${style.rounded} ${style.classify} ${style.margin}`}>
                        <Select
                            value={params.itemClass}
                            onChange={(e) => billDetailService.setStateJson(e, 'params', 'itemClass')}
                            allowClear={true}
                            dropdownClassName={style.dropdownClassName}
                            data={billItemClassDict}
                            dataOption={{value: 'value', key: 'key', width: 50}}/>
                    </Rounded>
                    <InputTable
                        className={`${style.proName} ${style.margin}`}
                        // placeholder={'输入项目名称'}
                        data={clinicPriceList}
                        option={{
                            total: clinicPriceList.total,
                            columns: clinicPriceListColumns,
                            pageSize: 7,
                            showValue: 'value',
                            multiSaveKey: 'key'
                        }}
                        // maxHeight={185}
                        oValue={params.inputCode || ''}
                        callBackMethods={(e) => {
                            this.billDetailService.inputTable(e, 'clinicPriceList', '', 'params', 'inputCode')
                        }}
                    />
                    <Checkbox
                        value={costsBack}
                        onChange={(e) => this.billDetailService.costsBackChange(e.target.checked)}
                        className={`${style.margin} ${style.checkBox}`}>
                        可退费
                    </Checkbox>
                    <TimePicker
                        className={`${style.margin} ${style.timePicker}`}
                        isRange={true}
                        // format={'YYYY-MM-DD HH:mm:ss'}
                        // timePrecision={2}
                        oValue={params.startTime}
                        oValue2={params.endTime}
                        dateChange={(e) => {
                            billDetailService.dateChange(e, ['startTime', 'endTime'], 'params')
                        }}
                        startPlaceholder={'开始时间'}
                        endPlaceholder={'结束时间'}/>
                    <button
                        onClick={billSignatureModalService.appGrantChange}
                        className={`${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                        <span>参数</span>
                    </button>
                    <button
                        onClick={costsBack ? billDetailService.loadCostsBack : billDetailService.loadCosts}
                        className={`${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                        <span>查询</span>
                    </button>
                    <button
                        disabled={(user ? costsBack : true)}
                        onClick={billDetailService.agTabAdd}
                        className={(user ? costsBack : true) ? `${style.btn} ${style.disableText}` : `${style.btn} ${style.blueBtn}`}>
                        <IconFont iconName={'icon-tianjia'} hover={true}/>
                        <span>新增</span>
                    </button>
                    <button
                        disabled={(user ? costsBack : true)}
                        onClick={billDetailService.agTabDel}
                        className={(user ? costsBack : true) ? `${style.btn} ${style.disableText}` : `${style.btn} ${style.redBtn}`}>
                        <IconFont iconName={'icon-jianqu'} hover={true}/>
                        <span>删除</span>
                    </button>
                    <button
                        disabled={(user ? costsBack : true)}
                        onClick={billDetailService.saveSignature}
                        className={(user ? costsBack : true) ? `${style.btn} ${style.disableText}` : `${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-baocun1'} hover={true}/>
                        <span>保存</span>
                    </button>
                    <button
                        disabled={(user ? !costsBack : true)}
                        onClick={billDetailService.costsBackSignature}
                        className={(user ? !costsBack : true) ? `${style.btn} ${style.disableText}` : `${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-feiyong'} hover={true}/>
                        <span>退费</span>
                    </button>
                    <button
                        onClick={billTempModalService.loadTemp}
                        disabled={((user ? costsBack : true))}
                        className={(user ? costsBack : true) ? `${style.btn} ${style.disableText}` : `${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-leimupinleifenleileibie'} hover={true}/>
                        <span>模板</span>
                    </button>
                    {
                        '1' === BILL_SIGNATURE ?
                            <button
                                onClick={() => billSignatureModalService.setStateJson(true, 'isShow')}
                                className={`${style.btn} ${style.greenBtn}`}>
                                <IconFont iconName={'icon-xie'} hover={true}/>
                                <span>签名</span>
                            </button> : null
                    }
                </div>
                <div className={style.tableWrap}>
                    <Table columnDefs={this.columnDefs}
                           rowData={modelList}
                           getRowStyle={this.getRowStyle}
                           suppressCellSelection={false}
                           onSelectionChanged={(node) => billDetailService.agTabSelectRow(node.api.getSelectedNodes())}
                           stopEditingWhenGridLosesFocus={true}
                           singleClickEdit={true}
                           onCellValueChanged={(e) => {
                               this.billDetailService.onCellValueChanged(e)
                           }}
                           onGridReady={billDetailService.onGridReady}
                           rowSelection={'multiple'}/>
                </div>
            </div>
        )
    }
}