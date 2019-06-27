import React from 'react'
import styles from './style/index.scss'
import {Input, Modal} from 'antd'
import {DragMove} from 'pkg/common/dragging'
import {Table} from 'pkg/common/table'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {dataSetService, DataSetState} from 'service/medical/data-set'
import {JsonUtil} from 'tools/api/JsonUtil'
import {Btn} from 'pkg/common/button'
import {HintInput} from 'pkg/common/input'
import {LabelBox} from 'pkg/ui/labelBox'
import {Select} from 'src/packages/common/select'

// antd输入框组件
const Search = Input.Search
// 删除确认框
const confirm = Modal.confirm

let columns = [
    {
        headerName: '数据集编码',
        field: 'id',
        valueFormatter: (params) => {
            if (params.value) {
                return params.value ? params.value.id : ''
            }
        },
        editable: false
    },
    {
        headerName: '数据集名称',
        field: 'dsName',
        valueFormatter: (params) => {
            if (params.value) {
                return params.value ? params.value.dsName : ''
            }
        },
        editable: false
    },
    {
        headerName: '引用数',
        field: 'referencs',
        valueFormatter: (params) => {
            if (params.value) {
                return params.value ? params.value.referencs : ''
            }
        },
        editable: false
    },
    {
        headerName: '版本号',
        field: 'dsCurrentVersion',
        valueFormatter: (params) => {
            if (params.value) {
                return params.value ? params.value.dsCurrentVersion : ''
            }
        },
        editable: false
    }
]
export default class DataList extends FluxComponent<DataSetState> {
    title = 'DataList'
    dataSetService = dataSetService

    render() {
        // 解构赋值
        const {addModelOpen, alterModelOpen, versions, page, beLength, bdData, versionsId, bdDeIndex} = this.state
        return (
            <div className={styles.listRoot}>
                {/* 头部 */}
                <div className={styles.title}>
                    <div className={styles.titleName}>数据集列表</div>
                </div>
                {/* 主要内容 */}
                <div className={styles.main}>
                    {/* 下拉选择框，搜索框，添加、删除按钮 */}
                    <div className={styles.operating}>
                        <div className={styles.mySearchBox}>
                            <Search
                                placeholder="数据集名称,输入码,五笔码"
                                className={styles.mySearch}
                                onSearch={v => dataSetService.onChangeDataSet(v, 'cvName')}
                                enterButton={true}
                            />
                        </div>
                        <div className={styles.myOperateGroup}>
                            <Btn btnParam={{
                                className: styles.buttonAdd, icon: 'plus-circle',
                                onClick: dataSetService.showAddModel
                            }} text={'新增'}/>
                            <Btn btnParam={{
                                className: styles.buttonAlter, icon: 'edit',
                                onClick: dataSetService.showAlterModel
                            }} text={'修改'}/>
                            <Btn btnParam={{
                                className: styles.buttonDelete, icon: 'minus-circle',
                                onClick: dataSetService.deleteBdDsIndex
                            }} text={'删除'}/>
                        </div>
                    </div>
                    {/* 新增弹框 */}
                    {/* 新增弹框 */}
                    {<div className={styles.showSave}>
                        <DragMove
                            title="新增"
                            visible={addModelOpen}
                            onOk={dataSetService.saveBdDsIndex}
                            onCancel={dataSetService.hiddenAddModel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <LabelBox text={'数据集名称'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={bdDeIndex ? bdDeIndex.dsName : ''}
                                    onChange={v => dataSetService.getInjury(v, 'bdDeIndex', 'dsName')}
                                />
                            </LabelBox>
                        </DragMove>
                    </div>}
                    {/* 修改弹框 */}
                    {<div className={styles.showSave}>
                        <DragMove
                            title="修改"
                            visible={alterModelOpen}
                            onOk={dataSetService.saveBdDsIndex}
                            onCancel={dataSetService.hiddenAlterModel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <LabelBox text={'数据集名称'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={bdDeIndex ? bdDeIndex.dsName : ''}
                                    onChange={v => dataSetService.getInjury(v, 'bdDeIndex', 'dsName')}
                                />
                            </LabelBox>
                            <LabelBox text={'版本号'} className={styles.myLabelBoxTotal}>
                                <Select showSearch={true}
                                        className={styles.mySelect}
                                        data={versions ? versions : []}
                                        value={versionsId ? versionsId + '' : '1'}
                                        onChange={v => dataSetService.getInjury(v, 'bdDeIndex', 'dsCurrentVersion')}
                                        dataOption={{value: 'dsVersion', key: 'dsVersion'}}
                                        filterOption={(input, option: any) => {
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                || versions[option.key].id.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }}
                                />
                            </LabelBox>
                        </DragMove>
                    </div>}
                    {/* 表格 */}
                    <div className={styles.mainTable}>
                        <Table
                            agtableClassName={styles.myAgTable}
                            pageclassName={styles.myAgPage}
                            columnDefs={columns ? columns : []}
                            pageSize={page ? page.pageSize : 0}
                            pagination={true}
                            paginationAutoPageSize={true}
                            onShowSizeChange={dataSetService.onShowSize}
                            total={beLength ? beLength : 0}
                            rowData={bdData ? bdData : []}
                            clickpage={true}
                            onGridReady={dataSetService.onGridReady}
                            singleClickEdit={false}
                            onCellClicked={dataSetService.bdDeIndexOpt}
                        />
                    </div>
                </div>
            </div>
        )
    }
}