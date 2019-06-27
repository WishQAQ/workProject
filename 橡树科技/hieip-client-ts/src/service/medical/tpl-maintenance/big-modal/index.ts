/**
 *  内容: 大模板病历维护
 *  创建时间:2018-01-09
 *  创建人: 谢小慧
 */
import {BaseService} from '../../../../tools/flux/BaseService'
import {
    DeptDictEntityDict, FileVisitTypeDictEntityDict, InputDictModelDtoDict, MrGradingClassEntityHandMonitor, MrTemplateIndexEntityTemplate,
    MrTemplateIndexModelDtoTemplate
} from '../../../../packages/entity/medical'
import {JsonUtil} from '../../../../tools/api/JsonUtil'
import {ApiDictInput, ApiTemplateMrIndex} from '../../../../packages/api/medical'
import {message} from '../../../../packages/common/message'
import debug from 'debug'
import {Columns} from 'pkg/common/inputTable'

const log = debug('trace:病历:medical')

export interface BigModalState {
    /** 是否显示 */
    bigModalVisible?: boolean
    /** 当前编辑的数据 */
    data?: MrTemplateIndexModelDtoTemplate
    /** 母模板集合 */
    masterTemplateList?: MrTemplateIndexEntityTemplate[]
    /** 文件类型字典 */
    fileVisitTypeDictList?: FileVisitTypeDictEntityDict[]
    /** 质控评分类别字典 */
    mrGradingClassList?: MrGradingClassEntityHandMonitor[]
    /** 数据集title表头信息 */
    bdDsHeaderList?: Array<any>
    /** 数据集数据list */
    bdDsDataList?: Array<any>
    /** 数据集总数 */
    bdDsDataTotal?: number
    /** 科室表头信息 */
    deptHeaderList?: Array<any>
    /** 科室数据list */
    deptDataList?: Array<any>
    /** 科室总数 */
    deptDataTotal?: number
}

class BigModalService extends BaseService<BigModalState> {
    defaultState = {
        bigModalVisible: false,
        bdDsDataList: [],
        deptDataList: [],
        bdDsDataTotal: 0,
        deptDataTotal: 0,
        data: <MrTemplateIndexModelDtoTemplate>{}
    }

    serviceWillMount() {
        ApiDictInput.loadMultipleColumns(['deptDict', 'SJJ']).then(data => {
            this.dispatch2({
                bdDsHeaderList: JsonUtil.getJsonByKey('SJJ', data, []),
                deptHeaderList: JsonUtil.getJsonByKey('deptDict', data, [])
            })
        }).catch(msg => message.tip(msg || '加载字典表头信息失败', 'error', 'center'))
    }

    /**
     * 加载inputTable 数据
     * @param name inputTable 唯一编码
     * @param e 返回的对象
     */
    loadInputTable = (name, e) => {
        if (e.type === 'enterEvent') {// 选中数据
            let data = this.state.data
            if (name === 'SJJ') {
                data.dsName = e.value
                data.dsCode = e.data.id
            } else {
                data.deptName = e.value
                data.deptCode = e.data.deptCode
            }
            this.dispatch2({data: data})
        } else {
            ApiDictInput.loadData({pageSize: e.pageSize, startIndex: e.pageCurrent}, name, e.value).then(data => {
                let _data = this.state.data
                if (name === 'SJJ') {
                    _data.dsName = e.value
                    this.dispatch2({bdDsDataList: data, bdDsDataTotal: data.total, data: _data})
                } else {
                    _data.deptName = e.value
                    this.dispatch2({bdDsDataList: data, deptDataTotal: data.total, data: _data})
                }
            }).catch(msg => message.error(msg || '查询数据失败'))
        }
    }
    /**
     * 设置值
     * @param index
     */
    setData = (index) => {
        // 查询字典数据
        ApiTemplateMrIndex.toSaveOrUpdate().then(data => {
            this.dispatch2({
                data: index,
                fileVisitTypeDictList: JsonUtil.getJsonByKey('mrClassType', data, []),
                masterTemplateList: JsonUtil.getJsonByKey('masterTemplateId', data, []),
                mrGradingClassList: JsonUtil.getJsonByKey('gradingClassCode', data, []),
                bigModalVisible: true
            })
        }).catch(msg => message.error(msg || '字典数据查询失败'))
    }
    /**
     * 关闭弹出窗口执行
     */
    onBigModalCancel = () => {
        this.dispatch({bigModalVisible: false})
    }
    /**
     * 保存弹出框内容
     */
    onBigModalOk = () => {
        let {data} = this.state
        if (this.checkValue(data)) {
            if (data.id) {
                return ApiTemplateMrIndex.updateMrTemplateIndex(data).then(data => {
                    message.success('修改成功')
                    this.dispatch({bigModalVisible: false})
                }).catch(msg => message.error(msg || '病历修改失败'))
            } else {

                return ApiTemplateMrIndex.saveMrTemplateIndex(data).then(data => {
                    message.success('保存成功')
                    this.dispatch({bigModalVisible: false})
                }).catch(msg => message.error(msg || '病历保存失败'))
            }

        }

    }

    /***
     * 输入框值改变时执行
     * @param name
     * @param value
     */
    onDataChangeValue = (value, ...name) => {
        this.dispatch2(JsonUtil.json2(name, this.state, value))
    }

    /**
     * 效验数据
     * @param data
     */
    private checkValue(data) {
        let verifyList = ['topic', 'mrName', 'monitorCode']
        let errorMessage = {
            topic: '标题不能为空',
            mrName: '文件名称不能为空',
            monitorCode: '质控编码不能为空'
        }
        let keys = Object.keys(data)
        for (let key in keys) {
            if ((!data[key] || data[key].trim().length < 1) && verifyList.indexOf(key) > -1) {
                message.error(errorMessage[key])
                return false
            }
        }
        return true
    }

}

export const bigModalService = new BigModalService('BigModal')