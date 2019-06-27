/**
 * 患者概述、分诊信息，生命体征，评估信息，其他接口
 * Created by mou on 2017/12/19.
 */
import * as React from 'react'
import { IconFont } from 'pkg/common/icon'
import css from '../style/index.scss'
import { overviewService, OverviewServiceState } from 'service/pat-manage/patien-opt/overview/mian'
import { FluxComponent } from 'tools/flux/FluxComponent'
// model
import classNames from 'classnames'
// function
import { JsonUtil } from 'tools/api/JsonUtil'

export default class Right extends FluxComponent<OverviewServiceState> {
    title = '患者概述、分诊信息，生命体征，评估信息，其他接口'
    overviewService = overviewService

    /**
     * 分诊信息
     */
    triageInfo = [
        { headerName: '分诊级别:', field: 'actTriageLevel.name' },
        { headerName: '分诊去向:', field: 'triageTarget.name' },
        { headerName: '分诊护士:', field: 'triageBy.name' },
        { headerName: '分诊时间:', field: 'triageDate' },
        { headerName: '绿色通道:', field: '' },
        { headerName: '三无:', field: '' }
    ]
    /**
     * 其他接口
     */
    other = [
        { headerName: '感染监控系统', iconName: 'icon-monitor', field: '' },
        { headerName: '护理不良事件上报', iconName: 'icon-huli', field: '' },
        { headerName: '药物不良反应上报', iconName: 'icon-icon04', field: '' }
    ]

    render() {
        let { triageRecord, vitalSignRecord, scoreRecordList } = this.state
        return (
            <div className={css.right}>
                <div className={css.rightOne}>
                    <h5 className={css.title}>分诊信息</h5>
                    <ul className={classNames(css.ulOverflow, css.flexHeight)}>
                        {this.triageInfo.map((e, index) => {
                            return <li key={index}>
                                <b className={css.little}>{e.headerName}</b>{JsonUtil.getJsonByKey(e.field, triageRecord)}
                            </li>
                        })}
                    </ul>
                </div>
                <div className={css.rightOne}>
                    <h5 className={css.title}>生命体征</h5>
                    <div className={classNames(css.ulOverflow, css.flexHeight, css.rightOneContent)}>
                        {vitalSignRecord ? vitalSignRecord.map((e, i) => {
                            return <div key={i}>
                                <p>
                                    <span>{e.itemId.vitalSigns ? e.itemId.vitalSigns : ''}</span>
                                    <span>{e.itemId.unit ? e.itemId.unit : ''}</span>
                                </p>
                                <span>{e.itemValue ? e.itemValue : ''}</span>
                            </div>
                        }) : ''}
                    </div>
                </div>
                <div className={css.rightOne}>
                    <h5 className={css.title}>评估信息</h5>
                    <ul className={classNames(css.ulOverflow, css.flexHeight)}>
                        {scoreRecordList ? scoreRecordList.map((e, index) => {
                            return <li key={index}>
                                <b className={css.little}>{e.scoreType ? e.scoreType + ':' : ''}</b>
                                <b>{e.scoreValue ? e.scoreValue : ''}</b>
                            </li>
                        }) : ''}
                    </ul>
                </div>
                <div className={css.rightOne}>
                    <h5 className={css.title}>其他接口</h5>
                    <ul className={classNames(css.rightLastContent, css.ulOverflow, css.flexHeight)}>
                        {this.other.map((e, index) => {
                            return <li key={index}>
                                <span><IconFont iconName={e.iconName} iconClass={css.icon}/></span>
                                {e.headerName}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}