/**
 * 病历模板制作,病历模板分类
 */
import { BaseService } from '../../../../tools/flux/BaseService'
import {
    FileVisitTypeDictEntityDict, MrGradingClassEntityHandMonitor,
    MrTemplateClassModelDtoTemplate
} from '../../../../packages/entity/medical'
import { ApiDictInput, ApiTemplateMrClass, ApiTemplateMrIndex } from '../../../../packages/api/medical'
import { message } from '../../../../packages/common/message'
import { JsonUtil } from '../../../../tools/api/JsonUtil'
import { tplMaintenanceSliderService } from '../tpl-maintenance-slider'

export interface ClassifyModalState {
    /** 弹出框是否显示 */
    classifyModalVisible?: boolean
    /** 分类数据 */
    data?: MrTemplateClassModelDtoTemplate
    /** 文书类型字典表 */
    fileVisitTypeDictList?: FileVisitTypeDictEntityDict[]
    /** 数据集option */
    bdDsOptionList?: any[]
    /** 数据集 data */
    bdDsDataList?: any[]
    /** 质控评分类别字典 */
    mrGradingClassList?: MrGradingClassEntityHandMonitor[]
    /**  数据集总数 */
    dataTotal?: number
    /** 数据集名称 */
    dsName?: string
    activeKey?: number
}

class ClassifyModalService extends BaseService<ClassifyModalState> {
    defaultState = {
        classifyModalVisible: false,
        dataTotal: 0
    }

    /**
     * 设置显示弹出框
     * @param data 不为空,标识为修改,为空则为新增
     * @param visible 是否显示弹框
     */
    setData(index: MrTemplateClassModelDtoTemplate, activeKey) {
        ApiTemplateMrIndex.toSaveOrUpdate().then(data => {
            this.dispatch2({
                data: index,
                classifyModalVisible: true,
                activeKey: activeKey,
                fileVisitTypeDictList: JsonUtil.getJsonByKey('mrClassType', data, []),
                mrGradingClassList: JsonUtil.getJsonByKey('gradingClassCode', data, [])
            })
        }).catch(msg => message.error(msg || '字典数据查询失败'))
        // 初始化数据集,监控代码
        ApiDictInput.loadColumns('SJJ').then(data => {
            this.dispatch({ bdDsOptionList: data })
        }).catch(msg => message.error(msg || '数据集字典查询失败'))
    }

    /**
     * 取消显示弹框
     */
    onCancel = () => {
        this.dispatch({ classifyModalVisible: false })
    }
    /**
     * 保存分类
     */
    save = (err, value) => {
        let activeKey = this.state.activeKey
        if (!err) {
            value.mrClassFlag = activeKey
            ApiTemplateMrClass.saveMrTemplateClass(value).then(data => {
                message.success('保存成功')
                this.dispatch({ classifyModalVisible: false })
                tplMaintenanceSliderService.tabChange(activeKey)
            }).catch(msg => message.error(msg || '保存失败'))
        }
    }
    /***
     * input Table
     * @param name
     * @param e
     */
    inputTableCallBack = (e) => {
        if (e.type === 'enterEvent') {// 选中数据
            // 设置data 的数据集id
            this.dispatch2(JsonUtil.json('data.dsCode', this.state, e.data.id))
        } else { // pageEvent
            let page = { pageSize: e.pageSize, startIndex: e.pageCurrent }
            ApiDictInput.loadData(page, 'SJJ', e.value ? e.value : '').then(data => {
                this.dispatch2({ 'bdDsDataList': data, 'dataTotal': data.total })
                this.dispatch2(JsonUtil.json('data.dsCode', this.state, e.data.id))
            }).catch(msg => message.error(msg || '查询数据失败'))
        }
    }
}

export const classifyModalService = new ClassifyModalService('classifyModal')