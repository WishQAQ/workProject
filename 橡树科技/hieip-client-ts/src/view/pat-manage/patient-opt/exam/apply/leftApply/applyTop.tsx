import React from 'react'
import css from '../style/exam.scss'
// model
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {IconFont} from 'pkg/common/icon'
import {DragMove} from 'pkg/common/dragging'
import {InputTable} from 'pkg/common/inputTable'
// other
import {Button, Checkbox, Modal, Radio} from 'antd'
import {Table} from 'pkg/common/table'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {examService, ExamState} from 'service/pat-manage/patien-opt/exam/apply/index.ts'
import {Information} from 'pkg/ui/information'

const RadioGroup = Radio.Group

export default class ApplyInfo extends FluxComponent<ExamState> {
    title = '检查顶部'
    examService = examService

    /**
     * 申请输入框字段
     */
    inputArr = [
        {name: '检查目的', field: 'data.examReason', show: 'examReason', asterisk: true},// 检查目的
        {name: '体征', field: 'data.physSign', show: 'physSign', asterisk: true}, // 体征
        {name: '症状', field: 'data.clinSymp', show: 'clinSymp', asterisk: true}, // 症状
        {name: '相关化验结果', field: 'data.relevantLabTest', show: 'relevantLabTest', asterisk: false}, // 相关化验结果
        {name: '临床诊断', field: 'data.clinicDiag', show: 'clinicDiag', asterisk: true}, // 临床诊断
        {name: '附加说明', field: 'data.memo', show: 'memo', asterisk: false}, // 附加说明
        {name: '重点关注病原体', field: 'data.concernPathogens', show: 'concernPathogens', asterisk: false} // 重点关注病原体
    ]

    temArr = [
        {headerName: '模板名称', field: 'name'},
        {headerName: '模板类型', field: 'type'}
    ]

    /**
     * 检查报告弹框列规则
     */
    reportTitle = [
        {headerName: '检查主题', field: 'theme'},
        {headerName: '状态', field: 'status', maxWidth: 80},
        {headerName: '申请时间', field: 'applyTime'}
    ]

    /**
     * infomation组件所需
     */
    informationArray = [
        {text: '检查类型', col: 6, labelWidth: 70, component: <span/>},
        {text: '申请医生', col: 6, labelWidth: 70, component: <span/>},
        {text: '申请时间', col: 6, labelWidth: 70, component: <span/>},
        {text: '检查状态', col: 6, labelWidth: 70, component: <span/>},
        {text: '检查医生', col: 6, labelWidth: 70, component: <span/>},
        {text: '检查时间', col: 6, labelWidth: 70, component: <span/>},
        {text: '报告时间', col: 12, labelWidth: 70, component: <span/>}
    ]

    /**
     * 详细信息 - infomation组件
     */
    detailedInfo = [
        {text: '结果', col: 24, labelWidth: 70, component: <span/>},
        {text: '检查参数', col: 24, labelWidth: 70, component: <span/>},
        {text: '检查所见', col: 24, labelWidth: 70, component: <span/>},
        {text: '印象', col: 24, labelWidth: 70, component: <span/>},
        {text: '建议', col: 24, labelWidth: 70, component: <span/>}
    ]

    render() {
        let report = []
        for (let i = 0; i < 30; i++) {
            report.push({
                theme: `检查主题${i}`,
                status: `状态`,
                applyTime: `申请时间${i}`
            })
        }
        let {temOpen, reportOpen, data, diagnosisDict, diagnosisDictColumns, mList, radioChoose} = this.state
        return (
            <div className={css.applyTopOpt}>
                <div>
                    {this.inputArr.map((e, index) => {
                        return <LabelBox text={e.name} className={css.applyInfo} key={index} asterisk={e.asterisk}>
                            {e.name === '临床诊断' ?
                                <InputTable
                                    data={diagnosisDict || []}
                                    option={{
                                        total: diagnosisDict ? diagnosisDict.total : 0,
                                        columns: diagnosisDictColumns || [],
                                        pageSize: 7,
                                        showValue: 'value'
                                    }}
                                    callBackMethods={(v: any) =>
                                        examService.inputTableEvent(v, 'diagnosisDict', e.field)
                                    }
                                    oValue={data.clinicDiag || ''}
                                    className={css.roundedSelect}
                                />
                                :
                                <HintInput
                                    onChange={(event) => examService.setStateJson(e.field, event)}
                                    value={data ? data[e.show] : ''}
                                />
                            }
                            {index === 0 ? <Checkbox className={`${css.urgent} ${css.first}`}
                                                     onChange={(e) => examService.commonCheck('data.priorityIndicator', e)}
                                                     checked={data ? data.priorityIndicator === 1 : false}
                            >
                                {'紧急'}</Checkbox> : null}
                            {index === this.inputArr.length - 1 ?
                                <div className={css.doubleCheck}>
                                    <Checkbox className={css.urgent}
                                              onChange={(e) => examService.commonCheck('data.mdro', e)}
                                              checked={data ? data.mdro === 1 : false}
                                    >{'多重耐药菌'}</Checkbox>
                                    <Checkbox className={css.urgent}
                                              onChange={(e) => examService.commonCheck('data.specialPathogens', e)}
                                              checked={data ? data.specialPathogens === 1 : false}
                                    >{'特殊感染病原体'}</Checkbox>
                                </div>
                                : null}
                        </LabelBox>
                    })}
                    <div className={css.btnDiv}>
                        <Button onClick={examService.save}>
                            <IconFont iconName={'icon-baocun2'}/>保存
                        </Button>
                        <Button onClick={examService.reportOpen}>
                            <IconFont iconName={'icon-xie'}/>报告
                        </Button>
                        <Button onClick={examService.temOpen}>
                            <IconFont iconName={'icon-leimupinleifenleileibie'}/>模板
                        </Button>
                        <Button onClick={examService.cleanAll}>
                            <IconFont iconName={'icon-iconfontshequyijujue'}/>清空
                        </Button>
                        <Button>
                            <IconFont iconName={'icon-ordinaryprint'}/>打印
                        </Button>
                    </div>
                </div>
                <DragMove
                    title={'模板调用'}
                    visible={temOpen}
                    okText={'确认'}
                    onOk={examService.mouldOk}
                    onCancel={examService.temClose}
                    className={css.temStyle}
                    width={550}
                >
                    <div className={css.temInquire}>
                        <b>模板类型:</b>
                        <RadioGroup
                            defaultValue={'all'}
                            className={css.temRadio}
                            onChange={examService.chose}
                            value={radioChoose}
                        >
                            <Radio value={'全院'} >{'全院'}</Radio>
                            <Radio value={'科室'}>{'科室'}</Radio>
                            <Radio value={'个人'}>{'个人'}</Radio>
                        </RadioGroup>
                        <HintInput
                            className1={css.temInput}
                            onChange={examService.handelChange}
                        />
                        <Button type={'primary'} onClick={examService.handelChange}>
                            <IconFont iconName={'icon-sousuo_sousuo'}/>{'查询'}
                        </Button>
                    </div>
                    <div className={css.temTable}>
                        <Table
                            columnDefs={this.temArr}
                            rowData={mList}
                        />
                    </div>
                </DragMove>
                <Modal
                    title={'检查报告'}
                    visible={reportOpen}
                    onCancel={examService.reportClose}
                    maskClosable={false}
                    className={css.reportModal}
                    style={{top: 50}}
                    width={'95%'}
                    maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.35)'}}
                    bodyStyle={{height: '85%'}}
                    wrapClassName={css.specialWrap}
                >
                    <div className={css.reportMain}>
                        <div>
                            <div className={css.reportTable}>
                                <Table
                                    columnDefs={this.reportTitle}
                                    rowData={report}
                                    enableColResize={false}
                                />
                            </div>
                            <div className={css.reportTableItem}>
                                <p>{'检查项目'}</p>
                                <div>
                                    {report.map((e, i) => {
                                        return <div className={css.history} key={i}>
                                            {123}
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={css.btnContent}>
                                <Button type={'primary'}>
                                    <IconFont iconName={'icon-ordinaryprint'}/>{'图形'}
                                </Button>
                                <Button type={'primary'}>
                                    <IconFont iconName={'icon-ordinaryprint'}/>{'打印'}
                                </Button>
                            </div>
                            <div className={css.infoGroup}>
                                <Information
                                    data={this.informationArray}
                                    className={css.infoStyle}
                                />
                            </div>
                            <div className={css.detailed}>
                                <Information
                                    data={this.detailedInfo}
                                    className={css.detailInfo}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}