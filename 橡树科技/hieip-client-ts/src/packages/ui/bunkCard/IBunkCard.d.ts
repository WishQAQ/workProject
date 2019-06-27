/// <reference types="react" />
import { CardProps } from 'antd/lib/card'

interface BIBunkInfo {
    /** 病人姓名 */
    sickName?: string
    /** 病人性别 */
    sickGender?: string
    /** 病人分级 */
    sickClass?: number
    /** 病人类型 */
    sickType?: string
    /** 床位号 */
    bunkNumber?: string
    /** 床位图片类型 */
    bunkImg?: string
    /** 年龄 */
    sickAge?: string | number
    /** 过敏史 */
    allergy?: string
    /** 预交金 */
    imprest?: string | number
    /** 医生 */
    doctor?: string
    /** 诊断 */
    diagnose?: string
    /** 绿色通道 */
    greenChannel?: string
    /** 入科时间 */
    intoMedicalTime?: string
    /** 滞留时间 */
    retentionTime?: string
    /** 右键组 */
    menuData?: Array<string>
    /** 右键点击事件 */
    menuClick?: (v: number) => void
    /** 额外的 */
    pvId?: any
    name?: any
    sex?: any
    triageLevel?: any
    chargeType?: any
    bedLabel?: any
    bedUnit?: any
    age?: any
    individual?: any
    payment?: any
    doctorName?: any
    diagnosis?: any
    greenRoad?: any
    admWardDateTime?: any
    residenceTime?: any
}

export interface BunkCardProps extends CardProps {
    /** 床位信息 */
    bunkInfo: BIBunkInfo
}