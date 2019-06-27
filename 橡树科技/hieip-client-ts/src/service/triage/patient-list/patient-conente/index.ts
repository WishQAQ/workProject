import {BaseService} from 'tools/flux/BaseService'
import {TriagePatsViewEntitySplit} from 'pkg/entity'
import {patientModelService} from 'service/triage/patient-list/patient-modal'
import {ApiSplitMhPatientVisit} from 'pkg/api'
import {patientHeadService} from '../patient-head'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from 'pkg/common/message'
import moment from 'moment'

/**
 * ag表格的属性
 */
let agApi

export interface ApiDictState {
    /**
     * 状态
     */
    isStatus?: boolean
    /**
     * 分页: 开始行数
     */
    startIndex?: number
    /**
     * 分页: 分页数
     */
    pageSize?: number

    /**
     * 分诊患者信息
     */
    model?: TriagePatsViewEntitySplit

    /**
     * 返回的新分诊的患者信息
     */
    triagePatsViewEntitySplit?: TriagePatsViewEntitySplit[]
    /**
     * 菜单
     */
    menu?: Array<any>
}

class PatientConenteService extends BaseService<ApiDictState> {

    patientModelService = patientModelService
    defaultState = {
        startIndex: 1,
        pageSize: 100,
        isStatus: false,
        menu: ['群伤关联', '退号', '分诊修改']
    }
    /* =====分界线: 一、后台处理: 开始===== */
    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 获取患者列表的数据
     */
    set(value: TriagePatsViewEntitySplit[]) {
        this.dispatch({triagePatsViewEntitySplit: value})
        if (agApi) {
            this.onReverSource()
        }
    }

    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */
    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */

    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    menuClik = (menuindex) => {
        patientModelService.menuClik(this.state.menu[menuindex])
    }

    /**
     * 获取患者列表中某一行数据
     */
    showCurRowMessage = (record) => {
        let menu = []
        if (JsonUtil.getJsonByKey2('data.isBackNum', record, '') !== '是')
            menu.push('退号')
        else menu.push('取消退号')
        if (JsonUtil.getJsonByKey2('data.bulkinjuryId', record, '').length === 0)
            menu.push('群伤关联')
        menu.push('分诊修改')
        this.dispatch2({menu})
        patientModelService.showCurRowMessage(record)
    }

    // /**
    //  * 异常提醒
    //  */
    // lifecycleByState(state: ApiDictState) {
    //     if (state.errorMessage) this.dispatch({errorMessage: null}, 5000)
    // }

    /**
     * 改变分页需要的状态
     */
    onGridReady = (params) => {
        agApi = params
        this.onReverSource()
    }

    /**
     * 分页
     */
    onReverSource = () => {

        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.getPageReverSource(params.startRow).then((data: any) => {
                    // let lastRow = -1;
                    // if (data.length <= params.endRow) {
                    //     lastRow = data.length;
                    // }
                    params.successCallback(data, data.total ? data.total : 0)
                })
            }
        }
        agApi.api.setDatasource(dataSource)
    }
    /* =====分界线: 二、前端处理: 结束===== */
    /**
     * 获取患者列表信息
     */
    loadTriagePatsView = (model, startIndex, pageSize) => {
        return ApiSplitMhPatientVisit.loadTriagePatsView(model, startIndex, pageSize).then(data => {
            this.dispatch({triagePatsViewEntitySplit: data})
        }).catch(err => {
            message.tip(err || '获取患者列表信息失败！', 'error')
        })
    }

    /**
     * 导出csv
     * @param v
     */
    expCsv = () => {
        agApi.api.exportDataAsCsv()
        // agApi.api.exportDataAsExcel({})
    }

    /**
     * ag时间回显公用方法
     */
    publicTimeShow = (params) => {
        let val = params.value
        val = val && moment(val).format('YYYY-MM-DD')
        return val
    }

    /**
     * 分页获取数据
     */
    private getPageReverSource = (Index: number) => {
        return new Promise((resolve) => {
            patientHeadService.statePatsView(Index + 1).then(data => {
                resolve(data)
            })
        })
    }
}

export const patientConenteService = new PatientConenteService('patientConente')