import {BaseService} from 'tools/flux/BaseService'
import {ApiSplitMhPatientVisit} from 'pkg/api'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiPatManageOutpBillingOutpbilling, ArrayData} from '../../../../../packages/api'
import {OutpBillingEntityPatManageOutpBilling, OutpBillingItemsEntityPatManageOutpBilling} from '../../../../../packages/entity'
import {billDetailService} from '../bill-detail'
import {patientBasicService} from '../../patient-basic'
import {loginService} from '../../../../user/login'

export interface BillTempModalState {
    /**
     * 门诊计费模板的主表
     */
    modelList?: ArrayData<OutpBillingEntityPatManageOutpBilling>
    /**
     *  门诊计费模板的明细
     */
    dataList?: ArrayData<OutpBillingItemsEntityPatManageOutpBilling>
    /**
     * 表格数据当前选中行索引
     */
    dataListIndex?: number
    /**
     * 表格数据input框选中行
     */
    dataListSelectRow?: Array<any>
    /**
     * 是否显示页面
     */
    isShow?: boolean
    /**
     * 模糊查询
     */
    inputCode?: string
    /**
     * 标示
     */
    flag?: string
}

class BillTempModalService extends BaseService<BillTempModalState> {
    agApi ?: any
    agApiItem ?: any
    defaultState = {
        /**
         * 门诊计费模板的主表
         */
        modelList: <ArrayData<OutpBillingEntityPatManageOutpBilling>><any>[],
        /**
         *  门诊计费模板的明细
         */
        dataList: <ArrayData<OutpBillingItemsEntityPatManageOutpBilling>><any>[],
        /**
         * 是否显示页面
         */
        isShow: false,
        /**
         * 模糊查询
         */
        inputCode: '',
        /**
         * 标示
         */
        flag: '个人',
    }

    serviceWillMount() {
        //
    }

    /* =====分界线: 一、后台处理: 开始===== */

    /* =====分界线: 1、查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 开始===== */

    /* =====分界线: 1.1、字典表查询: 结束===== */

    /* =====分界线: 1.2、其它查询: 开始===== */
    /**
     * 查询门诊计费模板
     */
    select = () => {
        const {inputCode, flag} = this.state
        return ApiPatManageOutpBillingOutpbilling.select(inputCode, flag).then((data) => {
            this.dispatch2({modelList: data})
            // 默认显示第一个
            if (data && data.length > 0) {
                this.selectOutpBillingItems(data[0].id)
                setTimeout(() => {
                    // 默认全部选中
                    this.agApi.api.forEachNode(function (node) {
                        if (0 === node.rowIndex) {
                            node.setSelected(true)
                        } else {
                            node.setSelected(false)
                        }
                    })
                }, 100)
            }
            // 由于目前 dispatch 刷新 后，会刷新表格数据,  再次 setRowData 则多余,查询禁用 setRowData
            // if(this.agApi && this.agApi.api){
            //     this.agApi.api.setRowData(data)
            // }
        }).catch(msg => {
            message.tip(msg || '查询门诊计费模板失败!')
        })
    }
    /**
     * 根据门诊模板的主表id查询到模板中的明细
     */
    selectOutpBillingItems = (id) => {
        return ApiPatManageOutpBillingOutpbilling.selectOutpBillingItems(id).then((data) => {
            this.dispatch2({dataList: data})
            setTimeout(() => {
                // 默认全部选中
                this.agApiItem.api.forEachNode(function (node) {
                    node.setSelected(true)
                })
            }, 100)

            // 由于目前 dispatch 刷新 后，会刷新表格数据,  再次 setRowData 则多余,查询禁用 setRowData
            // this.agApiItem.api.setRowData(data)
        }).catch(msg => {
            message.tip(msg || '根据门诊模板的主表id查询到模板中的明细失败!')
        })
    }
    /* =====分界线: 1.2、其它查询: 结束===== */

    /* =====分界线: 1、查询: 结束===== */

    /* =====分界线: 一、后台处理: 结束===== */

    /* =====分界线: 2、修改: 开始===== */
    /* =====分界线: 2、修改: 结束===== */

    /* =====分界线: 二、前端处理: 开始===== */
    /* =====分界线: 对外值改变: 开始===== */
    /**
     * 设置值: 公共对外值改变
     */
    setStateJson = (data, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, data))
    }

    /**
     * 查询模板: 公共对外
     */
    loadTemp = () => {
        this.dispatch2({isShow: true})
        this.select()
    }

    /**
     * 确定: 使用模板
     */
    setTemp = () => {
        const {dataList, dataListSelectRow} = this.state
        if (!dataListSelectRow.length || dataListSelectRow.length === 0) {
            message.tip('请至少选择一条数据!')
            return
        }
        const {modelList} = billDetailService.state
        let list = []
        dataListSelectRow.forEach((key) => {
            let data = dataList[key]
            list.push({
                editable: 1,
                itemClassName: data.itemClassName,
                itemClass: data.itemClass,
                itemCode: data.itemCode,
                itemName: data.itemName,
                itemSpec: data.itemSpec,
                amount: data.amount || 1,
                operaterRefound: null,
                units: data.units,
                orderedByDoctor: {
                    id: loginService.state.user.id,
                    name: loginService.state.user.name
                },
                orderedByDept: {
                    id: patientBasicService.state.model.deptCode,
                    deptName: patientBasicService.state.model.deptName
                },
                performedBy: {
                    id: (data.performedBy && data.performedBy.id) ?
                        data.performedBy.id : patientBasicService.state.model.deptCode,
                    deptName: (data.performedBy && data.performedBy.deptName) ?
                        data.performedBy.deptName : patientBasicService.state.model.deptName
                },
                billDate: new Date(),
                itemPrice: data.price,
                cost: data.price * data.amount,
                charges: data.price * data.amount,
            })
        })
        list = modelList.concat(list)
        billDetailService.setStateJson2(list, 'modelList')
        this.dispatch2({isShow: false})
    }

    /**
     * ag表格选择
     */
    agTabSelectRow = (nodes) => {
        let dataListSelectRow = []
        if (nodes) {
            nodes.forEach((node) => {
                dataListSelectRow.push(node.rowIndex)
            })
        }
        this.dispatch2({dataListSelectRow})
    }
    /* =====分界线: 对外值改变: 结束===== */

    /**
     * 页面刷新
     * @param params
     */
    onGridReady = (params) => {
        this.agApi = params
        this.agApi.api.sizeColumnsToFit()
    }

    /**
     * 页面刷新
     * @param params
     */
    onGridReadyItem = (params) => {
        this.agApiItem = params
        this.agApiItem.api.sizeColumnsToFit()
    }
    /* =====分界线: 二、前端处理: 结束===== */
}

export const billTempModalService = new BillTempModalService('billTempModal')