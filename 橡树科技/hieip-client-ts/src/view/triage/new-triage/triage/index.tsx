import React from 'react'
import {FluxComponent} from 'tools/flux/FluxComponent'
import css from './style/grading.scss'
import classNames from 'classnames'
import {Card} from 'pkg/ui/card'
import {Btn} from 'pkg/common/button'
import {Label} from 'pkg/common/label'
import {Radio, Button} from 'antd'
import {triageService, TriageState as State} from 'service/triage/new-triage/triage'
import {JsonUtil} from 'tools/api/JsonUtil'
import {Select} from 'pkg/common/ag/select'
import {IconFont} from 'pkg/common/icon'

export interface GradingProps {
    /**
     * 样式
     */
    className?: string
}

export default class Grading extends FluxComponent<State> {
    title = '新分诊.分诊信息'
    triageService = triageService

    render() {
        const {
            ACT_TRIAGE_LEVEL, TRIAGE_TARGET, OTHER_TRIAGE_TARGET, TRIAGE_MEMO,
            triageLevelDict, triageTargetDict, triageOtherDict, mhChangeReasonDict
        } = this.state
        let triageLevel = JsonUtil.getJsonByKey('triageLevel', this.state)
        triageLevel = triageLevel.toString()
        let {className} = this.props

        return (
            <div className="grading">
                <div className={classNames(className, css.gradingMain)}>
                    <Card text={'分级信息'}
                          className={classNames(css.gradingRadius)}
                          extra={
                              <div className={css.gradingSave}>
                                  <Button
                                      type={'primary'}
                                      onClick={triageService.save}
                                      className={css.gradingSaveBtn}
                                  >
                                      <IconFont iconName="icon-baocun2"/>{'保存'}
                                  </Button>
                                  <Button
                                      type={'primary'}
                                      className={css.gradingSaveBtn}
                                      onClick={triageService.loadDefaultInfo}
                                  >
                                      <IconFont iconName="icon-jiexi"/>{'默认数据'}
                                  </Button>
                                  <Button
                                      type={'primary'}
                                      className={css.gradingSaveBtn}
                                      onClick={triageService.loadSplitInfo.bind(this, '')}
                                  >
                                      <IconFont iconName="icon-sync"/>{'刷新'}
                                  </Button>
                                  <Button
                                      className={css.gradingSaveTem}
                                      onClick={triageService.tempSave}
                                  >
                                      <IconFont iconName="icon-baocun2"/>{'暂存'}
                                  </Button>
                              </div>}>
                        <div className={css.contentContainer}>
                            <div className={css.displayFlex}>
                                <Label asterisk={true} className={css.gradingLabel}>{'分诊级别'}</Label>
                                <Radio.Group
                                    value={triageLevel && triageLevel != null ? triageLevel.toString() : null}
                                    onChange={triageService.setStateJson.bind(this, ACT_TRIAGE_LEVEL)}
                                    className={css.levelRadio}>
                                    {
                                        !triageLevelDict ? '' :
                                            triageLevelDict.map((e, index) => {
                                                return <Radio.Button value={e.key}
                                                                     key={index}
                                                                     className={classNames(css.levelBtn,
                                                                         (index + 1).toString() === triageLevel
                                                                             ? css[`levelBtn${triageLevel}`] : null)}
                                                >{e.value}</Radio.Button>
                                            })}
                                </Radio.Group>
                                <Select
                                    value={JsonUtil.getJsonByKey(TRIAGE_MEMO, this.state).toString()}
                                    onClick={triageService.setStateJson.bind(this, TRIAGE_MEMO)}
                                    data={mhChangeReasonDict ? mhChangeReasonDict : []}
                                    dataOption={{value: 'value', key: 'key', inputCode: 'inputCode'}}
                                    isSearch={true}
                                    isSaveSearch={true}
                                    className={css.selectGo}
                                />
                            </div>
                            <div>
                                <Label asterisk={true} className={css.gradingLabel}>{'分诊去向'}</Label>
                                <Radio.Group
                                    value={JsonUtil.getJsonByKey(TRIAGE_TARGET, this.state).toString()}
                                    onChange={triageService.setStateJson.bind(this, TRIAGE_TARGET)}
                                    className={css.radioChoose}>
                                    {
                                        !triageTargetDict ? '' : triageTargetDict.map((e, index) => {
                                            return <Radio.Button
                                                key={index}
                                                className={css.gradingBtnGo}
                                                value={e.key}
                                            >{e.value}</Radio.Button>
                                        })}
                                </Radio.Group>
                            </div>
                            <div>
                                <Label className={css.gradingLabel}>{'其他去向'}</Label>
                                <Radio.Group
                                    value={JsonUtil.getJsonByKey(OTHER_TRIAGE_TARGET, this.state).toString()}
                                    onChange={triageService.setStateJson.bind(this, OTHER_TRIAGE_TARGET)}
                                    className={css.radioChoose}>
                                    {
                                        !triageOtherDict ? '' : triageOtherDict.map((e, index) => {
                                            return <Radio.Button
                                                key={index}
                                                className={css.gradingBtnGo}
                                                value={e.key}
                                            >{e.value}</Radio.Button>
                                        })}
                                </Radio.Group>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}