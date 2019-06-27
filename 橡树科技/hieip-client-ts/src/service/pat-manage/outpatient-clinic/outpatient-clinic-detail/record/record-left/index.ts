import {BaseService} from 'tools/flux/BaseService'
import moment from 'moment'
import {ApiPatientMedical} from 'pkg/api/medical'
import {outpatientClinicListService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-list'
import {outpatientClinicInfoService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-information'
import {ApiPatManageOutpClinicMaster} from 'pkg/api'
import {message} from 'pkg/common/message'
import {Page} from 'pkg/entity/medical'

export interface OutpatientClinicDetailRecordLeftState {
    rootSubmenuKeys?: any,  // antd Menu
    openKeys?: any, // antd Menu
    medicalRecords?: any, // 病历列表
    transferDept?: any, // 转科科室记录
    curTransferDept?: any, // 当前选中转科科室
    prevKey?: any, // 上一个key
}

class OutpatientClinicDetailRecordLeftService extends BaseService<OutpatientClinicDetailRecordLeftState> {

    apiArray = {} // 所有病历列表表格的api

    defaultState = {
        rootSubmenuKeys: [],
        openKeys: [],
        medicalRecords: [],
        transferDept: [],
        curTransferDept: null,
        prevKey: null,
    }

    /**
     * 外部调用：设置转科科室记录
     * @param pvid
     */
    setTransferDept = (pvid) => {
        if (pvid !== null) {
            ApiPatManageOutpClinicMaster.loadTransferDept(pvid).then((data) => {
                this.dispatch2({
                    transferDept: data,
                    medicalRecords: []
                })
            }).catch((err) => {
                message.tip(err || '查询转科科室记录失败!', 'warning')
            })
        } else {
            this.dispatch2({
                transferDept: [],
                medicalRecords: []
            })
        }
    }

    /**
     * 点击菜单，收起其他展开的所有菜单（antd menu）
     * @param openKeys
     */
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.dispatch2({openKeys})
        } else {
            this.dispatch2({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    }

    /**
     * 选择转科科室记录某一行
     * @param e
     */
    transferDeptClick = (e) => {
        let transferDept = this.state.transferDept
        let transfer = transferDept[Number(e.key)]
        this.dispatch2({
            curTransferDept: transfer,
            medicalRecords:[]
        })
        ApiPatientMedical.getPatientMedicalInfo(transfer.pvId, 0, transfer.deptCode).then((data: any) => {
            // 添加data 属性，用来存储表格数据
            let list = data.patientFileList
            list.map((item) => {
                return item.agData = []
            })
            // 为了实现：点击菜单，收起其他展开的所有菜单
            let Keys = []
            list.map((item, key) => {
                Keys.push(key + '')
            })
            this.dispatch2({
                rootSubmenuKeys: Keys,
                medicalRecords: list
            })
        }).catch((err) => {
            message.tip(err || '加载患者的病历信息失败!', 'warning')
        })
    }

    /**
     * 点击病历列表某一行
     * @param item
     * @param key
     */
    loadRecord = (item, key) => {
        let prevKey =  this.state.prevKey
        let transfer = this.state.curTransferDept
        if(prevKey===null){
            this.dispatch2({
                prevKey:key
            })
        }else{
            this.apiArray[prevKey].deselectAll()
            this.dispatch2({
                prevKey:key
            })
        }
        ApiPatientMedical.findPatinetFileListByPage(
            item.mrClassCode, {}, transfer.pvId, 0, transfer.deptCode,
            outpatientClinicInfoService.state.curAgPatInfo.visitDept
        ).then((data) => {
            this.state.medicalRecords[key].agData = data
            this.dispatch2({
                medicalRecords: this.state.medicalRecords
            })
        }).catch((err) => {
            message.tip(err || '分页查询患者病例信息失败!', 'warning')
        })
    }

    /**
     * 加载病历列表所有的Ag api
     * @param e
     * @param key
     */
    loadApi = (e, key) => {
        if(this.apiArray[key]===undefined){
            this.apiArray[key] = e.api
        }
    }
}

export const outpatientClinicDetailRecordLeftService =
    new OutpatientClinicDetailRecordLeftService('outpatientClinicDetailRecordLeftService')