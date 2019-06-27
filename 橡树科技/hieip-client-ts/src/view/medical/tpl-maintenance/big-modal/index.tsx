import React from 'react'
import * as style from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {HintInput} from 'pkg/common/input'
import {RadioGroup} from 'pkg/common/radioGroup'
import {SelectItem} from 'pkg/ui/SelectItem'
import {Checkbox} from 'antd'
import {InputTable} from 'pkg/common/inputTable'
import debug from 'debug'
import {FluxComponent} from '../../../../tools/flux/FluxComponent'
import {bigModalService, BigModalState} from '../../../../service/medical/tpl-maintenance/big-modal'

const tract = debug('trace:病历:medical')
const Option = SelectItem.Option
export default class BigModal extends FluxComponent<BigModalState> {
    title = '病历大模板'
    bigModalService = bigModalService

    classCodeAll = {
        classCodeData: [
            {
                name: '全院',
                id: 1
            },
            {
                name: '个人',
                id: 3
            },
            {
                name: '科室',
                id: 2
            }
        ],
        classCodeDataOption: {
            value: 'name',
            key: 'id'
        }
    }
    // 1-yyyy-MM-dd hh:ss 2-yyyy-MM-dd
    timeTypeData = [
        {
            id: 1,
            type: 'YYYY-MM-DD HH:MM'
        },
        {
            id: 2,
            type: 'YYYY-MM-DD'
        },
        {
            id: 3,
            type: 'YYYY-MM-DD HH'
        },
        {
            id: 4,
            type: 'YYYY年MM月DD日'
        }

    ]// 时间类型数据
    timeTypeOption = {
        value: 'type',
        key: 'id'
    }
    writeNumberData = [
        {
            id: 0,
            writeNumber: '不限次书写'
        },
        {
            id: 1,
            writeNumber: '单次书写'
        },
        {
            id: 2,
            writeNumber: '科室单次书写'
        }
    ]// 不限次数书写
    writeNumberOption = {
        value: 'writeNumber',
        key: 'id'
    }
    level = [
        {key: '0', name: '经治医生签字'},
        {key: '1', name: '上级医生签字'},
        {key: '2', name: '主任医生签字'}
    ]

    render() {
        const {
            bigModalVisible,
            data,
            mrGradingClassList,
            masterTemplateList,
            bdDsHeaderList,
            deptHeaderList,
            bdDsDataList,
            deptDataList,
            bdDsDataTotal,
            deptDataTotal
        } = this.state
        return (
            bigModalVisible &&
            <DragMove title={<div>模板属性<span className={style.smallTitle}>{data.mrClassName}</span></div>}
                      visible={bigModalVisible}
                      onCancel={this.bigModalService.onBigModalCancel}
                      onOk={this.bigModalService.onBigModalOk}
                      okText={'保存'}
                      cancelText={'取消'}
                      className={`${style.bigModal} ${style.tplMaintenanceModal}`}
            >
                <div className={style.bodyLeft}>
                    <div className={style.bodyLeftRow}>
                        <span className={style.bodyLeftRowTitle}>模板编码：</span>
                        <HintInput className1={style.leftInput} value={data.mrCode} disabled={true}/>
                    </div>
                    <div className={style.bodyLeftRow}>
                        <span className={style.bodyLeftRowTitle}>模板标题：</span>
                        <HintInput
                            className1={style.leftInput}
                            value={data.topic}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e.target.value, 'data', 'topic')
                            }}
                        />
                    </div>
                    <div className={style.bodyLeftRow}>
                        <span className={style.bodyLeftRowTitle}>文件标题：</span>
                        <HintInput
                            className1={style.leftInput}
                            value={data.mrName}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e.target.value, 'data', 'mrName')
                            }}
                        />
                    </div>
                    <div className={style.bodyLeftRow}>
                        <span className={style.bodyLeftRowTitle}>序列号：</span>
                        <HintInput
                            className1={style.leftInput}
                            value={data.mrClassFileNo}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e.target.value, 'data', 'mrClassFileNo')
                            }}
                        />
                    </div>
                    <div className={style.bodyLeftRow}>
                        <Checkbox
                            className={style.motherChecked}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'masterTemplate')
                            }}
                            checked={data.masterTemplate === 1}
                            value="1">
                            母模板
                        </Checkbox>
                        <Checkbox
                            className={style.motherChecked}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'newPageFlag')
                            }}
                            checked={data.newPageFlag === 1}
                            value="1">
                            新页
                        </Checkbox>
                    </div>
                    <div className={style.bodyLeftRow}>
                        <SelectItem
                            showSearch={true}
                            labelVal={'审鉴级别：'}
                            labelClass={style.leftSelLabel}
                            selectItemClass={style.leftSelItem}
                            selectClass={style.leftSel}
                            value={data.needParentSignFlag != null ? data.needParentSignFlag === 0 ?
                                '经治医生签字' :
                                data.needParentSignFlag === 1 ?
                                    '上级医生签字' :
                                    '主任医生签字' : ''}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e, 'data', 'needParentSignFlag')
                            }}
                        >
                            {
                                this.level.map((item, i) => {
                                    return (
                                        <Option key={item.key} value={item.key}>{item.name}</Option>
                                    )
                                })
                            }
                        </SelectItem>
                    </div>
                    <div className={style.bodyLeftRow}>
                        <SelectItem
                            showSearch={true}
                            labelVal={'母版：'}
                            labelClass={style.leftSelLabel}
                            selectItemClass={style.leftSelItem}
                            selectClass={style.leftSel}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e, 'data', 'masterTemplateId')
                            }}
                            value={data.masterTemplateId}
                        >
                            {
                                masterTemplateList && masterTemplateList.map((item) => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.mrName}</Option>
                                    )
                                })
                            }
                        </SelectItem>
                    </div>
                    <div className={style.bodyLeftRow}>
                        <SelectItem
                            showSearch={true}
                            labelVal={'监控编码：'}
                            labelClass={style.leftSelLabel}
                            selectItemClass={style.leftSelItem}
                            selectClass={style.leftSel}
                            onChange={(e) => {
                                this.bigModalService.onDataChangeValue(e, 'data', 'monitorCode')
                            }}
                            value={data.monitorCode}
                        >
                            {
                                mrGradingClassList && mrGradingClassList.map((item) => {
                                    return (
                                        <Option key={item.id.toString()} value={item.id.toString()}>{item.gradingClassName}</Option>
                                    )
                                })
                            }
                        </SelectItem>
                    </div>
                    <div className={style.bodyLeftRow}>
                        <span className={style.bodyLeftRowTitle}>数据集：</span>
                        <InputTable
                            className={style.leftInput}
                            option={{
                                total: bdDsDataTotal,
                                columns: bdDsHeaderList,
                                pageSize: 6,
                                showValue: 'dsName'
                            }}
                            data={bdDsDataList}
                            value={data.dsName}
                            callBackMethods={(v) => bigModalService.loadInputTable('SJJ', v)}
                        />
                    </div>
                    <div className={`${style.bodyLeftRow} ${style.leftboxWrap}`}>
                        <div className={`${style.boxWrap}`}>
                            <span className={style.boxWrapTitle}>病程选项</span>
                            <div>
                                <Checkbox
                                    checked={data.defaultTopicVisible === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'defaultTopicVisible')
                                    }}
                                    value="1">
                                    默认显示病程标题
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    checked={data.modifyTopic === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'modifyTopic')
                                    }}
                                    value="1">
                                    是否可以修改标题
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    checked={data.modifyTopicDoctor === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'modifyTopicDoctor')
                                    }}
                                    value="1">
                                    是否可以修改标题中医生
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    checked={data.modifyTopicTitle === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'modifyTopicTitle')
                                    }}
                                    value="1">
                                    是否可以修改标题中职称
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bodyRight}>
                    <div className={style.bodyRightRow}>
                        <div className={`${style.boxWrap} ${style.classCodeWrap}`}>
                            <RadioGroup data={this.classCodeAll.classCodeData}
                                        dataOption={this.classCodeAll.classCodeDataOption}
                                        value={data.tempaleType}
                                        onChange={(e: any) => {
                                            this.bigModalService.onDataChangeValue(e.id, 'data', 'tempaleType')
                                        }}
                            />
                            <SelectItem
                                showSearch={true}
                                labelVal={'科室代码:'}
                                onChange={this.bigModalService.onDataChangeValue.bind(this, 'data.deptCode')}
                                labelClass={style.classCodeLabel}
                                selectItemClass={style.classCodelSelItem}
                                selectClass={style.classCodelSel}
                                value={data.deptName}
                                disabled={data.tempaleType === 2 ? false : true}
                            >
                                {

                                }
                            </SelectItem>

                            {/*<InputTable
                                disabled={data.tempaleType === 2 ? true : false}
                                className={style.classCodeRadio}
                                value={data.deptName}
                                option={{
                                    total: deptDataTotal,
                                    columns:deptHeaderList,
                                    pageSize: 6,
                                    showValue: 'deptName'
                                }}
                                data={deptDataList}
                                callBackMethods={(v) => bigModalService.loadInputTable('deptDict',v)}
                            />*/}
                        </div>
                    </div>
                    <div className={`${style.bodyRightRow} ${style.fixedValueClear}`}>
                        <div className={style.timeType}>
                            <div className={`${style.boxWrap}`}>
                                <span className={style.boxWrapTitle}>默认病程时间类型</span>
                                <RadioGroup data={this.timeTypeData}
                                            dataOption={this.timeTypeOption}
                                            value={data.defaultDateType}
                                            onChange={(e: any) => {
                                                this.bigModalService.onDataChangeValue(e.id, 'data', 'defaultDateType')
                                            }}
                                />
                            </div>
                        </div>
                        <div className={style.writeNumber}>
                            <div className={`${style.boxWrap}`}>
                                <span className={style.boxWrapTitle}>书写次数</span>
                                <RadioGroup data={this.writeNumberData}
                                            dataOption={this.writeNumberOption}
                                            value={data.writeTimes}
                                            onChange={(e: any) => {
                                                this.bigModalService.onDataChangeValue(e.id, 'data', 'writeTimes')
                                            }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`${style.boxWrap}`}>
                            <span className={style.boxWrapTitle}>修改选项</span>
                            <div>
                                <Checkbox
                                    checked={data.printNeedFinish === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'printNeedFinish')
                                    }}
                                    value="1">
                                    必须全部提交才能打印
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox checked={data.singNeedDiag === 1}
                                          onChange={(e) => {
                                              this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'singNeedDiag')
                                          }}
                                          value="1">
                                    已下诊断才能提交
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    checked={data.titleCustom === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'titleCustom')
                                    }}
                                    value="1">
                                    模板病历标题增加页码显示
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    checked={data.callBackFlag === 1}
                                    onChange={(e) => {
                                        this.bigModalService.onDataChangeValue(e.target.checked ? 1 : 0, 'data', 'callBackFlag')
                                    }}
                                    value="1">
                                    召回病历是否可编辑
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </DragMove>
        )
    }
}
