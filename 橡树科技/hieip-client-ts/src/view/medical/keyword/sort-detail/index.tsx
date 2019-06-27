import React from 'react'
import styles from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {HintInput} from 'pkg/common/input'
import {LabelBox} from 'pkg/ui/labelBox'
import {Radio, Button} from 'antd'
import {Table} from 'pkg/common/table'
import {IconFont} from 'pkg/common/icon'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {sortDetailService, SortDetailState} from 'service/medical/keyword/sort-detail'
import {Select} from 'src/packages/common/select'
import {sortListService} from 'service/medical/keyword/sort-list'

// 单选按钮集
const RadioGroup = Radio.Group

export default class SortDetailView extends FluxComponent<SortDetailState> {
    title = 'SortDetailView'
    sortDetailService = sortDetailService

    columns = [
        {
            headerName: '分类名称',
            field: 'cruxTypeName',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.cruxTypeName : ''
                }
            }
        },
        {headerName: '关键词名称', field: 'name'},
        {
            headerName: '类型',
            field: 'type',
            valueFormatter: params => {
                if (params) {
                    let val = params.value
                    val = val === 0 ? '全院' : (val === 1 ? '科室' : (val === 2 ? '个人' : ''))
                    return val
                }
            }
        },
        {headerName: '内容', field: 'content'},
        {
            headerName: '科室',
            field: 'deptName',
            valueFormatter: (params) => {
                if (params.value) {
                    return params.value ? params.value.deptName : ''
                }
            }
        }
    ]

    render() {
        // 解构赋值
        let {cruxs, isShowAdd, deptDict, cruxType, crux, inputData} = this.state
        const {cruxTypes} = sortListService.state

        return (
            <div className={styles.root}>
                {/* 头部 */}
                <div className={styles.header}>
                    {/* 输入框 */}
                    <LabelBox
                        type="black"
                        asterisk={false}
                        text="关键词名称"
                        labelWidth={74}
                        className={styles.keyAll}
                        className2={styles.keyComplete}>
                        <HintInput
                            className={styles.headerInput}
                            placeholder="请输入关键词"
                            onPressEnter={sortDetailService.findMrCrux}
                            value={inputData ? inputData : ''}
                            onChange={sortDetailService.selInDataChange}/>
                    </LabelBox>
                    {/* 单选按钮 */}
                    <div className={styles.myRadio}>
                        <div className={styles.myRadioName}>
                            类型<span>*</span>:
                        </div>
                        <RadioGroup
                            name="radiogroup"
                            defaultValue={0}
                            className={styles.myRadioGroup}
                            onChange={sortDetailService.radioChangeSelect}
                        >
                            <Radio value={0}>全院</Radio>
                            <Radio value={1}>科室</Radio>
                            <Radio value={2}>个人</Radio>
                        </RadioGroup>
                    </div>
                    {/* 按钮 */}
                    <div className={styles.operating}>
                        <Button className={styles.myBtn} onClick={sortDetailService.findMrCrux}>
                            <IconFont iconName={'icon-sousuo_sousuo'} iconClass={styles.keyWordIcon}/>
                            查询
                        </Button>
                        <Button className={`${styles.myBtn} ${styles.addBtn}`} onClick={sortDetailService.addCruxWindow}>
                            <IconFont iconName={'icon-icontianjia01'} iconClass={styles.keyWordIcon}/>
                            新增
                        </Button>
                    </div>
                </div>
                {/* ag表格 */}
                <div className={styles.mainTable}>
                    <Table
                        columnDefs={this.columns}
                        rowData={cruxs}
                        ContextMenuList={['修改', '删除']}
                        menuClik={sortDetailService.menuClick}
                        agtableClassName={styles.myAgTable}
                        menuclassName={''}
                        menuShow={false}
                        onCellClicked={sortDetailService.agTableClick}
                        onCellContextMenu={sortDetailService.agTableClick}
                        onGridReady={sortDetailService.onGridReady}
                    />
                </div>
                {/*新增弹框 */}
                {
                    isShowAdd ? (
                        <div className={styles.myAdd}>
                            <DragMove
                                title={
                                    <div className={styles.addTitle}>
                                        <h3>关键词信息</h3>(带<span>*</span>为必填)
                                    </div>}
                                visible={isShowAdd}
                                onOk={sortDetailService.saveCrux}
                                onCancel={sortDetailService.handleCancel}
                                okText="保存">
                                <div className={styles.threeInput}>
                                    <LabelBox
                                        type="black"
                                        asterisk={false}
                                        text="分类名称"
                                        labelWidth={60}
                                        className={styles.keyAll}
                                        className2={styles.keyComplete}>
                                        <Select
                                            disabled={true}
                                            value={cruxType ? cruxType.cruxName : ''}
                                            className={styles.boxSelectInput}
                                            data={cruxTypes ? cruxTypes : []}
                                            onSelect={(v) => sortDetailService.onChangeDataSet(v, 'cruxType', 'cruxName')}
                                            dataOption={{
                                                value: 'cruxName',
                                                key: 'cruxCode'
                                            }}
                                        />
                                        {/*<HintInput*/}
                                        {/*disabled={isAddClick}*/}
                                        {/*className={styles.boxInput}*/}
                                        {/*placeholder={'输入分类名称'}*/}
                                        {/*value={JsonUtil.getJsonByKey('cruxType.cruxName', this.state)}*/}
                                        {/*onChange={sortDetailService.onChangeDataSet.bind(this, 'cruxType.cruxName')}/>*/}
                                    </LabelBox>
                                    <LabelBox
                                        type="black"
                                        asterisk={true}
                                        riskPosition={'right'}
                                        text="关键词名称"
                                        labelWidth={80}
                                        className={styles.keyAll}
                                        className2={styles.keyComplete}>
                                        <HintInput
                                            className={styles.middleInput}
                                            value={crux ? crux.name : ''}
                                            onChange={(v) => sortDetailService.onChangeDataSet(v.target.value, 'crux', 'name')}/>
                                    </LabelBox>
                                    <LabelBox
                                        type="black"
                                        asterisk={true}
                                        riskPosition={'right'}
                                        text="科室"
                                        labelWidth={45}
                                        className={styles.keyAll}
                                        className2={styles.keyComplete}>
                                        <Select
                                            className={styles.boxSelectInput}
                                            defaultValue={crux ? crux.deptName : ''}
                                            showSearch={true}
                                            placeholder="选择科室名称"
                                            data={deptDict}
                                            onSelect={(v) => sortDetailService.onChangeDataSet(v, 'crux', 'deptCode')}
                                            dataOption={{value: 'name', key: 'id', inputCode: 'inputCode'}}
                                        />
                                    </LabelBox>
                                </div>
                                {/* 单选按钮 */}
                                <div className={styles.myRadio}>
                                    <div className={styles.myRadioName}>
                                        类型<span className={styles.noLight}>*</span>:
                                    </div>
                                    <RadioGroup
                                        className={styles.myRadioGroup}
                                        name="radiogroup" defaultValue={crux ? crux.type : 0}
                                        onChange={sortDetailService.radioChangeAdd}
                                    >
                                        <Radio value={0}>全院</Radio>
                                        <Radio value={1}>科室</Radio>
                                        <Radio value={2}>个人</Radio>
                                    </RadioGroup>
                                </div>
                                {/*傀儡样式（可删除） */}
                                <div style={{height: '330px', marginTop: '10px', textAlign: 'center'}}>
                                    <HintInput
                                        className={styles.test}
                                        value={crux ? crux.content : ''}
                                        onChange={(v) => sortDetailService.onChangeDataSet(v.target.value, 'crux', 'content')}
                                    />
                                </div>
                            </DragMove>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}