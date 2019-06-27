/**
 * Created by oakm on 2017/12/12.
 */
import * as React from 'react'
import * as style from './style/patient-head.scss'
import { TimePicker } from 'pkg/common/timePicker'
import { HintInput } from 'pkg/common/input'
import { SelectItem } from 'pkg/ui/SelectItem'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { ApiDictState, patientHeadService } from 'service/triage/patient-list/patient-head/index'
import { patientConenteService } from 'service/triage/patient-list/patient-conente'
import { Button, Layout, Radio } from 'antd'
import { InputTable } from 'pkg/common/inputTable'
import { JsonUtil } from 'tools/api/JsonUtil'
import { Rounded } from 'pkg/common/rounded'
import {IconFont} from 'pkg/common/icon'
import className from 'classnames'

const Option = SelectItem.Option
const { Header } = Layout

export default class PatientHead extends FluxComponent<ApiDictState> {
    title = '患者列表title'
    patientHeadService = patientHeadService

    render() {
        let {
            chargeTypeList, staffDictColumns, staffDict,
            identityList, triageTargetList, triageGistList, greenRoadList, criterionMainIdList, model
        } = this.state
        return (
            <div className={style.plHead}>
                <Header>
                    <div className={style.plHeadOne}>
                        <Radio.Group defaultValue="全部病人"
                                     value={model.actTriageLevel}
                                     onChange={patientHeadService.setStateJson.bind(this, 'model.actTriageLevel')}
                                     className={style.radioGroupsStyle}
                        >
                            <Radio.Button value="120病人" className={style.radioBtnL}>120病人</Radio.Button>
                            <Radio.Button value="未分诊" className={style.radioBtnL}>未分诊</Radio.Button>
                            <Radio.Button value="全部病人" className={style.radioBtnL}>全部病人</Radio.Button>
                            <Radio.Button value="红区" className={className(style.radioBtnS, style.red)}>红区</Radio.Button>
                            <Radio.Button value="黄区" className={className(style.radioBtnS, style.yellow)}>黄区</Radio.Button>
                            <Radio.Button value="绿区" className={className(style.radioBtnS, style.green)}>绿区</Radio.Button>
                        </Radio.Group>
                        <TimePicker
                            isRange={true}
                            className={style.plHeadTime}
                            oValue={JsonUtil.getJsonByKey('triageDateStart', model)}
                            oValue2={JsonUtil.getJsonByKey('triageDateEnd', model)}
                            startPlaceholder="请输入开始时间"
                            endPlaceholder="请输入结束时间"
                            dateChange={patientHeadService.onChangeTime}
                        />
                        <div className={style.plHeadInputTxt}>
                            <HintInput
                                placeholder={'请输入患者信息'}
                                style={{ width: '100%', height: 30, float: 'left' }}
                                className={style.plHeadTxt}
                                value={model.name}
                                onChange={patientHeadService.setStateJson.bind(this, 'model.name')}
                            />
                        </div>
                        <SelectItem
                            labelVal={'费别'}
                            labelClass={style.ptHeadLabel}
                            selectClass={style.ptHeadSelect}
                            selectItemClass={style.HeadSelItem}
                            value={model ? model.chargeType : ''}
                            onChange={patientHeadService.setStateJson.bind(this, 'model.chargeType')}
                            showSearch={true}
                            allowClear={true}
                        >
                            {
                                chargeTypeList ? chargeTypeList.map(data => <Option key={data.key}
                                                                                    value={data.key}>{data.value}</Option>) : null}
                        </SelectItem>
                        <SelectItem
                            labelVal={'去向'}
                            labelClass={style.ptHeadLabel}
                            selectClass={style.ptHeadSelect}
                            selectItemClass={style.HeadSelItem}
                            value={model ? model.triageTarget : ''}
                            onChange={patientHeadService.setStateJson.bind(this, 'model.triageTarget')}
                            showSearch={true}
                            allowClear={true}
                        >
                            {triageTargetList ?
                                triageTargetList.map(data => <Option key={data.key}
                                                                     value={data.key}>{data.value}</Option>)
                                : null}
                        </SelectItem>
                    </div>
                    <div className={style.plHeadTwo}>
                        <SelectItem
                            labelVal={'绿色通道'}
                            labelClass={style.ptHeadLabel}
                            selectClass={style.ptHeadSelect}
                            selectItemClass={`${style.HeadSelItemGreen} ${style.HeadSelItem}`}
                            value={model ? model.greenRoad : []}
                            onChange={patientHeadService.setStateJson.bind(this, 'model.greenRoad')}
                            mode="tags"
                            showSearch={true}
                            allowClear={true}
                        >
                            {greenRoadList ? greenRoadList.map(data => (
                                <Option key={data.key} value={data.key}>{data.value}</Option>
                            )) : null}
                        </SelectItem>
                        <SelectItem
                            labelVal={'分诊依据'}
                            labelClass={`${style.ptHeadLabel} ${style.plHeadLabelTriage}`}
                            selectClass={`${style.ptHeadSelect} ${style.plHeadSelectTriage}`}
                            selectItemClass={`${style.HeadSelItemTriage} ${style.HeadSelItem}`}
                            value={model ? (model.criterionItemId ? model.criterionItemId + '' : '') : ''}
                            onSearch={patientHeadService.loadMhCriterionItemDict}
                            onFocus={patientHeadService.loadMhCriterionItemDict}
                            onChange={patientHeadService.setStateJson.bind(this, 'model.criterionItemId')}
                            showSearch={true}
                            allowClear={true}
                        >
                            {triageGistList ? triageGistList.map(data => <Option key={data.key}
                                                                                 value={data.key}>{data.value}</Option>) : null}
                        </SelectItem>
                        <SelectItem
                            labelVal={'身份'}
                            labelClass={style.ptHeadLabel}
                            selectClass={style.ptHeadSelect}
                            selectItemClass={style.HeadSelItem}
                            value={model ? model.identity : ''}
                            showSearch={true}
                            allowClear={true}
                            onChange={patientHeadService.setStateJson.bind(this, 'model.identity')}
                        >
                            {
                                identityList ? identityList.map(data => <Option key={data.key}
                                                                                value={data.key}>{data.value}</Option>) : null}
                        </SelectItem>
                        <SelectItem
                            labelVal={'主诉'}
                            labelClass={style.ptHeadLabel}
                            selectClass={style.ptHeadSelect}
                            selectItemClass={style.HeadSelItem}
                            value={model ? (model.criterionMainId ? model.criterionMainId + '' : '') : ''}
                            onSearch={patientHeadService.loadMhCriterionMainDict}
                            onFocus={patientHeadService.loadMhCriterionMainDict}
                            showSearch={true}
                            allowClear={true}
                            onChange={patientHeadService.setStateJson.bind(this, 'model.criterionMainId')}
                        >
                            {criterionMainIdList ? criterionMainIdList.map
                            (data => <Option key={data.key} value={data.key}>{data.value}</Option>) : null
                            }
                        </SelectItem>
                        <Rounded
                            className={`${style.ptHeadLabel} ${style.userOperator}`}
                            leftShow={'操作者'}>
                            <InputTable
                                data={staffDict}
                                option={{
                                    total: staffDict.total,
                                    columns: staffDictColumns,
                                    pageSize: 7,
                                    showValue: 'value',
                                    multiSaveKey: 'key'
                                }}
                                maxHeight={185}
                                oValue={JsonUtil.getJsonByKey('triageBy', model)}
                                callBackMethods={(e: any) => {
                                    patientHeadService.setStateJson('model.triageBy', e.value)
                                    switch (e.type) {
                                        case 'blurEvent':
                                        case 'enterEvent':
                                            break
                                        default:
                                            patientHeadService.loadStaffDict(
                                                {
                                                    startIndex: e.pageCurrent,
                                                    pageSize: e.pageSize
                                                },
                                                e.value)
                                            break
                                    }
                                }}
                            />
                        </Rounded>
                        <div className={style.plHeadBtn}>
                            <Button type="primary"
                                    className={`${style.plHeadBtnSearch} ${style.plHeadBtns}`}
                                    onClick={patientConenteService.onReverSource}>
                                <IconFont iconName={'icon-sousuo-'}/>{'查询'}
                            </Button>
                            <Button
                                    className={`${style.plHeadBtnClear} ${style.plHeadBtns}`}
                                    onClick={patientHeadService.onchange}>
                                <IconFont iconName={'icon-qingkong1'}/>{'清空'}
                            </Button>
                            <Button onClick={patientConenteService.expCsv}
                                    className={style.plHeadBtnExport}>
                                <IconFont iconName={'icon-iocnchexiao'}/>{'全部导出'}
                            </Button>
                        </div>
                    </div>
                </Header>
            </div>
        )
    }
}