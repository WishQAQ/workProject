/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import * as css from './style/index.scss'
import {Button, Input, Radio, Select} from 'antd'
import {Rounded} from 'src/packages/common/rounded'
import {TimePicker} from 'src/packages/common/timePicker'
import {Table} from 'src/packages/common/table/table'
import {DragMove} from 'src/packages/common/dragging'
import * as style from 'view/triage/patient-list/style/patient-head.scss'
import moment from 'moment'
import debug from 'debug'
import {InputTable} from 'pkg/common/inputTable'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {NewfileState, newfileServiceService} from 'service/medical/medical/components/written/new-file'
import {HintInput} from '../../../common/input'

const Option = Select.Option
const RadioGroup = Radio.Group

const log = debug('trace:病历:medical')

const columns = [{
  headerName: '#',
  width: 70,
  valueFormatter: (params) => {
    return params.node.rowIndex + 1
  },
}, {
  headerName: '文件编码',
  field: 'mrCode',
}, {
  headerName: '文件类型',
  field: 'mrName',
}, {
  headerName: '文件名称',
  field: 'topic',
}, {
  headerName: '创建时间',
  field: 'createDateTime',
  valueFormatter: (params) => {
    let val = params.value
    val = val && moment(val).format('YYYY-MM-DD HH:mm:ss')
    return val
  },
}, {
  headerName: '限制书写次数',
  field: 'writeTimes',
  valueFormatter: (params) => {
    let val = params.value
    val = val && val === 0 ? '限制' : '不限制'
    return val
  },
}, {
  headerName: '召回病历',
  field: 'callBackFlag',
  valueFormatter: (params) => {
    let val = params.value
    val = val && val === 0 ? '可编辑' : '不可编辑'
    return val
  },
}, {
  headerName: '审签',
  field: 'needParentSignName',
}]

export default class Newfile extends FluxComponent<NewfileState> {
  title = '新建病历'
  newfileServiceService = newfileServiceService

  render() {
    let {
      inputTitle, inputLength, inputDate, inputTitle1,
      inputLength1, inputDate1, mrModle, mrClass, mrTemplate,
      visible, names, time, tempaleType
    } = this.state
    return (
      <div>
        <DragMove
          className={css.patientModal_diao}
          title="新增患者文书"
          visible={visible}
          onOk={newfileServiceService.onOk}
          onCancel={newfileServiceService.cancelEmpty}
          okText="确认"
          cancelText="取消"
          width={'50%'}
          cwidth={837}
          cheight={493}
        >
          <div className={css.newFileContainer}>
            <span className="show" style={{marginRight: 10}}>
                <label style={{marginRight: 10}}>模板类型:</label>
                <RadioGroup value={tempaleType ? tempaleType : 1}
                            onChange={newfileServiceService.rodisOnchange.bind(this, 'tempaleType')}>
                  <Radio value={1}>通用</Radio>
                  <Radio value={2}>科室</Radio>
                  <Radio value={3}>个人</Radio>
                </RadioGroup>
              </span>
            <Rounded
              className={css.newFileRounded}
              leftShow={'模板分类'}>
              <Select
                className={`${css.newFileSelect} ${css.fileType}`}
                style={{width: '100%'}}
                showSearch={true}
                allowClear={true}
                value={mrClass ? mrClass : ''}
                onChange={newfileServiceService.onchange.bind(this, 'mrClass')}>
                {  mrModle ? mrModle.map(data => <Option key={data.mrClassName}
                                                         value={data.mrClassCode}>{data.mrClassName}</Option>) : null}
              </Select>
            </Rounded>
            <Rounded
              className={css.newFileRounded}
              leftShow={'模板名称'}>
              <HintInput
                className={css.newFileInput}
                placeholder="请输入名称"
                value={names ? names : ''}
                onChange={newfileServiceService.inputChange}
                onPressEnter={newfileServiceService.onClick}
              />
            </Rounded>
            <Button type="primary"
                    icon="search"
                    className={css.searchBtn}
                    onClick={newfileServiceService.onClick}>查询</Button>
          </div>
          <div style={{height: 335}} className={css.new_table}>
            <Table
              columnDefs={columns}
              rowModelType={'infinite'}
              onGridReady={newfileServiceService.onGridReady}
              singleClickEdit={false}
              onCellClicked={newfileServiceService.templateIndexOpt}
            />
          </div>
          <div className={css.NewFileFooter}>
            <Rounded
              className={css.newFileRounded}
              leftShow={'文件名'}>
              <Input placeholder="请输入文件名"
                     disabled={mrTemplate ? (mrTemplate.modifyTopic === 1 ? false : true) : true}
                     value={mrTemplate ? mrTemplate.topic : ''}
                     onChange={newfileServiceService.onUpdate.bind(this, 'mrTemplate.topic')}/>
            </Rounded>
            <Rounded
              className={css.newFileRounded}
              leftShow={'时间'}>
              <TimePicker
                timePrecision={1}
                format={'YYYY-MM-DD HH:mm:ss'}
                oValue={time ? time : ''}
                dateChange={newfileServiceService.showOnchange.bind(this, 'time')}
                startPlaceholder="请选择日期"
              />
            </Rounded>
            <Rounded
              className={css.newFileRounded}
              asterisk={mrTemplate && mrTemplate.needParentSignFlag === 1 ? true : false}
              leftShow={'上级'}>
              <InputTable
                disabled={mrTemplate ? (mrTemplate.needParentSignFlag === 1 ? false : true) : true}
                className={css.leftInput}
                option={{
                  total: inputLength1 ? inputLength1 : 1,
                  columns: inputTitle1 ? inputTitle1 : [],
                  pageSize: 7,
                  showValue: 'userName',
                }}
                tableWidth={'350px'}
                data={inputDate1 ? inputDate1 : []}
                callBackMethods={(v) => newfileServiceService.showMessage(v, 'YHXX')}
              />
            </Rounded>
            <Rounded
              className={css.newFileRounded}
              asterisk={mrTemplate && mrTemplate.modifyTopicTitle === 1 ? true : false}
              leftShow={'职称'}>
              <InputTable
                disabled={mrTemplate ? (mrTemplate.modifyTopicTitle === 1 ? false : true) : true}
                className={css.leftInput}
                option={{
                  total: inputLength ? inputLength : 1,
                  columns: inputTitle ? inputTitle : [],
                  pageSize: 7,
                  showValue: 'titleName',
                }}
                tableWidth={'350px'}
                data={inputDate ? inputDate : []}
                callBackMethods={(v) => newfileServiceService.showMessage(v, 'YSZC')}
              />
            </Rounded>
          </div>
        </DragMove>
      </div>
    )
  }
}