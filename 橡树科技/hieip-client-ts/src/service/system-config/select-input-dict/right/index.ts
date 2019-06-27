import {BaseService} from 'tools/flux/BaseService'
import {InputDictEntityDict} from 'pkg/entity'
import {ApiDictInput, ArrayData} from 'pkg/api'
import {message} from 'pkg/common/message'
import {inputDictService} from 'service/system-config/select-input-dict/left'
import {yellowPartition} from 'pkg/ui/patientControl/Header/ScreeningGroup/style/index.scss'
import {Page, SelectInputParamsEntityDict} from '../../../../packages/entity'

export interface RightInputDicState {

    /**
     * 控件的编号
     */
    dictCode?: string
    /**
     * 控件对应的table名称
     */
    tableName ?: string

    /**
     * 异常信息提示
     */
    errorMessage?: string

    /**
     * 控件的明细信息
     */
    // inputDictList?: ArrayData<InputDictEntityDict>
    inputDictList?: any

    /**
     * 明细信息
     */
    inputLists?: InputDictEntityDict[]
    /**
     * 对数据是否进行操作
     */
    operation?: boolean
    /**
     * table中所有的字段信息
     */
    tableDict?: Map<string, boolean>
    /**
     * 不能为空的字段
     */
    field?: any
    /**
     * 操作行下标
     */
    rowIndex?: number
    /**
     * 一个控件信息
     */
    input?: InputDictEntityDict
    /**
     * 模糊查询控件参数
     */
    selectInput?: Array<SelectInputParamsEntityDict>
    /**
     * 参数名称
     */
    colNames?: ArrayData<any>
    /**
     * 获取选中的行标
     */
    index?: number
}

class RightInputDictService extends BaseService<RightInputDicState> {
    agApi?: any
    params?: any
    inputDictService = inputDictService
    defaultState = {
        // inputDictList: [],
        operation: false,
        field: {
            colName: '列名称',
            colShowName: '显示名称',
            flagShow: '是否显示',
            showSerialNo: '序号不能为空',
            isLike: '是否是模糊查询',
            showWidth: '显示宽度'
        },
        selectInput: []
    }

    /**
     * 加载service的时候加载信息
     */
    serviceWillMount() {
        this.queryControl()
    }

    /**
     * 根据控件编号查询控件的明细信息
     */
    selectList = () => {
        let {dictCode} = this.getState()
        return ApiDictInput.selectList(dictCode).then(data => {
            const b = Array.apply('', data)
            this.dispatch2({inputDictList: data, inputLists: b})
        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取患者列表信息失败！'})
        })
    }

    /**
     * 根据表名查询该表名下所有列
     */
    selectTable = () => {
        const {tableName} = this.getState()
        // let result = tableName.match(/\w+\.(\w+)/)
        // let table = ''
        // if (!result) {
        //     table = tableName
        // } else {
        //     table = result[1]
        // }
        return ApiDictInput.selectTable(tableName).then(data => {
            let map = new Map<string, boolean>()
            data.map(d => {
                map.set(d.columnName, d.valuess)
            })
            this.dispatch({tableDict: map})

        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取table的所有字段信息失败！'})
        })
    }
    /**
     * 保存所有的信息
     */
    save = () => {
        let {inputDictList, input, selectInput} = this.getState()
        for (let i; i < selectInput.length; i++) {
            if (selectInput[i].colName == null) {
                message.tip('字段名称不能为空', 'warning')
                return
            }
        }
        return ApiDictInput.save(inputDictList, input, selectInput).then(data => {
            message.tip('成功', 'success')
        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取患者列表信息失败！'})
        })
    }
    /**
     * 获取患者列表中某一行数据
     */
    showCurRowMessage = (record) => {
        let tableName = record.tableName ? record.tableName : ''
        let result = tableName.match(/\w+\.(\w+)/)
        let table = ''
        if (!result) {
            table = tableName
        } else {
            table = result[1]
        }
        let dictCode = record.tableName ? record.tableName : ''
        dictCode = dictCode.replace(/(\w+)_?(\w+)?/ig, (str) => {
            return str.toLocaleLowerCase().replace(/_(\w)/g, ($1) => {
                return $1.toLocaleUpperCase().replace('_', '')
            })
        })
        this.dispatch({
            input: record ? record : {},
            dictCode: record.dictCode ? record.dictCode : dictCode,
            tableName: table
        })
        this.selectList()
        this.fuzzyQuery()
        this.selectTable()
    }

    /**
     * 右边table进行修改的操作状态更改
     */
    leftUpdate() {
        const {operation} = this.getState()
        inputDictService.updateStatus(operation)

    }

    /**
     * 新增控件的时候清空信息
     */
    onChangeqk = () => {
        let a = new Map<string, boolean>()
        // this.reset({inputDictList: [], tableDict: a, operation: false})
        this.reset({inputDictList: null, tableDict: a, operation: false})
    }

    /**
     * 明细信息新增一行进行判断
     */
        // addMasterLine =() =>{
        //     let {inputDictList,tableDict,field}= this.state
        //     let index=inputDictList.length
        //     if (index===0){
        //         this.panduan(inputDictList,tableDict)
        //     }else{
        //         let model=inputDictList[index-1]
        //         for(let key in field){
        //             if (field.hasOwnProperty(key)){
        //                 let value=model[key]
        //                 if(!value||value.length===0){
        //                     message.tip(field[key]+'不能为空','warning')
        //                     return
        //                 }
        //             }
        //
        //         }
        //         this.panduan(inputDictList,tableDict)
        //     }
        //
        // }
    verify = () => {
        let {field, inputDictList} = this.getState()
        for (let i = 0; i < inputDictList.length; i++) {
            for (let key in field) {
                if (field.hasOwnProperty(key)) {
                    let value = inputDictList[i][field[key]]
                    if (!value) {
                        inputDictList.splice(i, 1)
                        this.dispatch({inputDictList: inputDictList})
                        this.agApi.api.setRowData(inputDictList)
                    }
                }
            }
            this.save()
        }

    }
    /**
     * 新增
     */
    addMasterLine = () => {
        let {inputDictList, tableDict} = this.state
        if (inputDictList.length <= tableDict.size - 1) {
            let int = Math.round(100 / (inputDictList.length + 1))
            for (let i = 0; i < inputDictList.length; i++) {
                inputDictList[i].showWidth = int
            }
            inputDictList.push(<InputDictEntityDict>{
                showSerialNo: inputDictList.length + 1,
                flagShow: 1,
                isLike: 1,
                showWidth: int
            })
            this.agApi.api.setRowData(inputDictList)
            this.dispatch({inputDictList: inputDictList, operation: true})
        } else {
            message.tip('该控件不能在添加明细了', 'warning')
        }
    }
    /**
     * 新增加一行新的数据
     */
    panduan = (inputDictListpd: InputDictEntityDict[], tabelss: Map<string, boolean>) => {
        if (inputDictListpd.length <= tabelss.size - 1) {
            inputDictListpd[inputDictListpd.length] = <InputDictEntityDict>{}
            this.agApi.api.setRowData(inputDictListpd)
            this.dispatch({inputDictList: inputDictListpd, operation: true})
        } else {
            message.tip('你不可以再添加新的数据', 'warning')
        }
    }

    /**
     * 新增一行后改变api的状态
     */
    onGridReady = (params) => {
        this.agApi = params
    }
    /**
     * 删除一行的数据的方法
     */
    logicDelete = () => {
        let {rowIndex, inputDictList} = this.getState()
        inputDictList.splice(rowIndex, 1)
        this.dispatch({inputDictList: inputDictList})
        this.agApi.api.setRowData(inputDictList)
    }

    /**
     * onchange点击事件
     */
    onchange = (name, value) => {
        let {inputDictList, rowIndex, tableDict,} = this.state
        if (inputDictList[rowIndex][name]) {
            const a = Object.assign('', inputDictList[rowIndex])
            tableDict.set(a[name], false)
        }
        inputDictList[rowIndex][name] = value
        tableDict.set(value, true)
        this.dispatch({tableDict: tableDict, inputDictList: inputDictList})
    }

    onchangMain = (name, value) => {
        let {inputDictList, rowIndex} = this.state
        inputDictList[rowIndex][name] = value
        this.dispatch({inputDictList: inputDictList})
    }
    /**
     * 获取患者列表中某一行数据
     */
    showCurRow = (record) => {
        this.dispatch({rowIndex: record.rowIndex})
    }
    /**
     * 查询模糊查询控件的列明细信息
     * @param {string} inputCode
     * @param {Page} page
     * @returns {Promise<ArrayData<SelectInputParamsEntityDict> | void>}
     */
    fuzzyQuery = () => {
        let {dictCode} = this.getState()
        return ApiDictInput.fuzzyQuery(dictCode).then(data => {
            this.dispatch2({selectInput: data})
            return data
        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取模糊查询控件失败！'})
        })
    }
    /**
     * 新增一行后改变api的状态
     */
    onGridReady1 = (params) => {
        this.params = params
    }
    /**
     * 获取患者列表中某一行数据
     */
    showCurRow1 = (record) => {
        this.dispatch({index: record.rowIndex})
    }
    /**
     * 新增一行模糊查询控件参数
     */
    addMasterLine1 = () => {
        let {selectInput, dictCode} = this.state
        selectInput.push({
            colName: '',
            colNameJava: '',
            dictCode: dictCode,
            isMust: 1, // 0为可有可无，1为必须
            serialNo: selectInput.length + 1
        })
        this.params.api.setRowData(selectInput)
        this.dispatch({selectInput: selectInput, operation: true})
    }
    /**
     * 删除一行的数据的方法
     */
    controlsDelete = () => {
        let {index, selectInput} = this.getState()
        selectInput.splice(index, 1)
        this.dispatch({inputDictList: selectInput})
        this.params.api.setRowData(selectInput)
    }
    /**
     * 模糊查询控件参数
     * @returns {Promise<any>}
     */
    queryControl = (inputCode?: string, page?: Page) => {
        const {tableName} = this.getState()
        if (page === undefined) {
            page = ({
                startIndex: 1,
                pageSize: 7
            })
        }
        return ApiDictInput.queryControl(page, tableName, inputCode).then(data => {
            this.dispatch2({colNames: data})
            return data
        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取模糊查询控件失败！'})
        })
    }
    /**
     * 选中的控件参数
     * @param event
     */
    selected = (event) => {
        let {selectInput, index} = this.state
        selectInput[index].colName = event.data.value
        let colNameJava = event.data.value
        colNameJava = colNameJava.replace(/(\w+)_?(\w+)?/ig, (str) => {
            return str.toLocaleLowerCase().replace(/_(\w)/g, ($1) => {
                return $1.toLocaleUpperCase().replace('_', '')
            })
        })
        selectInput[index].colNameJava = colNameJava
        this.dispatch({selectInput: selectInput})
        this.params.api.setRowData(selectInput)
    }
    /**
     * 是否必须
     * @param v
     */
    doctorselect = (v) => {
        let {selectInput, index} = this.state
        selectInput[index].isMust = v.key
        this.dispatch({selectInput: selectInput})
        this.params.api.setRowData(selectInput)
    }
    /**
     *  点击事件调用的方法
     */
    onchangeValue = (e) => {
        let {selectInput, rowIndex} = this.state
        selectInput[rowIndex].isMust = e.target.value
        this.dispatch2({selectInput: selectInput})
    }
}

export const rightInputDictService = new RightInputDictService('rightInputDict')