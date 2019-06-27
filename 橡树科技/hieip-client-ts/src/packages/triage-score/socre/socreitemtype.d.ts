import { CheckboxProps } from 'antd/lib/checkbox/Checkbox'

export interface RadioArr {
    name?: string
    value?: number
    checked?: boolean
}

export interface SoceList {
    name?: string
    type?: string
    selected?: any
    data?: Array<RadioArr>
}

/**
 * ScoeItmeType radio list
 * 评分 item 集合
 */
export interface ScoeItmeType extends CheckboxProps {
    data?: SoceList
    defaultvalue?: string
    index?: number
}

/**
 * 评分单个 list 集合
 */
export interface SoceListProps {
    title?: string
    data?: SoceList
    defaobj?: object
    onChange?: (e: any, type: string) => void
}

/**
 * 渲染对象页面
 */
export interface ScoreTremProps {
    data?: any
    other?: Ascor
    classNmae?: string
    onChange?: (e: any, type: string, Tp: string) => void
}

/** other */
export interface Ascor {
    name?: string               // name 字段
    title?: string,              // 该项标题
    subtitle?: string,           // 副标题
    explain?: string,            // 说明
    summary?: string,            // 结果前沿
    indexes?: number,            // 当前页面下标
    color?: string,              // 等级颜色
    radioK?: any,                // 记录历史评分  默认值
    socregcs?: any,       //
    socreothers?: any,        // 单个 item ping分
    totalScores?: number,        // 总分
    rule?: string,               // 等级
    danger?: string,             // 危险程度
    bol?: number,                // 是否点击,默认为0 既已点击 所有必点，
    valuation?: string          // 危险率
    grade?: (score: number) => object    // 返回结果 颜色
    rate?: (score: number) => string     // 返回危险率
    coreGSC?: (score: number) => number  // Gcs 得分
}

/**
 * 评分项
 * 评分的一个大对象
 */
export interface Aggregate {
    data?: any,       // 数据  Array<DataType>
    other?: Ascor,
    active?: number,
    onChange?: (obj: Ascor) => void
}

export interface DataType {
    name?: string
    type?: string
    data?: Array<Aggregate>
}

export interface Soceresult {
    color?: string
    rule?: string,
}