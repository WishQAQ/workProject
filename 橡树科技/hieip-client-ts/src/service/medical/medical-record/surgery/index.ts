import {BaseService} from 'tools/flux/BaseService'
import {message} from 'pkg/common/message'
import {ApiDictInput} from 'pkg/api/medical'
import {OperationDtoPatient, Page} from 'pkg/entity/medical'
import {basicService} from '../basic/index'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface SurgerySate {
    /* ---界面所需变量--------------------*/
    agTableIndex?: number,
    /*是否点击过agTable*/
    isAgClick?: boolean,
    /*----service所需变量-------------------*/
    /*手术单模型,集合模型直接用basic中的operation*/
    surgery?: OperationDtoPatient,
    surgeries?: OperationDtoPatient[],

    /** input 模糊查询组件的分页 */
    inputPage?: Page,
    /** input 模糊查询组件的 模糊查询值 */
    inputCode?: string,
    /** input 模糊查询组件的表编码 */
    dictCode?: string,
}

/**
 * 李潇潇
 * 病案首页--手术Service
 */
class SurgeryService extends BaseService<SurgerySate> {
    /*手术信息Api*/
    surgeryApi ?: any
    defaultState = {
        surgery: {},
        inputPage: {
            startIndex: 1,
            pageSize: 7
        },
        dictCode: '',
        surgeries: []
    }

    /*---------------------页面方法  BEGIN----------------------*/
    /**
     * 获取agTable api
     */
    onGridReady = (params) => {
        this.surgeryApi = params
    }
    /**
     * 单击表格某一行 获取该行下标和改行数据
     * @param e
     */
    handlerRowClicked = (e) => {
        this.dispatch({agTableIndex: e.rowIndex, surgery: e.data, isAgClick: true})
    }
    /*---------------------页面方法   END----------------------*/

    /*---------------------service方法  BEGIN----------------------*/
    /**
     * 获取basic手术信息
     * @param operation
     */
    variableAssignment = (operation) => {
        this.dispatch2({surgeries: operation})
        if (this.surgeryApi) {
            this.surgeryApi.api.setRowData(operation)
        }
    }
    /**
     * 添加一行手术信息
     */
    addSurgeryEntity = () => {
        // 手术详细信息，用于页面的添加删除
        const {surgeries} = this.state
        surgeries.push(<OperationDtoPatient>{
            operatingDate: new Date()
        })
        this.surgeryApi.api.setRowData(surgeries)
        // 聚焦到新增的那行的第一个元素
        this.surgeryApi.api.startEditingCell({
            rowIndex: surgeries.length - 1,
            colKey: 'operationDesc'
        })
        // basicService.variableAssignment('operation', surgeries)
    }
    /**
     * 删除一行诊断信息
     */
    delSurgeryEntity = () => {
        const {surgeries} = this.state
        let {agTableIndex, isAgClick} = this.state
        if (!isAgClick) {
            message.tip('请选择需要删除的手术信息！', 'warning', 'center')
            return
        }
        surgeries.splice(agTableIndex, 1)
        basicService.variableAssignment('operation', surgeries)
        this.surgeryApi.api.setRowData(surgeries)
        this.dispatch({isAgClick: false})
    }
    /**
     * 麻醉方式取值
     * @param path
     * @param v
     */
    anaesthesiaMethodSelect = (v, path) => {
        const {agTableIndex} = this.state
        let keys = path.split('.')
        if (keys.length === 2) path = keys[0] + '.' + agTableIndex + '.' + keys[1]
        else return
        this.dispatch(JsonUtil.json(path, this.state, v.anaesthesiaName))
    }
    /**
     * 切口等级下拉框取值
     * @param v
     */
    healSelect = (v) => {
        const {agTableIndex} = this.state
        let list = this.state.surgeries
        list[agTableIndex].heal = v.value
        this.dispatch2({surgeries: list})
    }
    /**
     * 愈合情况下拉框取值
     * @param v
     */
    woundGradeSelect = (v) => {
        const {agTableIndex} = this.state
        let list = this.state.surgeries
        list[agTableIndex].woundGrade = v.value
        this.dispatch2({surgeries: list})
    }
    /**
     * 查询input 模糊查询组件的tltle
     */
    loadColumns = () => {
        let {dictCode} = this.state
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败!', 'error', 'center')
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData = () => {
        let {dictCode, inputPage, inputCode} = this.state
        return ApiDictInput.loadData(inputPage, dictCode, inputCode).then((data) => {
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * inputTable 组件的方法
     */
    showMessage = (v, calback, path?: string, dictCode?: string) => {
        switch (v.type) {
            case 'pageEvent':
            case 'changeEvent': {
                this.dispatch2({inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent}, inputCode: v.value})
                this.loadData().then(data => {
                    calback(data)
                })
                break
            }
            case 'enterEvent': {
                let {agTableIndex} = this.state
                if (dictCode === 'operationDict') {
                    this.dispatch(JsonUtil.json('surgeries.' + agTableIndex + '.operationDesc', this.state, v.data.operationName))
                    this.dispatch(JsonUtil.json('surgeries.' + agTableIndex + '.operationCode', this.state, v.data.operationCode))
                    this.dispatch(JsonUtil.json('surgeries.' + agTableIndex + '.operationLevel', this.state, v.data.operationScale))
                } else if (dictCode === 'workers') {
                    this.dispatch(JsonUtil.json('surgeries.' + agTableIndex + path, this.state, v.data.userName))
                }
                this.surgeryApi.api.setRowData(this.state.surgeries)
                break
            }
            // case 'clickEvent': {
            //     alert('点击')
            //     this.dispatch2({
            //         inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
            //         inputCode: v.value,
            //         dictCode: dictCode,
            //     })
            //     this.loadData().then(data => {
            //         calback(data)
            //     })
            //     break
            // }
            default:
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value,
                    dictCode: dictCode
                })
                this.loadData().then(data => {
                    calback(data)
                })
        }
    }

    /*---------------------service方法   END----------------------*/
}

export const surgeryService = new SurgeryService('surgery')