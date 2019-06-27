// 创建人：韦祎伟
// 导入基础BaseService
// this.setState() => this.dispatch() or this.dispatch2()
// this.state => this.getState()
// React.component<props,state> => FluxComponent<serviceState>
// this.方法名 => service.方法名
import { BaseService } from 'tools/flux/BaseService'
import { ApiClassesExchange } from 'pkg/api'
import { ExchangeClassesModelDtoClasses, Page } from 'pkg/entity'
import { message } from 'pkg/common/message'

export interface ApprovedState {// 声明类型
    /** 调班审批数据 */
    tableData?: Array<ExchangeClassesModelDtoClasses>,
    /** 分页加载开始项 */
    startIndex?: number,
    /** 每页加载条数 */
    pageSize?: number,
    /** 拒绝理由 弹框 */
    open?: boolean,
    /** * 选中行 */
    selectedData?: Array<ExchangeClassesModelDtoClasses>,
    /** * 开始时间 */
    begin?: any,
    /** * 结束时间 */
    end?: any,
    /** * 结束时间 */
    range?: any,
    /** * 开始时间提示文字 */
    startPlaceholder?: string,
    /** * 结束时间提示文字 */
    endPlaceholder?: string,
    /** * 类型选择默认值 */
    defaultState?: number,
    /** * 类型：申请 */
    applyingState?: number,
    /** * 类型：同意 */
    agreeState?: number,
    /** * 类型：拒绝 */
    refuseState?: number,
    /** * 当前选择类型 */
    state?: number,
    /** * 多行文本 */
    txtValue?: string
}

class ApprovedService extends BaseService<ApprovedState> {

    agApi?: any // AG列表的api

    defaultState = { // 初始化
        tableData: [],
        startIndex: 1,
        pageSize: 20,
        open: false,
        selectedData: [],
        begin: '',
        end: '',
        range: '',
        startPlaceholder: '申请开始时间',
        endPlaceholder: '申请结束时间',
        defaultState: 1,
        applyingState: 1,
        agreeState: 3,
        refuseState: 4,
        state: 1,
        agApi: null,
        txtValue: ''
    }

    serviceWillMount() {
        this.findAllApproved()
    }

    /**
     * 表格重新加载时，清除当前选择行
     */
    onGridReady = (params) => {
        this.agApi = params
    }

    /**
     * 默认加载 调班审批数据
     * @return {Promise<void>}
     */
    findAllApproved = () => {
        let { startIndex, pageSize, defaultState } = this.getState()
        return ApiClassesExchange.selecClasses({ startIndex, pageSize }, '', defaultState).then((data) => {
            this.dispatch2({
                tableData: data
            })
        }).catch(err => {
            message.tip(err.msg || '查询失败!', 'warning')
        })
    }

    /**
     * 获取时间
     *
     */
    dataChange = (e) => {
        this.dispatch({
            range: e,
            begin: e[0],
            end: e[1]
        })
    }

    /**
     * 获取当前类型
     *
     */
    getCurrentState = (e) => {
        this.dispatch({
            state: e.target.value
        })
    }

    /**
     * 搜索按钮
     *
     */
    search = () => {
        let { startIndex, pageSize, begin, end, state } = this.getState()
        return ApiClassesExchange.selecClasses({ startIndex, pageSize }, '', state, begin, end).then((data) => {
            this.dispatch2({
                tableData: data
            })
        }).catch(err => {
            message.tip(err.msg || '查询失败!', 'warning')
        })
    }

    /**
     * 获取选中行
     *
     */
    getSelectRows = () => {
        let data = this.agApi.api.getSelectedRows()
        this.dispatch2({
            selectedData: data
        })
    }

    /**
     * 修改状态
     * 参数:n (3：同意；4：拒绝)
     */
    changeRow = (n, explain = '') => {
        let { selectedData } = this.getState()
        for (let i = 0, len = selectedData.length; i < len; i++) {
            selectedData[i].state = n
            selectedData[i].explain = explain
        }
        ApiClassesExchange.updateState(selectedData).then(() => {
            this.search()
        }).catch(err => {
            message.tip(err.msg || '更新失败!', 'warning')
        })

    }

    /**
     * 拒绝选中行
     *
     */
    refuse = () => {
        let value = this.getState().txtValue
        this.changeRow(4, value)
        this.dispatch({
            open: false
        })
    }

    /**
     * 获得拒绝理由
     *
     */
    getTxtValue = (e) => {
        this.dispatch({
            txtValue: e.target.value
        })
    }

    /**
     * 表格右键
     * 0：修改状态为同意，1：显示拒绝弹框
     */
    menuClick = (menuIndex) => {
        switch (menuIndex) {
            case 0:
                // 同意选中行
                this.changeRow(3)
                break
            default:
                this.dispatch({ open: true })
                break
        }
    }

    /**
     * 关闭弹窗
     */
    close = () => {
        this.dispatch({ open: false })
    }

}

export const approvedService = new ApprovedService('approved')