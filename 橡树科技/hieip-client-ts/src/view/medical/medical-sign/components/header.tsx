/**
 * Created by oakm on 2017/12/12.
 */
import * as React from 'react'
import * as style from '../style/index.scss'
import {TimePicker} from 'pkg/common/timePicker'
import {HintInput} from 'pkg/common/input'
import {InputTable} from 'pkg/common/inputTable'
import {Button, Layout, Radio} from 'antd'
import {Rounded} from 'pkg/common/rounded'
import {DragMove} from 'pkg/common/dragging'
import {IconFont} from 'pkg/common/icon'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {medicalSignService, MedicalSignState} from 'service/medical/medical-sign'

export default class MedicalSignHeadView extends FluxComponent<MedicalSignState> {
    title = 'MedicalSignHeadView'
    medicalSignService = medicalSignService

    render() {
        const {
            startDate,
            endDate,
            signFlag,
            inputData,
            total,
            visible,
            username,
            mrSubmitTime,
            inputLength,
            inputTitle,
            deptObjectCode,
            inputTableData
        } = this.state

        return (
            <Layout.Header>
                <div className={style.signHead}>
                    <div className="gutter-box"
                         style={{width: 250}}
                    >
                        <TimePicker
                            isRange={true}
                            className={style.plHeadTime}
                            oValue={startDate}
                            oValue2={endDate}
                            startPlaceholder="开始时间"
                            endPlaceholder="结束时间"
                            dateChange={(v) => medicalSignService.onChangeTime(v)}
                        />
                    </div>
                    <div className="gutter-box">
                        <HintInput
                            placeholder={'住院号/患者ID'}
                            value={inputData}
                            style={{width: 120, height: 30, float: 'left'}}
                            className={style.plHeadTxt}
                            onPressEnter={() => medicalSignService.search()}
                            onChange={(v) => medicalSignService.onChangeInput(v)}
                        />
                    </div>
                    <div className="gutter-box">
                        <Rounded leftShow={'科室'} className={style.keshi}>
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
                                callBackMethods={(v) => medicalSignService.showMessage(v)}
                            />
                        </Rounded>
                    </div>
                    <div className={`gutter-box ${style.qianshou}`}
                         style={{lineHeight: '30px'}}>
                        <span className="show">
                          <label>是否签收：</label>
                          <Radio.Group value={signFlag ? 1 : 2} onChange={medicalSignService.onChangeRadio}>
                            <Radio value={1}>已签收</Radio>
                            <Radio value={2}>未签收</Radio>
                          </Radio.Group>
                        </span>
                    </div>
                    <div className="gutter-box">
                        <Button
                            type="primary"
                            style={{marginRight: 24}}
                            onClick={medicalSignService.search}
                        >
                            <IconFont iconName={'icon-sousuo_sousuo'}/>
                            查询
                        </Button>
                        <Button
                            type="primary"
                            style={{marginRight: 6}}
                            onClick={medicalSignService.onSign}
                        >
                            <IconFont iconName={'icon-xie'}/>
                            {signFlag ? '取消签收' : '签收'}
                        </Button>
                        <Button type="primary" onClick={medicalSignService.expCsv}>
                            <IconFont iconName={'icon-zhejiantou'}/>
                            导出Excel
                        </Button>
                    </div>
                    <div className="gutter-box">
                        <p
                            className={style.bezhu}
                        >注：新生儿字体<span
                            className={style.green}>绿色</span>，打回或召回背景为
                            <span className={style.cse}>橙色</span>
                            <span style={{marginLeft: 10}}>总计：<span
                                className={style.cse}>{total ? total : 0}</span></span></p>
                    </div>
                </div>
                <DragMove
                    title="确认签收"
                    visible={visible}
                    onOk={medicalSignService.onOk}
                    onCancel={medicalSignService.onCancel}
                    okText="确定"
                    width={'334px'}
                    cwidth={334}
                    cheight={273}
                >
                    <div>
                        <div style={{fontSize: 12}}>
                            <span>纸质病历上交人：</span>
                            <span>{username}</span>
                        </div>
                        <div style={{fontSize: 12, display: 'flex', marginTop: 5}}>
                            <span>纸质病历上交时间：</span>
                            <TimePicker
                                oValue={mrSubmitTime ? mrSubmitTime : null}
                                format={'YYYY-MM-DD HH:mm'}
                                dateChange={v => medicalSignService.dragChangeTime(v)}
                                timePrecision={0}
                            />
                        </div>
                    </div>
                </DragMove>
            </Layout.Header>
        )
    }
}