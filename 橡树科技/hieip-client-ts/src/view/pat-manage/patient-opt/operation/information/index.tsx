import React from 'react'
import { LabelBox } from 'pkg/ui/labelBox'
import { Information as Info } from 'pkg/ui/information'
import { HintInput } from 'pkg/common/input'
import { Select } from 'pkg/common/select'
import { TimePicker } from 'pkg/common/timePicker'
import { RadioGroup } from 'pkg/common/radioGroup'
import styles from './style/index.scss'
import { InputTable } from 'pkg/common/inputTable'
import { Input, Tooltip } from 'antd'
// service
import { FluxComponent } from 'tools/flux/FluxComponent'
import { informationService, InformationState } from 'service/pat-manage/patien-opt/operation/information'
import { tableService } from 'service/pat-manage/patien-opt/operation/table'

const Option = Select.Option

// 手术助手
const assistant = [
    {
        title: '助手1',
        position: 'doctorDict',
        field: 'submitData.firstAssistant',
        showField: 'submitData.firstAssistant.name',
        dataType: {
            id: 'key',
            name: 'value'
        },
        showType: 'name'
    },
    {
        title: '助手2',
        position: 'doctorDict',
        field: 'submitData.secondAssistant',
        showField: 'submitData.secondAssistant.name',
        dataType: {
            id: 'key',
            name: 'value'
        },
        showType: 'name'
    },
    {
        title: '助手3',
        position: 'doctorDict',
        field: 'submitData.thirdAssistant',
        showField: 'submitData.thirdAssistant.name',
        dataType: {
            id: 'key',
            name: 'value'
        },
        showType: 'name'
    },
    {
        title: '助手4',
        position: 'doctorDict',
        field: 'submitData.fourthAssistant',
        showField: 'submitData.fourthAssistant.name',
        dataType: {
            id: 'key',
            name: 'value'
        },
        showType: 'name'
    }
]
// 麻醉信息
const anaesthesia = [
    {
        title: '麻醉方式',
        position: 'anaesthesiaDict',
        field: 'submitData.anesthesiaMethod',
        showField: 'submitData.anesthesiaMethod',
        dataType: 'string',
        asterisk:true,
    },
    {
        title: '麻醉医生',
        position: 'doctorDict',
        field: 'submitData.anesthesiaDoctor',
        showField: 'submitData.anesthesiaDoctor.name',
        dataType: {
            id: 'key',
            name: 'value'
        },
        showType: 'name',
        asterisk:false
    },
    {
        title: '麻醉助手',
        position: 'doctorDict',
        field: 'submitData.anesthesiaAssistant',
        showField: 'submitData.anesthesiaAssistant.name',
        dataType: {
            id: 'key',
            name: 'value'
        },
        showType: 'name',
        asterisk:false
    },
]

export default class Information extends FluxComponent<InformationState> {

    title:  '手术申请-基本信息'
    informationService = informationService

    // inputTable每页显示数据条数
    pageSize = 7
    // inputTable默认显示哪一列 对应columns的option的field的值
    showValue = 'value'

    /**
     * 手术助手
     */
    surgicalAssistant(state) {
        return assistant.map((item, key) =>
            <LabelBox
                key={key}
                text={item.title}
                asterisk={false}
                className={styles.assistant}
                className2={styles.assistantSpan}
                labelWidth={46}>
                <InputTable
                    data={state[item.position] ? state[item.position] :  []}
                    option={{
                        total:  state[item.position].total ? state[item.position].total :  0,
                        columns:  state[`${item.position}Columns`] ? state[`${item.position}Columns`] :  [],
                        pageSize:  this.pageSize,
                        showValue:  this.showValue
                    }}
                    callBackMethods={(event) => {
                        informationService.callBackMethods(event, item, '')
                    }}
                    oValue={informationService.getJsonByKey(item.showField, state)}
                    className={styles.inputTableStyle}
                />
            </LabelBox>)
    }

    /**
     * 麻醉信息
     */
    anaesthesiaInfo(state) {
        return anaesthesia.map((item, key) =>
            <LabelBox
                key={key}
                text={item.title}
                className={styles.assistant}
                className2={styles.assistantSpan}
                labelWidth={64}
                asterisk={item.asterisk}
            >
                <InputTable
                    data={state[item.position] ? state[item.position] :  []}
                    option={{
                        total:  state[item.position].total ? state[item.position].total :  0,
                        columns:  state[`${item.position}Columns`] ? state[`${item.position}Columns`] :  [],
                        pageSize:  this.pageSize,
                        showValue:  this.showValue
                    }}
                    callBackMethods={(event) => {
                        informationService.callBackMethods(event, item, '')
                    }}
                    oValue={informationService.getJsonByKey(item.showField, state)}
                    className={styles.inputTableStyle}
                />
            </LabelBox>)
    }

    /**
     * 页面
     */
    content(state) {
        return [
            // inputTable
            {
                text:  '术前诊断',
                asterisk:  true,
                col:  24,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component:
                    <InputTable
                        data={state.diagnosisDict ? state.diagnosisDict :  []}
                        option={{
                            total:  state.diagnosisDict.total ? state.diagnosisDict.total :  0,
                            columns:  state.diagnosisDictColumns ? state.diagnosisDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue,
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'diagnosisDict',
                                field: 'submitData.clinicDiag',
                                dataType: 'string'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.clinicDiag', state)}
                        className={styles.inputTableStyle}
                        // oValue={!state.submitData ? '' :  state.submitData.operatingRoom ? state.submitData.operatingRoom :  ''}
                    />
            },
            // select
            {
                text:  '病情',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <Select
                        allowClear={true}
                        showSearch={true}
                        className={styles.select}
                        onChange={((key, option) => {
                            if(key===undefined){
                                informationService.selectSetValue(
                                    '',
                                    {props:{children:''}},
                                    'submitData.patientCondition'
                                )
                            }else{
                                informationService.selectSetValue(
                                    key,
                                    option,
                                    'submitData.patientCondition'
                                )
                            }
                        }) as any}
                        value={state.submitData.patientCondition ? state.submitData.patientCondition :  ''}
                        data={state.loadPatientStatusDict ? state.loadPatientStatusDict :  []}
                        dataOption={{ inputCode:  'inputCode', key:  'key', value:  'value' }}
                        filterOption={(input, option:  any) => {
                            return informationService.filterOption(input, option, 'loadPatientStatusDict')
                        }}
                    />
            },
            // timePicker
            {
                text:  '手术时间',
                asterisk:  true,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <div className={styles.timePicker}>
                        <TimePicker
                            oValue={ !state.submitData ? new Date() : 
                                        state.submitData.scheduledDateTime ? state.submitData.scheduledDateTime : 
                                            new Date()}
                            dateChange={(v) => informationService.chooseDate(
                                v,
                                'submitData.scheduledDateTime'
                            )}
                        />
                    </div>
            },
            // inputTable
            {
                text:  '手术室',
                asterisk:  true,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.operatingRoomDict ? state.operatingRoomDict :  []}
                        option={{
                            total:  state.operatingRoomDict.total ? state.operatingRoomDict.total :  0,
                            columns:  state.operatingRoomDictColumns ? state.operatingRoomDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'operatingRoomDict',
                                field: 'submitData.operatingRoom',
                                dataType: {
                                    id: 'key',
                                    deptName: 'value'
                                },
                                showType: 'deptName'
                            },
                            'submitData.operatingRoomNo'
                        )}}
                        oValue={informationService.getJsonByKey('submitData.operatingRoom.deptName',state)}
                        className={styles.inputTableStyle}
                    />
            },
            // select
            {
                text:  '手术间',
                asterisk:  true,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <Select
                        allowClear={true}
                        showSearch={true}
                        className={styles.select}
                        onChange={((key, option) => {
                            if(key===undefined){
                                informationService.selectSetValue(
                                    '',
                                    {props:{children:''}},
                                    'submitData.operatingRoomNo'
                                )
                            }else{
                                informationService.selectSetValue(
                                    key,
                                    option,
                                    'submitData.operatingRoomNo'
                                )
                            }
                        }) as any}
                        value={state.submitData.operatingRoomNo ? state.submitData.operatingRoomNo :  ''}
                        data={state.operatingRoomNo ? state.operatingRoomNo :  []}
                        dataOption={{ inputCode:  'inputCode', key:  'key', value:  'value' }}
                        filterOption={(input, option:  any) => {
                            return informationService.filterOption(input, option, 'operatingRoomNo')
                        }}
                    />
            },
            // 数字输入框
            {
                text:  '台次',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <NumericInput value={state.submitData.sequence}
                                  onChange={(value)=>informationService.onChange(value,'submitData.sequence')}
                                  maxLength="1"
                                  className={styles.NumericInput}
                    />
            },
            // inputTable
            {
                text:  '手术体位',
                asterisk:  true,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.operationPositionDict ? state.operationPositionDict :  []}
                        option={{
                            total:  state.operationPositionDict.total ? state.operationPositionDict.total :  0,
                            columns:  state.operationPositionDictColumns ? state.operationPositionDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'operationPositionDict',
                                field: 'submitData.opsBodyPart',
                                dataType: 'string',
                            },
                            ''
                        )}}
                        oValue={!state.submitData ? '' :  state.submitData.opsBodyPart ? state.submitData.opsBodyPart :  ''}
                        className={styles.inputTableStyle}
                    />
            },
            // inputTable
            {
                text:  '手术科室',
                asterisk:  true,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.deptDict ? state.deptDict :  []}
                        option={{
                            total:  state.deptDict.total ? state.deptDict.total :  0,
                            columns:  state.deptDictColumns ? state.deptDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'deptDict',
                                field: 'submitData.operatingDept',
                                dataType: {
                                    id: 'key',
                                    deptName: 'value'
                                },
                                showType: 'deptName'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.operatingDept.deptName', state)}
                        className={styles.inputTableStyle}
                    />
            },
            // inputTable
            {
                text:  '手术医生',
                asterisk:  true,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.doctorDict ? state.doctorDict :  []}
                        option={{
                            total:  state.doctorDict.total ? state.doctorDict.total :  0,
                            columns:  state.doctorDictColumns ? state.doctorDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'doctorDict',
                                field: 'submitData.surgeon',
                                dataType: {
                                    id: 'key',
                                    name: 'value'
                                },
                                showType: 'name'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.surgeon.name', state)}
                        className={styles.inputTableStyle}
                    />
            },
            // select
            {
                text:  '输/供血方式',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                <Select
                    allowClear={true}
                    showSearch={true}
                    className={styles.select}
                    onChange={((key, option) => {
                        if(key===undefined){
                            informationService.selectSetValue(
                                '',
                                {props:{children:''}},
                                'submitData.provideWay'
                            )
                        }else{
                            informationService.selectSetValue(
                                key,
                                option,
                                'submitData.provideWay'
                            )
                        }
                    }) as any}
                    value={state.submitData.provideWay ? state.submitData.provideWay :  ''}
                    data={state.provideWay ? state.provideWay :  []}
                    dataOption={{ inputCode:  'inputCode', key:  'key', value:  'value' }}
                    filterOption={(input, option:  any) => {
                        return informationService.filterOption(input,option,'provideWay')
                    }}
                />
            },
            // radioGroup
            {
                text:  '隔离标志',
                asterisk:  false,
                col:  7,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component:
                    <RadioGroup
                        className={styles.radioGroup}
                        data={state.isolationIndicator ? state.isolationIndicator :  []}
                        dataOption={{ value:  'value', key:  'key' }}
                        onChange={(event)=>informationService.radioChange(
                            event,
                            'submitData.isolationIndicator'
                        )}
                        value={state.submitData.isolationIndicator ? state.submitData.isolationIndicator :  1}
                    />
            },
            // radioGroup
            {
                text:  '申请标志',
                asterisk:  false,
                col:  11,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <RadioGroup
                        className={styles.radioGroup}
                        data={state.emergencyIndicator ? state.emergencyIndicator :  []}
                        dataOption={{ value:  'value', key:  'key' }}
                        onChange={(event)=>informationService.radioChange(
                            event,
                            'submitData.emergencyIndicator'
                        )}
                        value={state.submitData.emergencyIndicator ? state.submitData.emergencyIndicator :  0}
                    />
            },
            // input
            {
                text:  '申请时间',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <input
                        className={styles.readonly}
                        readOnly={true}
                        value={state.applyTime ? state.applyTime :  ''}
                    />
            },
            // input
            {
                text:  '申请医生',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <input
                        className={styles.readonly}
                        readOnly={true}
                        value={this.informationService.getJsonByKey('submitData.applyDoctor.name',state)}
                    />
            },
            // 数字输入框
            {
                text:  'ASA',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <NumericInput value={state.submitData.asa}
                                  onChange={(value)=>informationService.onChange(value, 'submitData.asa')}
                                  maxLength="2"
                                  className={styles.NumericInput}
                    />
            },
            // InputTable
            {
                text:  '输血医生',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.doctorDict ? state.doctorDict :  []}
                        option={{
                            total:  state.doctorDict.total ? state.doctorDict.total :  0,
                            columns:  state.doctorDictColumns ? state.doctorDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue,
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'doctorDict',
                                field: 'submitData.bloodTranDoctor',
                                dataType: 'string'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.bloodTranDoctor', state)}
                        className={styles.inputTableStyle}
                    />
            },
            // InputTable
            {
                text:  '手术助手',
                asterisk:  false,
                col:  24,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component:  this.surgicalAssistant(state)
            },
            // InputTable
            {
                text:  '麻醉信息',
                asterisk:  false,
                col:  18,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component:  this.anaesthesiaInfo(state)
            },
            // InputTable
            {
                text:  '第一台护士',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.nurseDict ? state.nurseDict :  []}
                        option={{
                            total:  state.nurseDict.total ? state.nurseDict.total :  0,
                            columns:  state.nurseDictColumns ? state.nurseDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'nurseDict',
                                field: 'submitData.firstOperationNurse',
                                dataType: {
                                    id: 'key',
                                    name: 'value'
                                },
                                showType: 'name'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.firstOperationNurse.name', state)}
                        className={styles.inputTableStyle}
                    />
            },
            // InputTable
            {
                text:  '第二台护士',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan,
                component: 
                    <InputTable
                        data={state.nurseDict ? state.nurseDict :  []}
                        option={{
                            total:  state.nurseDict.total ? state.nurseDict.total :  0,
                            columns:  state.nurseDictColumns ? state.nurseDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'nurseDict',
                                field: 'submitData.secondOperationNurse',
                                dataType: {
                                    id: 'key',
                                    name: 'value'
                                },
                                showType: 'name'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.secondOperationNurse.name', state)}
                        className={styles.inputTableStyle}
                    />
            },
            // InputTable
            {
                text:  '第一供应护士',
                asterisk:  false,
                col:  6,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan2,
                component: 
                    <InputTable
                        data={state.nurseDict ? state.nurseDict :  []}
                        option={{
                            total:  state.nurseDict.total ? state.nurseDict.total :  0,
                            columns:  state.nurseDictColumns ? state.nurseDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'nurseDict',
                                field: 'submitData.firstSupplyNurse',
                                dataType: {
                                    id: 'key',
                                    name: 'value'
                                },
                                showType: 'name'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.firstSupplyNurse.name', state)}
                        className={styles.inputTableStyle}
                    />
            },
            // InputTable
            {
                text:  '第二供应护士',
                asterisk:  false,
                col:  12,
                labelWidth:  86,
                labelClassName:  styles.labelBoxSpan2,
                component: 
                    <InputTable
                        data={state.nurseDict ? state.nurseDict :  []}
                        option={{
                            total:  state.nurseDict.total ? state.nurseDict.total :  0,
                            columns:  state.nurseDictColumns ? state.nurseDictColumns :  [],
                            pageSize:  this.pageSize,
                            showValue:  this.showValue
                        }}
                        callBackMethods={(event) => {informationService.callBackMethods(
                            event,
                            {
                                position: 'nurseDict',
                                field: 'submitData.secondSupplyNurse',
                                dataType: {
                                    id: 'key',
                                    name: 'value'
                                },
                                showType: 'name'
                            },
                            ''
                        )}}
                        oValue={informationService.getJsonByKey('submitData.secondSupplyNurse.name', state)}
                        className={styles.inputTableStyle}
                    />
            }
        ]
    }

    render() {
        const { state } = this
        return (
            <Info data={this.content(state)} className={tableService.state.isOpen ? styles.isOpen : null}/>
        )
    }
}

// 数字输入框
// 提示框函数
// function formatNumber(value) {
//     value += ''
//     const list = value.split('.')
//     const prefix = list[0].charAt(0) === '-' ? '-' :  ''
//     let num = prefix ? list[0].slice(1) :  list[0]
//     let result = ''
//     while (num.length > 3) {
//         result = `,${num.slice(-3)}${result}`
//         num = num.slice(0, num.length - 3)
//     }
//     if (num) {
//         result = num + result
//     }
//     return `${prefix}${result}${list[1] ? `.${list[1]}` :  ''}`
// }

class NumericInput extends React.Component<any, any> {
    onChange = (e) => {
        const { value } = e.target
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value)
        }
    }

    onBlur = () => {
        const { value, onBlur, onChange } = this.props
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            onChange({ value:  value.slice(0, -1) })
        }
        if (onBlur) {
            onBlur()
        }
    }

    render() {
        //   const { value } = this.props
        //   const title = value ? (
        //       <span className="numeric-input-title">
        //   {value !== '-' ? formatNumber(value) :  '-'}
        // </span>
        //   ) :  'Input'
        return (
            <Tooltip
                // trigger={'focus'}
                // title={title}
                // placement="topLeft"
                // overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    className={this.props.className}
                    // onBlur={this.onBlur}
                    placeholder="输入一个数字"
                />
            </Tooltip>
        )
    }
}