import React from 'react'
import { Button, Input, Modal } from 'antd'
import { BunkCard } from 'pkg/ui/bunkCard'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { changeBedService, ChangeBedState as State } from 'service/pat-manage/patient-info/change-bed'
import { JsonUtil } from 'tools/api/JsonUtil'

export default class TransferBunkModal extends FluxComponent<State> {
    title = '患者信息.转床'
    changeBedService = changeBedService

    render() {
        const { modals, bedLabel1, bedLabel2, bed1, bed2 } = this.state
        return (
            JsonUtil.isEqualStr(modals, 'changeBed') ?
                <Modal
                    width={554}
                    visible={true}
                    footer={null}
                    onCancel={changeBedService.onHideModal}
                >
                    <h3>转床</h3>
                    <div className={styles.inputGroup}>
                        <div className={styles.input}>
                            <Input
                                addonBefore="床号"
                                addonAfter={(
                                    <Button size="small"
                                            onClick={changeBedService.loadBedCard.bind(this, 1)}>提取</Button>)}
                                value={bedLabel1}
                                onChange={changeBedService.setStateJson.bind(this, 'bedLabel1')}
                            />
                        </div>
                        <span className={styles.middle}>转到</span>
                        <div className={styles.input}>
                            <Input
                                addonBefore="床号"
                                addonAfter={(
                                    <Button size="small"
                                            onClick={changeBedService.loadBedCard.bind(this, 2)}>提取</Button>)}
                                value={bedLabel2}
                                onChange={changeBedService.setStateJson.bind(this, 'bedLabel2')}
                            />
                        </div>
                    </div>
                    <div className={styles.bunkCardWrapper}>
                        <div className={styles.bunkCard}>
                            <BunkCard bunkInfo={bed1}/>
                        </div>
                        <div className={styles.bunkCard}>
                            <BunkCard bunkInfo={bed2}/>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <Button type="primary" onClick={changeBedService.changeBed}>确认</Button>
                    </div>
                </Modal> : null
        )
    }
}