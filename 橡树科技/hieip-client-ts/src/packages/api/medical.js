"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var api_1 = require("../../tools/api");
/**
 * 关键词controller
 * Created by 王盛光  on 2017/8/14.
 */
var ApiCruxMr = /** @class */ (function () {
    function ApiCruxMr() {
    }
    /**
     * 查询所有分类并进行统计各分类中关键词的数量
     */
    ApiCruxMr.findMrCruxType = function () {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "findMrCruxType", {});
    };
    /**
     * 查询关键词分类
     *
     */
    ApiCruxMr.findMrCruxByTypeAndDept = function (deptCode, hospitalNo) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "findMrCruxByTypeAndDept", { deptCode: deptCode, hospitalNo: hospitalNo });
    };
    /**
     * 关键词类型查询
     *
     */
    ApiCruxMr.findByHospitalNoAndDeptCodeAndCruxTypeCode = function (deptCode, cruxTypeCode, hospitalNo, page) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "findByHospitalNoAndDeptCodeAndCruxTypeCode", { deptCode: deptCode, cruxTypeCode: cruxTypeCode, hospitalNo: hospitalNo, page: page });
    };
    /**
     * 保存关键词分类
     *
     */
    ApiCruxMr.saveCruxType = function (mrCruxType) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "saveCruxType", { mrCruxType: mrCruxType });
    };
    /**
     * 删除分类
     *
     */
    ApiCruxMr.deleteCruxType = function (id) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "deleteCruxType", { id: id });
    };
    /**
     * 模糊查询关键词
     *
     */
    ApiCruxMr.findMrCrux = function (cruxTypeCode, type, name) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "findMrCrux", { cruxTypeCode: cruxTypeCode, type: type, name: name });
    };
    /**
     * 查询病区拥有关键词
     *
     */
    ApiCruxMr.findDept = function (hospitalNo) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "findDept", { hospitalNo: hospitalNo });
    };
    /**
     * 保存关键词
     *
     */
    ApiCruxMr.saveCrux = function (mrCrux) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "saveCrux", { mrCrux: mrCrux });
    };
    /**
     * 删除关键词
     *
     */
    ApiCruxMr.deleteCrux = function (id) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "deleteCrux", { id: id });
    };
    /**
     * 获取关键词内容
     *
     */
    ApiCruxMr.findCruxContent = function (id) {
        return api_1.medicalApi.connection("POST", ApiCruxMr.baseUrl, "findCruxContent", { id: id });
    };
    ApiCruxMr.baseUrl = '/crux/mrCrux/';
    return ApiCruxMr;
}());
exports.ApiCruxMr = ApiCruxMr;
/**
 * 创建人:王盛光
 * 创建时间:2017/7/27
 * 说明:值域索引Controller
 */
var ApiDataSetBdCvIndex = /** @class */ (function () {
    function ApiDataSetBdCvIndex() {
    }
    /**
     * 分页查询值域
     *
     */
    ApiDataSetBdCvIndex.findAll = function (page, cvName, enabled) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "findAll", { page: page, cvName: cvName, enabled: enabled });
    };
    /**
     * 新增值域
     *
     */
    ApiDataSetBdCvIndex.saveCvIndex = function (bdCvIndex) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "saveCvIndex", { bdCvIndex: bdCvIndex });
    };
    /**
     * 删除值域
     *
     */
    ApiDataSetBdCvIndex.deleteCvIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "deleteCvIndex", { id: id });
    };
    /**
     * 值域修改
     *
     */
    ApiDataSetBdCvIndex.updateCvIndex = function (bdCvIndex) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "updateCvIndex", { bdCvIndex: bdCvIndex });
    };
    /**
     * 值域启动
     *
     */
    ApiDataSetBdCvIndex.stratCvIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "stratCvIndex", { id: id });
    };
    /**
     * 选择单个值域
     *
     */
    ApiDataSetBdCvIndex.selectCvIndex = function (id, version) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "selectCvIndex", { id: id, version: version });
    };
    /**
     * 根据值域id和版本id查询值域项信息
     *
     */
    ApiDataSetBdCvIndex.selectBdCvItems = function (id, version) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "selectBdCvItems", { id: id, version: version });
    };
    /**
     * 新建版本
     *
     */
    ApiDataSetBdCvIndex.newVersion = function (bdCvVersionsModel) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "newVersion", { bdCvVersionsModel: bdCvVersionsModel });
    };
    /**
     * 发布版本
     *
     */
    ApiDataSetBdCvIndex.publishVersion = function (id, curVersion) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvIndex.baseUrl, "publishVersion", { id: id, curVersion: curVersion });
    };
    ApiDataSetBdCvIndex.baseUrl = '/dataSet/bdCvIndex/';
    return ApiDataSetBdCvIndex;
}());
exports.ApiDataSetBdCvIndex = ApiDataSetBdCvIndex;
/**
 * 创建人:王盛光
 * 创建时间:2017/7/28
 * 说明:值域数据项Controller
 */
var ApiDataSetBdCvItems = /** @class */ (function () {
    function ApiDataSetBdCvItems() {
    }
    /**
     * 新增值域项
     *
     */
    ApiDataSetBdCvItems.saveBdCvItems = function (bdCvItems) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvItems.baseUrl, "saveBdCvItems", { bdCvItems: bdCvItems });
    };
    /**
     * 修改值域项
     *
     */
    ApiDataSetBdCvItems.updateBdCvItems = function (bdCvItems) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvItems.baseUrl, "updateBdCvItems", { bdCvItems: bdCvItems });
    };
    /**
     * 删除
     *
     */
    ApiDataSetBdCvItems.deleteBdCvItems = function (bdCvItems) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdCvItems.baseUrl, "deleteBdCvItems", { bdCvItems: bdCvItems });
    };
    /**
     * 根据id查询值域项
     *
     */
    ApiDataSetBdCvItems.findByCvId = function (cvId) {
        return api_1.medicalApi.connection("GET", ApiDataSetBdCvItems.baseUrl, "findByCvId", { cvId: cvId });
    };
    ApiDataSetBdCvItems.findGroupByCvId = function (cvId) {
        return api_1.medicalApi.connection("GET", ApiDataSetBdCvItems.baseUrl, "findGroupByCvId", { cvId: cvId });
    };
    ApiDataSetBdCvItems.baseUrl = '/dataSet/bdCvItems/';
    return ApiDataSetBdCvItems;
}());
exports.ApiDataSetBdCvItems = ApiDataSetBdCvItems;
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/26
 * 说明:数据元
 */
var ApiDataSetBdDeIndex = /** @class */ (function () {
    function ApiDataSetBdDeIndex() {
    }
    /**
     * 查询数据元数据,分页查询
     *
     */
    ApiDataSetBdDeIndex.getBdIndexData = function (page, beName) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "getBdIndexData", { page: page, beName: beName });
    };
    /**
     * 根据id查询数据元的信息
     *
     */
    ApiDataSetBdDeIndex.selectBdDeIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "selectBdDeIndex", { id: id });
    };
    /**
     * 查询数据元数据,分页查询
     *
     */
    ApiDataSetBdDeIndex.getBdIndexData1 = function (page, beName, bdDsId) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "getBdIndexData1", { page: page, beName: beName, bdDsId: bdDsId });
    };
    /**
     * 加载单个数据元的详细信息
     *
     */
    ApiDataSetBdDeIndex.getBdIndexInfo = function (id, deCvCode) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "getBdIndexInfo", { id: id, deCvCode: deCvCode });
    };
    /**
     * 保存数据元信息
     *
     */
    ApiDataSetBdDeIndex.saveOrUpdateBdDeIndex = function (index) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "saveOrUpdateBdDeIndex", { index: index });
    };
    /**
     * 修改,或添加之前,加载基础数据
     *
     */
    ApiDataSetBdDeIndex.toSaveOrUpdate = function () {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "toSaveOrUpdate", {});
    };
    /**
     * 查询值域项目
     *
     */
    ApiDataSetBdDeIndex.getCvIndex = function (page, cvName, enabled) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "getCvIndex", { page: page, cvName: cvName, enabled: enabled });
    };
    ApiDataSetBdDeIndex.inputTiltle = function (tableName) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "inputTiltle", { tableName: tableName });
    };
    ApiDataSetBdDeIndex.selectInput = function (tableName, name, page, user) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "selectInput", { tableName: tableName, name: name, page: page, user: user });
    };
    /**
     * 删除数据元信息
     *
     */
    ApiDataSetBdDeIndex.deleteBeIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDeIndex.baseUrl, "deleteBeIndex", { id: id });
    };
    ApiDataSetBdDeIndex.baseUrl = '/dataSet/bdDeIndex/';
    return ApiDataSetBdDeIndex;
}());
exports.ApiDataSetBdDeIndex = ApiDataSetBdDeIndex;
/**
 * 创建人:王盛光
 * 创建时间:2017/7/27
 * 说明:数据组controller
 */
var ApiDataSetBdDgIndex = /** @class */ (function () {
    function ApiDataSetBdDgIndex() {
    }
    /**
     * 分页查询索引数据组
     *
     */
    ApiDataSetBdDgIndex.findAll = function (page, bgName) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDgIndex.baseUrl, "findAll", { page: page, bgName: bgName });
    };
    ApiDataSetBdDgIndex.baseUrl = '/dataSet/bdDgIndex/';
    return ApiDataSetBdDgIndex;
}());
exports.ApiDataSetBdDgIndex = ApiDataSetBdDgIndex;
/**
 * 创建人:王盛光
 * 创建时间:2017/7/26
 * 说明:数据集索引Controller
 */
var ApiDataSetBdDsIndex = /** @class */ (function () {
    function ApiDataSetBdDsIndex() {
    }
    /**
     * 查询全部数据集
     *
     */
    ApiDataSetBdDsIndex.findAll = function (cvName, page) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "findAll", { cvName: cvName, page: page });
    };
    /**
     * 根据id 查询对应数据元信息
     */
    ApiDataSetBdDsIndex.findById = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "findById", { id: id });
    };
    /**
     * 根据选中的数据集id和版本号查询这个数据集对应的数据信息
     *
     */
    ApiDataSetBdDsIndex.findBdDsIndex = function (id, curVersion) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "findBdDsIndex", { id: id, curVersion: curVersion });
    };
    /**
     * 根据选中的数据集id和版本号查询数据元信息
     *
     */
    ApiDataSetBdDsIndex.selectBdDeIndex = function (id, curVersion) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "selectBdDeIndex", { id: id, curVersion: curVersion });
    };
    /**
     * 新增数据集
     *
     */
    ApiDataSetBdDsIndex.saveBdDsIndex = function (bdDsIndex) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "saveBdDsIndex", { bdDsIndex: bdDsIndex });
    };
    /**
     * 根据数据集id删除该数据集对应的数据
     *
     */
    ApiDataSetBdDsIndex.deleteBdDsIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "deleteBdDsIndex", { id: id });
    };
    /**
     * 创建新版本
     *
     */
    ApiDataSetBdDsIndex.versionBdDsIndex = function (bdDsVersionsModel) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "versionBdDsIndex", { bdDsVersionsModel: bdDsVersionsModel });
    };
    /**
     * 发布新版本
     *
     */
    ApiDataSetBdDsIndex.publishVersion = function (dsId, currVersion) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "publishVersion", { dsId: dsId, currVersion: currVersion });
    };
    /**
     * 数据元模糊查询
     *
     */
    ApiDataSetBdDsIndex.findDgOrCv = function (dsId, curVersion, name) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "findDgOrCv", { dsId: dsId, curVersion: curVersion, name: name });
    };
    /**
     * 根据数据集id和版本号新增数据元信息
     *
     */
    ApiDataSetBdDsIndex.insertBdDsVsDe = function (dsId, curVersion, name) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdDsIndex.baseUrl, "insertBdDsVsDe", { dsId: dsId, curVersion: curVersion, name: name });
    };
    ApiDataSetBdDsIndex.baseUrl = '/dataSet/bdDsIndex/';
    return ApiDataSetBdDsIndex;
}());
exports.ApiDataSetBdDsIndex = ApiDataSetBdDsIndex;
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/27
 * 说明: 固定值维护
 */
var ApiDataSetBdFixedIndex = /** @class */ (function () {
    function ApiDataSetBdFixedIndex() {
    }
    /**
     * 加载固定值以具体字段信息
     *
     */
    ApiDataSetBdFixedIndex.loadBdFixedData = function () {
        return api_1.medicalApi.connection("POST", ApiDataSetBdFixedIndex.baseUrl, "loadBdFixedData", {});
    };
    /**
     * 加载单个固定值信息
     *
     */
    ApiDataSetBdFixedIndex.loadBdFixedInfo = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdFixedIndex.baseUrl, "loadBdFixedInfo", { id: id });
    };
    /**
     * 保存固定值信息
     *
     */
    ApiDataSetBdFixedIndex.saveBdFixed = function (bdFixedIndex, itemsList) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdFixedIndex.baseUrl, "saveBdFixed", { bdFixedIndex: bdFixedIndex, itemsList: itemsList });
    };
    /**
     * 修改固定值信息
     *
     */
    ApiDataSetBdFixedIndex.updateBdFixed = function (bdFixedIndex, itemsList) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdFixedIndex.baseUrl, "updateBdFixed", { bdFixedIndex: bdFixedIndex, itemsList: itemsList });
    };
    /**
     * 物理删除固定值
     *
     */
    ApiDataSetBdFixedIndex.deleteBdFixed = function (id) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdFixedIndex.baseUrl, "deleteBdFixed", { id: id });
    };
    /**
     * 加载固定值
     *
     */
    ApiDataSetBdFixedIndex.loadFixedInfo = function (patientId, visitId, deptCode, wardCode, list) {
        return api_1.medicalApi.connection("POST", ApiDataSetBdFixedIndex.baseUrl, "loadFixedInfo", { patientId: patientId, visitId: visitId, deptCode: deptCode, wardCode: wardCode, list: list });
    };
    ApiDataSetBdFixedIndex.baseUrl = '/dataSet/bdFixedIndex/';
    return ApiDataSetBdFixedIndex;
}());
exports.ApiDataSetBdFixedIndex = ApiDataSetBdFixedIndex;
/**
 * 创建人:黄倩
 * 创建时间:2017/12/19
 * 说明:模糊查询控件controller
 */
var ApiDictInput = /** @class */ (function () {
    function ApiDictInput() {
    }
    /**
     * 查询模糊查询控件的主信息
     *
     */
    ApiDictInput.select = function (name) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "select", { name: name });
    };
    /**
     * 查询模糊查询控件的列明细信息
     *
     */
    ApiDictInput.selectList = function (dictCode) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "selectList", { dictCode: dictCode });
    };
    /**
     * 查询模糊查询控件的所有列
     *
     */
    ApiDictInput.selectTable = function (tableName) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "selectTable", { tableName: tableName });
    };
    /**
     * 新增/更新 模糊查询控件
     *
     */
    ApiDictInput.save = function (inputDicts, inputs) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "save", { inputDicts: inputDicts, inputs: inputs });
    };
    /**
     * 作废模糊查询控件的列明细信息
     *
     */
    ApiDictInput.deleteOne = function (id) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "deleteOne", { id: id });
    };
    /**
     * 作废模糊查询控件
     *
     */
    ApiDictInput.delete = function (dictCode) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "delete", { dictCode: dictCode });
    };
    /**
     * 查询字典数据列
     *
     */
    ApiDictInput.loadColumns = function (dictCode) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "loadColumns", { dictCode: dictCode });
    };
    /**
     * 加载多个
     */
    ApiDictInput.loadMultipleColumns = function (dictCodes) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "loadMultipleColumns", { dictCodes: dictCodes });
    };
    /**
     * 查询字典数据
     *
     */
    ApiDictInput.loadData = function (page, dictCode, inputCode) {
        return api_1.medicalApi.connection("POST", ApiDictInput.baseUrl, "loadData", { page: page, dictCode: dictCode, inputCode: inputCode });
    };
    ApiDictInput.baseUrl = '/dict/inputDict/';
    return ApiDictInput;
}());
exports.ApiDictInput = ApiDictInput;
/**
 * 文书类型字典表controller
 * Created by 王盛光  on 2017/7/20.
 */
var ApiDictionaryFileVisitTypeDict = /** @class */ (function () {
    function ApiDictionaryFileVisitTypeDict() {
    }
    /**
     * 查询全部文书字典
     *
     */
    ApiDictionaryFileVisitTypeDict.FindAll = function () {
        return api_1.medicalApi.connection("POST", ApiDictionaryFileVisitTypeDict.baseUrl, "/findAll", {});
    };
    /**
     * 查询医院字典
     *
     */
    ApiDictionaryFileVisitTypeDict.FindHospitalDict = function () {
        return api_1.medicalApi.connection("POST", ApiDictionaryFileVisitTypeDict.baseUrl, "/findHospitalDict", {});
    };
    /**
     * 查询科室字典
     *
     */
    ApiDictionaryFileVisitTypeDict.FindDeptDict = function (hospitalCode) {
        return api_1.medicalApi.connection("POST", ApiDictionaryFileVisitTypeDict.baseUrl, "/findDeptDict", { hospitalCode: hospitalCode });
    };
    /**
     * 查询状态
     *
     */
    ApiDictionaryFileVisitTypeDict.FindStatus = function () {
        return api_1.medicalApi.connection("POST", ApiDictionaryFileVisitTypeDict.baseUrl, "/findStatus", {});
    };
    ApiDictionaryFileVisitTypeDict.baseUrl = '/dictionary/fileVisitTypeDict';
    return ApiDictionaryFileVisitTypeDict;
}());
exports.ApiDictionaryFileVisitTypeDict = ApiDictionaryFileVisitTypeDict;
/**
 * 医生三级分组表 controller
 * Created by 王盛光  on 2017/8/17.
 */
var ApiDoctorSysGroup = /** @class */ (function () {
    function ApiDoctorSysGroup() {
    }
    /**
     * 三级医生信息模糊查询
     *
     */
    ApiDoctorSysGroup.LoadDoctor = function (name) {
        return api_1.medicalApi.connection("POST", ApiDoctorSysGroup.baseUrl, "/loadDoctor", { name: name });
    };
    /**
     * 更新三级医生信息
     *
     */
    ApiDoctorSysGroup.Update = function (sysDoctorGroup) {
        return api_1.medicalApi.connection("POST", ApiDoctorSysGroup.baseUrl, "/update", { sysDoctorGroup: sysDoctorGroup });
    };
    ApiDoctorSysGroup.baseUrl = '/doctor/sysDoctorGroup';
    return ApiDoctorSysGroup;
}());
exports.ApiDoctorSysGroup = ApiDoctorSysGroup;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:手动质控评分类型字典控制器
 */
var ApiHandMonitorMrGradingClass = /** @class */ (function () {
    function ApiHandMonitorMrGradingClass() {
    }
    /**
     * 查询质控评分类
     *
     */
    ApiHandMonitorMrGradingClass.GradingClassinfo = function () {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingClass.baseUrl, "GradingClassinfo", {});
    };
    /**
     * 新增质控评分类
     *
     */
    ApiHandMonitorMrGradingClass.insertGradingClass = function (mrGradingClass) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingClass.baseUrl, "insertGradingClass", { mrGradingClass: mrGradingClass });
    };
    /**
     * 更新质控评分类
     *
     */
    ApiHandMonitorMrGradingClass.updateGradingClass = function (mrGradingClass) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingClass.baseUrl, "updateGradingClass", { mrGradingClass: mrGradingClass });
    };
    /**
     * 删除手动质控评分类
     *
     */
    ApiHandMonitorMrGradingClass.deleteGradingClass = function (id, code) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingClass.baseUrl, "deleteGradingClass", { id: id, code: code });
    };
    /**
     * 根据质控的id查询相关模板信息
     *
     */
    ApiHandMonitorMrGradingClass.selectTemplate = function (code, page, name) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingClass.baseUrl, "selectTemplate", { code: code, page: page, name: name });
    };
    ApiHandMonitorMrGradingClass.baseUrl = '/handMonitor/mrGradingClass/';
    return ApiHandMonitorMrGradingClass;
}());
exports.ApiHandMonitorMrGradingClass = ApiHandMonitorMrGradingClass;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:质控评分类型的项目明细
 */
var ApiHandMonitorMrGradingItems = /** @class */ (function () {
    function ApiHandMonitorMrGradingItems() {
    }
    /**
     * 根据分类编号查询评分项目明细
     *
     */
    ApiHandMonitorMrGradingItems.selectItems = function (code, page, name) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingItems.baseUrl, "selectItems", { code: code, page: page, name: name });
    };
    /**
     * 新增质控评分项
     *
     */
    ApiHandMonitorMrGradingItems.insertItems = function (items, code) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingItems.baseUrl, "insertItems", { items: items, code: code });
    };
    /**
     * 更新质控评分项
     *
     */
    ApiHandMonitorMrGradingItems.updateItems = function (items) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingItems.baseUrl, "updateItems", { items: items });
    };
    /**
     * 删除质控评分项
     *
     */
    ApiHandMonitorMrGradingItems.deleteItem = function (idList) {
        return api_1.medicalApi.connection("POST", ApiHandMonitorMrGradingItems.baseUrl, "deleteItem", { idList: idList });
    };
    ApiHandMonitorMrGradingItems.baseUrl = '/handMonitor/mrGradingItems/';
    return ApiHandMonitorMrGradingItems;
}());
exports.ApiHandMonitorMrGradingItems = ApiHandMonitorMrGradingItems;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:质控评患者查询
 */
var ApiLinkQualityPatMasterInfo = /** @class */ (function () {
    function ApiLinkQualityPatMasterInfo() {
    }
    /**
     * 质控患者的信息模糊查询
     *
     */
    ApiLinkQualityPatMasterInfo.selectInfo = function (radio, info, comeOut, begin, end, type, status, deptCode, value, page) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityPatMasterInfo.baseUrl, "selectInfo", { radio: radio, info: info, comeOut: comeOut, begin: begin, end: end, type: type, status: status, deptCode: deptCode, value: value, page: page });
    };
    /**
     * 质控患者的信息模糊查询
     *
     */
    ApiLinkQualityPatMasterInfo.seleDept = function (rode) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityPatMasterInfo.baseUrl, "seleDept", { rode: rode });
    };
    ApiLinkQualityPatMasterInfo.baseUrl = '/linkQuality/patMasterInfo/';
    return ApiLinkQualityPatMasterInfo;
}());
exports.ApiLinkQualityPatMasterInfo = ApiLinkQualityPatMasterInfo;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:整改记录管理
 */
var ApiLinkQualityRectification = /** @class */ (function () {
    function ApiLinkQualityRectification() {
    }
    /**
     * 根据患者唯一标识查询患者有那些病历
     *
     */
    ApiLinkQualityRectification.selectFormerly = function (patientId, visitId, type, name, mName, begin, page, fileName) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "selectFormerly", { patientId: patientId, visitId: visitId, type: type, name: name, mName: mName, begin: begin, page: page, fileName: fileName });
    };
    /**
     * 查询所有的质控评分类别以及对应的默认选中的评分明细信息
     *
     */
    ApiLinkQualityRectification.selectClassTimes = function (fileNo, mrClass) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "selectClassTimes", { fileNo: fileNo, mrClass: mrClass });
    };
    /**
     * 根据选中的质控评分类别查询评分明细的信息
     *
     */
    ApiLinkQualityRectification.selectMrGradingItems = function (classCode) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "selectMrGradingItems", { classCode: classCode });
    };
    /**
     * 根据患者唯一标识查询患者有整改主记录
     *
     */
    ApiLinkQualityRectification.selectIndexs = function (patientId, visitId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "selectIndexs", { patientId: patientId, visitId: visitId });
    };
    /**
     * 根据选中的整改总记录id查询整改明细
     *
     */
    ApiLinkQualityRectification.selectItems = function (indexId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "selectItems", { indexId: indexId });
    };
    /**
     * 添加整改记录
     *
     */
    ApiLinkQualityRectification.insertInfo = function (index) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "insertInfo", { index: index });
    };
    /**
     * 根据患者唯一标识查询患者质控记录（手动加自动）
     *
     */
    ApiLinkQualityRectification.qualityControl = function (patientId, visitId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityRectification.baseUrl, "qualityControl", { patientId: patientId, visitId: visitId });
    };
    ApiLinkQualityRectification.baseUrl = '/linkQuality/rectification/';
    return ApiLinkQualityRectification;
}());
exports.ApiLinkQualityRectification = ApiLinkQualityRectification;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:质控跟踪管理
 */
var ApiLinkQualityTrackingRecord = /** @class */ (function () {
    function ApiLinkQualityTrackingRecord() {
    }
    /**
     * 查询所有的整改通知
     *
     */
    ApiLinkQualityTrackingRecord.selectIndex = function (patientId, visitId, status, userName, begin, end, page) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "selectIndex", { patientId: patientId, visitId: visitId, status: status, userName: userName, begin: begin, end: end, page: page });
    };
    ApiLinkQualityTrackingRecord.selectItems = function (indexId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "selectItems", { indexId: indexId });
    };
    /**
     * 查询所有的整改通知
     *
     */
    ApiLinkQualityTrackingRecord.insertReset = function (itemsId, mainId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "insertReset", { itemsId: itemsId, mainId: mainId });
    };
    /**
     * 根据给定的id删除整改明细
     *
     */
    ApiLinkQualityTrackingRecord.deleteItem = function (items) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "deleteItem", { items: items });
    };
    /**
     * 根据给定的id删除整改主记录
     *
     */
    ApiLinkQualityTrackingRecord.deleteIndex = function (Index) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "deleteIndex", { Index: Index });
    };
    /**
     * 根据给定的id进行整改主记录确认
     *
     */
    ApiLinkQualityTrackingRecord.insertItems = function (rectificationItems, indexId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "insertItems", { rectificationItems: rectificationItems, indexId: indexId });
    };
    /**
     * 根据整改明细信息id查询整改内容和返修明细
     *
     */
    ApiLinkQualityTrackingRecord.selectDict = function (itemId, fileId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "selectDict", { itemId: itemId, fileId: fileId });
    };
    /**
     * 根据给定的用户id查询整改主记录
     *
     */
    ApiLinkQualityTrackingRecord.selectUserIndex = function (receiveUserId) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "selectUserIndex", { receiveUserId: receiveUserId });
    };
    /**
     * 整改信息接收人确认操作
     *
     */
    ApiLinkQualityTrackingRecord.insertStatus = function (items) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "insertStatus", { items: items });
    };
    /**
     * 整改信息接收人病历错误信息修改完成操作
     *
     */
    ApiLinkQualityTrackingRecord.insertAccomplish = function (items) {
        return api_1.medicalApi.connection("POST", ApiLinkQualityTrackingRecord.baseUrl, "insertAccomplish", { items: items });
    };
    ApiLinkQualityTrackingRecord.baseUrl = '/linkQuality/trackingRecord/';
    return ApiLinkQualityTrackingRecord;
}());
exports.ApiLinkQualityTrackingRecord = ApiLinkQualityTrackingRecord;
/**
 * 创建人:谢小慧
 * 创建时间:2017/8/10
 * 说明:
 */
var ApiMonitorQcMrGradingItemsDict = /** @class */ (function () {
    function ApiMonitorQcMrGradingItemsDict() {
    }
    /**
     * 模糊查询病案质控信息
     *
     */
    ApiMonitorQcMrGradingItemsDict.getGrading = function (page, name) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrGradingItemsDict.baseUrl, "getGrading", { page: page, name: name });
    };
    ApiMonitorQcMrGradingItemsDict.baseUrl = '/monitor/qcMrGradingItemsDict/';
    return ApiMonitorQcMrGradingItemsDict;
}());
exports.ApiMonitorQcMrGradingItemsDict = ApiMonitorQcMrGradingItemsDict;
/**
 * 自动质控项目Controller
 * Created by 王盛光  on 2017/7/29.
 */
var ApiMonitorQcMrItems = /** @class */ (function () {
    function ApiMonitorQcMrItems() {
    }
    /**
     * 模糊查询自动质控项目
     *
     */
    ApiMonitorQcMrItems.findQcMrMonitorItems = function (qcName, hosId) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrItems.baseUrl, "findQcMrMonitorItems", { qcName: qcName, hosId: hosId });
    };
    /**
     * 删除自动质控项目
     *
     */
    ApiMonitorQcMrItems.deleteQcMrMonitorItems = function (ids) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrItems.baseUrl, "deleteQcMrMonitorItems", { ids: ids });
    };
    //    /**
    //     * 保存自动质控项目
    //     *
    //     */
    ApiMonitorQcMrItems.saveQcMrMonitorItems = function (qcMrMonitorItems) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrItems.baseUrl, "saveQcMrMonitorItems", { qcMrMonitorItems: qcMrMonitorItems });
    };
    //    /**
    //     * 查询质控项目对应事件
    //     *
    //     */
    ApiMonitorQcMrItems.findQcMrMonitorEventDict = function (id) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrItems.baseUrl, "findQcMrMonitorEventDict", { id: id });
    };
    ApiMonitorQcMrItems.baseUrl = '/monitor/qcMrMonitorItems/';
    return ApiMonitorQcMrItems;
}());
exports.ApiMonitorQcMrItems = ApiMonitorQcMrItems;
/**
 * 自动质控触发事件配置Controller
 * Created by 王盛光  on 2017/8/1.
 */
var ApiMonitorQcMrVsEvent = /** @class */ (function () {
    function ApiMonitorQcMrVsEvent() {
    }
    /**
     * 保存关联
     *
     */
    ApiMonitorQcMrVsEvent.SaveQcMrMonitorVsEvent = function (qcMrMonitorVsEvents) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrVsEvent.baseUrl, "/saveQcMrMonitorVsEvent", { qcMrMonitorVsEvents: qcMrMonitorVsEvents });
    };
    /**
     * 删除关联
     *
     */
    ApiMonitorQcMrVsEvent.DeleteQcMrMonitorVsEvent = function (ids) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrVsEvent.baseUrl, "/deleteQcMrMonitorVsEvent", { ids: ids });
    };
    /**
     * 保存关联
     *
     */
    ApiMonitorQcMrVsEvent.Save = function (data, modelList) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrVsEvent.baseUrl, "/save", { data: data, modelList: modelList });
    };
    /**
     * 根据自动质控项目id查询
     *
     */
    ApiMonitorQcMrVsEvent.FindByMonitorItemId = function (monitorItemId, hospitalNo) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrVsEvent.baseUrl, "/findByMonitorItemId", { monitorItemId: monitorItemId, hospitalNo: hospitalNo });
    };
    ApiMonitorQcMrVsEvent.baseUrl = '/monitor/qcMrMonitorVsEvent';
    return ApiMonitorQcMrVsEvent;
}());
exports.ApiMonitorQcMrVsEvent = ApiMonitorQcMrVsEvent;
/**
 * 在院病人在线质控信息Controller
 * Created by 王盛光  on 2017/8/2.
 */
var ApiMonitorQcMrPatientOnline = /** @class */ (function () {
    function ApiMonitorQcMrPatientOnline() {
    }
    /**
     * 新增患者质控信息管理
     *
     */
    ApiMonitorQcMrPatientOnline.addQcMrPatientMonitorOnline = function (qcMrPatientMonitorOnline, eventId) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrPatientOnline.baseUrl, "addQcMrPatientMonitorOnline", { qcMrPatientMonitorOnline: qcMrPatientMonitorOnline, eventId: eventId });
    };
    /**
     * 患者质控信息医嘱管理
     *
     */
    ApiMonitorQcMrPatientOnline.addQcMrPatientMonitorOnlineByOrder = function (qcMrPatientMonitorOnline, qcMrMonitorVsEvents) {
        return api_1.medicalApi.connection("POST", ApiMonitorQcMrPatientOnline.baseUrl, "addQcMrPatientMonitorOnlineByOrder", { qcMrPatientMonitorOnline: qcMrPatientMonitorOnline, qcMrMonitorVsEvents: qcMrMonitorVsEvents });
    };
    ApiMonitorQcMrPatientOnline.baseUrl = '/monitor/qcMrPatientMonitorOnline/';
    return ApiMonitorQcMrPatientOnline;
}());
exports.ApiMonitorQcMrPatientOnline = ApiMonitorQcMrPatientOnline;
/**
 * 医嘱对照Controller
 * Created by 王盛光  on 2017/7/31.
 */
var ApiOrderCdrLocalTypeDict = /** @class */ (function () {
    function ApiOrderCdrLocalTypeDict() {
    }
    /**
     * 条件查询医嘱类型
     *
     */
    ApiOrderCdrLocalTypeDict.findCdrLocalOrderTypeDict = function (orderTypeName, hospitalNo) {
        return api_1.medicalApi.connection("POST", ApiOrderCdrLocalTypeDict.baseUrl, "findCdrLocalOrderTypeDict", { orderTypeName: orderTypeName, hospitalNo: hospitalNo });
    };
    /**
     * 条件查询医嘱
     *
     */
    ApiOrderCdrLocalTypeDict.findCdrContrastOrderItemDict = function (cdrContrastOrderItemDict, page) {
        return api_1.medicalApi.connection("POST", ApiOrderCdrLocalTypeDict.baseUrl, "findCdrContrastOrderItemDict", { cdrContrastOrderItemDict: cdrContrastOrderItemDict, page: page });
    };
    ApiOrderCdrLocalTypeDict.baseUrl = '/order/cdrLocalOrderTypeDict/';
    return ApiOrderCdrLocalTypeDict;
}());
exports.ApiOrderCdrLocalTypeDict = ApiOrderCdrLocalTypeDict;
var ApiPatientMrFileContentSmall = /** @class */ (function () {
    function ApiPatientMrFileContentSmall() {
    }
    /**
     * 病历同步加载
     *
     */
    ApiPatientMrFileContentSmall.getContenSmall = function (modelList) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileContentSmall.baseUrl, "getContenSmall", { modelList: modelList });
    };
    ApiPatientMrFileContentSmall.baseUrl = '/patient/mrPatientFileContentSmall/';
    return ApiPatientMrFileContentSmall;
}());
exports.ApiPatientMrFileContentSmall = ApiPatientMrFileContentSmall;
/**
 * 病历申请重新编辑controller
 * Created by 王盛光  on 2017/8/5.
 */
var ApiPatientMrFileEditApply = /** @class */ (function () {
    function ApiPatientMrFileEditApply() {
    }
    /**
     * 新增申请
     *
     */
    ApiPatientMrFileEditApply.NewMrPatientFileEditApply = function (mrPatientFileEditApply) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileEditApply.baseUrl, "/newMrPatientFileEditApply", { mrPatientFileEditApply: mrPatientFileEditApply });
    };
    /**
     * 病历申请重新编辑审核
     *
     */
    ApiPatientMrFileEditApply.CheckMrPatientFileEditApply = function (id, status) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileEditApply.baseUrl, "/checkMrPatientFileEditApply", { id: id, status: status });
    };
    /**
     * 申请模糊查询
     *
     */
    ApiPatientMrFileEditApply.FindByPage = function (page, name, status) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileEditApply.baseUrl, "/findByPage", { page: page, name: name, status: status });
    };
    /**
     * 取消申请
     *
     */
    ApiPatientMrFileEditApply.Delete = function (id) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileEditApply.baseUrl, "/delete", { id: id });
    };
    ApiPatientMrFileEditApply.baseUrl = '/patient/mrPatientFileEditApply';
    return ApiPatientMrFileEditApply;
}());
exports.ApiPatientMrFileEditApply = ApiPatientMrFileEditApply;
/**
 * 在院患者病历信息controller
 * Created by 王盛光  on 2017/8/3.
 */
var ApiPatientMrFileIndex = /** @class */ (function () {
    function ApiPatientMrFileIndex() {
    }
    /**
     * 加载模板信息
     *
     */
    ApiPatientMrFileIndex.LoadTemplateInfo = function (templateIndexId) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/loadTemplateInfo", { templateIndexId: templateIndexId });
    };
    /**
     * 加载已经保存的病历信息
     *
     */
    ApiPatientMrFileIndex.LoadMrPatientFileIndexInfo = function (fileId) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/loadMrPatientFileIndexInfo", { fileId: fileId });
    };
    /**
     * 加载病历集合信息
     *
     */
    ApiPatientMrFileIndex.LoadMrPatientFileIndexInfos = function (list) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/loadMrPatientFileIndexInfos", { list: list });
    };
    /**
     * 保存信息
     *
     */
    ApiPatientMrFileIndex.SaveMrPatientFileIndex = function (mrPatientFileIndex, deptCode, onDutyFlag, contenHtml, contentText, fileContent, elementList, smallContent, updateElement, xmlBodys, controllers) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/saveMrPatientFileIndex", { mrPatientFileIndex: mrPatientFileIndex, deptCode: deptCode, onDutyFlag: onDutyFlag, contenHtml: contenHtml, contentText: contentText, fileContent: fileContent, elementList: elementList, smallContent: smallContent, updateElement: updateElement, xmlBodys: xmlBodys, controllers: controllers });
    };
    /**
     * 保存xml信息
     *
     */
    ApiPatientMrFileIndex.SaveXml = function (cda, status) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/saveXml", { cda: cda, status: status });
    };
    /**
     * 删除
     *
     */
    ApiPatientMrFileIndex.DeleteMrPatientFileIndex = function (id, onDutyFlag) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/deleteMrPatientFileIndex", { id: id, onDutyFlag: onDutyFlag });
    };
    /**
     * 改变创建人
     *
     */
    ApiPatientMrFileIndex.ChangeCreator = function (id, onDutyFlag) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/changeCreator", { id: id, onDutyFlag: onDutyFlag });
    };
    /**
     * 签字
     *
     */
    ApiPatientMrFileIndex.Sign = function (id, password, cleanHtml, contentText, fileContent, xmlBodys, controllers) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/sign", { id: id, password: password, cleanHtml: cleanHtml, contentText: contentText, fileContent: fileContent, xmlBodys: xmlBodys, controllers: controllers });
    };
    /**
     * 打回
     *
     */
    ApiPatientMrFileIndex.ThrowBack = function (id) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/throwBack", { id: id });
    };
    /**
     * 查询患者的病历信息集合
     *
     */
    ApiPatientMrFileIndex.getMrPatientFileIndex = function (patientId, visitId) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "getMrPatientFileIndex", { patientId: patientId, visitId: visitId });
    };
    /**
     * 查询 病历的html 文件
     *
     */
    ApiPatientMrFileIndex.GetMrPatientFileHtml = function (fileId) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/getMrPatientFileHtml", { fileId: fileId });
    };
    /**
     * 患者病例修改
     */
    ApiPatientMrFileIndex.SubUpdate = function (mrPatientFileIndex, onDutyFlag, contenHtml, contentText, fileContent, elementList, smallContent, updateElement, xmlBodys, controllers) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/subUpdate", { mrPatientFileIndex: mrPatientFileIndex, onDutyFlag: onDutyFlag, contenHtml: contenHtml, contentText: contentText, fileContent: fileContent, elementList: elementList, smallContent: smallContent, updateElement: updateElement, xmlBodys: xmlBodys, controllers: controllers });
    };
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
    ApiPatientMrFileIndex.GetAllMrPatientFileIndex = function (patientId, visitId, patientType) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/getAllMrPatientFileIndex", { patientId: patientId, visitId: visitId, patientType: patientType });
    };
    /**
     * 根据分类查询患者病历信息
     *
     */
    ApiPatientMrFileIndex.GetPatientFileIndex = function (patientId, visitId, patientType, mrClassCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFileIndex.baseUrl, "/getPatientFileIndex", { patientId: patientId, visitId: visitId, patientType: patientType, mrClassCode: mrClassCode });
    };
    ApiPatientMrFileIndex.baseUrl = '/patient/mrPatientFileIndex';
    return ApiPatientMrFileIndex;
}());
exports.ApiPatientMrFileIndex = ApiPatientMrFileIndex;
/**
 * 患者病历打印记录controller
 * Created by 王盛光  on 2017/8/7.
 */
var ApiPatientMrFilePrintLog = /** @class */ (function () {
    function ApiPatientMrFilePrintLog() {
    }
    /**
     * 模板选项查询
     *
     */
    ApiPatientMrFilePrintLog.FindTemplate = function (patientId, visitId, deptCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFilePrintLog.baseUrl, "/findTemplate", { patientId: patientId, visitId: visitId, deptCode: deptCode });
    };
    /**
     * 患者病例打印列表模糊查询
     *
     */
    ApiPatientMrFilePrintLog.FindPatientFile = function (startTime, endTime, patientId, visitId, printFlag, ifPrintFlag, name, page, mrClass, deptCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFilePrintLog.baseUrl, "/findPatientFile", { startTime: startTime, endTime: endTime, patientId: patientId, visitId: visitId, printFlag: printFlag, ifPrintFlag: ifPrintFlag, name: name, page: page, mrClass: mrClass, deptCode: deptCode });
    };
    /**
     * 打印
     *
     */
    ApiPatientMrFilePrintLog.Print = function (mrPatientFilePrintLog) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFilePrintLog.baseUrl, "/print", { mrPatientFilePrintLog: mrPatientFilePrintLog });
    };
    /**
     * 打印多条信息
     *
     */
    ApiPatientMrFilePrintLog.Prints = function (mrPatientFilePrintLog) {
        return api_1.medicalApi.connection("POST", ApiPatientMrFilePrintLog.baseUrl, "/prints", { mrPatientFilePrintLog: mrPatientFilePrintLog });
    };
    ApiPatientMrFilePrintLog.baseUrl = '/patient/mrPatientFilePrintLog';
    return ApiPatientMrFilePrintLog;
}());
exports.ApiPatientMrFilePrintLog = ApiPatientMrFilePrintLog;
/**
 * 创建人:谢小慧
 * 创建时间:2017/8/14
 * 说明:患者病案首页信息加载
 */
var ApiPatientMrMedicalHome = /** @class */ (function () {
    function ApiPatientMrMedicalHome() {
    }
    /**
     * 病案首页信息加载
     *
     */
    ApiPatientMrMedicalHome.getPatientMedical = function (patientId, visitId) {
        return api_1.medicalApi.connection("POST", ApiPatientMrMedicalHome.baseUrl, "getPatientMedical", { patientId: patientId, visitId: visitId });
    };
    //    /**
    //     * 病案首页信息加载
    //     *
    //     */
    ApiPatientMrMedicalHome.getPatientMedicalPrintInfo = function (patientId, visitId, type, page) {
        return api_1.medicalApi.connection("POST", ApiPatientMrMedicalHome.baseUrl, "getPatientMedicalPrintInfo", { patientId: patientId, visitId: visitId, type: type, page: page });
    };
    /**
     * 根据患者id和住院标识和诊断类型重新患者的诊断信息
     *
     */
    ApiPatientMrMedicalHome.findDiagnosisByPatientId = function (patientId, visitId, type, page) {
        return api_1.medicalApi.connection("POST", ApiPatientMrMedicalHome.baseUrl, "findDiagnosisByPatientId", { patientId: patientId, visitId: visitId, type: type, page: page });
    };
    /**
     * 保存病案首页的首页信息
     *
     */
    ApiPatientMrMedicalHome.save = function (model, operationList, diagnosisList) {
        return api_1.medicalApi.connection("POST", ApiPatientMrMedicalHome.baseUrl, "save", { model: model, operationList: operationList, diagnosisList: diagnosisList });
    };
    /**
     * 加载诊断分页信息
     *
     */
    ApiPatientMrMedicalHome.loadDiagnosis = function (page, diagIndicator, diagnosisName) {
        return api_1.medicalApi.connection("POST", ApiPatientMrMedicalHome.baseUrl, "loadDiagnosis", { page: page, diagIndicator: diagIndicator, diagnosisName: diagnosisName });
    };
    ApiPatientMrMedicalHome.baseUrl = '/patient/mrPatientMedicalHome/';
    return ApiPatientMrMedicalHome;
}());
exports.ApiPatientMrMedicalHome = ApiPatientMrMedicalHome;
/**
 * 创建人:谢小慧
 * 创建时间:2017/9/4
 * 说明:患者转出日志
 */
var ApiPatientMrTransfer = /** @class */ (function () {
    function ApiPatientMrTransfer() {
    }
    /**
     * 保存转出记录
     *
     */
    ApiPatientMrTransfer.save = function (transfer) {
        return api_1.medicalApi.connection("POST", ApiPatientMrTransfer.baseUrl, "save", { transfer: transfer });
    };
    ApiPatientMrTransfer.delete = function (transfer) {
        return api_1.medicalApi.connection("POST", ApiPatientMrTransfer.baseUrl, "delete", { transfer: transfer });
    };
    ApiPatientMrTransfer.update = function (transfer) {
        return api_1.medicalApi.connection("POST", ApiPatientMrTransfer.baseUrl, "update", { transfer: transfer });
    };
    ApiPatientMrTransfer.baseUrl = '/patient/mrPatientTransfer';
    return ApiPatientMrTransfer;
}());
exports.ApiPatientMrTransfer = ApiPatientMrTransfer;
/**
 * 病案编目controller
 * Created by 王盛光  on 2017/8/15.
 */
var ApiPatientFileArchivalCataloging = /** @class */ (function () {
    function ApiPatientFileArchivalCataloging() {
    }
    /**
     * 病案编目模糊查询
     *
     */
    ApiPatientFileArchivalCataloging.FindPatientFile = function (isCatalog, startTime, endTime, deptCode, inpNo, page) {
        return api_1.medicalApi.connection("POST", ApiPatientFileArchivalCataloging.baseUrl, "/findPatientFile", { isCatalog: isCatalog, startTime: startTime, endTime: endTime, deptCode: deptCode, inpNo: inpNo, page: page });
    };
    /**
     * 病案编目
     *
     */
    ApiPatientFileArchivalCataloging.ArchivalCataloging = function (patientFileIndexs) {
        return api_1.medicalApi.connection("POST", ApiPatientFileArchivalCataloging.baseUrl, "/archivalCataloging", { patientFileIndexs: patientFileIndexs });
    };
    ApiPatientFileArchivalCataloging.baseUrl = '/patient/patientFileArchivalCataloging';
    return ApiPatientFileArchivalCataloging;
}());
exports.ApiPatientFileArchivalCataloging = ApiPatientFileArchivalCataloging;
/**
 * 病案签收
 * Created by 王盛光  on 2017/8/10.
 */
var ApiPatientFileSign = /** @class */ (function () {
    function ApiPatientFileSign() {
    }
    /**
     * 病案签收模糊查询
     *
     */
    ApiPatientFileSign.FindPatientFileSign = function (startDate, endDate, inputData, deptDischargeFrom, signFlag, page) {
        return api_1.medicalApi.connection("POST", ApiPatientFileSign.baseUrl, "/findPatientFileSign", { startDate: startDate, endDate: endDate, inputData: inputData, deptDischargeFrom: deptDischargeFrom, signFlag: signFlag, page: page });
    };
    /**
     * 签收
     */
    ApiPatientFileSign.PatientFileSign = function (patientFiles) {
        return api_1.medicalApi.connection("POST", ApiPatientFileSign.baseUrl, "/patientFileSign", { patientFiles: patientFiles });
    };
    /**
     * 取消签收
     *
     */
    ApiPatientFileSign.CancleSign = function (patientFiles) {
        return api_1.medicalApi.connection("POST", ApiPatientFileSign.baseUrl, "/cancleSign", { patientFiles: patientFiles });
    };
    /**
     * 根据患者唯一标识查询患者有那些病历
     *
     */
    ApiPatientFileSign.SelectFormerly = function (patientId, visitId, type, name, mName, begin, page) {
        return api_1.medicalApi.connection("POST", ApiPatientFileSign.baseUrl, "/selectFormerly", { patientId: patientId, visitId: visitId, type: type, name: name, mName: mName, begin: begin, page: page });
    };
    ApiPatientFileSign.SelectFileContentText = function (historyid) {
        return api_1.medicalApi.connection("POST", ApiPatientFileSign.baseUrl, "/selectFileContentText", { historyid: historyid });
    };
    ApiPatientFileSign.baseUrl = '/patient/patientFileSign';
    return ApiPatientFileSign;
}());
exports.ApiPatientFileSign = ApiPatientFileSign;
/**
 * 创建人:谢小慧
 * 创建时间:2017/8/2
 * 说明:患者电子病历信息
 */
var ApiPatientMedical = /** @class */ (function () {
    function ApiPatientMedical() {
    }
    /**
     * 加载当前患者的质控信息
     *
     */
    ApiPatientMedical.getMonitorOnlineList = function (patientId, visitId, deptCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMedical.baseUrl, "getMonitorOnlineList", { patientId: patientId, visitId: visitId, deptCode: deptCode });
    };
    /**
     * 加载患者的病历信息
     *
     */
    ApiPatientMedical.getPatientMedicalInfo = function (patientId, visitId, deptCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMedical.baseUrl, "getPatientMedicalInfo", { patientId: patientId, visitId: visitId, deptCode: deptCode });
    };
    /**
     *  患者病案分类信息
     *
     */
    ApiPatientMedical.findTemplateClass = function (patientId, visitId, deptCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMedical.baseUrl, "findTemplateClass", { patientId: patientId, visitId: visitId, deptCode: deptCode });
    };
    /**
     * 分页查询患者病例信息
     *
     */
    ApiPatientMedical.findPatinetFileListByPage = function (mrClassCode, page, patientId, visitId, deptCode, curDeptCode) {
        return api_1.medicalApi.connection("POST", ApiPatientMedical.baseUrl, "findPatinetFileListByPage", { mrClassCode: mrClassCode, page: page, patientId: patientId, visitId: visitId, deptCode: deptCode, curDeptCode: curDeptCode });
    };
    /**
     * 加载患者医嘱信息
     *
     */
    ApiPatientMedical.getPatientOrder = function (page, patientId, visitId, orderClass, repeatIndicator, state) {
        return api_1.medicalApi.connection("POST", ApiPatientMedical.baseUrl, "getPatientOrder", { page: page, patientId: patientId, visitId: visitId, orderClass: orderClass, repeatIndicator: repeatIndicator, state: state });
    };
    /**
     * 查询患者当前所在科室的基本信息
     *
     */
    ApiPatientMedical.getPatientInfoInHospital = function (patientId, visitId, deptCode) {
        return api_1.medicalApi.connection("GET", ApiPatientMedical.baseUrl, "getPatientInfoInHospital", { patientId: patientId, visitId: visitId, deptCode: deptCode });
    };
    /**
     *  诊疗项目
     */
    ApiPatientMedical.findClinicItemClassDict = function () {
        return api_1.medicalApi.connection("POST", ApiPatientMedical.baseUrl, "findClinicItemClassDict", {});
    };
    /**
     * 查询医生职称
     */
    ApiPatientMedical.findDoctorTitleDict = function () {
        return api_1.medicalApi.connection("GET", ApiPatientMedical.baseUrl, "findDoctorTitleDict", {});
    };
    ApiPatientMedical.baseUrl = '/patient/patientMedical/';
    return ApiPatientMedical;
}());
exports.ApiPatientMedical = ApiPatientMedical;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:病案归档
 */
var ApiPatientPigeonhole = /** @class */ (function () {
    function ApiPatientPigeonhole() {
    }
    /**
     * 病案归档模糊查询
     *
     */
    ApiPatientPigeonhole.selectPigeonhole = function (pitchon, status, begin, end, inputData, deptCode, page) {
        return api_1.medicalApi.connection("POST", ApiPatientPigeonhole.baseUrl, "selectPigeonhole", { pitchon: pitchon, status: status, begin: begin, end: end, inputData: inputData, deptCode: deptCode, page: page });
    };
    /**
     * 病案归档操作
     *
     */
    ApiPatientPigeonhole.updatePigeonhole = function (patientPigeonhole) {
        return api_1.medicalApi.connection("POST", ApiPatientPigeonhole.baseUrl, "updatePigeonhole", { patientPigeonhole: patientPigeonhole });
    };
    /**
     * 病案归档操作
     *
     */
    ApiPatientPigeonhole.deletePigeonhole = function (PatientPigeonhole) {
        return api_1.medicalApi.connection("POST", ApiPatientPigeonhole.baseUrl, "deletePigeonhole", { PatientPigeonhole: PatientPigeonhole });
    };
    ApiPatientPigeonhole.baseUrl = '/patient/patientPigeonhole/';
    return ApiPatientPigeonhole;
}());
exports.ApiPatientPigeonhole = ApiPatientPigeonhole;
/**
 * 创建人:谢小慧
 * 创建时间:2017/10/11
 * 说明:体温单相关信息查询
 */
var ApiPatientVitalSignsRec = /** @class */ (function () {
    function ApiPatientVitalSignsRec() {
    }
    /**
     * 查询患者体温单信息
     *
     */
    ApiPatientVitalSignsRec.getInfo = function (patientId, visitId, type, time) {
        return api_1.medicalApi.connection("POST", ApiPatientVitalSignsRec.baseUrl, "getInfo", { patientId: patientId, visitId: visitId, type: type, time: time });
    };
    ApiPatientVitalSignsRec.baseUrl = '/patient/patientVitalSignsRec/';
    return ApiPatientVitalSignsRec;
}());
exports.ApiPatientVitalSignsRec = ApiPatientVitalSignsRec;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:查询可以病历召回患者以可以召回的病历信息
 */
var ApiRecallPatient = /** @class */ (function () {
    function ApiRecallPatient() {
    }
    /**
     * 可以进行病历召回的患者查询
     *
     */
    ApiRecallPatient.selectPatient = function (userId, inpNo, name, patientId, deptCode, begin, end, page) {
        return api_1.medicalApi.connection("POST", ApiRecallPatient.baseUrl, "selectPatient", { userId: userId, inpNo: inpNo, name: name, patientId: patientId, deptCode: deptCode, begin: begin, end: end, page: page });
    };
    /**
     * 根据患者的id和住院标识查询病历信息
     *
     */
    ApiRecallPatient.selectPatientFileModel = function (patientId, visitId, page) {
        return api_1.medicalApi.connection("POST", ApiRecallPatient.baseUrl, "selectPatientFileModel", { patientId: patientId, visitId: visitId, page: page });
    };
    ApiRecallPatient.baseUrl = '/recall/patientRecall/';
    return ApiRecallPatient;
}());
exports.ApiRecallPatient = ApiRecallPatient;
/**
 * 创建人:黄倩
 * 创建时间:2017/10/18
 * 说明:病历召回
 */
var ApiRecallRecalls = /** @class */ (function () {
    function ApiRecallRecalls() {
    }
    /**
     * 召回申请
     *
     */
    ApiRecallRecalls.insertFilecrDetial = function (mrPatientFileRecall) {
        return api_1.medicalApi.connection("POST", ApiRecallRecalls.baseUrl, "insertFilecrDetial", { mrPatientFileRecall: mrPatientFileRecall });
    };
    /**
     * 召回申请审核
     *
     */
    ApiRecallRecalls.insertFilecrDetialAudit = function (mrPatientFileRecallList) {
        return api_1.medicalApi.connection("POST", ApiRecallRecalls.baseUrl, "insertFilecrDetialAudit", { mrPatientFileRecallList: mrPatientFileRecallList });
    };
    /**
     * 根据申请人的id查询召回申请人查询申请及审核
     *
     */
    ApiRecallRecalls.selectFileRecall = function (userId, synthesize, begin, end, radio, deptCode, page) {
        return api_1.medicalApi.connection("POST", ApiRecallRecalls.baseUrl, "selectFileRecall", { userId: userId, synthesize: synthesize, begin: begin, end: end, radio: radio, deptCode: deptCode, page: page });
    };
    /**
     * 查询病历召回申请
     *
     */
    ApiRecallRecalls.selectApproveFileRecall = function (userId, synthesize, begin, end, radio, deptCode, page) {
        return api_1.medicalApi.connection("POST", ApiRecallRecalls.baseUrl, "selectApproveFileRecall", { userId: userId, synthesize: synthesize, begin: begin, end: end, radio: radio, deptCode: deptCode, page: page });
    };
    /**
     * 根据召回申请id查询召回病历详情
     *
     */
    ApiRecallRecalls.selectFilecrDetial = function (recallId) {
        return api_1.medicalApi.connection("POST", ApiRecallRecalls.baseUrl, "selectFilecrDetial", { recallId: recallId });
    };
    ApiRecallRecalls.baseUrl = '/recall/recalls/';
    return ApiRecallRecalls;
}());
exports.ApiRecallRecalls = ApiRecallRecalls;
/**
 * 创建人:谢小慧
 * 创建时间:2017/10/9
 * 说明: 参数配置查询
 */
var ApiSystemDictParam = /** @class */ (function () {
    function ApiSystemDictParam() {
    }
    /**
     * 是否显示字纸病历上交人员信息填写框
     *
     */
    ApiSystemDictParam.GetIsShowMrSubmitInfo = function () {
        return api_1.medicalApi.connection("GET", ApiSystemDictParam.baseUrl, "/getIsShowMrSubmitInfo", {});
    };
    ApiSystemDictParam.baseUrl = '/system/dictParam';
    return ApiSystemDictParam;
}());
exports.ApiSystemDictParam = ApiSystemDictParam;
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/24
 * 说明:用户登录
 */
var ApiSystemLogin = /** @class */ (function () {
    function ApiSystemLogin() {
    }
    ApiSystemLogin.login = function (appId, key, hospitalCode, empId) {
        return api_1.medicalApi.connection("POST", ApiSystemLogin.baseUrl, "login", { appId: appId, key: key, hospitalCode: hospitalCode, empId: empId });
    };
    ApiSystemLogin.baseUrl = '/system/login/';
    return ApiSystemLogin;
}());
exports.ApiSystemLogin = ApiSystemLogin;
/**
 * 用户信息维护
 * Created by 王盛光  on 2017/8/19.
 */
var ApiSystemUserDict = /** @class */ (function () {
    function ApiSystemUserDict() {
    }
    /**
     * 修改密码
     *
     */
    ApiSystemUserDict.updateCode = function (code, empNo) {
        return api_1.medicalApi.connection("POST", ApiSystemUserDict.baseUrl, "updateCode", { code: code, empNo: empNo });
    };
    /**
     * 保存用户信息
     */
    ApiSystemUserDict.save = function (userDict) {
        return api_1.medicalApi.connection("POST", ApiSystemUserDict.baseUrl, "save", { userDict: userDict });
    };
    /**
     * 修改用户信息
     */
    ApiSystemUserDict.update = function (userDict) {
        return api_1.medicalApi.connection("POST", ApiSystemUserDict.baseUrl, "update", { userDict: userDict });
    };
    ApiSystemUserDict.baseUrl = '/system/userDict/';
    return ApiSystemUserDict;
}());
exports.ApiSystemUserDict = ApiSystemUserDict;
/**
 * 创建人:谢小慧
 * 创建时间:2017/7/21
 * 说明: 电子病历模板 数据元类型
 */
var ApiTemplateDsTypeIndex = /** @class */ (function () {
    function ApiTemplateDsTypeIndex() {
    }
    /**
     * 添加目录
     *
     */
    ApiTemplateDsTypeIndex.saveDir = function (index) {
        return api_1.medicalApi.connection("POST", ApiTemplateDsTypeIndex.baseUrl, "saveDir", { index: index });
    };
    /**
     * 加载类型,控件,以及控件类型字典
     *
     */
    ApiTemplateDsTypeIndex.getData = function (name) {
        return api_1.medicalApi.connection("POST", ApiTemplateDsTypeIndex.baseUrl, "getData", { name: name });
    };
    /**
     * 新增修改控件
     *
     */
    ApiTemplateDsTypeIndex.saveOrUpdateControl = function (typeIndex, index, itemList) {
        return api_1.medicalApi.connection("POST", ApiTemplateDsTypeIndex.baseUrl, "saveOrUpdateControl", { typeIndex: typeIndex, index: index, itemList: itemList });
    };
    /**
     * 加载控件信息
     *
     */
    ApiTemplateDsTypeIndex.loadControlInfo = function (id, version) {
        return api_1.medicalApi.connection("POST", ApiTemplateDsTypeIndex.baseUrl, "loadControlInfo", { id: id, version: version });
    };
    ApiTemplateDsTypeIndex.baseUrl = '/template/dsTypeIndex/';
    return ApiTemplateDsTypeIndex;
}());
exports.ApiTemplateDsTypeIndex = ApiTemplateDsTypeIndex;
/**
 * 模板分类Controller
 * Created by 王盛光  on 2017/7/20.
 */
var ApiTemplateMrClass = /** @class */ (function () {
    function ApiTemplateMrClass() {
    }
    /**
     * 新建病历获取大模板分类
     *
     */
    ApiTemplateMrClass.findMrTemplate = function () {
        return api_1.medicalApi.connection("POST", ApiTemplateMrClass.baseUrl, "findMrTemplate", {});
    };
    /**
     * 获取大模板分类
     *
     */
    ApiTemplateMrClass.findMrTemplateClass = function (radio) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrClass.baseUrl, "findMrTemplateClass", { radio: radio });
    };
    /**
     * 修改模板分类
     *
     */
    ApiTemplateMrClass.updateMrtemplateClass = function (mrTemplateClass) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrClass.baseUrl, "updateMrtemplateClass", { mrTemplateClass: mrTemplateClass });
    };
    /**
     * 删除模板分类
     *
     */
    ApiTemplateMrClass.deleteMrTemplateClass = function (mrClassCode, radio) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrClass.baseUrl, "deleteMrTemplateClass", { mrClassCode: mrClassCode, radio: radio });
    };
    /**
     * 新增模板分类
     *
     */
    ApiTemplateMrClass.saveMrTemplateClass = function (mrTemplateClass) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrClass.baseUrl, "saveMrTemplateClass", { mrTemplateClass: mrTemplateClass });
    };
    /**
     * 新增模板分类的字典信息
     *
     */
    ApiTemplateMrClass.toSaveOrUpdate = function () {
        return api_1.medicalApi.connection("POST", ApiTemplateMrClass.baseUrl, "toSaveOrUpdate", {});
    };
    ApiTemplateMrClass.baseUrl = '/template/mrTemplateClass/';
    return ApiTemplateMrClass;
}());
exports.ApiTemplateMrClass = ApiTemplateMrClass;
/**
 * 模板索引Controller
 * Created by 王盛光  on 2017/7/24.
 */
var ApiTemplateMrIndex = /** @class */ (function () {
    function ApiTemplateMrIndex() {
    }
    /**
     * 新增模板分类的字典信息
     *
     */
    ApiTemplateMrIndex.toSaveOrUpdate = function () {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "toSaveOrUpdate", {});
    };
    /**
     * 新建模板索引
     *
     */
    ApiTemplateMrIndex.saveMrTemplateIndex = function (mrTemplateIndex) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "saveMrTemplateIndex", { mrTemplateIndex: mrTemplateIndex });
    };
    /**
     * 修改模板索引
     *
     */
    ApiTemplateMrIndex.updateMrTemplateIndex = function (mrTemplateIndex) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "updateMrTemplateIndex", { mrTemplateIndex: mrTemplateIndex });
    };
    /**
     * 获取可用总模板数
     *
     */
    ApiTemplateMrIndex.countAll = function () {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "countAll", {});
    };
    /**
     * 删除模板
     *
     */
    ApiTemplateMrIndex.deleteMrTemplateIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "deleteMrTemplateIndex", { id: id });
    };
    /**
     * 保存模板内容
     *
     */
    ApiTemplateMrIndex.saveMrTemplateIndexContent = function (mrTemplateContent) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "saveMrTemplateIndexContent", { mrTemplateContent: mrTemplateContent });
    };
    /**
     * 模板内容查询
     *
     */
    ApiTemplateMrIndex.getMrTemplateContent = function (id) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "getMrTemplateContent", { id: id });
    };
    /**
     * 患者新建病历界面,查询模板信息
     *
     */
    ApiTemplateMrIndex.findByPage = function (mrClass, tempaleType, name, page, time, monitorCode, deptCode, patientId, visitId) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "findByPage", { mrClass: mrClass, tempaleType: tempaleType, name: name, page: page, time: time, monitorCode: monitorCode, deptCode: deptCode, patientId: patientId, visitId: visitId });
    };
    /**
     * 根据模板分类code查询模板信息
     *
     */
    ApiTemplateMrIndex.selectMrTemplateIndex = function (mrClass, name, page, radio) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "selectMrTemplateIndex", { mrClass: mrClass, name: name, page: page, radio: radio });
    };
    /**
     * 查询数据集的信息
     *
     */
    ApiTemplateMrIndex.bdDsIndex = function (cvName, page) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "bdDsIndex", { cvName: cvName, page: page });
    };
    /**
     * 查询可替换项目
     *
     */
    ApiTemplateMrIndex.getSynchronousElementDict = function () {
        return api_1.medicalApi.connection("GET", ApiTemplateMrIndex.baseUrl, "getSynchronousElementDict", {});
    };
    /**
     * 获取模板内容历史
     *
     */
    ApiTemplateMrIndex.findHistoryContent = function (id) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "findHistoryContent", { id: id });
    };
    /**
     * 根据id获取模板索引修改信息
     *
     */
    ApiTemplateMrIndex.getMrTemplateIndexUpdateFlag = function (id) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrIndex.baseUrl, "getMrTemplateIndexUpdateFlag", { id: id });
    };
    ApiTemplateMrIndex.baseUrl = '/template/mrTemplateIndex/';
    return ApiTemplateMrIndex;
}());
exports.ApiTemplateMrIndex = ApiTemplateMrIndex;
/**
 * 结构化小模板controller
 * Created by 王盛光  on 2017/7/31.
 */
var ApiTemplateMrTempletSmallIndex = /** @class */ (function () {
    function ApiTemplateMrTempletSmallIndex() {
    }
    /**
     * 保存小模板
     *
     */
    ApiTemplateMrTempletSmallIndex.SaveMrTempletSmallIndex = function (mrTempletSmallIndex) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrTempletSmallIndex.baseUrl, "/saveMrTempletSmallIndex", { mrTempletSmallIndex: mrTempletSmallIndex });
    };
    /**
     * 删除小模板
     *
     */
    ApiTemplateMrTempletSmallIndex.DeleteMrTempletSmallIndex = function (id) {
        return api_1.medicalApi.connection("POST", ApiTemplateMrTempletSmallIndex.baseUrl, "/deleteMrTempletSmallIndex", { id: id });
    };
    ApiTemplateMrTempletSmallIndex.FindAll = function () {
        return api_1.medicalApi.connection("GET", ApiTemplateMrTempletSmallIndex.baseUrl, "/findAll", {});
    };
    ApiTemplateMrTempletSmallIndex.baseUrl = '/template/mrTempletSmallIndex';
    return ApiTemplateMrTempletSmallIndex;
}());
exports.ApiTemplateMrTempletSmallIndex = ApiTemplateMrTempletSmallIndex;
