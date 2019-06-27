import React from 'react'
import * as style from './style/index.scss'
import { DragMove } from 'pkg/common/dragging'
import { HintInput } from 'pkg/common/input'
import { Select } from 'antd'
import { InputTable } from 'pkg/common/inputTable'
import { SelectItem } from 'src/packages/ui/SelectItem'
import debug from 'debug'
import { FluxComponent } from '../../../../tools/flux/FluxComponent'
import { smallModalService, SmallModalState } from '../../../../service/medical/tpl-maintenance/small-modal'

const tract = debug('trace:病历:medical')
const Option = Select.Option

export default class SmallModal extends FluxComponent<SmallModalState> {
    title = '小模板属性'
    smallModalService = smallModalService

    render() {
        const { data, smallModalVisible, synchronousElementList, dataTotal, bdDsOptionList, bdDsDataList } = this.state
        return (
            <div className={style.modalWrap}>
                <DragMove title={<div>模板属性</div>}
                          visible={smallModalVisible}
                          onCancel={this.smallModalService.onModalCancel}
                          onOk={this.smallModalService.onModalOk}
                          okText="保存"
                          cancelText="取消"
                          className={`${style.smallModal} ${style.tplMaintenanceModal}`}
                >
                    <div className={`${style.bodyRow} ${style.fixedValueClear}`}>
                        <span className={style.bodyRowTitle}>模板分类：</span>
                        <HintInput className={style.bodyInput} value={data.mrClassName} disabled={true}/>
                    </div>
                    <div className={`${style.bodyRow} ${style.fixedValueClear}`}>
                        <span className={style.bodyRowTitle}>模板名称：</span>
                        <HintInput
                            className={style.bodyInput}
                            value={data.mrName}
                            onChange={(e) => this.smallModalService.onDataValueChange('data.mrName', e.target.value)}/>
                    </div>
                    <div className={`${style.bodyRow} ${style.fixedValueClear}`}>
                        <span className={style.bodyRowTitle}>数据集：</span>
                        <InputTable
                            className={style.bodyInput}
                            option={{
                                total: dataTotal,
                                columns: bdDsOptionList,
                                pageSize: 7,
                                showValue: 'dsName',
                                multiSaveKey: 'id'
                            }}
                            data={bdDsDataList ? bdDsDataList : []}
                            oValue={data.dsName}
                            callBackMethods={this.smallModalService.InputTableCallBack}
                        />
                    </div>
                    <div className={`${style.bodyRow} ${style.fixedValueClear}`}>
                        <span className={style.bodyRowTitle}>动态值：</span>
                        <SelectItem
                            showSearch={true}
                            labelClass={style.selLabel}
                            selectItemClass={style.selItem}
                            selectClass={style.sel}
                            value={data.synchronousElementId}
                            onChange={this.smallModalService.onDataValueChange.bind(this, 'data.synchronousElementId')}
                        >
                            {
                                synchronousElementList && synchronousElementList.map((item, i) => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.synchronousElementName}</Option>
                                    )
                                })
                            }
                        </SelectItem>
                    </div>
                </DragMove>
            </div>
        )
    }
}
