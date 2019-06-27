/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import * as css from './style/index.scss'
import {Select} from 'antd'
import {Rounded} from 'src/packages/common/rounded'

import {TimePicker} from 'src/packages/common/timePicker'
import {DragMove} from 'src/packages/common/dragging'
import debug from 'debug'
import {InputTable} from '../../../common/inputTable'
import {FluxComponent} from 'src/tools/flux/FluxComponent'
import {modifyFileService, ModifyFileState} from 'src/service/medical/medical/components/written/modify-file'
import moment from 'moment'

const Option = Select.Option
const log = debug('trace:病历:medical')

export default class ModifyFile extends FluxComponent<ModifyFileState> {
  title = '修改'
  modifyFileService = modifyFileService

  render() {
    let {
      inputTitle, inputLength, inputDate, inputTitle1,
      inputLength1, inputDate1, mrModle, visible, mrPatientsModle
    } = this.state
    return (
      <div>
        <DragMove
          className={css.modifyFile}
          title="修改信息"
          visible={visible}
          onOk={modifyFileService.subUpdate}
          onCancel={modifyFileService.cancel}
          okText="确定"
          width={'290px'}
          cwidth={290}
          cheight={273}
        >
          <div className={`${css.newFileContainer} ${css.newFileMargin}`} style={{display: 'block'}}>
            <Rounded
              leftShow={'模板分类'}
              className={css.newFileRounded}
              style={{width: '100%', marginBottom: '10px'}}>
              <Select value={mrPatientsModle ? mrPatientsModle.mrClass : ''} style={{width: '100%'}}
                      onChange={modifyFileService.radioGroupChange.bind(this, 'mrClass')}>
                {mrModle ? mrModle.map(data => <Option key={data.mrClassName}
                                                       value={data.mrClassCode}>{data.mrClassName}</Option>) : null}
              </Select>
            </Rounded>
            <Rounded
              leftShow={'创建时间'}
              className={`${css.newFileRounded} ${css.createTime}`}
              asterisk={true}
              style={{width: '100%',marginBottom: '10px'}}>
              <TimePicker
                oValue={moment().format('YYYY-MM-DD HH:mm')}
                onChange={modifyFileService.radioGroupChange.bind(this, 'createDateTime')}
                startPlaceholder="请选择日期"
              />
            </Rounded>
            <Rounded
              leftShow={'上级医师'}
              className={css.newFileRounded}
              style={{width: '100%', marginBottom: '10px'}}>
              <InputTable
                disabled={mrPatientsModle ? (mrPatientsModle.modifyTopicDoctor === 1 ? false : true) : false}
                className={css.leftInput}
                option={{
                  total: inputLength1 ? inputLength1 : 1,
                  columns: inputTitle1 ? inputTitle1 : [],
                  pageSize: 7,
                  showValue: 'userName'
                }}
                value={mrPatientsModle ? mrPatientsModle.topicDoctorName : ''}
                data={inputDate1 ? inputDate1 : []}
                callBackMethods={(v) => modifyFileService.showMessage(v, 'YHXX')}
              />
            </Rounded>
            <Rounded
              leftShow={'人员职称'}
              className={css.newFileRounded}
              style={{width: '100%'}}>
              <InputTable
                disabled={mrPatientsModle ? (mrPatientsModle.modifyTopicTitle === 1 ? false : true) : false}
                className={css.leftInput}
                option={{
                  total: inputLength ? inputLength : 1,
                  columns: inputTitle ? inputTitle : [],
                  pageSize: 7,
                  showValue: 'titleName'
                }}
                value={mrPatientsModle ? mrPatientsModle.topicTitleName : ''}
                data={inputDate ? inputDate : []}
                callBackMethods={(v) => modifyFileService.showMessage(v, 'YSZC')}
              />
            </Rounded>
          </div>
        </DragMove>
      </div>
    )
  }
}