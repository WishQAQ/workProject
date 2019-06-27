/* tslint:disable */
export interface AuthUser {
  id?: number
}

export interface BaseEntity {
  id?: any
}

export interface BaseModel {
  
}

export interface Page {
  startIndex?: number;
  pageSize?: number;
  orderSql?: string
}

export interface ChildrenEntity {
  id?: number;
  parentId?: number;
  children?: Array<ChildrenEntity>
}

/**
 * 排班的
 */
export interface DateModelDtoClasses extends BaseEntity {
  day?: string;
  time?: Date
}

export interface NurseExchangeClassesModelDtoClasses extends NurseExchangeClassesEntityClasses {
  applyUserName?: string;
  schedulingIndexName?: string;
  exchangeUserName?: string;
  auditorUserName?: string;
  stateName?: string
}

/**
 * 调班申请的实体类
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseExchangeClassesEntityClasses extends BaseEntity {
  applyUserId?: string;
  applyTime?: Date;
  schedulingIndexId?: number;
  exchangeUserId?: string;
  exchangeSchedulingIndexId?: number;
  reason?: string;
  wardCode?: string;
  state?: number;
  explain?: string;
  auditorUserId?: string;
  auditorTime?: Date
}

export interface NurseGroupDictModelDtoClasses extends NurseGroupDictEntityClasses {
  deptNme?: string;
  wardName?: string;
  classesId?: string;
  userName?: string;
  parentName?: string;
  userId?: number;
  staffCount?: number;
  person?: Array<NurseGroupVsStaffModelDtoClasses>;
  children?: Array<NurseGroupDictModelDtoClasses>
}

export interface NurseGroupVsStaffModelDtoClasses extends NurseGroupVsStaffEntityClasses {
  userName?: string;
  groupName?: string;
  timeCount?: number;
  schedulingIndex?: Array<NurseSchedulingIndexModelDtoClasses>
}

export interface NurseSchedulingIndexModelDtoClasses extends NurseSchedulingIndexEntityClasses {
  classesName?: string;
  date?: string;
  userName?: string
}

/**
 * 排班信息表
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseSchedulingIndexEntityClasses extends BaseEntity {
  wardCode?: string;
  time?: Date;
  userId?: string;
  schedulingClassesId?: number;
  timeFrom1?: string;
  timeTo1?: string;
  timeFrom2?: string;
  timeTo2?: string;
  isTwoTime?: number;
  createUserId?: number;
  createTime?: Date;
  sumTime?: number;
  nurseGroupId?: number;
  isDelete?: number
}

/**
 * 分组人员信息
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseGroupVsStaffEntityClasses extends BaseEntity {
  nurseGroupId?: number;
  userId?: string;
  title?: string
}

/**
 * 排班分组实体类
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseGroupDictEntityClasses extends BaseEntity {
  deptCode?: string;
  wardCode?: string;
  serialNo?: number;
  groupName?: string;
  groupNameAbbreviation?: string;
  jurisdictionBed?: string;
  groupCode?: string;
  groupInputCode?: string;
  groupInputCodeWb?: string;
  type?: number;
  parentId?: number
}

export interface NurseGroupVsClassesModelDtoClasses extends NurseGroupVsClassesEntityClasses {
  classesName?: string;
  person?: Array<NurseGroupVsStaffModelDtoClasses>
}

/**
 * 护理单元分组允许使用班段
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseGroupVsClassesEntityClasses extends BaseEntity {
  nurseGroupId?: number;
  schedulingClassesId?: number;
  serialNo?: number
}

export interface NurseSchedulingClassesDictModelDtoClasses extends NurseSchedulingClassesDictEntityClasses {
  deptName?: string;
  wardName?: string;
  dayOne?: string;
  dayTwo?: string;
  dayThree?: string;
  dayFour?: string;
  timeOne?: string;
  timeTwo?: string;
  timeThree?: string;
  timeFour?: string;
  nurseGroupId?: number;
  person?: Array<NurseGroupVsStaffModelDtoClasses>
}

/**
 * 排班班次字典表
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseSchedulingClassesDictEntityClasses extends BaseEntity {
  classesName?: string;
  classesCode?: string;
  type?: number;
  timeFrom1?: string;
  timeTo1?: string;
  isTwoTime?: number;
  timeFrom2?: string;
  timeTo2?: string;
  classesExplain?: string;
  isVacation?: number;
  isTransfer?: number;
  classesInputCode?: string;
  classesInputCodeWb?: string;
  occurrenceNumber?: number;
  sumTime?: string;
  isDelete?: number;
  wardCode?: string
}

export interface SchedulingInfoModelDtoClasses extends BaseEntity {
  userId?: string;
  timeCount?: string;
  userName?: string;
  title?: number;
  groupId?: number;
  groupName?: string;
  schedulingIndex?: Array<NurseSchedulingIndexModelDtoClasses>
}

/**
 * 护理单元
 * 创建人：黄倩
 * 创建人：2018/1/31
 */
export interface DeptDictDtoDict extends BaseEntity {
  serialNo?: number;
  deptCode?: string;
  deptName?: string;
  deptAlias?: string;
  clinicAttr?: number;
  outpOrInp?: number;
  internalOrSergery?: number;
  inputCode?: string;
  position?: string;
  sign?: string;
  inputCodeWb?: string;
  dispensingCumulate?: number;
  virtualCabinet?: number;
  orderCode?: number;
  updateTime?: Date;
  hospitalCode?: string;
  hspCode?: string
}

export interface UserDictModelDtoDict extends UserDictelEntitySystem {
  isOpt?: number;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 职称id
   */
  position?: number;
  nurseGroupId?: number;
  userId?: string
}

export interface UserDictelEntitySystem extends BaseEntity {
  userName?: string;
  userDept?: string;
  createDate?: Date;
  userPwd?: string;
  inputCode?: string;
  userLoginName?: string;
  lockedTime?: Date;
  accountStatus?: number;
  loginAttemptsCount?: number;
  startDate?: Date;
  stopDate?: Date;
  secretLevel?: number;
  hospitalNo?: string;
  educationFlag?: number;
  title?: string;
  pym?: string;
  wbm?: string;
  userType?: number;
  isRounds?: number;
  parentUserid?: string;
  superUserid?: string;
  sex?: number;
  empNo?: string
}

/**
 * 创建人:徐庆
 * 创建时间:2018/3/8
 * 病人状态变化字典（换页事件）实体类
 */
export interface PatientStatusChgDictModelDtoRecord extends BaseEntity {
  serialNo?: number;
  patientStatusChgCode?: string;
  patientStatusChgName?: string;
  inputCode?: string;
  memo?: string
}

export interface PatMasterIndexModelDtoRecord extends BaseEntity {
  name?: string;
  bedNo?: number;
  wardCode?: string;
  patientId?: string;
  inpNo?: string;
  dateOfBirth?: Date;
  attendingDoctor?: string;
  nurseInCharge?: string
}

export interface ColumnsTitleModelDtoShift extends BaseEntity {
  headerName?: string;
  field?: string;
  editable?: boolean;
  cellEditorFramework?: string;
  cellEditorParams?: string
}

export interface GroupVsPatientModelDtoShift extends BaseEntity {
  groupName?: string;
  groupId?: number;
  hasChild?: boolean;
  counts?: number;
  staff?: Array<NurseGroupVsStaffModelDtoClasses>;
  patient?: Array<NurseShiftChangePatientLogModelDtoShift>;
  item?: Array<ItemCommonalityDtoShift>;
  groupChild?: Array<GroupVsPatientModelDtoShift>
}

export interface NurseShiftChangePatientLogModelDtoShift extends NurseShiftChangePatientLogEntityShift {
  patientStatusName?: string;
  name?: string;
  classesName?: string;
  schedulingClassesId?: number;
  children?: Array<NurseShiftChangePatientLogModelDtoShift>
}

/**
 * 患者病情信息
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseShiftChangePatientLogEntityShift extends BaseEntity {
  shiftChangeId?: string;
  deptId?: string;
  wardCode?: string;
  bedLabel?: string;
  nursingClass?: string;
  nurseInCharge?: string;
  doctorInCharge?: string;
  patientStatus?: string;
  transferContent?: string;
  diagnosis?: string;
  signCollectionTime?: Date;
  temperature?: number;
  pulse?: number;
  breathing?: number;
  appearLiquid?: number;
  enterLiquid?: number;
  createTime?: Date;
  createUserId?: string;
  lastUpdateTime?: Date;
  lastUpdateUserId?: string;
  isDel?: number;
  patientId?: string;
  visitId?: number;
  classesId?: number;
  successorId?: string;
  shiftTime?: Date;
  takeId?: string;
  takeTime?: Date
}

/**
 * 手术/检查/检验查询的实体类
 */
export interface ItemCommonalityDtoShift extends BaseEntity {
  mark?: string;
  bedNo?: string;
  name?: string;
  /**
   * 时间
   */
  time?: string;
  item?: string
}

export interface NurseShiftChangeMasterModelDtoShift extends NurseShiftChangeMasterEntityShift {
  userName?: string;
  classesName?: string;
  createUserName?: string;
  status?: string;
  patientLog?: number
}

/**
 * 交接班主表信息
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseShiftChangeMasterEntityShift extends BaseEntity {
  wardCode?: string;
  classesId?: number;
  createTime?: Date;
  createUserId?: string;
  classesTimeFrom?: string;
  classesTimeTo?: string;
  remarks?: string;
  lastUpdateUserId?: string;
  lastUpdateTime?: Date;
  shiftTime?: Date
}

export interface NurseShiftChangeStatisticsModelDtoShift extends NurseShiftChangeStatisticsEntityShift {
  itemCode?: string
}

/**
 * 交接班统计数据
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseShiftChangeStatisticsEntityShift extends BaseEntity {
  wardCode?: string;
  statisticsId?: number;
  value?: string;
  shiftChangeId?: string
}

export interface NurseStatisticsItemDictModelDtoShift extends NurseStatisticsItemDictEntityShift {
  counts?: number
}

/**
 * 统计字典表
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseStatisticsItemDictEntityShift extends BaseEntity {
  itemCode?: string;
  itemName?: string;
  itemDescription?: string;
  statisticsSql?: string;
  serialNo?: number;
  classesId?: number
}

export interface ShiftGroupDictModelDtoShift extends NurseGroupDictEntityClasses {
  groupVsStaffs?: Array<NurseGroupVsStaffModelDtoClasses>;
  patientLog?: Array<NurseShiftChangePatientLogModelDtoShift>;
  itemCommonalities?: Array<ItemCommonalityDtoShift>
}

export interface ShiftOfParticularsModelDtoShift extends BaseEntity {
  classesId?: number;
  classesName?: string;
  hasChild?: boolean;
  groupChild?: Array<GroupVsPatientModelDtoShift>
}

export interface ShiftPatMasterInfoModelDtoShift extends NurseShiftChangePatientLogEntityShift {
  name?: string;
  age?: string;
  deptName?: string;
  patientConditionName?: string;
  nursingClassName?: string;
  sex?: string;
  chargeType?: string;
  counts?: number;
  chargeTypeName?: string;
  doctorInChargeName?: string;
  dutyNurseName?: string;
  insuranceNo?: string;
  wardName?: string;
  action?: string;
  actionName?: string;
  patientId?: string;
  visitId?: number
}

export interface ShiftPrintDataModelDtoShift extends BaseEntity {
  patientId?: string;
  visitId?: number;
  name?: string;
  diagnosis?: string;
  bedNo?: string;
  shiftChangePatient?: Array<NurseShiftChangePatientLogModelDtoShift>
}

export interface ShiftPrintTitleModelDtoShift extends NurseSchedulingClassesDictModelDtoClasses {
  statistics?: Array<NurseStatisticsItemDictModelDtoShift>
}

/**
 * 分组人员职称字典表
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseGroupTitleDictEntityClasses extends BaseEntity {
  itemName?: string;
  itemCode?: string;
  itemInputCode?: string;
  itemInputCodeWb?: string
}

/**
 * 参数配制字典表
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseAppGrantDictEntityDict extends BaseEntity {
  /**
   *  程序名
   */
  application?: string;
  /**
   *  编码
   */
  code?: string;
  /**
   * 权限名
   */
  name?: string;
  /**
   * 描述
   */
  grantDesc?: string;
  /**
   * 权限值类型,0:自定义(说明:任意类型的值)
   * 1:指定值(说明:这里的指定值,只能是0或1,0:false,1:true)
   */
  valueType?: number;
  /**
   *  默认权限值
   */
  defaultValue?: string;
  /**
   *  输入码
   */
  inputCode?: string;
  /**
   * 五笔码
   */
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 参数配制字典表
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseAppGrantsEntityDict extends BaseEntity {
  grantName?: string;
  flag?: number;
  userName?: number;
  valueType?: number;
  grantValue?: string;
  isDel?: number
}

/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 患者护理记录的实体类
 */
export interface NurseRecodePatientMasterEntityRecord extends BaseEntity {
  deptCode?: string;
  configMasterId?: number;
  createTime?: string;
  createStaffId?: string;
  patientId?: string;
  visitId?: string;
  wardCode?: string;
  col1?: string;
  col2?: string;
  col3?: string;
  col4?: string;
  col5?: string;
  col6?: string;
  col7?: string;
  col8?: string;
  col9?: string;
  col10?: string;
  col11?: string;
  col12?: string;
  col13?: string;
  col14?: string;
  col15?: string;
  col16?: string;
  col17?: string;
  col18?: string;
  col19?: string;
  col20?: string;
  col21?: string;
  col22?: string;
  col23?: string;
  col24?: string;
  col25?: string;
  col26?: string;
  col27?: string;
  col28?: string;
  col29?: string;
  col30?: string;
  col31?: string;
  col32?: string;
  col33?: string;
  col34?: string;
  col35?: string;
  col36?: string;
  col37?: string;
  col38?: string;
  col39?: string;
  col40?: string;
  col41?: string;
  col42?: string;
  col43?: string;
  col44?: string;
  col45?: string;
  col46?: string;
  col47?: string;
  col48?: string;
  col49?: string;
  col50?: string
}

/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 护理记录单配置明细表的实体类
 */
export interface NurseRecordConfigDetailEntityRecord extends BaseEntity {
  parentColumnId?: number;
  columnName?: string;
  columnWidth?: number;
  columnTitle?: string;
  columnType?: string;
  serialNo?: number;
  bdDeId?: string;
  fixedValueId?: number;
  isDelete?: string;
  patientColumnName?: string;
  configMasterId?: number;
  unit?: string
}

/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 护理记录单配置主表的实体类
 */
export interface NurseRecordConfigMaterEntityRecord extends BaseEntity {
  recordName?: string;
  recordType?: number;
  wardCode?: string;
  type?: number;
  pageLineNumber?: number;
  changePageEventId?: string;
  printTemplateContent?: string;
  isDelete?: number;
  description?: string;
  lastUpdateTime?: number;
  isSign?: number
}

/**
 * 患者病情信息
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseShiftChangeMasterLogEntityShift extends BaseEntity {
  transferContent?: string;
  lastUpdateTime?: Date;
  lastUpdateUserId?: string;
  patientLogId?: number
}

/**
 * 交接班统计数据
 * 创建人：黄倩
 * 创建人：2018/1/30
 */
export interface NurseStatisticsConfigEntityShift extends BaseEntity {
  wardCode?: string;
  statisticsItemId?: string;
  serialNo?: string
}
