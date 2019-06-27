import React from 'react'
import { Button, Switch } from 'antd'
import { ScreeningGroup } from 'pkg/ui/screening-group'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { patInfoHeaderService, PatInfoHeaderState as State } from 'service/pat-manage/patient-info/header'
import { patientTableService } from 'service/pat-manage/patient-info/patient-table'
import {IconFont} from 'pkg/common/icon'

export default class Header extends FluxComponent<State> {
    title = '患者信息.头部'
    patInfoHeaderService = patInfoHeaderService

    methods = {
        patientNum: (value) => patInfoHeaderService.patientNum(value),
        patientLevel: (value) => patInfoHeaderService.patientLevel(value),
        patientPartition: (value) => patInfoHeaderService.patientPartition(value)
    }

    render() {
        const { patientNum, patientLevel, patientPartition, redAvg, inputCode } = this.state
        return (
            <div className={styles.root}>
                <div>
                    <ScreeningGroup
                        patientNum={patientNum}
                        patientLevel={patientLevel}
                        patientPartition={patientPartition}
                        methods={this.methods}
                        value={inputCode}
                        onChange={this.patInfoHeaderService.setStateJson.bind(this, 'inputCode')}
                        onSearch={patientTableService.setStateJson.bind(this, 'inDeptParams.name')}
                    />
                    <div className={styles.actionButtons}>
                        <Button className={styles.actionBtn} type={'primary'}
                                onClick={patInfoHeaderService.onPrintStraps}>
                            <IconFont iconName={'icon-ordinaryprint'}/>{'打印腕带'}
                        </Button>
                        <Button className={styles.actionBtn} type={'primary'}
                                onClick={patInfoHeaderService.tabs.bind(this, 'inDept')}>
                            <IconFont iconName={'icon-xie'}/>{'患者入科'}
                        </Button>
                        <Button className={styles.actionBtn} type={'primary'}
                                onClick={patInfoHeaderService.tabs.bind(this, 'transferInDept')}>
                            <IconFont iconName={'icon-iocnchexiao'}/>{'出科召回'}
                        </Button>
                        <Switch
                            onChange={patInfoHeaderService.onSwitchChange}
                            checkedChildren="列表模式"
                            unCheckedChildren="床卡模式"
                        />
                    </div>
                </div>
                <p className={styles.rescueDetail}>
                    <span>抢救区中的位数:&nbsp;&nbsp;<span className={styles.rescueNum}>{redAvg}</span> </span>灰色无， 绿色有， 红色异常
                </p>
            </div>
        )
    }
}