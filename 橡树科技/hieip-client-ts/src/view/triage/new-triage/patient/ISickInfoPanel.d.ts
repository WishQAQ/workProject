import React, { ComponentClass } from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/es/form/Form'

type gender = 'male' | 'female' | 'unknown';

type patientInfos = {
    /** 患者编号 */
    visitId?: string | number;
    /** 患者姓名 */
    name?: string;
    /** 患者性别 */
    sex?: gender;
    /** 费用 */
    charge?: string | number;
    /** 身份证号 */
    patientId?: string;
    /** 电话 */
    tellPhone?: string | number;
    /** 发病时间 */
    diseaseTime?: Date | string,
    /** 出生日期 */
    birthday?: Date | string,
    /** 身份职位 */
    identity?: string;
    /** 民族 */
    nation?: string;
    /** 联系人 */
    linkman?: string;
    /** 地址 */
    address?: string;
    /** 来院方式 */
    vehicle?: string;
    /** 绿色通道 */
    greenChannel?: string;
    /** 其他 */
    resets?: string;
    /** 是否传染病 */
    isContagion?: boolean;
    /** 过敏史 */
    allergy?: string;
    // style样式
    style?: React.CSSProperties
    // 类名
    className?: string;
}

export interface IFormItem extends GetFieldDecoratorOptions {
    name?: string;
    label?: string;
    elementName: ComponentClass<any>;
    elementProps: any,
    rules?: any[],

    [propName: string]: any;
}

interface ISickInfoProps extends FormComponentProps {
    className?: string;
    style?: React.CSSProperties,
    item?: Array<IFormItem>;
    patientInfos?: patientInfos

    [propName: string]: any;
}