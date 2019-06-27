import React from 'react'
import styles from './style/index.scss'
import { Input, Modal, Radio } from 'antd'
import { DragMove } from 'pkg/common/dragging'
import { Table } from 'pkg/common/table'
import { Select } from 'src/packages/common/ag/select'
import { HintInput } from 'pkg/common/input'
import { LabelBox } from 'pkg/ui/labelBox'
import { InputTable } from 'pkg/common/inputTable'
import { Btn } from 'pkg/common/button'
import debug from 'debug'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { dataListService, DataListState } from 'src/service/medical/data-element/data-list'
import {medicalSignService} from 'service/medical/medical-sign'
// antd输入框组件
const Search = Input.Search

// 删除确认框
const confirm = Modal.confirm

// 单选按钮
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const tract = debug('trace:病历:medical')
const titleInfo = [
    {
        headerName: '',
        field: '',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 60,
        cellClass: (params) => {
            return styles.agBodyTitle
        }
    },
    {
        headerName: '数据元标识符',
        field: 'id',
        width: 240
    },
    {
        headerName: '数据元名称',
        field: 'deName',
        width: 480
    },
    {
        headerName: '数据元类型',
        field: 'controlTypeName'
    },
    {
        headerName: '数据类型',
        field: 'deType'
    },
    {
        headerName: '标识格式',
        field: 'deFormat'
    },
    {
        headerName: '动态值',
        field: 'cvName'
    }
]
export default class DataList extends FluxComponent<DataListState> {
    title = '数据元'
    dataListService = dataListService

    render() {
        // 解构赋值
        let {
            isShowSave, index, bdDeIndex, currentElementType, model,
            isShowAlter, controlDictList, dateType, format, beLength, page,
            inputData, inputLength, inputTitle, cvName
        } = this.state
        return (
            <div className={styles.listRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据元列表</div>
                </div>
                {/* 主要内容 */}
                <div className={styles.main}>
                    {/* 下拉选择框，搜索框，添加、删除按钮 */}
                    <div className={styles.operating}>
                        <div className={styles.mySearchBox}>
                            <Search
                                placeholder="数据元名称,输入码,五笔码"
                                className={styles.mySearch}
                                onSearch={dataListService.onchangMain.bind(this, 'beName')}
                                enterButton={true}
                            />
                        </div>
                        <div className={styles.myOperateGroup}>
                            <Btn btnParam={{
                                className: styles.buttonAdd, icon: 'plus-circle',
                                onClick: dataListService.handleShowSave
                            }} text={'新增'}/>
                            <Btn btnParam={{
                                className: styles.buttonAlter, icon: 'edit',
                                onClick: dataListService.handleShowUpdate
                            }} text={'修改'}/>
                            <Btn btnParam={{
                                className: styles.buttonDelete, icon: 'minus-circle',
                                onClick: dataListService.deleteBeIndex
                            }} text={'删除'}/>
                        </div>
                    </div>
                    {/* 新增弹框 */}

                    <div className={styles.showSave}>
                        <DragMove
                            title="新增"
                            visible={isShowSave ? isShowSave : false}
                            onOk={dataListService.saveOrUpdateBdDeIndex}
                            onCancel={dataListService.handleCancel}
                            cancelText="取消"
                            okText="确认"
                        >
                            <LabelBox text={'元素名称'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={index ? index.deName : ''}
                                    onChange={this.dataListService.setStateJson.bind(this, 'index.deName')}
                                />
                            </LabelBox>
                            <LabelBox text={'元素定义'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={index ? index.deMemo : ''}
                                    onChange={this.dataListService.setStateJson.bind(this, 'index.deMemo')}
                                />
                            </LabelBox>
                            <LabelBox text={'数据类型'} className={styles.myLabelBoxTotal}>
                                <Select value={index ? index.deType : ''}
                                        className={styles.mySelect}
                                        isSearch={true}
                                        isSaveSearch={true}
                                        onClick={(v) => this.dataListService.updateSetStateJson('index.deType', v)}
                                        data={dateType ? dateType : []}
                                        dataOption={{ value: 'name', key: 'name' }}
                                />
                            </LabelBox>
                            <LabelBox text={'标识格式'} className={styles.myLabelBoxTotal}>
                                <Select value={index ? index.deFormat : ''}
                                        className={styles.mySelect}
                                        isSearch={true}
                                        isSaveSearch={true}
                                        onClick={(v) => this.dataListService.setStateJson('index.deFormat', v)}
                                        data={format ? format : []}
                                        dataOption={{ value: 'deFormat', key: 'deFormat' }}
                                />
                            </LabelBox>
                            <div className={styles.alterSpecialRow}>
                                <h2>元素类型：</h2>
                                <RadioGroup value={currentElementType ? currentElementType : 0} size="small"
                                            onChange={dataListService.handleRadio.bind(this, 'index.controlType')}
                                            className={styles.specialRadioGroup}>
                                    {
                                        controlDictList ? controlDictList.map((item, index) => {
                                            return (
                                                <RadioButton key={index}
                                                             value={index}>{item.controlName}</RadioButton>
                                            )
                                        }) : ''
                                    }
                                </RadioGroup>
                            </div>
                            {
                                controlDictList ? (controlDictList[currentElementType].isMaxMin === 'true' ?
                                    <div className={styles.specialTwoLabelBox}>
                                        <LabelBox text={'最大值'} className={styles.myLabelBoxTotal}>
                                            <HintInput
                                                value={index ? (index.maxValue ? index.maxValue : '') : ''}
                                                onChange={this.dataListService.setStateJson.bind(this, 'index.maxValue')}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'最小值'} className={styles.myLabelBoxTotal}>
                                            <HintInput
                                                value={index ? (index.minValue ? index.minValue : '') : ''}
                                                onChange={this.dataListService.setStateJson.bind(this, 'index.minValue')}
                                            />
                                        </LabelBox>
                                    </div>
                                    : (controlDictList[currentElementType].isComponent === 'true' ?
                                        <div className={styles.specialOneLabelBox}>
                                            <LabelBox text={'值域'} className={styles.myLabelBoxTotal}>
                                                <InputTable
                                                    className={styles.testInput}
                                                    value={cvName ? cvName : ''}
                                                    option={{
                                                        total: inputLength ? inputLength : 0,
                                                        columns: inputTitle ? inputTitle : [],
                                                        pageSize: 6,
                                                        showValue: 'cvName'
                                                    }}
                                                    data={inputData ? inputData : []}
                                                    callBackMethods={(v) => dataListService.showMessage(v, 'index')}
                                                />
                                            </LabelBox>
                                        </div>
                                        : null)) : null
                            }
                            <div className={styles.specialTwoRadio}>
                                <h2>允许修改：</h2>
                                <div>
                                    <RadioGroup name="radiogroup" value={index ? (index.isUpdateConten ? index.isUpdateConten : 1) : 1}
                                                onChange={this.dataListService.setStateJson.bind(this, 'index.isUpdateConten')}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </DragMove>
                    </div>
                    {/* 修改弹框 */}

                    <div className={styles.showSave}>
                        <DragMove
                            title="修改"
                            visible={isShowAlter ? isShowAlter : false}
                            onOk={dataListService.update}
                            onCancel={dataListService.handleCancelUpdate}
                            cancelText="取消"
                            okText="确定"
                        >
                            <LabelBox text={'元素名称'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={model ? model.deName : ''}
                                    onChange={this.dataListService.setStateJson.bind(this, 'model.deName')}
                                />
                            </LabelBox>
                            <LabelBox text={'元素定义'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={model ? model.deMemo : ''}
                                    onChange={this.dataListService.setStateJson.bind(this, 'model.deMemo')}
                                />
                            </LabelBox>
                            <LabelBox text={'数据类型'} className={styles.myLabelBoxTotal}>
                                <Select
                                    className={styles.mySelect}
                                    value={model ? model.deType : ''}
                                    isSearch={true}
                                    isSaveSearch={true}
                                    onClick={(v) => this.dataListService.updateSetStateJson(model.deType, v)}
                                    data={dateType ? dateType : []}
                                    dataOption={{ value: 'name', key: 'name', inputCode: 'name' }}

                                />
                            </LabelBox>
                            <LabelBox text={'标识格式'} className={styles.myLabelBoxTotal}>
                                <Select
                                    value={model ? model.deFormat : ''}
                                    className={styles.mySelect}
                                    isSearch={true}
                                    isSaveSearch={true}
                                    onClick={(v) => this.dataListService.setStateJson.bind(model.deFormat, v)}
                                    data={format ? format : []}
                                    dataOption={{ value: 'deFormat', key: 'deFormat' }}
                                />
                            </LabelBox>
                            <div className={styles.alterSpecialRow}>
                                <h2>元素类型：</h2>
                                <RadioGroup value={currentElementType ? currentElementType : 0} size="small"
                                            onChange={dataListService.handleRadio.bind(this, 'model.controlType')}
                                            className={styles.specialRadioGroup}>
                                    {
                                        controlDictList ? controlDictList.map((item, index) => {
                                            return (
                                                <RadioButton key={index}
                                                             value={index}>{item.controlName}
                                                </RadioButton>
                                            )
                                        }) : ''
                                    }
                                </RadioGroup>
                            </div>
                            {
                                controlDictList ? (controlDictList[currentElementType].isMaxMin === 'true' ?
                                    <div className={styles.specialTwoLabelBox}>
                                        <LabelBox text={'最大值'} className={styles.myLabelBoxTotal}>
                                            <HintInput
                                                value={model ? model.maxValue : ''}
                                                onChange={this.dataListService.setStateJson.bind(this, 'model.maxValue')}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'最小值'} className={styles.myLabelBoxTotal}>
                                            <HintInput
                                                value={model ? model.minValue : ''}
                                                onChange={this.dataListService.setStateJson.bind(this, 'model.minValue')}
                                            />
                                        </LabelBox>
                                    </div>
                                    : (controlDictList[currentElementType].isComponent === 'true' ?
                                        <div className={styles.specialOneLabelBox}>
                                            <LabelBox text={'值域'} className={styles.myLabelBoxTotal}>
                                                <InputTable
                                                    value={cvName ? cvName : ''}
                                                    className={styles.testInput}
                                                    option={{
                                                        total: inputLength ? inputLength : 0,
                                                        columns: inputTitle ? inputTitle : [],
                                                        pageSize: 6,
                                                        showValue: 'cvName'
                                                    }}
                                                    data={inputData ? inputData : []}
                                                    callBackMethods={(v) => dataListService.showMessage(v, 'model')}
                                                />
                                            </LabelBox>
                                        </div>
                                        : null)) : null
                            }
                            <div className={styles.specialTwoRadio}>
                                <h2>允许修改：</h2>
                                <div>
                                    <RadioGroup name="radiogroup" value={model ? model.isUpdateConten : 1}
                                                onChange={this.dataListService.setStateJson.bind(this, 'model.isUpdateConten')}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </DragMove>
                    </div>
                    {/* 表格 */}
                    <div className={styles.mainTable}>
                        <Table
                            agtableClassName={styles.myAgTable}
                            pageclassName={styles.myAgPage}
                            columnDefs={titleInfo}
                            clickpage={true}
                            pageSize={page ? page.pageSize : 0}
                            pagination={true}
                            paginationAutoPageSize={true}
                            onShowSizeChange={dataListService.onShowSize}
                            total={beLength ? beLength : 0}
                            rowData={bdDeIndex ? bdDeIndex : []}
                            onGridReady={dataListService.onGridReady}
                            onCellClicked={dataListService.showCurRowMessage}
                            onSelectionChanged={(node) => dataListService.onSelectChange(node.api.getSelectedNodes())}
                        />
                    </div>
                </div>
            </div>
        )
    }
}