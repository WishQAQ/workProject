/**
 * 数据集service
 */
import {BaseService} from 'tools/flux/BaseService'
import {message} from 'pkg/common/message'
import {
    BdDeIndexEntityDataSet, BdDeIndexModleDtoDataSet, BdDsIndexEntityDataSet, BdDsVersionsEntityDataSet, BdDsVersionsModelDtoDataSet,
    BdDsVsDeEntityDataSet, InputDictModelDtoDict, MrTemplateIndexEntityTemplate, Page
} from 'pkg/entity/medical'
import {ApiDataSetBdDsIndex, ApiDictInput} from 'pkg/api/medical'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface BdDsIndexModelEntityDataSet extends BdDsIndexEntityDataSet {
    /* 数据集引用次数 */
    referencs?: number
    /*  数据集id */
    deId?: string
}

/**
 * 电子病历server数据集
 */
export interface DataSetState {
    /* 数据集编码id */
    id?: string
    /* 数据集数组  */
    bdData?: BdDsIndexModelEntityDataSet[]
    /* 数据集实体类 */
    bdDeIndex?: BdDsIndexModelEntityDataSet
    /* 数据集信息  */
    bdDeSaveEntitys?: Array<BdDsVsDeEntityDataSet>
    /* 数据元展示时的模型,仅用于展示时用  */
    bdDeDateTypeAdd?: BdDeIndexEntityDataSet
    /* 数据集数据组/元添加模型 */
    bdDeDateTypeModel?: BdDsVersionsModelDtoDataSet
    /*  错误消息 */
    errorMessage?: string
    /*  获取行数 */
    rowIndex?: number
    /* 数据集新增打开状态 */
    addModelOpen?: boolean
    /*  数据集修改弹框 打开状态 */
    alterModelOpen?: boolean
    /* 数据元/组是否有更新 */
    isUpdate?: boolean
    /* 页面数  */
    page?: Page
    /* 数据集版本管理下标 */
    versionIndex?: number
    /* 数据元/组agTable下标 */
    itemIndex?: number
    /* 搜索栏 */
    cvName?: string
    /*  下标  */
    index?: number,
    /* 选中的版本id */
    versionsId?: number
    /*  */
    bdLenght?: number
    /*  */
    beLength?: number
    /* 版本号集合  */
    versions?: BdDsVersionsEntityDataSet[]
    /* 数据元索引信息 */
    bdDeIndices?: BdDeIndexModleDtoDataSet[]
    /*  模板 */
    templateIndex?: MrTemplateIndexEntityTemplate[]
    /* 最大版本号 */
    maxVersion?: number
    /*  是否选中数据集的数据状态 */
    opt?: boolean
    /* 是否选中版本的数据状态 */
    versionsOpt?: boolean
    /* input 模糊查询组件的表编码 */
    dictCode?: string
    /*  input 模糊查询组件的分页 */
    inputPage?: Page
    /*  input 模糊查询组件的 模糊查询值 */
    inputCode?: string
    /* input 模糊查询组件的数据长度 */
    inputLength?: number
    /* 数据集版本模型  */
    bdDsVsDe?: BdDsVsDeEntityDataSet[]
}

class DataSetService extends BaseService<DataSetState> {
    mainagApi: any
    insertTableApi: any
    defaultState = {
        bdDeSaveEntitys: [],
        bddata: [],
        BdDeDateType: [],
        bdDsIndex: [],
        addModelOpen: false,
        alterModelOpen: false,
        rowIndex: 0,
        page: {
            startIndex: 1,
            pageSize: 100
        },
        versions: [],
        bdDeIndices: [],
        templateIndex: [],
        opt: false,
        cvName: '',
        inputCode: '',
        dictCode: 'SJY',
        inputPage: {
            startIndex: 1,
            pageSize: 6
        },
        inputLength: 0,
        bdDsVsDe: [],
        index: -1
    }

    /*------------------------------------------------数据集list BEGIN-------------------------------------------------*/
    serviceWillMount() {
        this.reset()
    }

    /**
     * 查询全部数据集
     * @returns {Promise<void>}
     */
    findAll = () => {
        const {cvName, page} = this.state
        return ApiDataSetBdDsIndex.findAll(cvName, page).then((data) => {
            this.dispatch2({bdData: data, beLength: data.total})
            this.mainagApi.api.setRowData(data)
        }).catch((msg) => {
            message.tip(msg || '查询错误', 'error', 'center')
        })
    }

    /**
     * 根据选中的数据集id和版本号查询这个数据集对应的数据信息
     * @returns {Promise<void>}
     */
    findBdDsIndex = () => {
        let {id, versionsId} = this.state
        return ApiDataSetBdDsIndex.findBdDsIndex(id, versionsId).then((data) => {
            if (data) {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key] = data[key]
                    }
                }
            }
            this.dispatch2(this.state)
        }).catch((msg) => {
            message.tip(msg || '删除失败', 'error', 'center')
        })
    }
    /**
     * 根据id和版本号查询数据元
     */
    selectBdDeIndex = () => {
        let {id, versionsId} = this.state
        return ApiDataSetBdDsIndex.selectBdDeIndex(id, versionsId).then((data) => {
            this.dispatch2({bdDeIndices: data})
        }).catch((msg) => {
            message.tip(msg || '查询错误', 'error', 'center')
        })
    }
    /**
     * 新增数据集/修改数据集，通过有无id判断
     * @returns {Promise<void>}
     */
    saveBdDsIndex = () => {
        const {bdDeIndex} = this.state
        if ((bdDeIndex ? (bdDeIndex.dsName ? bdDeIndex.dsName : '') : '').trim().length <= 0) {
            message.tip('名称不能为空', 'warning', 'center')
            this.dispatch2({bdDeIndex: <BdDsIndexModelEntityDataSet>{}, alterModelOpen: false})
            return
        }
        return ApiDataSetBdDsIndex.saveBdDsIndex(bdDeIndex).then(() => {
            message.tip('保存成功', 'success', 'center')
            this.dispatch2({bdDeIndex: <BdDsIndexModelEntityDataSet>{}, addModelOpen: false, alterModelOpen: false})
            this.findAll()
        }).catch((msg) => {
            message.tip(msg || '保存失败', 'error', 'center')
        })
    }
    /**
     * 删除选中数据集
     */
    deleteBdDsIndex = () => {
        const {id} = this.state
        if (!id) {
            message.tip('请选择要删除的行', 'warning')
            return
        }
        message.linkAge('确定要删除吗?', 5000, '确定', '取消', () => {
            ApiDataSetBdDsIndex.deleteBdDsIndex(id).then((data) => {
                this.dispatch2({bdData: data, id: '', templateIndex: [], bdDeIndices: [], versions: []})
                this.findAll()
                message.tip('删除成功', 'success', 'center')
            }).catch((msg) => {
                message.tip(msg || '删除失败', 'success', 'center')
            })
        })
    }

    /**
     * 发布值域版本
     * @returns {Promise<any>} boolean
     */
    publishVersion = () => {
        let {versionsOpt, id, versionsId, index} = this.state
        if (!versionsOpt) {
            message.tip('请选中您要发布的版本！', 'warning', 'center')
            return
        }
        return ApiDataSetBdDsIndex.publishVersion(id, versionsId).then(() => {
            this.findAll()
            this.findBdDsIndex()
            this.dispatch({versionsId: null, versionsOpt: false})
            message.tip('发布数据集版本成功', 'success', 'center')
            if (index >= 0) {
                setTimeout(() => {
                    this.mainagApi.api.getRowNode(index).setSelected(true)
                }, 100)
            }
        }).catch((err) => {
            message.tip(err || '发布数据集版本失败', 'error', 'center')
        })
    }

    /**
     * 新建版本
     * @returns {Promise<any>} boolean
     */
    newVersion = (bdDsVersionsModel?: BdDsVersionsModelDtoDataSet) => {
        return ApiDataSetBdDsIndex.versionBdDsIndex(bdDsVersionsModel).then(() => {
            this.dispatch2({isUpdate: false, bdDsVsDe: []})
            // this.findAll()
            this.findBdDsIndex()
            message.tip('保存数据组/元成功', 'success', 'center')
        }).catch(err => {
            message.tip(err.msg || '保存数据组/元失败!', 'error', 'center')
        })
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
            this.dispatch({inputLength: data.total})
            return data
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 数据元table添加
     */
    insertAdd = () => {
        let {bdDeIndices} = this.state
        bdDeIndices.push(<BdDeIndexEntityDataSet>{id: '', deName: '', calculated: 1})
        this.insertTableApi.api.setRowData(bdDeIndices)
        // 聚焦到新增的那行的第一个元素
        this.insertTableApi.api.startEditingCell({
            rowIndex: bdDeIndices.length - 1,
            colKey: 'id'
        })
        setTimeout(() => {
            this.insertTableApi.api.startEditingCell({
                rowIndex: bdDeIndices.length - 1,
                colKey: 'id'
            })
        }, 100)
        this.dispatch2({bdDeIndices: bdDeIndices, isUpdate: true})
    }
    /**
     * 数据元table删除
     */
    delUpdate = () => {
        let {itemIndex, bdDeIndices, bdDeIndex} = this.state
        if (!bdDeIndex || '{}' === JSON.stringify(bdDeIndex)) {
            message.tip('请选择相应的值域项', 'warning', 'center')
            return
        }
        if (!(itemIndex + 1)) {
            message.tip('请选中对应的数据组/元', 'warning', 'center')
            return
        }
        bdDeIndices.splice(itemIndex, 1)
        this.insertTableApi.api.setRowData(bdDeIndices)
        this.dispatch2({bdDeIndices: bdDeIndices})
    }
    /**
     * 新增缓存数据
     * @param path - 路径
     * @param e
     */
    getInjury = (e, ...path) => {
        this.dispatch2(JsonUtil.json2(path, this.state, e.target.value))
    }
    /**
     * 数据集获取选中行
     * @param params
     */
    bdDeIndexOpt = (params) => {
        this.dispatch({
            index: params.rowIndex,
            bdDeIndex: params.data,
            id: params.data.id,
            opt: true,
            versionsId: params.data.dsCurrentVersion
        })
        this.findBdDsIndex()
    }
    /**
     * 版本集合获取选中行
     * @param params
     */
    versionsOpt = (params) => {
        this.dispatch({versionsId: params.data.dsVersion, versionsOpt: true})
        this.selectBdDeIndex()
    }
    /**
     * 显示新增弹框
     */
    showAddModel = () => {
        this.dispatch({addModelOpen: true, bdDeIndex: null})
    }
    /**
     * 隐藏新增弹框
     */
    hiddenAddModel = () => {
        this.dispatch({addModelOpen: false})
    }
    /**
     * 显示修改弹框
     */
    showAlterModel = () => {
        this.dispatch({alterModelOpen: true})
        let {opt} = this.state
        if (!opt) {
            message.tip('请选择需要修改的内容', 'warning', 'center')
            this.dispatch({alterModelOpen: false, opt: false})
            return
        }
    }
    /**
     * 隐藏修改弹框
     */
    hiddenAlterModel = () => {
        this.dispatch({alterModelOpen: false})
    }
    /*搜索框取值*/
    onChangeDataSet = (event, ...path) => {
        let {page} = this.state
        this.dispatch(JsonUtil.json2(path, this.state, event))
        page.startIndex = 1
        this.dispatch({page: page})
        this.findAll()
    }

    /*点击行获取后台信息*/
    onClinkUpdate = (event) => {
        this.dispatch2({itemIndex: event.rowIndex, bdDeDateTypeAdd: event.data})
    }
    /**
     * 获得api
     */
    insertTable = (parms) => {
        this.insertTableApi = parms
    }

    /**
     * inputTable 组件的方法
     */
    showMessage = (v, calback) => {
        let {bdDeIndices, itemIndex} = this.state
        switch (v.type) {
            case 'pageEvent': {
                this.dispatch2({inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent}, inputCode: v.value})
                this.loadData().then(data => {
                    calback(data)
                })
                break
            }
            case 'enterEvent': {
                JsonUtil.json('bdDeIndices.' + itemIndex + '.deName', this.state, v.data.deName)
                JsonUtil.json('bdDeIndices.' + itemIndex + '.id', this.state, v.data.id)
                this.insertTableApi.api.setRowData(bdDeIndices)
                break
            }
            case 'changeEvent': {
                this.dispatch2({inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent}, inputCode: v.value})
                this.loadData().then(data => {
                    calback(data)
                })
                break
            }
            default:
                this.loadData().then(data => {
                    calback(data)
                })

        }
    }
    /**
     * 添加
     */
    insertInto = () => {
        let {bdDeIndices, maxVersion, id, bdDsVsDe} = this.state
        for (let key in bdDeIndices) {
            if (bdDeIndices[key]) {
                bdDsVsDe.push(<BdDsVsDeEntityDataSet>{
                    id: '', dsId: id,
                    dsDeCode: bdDeIndices[key].id, dsDgType: 0,
                    dsRepeatCount: bdDeIndices[key].dsRepeatCount
                })
            }
        }
        this.dispatch2({versionsId: maxVersion + 1})
        let _bdDsVersionsModel = <BdDsVersionsModelDtoDataSet> {}
        _bdDsVersionsModel.id = id
        _bdDsVersionsModel.bdDsVsDes = bdDsVsDe
        this.newVersion(_bdDsVersionsModel)
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
        this.dispatch({page: page})
        this.findAll()
    }

    /**
     * 点击分页的事件
     */
    onShowSize = (clickPage) => {
        let {page} = this.state
        page.startIndex = page.pageSize * (clickPage - 1)
        if (clickPage === 1) {
            page.startIndex = 1
        }
        this.dispatch({page: page})
        this.findAll()
    }

}

export const dataSetService = new DataSetService('groupInjury')
