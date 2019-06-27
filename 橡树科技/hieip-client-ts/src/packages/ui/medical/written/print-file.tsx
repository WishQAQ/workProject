/**
 * Created by oakm on 2017/12/26.
 */
'use strict'
import * as React from 'react'
import * as css from './style/index.scss'
import {Button, Input, Radio, Select} from 'antd'
import {Rounded} from 'src/packages/common/rounded'
import {Table} from 'src/packages/common/table'
import {DragMove} from 'src/packages/common/dragging'
import * as style from 'view/triage/patient-list/style/patient-head.scss'
import moment from 'moment'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {PrintFileState, printFileService} from 'src/service/medical/medical/components/written/print-file'
import {TimePicker} from '../../../common/timePicker'

const RadioGroup = Radio.Group
const Option = Select.Option

function times(params) {
  let val = params.value
  val = val && moment(val).format('YYYY-MM-DD HH:mm')
  return val
}
const columns = [{
  headerName: '',
  field: 'athlete',
  checkboxSelection: true,
  width: 80,
  cellClass: (parm) => {
    return `${css.table_checkbox}`
  }
}, {
  headerName: '文档类别',
  field: 'mrClassName',
}, {
  headerName: '文档名称',
  field: 'topic',
}, {
  headerName: '文档时间',
  field: 'createDateTime',
  valueFormatter: times,
}, {
  headerName: '书写者',
  field: 'creatorName',
}, {
  headerName: '状态',
  field: 'statusName',
}, {
  headerName: '打印次数',
  field: 'printTimes',
}, {
  headerName: '最后打印时间',
  field: 'lastPrintTime',
  valueFormatter: times,
}, {
  headerName: '打印人',
  field: 'printName',
}, {
  headerName: '不可打印原因',
  field: 'unPrintRason',
}]

export default class PrintFile extends FluxComponent<PrintFileState> {
  title = '打印'
  printFileService = printFileService

  render() {
    let {mrModle, mrClass, visible, startTime, endTime} = this.state
    return (
      <div>
        <DragMove
          className={`${css.patientModal_diao} ${css.patiemtModal_print}`}
          title="患者文书处理-打印"
          visible={visible}
          onOk={() => this.props.handSearch('print-ok')}
          onCancel={printFileService.cancel}
          okText="打印"
          cancelText="取消"
          cwidth={1120}
          cheight={471}
        >
          <div className={css.newFileContainer}>
            <span className="show" style={{marginRight: 10}}>
                <label style={{marginRight: 10}}>目录列表:</label>
                <RadioGroup
                  defaultValue={1}
                  onChange={printFileService.onchange}>
                  <Radio value={1}>全部</Radio>
                  <Radio value={2}>未打印</Radio>
                  <Radio value={3}>可打印</Radio>
                </RadioGroup>
              </span>
            <Rounded
              leftShow={'文件类别'}
              className={css.newFileRounded}>
              <Select defaultValue="" value={mrClass ? mrClass : '全部'} style={{width: '100%'}}
                      className={`${css.newFileSelect} ${css.fileType}`}
                      showSearch={true}
                      allowClear={true}
                      onChange={printFileService.radioGroupChange.bind(this, 'mrClass')}>
                {  mrModle ? mrModle.map(data => <Option key={data.mrClassName}
                value={data.mrClassCode}>{data.mrClassName + '(' + data.templateIndexCount + ')'}</Option>) : null}

              </Select>
            </Rounded>
            <Rounded
              leftShow={'文件名称'}
              className={css.newFileRounded}>
              <Input placeholder="请输入"
                     onPressEnter={printFileService.obscurePatientFile}
                     onChange={printFileService.inputChange}
              />
            </Rounded>
            <Rounded
              className={`${css.time_tow} ${css.newFileRounded}`}
              leftShow={'时间'}>
              <TimePicker
                isRange={true}
                timePrecision={1}
                startPlaceholder={'开始时间'}
                endPlaceholder={'结束时间'}
                format={'YYYY-MM-DD HH:mm:ss'}
                oValue={startTime ? startTime : ''}
                oValue2={endTime ? endTime : ''}
                dateChange={printFileService.showOnchange}
              />
            </Rounded>
            <Button type="primary"
                    icon="search"
                    className={css.searchBtn}
                    onClick={printFileService.obscurePatientFile}
            >查询</Button>
          </div>
          <div style={{height: 333, border: '1px solid #e1e1e1',}}>
            <Table
              columnDefs={columns}
              rowModelType={'infinite'}
              onGridReady={printFileService.onGridReady}
              singleClickEdit={false}
              rowSelection={'multiple'}
            />
          </div>
        </DragMove>
      </div>
    )
  }
}