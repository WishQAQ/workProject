export interface TranStae {
    /** 改变事件 */
    onChange?: (type: string, value?: any, e?: any) => void
    data?: any
    onMenuClick?: (type: string, value: any, e?: any) => void
    activeKey?: string
}