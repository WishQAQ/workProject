/**
 * 检验申请页面-顶部
 */
import React from 'react'
import css from '../style/lab.scss'
// model
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {InputTable} from 'pkg/common/inputTable'
import {inspectionService, InspectionState} from 'service/pat-manage/patien-opt/lab/apply/index'

export default class TopApply extends FluxComponent<InspectionState> {
    title = '检验申请页面-顶部'
    inspectionService = inspectionService

    render() {
        const {testCause, notesForSpcm, clinicDiag} = this.state
        return (
            <div className={css.applyTop}>
                <LabelBox text={'检验目的'} className={css.applyLabel} asterisk={true}>
                    <HintInput
                        onChange={inspectionService.testingPurpose}
                        value={testCause}/>
                </LabelBox>
                <LabelBox text={'临床诊断'} className={css.applyLabel} asterisk={true}>
                    <InputTable
                        data={this.state.diagnosisName || []}
                        option={{
                            total: this.state.diagnosisName ? this.state.diagnosisName.total : 0,
                            columns: [{title: '名称', field: 'value'}],
                            pageSize: 7,
                            showValue: 'value'
                        }}
                        oValue={clinicDiag}
                        callBackMethods={(v: any) =>
                            inspectionService.inputTableType(v)
                        }
                    />
                </LabelBox>
                <LabelBox text={'标本说明'} className={css.applyLabel} asterisk={true}>
                    <HintInput
                        onChange={inspectionService.notesForSpcm}
                        value={notesForSpcm}/>
                </LabelBox>
            </div>
        )
    }
}