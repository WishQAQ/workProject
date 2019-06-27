import { Page, NurseExchangeClassesModelDtoClasses, NurseExchangeClassesEntityClasses, NurseGroupTitleDictEntityClasses, NurseGroupDictEntityClasses, NurseGroupVsClassesEntityClasses, NurseGroupDictModelDtoClasses, NurseGroupVsClassesModelDtoClasses, UserDictModelDtoDict, NurseGroupVsStaffEntityClasses, NurseSchedulingClassesDictEntityClasses, NurseSchedulingClassesDictModelDtoClasses, NurseSchedulingIndexEntityClasses, DeptDictDtoDict, NurseRecordConfigMaterEntityRecord, NurseRecordConfigDetailEntityRecord, PatMasterIndexModelDtoRecord, PatientStatusChgDictModelDtoRecord, NurseShiftChangePatientLogModelDtoShift, ShiftPatMasterInfoModelDtoShift, NurseShiftChangeMasterModelDtoShift, NurseShiftChangeMasterEntityShift, NurseShiftChangePatientLogEntityShift, NurseShiftChangeStatisticsModelDtoShift } from '../entity/nurse';
export interface ArrayData<T> extends Array<T> {
    total: number;
}
/**
 * 创建人:黄倩
 * 创建时间:2018/2/6
 * 说明调班记录表信息Controller
 */
export declare class ApiClassesExchange {
    private static baseUrl;
    /**
     * 调班记录查看
     *
     */
    static selecClasses(page?: Page, name?: string, state?: number, begin?: Date, end?: Date): Promise<ArrayData<NurseExchangeClassesModelDtoClasses>>;
    /**
     * 根据用户id查询调班申请记录
     *
     */
    static select(page?: Page, id?: number, state?: number, begin?: Date, end?: Date): Promise<ArrayData<NurseExchangeClassesModelDtoClasses>>;
    /**
     * 调班记录审核
     *
     */
    static updateState(exchangeClasses?: Array<NurseExchangeClassesModelDtoClasses>): Promise<any>;
    /**
     * 调班申请
     *
     */
    static save(exchangeClasses?: NurseExchangeClassesEntityClasses): Promise<any>;
    /**
     * 作废调班申请
     *
     */
    static delete(idList?: Array<NurseExchangeClassesModelDtoClasses>): Promise<any>;
}
/**
 * 分组维护
 * Created by 黄倩
 * on 2018/1/31
 */
export declare class ApiClassesGroupTitleDict {
    private static baseUrl;
    /**
     * 查询所有职称
     */
    static finAll(): Promise<ArrayData<NurseGroupTitleDictEntityClasses>>;
}
/**
 * 分组维护
 * Created by 黄倩
 * on 2018/1/31
 */
export declare class ApiClassesNurseGroupDict {
    private static baseUrl;
    /**
     * 新增/更新分组信息
     */
    static save(nurseGroupDict?: NurseGroupDictEntityClasses, nurseGroupVsClasses?: Array<NurseGroupVsClassesEntityClasses>): Promise<any>;
    /**
     * 作废分组信息
     */
    static delete(id?: number): Promise<any>;
    /**
     * 模糊查询分组信息
     */
    static finAll(nursingCode?: string, name?: string, page?: Page): Promise<ArrayData<NurseGroupDictModelDtoClasses>>;
    /**
     *  根据护理单元查班段信息和根据分组id查询允许使用班段信息
     */
    static finBygroupClasses(groupId?: number, nursingCode?: string): Promise<ArrayData<NurseGroupVsClassesModelDtoClasses>>;
    /**
     * 根据护理单元查询人员信息
     */
    static finByGroupVsStaff(nursingCode?: string, name?: string, groupId?: number): Promise<ArrayData<UserDictModelDtoDict>>;
    /**
     * 保存分组下的人员信息
     */
    static saveGroupVsStaff(groupVsStaffs?: Array<NurseGroupVsStaffEntityClasses>, groupId?: number): Promise<any>;
}
/**
 * 班段维护
 * Created by 黄倩
 * on 2018/1/30
 */
export declare class ApiClassesSchedulingDict {
    private static baseUrl;
    /**
     * 更新/新增班段信息
     */
    static save(classesDict?: NurseSchedulingClassesDictEntityClasses): Promise<any>;
    /**
     * 模糊查询班段信息
     */
    static finAll(name?: string, nursingCode?: string, type?: number, isTwo?: number, page?: Page): Promise<ArrayData<NurseSchedulingClassesDictModelDtoClasses>>;
    /**
     * 作废班段信息
     */
    static delete(idList?: Array<NurseSchedulingClassesDictModelDtoClasses>): Promise<any>;
    /**
     * 根据id删除班段信息
     */
    static deleteId(id?: number): Promise<any>;
    /**
     *  根据护理单元code查询班段信息
     */
    static finByWardCode(nursingCode?: string): Promise<ArrayData<NurseGroupVsClassesModelDtoClasses>>;
}
/**
 * 排班
 * Created by 黄倩
 * on 2018/1/30
 */
export declare class ApiClassesSchedulingIndex {
    private static baseUrl;
    /**
     *  排班查询
     */
    static finAll(currentTime?: string, nursingCode?: string): Promise<Map<string, any>>;
    /**
     *  排班打印
     */
    static finSheduling(parentId?: number, nursingCode?: string, currentTime?: string): Promise<Map<string, any>>;
    /**
     *   排班保存
     */
    static save(schedulingIndices?: Array<NurseSchedulingIndexEntityClasses>): Promise<any>;
}
/**
 * 护理单元
 * Created by 黄倩
 * on 2018/1/31
 */
export declare class ApiDictDictionaries {
    private static baseUrl;
    /**
     * 查询工作人员用户的工作范围
     */
    static finStaffVsGroup(): Promise<ArrayData<DeptDictDtoDict>>;
}
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 护理记录单配置表Controller
 */
export declare class ApiRecordNursing {
    private static baseUrl;
    /**
     * 新增护理记录单配置主表
     */
    static save(nuringRecordConfigMater?: NurseRecordConfigMaterEntityRecord): Promise<any>;
    /**
     * 查询所有科室
     */
    static findAllDeptDict(): Promise<ArrayData<DeptDictDtoDict>>;
    /**
     * 查询护理记录单主配置表
     */
    static findNurseRecordConfigMater(page?: Page, recordType?: number, type?: number, recordName?: string): Promise<ArrayData<NurseRecordConfigMaterEntityRecord>>;
    /**
     * 删除护理记录单主配置表(物理删除 is_delete字段修改成0)
     */
    static deleteNurseRecordConfigMater(ids?: string): Promise<any>;
}
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 护理记录单明细表Controller
 */
export declare class ApiRecordNursingDetail {
    private static baseUrl;
    /**
     * 新增和修改护理记录单明细表
     */
    static updateNursingRecordDetail(nurseRecordConfigDetail?: NurseRecordConfigDetailEntityRecord): Promise<any>;
    /**
     * 删除护理记录单明细表，IS_DELETE字段改为0
     */
    static deletegRecordDetail(ids?: string): Promise<any>;
    /**
     * 根据护理记录单主配置表id，查询所有护理记录单明细表
     */
    static findAllByNurseRecordConfigMaterId(page?: Page, id?: string): Promise<ArrayData<NurseRecordConfigDetailEntityRecord>>;
    /**
     * 根据护理记录单明细表id，查询对应的明细表
     */
    static findNurseRecordConfigDetailById(id?: string): Promise<NurseRecordConfigDetailEntityRecord>;
    /**
     * 查询患者护理记录中所有可用的col字段
     */
    static findCoLs(id?: string): Promise<ArrayData<string>>;
    /**
     * 查询护理记录单明细表中所有类型
     */
    static findAllType(): Promise<ArrayData<string>>;
}
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 患者护理记录Controller
 */
export declare class ApiRecordPatientCare {
    private static baseUrl;
    /**
     * 加载患者信息列表
     */
    static findPatMasterIndexModel(page?: Page, name?: string): Promise<ArrayData<PatMasterIndexModelDtoRecord>>;
}
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 病人状态变化字典（换页事件）Controller
 */
export declare class ApiRecordPatientStatusChg {
    private static baseUrl;
    /**
     * 查询所有换页事件
     */
    static findAll(): Promise<ArrayData<PatientStatusChgDictModelDtoRecord>>;
}
/**
 * 创建人:黄倩
 * 创建时间:2018/2/6
 * 说明调班记录表信息Controller
 */
export declare class ApiShiftChange {
    private static baseUrl;
    /**
     *  交接班字典信息
     */
    static shiftInfo(wardCode?: string, date?: string, begin?: Date, end?: Date): Promise<Map<string, any>>;
    /**
     * 根据条件查询交接班的信息
     */
    static finAllShiftInfo(time?: string, wardCode?: string, patientId?: string, visitId?: number, classesId?: number): Promise<Map<string, any>>;
    /**
     * 条件改变查询交接班患者信息界面的信息
     */
    static finShiftByInfo(wardCode?: string, date?: string, begin?: Date, end?: Date, classesOpt?: Array<NurseSchedulingClassesDictModelDtoClasses>): Promise<Map<string, any>>;
    /**
     * 条件改变查询患者的交详情见面信息
     */
    static finAllShift(wardCode?: string, date?: string, begin?: Date, end?: Date, classesOpt?: Array<NurseSchedulingClassesDictModelDtoClasses>): Promise<Map<string, any>>;
    /**
     *  条件改变查询患者交接信息界面
     */
    static finByshift(wardCode?: string, date?: string): Promise<ArrayData<NurseShiftChangePatientLogModelDtoShift>>;
    /**
     * 查询交接班患者信息
     */
    static newShift(opt?: number, deptCode?: string, begin?: Date, end?: Date, name?: string): Promise<Map<string, any>>;
    /**
     *  查询患者信息
     */
    static finShiftVsPatient(opt?: number, deptCode?: string, name?: string): Promise<ArrayData<ShiftPatMasterInfoModelDtoShift>>;
    /**
     *   查询患者交接班的详情信息
     */
    static finShiftByRecord(wardCode?: string, classesId?: number, patientId?: string, visitId?: number, radio?: number, time?: string): Promise<ArrayData<NurseShiftChangeMasterModelDtoShift>>;
    /**
     *  交接班信息保存/更新
     */
    static save(shiftChangeMaster?: NurseShiftChangeMasterEntityShift, patientLog?: Array<NurseShiftChangePatientLogEntityShift>, statistics?: Array<NurseShiftChangeStatisticsModelDtoShift>): Promise<any>;
    /**
     *  根据主表id查询患者交接信息
     */
    static finShiftByRecordInfo(shiftChangeId?: string, wardCode?: string, patientLogId?: number): Promise<Map<string, any>>;
    /**
     *  交班
     */
    static savaLastUpdateUser(mainId?: string): Promise<any>;
    /**
     *  接班
     */
    static takeShift(mainId?: string): Promise<any>;
    /**
     * 交接班打印
     */
    static shiftPrint(deptCode?: string, currentTime?: string): Promise<Map<string, any>>;
    /**
     *  修改患者交接班信息
     */
    static updatePatientLog(patient?: NurseShiftChangePatientLogEntityShift): Promise<any>;
}
