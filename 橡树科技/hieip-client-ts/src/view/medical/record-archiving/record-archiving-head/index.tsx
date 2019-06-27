import * as React from 'react'
import style from './style/index.scss'
import {Input, Layout, Select, Radio, Button} from 'antd'
import {TimePicker} from 'pkg/common/timePicker'
import {IconFont} from 'pkg/common/icon'
import {InputTable} from 'pkg/common/inputTable'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {recordArchivingService, RecordArchivingState} from 'service/medical/record-archiving/index'
import {Rounded} from 'pkg/common/rounded'

const {Header} = Layout
const Option = Select.Option

export default class RecordArchivingHeadView extends FluxComponent<RecordArchivingState> {
    title = 'RecordArchivingHeadView'
    recordArchivingService = recordArchivingService

    render() {
        const {
            begin,
            end,
            status,
            inputData,
            total,
            inputLength,
            inputTitle,
            inputTableData,
            deptObjectCode
        } = this.state
        return (
            <div className={style.recordArchHead}>
                <Header>
                    <div className={style.selectTime}>
                        <Select
                            onChange={(v) => recordArchivingService.onDateChange(v, 'pitchon')}
                            className={style.sel}
                            defaultValue="1"
                        >
                            <Option value="1">出院时间</Option>
                            <Option value="2">签收时间</Option>
                        </Select>
                        <TimePicker
                            isRange={true}
                            className={style.rangetime}
                            startPlaceholder={'开始时间'}
                            endPlaceholder={'结束时间'}
                            dateChange={(v) => recordArchivingService.onTimesChange(v)}
                            oValue={begin}
                            oValue2={end}
                        />
                    </div>
                    <Input
                        placeholder={'住院号/患者ID'}
                        value={inputData}
                        onChange={(e) => recordArchivingService.onDateChange(e, 'inputData')}
                        onPressEnter={() => recordArchivingService.onReverSource()}
                        className={style.inputBox}/>
                    <Rounded leftShow={'科室'} className={style.selItemSel} style={{float: 'left'}}>
                        <InputTable
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
                            callBackMethods={(v) => recordArchivingService.showMessage(v)}
                        />
                    </Rounded>
                    {/*<div className={style.radioGroup}>*/}
                    {/*<span className={style.radioLabel}>是否归档:</span>*/}
                    {/*<RadioGroup*/}
                    {/*data={[*/}
                    {/*{name: '归档', key: 2},*/}
                    {/*{name: '未归档', key: 0}*/}
                    {/*]}*/}
                    {/*dataOption={{value: 'name', key: 'key'}}*/}
                    {/*value={status === 1 ? 0 : status}*/}
                    {/*onChange={(e) => recordArchivingService.onRadioChange(e)}/>*/}
                    {/*</div>*/}
                    <div className={style.radioGroup}
                         style={{lineHeight: '30px'}}>
                        <span className="show">
                            <label className={style.radioLabel}>是否归档：</label>
                            <Radio.Group value={status}
                                         onChange={(v) => recordArchivingService.onRadioChange(v)}
                            >
                            <Radio value={2}>归档</Radio>
                            <Radio value={0}>未归档</Radio>
                          </Radio.Group>
                        </span>
                    </div>
                    <Button
                        className={`${style.btn} ${style.greenBtn} ${style.searchBtn}`}
                        onClick={() => recordArchivingService.onReverSource()}
                    >
                        <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                        <span>查询</span>
                    </Button>
                    <Button
                        className={`${style.btn} ${style.greenBtn} ${status === 2 ? style.width90 : ''}`}
                        onClick={() => recordArchivingService.onPigeonholeChange()}
                    >
                        <IconFont iconName={'icon-jiexi'} hover={true}/>
                        <span>{status === 2 ? '取消归档' : '归档'}</span>
                    </Button>
                    <Button
                        className={`${style.btn} ${style.greenBtn} ${status === 2 ? style.width90 : ''}`}
                        onClick={() => recordArchivingService.onPigeonholeChange()}
                    >
                        <IconFont iconName={'icon-zicaidan_hover'} hover={true}/>
                        <span>{status === 2 ? '取消群归' : '群归'}</span>
                    </Button>
                    <div className={style.total}>
                        <span>总计：</span>
                        <span>{total}</span>
                    </div>
                </Header>
            </div>
        )
    }
}