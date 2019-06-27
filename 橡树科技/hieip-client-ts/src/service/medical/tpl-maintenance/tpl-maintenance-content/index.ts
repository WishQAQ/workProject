import { BaseService } from 'tools/flux/BaseService'
import { ApiTemplateMrClass, ApiTemplateMrIndex } from 'pkg/api/medical'
import { message } from 'pkg/common/message'
import { routeService } from 'service/RouteService'
import { translateSiderService } from 'service/medical/translate/sider'
import { translateContentService } from 'service/medical/translate/content'
import { ApiTemplateMrTempletSmallIndex } from '../../../../packages/api/medical'
import { smallModalService } from '../small-modal'
import { bigModalService } from 'service/medical/tpl-maintenance/big-modal'

export interface TplMaintenanceContentState {
    /** 分类编码 */
    mrClassCode?: string
    /** 模板分类名称 */
    templateName?: string,
    /** 模板类型,大模板:1,小模板:0 */
    mrClassFlag?: number
    /** 病历模板数据 */
    dataList?: any[]
    /** 选中数据 */
    data?: any
}

class TplMaintenanceContentService extends BaseService<TplMaintenanceContentState> {
    /** table api */
    agApi?: any
    defaultState = {
        dataList: <any>[]
    }
    /**
     * table render 事件
     * @param params
     */
    onGridReady = (params) => {
        this.agApi = params
    }
    /**
     * 当病历模板总数为0时执行此方法
     * @param mrClassCode
     * @param templateName
     */
    clearMrTemplateValue = (mrClassCode, mrClassFlag) => {
        this.dispatch2({ templateName: '', mrClassCode: mrClassCode, mrClassFlag: Number(mrClassFlag), dataList: [] })
    }
    /**
     * 查询数据
     * @param mrClassCode 模板分类编码
     * @param value 输入模板查询值
     */
    selectMrTemplateIndex = (mrClassCode, mrClassFlag, templateName) => {
        ApiTemplateMrIndex.selectMrTemplateIndex(mrClassCode, templateName, {}, mrClassFlag).then(data => {
            this.dispatch2({ templateName: templateName, mrClassCode: mrClassCode, mrClassFlag: Number(mrClassFlag), dataList: data })
        }).catch(msg => message.error(msg || '病历模板查询失败'))
    }
    /**
     * 重新加载数据
     */
    reloadData = () => {
        let { mrClassFlag, mrClassCode, templateName } = this.state
        this.selectMrTemplateIndex(mrClassCode, mrClassFlag, templateName)
    }
    /**
     * 输入框模糊查询信息
     * @param e
     */
    onSearchInputChange = (type, e) => {
        let { mrClassFlag, mrClassCode } = this.state
        this.selectMrTemplateIndex(mrClassCode, mrClassFlag, type === 'pressEnter' ? e.target.value : e)
    }
    /**
     * 模糊查询输入框值改变时
     * @param e
     */
    onChangeValue = (e) => {
        this.dispatch({ templateName: e.target.value })
    }
    /**
     * table 选中数据
     * @param data 选中数据
     */
    onRowClick = (node) => {
        this.dispatch2({ data: node.data })
    }
    /**
     * table 行数据双击事件
     * @param node
     */
    onRowDoubleClick = (node) => {
        routeService.push('route_translate')
        translateSiderService.setTemplateIndex(node.data)
        translateSiderService.setTemplateType('smallTemplate')
        translateContentService.setTemplateIndex(node.data, this.state.mrClassFlag)
    }
    /**
     * 删除当前选中的行
     */
    onDeleteRowData = () => {
        if (!this.state.data) {
            message.error('请选择需要删除的数据')
            return
        }
        const { data, templateName, mrClassCode, mrClassFlag } = this.state
        message.linkAge(`确定要删除模板[${data.mrName}]?`, 5000, '确定', '取消', () => {
            if (mrClassFlag === 1) { // 删除大模板
                ApiTemplateMrIndex.deleteMrTemplateIndex(data.id).then(data => {
                    this.selectMrTemplateIndex(mrClassCode, mrClassFlag, templateName)
                    message.success('数据删除成功')
                }).catch(msg => message.error(msg || '模板删除失败'))
            } else { // 删除小模板
                ApiTemplateMrTempletSmallIndex.DeleteMrTempletSmallIndex(data.id).then(data => {
                    this.selectMrTemplateIndex(mrClassCode, mrClassFlag, templateName)
                    message.success('数据删除成功')
                }).catch(msg => message.error(msg || '模板删除失败'))
            }
        })
    }
    /**
     * 修改当前选中行数据
     */
    onUpdateRowData = () => {
        let { data, mrClassFlag } = this.state
        if (!data) {
            message.error('请选择修改数据')
            return
        }
        if (mrClassFlag === 1) { // 大模板
            bigModalService.setData(data)
        } else { // 小模板
            smallModalService.setData(data)
        }
    }

}

export const tplMaintenanceContentService = new TplMaintenanceContentService('tplMaintenanceContent')