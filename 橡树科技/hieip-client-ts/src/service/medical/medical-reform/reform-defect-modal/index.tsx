import {BaseService} from 'tools/flux/BaseService'
import {MrGradingClassEntityHandMonitor, MrGradingItemsEntityHandMonitor} from 'pkg/entity/medical'
import {ApiLinkQualityRectification} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {reformSidebarService} from 'service/medical/medical-reform/reform-sidebar'

let reformDefectApi = null

/**
 * 病历病案评分弹出框service
 * create By 李潇潇
 * create Time 2018-2-5
 */
export interface ReformDefectModelState {
    isDefectVisible?: boolean,// 是否显示病案评分
    defectTypeTotal?: number,//  病案评分类型总数
    page?: {
        startIndex: number,
        pageSize: number
    },

    code?: string, //  病案评分类型 默认的质控评分类编码
    codeName?: string,// 病案评分类型 默认的质控评分类名称
    mrRectificationItems?: Array<MrGradingItemsEntityHandMonitor>, // 病案手动评分明细信息模型集合
    mrRectSelectItems?: Array<MrGradingItemsEntityHandMonitor>, // 病案手动评分明细信息模型集合(用于多选时的评分集合)
    mrRectificationItem?: MrGradingItemsEntityHandMonitor, // 病案手动评分模型
    mrGradingClasses?: Array<MrGradingClassEntityHandMonitor> // 质控评分类型字典表
}

class ReformDefectModelService extends BaseService<ReformDefectModelState> {
    defaultState = {
        codeName: '',
        code: '',
        defectTypeName: '',
        isDefectVisible: false,
        page: {
            startIndex: 1,
            pageSize: 7
        },
        mrRectificationItems: []
    }
    /**
     * 病案评分表格初始化
     * @param params
     */
    onGridReady = (params) => {
        reformDefectApi = params
    }
    /**
     * 点击分页事件
     * @param clickPage
     * @private
     */
    // onChangePag = (clickPage) => {
    //     let {page} = this.state
    //     page.startIndex = page.pageSize * (clickPage - 1)
    //     if (clickPage === 1) page.startIndex = 1
    //     this.dispatch({page})
    //     this.getGrading()
    // }
    /**
     * 评分信息单击取值
     * @param event
     */
    onClickChange = (event) => {
        this.dispatch({mrRectificationItem: event.data})
    }
    /**
     * 评分模型多选
     *
     * @param event
     */
    onSelectChange = (event) => {
        // todo  应该是查询的缺陷 +/- 选择的缺陷，现在只是取得多选的缺陷
        this.dispatch2({mrRectSelectItems: []})
        let selectItems = []
        if (event) {
            event.forEach(val => {
                selectItems.push(val.data)
            })
        }
        this.dispatch2({mrRectSelectItems: selectItems})
    }
    /**
     * 模糊查询病案质控信息(病案评分)
     */
    selectClassTimes = () => {
        const {currentPatientMedical} = reformSidebarService.state
        ApiLinkQualityRectification.selectClassTimes(currentPatientMedical ? currentPatientMedical.fileNo : ''
            , currentPatientMedical ? currentPatientMedical.mrClass : '').then((data) => {
            if (data) {
                for (let prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        switch (prop) {
                            case 'code': {
                                this.dispatch({code: data[prop]})
                                break
                            }
                            case 'mrRectificationItem': {
                                this.dispatch2({mrRectificationItems: data[prop]})
                                break
                            }
                            case 'mrGradingClass': {
                                this.dispatch2({mrGradingClasses: data[prop]})
                                break
                            }
                            default:
                                break
                        }
                    }
                }
            }
        }).catch(err => {
            message.tip(err || '评分信息加载失败', 'error', 'center')
        })
    }
    /**
     * 根据选中的质控评分类别查询评分明细的信息
     */
    selectMrGradingItems = () => {
        ApiLinkQualityRectification.selectMrGradingItems(this.state.code).then(data => {
            this.dispatch2({mrRectificationItems: data})
        }).catch(err => {
            message.tip(err || '评分详细加载失败', 'error', 'center')
        })
    }
    // 隐藏评分窗口
    onReformDefectHide = () => {
        this.dispatch({isDefectVisible: false})
    }
    // 显示评分窗口
    onReformDefectShow = () => {
        const {currentPatientMedical} = reformSidebarService.state
        this.dispatch({codeName: currentPatientMedical ? currentPatientMedical.topic : ''})
        // 加载字典信息
        this.selectClassTimes()
        this.dispatch({isDefectVisible: true})
    }
    /**
     * 评分窗口确认信息后，数据处理
     */
    onDefectOk = () => {
        const {mrRectSelectItems} = this.state
        reformSidebarService.addRectification(mrRectSelectItems)
        this.onReformDefectHide()
    }
    /**
     * 数据绑定
     */
    onChangeDataSet = (event, val) => {
        this.dispatch({
            codeName: val ? val.props.children : '',
            code: val ? val.props.value : ''
        })
        this.selectMrGradingItems()
    }
}

export const reformDefectModelService = new ReformDefectModelService('reformDefectModel')