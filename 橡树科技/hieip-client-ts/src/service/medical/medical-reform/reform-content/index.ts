import {BaseService} from 'tools/flux/BaseService'
import debug from 'debug'
import {ApiLinkQualityPatMasterInfo} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {PatMasterInfoModelDtoLinkQuality} from 'pkg/entity/medical'
import {reformHeaderService} from 'service/medical/medical-reform/reform-header'
import {reformSidebarService} from 'service/medical/medical-reform/reform-sidebar'

const log = debug('trace:病历整改:medical-reform')

let reformContentApi = null

/**
 *
 * 病历整改 主体页面
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-1-31
 */
export interface ReformContentState {
    isExpand?: boolean
    gradeRules?: string
    currentPatient?: PatMasterInfoModelDtoLinkQuality
    currentMedicalType?: string               // todo
    currentMedicalDefects?: any               // todo

    medicalTypeTotal?: number  //  病历类别滚动总数
    page?: {                    // 分页对象
        startIndex?: number,
        pageSize?: number
    },
}

class ReformContentService extends BaseService<ReformContentState> {
    defaultState = {
        isExpand: true,                         // 表格头是否展开切换控制
        isDefects: false,                       // 是否选中缺陷项
        gradeRules: 'test-1',                   // 病案评分类别

        currentPatient: {},                   // 当前选中患者数据
        currentPatientMedical: [],            // 当前患者的病历数据
        currentMedicalType: '',               // 当前患者病历类型
        currentMedicalTypeOptions: null,

        page: {
            startIndex: 1,
            pageSize: 100
        },
        medicalTypeTotal: 0
    }

    /**
     * ag表格初始化
     * @param params
     */
    onGridReady = (params) => {
        reformContentApi = params
        this.onReveresSource()
    }

    /**
     * 表格滚动加载
     */
    onReveresSource = () => {
        let dataSource = {
            rowCount: null,
            getRows: (params) => {
                this.getPatientData(params.startRow).then((data: any) => {
                    const {medicalTypeTotal} = this.state
                    let lastRow: number = 0
                    if (data) {
                        if (medicalTypeTotal <= params.endRow) lastRow = data.length
                        else if (medicalTypeTotal > params.endRow && lastRow < medicalTypeTotal) {
                            lastRow = params.startRow + data.length
                            if (lastRow % params.endRow === 0 && medicalTypeTotal > lastRow) {
                                lastRow = lastRow + 1
                            }
                        } else lastRow = medicalTypeTotal ? medicalTypeTotal : 0
                    }
                    params.successCallback(data, lastRow)
                })
            }
        }
        reformContentApi.api.setDatasource(dataSource)
    }

    // 获取所有的患者数据
    getPatientData = (startIndex?) => {
        const {
            radio, comeOut, info, begin, end, type, status,
            deptCode, value, page
        } = reformHeaderService.state

        page.startIndex = startIndex ? startIndex : page.startIndex
        return new Promise(resolve => {
            ApiLinkQualityPatMasterInfo.selectInfo(radio, info, comeOut, begin, end, type, status, deptCode, value, page)
                .then(data => {
                    if (data && '[]' !== JSON.stringify(data)) {
                        this.dispatch2({medicalTypeTotal: data.total, page})
                    } else {
                        this.dispatch({medicalTypeTotal: 0})
                    }
                    resolve(data)
                }).catch(error => {
                message.tip(error || '未查询到数据', 'error', 'center')
            })
        })
    }

    /**
     *
     * 右键单击事件
     * @param {number} menuIndex - 当前点击菜单项的索引值
     * @param {number} dataIndex - 当前单击的表格行索引值
     *
     */
    onContentMenuClick = (menuIndex, dataIndex) => {
        log('右键点击', menuIndex, dataIndex)
    }

    /**
     *
     * 表格单元格双击后切换到患者详情页面
     *
     */
    onHandleCellDoubleClick = () => {
        this.dispatch({isExpand: false})
    }

    /**
     *
     * 折叠后单击单元格获取患者病历数据
     *
     */
    onHandleCellClick = (event) => {
        this.dispatch({currentPatient: event ? event.data : {}})
        reformSidebarService.serviceWillMount()

        const {isExpand, currentPatient} = this.state
        if (!isExpand) { //  content 折叠的时候点击患者信息
            reformSidebarService.onReveresSource()
            reformSidebarService.selectIndexes(currentPatient.patientId, currentPatient.visitId)
        }
    }
    // 展开表格头
    onHandleExpandClick = () => {
        this.dispatch({isExpand: true})
    }

    // 病历评分类别onChange回调
    // onGradeRuleChange = (value) => {
    //     this.dispatch({gradeRules: value})
    // }
}

export const reformContentService = new ReformContentService('reformContent')
