import {BaseService} from 'tools/flux/BaseService'
// import debug from 'debug'
import {Page} from 'pkg/entity/medical'
import {keywordService} from '../keyword/index'
import {doctorService} from '../doctor/index'
import {contentWriteService} from '../content-write'

// const log = debug('trace:病历:medical')

export interface MedicalSiderState {
    /* 分页 */
    page?: Page
    /* 患者id */
    patientId?: string
    /* 住院标识 */
    visitId?: number
    /* 菜单 */
    menu?: any
    /* 左侧菜单改变是否打开的状态  */
    open?: boolean
    /*  左侧菜单的下标  */
    activeKey?: number
    /* 科室 */
    deptCode?: string

}

class MedicalSiderService extends BaseService<MedicalSiderState> {
    defaultState = {
        page: {pageSize: 6, startIndex: 1},
        menu: ['病历内容', '医嘱提取', '关键字'],
        open: false,
        activeKey: 0,
        deptCode: '231001',
        patientId: '1701117838',
        visitId: 1
    }

    serviceWillMount() {
        this.reset()
    }

    /**
     * 获取病历信息
     */
    // acquisition = () => {
    //     this.dispatch({})
    // }
    /**
     *  左侧菜单改变
     */
    btnClick = (index: number) => {
        let {activeKey} = this.state
        if (activeKey === index) {
            this.dispatch({open: !1, activeKey: 0})
        } else {
            this.switchover(index)
            this.dispatch({open: !0, activeKey: index})
        }
    }
    /**
     * 左侧菜单改变后获取数据
     */
    switchover = (index: number) => {
        let {menu, patientId, visitId, deptCode} = this.state
        switch (menu[index - 1]) {
            case '病历类容': {
                contentWriteService.acquisition('1708183062', visitId)
                break
            }
            case '医嘱提取': {
                doctorService.acquisition(patientId, visitId)
                break
            }
            case '关键字': {
                keywordService.acquisition(deptCode)
                break
            }
            default:
                break
        }
        this.dispatch({open: !0, activeKey: index})
    }

    /**
     * 切换tabs
     */
    callback = (key) => {
        this.switchover(Number.parseInt(key))
        this.dispatch2({activeKey: Number.parseInt(key)})
    }

}

export const medicalSiderService = new MedicalSiderService('medicalSider')