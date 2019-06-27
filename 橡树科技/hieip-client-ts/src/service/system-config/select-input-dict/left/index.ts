import {BaseService} from 'tools/flux/BaseService'
import {InputDictEntityDict} from 'pkg/entity'
import {ApiDictInput} from 'pkg/api'
import {rightInputDictService} from 'service/system-config/select-input-dict/right'
import {message} from 'pkg/common/message'
import {Page} from '../../../../packages/entity'
import {ArrayData} from '../../../../packages/api'

export interface InputDictState {

    /**
     * 控件主要信息
     */
    inputDict?: InputDictEntityDict[]

    /**
     * 一个控件信息
     */
    input?: InputDictEntityDict
    /**
     * 异常信息提示
     */
    errorMessage?: string
    /**
     * table名称或者是空间名称
     */
    name?: string
    /**
     * 控件的编号
     */
    dictCode?: string
    /**
     * 操作行下标
     */
    rowIndex?: number

    /**
     * 右边table是否进行操作
     */
    operation?: boolean
    /**
     * 不能为空的字段维护
     */
    /**
     * 不能为空的字段
     */
    field?: any
    /**
     * 表名列表
     */
    tableNames?: ArrayData<any>

}

class InputDictService extends BaseService<InputDictState> {
    rightInputDictService = rightInputDictService
    agApi?: any
    defaultState = {
        name: '',
        field: {dictName: '控件名称', tableName: '显示名称'},
    }

    /**
     * 加载service的时候加载信息
     */
    serviceWillMount() {
        this.select()
        this.emergencyTable() // 加载表格数据
    }

    /**
     * 获取控件的主要信息
     */
    select = () => {
        let {name} = this.getState()
        return ApiDictInput.select(name).then(data => {
            this.dispatch2({inputDict: data})
            this.agApi.api.setRowData(data)
        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取模糊查询控件失败！'})
        })
    }

    /**
     * 删除控件的方法
     */
    delete = () => {
        let {dictCode} = this.getState()
        if (dictCode != null) {
            return ApiDictInput.delete(dictCode).then(data => {
                this.dispatch({dictCode: null})
            }).catch(err => {
                this.dispatch({errorMessage: err.msg || '作废模糊查询控件失败！'})
            })
        } else {
            this.logicDelete()
        }

    }

    /**
     * 删除一行的数据的方法
     */
    logicDelete = () => {
        let {rowIndex, inputDict} = this.getState()
        inputDict.splice(rowIndex, 1)
        this.dispatch({inputDict: inputDict})
        this.agApi.api.setRowData(inputDict)
    }

    /**
     * 新增一行数据的时候进行弹框判断是否保存修改的数据
     */
    verification = () => {
        rightInputDictService.leftUpdate()
        let {operation} = this.getState()
        if (operation) {
            message.linkAge('你更改的数据需要保存吗?', null, '确认', '取消', this.hold, this.addMasterLine)
        } else {
            this.addMasterLine()
        }
    }
    /**
     * 新增一行数据的时候进行弹框判断是否保存修改的数据：选择保存调用的方法
     */
    hold = () => {
        rightInputDictService.verify()
        this.addMasterLine()
    }

    /**
     * 右边table是否进行操作
     */
    updateStatus = (opera: boolean) => {
        this.dispatch({operation: opera})
    }

    /**
     * 获取患者列表中某一行数据
     */
    showCurRowMessage = (record) => {
        const {rowIndex} = this.getState()
        let dictCode = record.data.dictCode ? record.data.dictCode : ''
        if (rowIndex !== record.rowIndex) {
            this.dispatch({dictCode: dictCode, rowIndex: record.rowIndex})
            rightInputDictService.showCurRowMessage(record.data)
        }
    }

    /**
     * 新增一行数据
     */
    addMasterLine = () => {
        let {inputDict} = this.state
        const {field} = this.getState()
        let index = inputDict ? inputDict.length : 0
        if (index === 0) {
            this.insert(inputDict)
        } else {
            let model = inputDict[index - 1]
            for (let key in field) {
                if (field.hasOwnProperty(key)) {
                    let value = model[key]
                    if (!value || value.length === 0) {
                        message.tip(field[key] + '不能为空', 'warning')
                        return
                    }
                }

            }
            this.insert(inputDict)
        }
    }

    insert(inputDicts: InputDictEntityDict[]) {
        inputDicts.push(<InputDictEntityDict>{})
        this.agApi.api.setRowData(inputDicts)
        this.dispatch({inputDict: inputDicts, dictCode: null})
        rightInputDictService.onChangeqk()
    }

    /**
     * 新增一行后改变api的状态
     */
    onGridReady = (params) => {
        this.agApi = params
        this.agApi.api.sizeColumnsToFit()
    }

    /**
     *  点击事件调用的方法
     */
    onchange = (e) => {
        let {inputDict, rowIndex} = this.state
        inputDict[rowIndex].dictName = e.target.value
        this.dispatch2({inputDict: inputDict})
    }
    /**
     * 改变值的方法
     */
    onchangeUpdate = (name, e) => {
        this.dispatch2({[name]: e.target.value})
    }
    /**
     * 查询所有急诊表
     * @param {string} inputCode
     * @param {Page} page
     * @returns {Promise<void>}
     */
    emergencyTable = (inputCode?: string, page?: Page) => {
        if (page === undefined) {
            page = ({
                startIndex: 1,
                pageSize: 7
            })
        }
        return ApiDictInput.emergencyTable(page, inputCode).then(data => {
            this.dispatch2({tableNames: data})
            return data
        }).catch(err => {
            this.dispatch({errorMessage: err.msg || '获取模糊查询控件失败！'})
        })
    }
    /**
     * 获取选中的表数据
     * @param event
     */
    selectedTable = (event) => {
        const {inputDict, rowIndex} = this.state
        let input = inputDict
        input[rowIndex].tableName = event.data.value
        this.dispatch({inputDict: input})
        rightInputDictService.showCurRowMessage(input[rowIndex])
    }
}

export const inputDictService = new InputDictService('inputDict')