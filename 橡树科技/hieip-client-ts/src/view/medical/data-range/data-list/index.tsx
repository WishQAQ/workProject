import React from 'react'
import styles from './style/index.scss'
import {Input, Radio} from 'antd'
import {DragMove} from 'pkg/common/dragging'
import {Table} from 'pkg/common/table'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {dataListService, DataListState} from 'service/medical/data-range/data-list/index'
import {JsonUtil} from 'tools/api/JsonUtil'
import {Btn} from 'pkg/common/button'
import {HintInput} from 'pkg/common/input'
import {LabelBox} from 'pkg/ui/labelBox'
import {Select} from 'src/packages/common/select'

/*antd单选按钮组件*/
const RadioGroup = Radio.Group

/*antd输入框组件*/
const Search = Input.Search

const titles = [
    {
        headerName: '',
        field: '',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        cellClass: () => {
            return styles.agBodyTitle
        },
        width: 60
    },
    {
        headerName: '数据元值域编码',
        field: 'id',
        width: 360
    },
    {
        headerName: '值域名称',
        field: 'cvName',
        width: 720

    },
    {
        headerName: '引用数',
        field: 'cvNumber'
    },
    {
        headerName: '版本号',
        field: 'cvVersion'
    },
    {
        headerName: '启用状态',
        field: 'cvEnabled',
        valueFormatter: function (data) {
            return data.value === 1 ? '启动' : '未启动'
        }
    }
]

export default class RangeListView extends FluxComponent<DataListState> {
    title = 'RangeListView'
    dataListService = dataListService

    render() {
        /*解构赋值*/
        let {isShowSave, isShowAlter, bdCvIndexs, versions, page, bdLength, bdCvIndex, bdSaveCvIndex} = this.state
        return (
            <div className={styles.listRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据元值域列表</div>
                </div>
                {/* 主要内容 */}
                <div className={styles.main}>
                    {/* 下拉选择框，搜索框，添加、删除按钮 */}
                    <div className={styles.operating}>
                        <div className={styles.mySearchBox}>
                            <RadioGroup name="radiogroup"
                                        defaultValue={2}
                                        onChange={dataListService.radioChange}
                                        className={styles.mySingleRadio}
                            >
                                <Radio value={2}>全部</Radio>
                                <Radio value={1}>启用</Radio>
                                <Radio value={0}>未启用</Radio>
                            </RadioGroup>
                            <Search
                                placeholder="数据元名称,输入码,五笔码"
                                className={styles.mySearch}
                                onSearch={dataListService.onchangMain.bind(this, 'cvName')}
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
                                onClick: dataListService.handleShowAlter
                            }} text={'修改'}/>
                            <Btn btnParam={{
                                className: styles.buttonAlter, icon: 'play-circle-o',
                                onClick: dataListService.startCvIndex
                            }} text={'启用'}/>
                            <Btn btnParam={{
                                className: styles.buttonDelete, icon: 'minus-circle',
                                onClick: dataListService.deleteCvIndex
                            }} text={'删除'}/>
                        </div>
                    </div>
                    {/* 新增弹框 */}
                    {
                        isShowSave ? (
                            <div className={styles.showSave}>
                                <DragMove
                                    title="新增"
                                    visible={isShowSave}
                                    onOk={dataListService.saveCvIndex}
                                    onCancel={dataListService.handleCancel}
                                    cancelText="取消"
                                    okText="确认"
                                >
                                    <LabelBox text={'值域名称'} className={styles.myLabelBoxTotal}>
                                        <HintInput
                                            value={bdSaveCvIndex ? bdSaveCvIndex.cvName : ''}
                                            onChange={v => dataListService.onChangeDataSet(v, 'bdSaveCvIndex', 'cvName')}
                                        />
                                    </LabelBox>
                                    <div className={styles.specialTwoRadio}>
                                        <h2>启用状态：</h2>
                                        <div>
                                            <RadioGroup name="radiogroup" defaultValue={0}
                                                        onChange={v => dataListService.onChangeDataSet(v, 'bdSaveCvIndex', 'cvEnabled')}>
                                                <Radio value={0}>关</Radio>
                                                <Radio value={1}>开</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </DragMove>
                            </div>
                        ) : null
                    }
                    {/* 修改弹框 */}
                    {
                        isShowAlter ? (
                            <div className={styles.showSave}>
                                <DragMove
                                    title="修改"
                                    visible={isShowAlter}
                                    onOk={dataListService.updateCvIndex}
                                    onCancel={dataListService.handleCancelAlter}
                                    cancelText="取消"
                                    okText="确认"
                                >
                                    <LabelBox text={'值域名称'} className={styles.myLabelBoxTotal}>
                                        <HintInput
                                            value={bdCvIndex ? bdCvIndex.cvName : ''}
                                            onChange={v => dataListService.onChangeDataSet(v, 'bdCvIndex', 'cvName')}
                                        />
                                    </LabelBox>
                                    <LabelBox text={'版本号'} className={styles.myLabelBoxTotal}>
                                        <Select showSearch={true}
                                                className={styles.mySelect}
                                                onChange={v => dataListService.onChangeDataSetSelect(v, 'bdCvIndex', 'cvVersion')}
                                                data={versions}
                                                value={bdCvIndex ? bdCvIndex.cvVersion + '' : '1'}
                                                dataOption={{value: 'name', key: 'id', indexCode: 'indexCode'}}
                                                filterOption={(input, option: any) => {
                                                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        || versions[option.key].indexCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }}
                                        />
                                    </LabelBox>
                                    <div className={styles.specialTwoRadio}>
                                        <h2>启用状态：</h2>
                                        <div>
                                            <RadioGroup name="radiogroup"
                                                        value={bdCvIndex ? (bdCvIndex.cvEnabled ? bdCvIndex.cvEnabled : 0) : 0}
                                                        onChange={v => dataListService.onChangeDataSet(v, 'bdCvIndex', 'cvEnabled')}
                                            >
                                                <Radio value={0}>关</Radio>
                                                <Radio value={1}>开</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </DragMove>
                            </div>
                        ) : null
                    }
                    {/* 表格 */}
                    <div className={styles.mainTable}>
                        <Table
                            agtableClassName={styles.myAgTable}
                            pageclassName={styles.myAgPage}
                            columnDefs={titles}
                            rowData={bdCvIndexs ? bdCvIndexs : []}
                            pagination={true}
                            paginationAutoPageSize={true}
                            onSelectionChanged={(node) => dataListService.onSelectChange(node.api.getSelectedNodes())}
                            onGridReady={dataListService.onGridReady}
                            onCellClicked={dataListService.handlerRowClicked}
                            clickpage={true}
                            onShowSizeChange={dataListService.onChangePag}
                            pageSize={page ? page.pageSize : 0}
                            total={bdLength ? bdLength : 0}
                        />
                    </div>
                </div>
            </div>
        )
    }
}