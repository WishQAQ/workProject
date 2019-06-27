import {BaseService} from 'tools/flux/BaseService'
import {MrCruxEntityCrux, MrCruxModelDtoCrux} from 'pkg/entity/medical'
import {ApiCruxMr, ApiDictionaryFileVisitTypeDict} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {CruxTypeChildren, sortListService} from 'service/medical/keyword/sort-list'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface SortDetailState {
    /*  关键词详细模型集合 */
    cruxs?: Array<MrCruxModelDtoCrux>,
    /*关键词详细模型 */
    crux?: MrCruxModelDtoCrux,
    /* 新增关键词单独模型 */
    cruxEntity?: MrCruxEntityCrux,
    /*  关键词分类模型 */
    cruxType?: CruxTypeChildren,
    /* inputTable的数据 */
    inputData?: string,
    /* 科室code */
    deptCode?: string,
    /* 模糊查询单选框 */
    radioData?: number,
    /* 选中行的下标 */
    cruxIndex?: number,
    /* 显示添加关键词弹窗 */
    isShowAdd?: boolean,
    /*分类名称编码*/
    cruxTypeCode?: string,
    /*科室名称集合*/
    deptDict?: Array<any>
    /* 是否点击了ag表格关键词 */
    isCruxClick?: boolean
    /* 关键词新增或修改，默认为新增(false) */
    addOrUpdate?: boolean
    /* 是否为新增操作 */
    isAddClick?: boolean
    /* 更新时radio值 */
    radioSaveData?: number
}

class SortDetailService extends BaseService<SortDetailState> {
    /* ag表格的api */
    agApi?: any
    defaultState = {
        inputData: '',
        radioData: null,
        isShowAdd: false,
        isCruxClick: false,
        addOrUpdate: false,
        cruxEntity: {},
        isAddClick: false
    }
    /**
     * 模糊查询关键词
     */
    findMrCrux = () => {
        const {radioData, inputData, cruxType} = this.state
        ApiCruxMr.findMrCrux(cruxType.cruxCode, radioData, inputData).then(data => {
            this.dispatch2({cruxs: data})
            this.agApi.api.setRowData(data)
        }).catch(err => {
            message.tip(err.msg || '获取关键词信息失败!', 'error', 'center')
        })
    }
    /**
     * 查询关键词
     */
    selectCrux = () => {
        const {cruxType} = this.state
        ApiCruxMr.findMrCrux(cruxType.cruxCode, null, '').then(data => {
            // if (!data || data.length === 0)
            //     message.warning('未找到相关信息')
            this.agApi.api.setRowData(data)
            sortListService.findMrCruxType()
        }).catch(err => {
            message.error(err || '查询失败')
        })
    }
    /**
     * 关键词更新
     */
    saveCrux = () => {
        const {radioSaveData, crux, cruxType} = this.state
        if (crux && JsonUtil.isEmpty(crux.content)) {
            message.tip('内容不能为空', 'warning', 'center')
            return
        }
        this.dispatch2({
            isShowAdd: true,
            // 为关键词模型赋值
            cruxEntity: {
                cruxTypeCode: cruxType.cruxCode,
                name: crux ? crux.name : '',
                content: crux ? crux.content : '',
                deptCode: crux ? crux.deptCode : '',
                type: radioSaveData,
                id: crux.id
            }
        })
        ApiCruxMr.saveCrux(this.state.cruxEntity).then(() => {
            this.dispatch2({crux: {}, cruxs: []})
            this.selectCrux()
            message.success('更新成功')
        }).catch(err => {
            message.tip(err.msg || '更新失败!', 'error', 'center')
        })
        this.dispatch2({isShowAdd: false})
    }
    /**
     * 关键词更新弹框取值
     */
    updateCruxValue = () => {
        // 获取科室字典 todo  正式环境通过登录信息获取科室代码进行查询
        ApiDictionaryFileVisitTypeDict.FindDeptDict('12002').then(data => {
            let deptDict = []
            data.forEach((value: any) => {
                deptDict.push({
                    name: value.deptName,// 科室名称
                    id: value.deptCode,// 科室代码
                    inputCode: value.inputCode // 输入码
                })
            })
            this.dispatch({deptDict: deptDict})
        })
        // 当addOrUpdate为true时是修改
        if (!this.state.addOrUpdate)
            this.dispatch({crux: null})
        else {
            if (!this.state.isCruxClick) {
                message.warning('请选择需要修改的关键词')
                return
            }
        }
        this.dispatch({isShowAdd: true})
    }
    /**
     * 右键点击获取下标索引
     * @param menuIndex 右键弹出的list按钮索引
     */
    menuClick = (menuIndex) => {
        const {crux} = this.state
        if (menuIndex === 1) {// 删除按钮
            ApiCruxMr.deleteCrux(crux.id).then(() => {
                this.dispatch2({crux: {}, cruxs: [], isShowAdd: false})
                this.selectCrux()
                message.success('删除成功')
            }).catch(err => {
                message.tip(err.msg || '删除失败!', 'error', 'center')
            })
        } else if (menuIndex === 0) {// 修改按钮
            this.dispatch({addOrUpdate: true, isAddClick: false})
            this.updateCruxValue()
        }
    }
    /*Table加载，对数据的处理*/
    onGridReady = (params) => {
        this.agApi = params
    }
    /**
     * 为关键词页面赋值
     * @param cruxs 关键词集合
     * @param cruxType 关键词分类模型
     */
    setRowData = (cruxs, cruxType) => {
        this.dispatch({cruxs: cruxs, cruxType: cruxType})
        this.agApi.api.setRowData(cruxs)
    }
    handleCancel = () => {
        this.dispatch({isShowAdd: false})
    }
    /*弹窗(新增) 数据集输入框 修改*/
    onChangeDataSet = (value, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, value))
    }
    /**
     * 搜索框取值
     * @param e
     */
    selInDataChange = (e) => {
        this.dispatch({inputData: e.target.value})
    }
    /**
     * ag表格左右键点击取当前行数据
     * @param e
     */
    agTableClick = (e) => {
        this.dispatch({cruxIndex: e.rowIndex, crux: e.data, isCruxClick: true})
    }
    /*模糊查询单选框取值*/
    radioChangeSelect = (event) => {
        this.dispatch({radioData: event.target.value})
        this.findMrCrux()
    }
    /*新增关键词单选框取值*/
    radioChangeAdd = (event) => {
        this.dispatch({radioSaveData: event.target.value})
    }

    /**
     * 在点击新增后的中间操作
     */
    addCruxWindow = () => {
        this.dispatch2({addOrUpdate: false, isAddClick: true})
        this.updateCruxValue()
    }
}

export const sortDetailService = new SortDetailService('sortDetail')