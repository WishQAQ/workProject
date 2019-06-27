import React from 'react'
import { Button, Col, Input, Radio, Row, Select } from 'antd'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { reformHeaderService, ReformHeaderState as State } from 'service/medical/medical-reform/reform-header/index.ts'
import styles from './style/index.scss'
import { Rounded } from 'pkg/common/rounded'
import { TimePicker } from 'pkg/common/timePicker'
import { InputTable } from 'pkg/common/inputTable'
import { reformContentService } from 'service/medical/medical-reform/reform-content'

const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

/**
 * 病历整改头部 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class ReformHeaderView extends FluxComponent<State> {
  title = '病历整改头部操作栏'
  medicalReformHeaderService = reformHeaderService

  render() {
    const {
      comeOut, value, infos, types, inputLength, inputTitle,
      inputTableData, deptObjectCode, begin, end, radio
    } = this.state
    return (
      <Row className={styles.root} gutter={6} type="flex" align="middle" justify="space-between">
        <Col span={3}>
          <RadioGroup value={comeOut} onChange={(event) => reformHeaderService.onRadioChange(event, 'comeOut')}
            className={styles.patient}>
            <RadioButton value={1}>在院患者</RadioButton>
            <RadioButton value={2}>出院未签收患者</RadioButton>
          </RadioGroup>
        </Col>
        <Col span={3}>
          <Input
            type="text"
            value={value}
            onPressEnter={reformContentService.onReveresSource}
            onChange={(value) => reformHeaderService.onValueChange(value, 'value')}
            placeholder="姓名/身份证/医保号..."
          />
        </Col>
        <Col span={3}>
          <Rounded leftShow={'科室'}>
            <InputTable
              className={styles.dept}
              option={{
                total: inputLength ? inputLength : 0,
                columns: inputTitle ? inputTitle : [],
                pageSize: 7,
                showValue: 'value',
                multiSaveKey: 'key'
              }}
              isMulti={true}
              oValue={deptObjectCode}
              data={inputTableData ? inputTableData : []}
              callBackMethods={(v) => reformHeaderService.showMessage(v)}
            />
          </Rounded>
        </Col>
        <Col span={2}>
          <Select
            style={{ width: '100%' }}
            placeholder="费用类别"
            allowClear={true}
            onChange={(val) => reformHeaderService.onSelectChange(val, 'type')}
            onSelect={(val, option: any) => {
              reformHeaderService.onSelectChange(types[option.props.index], 'type')
            }}
          >
            {
              types.map(item =>
                <Option key={item.key} value={item.value}>
                  {item.value}
                </Option>)
            }
          </Select>
        </Col>
        <Col span={2}>
          <Select
            style={{ width: '100%' }}
            placeholder="病历类别"
            allowClear={true}
            onChange={(val) => reformHeaderService.onSelectChange(val, 'info')}
            onSelect={(val, option: any) => {
              reformHeaderService.onSelectChange(infos[option.props.index], 'info')
            }}
          >
            {
              infos.map(item =>
                <Option key={item.key} value={item.value}>
                  {item.value}
                </Option>)
            }
          </Select>
        </Col>
        <Col span={6.5}>
          <TimePicker
            isRange={true}
            oValue={begin}
            oValue2={end}
            format={'YYYY-MM-DD HH:mm:ss'}
            startPlaceholder={'开始时间'}
            endPlaceholder={'结束时间'}
            dateChange={(value) => reformHeaderService.onTimeChange(value)} />
        </Col>
        <Col span={3.5}>
          <RadioGroup value={radio} className={styles.time}
            onChange={(event) => reformHeaderService.onRadioChange(event, 'radio')}>
            <Radio value={1}>24小时</Radio>
            <Radio value={2}>一周</Radio>
            <Radio value={3} className={styles.all}>全部</Radio>
          </RadioGroup>
        </Col>
        <Col span={1}>
          <Button
            icon="search"
            onClick={reformContentService.onReveresSource}
            className={styles.searchBtn}
          >
            查询
          </Button>
        </Col>
      </Row>
    )
  }
}