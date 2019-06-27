import {BaseService} from 'tools/flux/BaseService'
import {MrTemplateClassModelDtoTemplate} from 'pkg/entity/medical'
import {ApiTemplateMrClass} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {tplMaintenanceContentService} from 'service/medical/tpl-maintenance/tpl-maintenance-content'
import debug from 'debug'
import {bigModalService} from '../big-modal'
import {smallModalService} from '../small-modal'
import {classifyModalService} from '../classify-modal'

const log = debug('trace:病历:medical')

export interface TplMaintenanceSliderState {

    mrTemplateClass?: MrTemplateClassModelDtoTemplate[]
    /** 小模板大模板tab当前选中的下标 */
    defaultActiveKey?: number
    defaultExpandedKeys?: string[]
}

class TplMaintenanceSliderService extends BaseService<TplMaintenanceSliderState> {
    defaultState = {
        mrTemplateClass: []
    }

    serviceWillMount() {
        this.tabChange(1)
    }

    /**
     * 小模板大模板change执行
     * @param {string} key
     */
    tabChange = (key) => {
        return ApiTemplateMrClass.findMrTemplateClass(Number(key)).then(data => {
            this.dispatch2({mrTemplateClass: data, defaultActiveKey: Number(key)})
            tplMaintenanceContentService.clearMrTemplateValue('', Number(key))
        }).catch(err => {
            message.error(err.msg || '获取分类信息信息!')
        })
    }
    /**
     * 菜单点击时加载数据
     * @param selectedKeys
     * @param e
     */
    onTreeItemClick = (selectedKeys, e: { selected: boolean, selectedNodes, node, event }) => {
        let {mrClassCode, templateIndexCount, parentMrClassCode} = e.node.props.dataRef
        // 大于0 查询数据 ,等于0 清空数据
        if (templateIndexCount > 0) tplMaintenanceContentService.selectMrTemplateIndex(mrClassCode, this.state.defaultActiveKey, '')
        else tplMaintenanceContentService.clearMrTemplateValue(mrClassCode, this.state.defaultActiveKey)
        if (e.selected && !e.node.props.expanded) { // 选中的数据
            this.dispatch2({defaultExpandedKeys: selectedKeys})
        } else { // 设置父节点选中
            this.dispatch2({defaultExpandedKeys: parentMrClassCode ? [parentMrClassCode.toString()] : []})
        }
    }
    /**
     * 解决第一层点击时加载菜单
     * @param {string[]} openKeys
     */
    onMenuOpenChange = (openKeys: string[]) => {
        tplMaintenanceContentService.selectMrTemplateIndex(openKeys[openKeys.length - 1], this.state.defaultActiveKey, '')
    }
    /**
     * 右键菜单点击事件
     * @param name
     * @param e
     * @param data
     */
    onRightClick = (name, e, data) => {
        let activeKey = this.state.defaultActiveKey
        if (name === '添加模板') {
            if (activeKey === 1) {
                bigModalService.setData({mrClass: data.item.mrClassCode, mrClassName: data.item.mrClassName, tempaleType: 1})
            } else {
                smallModalService.setData({mrClassName: data.item.mrClassName, mrClass: data.item.mrClassCode})
            }
        } else if (name === '删除子分类') {
            message.linkAge('确定要删除此分类?', 5000, '确定', '取消', () => {
                ApiTemplateMrClass.deleteMrTemplateClass(data.keyName, Number(activeKey)).then(() => {
                    message.success('删除成功')
                    this.tabChange(activeKey)
                }).catch(msg => message.error(msg || '删除分类失败'))
            })
        } else if (name === '新增子分类') {
            classifyModalService.setData({
                parentMrClassName: data.item.mrClassName,
                parentMrClassCode: data.item.id
            }, activeKey)
        } else if (name === '修改分类') {
            classifyModalService.setData(data.item, activeKey)
        }
    }
}

export const tplMaintenanceSliderService = new TplMaintenanceSliderService('tplMaintenanceSlider')