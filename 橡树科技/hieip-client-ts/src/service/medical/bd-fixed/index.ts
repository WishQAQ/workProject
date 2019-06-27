/**
 * 字典表
 */

import {BaseService} from 'tools/flux/BaseService'
import {message} from 'pkg/common/message'
import {BdFixedIndexEntityDataSet, BdFixedItemsModelDtoDataSet} from 'pkg/entity/medical'
import {ApiDataSetBdFixedIndex, ArrayData} from 'pkg/api/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {ApiDictInput} from '../../../packages/api/medical'

export interface BdFixedIndexEntityDataSetModel extends BdFixedIndexEntityDataSet {
    children?: BdFixedItemsModelDtoDataSet[]
}

/**
 * 电子病历server固定值
 */
export interface BdFixedIndexState {
    data?: BdFixedIndexEntityDataSetModel[] // 固定值实体类
    selectRow?: BdFixedIndexEntityDataSetModel
    paramList?: Array<any> // sql参数
    sqlDataList?: Array<any> // sql数据
    paramIndex?: number // sql 参数选中的行
    sqlDataIndex?: number// sql data 选中行
    openKeys?: any[] // 分类当前选中列表
    bdDeColumns?: any[] // 数据元的inputTable Columns
    bdDeDataTotal?: number
}

class BdFixedIndexService extends BaseService<BdFixedIndexState> {
    agParams?: any // ag表格api
    defaultState = {
        data: [],
        selectRow: <BdFixedIndexEntityDataSetModel>{},
        paramList: [],
        sqlDataList: []
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        this.loadBdFixedData()
    }

    serviceWillUnmount() {
        this.reset()
    }

    /**
     * 控制左边点击的列表
     * @param openKeys
     */
    onOpenChange = (openKeys) => {
        this.dispatch2({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }
    /**
     * inputTable 字段init
     * @returns {Promise<ArrayData<InputDictModelDtoDict> | void>}
     */
    loadColumns = () => {
        return ApiDictInput.loadColumns('SJY').then((data) => {
            return data
        }).catch(err => {
            message.error(err.msg || '获取信息失败!')
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData = (inputPage, dictCode, inputCode) => {
        return ApiDictInput.loadData(inputPage, dictCode, inputCode).then((data) => {
            this.dispatch({bdDeDataTotal: data.total})
            return data
        }).catch(err => {
            message.error(err.msg || '获取信息失败!')
        })
    }
    /**
     * inputTable
     */
    callBack = (v, calback) => {
        if (v.type === 'enterEvent') {
            let {sqlDataIndex, sqlDataList} = this.state
            JsonUtil.json('sqlDataList.' + sqlDataIndex + '.dsName', this.state, v.data.deName)
            JsonUtil.json('sqlDataList.' + sqlDataIndex + '.dsId', this.state, v.data.id)
            this.agParams.api.setRowData(sqlDataList)
        } else {
            this.loadData({pageSize: v.pageSize, startIndex: v.pageCurrent}, 'SJY', v.value).then(data => {
                calback(data)
            })
        }
    }
    /**
     * 加载固定值以具体字段信息
     * @returns {Promise<void>}
     */
    loadBdFixedData = () => {
        return ApiDataSetBdFixedIndex.loadBdFixedData().then((data) => {
            this.dispatch2({data: data})
        }).catch((msg) => {
            message.tip(msg || '固定值查询失败', 'warning')
        })
    }
    /**
     * 删除固定值
     */
    deleteBdFixed = (id) => {
        message.linkAge('确定要删除此分类?', 5000, '确定', '取消', () => {
            ApiDataSetBdFixedIndex.deleteBdFixed(id).then(() => {
                message.tip('删除成功', 'info')
                return this.loadBdFixedData()
            }).catch(msg => message.tip(msg || '删除失败', 'error'))
        })
    }
    /**
     *  sql 查询字段table 实例化
     * @param params
     */
    onGridReady = (params) => {
        this.agParams = params
    }
    /**
     * 点击固定值分类
     * @param index 分类下标
     * @param id 分类id
     * @returns {Promise<void>}
     */
    loadBdFixedInfo = (index, id) => {
        return ApiDataSetBdFixedIndex.loadBdFixedInfo(id).then((data: any) => {
            let _data = this.state.data
            _data[index].children = data.itemList
            // 设置当前选中,查询字段列表,sql 参数列表
            this.dispatch2({
                selectRow: data.index,
                paramList: data.index.fixedParameters.split(';'),
                sqlDataList: data.itemList,
                data: _data
            })
            this.agParams.api.setRowData(data.itemList)
        }).catch((msg) => {
            message.tip(msg || '分类详情查询失败')
        })
    }
    /**
     * 根据路径，缓存值
     * @param path 路径
     * @param data
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data))
    }
    /**
     * sql 参数配置改变时
     * @param index
     * @param e
     */
    changeSqlParam = (index, e) => {
        let {paramList} = this.state
        paramList[index] = e.target.value
        this.dispatch2({paramList})
    }
    /**
     * 新增一行
     */
    insertParamLine = () => {
        let {paramList} = this.state
        paramList.push('')
        this.dispatch2({paramList: paramList})
    }
    /**
     * 删除一行
     */
    deleteParamList = () => {
        let {paramIndex, paramList} = this.state
        if (paramIndex != null) {
            // 移除行
            paramList.splice(paramIndex, 1)
            this.dispatch2({paramList: paramList})
        }
    }
    /**
     * 参数选中
     * @param index
     */
    onParamClick = (index) => {
        this.dispatch({paramIndex: index})
    }
    // 增加一行
    insertSqlData = () => {
        let {selectRow, sqlDataList} = this.state
        sqlDataList.push({
            code: '',
            example: '',
            fieldName: '',
            fixedId: selectRow.id ? selectRow.id : '',
            id: sqlDataList.length + 1,
            name: ''
        })
        this.dispatch2({sqlDataList})
        this.agParams.api.setRowData(sqlDataList)
    }
    onSqlDataClick = (params) => {
        this.dispatch({sqlDataIndex: params.rowIndex})
    }
    /**
     * 删除一行
     */
    deleteSqlData = () => {
        const {sqlDataIndex, sqlDataList} = this.state
        if (sqlDataIndex || sqlDataIndex === 0) {
            sqlDataList.splice(sqlDataIndex, 1)
            this.agParams.api.setRowData(sqlDataList)
            this.dispatch2({sqlDataList})
        } else {
            message.tip('请选择需要删除的参数', 'warning', 'center')
        }
    }

    /**
     * 保存固定值信息
     * @returns {Promise<void>}
     */
    saveBdFixed = () => {
        const {selectRow, sqlDataList, paramList} = this.state
        if (!selectRow) {
            message.tip('固定值对象不能为空', 'warning', 'center')
            return
        }
        if (!sqlDataList || sqlDataList.length === 0) {
            message.tip('固定值值域不能为空', 'warning', 'center')
            return
        }

        selectRow.fixedParameters = paramList.join(';')
        return ApiDataSetBdFixedIndex.saveBdFixed(selectRow, sqlDataList).then(() => {
            message.tip('保存成功', 'success', 'center', null)
            this.loadBdFixedData()
        }).catch((msg) => {
            message.tip(msg || '保存失败', 'warning')
        })
    }
    /**
     * sql解析事件
     */
    parse = () => {
        const {selectRow} = this.state
        if (selectRow && selectRow.fixedSql) {
            const regex = /\s+([a-zA-Z]\w*\.)?([a-zA-Z]\w*)\s*=\s*\?/g
            let tmp
            let newArr = []
            // 只解析了条件参数，未解析查询结果字段，需要手动添加查询记过
            while ((tmp = regex.exec(selectRow.fixedSql)) !== null) {
                newArr.push(tmp[2])
            }
            this.dispatch({paramList: newArr})
        } else {
            message.tip('数据不能为空')
        }
    }

    /**
     * 编辑器输入事件
     */
    onDelTableElement = (editor, datas, value) => {
        const {selectRow} = this.state
        selectRow.fixedSql = value
        this.dispatch({selectRow: selectRow})
    }

    // 页面清空事件
    pageToEmpty = () => {
        this.dispatch2({
            selectRow: <BdFixedIndexEntityDataSetModel>{},
            sqlDataList: [],
            paramList: [],
            paramIndex: null,
            sqlDataIndex: null,
            openKeys: []
        })
        this.agParams.api.setRowData([])
    }
}

export const bdFixedIndexService = new BdFixedIndexService('bdFixedIndex')