import React from 'react'
import css from './style/vital.scss'
import classNames from 'classnames'
import {Label} from 'pkg/common/label'
import {Card} from 'pkg/ui/card'
import {Select} from 'pkg/common/select'
import {IconLabel} from 'pkg/ui/iconLabel'
import {IconFont} from 'pkg/common/icon'
import {HintInput} from 'pkg/common/input'
import {Btn} from 'pkg/common/button'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {vitalSignService, VitalSignState as State} from 'service/triage/new-triage/vital-sign'

const Option = Select.Option

export default class Vital extends FluxComponent<State> {
    title = '新分诊.生命体征'
    vitalSignService = vitalSignService

    render() {
        const {vitalSignDict, data} = this.state
        return (
            <div className="vital">
                <div className={classNames(css.vitalMain)}>
                    <Card text={'生命体征'} extra={
                        <div>
                            <Select className={classNames(css.instrument)}>
                                <Option value={'rescue'}>抢救区监护仪</Option>
                            </Select>
                            <Btn text={
                                <span><IconFont iconName="icon-sousuo-1"/>获取数据</span>
                            } btnParam={{className: css.getData, onClick: vitalSignService.loadVitalSigns}}/>
                        </div>
                    } className={classNames(css.elementP)}>
                        <div className={classNames(css.inputContainer)}>
                            {
                                !vitalSignDict ? '' :
                                    vitalSignDict.map((e, index) => {
                                        let value = !data ? '' : (data[e.id] || '')
                                        let color
                                        if (value !== '') {
                                            if (parseFloat(value) > parseFloat(e.maxSigns)) {
                                                color = e.exceedMaxShowColor
                                            } else if (parseFloat(value) < parseFloat(e.minSigns)) {
                                                color = e.exceedMinShowColor
                                            }
                                        }
                                        return <div className={css.inputBtn} key={index}>
                                            <Label className={css.vitalLabel}>{e.vitalSigns}</Label>
                                            <HintInput placeholder={e.unit}
                                                       hintpany={{movedtae: 20}}
                                                       style={{width: 68, height: 24}}
                                                       value={value}
                                                       onBlur={(v) => vitalSignService.setVitalSigns2(
                                                           (v.target as HTMLInputElement).value, index, 'data', e.id)}
                                                       onChange={(v) => vitalSignService.setVitalSigns(v.target.value, index, 'data', e.id)}
                                                       color={color}
                                            />
                                        </div>
                                    })}
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}