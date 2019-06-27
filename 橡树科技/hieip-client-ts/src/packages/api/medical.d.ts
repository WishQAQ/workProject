import { MrCruxTypeModelDtoCrux, Page, MrCruxModelDtoCrux, MrCruxTypeEntityCrux, DeptCruxModelDtoCrux, MrCruxEntityCrux, BdCvIndexModelDtoDataSet, BdCvIndexEntityDataSet, BdCvItemsModelDtoDataSet, BdCvVersionsModelDtoDataSet, BdCvItemsEntityDataSet, BdDeIndexModelDtoDataSet, BdDeIndexEntityDataSet, InputDictModelDtoDict, BdDgIndexEntityDataSet, BdDsIndexModelDtoDataSet, BdDsIndexEntityDataSet, BdDsVersionsModelDtoDataSet, BdFixedIndexEntityDataSet, BdFixedItemsEntityDataSet, BdFixedItemsModelDtoDataSet, InputDictEntityDict, TableDictModelDtoDict, FileVisitTypeDictEntityDict, HospitalDictEntityDict, DeptDictEntityDict, MrStatusDictEntityDict, DoctorGroupEntitySystem, MrGradingClassEntityHandMonitor, MrTemplateIndexEntityTemplate, MrGradingItemsEntityHandMonitor, PatMasterInfoModelDtoLinkQuality, MrRectificationIndexEntityLinkQuality, MrRectificationIndexModelDtoLinkQuality, RectificationItemModelDtoLinkQuality, QcMrGradingItemsDictEntityMonitor, QcMrMonitorItemsModelDtoMonitor, QcMrMonitorVsEventModelDtoMonitor, QcMrMonitorVsEventEntityMonitor, QcMrMonitorItemsEntityMonitor, QcMrMonitorVsEventModel2DtoMonitor, QcMrPatientMonitorOnlineEntityMonitor, CdrLocalOrderTypeDictEntityOrder, CdrContrastOrderItemDictEntityOrder, MrPatientFileContentSmallModelDtoPatient, MrPatientFileEditApplyEntityPatient, MrPatientFileEditApplyModelDtoPatient, MrTemplateContentEntityTemplate, MrPatientFileContentEntityPatient, MrPatientFileIndexEntityPatient, MrPatientFileElementEntityPatient, MrPatientFileContentSmallEntityPatient, MrPatientFileChangeLogEntityPatient, ControllerDtoController, MrPatientFileIndexModelDtoPatient, MrPatientFileContentCdaEntityPatient, MrPatientFileContentHtmlEntityPatient, PatientFilePrintModelDtoPatient, MrPatientFilePrintLogEntityPatient, DiagnosisModelDtoPatient, MrModelDtoPatient, OperationDtoPatient, MrPatientTransferEntityPatient, PatientFileArchivalCatalogingModelDtoPatient, PatientFileSignModelDtoPatient, MrTemplateClassModelDtoTemplate, OrdersDtoOak, ClinicItemClassDictEntityDict, DoctorTitleDictEntityDict, PatientPigeonholeEntityPatient, TemperatureChartDtoPatient, PatientRecallModelDtoRecall, PatientFileModelDtoRecall, PatientFileRecallModelDtoRecall, MrPatientFileRecallEntityRecall, MrPatientFileRecallModelDtoRecall, MrPatientFilecrDetialEntityRecall, UserDictEntitySystem, DsTypeIndexEntityTemplate, DsIndexEntityTemplate, DsValuesItemsModelDtoTemplate, DsIndexModelDtoTemplate, MrTemplateClassEntityTemplate, MrTemplateIndexModelDtoTemplate, SynchronousElementDictEntityDataSet, MrTempletSmallIndexEntityTemplate } from '../entity/medical';
export interface ArrayData<T> extends Array<T> {
    total: number;
}
/**
 * 关键词controller
 * Created by 王盛光  on 2017/8/14.
 */
export declare class ApiCruxMr {
    private static baseUrl;
    /**
     * 查询所有分类并进行统计各分类中关键词的数量
     */
    static findMrCruxType(): Promise<ArrayData<MrCruxTypeModelDtoCrux>>;
    /**
     * 查询关键词分类
     *
     */
    static findMrCruxByTypeAndDept(deptCode?: string, hospitalNo?: string): Promise<Map<string, any>>;
    /**
     * 关键词类型查询
     *
     */
    static findByHospitalNoAndDeptCodeAndCruxTypeCode(deptCode?: string, cruxTypeCode?: string, hospitalNo?: string, page?: Page): Promise<ArrayData<MrCruxModelDtoCrux>>;
    /**
     * 保存关键词分类
     *
     */
    static saveCruxType(mrCruxType?: MrCruxTypeEntityCrux): Promise<any>;
    /**
     * 删除分类
     *
     */
    static deleteCruxType(id?: number): Promise<any>;
    /**
     * 模糊查询关键词
     *
     */
    static findMrCrux(cruxTypeCode?: string, type?: number, name?: string): Promise<ArrayData<MrCruxModelDtoCrux>>;
    /**
     * 查询病区拥有关键词
     *
     */
    static findDept(hospitalNo?: string): Promise<ArrayData<DeptCruxModelDtoCrux>>;
    /**
     * 保存关键词
     *
     */
    static saveCrux(mrCrux?: MrCruxEntityCrux): Promise<any>;
    /**
     * 删除关键词
     *
     */
    static deleteCrux(id?: number): Promise<any>;
    /**
     * 获取关键词内容
     *
     */
    static findCruxContent(id?: number): Promise<MrCruxEntityCrux>;
}
/**
 * 创建人:王盛光
 * 创建时间:2017/7/27
 * 说明:值域索引Controller
 */
export declare class ApiDataSetBdCvIndex {
    private static baseUrl;
    /**
     * 分页查询值域
     *
     */
    static findAll(page?: Page, cvName?: string, enabled?: number): Promise<ArrayData<BdCvIndexModelDtoDataSet>>;
    /**
     * 新增值域
     *
     */
    static saveCvIndex(bdCvIndex?: BdCvIndexEntityDataSet): Promise<any>;
    /**
     * 删除值域
     *
     */
    static deleteCvIndex(id?: string): Promise<any>;
    /**
     * 值域修改
     *
     */
    static updateCvIndex(bdCvIndex?: BdCvIndexEntityDataSet): Promise<any>;
    /**
     * 值域启动
     *
     */
    static stratCvIndex(id?: string): Promise<any>;
    /**
     * 选择单个值域
     *
     */
    static selectCvIndex(id?: string, version?: number): Promise<Map<string, any>>;
    /**
     * 根据值域id和版本id查询值域项信息
     *
     */
    static selectBdCvItems(id?: string, version?: number): Promise<ArrayData<BdCvItemsModelDtoDataSet>>;
    /**
     * 新建版本
     *
     */
    static newVersion(bdCvVersionsModel?: BdCvVersionsModelDtoDataSet): Promise<any>;
    /**
     * 发布版本
     *
     */
    static publishVersion(id?: string, curVersion?: number): Promise<any>;
}
/**
 * 创建人:王盛光
 * 创建时间:2017/7/28
 * 说明:值域数据项Controller
 */
export declare class ApiDataSetBdCvItems {
    private static baseUrl;
    /**
     * 新增值域项
     *
     */
    static saveBdCvItems(bdCvItems?: BdCvItemsEntityDataSet): Promise<any>;
    /**
     * 修改值域项
     *
     */
    static updateBdCvItems(bdCvItems?: BdCvItemsEntityDataSet): Promise<any>;
    /**
     * 删除
     *
     */
    static deleteBdCvItems(bdCvItems?: BdCvItemsEntityDataSet): Promise<any>;
    /**
     * 根据id查询值域项
     *
     */
    static findByCvId(cvId?: string): Promise<ArrayData<BdCvItemsEntityDataSet>>;
    static findGroupByCvId(cvId?: string): Promise<Map<string, ArrayData<BdCvItemsEntityDataSet>>>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/26
 * 说明:数据元
 */
export declare class ApiDataSetBdDeIndex {
    private static baseUrl;
    /**
     * 查询数据元数据,分页查询
     *
     */
    static getBdIndexData(page?: Page, beName?: string): Promise<ArrayData<BdDeIndexModelDtoDataSet>>;
    /**
     * 根据id查询数据元的信息
     *
     */
    static selectBdDeIndex(id?: string): Promise<BdDeIndexEntityDataSet>;
    /**
     * 查询数据元数据,分页查询
     *
     */
    static getBdIndexData1(page?: Page, beName?: string, bdDsId?: string): Promise<ArrayData<BdDeIndexModelDtoDataSet>>;
    /**
     * 加载单个数据元的详细信息
     *
     */
    static getBdIndexInfo(id?: string, deCvCode?: string): Promise<Map<string, any>>;
    /**
     * 保存数据元信息
     *
     */
    static saveOrUpdateBdDeIndex(index?: BdDeIndexEntityDataSet): Promise<any>;
    /**
     * 修改,或添加之前,加载基础数据
     *
     */
    static toSaveOrUpdate(): Promise<Map<string, any>>;
    /**
     * 查询值域项目
     *
     */
    static getCvIndex(page?: Page, cvName?: string, enabled?: number): Promise<ArrayData<BdCvIndexEntityDataSet>>;
    static inputTiltle(tableName?: string): Promise<ArrayData<InputDictModelDtoDict>>;
    static selectInput(tableName?: string, name?: string, page?: Page, user?: string): Promise<ArrayData<BdCvIndexEntityDataSet>>;
    /**
     * 删除数据元信息
     *
     */
    static deleteBeIndex(id?: string): Promise<any>;
}
/**
 * 创建人:王盛光
 * 创建时间:2017/7/27
 * 说明:数据组controller
 */
export declare class ApiDataSetBdDgIndex {
    private static baseUrl;
    /**
     * 分页查询索引数据组
     *
     */
    static findAll(page?: Page, bgName?: string): Promise<ArrayData<BdDgIndexEntityDataSet>>;
}
/**
 * 创建人:王盛光
 * 创建时间:2017/7/26
 * 说明:数据集索引Controller
 */
export declare class ApiDataSetBdDsIndex {
    private static baseUrl;
    /**
     * 查询全部数据集
     *
     */
    static findAll(cvName?: string, page?: Page): Promise<ArrayData<BdDsIndexModelDtoDataSet>>;
    /**
     * 根据id 查询对应数据元信息
     */
    static findById(id?: string): Promise<ArrayData<BdDeIndexEntityDataSet>>;
    /**
     * 根据选中的数据集id和版本号查询这个数据集对应的数据信息
     *
     */
    static findBdDsIndex(id?: string, curVersion?: number): Promise<Map<string, any>>;
    /**
     * 根据选中的数据集id和版本号查询数据元信息
     *
     */
    static selectBdDeIndex(id?: string, curVersion?: number): Promise<ArrayData<BdDeIndexEntityDataSet>>;
    /**
     * 新增数据集
     *
     */
    static saveBdDsIndex(bdDsIndex?: BdDsIndexEntityDataSet): Promise<any>;
    /**
     * 根据数据集id删除该数据集对应的数据
     *
     */
    static deleteBdDsIndex(id?: string): Promise<any>;
    /**
     * 创建新版本
     *
     */
    static versionBdDsIndex(bdDsVersionsModel?: BdDsVersionsModelDtoDataSet): Promise<any>;
    /**
     * 发布新版本
     *
     */
    static publishVersion(dsId?: string, currVersion?: number): Promise<any>;
    /**
     * 数据元模糊查询
     *
     */
    static findDgOrCv(dsId?: string, curVersion?: number, name?: string): Promise<ArrayData<BdDeIndexEntityDataSet>>;
    /**
     * 根据数据集id和版本号新增数据元信息
     *
     */
    static insertBdDsVsDe(dsId?: string, curVersion?: number, name?: string): Promise<any>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/27
 * 说明: 固定值维护
 */
export declare class ApiDataSetBdFixedIndex {
    private static baseUrl;
    /**
     * 加载固定值以具体字段信息
     *
     */
    static loadBdFixedData(): Promise<ArrayData<BdFixedIndexEntityDataSet>>;
    /**
     * 加载单个固定值信息
     *
     */
    static loadBdFixedInfo(id?: number): Promise<Map<string, any>>;
    /**
     * 保存固定值信息
     *
     */
    static saveBdFixed(bdFixedIndex?: BdFixedIndexEntityDataSet, itemsList?: Array<BdFixedItemsEntityDataSet>): Promise<any>;
    /**
     * 修改固定值信息
     *
     */
    static updateBdFixed(bdFixedIndex?: BdFixedIndexEntityDataSet, itemsList?: Array<BdFixedItemsEntityDataSet>): Promise<any>;
    /**
     * 物理删除固定值
     *
     */
    static deleteBdFixed(id?: number): Promise<any>;
    /**
     * 加载固定值
     *
     */
    static loadFixedInfo(patientId?: string, visitId?: number, deptCode?: string, wardCode?: string, list?: Array<BdFixedItemsModelDtoDataSet>): Promise<any>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/12/19
 * 说明:模糊查询控件controller
 */
export declare class ApiDictInput {
    private static baseUrl;
    /**
     * 查询模糊查询控件的主信息
     *
     */
    static select(name?: string): Promise<ArrayData<InputDictEntityDict>>;
    /**
     * 查询模糊查询控件的列明细信息
     *
     */
    static selectList(dictCode?: string): Promise<ArrayData<InputDictEntityDict>>;
    /**
     * 查询模糊查询控件的所有列
     *
     */
    static selectTable(tableName?: string): Promise<ArrayData<TableDictModelDtoDict>>;
    /**
     * 新增/更新 模糊查询控件
     *
     */
    static save(inputDicts?: Array<InputDictEntityDict>, inputs?: InputDictEntityDict): Promise<any>;
    /**
     * 作废模糊查询控件的列明细信息
     *
     */
    static deleteOne(id?: number): Promise<any>;
    /**
     * 作废模糊查询控件
     *
     */
    static delete(dictCode?: string): Promise<any>;
    /**
     * 查询字典数据列
     *
     */
    static loadColumns(dictCode?: string): Promise<ArrayData<InputDictModelDtoDict>>;
    /**
     * 加载多个
     */
    static loadMultipleColumns(dictCodes?: Array<string>): Promise<any>;
    /**
     * 查询字典数据
     *
     */
    static loadData(page?: Page, dictCode?: string, inputCode?: string): Promise<any>;
}
/**
 * 文书类型字典表controller
 * Created by 王盛光  on 2017/7/20.
 */
export declare class ApiDictionaryFileVisitTypeDict {
    private static baseUrl;
    /**
     * 查询全部文书字典
     *
     */
    static FindAll(): Promise<ArrayData<FileVisitTypeDictEntityDict>>;
    /**
     * 查询医院字典
     *
     */
    static FindHospitalDict(): Promise<ArrayData<HospitalDictEntityDict>>;
    /**
     * 查询科室字典
     *
     */
    static FindDeptDict(hospitalCode?: string): Promise<ArrayData<DeptDictEntityDict>>;
    /**
     * 查询状态
     *
     */
    static FindStatus(): Promise<ArrayData<MrStatusDictEntityDict>>;
}
/**
 * 医生三级分组表 controller
 * Created by 王盛光  on 2017/8/17.
 */
export declare class ApiDoctorSysGroup {
    private static baseUrl;
    /**
     * 三级医生信息模糊查询
     *
     */
    static LoadDoctor(name?: string): Promise<ArrayData<DoctorGroupEntitySystem>>;
    /**
     * 更新三级医生信息
     *
     */
    static Update(sysDoctorGroup?: DoctorGroupEntitySystem): Promise<any>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:手动质控评分类型字典控制器
 */
export declare class ApiHandMonitorMrGradingClass {
    private static baseUrl;
    /**
     * 查询质控评分类
     *
     */
    static GradingClassinfo(): Promise<Map<string, any>>;
    /**
     * 新增质控评分类
     *
     */
    static insertGradingClass(mrGradingClass?: MrGradingClassEntityHandMonitor): Promise<any>;
    /**
     * 更新质控评分类
     *
     */
    static updateGradingClass(mrGradingClass?: MrGradingClassEntityHandMonitor): Promise<any>;
    /**
     * 删除手动质控评分类
     *
     */
    static deleteGradingClass(id?: number, code?: string): Promise<any>;
    /**
     * 根据质控的id查询相关模板信息
     *
     */
    static selectTemplate(code?: string, page?: Page, name?: string): Promise<ArrayData<MrTemplateIndexEntityTemplate>>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:质控评分类型的项目明细
 */
export declare class ApiHandMonitorMrGradingItems {
    private static baseUrl;
    /**
     * 根据分类编号查询评分项目明细
     *
     */
    static selectItems(code?: string, page?: Page, name?: string): Promise<ArrayData<MrGradingItemsEntityHandMonitor>>;
    /**
     * 新增质控评分项
     *
     */
    static insertItems(items?: MrGradingItemsEntityHandMonitor, code?: string): Promise<any>;
    /**
     * 更新质控评分项
     *
     */
    static updateItems(items?: MrGradingItemsEntityHandMonitor): Promise<any>;
    /**
     * 删除质控评分项
     *
     */
    static deleteItem(idList?: Array<number>): Promise<any>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:质控评患者查询
 */
export declare class ApiLinkQualityPatMasterInfo {
    private static baseUrl;
    /**
     * 质控患者的信息模糊查询
     *
     */
    static selectInfo(radio?: number, info?: number, comeOut?: number, begin?: Date, end?: Date, type?: string, status?: number, deptCode?: string, value?: string, page?: Page): Promise<ArrayData<PatMasterInfoModelDtoLinkQuality>>;
    /**
     * 质控患者的信息模糊查询
     *
     */
    static seleDept(rode?: number): Promise<ArrayData<DeptDictEntityDict>>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:整改记录管理
 */
export declare class ApiLinkQualityRectification {
    private static baseUrl;
    /**
     * 根据患者唯一标识查询患者有那些病历
     *
     */
    static selectFormerly(patientId?: string, visitId?: number, type?: string, name?: string, mName?: string, begin?: Date, page?: Page, fileName?: string): Promise<Map<string, any>>;
    /**
     * 查询所有的质控评分类别以及对应的默认选中的评分明细信息
     *
     */
    static selectClassTimes(fileNo?: string, mrClass?: string): Promise<Map<string, any>>;
    /**
     * 根据选中的质控评分类别查询评分明细的信息
     *
     */
    static selectMrGradingItems(classCode?: string): Promise<ArrayData<MrGradingItemsEntityHandMonitor>>;
    /**
     * 根据患者唯一标识查询患者有整改主记录
     *
     */
    static selectIndexs(patientId?: string, visitId?: number): Promise<ArrayData<MrRectificationIndexEntityLinkQuality>>;
    /**
     * 根据选中的整改总记录id查询整改明细
     *
     */
    static selectItems(indexId?: string): Promise<Map<string, any>>;
    /**
     * 添加整改记录
     *
     */
    static insertInfo(index?: Array<MrRectificationIndexModelDtoLinkQuality>): Promise<any>;
    /**
     * 根据患者唯一标识查询患者质控记录（手动加自动）
     *
     */
    static qualityControl(patientId?: string, visitId?: number): Promise<Map<string, any>>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:质控跟踪管理
 */
export declare class ApiLinkQualityTrackingRecord {
    private static baseUrl;
    /**
     * 查询所有的整改通知
     *
     */
    static selectIndex(patientId?: string, visitId?: number, status?: number, userName?: string, begin?: Date, end?: Date, page?: Page): Promise<ArrayData<MrRectificationIndexEntityLinkQuality>>;
    static selectItems(indexId?: string): Promise<ArrayData<RectificationItemModelDtoLinkQuality>>;
    /**
     * 查询所有的整改通知
     *
     */
    static insertReset(itemsId?: Array<number>, mainId?: string): Promise<any>;
    /**
     * 根据给定的id删除整改明细
     *
     */
    static deleteItem(items?: Array<number>): Promise<any>;
    /**
     * 根据给定的id删除整改主记录
     *
     */
    static deleteIndex(Index?: Array<string>): Promise<any>;
    /**
     * 根据给定的id进行整改主记录确认
     *
     */
    static insertItems(rectificationItems?: RectificationItemModelDtoLinkQuality, indexId?: string): Promise<any>;
    /**
     * 根据整改明细信息id查询整改内容和返修明细
     *
     */
    static selectDict(itemId?: number, fileId?: string): Promise<Map<string, any>>;
    /**
     * 根据给定的用户id查询整改主记录
     *
     */
    static selectUserIndex(receiveUserId?: number): Promise<ArrayData<MrRectificationIndexEntityLinkQuality>>;
    /**
     * 整改信息接收人确认操作
     *
     */
    static insertStatus(items?: Array<RectificationItemModelDtoLinkQuality>): Promise<any>;
    /**
     * 整改信息接收人病历错误信息修改完成操作
     *
     */
    static insertAccomplish(items?: Array<RectificationItemModelDtoLinkQuality>): Promise<any>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/8/10
 * 说明:
 */
export declare class ApiMonitorQcMrGradingItemsDict {
    private static baseUrl;
    /**
     * 模糊查询病案质控信息
     *
     */
    static getGrading(page?: Page, name?: string): Promise<ArrayData<QcMrGradingItemsDictEntityMonitor>>;
}
/**
 * 自动质控项目Controller
 * Created by 王盛光  on 2017/7/29.
 */
export declare class ApiMonitorQcMrItems {
    private static baseUrl;
    /**
     * 模糊查询自动质控项目
     *
     */
    static findQcMrMonitorItems(qcName?: string, hosId?: string): Promise<ArrayData<QcMrMonitorItemsModelDtoMonitor>>;
    /**
     * 删除自动质控项目
     *
     */
    static deleteQcMrMonitorItems(ids?: Array<string>): Promise<any>;
    static saveQcMrMonitorItems(qcMrMonitorItems?: Array<undefined>): Promise<any>;
    static findQcMrMonitorEventDict(id?: string): Promise<ArrayData<QcMrMonitorVsEventModelDtoMonitor>>;
}
/**
 * 自动质控触发事件配置Controller
 * Created by 王盛光  on 2017/8/1.
 */
export declare class ApiMonitorQcMrVsEvent {
    private static baseUrl;
    /**
     * 保存关联
     *
     */
    static SaveQcMrMonitorVsEvent(qcMrMonitorVsEvents?: Array<QcMrMonitorVsEventEntityMonitor>): Promise<any>;
    /**
     * 删除关联
     *
     */
    static DeleteQcMrMonitorVsEvent(ids?: Array<number>): Promise<any>;
    /**
     * 保存关联
     *
     */
    static Save(data?: QcMrMonitorItemsEntityMonitor, modelList?: Array<QcMrMonitorVsEventEntityMonitor>): Promise<any>;
    /**
     * 根据自动质控项目id查询
     *
     */
    static FindByMonitorItemId(monitorItemId?: string, hospitalNo?: string): Promise<ArrayData<QcMrMonitorVsEventModel2DtoMonitor>>;
}
/**
 * 在院病人在线质控信息Controller
 * Created by 王盛光  on 2017/8/2.
 */
export declare class ApiMonitorQcMrPatientOnline {
    private static baseUrl;
    /**
     * 新增患者质控信息管理
     *
     */
    static addQcMrPatientMonitorOnline(qcMrPatientMonitorOnline?: QcMrPatientMonitorOnlineEntityMonitor, eventId?: string): Promise<any>;
    /**
     * 患者质控信息医嘱管理
     *
     */
    static addQcMrPatientMonitorOnlineByOrder(qcMrPatientMonitorOnline?: QcMrPatientMonitorOnlineEntityMonitor, qcMrMonitorVsEvents?: string): Promise<any>;
}
/**
 * 医嘱对照Controller
 * Created by 王盛光  on 2017/7/31.
 */
export declare class ApiOrderCdrLocalTypeDict {
    private static baseUrl;
    /**
     * 条件查询医嘱类型
     *
     */
    static findCdrLocalOrderTypeDict(orderTypeName?: string, hospitalNo?: string): Promise<ArrayData<CdrLocalOrderTypeDictEntityOrder>>;
    /**
     * 条件查询医嘱
     *
     */
    static findCdrContrastOrderItemDict(cdrContrastOrderItemDict?: CdrContrastOrderItemDictEntityOrder, page?: Page): Promise<ArrayData<CdrContrastOrderItemDictEntityOrder>>;
}
export declare class ApiPatientMrFileContentSmall {
    private static baseUrl;
    /**
     * 病历同步加载
     *
     */
    static getContenSmall(modelList?: Array<MrPatientFileContentSmallModelDtoPatient>): Promise<ArrayData<MrPatientFileContentSmallModelDtoPatient>>;
}
/**
 * 病历申请重新编辑controller
 * Created by 王盛光  on 2017/8/5.
 */
export declare class ApiPatientMrFileEditApply {
    private static baseUrl;
    /**
     * 新增申请
     *
     */
    static NewMrPatientFileEditApply(mrPatientFileEditApply?: MrPatientFileEditApplyEntityPatient): Promise<any>;
    /**
     * 病历申请重新编辑审核
     *
     */
    static CheckMrPatientFileEditApply(id?: number, status?: number): Promise<any>;
    /**
     * 申请模糊查询
     *
     */
    static FindByPage(page?: Page, name?: string, status?: number): Promise<ArrayData<MrPatientFileEditApplyModelDtoPatient>>;
    /**
     * 取消申请
     *
     */
    static Delete(id?: number): Promise<any>;
}
/**
 * 在院患者病历信息controller
 * Created by 王盛光  on 2017/8/3.
 */
export declare class ApiPatientMrFileIndex {
    private static baseUrl;
    /**
     * 加载模板信息
     *
     */
    static LoadTemplateInfo(templateIndexId?: string): Promise<MrTemplateContentEntityTemplate>;
    /**
     * 加载已经保存的病历信息
     *
     */
    static LoadMrPatientFileIndexInfo(fileId?: string): Promise<MrPatientFileContentEntityPatient>;
    /**
     * 加载病历集合信息
     *
     */
    static LoadMrPatientFileIndexInfos(list?: Array<MrPatientFileContentEntityPatient>): Promise<ArrayData<MrPatientFileContentEntityPatient>>;
    /**
     * 保存信息
     *
     */
    static SaveMrPatientFileIndex(mrPatientFileIndex?: MrPatientFileIndexEntityPatient, deptCode?: string, onDutyFlag?: number, contenHtml?: string, contentText?: string, fileContent?: string, elementList?: Array<MrPatientFileElementEntityPatient>, smallContent?: Array<MrPatientFileContentSmallEntityPatient>, updateElement?: Array<MrPatientFileChangeLogEntityPatient>, xmlBodys?: Array<string>, controllers?: Array<ControllerDtoController>): Promise<MrPatientFileIndexModelDtoPatient>;
    /**
     * 保存xml信息
     *
     */
    static SaveXml(cda?: MrPatientFileContentCdaEntityPatient, status?: string): Promise<any>;
    /**
     * 删除
     *
     */
    static DeleteMrPatientFileIndex(id?: string, onDutyFlag?: number): Promise<any>;
    /**
     * 改变创建人
     *
     */
    static ChangeCreator(id?: string, onDutyFlag?: number): Promise<any>;
    /**
     * 签字
     *
     */
    static Sign(id?: string, password?: string, cleanHtml?: string, contentText?: string, fileContent?: string, xmlBodys?: Array<string>, controllers?: Array<ControllerDtoController>): Promise<any>;
    /**
     * 打回
     *
     */
    static ThrowBack(id?: string): Promise<any>;
    /**
     * 查询患者的病历信息集合
     *
     */
    static getMrPatientFileIndex(patientId?: string, visitId?: number): Promise<ArrayData<MrPatientFileIndexModelDtoPatient>>;
    /**
     * 查询 病历的html 文件
     *
     */
    static GetMrPatientFileHtml(fileId?: string): Promise<MrPatientFileContentHtmlEntityPatient>;
    /**
     * 患者病例修改
     */
    static SubUpdate(mrPatientFileIndex?: MrPatientFileIndexEntityPatient, onDutyFlag?: number, contenHtml?: string, contentText?: string, fileContent?: string, elementList?: Array<MrPatientFileElementEntityPatient>, smallContent?: Array<MrPatientFileContentSmallEntityPatient>, updateElement?: Array<MrPatientFileChangeLogEntityPatient>, xmlBodys?: Array<string>, controllers?: Array<ControllerDtoController>): Promise<any>;
    /**
     * 根据条件查询病历信息,默认查询当前患者的病历信息
     *
     *                    1:身份证号码
     *                    2:身份证号码+姓名
     *                    3:病案号
     *                    4:患者号
     *                    5:患者号+来访次
     *                    6:病案号+老访次
     *                    7:姓名
     *                    8:姓名+性别+出生日期
     *                    9:联系人姓名+关系
     */
    static GetAllMrPatientFileIndex(patientId?: string, visitId?: number, patientType?: string): Promise<Map<string, any>>;
    /**
     * 根据分类查询患者病历信息
     *
     */
    static GetPatientFileIndex(patientId?: string, visitId?: number, patientType?: string, mrClassCode?: string): Promise<ArrayData<MrPatientFileIndexModelDtoPatient>>;
}
/**
 * 患者病历打印记录controller
 * Created by 王盛光  on 2017/8/7.
 */
export declare class ApiPatientMrFilePrintLog {
    private static baseUrl;
    /**
     * 模板选项查询
     *
     */
    static FindTemplate(patientId?: string, visitId?: number, deptCode?: string): Promise<ArrayData<Map<string, any>>>;
    /**
     * 患者病例打印列表模糊查询
     *
     */
    static FindPatientFile(startTime?: Date, endTime?: Date, patientId?: string, visitId?: number, printFlag?: boolean, ifPrintFlag?: boolean, name?: string, page?: Page, mrClass?: string, deptCode?: string): Promise<ArrayData<PatientFilePrintModelDtoPatient>>;
    /**
     * 打印
     *
     */
    static Print(mrPatientFilePrintLog?: MrPatientFilePrintLogEntityPatient): Promise<any>;
    /**
     * 打印多条信息
     *
     */
    static Prints(mrPatientFilePrintLog?: Array<MrPatientFilePrintLogEntityPatient>): Promise<any>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/8/14
 * 说明:患者病案首页信息加载
 */
export declare class ApiPatientMrMedicalHome {
    private static baseUrl;
    /**
     * 病案首页信息加载
     *
     */
    static getPatientMedical(patientId?: string, visitId?: number): Promise<Map<string, any>>;
    static getPatientMedicalPrintInfo(patientId?: string, visitId?: number, type?: string, page?: Page): Promise<Map<string, any>>;
    /**
     * 根据患者id和住院标识和诊断类型重新患者的诊断信息
     *
     */
    static findDiagnosisByPatientId(patientId?: string, visitId?: number, type?: string, page?: Page): Promise<ArrayData<DiagnosisModelDtoPatient>>;
    /**
     * 保存病案首页的首页信息
     *
     */
    static save(model?: MrModelDtoPatient, operationList?: Array<OperationDtoPatient>, diagnosisList?: Array<DiagnosisModelDtoPatient>): Promise<any>;
    /**
     * 加载诊断分页信息
     *
     */
    static loadDiagnosis(page?: Page, diagIndicator?: string, diagnosisName?: string): Promise<ArrayData<DiagnosisModelDtoPatient>>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/9/4
 * 说明:患者转出日志
 */
export declare class ApiPatientMrTransfer {
    private static baseUrl;
    /**
     * 保存转出记录
     *
     */
    static save(transfer?: MrPatientTransferEntityPatient): Promise<any>;
    static delete(transfer?: MrPatientTransferEntityPatient): Promise<any>;
    static update(transfer?: MrPatientTransferEntityPatient): Promise<any>;
}
/**
 * 病案编目controller
 * Created by 王盛光  on 2017/8/15.
 */
export declare class ApiPatientFileArchivalCataloging {
    private static baseUrl;
    /**
     * 病案编目模糊查询
     *
     */
    static FindPatientFile(isCatalog?: number, startTime?: Date, endTime?: Date, deptCode?: string, inpNo?: string, page?: Page): Promise<ArrayData<PatientFileArchivalCatalogingModelDtoPatient>>;
    /**
     * 病案编目
     *
     */
    static ArchivalCataloging(patientFileIndexs?: Array<MrPatientFileIndexEntityPatient>): Promise<any>;
}
/**
 * 病案签收
 * Created by 王盛光  on 2017/8/10.
 */
export declare class ApiPatientFileSign {
    private static baseUrl;
    /**
     * 病案签收模糊查询
     *
     */
    static FindPatientFileSign(startDate?: Date, endDate?: Date, inputData?: string, deptDischargeFrom?: string, signFlag?: boolean, page?: Page): Promise<ArrayData<PatientFileSignModelDtoPatient>>;
    /**
     * 签收
     */
    static PatientFileSign(patientFiles?: Array<PatientFileSignModelDtoPatient>): Promise<any>;
    /**
     * 取消签收
     *
     */
    static CancleSign(patientFiles?: Array<PatientFileSignModelDtoPatient>): Promise<any>;
    /**
     * 根据患者唯一标识查询患者有那些病历
     *
     */
    static SelectFormerly(patientId?: string, visitId?: number, type?: string, name?: string, mName?: string, begin?: Date, page?: Page): Promise<ArrayData<MrPatientFileIndexEntityPatient>>;
    static SelectFileContentText(historyid?: string): Promise<MrPatientFileIndexEntityPatient>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/8/2
 * 说明:患者电子病历信息
 */
export declare class ApiPatientMedical {
    private static baseUrl;
    /**
     * 加载当前患者的质控信息
     *
     */
    static getMonitorOnlineList(patientId?: string, visitId?: number, deptCode?: string): Promise<ArrayData<QcMrPatientMonitorOnlineEntityMonitor>>;
    /**
     * 加载患者的病历信息
     *
     */
    static getPatientMedicalInfo(patientId?: string, visitId?: number, deptCode?: string): Promise<Map<string, any>>;
    /**
     *  患者病案分类信息
     *
     */
    static findTemplateClass(patientId?: string, visitId?: number, deptCode?: string): Promise<ArrayData<MrTemplateClassModelDtoTemplate>>;
    /**
     * 分页查询患者病例信息
     *
     */
    static findPatinetFileListByPage(mrClassCode?: string, page?: Page, patientId?: string, visitId?: number, deptCode?: string, curDeptCode?: string): Promise<ArrayData<MrPatientFileIndexModelDtoPatient>>;
    /**
     * 加载患者医嘱信息
     *
     */
    static getPatientOrder(page?: Page, patientId?: string, visitId?: number, orderClass?: string, repeatIndicator?: string, state?: string): Promise<ArrayData<OrdersDtoOak>>;
    /**
     * 查询患者当前所在科室的基本信息
     *
     */
    static getPatientInfoInHospital(patientId?: string, visitId?: number, deptCode?: string): Promise<Map<string, any>>;
    /**
     *  诊疗项目
     */
    static findClinicItemClassDict(): Promise<ArrayData<ClinicItemClassDictEntityDict>>;
    /**
     * 查询医生职称
     */
    static findDoctorTitleDict(): Promise<ArrayData<DoctorTitleDictEntityDict>>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:病案归档
 */
export declare class ApiPatientPigeonhole {
    private static baseUrl;
    /**
     * 病案归档模糊查询
     *
     */
    static selectPigeonhole(pitchon?: number, status?: number, begin?: Date, end?: Date, inputData?: string, deptCode?: string, page?: Page): Promise<ArrayData<PatientPigeonholeEntityPatient>>;
    /**
     * 病案归档操作
     *
     */
    static updatePigeonhole(patientPigeonhole?: Array<PatientPigeonholeEntityPatient>): Promise<any>;
    /**
     * 病案归档操作
     *
     */
    static deletePigeonhole(PatientPigeonhole?: Array<PatientPigeonholeEntityPatient>): Promise<any>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/10/11
 * 说明:体温单相关信息查询
 */
export declare class ApiPatientVitalSignsRec {
    private static baseUrl;
    /**
     * 查询患者体温单信息
     *
     */
    static getInfo(patientId?: string, visitId?: number, type?: number, time?: Date): Promise<TemperatureChartDtoPatient>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:查询可以病历召回患者以可以召回的病历信息
 */
export declare class ApiRecallPatient {
    private static baseUrl;
    /**
     * 可以进行病历召回的患者查询
     *
     */
    static selectPatient(userId?: number, inpNo?: string, name?: string, patientId?: string, deptCode?: Array<string>, begin?: Date, end?: Date, page?: Page): Promise<ArrayData<PatientRecallModelDtoRecall>>;
    /**
     * 根据患者的id和住院标识查询病历信息
     *
     */
    static selectPatientFileModel(patientId?: string, visitId?: number, page?: Page): Promise<ArrayData<PatientFileModelDtoRecall>>;
}
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:病历召回
 */
export declare class ApiRecallRecalls {
    private static baseUrl;
    /**
     * 召回申请
     *
     */
    static insertFilecrDetial(mrPatientFileRecall?: Array<PatientFileRecallModelDtoRecall>): Promise<any>;
    /**
     * 召回申请审核
     *
     */
    static insertFilecrDetialAudit(mrPatientFileRecallList?: Array<MrPatientFileRecallEntityRecall>): Promise<any>;
    /**
     * 根据申请人的id查询召回申请人查询申请及审核
     *
     */
    static selectFileRecall(userId?: number, synthesize?: string, begin?: Date, end?: Date, radio?: number, deptCode?: Array<string>, page?: Page): Promise<ArrayData<MrPatientFileRecallModelDtoRecall>>;
    /**
     * 查询病历召回申请
     *
     */
    static selectApproveFileRecall(userId?: number, synthesize?: string, begin?: Date, end?: Date, radio?: number, deptCode?: Array<string>, page?: Page): Promise<ArrayData<MrPatientFileRecallModelDtoRecall>>;
    /**
     * 根据召回申请id查询召回病历详情
     *
     */
    static selectFilecrDetial(recallId?: string): Promise<ArrayData<MrPatientFilecrDetialEntityRecall>>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/10/9
 * 说明: 参数配置查询
 */
export declare class ApiSystemDictParam {
    private static baseUrl;
    /**
     * 是否显示字纸病历上交人员信息填写框
     *
     */
    static GetIsShowMrSubmitInfo(): Promise<any>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/24
 * 说明:用户登录
 */
export declare class ApiSystemLogin {
    private static baseUrl;
    static login(appId?: string, key?: string, hospitalCode?: string, empId?: string): Promise<any>;
}
/**
 * 用户信息维护
 * Created by 王盛光  on 2017/8/19.
 */
export declare class ApiSystemUserDict {
    private static baseUrl;
    /**
     * 修改密码
     *
     */
    static updateCode(code?: string, empNo?: string): Promise<any>;
    /**
     * 保存用户信息
     */
    static save(userDict?: UserDictEntitySystem): Promise<any>;
    /**
     * 修改用户信息
     */
    static update(userDict?: UserDictEntitySystem): Promise<any>;
}
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/21
 * 说明: 电子病历模板 数据元类型
 */
export declare class ApiTemplateDsTypeIndex {
    private static baseUrl;
    /**
     * 添加目录
     *
     */
    static saveDir(index?: DsTypeIndexEntityTemplate): Promise<any>;
    /**
     * 加载类型,控件,以及控件类型字典
     *
     */
    static getData(name?: string): Promise<Map<string, any>>;
    /**
     * 新增修改控件
     *
     */
    static saveOrUpdateControl(typeIndex?: DsTypeIndexEntityTemplate, index?: DsIndexEntityTemplate, itemList?: Array<DsValuesItemsModelDtoTemplate>): Promise<any>;
    /**
     * 加载控件信息
     *
     */
    static loadControlInfo(id?: string, version?: string): Promise<DsIndexModelDtoTemplate>;
}
/**
 * 模板分类Controller
 * Created by 王盛光  on 2017/7/20.
 */
export declare class ApiTemplateMrClass {
    private static baseUrl;
    /**
     * 新建病历获取大模板分类
     *
     */
    static findMrTemplate(): Promise<ArrayData<MrTemplateClassModelDtoTemplate>>;
    /**
     * 获取大模板分类
     *
     */
    static findMrTemplateClass(radio?: number): Promise<ArrayData<MrTemplateClassModelDtoTemplate>>;
    /**
     * 修改模板分类
     *
     */
    static updateMrtemplateClass(mrTemplateClass?: MrTemplateClassEntityTemplate): Promise<any>;
    /**
     * 删除模板分类
     *
     */
    static deleteMrTemplateClass(mrClassCode?: string, radio?: number): Promise<any>;
    /**
     * 新增模板分类
     *
     */
    static saveMrTemplateClass(mrTemplateClass?: MrTemplateClassEntityTemplate): Promise<any>;
    /**
     * 新增模板分类的字典信息
     *
     */
    static toSaveOrUpdate(): Promise<Map<string, any>>;
}
/**
 * 模板索引Controller
 * Created by 王盛光  on 2017/7/24.
 */
export declare class ApiTemplateMrIndex {
    private static baseUrl;
    /**
     * 新增模板分类的字典信息
     *
     */
    static toSaveOrUpdate(): Promise<Map<string, any>>;
    /**
     * 新建模板索引
     *
     */
    static saveMrTemplateIndex(mrTemplateIndex?: MrTemplateIndexEntityTemplate): Promise<any>;
    /**
     * 修改模板索引
     *
     */
    static updateMrTemplateIndex(mrTemplateIndex?: MrTemplateIndexEntityTemplate): Promise<any>;
    /**
     * 获取可用总模板数
     *
     */
    static countAll(): Promise<Map<string, any>>;
    /**
     * 删除模板
     *
     */
    static deleteMrTemplateIndex(id?: string): Promise<any>;
    /**
     * 保存模板内容
     *
     */
    static saveMrTemplateIndexContent(mrTemplateContent?: MrTemplateContentEntityTemplate): Promise<any>;
    /**
     * 模板内容查询
     *
     */
    static getMrTemplateContent(id?: string): Promise<MrTemplateContentEntityTemplate>;
    /**
     * 患者新建病历界面,查询模板信息
     *
     */
    static findByPage(mrClass?: string, tempaleType?: number, name?: string, page?: Page, time?: Date, monitorCode?: string, deptCode?: string, patientId?: string, visitId?: number): Promise<ArrayData<MrTemplateIndexModelDtoTemplate>>;
    /**
     * 根据模板分类code查询模板信息
     *
     */
    static selectMrTemplateIndex(mrClass?: string, name?: string, page?: Page, radio?: number): Promise<ArrayData<MrTemplateIndexModelDtoTemplate>>;
    /**
     * 查询数据集的信息
     *
     */
    static bdDsIndex(cvName?: string, page?: Page): Promise<ArrayData<BdDsIndexModelDtoDataSet>>;
    /**
     * 查询可替换项目
     *
     */
    static getSynchronousElementDict(): Promise<ArrayData<SynchronousElementDictEntityDataSet>>;
    /**
     * 获取模板内容历史
     *
     */
    static findHistoryContent(id?: string): Promise<ArrayData<MrTemplateContentEntityTemplate>>;
    /**
     * 根据id获取模板索引修改信息
     *
     */
    static getMrTemplateIndexUpdateFlag(id?: string): Promise<MrTemplateIndexEntityTemplate>;
}
/**
 * 结构化小模板controller
 * Created by 王盛光  on 2017/7/31.
 */
export declare class ApiTemplateMrTempletSmallIndex {
    private static baseUrl;
    /**
     * 保存小模板
     *
     */
    static SaveMrTempletSmallIndex(mrTempletSmallIndex?: MrTempletSmallIndexEntityTemplate): Promise<any>;
    /**
     * 删除小模板
     *
     */
    static DeleteMrTempletSmallIndex(id?: number): Promise<any>;
    static FindAll(): Promise<ArrayData<MrTempletSmallIndexEntityTemplate>>;
}
