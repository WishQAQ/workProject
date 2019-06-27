import { BaseService } from 'tools/flux/BaseService'
import {
    MrPatientFileIndexModelDtoPatient, MrRectificationIndexModelDtoLinkQuality, MrRectificationItemEntityLinkQuality
} from 'pkg/entity/medical'
import { JsonUtil } from 'tools/api/JsonUtil'
import { ApiLinkQualityRectification } from 'pkg/api/medical'
import { reformContentService } from 'service/medical/medical-reform/reform-content'
import { message } from 'pkg/common/message'
import { reformHistoryModelService } from 'service/medical/medical-reform/reform-history-modal'
import { reformDefectModelService } from 'service/medical/medical-reform/reform-defect-modal'
import { reformNoticeModelService } from 'service/medical/medical-reform/reform-notice-modal'

let reformSidebarApi = null

/**
 * 病历整改复合组件 service
 * create by 李潇潇
 * modify time 2018-2-3
 */
export interface ReformSidebarState {
    // 病历主记录明细
    mrRectificationIndexes?: Array<MrRectificationIndexModelDtoLinkQuality>,
    // 病历主记录model
    mrRectificationIndex?: MrRectificationIndexModelDtoLinkQuality,
    // 全部缺陷
    mrRectificationItems?: Array<MrRectificationItemEntityLinkQuality>,

    /* 病历类别展示 */
    // 病历类型下拉框选择后显示名称
    currentMrClassName?: string,
    // 病历类型下拉框选择后查询code
    currentMrClassCode?: string,
    // 病历类型agTable展示数据
    currentPatientMedicals?: Array<MrPatientFileIndexModelDtoPatient>,
    // 病历类型agTable展示数据  单个模型
    currentPatientMedical?: MrPatientFileIndexModelDtoPatient,
    // 病历类型下拉框所有数据
    currentMedicalTypeOptions?: Array<any>,
    // content 数据总数
    reformSidebarTotal?: number,
    page?: {
        startIndex?: number,
        pageSize?: number
    },
}

class ReformSidebarService extends BaseService<ReformSidebarState> {
    defaultState = {
        reformContentTotal: 0,
        page: {
            startIndex: 1,
            pageSize: 100
        },
        currentMrClassCode: '全部病历',
        currentMrClassName: '全部病历',
        mrRectificationItems: [],
        mrRectificationIndexes: [],
    }

    // 初始化过程加载患者数据
    serviceWillMount() {
        this.reset()
    }

    /**
     * 病例类别展示滚动分页  ag表格初始化
     * @param params
     */
    onGridReady = (params) => {
        reformSidebarApi = params
        this.onReveresSource()
    }

    /**
     * 病历历史modal框弹出,调用病历历史Service
     */
    onMedicalHistoryShow = () => {
        reformHistoryModelService.onMedicalHistoryShow()
    }

    /**
     * 病历整改通知框弹出,调用病历通知书Service
     */
    onReformNoticeShow = () => {
        const { mrRectificationItems } = this.state
        if (mrRectificationItems) {
            let map = {}
            mrRectificationItems.forEach((model) => {
                let type = model.gradingClassCode
                let data = map[type]
                if (!data) data = []
                data.push(model)
                map[type] = data
            })
            // this.dispatch({mrRectIndexMap: map})
            reformNoticeModelService.onReformNoticeShow(map)
        }
    }

    /**
     * 病历评分弹出框,调用病历评分Service
     */
    onReformDefectShow = () => {
        const { currentPatientMedical } = reformSidebarService.state
        if (!currentPatientMedical || '{}' === JSON.stringify(currentPatientMedical)) {
            message.tip('请选择相应的病历类型', 'warning', 'center')
            return
        }

        reformDefectModelService.onReformDefectShow()
    }

    /**
     * 单击病历表格 获取改行的病历信息
     */
    onClickChange = (params) => {
        this.dispatch({ currentPatientMedical: params.data })
        // console.log('点击病历信息', this.state.currentPatientMedical)
        // console.log(params.data)
    }

    /**
     * 表格滚动加载
     */
    onReveresSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.selectFormerly(params.startRow).then((data: any) => {
                    const { reformSidebarTotal } = this.state
                    let lastRow: number = 0

                    if (data) {
                        if (reformSidebarTotal <= params.endRow) lastRow = data.length
                        else if ((reformSidebarTotal > params.endRow) && (lastRow < reformSidebarTotal)) {
                            lastRow = params.startRow + data.length
                            if ((lastRow % params.endRow === 0) && (reformSidebarTotal > lastRow)) {
                                lastRow = lastRow + 1
                            }
                        } else lastRow = reformSidebarTotal ? reformSidebarTotal : 0
                    }
                    params.successCallback(data, lastRow)
                })
            }
        }
        reformSidebarApi.api.setDatasource(dataSource)
    }

    /**
     *
     * 获取患者病历数据
     *
     */
    selectFormerly = (startIndex?) => {
        this.dispatch2({
            currentPatientMedicals: [],
            currentMedicalTypeOptions: [],
        })

        const { currentPatient } = reformContentService.state
        const { currentMrClassCode, page } = this.state
        page.startIndex = startIndex ? startIndex : page.startIndex

        return new Promise(resolve => {
            ApiLinkQualityRectification.selectFormerly(currentPatient.patientId, currentPatient.visitId
                , '', '', '', null, page, currentMrClassCode)
                .then(response => {
                    if (response) {
                        const resultData: any = (response as any).pageResult.data
                        const fileNoCounts = (response as any).fileNoCounts
                        if ('[]' !== JSON.stringify(resultData)) {
                            this.dispatch2({
                                reformSidebarTotal: (response as any).pageResult.total,
                                page: page,
                            })
                        } else {
                            this.dispatch({ reformSidebarTotal: 0 })
                        }
                        this.dispatch({
                            currentPatientMedicals: resultData,
                            currentMedicalTypeOptions: fileNoCounts,
                        })
                        resolve(resultData)
                    }
                }).catch(error => message.tip(error || '未查询到数据', 'error', 'center'))
        })
    }

    /**
     * 病案类别item map遍历下拉框 单击病历类别
     */
    onMenuItemClick = (item) => {
        this.dispatch2({ currentMrClassName: item.props.value, currentMrClassCode: item.props.eventKey, currentPatientMedical: {} })
        this.onReveresSource()
    }

    // 属性赋值
    onChangeDataSet = (event, path) => {
        this.dispatch(JsonUtil.json(path, this.state, event.target.value))
    }

    /**
     * 添加一行病历缺陷
     */
    addRectification = (mrRectSelectItems?) => {
        const { mrRectificationItems, currentPatientMedical } = this.state
        const { codeName } = reformDefectModelService.state
        if (mrRectSelectItems) {
            mrRectSelectItems.forEach(val => {
                mrRectificationItems.push({
                    hospitalNo: currentPatientMedical.hospitalNo,
                    gradingClassName: codeName,
                    gradingClassCode: val.gradingClassCode,
                    gradingItemCode: val.gradingItemCode,
                    gradingItemName: val.gradingItemName,
                    gradingItemScore: val.gradingItemScore,
                    gradingItemStandard: val.gradingItemStandard,
                })
            })
        }
        this.dispatch2({ mrRectificationItems })
    }

    /**
     * 删除病历缺陷回调
     * @param {object} item - 当前选中的病历缺陷
     * @param {number} itemIndex - 当前选中的病历缺陷索引
     *
     */
    onDeleteDefects = (item, itemIndex) => {
        const { mrRectificationItems } = this.state
        mrRectificationItems.splice(itemIndex, 1)
        this.dispatch2({ mrRectificationItems })
        // console.log('删除后的缺陷列表', this.state.mrRectificationIndexes)
    }

    /**
     * 根据患者唯一标识查询患者有整改主记录
     */
    selectIndexes = (patientId?: string, visitId?: number) => {
        ApiLinkQualityRectification.selectIndexs(patientId, visitId).then(data => {
            this.dispatch({ mrRectificationIndexes: data ? data : [] })
        }).catch(err => {
            message.tip(err || '数据加载失败', 'error', 'center')
        })
    }
}

export const reformSidebarService = new ReformSidebarService('reformSedibar')