/**
 * 顶部患者公共基础信息
 */
import React from 'react'
import css from './style/basic.scss'
import {FluxComponent} from '../../../../tools/flux/FluxComponent'
import {patientBasicService, PatientBasicState as State} from '../../../../service/pat-manage/patien-opt/patient-basic'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {HintInput} from 'pkg/common/input'
import {Input} from 'antd'

const {TextArea} = Input
import {Select} from 'pkg/common/select'
import {ColorIcon} from 'pkg/common/colorIcon'
import {Button} from 'antd'

export default class PatientBasic extends FluxComponent<State> {
    title = '患者基本信息'
    patientBasicService = patientBasicService
    titles = [
        {
            headerName: '姓名:',
            field: 'name'
        },
        {
            headerName: '年龄:',
            field: 'age'
        },
        {
            headerName: '就诊号:',
            field: 'visitNo'
        },
        {
            headerName: '病人ID:',
            field: 'patientId'
        },
        {
            headerName: '费别:',
            field: 'chargeType'
        },
        {
            headerName: '首诊医师:',
            field: 'doctorName'
        }
    ]

    button = [
        {
            headerName: '接',
            id: 'accept'
        },
        {
            headerName: '转',
            id: 'transfer'
        },
        {
            headerName: '红',
            id: 'red'
        },
        {
            headerName: '黄',
            id: 'yellow'
        },
        {
            headerName: '绿',
            id: 'green'
        },
        {
            headerName: '留',
            id: 'stay'
        },
        {
            headerName: '出',
            id: 'out'
        }
    ]

    render() {
        const {model, open, patientData, nurData, transferData} = this.state
        return (
            <div className={css.basicMain}>
                <div className={css.basicInfo}>
                    {
                        this.titles.map((e, i) => {
                            return <div
                                className={`${css.basicBlock} ${i === this.title.length - 1 ? css.special : ''}`}
                                key={i}>
                                <span className={css.fontStyle}>{e.headerName}
                                    <b>{model[e.field]}</b>
                                </span>
                                {i === 0 ? <span className={css.patientIcon}>
                                    <ColorIcon
                                        iconName={`${model.sex === '1'
                                            ? 'icon-nantouxiang' : model.sex === '2'
                                                ? 'icon-nvtouxiang' : 'icon-wumingshi'}`}/>
                                </span> : false}
                            </div>
                        })
                    }
                </div>
                <div style={{display: 'flex'}}>
                    {this.button.map((e, index) => {
                        return <div
                            className={`${css.basicBtns} ${e.id === 'accept' ? css.accept : e.id === 'transfer' ?
                                css.transfer : e.id === 'red' ? css.red : e.id === 'yellow' ? css.yellow : e.id === 'green' ? css.green :
                                    e.id === 'stay' ? css.stay : e.id === 'out' ? css.out : ''}
                  ${index === this.button.length - 1 ? css.specialBtn : ''}`}
                            key={index}
                            onClick={patientBasicService.bBox}
                        >
                            {e.headerName}
                        </div>
                    })}
                </div>
                <DragMove visible={open} onCancel={patientBasicService.handleClose} title="转区">
                    <Rounded leftShow={'病情'} className={css.illness} >
                        <Select
                            data={patientData}
                            dataOption={{key: 'key', value: 'value'}}
                            className={css.Sel}
                            onChange={(e)=>{patientBasicService.setStateJson2(e,'transferData', 'patientStatus','id')}}
                        />
                    </Rounded>
                    <Rounded leftShow={'护理等级'} className={css.nursingGrade}>
                        <Select data={nurData} dataOption={{key: 'key', value: 'value'}} className={css.Sel}
                                onChange={(e)=>{patientBasicService.setStateJson2(e,'transferData', 'nursingClass','id')}}
                        />
                    </Rounded>
                    <Rounded leftShow={'原因'}
                             className={css.nursingGrade}
                             asterisk={true}
                    >
                        <TextArea rows={1} className={css.textOne} autosize={true}
                                  onChange={(e)=>{patientBasicService.publicSetNewValue(e, 'reason')}}
                                  value={transferData.reason ? transferData.reason : ''}/>
                    </Rounded>

                    <TextArea rows={4} placeholder="说明" className={css.textA}
                              onChange={(e)=>{patientBasicService.publicSetNewValue(e, 'memo')}}
                              value={transferData.memo ? transferData.memo : ''}/>
                    <Button className={css.btn}
                            onClick={patientBasicService.handleClose}>
                        取消
                    </Button>
                    <Button type="primary"
                            className={css.btn}
                            onClick={patientBasicService.saveData}
                    >
                        保存
                    </Button>
                    <div className={css.clear}/>
                </DragMove>
            </div>
        )
    }
}