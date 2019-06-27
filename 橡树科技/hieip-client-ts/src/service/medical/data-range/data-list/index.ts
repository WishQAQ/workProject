import {BaseService} from '../../../../tools/flux/BaseService/index'
import {ApiDataSetBdCvIndex} from '../../../../packages/api/medical'
import {BdCvIndexEntityDataSet, Page} from '../../../../packages/entity/medical'
import {JsonUtil} from 'tools/api/JsonUtil'
import {message} from '../../../../packages/common/message/index'
import {dataVersionService} from '../data-version/index'
import {dataCiteService} from '../data-cite/index'
import {dataItemService} from 'service/medical/data-range/data-item'

/**
 * 页面所需的所有数据的属性定义
 */
export interface DataListState {
    /*
     * 无? 时，下面service必须要该参数
     */
    bdCvIndex?: BdCvIndexEntityDataSet,
    /*
     * 单独用于新增值域的实体类
     */
    bdSaveCvIndex?: BdCvIndexEntityDataSet,
    /*
    * 表体
    */
    bdCvIndexs ?: Array<BdCvIndexEntityDataSet>
    /*
     *值域最大版本号
     */
    maxVersion?: number,
    /*
     * 版本号
     */
    versions?: Array<any>,
    /*
     * 分页
     */
    page?: Page,
    /*
     * 全部、启用，未启用 状态
     */
    pageEnable?: number,
    /*
     * 错误消息
     */
    errorMessage?: string // 错误消息
    /*
     * 搜索输入框
     */
    cvName?: string,
    /*
     *修改值域获取默认状态
     */
    updateOpen?: boolean,
    /*
     * 是否显示 新增弹框
     */
    isShowSave?: boolean
    /*
    * 是否显示 修改弹框
    */
    isShowAlter?: boolean
    /*
    * 记录 新增弹框 输入框
    */
    dataChecked?: boolean
    /*
    * 记录 修改弹框 输入框
    */
    isEnabled?: boolean
    /*
    * 表格抛出函数对象
    */
    params ?: any
    /*
    * 当前表格对象的索引下标
    */
    tableCurrentIndex?: number,
    /**
     * 数据总数
     */
    bdLength?: number
    /* 是否点击过表格 （是否获取过一行数据）*/
    pitch?: boolean
}

class DataListService extends BaseService<DataListState> {
    dataListAgApi: any
    /**
     * 页面初始化时的默认值，当state更新是会被替换
     */
    defaultState = {
        page: {
            startIndex: 1,
            pageSize: 100
        },
        total: 0,
        updateOpen: false,
        isShowSave: false,
        isShowAlter: false,
        inputData: '',
        cvName: '',
        params: {},
        pageEnable: 2,
        pitch: false,
        tableCurrentIndex: -1
    }

    /*页面预加载*/
    serviceWillMount() {
        this.reset()
        this.findAll()
        this.dispatch({bdCvIndex: {}})
    }

    /*修改值域的version下拉框赋值*/
    assignment = (versions) => {
        this.dispatch2({versions: versions})
    }
    /**
     * 弹窗(新增) 显示
     */
    handleShowSave = () => {
        this.dispatch2({isShowSave: true, bdSaveCvIndex: {}})
    }
    /**
     * 弹窗(新增) 点击cancel关闭
     */
    handleCancel = () => {
        this.dispatch2({isShowSave: false, bdSaveCvIndex: {}, cvName: ''})
    }
    /**
     * 弹窗(修改) 点击cancel关闭
     */
    handleCancelAlter = () => {
        this.dispatch2({isShowAlter: false})
    }
    /**
     * 值域修改
     */
    handleShowAlter = () => {
        let {bdCvIndex} = this.state
        if (!bdCvIndex || bdCvIndex === null || '{}' === JSON.stringify(bdCvIndex)) {
            message.tip('请选中您要修改的值域！', 'warning', 'center')
            return
        } else this.dispatch({isShowAlter: true})
    }
    /**
     * 单击表格某一行 获取该行下标和改行数据
     * @param e
     */
    handlerRowClicked = (e) => {
        this.dispatch({tableCurrentIndex: e.rowIndex, bdCvIndex: e.data, pitch: true})
        let {bdCvIndex} = this.state
        this.dispatch({updateOpen: bdCvIndex.cvEnabled === 1 ? true : false})
        this.selectCvIndex(bdCvIndex.id, bdCvIndex.cvVersion)
    }
    /**
     * 表格选框处理
     */
    onSelectChange = (params) => {
        if (params && params.length === 0) this.dispatch2({bdCvIndex: {}})
        else this.dispatch({bdCvIndex: params[0].data})
    }
    /**
     * Table加载，对数据的处理
     * @param params
     */
    onGridReady = (params) => {
        let {page} = this.state
        // 将table赋值给agApi，通过agApi动态为table赋值
        this.dataListAgApi = params
        /** 获取当前表格能显示多少行 */
        page.pageSize = this.dataListAgApi.api.paginationGetPageSize()
        this.dispatch({page: page})
        this.setRowData()
    }
    /**
     * 点击分页事件
     * @param clickPage
     * @private
     */
    onChangePag = (clickPage) => {
        let {page} = this.state
        page.startIndex = page.pageSize * (clickPage - 1)
        if (clickPage === 1) page.startIndex = 1
        this.dispatch({page})
        this.setRowData()
    }
    /**
     * 版本发布后list赋值
     * @param serviceData
     */
    listAssignment = (serviceData) => {
        this.dispatch({bdCvIndex: {cvVersion: serviceData}})
    }
    /**
     * 单选框取值
     * @param event
     */
    radioChange = (event) => {
        this.dispatch({pageEnable: event ? event.target.value : 0, tableCurrentIndex: -1})
        this.setRowData()
    }
    acquire = (cvName, pageEnable) => {
        let {page} = this.state
        page.startIndex = 1
        this.dispatch2({cvName, pageEnable, page})
    }

    /**
     * 页面加载公共方法
     */
    setRowData = () => {
        let {page, cvName, pageEnable, tableCurrentIndex} = this.state
        if (pageEnable && pageEnable === 2) pageEnable = null
        ApiDataSetBdCvIndex.findAll(page, cvName, pageEnable).then((data: any) => {
            this.dataListAgApi.api.setRowData(data)
            if (tableCurrentIndex >= 0) {
                setTimeout(() => {
                    this.dataListAgApi.api.getRowNode(tableCurrentIndex).setSelected(true)
                }, 100)
            }
            this.dispatch2({bdCvIndexs: data, bdCvIndex: {}, bdLength: data.total})
        }).catch((err) => {
            message.tip(err || '数据加载失败', 'error', 'center')
        })
    }

    /**
     * 分页查询值域
     */
    findAll = () => {
        return this.setRowData()
    }
    /**
     * 模糊查询改变值的方法
     */
    onchangMain = (name, e) => {
        let {page} = this.state
        page.startIndex = 1
        this.dispatch({page: page, [name]: e})
        this.setRowData()
    }
    /*弹窗(新增) 数据集输入框 修改*/
    onChangeDataSet = (event, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, event.target.value))
    }
    onChangeDataSetSelect = (value, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, value))
    }
    /**
     * 新增值域
     */
    saveCvIndex = () => {
        let {bdSaveCvIndex, pageEnable} = this.state
        this.dispatch({isShowSave: false, bdSaveCvIndex: {cvEnabled: pageEnable === 2 ? 1 : 0}})
        ApiDataSetBdCvIndex.saveCvIndex(bdSaveCvIndex).then(() => {
            this.setRowData()
            this.dispatch({isShowSave: false})
            message.tip('新增值域成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '新增值域失败', 'error', 'center')
            this.dispatch({isShowSave: true})
        })
        this.dispatch2({bdSaveCvIndex: {}})
    }
    /**
     * 删除值域
     */
    deleteCvIndex = () => {
        let {bdCvIndex} = this.state
        if (!bdCvIndex || bdCvIndex === null || '{}' === JSON.stringify(bdCvIndex)) {
            message.tip('请选中您要删除的值域！', 'warning', 'center')
            return
        }
        message.linkAge('确定要删除此值域 ? ', 5000, '确定', '取消', () => {
            ApiDataSetBdCvIndex.deleteCvIndex(bdCvIndex.id).then(() => {
                this.setRowData()
                message.tip('删除值域成功', 'success', 'center')
            }).catch(err => {
                message.tip(err || '删除值域失败', 'error', 'center')
            })
            this.selectCvIndex(bdCvIndex.id, bdCvIndex.cvVersion)
        })
    }
    /**
     * 值域修改
     */
    updateCvIndex = () => {
        let {bdCvIndex} = this.state
        if (!bdCvIndex || bdCvIndex === null || '{}' === JSON.stringify(bdCvIndex)) {
            message.tip('请选中您要修改的值域！', 'warning', 'center')
            this.dispatch({isShowAlter: false})
            return
        }
        ApiDataSetBdCvIndex.updateCvIndex(bdCvIndex).then(() => {
            this.setRowData()
            message.tip('值域修改成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '更新值域失败', 'error', 'center')
        })
        this.dispatch2({bdCvIndex: {}, pitch: false, isShowAlter: false})
    }
    /**
     * 启用值域
     * @returns {any}
     */
    startCvIndex = () => {
        let {bdCvIndex, pitch} = this.state
        if (!pitch) {
            message.tip('请选中您要启动的值域！', 'warning', 'center')
            return
        }
        ApiDataSetBdCvIndex.stratCvIndex(bdCvIndex.id).then(() => {
            this.setRowData()
            message.tip('启动成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '启用值域失败', 'error', 'center')
        })
        this.dispatch2({bdCvIndex: {}, pitch: false})
    }

    /**
     * 选择单个值域
     */
    selectCvIndex = (id, version) => {
        return ApiDataSetBdCvIndex.selectCvIndex(id, version).then((data) => {
            this.dispatch({maxVersion: JsonUtil.getJsonByKey('maxVersion', data)})
            dataCiteService.assignment(JsonUtil.getJsonByKey('bdDeIndexs', data))
            dataItemService.assignment(JsonUtil.getJsonByKey('bdCvItems', data))
            dataVersionService.assignment(JsonUtil.getJsonByKey('versions', data))
        }).catch(err => {
            message.tip(err || '查询失败', 'error', 'center')
        })
    }
}

export const dataListService = new DataListService('dataList')