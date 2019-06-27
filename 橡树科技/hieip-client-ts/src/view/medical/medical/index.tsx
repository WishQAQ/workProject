/**
 * Created by mod on 2017/12/25.
 *
 * 电子病历 病历书写
 *
 *
 */

import * as React from 'react'
import { Tabs } from 'antd'
import { LazyLoader } from 'src/tools/lazyLoader'
import * as css from './style/index.scss'
import MedicalWritten from './components/written/medical-written'
import MedicalFile from './components/write/medical-file'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { MedicalState, medicalService } from 'src/service/medical/medical/components'
import debug from 'debug'

const trace = debug('trace:病历:medical')
export default class Medical extends FluxComponent<MedicalState> {
    title: '病案书写'
    medicalService = medicalService
    render() {
        let { panes, activeKey } = this.state
        const k = activeKey || 0
        return (
            <div className={css.medical}>
                <Tabs
                    hideAdd={true}
                    activeKey={k + ''}
                    onEdit={medicalService.onEdit}
                    onChange={medicalService.onChange}
                    type="editable-card"
                >
                    {panes.map((pane: any, index: number) =>
                        <Tabs.TabPane tab={pane.mrName} key={pane.key} closable={pane.closable}>
                            <LazyLoader lazyModule={index ? MedicalFile : MedicalWritten} />
                        </Tabs.TabPane>
                    )}
                </Tabs>
            </div>
        )
    }

}