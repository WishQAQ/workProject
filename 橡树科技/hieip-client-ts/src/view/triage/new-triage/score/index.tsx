import React from 'react'
import {FluxComponent} from 'tools/flux/FluxComponent'
import classNames from 'classnames'
import {scoreService, ScoreState as State} from 'service/triage/new-triage/score'
import {Card} from 'pkg/ui/card'
import {Scoreing} from 'pkg/ui/scoreing'
import {Button} from 'antd'
import {ScorePage} from 'pkg/triage-score/socre/scorepage'
import {Tags} from 'pkg/triage-score/addScore/tags'
import {Classify} from 'pkg/triage-score/addScore/classify'
import {JudgmentBasis} from 'pkg/triage-score/addScore/judgmentBasis'
import {HintInput} from 'pkg/common/input'
import {IconFont} from 'pkg/common/icon'
import {Drawer} from 'pkg/common/Drawer'
import {Tab} from 'pkg/ui/tab'
import styles from './style/index.scss'
import {patientService, PatientState} from 'service/triage/new-triage/patient'

export default class PatientScore extends FluxComponent<State & PatientState> {
    title = '病人评分'
    scoreService = scoreService
    patientService = patientService

    render() {
        let {
            patientVisit,
            scoreTabs,
            scoreBtnGroup, scoreBtnGroup2,
            scoreitem, tags, tagsOption, searchFindMainVal,
            tabIndex, mhCriterionType, mhCriterionMain, mhCriterionItem
        } = this.state
        let BtnRender: JSX.Element[]
        BtnRender = (patientVisit &&
        patientVisit.bulkinjuryId
        && patientVisit.bulkinjuryId.toString().trim().length > 0
            ? scoreBtnGroup2 : scoreBtnGroup).map((v, k) =>
            <Button
                key={k}
                className={`${styles.btnRender} ${k === scoreTabs ? styles.btnRenderChoose : ''}`}
                onClick={() => scoreService.openScore(true, k)}
            >
                {v}
            </Button>
        )
        const tabs = [
            {
                value: '分类名称',
                content: <Classify
                    data={mhCriterionType || []}
                    option={{name: 'groupName', key: 'id'}}
                    tags={tags || []}
                    tagsOption={tagsOption || {}}
                    onClick={(v) => scoreService.onTabClick(1, v)}/>
            },
            {
                value: '主诉名称', content: <Classify
                    data={mhCriterionMain || []}
                    option={{name: 'itemDescription', key: 'id'}}
                    onClick={(v) => scoreService.onTabClick(2, v)}/>
            },
            {
                value: '判断依据', content: <div className={styles.addScoreing}>
                    <div className={styles.addScoreingHead}>
                        <HintInput className1={styles.addScoreInput} value={searchFindMainVal}
                                   onChange={(e) => scoreService.searchFindMain(e)}
                                   addonAfter={<IconFont iconName="icon-sousuo-"/>}/>
                        <Button
                            className={styles.addScoreQd}
                            onClick={() => scoreService.onTabClick(0, 1)}
                        >
                            <span className={styles.addScoreQdSpan}><IconFont iconName="icon-gou"/>{'确定'}</span>
                        </Button>
                    </div>
                    <JudgmentBasis
                        data={mhCriterionItem || []}
                        option={{name: 'itemDescription', level: 'emergencyLevel'}}
                        onClick={(v) => scoreService.judgmentBasisCheck(v)}
                    />
                </div>
            },
            {
                value: '评分结果',
                content: <Scoreing
                    data={this.state ? this.state.scoreing : []}
                    option={this.state ? this.state.scoreingOption : {}}
                    iconName="icon-quxiao"
                    click={(v) => scoreService.scoreingRemove(v)}/>
            }
        ]
        return (
            <div className={classNames(styles.patientScore, 'patientScore')}>
                <Tab
                    tabs={tabs}
                    index={tabIndex}
                    extraHeard={BtnRender}
                    extraContent={tabIndex !== 3 ? <Tags
                        data={tags || []}
                        option={tagsOption || {}}
                        onTagClose={(v) => scoreService.tagsClose(v)}/> : null
                    }
                    onClick={(v) => scoreService.onTabClick(v)}
                />
                {tabIndex === 4 ?
                    <ScorePage
                        dataCallBack={(v) => scoreService.scoreing(v)}
                        scoreitem={scoreitem}
                        active={scoreTabs}
                        key={scoreTabs}
                    /> : null
                }
            </div>
        )
    }
}