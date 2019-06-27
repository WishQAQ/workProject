/**
 * Created by oakm on 2017/12/26.
 */
'use strict'
import * as React from 'react'
import * as css from './style/index.scss'
import {Input, Radio, Select} from 'antd'
import {Rounded} from 'src/packages/common/rounded'
import {TimePicker} from 'src/packages/common/timePicker'
import {DragMove} from 'src/packages/common/dragging'
import debug from 'debug'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {modifysmFileService, ModifysmFileState} from 'src/service/medical/medical/components/written/modifysm-file'

const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group
const log = debug('trace:病历:medical')

export default class ModifySmFile extends FluxComponent<ModifysmFileState> {
    title = '申请维护'
    modifysmFileService = modifysmFileService

    render() {
        let {mrPatientFileEditApply, visible} = this.state
        return (
            <div>
                <DragMove
                    className={css.modifyFile}
                    title="病历维护申请"
                    visible={visible}
                    onOk={modifysmFileService.newMrPatientFileEditApply}
                    onCancel={modifysmFileService.cancel}
                    okText="确定"
                    width={'334px'}
                    cwidth={334}
                    cheight={273}
                >
                    <div className={`${css.newFileContainer} ${css.newFileMargin}`} style={{display: 'block', height: 'auto'}}>
                        <Rounded
                            leftShow={'患者ID'}
                            className={css.newFileRounded}
                            style={{width: '100%', marginBottom:'10px'}}>
                            <Input
                                placeholder="请输入患者ID"
                                value={mrPatientFileEditApply ? mrPatientFileEditApply.patientId : ''}
                                onChange={modifysmFileService.onChange.bind(this, 'patientId')}
                                disabled={true}/>
                        </Rounded>
                        <Rounded
                            leftShow={'病人住院次数'}
                            className={css.newFileRounded}
                            style={{width: '100%', marginBottom:'10px'}}>
                            <Input
                                placeholder="请输入"
                                value={mrPatientFileEditApply ? mrPatientFileEditApply.visitId : 1}
                                onChange={modifysmFileService.onChange.bind(this, 'visitId')}
                            />
                        </Rounded>
                        <Rounded
                            leftShow={'文件号'}
                            className={css.newFileRounded}
                            style={{width: '100%',marginBottom:'10px'}}>
                            <Input
                                placeholder="请输入"
                                value={mrPatientFileEditApply ? mrPatientFileEditApply.fileUniqueId : ''}
                                onChange={modifysmFileService.onChange.bind(this, 'fileUniqueId')}
                                disabled={true}
                            />
                        </Rounded>
                        {/*<Rounded*/}
                        {/*leftShow={'文件名'}*/}
                        {/*style={{width: '100%', margin: '5px 0'}}>*/}
                        {/*<Input*/}
                        {/*placeholder="请输入"*/}
                        {/*value={fileName?fileName:''}*/}
                        {/*onChange={modifysmFileService.onChange.bind(this,'fileName')}*/}
                        {/*/>*/}
                        {/*</Rounded>*/}
                  {/*      <span className="show" style={{marginRight: 10}}>
                <label style={{marginRight: 10}}>申请修改类型:</label>
                <RadioGroup defaultValue={0}
                            onChange={modifysmFileService.onChange.bind(this, 'applyType')}
                >
                 <Radio value={0}>病案室审批</Radio>
                  <Radio value={1}>转出记录打印后锁定</Radio>
                </RadioGroup>
              </span>*/}
                      <Rounded
                        leftShow={'申请修改类型'}
                        className={css.newFileRounded}
                        style={{width: '100%',marginBottom:'10px'}}>
                        <Select
                          className={`${css.newFileSelect} ${css.fileType}`}
                          style={{width: '100%'}}
                          allowClear={true}
                          onChange={modifysmFileService.onChange.bind(this, 'applyType')}>
                          <Option key={0} value={0}>{'病案室审批'}</Option>
                          <Option key={1} value={1}>{'转出记录打印后锁定'}</Option>
                        </Select>
                      </Rounded>
                        <TextArea style={{border: '1px solid #cdcdcd'}}
                                  placeholder="申请修改原因"
                                  onChange={modifysmFileService.onChange.bind(this, 'applyReason')}
                                  value={mrPatientFileEditApply && (mrPatientFileEditApply.applyReason || null)}
                                  rows={2}
                        />
                    </div>
                </DragMove>
            </div>
        )
    }
}