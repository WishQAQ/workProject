import { BaseService } from '../../../../tools/flux/BaseService/index'
import debug from 'debug'
const log = debug('trace:病历:medical')
export interface MedicalState {
    /* 病案书写界面的菜单 */
    panes?: any[]
    /* 菜单的key值 */
    activeKey?: number
}
class MedicalService extends BaseService<MedicalState> {
    defaultState = {
        panes: [
            { mrName: '已写病历', key: 0, closable: false },
        ]
    }
    /**
     * 新建病历
     */
    insertPanes = (e?: any) => {
        let { panes } = this.state
        e.key = panes.length
        panes.push(e)
        this.dispatch2({ panes, activeKey: panes.length - 1 })
    }

    /** 切换事件 */
    onChange = (activeKey) => {
        this.dispatch2({ activeKey })
    }

    /** 关闭事件 */
    onEdit = (targetKey) => {
        let { panes } = this.state
        let num
        for (let i = 0; i < panes.length; i++) {
            if (panes[i].key + '' === targetKey) {
                panes.splice(i, 1)
                if (i + 1 <= panes.length) {
                    num = panes[i + 1].key
                } else {
                    num = panes[i - 1].key
                }
                this.dispatch2({ panes, activeKey: num })
            }
        }
    }
}

export const medicalService = new MedicalService('medical')