import {BaseService} from 'tools/flux/BaseService'
import {MrCruxModelDtoCrux, MrCruxTypeEntityCrux, MrCruxTypeModelDtoCrux} from 'pkg/entity/medical'
import {ApiCruxMr} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {sortDetailService} from 'service/medical/keyword/sort-detail'
import {JsonUtil} from 'tools/api/JsonUtil'

export interface CruxTypeChildren extends MrCruxTypeModelDtoCrux {
    children?: Array<MrCruxModelDtoCrux>
}

export interface SortListState {
    /* 关键词分类信息集合 */
    cruxTypes?: Array<CruxTypeChildren>,
    /*  关键词分类对象  */
    cruxType?: CruxTypeChildren,
    /* 关键词类型表 */
    cruxTypeEntity?: MrCruxTypeEntityCrux,
    /*  */
    cruxTypeIndex?: number,
    /* 是否显示修改关键词弹框 */
    updateVisible?: boolean,
    /* 是否显示新增关键词弹框 */
    addVisible?: boolean,
    /*修改分类输入框值*/
    upCruxInData?: string,
    /*添加分类输入框取值*/
    saveCruxInData?: string
    /* 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁 */
    openKeys?: Array<string>
    /*  */
    rootSubmenuKeys?: Array<string>
}

class SortListService extends BaseService<SortListState> {
    defaultState = {
        updateVisible: false,
        addVisible: false,
        cruxType: null,
        /* 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁 */
        openKeys: ['12'],
        rootSubmenuKeys: [],
        cruxTypes: []
    }

    serviceWillMount() {
        this.findMrCruxType()
    }

    // 为rootSubmenuKeys赋值
    handleGiveKeys = (data) => {
        let cruxTypes = data
        let rootSubmenuKeys = []
        for (let i = 0, len = cruxTypes.length; i < len; i++) {
            rootSubmenuKeys.push(cruxTypes[i].id + '')
        }
        this.dispatch({
            rootSubmenuKeys: rootSubmenuKeys
        })
    }

    /* 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁 */
    onOpenChange = (openKeys) => {
        if (openKeys.length === 0) {
            this.dispatch2({openKeys: []})
        } else {
            this.dispatch2({openKeys: [openKeys[openKeys.length - 1]]})
        }
    }

    // ant组件自带函数
    handleShowAdd = () => {
        this.dispatch2({addVisible: true, cruxTypeEntity: {}})
    }
    handleCancelAdd = () => {
        this.dispatch({addVisible: false})
    }
    // ant组件自带函数
    handleShowAlter = () => {
        this.dispatch({updateVisible: true})
    }
    handleCancelAlter = () => {
        this.dispatch({updateVisible: false})
    }
    /**
     * 输入框取值
     * @param path
     * @param event
     */
    inputData = (event, ...path) => {
        this.dispatch(JsonUtil.json2(path, this.state, event))
    }
    /**
     * 单击模糊查询关键词
     * @param item 关键词分类模型
     * @param index 关键词分类下标索引
     * @returns {Promise< | ArrayData<MrCruxEntityCrux>>}
     */
    handlerRowClicked = (index, item) => {
        const {cruxTypes} = this.state
        sortDetailService.setRowData(cruxTypes[index].children, item)
        this.dispatch({
            cruxTypeEntity: {
                id: item.id,
                cruxName: item.cruxName,
                cruxCode: item.cruxCode,
                createTime: item.createTime,
                hospitalNo: item.hospitalNo,
                createUserId: item.createUserId
            }
        })
    }

    /**
     * 查询所有分类
     */
    findMrCruxType = () => {
        this.dispatch2({cruxTypes: []})
        ApiCruxMr.findMrCruxType().then(data => {
            this.dispatch({cruxTypes: data})
            data.forEach((val, key) => {
                ApiCruxMr.findMrCrux(val.cruxCode, null, '').then(dataValue => {
                    this.state.cruxTypes[key].children = dataValue
                })
            })
            this.handleGiveKeys(this.state.cruxTypes)
        }).catch(err => {
            message.error(err || '查询失败')
        })
    }
    /**
     * 删除分类
     */
    deleteCruxType = (id) => {
        ApiCruxMr.deleteCruxType(id).then(() => {
            this.dispatch2({cruxTypes: []})
            this.findMrCruxType()
            message.success('删除成功')
        }).catch(err => {
            message.error(err || '删除失败')
        })
    }
    /**
     * 新增分类
     */
    saveCruxType = () => {
        this.handleCancelAdd()
        this.handleCancelAlter()
        const {cruxTypeEntity} = this.state
        if (cruxTypeEntity.cruxName === '') {
            message.tip('分类名称不能为空!', 'warning')
            return
        }
        ApiCruxMr.saveCruxType(this.state.cruxTypeEntity).then(() => {
            this.findMrCruxType()
            message.success('更新成功')
        }).catch(err => {
            message.error(err || '更新失败')
        })
        this.dispatch2({cruxTypeEntity: {}})
    }
}

export const sortListService = new SortListService('sortList')