type GenderType = 'male' | 'female' | 'unKnown';

export interface IPatientListProps {
    patientData?: Array<IPatientDetails>,
    isTableStyle?: boolean;
    onTransferPatient?: (current: IPatientDetails, target: IPatientDetails) => any;

    [propName: string]: any
}

export interface IPatientListState {
    [propName: string]: any
}

export interface IPatientDetails {
    // 患者姓名
    sickName: string;
    // 患者年龄
    sickAge: number;
    // 患者性别
    sickGender: GenderType;
    // 分诊级别
    sickClass: number | string;
    // 护理等级
    careClass: string | number;
    //
    sickType;
    string;
    // 床位号
    bunkType: string;
    // 床位图
    bunkImg: string,
    // 过敏史
    allergy: string;
    // 预交金
    imprest: string | number;
    // 医生
    doctor: string;
    // 诊断
    diagnose?: string;
    // 绿色通道
    greenChannel?: string;
    // 入科时间
    intoMedicalTime?: Date | string;
    // 滞留时间
    retentionTime?: Date | string;
    // 姓名/年龄
    sickGenderAndAge?: string;
    // 生命特征
    vitalSigns?: boolean;
    // 医嘱
    doctorAdvice?: boolean;
    // 放射
    radiate?: boolean;
    // 心电
    ecg?: boolean;
    // 会诊
    consutants?: boolean;
    // 交接班
}