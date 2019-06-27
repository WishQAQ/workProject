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

export interface ExchangeClassesModelDtoClasses extends ExchangeClassesEntityClasses {
  applyUserName?: string;
  schedulingIndexName?: string;
  exchangeUserName?: string;
  auditorUserName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:调班记录表
 */
export interface ExchangeClassesEntityClasses extends BaseEntity {
  applyUserId?: number;
  applyTime?: Date;
  schedulingIndexId?: string;
  exchangeUserId?: number;
  exchangeSchedulingIndexId?: string;
  reason?: string;
  wardCode?: string;
  state?: number;
  explain?: string;
  auditorUserId?: number;
  auditorTime?: Date
}

export interface NurseGroupDictModelDtoClasses extends NurseGroupDictEntityClasses {
  classesName?: string;
  classesId?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/28
 * 说明:排班分组字典表
 */
export interface NurseGroupDictEntityClasses extends BaseEntity {
  deptId?: string;
  wardId?: string;
  serialNo?: string;
  groupName?: string;
  groupNameAbbreviation?: string;
  jurisdictionBed?: string;
  groupCode?: string;
  groupInputCode?: string;
  groupInputCodeWb?: string;
  type?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:护理单元分组允许使用班段字典表的添加字段Model
 */
export interface NurseGroupVsClassesModelDtoClasses extends NurseGroupVsClassesEntityClasses {
  schedulingClassesName?: string;
  nurseGroupName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:护理单元分组允许使用班段字典表
 */
export interface NurseGroupVsClassesEntityClasses extends BaseEntity {
  nurseGroupId?: string;
  schedulingClassesId?: string;
  serialNo?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/29
 * 说明:分组人员信息Model
 */
export interface NurseGroupVsStaffModelDtoClasses extends NurseGroupVsStaffEntityClasses {
  userName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:分组人员信息字典表
 */
export interface NurseGroupVsStaffEntityClasses extends BaseEntity {
  nurseGroupId?: string;
  userId?: string;
  title?: string
}

export interface SchedulingClassesDictModelDtoClasses extends SchedulingClassesDictEntityClasses {
  areaName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:排班班段字典表
 */
export interface SchedulingClassesDictEntityClasses extends BaseEntity {
  classesName?: string;
  classesCode?: string;
  type?: number;
  timeFrom2?: string;
  timeTo2?: string;
  isTwoTime?: number;
  timeFrom1?: string;
  timeTo1?: string;
  classesExplain?: string;
  isVacation?: number;
  isTransfer?: number;
  classesInputCode?: string;
  classesInputCodeWb?: string;
  occurrenceNumber?: number;
  sumTime?: string;
  areaId?: AreaDictEntityPatManageTransferDict;
  intervalDays1?: number;
  intervalDays2?: number;
  isDel?: number
}

/**
 * 急诊区域字典表
 * Created by 包国强 on 2017/8/25.
 */
export interface AreaDictEntityPatManageTransferDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

export interface SchedulingIndexModelDtoClasses extends SchedulingIndexEntityClasses {
  userName?: string;
  wardName?: string;
  schedulingClassesName?: string;
  createUserName?: string;
  nurseGroupName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:排班主记录
 */
export interface SchedulingIndexEntityClasses extends BaseEntity {
  wardCode?: string;
  time?: Date;
  userId?: number;
  schedulingClassesId?: string;
  timeFrom1?: string;
  timeTo1?: string;
  timeFrom2?: string;
  timeTo2?: string;
  isTwoTime?: number;
  createUserId?: number;
  createTime?: Date;
  sumTime?: number;
  nurseGroupId?: string;
  isDelete?: number
}

/**
 *   table 的titlemodel
 *   黄倩
 */
export interface InputDictModelDtoDict extends InputDictEntityDict {
  title?: string;
  field?: string;
  width?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/19
 * 说明:模糊查询控件service
 */
export interface InputDictEntityDict extends BaseEntity {
  dictName?: string;
  tableName?: string;
  colShowName?: string;
  colName?: string;
  flagShow?: number;
  showWidth?: number;
  showSerialNo?: number;
  isLike?: number;
  isDel?: number;
  dictCode?: string
}

export interface TableDictModelDtoDict extends BaseEntity {
  columnName?: string;
  valuess?: boolean
}

export interface InfoModeDtoInfoPush extends BaseEntity {
  pvId?: number;
  patientId?: string;
  visitId?: number;
  bedLabel?: string;
  url?: string;
  deptCode?: string;
  deptName?: string;
  operator?: number;
  time?: string;
  areaId?: number;
  name?: string;
  area?: string;
  role?: string
}

export interface ModelDtoInfoPush extends BaseEntity {
  format?: string;
  date?: any
}

/**
 * 内容摘要 ：会话对象
 * 创建人　 ：陈佳慧
 * 创建日期 ：2017/4/12
 */
export interface LoginSessionDto {
  user?: UserEntityUser;
  token?: string;
  roleList?: Array<RoleDictEntityUser>;
  /**
   * 菜单权限点json
   */
  menuAndPointJson?: StaffAuthConfigEntitySystem;
  /**
   * 医院信息
   */
  hospitalConfig?: HospitalConfigEntitySystem
}

/**
 * 内容摘要 ：用户实体类
 * 创建人　 ：陈佳慧
 * 创建日期 ：2017/4/11
 */
export interface UserEntityUser extends BaseEntity {
  empNo?: string;
  deptCode?: string;
  name?: string;
  inputCode?: string;
  job?: string;
  title?: string;
  userName?: string;
  inputCodeWb?: string;
  createDate?: Date;
  password?: string;
  sysFlag?: number;
  doctorRank?: number;
  accessList?: string;
  status?: number;
  usePresc?: string;
  oakPwd?: string;
  oakFlag?: string;
  operationLevel?: string;
  drugLevel?: string;
  nurseLevel?: string;
  token?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 内容摘要 ：用户角色
 * 创建人　 ：陈佳慧
 * 创建日期 ：2017/4/12
 */
export interface RoleDictEntityUser extends BaseEntity {
  inputCode?: string;
  text?: string;
  name?: string;
  grade?: string;
  /**
   * 是否是默认角色
   */
  isDefault?: number
}

export interface StaffAuthConfigEntitySystem extends BaseEntity {
  staffId?: string;
  value?: string;
  roleId?: string;
  defaultMenu?: string
}

export interface HospitalConfigEntitySystem extends BaseEntity {
  hospital?: string;
  authorizedKey?: string;
  unitCode?: string;
  location?: string;
  mailingAddress?: string;
  zipCode?: string;
  approvedBedNum?: string;
  verifyKey?: string;
  organizationCode?: string;
  hospitalCode?: string;
  authorizedCode?: string;
  decHos?: string;
  decDate?: string;
  hospitalNumber?: string;
  hospitalIp?: string;
  hospital12320?: string;
  isDel?: string
}

export interface PatientCountsModelDtoPatientInfo extends BaseEntity {
  doctor?: string;
  mine?: string;
  total?: string;
  level1?: string;
  level2?: string;
  level3?: string;
  level4?: string;
  green?: string;
  yello?: string;
  red?: string
}

export interface PatientAllergyHistoryModelDtoPatManageAllergy extends PatientAllergyHistoryEntityPatManageAllergy {
  name?: string;
  areaName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/13
 * 说明:患者过敏史
 */
export interface PatientAllergyHistoryEntityPatManageAllergy extends BaseEntity {
  recorderName?: string;
  areaName?: string;
  pvId?: number;
  tId?: number;
  allergyMedicineName?: string;
  allergyMedicineCode?: string;
  description?: string;
  recordTime?: Date;
  recorder?: number;
  serialNo?: number;
  areaId?: number;
  isDel?: number
}

export interface MhGroupInjuryModelDtoSplit extends MhGroupInjuryEntitySplit {
  injuryTypeName?: string
}

/**
 * 分诊-群伤事件
 * Created by 毛琪 on 2017/5/3.
 */
export interface MhGroupInjuryEntitySplit extends BaseEntity {
  injuryNum?: number;
  title?: string;
  injuryTypeId?: number;
  memo?: string;
  happenDate?: Date;
  recordDate?: Date;
  operater?: UserEntityUser;
  isDel?: number
}

export interface DeptDictModelDtoUser extends DeptDictEntityUser {
  counts?: number
}

/**
 * 急诊科室字典
 * Created by 包国强 on 2017/7/4.
 */
export interface DeptDictEntityUser extends BaseEntity {
  serialNo?: number;
  deptCode?: string;
  deptName?: string;
  deptAlias?: string;
  clinicAttr?: number;
  outpOrInp?: number;
  internalOrSergery?: number;
  inputCode?: string;
  position?: string;
  inputCodeWb?: string;
  dispensingCumulate?: number;
  virtualCabinet?: number;
  orderCode?: number;
  updateTime?: Date;
  hspCode?: string;
  sign?: string;
  clinicName?: string;
  inpName?: string;
  sergeryName?: string
}

export interface UserModelDtoUser extends UserEntityUser {
  counts?: number
}

/**
 * 程序权限点(科室)
 * Created by 包国强 on 2017/9/5.
 */
export interface AppDeptGrantsEntityApp extends BaseEntity {
  code?: string;
  name?: string;
  deptCode?: DeptDictEntityUser
}

/**
 * 程序权限点
 * Created by 包国强 on 2017/9/5.
 */
export interface AppGrantsEntityApp extends BaseEntity {
  code?: string;
  name?: string;
  value?: string
}

/**
 * 程序权限点(角色)
 * Created by 包国强 on 2017/9/5.
 */
export interface AppRoleGrantsEntityApp extends BaseEntity {
  code?: string;
  name?: string;
  roleId?: RoleEntityUser
}

/**
 * 程序权限点(角色)
 * Created by 包国强 on 2017/9/5.
 */
export interface RoleEntityUser extends BaseEntity {
  inputCode?: string;
  text?: string;
  name?: string;
  grade?: number;
  isDel?: number
}

/**
 * 程序权限点(员工)
 * Created by 包国强 on 2017/9/5.
 */
export interface AppStaffGrantsEntityApp extends BaseEntity {
  code?: string;
  name?: string;
  staffId?: UserEntityUser;
  isDel?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:职位信息字典表
 */
export interface NurseGroupTitleDictEntityClasses extends BaseEntity {
  itemName?: string;
  itemCode?: string;
  itemInputCode?: string;
  itemInputCodeWb?: string
}

/**
 * 公共字典实体类
 * Created by 黄倩 on 2017/5/4.
 */
export interface DataDictEntityDict extends BaseEntity {
  key?: string;
  value?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 创建人:bgq
 * 创建时间:2018.1.20
 * 说明:模糊查询控件service
 */
export interface SelectInputParamsEntityDict extends BaseEntity {
  colName?: string;
  colNameJava?: string;
  isMust?: number;
  dictCode?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 公共字典实体类
 * Created by bgq on 2017/10/16.
 */
export interface TreeModelEntityDict extends BaseEntity {
  label?: string;
  value?: string;
  parentId?: number;
  children?: any
}

/**
 * Created by 黄倩 on 2017/8/4.
 * 药品药房明细配置表
 */
export interface DrugStorageConfigEntityDrugConfig extends BaseEntity {
  station?: string;
  configType?: string;
  storageCode?: string;
  serialNo?: number;
  chineseorwestern?: number;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number;
  /**
   * private String deptCode
   * 
   */
  drugId?: number;
  /**
   * 区域id
   */
  areaId?: string;
  name?: string;
  storageName?: string
}

/**
 * Created by  黄倩 on 2017/8/4.
 * 药房字典表
 */
export interface DrugStorageDictEntityDrugConfig extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * Created by 黄倩 on 2017/8/4.
 * 药品药房配置的主表
 */
export interface DrugStorageMasterEntityDrugConfig extends BaseEntity {
  serialNo?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number;
  creator?: number;
  deptCode?: string
}

/**
 * Created by 黄倩 on 2017/8/4.
 * 医生手术备注,以及医嘱说明字典表
 */
export interface ExplainDoctorDictEntityExplain extends BaseEntity {
  value?: string;
  creator?: number;
  deptCode?: string;
  createTime?: Date;
  type?: number;
  inputCode?: string;
  permission?: number;
  inputCodeWb?: string;
  isDel?: number;
  title?: string
}

/**
 * his诊断记录
 * Created by 包国强 on 2017/8/30.
 */
export interface DiagnosisEntityHis extends BaseEntity {
  patientId?: string;
  visitId?: number;
  diagnosisType?: string;
  diagnosisNo?: number;
  diagnosisDesc?: string;
  diagnosisCode?: string;
  diagnosisDate?: Date
}

/**
 * his住院登记
 * Created by 包国强 on 2017/8/30.
 */
export interface InHisEntityHis extends BaseEntity {
  patMasterIndex?: PatMasterIndexEntityHis;
  patVisit?: PatVisitEntityHis;
  patsInHospital?: PatsInHospitalEntityHis;
  patsInTransferring?: PatsInTransferringEntityHis;
  diagnosis?: DiagnosisEntityHis
}

/**
 * his病人主索引
 * Created by 包国强 on 2017/8/30.
 */
export interface PatMasterIndexEntityHis extends BaseEntity {
  patientId?: string;
  inpNo?: string;
  name?: string;
  namePhonetic?: string;
  sex?: string;
  dateOfBirth?: Date;
  citizenship?: string;
  nation?: string;
  idNo?: string;
  birthPlace?: string;
  mailingAddress?: string;
  chargeType?: string;
  identity?: string;
  unitInContract?: string;
  nextOfKin?: string;
  relationship?: string;
  nextOfKinPhone?: string;
  nextOfKinAddr?: string;
  patientClass?: string;
  operator?: string
}

/**
 * his病人住院主记录
 * Created by 包国强 on 2017/8/30.
 */
export interface PatVisitEntityHis extends BaseEntity {
  patientId?: string;
  visitId?: number;
  insuranceNo?: string;
  insuranceType?: string;
  maritalStatus?: string;
  mailingAddress?: string;
  chargeType?: string;
  identity?: string;
  occupation?: string;
  serviceAgency?: string;
  unitInContract?: string;
  insuranceAera?: string;
  nextOfKin?: string;
  relationship?: string;
  nextOfKinPhone?: string;
  nextOfKinAddr?: string;
  admissionDateTime?: Date;
  consultingDate?: Date;
  admissionCause?: string;
  patAdmCondition?: string;
  patientClass?: string;
  deptAdmissionTo?: string;
  consultingDoctor?: string;
  admittedBy?: string;
  deptDischargeFrom?: string;
  workingStatus?: number
}

/**
 * his在院病人记录
 * Created by 包国强 on 2017/8/30.
 */
export interface PatsInHospitalEntityHis extends BaseEntity {
  patientId?: string;
  visitId?: number;
  wardCode?: string;
  deptCode?: string;
  admissionDateTime?: Date;
  diagnosis?: string;
  patientCondition?: string;
  guarantor?: string;
  guarantorOrg?: string;
  guarantorPhoneNum?: string;
  prepayments?: number;
  totalCosts?: number;
  totalCharges?: number;
  settledIndicator?: number
}

/**
 * his转科病人记录
 * Created by 包国强 on 2017/8/30.
 */
export interface PatsInTransferringEntityHis extends BaseEntity {
  patientId?: string;
  deptTransferedFrom?: string;
  deptTransferedTo?: string;
  transferDateTime?: Date
}

export interface MessageDictEntityInfoPush extends BaseEntity {
  type?: string;
  url?: string;
  status?: number;
  appId?: string;
  postUrl?: string
}

/**
 * Created by 黄倩 on 2017/8/30.
 */
export interface MrFileIndexEntityMedical extends BaseEntity {
  patientId?: string;
  visitId?: number;
  fileNo?: number;
  fileName?: string;
  topic?: string;
  creatorId?: string;
  creatorName?: string;
  createDateTime?: Date;
  lastModifyDateTime?: Date;
  fileModifyDateTime?: Date;
  flag?: string;
  fileAttr?: string;
  printFlag?: string;
  mrCode?: string;
  parentName?: string;
  parentId?: string;
  fileFlag?: string;
  moodifyDateTime?: Date;
  eprIndec?: string;
  oakMrCode?: string;
  visitDate?: string;
  isDel?: number;
  pvId?: number
}

/**
 * Created by 随便写 on 2017/8/30.
 */
export interface MrTypeDictEntityMedical extends BaseEntity {
  code?: string;
  name?: string;
  mrClass?: number;
  jobClass?: string;
  serialNo?: number;
  ownersection?: string;
  deptName?: string;
  createtime?: Date;
  creator?: string;
  creatorName?: string;
  themeClass?: string;
  pcode?: string;
  deptCode?: string;
  parentId?: string
}

/**
 * 检查主表
 * Created by 毛琪 on 2017/5/12.
 */
export interface ExamAppointsEntityOutpExam extends BaseEntity {
  memos?: string;
  testCause?: string;
  degree?: string;
  state?: string;
  leval?: string;
  priorityIndicator?: number;
  pacsIndicator?: string;
  hisFlag?: string;
  billingIndicator?: number;
  workedIndicator?: number;
  doctorUser?: string;
  charges?: number;
  costs?: number;
  notice?: string;
  scheduledDate?: Date;
  reqMemo?: string;
  reqPhysician?: string;
  reqDept?: string;
  reqDateTime?: Date;
  facility?: string;
  patientSource?: string;
  performedBy?: string;
  examGroup?: string;
  examMode?: string;
  clinDiag?: string;
  relevantDiag?: string;
  relevantLabTest?: string;
  physSign?: string;
  clinSymp?: string;
  examSubClass?: string;
  examClass?: string;
  phoneNumber?: string;
  zipCode?: string;
  mailingAddress?: string;
  chargeType?: string;
  identity?: string;
  birthPlace?: string;
  dateOfBirth?: Date;
  sex?: string;
  namePhonetic?: string;
  name?: string;
  patientLocalId?: string;
  localIdClass?: string;
  visitId?: number;
  patientId?: string;
  examNo?: string;
  bedSide?: string;
  visitNo?: number;
  visitDate?: Date;
  revokeReason?: string;
  examReason?: string;
  device?: string;
  urgencyFlag?: string;
  concernPathogens?: string
}

/**
 * 检查子表
 * Created by 毛琪 on 2017/5/12.
 */
export interface ExamItemsEntityOutpExam extends BaseEntity {
  notice?: string;
  billingIndicator?: number;
  costs?: number;
  examItemCode?: string;
  examItem?: string;
  examItemNo?: number;
  examNo?: string
}

/**
 * Created by Vinsher on 2017/5/12.
 */
export interface TestEntityOutpLab extends BaseEntity {
  testNo?: string;
  testCause?: string;
  specimen?: string;
  requestedDateTime?: Date;
  orderingProvider?: string;
  resultStatus?: string;
  billingIndicator?: number;
  resultsRptDateTime?: Date;
  transcriptionist?: string;
  orderingDept?: string;
  itemNo?: number;
  itemName?: string
}

/**
 * Created by Vinsher on 2017/5/12.
 */
export interface TestItemEntityOutpLab extends BaseEntity {
  testNo?: string;
  itemNo?: number;
  itemName?: string;
  itemCode?: string;
  billingIndicator?: number;
  testBy?: string
}

/**
 * Created by Vinsher on 2017/5/12.
 */
export interface TestMasterEntityOutpLab extends BaseEntity {
  testNo?: string;
  priorityIndicator?: number;
  patientId?: string;
  visitId?: number;
  workingId?: string;
  executeDate?: Date;
  name?: string;
  namePhonetic?: string;
  chargeType?: string;
  sex?: string;
  age?: number;
  testCause?: string;
  relevantClinicDiag?: string;
  specimen?: string;
  notesForSpcm?: string;
  spcmReceivedDateTime?: Date;
  spcmSampleDateTime?: Date;
  requestedDateTime?: Date;
  orderingDept?: string;
  orderingProvider?: string;
  performedBy?: string;
  resultStatus?: string;
  resultsRptDateTime?: Date;
  transcriptionist?: string;
  verifiedBy?: string;
  costs?: number;
  charges?: number;
  billingIndicator?: number;
  printIndicator?: number;
  subject?: string;
  status?: number;
  containerCarrier?: string;
  requisition?: number;
  operId?: string;
  reporttime?: Date;
  spmemo?: string;
  spdate?: Date;
  spwindow?: string;
  spdoctor?: string;
  spdept?: string;
  bedLabel?: string;
  updataIndicator?: string
}

/**
 * 门诊挂号用户实体
 * Created by 毛琪 on 2017/5/11.
 */
export interface ClinicMasterEntityOutpMedrec extends BaseEntity {
  gwybz?: number;
  delpje?: number;
  qfxgwyfh?: number;
  hospitalPay?: number;
  realSort?: string;
  clinicNo?: string;
  invoiceNo?: string;
  mrProvidedIndicator?: number;
  payWay?: string;
  acctNo?: string;
  acctDateTime?: Date;
  cardNo?: string;
  cardName?: string;
  modeCode?: string;
  returnedOperator?: string;
  returnedDate?: Date;
  operator?: string;
  clinicCharge?: number;
  otherFee?: number;
  clinicFee?: number;
  registFee?: number;
  symptom?: string;
  registeringDate?: Date;
  registrationStatus?: number;
  mrProvideIndicator?: number;
  doctor?: string;
  visitSpecialClinic?: string;
  visitDept?: string;
  firstVisitIndicator?: number;
  clinicType?: string;
  unitInContract?: string;
  insuranceNo?: string;
  insuranceType?: string;
  chargeType?: string;
  identity?: string;
  age?: number;
  sex?: string;
  namePhonetic?: string;
  name?: string;
  patientId?: string;
  serialNo?: number;
  visitTimeDesc?: string;
  clinicLabel?: string;
  visitNo?: number;
  visitDate?: Date;
  invoiceReg?: string;
  resouse?: string;
  visitTime?: string;
  clinicId?: string;
  doctorTitle?: string;
  registryStatus?: string;
  registryDate?: Date;
  clinicPrice?: string;
  clinicClass?: string;
  internalNo?: string;
  identityClass?: string;
  doctorId?: string;
  mDay?: string;
  mPayment?: number;
  mPartment?: string;
  hspCode?: string;
  updateTime?: string;
  tczf?: number;
  zfzf?: number
}

/**
 * 门诊登记用户实体
 * Created by 毛琪 on 2017/5/11.
 */
export interface PatMasterIndexEntityOutpMedrec extends BaseEntity {
  hspCode?: string;
  updateTime?: string;
  eName?: string;
  vipNo?: string;
  idType?: string;
  foreignLanguage?: string;
  motherLanguage?: string;
  religion?: string;
  race?: string;
  degree?: string;
  patientClass?: string;
  photo?: string;
  businessZipCode?: string;
  serviceAgency?: string;
  operator?: string;
  createDate?: Date;
  vipIndicator?: number;
  lastVisitDate?: Date;
  nextOfKinPhone?: string;
  nextOfKinZipCode?: string;
  nextOfKinAddr?: string;
  relationship?: string;
  nextOfKin?: string;
  phoneNumberBusiness?: string;
  phoneNumberHome?: string;
  zipCode?: string;
  mailingAddress?: string;
  unitInContract?: string;
  chargeType?: string;
  identity?: string;
  idNo?: string;
  nation?: string;
  citizenship?: string;
  birthPlace?: string;
  dateOfBirth?: Date;
  sex?: string;
  namePhonetic?: string;
  name?: string;
  inpNo?: string;
  patientId?: string;
  healthCard?: string;
  jiguan?: string;
  homeZip?: string
}

/**
 * 门诊医嘱主记录
 * Created by 毛琪 on 2017/5/12.
 */
export interface OutpOrdersEntityOutpOutpdoct extends BaseEntity {
  nurse?: string;
  doctorNo?: string;
  clinicNo?: string;
  orderDate?: Date;
  doctor?: string;
  orderedBy?: string;
  serialNo?: string;
  visitNo?: number;
  visitDate?: Date;
  patientId?: string
}

/**
 * 处方医嘱明细表
 * Created by 毛琪 on 2017/5/12.
 */
export interface OutpPrescEntityOutpOutpdoct extends BaseEntity {
  prescDetail?: string;
  prescDiag?: string;
  prescRequrement?: string;
  prescForm?: string;
  decoctingMethod?: string;
  lsTb?: number;
  abidance?: number;
  prescAttr?: string;
  getdrugFlag?: string;
  freqDetail?: string;
  subOrderNo?: number;
  orderNo?: number;
  repetition?: number;
  dispensary?: string;
  chargeIndicator?: number;
  charges?: number;
  costs?: number;
  providedIndicator?: number;
  frequency?: string;
  administration?: string;
  dosageUnits?: string;
  dosage?: number;
  amount?: number;
  units?: string;
  firmId?: string;
  drugSpec?: string;
  drugName?: string;
  drugCode?: string;
  itemClass?: string;
  itemNo?: number;
  prescNo?: number;
  serialNo?: string;
  visitNo?: number;
  visitDate?: Date;
  lxgbFlag?: number;
  officialCatalog?: string;
  toxiProperty?: string;
  delIndicator?: string
}

/**
 * 检查治疗医嘱明细记录
 * Created by 毛琪 on 2017/5/12.
 */
export interface OutpTreatEntityOutpOutpdoct extends BaseEntity {
  delIndicator?: string;
  freqDetail?: string;
  appointItemNo?: number;
  appointNo?: string;
  chargeIndicator?: number;
  charges?: number;
  costs?: number;
  performedBy?: string;
  frequency?: string;
  amount?: number;
  units?: string;
  itemSpec?: string;
  itemName?: string;
  itemCode?: string;
  itemClass?: string;
  itemNo?: number;
  serialNo?: string;
  visitNo?: number;
  visitDate?: Date;
  doctorNo?: string
}

/**
 * 门诊转诊号别视图
 * Created by 包国强 on 2018/3/1.
 */
export interface VdClinicLabelEntityOutp extends BaseEntity {
  clinicDate?: Date;
  clinicDept?: string;
  clinicDeptName?: string;
  clinicLabel?: string;
  timeDesc?: string;
  clinicType?: string;
  doctor?: number;
  doctorName?: string;
  clinicPosition?: string;
  price?: number
}

/**
 * 费别字典表的实体类
 * Created by Vinsher on 2017/5/3.
 */
export interface ChargeSortEntityPatientBaseInformationPartInformation extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCodeWb?: string;
  inputCode?: string
}

/**
 * 身份字典表实体类
 * Created by Vinsher on 2017/5/3.
 */
export interface IdentitySortEntityPatientBaseInformationPartInformation extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 民族的实体类
 * Created by Vinsher on 2017/5/3.
 */
export interface NationalityEntityPatientBaseInformationPartInformation extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 流转记录实体类
 * Created by Vinsher on 2017/5/9.
 */
export interface TransferHistoryEntityPatientBaseInformationPartInformation extends BaseEntity {
  pvId?: number;
  transferDate?: Date;
  transferBy?: string;
  transferType?: string;
  transferReason?: string;
  transferMemo?: string;
  toWardName?: string;
  toDistrictNo?: string;
  toClinicType?: string;
  hasVitalSign?: number;
  toBedNo?: number;
  visitDate?: Date;
  recordDate?: Date
}

/**
 * 分诊信息实体类
 * Created by Vinsher on 2017/5/9.
 */
export interface TriageRecordEntityPatientBaseInformationPartInformation extends BaseEntity {
  changeLevel?: string;
  registerFirst?: string;
  startRecordDate?: Date;
  hasAccordingRecord?: number;
  hasScoreRecord?: number;
  hasVitalSign?: number;
  triageMemo?: string;
  autoTriageLevel?: string;
  actTriageLevel?: string;
  otherTriageTarget?: string;
  triageTarget?: string;
  triageBy?: string;
  triageDate?: Date;
  pvId?: string;
  greenRoad?: string
}

/**
 * 急诊用血预约申请单
 * Created by 包国强 on 2017/6/26.
 */
export interface BloodApplyEntityPatManageBlood extends BaseEntity {
  pvId?: number;
  appNo?: string;
  notice?: string;
  bloodType?: BloodTypeDictEntityPatManageBloodDict;
  bloodTypeRh?: BloodTypeRhDictEntityPatManageBloodDict;
  bloodCause?: string;
  transfusionHistory?: string;
  bloodPaperIndicator?: string;
  pregnancy?: string;
  parturition?: string;
  bloodTaboo?: string;
  alt?: number;
  hbsag?: string;
  hcv?: string;
  hiv?: string;
  syphilisTest?: string;
  hbsab?: string;
  hbcab?: string;
  hbeab?: string;
  hbeag?: string;
  hematin?: number;
  platelet?: number;
  leucocyte?: number;
  lastBloodDate?: Date;
  bloodInuse?: string;
  apanage?: string;
  irregularAntibodyScreening?: string;
  priorityIndicator?: number;
  status?: string;
  applyDept?: DeptDictEntityUser;
  applyDoctor?: UserEntityUser;
  applyDateTime?: Date;
  isDel?: number
}

/**
 * 急诊血型字典表
 * Created by 包国强 on 2017/6/26.
 */
export interface BloodTypeDictEntityPatManageBloodDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊血型字典表
 * Created by 包国强 on 2017/6/26.
 */
export interface BloodTypeRhDictEntityPatManageBloodDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊申请用血量表
 * Created by 包国强 on 2017/6/26.
 */
export interface BloodCapacityEntityPatManageBlood extends BaseEntity {
  bloodComponentName?: string;
  appNo?: string;
  appSubNo?: number;
  fastSlow?: string;
  bloodComponent?: BloodComponentEntityPatManageBloodDict;
  transDate?: Date;
  transCapacity?: number;
  unit?: BloodUnitDictEntityPatManageBloodDict;
  operator?: UserEntityUser;
  isDel?: number
}

/**
 * 急诊血液成分字典
 * Created by 包国强 on 2017/6/26.
 */
export interface BloodComponentEntityPatManageBloodDict extends BaseEntity {
  bloodComponent?: string;
  bloodComponentName?: string;
  bloodMatch?: string;
  usefulLife?: number;
  temperature?: string;
  unit?: string;
  stopDate?: Date;
  serialNo?: number;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊血型字典表
 * Created by 包国强 on 2017/6/26.
 */
export interface BloodUnitDictEntityPatManageBloodDict extends BaseEntity {
  code?: string;
  name?: string;
  serialNo?: number;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊会诊申请子表
 * Created by 毛琪 on 2017/6/8.
 */
export interface ConsultationApplyDetailEntityPatManageConsultation extends BaseEntity {
  consultationId?: number;
  pvId?: MhPatientVisitEntitySplit;
  consultationDept?: DepartmentEntityPatManage;
  status?: string;
  receiveTime?: Date;
  receiveDoctor?: UserEntityUser;
  expectedTime?: Date;
  consultationTime?: Date;
  consultationDoctor?: UserEntityUser;
  branch?: string;
  applyOpinion?: string;
  applyOpinionMemo?: string;
  consulOpinion?: string;
  consulOpinionMemo?: string;
  returnReceipt?: string;
  consultResult?: string;
  isDel?: number
}

/**
 * 分诊-患者分诊信息记录
 * Created by 毛琪 on 2017/5/3.
 */
export interface MhPatientVisitEntitySplit extends BaseEntity {
  patientId?: string;
  visitId?: number;
  visitDate?: Date;
  visitNo?: number;
  photo?: string;
  name?: string;
  sex?: SexDictEntitySplitDict;
  dateOfBirth?: Date;
  chargeType?: ChargeTypeDictEntitySplitDict;
  identity?: IdentityDictEntitySplitDict;
  idNo?: string;
  nation?: NationDictEntitySplitDict;
  nextOfKinPhone?: string;
  nextOfKin?: string;
  happenDate?: Date;
  mailingAddress?: string;
  registerFrom?: RegFromDictEntitySplitDict;
  greenRoad?: string;
  specialSign?: string;
  status?: number;
  registerDate?: Date;
  bulkinjuryId?: MhGroupInjuryEntitySplit;
  isBackNum?: string;
  bodyHeight?: number;
  bodyWeight?: number;
  hospitalCode?: string;
  deptAdmissionTo?: number;
  admissionDateTime?: Date;
  deptDischargeFrom?: number;
  dischargeDateTime?: Date;
  deptAdmWardDateTo?: number;
  admWardDateTime?: Date;
  doctorInCharge?: UserEntityUser;
  nurseInCharge?: UserEntityUser;
  diagnosis?: string;
  updateSign?: number;
  citizenship?: CountryDictEntitySplitDict;
  settledIndicator?: number;
  isDel?: number;
  namePhonetic?: string;
  unitInContract?: string;
  phoneNumberHome?: string;
  infoSources?: InfoSourcesDictEntitySplitDict;
  age?: string;
  ApplyDateTime?: Date;
  triageRecord?: MhTriageRecordEntitySplit
}

/**
 * 性别字典
 * Created by 包国强 on 2017/8/28.
 */
export interface SexDictEntitySplitDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 费别字典
 * Created by 包国强 on 2017/8/30.
 */
export interface ChargeTypeDictEntitySplitDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCodeWb?: string;
  inputCode?: string;
  isDel?: number
}

/**
 * 民族字典
 * Created by 包国强 on 2017/8/28.
 */
export interface IdentityDictEntitySplitDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 性别字典
 * Created by 包国强 on 2017/8/28.
 */
export interface NationDictEntitySplitDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 来院方式字典
 * Created by 包国强 on 2017/8/28.
 */
export interface RegFromDictEntitySplitDict extends BaseEntity {
  name?: string;
  description?: string;
  serialNo?: number;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 国家及地区字典
 * Created by 包国强 on 2017/8/28.
 */
export interface CountryDictEntitySplitDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 信息来源表字典
 * Created by 包国强 on 2017/12/5.
 */
export interface InfoSourcesDictEntitySplitDict extends BaseEntity {
  name?: number;
  code?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 分诊-分诊记录表
 * Created by 包国强 on 2017/5/3.
 */
export interface MhTriageRecordEntitySplit extends BaseEntity {
  pvId?: number;
  triageDate?: Date;
  triageBy?: UserEntityUser;
  triageTarget?: TriageTargetDictEntitySplitDict;
  otherTriageTarget?: TriageOtherDictEntityUserSysTriage;
  actTriageLevel?: TriageLevelDictEntityUserSysTriage;
  autoTriageLevel?: TriageLevelDictEntityUserSysTriage;
  triageMemo?: MhChangeReasonDictEntityUserSysTriage;
  hasVitalSign?: number;
  hasScoreRecord?: number;
  hasAccordingRecord?: number;
  startRecordDate?: Date;
  changeLevel?: TriageLevelDictEntityUserSysTriage;
  isDel?: number
}

/**
 * 分诊去向字典
 * Created by 包国强 on 2017/8/28.
 */
export interface TriageTargetDictEntitySplitDict extends BaseEntity {
  name?: string;
  description?: string;
  serialNo?: number;
  code?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 其它分诊去向model
 * Created by 毛琪 on 2017/6/10.
 */
export interface TriageOtherDictEntityUserSysTriage extends BaseEntity {
  name?: string;
  description?: string;
  serialNo?: number;
  code?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 分诊级别model
 * Created by 毛琪 on 2017/6/10.
 */
export interface TriageLevelDictEntityUserSysTriage extends BaseEntity {
  triageAreaId?: number;
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 调整级别原因model
 * Created by 毛琪 on 2017/6/10.
 */
export interface MhChangeReasonDictEntityUserSysTriage extends BaseEntity {
  serialNo?: number;
  changeReason?: string;
  operator?: string;
  updateDate?: Date;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 科室 使用hibernate注解
 * Created by 毛琪 on 2017/4/25.
 */
export interface DepartmentEntityPatManage extends BaseEntity {
  inputCode?: string;
  text?: string;
  code?: string;
  parentId?: number;
  order?: number;
  boo?: boolean;
  children?: Array<DepartmentEntityPatManage>
}

/**
 * 急诊会诊申请主表
 * Created by 毛琪 on 2017/6/8.
 */
export interface ConsultationApplyMasterEntityPatManageConsultation extends BaseEntity {
  consultationId?: number;
  pvId?: MhPatientVisitEntitySplit;
  consultationType?: number;
  applyDateTime?: Date;
  endDateTime?: Date;
  consultationDateTime?: Date;
  consultationPurpost?: string;
  applyDept?: DepartmentEntityPatManage;
  applyDoctor?: UserEntityUser;
  nextOfKin?: string;
  nextOfKinPhone?: string;
  memo?: string;
  applyConfirmOperator?: UserEntityUser;
  applyConfirmTime?: Date;
  opinion?: string;
  isDel?: number
}

/**
 * 急诊会诊申请子表
 * Created by 包国强 on 2017/7/23.
 */
export interface ConsultationDetailEntityPatManageConsultation extends BaseEntity {
  consultationId?: number;
  subId?: number;
  consultationDept?: DeptDictEntityUser;
  consultationStaff?: UserEntityUser;
  deptAssign?: number;
  receive?: number;
  receiveTime?: Date;
  consultationCommit?: number;
  consultationIdea?: string;
  commitDateTime?: Date;
  specialAssign?: number
}

/**
 * 急诊会诊申请主表
 * Created by 包国强 on 2017/7/23.
 */
export interface ConsultationMasterEntityPatManageConsultation extends BaseEntity {
  consultationId?: number;
  pvId?: MhPatientVisitEntitySplit;
  consultationType?: ConsultationTypeDictEntityPatManageConsultationDict;
  consultationExplain?: string;
  consultationApplyDept?: DeptDictEntityUser;
  role?: string;
  consultationApplyStaff?: UserEntityUser;
  nextOfKin?: UserEntityUser;
  nextOfKinPhone?: string;
  memo?: string;
  applyDateTime?: Date;
  endDateTime?: Date;
  consultationDateTime?: Date;
  deptCheckTime?: Date;
  deptVerify?: string;
  specialCheckTime?: Date;
  specialVerify?: string;
  checkVetoMemo?: string;
  specialVerifyStaff?: UserEntityUser;
  status?: ConsultationStatusDictEntityPatManageConsultationDict;
  hospitalCode?: string;
  cancelTime?: Date;
  isDel?: string
}

/**
 * 急诊会诊状态
 * Created by 包国强 on 2017/7/23.
 */
export interface ConsultationTypeDictEntityPatManageConsultationDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊会诊状态
 * Created by 包国强 on 2017/7/23.
 */
export interface ConsultationStatusDictEntityPatManageConsultationDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  memo?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊会诊科室
 * Created by 包国强 on 2017/7/26.
 */
export interface ConsultationDeptDictEntityPatManageConsultationDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊会诊权限字典
 * Created by 包国强 on 2017/7/23.
 */
export interface ConsultationGrantDictEntityPatManageConsultationDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number;
  memo?: string;
  comments?: string
}

/**
 * 急诊会诊权限与会诊状态配置表
 * Created by 包国强 on 2017/7/23.
 */
export interface ConsultationGrantsEntityPatManageConsultationDict extends BaseEntity {
  statusId?: ConsultationStatusDictEntityPatManageConsultationDict;
  statusName?: string;
  grantId?: ConsultationGrantDictEntityPatManageConsultationDict;
  grantName?: string;
  deptCode?: DeptDictEntityUser
}

/**
 * 急诊会诊类型与会诊状态配置表(会诊流程配置)
 * Created by 包国强 on 2017/7/26.
 */
export interface ConsultationProcessEntityPatManageConsultationDict extends BaseEntity {
  typeId?: ConsultationTypeDictEntityPatManageConsultationDict;
  typeName?: string;
  statusId?: ConsultationStatusDictEntityPatManageConsultationDict;
  statusName?: string;
  deptCode?: DeptDictEntityUser;
  serialNo?: number
}

/**
 * 急诊会诊特殊审核科室
 * Created by 包国强 on 2017/7/26.
 */
export interface ConsultationSpecialDeptEntityPatManageConsultationDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊会诊人员
 * Created by 包国强 on 2017/7/26.
 */
export interface ConsultationStaffDictEntityPatManageConsultationDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number;
  deptGrant?: number;
  specialDeptGrant?: number
}

/**
 * 急诊患者诊断
 * Created by Vinsher on 2017/6/20.
 */
export interface DiagnosisEntityPatManageDiagnosis extends BaseEntity {
  pvId?: number;
  diagnosisType?: DiagnosisTypeDictEntityPatManageDiagnosis;
  diagnosisNo?: number;
  diagnosisCode?: string;
  diagnosisDesc?: string;
  doctor?: UserEntityUser;
  diagnosisDate?: Date;
  diagnosisFlag?: number;
  isMainDiagnosis?: number;
  hospitalInfection?: number;
  contagiousInfection?: number;
  cfzFlag?: number;
  isDel?: number
}

/**
 * 诊断类型字典表的实体类
 * Created by Vinsher on 2017/5/11.
 */
export interface DiagnosisTypeDictEntityPatManageDiagnosis extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 诊断信息字典表实体类（即诊断名称）
 * Created by Vinsher on 2017/5/12.
 */
export interface DiagnosisDictEntityPatManageDiagnosis extends BaseEntity {
  diagnosisCode?: string;
  diagnosisName?: string;
  createDate?: Date;
  inputCode?: string;
  inputCodeWb?: string;
  diagIndicator?: number;
  greenRoadName?: string
}

/**
 * Created by 黄倩 on 2017/7/31.
 * 处置的子表类
 */
export interface TreatProjectItemsEntityPatManageDiagnosisDispose extends BaseEntity {
  itemNo?: number;
  itemClass?: string;
  text?: string;
  amount?: number;
  dosage?: number;
  dosageUnits?: string;
  spec?: string;
  units?: string;
  administration?: string;
  frequency?: string;
  performedBy?: DeptDictEntityUser;
  isDel?: number;
  masterId?: number;
  title?: string;
  itemSubNo?: number
}

/**
 * Created by 黄倩 on 2017/7/31.
 * 处置模板的主表类
 */
export interface TreatProjectMasterEntityPatManageDiagnosisDispose extends BaseEntity {
  title?: string;
  deptCode?: DeptDictEntityUser;
  advice?: string;
  diagnosis?: string;
  creator?: number;
  subTitle?: string;
  flag?: number;
  type?: number;
  memo?: string
}

/**
 * adl指数评定量详细记录model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInsDetailADLJudgeEntityPatManageDoc {
  jinShi?: number;
  riQi?: Date;
  docInstId?: number;
  createDate?: Date;
  shangXiaLou?: number;
  xingZou?: number;
  zhuanYi?: number;
  ruCe?: number;
  xiaoBian?: number;
  daBian?: number;
  chuanYi?: number;
  xiuShi?: number;
  xiZao?: number
}

/**
 * 评估单模板详细记录公共类
 * Created by 毛琪 on 2017/6/20.
 */
export interface DocInsDetailBaseEntityPatManageDoc extends BaseEntity {
  name?: string;
  patientId?: string;
  sex?: string;
  triageTarget?: string;
  dateOfBirth?: string;
  age?: string;
  bedNo?: string;
  registerDate?: string
}

/**
 * 跌倒风险评估详细记录model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInsDetailFallRiskEntityPatManageDoc {
  createDate?: Date;
  dieDao?: string;
  fenShu?: string;
  renZhi?: number;
  buTai?: number;
  shuYe?: number;
  fuZhu?: number;
  zhenDuan?: number;
  dieDaoShi?: number;
  riqi?: Date;
  docInstId?: number
}

/**
 * 疼痛护理评估详细记录model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInsDetailPainEntityPatManageDoc {
  createDate?: Date;
  pgr?: string;
  qiTa?: string;
  tongCi?: string;
  fzyHuXi?: number;
  fzyShiShui?: number;
  fzySaoYangNrs?: number;
  fzySaoYang?: number;
  fzyOuTu?: number;
  fzyEXinNrs?: number;
  fzyEXin?: number;
  fzyTuoYunNrs?: number;
  fzyTouYun?: number;
  fzyFuZhangNrs?: number;
  fzyFuZhang?: number;
  fzyPaiBianYou?: number;
  fzyPaiBian?: number;
  shuiMianXiangGuan?: number;
  shuiMian?: number;
  yinSuBeiZhu?: string;
  yinSuQiTa?: number;
  yinSuPaiBian?: number;
  yinSuQingXu?: number;
  yinSuKeSou?: number;
  yinSuJinShi?: number;
  yinSuTiWei?: number;
  yinSuHuoDong?: number;
  xingZhiBeiZhu?: string;
  xingZhiQiTa?: number;
  xingZhiDaoGe?: number;
  xingZhiYaBo?: number;
  xingZhiDianJi?: number;
  xingZhiDun?: number;
  xingZhiBoDong?: number;
  xingZhiShaoZhuo?: number;
  xingZhiJingLuan?: number;
  xingZhiMaCi?: number;
  xingZhiCi?: number;
  xingZhiZhang?: number;
  xingZhiSuan?: number;
  buWeiBeiZhu?: string;
  buWeiQiTa?: number;
  buWeiJiZhu?: number;
  buWeiFu?: number;
  buWeiYao?: number;
  buWeiXiong?: number;
  buWeiQuGan?: number;
  buWeiYouXia?: number;
  buWeiYouShang?: number;
  buWeiZuoXia?: number;
  buWeiZuoShang?: number;
  buWeiSiZhi?: number;
  buWeiJing?: number;
  buWeiTou?: number;
  pingFenHuo?: string;
  pingFenJing?: string;
  huXi?: string;
  xueYaGao?: string;
  xueYaDi?: string;
  maiBo?: string;
  ziLi?: string;
  riQi?: Date;
  docInstId?: number
}

/**
 * 入院评估详细记录model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInsDetailPatientEntityPatManageDoc {
  createdate?: Date;
  zhuanKe?: string;
  dieDaoFen?: string;
  dieDao?: string;
  guanQiTa?: string;
  guanQiDao?: string;
  guanShenJiMai?: string;
  guanWaiZhou?: string;
  guanYinLiu?: string;
  bodyPiFuFen?: string;
  bodyPiFu?: string;
  bodyZiLiResult?: string;
  bodyZiLiFen?: string;
  bodyShuiMian?: string;
  bodyHuoDong?: string;
  bodyPaiBian?: string;
  bodyPaiNiao?: string;
  bodyJinShi?: string;
  bodyMianRong?: string;
  bodyYanYu?: string;
  bodyTingLi?: string;
  bodyShiLi?: string;
  yiShi?: string;
  qingXu?: string;
  baseJiWang?: string;
  baseShiHao?: string;
  baseGuoMin?: string;
  basePeiBan?: string;
  baseZongJiao?: string;
  baseJiaoYu?: string;
  baseFromType?: string;
  baseGetType?: string;
  baseZhenDuan?: string;
  riQi?: Date;
  docInstId?: number
}

/**
 * 皮肤护理详细记录model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInsDetailSkinEntityPatManageDoc {
  createDate?: Date;
  fuLiaoQiTa?: number;
  fuLiaoYinLiZi?: number;
  fuLiaoPaoMo?: number;
  fuLiaoShuiNingJiao?: number;
  fuLiaoZaoSuan?: number;
  fuLiaoShuiJiao?: number;
  fuLiaoShaBu?: number;
  qingXiQiTa?: number;
  qingXiXiaoDuJi?: number;
  qingXiXiBiTai?: number;
  qingXiJiaXiaoZuo?: number;
  qingXiDianJi?: number;
  qingXiShuangYang?: number;
  qingXiYanShui?: number;
  piFuHongZhen?: number;
  piFuShouSuo?: number;
  piFuJinZi?: number;
  piFuShuiZhong?: number;
  piFuHuaiSi?: number;
  piFuHongBan?: number;
  piFuOk?: number;
  fenMiWu?: number;
  yanSeQiTa?: number;
  yanSeHong?: number;
  yanSeFen?: number;
  yanSeHuang?: number;
  yanSeHei?: number;
  yanSeShui?: number;
  daXiaoGao?: string;
  daXiaoKuan?: string;
  daXiaoChang?: string;
  fenQi?: number;
  buWei?: number;
  riQi?: Date;
  docInstId?: number
}

/**
 * 压疮风险评估详细记录model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInsDetailSoresEntityPatManageDoc {
  createDate?: Date;
  jieGuo?: string;
  fenShu?: string;
  yaoWuFen?: number;
  yaoWu?: number;
  chuangShang?: number;
  shenJingFen?: number;
  shenJing?: number;
  yingYang?: number;
  yunDong?: number;
  shiJin?: number;
  shiYu?: number;
  tiZhong?: number;
  nianLing?: number;
  xingBie?: number;
  piFu?: number;
  tiZhi?: number;
  riQi?: Date;
  docInstId?: number
}

/**
 * 风险评估模板记录表/评分单model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocInstanceEntityPatManageDoc extends BaseEntity {
  printCount?: number;
  docInstType?: number;
  updateUser?: string;
  updateDate?: Date;
  createUser?: string;
  createDate?: Date;
  status?: number;
  docInstTitle?: string;
  docTmpltId?: string;
  pvId?: string;
  isDel?: number
}

/**
 * 风险评估模板model
 * Created by 毛琪 on 2017/6/16.
 */
export interface DocTemplateEntityPatManageDoc extends BaseEntity {
  dwObject?: string;
  docTmpltTitle?: string;
  docTmpltShortTitle?: string;
  groupSortId?: number;
  groupId?: number;
  docShut?: number;
  pdaUse?: number;
  latestDocInstStatusIndex?: number;
  tmpltType?: number;
  dwObjectHistory?: string;
  updateUser?: string;
  updateDate?: Date;
  createUser?: string;
  createDate?: Date;
  tmpltGroupName?: string;
  flds2Xml?: string;
  sortId?: number;
  status?: number;
  spAfterUpdate?: string;
  spAfterDelete?: string;
  spAppend?: string;
  spCreate?: string;
  pblDirectory?: string;
  docFkfldName?: string;
  docFkTblName?: string;
  docTblName?: string;
  currDocInstanceCount?: number;
  maxDocInstanceCount?: number;
  dwObjectExport?: string;
  dwObjectPrint?: string;
  dwObjectWeb?: string;
  dwObjectFooter?: string;
  dwObjectHeader?: string
}

/**
 * 急诊检查类别字典
 * Created by 包国强 on 2017/6/22.
 */
export interface ExamClassDictEntityPatManageExamDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  performBy?: DeptDictEntityUser;
  inputCodeWb?: string
}

/**
 * 急诊检查报告模版
 * Created by 包国强 on 2017/6/22.
 */
export interface ExamRptPatternEntityPatManageExamDict extends BaseEntity {
  performBy?: string;
  examClass?: string;
  examSubClass?: string;
  descItem?: string;
  descName?: string;
  description?: string;
  descriptionCode?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊检查子类字典
 * Created by 包国强 on 2017/6/22.
 */
export interface ExamSubclassDictEntityPatManageExamDict extends BaseEntity {
  serialNo?: number;
  examClassName?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊检查预约记录
 * Created by 包国强 on 2017/6/14.
 */
export interface ExamAppointsEntityPatManageExam extends BaseEntity {
  appNo?: string;
  pvId?: number;
  priorityIndicator?: number;
  examClass?: string;
  examSubClass?: string;
  examReason?: string;
  physSign?: string;
  clinSymp?: string;
  relevantLabTest?: string;
  clinicDiag?: string;
  otherDiag?: string;
  memo?: string;
  concernPathogens?: string;
  mdro?: number;
  specialPathogens?: number;
  performedBy?: DeptDictEntityUser;
  applyDateTime?: Date;
  applyDept?: DeptDictEntityUser;
  applyDoctor?: UserEntityUser;
  status?: string;
  serialNo?: string;
  notice?: string;
  scheduledDate?: Date;
  billingIndicator?: number;
  costs?: number;
  charges?: number;
  isDel?: number;
  reportDateTime?: Date;
  reporter?: string;
  spmRecvedDate?: Date;
  chargeType?: string;
  patientSource?: string;
  technician?: string;
  dateOfBirth?: Date;
  printStatus?: string;
  examMode?: string;
  examGroup?: string;
  localIdClass?: string;
  examDateTime?: Date;
  confirmDateTime?: Date;
  identity?: string;
  auditingDoct?: string;
  auditingDateTime?: Date;
  device?: string;
  facility?: string;
  sex?: string;
  name?: string;
  photoStatus?: string
}

/**
 * 急诊检查项目记录
 * Created by 包国强 on 2017/6/14.
 */
export interface ExamItemsEntityPatManageExam extends BaseEntity {
  orderNo?: number;
  examClass?: string;
  appNo?: string;
  itemNo?: number;
  itemName?: string;
  itemCode?: string;
  costs?: number;
  billingIndicator?: number;
  notice?: string;
  isDel?: number
}

/**
 * 急诊检查预约记录
 * Created by 包国强 on 2017/6/14.
 */
export interface ExamMasterEntityPatManageExam extends BaseEntity {
  examNo?: string;
  localIdClass?: string;
  patientLocalId?: string;
  patientId?: string;
  visitId?: number;
  name?: string;
  sex?: string;
  dateOfBirth?: Date;
  examClass?: string;
  examSubClass?: string;
  spmRecvedDate?: Date;
  clinSymp?: string;
  physSign?: string;
  relevantLabTest?: string;
  relevantDiag?: string;
  clinDiag?: string;
  examMode?: string;
  examGroup?: string;
  device?: string;
  performedBy?: string;
  patientSource?: string;
  facility?: string;
  reqDateTime?: Date;
  reqDept?: string;
  reqPhysician?: string;
  reqMemo?: string;
  scheduledDateTime?: Date;
  notice?: string;
  examDateTime?: Date;
  reportDateTime?: Date;
  technician?: string;
  reporter?: string;
  resultStatus?: string;
  costs?: number;
  charges?: number;
  chargeIndicator?: number;
  chargeType?: string;
  identity?: string;
  rptstatus?: string;
  printStatus?: string;
  examSubdept?: string;
  confirmDoct?: string;
  studyUid?: string;
  verifier?: string;
  examReason?: string;
  confirmDateTime?: Date;
  photoStatus?: string;
  auditingDoct?: string;
  auditingDateTime?: Date
}

/**
 * 急诊检查model
 * Created by 包国强 on 2017/8/11.
 */
export interface ExamModelEntityPatManageExam extends BaseEntity {
  appNo?: string;
  pvId?: number;
  priorityIndicator?: string;
  applyDateTime?: Date;
  itemName?: string;
  status?: string;
  applyDoctor?: string
}

/**
 * Created by 黄倩 on 2017/8/25.
 */
export interface ExamFinalReportEntityPatManageExamExamReport extends BaseEntity {
  appNo?: string;
  appPara?: string;
  description?: string;
  impression?: string;
  recommendation?: string;
  isAbnormal?: string;
  useImage?: string;
  memo?: string;
  isDel?: number
}

/**
 * 检查报告视图
 * Created by 黄倩 on 2017/8/25.
 */
export interface ExamReportViewEntityPatManageExamExamReport extends BaseEntity {
  itemName?: string;
  examClass?: string;
  applyDoctor?: string;
  applyDateTime?: Date;
  status?: string;
  technician?: string;
  examDateTime?: Date;
  reportDateTime?: Date;
  isAbnormal?: string;
  examPara?: string;
  description?: string;
  impression?: string;
  recommendation?: string
}

/**
 * 创建人：黄倩
 * 创建时间：2017/7/26.
 * 说明:检查申请模板主表类
 */
export interface ExamMouldClassEntityPatManageExamMould extends BaseEntity {
  name?: string;
  deptCode?: DeptDictEntityUser;
  inputCode?: string;
  inputCodeWb?: string;
  type?: number;
  relevantDiag?: string;
  notice?: string;
  operator?: UserEntityUser;
  createTime?: Date;
  examReason?: string;
  clinSymp?: string;
  physSign?: string;
  relevantLabTest?: string;
  memo?: string;
  concernPathogens?: string;
  mdro?: number;
  specialPathogens?: number;
  examClass?: string;
  examSubClass?: string
}

/**
 * 创建人： 黄倩
 * 时间：2017/7/26.
 * 说明：检查申请的子表信息
 */
export interface ExamMouldProjectEntityPatManageExamMould extends BaseEntity {
  price?: number;
  masterId?: number;
  itemNo?: number;
  itemName?: string;
  itemCode?: string;
  isDel?: number
}

/**
 * 患者在科视图
 * hieip.h_bed_card_view与hieip.h_not_in_dept_view视图
 * Created by 包国强 on 2017/5/3.
 */
export interface InDeptEntityPatManage extends BaseEntity {
  bedLabel?: string;
  triageLevel?: string;
  patientId?: string;
  name?: string;
  sex?: string;
  age?: string;
  doctor?: number;
  doctorName?: string;
  diagnosis?: string;
  greenRoad?: string;
  virtalSign?: number;
  drugOrders?: number;
  examOrders?: number;
  labOrders?: number;
  ecg?: number;
  cons?: number;
  admWardDateTime?: Date;
  residenceTime?: string;
  pvId?: number;
  areaId?: number;
  areaName?: string;
  status?: number;
  chargeType?: string;
  visitDate?: Date;
  visitNo?: number;
  deptCode?: number;
  deptName?: string;
  shift?: number;
  individual?: string;
  payment?: string;
  bedUnit?: string;
  nurse?: string;
  nurseName?: string
}

/**
 * 急诊检验项目类别字典
 * Created by 包国强 on 2017/6/23.
 */
export interface LabItemClassDictEntityPatManageLabDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊检查单定义
 * Created by 包国强 on 2017/6/23.
 */
export interface LabSheetMasterEntityPatManageLabDict extends BaseEntity {
  labSheetId?: string;
  performedBy?: string;
  sheetTitle?: string;
  chargeItemClass?: string;
  chargeItemCode?: string;
  chargeItemSpec?: string
}

/**
 * 急诊标本字典
 * Created by 包国强 on 2017/6/23.
 */
export interface SpecimanDictEntityPatManageLabDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  deptCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊检验model
 * Created by 包国强 on 2017/8/11.
 */
export interface LabModelEntityPatManageLab extends BaseEntity {
  appNo?: string;
  pvId?: number;
  priorityIndicator?: string;
  applyDateTime?: Date;
  itemName?: string;
  status?: string;
  applyDoctor?: string
}

/**
 * 检验的结果信息表
 * Created by 黄倩 on 2017/8/28.
 */
export interface LabResultEntityPatManageLabLabReport extends BaseEntity {
  appNo?: string;
  itemNo?: number;
  printOrder?: number;
  reportItemName?: string;
  reportItemCode?: string;
  result?: string;
  units?: string;
  abnormalIndicator?: string;
  instrumentId?: string;
  resultDateTime?: Date
}

/**
 * 检验报告
 * Created by 黄倩  on 2017/9/6.
 */
export interface LabTestMasterDictEntityPatManageLabLabReport extends BaseEntity {
  appNo?: string;
  priorityIndicator?: number;
  pvId?: number;
  clinicDiag?: string;
  specimen?: string;
  notesForSpcm?: string;
  applyDateTime?: Date;
  applyDept?: string;
  applyDoctor?: string;
  performedBy?: string;
  status?: string;
  labItemClass?: string;
  serialNo?: string;
  executeDate?: Date;
  testCause?: string;
  spcmReceivedDateTime?: Date;
  spcmSampleDateTime?: Date;
  resultStatus?: string;
  resultsRptDateTime?: Date;
  transcriptionist?: string;
  verifiedBy?: string;
  costs?: number;
  charges?: number;
  billingIndicator?: number;
  printIndicator?: number;
  operId?: string;
  spwindow?: string;
  spdoctor?: string;
  spdept?: string;
  statusName?: string;
  theme?: string;
  abnormalIndicator?: string;
  docName?: string
}

/**
 * 急诊检验主记录
 * Created by 包国强 on 2017/6/14.
 */
export interface LabTestMasterEntityPatManageLab extends BaseEntity {
  orderNo?: number;
  appNo?: string;
  serialNo?: string;
  priorityIndicator?: number;
  pvId?: number;
  clinicDiag?: string;
  specimen?: string;
  notesForSpcm?: string;
  testCause?: string;
  applyDateTime?: Date;
  applyDept?: DeptDictEntityUser;
  applyDoctor?: UserEntityUser;
  performedBy?: DeptDictEntityUser;
  status?: string;
  labItemClass?: string;
  isDel?: number;
  itemName?: string;
  itemCode?: string;
  itemNo?: number;
  costs?: number;
  charges?: number;
  spwindow?: string;
  spdoctor?: string;
  spdept?: string;
  spcmReceivedDateTime?: Date;
  spcmSampleDateTime?: Date;
  resultsRptDateTime?: Date;
  transcriptionist?: string;
  verifiedBy?: string;
  billingIndicator?: number;
  printIndicator?: number;
  containerCarrier?: string
}

/**
 * 检验申请模板的主类
 * Created by 黄倩 on 2017/7/27.
 */
export interface LabTempEntityPatManageLabTemp extends BaseEntity {
  name?: string;
  creator?: number;
  startDateTime?: Date;
  deptCode?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 检验申请模板的子类
 * Created by 黄倩 on 2017/7/27.
 */
export interface LabTempItemsEntityPatManageLabTemp extends BaseEntity {
  /**
   * 费用
   */
  costs?: number;
  /**
   * 扩展码1,标本
   */
  expand1?: string;
  /**
   * 扩展码2,试管,检验项目类别,见h_lab_item_class_dict.code
   */
  expand2?: string;
  /**
   * 扩展码3,科室,见h_dept_dict.id
   */
  expand3?: string;
  tempId?: number;
  itemClass?: string;
  itemCode?: string;
  itemName?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 体温单数据模型
 * Created by 包国强 on 2017/7/10.
 */
export interface AuxiliaryProjectEntityPatManageNurse extends BaseEntity {
  type?: string;
  name?: string;
  units?: string
}

/**
 * 急诊体温单护理类别表
 * Created by 包国强 on 2017/7/4.
 */
export interface VitalSignsClassDictEntityPatManageNurseDict extends BaseEntity {
  serialNo?: number;
  classCode?: string;
  className?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊体温单护理项目表
 * Created by 包国强 on 2017/7/4.
 */
export interface VitalSignsItemDictEntityPatManageNurseDict extends BaseEntity {
  classCode?: VitalSignsClassDictEntityPatManageNurseDict;
  wardCode?: DeptDictEntityUser;
  deptCode?: DeptDictEntityUser;
  vitalCode?: string;
  vitalSigns?: string;
  unit?: string
}

export interface KVEntityPatManageNurse {
  
}

/**
 * 体温单数据模型
 * Created by 包国强 on 2017/7/10.
 */
export interface PointTimeEntityPatManageNurse extends BaseEntity {
  date?: string;
  hour?: number;
  type?: string;
  value?: string;
  phValue?: string;
  xlValue?: string;
  mbValue?: string;
  dataTime?: string
}

/**
 * 体温单数据模型
 * Created by 包国强 on 2017/7/10.
 */
export interface TemperatureChartEntityPatManageNurse extends BaseEntity {
  pvId?: number;
  timeType?: number;
  inpNo?: string;
  bedNo?: string;
  dischargeDateTime?: Date;
  endemicName?: string;
  wardCode?: string;
  time?: Date;
  patientName?: string;
  age?: string;
  admissionDateTime?: Date;
  admWardDateTime?: Date;
  healthCard?: string;
  sex?: string;
  medicalHao?: string;
  chargeType?: string;
  beginDay?: Date;
  endDay?: Date;
  dayOps?: Array<string>;
  breathingList?: Array<string>;
  dayList?: Array<number>
}

/**
 * 急诊病人体症记录
 * Created by 包国强 on 2017/7/4.
 */
export interface VitalSignsRecEntityPatManageNurse extends BaseEntity {
  classCode?: VitalSignsClassDictEntityPatManageNurseDict;
  vitalCode?: VitalSignsItemDictEntityPatManageNurseDict;
  wardCode?: DeptDictEntityUser;
  nurse?: UserEntityUser;
  pvId?: number;
  recordingDate?: Date;
  timePoint?: Date;
  vitalSigns?: string;
  units?: string;
  vitalSignsCvalues?: string
}

/**
 * 出入量维护-项目名称（类型）
 * Created by 毛琪 on 2017/6/9.
 */
export interface NursingInOutItemEntityPatManageNursingInOut extends BaseEntity {
  itemNo?: string;
  itemName?: string;
  unit?: string;
  inoutType?: number;
  statisticalTerm?: number;
  inputCode?: string;
  showIndex?: number;
  isCustom?: number;
  isVisible?: number;
  isDel?: number
}

/**
 * 出入量维护-注射类型
 * Created by 毛琪 on 2017/6/9.
 */
export interface NursingInOutItemDetailEntityPatManageNursingInOut extends BaseEntity {
  serialNo?: string;
  admintion?: string;
  inputCode?: string;
  inputCodeWb?: string;
  name?: string;
  isDel?: number
}

/**
 * 出入量维护-出入量记录
 * Created by 毛琪 on 2017/6/9.
 */
export interface NursingInOutRecordEntityPatManageNursingInOut extends BaseEntity {
  pvId?: string;
  recordDate?: Date;
  itemNo?: string;
  itemValue?: number;
  shiftType?: number;
  operaterCode?: number;
  itemColor?: string;
  inoutType?: number;
  time?: string
}

/**
 * 出入量维护-执行医嘱
 * Created by 毛琪 on 2017/6/9.
 */
export interface NursingOrderPerformEntityPatManageNursingInOut extends BaseEntity {
  pvId?: string;
  orderListId?: number;
  orderId?: number;
  detailId?: number;
  groupShowIndex?: number;
  dosageUnits?: string;
  admintion?: string;
  frequency?: string;
  performSchedule?: string;
  scheduleDateTime?: Date;
  startDateTime?: Date;
  stopDateTime?: Date;
  orderStatus?: number;
  performNurseCode?: UserEntityUser;
  performDateTime?: Date;
  checkNurseCode?: string;
  checkDateTime?: Date;
  dosagePreparation?: number;
  actualVolume?: number;
  restVolume?: number;
  isValid?: number;
  deptCode?: string;
  orderText?: string;
  dosage?: string
}

/**
 * 类似病史记录model
 * Created by 毛琪 on 2017/6/14.
 */
export interface MrFirstCourseRecordNodeEntityPatManageNursing extends BaseEntity {
  pvId?: string;
  nodeContentXml?: string;
  nodeContentText?: string;
  nodeName?: string;
  nodeCode?: string;
  visitDate?: Date;
  visitId?: string;
  patientId?: string;
  nodeId?: number
}

/**
 * 护理记录model
 * Created by 毛琪 on 2017/6/14.
 */
export interface NursingNursingRecordEntityPatManageNursing extends BaseEntity {
  recordContentRtf?: string;
  nurseCode?: UserEntityUser;
  recordContent?: string;
  lastUpdateTime?: Date;
  createTime?: Date;
  recordType?: number;
  pvId?: string
}

/**
 * 护理模板项目model
 * Created by 毛琪 on 2017/6/14.
 */
export interface NursingTemplateItemEntityPatManageNursing extends BaseEntity {
  isDel?: number;
  isRtfContent?: number;
  itemContent?: string;
  inputCode?: string;
  itemName?: string;
  typeCode?: number
}

/**
 * 护理模板类型model
 * Created by 毛琪 on 2017/6/14.
 */
export interface NursingTemplateTypeEntityPatManageNursing extends BaseEntity {
  isDel?: number;
  categoryCode?: string;
  categoryName?: string;
  isEnable?: number;
  parentId?: number;
  classifyCode?: string;
  classifyName?: string
}

/**
 * 导管记录model
 * Created by 毛琪 on 2017/6/14.
 */
export interface NursingTubeEntityPatManageNursingTube extends BaseEntity {
  drawingOperator?: UserEntityUser;
  dressing?: string;
  skin?: string;
  tubeDrawTime?: Date;
  isDrawing?: string;
  remark?: string;
  teamDate?: Date;
  teamTypeName?: string;
  operator?: UserEntityUser;
  daysOfUse?: string;
  tubeDepth?: number;
  tubePosition?: string;
  tubeName?: NursingTubeDirEntityPatManageNursingTube;
  tubeType?: NursingTubeTypeEntityPatManageNursingTube;
  pvId?: string;
  dataDt?: Date
}

/**
 * 导管名称model
 * Created by 毛琪 on 2017/6/14.
 */
export interface NursingTubeDirEntityPatManageNursingTube extends BaseEntity {
  builtIn?: number;
  types?: string;
  models?: string;
  texture?: string;
  sizes?: string;
  tubeType?: number;
  itemName?: string;
  itemNo?: string;
  gljc?: string;
  description?: string;
  maxDay?: number;
  guId?: number;
  inoutType?: number;
  indwellingTime?: string;
  criticality?: string;
  position?: string;
  dressingFrequency?: string;
  dressing?: string;
  isWash?: string;
  builtOut?: number
}

/**
 * 导管类型model
 * Created by 毛琪 on 2017/6/14.
 */
export interface NursingTubeTypeEntityPatManageNursingTube extends BaseEntity {
  gljc?: string;
  orderNum?: number;
  parentId?: number;
  typeIndex?: string;
  typeName?: string;
  typeCode?: string;
  isDel?: number
}

/**
 * 导入体征-体征记录表
 * Created by 毛琪 on 2017/6/12.
 */
export interface DatVitalSignEntityPatManageNursingVitalSign extends BaseEntity {
  unit?: string;
  dataDt?: Date;
  pvId?: string;
  bedNo?: number;
  deviceNo?: string;
  itemNo?: number;
  itemValue?: string;
  maxValue?: number;
  minValue?: number;
  abnormal?: number;
  displayInTiwen?: number;
  operator?: string;
  teamId?: number;
  teamTypeName?: string;
  teamDate?: Date;
  itemArtificial?: number;
  minute5?: string;
  minute10?: string;
  minute15?: string;
  minute30?: string;
  hour?: string
}

/**
 * 观察项类型model
 * Created by 毛琪 on 2017/6/12.
 */
export interface NursingVitalSignItemEntityPatManageNursingVitalSign extends BaseEntity {
  itemNo?: string;
  itemName?: string;
  unit?: string;
  description?: string;
  maxValue?: number;
  minValue?: number;
  itemNumeric?: number;
  itemDisplayInTemp?: number;
  isArtificial?: number;
  warningMaxValue?: number;
  warningMinValue?: number;
  isEnable?: number;
  sequence?: number;
  inputCode?: string;
  isDel?: number
}

/**
 * 观察项记录model
 * Created by 毛琪 on 2017/6/12.
 */
export interface NursingVitalSignRecordEntityPatManageNursingVitalSign extends BaseEntity {
  recorderCode?: string;
  recordDateTime?: Date;
  pvId?: string;
  itemId?: number;
  itemValue?: string;
  itemArtifical?: number
}

/**
 * 急诊手术操作字典
 * Created by 包国强 on 2017/6/19.
 */
export interface OperatingRoomEntityPatManageOperationDict extends BaseEntity {
  roomNo?: string;
  deptCode?: string;
  location?: string;
  status?: string;
  bedId?: number;
  bedLabel?: string;
  monitorCode?: string;
  branchNo?: number;
  samSpace?: number;
  patientId?: string;
  visitId?: number;
  operId?: number
}

/**
 * 急诊手术操作字典
 * Created by 包国强 on 2017/6/19.
 */
export interface OperationDictEntityPatManageOperationDict extends BaseEntity {
  createDate?: Date;
  inputCode?: string;
  inputCodeWb?: string;
  code?: string;
  name?: string;
  operationScale?: string;
  stdIndicator?: number;
  approvedIndicator?: number
}

/**
 * 急诊手术model
 * Created by 包国强 on 2017/8/11.
 */
export interface OperationModelEntityPatManageOperation extends BaseEntity {
  appNo?: string;
  pvId?: number;
  ackIndicator?: string;
  applyDateTime?: Date;
  itemName?: string;
  status?: string;
  applyDoctor?: string
}

/**
 * 急诊手术安排
 * Created by 包国强 on 2017/6/19.
 */
export interface OperationScheduleEntityPatManageOperation extends BaseEntity {
  pvId?: number;
  appNo?: number;
  bodyHeight?: number;
  bodyWeight?: number;
  bloodType?: BloodTypeDictEntityPatManageBloodDict;
  bloodTypeRh?: BloodTypeRhDictEntityPatManageBloodDict;
  emergencyIndicator?: number;
  clinicDiag?: string;
  patientCondition?: string;
  anesthesiaDoctor?: UserEntityUser;
  anesthesiaAssistant?: UserEntityUser;
  circulatingNurse?: UserEntityUser;
  instrumentNurse?: UserEntityUser;
  anesthesiaMethod?: string;
  operatingDept?: DeptDictEntityUser;
  surgeon?: UserEntityUser;
  firstAssistant?: UserEntityUser;
  secondAssistant?: UserEntityUser;
  thirdAssistant?: UserEntityUser;
  fourthAssistant?: UserEntityUser;
  operatingRoom?: DeptDictEntityUser;
  scheduledDateTime?: Date;
  operExpectTime?: number;
  asa?: string;
  sequence?: number;
  memo?: string;
  status?: string;
  applyDateTime?: Date;
  applyDoctor?: UserEntityUser;
  applyDept?: DeptDictEntityUser;
  ackIndicator?: number;
  operatingRoomNo?: string;
  operationScale?: string;
  isolationIndicator?: number;
  bloodTranDoctor?: string;
  opsBodyPart?: string;
  secondIndicator?: string;
  firstOperationNurse?: UserEntityUser;
  secondOperationNurse?: UserEntityUser;
  firstSupplyNurse?: UserEntityUser;
  secondSupplyNurse?: UserEntityUser;
  serialNo?: string;
  isDel?: number;
  thirdSupplyNurse?: UserEntityUser;
  satisfactionDegree?: number;
  operationLevel?: string;
  smoothIndicator?: number;
  nurseShiftIndicator?: number;
  endDateTime?: Date;
  startDateTime?: Date;
  operationClass?: string;
  diagAfterOperation?: string;
  provideWay?: string
}

/**
 * 急诊安排手术名称
 * Created by 包国强 on 2017/6/14.
 */
export interface ScheduledOperationNameEntityPatManageOperation extends BaseEntity {
  pvId?: number;
  appNo?: number;
  itemNo?: number;
  itemName?: string;
  operationScale?: string;
  operationLevel?: string;
  itemCode?: string;
  isDel?: number
}

/**
 * 急诊给药途径字典
 * Created by 包国强 on 2017/6/14.
 */
export interface AdministrationDictEntityPatManageOrdersClinic extends BaseEntity {
  serialNo?: number;
  administrationCode?: string;
  administrationName?: string;
  inputCode?: string;
  inpOutpFlag?: string
}

/**
 * 急诊诊疗项目分类字典
 * Created by 包国强 on 2017/6/14.
 */
export interface ClinicItemClassDictEntityPatManageOrdersClinic extends BaseEntity {
  serialNo?: number;
  classCode?: string;
  className?: string;
  inputCode?: string
}

/**
 * 急诊临床诊疗项目字典
 * Created by 包国强 on 2017/6/10.
 */
export interface ClinicItemDictEntityPatManageOrdersClinic extends BaseEntity {
  itemClass?: string;
  itemCode?: string;
  itemName?: string;
  inputCode?: string;
  inputCodeWb?: string;
  expand1?: string;
  expand2?: string;
  expand3?: string;
  expand4?: string;
  expand5?: string;
  itemStatus?: string;
  memo?: string;
  code?: string
}

/**
 * 临床诊疗项目名称字典
 * Created by 包国强 on 2017/6/10.
 */
export interface ClinicItemNameDictEntityPatManageOrdersClinic extends BaseEntity {
  itemClass?: string;
  itemName?: string;
  itemCode?: string;
  stdIndicator?: number;
  inputCode?: string;
  inputCodeWb?: string;
  expand1?: string;
  expand2?: string;
  expand3?: string;
  expand4?: string;
  expand5?: string;
  itemStatus?: string;
  /**
   * 价格
   */
  costs?: number;
  /**
   * 项目序列号
   */
  itemNo?: number;
  /**
   * 申请序号
   */
  appNo?: number
}

/**
 * 急诊临床诊疗项目与价表项目对照表
 * Created by 包国强 on 2017/6/10.
 */
export interface ClinicVsChargeEntityPatManageOrdersClinic extends BaseEntity {
  clinicItemClass?: string;
  clinicItemCode?: string;
  chargeItemNo?: number;
  chargeItemClass?: string;
  chargeItemCode?: string;
  chargeItemSpec?: string;
  amount?: number;
  units?: string;
  backbillRule?: string
}

/**
 * 价表视图
 * Created by 包国强 on 2017/9/19.
 */
export interface CurrentPriceListEntityPatManageOrdersClinic extends BaseEntity {
  aliasName?: string;
  itemName?: string;
  itemCode?: string;
  itemClass?: string;
  itemClassName?: string;
  itemSpec?: string;
  units?: string;
  price?: number;
  inputCode?: string;
  performedBy?: number;
  performedByName?: string;
  classOnInpRcpt?: string;
  classOnReckoning?: string;
  subjCode?: string;
  classOnMr?: string;
  inputCodeWb?: string
}

/**
 * 急诊价表
 * Created by 包国强 on 2017/6/10.
 */
export interface PriceListEntityPatManageOrdersClinic extends BaseEntity {
  itemClass?: string;
  itemCode?: string;
  itemName?: string;
  itemSpec?: string;
  units?: string;
  price?: number;
  preferPrice?: number;
  foreignerPrice?: number;
  performedBy?: DeptDictEntityUser;
  feeTypeMask?: number;
  classOnInpRcpt?: string;
  classOnOutpRcpt?: string;
  classOnReckoning?: string;
  subjCode?: string;
  classOnMr?: string;
  memo?: string;
  startDate?: Date;
  stopDate?: Date;
  operator?: string;
  enterDate?: Date;
  highPrice?: number;
  materialCode?: string;
  controlFlag?: string;
  inputCode?: string;
  inputCodeWb?: string;
  changedMemo?: string;
  score1?: number;
  score2?: number;
  priceNameCode?: string;
  stdCode1?: string;
  classOnInsurMr?: string;
  licenseId?: number;
  chargeAccording?: string;
  firmId?: string;
  packageSpec?: string;
  outInspect?: string;
  isDel?: number
}

/**
 * 急诊剂量单位字典
 * Created by 包国强 on 2017/8/11.
 */
export interface DosageUnitsDictEntityPatManageOrdersDict extends BaseEntity {
  serialNo?: number;
  dosageUnits?: string;
  baseUnits?: string;
  conversionRatio?: number;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊医嘱分类设置(区域关联途径)详细表
 * Created by 包国强 on 2017/7/5.
 */
export interface OrdersClassAreaDetailEntityPatManageOrdersDict extends BaseEntity {
  area?: OrdersClassAreaMasterEntityPatManageOrdersDict;
  administration?: string
}

/**
 * 急诊医嘱分类设置(区域关联途径)主表
 * Created by 包国强 on 2017/7/5.
 */
export interface OrdersClassAreaMasterEntityPatManageOrdersDict extends BaseEntity {
  code?: string;
  name?: string;
  area?: string;
  isDel?: number
}

/**
 * 急诊医嘱执行缺省时间表
 * Created by 包国强 on 2017/6/13.
 */
export interface PerformDefaultScheduleEntityPatManageOrdersDict extends BaseEntity {
  serialNo?: number;
  freqDesc?: string;
  administration?: string;
  defaultSchedule?: string
}

/**
 * 急诊医嘱执行频率字典
 * Created by 包国强 on 2017/6/13.
 */
export interface PerformFreqDictEntityPatManageOrdersDict extends BaseEntity {
  serialNo?: number;
  freqDesc?: string;
  freqCounter?: number;
  freqInterval?: number;
  freqIntervalUnits?: string
}

/**
 * 医嘱
 * Created by 包国强 on 2017/6/10.
 */
export interface DrugDictEntityPatManageOrdersDrug extends BaseEntity {
  drugCode?: string;
  drugName?: string;
  drugSpec?: string;
  units?: string;
  drugForm?: string;
  toxiProperty?: string;
  dosePerUnit?: number;
  doseUnits?: string;
  drugIndicator?: number;
  inputCode?: string;
  otc?: string;
  limitClass?: string;
  stopFlag?: number;
  enteredDatetime?: Date;
  doctorLimit?: number;
  isDel?: number;
  firmId?: string;
  quantity?: number
}

/**
 * 医嘱
 * Created by 包国强 on 2017/6/10.
 */
export interface DrugPriceListEntityPatManageOrdersDrug extends BaseEntity {
  drugCode?: string;
  drugSpec?: string;
  firmId?: string;
  units?: string;
  tradePrice?: number;
  retailPrice?: number;
  amountPerPackage?: number;
  minSpec?: string;
  minUnits?: string;
  startDate?: Date;
  stopDate?: Date;
  memos?: string;
  classOnInpRcpt?: string;
  classOnOutpRcpt?: string;
  classOnReckoning?: string;
  subjCode?: string;
  classOnMr?: string;
  hlimitPrice?: number;
  priceClass?: string;
  passNo?: string;
  gmp?: number;
  baseClass?: string;
  pMeproductCode?: string
}

/**
 * 医嘱
 * Created by 包国强 on 2017/6/10.
 */
export interface DrugStockEntityPatManageOrdersDrug extends BaseEntity {
  subPackage1?: number;
  subPackageUnits1?: string;
  subPackageSpec1?: string;
  subPackage2?: number;
  subPackageUnits2?: string;
  subPackageSpec2?: string;
  subStorage?: string;
  location?: string;
  documentNo?: string;
  supplyIndicator?: number;
  storage?: string;
  drugCode?: string;
  drugSpec?: string;
  units?: string;
  batchNo?: string;
  expireDate?: Date;
  firmId?: string;
  purchasePrice?: number;
  discount?: number;
  packageSpec?: string;
  quantity?: number;
  packageUnits?: string
}

/**
 * 急诊成组医嘱模板子记录
 * Created by 包国强 on 2017/6/16.
 */
export interface GroupOrderItemsEntityPatManageOrdersGroup extends BaseEntity {
  groupOrderId?: number;
  orderNo?: number;
  orderSubNo?: number;
  repeatIndicator?: number;
  orderClass?: string;
  orderText?: string;
  orderCode?: string;
  dosage?: number;
  dosageUnits?: string;
  administration?: string;
  frequency?: string;
  freqCounter?: number;
  freqInterval?: number;
  freqIntervalUnit?: string;
  freqDetail?: string;
  performSchedule?: string;
  drugBillingAttr?: number;
  orderSpec?: string;
  firmId?: string;
  units?: string
}

/**
 * 急诊成组医嘱模板主记录
 * Created by 包国强 on 2017/6/16.
 */
export interface GroupOrderMasterEntityPatManageOrdersGroup extends BaseEntity {
  title?: string;
  deptCode?: DeptDictEntityUser;
  creatorId?: UserEntityUser;
  createDateTime?: Date;
  lastModifyDateTime?: Date;
  flag?: number;
  inputCode?: string;
  isDel?: number
}

/**
 * 急诊医嘱表
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersEntityPatManageOrders extends BaseEntity {
  json?: string;
  pvId?: number;
  orderNo?: number;
  orderSubNo?: number;
  repeatIndicator?: number;
  orderClass?: string;
  orderText?: string;
  orderCode?: string;
  dosage?: number;
  dosageUnits?: string;
  administration?: string;
  duration?: number;
  durationUnits?: string;
  startDateTime?: Date;
  stopDateTime?: Date;
  frequency?: string;
  freqCounter?: number;
  freqInterval?: number;
  freqIntervalUnit?: string;
  freqDetail?: string;
  performSchedule?: string;
  performResult?: string;
  orderingDept?: DeptDictEntityUser;
  doctor?: UserEntityUser;
  stopDoctor?: UserEntityUser;
  nurse?: UserEntityUser;
  stopNurse?: UserEntityUser;
  enterDateTime?: Date;
  stopOrderDateTime?: Date;
  orderStatus?: number;
  drugBillingAttr?: number;
  billingAttr?: number;
  lastPerformDateTime?: Date;
  lastAcctingDateTime?: Date;
  verifyDataTime?: Date;
  processingDateTime?: Date;
  processingNurse?: UserEntityUser;
  stopProcessingNurse?: UserEntityUser;
  stopProcessingDateTime?: Date;
  cancelDateTime?: Date;
  cancelDoctor?: UserEntityUser;
  stopFlag?: string;
  commitDateTime?: Date;
  orderSpec?: string;
  firmId?: string;
  skinTest?: number;
  specialFlag?: number;
  currentPrescNo?: number;
  appFlag?: number;
  appNo?: string;
  appItemNo?: number;
  serialNo?: string;
  dispensary?: DeptDictEntityUser;
  amount?: number;
  repetition?: number;
  abidance?: number;
  chargeIndicator?: number;
  toxiProperty?: string;
  drugIndicator?: number;
  isDel?: number
}

/**
 * 急诊医嘱计价项目
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersCostsEntityPatManageOrders extends BaseEntity {
  pvId?: number;
  orderNo?: number;
  orderSubNo?: number;
  itemNo?: number;
  itemClass?: string;
  itemName?: string;
  itemCode?: string;
  itemSpec?: string;
  units?: string;
  amount?: number;
  totalAmount?: number;
  costs?: number;
  backbillRule?: string;
  isDel?: number;
  backbillFlag?: number;
  price?: number
}

/**
 * 医嘱子记录表
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersDetailEntityPatManageOrders extends BaseEntity {
  continueSkinTest?: number;
  perPrice?: number;
  specialDosagePerTime?: string;
  returnFeeId?: string;
  isDel?: number;
  innerGroupIndex?: number;
  itemCode?: string;
  defaultExecDept?: string;
  dosage?: number;
  qtyPerTime?: number;
  feeTypeMain?: number;
  feeTypeSub?: number;
  insurable?: number;
  outDrug?: number;
  remark?: string;
  ordersSerialNo?: number;
  indication?: number;
  labSheetSn?: number;
  outDrugItemName?: string;
  notSend?: number;
  applyQty?: number;
  sampleType?: string;
  insureCheckFlag?: number;
  skinTest?: number
}

/**
 * 医嘱药品视图
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersDrugViewEntityPatManageOrders extends BaseEntity {
  insuranceName?: string;
  drugName?: string;
  drugAliasName?: string;
  baseClass?: string;
  drugSpec?: string;
  firmId?: string;
  quantity?: number;
  drugCode?: string;
  packageUnits?: string;
  storageName?: string;
  dosePerUnit?: number;
  doseUnits?: string;
  inputCode?: string;
  inputCodeWb?: string;
  doctorLimit?: number;
  bz?: string;
  storage?: string;
  toxiProperty?: string;
  drugIndicatorCode?: number;
  drugIndicatorName?: string;
  drugClass?: string;
  subPackage?: number;
  price?: number
}

/**
 * 医嘱model
 * Created by 包国强 on 2017/5/3.
 */
export interface OrdersListEntityPatManageOrders extends BaseEntity {
  orderId?: number;
  detailId?: number;
  groupShowIndex?: number;
  cureNo?: string;
  itemCode?: string;
  execDept?: string;
  groupNo?: number;
  useAt?: number;
  innerGroupIndex?: number;
  applyTime?: Date;
  planUseTime?: Date;
  execTime?: Date;
  doneTime?: Date;
  printTime?: Date;
  executorCode?: string;
  checkerCode?: string;
  printOpCode?: string;
  status?: number;
  relationNo?: number;
  applyQty?: number;
  isTempAdd?: number;
  stoppedTime?: Date;
  returnFlag?: number;
  speed?: string;
  returnOfId?: number;
  secondExecutorCode?: string;
  secondExecuteTime?: Date;
  specialDosagePerTime?: number;
  dosagePreparation?: number;
  actualVolume?: number;
  restVolume?: number;
  checkTime?: Date;
  isPrinted?: string;
  isDel?: number
}

/**
 * 医嘱model
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersMainEntityPatManageOrders extends BaseEntity {
  showIndex?: number;
  orderNo?: number;
  orderClass?: number;
  repeatIndicator?: number;
  pvId?: number;
  orderingDept?: string;
  startDateTime?: Date;
  lastExecDate?: Date;
  stopDateTime?: Date;
  frequency?: string;
  timesPerDay?: number;
  administration?: string;
  performSchedule?: string;
  orderText?: string;
  orderStatus?: number;
  doctor?: number;
  checkerCode?: string;
  tempAddRemark?: string;
  emergencyLevel?: number;
  emergencyExecuteTime?: Date;
  labSpecialRemark?: string;
  enterDateTime?: Date;
  tempAdd?: number;
  stopDoctor?: string;
  speed?: string;
  flushChannel?: number;
  changeBrowne?: number;
  isNutritionInflusion?: number;
  isDoctorExecute?: number;
  suitId?: string;
  suitTemplateId?: string;
  longDays?: number;
  lastUpdateTime?: Date;
  nurseCheckTime?: Date;
  nurseCheckOp?: string;
  frequencyXml?: string;
  realStartTime?: Date;
  planStopTime?: Date;
  emrSectionNo?: number;
  returnOfOrderId?: number;
  drugStoreOption?: number;
  remark2?: string;
  secondOpCode?: string;
  isShow?: number;
  isPassiveCancle?: number;
  recordTime?: Date;
  stopNurseSignUserCode?: string;
  stopNurseSignExecDateTime?: Date;
  isBaby?: number;
  reservedStopDate?: Date;
  createTime?: Date;
  relatedStatus?: number;
  lastProcessTime?: Date;
  isNurseOrder?: number;
  relatedOrdersSerialNos?: string;
  isDel?: number;
  modelList?: Array<OrdersDetailEntityPatManageOrders>
}

/**
 * 急诊医嘱执行计划
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersPlanRecEntityPatManageOrders extends BaseEntity {
  pvId?: number;
  orderNo?: number;
  orderSubNo?: number;
  orderClass?: string;
  orderCode?: string;
  orderText?: string;
  dosage?: number;
  dosageUnits?: string;
  orderSpec?: string;
  administration?: string;
  frequency?: string;
  startDateTime?: Date;
  stopDateTime?: Date;
  planDateTime?: Date;
  reserveDosage?: number;
  realizedDosage?: number;
  residualDosage?: number;
  createDateTime?: Date;
  performSchedule?: string;
  processingDateTime?: Date;
  processingNurse?: UserEntityUser;
  orderStatus?: number;
  repeatIndicator?: number;
  verifyDataTime?: Date;
  nurse?: UserEntityUser;
  nurseName?: string;
  name?: string;
  statusName?: string;
  injectionType?: string
}

/**
 * 医嘱单视图
 * Created by 包国强 on 2017/6/5.
 */
export interface OrdersViewEntityPatManageOrders extends BaseEntity {
  repeatIndicator?: string;
  orderClass?: number;
  enterDateTime?: Date;
  startDateTime?: Date;
  orderText?: string;
  dosage?: number;
  administration?: string;
  frequency?: string;
  stopDateTime?: Date;
  orderRemark?: string;
  doctor?: number;
  nurse?: string;
  performSchedule?: string
}

/**
 * Created by 黄倩 on 2017/8/1.
 * 门诊计费模板的主表类
 */
export interface OutpBillingEntityPatManageOutpBilling extends BaseEntity {
  typeName?: string;
  name?: string;
  code?: string;
  deptCode?: DeptDictEntityUser;
  inputCode?: string;
  inputCodeWb?: string;
  creator?: UserEntityUser;
  isDel?: number;
  type?: number;
  createDateTime?: Date
}

/**
 * Created by 黄倩 on 2017/8/1.
 * 门诊计费模板的明细表
 */
export interface OutpBillingItemsEntityPatManageOutpBilling extends BaseEntity {
  price?: number;
  itemClassName?: string;
  itemClass?: string;
  itemCode?: string;
  itemName?: string;
  itemSpec?: string;
  units?: string;
  performedBy?: DeptDictEntityUser;
  amount?: number;
  deptCode?: DeptDictEntityUser;
  inputCode?: string;
  inputCodeWb?: string;
  billId?: number;
  isDel?: number
}

/**
 * Created by 随便写 on 2017/8/10.
 */
export interface OutpChargebackPrescEntityPatManageOutpChargeback extends BaseEntity {
  pvId?: number;
  serialNo?: string;
  prescNo?: number;
  itemNo?: number;
  orderNo?: number;
  orderSubNo?: number;
  itemClass?: string;
  drugCode?: string;
  drugName?: string;
  drugSpec?: string;
  firmId?: string;
  units?: string;
  amount?: number;
  dosage?: number;
  dosageUnits?: string;
  administration?: string;
  frequency?: string;
  providedIndicator?: number;
  costs?: number;
  charges?: number;
  chargeIndicator?: number;
  dispensary?: number;
  repetition?: number;
  freqDetail?: string;
  getdrugFlag?: string;
  prescAttr?: string;
  abidance?: number;
  lsTb?: number;
  decoctingMethod?: string;
  prescForm?: string;
  prescRequrement?: string;
  prescDiag?: string;
  prescDetail?: string;
  lxgbFlag?: number
}

/**
 * 急诊就诊记录
 * Created by 包国强 on 2017/10/31.
 */
export interface ClinicMasterEntityPatManageOutp extends BaseEntity {
  pvId?: number;
  clinicLabel?: string;
  visitTimeDesc?: string;
  serialNo?: number;
  insuranceType?: string;
  insuranceNo?: string;
  unitInContract?: string;
  clinicType?: string;
  firstVisitIndicator?: number;
  visitDept?: DeptDictEntityUser;
  visitSpecialClinic?: string;
  doctor?: UserEntityUser;
  mrProvideIndicator?: number;
  registrationStatus?: number;
  registeringDate?: Date;
  symptom?: string;
  registFee?: number;
  clinicFee?: number;
  otherFee?: number;
  clinicCharge?: number;
  operator?: UserEntityUser;
  returnedDate?: Date;
  returnedOperator?: string;
  modeCode?: string;
  cardName?: string;
  cardNo?: string;
  acctDateTime?: Date;
  acctNo?: string;
  payWay?: string;
  mrProvidedIndicator?: number;
  invoiceNo?: string;
  clinicNo?: string;
  realSort?: string;
  hospitalPay?: number;
  qfxgwyfh?: number;
  delpje?: number;
  gwybz?: number;
  zfzf?: number;
  tczf?: number;
  updateTime?: Date;
  hspCode?: string;
  mPartment?: string;
  mPayment?: number;
  mDay?: string;
  identityClass?: string;
  internalNo?: string;
  clinicClass?: string;
  clinicPrice?: string;
  registryDate?: Date;
  registryStatus?: string;
  doctorTitle?: string;
  clinicId?: string;
  visitTime?: string;
  resouse?: string;
  invoiceReg?: string;
  bank?: string;
  cashTraceNo?: string;
  terminalId?: string;
  bankno?: string;
  transmoney?: number;
  printFlag?: number;
  patientId?: string;
  name?: string;
  namePhonetic?: string;
  sex?: string;
  age?: number;
  identity?: string;
  chargeType?: string
}

/**
 * 门诊诊断
 * Created by 包国强 on 2017/10/31.
 */
export interface DiagReportModelEntityPatManageOutp extends BaseEntity {
  diag?: string;
  diagNum?: number;
  deptName?: number
}

/**
 * 门诊医生工作量
 * Created by 包国强 on 2017/10/31.
 */
export interface DoctorWorkModelEntityPatManageOutp extends BaseEntity {
  doctor?: string;
  regNum?: number;
  refundNum?: number;
  sumNum?: number
}

/**
 * 急诊疾病证明记录表
 * Created by 包国强 on 2017/10/31.
 */
export interface MDayRecEntityPatManageOutp extends BaseEntity {
  pvId?: number;
  mDayId?: MDayRecEntityPatManageOutp;
  mDay?: string;
  printFlag?: number;
  printDate?: Date;
  deptCode?: DeptDictEntityUser;
  doctor?: UserEntityUser;
  isDel?: number
}

/**
 * 急诊病历记录大模板
 * Created by 包国强 on 2017/8/21.
 */
export interface MrRecTempEntityPatManageOutpMrDict extends BaseEntity {
  name?: string;
  illnessDesc?: string;
  anamnesis?: string;
  menses?: string;
  individual?: string;
  familyIll?: string;
  marrital?: string;
  doctor?: UserEntityUser;
  medHistory?: string;
  bodyExam?: string;
  operationRecord?: string;
  medicalRecord?: string;
  diagDesc?: string;
  advice?: string;
  cdiag?: string;
  memo?: string;
  crbFlag?: string;
  dbzFlag?: string;
  deptCode?: DeptDictEntityUser;
  flag?: number;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊病历模板子表
 * Created by 包国强 on 2017/8/21.
 */
export interface MrTempDetailEntityPatManageOutpMrDict extends BaseEntity {
  masterId?: number;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊病历模板主表
 * Created by 包国强 on 2017/8/21.
 */
export interface MrTempMasterEntityPatManageOutpMrDict extends BaseEntity {
  code?: string;
  name?: string;
  deptCode?: DeptDictEntityUser;
  doctor?: UserEntityUser;
  flag?: number;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊病历记录模板类型字典表
 * Created by 包国强 on 2017/8/21.
 */
export interface MrTempTypeDictEntityPatManageOutpMrDict extends BaseEntity {
  code?: string;
  name?: string;
  aliasName?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 急诊病历记录
 * Created by 包国强 on 2017/8/21.
 */
export interface OutpMrEntityPatManageOutpMr extends BaseEntity {
  pvId?: number;
  ordinal?: number;
  illnessDate?: Date;
  illnessDesc?: string;
  anamnesis?: string;
  menses?: string;
  individual?: string;
  familyIll?: string;
  marrital?: string;
  doctor?: UserEntityUser;
  medHistory?: string;
  bodyExam?: string;
  operationRecord?: string;
  medicalRecord?: string;
  diagDesc?: string;
  advice?: string;
  cdiag?: string;
  memo?: string;
  crbFlag?: string;
  dbzFlag?: string;
  cfzFlag?: string;
  recDateTime?: Date
}

/**
 * 急诊门诊医生收费明细
 * Created by 包国强 on 2017/7/18.
 */
export interface OutpBillDetailEntityPatManageOutpOrders extends BaseEntity {
  itemClassName?: string;
  pvId?: number;
  serialNo?: string;
  orderClass?: string;
  orderNo?: number;
  orderSubNo?: number;
  itemNo?: number;
  itemClass?: string;
  itemName?: string;
  itemCode?: string;
  itemSpec?: string;
  units?: string;
  repetition?: number;
  amount?: number;
  orderedByDept?: DeptDictEntityUser;
  orderedByDoctor?: UserEntityUser;
  performedBy?: DeptDictEntityUser;
  classOnRcpt?: string;
  costs?: number;
  charges?: number;
  rcptNo?: string;
  billDescNo?: number;
  billItemNo?: number;
  chargeIndicator?: number;
  classOnReckoning?: string;
  subjCode?: string;
  priceQuotiety?: number;
  itemPrice?: number;
  clinicNo?: string;
  billDate?: Date;
  billNo?: number;
  operaterRefound?: number;
  oriItemNo?: number;
  isDel?: number
}

/**
 * 急诊门诊出诊安排
 * Created by 包国强 on 2017/10/31.
 */
export interface OutpDoctorScheduleEntityPatManageOutp extends BaseEntity {
  clinicDept?: DeptDictEntityUser;
  doctor?: UserEntityUser;
  dayOfWeek?: number;
  clinicDuration?: string;
  queueName?: string;
  counselNo?: string;
  autoAssignPatient?: string;
  beginSequence?: number;
  isDel?: number;
  clinicType?: number
}

/**
 * 门诊患者视图
 * Created by 包国强 on 2017/10/31.
 */
export interface OutpPatsEntityPatManageOutp extends BaseEntity {
  pvId?: number;
  visitNo?: number;
  name?: string;
  patientId?: string;
  sex?: number;
  chargeType?: string;
  visitDate?: Date;
  registerDept?: number;
  registerDeptName?: string;
  doctor?: number;
  doctorName?: string;
  registerDate?: Date;
  visitDept?: number;
  visitDeptName?: string;
  workedIndicator?: number;
  scoreValue?: number;
  age?: string
}

/**
 * 药品处方属性字典
 * Created by 包国强 on 2017/7/18.
 */
export interface DrugPrescAttrDictEntityPatManageOutpPrescDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊处方服用要求字典表
 * Created by 包国强 on 2017/8/24.
 */
export interface PrescDetailDictEntityPatManageOutpPrescDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number
}

/**
 * 急诊处方频次字典表
 * Created by 包国强 on 2017/8/24.
 */
export interface PrescFormDictEntityPatManageOutpPrescDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number
}

/**
 * 急诊处方服用要求字典表
 * Created by 包国强 on 2017/8/24.
 */
export interface PrescRequrementDictEntityPatManageOutpPrescDict extends BaseEntity {
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  serialNo?: number
}

/**
 * 急诊门诊处方医嘱明细记录
 * Created by 包国强 on 2017/7/18.
 */
export interface OutpPrescEntityPatManageOutpPresc extends BaseEntity {
  pvId?: number;
  serialNo?: string;
  prescNo?: number;
  itemNo?: number;
  orderNo?: number;
  orderSubNo?: number;
  itemClass?: string;
  drugCode?: string;
  drugName?: string;
  drugSpec?: string;
  firmId?: string;
  amount?: number;
  units?: string;
  repetition?: number;
  dosage?: number;
  dosageUnits?: string;
  administration?: string;
  frequency?: string;
  abidance?: number;
  freqDetail?: string;
  costs?: number;
  charges?: number;
  decoctingMethod?: string;
  providedIndicator?: number;
  dispensary?: DeptDictEntityUser;
  getdrugFlag?: string;
  prescAttr?: string;
  decoction?: number;
  lsTb?: number;
  lxgbFlag?: number;
  chargeIndicator?: number;
  prescForm?: string;
  prescDiag?: string;
  prescRequrement?: string;
  prescDetail?: string;
  isDel?: number;
  appNo?: number;
  appSubNo?: number;
  dataList?: Array<OrdersCostsEntityPatManageOrders>;
  visitDate?: Date;
  visitNo?: number
}

/**
 * 概览信息
 * Created by 包国强 on 2017/6/8.
 */
export interface OverviewEntityPatManageOverview extends BaseEntity {
  patientVisit?: MhPatientVisitEntitySplit;
  triageRecord?: MhTriageRecordEntitySplit;
  vitalSignRecord?: Array<MhVitalSignRecordEntitySplit>;
  scoreRecordList?: Array<MhScoreRecordEntitySplit>;
  diagnosisList?: Array<DiagnosisEntityPatManageDiagnosis>;
  transferRecList?: Array<TransferRecEntityPatManageTransfer>;
  shiftChangePatientLog?: Array<ShiftChangePatientLogEntityShift>;
  patientAllergy?: Array<PatientAllergyHistoryEntityPatManageAllergy>
}

/**
 * 分诊-生命体征记录表
 * Created by 包国强 on 2017/5/3.
 */
export interface MhVitalSignRecordEntitySplit extends BaseEntity {
  pvId?: number;
  tId?: number;
  recordDate?: Date;
  operator?: number;
  isDel?: number;
  itemId?: VitalSignDictEntitySplitDict;
  itemName?: string;
  itemValue?: string;
  operationDate?: Date
}

/**
 * 生命体征字典表
 * Created by 包国强 on 2017/12/5.
 */
export interface VitalSignDictEntitySplitDict extends BaseEntity {
  classCode?: VitalSignsClassDictEntityPatManageNurseDict;
  vitalCode?: string;
  vitalSigns?: string;
  exceedMaxShowColor?: string;
  exceedMinShowColor?: string;
  unit?: string;
  critical?: string;
  maxSigns?: string;
  minSigns?: string;
  regular?: string;
  triageLevel?: number
}

/**
 * 分诊-评分记录表
 * Created by 包国强 on 2017/5/3.
 */
export interface MhScoreRecordEntitySplit extends BaseEntity {
  tId?: number;
  pvId?: number;
  recordDate?: Date;
  scoreType?: string;
  scoreValue?: number;
  scoreDescription?: string;
  scoreContent?: string;
  operator?: number;
  recordType?: number;
  isDel?: number
}

/**
 * 转科记录表
 * Created by 包国强 on 2017/8/28.
 */
export interface TransferRecEntityPatManageTransfer extends BaseEntity {
  pvId?: number;
  type?: string;
  doctorInCharge?: UserEntityUser;
  nurseInCharge?: UserEntityUser;
  admWardBedLabel?: string;
  dischargeBedLabel?: string;
  admWardAreaId?: AreaDictEntityPatManageTransferDict;
  dischargeAreaId?: AreaDictEntityPatManageTransferDict;
  admWardDeptCode?: DeptDictEntityUser;
  dischargeDeptCode?: DeptDictEntityUser;
  admWardDateTime?: Date;
  dischargeDateTime?: Date;
  admWardNursingClass?: NursingClassDictEntityPatManageTransferDict;
  dischargeNursingClass?: NursingClassDictEntityPatManageTransferDict;
  admWardPatientStatus?: PatientStatusDictEntityPatManageTransferDict;
  dischargePatientStatus?: PatientStatusDictEntityPatManageTransferDict;
  reason?: string;
  memo?: string;
  operator?: UserEntityUser;
  operatorDateTime?: Date;
  isDel?: number
}

/**
 * 急诊护理等级字典表
 * Created by 包国强 on 2017/8/25.
 */
export interface NursingClassDictEntityPatManageTransferDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 急诊病情状态字典
 * Created by 包国强 on 2017/8/25.
 */
export interface PatientStatusDictEntityPatManageTransferDict extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/7
 * 说明:交接班患者信息
 */
export interface ShiftChangePatientLogEntityShift extends BaseEntity {
  shiftChangeId?: ShiftChangeMasterEntityShift;
  deptId?: DeptDictEntityUser;
  areaId?: AreaDictEntityPatManageTransferDict;
  bedLabel?: string;
  nursingClass?: NursingClassDictEntityPatManageTransferDict;
  nurseInCharge?: UserEntityUser;
  doctorInCharge?: UserEntityUser;
  transferContent?: string;
  diagnosis?: string;
  signCollectionTime?: Date;
  temperature?: number;
  pulse?: number;
  breathing?: number;
  createTime?: Date;
  createUserId?: UserEntityUser;
  lastUpdateTime?: Date;
  lastUpdateUserId?: UserEntityUser;
  pvId?: number;
  isDel?: number;
  patientStatus?: PatientStatusDictEntityPatManageTransferDict
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/7
 * 说明:交接班主表
 */
export interface ShiftChangeMasterEntityShift extends BaseEntity {
  areaId?: AreaDictEntityPatManageTransferDict;
  classesId?: SchedulingClassesDictEntityClasses;
  createTime?: Date;
  createUserId?: UserEntityUser;
  classesTimeFrom?: Date;
  classesTimeTo?: Date;
  remarks?: string;
  lastUpdateUserId?: UserEntityUser;
  lastUpdateTime?: Date;
  isDel?: number
}

/**
 * 就诊记录
 * Created by 包国强 on 2017/7/26.
 */
export interface ClinicRecEntityPatManageReport extends BaseEntity {
  /**
   * 
   * 患者信息id
   */
  pvId?: number;
  /**
   * 患者id
   */
  patientId?: string;
  /**
   * 就诊次数
   */
  visitId?: string;
  /**
   * 就诊日期
   */
  visitDate?: Date;
  /**
   * 就诊类别
   */
  visitType?: string;
  /**
   * 就诊科室
   */
  deptName?: string;
  /**
   * 经治医生
   */
  doctorInCharge?: string
}

/**
 * 床位字典表
 * Created by 毛琪 on 2017/5/8.
 */
export interface BedDictEntityPatManageTransferDict extends BaseEntity {
  areaId?: AreaDictEntityPatManageTransferDict;
  areaName?: string;
  bedNo?: number;
  bedLabel?: string;
  bedType?: number;
  roomNo?: string;
  status?: number;
  isDel?: number
}

/**
 * 患者在科表(结算后删除)
 * Created by 包国强 on 2017/8/28.
 */
export interface PatInHouseEntityPatManageTransfer extends BaseEntity {
  pvId?: MhPatientVisitEntitySplit;
  areaId?: AreaDictEntityPatManageTransferDict;
  bedLabel?: string;
  deptCode?: DeptDictEntityUser;
  doctorInCharge?: UserEntityUser;
  nurseInCharge?: UserEntityUser;
  status?: number;
  nursingClass?: NursingClassDictEntityPatManageTransferDict;
  patientStatus?: PatientStatusDictEntityPatManageTransferDict;
  startDateTime?: Date;
  endDateTime?: Date;
  diagnosisCode?: string;
  diagnosisDesc?: string;
  diagnosisDate?: Date;
  admissionDateTime?: Date;
  admWardDateTime?: Date;
  dischargeDateTime?: Date;
  operator?: UserEntityUser;
  reason?: string;
  memo?: string
}

/**
 * 就诊患者信息视图
 * hieip.h_visit_pat_info_view视图
 * Created by 包国强 on 2017/6/21.
 */
export interface VisitPatInfoViewEntityPatManage extends BaseEntity {
  sex?: string;
  name?: string;
  patientId?: string;
  greenRoad?: string;
  age?: string;
  chargeType?: string;
  doctor?: string;
  bedNo?: string;
  actTriageLevel?: string;
  nursingClass?: string;
  diagnosis?: string;
  pvId?: number;
  areaId?: number;
  areaName?: string;
  status?: number
}

/**
 * 质控统计表2
 * Created by 毛琪 on 2017/6/22.
 */
export interface EdrescueEntityQc extends BaseEntity {
  isAmiD2bLessThen90?: number;
  amiD2bMinutes?: number;
  amiStemiBallDt?: Date;
  doAmiStemiBall?: number;
  inAmiStemiBallWindow?: number;
  isAmiD2mLessThen30?: number;
  amiD2mMinutes?: number;
  amiStemiMedicateDt?: Date;
  doAmiStemiMedicate?: number;
  inAmiStemiMedicateWindow?: number;
  amiAspirinDt?: Date;
  amiLdhResultDt?: Date;
  amiLdhApplyDt?: Date;
  amiEkgResultDt?: Date;
  isAmi?: number;
  rescueDidoHour?: number;
  rescueLeaveDt?: Date;
  informedConsentDt?: Date;
  consultationResultDt?: Date;
  consultationArriveDt?: Date;
  consultationApplyDt?: Date;
  rescueEnterDt?: Date;
  arriveDt?: Date;
  diagnosis?: string;
  outcome?: string;
  age?: number;
  gender?: string;
  month?: number;
  year?: number;
  hospitalCode?: string;
  diseaseDt?: Date;
  caseId?: string;
  ratio?: number;
  mednTime?: number;
  timeSum?: number;
  meanTime?: number;
  patientSum?: number
}

/**
 * 质控统计表1
 * Created by 毛琪 on 2017/6/22.
 */
export interface EdstatsEntityQc extends BaseEntity {
  rescue72HReturnNum?: number;
  rescueTransferNum?: number;
  roscSuccessNum?: number;
  roscNum?: number;
  operateDieNum?: number;
  operateNum?: number;
  rescueDieNum?: number;
  rescueNum?: number;
  patientNuml4?: number;
  patientNuml3?: number;
  patientNuml2?: number;
  patientNuml1?: number;
  patientNum?: number;
  nurseNum?: number;
  doctorNum?: number;
  month?: number;
  year?: number;
  hospitalCode?: string
}

/**
 * 质控参考事件表model
 * Created by 毛琪 on 2017/6/30.
 */
export interface QcEventTimeConfigEntityQc extends BaseEntity {
  calcTimeProc?: string;
  eventName?: string;
  isDel?: number
}

/**
 * 质控项目表
 * Created by 毛琪 on 2017/6/28.
 */
export interface QcItemEntityQc extends BaseEntity {
  grade?: string;
  radioFlag?: number;
  serialNo?: number;
  score?: number;
  itemDescribe?: string;
  itemName?: string;
  itemType?: MrFileIndexEntityMedical;
  qcType?: QcQcTypeEntityQc;
  isDel?: number
}

/**
 * 质控类别表
 * Created by 毛琪 on 2017/6/28.
 */
export interface QcQcTypeEntityQc extends BaseEntity {
  qcType?: string
}

/**
 * 质控项Model
 * Created by 毛琪 on 2017/6/29.
 */
export interface QcModelEntityQc extends BaseEntity {
  patientId?: string;
  name?: string;
  sex?: string;
  bedNo?: string;
  triageDate?: Date;
  districtNo?: string;
  status?: string;
  pvId?: string;
  actTriageLevel?: string;
  diagnosis?: string
}

/**
 * 质控项
 * Created by 毛琪 on 2017/6/28.
 */
export interface QcResultEntityQc extends BaseEntity {
  treatMethod?: string;
  conclusion?: string;
  grade?: string;
  scoreDate?: Date;
  operator?: string;
  score?: number;
  totalScore?: number;
  qcType?: number;
  qcClass?: number;
  visitDate?: Date;
  visitId?: string;
  patientId?: string;
  pvId?: string;
  isDel?: number;
  children?: Array<QcResultDetailEntityQc>
}

/**
 * 质控项详细
 * Created by 毛琪 on 2017/6/28.
 */
export interface QcResultDetailEntityQc extends BaseEntity {
  timeDelay?: number;
  qualityStatus?: number;
  reasonComment?: string;
  reasonType?: string;
  qcBuildType?: number;
  memo?: string;
  operatorDate?: Date;
  jeomReason?: string;
  jeomValue?: number;
  itemName?: string;
  itemType?: number;
  qcItemId?: number;
  resultId?: QcResultEntityQc;
  isDel?: number
}

/**
 * 质控统计model
 * Created by 毛琪 on 2017/6/29.
 */
export interface QcStatisModelEntityQc extends BaseEntity {
  quality?: number;
  unquality?: number;
  userName?: string;
  score?: string;
  m?: string;
  num?: number;
  year?: number;
  month?: number;
  reasonType?: string;
  mr1Name?: string
}

/**
 * 病历质控时间表
 * Created by 毛琪 on 2017/6/30.
 */
export interface QcTimeLimitParaEntityQc extends BaseEntity {
  stayInYellow?: number;
  stayInRed?: number;
  itemId?: number;
  isRemind?: number;
  jeomValue?: number;
  isJeom?: number;
  warnUnit?: string;
  warnTime?: number;
  isWarn?: number;
  offsetUnit?: string;
  offsetTime?: number;
  eventName?: string;
  patType?: string;
  mrName?: string;
  mrThemeClass?: number;
  isDel?: number
}

/**
 * 质控不合格原因模板表
 * Created by 毛琪 on 2017/6/28.
 */
export interface QcUnQualifyReasonEntityQc extends BaseEntity {
  reasonComment?: string;
  reasonType?: string
}

/**
 * 改变分诊等级理由
 * Created by Vinsher on 2017/5/2.
 */
export interface ChangeLevelOfTriageEntitySetTriage extends BaseEntity {
  serialNo?: number;
  changeReason?: string;
  operator?: string;
  updateDate?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 绿色通道实体类
 * Created by Vinsher on 2017/4/28.
 */
export interface GreenRoadEntitySetTriage extends BaseEntity {
  serialNo?: number;
  name?: string;
  describe?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 其他分诊实体类
 * Created by Vinsher on 2017/5/2.
 */
export interface OtherEntitySetTriage extends BaseEntity {
  serialNo?: number;
  name?: string;
  describe?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 生命体征评级实体类
 * Created by Vinsher on 2017/5/2.
 */
export interface VitalScoreEntitySetTriage extends BaseEntity {
  code?: string;
  fstExperssion?: string;
  redExperssion?: string;
  yellowExperssion?: string;
  greenExperssion?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/7
 * 说明:交接班项目统计数据
 */
export interface ChangeStatisticsEntityShift extends BaseEntity {
  areaId?: AreaDictEntityPatManageTransferDict;
  statisticsId?: StatisticsItemDictEntityShift;
  value?: number;
  shiftChangeId?: ShiftChangeMasterEntityShift;
  isDel?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/6
 * 说明:统计字典表
 */
export interface StatisticsItemDictEntityShift extends BaseEntity {
  itemCode?: string;
  itemName?: string;
  itemDescription?: string;
  statisticsSql?: string;
  serialNo?: number;
  isDel?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/12/6
 * 说明:配置区域下需要进行统计的项目
 */
export interface StatisticsConfigEntityShift extends BaseEntity {
  areaId?: AreaDictEntityPatManageTransferDict;
  statisticsItemId?: StatisticsItemDictEntityShift;
  serialNo?: number;
  isDel?: number
}

/**
 * Created by 黄倩on 2017/7/18.
 * 急诊交接班关联配置子表类
 */
export interface HandoverConfigDetailEntityShiftChange extends BaseEntity {
  code?: number;
  name?: string;
  isDel?: number;
  configId?: HandoverConfigDetailEntityShiftChange
}

/**
 * Created by 黄倩 on 2017/7/18.
 * 急诊交接班关联配置主表类
 */
export interface HandoverConfigMasterEntityShiftChange extends BaseEntity {
  serialNo?: number;
  code?: number;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number;
  itemCode?: number;
  itemName?: string;
  tableName?: string;
  columnName?: string;
  tableNameDs?: string;
  columnNameDs?: string;
  owner?: string;
  num?: number
}

/**
 * Created by 黄倩on 2017/7/18.
 * 急诊交接班项目字典类
 */
export interface HandoverItemDictEntityShiftChange extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * Created by 黄倩 on 2017/7/18.
 * 急诊交接班记录主表类
 */
export interface HandoverMainEntityShiftChange extends BaseEntity {
  itemCode?: number;
  itemName?: string;
  shiftContent?: string;
  shiftSpecial?: string;
  startDateTime?: Date;
  stopDateTime?: Date;
  updateDateTime?: Date;
  creator?: string;
  isDel?: number;
  shiftId?: number
}

/**
 * Created by 黄倩 on 2017/7/18.
 * 急诊交接班记录子表类
 */
export interface HandoverRecDetailEntityShiftChange extends BaseEntity {
  recId?: number;
  itemCode?: number;
  itemName?: string;
  num?: number;
  isDel?: number
}

/**
 * 医生排班安排职位的字典表
 * Created by 黄倩 on 2017/8/22.
 */
export interface DocpositionShiftDictEntityShiftChangeMineClasses extends BaseEntity {
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 排班安排的明细信息表
 * Created by 黄倩 on 2017/8/22.
 */
export interface DocShiftDetailEntityShiftChangeMineClasses extends BaseEntity {
  creator?: number;
  shift?: number;
  post?: number;
  startDateTime?: Date;
  masterId?: number;
  isDel?: number;
  creatorName?: string;
  shiftName?: string;
  postName?: string
}

/**
 * 排班安排的主表类
 * Created by 黄倩 on 2017/8/22.
 */
export interface DocShiftMasterEntityShiftChangeMineClasses extends BaseEntity {
  startDateTime?: Date;
  stopDateTime?: Date;
  updateDateTime?: Date;
  month?: number;
  week?: string;
  deptCode?: string;
  creator?: number;
  tel?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number;
  creatorName?: string
}

/**
 * 护士繁忙程度
 * Created by 黄倩 on 2017/9/14.
 */
export interface NurBusyExtentEntityShiftChangeMineClasses extends BaseEntity {
  identityName?: string;
  name?: string;
  bedLabel?: string;
  nurseInCharge?: number;
  statusName?: string;
  nursingClassName?: string;
  patientStatusName?: string;
  areaName?: string
}

/**
 * 护士排班中人员负责的工作明细表
 * Created by 黄倩 on 2017/8/22.
 */
export interface NurChargePositionEntityShiftChangeMineClasses extends BaseEntity {
  pvId?: number;
  bedNo?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number;
  nurId?: number
}

/**
 * 护士排班的紧急时间的职位字典表类
 * Created by 黄倩 on 2017/8/22.
 */
export interface NurpositionShiftDictEntityShiftChangeMineClasses extends BaseEntity {
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 护士排班安排的人员明细信息
 * Created by 黄倩 on 2017/8/22.
 */
export interface NurShiftDetailEntityShiftChangeMineClasses extends BaseEntity {
  creator?: number;
  shift?: number;
  post?: number;
  startDateTime?: Date;
  masterId?: number;
  isDel?: number;
  creatorName?: string;
  shiftName?: string;
  postName?: string
}

/**
 * 护士排班的主表类
 * Created by 黄倩 on 2017/8/22.
 */
export interface NurShiftMasterEntityShiftChangeMineClasses extends BaseEntity {
  startDateTime?: Date;
  stopDateTime?: Date;
  updateDateTime?: Date;
  month?: number;
  week?: string;
  deptCode?: string;
  creator?: number;
  tel?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 排班需要的班次划分字典表
 * Created by 黄倩 on 2017/8/22.
 */
export interface ShiftDictEntityShiftChangeMineClasses extends BaseEntity {
  name?: string;
  startDateTime?: string;
  stopDateTime?: string;
  isDel?: number;
  serialNo?: number;
  deptCode?: string;
  deptName?: string
}

/**
 * Created by 黄倩 on 2017/8/23.
 */
export interface UndonePatientEntityShiftChangeMineClasses extends BaseEntity {
  visitId?: string;
  patientId?: string;
  name?: string;
  sex?: number;
  age?: string;
  identityName?: string;
  admissionDateTime?: Date;
  status?: number;
  nursingClass?: number;
  wardCode?: string;
  bedNo?: string;
  deptAdmissionTo?: string;
  deptCode?: string
}

/**
 * 交班患者病情信息
 * Created by 黄倩 on 2017/10/16.
 */
export interface HandoverInllessDescrsptionEntityShiftChangePatientInformation extends BaseEntity {
  patientId?: number;
  type?: string;
  pvId?: number;
  admWardInCharge?: number;
  dischargeInCharge?: number;
  admWardBedLabel?: string;
  dischargeBedLabel?: string;
  admWardDeptCode?: string;
  dischargeDeptCode?: string;
  admWardNursingClass?: number;
  dischargeNursingClass?: number;
  admWardPatientStatus?: number;
  dischargePatientStatus?: number;
  isDel?: number;
  admWardAreaId?: number;
  dischargeAreaId?: number;
  job?: number;
  admChargeName?: string;
  dischargeChargeName?: string;
  admDeptName?: string;
  dischargeDeptName?: string;
  admNursingName?: string;
  dischargeNursingName?: string;
  admPatientName?: string;
  dischargePatientName?: string;
  admAreaName?: string
}

/**
 * Created by 黄倩 on 2017/7/22.
 * 患者病情交接班中的数据采集类
 */
export interface HandoverPatientDatumEntityShiftChangePatientInformation extends BaseEntity {
  heartRate?: string;
  bloodPressure?: string;
  heat?: string;
  liquidIntake?: string;
  comeLiquid?: string;
  inputCode?: string;
  inputCodeWb?: string;
  patientId?: number;
  isDel?: number
}

/**
 * Created by 黄倩 on 2017/7/22.
 * 患者病情交接班记录信息的主表类
 */
export interface HandoverPatientMasterEntityShiftChangePatientInformation extends BaseEntity {
  startDateTime?: Date;
  stopDateTime?: Date;
  isDel?: number;
  itemCode?: number;
  itemName?: string;
  creator?: number;
  patient?: number;
  shiftId?: number
}

/**
 * Created by 黄倩 on 2017/7/22.
 * 患者病情交接班中的交接班事项类
 */
export interface HandoverPatientMatterEntityShiftChangePatientInformation extends BaseEntity {
  shiftContent?: string;
  updateDateTime?: Date;
  shiftTime?: number;
  patientId?: number;
  creator?: string;
  dispostStatus?: number;
  dispostContent?: string;
  dispostCreator?: string;
  isDel?: number
}

/**
 * Created by 黄倩 on 2017/7/22.
 * 患者病情交接班中的病情小节类
 */
export interface HandoverPatientNoduleEntityShiftChangePatientInformation extends BaseEntity {
  shiftContent?: string;
  updateDateTime?: Date;
  patientId?: number;
  creator?: string;
  isDel?: number
}

/**
 * Created by 黄倩 on 2017/7/18.
 * 分诊记录中的患者信息
 */
export interface RecordEntityShiftChangeRecongnize extends BaseEntity {
  bedNo?: string;
  name?: string;
  sex?: number;
  age?: string;
  identity?: string;
  chargeType?: string;
  admWardDateTime?: Date;
  triageTarget?: string;
  dischargeDateTime?: Date;
  diagnosis?: string;
  admissionDateTime?: Date;
  patientStatus?: number;
  status?: number;
  type?: string;
  end_date_time?: Date
}

/**
 * Created by 黄倩 on 2017/10/13.
 */
export interface TransferRecDictEntityShiftChangeRecongnize extends BaseEntity {
  pvId?: number;
  type?: string;
  doctorInCharge?: number;
  nurseInCharge?: number;
  admWardBedLabel?: string;
  dischargeBedLabel?: string
}

/**
 * 查询就诊未完成发患者信息类
 * Created by 黄倩 on 2017/8/17.
 */
export interface UndoneClinicEntityShiftChangeRecongnize extends BaseEntity {
  bedNo?: string;
  pvId?: number;
  patName?: string;
  applyName?: string;
  status?: string;
  docName?: string;
  deptName?: string;
  consultationDept?: number;
  applyDateTime?: Date;
  consultationTime?: Date;
  consultationPurpost?: string;
  receiveTime?: string
}

/**
 * 绿色通道记录
 * Created by 包国强 on 2017/5/31.
 */
export interface GreenRoadRecEntitySplit extends BaseEntity {
  pvId?: number;
  greenRoad?: number;
  isDel?: number
}

/**
 * 自动评分判定依据记录表
 * Created by 包国强 on 2017/5/3.
 */
export interface MhAccordingRecordEntitySplit extends BaseEntity {
  tId?: number;
  pvId?: number;
  recordDate?: Date;
  criterionTypeId?: number;
  criterionMainId?: number;
  criterionItemId?: number;
  operator?: number;
  isDel?: number;
  /**
   * 项目名
   */
  itemDescription?: string;
  /**
   * 等级
   */
  emergencyLevel?: string;
  /**
   * 分类
   */
  typeName?: string
}

/**
 * 分诊-患者分诊信息记录
 * Created by 包国强 on 2017/6/12.
 */
export interface MhPatientVisitModelEntitySplit extends BaseEntity {
  patientId?: string;
  visitId?: number;
  visitDate?: Date;
  visitNo?: number;
  photo?: string;
  name?: string;
  sex?: number;
  dateOfBirth?: Date;
  chargeType?: number;
  identity?: number;
  idNo?: string;
  nation?: number;
  nextOfKinPhone?: string;
  nextOfKin?: string;
  happenDate?: Date;
  mailingAddress?: string;
  registerFrom?: number;
  greenRoad?: string;
  specialSign?: string;
  status?: number;
  registerDate?: Date;
  bulkinjuryId?: number;
  isBackNum?: string;
  bodyHeight?: number;
  bodyWeight?: number;
  hospitalCode?: string;
  deptAdmissionTo?: number;
  admissionDateTime?: Date;
  deptDischargeFrom?: number;
  dischargeDateTime?: Date;
  deptAdmWardDateTo?: number;
  admWardDateTime?: Date;
  doctorInCharge?: number;
  nurseInCharge?: number;
  diagnosis?: string;
  updateSign?: number;
  citizenship?: number;
  settledIndicator?: number;
  isDel?: number;
  namePhonetic?: string;
  unitInContract?: string;
  phoneNumberHome?: string;
  infoSources?: number;
  healthCard?: string;
  insuranceNo?: string;
  bulkinjuryName?: string
}

/**
 * 分诊-分诊所有信息
 * Created by 包国强 on 2017/5/3.
 */
export interface MhSplitEntitySplit extends BaseEntity {
  patientVisit?: MhPatientVisitModelEntitySplit;
  triageRecord?: MhTriageRecordModelEntitySplit;
  vitalSignRecord?: Array<MhVitalSignRecordEntitySplit>;
  scoreRecordList?: Array<MhScoreRecordEntitySplit>;
  accordingRecordList?: Array<MhAccordingRecordEntitySplit>;
  greenRoadRecList?: Array<GreenRoadRecEntitySplit>;
  specialSignRecList?: Array<SpecialSignRecEntitySplit>;
  patientAllergyHistoryList?: Array<PatientAllergyHistoryEntityPatManageAllergy>
}

/**
 * 分诊-分诊记录表
 * Created by 包国强 on 2017/5/3.
 */
export interface MhTriageRecordModelEntitySplit extends BaseEntity {
  pvId?: number;
  triageDate?: Date;
  triageBy?: number;
  triageTarget?: number;
  otherTriageTarget?: number;
  actTriageLevel?: number;
  autoTriageLevel?: number;
  triageMemo?: string;
  hasVitalSign?: number;
  hasScoreRecord?: number;
  hasAccordingRecord?: number;
  startRecordDate?: Date;
  changeLevel?: number;
  crbFlag?: string;
  isDel?: number
}

/**
 * 特殊标识记录
 * Created by 包国强 on 2017/5/31.
 */
export interface SpecialSignRecEntitySplit extends BaseEntity {
  pvId?: number;
  specialSign?: number;
  isDel?: number
}

/**
 * 入科患者实体
 * Created by 毛琪 on 2017/5/8.
 */
export interface PatInHouseEntitySplit extends BaseEntity {
  pvId?: number;
  patientId?: string;
  visitId?: number;
  wardName?: string;
  districtNo?: string;
  bedNo?: number;
  lockBy?: string;
  lockDate?: Date;
  status?: number;
  nursingClass?: string;
  visitDate?: Date;
  admWardDateTime?: Date;
  doctor?: string;
  patName?: string;
  docReceiptDate?: Date;
  isPlanToDept?: string;
  isPop?: string;
  isDel?: number;
  transferReason?: string;
  transferMemo?: string;
  sex?: string;
  age?: string;
  outDeptDate?: Date;
  districtStatus?: string
}

/**
 * 分诊患者列表视图实体
 * Created by 包国强 on 2017/5/26.
 */
export interface TriagePatsViewEntitySplit extends BaseEntity {
  visitNo?: string;
  patientId?: string;
  name?: string;
  sex?: string;
  dateOfBirth?: Date;
  visitDate?: Date;
  triageDuration?: number;
  actTriageLevel?: string;
  triageTarget?: string;
  otherTriageTarget?: string;
  chargeType?: string;
  greenRoad?: string;
  specialSign?: string;
  bulkinjuryId?: string;
  triageBy?: string;
  hasVitalSign?: number;
  isBackNum?: string;
  triageDate?: Date;
  triageDateStart?: Date;
  triageDateEnd?: Date;
  identity?: string;
  pvId?: number;
  tId?: number;
  criterionMainId?: number;
  criterionItemId?: number
}

/**
 * 分诊数据统计综合报表
 * Created by 包国强 on 2017/5/20.
 */
export interface SplitReportEntityStatisticsSplit extends BaseEntity {
  triageReport?: TriageReportEntityStatisticsSplit;
  triageSexReportList?: Array<TriageSexReportEntityStatisticsSplit>;
  triageDeptReportList?: Array<TriageDeptReportEntityStatisticsSplit>;
  triageCommReportList?: Array<TriageCommReportEntityStatisticsSplit>;
  triageAgeReportList?: Array<TriageAgeReportEntityStatisticsSplit>
}

/**
 * 分诊数据统计报表h_triage_report
 * Created by 包国强 on 2017/5/20.
 */
export interface TriageReportEntityStatisticsSplit extends BaseEntity {
  triageNum?: number;
  triageRedFirstNum?: number;
  triageRedSecondNum?: number;
  triageYellowNum?: number;
  triageGreenNum?: number;
  sexBoyNum?: number;
  sexGirlNum?: number;
  sexUnknownNum?: number;
  scoreVitalSignsNum?: number;
  scoreAccordingNum?: number;
  scoreRecNum?: number;
  changeLveNum?: number;
  triageDate?: Date
}

/**
 * 患者性别比例分布-图表明细h_triage_sex_report
 * Created by 包国强 on 2017/5/20.
 */
export interface TriageSexReportEntityStatisticsSplit extends BaseEntity {
  triageDate?: Date;
  name?: string;
  sex?: string;
  dateOfBirth?: string
}

/**
 * 分诊科室分布统计h_triage_dept_report
 * Created by 包国强 on 2017/5/20.
 */
export interface TriageDeptReportEntityStatisticsSplit extends BaseEntity {
  triageDate?: Date;
  deptName?: string;
  doctor?: string;
  triageNum?: string
}

/**
 * 患者性别比例分布-图表明细
 * Created by 包国强 on 2017/5/20.
 */
export interface TriageCommReportEntityStatisticsSplit extends BaseEntity {
  triageDate?: Date;
  itemName?: string;
  itemNum?: string;
  itemType?: string
}

/**
 * 患者性别比例分布-图表明细h_triage_sex_report
 * Created by 包国强 on 2017/5/20.
 */
export interface TriageAgeReportEntityStatisticsSplit extends BaseEntity {
  sex?: string;
  age05?: number;
  age514?: number;
  age1529?: number;
  age3044?: number;
  age4559?: number;
  age6074?: number;
  age7584?: number;
  age85?: number
}

/**
 * 统计视图model
 * Created by 毛琪 on 2017/6/21.
 */
export interface VisitPatsViewEntityStatisticsView extends BaseEntity {
  transferTo?: string;
  transferDate?: Date;
  diagnosisDate?: Date;
  doctor?: string;
  docReceipDate?: Date;
  triageBy?: string;
  triageDate?: Date;
  chargeType?: string;
  visitDate?: Date;
  diagnosis?: string;
  identity?: string;
  greenRoad?: string;
  status?: string;
  dateOfBirth?: Date;
  sex?: string;
  name?: string;
  visitId?: number;
  patientId?: string
}

/**
 * 科室
 * Created by 毛琪 on 2017/4/25.
 */
export interface DepartmentEntityUser extends BaseEntity {
  inputCode?: string;
  text?: string;
  code?: string;
  parentId?: number;
  order?: number;
  boo?: boolean;
  children?: Array<DepartmentEntityUser>
}

/**
 * 群伤类型实体
 * Created by 毛琪 on 2017/5/2.
 */
export interface InjuryTypeEntityUser extends BaseEntity {
  name?: string;
  serialNo?: number;
  describe?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 内容摘要 ：菜单
 * 创建人　 ：陈佳慧
 * 创建日期 ：2017/4/12
 */
export interface MenuEntityUser extends ChildrenEntity {
  text?: string;
  code?: string;
  inputCode?: string;
  order?: number;
  boo?: boolean;
  isDel?: number
}

/**
 * 来院方式
 * Created by 毛琪 on 2017/4/28.
 */
export interface RegFromEntityUser extends BaseEntity {
  name?: string;
  description?: string;
  serialNo?: number;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 科室临床属性字典
 * Created by 黄倩 on 2017/9/4.
 */
export interface DeptClinicAttrDictEntityUserSysDept extends BaseEntity {
  serialNo?: number;
  code?: number;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊科室内外科属性字典
 * Created by 黄倩 on 2017/9/4.
 */
export interface DeptIsAttrDictEntityUserSysDept extends BaseEntity {
  serialNo?: number;
  code?: number;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 急诊科室门诊住院属性字典
 * Created by 黄倩 on 2017/9/4.
 */
export interface DeptOiAttrDictEntityUserSysDept extends BaseEntity {
  serialNo?: number;
  code?: number;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 注射类型中的注射方法配置的字典信息
 * Created by 黄倩 on 2017/9/25.
 */
export interface NursingInoutItemDictEntityUserSysNursing extends BaseEntity {
  inoutId?: number;
  pathwayId?: number;
  pathwayName?: string;
  serialNo?: number;
  isDel?: number;
  inoutType?: string
}

/**
 * 工作类别
 * Created by 黄倩 on 2017/9/14.
 */
export interface JobClassDictEntityUserSysStaff extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 技术职务字典
 * Created by bgq on 2017/9/14.
 */
export interface TitleDictEntityUserSysStaff extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 病情状况
 * Created by 毛琪 on 2017/5/3.
 */
export interface ChangeReasonEntityUserSysTriage extends BaseEntity {
  serialNo?: number;
  changeReason?: string;
  operator?: string;
  updateDate?: Date;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 费别
 * Created by 毛琪 on 2017/5/3.
 */
export interface ChargeTypeEntityUserSysTriage extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCodeWb?: string;
  inputCode?: string
}

/**
 * 分诊-身份
 * Created by 毛琪 on 2017/5/3.
 */
export interface IdentityEntityUserSysTriage extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 系统参数-判定依据
 * Created by 毛琪 on 2017/5/8.
 */
export interface MhCriterionItemEntityUserSysTriage extends BaseEntity {
  inputCodeWb?: string;
  inputCode?: string;
  mainId?: string;
  emergencyLevel?: number;
  serialNo?: number;
  itemDescription?: string;
  itemType?: number;
  expression?: string;
  isDeleted?: string;
  pinyinCode?: string;
  frequency?: number;
  test?: string;
  isDel?: number;
  mhCriterionMain?: MhCriterionMainEntityUserSysTriage
}

/**
 * 系统参数-主诉
 * Created by 毛琪 on 2017/5/8.
 */
export interface MhCriterionMainEntityUserSysTriage extends BaseEntity {
  inputCodeWb?: string;
  itemDescription?: string;
  test?: string;
  isDel?: number;
  inputCode?: string;
  typeId?: number;
  emergencyLevel?: number;
  serialNo?: number;
  itemType?: number;
  scoreId?: string;
  isDeleted?: string;
  pinyinCode?: string;
  frequency?: number;
  mhCriterionType?: MhCriterionTypeEntityUserSysTriage
}

/**
 * 系统参数-分类
 * Created by 毛琪 on 2017/5/8.
 */
export interface MhCriterionTypeEntityUserSysTriage extends BaseEntity {
  inputCode?: string;
  inputCodeWb?: string;
  groupName?: string;
  additionalScore?: number;
  serialNo?: number;
  isGreenroad?: string;
  isDeleted?: string;
  categoryType?: number;
  pinyinCode?: string;
  direction?: string;
  frequency?: number;
  test?: string;
  isDel?: number
}

/**
 * 系统参数-病人评分
 * Created by 毛琪 on 2017/5/8.
 */
export interface MhScoreTypeEntityUserSysTriage extends BaseEntity {
  code?: string;
  name?: string;
  type?: string;
  serialNo?: number;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * 民族
 * Created by 毛琪 on 2017/5/3.
 */
export interface NationEntityUserSysTriage extends BaseEntity {
  serialNo?: number;
  code?: string;
  name?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 分诊去向实体
 * Created by 毛琪 on 2017/5/2.
 */
export interface TriageTargetEntityUser extends BaseEntity {
  code?: string;
  serialNo?: number;
  name?: string;
  description?: string;
  inputCode?: string;
  inputCodeWb?: string;
  isDel?: number
}

/**
 * Created by 黄倩 on 2017/8/5.
 * 医生工作量统计
 */
export interface DoctorWorkEntityWorkAmount extends BaseEntity {
  dname?: string;
  name?: string;
  count?: number;
  count1?: number;
  job?: string
}
