const mockPantientData = {
    sickName: '小董', // 姓名
    sickGender: 'gril', // 性别
    sickClass: 3, // 分诊级别
    careLevel: '一级', // 护理等级
    sickType: '居民',
    bunkNumber: 'B01', // 床号
    bunkImg: 'icon-chuangwei', // 床位图
    sickAge: '18岁', // 年龄
    allergy: '无', // 过敏史
    imprest: '2000', // 预交金
    doctor: '某某页', // 医生
    diagnose: 'test test tes ', // 诊断
    greenChannel: 'test test test', // 绿色通道
    intoMedicalTime: '2017-11-24', // 入科时间
    retentionTime: '2小时30分钟', // 滞留时间
    sickGenderAndAge: '女,18岁',
    vitalSigns: true, // 生命特征
    doctorAdvice: false, // 医嘱
    radiate: false, // 放射
    examine: false, // 检验
    ecg: true, // 心电
    consutants: false, // 会诊
    shiftExChange: true // 交接班
}

const mockPantientList = []
for (let i = 0; i < 21; i++) {
    mockPantientList.push(mockPantientData)
}

export default mockPantientList
