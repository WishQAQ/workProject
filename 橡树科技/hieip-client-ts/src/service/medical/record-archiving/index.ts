import {BaseService} from 'tools/flux/BaseService'
import {Page} from 'pkg/entity'
import {ApiDictInput, ApiPatientPigeonhole} from 'pkg/api/medical'
import {DeptDictEntityDict, PatientPigeonholeEntityPatient} from 'pkg/entity/medical'
import {message} from 'pkg/common/message'
import moment from 'moment'
import {JsonUtil} from 'tools/api/JsonUtil'

/**
 * Created by mod on 2018/1/9.
 * 电子病历
 * 病案归档页面 server 对接
 */
export interface RecordArchivingState {
    /** 下拉科室集合 */
    deptList?: DeptDictEntityDict[],
    /** 出院时间 or 入院时间 */
    pitchon?: number,
    /** 开始时间 */
    begin?: Date
    /** 结束时间 */
    end?: Date
    /** 1:表示查询全部  2.表示查询已归档   0查询未归档 */
    status?: number  // 默认查询未归档病历
    /** 分页查询 */
    page?: Page,
    /** 总数 */
    total?: number
    /** 住院号/患者ID */
    inputData?: string

    /*-----------------------------------*/
    /** 页面时间组件时间数组 */
    times?: Array<any>
    /** 是否点击过 agTable */
    isAgClick?: boolean,
    /** 病案归档ag表格索引 */
    agTableIndex?: number,
    /** 病案归档 模型集 */
    pigeonholes?: PatientPigeonholeEntityPatient[],
    /** 病案归档 模型 */
    pigeonhole?: PatientPigeonholeEntityPatient,

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
    /** inputCode 多选对象数组 */
    deptObjectCode?: Array<any>,
    /** 科室编码，多选  */
    deptCode?: string,
}

class RecordArchivingService extends BaseService<RecordArchivingState> {
    recordArchivingApi ?: any
    defaultState = {
        dictCode: 'deptDict',
        deptList: [],
        pitchon: 1,
        status: 0,
        begin: null,
        end: null,
        patientId: '',
        pigeonholes: [],
        page: {
            pageSize: 100,
            startIndex: 1
        },
        inputPage: {
            pageSize: 7,
            startIndex: 1
        },
        total: 0,
        inputData: ''
    }

    /**
     * 加载service加载的数据
     */
    serviceWillMount() {
        this.reset()
    }

    /**
     * 表格加载获取数据
     */
    onGridReady = (parms) => {
        this.recordArchivingApi = parms
        this.onReverSource()
    }

    onReverSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.selectPigeonhole(params.startRow).then((data: any) => {
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
        this.recordArchivingApi.api.setDatasource(dataSource)
    }

    /*------------------------------------------------- HEAD BEGIN ---------------------------------------------------*/
    /**
     * 公共页面取值
     * @param name 相当于path，只能有一层，不能用.
     * @param event event
     */
    onDateChange = (event, name) => {
        this.dispatch({[name]: typeof(event) === 'object' ? event.target.value : event})
    }
    /**
     * 时间组件取值
     */
    onTimesChange = (event) => {
        this.dispatch({begin: event ? event[0] : null, end: event ? event[1] : null})
    }
    /**
     * 病案多选
     *
     * @param event
     */
    onSelectChange = (event) => {
        this.dispatch2({pigeonholes: []})
        let pigeonholes = []
        if (event) {
            event.forEach(val => {
                pigeonholes.push(val.data)
            })
        }

        this.dispatch2({pigeonholes: pigeonholes})
    }
    /**
     * 单选框取值
     * @param event
     */
    onRadioChange = (event) => {
        this.dispatch({status: event ? event.target.value : 0})
        this.onReverSource()
    }
    /**
     *  通过是否归档的状态确定是归档还是取消归档
     */
    onPigeonholeChange = () => {
        const {status, pigeonholes} = this.state
        if (JsonUtil.isEmpty(pigeonholes)) {
            message.tip('请至少选择一项!', 'warning', 'center')
            return
        }

        if (status || status === 0) {
            switch (status) {
                case 0: { // 未归档 --  归档
                    this.updatePigeonhole(pigeonholes)
                    break
                }
                case 2: { // 已归档 --  取消归档
                    this.deletePigeonhole(pigeonholes)
                    break
                }
                case 1: // 全部
                default:
                    break
            }
        }
    }
    /**
     * 病案归档
     */
    updatePigeonhole = (pigeonholes) => {
        ApiPatientPigeonhole.updatePigeonhole(pigeonholes).then(() => {
            this.onReverSource()
            message.tip('病案归档成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '病案归档失败', 'error', 'center')
        })
    }
    /**
     * 归档取消
     */
    deletePigeonhole = (pigeonholes) => {
        ApiPatientPigeonhole.deletePigeonhole(pigeonholes).then(() => {
            this.onReverSource()
            message.tip('取消归档成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '取消归档失败', 'error', 'center')
        })
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
            this.dispatch({inputLength: data.total, inputTableData: data})
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
                this.dispatch({
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
    /*------------------------------------------------- HEAD END -----------------------------------------------------*/

    /*------------------------------------------------ CONTENT BEGIN -------------------------------------------------*/
    /**
     * 日期格式公共方法
     *
     * @param params 日期原始值
     * @param type 格式类型 true：年月日   false： 年月日 时分秒
     * @returns {any}
     */
    gshTimes = (params, type: boolean) => {
        let val = params.value
        if (type) {
            val = val && moment(val).format('YYYY-MM-DD')
        } else {
            val = val && moment(val).format('YYYY-MM-DD HH:mm')
        }
        return val
    }
    /**
     * 病案归档模糊查询，预加载
     */
    selectPigeonhole = (startIndex?) => {
        this.dispatch({pigeonholes: []})
        const {pitchon, status, begin, end, inputData, deptCode, page} = this.state
        page.startIndex = startIndex ? startIndex : page.startIndex
        // console.log('查询条件 时间判断pitchon', pitchon, '\n归档状态 status', status, '\n开始时间 begin', begin,
        //     '\n结束时间 end', end, '\n查询条件 inputCode', inputData, '\n科室代码 deptCode', deptCode, '\n分页 page', page)
        return new Promise(resolve => {
            ApiPatientPigeonhole.selectPigeonhole(pitchon, status, begin, end, inputData, deptCode, page)
                .then(data => {
                    if (data && '[]' !== JSON.stringify(data)) {
                        this.dispatch2({total: data.total, page})
                    } else {
                        this.dispatch({total: 0})
                    }
                    resolve(data)
                }).catch(err => {
                message.tip(err || '加载失败', 'error', 'center')
            })
        })
    }
    /**
     * 单击表格某一行 获取该行下标和改行数据
     * @param e
     */
    handlerRowClicked = (e) => {
        this.dispatch({agTableIndex: e.rowIndex, pigeonhole: e.data, isAgClick: true})
    }
    /*------------------------------------------------- CONTENT END --------------------------------------------------*/

}

export const recordArchivingService = new RecordArchivingService('recordArchivingService')