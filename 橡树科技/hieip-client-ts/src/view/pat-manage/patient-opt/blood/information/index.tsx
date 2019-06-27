import React from 'react'
import { Checkbox } from 'antd'
import { Information as Info } from 'pkg/ui/information'
import { LabelBox } from 'pkg/ui/labelBox'
import { HintInput } from 'pkg/common/input'
import { Select } from 'pkg/common/select'
import { TimePicker } from 'pkg/common/timePicker'
import { RadioGroup } from 'pkg/common/radioGroup'
import styles from './style/index.scss'

const Option = Select.Option
import {NumberInput} from 'pkg/common/number-input'

// service
import { FluxComponent } from 'tools/flux/FluxComponent'
import { informationService, InformationState } from 'service/pat-manage/patien-opt/blood/information'

// 患者已知情
const informed = [
    { name: '患者已知情,并签名同意', value: '1' }, { name: '无法取得患者知情同意', value: '2' }
]
// 属地
const apanage = [
    { name: '市区', value: '1' },
    { name: '郊县', value: '2' },
    { name: '外省市', value: '3' },
    { name: '港澳台', value: '4' },
    { name: '外国人', value: '5' }
]
// 输血目的
const bloodCause = [
    { name: '手术', value: '手术' },
    { name: '治疗', value: '治疗' }
]
// 血源
const bloodInuse = [
    { name: '血库', value: '血库' },
    { name: '自体', value: '自体' },
    { name: '互助', value: '互助' }
]
// 感染项检测
const hcvHivData = [
    { name: '抗-HIV', value: 'hiv' },
    { name: '抗-HCV', value: 'hcv' },
    { name: '梅毒试验', value: 'syphilisTest' },
    { name: 'HBsAg', value: 'hbsag' }
]
// 不规则抗体筛查
const irregularAntibodyScreening = [
    { name: '是', value: '1' },
    { name: '否', value: '0' }
]

export default class Information extends FluxComponent<InformationState> {
    title = '用血.基本信息表格information'
    informationService = informationService

  /**
   * 页面
   */
  content(state) {
    const {
      informationData,
      bloodTypeData,
      bloodTypeRhData,
      historyData,
    } = this.state
    return [
      {
        text: '',
        asterisk: false,
        col: 5,
        labelWidth: 86,
        labelStyle: {textIndent: '0px'},
        labelClassName: styles.labelBoxSpan,
        component: <div>
          <Checkbox className={`${styles.checkBox} ${styles.redCheckbox} ${styles.espCheckBox}`}
                    checked={Boolean(informationData.priorityIndicator)}
                    onChange={informationService.urgentChange}>急</Checkbox>
          <Checkbox className={styles.checkBox}
                    checked={Boolean(Number(informationData.bloodPaperIndicator))}
                    onChange={informationService.bloodPaperIndicatorChange}>献血证</Checkbox></div>
      }, {
        text: '知情同意',
        asterisk: false,
        col: 13,
        labelWidth: 86,
        labelStyle: {textIndent: '17px'},
        labelClassName: styles.labelBoxSpan,
        component: <RadioGroup className={styles.radioGroup}
                               data={informed}
                               dataOption={{value: 'name', key: 'value'}}
                               onChange={informationService.noticeChange}
                               value={informationData.notice}/>
      }, {
        text: '白细胞',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '23px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                onChange={informationService.leucocyteChange}
                                value={informationData.leucocyte || ''}/>
      }, {
        text: '属地',
        asterisk: false,
        col: 12,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <RadioGroup className={styles.radioGroup}
                               data={apanage}
                               dataOption={{value: 'name', key: 'value'}}
                               onChange={informationService.apanageChange}
                               value={informationData.apanage}/>
      }, {
        text: '血型',
        asterisk: true,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '19px'},
        labelClassName: styles.labelBoxSpan,
        component: <Select showSearch={true}
                           value={informationData.bloodType ? informationData.bloodType.id.toString() : ''}
                           dropdownClassName={styles.dropDownMenu}
                           className={styles.select}
                           onSelect={informationService.bloodTypeChange}
                           data={bloodTypeData}
                           dataOption={{value: 'value', key: 'key', inputCode: 'inputCode'}}
                           filterOption={(input, option) => informationService.filterOption(input, option, bloodTypeData)}/>
      }, {
        text: 'RH',
        asterisk: true,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '23px'},
        labelClassName: styles.labelBoxSpan,
        component: <Select showSearch={true}
                           value={informationData.bloodTypeRh ? informationData.bloodTypeRh.id.toString() : ''}
                           dropdownClassName={styles.dropDownMenu}
                           className={styles.select}
                           onSelect={informationService.bloodTypeRhChange}
                           data={bloodTypeRhData}
                           dataOption={{value: 'value', key: 'key', inputCode: 'inputCode'}}
                           filterOption={(input, option) => informationService.filterOption(input, option, bloodTypeRhData)}/>
      }, {
        text: '输血孕产史',
        asterisk: false,
        col: 12,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <div className={styles.checkBoxInputWrap}>
          {
            historyData.map((item, i) => {
              return (
                <div key={i} className={styles.checkBoxInput}>
                  <Checkbox className={`${styles.checkBox}`}
                            checked={!item.disable}
                            onChange={(e) => {
                              informationService.historyCheckBox(e, item.id)
                            }}>{item.name}</Checkbox>
                  <NumberInput classname1={styles.smallInputwrap}
                               className={styles.smallinput}
                               value={item.value || ''}
                               onChange={(v) => {
                                 informationService.historyInput(v, item.id)
                               }}
                               disabled={item.disable}/>
                </div>
              )
            })
          }
        </div>
      }, {
        text: '输血目的',
        asterisk: false,
        col: 12,
        labelWidth: 86,
        labelStyle: {textIndent: '19px'},
        labelClassName: styles.labelBoxSpan,
        component: <RadioGroup className={styles.radioGroup} data={bloodCause}
                               dataOption={{value: 'name', key: 'value'}}
                               onChange={informationService.bloodCauseChange}
                               value={informationData.bloodCause}/>
      }, {
        text: '输血反应禁忌',
        asterisk: false,
        col: 18,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <HintInput className1={styles.input}
                              onChange={informationService.bloodTabooChange}
                              value={informationData.bloodTaboo}/>
      }, {
        text: 'ALT',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '23px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                isfloat={true}
                                onChange={informationService.altChange}
                                onBlur={informationService.altBlur}
                                value={informationData.alt || ''}/>
      }, {
        text: 'HBeAg',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                onChange={informationService.hbeagChange}
                                value={informationData.hbeag || ''}/>
      }, {
        text: 'HBsAb',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '17px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                onChange={informationService.hbsabChange}
                                value={informationData.hbsab || ''}/>
      }, {
        text: 'HBcAb',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '19px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                onChange={informationService.hbcabChange}
                                value={informationData.hbcab || ''}/>
      }, {
        text: 'HBeAb',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '23px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                onChange={informationService.hbeabChange}
                                value={informationData.hbeab || ''}/>
      }, {
        text: '血红蛋白',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                isfloat={true}
                                onChange={informationService.hematinChange}
                                onBlur={informationService.hematinBlur}
                                value={informationData.hematin || ''}/>
      }, {
        text: '血小板',
        asterisk: false,
        col: 6,
        labelWidth: 86,
        labelStyle: {textIndent: '17px'},
        labelClassName: styles.labelBoxSpan,
        component: <NumberInput classname1={styles.input}
                                onChange={informationService.plateletChange}
                                value={informationData.platelet || ''}/>
      }, {
        text: '血源',
        asterisk: false,
        col: 12,
        labelWidth: 86,
        labelStyle: {textIndent: '19px'},
        labelClassName: styles.labelBoxSpan,
        component: <RadioGroup className={styles.radioGroup}
                               data={bloodInuse}
                               dataOption={{value: 'name', key: 'value'}}
                               onChange={informationService.bloodInuseChange}
                               value={informationData.bloodInuse}/>
      }, {
        text: '感染项检测',
        asterisk: false,
        col: 24,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <div className={styles.hcvHiv}>
          {
            hcvHivData.map((item,i)=>{
              return (
                <LabelBox
                  key={i}
                  text={item.name}
                  className={styles.assistant}
                  className2={styles.assistantSpan}
                  labelWidth={i===2?60:50}
                  >
                  <HintInput className2={styles.assistantInput}
                             value={informationData[item.value]}
                             onChange={(e)=>informationService.hcvHivChange(e,item.value)}/>
                </LabelBox>
              )
            })
          }
        </div>
      }, {
        text: '末次输血时间',
        asterisk: false,
        col: 12,
        labelWidth: 86,
        labelStyle: {textIndent: '5px'},
        labelClassName: styles.labelBoxSpan,
        component: <div className={styles.timePicker}>
          <TimePicker oValue={informationData.lastBloodDate || ''}
                      dateChange={informationService.lastBloodDateChange}/>
        </div>
      }, {
        text: '不规则抗体筛查',
        asterisk: false,
        col: 12,
        labelWidth: 121,
        labelStyle: {textIndent: '18px'},
        labelClassName: styles.labelBoxSpan,
        component: <RadioGroup className={styles.radioGroup}
                               data={irregularAntibodyScreening}
                               dataOption={{value: 'name', key: 'value'}}
                               onChange={informationService.informationService}
                               value={informationData.irregularAntibodyScreening}/>
      }
    ]
  }

  render() {
    const state = this.state
    return (
      <div className={state.isDisable ? `${styles.bloodCursorDisable} ${styles.informationWrap}`:`${styles.informationWrap}`}>
        <Info className={state.isDisable ?`${styles.information} ${styles.informationDisable}`:`${styles.information}`}
              data={this.content(state)}
        />
      </div>
    )
  }
}