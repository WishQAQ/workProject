export interface MaintainFileProps {
    /** 是否显示 */
    visible: boolean
    /** 选择事件 */
    radioGroupChange?: (type?: string, value?: any) => void
    /** 点击 */
    handSearch?: (type: string, value?: any) => void
    /** 表格 data */
    columeData?: any
    /** 表格 api */
    onGridReady?: (parm: any) => void
    /** 分页事件 */
    _onChangePag?: (value) => void
    /** 每页显示多少条 */
    pageSize?: number
    /** 总数 */
    total?: number
    /**  data */
    classList?: any
    /** 职称 */
    doctorList?: any
    classModel?: any
}
