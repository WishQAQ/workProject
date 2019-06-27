import {MrPatientFileIndexEntityPatient, Page, PatientFileArchivalCatalogingModelDtoPatient} from 'pkg/entity/medical'
import {BaseService} from 'tools/flux/BaseService'
import {ApiPatientFileArchivalCataloging, ArrayData, ApiDictInput} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {basicService} from 'service/medical/medical-record/basic'
import {diagnosisService} from 'service/medical/medical-record/diagnosis'
import {JsonUtil} from 'tools/api/JsonUtil'

/**
 * Created by lxx on 2018-1-23 17:20:29
 * 电子病历
 * 病案编目页面 server 对接
 */
export interface MedicalCatalogueSate {
    /*  病案编目 患者信息 集合*/
    data?: ArrayData<PatientFileArchivalCatalogingModelDtoPatient>,
    /*  病案编目 患者信息*/
    // patientFileArchivalCatalog?: PatientFileArchivalCatalogingModelDtoPatient,
    /* 病案编目 模型集合 */
    patientFileIndexes?: Array<MrPatientFileIndexEntityPatient>,

    /*  分页 */
    page?: Page
    /*  开始时间 */
    startDate?: Date
    /*  结束时间 */
    endDate?: Date
    /*  是否已编目 */
    isCatalog?: number
    /*  数据总数 */
    total?: number
    /* agTable 索引*/
    // agTableIndex?: number

    /*  查询条件 病案号/住院号 */
    inputData?: string,
    /*input 模糊查询组件的表编码*/
    dictCode?: string
    /*input 模糊查询组件的分页*/
    inputPage?: Page
    /* input 模糊查询组件的 模糊查询值*/
    inputCode?: string
    /*input 模糊查询组件的数据长度*/
    inputLength?: number
    /*input 模糊查询组件的数据*/
    inputTableData?: any
    /*input 模糊查询组件的title*/
    inputTitle?: any[]
    /*  inputCode 多选对象数组 */
    deptObjectCode?: Array<any>,
    /*  科室编码，多选  */
    deptCode?: string,
}

class MedicalCatalogueService extends BaseService<MedicalCatalogueSate> {

    /** 表格api */
    medicalSignApi?: any
    defaultState = {
        page: {
            startIndex: 1,
            pageSize: 100
        },
        inputPage: {
            pageSize: 7,
            startIndex: 1
        },
        inputLength: 0,
        deptCode: null,
        total: 0,
        dictCode: 'deptDict',
        inputData: '',
        isCatalog: 0
    }

    /**
     * 加载service加载的数据
     */
    serviceWillMount() {
        this.reset()
    }

    /**
     * 点击查询按钮
     */
    onSearchChange = () => {
        const {page} = this.state
        page.startIndex = 1
        this.dispatch2({page})
        this.onReverSource()
    }
    /**
     * 表格加载获取数据
     */
    onGridReady = (params) => {
        this.medicalSignApi = params
        this.onReverSource()
    }

    /**
     * 表格滚动加载
     */
    onReverSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.findPatientFile(params.startRow).then((data: any) => {
                    const {total} = this.state
                    let lastRow: number = 0
                    if (data) {
                        if (total <= params.endRow) lastRow = data.length
                        else if (total > params.endRow && lastRow < total) {
                            lastRow = params.startRow + data.length
                            if (lastRow % params.endRow === 0 && total > lastRow) {
                                lastRow = lastRow + 1
                            }
                        } else lastRow = total ? total : 0
                    }
                    params.successCallback(data, lastRow)
                })
            }
        }
        this.medicalSignApi.api.setDatasource(dataSource)
    }

    /**
     * 查询编目患者信息
     *
     * @param startIndex
     * @returns {Promise<any>}
     */
    findPatientFile = (startIndex?) => {
        this.dispatch2({data: null})
        const {isCatalog, startDate, endDate, deptCode, inputData, page} = this.state
        let searchCatalog: any = null
        isCatalog === 2 ? searchCatalog = null : searchCatalog = isCatalog

        page.startIndex = startIndex ? startIndex : page.startIndex
        return new Promise(resolve => {
            ApiPatientFileArchivalCataloging.FindPatientFile(searchCatalog, startDate, endDate, deptCode, inputData, page)
                .then(data => {
                    if (data && '[]' !== JSON.stringify(data)) {
                        this.dispatch2({total: data.total, page})
                    } else {
                        this.dispatch({total: 0})
                    }
                    resolve(data)
                }).catch(err => {
                message.tip(err || '查询失败', 'error', 'center')
            })
        })
    }

    /**
     * 病案编目
     * @constructor
     */
    ArchivalCataloging = () => {
        const {patientFileIndexes} = this.state
        if (JsonUtil.isEmpty(patientFileIndexes)) {
            message.tip('请至少选择一项!', 'warning', 'center')
            return
        }

        ApiPatientFileArchivalCataloging.ArchivalCataloging(patientFileIndexes).then(() => {
            this.onReverSource()
            message.tip('编目成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '编目失败', 'error', 'center')
        })
    }
    /**
     * 病案编目多选
     *
     * @param event
     */
    onSelectChange = (event) => {
        this.dispatch({patientFileIndexes: []})
        let savePatientFileIndexes = []
        if (event) {
            event.forEach(val => {
                // this.dispatch2(JsonUtil.json('', this.state, val.data))
                savePatientFileIndexes.push(<MrPatientFileIndexEntityPatient>{
                    patientId: val.data.patientId,
                    visitId: val.data.visitId
                })
            })
        }
        this.dispatch2({patientFileIndexes: savePatientFileIndexes})
    }

    /**
     * time
     */
    onChangeTime = (event) => {
        let startDate = event ? event[0] : null
        let endDate = event ? event[1] : null
        this.dispatch({startDate: startDate, endDate: endDate})
    }

    /**
     * 输入框
     */
    onChangeInput = (e) => {
        this.dispatch2({inputData: e.target.value})
    }
    /**
     * radioChange
     */
    onRadioChange = (e) => {
        this.dispatch2({isCatalog: e.target.value})
        this.onSearchChange()
    }

    /**
     * 表格选择行
     * @param e
     */
    agTableClick = (e) => {
        // this.dispatch({agTableIndex: e.rowIndex, patientFileArchivalCatalog: e.data})
        basicService.getPatientMedical(e.data.patientId, e.data.visitId)
        // 加载制定患者的诊断信息
        diagnosisService.loadDiagnosis(e.data.patientId, e.data.visitId)
    }

    /**
     * 查询input 模糊查询组件的title
     */
    loadColumns = () => {
        let {dictCode} = this.state
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            this.dispatch2({inputTitle: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData = () => {
        let {dictCode, inputPage, inputCode} = this.state
        return ApiDictInput.loadData(inputPage, dictCode, inputCode).then((data) => {
            this.dispatch2({inputLength: data.total, inputTableData: data})
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 获取患者列表中某一行数据
     */
    showMessage = (v) => {
        switch (v.type) {
            case 'pageEvent': { // 分页事件，上下页加载信息
                this.dispatch({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })

                this.loadData()
                break
            }
            case 'enterEvent': { // 点击确认
                this.dispatch({
                    inputCode: v.data.value,
                    deptObjectCode: v.multiValue,
                    deptCode: v.value.join()
                })
                break
            }
            case 'removeEvent': {
                this.dispatch2({
                    deptObjectCode: v.multiValue,
                    deptCode: v.value.join()
                })
                break
            }
            case 'changeEvent': { // 输入框模糊搜索，加载信息
                this.dispatch({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })

                this.loadData()
                break
            }
            case 'clickEvent': {
                this.loadColumns()
                this.loadData()
                break
            }
            default:
                break
        }
    }
}

export const medicalCatalogueService = new MedicalCatalogueService('medicalCatalogue')