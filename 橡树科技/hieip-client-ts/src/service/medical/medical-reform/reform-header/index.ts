import {BaseService} from 'tools/flux/BaseService'
import {Page, PatMasterInfoModelDtoLinkQuality} from 'pkg/entity/medical'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiDictInput} from 'pkg/api'
import {reformContentService} from 'service/medical/medical-reform/reform-content'

/**
 * 病历整改 头部操作栏
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-1-31
 */
export interface ReformHeaderState {
    // 患者整改数据查询
    status?: number,            // 为1查询已经质控了的患者信息,为0查询没有质控的患者信息,为2查询全部
    begin?: Date,               // 查询的开始时间
    end?: Date,                 // 查询的结束时间
    info?: number,              // 0.查询已经死亡的患者信息;1.危重症（住院）患者;2.进行输血的患者;3.住院30天出院的患者;4.住院30天还在住院的患者;5.危重症出院患者;6.多次手术的患者 ;7.手术患者
    type?: string,              // 根据费用类别进行模糊查询
    comeOut?: number,           // 1: 查询住院患者的质控, 2: 出院患者的质控
    radio?: number,             // 1: 24小时 2.一周  3.全部
    value?: string,             // 姓名,patientId,身份证号码,医保号,健康档案,住院号
    deptCode?: string,          // 科室代码
    page?: {                    // 分页对象
        startIndex?: number,
        pageSize?: number
    }
    types?: Array<{ key: any, value: string }>      // 费用类型
    infos?: Array<{ key: number, value: string }>   // 病历类型
    patientData?: Array<PatMasterInfoModelDtoLinkQuality>   // 所有患者信息

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
    /* 模糊查询数据总条数 */
    total?: number,
}

class ReformHeaderService extends BaseService<ReformHeaderState> {
    defaultState = {
        status: 2,
        begin: null,
        end: null,
        info: 1,
        comeOut: 1,
        radio: 3,
        value: '',
        page: {
            startIndex: 0,
            pageSize: 7
        },
        infos: [
            {key: 0, value: '死亡患者'},
            {key: 1, value: '危重症(住院患者)'},
            {key: 2, value: '输血患者'},
            {key: 3, value: '住院30天出院患者'},
            {key: 4, value: '住院30天患者'},
            {key: 5, value: '危重症(出院患者)'},
            {key: 6, value: '多次手术的患者'},
            {key: 7, value: '手术患者'}
        ],
        types: [
            {key: '0', value: '自费'},
            {key: '1', value: '异地医保'},
            {key: '2', value: '商业医疗'},
            {key: '3', value: '医保'},
            {key: '4', value: '优惠'},
        ],
        patientData: [],

        inputLength: 0,
        total: 0,
        dictCode: 'deptDict',
        inputData: '',
    }

    // 初始化过程加载患者数据
    serviceWillMount() {
        this.reset()
    }

    // // 在院患者，出院患者切换
    // onPatientTypeChange = (event) => {
    //     this.dispatch({
    //         search: {
    //             ...this.state.search,
    //             comeOut: event.target.value
    //         }
    //     })
    // }
    //
    // // 患者姓名/patientId/身份证号码绑定
    // onPatientNameChange = (event) => {
    //     this.dispatch({
    //         search: {
    //             ...this.state.search,
    //             value: event.target.value
    //         }
    //     })
    // }
    //
    // // 病历类型改变的回调函数
    // onMedicalTypeChange = (value) => {
    //     this.dispatch({
    //         search: {
    //             ...this.state.search,
    //             type: value
    //         }
    //     })
    // }
    //
    // // 时间选项
    // onTimeRadioChange = (event) => {
    //     this.dispatch({
    //         search: {
    //             ...this.state.search,
    //             radio: event.target.value
    //         }
    //     })
    // }
    // // 时间段选择
    // onTimeSlotChange = (event) => {
    //     this.dispatch({
    //         search: {
    //             ...this.state.search,
    //             radio: event.target.value
    //         }
    //     })
    // }
    // // 科室集合
    // onDeptCodeChange = (event) => {
    //     this.dispatch({
    //         search: {
    //             ...this.state.search,
    //             radio: event.target.value
    //         }
    //     })
    // }

    /**
     * 输入框取值
     */
    onValueChange = (value, path) => {
        this.dispatch(JsonUtil.json(path, this.state, value))
    }

    /**
     * 单选框取值
     */
    onRadioChange = (event, path) => {
        this.dispatch(JsonUtil.json(path, this.state, event.target.value))
        reformContentService.onReveresSource()
    }
    /**
     * 下拉框取值
     */
    onSelectChange = (value, path) => {
        if (value && typeof (value) === 'object') { // selectEvent value为object
            path && 'type' === path
                ? this.dispatch(JsonUtil.json(path, this.state, value.value))
                : this.dispatch(JsonUtil.json(path, this.state, value.key))
        } else if (!value || typeof  (value) === 'undefined') // value 为空
            this.dispatch(JsonUtil.json(path, this.state, ''))
    }
    /**
     * 时间框取值
     */
    onTimeChange = (value) => {
        this.dispatch({
            begin: value[0],
            end: value[1]
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
                this.dispatch({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })
                this.loadColumns()
                this.loadData()
                break
            }
            default:
                break
        }
    }
    //
    // // 搜索患者质控数据
    // onSearchPatientData = () => {
    //     this.getPatientData()
    // }

}

export const reformHeaderService = new ReformHeaderService('reformHeader')