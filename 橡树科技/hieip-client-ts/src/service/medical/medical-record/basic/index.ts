import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiDictInput, ApiPatientMrMedicalHome, ArrayData} from 'pkg/api/medical'
import {BaseService} from 'tools/flux/BaseService'
import {
    AnaesthesiaDictEntityDict, CountryDictDtoDict, DiagnosisModelDtoPatient, HospitalDictEntityDict,
    MrModelDtoPatient, OccupationDictDtoDict, OperationDtoPatient, Page, PatientClassDictEntityDict,
    RelationshipDictDtoDict
} from 'pkg/entity/medical'
import {diagnosisService} from '../diagnosis/index'
import {surgeryService} from '../surgery/index'
import {expenseService} from 'service/medical/medical-record/expense'
import {object} from 'prop-types'

/**
 * 李潇潇
 * 病案首页--基本Service
 */
export interface BasicState {
    /* ---界面所需变量--------------------*/
    /* 只有通过选择的人员才可以保存 */
    isWorkerChange?: boolean,
    /* 是否允许整个页面不可被编辑 */
    disableAll?: boolean,
    /* 是否显示按钮*/
    paySortAlter?: boolean,
    /* 多种付费方式*/
    paySorts?: Array<any>,
    /** 婚姻字典 */
    maritalStatus?: Array<any>,
    /** 过敏药物 */
    ywgm?: Array<any>,
    /** 病案质量 */
    mrQuality?: Array<any>,
    /** 血型字典 */
    bloodType?: Array<any>,
    /** 离院方式字典 */
    dischargeDisposition?: Array<any>,
    /* 门诊住院诊断是否符合 */
    inandout?: Array<any>,

    /* 是否显示时间输入弹窗*/
    isShowTime?: boolean,
    /* 时间弹窗*/
    /* --天*/
    timeWinDay?: string,
    /* 时间弹窗--时*/
    timeWinHour?: string,
    /* 时间弹窗--分*/
    timeWinMinute?: string,
    /** 界面时间展示 昏迷时间（颅内操作患者）：入院后 */
    timeMosaic?: string,

    /* ----service所需变量-------------------*/
    /* 患者ID*/
    patientId?: string,
    visitId?: number
    /* 病案首页基本api*/
    agApi?: any,
    /* 是否保存*/
    isSave?: boolean,

    /* 患者基本信息*/
    patient?: MrModelDtoPatient,
    /* 诊断信息model*/
    diagnosis?: ArrayData<DiagnosisModelDtoPatient>,
    /* 用于保存的诊断信息集合*/
    saveDiagnoses?: Array<DiagnosisModelDtoPatient>,
    /* 手术信息model*/
    operation?: ArrayData<OperationDtoPatient>,
    /* 国籍字典model*/
    controlDict?: CountryDictDtoDict[],
    /* 关系字典model*/
    relationshipDict?: RelationshipDictDtoDict[],
    /* 职业字典model*/
    occupationDict?: OccupationDictDtoDict[],
    /* 入院途径字典model*/
    patientClassDict?: PatientClassDictEntityDict[],
    /* 麻醉方式字典model*/
    anaesthesiaDict?: AnaesthesiaDictEntityDict[],
    /* 医院字典信息 */
    hospitalDict?: HospitalDictEntityDict[],
    /* 用于保存页面显示过敏药物 */
    allergies?: any[],

    /* input 模糊查询组件的表编码*/
    dictCode?: string

    /* input 模糊查询组件的分页*/
    inputPage?: Page
    /*  input 模糊查询组件的 模糊查询值*/
    inputCode?: string
    /* input 模糊查询组件的数据长度*/
    inputLength?: number
    /* input 模糊查询组件的数据*/
    inputData?: any
    /* input 模糊查询组件的title*/
    inputTitle?: any[]
}

class BasicService extends BaseService<BasicState> {
    defaultState = {
        isWorkerChange: true,
        disableAll: false,
        patient: {},
        paySortAlter: false,
        isShowTime: false,
        isSave: false,
        currentPaySort: '自费',
        allergies: [],
        inputPage: {
            startIndex: 1,
            pageSize: 7
        },
        paySorts: [
            '城镇职业基本医疗保险',
            '城镇居民基本医疗保险',
            '新型农村合作医疗保险',
            '贫困求助',
            '商业医疗保险',
            '全公费',
            '全自费'
        ],
        maritalStatus: [
            {name: '未婚', id: 'WH', inputCode: 'WH'},
            {name: '已婚', id: 'YH', inputCode: 'YH'},
            {name: '丧偶', id: 'SO', inputCode: 'SO'},
            {name: '离婚', id: 'LH', inputCode: 'LH'},
            {name: '再婚', id: 'ZH', inputCode: 'ZH'},
            {name: '复婚', id: 'FH', inputCode: 'FH'},
            {name: '初婚', id: 'CH', inputCode: 'CH'},
            {name: '其他', id: 'QT', inputCode: 'QT'}
        ],
        ywgm: [
            {value: '鸡', key: 'JI'},
            {value: '鸭', key: 'YA'},
            {value: '鱼', key: 'YU'},
            {value: '抗生素', key: 'KSS'},
            {value: '青霉素', key: 'QMS'},
            {value: '消炎胶囊', key: 'XYJN'},
            {value: '健胃消食片', key: 'JWXSP'},
            {value: '乳酸口服液', key: 'RSKFY'}
        ],
        mrQuality: [
            {name: '甲', id: '1', inputCode: 'JIA'},
            {name: '乙', id: '2', inputCode: 'YI'},
            {name: '丙', id: '3', inputCode: 'BING'},
            {name: '丁', id: '4', inputCode: 'DING'}
        ],
        bloodType: [
            {name: 'A', id: 'A', inputCode: 'A'},
            {name: 'B', id: 'B', inputCode: 'B'},
            {name: 'O', id: '0', inputCode: '0'},
            {name: 'AB', id: 'AB', inputCode: 'AB'},
            {name: '不详', id: 'BX', inputCode: 'BX'},
            {name: '未查', id: 'WC', inputCode: 'WC'}
        ],
        dischargeDisposition: [
            {name: '医嘱离院', id: '1', inputCode: 'YZLY'},
            {name: '医嘱转院', id: '2', inputCode: 'YZZY'},
            {name: '医嘱转社区卫生机构/乡镇卫生院', id: '3', inputCode: 'YZZSQ'},
            {name: '非医嘱离院', id: '4', inputCode: 'FYZLY'},
            {name: '死亡', id: '5', inputCode: 'SW'},
            {name: '其他', id: '9', inputCode: 'QT'}
        ],
        inandout: [
            {name: '是', id: '1', inputCode: 'Y'},
            {name: '否', id: '2', inputCode: 'N'}
        ],
        dictCode: '',
        patientId: '1708183062',
        visitId: 1
    }

    /* 页面预加载*/
    serviceWillMount() {
        this.getPatientMedical()
        diagnosisService.loadDiagnosis()
    }

    /*---------------------页面方法  BEGIN----------------------*/
    /**
     * 显示按钮
     */
    handlePaySortAlterShow = () => {
        this.dispatch({paySortAlter: true})
    }
    /**
     * 时间弹窗隐藏
     */
    handleCancel = () => {
        this.dispatch({isShowTime: false})
    }
    /**
     * 时间弹窗显示
     */
    showTimeWindow = () => {
        this.dispatch({isShowTime: true})
    }
    /**
     * 修改付费方式
     * @param value 付费方式
     */
    handleChangePaySort = (value) => {
        this.dispatch({
            patient: {chargeTypeEmr: value},
            paySortAlter: false
        })
    }
    /**
     * 数据采集
     * @param path
     * @param value
     */
    onChangeDataSet = (value, ...path) => {
        if (value instanceof object)
            this.dispatch(JsonUtil.json2(path, this.state, value.target.value))
        else this.dispatch(JsonUtil.json2(path, this.state, value))
    }

    /**
     * 只能录入正整数数字
     * @param path 路径
     * @param {number} maxLength 最大长度
     * @param data 值
     */
    setInputNumber = (data, maxLength: number, ...path) => {
        let newData = ''
        // 判断是否为 直接值或event
        if (data instanceof Object)
            newData = data.target.value
        else newData = data

        // 有非数字字符时,替换
        if (/[^\d]/.test(data)) {
            newData = newData.replace(/[^\d]/g, '')// 替换非数字字符
        }
        // 判断是否超过最大长度,超过则截取
        if (!JsonUtil.isEmpty(maxLength) && data.length > maxLength) {
            newData = newData.substr(0, maxLength)
        }
        // 根据路径设置值
        this.onChangeDataSet(newData, path)
    }

    /**
     * 下拉框取值
     * @param value
     * @param path
     */
    onSelectDataSet = (value, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, value))
    }
    /**
     * 过敏药物多选取值
     * @param values
     */
    onMoreSelect = (values) => {
        let value = ''
        if (values && values.length > 0) {
            values.map(v => {
                value += v.value + ','
            })
        }
        this.dispatch2({allergies: values})
        this.dispatch({patient: {alergyDrugs: value.substr(0, value.length - 1)}})
    }
    /**
     * 昏迷时间（颅内操作患者）：入院后 ,时间拼接
     */
    comaTimeUpdate = () => {
        const {patient, ywgm} = this.state
        if (patient && patient !== null) {
            const day = patient.firstComaDay ? patient.firstComaDay : 0
            const hour = patient.firstComaHour ? patient.firstComaHour : 0
            const minute = patient.firstComaMinute ? patient.firstComaMinute : 0
            this.dispatch({
                isShowTime: false,
                timeMosaic: day + '天/' + hour + '小时/' + minute + '分钟'
            })

            const allergy = patient.alergyDrugs ? patient.alergyDrugs.split(',') : []
            let allergies = []
            allergy.forEach(v => {
                let allergyModel: any = {}
                ywgm.forEach(_v => {
                    if (v === _v.value) {
                        allergyModel.key = _v.key
                        allergyModel.value = _v.value
                        allergies.push(allergyModel)
                    }
                })
            })
            this.dispatch2({allergies: allergies})
        }
    }
    /*---------------------页面方法   END----------------------*/

    /*---------------------service方法  BEGIN----------------------*/

    /**
     * 为basic的属性赋值
     * @param variable
     * @param item
     */
    variableAssignment = (variable, item) => {
        if (variable && variable === 'saveDiagnoses')
            this.dispatch2({saveDiagnoses: item})
        if (variable && variable === 'operation')
            this.dispatch2({operation: item})
    }

    /**
     * 病案首页信息加载
     */
    getPatientMedical = (pId?, vId?) => {
        this.dispatch2({patient: {}})
        let patientId = pId ? pId : this.state.patientId
        let visitId = vId ? vId : this.state.visitId
        ApiPatientMrMedicalHome.getPatientMedical(patientId, visitId).then((data) => {
            for (let key in data) {
                if (data[key]) {
                    this.state[key] = data[key]
                }
            }
            this.dispatch2(this.state)
            surgeryService.variableAssignment(this.state.operation)
            expenseService.variableAssignment(this.state.patient)
            this.comaTimeUpdate()
        }).catch(err => {
            message.tip(err || '信息加载失败！', 'error', 'center')
        })
    }
    /**
     * 保存病案首页信息
     * @returns {Promise<any>}
     */
    save = () => {
        const {patient, saveDiagnoses, isWorkerChange} = this.state
        let {surgeries} = surgeryService.state
        if (!isWorkerChange) {
            message.tip('工作人员姓名有误，请重新填写', 'warning', 'center')
            return
        }
        if (surgeries.length > 0) { // 判断是否存在手术信息
            let indexes = []
            surgeries.forEach((val, index) => { // 手术信息中必须传递传递的参数验证
                if (val && (val.operationDesc === '' || typeof (val.operationDesc) === 'undefined'
                        || val.operationCode === '' || typeof (val.operationCode) === 'undefined'
                        || val.anaesthesiaMethod === '' || typeof (val.anaesthesiaMethod) === 'undefined')) {
                    indexes.push(index)
                }
            })
            if (indexes.length > 0) { // 存在空的必传参数且同意删除该行时，删除该行继续保存操作
                message.linkAge('警告: 手术名称,手术编码,麻醉方式为空,该行记录不会被更新 ！', null, '确定', '取消', () => {
                    indexes.map(v => {
                        surgeries.splice(v, 1)
                        this.mrSave(patient, surgeries, saveDiagnoses)
                    })
                })
            } else this.mrSave(patient, surgeries, saveDiagnoses)
        } else this.mrSave(patient, surgeries, saveDiagnoses)
    }
    /**
     * 保存病案首页信息API方法
     *
     * @param patient 患者基本信息
     * @param surgeries 手术信息
     * @param saveDiagnoses 诊断信息
     */
    mrSave = (patient, surgeries, saveDiagnoses) => {
        ApiPatientMrMedicalHome.save(patient, surgeries, saveDiagnoses).then(() => {
            this.dispatch({isSave: true})
            diagnosisService.loadDiagnosis()
            surgeryService.variableAssignment(surgeries)
            message.tip('病案首页更新成功！', 'success', 'center')
        }).catch(err => {
            message.tip(err || '病案首页更新失败！', 'error', 'center')
        })
    }
    /**
     * 诊断页面点击保存，对所有的诊断信息进行单独处理,赋值给basicService的保存方法
     */
    saveDiag = () => {
        diagnosisService.diagMapSetData()
        const {diagMap} = diagnosisService.state
        let saveList = []
        for (let obj in diagMap) {
            if (diagMap[obj] && typeof(obj) !== 'undefined') {
                saveList = saveList.concat(diagMap[obj])
            }
        }
        let diagIndexes = []
        saveList.forEach((val, index) => {
            if (val && (val.diagnosisFlag === '' || typeof (val.diagnosisFlag) === 'undefined'
                    || val.otherTypeName === '' || typeof (val.otherTypeName) === 'undefined'
                    || val.diagnosisTypeName === '' || typeof (val.diagnosisTypeName) === 'undefined'
                    || val.diagnosisCode === '' || typeof (val.diagnosisCode) === 'undefined'
                    || val.diagnosisDesc === '' || typeof (val.diagnosisDesc) === 'undefined'
                    || val.diagnosisDate === '' || typeof (val.diagnosisDate) === 'undefined')) {
                diagIndexes.push(index)
                saveList.splice(index, 1)
            }
        })
        if (diagIndexes.length > 0) {
            message.linkAge('警告: 诊断类型,诊断阶段,诊断类别,诊断编码,诊断描述,诊断时间为空,该行记录不会被更新 ！', null, '确定', '取消', () => {
                diagIndexes.map(v => saveList.splice(v, 1))
                this.dispatch2({saveDiagnoses: saveList})
                this.save()
            })
        } else {
            this.dispatch2({saveDiagnoses: saveList})
            this.save()
        }
    }
    /**
     * 打印病案首页信息
     */
    print = () => {
        message.success('今天打谁呢')
    }
    /**
     * 查询input 模糊查询组件的title
     */
    loadColumns = () => {
        let {dictCode} = this.state
        return ApiDictInput.loadColumns(dictCode).then((data) => {
            this.dispatch({inputTitle: data})
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
            this.dispatch2({inputLength: data.total, inputData: data})
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 获取患者列表中某一行数据
     */
    showMessage = (v, dictCode?: string, ...path: string[]) => {
        switch (v.type) {
            case 'pageEvent': {
                // 当查询民族时保存编码(nationCode)，显示文本(nationName)
                if (dictCode === 'nation')
                    this.dispatch({patient: {nationName: v.nationName}})
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })
                this.loadData()
                break
            }
            case 'enterEvent': {
                if (dictCode === 'nation') {
                    this.dispatch(JsonUtil.json2(path, this.state, v.data.nationCode ? v.data.nationCode : ''))
                    this.dispatch({patient: {nationName: v.data.nationName}})
                } else if (dictCode === 'workers') {
                    this.dispatch(JsonUtil.json2(path, this.state, v.data.userName ? v.data.userName : ''))
                    this.dispatch({isWorkerChange: true})
                } else if (dictCode === 'address') {
                    this.dispatch(JsonUtil.json2(path, this.state, v.data.areaName ? v.data.areaName : ''))
                } else if (dictCode === 'deptDict')
                    this.dispatch(JsonUtil.json2(path, this.state, v.data.key ? v.data.key : ''))
                break
            }
            case 'changeEvent': {
                if (dictCode === 'nation')
                    this.dispatch({patient: {nationName: v.value}})
                if (dictCode === 'workers') {
                    this.dispatch({isWorkerChange: false})
                }
                this.dispatch(JsonUtil.json2(path, this.state, v.value))
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value
                })
                this.loadData()
                break
            }
            case 'clickEvent': {
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value,
                    dictCode: dictCode
                })
                this.loadColumns()
                this.loadData()
                break
            }
            case 'blurEvent': {
                this.dispatch2({
                    inputTitle: [],
                    inputLength: 0,
                    inputData: []
                })
                break
            }
            default:
                break
        }
    }
    /*---------------------service方法   END----------------------*/
}

export const basicService = new BasicService('basic')