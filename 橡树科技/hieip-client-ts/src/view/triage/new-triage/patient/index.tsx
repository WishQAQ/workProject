import React from 'react'
import classnames from 'classnames'
import {IconLabel} from 'pkg/ui/iconLabel'
import styles from './style/index.scss'
import {Card} from 'pkg/ui/card'
import {Select} from 'pkg/common/select'
import InfoForm from 'pkg/ui/InfoForm'
import {patientService, PatientState as State} from 'service/triage/new-triage/patient'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {triageService} from 'service/triage/new-triage/triage'
import {JsonUtil} from 'tools/api/JsonUtil'

const Option = Select.Option

export default class SickInfoPanel extends FluxComponent<State> {
    static defaultProps = {
        cardTitle: '基本信息',
        btnGroup: [
            {
                key: 'unKnow', values: '无名氏', iconName: 'icon-wumingshi1',
                onClick: () => triageService.setStateJson2('mhSplit', {patientVisit: {name: '无名氏'}})
            },
            {
                key: 'clear',
                values: '清除',
                iconName: 'icon-qingkong2',
                onClick: () => triageService.setStateJson('mhSplit', {})
            },
            {key: 'medicalCard', values: '医保卡', iconName: 'icon-yibaoqia', onClick: null},
            {key: 'identityCard', values: '身份证', iconName: 'icon-shenfenzheng1', onClick: null}
        ]
    }

    title = '新分诊.患者信息'
    patientService = patientService
    form = null

    render() {
        const {className, style, cardTitle, btnGroup} = this.props
        let {patientVisit, keys} = this.state

        // root className
        const rootClasses = classnames(
            [`${styles.root}`],
            className
        )

        // 头部操作栏
        const CardTitle = (
            <div className={styles.rootTitle}>
                <div className={styles.cardTitle}>{cardTitle}</div>
                <div className={styles.titleBtnGroup}>
                    {
                        btnGroup.map((item, index) => {
                            return (
                                <IconLabel
                                    key={`iconLabel-${index}`}
                                    values={item.values}
                                    iconName={item.iconName}
                                    className={styles.iconLabel}
                                    onClick={item.onClick}
                                />
                            )
                        })
                    }
                </div>
                <Select
                    showSearch={true}
                    size="small"
                    placeholder="暂存记录"
                    notFoundContent={keys || keys.length === 0 ? '请选择暂存记录' : '未查找到记录'}
                    className={styles.searchRecord}
                    // onChange={patientService.loadTempSaveByKey}
                    onSelect={patientService.loadTempSaveByKey}
                >
                    {
                        !keys ? '' : keys.map((e, i) => {
                            return <Option value={e} key={i}>{e.substring('split:tempSave:'.length)}</Option>
                        })
                    }
                </Select>
                <IconLabel iconName="icon-sousuo_sousuo" className={styles.searchIcon}/>
            </div>
        )
        return (
            <div
                className={rootClasses}
                style={style}
            >
                <Card extra={CardTitle}>
                    <div className={styles.formBox}>
                        <InfoForm ref={(x) => this.form = x}
                                  onChange={patientService.setPatient}
                                  onChangeAlergyDrugsDict={patientService.loadAlergyDrugsDict}
                                  allergy={JsonUtil.getJsonByKey('allergy', patientVisit)}
                                  alergyDrugsDict={this.state.alergyDrugsDict}
                                  alergyDrugsDictColumns={this.state.alergyDrugsDictColumns}
                                  {...this.state}
                                  {...patientVisit}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}
