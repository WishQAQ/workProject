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
 * 控件实体类
 * Created by 王盛光  on 2017/9/4.
 */
export interface ControllerDtoController {
  descName?: string;
  id?: string;
  value?: string;
  children?: Array<ControllerDtoController>
}

/**
 * 关键词病区
 * Created by 王盛光  on 2017/8/14.
 */
export interface DeptCruxModelDtoCrux extends BaseEntity {
  deptCode?: string;
  deptName?: string;
  count?: number
}

/**
 * 关键词模型
 * Created by 王盛光  on 2017/8/18.
 */
export interface MrCruxModelDtoCrux extends MrCruxEntityCrux {
  typeName?: string;
  hospitalName?: string;
  deptName?: string;
  creatorName?: string;
  lastName?: string;
  cruxTypeName?: string
}

/**
 * 关键词
 * 创建人：王盛光
 * 创建人：2017/8/14.
 */
export interface MrCruxEntityCrux extends BaseEntity {
  name?: string;
  type?: number;
  deptCode?: string;
  hospitalNo?: string;
  createTime?: Date;
  createUserId?: string;
  lastModifyDateTime?: Date;
  lastModifyUserId?: string;
  cruxTypeCode?: string;
  content?: string
}

/**
 * 关键词分类model
 * Created by 王盛光  on 2017/8/15.
 */
export interface MrCruxTypeModelDtoCrux extends MrCruxTypeEntityCrux {
  count?: number
}

/**
 * 关键词类型表
 * Created by 王盛光
 * on 2017/8/14.
 */
export interface MrCruxTypeEntityCrux extends BaseEntity {
  cruxCode?: string;
  cruxName?: string;
  hospitalNo?: string;
  createTime?: Date;
  createUserId?: string
}

/**
 * 值域 model
 * Created by 李潇潇  on 2018-1-3.
 */
export interface BdCvIndexModelDtoDataSet extends BdCvIndexEntityDataSet {
  /**
   * 引用数
   */
  cvNumber?: number;
  cvEnabledName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/26
 * 说明:值域字典表
 */
export interface BdCvIndexEntityDataSet extends BaseEntity {
  cvName?: string;
  /**
   * 启用状态(0未启用，1是启用)
   */
  cvEnabled?: number;
  /**
   *  版本号
   */
  cvVersion?: number;
  /**
   *  操作人ID
   */
  cvOperatorId?: string;
  /**
   *  操作时间
   */
  cvOperateTime?: Date;
  /**
   * 简拼码
   */
  pym?: string;
  wbm?: string
}

export interface BdCvItemsModelDtoDataSet extends BdCvItemsEntityDataSet {
  cvOperatorName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/26
 * 说明:值域项目字典表
 */
export interface BdCvItemsEntityDataSet extends BaseEntity {
  bdCvItemsId?: BdCvItemsIdEntityDataSet;
  cvValueText?: string;
  cvMemo?: string;
  cvCalculatedValue?: number;
  cvVersion?: number;
  cvGroupIdentifier?: number;
  cvOperatorId?: string;
  cvOperateTime?: Date;
  pym?: string;
  wbm?: string;
  fieldOrder?: string;
  cvId?: string;
  cvValue?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/26
 * 说明: 值域版本对应表id
 */
export interface BdCvItemsIdEntityDataSet {
  cvId?: string;
  cvValue?: string
}

/**
 * 值域版本model
 * Created by 王盛光  on 2017/7/28.
 */
export interface BdCvVersionsModelDtoDataSet extends BdCvVersionsEntityDataSet {
  bdCvItemsList?: Array<BdCvItemsEntityDataSet>;
  cvPublisherName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/26
 * 说明:值域版本对应
 */
export interface BdCvVersionsEntityDataSet extends BaseEntity {
  cvId?: string;
  cvVersion?: number;
  cvPublisherId?: string;
  cvPublishTime?: Date;
  cvOperatorId?: string;
  cvOperateTime?: Date
}

export interface BdDeIndexModelDtoDataSet extends BdDeIndexEntityDataSet {
  /**
   * 值域名称
   */
  cvName?: string;
  /**
   * 控件类型
   */
  controlTypeName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/22
 * 说明: 数据元索引表
 */
export interface BdDeIndexEntityDataSet extends BaseEntity {
  deName?: string;
  deMemo?: string;
  deType?: string;
  deCvId?: string;
  deFormat?: string;
  deOperatorId?: string;
  deOperateTime?: Date;
  pym?: string;
  wbm?: string;
  controlType?: string;
  isMax?: number;
  isMin?: number;
  maxValue?: string;
  minValue?: string;
  isUpdateConten?: number
}

export interface BdDeIndexModleDtoDataSet extends BdDeIndexEntityDataSet {
  dsRepeatCount?: number
}

export interface BdDsIndexModelDtoDataSet extends BdDsIndexEntityDataSet {
  referencs?: number;
  dsDgType?: string;
  dsId?: string
}

/**
 * 数据集索引
 * Created by 王盛光  on 2017/7/26.
 */
export interface BdDsIndexEntityDataSet extends BaseEntity {
  dsName?: string;
  dsCurrentVersion?: number;
  dsOperatorId?: string;
  dsOperateTime?: Date;
  pym?: string;
  wbm?: string
}

/**
 * 数据集版本模型
 * Created by 王盛光  on 2017/7/27.
 */
export interface BdDsVersionsModelDtoDataSet extends BdDsVersionsEntityDataSet {
  bdDsVsDes?: Array<BdDsVsDeEntityDataSet>;
  /**
   * 操作人名称
   */
  dsOperatorName?: string
}

/**
 * 数据集数据组/元 中间表
 * Created by 王盛光  on 2017/7/27.
 */
export interface BdDsVsDeEntityDataSet extends BaseEntity {
  dsId?: string;
  dsVersion?: number;
  dsDeCode?: string;
  dsDgType?: number;
  dsRepeatCount?: number;
  dsOperatorId?: string;
  dsOperateTime?: Date
}

/**
 * 数据集版本
 * Created by 王盛光
 * on 2017/7/26.
 */
export interface BdDsVersionsEntityDataSet extends BaseEntity {
  dsVersion?: number;
  dsPublisherId?: string;
  dsPubblishTime?: Date;
  dsOperatorId?: string;
  dsOperateTime?: Date
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/5
 * 说明: 固定值查询sql 提供的查询条件
 */
export interface BdFixedIndexSeleteModelDtoDataSet extends BaseEntity {
  patientId?: string;
  visitId?: number;
  wardCode?: string;
  deptCode?: string;
  bedNo?: number;
  admWardDateTime?: Date;
  diagnosis?: string;
  patientCondition?: string;
  nursingClass?: string;
  doctorInCharge?: string;
  isNewborn?: number;
  inpNo?: string;
  name?: string;
  idNo?: string;
  chargeType?: string;
  healthCard?: string;
  dateOfBirth?: Date;
  nurseInCharge?: string;
  deptAdmissionTo?: string;
  admissionDateTime?: Date;
  deptDischargeFrom?: string;
  dischargeDateTime?: Date;
  occupation?: string;
  maritalStatus?: string;
  identity?: string;
  armedServices?: string;
  duty?: string;
  topUnit?: string;
  serviceSystemIndicator?: string;
  medicalHao?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/5
 * 说明:
 */
export interface BdFixedItemsModelDtoDataSet extends BdFixedItemsEntityDataSet {
  value?: any;
  dsName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/27
 * 说明:固定值域选项
 */
export interface BdFixedItemsEntityDataSet extends BaseEntity {
  fixedId?: number;
  name?: string;
  dsId?: string;
  example?: string;
  fieldName?: string;
  code?: string
}

/**
 * 行政地区字典
 */
export interface AreaDictDtoDict extends BaseEntity {
  serialNo?: string;
  areaCode?: string;
  areaName?: string;
  inputCode?: string;
  inputCodeWb?: string;
  addressName?: string;
  /**
   * 输入吗
   */
  inputCodePy?: string
}

/**
 * 国籍字典表
 */
export interface CountryDictDtoDict extends BaseEntity {
  serialNo?: string;
  /**
   * 国籍编码
   */
  countryCode?: string;
  /**
   * 国籍名称
   */
  countryName?: string;
  /**
   * 输入编码
   */
  inputCode?: string;
  inputCodeWb?: string
}

export interface DeptDictModelDtoDict extends DeptDictEntityDict {
  counts?: number
}

/**
 * 科室字典表
 * 创建人：谢小慧
 */
export interface DeptDictEntityDict extends BaseEntity {
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

/**
 * 民族字典表
 */
export interface NationDictDtoDict extends BaseEntity {
  serialNo?: string;
  nationCode?: string;
  nationName?: string;
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 职业字典信息
 */
export interface OccupationDictDtoDict extends BaseEntity {
  serialNo?: string;
  /**
   * 职业编码
   */
  occupationCode?: string;
  /**
   * 职业名称
   */
  occupationName?: string;
  inputCode?: string
}

/**
 * 联系人关系字典表
 */
export interface RelationshipDictDtoDict extends BaseEntity {
  serialNo?: string;
  relationshipCode?: string;
  relationshipName?: string;
  inputCode?: string
}

export interface TableDictModelDtoDict extends BaseEntity {
  columnName?: string;
  valuess?: boolean
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控整改通知的主记录表的新增字段
 */
export interface MrRectificationIndexModelDtoLinkQuality extends MrRectificationIndexEntityLinkQuality {
  patName?: string;
  userName?: string;
  deptName?: string;
  /**
   * 主记录整改期限
   */
  time?: string;
  /**
   * 明细记录整改期限
   */
  itemTime?: string;
  levelName?: string;
  statusName?: string;
  counts?: number;
  /**
   *    private MrRectificationIndex mrRectificationIndex
   * 
   */
  mrRectificationItems?: Array<MrRectificationItemEntityLinkQuality>
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控整改通知的明细表
 */
export interface MrRectificationItemEntityLinkQuality extends BaseEntity {
  gradingClassCode?: string;
  gradingItemCode?: string;
  gradingItemName?: string;
  gradingItemScore?: number;
  gradingItemStandard?: string;
  errorNumbers?: number;
  errorTotalScore?: number;
  finishedUserId?: string;
  finishedDateTime?: Date;
  finishedMark?: string;
  qcConfirmUserId?: string;
  qcConfirmDateTime?: Date;
  qcConfirmMark?: string;
  errorScoreFlag?: number;
  rectificationItemNo?: number;
  hospitalNo?: string;
  isDelete?: number;
  rectificationMasterId?: string;
  qcUserId?: string;
  qcDateTime?: Date;
  qcMark?: string;
  status?: number;
  gradingClassName?: string;
  rectificationDeadline?: Date;
  mrContent?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控整改通知的主记录表
 */
export interface MrRectificationIndexEntityLinkQuality extends BaseEntity {
  patientId?: string;
  visitId?: number;
  hospitalNo?: string;
  rectificationDateTime?: Date;
  qcUserId?: number;
  qcUserName?: string;
  qcDeptCode?: string;
  qcDeptName?: string;
  receiveUserId?: number;
  receiveDeptCode?: string;
  rectificationStatus?: number;
  rectificationLevel?: number;
  mrScore?: number;
  qcMark?: string;
  rectificationDeadline?: Date;
  fileVisitType?: number;
  clinicType?: number;
  isNoProblem?: number;
  fileId?: string
}

export interface MrRectificationItemModelDtoLinkQuality extends MrRectificationItemEntityLinkQuality {
  counts?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控患者的实体类
 */
export interface PatMasterInfoModelDtoLinkQuality extends BaseEntity {
  patientId?: string;
  visitId?: number;
  inpNo?: string;
  name?: string;
  sex?: string;
  identity?: string;
  chargeType?: string;
  deptName?: string;
  admissionDateTime?: Date;
  insuranceNo?: string;
  healthCard?: string;
  diagnosis?: string;
  age?: string;
  doctorOfControlQuality?: string;
  nurseOfControlQuality?: string;
  dateOfControlQuality?: Date;
  dischargeDateTime?: Date;
  deptCode?: string;
  doctorInCharge?: string;
  counts?: number;
  operation?: number;
  illness?: number;
  blood?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控整改通知的明细表的model
 */
export interface RectificationItemModelDtoLinkQuality extends BaseEntity {
  fileId?: string;
  /**
   * 病历名称
   */
  fileName?: string;
  gradingClassCode?: string;
  gradingItemCode?: string;
  gradingItemName?: string;
  gradingItemScore?: number;
  gradingItemStandard?: string;
  errorNumbers?: number;
  errorTotalScore?: number;
  finishedUserId?: number;
  finishedDateTime?: Date;
  finishedMark?: string;
  qcConfirmUserId?: number;
  qcConfirmDateTime?: Date;
  qcConfirmMark?: string;
  errorScoreFlag?: number;
  rectificationItemNo?: number;
  hospitalNo?: string;
  isDelete?: number;
  rectificationMasterId?: string;
  statusName?: string;
  status?: number;
  qcUserId?: string;
  qcDateTime?: Date;
  qcMark?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:整改通知返修记录的model
 */
export interface RectificationRepairitModelDtoLinkQuality extends BaseEntity {
  rectificationDateTime?: Date;
  receiveUserId?: number;
  gradingItemName?: string;
  mrContent?: string;
  userName?: string
}

/**
 * 自动质控项目model
 * Created by 王盛光  on 2017/8/11.
 */
export interface QcMrMonitorItemsModelDtoMonitor extends QcMrMonitorItemsEntityMonitor {
  /**
   * 科室名称
   */
  deptName?: string;
  /**
   * 病案评分
   */
  scoreItemName?: string
}

/**
 * 自动质控项实体
 * Created by 王盛光  on 2017/7/29.
 */
export interface QcMrMonitorItemsEntityMonitor extends BaseEntity {
  monitorItemName?: string;
  monitorLimit?: number;
  scoreItemId?: string;
  monitorType?: number;
  monitorIntervalDays?: number;
  doctOrNurseFlag?: number;
  mulTimeFlag?: number;
  deptCode?: string;
  hospitalId?: string
}

/**
 * 质控关联事件，医嘱model
 * Created by 王盛光  on 2017/7/31.
 */
export interface QcMrMonitorVsEventModelDtoMonitor extends QcMrMonitorVsEventEntityMonitor {
  qcMrMonitorEventDict?: QcMrMonitorEventDictEntityMonitor;
  cdrContrastOrderItemDict?: CdrContrastOrderItemDictEntityOrder;
  mrStatusDict?: MrStatusDictEntityDict
}

/**
 * 事件字典实体
 * Created by 王盛光
 * on 2017/7/29.
 */
export interface QcMrMonitorEventDictEntityMonitor extends BaseEntity {
  eventName?: string;
  pym?: string;
  wbm?: string;
  eventInterface?: string;
  eventCode?: string
}

/**
 * 医嘱数据元对照表实体
 * Created by 王盛光  on 2017/7/31.
 */
export interface CdrContrastOrderItemDictEntityOrder extends BaseEntity {
  orderClass?: string;
  orderCode?: string;
  orderName?: string;
  pym?: string;
  deCode?: string;
  hospitalNo?: string
}

/**
 * 病历状态字典表
 * Created by 王盛光
 * on 2017/8/15.
 */
export interface MrStatusDictEntityDict extends BaseEntity {
  status?: string
}

/**
 * 自动质控对照触发事件实体
 * Created by 王盛光  on 2017/7/29.
 */
export interface QcMrMonitorVsEventEntityMonitor extends BaseEntity {
  monitorItemId?: string;
  hospitalNo?: string;
  monitorAction?: number;
  eventAction?: number;
  eventId?: string;
  monitorType?: number;
  createDateTime?: Date
}

/**
 * 质控关联事件
 *
 * @author bgq
 */
export interface QcMrMonitorVsEventModel2DtoMonitor extends QcMrMonitorVsEventEntityMonitor {
  monitorItemName?: string;
  monitorActionName?: string;
  eventActionName?: string;
  eventName?: string;
  monitorTypeName?: string
}

export interface OrdersDtoOak extends BaseEntity {
  patientId?: string;
  visitId?: string;
  orderNo?: string;
  orderSubNo?: string;
  repeatIndicator?: string;
  orderClass?: string;
  orderText?: string;
  orderCode?: string;
  dosage?: string;
  dosageUnits?: string;
  administration?: string;
  duration?: string;
  durationUnits?: string;
  startDateTime?: Date;
  stopDateTime?: Date;
  frequency?: string;
  freqCounter?: string;
  freqInterval?: string;
  freqIntervalUnit?: string;
  freqDetail?: string;
  performSchedule?: string;
  performResult?: string;
  orderingDept?: string;
  doctor?: string;
  stopDoctor?: string;
  nurse?: string;
  stopNurse?: string;
  enterDateTime?: Date;
  stopOrderDateTime?: Date;
  orderStatus?: string;
  drugBillingAttr?: string;
  billingAttr?: string;
  lastPerformDateTime?: Date;
  lastAcctingDateTime?: Date;
  currentPrescNo?: string;
  doctorUser?: string;
  verifyDataTime?: Date;
  orderPrintIndicator?: string;
  processingDateTime?: Date;
  processingNurse?: string;
  stopProcessingNurse?: string;
  stopProcessingDateTime?: Date;
  cancelDateTime?: Date;
  cancelDoctor?: string;
  degree?: string;
  appNo?: string;
  isAdjust?: string;
  conversionDateTime?: Date;
  continueOrderNo?: string;
  stopFlag?: string;
  adaptSymptomIndicate?: string;
  commitDateTime?: Date;
  abateFlag?: string
}

export interface PatsInHospitalDtoOak extends BaseEntity {
  patientId?: string;
  visitId?: string;
  wardCode?: string;
  deptCode?: string;
  bedNo?: string;
  admissionDateTime?: Date;
  admWardDateTime?: Date;
  diagnosis?: string;
  patientCondition?: string;
  nursingClass?: string;
  doctorInCharge?: string;
  operatingDate?: Date;
  billingDateTime?: Date;
  prepayments?: string;
  totalCosts?: string;
  totalCharges?: string;
  guarantor?: string;
  guarantorOrg?: string;
  guarantorPhoneNum?: string;
  billCheckedDateTime?: Date;
  settledIndicator?: string;
  lendBedNo?: string;
  bedDeptCode?: string;
  bedWardCode?: string;
  deptCodeLend?: string;
  lendIndicator?: string;
  isNewborn?: number;
  updateTime?: Date;
  hspCode?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/10/11
 * 说明:
 */
export interface AuxiliaryProjectDtoPatient extends BaseEntity {
  type?: string;
  name?: string;
  units?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/14
 * 说明:患者病案首页诊断信息
 */
export interface DiagnosisModelDtoPatient extends BaseEntity {
  /**
   * 患者id
   */
  patientId?: string;
  /**
   * 患者住院表示
   */
  visitId?: string;
  /**
   * 诊断类型
   */
  diagnosisType?: string;
  /**
   * 诊断序号
   */
  diagnosisNo?: number;
  /**
   * 诊断名称
   */
  diagnosisDesc?: string;
  /**
   * 诊断时间
   */
  diagnosisDate?: Date;
  treatDays?: string;
  /**
   * 治疗结果
   */
  treatResult?: string;
  operTreatIndicator?: string;
  /**
   * 诊断编码
   */
  diagnosisCode?: string;
  /**
   * 介入
   */
  insertIndicator?: string;
  infection?: string;
  dischargeConditions?: string;
  /**
   * 入院病情
   */
  operTreatIndicator1?: string;
  /**
   * 传染标志默认0  1为传染
   */
  contagious?: string;
  operationPartInfect?: string;
  /**
   * 发生医院感染（是、否）
   */
  infectIndicator?: string;
  admissionConditions?: string;
  /**
   * 中西医标识  1: 西医  0  中医
   */
  diagnosisFlag?: string;
  /**
   * 主要诊断标志 1为主要诊断
   */
  isMainDiagnosis?: string;
  /**
   *  出院情况
   */
  treatResult1?: string;
  /**
   *  1:初步诊断 2:补充诊断 3:修正诊断    0 or null 不显示在病历里面
   */
  diagnosisOtherType?: string;
  /**
   *  下诊断医师的id
   */
  diagnosticianId?: string;
  /**
   * 最后修改时间
   */
  lastModifyDate?: Date;
  /**
   * 修正医师
   */
  modifierId?: string;
  /**
   *  诊断备注
   */
  diagnosisNote?: string;
  /**
   *  诊断类别名称
   */
  diagnosisTypeName?: string;
  /**
   *  1 确诊诊断 0 待诊诊断
   */
  confirmedIndicator?: string;
  /**
   * 子诊断序列
   */
  diagnosisSubNo?: number;
  diagnosisName?: string;
  /**
   * 类型
   */
  type?: string;
  /**
   * 病理号
   */
  pathologicalNo?: string;
  counts?: number;
  otherTypeName?: string;
  diagnosisFlagName?: string;
  diagnosisFlagDesc?: string
}

export interface KVDtoPatient {
  
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/14
 * 说明: 病案首页信息model
 */
export interface MrModelDtoPatient extends BaseEntity {
  /**
   * 病案号
   */
  medicalHao?: string;
  /**
   * 床位,PATS_IN_HOSPITAL
   */
  bedNo?: number;
  /**
   * 所在科室代码(科室(病区)),PATS_IN_HOSPITAL
   */
  deptCode?: string;
  /**
   * 入院病室
   */
  adtRoomNo?: string;
  /**
   * 出院病室
   */
  ddtRoomNo?: string;
  /**
   * 所在科室代码(科室(护理单元)),用于查询患者,PATS_IN_HOSPITAL
   */
  wardCode?: string;
  /**
   * 所在科室代码(科室(病区)),PATS_IN_HOSPITAL
   */
  deptName?: string;
  /**
   * 病人标识
   */
  patientId?: string;
  /**
   * 住院号,PAT_MASTER_INDEX
   */
  inpNo?: string;
  /**
   * 性别,PAT_MASTER_INDEX
   */
  sex?: string;
  /**
   * 年龄,sql根据　PAT_MASTER_INDEX.date_ofBirth　获取年龄
   */
  age?: string;
  /**
   * PAT_MASTER_INDEX.date_ofBirth
   */
  dateOfBirth?: Date;
  /**
   * 费别
   */
  serviceSystemIndicator?: string;
  /**
   * 姓名,PAT_MASTER_INDEX
   */
  name?: string;
  /**
   * 余额，仅用于前台显示
   */
  balance?: number;
  /**
   * 预交金余额,PATS_IN_HOSPITAL
   */
  prepayments?: number;
  /**
   * 优惠后未结费用(累计费用),PATS_IN_HOSPITAL
   */
  totalCharges?: number;
  /**
   * 病人本次住院标识,别名：住院次数
   */
  visitId?: number;
  /**
   * 入院科室
   */
  deptAdmissionTo?: string;
  /**
   * 入院日期及时间
   */
  admissionDateTime?: Date;
  /**
   * 入科日期及时间,PATS_IN_HOSPITAL
   */
  admWardDateTime?: Date;
  /**
   * 出院科室
   */
  deptDischargeFrom?: string;
  /**
   * 出院日期及时间
   */
  dischargeDateTime?: Date;
  /**
   * 国籍
   */
  citizenship?: string;
  /**
   * 新生儿出生体重
   */
  babyBirthWeight?: number;
  /**
   * 年龄不足一周岁
   */
  babyAgeDay?: string;
  /**
   * 医疗付费方式
   */
  chargeTypeEmr?: string;
  /**
   * 新生儿入院体重
   */
  babyAdminWeight?: number;
  /**
   * 出生地
   */
  birthPlace?: string;
  /**
   * 医保类别
   */
  chargeType?: string;
  /**
   * 医保卡号
   */
  insuranceNo?: string;
  /**
   * 籍贯
   */
  jiguan?: string;
  /**
   * 民族
   */
  nation?: string;
  /**
   * 民族
   */
  nationName?: string;
  /**
   * 身份证号
   */
  idNo?: string;
  /**
   * 电话
   */
  homeTel?: string;
  /**
   * 第2邮编
   */
  homeZip?: string;
  /**
   * 第3邮编
   */
  workZip?: string;
  /**
   * 工作单位及地址
   */
  workTel?: string;
  /**
   * 入院方式,途径
   */
  patientClass?: string;
  /**
   * 入院天数
   */
  ryts?: number;
  relationship?: string;
  /**
   * 过敏药物,过敏药物名称，正文描述，可为多项，若没有，则为空
   */
  alergyDrugs?: string;
  isAlergyDrugs?: string;
  /**
   * 尸检标识,别名：尸检与否1-尸检 0-否,根据　卫生部新《住院病案首页》陈家桥医院.doc 文档.住院病案首页项目修订说明.第十四条，尸检 修订为：死亡患者尸检
   */
  autopsyIndicatorName?: string;
  /**
   * 血型,由病房入出转子系统填入。使用规范名称, 见血型字典 BLOODTYPEDICT,his首页中，有其它数据：BX-不详
   * WC-未查
   */
  bloodType?: string;
  /**
   * Rh血型,取值：+:+,-:-,3:不详,4:不查
   */
  bloodTypeRh?: string;
  /**
   *  科主任,his存储中文
   */
  director?: string;
  chiefDoctor?: string;
  attendingDoctor?: string;
  /**
   * 经治医师
   */
  doctorInCharge?: string;
  /**
   * 责任护士
   */
  liabilityNurse?: string;
  advancedStudiesDoctor?: string;
  practiceDoctorOfGraduate?: string;
  /**
   * 编码员
   */
  cataloger?: string;
  mrQuality?: string;
  doctorOfControlQuality?: string;
  /**
   * 质控医生
   */
  nurseOfControlQuality?: string;
  dateOfControlQuality?: Date;
  dischargeDisposition?: string;
  zymcSq?: string;
  zryjh?: string;
  /**
   * 目的
   */
  zymd?: string;
  /**
   * 昏迷时间（颅脑操作患者）:入院后 天
   */
  firstComaDay?: string;
  firstComaHour?: number;
  firstComaMinute?: number;
  backComaDay?: string;
  /**
   * 小时
   */
  backComaHour?: number;
  /**
   * 分
   */
  backComaMinute?: number;
  emerTreatTimes?: number;
  escEmerTimes?: number;
  inandout?: string;
  /**
   * 现居住地址
   */
  mailingAddress?: string;
  zipCode?: string;
  nomen?: string;
  nextOfKinPhone?: string;
  serviceAgency?: string;
  phoneNumberBusiness?: string;
  /**
   * 是否有过敏药物
   */
  ywgm?: string;
  /**
   *  地址
   */
  nextOfKinAddr?: string;
  nextOfKin?: string;
  /**
   * 总费用
   */
  totalCosts?: number;
  totalPayments?: number;
  zhYbyl?: number;
  /**
   * 一般治疗操作费
   */
  zhYbzl?: number;
  /**
   * 护理费
   */
  zhHlHl?: number;
  /**
   * 其他费用
   */
  zhOtherQt?: number;
  zdBlBl?: number;
  /**
   * 实验室诊断费
   */
  zdSysHy?: number;
  /**
   * 影像学诊断费
   */
  zdYxx?: number;
  /**
   * 临床诊断项目费
   */
  zdLcxmJc?: number;
  zlFsszlxm?: number;
  /**
   * 临床物理治疗费
   */
  zlLcwlzl?: number;
  /**
   * 手术治疗费
   */
  zlSszl?: number;
  /**
   * 麻醉费
   */
  zlMzMz?: number;
  /**
   * 手术费
   */
  zlSsSs?: number;
  /**
   * 康复费
   */
  kfKfKfzl?: number;
  /**
   * 中医类 中医治疗费
   */
  zyZyzlZyzl?: number;
  xyXyXy?: number;
  /**
   * 抗菌药物
   */
  xyKjywKjyw?: number;
  /**
   * 中药类
   */
  zyZchyZchy?: number;
  /**
   * 中草药费
   */
  zyZcaoyZcaoy?: number;
  /**
   * 血费
   */
  xyXfSxf?: number;
  /**
   * 白蛋白类制品费
   */
  xyBdbBdb?: number;
  xyQdbQdb?: number;
  /**
   * 凝血因子类制品费
   */
  xyNxyzNxyz?: number;
  /**
   * 细胞因子类制品费
   */
  xyXbyzXbyz?: number;
  /**
   * 检查用一次性医用材料费
   */
  hcJcJc?: number;
  /**
   * 治疗用一次性医用材料费
   */
  hcZlZl?: number;
  /**
   * 手术用一次性医用材料费
   */
  hcSs?: number;
  /**
   * 其他费
   */
  qtOther?: number;
  /**
   * 健康档案号码
   */
  healthCard?: string;
  /**
   * 职业编码
   */
  occupation?: string;
  /**
   * 职业名称
   */
  occupationName?: string;
  /**
   * 打印诊断字段处理
   */
  maritalStatus?: string;
  /**
   * 门诊诊断
   */
  mzDiagnosis?: string;
  /**
   * 门诊诊断编码
   */
  mzDiagnosisCode?: string;
  /**
   * 损伤中毒的外部原因 诊断
   */
  sszdDiagnosis?: string;
  /**
   * 损伤中毒的外部原因诊断编码
   */
  sszdDiagnosisCode?: string;
  /**
   * 病理诊断编码
   */
  blDiagnosisCode?: string;
  /**
   * 病理诊断
   */
  blDiagnosis?: string;
  transferDeptCode?: string;
  icuDeptCode?: string;
  icuInTime?: Date;
  icuOutTime?: Date;
  lifeAbilityScoreIn?: string;
  lifeAbilityScoreOut?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/10/12
 * 说明:
 */
export interface MrPatientFileContentModelDtoPatient extends BaseEntity {
  mrContent?: string
}

export interface MrPatientFileContentSmallModelDtoPatient extends MrPatientFileContentSmallEntityPatient {
  synchronousId?: string
}

/**
 * 病历中小模板中的内容修改记录
 */
export interface MrPatientFileContentSmallEntityPatient extends BaseEntity {
  /**
   * 小模版id
   */
  templateSmallId?: string;
  contentDateTime?: Date;
  /**
   * 患者id
   */
  patientId?: string;
  visitId?: number;
  /**
   * 医院id
   */
  hospitalNo?: string;
  patientCurDeptCode?: string;
  content?: string
}

/**
 * 病历申请重新编辑model
 * Created by 王盛光  on 2017/8/7.
 */
export interface MrPatientFileEditApplyModelDtoPatient extends MrPatientFileEditApplyEntityPatient {
  topic?: string;
  deptName?: string;
  applyDeptName?: string
}

/**
 * 病历申请重新编辑
 * Created by 王盛光
 * on 2017/8/5.
 */
export interface MrPatientFileEditApplyEntityPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
  fileUniqueId?: string;
  applyDateTime?: Date;
  applyTimeLimit?: Date;
  applyUserId?: string;
  applyUserName?: string;
  applyDeptCode?: string;
  status?: number;
  approveUserId?: string;
  approveUserName?: string;
  approveDeptCode?: string;
  approveDateTime?: Date;
  applyPriority?: string;
  applyReason?: string;
  applyRemark?: string;
  bakFileName?: string;
  hospitalNo?: string;
  applyHousemanId?: string;
  applyHousemanName?: string;
  approveHousemanId?: string;
  approveHousemanName?: string;
  applyType?: number
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/2
 * 说明:
 */
export interface MrPatientFileIndexModelDtoPatient extends MrPatientFileIndexEntityPatient {
  statusName?: string;
  creatorName?: string;
  lastModifyUserName?: string;
  deptName?: string;
  wardName?: string;
  modifyTopic?: number;
  modifyTopicDoctor?: number;
  modifyTopicTitle?: number;
  /**
   * 是否可以删除
   */
  ifDelete?: number;
  ifChangeCreator?: number;
  /**
   * 更改起草文书
   */
  ifChangeText?: number;
  ifChangeApply?: number;
  /**
   * 模板topic
   */
  templateTopic?: string;
  counts?: number;
  typeName?: string;
  signatureId?: number;
  signatureName?: string;
  mrClassName?: string;
  mrClassCode?: string;
  /**
   * 是否可以签收
   */
  ifSign?: number;
  /**
   * 文件类型名称
   */
  fileVisitTypeName?: string
}

/**
 * 在院患者病历信息
 * Created by 王盛光  on 2017/8/2.
 */
export interface MrPatientFileIndexEntityPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
  fileNo?: string;
  fileName?: string;
  creatorId?: string;
  createDateTime?: Date;
  lastModifyDateTime?: Date;
  mrClass?: string;
  printFlag?: number;
  lastModifyUserId?: string;
  photocopy?: number;
  editDisable?: number;
  hospitalNo?: string;
  firstMrSignDateTime?: Date;
  isDelete?: number;
  status?: number;
  fileVisitType?: number;
  isNewbody?: number;
  housemanId?: string;
  deptCode?: string;
  wardCode?: string;
  fileComment?: string;
  needParentSignFlag?: number;
  parentUserId?: string;
  superUserId?: string;
  topic?: string;
  lastModifyHousemanId?: string;
  serialNo?: number;
  userId?: string;
  topicDoctorName?: string;
  topicDoctorId?: string;
  topicTitleName?: string;
  topicTitleId?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/15
 * 说明:患者病案首页手术信息
 */
export interface OperationDtoPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
  operationNo?: number;
  operationDesc?: string;
  operationCode?: string;
  heal?: string;
  woundGradeName?: string;
  woundGrade?: string;
  operatingDate?: Date;
  anaesthesiaMethod?: string;
  operator?: string;
  firstAssistant?: string;
  secondAssistant?: string;
  anesthesiaDoctor?: string;
  operationLevel?: string;
  operationEndDate?: Date;
  levelName?: string;
  methodName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/15
 * 说明: 手术字典表信息
 */
export interface OperationDictDtoPatient extends BaseEntity {
  operationCode?: string;
  operationName?: string;
  operationScale?: string;
  stdIndicator?: string;
  approvedIndicator?: string;
  createDate?: Date;
  inputCode?: string;
  inputCodeWb?: string;
  nm2?: string
}

/**
 * 病案编目实体
 * Created by 王盛光  on 2017/8/15.
 */
export interface PatientFileArchivalCatalogingModelDtoPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
  name?: string;
  sex?: string;
  dischargeDateTime?: Date;
  deptName?: string
}

/**
 * 病例打印model
 * Created by 王盛光  on 2017/8/7.
 */
export interface PatientFilePrintModelDtoPatient extends BaseEntity {
  mrClass?: string;
  topic?: string;
  createDateTime?: Date;
  creatorName?: string;
  statusName?: string;
  printTimes?: number;
  lastPrintTime?: Date;
  printName?: string;
  unPrintRason?: string;
  mrClassName?: string
}

/**
 * 病案签收model
 * Created by 王盛光  on 2017/8/10.
 */
export interface PatientFileSignModelDtoPatient extends BaseEntity {
  inpNo?: string;
  patientId?: string;
  visitId?: number;
  name?: string;
  sex?: string;
  deptName?: string;
  wardName?: string;
  dischargeDateTime?: Date;
  admissionDateTime?: Date;
  dateOfBirth?: Date;
  doctorInCharge?: string;
  firstBackUserId?: string;
  firstBackUserName?: string;
  firstBackTime?: Date;
  newborn?: string;
  pushBack?: string;
  /**
   * 上交病历人
   */
  mrSubimitUserId?: string;
  /**
   * 上交病历时间
   */
  mrSubmitTime?: Date
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/10/11
 * 说明:
 */
export interface PointTimeDtoPatient extends BaseEntity {
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
 * 创建人:谢小慧
 * 创建时间:2017/10/11
 * 说明:
 */
export interface TemperatureChartDtoPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
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
 * 创建人:谢小慧
 * 创建时间:2017/10/11
 * 说明:
 */
export interface VitalSignsRecDtoPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
  recordingDate?: Date;
  timePoint?: Date;
  vitalSigns?: string;
  vitalSignsValues?: number;
  units?: string;
  classCode?: string;
  vitalCode?: string;
  vitalSignsCvalues?: string;
  wardCode?: string;
  nurse?: string;
  recordingDate1?: string;
  timePoint1?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/2
 * 说明:病历召回申请的添加字段model
 */
export interface MrPatientFileRecallModelDtoRecall extends MrPatientFileRecallEntityRecall {
  statusName?: string;
  deptName?: string;
  typeName?: string;
  operatorName?: string;
  applyName?: string;
  applyDeptCode?: string;
  name?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/2
 * 说明:病历召回申请
 */
export interface MrPatientFileRecallEntityRecall extends BaseEntity {
  patientId?: string;
  visitId?: number;
  applyDateTime?: Date;
  applyTimeLimit?: Date;
  applyUserId?: string;
  applyUserName?: string;
  applyDeptCode?: string;
  status?: number;
  approveUserId?: string;
  approveUserName?: string;
  approveDeptCode?: string;
  approveDateTime?: Date;
  applyReason?: string;
  clinicType?: number;
  hospitalNo?: string;
  operatorType?: number;
  limitDate?: Date;
  approveReason?: string;
  submitTime?: Date;
  applyType?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/2
 * 说明:根据可以召回病历的患者id查询可以召回病历信息
 */
export interface PatientFileModelDtoRecall extends BaseEntity {
  dischargeDateTime?: Date;
  patientId?: string;
  visitId?: string;
  inpNo?: string;
  name?: string;
  sex?: string;
  deptName?: string;
  statusName?: string;
  fileName?: string;
  typeName?: string;
  createDateTime?: Date;
  lastModifyUserName?: string
}

export interface PatientFileRecallModelDtoRecall extends MrPatientFileRecallEntityRecall {
  fileId?: Array<string>
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/2
 * 说明:病历召回患者查询model
 */
export interface PatientRecallModelDtoRecall extends BaseEntity {
  dischargeDateTime?: Date;
  patientId?: string;
  visitId?: string;
  inpNo?: string;
  name?: string;
  sex?: string;
  deptName?: string;
  ddtRoomName?: string;
  mrBackDateTime?: Date;
  backName?: string;
  catalogerName?: string;
  mrPigeonholeDateTime?: Date;
  pigeonholeName?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/24
 * 说明: 登录用户信息
 */
export interface LoginSessionDtoSystem {
  serverToken?: string;
  hospitalDict?: HospitalDictEntityDict;
  user?: UserDictEntitySystem;
  token?: string;
  loginIpV4?: string
}

/**
 * 医院信息表
 * Created by 王盛光  on 2017/7/29.
 */
export interface HospitalDictEntityDict extends BaseEntity {
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 医院编码
   */
  hospitalCode?: string;
  agencyCode?: string;
  address?: string;
  zipCode?: string
}

export interface UserDictEntitySystem extends BaseEntity {
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
 * 创建人:谢小慧
 * 创建时间:2017/7/22
 * 说明: 控件实体类模型
 */
export interface DsIndexModelDtoTemplate {
  dsIndex?: DsIndexEntityTemplate;
  itemList?: Array<DsValuesItemsModelDtoTemplate>
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/22
 * 说明: 控件信息表
 */
export interface DsIndexEntityTemplate extends BaseEntity {
  dsId?: string;
  version?: number;
  isMax?: number;
  isMin?: number;
  maxValue?: string;
  minValue?: string;
  createTime?: Date;
  createUserId?: string;
  isRequired?: number;
  isComplex?: number;
  defaultsValue?: string;
  isValueItems?: number;
  titleValue?: string;
  isUpdateConten?: string;
  controlType?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/22
 * 说明: 数据元值域明细 model
 */
export interface DsValuesItemsModelDtoTemplate extends BaseEntity {
  items?: DsValuesItemsEntityTemplate;
  list?: Array<DsIndexEntityTemplate>
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/22
 * 说明: 数据元值域明细
 */
export interface DsValuesItemsEntityTemplate extends BaseEntity {
  cvId?: string;
  cvValue?: string;
  cvValueText?: string;
  dsVersion?: number;
  cvCalculatedValue?: number;
  serialNo?: number;
  inputCode?: string;
  dsId?: string;
  isComplex?: number;
  htmlContent?: string;
  cvType?: number;
  hasChild?: number
}

/**
 * Created by 王盛光  on 2017/7/22.
 */
export interface MrTemplateClassModelDtoTemplate extends MrTemplateClassEntityTemplate {
  templateIndexCount?: number;
  /**
   * 子分类id
   */
  childrenNum?: number;
  /**
   * 文件分类名称
   */
  fileVisitTypeName?: string;
  /**
   * 分类模板集合
   */
  templateIndexs?: Array<MrTemplateIndexEntityTemplate>;
  /**
   * 子分类集合
   */
  children?: Array<MrTemplateClassModelDtoTemplate>;
  /**
   * 父类名称
   */
  parentMrClassName?: string;
  /**
   * 数据集名称
   */
  dsName?: string;
  fileIndexList?: Array<MrPatientFileIndexModelDtoPatient>
}

/**
 * 模板索引实体类
 * Created by 王盛光
 * on 2017/7/20.
 */
export interface MrTemplateIndexEntityTemplate extends BaseEntity {
  mrCode?: string;
  mrClass?: string;
  mrName?: string;
  createDateTime?: Date;
  lastModifyDateTime?: Date;
  newPageFlag?: number;
  needChangeTopicFlag?: number;
  writeTimes?: number;
  needParentSignFlag?: number;
  fileEditApplyPriority?: number;
  defaultDateType?: number;
  defaultTopicVisible?: number;
  printNeedFinish?: number;
  singNeedDiag?: number;
  callBackFlag?: number;
  hospitalNo?: string;
  mrClassFileNo?: number;
  topic?: string;
  curVersion?: number;
  cancelAuditReason?: string;
  auditDateTime?: Date;
  auditor?: string;
  inputCode?: string;
  titleCustom?: number;
  status?: number;
  wfId?: number;
  isDelete?: number;
  monitorCode?: string;
  dsCode?: string;
  templateCode?: string;
  masterTemplate?: number;
  tempaleType?: number;
  deptCode?: string;
  createId?: string;
  modifyTopic?: number;
  modifyTopicDoctor?: number;
  modifyTopicTitle?: number;
  masterTemplateId?: string
}

/**
 * 模板分类字典
 * Created by 王盛光
 * on 2017/7/20.
 */
export interface MrTemplateClassEntityTemplate extends BaseEntity {
  mrClassCode?: string;
  mrClassName?: string;
  mrClassType?: number;
  mrSortNo?: number;
  parentMrClassCode?: number;
  dsCode?: string;
  mrClassFlag?: number;
  oneFileFlag?: number;
  shareFile?: number;
  createTime?: Date;
  createUserId?: string;
  isDelete?: boolean;
  gradingClassCode?: string
}

export interface MrTemplateIndexModelDtoTemplate extends MrTemplateIndexEntityTemplate {
  /**
   * 模版打开类型标志   0-按病历打开  1-按病程打开 2-按护理记录打开'
   */
  oneFileFlag?: number;
  userName?: string;
  /**
   * 文件类型名称
   */
  mrClassName?: string;
  /**
   * 状态名称
   */
  statusName?: string;
  needParentSignName?: string;
  dsName?: string;
  monitorName?: string;
  masterTemplateName?: string;
  deptName?: string
}

export interface MrTempletSmallIndexModelDtoTemplate extends MrTempletSmallIndexEntityTemplate {
  userName?: string;
  /**
   * 模板分类名称
   */
  mrClassName?: string;
  /**
   * 数据集名称
   */
  dsName?: string
}

/**
 * 结构化小模板实体
 * Created by 王盛光
 * on 2017/7/31.
 */
export interface MrTempletSmallIndexEntityTemplate extends BaseEntity {
  mrClass?: string;
  mrCode?: string;
  mrName?: string;
  createDateTime?: Date;
  lastModifyDateTime?: Date;
  status?: number;
  templetUniqueId?: string;
  mrClassFileNo?: number;
  hospitalNo?: string;
  createId?: string;
  dsCode?: string;
  isDelete?: number;
  synchronousElementId?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/17
 * 说明:数据元的数据类型字典表
 */
export interface BdDeDateTypeEntityDataSet extends BaseEntity {
  name?: string;
  code?: string;
  isDelete?: number;
  remark?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/17
 * 说明: 数据元大类编号分配字典表
 */
export interface BdDeIndexClassifyEntityDataSet extends BaseEntity {
  name?: string;
  code?: string;
  isDelete?: number;
  explain?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/17
 * 说明: 数据元分组字典表
 */
export interface BdDeIndexGroupingEntityDataSet extends BaseEntity {
  name?: string;
  code?: string;
  isDelete?: number
}

/**
 * 数据组索引表
 * Created by 王盛光  on 2017/7/26.
 */
export interface BdDgIndexEntityDataSet extends BaseEntity {
  dgName?: string;
  dgOperatorId?: string;
  dgOperateTime?: Date;
  pym?: string;
  wbm?: string
}

/**
 * 固定值索引
 * Created by 王盛光
 * on 2017/7/27.
 */
export interface BdFixedIndexEntityDataSet extends BaseEntity {
  fixedType?: number;
  fixedName?: string;
  fixedExample?: string;
  fixedParameters?: string;
  isDelete?: number;
  createUserId?: string;
  createTime?: Date;
  fixedSql?: string
}

/**
 * 动态值字典表
 * 创建人：谢小慧
 */
export interface SynchronousElementDictEntityDataSet extends BaseEntity {
  /**
   * 替换项目名称
   */
  synchronousElementName?: string;
  synchronousElementCode?: string;
  /**
   * 类型 1:小模版 2:元素
   */
  type?: string;
  /**
   * 元素id,or 小模版id
   */
  elementId?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/15
 * 说明:麻醉方式字典表
 */
export interface AnaesthesiaDictEntityDict extends BaseEntity {
  serialNo?: string;
  anaesthesiaCode?: string;
  anaesthesiaName?: string;
  inputCode?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/25
 * 说明:系统字典表
 */
export interface BdDeDictionaryDictEntityDict extends BaseEntity {
  deType?: string;
  deFormat?: string
}

export interface ClinicItemClassDictEntityDict extends BaseEntity {
  serialNo?: number;
  classCode?: string;
  className?: string;
  inputCode?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/21
 * 说明:控件类型字典表
 */
export interface ControlDictEntityDict extends BaseEntity {
  controlType?: string;
  controlName?: string;
  isMaxMin?: string;
  isComponent?: string;
  serialNo?: number;
  isComplex?: number
}

/**
 * 诊断类型字典表
 * 创建人：黄倩
 */
export interface DiagnosisTyprDictEntityDict extends BaseEntity {
  serialNo?: number;
  diagnosisTypeCode?: string;
  diagnosisTypeName?: string;
  inputCode?: string
}

/**
 * 参数配置表
 * Created by 王盛光
 * on 2017/8/5.
 */
export interface DictParamEntityDict extends BaseEntity {
  code?: string;
  name?: string;
  value?: string;
  sortNo?: number;
  remark?: string;
  hospitalNo?: string;
  deptCode?: string
}

/**
 * 工作人员职称表
 * 创建人：黄倩
 */
export interface DoctorTitleDictEntityDict extends BaseEntity {
  titleName?: string;
  /**
   * 拼音码
   */
  inputCode?: string;
  inputCodeWb?: string
}

/**
 * 文书类型字典表
 * Created by王盛光
 * on 2017/7/20.
 */
export interface FileVisitTypeDictEntityDict extends BaseEntity {
  fileVisitTypeName?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/21
 * 说明:切口愈合情况字典
 */
export interface HealDictEntityDict extends BaseEntity {
  serialNo?: number;
  healCode?: string;
  healName?: string;
  inputCode?: string
}

/**
 * 病历状态字典表
 * Created by 王盛光
 * on 2017/8/3.
 */
export interface MrPatientFileStatusDictEntityDict extends BaseEntity {
  statusName?: string
}

/**
 * 手术等级
 * 创建人：黄倩
 */
export interface OperationScaleDictEntityDict extends BaseEntity {
  serialNo?: number;
  operationScaleCode?: string;
  operationScaleName?: string;
  inputCode?: string;
  remarks?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/21
 * 说明:入院方式字典表
 */
export interface PatientClassDictEntityDict extends BaseEntity {
  serialNo?: number;
  patientClassCode?: string;
  patientClassName?: string;
  inputCode?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/8/2
 * 说明:特殊符号
 */
export interface SpecialNumericDictEntityDict extends BaseEntity {
  value?: string;
  serialNo?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/21
 * 说明:切口等级字典表
 */
export interface WoundGradeDictEntityDict extends BaseEntity {
  serialNo?: number;
  woundGradeCode?: string;
  woundGradeName?: string;
  inputCode?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控评分类型字典表
 */
export interface MrGradingClassEntityHandMonitor extends BaseEntity {
  gradingClassCode?: string;
  gradingClassName?: string;
  gradingClassScore?: number;
  doctorFlag?: number
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:质控评分类别项目
 */
export interface MrGradingItemsEntityHandMonitor extends BaseEntity {
  gradingClassCode?: string;
  gradingItemCode?: string;
  gradingItemName?: string;
  gradingItemScore?: number;
  gradingItemStandard?: string;
  gradingItemMaxTimes?: number;
  pym?: string;
  wbm?: string
}

/**
 * 创建人:李潇潇
 * 创建时间:2018-2-9 17:43:06
 * 说明:质控整改通知的明细+主表所有信息，展示整改历史记录
 */
export interface MrRectificationIndexItemModelEntityLinkQuality extends BaseEntity {
  rectificationDateTime?: Date;
  qcUserName?: string;
  qcDeptName?: string;
  receiveUserId?: number;
  receiveDeptCode?: string;
  /**
   * 接收人姓名
   */
  receiveUserName?: string;
  /**
   * 接收科室名称
   */
  receiveDeptName?: string;
  rectificationStatus?: string;
  mrScore?: number;
  rectificationLevel?: string;
  rectificationDeadline?: Date;
  fileId?: string;
  gradingClassCode?: string;
  gradingItemName?: string;
  gradingItemStandard?: string;
  errorNumbers?: number;
  errorTotalScore?: number;
  qcMark?: string
}

/**
 * 创建人:黄倩
 * 创建时间:2017/10/18.
 * 说明:整改通知返修记录
 */
export interface MrRectificationRepairitemEntityLinkQuality extends BaseEntity {
  rectificationItemId?: number;
  gradingItemName?: string;
  fileId?: string;
  mrContent?: string;
  rectificationDateTime?: Date;
  receiveUserId?: string;
  receiveDeptCode?: string;
  qcConfirmUserId?: number;
  qcConfirmDeptCode?: string
}

/**
 * 病案评分明细repository
 * Created by 王盛光
 * on 2017/8/11.
 */
export interface QcMrGradingItemsDictEntityMonitor extends BaseEntity {
  mrClassCode?: string;
  gradingItemCode?: string;
  gradingItemName?: string;
  gradingItemScore?: number;
  gradingItemStandard?: string;
  gradingItemMaxTimes?: number;
  pym?: string;
  wbm?: string
}

/**
 * 在院病人在线质控信息
 * Created by 王盛光
 * on 2017/8/2.
 */
export interface QcMrPatientMonitorOnlineEntityMonitor extends BaseEntity {
  patientId?: string;
  visitId?: number;
  name?: string;
  monitorId?: number;
  itemCode?: string;
  itemName?: string;
  startDate?: Date;
  endDate?: Date;
  stopDate?: Date;
  completedDate?: Date;
  enterDate?: Date;
  leaveTime?: number;
  timeoutIndicator?: number;
  operatorName?: string;
  operatorId?: string;
  fileNo?: string;
  monitorType?: number;
  totalWriteTimes?: number;
  finishedWriteTimes?: number;
  hospitalNo?: string;
  deptCode?: string;
  leaveTimeText?: string
}

/**
 * 医嘱类型实体
 * Created by 王盛光
 * on 2017/7/29.
 */
export interface CdrLocalOrderTypeDictEntityOrder extends BaseEntity {
  orderTypeCode?: string;
  orderTypeName?: string;
  hospitalNo?: string;
  dsCode?: string
}

/**
 * 签名日志
 * Created by 王盛光、
 * on 2017/8/9.
 */
export interface MrPatientFileAutoGraphLogEntityPatient extends BaseEntity {
  fileId?: string;
  autographUserId?: string;
  fileStatus?: number;
  autographTime?: Date
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:患者病历控件内容改变记录表
 */
export interface MrPatientFileChangeLogEntityPatient extends BaseEntity {
  fileId?: string;
  elementId?: string;
  /**
   * 修改时间
   */
  modifyDateTime?: Date;
  /**
   * 修改用户id
   */
  modifyUserId?: string;
  /**
   * 修改之前内容
   */
  beforeContent?: string;
  /**
   * 修改之后内容
   */
  afterContent?: string;
  /**
   * 当前用户所在科室
   */
  deptCode?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:文件内容,前端使用形式的
 */
export interface MrPatientFileContentEntityPatient extends BaseEntity {
  mrContent?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:病历文件内容 xml格式
 */
export interface MrPatientFileContentCdaEntityPatient extends BaseEntity {
  mrContent?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:病历内容,html格式,便于第三方系统调用
 */
export interface MrPatientFileContentHtmlEntityPatient extends BaseEntity {
  mrContent?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:文件内容改变日志,存储前端使用格式
 */
export interface MrPatientFileContentLogEntityPatient extends BaseEntity {
  mrContent?: string;
  logDateTime?: Date;
  modifyUserId?: string;
  /**
   * 文件id
   */
  fileId?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:病历文件内容 txt格式
 */
export interface MrPatientFileContentTextEntityPatient extends BaseEntity {
  mrContent?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:病历元素信息表
 */
export interface MrPatientFileElementEntityPatient extends BaseEntity {
  dgCode?: string;
  dgSubNo?: number;
  deCode?: string;
  deSubNo?: number;
  elementIndex?: number;
  deName?: string;
  elementDateTime?: Date;
  fileId?: string;
  stringValue?: string;
  numberValue?: string;
  codeValue?: string;
  dateValue?: Date
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:病历申请修改记录
 */
export interface MrPatientFileMaintainApplyEntityPatient extends BaseEntity {
  fileId?: string;
  userId?: string;
  userName?: string;
  deptCode?: string;
  deptName?: string;
  fileFlag?: string;
  maintainApplyTime?: Date;
  handleUserId?: string;
  handleUserName?: string;
  handleDeptCode?: string;
  handleDeptName?: string;
  handleTime?: Date;
  maintainApplyReason?: string;
  handleRemark?: string;
  hospitalNo?: string
}

/**
 * 患者病历打开记录
 * Created by 王盛光  on 2017/8/4.
 */
export interface MrPatientFileOperLogEntityPatient extends BaseEntity {
  userId?: string;
  modifyDateTime?: Date;
  status?: number;
  userOper?: number;
  computer?: string;
  fileUniqueId?: string;
  userName?: string;
  houseman?: string;
  housemanId?: string;
  onDutyFlag?: number;
  deptCode?: string;
  patientCurDeptCode?: string
}

/**
 * 创建人:谢小慧
 * 创建时间: 2017/8/5
 * 说明:病历打印记录
 */
export interface MrPatientFilePrintLogEntityPatient extends BaseEntity {
  printerName?: string;
  userName?: string;
  fileUniqueId?: string;
  printPageType?: number;
  printType?: number;
  computer?: string;
  housemanName?: string;
  housemanId?: string;
  userId?: string;
  topic?: string;
  printTime?: Date
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/9/14
 * 说明: 患者病历操作日志
 */
export interface MrPatientLogEntityPatient extends BaseEntity {
  patientId?: string;
  visitId?: string;
  logDateTime?: Date;
  logUserId?: string;
  mrState?: string;
  ip?: string;
  hospitalNo?: string
}

/**
 * 患者转科记录表
 */
export interface MrPatientTransferEntityPatient extends BaseEntity {
  patientId?: string;
  visitId?: number;
  dischargeDeptCode?: string;
  dischargeWardCode?: string;
  bedNo?: number;
  doctorInCharge?: string;
  nurseInCharge?: string;
  dischargeDateTime?: Date;
  admissionDateTime?: Date;
  admissionDeptCode?: string;
  admissionWardCode?: string;
  diagnosis?: string;
  patientCondition?: string;
  nursingClass?: string;
  bedLabel?: string;
  hospitalNo?: string;
  isNewborn?: number;
  doctorUser?: string;
  superDoctorId?: string;
  parentDoctorId?: string
}

export interface PatientPigeonholeEntityPatient extends BaseEntity {
  /**
   * 出院日期
   */
  dischargeDateTime?: Date;
  /**
   * 签收时间
   */
  mrBackDateTime?: Date;
  /**
   * 病案状态
   */
  mrDoctorStatus?: string;
  /**
   * 住院号
   */
  inpNo?: string;
  /**
   * 患者ID
   */
  patientId?: string;
  /**
   * 住院次数
   */
  visitId?: number;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 出院科室
   */
  deptName?: string;
  /**
   * 出院病区
   */
  areaName?: string;
  /**
   * 入院日期
   */
  admissionDateTime?: Date;
  /**
   * 出生日期
   */
  dateOfBirth?: Date
}

/**
 * 创建人:黄倩
 * 创建时间:2017/11/2
 * 说明:病历召回回打回详情记录
 */
export interface MrPatientFilecrDetialEntityRecall extends BaseEntity {
  type?: number;
  fileId?: string;
  patientId?: string;
  visitId?: number;
  callbackRecallId?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/10/9
 * 说明:
 */
export interface DictParamEntitySystem extends BaseEntity {
  code?: string;
  name?: string;
  value?: string;
  sortNo?: number;
  remark?: string;
  hospitalNo?: string;
  deptCode?: string
}

/**
 * 医生三级分组表
 * Created by 王盛光  on 2017/8/8.
 */
export interface DoctorGroupEntitySystem {
  doctorUser?: string;
  deptCode?: string;
  doctor?: string;
  inputCode?: string;
  superDoctorId?: string;
  parentDoctorId?: string
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/24
 * 说明: 数据项关联数据元
 */
export interface DsItemsVsIndexEntityTemplate extends BaseEntity {
  cvId?: number;
  dsId?: string;
  dsVersion?: number
}

/**
 * 创建人:谢小慧
 * 创建时间:2017/7/22
 * 说明: 控件
 */
export interface DsTypeIndexEntityTemplate extends BaseEntity {
  dsId?: string;
  dsName?: string;
  serialNo?: number;
  isDir?: number;
  levelNo?: number;
  parentId?: string;
  isDelete?: number;
  version?: number;
  controlType?: string
}

/**
 * 病历模板内容
 * Created by 王盛光
 * on 2017/7/29.
 */
export interface MrTemplateContentEntityTemplate extends BaseEntity {
  mrConten?: string
}

/**
 * 病历历史模板内容
 * Created by 王盛光
 * on 2017/7/29.
 */
export interface MrTemplateContentHistoryEntityTemplate extends BaseEntity {
  mrContent?: string;
  version?: number
}

/**
 * 病历模板操作日志
 * Created by 王盛光
 * on 2017/7/25.
 */
export interface MrTempletOperLogEntityTemplate extends BaseEntity {
  userId?: string;
  modifyDateTime?: Date;
  status?: number;
  userOper?: number
}

/**
 * 数据流实体
 * Created by 王盛光  on 2017/7/26.
 */
export interface SysWorkFlowEntityWorkFlow extends BaseEntity {
  wfType?: number;
  wfName?: string;
  createDate?: Date;
  state?: number;
  startDate?: Date;
  endDate?: Date
}

/**
 * 工作流流程实体
 * Created by 王盛光
 * on 2017/7/26.
 */
export interface SysWorkFlowStepEntityWorkFlow extends BaseEntity {
  wfId?: number;
  stepNo?: number;
  name?: string;
  inStatusId?: string;
  inStatusValues?: string;
  outStatusId?: number;
  firstStep?: string;
  lastStep?: number;
  outStepId?: number;
  urlAuthPoint?: string
}
