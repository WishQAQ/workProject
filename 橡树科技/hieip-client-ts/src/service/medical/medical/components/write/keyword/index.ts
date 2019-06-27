import { BaseService } from 'tools/flux/BaseService'
import { MrCruxModelDtoCrux, MrCruxTypeEntityCrux, Page } from 'pkg/entity/medical'
import { ApiCruxMr } from 'pkg/api/medical'
import { message } from 'pkg/common/message'
import debug from 'debug'

const log = debug('trace:病历:medical')

export interface KeywordState {
    /* 类型编号 */
    page?: Page
    /* 关键词分类信息集合 */
    crux?: MrCruxTypeEntityCrux[]
    /* 关键词信息集合 */
    mrCruxModel?: MrCruxModelDtoCrux[]
    /* 类型编号 */
    cruxTypeCode?: string
    /* 类型 */
    type?: number
    /* 科室编码 */
    deptCode?: string
    /* 名称 */
    name?: string
}

class KeywordService extends BaseService<KeywordState> {
    defaultState = {
        type: 0,
        name: ''
    }

    serviceWillMount() {
        this.reset()
    }

    /**
     * 科室，关键词分类
     */
    acquisition = (dept?: string) => {
        return ApiCruxMr.findMrCruxType().then((data: any) => {
            this.dispatch({ crux: data, deptCode: dept })
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 关键词信息
     */
    findMrCrux = () => {
        let { cruxTypeCode, type, deptCode, name } = this.state
        return ApiCruxMr.findMrCrux(cruxTypeCode, type, name).then((data: any) => {
            this.dispatch2({ mrCruxModel: data })
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 点击分分类的方法
     */
    rectClck = (e) => {
        return new Promise(resolve => {
            this.dispatch({ cruxTypeCode: e.key })
            resolve()
        }).then(() => this.findMrCrux())
    }
    /**
     * 单选框改变值和输入框
     */
    onChange = (names?: string, e?: any) => {
        return new Promise(resolve => {
            if (names === 'name') {
                this.dispatch({ [names]: e })
            } else {
                this.dispatch({ [names]: e.target.value })
            }
            resolve()
        }).then(() => this.findMrCrux())
    }
}

export const keywordService = new KeywordService('keyword')