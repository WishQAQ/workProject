import {BaseService} from 'tools/flux/BaseService'
import {
    BdCvIndexEntityDataSet, BdCvItemsEntityDataSet, BdDeDateTypeEntityDataSet, BdDeDictionaryDictEntityDict, BdDeIndexEntityDataSet,
    BdDeIndexModelDtoDataSet, BdDsIndexModelDtoDataSet, ControlDictEntityDict, Page
} from 'pkg/entity/medical'
import {ApiDataSetBdDeIndex, ApiDictInput} from 'pkg/api/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {dataItemService} from 'src/service/medical/data-element/data-item'
import {dataCiteService} from 'service/medical/data-element/data-cite'
import {message} from 'pkg/common/message'

export interface DataListState {

    /** 异常信息提示 */
    errorMessage?: string

    /*** 状态 */
    isStatus?: boolean
    /** 分页: 开始行数 */
    startIndex?: number
    /** 分页: 分页数 */
    pageSize?: number
    /** 数据元新增弹框的状态 */
    isShowSave?: boolean
    /** 数据元对象集合 */
    bdDeIndex?: BdDeIndexModelDtoDataSet[]
    /**  数据元对象id */
    id?: string
    /**  数据元对象 */
    index?: BdDeIndexEntityDataSet

    /**  数据元对象修改 */
    model?: BdDeIndexModelDtoDataSet
    /**  分页元对象 */
    page?: Page
    /*** 数据集id  */
    deCvCode?: string
    /**  数据元模糊查询的值 */
    beName?: string
    /** 数据集 */
    dsIndexList?: BdDsIndexModelDtoDataSet[]
    /**  值域信息 */
    bdCvItemsList?: BdCvItemsEntityDataSet[]
    /**  数据元数据类型中的值 */
    bdDeDictionaryDict?: BdDeDictionaryDictEntityDict[]
    /**    控件类型 */
    controlDictList?: ControlDictEntityDict[]
    /**  数据元数据类型 */
    dateType?: BdDeDateTypeEntityDataSet[]
    /* 新增弹框 当前元素类型下标 */
    currentElementType?: number
    /* 修改弹框的状态  */
    isShowAlter?: boolean
    /* 是否选中数据  */
    status?: boolean
    /* 数据类型改变的标识格式 */
    format?: BdDeDictionaryDictEntityDict[]
    /* input_dictd中进行查询的表名 */
    tableName?: string
    /*  input_dictd中进行数据库用户  */
    user?: string
    /* input_dictd的表头  */
    title?: any[]
    /*  input_dictd的表数据 */
    bdCvIndex?: BdCvIndexEntityDataSet[]

    /** 分页元对象   */
    beLength?: number
    /* input 模糊查询组件的表编码 */
    dictCode?: string
    /* input 模糊查询组件的分页 */
    inputPage?: Page
    /* input 模糊查询组件的 模糊查询值 */
    inputCode?: string
    /* input 模糊查询组件的数据长度  */
    inputLength?: number
    /*  input 模糊查询组件的数据 */
    inputData?: any
    /* input 模糊查询组件的title */
    inputTitle?: any[]
    /* 值域名称 */
    cvName?: string
}

class DataListService extends BaseService<DataListState> {
    /** 页面api   */
    mainagApi?: any
    defaultState = {
        startIndex: 1,
        pageSize: 100,
        isStatus: false,
        isShowSave: false,
        id: '',
        page: {pageSize: 50, startIndex: 1},
        beName: '',
        isShowAlter: false,
        currentElementType: 0,
        model: {},
        statusa: false,
        tableName: 'bd_Cv_Index',
        user: 'oakmr',
        inputName: '',
        cvName: '',
        mainagApi: null,
        dictCode: 'ZYSY1',
        inputPage: {
            startIndex: 1,
            pageSize: 6
        },
        inputLength: 0,
        index: {isUpdateConten: 1, controlType: 'TEXT'}
    }

    serviceWillMount() {
        this.reset()
    }

    /**
     * 数据元的分页模糊查询
     */
    getBdIndexData = () => {
        let {page, beName} = this.state
        return ApiDataSetBdDeIndex.getBdIndexData(page, beName).then(data => {
            this.dispatch2({bdDeIndex: data, beLength: data.total})
        }).catch(err => {
            message.tip(err.msg || '获取数据元信息失败!', 'error', 'center')
        })
    }
    /**
     * 数据元添加修改的时候需要的字典数据
     */
    toSaveOrUpdate = () => {
        return ApiDataSetBdDeIndex.toSaveOrUpdate().then(data => {
            if (data) {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key] = data[key]
                    }
                }
            }
            this.dispatch(this.state)
        }).catch(err => {
            message.tip(err.msg || '获取数据元需要用的字典表信息失败!', 'error', 'center')
        })
    }
    /**
     * 删除数据元的相关的信息
     */
    deleteBeIndex = () => {
        let {id, model} = this.state
        if (!id || id === null || '{}' === JSON.stringify(id)) {
            message.tip('请选中您要删除的数据元！', 'warning', 'center')
            return
        }
        message.linkAge('确定要删除[ ' + model.deName + ' ]吗?', 5000, '确定', '取消', () => {
            return ApiDataSetBdDeIndex.deleteBeIndex(id).then(data => {
                this.getBdIndexData()
                dataItemService.delete()
                dataCiteService.delete()
                message.tip('删除数据元成功', 'success', 'center')
            }).catch(err => {
                message.tip(err.msg || '删除数据元失败!', 'error', 'center')
            })
        })

    }
    /**
     * 保存/更新数据元的相关的信息
     */
    saveOrUpdateBdDeIndex = () => {
        let {index} = this.state
        if (!index.deName && index.deName == null) {
            message.tip('数据元名称不能为空', 'warning', 'center')
            return
        }
        return ApiDataSetBdDeIndex.saveOrUpdateBdDeIndex(index).then(data => {
            this.dispatch2({
                bdDeIndex: data, index: {isUpdateConten: 1, controlType: 'TEXT'},
                isShowSave: false, isShowAlter: false, currentElementType: 0
            })
            this.getBdIndexData()
            message.tip('保存数据元成功', 'success', 'center')
        }).catch(err => {
            message.tip(err.msg || '保存数据元失败!', 'error', 'center')
        })
    }

    /**
     * 修改弹框的方法
     */
    update = () => {
        let {model} = this.state
        this.dispatch2({index: model, currentElementType: 0})
        this.saveOrUpdateBdDeIndex()
    }

    /**
     * 新增/更新的dict表数据
     */
    handleShowSave = () => {
        this.dispatch({isShowSave: true})
        this.toSaveOrUpdate()
    }

    /**
     * 修改数据弹框的验证是否选中数据和加载字典表的方法
     */
    handleShowUpdate = () => {
        let {status, model} = this.state
        if (!status) {
            message.tip('请选择需修改数据!', 'warning', 'center')
            return
        }
        this.toSaveOrUpdate().then(() => {
            let {controlDictList} = this.state
            let subscript
            for (let i = 0; i < controlDictList.length; i++) {
                if (controlDictList[i].controlType === model.controlType) {
                    subscript = i
                }
            }
            this.dispatch({isShowAlter: true, cvName: model.cvName, currentElementType: subscript})
        })
    }
    /**
     * 数据元获取患者列表中某一行数据
     */
    showCurRowMessage = (record) => {
        return ApiDataSetBdDeIndex.getBdIndexInfo(record.data.id, record.data.deCvId).then(data => {
            if (data) {
                let _state: any = this.state
                for (let key in data) {
                    if (data[key]) {
                        _state[key] = data[key]
                    }
                }
                _state.id = record.data.id
                _state.deCvCode = record.data.deCvId
                _state.model = record.data
                _state.status = true
                if (!_state.model.controlType) {
                    _state.model.controlType = 'TEXT'
                }
                this.dispatch2(_state)
                dataItemService.select(JsonUtil.getJsonByKey('bdCvItemsList', data, []))
                dataCiteService.select(JsonUtil.getJsonByKey('dsIndexList', data, []))
            }
        }).catch(err => {
            message.tip(err || '获取指定数据元信息失败!', 'error', 'center')
        })
    }
    /**
     *  弹窗(新增) 关闭
     */
    handleCancel = () => {
        this.dispatch2({isShowSave: false, index: {isUpdateConten: 1, controlType: 'TEXT'}, cvName: '', currentElementType: 0})
    }
    /**
     *  弹窗(修改) 关闭
     */
    handleCancelUpdate = () => {
        this.dispatch2({isShowAlter: false, cvName: '', currentElementType: 0})
    }
    /**
     * 设置值: 公共对外值改变1
     */
    setStateJson = (path, data) => {
        this.dispatch(JsonUtil.json(path, this.state, data ? data : ''))
    }

    /**
     * 数据类型改变后改变值
     */
    updateSetStateJson = (path, data) => {
        let {bdDeDictionaryDict, format, index} = this.state
        format = []
        this.dispatch(JsonUtil.json(path, this.state, data ? data : ''))
        this.dispatch2({index: index})
        if (bdDeDictionaryDict) {
            for (let key in bdDeDictionaryDict) {
                if (bdDeDictionaryDict[key].deType === data) {
                    format.push(bdDeDictionaryDict[key])
                }
            }
            this.dispatch2({format: format})

        }
    }

    /**
     * 模糊查询改变值的方法
     */
    onchangMain = (name, e) => {
        let {page} = this.state
        page.startIndex = 1
        this.dispatch({page: page, beName: e})
        this.getBdIndexData()
    }

    /**
     * 模糊查询控件的方法
     */
    handleRadio = (name, e) => {
        let {controlDictList, isShowSave} = this.state
        for (let i = 0; i < controlDictList.length; i++) {
            if (i === e.target.value) {
                let _state: any = this.state
                JsonUtil.json(name, _state, controlDictList[i].controlType)
                // 清空原来选中类型的值
                if (controlDictList[i].isMaxMin === 'true') {
                    JsonUtil.json(isShowSave ? 'model.cvName' : 'model.cvName', _state, '')
                    JsonUtil.json(isShowSave ? 'model.deCvId' : 'model.deCvId', _state, '')
                    JsonUtil.json('cvName', _state, '')
                }
                if (controlDictList[i].isComponent === 'true') {
                    JsonUtil.json(isShowSave ? 'index.minValue' : 'model.minValue', _state, '')
                    JsonUtil.json(isShowSave ? 'index.maxValue' : 'model.maxValue', _state, '')
                }
                if (controlDictList[i].isMaxMin === 'false' && controlDictList[i].isComponent === 'false') {
                    JsonUtil.json(isShowSave ? 'model.cvName' : 'model.cvName', _state, '')
                    JsonUtil.json(isShowSave ? 'model.deCvId' : 'model.deCvId', _state, '')
                    JsonUtil.json(isShowSave ? 'index.minValue' : 'model.minValue', _state, '')
                    JsonUtil.json(isShowSave ? 'index.maxValue' : 'model.maxValue', _state, '')
                    JsonUtil.json('cvName', _state, '')
                }
                _state.currentElementType = i
                this.dispatch2(_state)
            }
        }
    }

    /**
     * 查询input 模糊查询组件的tltle
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
            this.dispatch({inputLength: data.total, inputData: data})
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }

    /**
     * 获取值域的数据
     */
    showMessage = (v, name?: string) => {
        let path = name + '.deCvId'
        switch (v.type) {
            case 'pageEvent': {
                this.dispatch2({inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent}, inputCode: v.value, cvName: v.value})
                this.loadData()
                break
            }
            case 'enterEvent': {
                this.dispatch(JsonUtil.json(path, this.state, v.data.id ? v.data.id : ''))
                this.dispatch2({cvName: v.data.cvName})
                break
            }
            case 'changeEvent': {
                this.dispatch(JsonUtil.json(path, this.state, v.value))
                this.dispatch2({inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent}, inputCode: v.value, cvName: v.value})
                this.loadData()
                break
            }
            default:
                this.loadData()
                this.loadColumns()
        }
    }

    /**
     * 分页
     */
    onGridReady = (parms) => {
        let {page} = this.state
        // 将table赋值给agApi，通过agApi动态为table赋值
        this.mainagApi = parms
        /** 获取当前表格能显示多少行 */
        page.pageSize = parms.api.paginationGetPageSize()
        this.dispatch2({page: page})
        this.getBdIndexData()
    }

    /**
     * 点击分页执行
     */
    onShowSize = (clickPage) => {
        let {page} = this.state
        page.startIndex = page.pageSize * (clickPage - 1)
        if (clickPage === 1) {
            page.startIndex = 1
        }
        this.dispatch2({page: page})
        this.getBdIndexData()
    }

    /**
     * 数据元多选
     *
     * @param event
     */
    onSelectChange = (event) => {
        if (event && event.length > 0) this.dispatch({status: true})
        else this.dispatch({status: false})
    }
}

export const dataListService = new DataListService('dataList')