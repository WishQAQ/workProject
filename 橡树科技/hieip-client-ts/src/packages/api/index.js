"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var api_1 = require("../../tools/api");
/**
 * 程序权限控制器
 * Created by 包国强 on 2017/9/6.
 */
var ApiAppData = /** @class */ (function () {
    function ApiAppData() {
    }
    /**
     * 查询是否有权限
     *
     */
    ApiAppData.loadAppGrant = function (application, code) {
        return api_1.apiUtil.connection("POST", ApiAppData.baseUrl, "loadAppGrant", { application: application, code: code });
    };
    ApiAppData.baseUrl = '/app/appData/';
    return ApiAppData;
}());
exports.ApiAppData = ApiAppData;
/**
 * 程序权限控制器
 * Created by 包国强 on 2017/9/6.
 */
var ApiAppGrants = /** @class */ (function () {
    function ApiAppGrants() {
    }
    /**
     * 保存程序权限点(角色)
     *
     */
    ApiAppGrants.saveRoleGrants = function (modelList, roleId) {
        return api_1.apiUtil.connection("POST", ApiAppGrants.baseUrl, "saveRoleGrants", { modelList: modelList, roleId: roleId });
    };
    /**
     * 保存程序权限点(科室)
     *
     */
    ApiAppGrants.saveDeptGrants = function (modelList, deptId) {
        return api_1.apiUtil.connection("POST", ApiAppGrants.baseUrl, "saveDeptGrants", { modelList: modelList, deptId: deptId });
    };
    /**
     * 保存程序权限点(员工)
     *
     */
    ApiAppGrants.saveStaffGrants = function (modelList, staffId) {
        return api_1.apiUtil.connection("POST", ApiAppGrants.baseUrl, "saveStaffGrants", { modelList: modelList, staffId: staffId });
    };
    /**
     * 查询程序权限点(角色)
     *
     */
    ApiAppGrants.loadRoleGrants = function (roleId, page, inputCode) {
        return api_1.apiUtil.connection("POST", ApiAppGrants.baseUrl, "loadRoleGrants", { roleId: roleId, page: page, inputCode: inputCode });
    };
    /**
     * 查询程序权限点(科室)
     *
     */
    ApiAppGrants.loadDeptGrants = function (deptId, page, inputCode) {
        return api_1.apiUtil.connection("POST", ApiAppGrants.baseUrl, "loadDeptGrants", { deptId: deptId, page: page, inputCode: inputCode });
    };
    /**
     * 查询程序权限点(员工)
     *
     */
    ApiAppGrants.loadStaffGrants = function (staffId, page, inputCode) {
        return api_1.apiUtil.connection("POST", ApiAppGrants.baseUrl, "loadStaffGrants", { staffId: staffId, page: page, inputCode: inputCode });
    };
    ApiAppGrants.baseUrl = '/app/appGrants/';
    return ApiAppGrants;
}());
exports.ApiAppGrants = ApiAppGrants;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 说明:排班班次字典表信息Controller
 */
var ApiClassesDict = /** @class */ (function () {
    function ApiClassesDict() {
    }
    /**
     * 根据护理单元查询单元下的班次信息
     *
     */
    ApiClassesDict.select = function (name, type, radio, page, groupId) {
        return api_1.apiUtil.connection("POST", ApiClassesDict.baseUrl, "select", { name: name, type: type, radio: radio, page: page, groupId: groupId });
    };
    /**
     * 添加/更新班次信息
     *
     */
    ApiClassesDict.save = function (classesDict) {
        return api_1.apiUtil.connection("POST", ApiClassesDict.baseUrl, "save", { classesDict: classesDict });
    };
    /**
     * 作废班次信息
     *
     */
    ApiClassesDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiClassesDict.baseUrl, "delete", { id: id });
    };
    /**
     * 根据分组id查询允许使用班段
     *
     */
    ApiClassesDict.selectClasses = function (groupId) {
        return api_1.apiUtil.connection("POST", ApiClassesDict.baseUrl, "selectClasses", { groupId: groupId });
    };
    ApiClassesDict.baseUrl = '/classes/classesDict/';
    return ApiClassesDict;
}());
exports.ApiClassesDict = ApiClassesDict;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 说明调班记录表信息Controller
 */
var ApiClassesExchange = /** @class */ (function () {
    function ApiClassesExchange() {
    }
    /**
     * 调班记录查看
     *
     */
    ApiClassesExchange.selecClasses = function (page, name, state, begin, end) {
        return api_1.apiUtil.connection("POST", ApiClassesExchange.baseUrl, "selecClasses", { page: page, name: name, state: state, begin: begin, end: end });
    };
    /**
     * 根据用户id查询调班申请记录
     *
     */
    ApiClassesExchange.select = function (page, id, state, begin, end) {
        return api_1.apiUtil.connection("POST", ApiClassesExchange.baseUrl, "select", { page: page, id: id, state: state, begin: begin, end: end });
    };
    /**
     * 调班记录审核
     *
     */
    ApiClassesExchange.updateState = function (exchangeClasses) {
        return api_1.apiUtil.connection("POST", ApiClassesExchange.baseUrl, "updateState", { exchangeClasses: exchangeClasses });
    };
    /**
     * 调班申请
     *
     */
    ApiClassesExchange.save = function (exchangeClasses) {
        return api_1.apiUtil.connection("POST", ApiClassesExchange.baseUrl, "save", { exchangeClasses: exchangeClasses });
    };
    /**
     * 作废调班申请
     *
     */
    ApiClassesExchange.delete = function (idList) {
        return api_1.apiUtil.connection("POST", ApiClassesExchange.baseUrl, "delete", { idList: idList });
    };
    ApiClassesExchange.baseUrl = '/classes/exchange/';
    return ApiClassesExchange;
}());
exports.ApiClassesExchange = ApiClassesExchange;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 说明:排班分组字典表信息Controller
 */
var ApiClassesGroupDict = /** @class */ (function () {
    function ApiClassesGroupDict() {
    }
    /**
     * 根据护理单元统计单元下的分组信息
     *
     */
    ApiClassesGroupDict.selectDept = function (page, deptName) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupDict.baseUrl, "selectDept", { page: page, deptName: deptName });
    };
    /**
     * 根据type查询单元下分组信息信息
     *
     */
    ApiClassesGroupDict.selectGroup = function (type, name, page) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupDict.baseUrl, "selectGroup", { type: type, name: name, page: page });
    };
    /**
     * 新增/更新 分组信息和分组下允许使用班段
     *
     */
    ApiClassesGroupDict.updateGroup = function (nurseGroupDict, nurseGroupVsClasses) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupDict.baseUrl, "updateGroup", { nurseGroupDict: nurseGroupDict, nurseGroupVsClasses: nurseGroupVsClasses });
    };
    /**
     * 作废分组信息
     *
     */
    ApiClassesGroupDict.deleteGroup = function (id) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupDict.baseUrl, "deleteGroup", { id: id });
    };
    /**
     * 根据单元出现可以进行分组的人员信息
     *
     */
    ApiClassesGroupDict.selectUser = function (deptCode, name) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupDict.baseUrl, "selectUser", { deptCode: deptCode, name: name });
    };
    /**
     * 查询急诊科的人员信息
     *
     */
    ApiClassesGroupDict.selectUserRole = function (name, role) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupDict.baseUrl, "selectUserRole", { name: name, role: role });
    };
    ApiClassesGroupDict.baseUrl = '/classes/groupDict/';
    return ApiClassesGroupDict;
}());
exports.ApiClassesGroupDict = ApiClassesGroupDict;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 说明:职位信息字典表信息Controller
 */
var ApiClassesGroupTitleDict = /** @class */ (function () {
    function ApiClassesGroupTitleDict() {
    }
    /**
     * 查询职位信息
     *
     */
    ApiClassesGroupTitleDict.select = function (page, name) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupTitleDict.baseUrl, "select", { page: page, name: name });
    };
    /**
     * 新增/更新 职位信息
     *
     */
    ApiClassesGroupTitleDict.update = function (nurseGroupTitleDict) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupTitleDict.baseUrl, "update", { nurseGroupTitleDict: nurseGroupTitleDict });
    };
    /**
     * 作废职位信息
     *
     */
    ApiClassesGroupTitleDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupTitleDict.baseUrl, "delete", { id: id });
    };
    ApiClassesGroupTitleDict.baseUrl = '/classes/groupTitleDict/';
    return ApiClassesGroupTitleDict;
}());
exports.ApiClassesGroupTitleDict = ApiClassesGroupTitleDict;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 说明:护理单元分组允许使用班段字典表controller
 */
var ApiClassesGroupVs = /** @class */ (function () {
    function ApiClassesGroupVs() {
    }
    /**
     * 护理单元分组允许使用班段字典表的信息
     *
     */
    ApiClassesGroupVs.select = function (page, name) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupVs.baseUrl, "select", { page: page, name: name });
    };
    /**
     * 添加/更新护理单元分组允许使用班段
     *
     */
    ApiClassesGroupVs.save = function (nurseGroupVsClasses) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupVs.baseUrl, "save", { nurseGroupVsClasses: nurseGroupVsClasses });
    };
    /**
     * 配置分组允许使用班段信息
     *
     */
    ApiClassesGroupVs.dict = function (name) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupVs.baseUrl, "dict", { name: name });
    };
    ApiClassesGroupVs.baseUrl = '/classes/groupVsClasses/';
    return ApiClassesGroupVs;
}());
exports.ApiClassesGroupVs = ApiClassesGroupVs;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/29
 * 说明:分组人员信息Controller
 */
var ApiClassesGroupVsStaff = /** @class */ (function () {
    function ApiClassesGroupVsStaff() {
    }
    /**
     * 查询分组下的人员信息
     *
     */
    ApiClassesGroupVsStaff.select = function (name, groupId) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupVsStaff.baseUrl, "select", { name: name, groupId: groupId });
    };
    /**
     * 更新分组下的人员信息
     *
     */
    ApiClassesGroupVsStaff.save = function (nurseGroupVsStaffs) {
        return api_1.apiUtil.connection("POST", ApiClassesGroupVsStaff.baseUrl, "save", { nurseGroupVsStaffs: nurseGroupVsStaffs });
    };
    ApiClassesGroupVsStaff.baseUrl = '/classes/groupVsStaff/';
    return ApiClassesGroupVsStaff;
}());
exports.ApiClassesGroupVsStaff = ApiClassesGroupVsStaff;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 说明:排班主记录信息Controller
 */
var ApiClassesScheduling = /** @class */ (function () {
    function ApiClassesScheduling() {
    }
    /**
     * 发布最新排班信息
     *
     */
    ApiClassesScheduling.save = function (schedulingIndices) {
        return api_1.apiUtil.connection("POST", ApiClassesScheduling.baseUrl, "save", { schedulingIndices: schedulingIndices });
    };
    /**
     * 根据护理单元id查询分组信息和分组下的人员信息
     *
     */
    ApiClassesScheduling.selectDict = function (deptId) {
        return api_1.apiUtil.connection("POST", ApiClassesScheduling.baseUrl, "selectDict", { deptId: deptId });
    };
    /**
     * 查询排班信息
     *
     */
    ApiClassesScheduling.select = function (begin, id) {
        return api_1.apiUtil.connection("POST", ApiClassesScheduling.baseUrl, "select", { begin: begin, id: id });
    };
    ApiClassesScheduling.baseUrl = '/classes/scheduling/';
    return ApiClassesScheduling;
}());
exports.ApiClassesScheduling = ApiClassesScheduling;
/**
 * 公共接口控制器
 * Created by 包国强 on 2017/6/26.
 */
var ApiComm = /** @class */ (function () {
    function ApiComm() {
    }
    /**
     * 获取当前服务器时间
     *
     */
    ApiComm.loadNowDate = function () {
        return api_1.apiUtil.connection("GET", ApiComm.baseUrl, "loadNowDate", {});
    };
    ApiComm.baseUrl = '/comm/comm/';
    return ApiComm;
}());
exports.ApiComm = ApiComm;
/**
 * mogo测试控制器
 * Created by bgq on 2017/5/19.
 */
var ApiDemoMogodb = /** @class */ (function () {
    function ApiDemoMogodb() {
    }
    /**
     * 查询:通过name查询
     *
     */
    ApiDemoMogodb.findUserByName = function (name) {
        return api_1.apiUtil.connection("POST", ApiDemoMogodb.baseUrl, "findUserByName", { name: name });
    };
    /**
     * 查询:自定义条件查询
     *
     */
    ApiDemoMogodb.select = function () {
        return api_1.apiUtil.connection("POST", ApiDemoMogodb.baseUrl, "select", {});
    };
    /**
     * 保存(添加或修改,id相同即修改,id不同则添加)
     *
     */
    ApiDemoMogodb.save = function (user) {
        return api_1.apiUtil.connection("POST", ApiDemoMogodb.baseUrl, "save", { user: user });
    };
    /**
     * 通过name删除
     *
     */
    ApiDemoMogodb.deleteByName = function (name) {
        return api_1.apiUtil.connection("POST", ApiDemoMogodb.baseUrl, "deleteByName", { name: name });
    };
    ApiDemoMogodb.baseUrl = '/demo/mogodb/mogodb/';
    return ApiDemoMogodb;
}());
exports.ApiDemoMogodb = ApiDemoMogodb;
/**
 * 公共字典表控制器
 * Created by 毛琪 on 2017/5/11.
 */
var ApiDictData = /** @class */ (function () {
    function ApiDictData() {
    }
    /**
     * 查询所有性别字典
     *
     */
    ApiDictData.findAllSex = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllSex", {});
    };
    /**
     * 查询所有国家及地区字典字典
     *
     */
    ApiDictData.findAllCountry = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllCountry", {});
    };
    /**
     * 查询所有民族字典
     *
     */
    ApiDictData.findAllNation = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllNation", {});
    };
    /**
     * 查询所有籍贯字典
     *
     */
    ApiDictData.findAllArea = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllArea", {});
    };
    /**
     * 查询所有费别字典
     *
     */
    ApiDictData.findAllChargeType = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllChargeType", {});
    };
    /**
     * 查询所有身份字典
     *
     */
    ApiDictData.findAllIdentity = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllIdentity", {});
    };
    /**
     * 查询所有合同单位字典
     *
     */
    ApiDictData.findAllUnitContract = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllUnitContract", {});
    };
    /**
     * 查询所有社会关系字典
     *
     */
    ApiDictData.findAllRelationship = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllRelationship", {});
    };
    /**
     * 查询RH字典表中所有
     *
     */
    ApiDictData.findAllRHType = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllRHType", {});
    };
    /**
     * 查询归属字典表中所有
     *
     */
    ApiDictData.findAllBloodLocal = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllBloodLocal", {});
    };
    /**
     * 查询输血目的字典表中所有
     *
     */
    ApiDictData.findAllTransfusionPurpose = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllTransfusionPurpose", {});
    };
    /**
     * 查询血型字典表中所有血型
     *
     */
    ApiDictData.findAllBloodType = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllBloodType", {});
    };
    /**
     * 查询血源字典表中所有
     *
     */
    ApiDictData.findAllBloodSource = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllBloodSource", {});
    };
    /**
     * 查询用血方式字典表中所有
     *
     */
    ApiDictData.findAllBloodMethod = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllBloodMethod", {});
    };
    /**
     * 查询用血要求字典表中所有
     *
     */
    ApiDictData.findAllBloodRequireMent = function () {
        return api_1.apiUtil.connection("POST", ApiDictData.baseUrl, "findAllBloodRequireMent", {});
    };
    /**
     * 查询性别字典
     *
     */
    ApiDictData.loadDictSex = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDictSex", {});
    };
    /**
     * 查询费别字典
     *
     */
    ApiDictData.loadChargeType = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadChargeType", {});
    };
    /**
     * 查询身份字典
     *
     */
    ApiDictData.loadIdentity = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadIdentity", {});
    };
    /**
     * 查询民族字典
     *
     */
    ApiDictData.loadNation = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadNation", {});
    };
    /**
     * 查询来院方式字典
     *
     */
    ApiDictData.loadRegFrom = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadRegFrom", {});
    };
    /**
     * 查询绿色通道字典
     *
     */
    ApiDictData.loadGreenRoad = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadGreenRoad", {});
    };
    /**
     * 查询其他方式字典
     *
     */
    ApiDictData.loadOther = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadOther", {});
    };
    /**
     * 查询分诊级别字典
     *
     */
    ApiDictData.loadTriageLevel = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadTriageLevel", {});
    };
    /**
     * 查询分诊去向字典
     *
     */
    ApiDictData.loadTriageTarget = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadTriageTarget", {});
    };
    /**
     * 查询其他分诊去向字典
     *
     */
    ApiDictData.loadTriageOther = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadTriageOther", {});
    };
    /**
     * 查询病人评分字典表
     *
     */
    ApiDictData.loadScoreType = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadScoreType", {});
    };
    /**
     * 查询分诊级别更改理由字典表
     *
     */
    ApiDictData.loadMhChangeReason = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadMhChangeReason", {});
    };
    /**
     * 查询判定依据项目字典表
     *
     */
    ApiDictData.loadMhCriterionMainDict = function (inputCode, startIndex, pageSize) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadMhCriterionMainDict", { inputCode: inputCode, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询判定依据项目字典表
     *
     */
    ApiDictData.loadMhCriterionItemDict = function (inputCode, startIndex, pageSize) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadMhCriterionItemDict", { inputCode: inputCode, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询急诊手术室
     *
     */
    ApiDictData.loadOperatingDept = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadOperatingDept", {});
    };
    /**
     * 查询急诊手术间
     *
     */
    ApiDictData.loadOperatingRoom = function (deptCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadOperatingRoom", { deptCode: deptCode });
    };
    /**
     * 查询诊断类别字典
     *
     */
    ApiDictData.loadDiagnosisTypeDict = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDiagnosisTypeDict", {});
    };
    /**
     * 查询疾病字典
     *
     */
    ApiDictData.loadDiagnosisDict = function (inputCode, startIndex, pageSize) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDiagnosisDict", { inputCode: inputCode, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询科室字典
     *
     */
    ApiDictData.loadDepartment = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDepartment", {});
    };
    ApiDictData.loadDeptDict = function (page, inputCode, staffId) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDeptDict", { page: page, inputCode: inputCode, staffId: staffId });
    };
    ApiDictData.clinicalDepartments = function (page, inputCode, staffId) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "clinicalDepartments", { page: page, inputCode: inputCode, staffId: staffId });
    };
    /**
     * 查询角色
     *
     */
    ApiDictData.loadRole = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadRole", { page: page, inputCode: inputCode });
    };
    /**
     * 查询医生
     *
     */
    ApiDictData.loadDoctor = function (page, inputCode, deptCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDoctor", { page: page, inputCode: inputCode, deptCode: deptCode });
    };
    /**
     * 查询护士
     *
     */
    ApiDictData.loadNurse = function (page, inputCode, deptCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadNurse", { page: page, inputCode: inputCode, deptCode: deptCode });
    };
    /**
     * 查询员工
     *
     */
    ApiDictData.loadStaffDict = function (deptCode, inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadStaffDict", { deptCode: deptCode, inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊麻醉方法字典
     *
     */
    ApiDictData.loadAnaesthesiaDict = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadAnaesthesiaDict", {});
    };
    /**
     * 查询急诊检验项目类别字典
     *
     */
    ApiDictData.loadLabItemClassDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadLabItemClassDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊检验科室
     *
     */
    ApiDictData.loadLabSheetMaster = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadLabSheetMaster", { inputCode: inputCode, page: page });
    };
    /**
     * 查询科室对应标本
     *
     */
    ApiDictData.loadSpecimanDict = function (deptCode, inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadSpecimanDict", { deptCode: deptCode, inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊血型字典表
     *
     */
    ApiDictData.loadBloodType = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadBloodType", {});
    };
    /**
     * 查询急诊rh血型字典表
     *
     */
    ApiDictData.loadBloodTypeRh = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadBloodTypeRh", {});
    };
    /**
     * 查询急诊血液成分字典
     *
     */
    ApiDictData.loadBloodComponen = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadBloodComponen", {});
    };
    /**
     * 查询病区所有给药途径
     *
     */
    ApiDictData.getAdministrationAll = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "getAdministrationAll", {});
    };
    /**
     * 通过病区关联信息id查询给药途径
     *
     */
    ApiDictData.findAdministration = function (id) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "findAdministration", { id: id });
    };
    /**
     * 查询药品处方属性字典
     *
     */
    ApiDictData.loadDrugPrescAttrDict = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDrugPrescAttrDict", {});
    };
    /**
     * 查询权限
     *
     */
    ApiDictData.loadAppGrants = function (flag, deptCode, userId, code, value) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadAppGrants", { flag: flag, deptCode: deptCode, userId: userId, code: code, value: value });
    };
    /**
     * 通过会诊号查询急诊会诊科室
     *
     */
    ApiDictData.loadConsultationDept = function (consultationId) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadConsultationDept", { consultationId: consultationId });
    };
    /**
     * 查询急诊会诊类型
     *
     */
    ApiDictData.loadConsultationTypeDict = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadConsultationTypeDict", {});
    };
    /**
     * 查询急诊会诊权限字典
     *
     */
    ApiDictData.loadConsultationGrantDict = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadConsultationGrantDict", {});
    };
    /**
     * 查询急诊会诊状态
     *
     */
    ApiDictData.loadConsultationStatusDict = function () {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadConsultationStatusDict", {});
    };
    /**
     * 查询急诊会诊科室
     *
     */
    ApiDictData.loadConsultationDeptDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadConsultationDeptDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊会诊员工
     *
     */
    ApiDictData.loadConsultationStaffDict = function (deptCode, inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadConsultationStaffDict", { deptCode: deptCode, inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊病历记录模板类型字典表
     *
     */
    ApiDictData.loadMrTempTypeDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadMrTempTypeDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊处方煎煮方法字典表
     *
     */
    ApiDictData.loadDecoctingMethodDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDecoctingMethodDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊处方频次字典表
     *
     */
    ApiDictData.loadPrescFormDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadPrescFormDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊处方服用要求字典表
     *
     */
    ApiDictData.loadPrescRequrementDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadPrescRequrementDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊处方服用要求字典表
     *
     */
    ApiDictData.loadPrescDetailDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadPrescDetailDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊护理等级字典表
     *
     */
    ApiDictData.loadNursingClassDict = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadNursingClassDict", { page: page, inputCode: inputCode });
    };
    /**
     * 查询急诊病情状态字典
     *
     */
    ApiDictData.loadPatientStatusDict = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadPatientStatusDict", { page: page, inputCode: inputCode });
    };
    /**
     * 查询急诊区域字典表
     *
     */
    ApiDictData.loadAreaDict = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadAreaDict", { page: page, inputCode: inputCode });
    };
    /**
     * 价表项目分类字典
     *
     */
    ApiDictData.loadBillItemClassDict = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadBillItemClassDict", { page: page, inputCode: inputCode });
    };
    /**
     * 查询药房配置
     *
     */
    ApiDictData.loadDrugStorageConfig = function (deptCode, type) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadDrugStorageConfig", { deptCode: deptCode, type: type });
    };
    /**
     * 查询过敏药物字典表
     *
     */
    ApiDictData.loadAlergyDrugsDict = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadAlergyDrugsDict", { page: page, inputCode: inputCode });
    };
    /**
     * 查询血量单位字典
     *
     */
    ApiDictData.loadBloodUnitDict = function (page, inputCode) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadBloodUnitDict", { page: page, inputCode: inputCode });
    };
    /**
     * 查询检查执行科室字典
     *
     */
    ApiDictData.loadExamPerformByDict = function (examClass) {
        return api_1.apiUtil.connection("GET", ApiDictData.baseUrl, "loadExamPerformByDict", { examClass: examClass });
    };
    ApiDictData.baseUrl = '/dict/dataDict/';
    return ApiDictData;
}());
exports.ApiDictData = ApiDictData;
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
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "select", { name: name });
    };
    /**
     * 查询模糊查询控件的列明细信息
     *
     */
    ApiDictInput.selectList = function (dictCode) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "selectList", { dictCode: dictCode });
    };
    /**
     * 查询模糊查询控件的所有列
     *
     */
    ApiDictInput.selectTable = function (tableName) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "selectTable", { tableName: tableName });
    };
    /**
     * 新增/更新 模糊查询控件
     *
     */
    ApiDictInput.save = function (inputDicts, inputs, selectInput) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "save", { inputDicts: inputDicts, inputs: inputs, selectInput: selectInput });
    };
    /**
     * 作废模糊查询控件的列明细信息
     *
     */
    ApiDictInput.deleteOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "deleteOne", { id: id });
    };
    /**
     * 作废模糊查询控件
     *
     */
    ApiDictInput.delete = function (dictCode) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "delete", { dictCode: dictCode });
    };
    /**
     * 加载多个
     *
     */
    ApiDictInput.loadMultipleColumns = function (dictCodes) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "loadMultipleColumns", { dictCodes: dictCodes });
    };
    /**
     * 查询字典数据列
     *
     */
    ApiDictInput.loadColumns = function (dictCode) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "loadColumns", { dictCode: dictCode });
    };
    /**
     * 查询字典数据
     *
     */
    ApiDictInput.loadData = function (page, dictCode, inputCode, params) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "loadData", { page: page, dictCode: dictCode, inputCode: inputCode, params: params });
    };
    /**
     * 查询急诊所有表
     *
     */
    ApiDictInput.emergencyTable = function (page, inputCode) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "emergencyTable", { page: page, inputCode: inputCode });
    };
    /**
     * 查询模糊查询控件的列明细信息
     *
     */
    ApiDictInput.fuzzyQuery = function (dictCode) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "fuzzyQuery", { dictCode: dictCode });
    };
    /**
     * 模糊查询控件参数
     *
     */
    ApiDictInput.queryControl = function (page, tableName, inputCode) {
        return api_1.apiUtil.connection("POST", ApiDictInput.baseUrl, "queryControl", { page: page, tableName: tableName, inputCode: inputCode });
    };
    ApiDictInput.baseUrl = '/dict/inputDict/';
    return ApiDictInput;
}());
exports.ApiDictInput = ApiDictInput;
var ApiDrugConfig = /** @class */ (function () {
    function ApiDrugConfig() {
    }
    /**
     * 药房配置的主表信息
     *
     */
    ApiDrugConfig.select = function (inputname, radio, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "select", { inputname: inputname, radio: radio, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 药房配置的子表信息
     *
     */
    ApiDrugConfig.selectDrugStorageConfig = function (id) {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "selectDrugStorageConfig", { id: id });
    };
    /**
     * 药房配置失效
     *
     */
    ApiDrugConfig.update = function (id) {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "update", { id: id });
    };
    /**
     * 添加药房配置的子表信
     *
     */
    ApiDrugConfig.insetDrugStorageConfig = function (list, drug) {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "insetDrugStorageConfig", { list: list, drug: drug });
    };
    /**
     * Created by 黄倩 on 2017/8/1.
     * 根据科室查询药房配置信息
     *
     */
    ApiDrugConfig.selectConfig = function (job, deptCode) {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "selectConfig", { job: job, deptCode: deptCode });
    };
    /**
     * Created by 黄倩 on 2017/8/1.
     * 添加科室的药房配置信息
     *
     */
    ApiDrugConfig.insertConfig = function (list) {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "insertConfig", { list: list });
    };
    /**
     * Created by 黄倩 on 2017/8/1.
     * 查询药房仓库字典表
     */
    ApiDrugConfig.selectDrugStorageDict = function () {
        return api_1.apiUtil.connection("POST", ApiDrugConfig.baseUrl, "selectDrugStorageDict", {});
    };
    ApiDrugConfig.baseUrl = '/drugConfig/drugConfigController/';
    return ApiDrugConfig;
}());
exports.ApiDrugConfig = ApiDrugConfig;
/**
 * Created by 黄倩 on 2017/8/4.
 * 医生医嘱/手术说明的控制器
 */
var ApiExplain = /** @class */ (function () {
    function ApiExplain() {
    }
    /**
     * Created by 黄倩 on 2017/7/27.
     * 查询医生医嘱/手术说明的service
     *
     */
    ApiExplain.select = function (inputtitle, radio, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiExplain.baseUrl, "select", { inputtitle: inputtitle, radio: radio, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * Created by 黄倩 on 2017/7/26.
     * 添加医生医嘱/手术说明
     *
     */
    ApiExplain.insertMould = function (explain) {
        return api_1.apiUtil.connection("POST", ApiExplain.baseUrl, "insertMould", { explain: explain });
    };
    /**
     * Created by 黄倩 on 2017/7/26.
     * 删除医生医嘱/手术说明
     *
     */
    ApiExplain.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiExplain.baseUrl, "delete", { id: id });
    };
    ApiExplain.baseUrl = '/explain/explainController/';
    return ApiExplain;
}());
exports.ApiExplain = ApiExplain;
var ApiInfoPushMessageDict = /** @class */ (function () {
    function ApiInfoPushMessageDict() {
    }
    /**
     * 查询所有可以进行消息推送的类型
     *
     */
    ApiInfoPushMessageDict.selectMessage = function () {
        return api_1.apiUtil.connection("POST", ApiInfoPushMessageDict.baseUrl, "selectMessage", {});
    };
    /**
     * 作废/启用 消息类型推送的类型
     *
     */
    ApiInfoPushMessageDict.update = function (typeList) {
        return api_1.apiUtil.connection("POST", ApiInfoPushMessageDict.baseUrl, "update", { typeList: typeList });
    };
    /**
     * 修改消息推送的类型的信息
     *
     */
    ApiInfoPushMessageDict.updates = function (typeList) {
        return api_1.apiUtil.connection("POST", ApiInfoPushMessageDict.baseUrl, "updates", { typeList: typeList });
    };
    ApiInfoPushMessageDict.baseUrl = '/infoPush/messageDictController/';
    return ApiInfoPushMessageDict;
}());
exports.ApiInfoPushMessageDict = ApiInfoPushMessageDict;
/**
 * 门诊登记病人控制器
 * Created by 毛琪 on 2017/5/11.
 */
var ApiOutpMedrecPatMasterIndex = /** @class */ (function () {
    function ApiOutpMedrecPatMasterIndex() {
    }
    /**
     * 查询所有登记者
     *
     */
    ApiOutpMedrecPatMasterIndex.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "findAll", {});
    };
    /**
     * 根据登记者id查询
     *
     */
    ApiOutpMedrecPatMasterIndex.findById = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "findById", { patientId: patientId });
    };
    /**
     * 添加登记者
     *
     */
    ApiOutpMedrecPatMasterIndex.save = function (patMasterIndex) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "save", { patMasterIndex: patMasterIndex });
    };
    /**
     * 添加挂号
     *
     */
    ApiOutpMedrecPatMasterIndex.saveClinic = function (clinicMaster) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "saveClinic", { clinicMaster: clinicMaster });
    };
    /**
     * 根据主记录的examNo查询检查子表
     *
     */
    ApiOutpMedrecPatMasterIndex.findExamItem = function (examNo) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "findExamItem", { examNo: examNo });
    };
    /**
     * 根据患者标识patientId查询检查主表
     *
     */
    ApiOutpMedrecPatMasterIndex.findByPatientId = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "findByPatientId", { patientId: patientId });
    };
    /**
     * 查询检查治疗医嘱明细记录
     *
     */
    ApiOutpMedrecPatMasterIndex.findOutpTreat = function (date, visitNo) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "findOutpTreat", { date: date, visitNo: visitNo });
    };
    /**
     * 查询处方医嘱明细记录
     *
     */
    ApiOutpMedrecPatMasterIndex.findOutpPresc = function (patientId, userName, doctorName, visitDept) {
        return api_1.apiUtil.connection("POST", ApiOutpMedrecPatMasterIndex.baseUrl, "findOutpPresc", { patientId: patientId, userName: userName, doctorName: doctorName, visitDept: visitDept });
    };
    ApiOutpMedrecPatMasterIndex.baseUrl = '/medrec/patMasterIndex/';
    return ApiOutpMedrecPatMasterIndex;
}());
exports.ApiOutpMedrecPatMasterIndex = ApiOutpMedrecPatMasterIndex;
/**
 * 检验控制器
 * Created by Vinsher on 2017/5/12.
 */
var ApiUserSystemCheckOutLabTestMasterAndItem = /** @class */ (function () {
    function ApiUserSystemCheckOutLabTestMasterAndItem() {
    }
    /**
     * 验证信息
     *
     */
    ApiUserSystemCheckOutLabTestMasterAndItem.checkOut = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiUserSystemCheckOutLabTestMasterAndItem.baseUrl, "checkOut", { patientId: patientId });
    };
    ApiUserSystemCheckOutLabTestMasterAndItem.baseUrl = '/systemCheckOut/labTestMasterAndItem/';
    return ApiUserSystemCheckOutLabTestMasterAndItem;
}());
exports.ApiUserSystemCheckOutLabTestMasterAndItem = ApiUserSystemCheckOutLabTestMasterAndItem;
/**
 * 创建人:黄倩
 * 创建时间:2017/12/13
 * 患者过敏药物controller
 */
var ApiPatManageAllergyHistory = /** @class */ (function () {
    function ApiPatManageAllergyHistory() {
    }
    /**
     * 更新/保存患者过敏药物的属性
     *
     */
    ApiPatManageAllergyHistory.save = function (allergyHistory) {
        return api_1.apiUtil.connection("POST", ApiPatManageAllergyHistory.baseUrl, "save", { allergyHistory: allergyHistory });
    };
    /**
     * 根据患者信息id查询过敏药物信息
     *
     */
    ApiPatManageAllergyHistory.select = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageAllergyHistory.baseUrl, "select", { pvId: pvId });
    };
    ApiPatManageAllergyHistory.baseUrl = '/allergy/allergyHistory/';
    return ApiPatManageAllergyHistory;
}());
exports.ApiPatManageAllergyHistory = ApiPatManageAllergyHistory;
/**
 * 用血控制器
 * Created by 包国强 on 2017/6/26.
 */
var ApiPatManageBlood = /** @class */ (function () {
    function ApiPatManageBlood() {
    }
    /**
     * 保存用血申请
     *
     */
    ApiPatManageBlood.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageBlood.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 查询历史急诊用血预约申请单
     *
     */
    ApiPatManageBlood.loadBloodApply = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageBlood.baseUrl, "loadBloodApply", { pvId: pvId });
    };
    /**
     * 查询历史急诊申请用血量表
     *
     */
    ApiPatManageBlood.loadBloodCapacity = function (appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageBlood.baseUrl, "loadBloodCapacity", { appNo: appNo });
    };
    /**
     * 作废用血
     *
     */
    ApiPatManageBlood.cancel = function (appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageBlood.baseUrl, "cancel", { appNo: appNo });
    };
    ApiPatManageBlood.baseUrl = '/patManage/blood/blood/';
    return ApiPatManageBlood;
}());
exports.ApiPatManageBlood = ApiPatManageBlood;
/**
 * 患者管理-会诊控制器
 * Created by 毛琪 on 2017/6/8.
 */
var ApiPatManageConsultationApply = /** @class */ (function () {
    function ApiPatManageConsultationApply() {
    }
    /**
     * 查询会诊子记录
     *
     */
    ApiPatManageConsultationApply.loadConsultationApplyDetail = function (page, deptCode, startDate, endDate, status) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "loadConsultationApplyDetail", { page: page, deptCode: deptCode, startDate: startDate, endDate: endDate, status: status });
    };
    /**
     * 根据会诊记录id查询会诊记录
     *
     */
    ApiPatManageConsultationApply.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "findById", { id: id });
    };
    /**
     * 根据会诊申请id查询会诊申请
     *
     */
    ApiPatManageConsultationApply.findMasterById = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "findMasterById", { id: id });
    };
    /**
     * 通过会诊号查询急诊会诊申请主表
     *
     */
    ApiPatManageConsultationApply.findMasterByConsultationId = function (consultationId) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "findMasterByConsultationId", { consultationId: consultationId });
    };
    /**
     * 保存急诊会诊申请
     *
     */
    ApiPatManageConsultationApply.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 更新会诊记录
     *
     */
    ApiPatManageConsultationApply.updateDetail = function (consultationApplyDetail) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "updateDetail", { consultationApplyDetail: consultationApplyDetail });
    };
    /**
     * 更新会诊申请
     *
     */
    ApiPatManageConsultationApply.updateMaster = function (consultationApplyMaster) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultationApply.baseUrl, "updateMaster", { consultationApplyMaster: consultationApplyMaster });
    };
    ApiPatManageConsultationApply.baseUrl = '/consultation/consultationApply/';
    return ApiPatManageConsultationApply;
}());
exports.ApiPatManageConsultationApply = ApiPatManageConsultationApply;
/**
 * 会诊控制器
 * Created by 包国强 on 2017/7/22.
 */
var ApiPatManageConsultation = /** @class */ (function () {
    function ApiPatManageConsultation() {
    }
    /**
     * 保存急诊会诊
     *
     */
    ApiPatManageConsultation.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 保存急诊会诊申请主表
     *
     */
    ApiPatManageConsultation.saveMaster = function (data) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "saveMaster", { data: data });
    };
    /**
     * 保存急诊会诊申请子表
     *
     */
    ApiPatManageConsultation.saveDetail = function (data) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "saveDetail", { data: data });
    };
    /**
     * 查询急诊会诊申请主表
     *
     */
    ApiPatManageConsultation.loadConsultationMaster = function (page, pvId, consultationId, consultationType, status, patientId, tiemFrom, tiemTo) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "loadConsultationMaster", { page: page, pvId: pvId, consultationId: consultationId, consultationType: consultationType, status: status, patientId: patientId, tiemFrom: tiemFrom, tiemTo: tiemTo });
    };
    /**
     * 通过会诊号查询急诊会诊申请子表
     *
     */
    ApiPatManageConsultation.loadConsultationDetail = function (consultationId) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "loadConsultationDetail", { consultationId: consultationId });
    };
    /**
     * 通过会诊号与会诊科室查询会诊意见
     *
     */
    ApiPatManageConsultation.loadConsultationIdeas = function (consultationId, deptCodes) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "loadConsultationIdeas", { consultationId: consultationId, deptCodes: deptCodes });
    };
    /**
     * 查询急诊会诊类型与会诊状态配置表(会诊流程配置)
     *
     */
    ApiPatManageConsultation.loadConsultationProcess = function (typeId, statusId, deptCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "loadConsultationProcess", { typeId: typeId, statusId: statusId, deptCode: deptCode });
    };
    /**
     * 查询当前会诊权限
     *
     */
    ApiPatManageConsultation.loadConsultationGrants = function (consultationId, deptCode, staffId) {
        return api_1.apiUtil.connection("POST", ApiPatManageConsultation.baseUrl, "loadConsultationGrants", { consultationId: consultationId, deptCode: deptCode, staffId: staffId });
    };
    ApiPatManageConsultation.baseUrl = '/patManage/consultation/consultation/';
    return ApiPatManageConsultation;
}());
exports.ApiPatManageConsultation = ApiPatManageConsultation;
/**
 * 诊断信息的控制器
 * Created by Vinsher on 2017/5/12.
 */
var ApiPatManageDiagnosis = /** @class */ (function () {
    function ApiPatManageDiagnosis() {
    }
    /**
     * 根据患者id查询诊断
     *
     */
    ApiPatManageDiagnosis.findByPvId = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosis.baseUrl, "findByPvId", { pvId: pvId });
    };
    /**
     * 保存诊断信息
     *
     */
    ApiPatManageDiagnosis.save = function (modelList, pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosis.baseUrl, "save", { modelList: modelList, pvId: pvId });
    };
    /**
     * 暂存常用诊断
     *
     */
    ApiPatManageDiagnosis.tempSave = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosis.baseUrl, "tempSave", { model: model });
    };
    /**
     * 获取暂存常用诊断key列表
     *
     */
    ApiPatManageDiagnosis.loadTempSave = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageDiagnosis.baseUrl, "loadTempSave", {});
    };
    /**
     * 获取暂存常用诊断信息
     *
     */
    ApiPatManageDiagnosis.loadTempSaveByKey = function (key) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosis.baseUrl, "loadTempSaveByKey", { key: key });
    };
    /**
     * 删除暂存常用诊断
     *
     */
    ApiPatManageDiagnosis.delTempSave = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosis.baseUrl, "delTempSave", { model: model });
    };
    ApiPatManageDiagnosis.baseUrl = '/patManage/diagnosis/diagnosis/';
    return ApiPatManageDiagnosis;
}());
exports.ApiPatManageDiagnosis = ApiPatManageDiagnosis;
/**
 * 处置模板
 * Created by 黄倩 on 2017/7/31.
 */
var ApiPatManageDiagnosisDispose = /** @class */ (function () {
    function ApiPatManageDiagnosisDispose() {
    }
    /**
     * 根据科室查找处置模板
     *
     */
    ApiPatManageDiagnosisDispose.selectMaster = function (deptCode, inputtitle, radio, startIndex, pageSize, operation) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosisDispose.baseUrl, "selectMaster", { deptCode: deptCode, inputtitle: inputtitle, radio: radio, startIndex: startIndex, pageSize: pageSize, operation: operation });
    };
    /**
     * 根据处置模板主表中的id查询相应的子表信息
     *
     */
    ApiPatManageDiagnosisDispose.selectItems = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosisDispose.baseUrl, "selectItems", { id: id });
    };
    /**
     * 添加处置模板
     *
     */
    ApiPatManageDiagnosisDispose.insert = function (master, items) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosisDispose.baseUrl, "insert", { master: master, items: items });
    };
    /**
     * 删除处置模板
     *
     */
    ApiPatManageDiagnosisDispose.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosisDispose.baseUrl, "delete", { id: id });
    };
    ApiPatManageDiagnosisDispose.selectdict = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosisDispose.baseUrl, "selectdict", {});
    };
    /**
     * 模板明细中的项目信息
     *
     */
    ApiPatManageDiagnosisDispose.selectinfo = function (type, page, name) {
        return api_1.apiUtil.connection("POST", ApiPatManageDiagnosisDispose.baseUrl, "selectinfo", { type: type, page: page, name: name });
    };
    ApiPatManageDiagnosisDispose.baseUrl = '/dispose/disposeController/';
    return ApiPatManageDiagnosisDispose;
}());
exports.ApiPatManageDiagnosisDispose = ApiPatManageDiagnosisDispose;
/**
 * 护理评估记录控制器
 * Created by 毛琪 on 2017/6/16.
 */
var ApiPatManageDocInstance = /** @class */ (function () {
    function ApiPatManageDocInstance() {
    }
    /**
     * 查询所有模板 1
     *
     */
    ApiPatManageDocInstance.findAllTemlt = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findAllTemlt", {});
    };
    /**
     * 根据模板类型id查询评估单(模板列表) 2
     *
     */
    ApiPatManageDocInstance.findIns = function (tmpltId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findIns", { tmpltId: tmpltId });
    };
    /**
     * 根据模板id&患者id查询评估单(历史记录) 3
     *
     */
    ApiPatManageDocInstance.findInsRecord = function (tmpltId, pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findInsRecord", { tmpltId: tmpltId, pvId: pvId });
    };
    /**
     * 根据评估单id查询患者信息(跌倒评估单记录) 4.1
     *
     */
    ApiPatManageDocInstance.findRisk = function (insId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findRisk", { insId: insId });
    };
    /**
     * 根据评估单id查询患者信息(adl指数评定量评估单记录) 4.2
     *
     */
    ApiPatManageDocInstance.findADL = function (insId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findADL", { insId: insId });
    };
    /**
     * 根据评估单id查询患者信息(疼痛护理评估单记录) 4.3
     *
     */
    ApiPatManageDocInstance.findPain = function (insId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findPain", { insId: insId });
    };
    /**
     * 根据评估单id查询患者信息(入院评估单记录) 4.4
     *
     */
    ApiPatManageDocInstance.findPatient = function (insId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findPatient", { insId: insId });
    };
    /**
     * 根据评估单id查询患者信息(皮肤护理评估单记录) 4.5
     *
     */
    ApiPatManageDocInstance.findSkin = function (insId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findSkin", { insId: insId });
    };
    /**
     * 根据评估单id查询患者信息(压疮风险评估单记录) 4.6
     *
     */
    ApiPatManageDocInstance.findSores = function (insId) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "findSores", { insId: insId });
    };
    /**
     * 添加跌倒危险评分记录 5.1
     *
     */
    ApiPatManageDocInstance.saveRisk = function (docInstance) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "saveRisk", { docInstance: docInstance });
    };
    /**
     * 添加adl指数评定量记录 5.2
     *
     */
    ApiPatManageDocInstance.saveADL = function (docInstance) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "saveADL", { docInstance: docInstance });
    };
    /**
     * 添加疼痛护理评估记录 5.3
     *
     */
    ApiPatManageDocInstance.savePain = function (docInstance) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "savePain", { docInstance: docInstance });
    };
    /**
     * 添加入院评估记录 5.4
     *
     */
    ApiPatManageDocInstance.savePatient = function (docInstance) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "savePatient", { docInstance: docInstance });
    };
    /**
     * 添加皮肤护理记录 5.5
     *
     */
    ApiPatManageDocInstance.saveSkin = function (docInstance) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "saveSkin", { docInstance: docInstance });
    };
    /**
     * 添加压疮风险评估记录 5.6
     *
     */
    ApiPatManageDocInstance.saveSores = function (docInstance) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "saveSores", { docInstance: docInstance });
    };
    /**
     * 修改跌倒危险评分记录 6.1
     *
     */
    ApiPatManageDocInstance.updateRisk = function (docInsDetailFallRisk) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updateRisk", { docInsDetailFallRisk: docInsDetailFallRisk });
    };
    /**
     * 修改adl指数评定量记录 6.2
     *
     */
    ApiPatManageDocInstance.updateADL = function (docInsDetailADLJudge) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updateADL", { docInsDetailADLJudge: docInsDetailADLJudge });
    };
    /**
     * 修改疼痛护理评估记录 6.3
     *
     */
    ApiPatManageDocInstance.updatePain = function (docInsDetailPain) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updatePain", { docInsDetailPain: docInsDetailPain });
    };
    /**
     * 修改入院评估记录 6.4
     *
     */
    ApiPatManageDocInstance.updatePatient = function (docInsDetailPatient) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updatePatient", { docInsDetailPatient: docInsDetailPatient });
    };
    /**
     * 修改皮肤护理记录 6.5
     *
     */
    ApiPatManageDocInstance.updateSkin = function (docInsDetailSkin) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updateSkin", { docInsDetailSkin: docInsDetailSkin });
    };
    /**
     * 修改压疮风险评估记录 6.6
     *
     */
    ApiPatManageDocInstance.updateSores = function (docInsDetailSores) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updateSores", { docInsDetailSores: docInsDetailSores });
    };
    /**
     * 另存模板(修改评估单记录为模板类型)
     *
     */
    ApiPatManageDocInstance.updateIns = function (title, id) {
        return api_1.apiUtil.connection("POST", ApiPatManageDocInstance.baseUrl, "updateIns", { title: title, id: id });
    };
    ApiPatManageDocInstance.baseUrl = '/doc/docInstance/';
    return ApiPatManageDocInstance;
}());
exports.ApiPatManageDocInstance = ApiPatManageDocInstance;
/**
 * 检查控制器
 * Created by 包国强 on 2017/6/16.
 */
var ApiPatManageExam = /** @class */ (function () {
    function ApiPatManageExam() {
    }
    /**
     * 保存检查申请
     *
     */
    ApiPatManageExam.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 查询历史急诊检查预约记录
     *
     */
    ApiPatManageExam.loadExamAppoints = function (pvId, appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "loadExamAppoints", { pvId: pvId, appNo: appNo });
    };
    /**
     * 查询历史急诊检查项目记录
     *
     */
    ApiPatManageExam.loadExamItems = function (appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "loadExamItems", { appNo: appNo });
    };
    /**
     * 查询类别与发往科室
     *
     */
    ApiPatManageExam.loadExamClassDict = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageExam.baseUrl, "loadExamClassDict", {});
    };
    /**
     * 查询子类别(根据 类别 查询)
     *
     */
    ApiPatManageExam.loadExamSubclassDict = function (examClass) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "loadExamSubclassDict", { examClass: examClass });
    };
    /**
     * 查询项目(根据 类别与子类别 查询)
     *
     */
    ApiPatManageExam.loadExamRptPattern = function (examClass, examSubClass, inputCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "loadExamRptPattern", { examClass: examClass, examSubClass: examSubClass, inputCode: inputCode });
    };
    /**
     * 查询项目总费用(根据 项目名 查询)
     *
     */
    ApiPatManageExam.loadItemCost = function (itemName) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "loadItemCost", { itemName: itemName });
    };
    /**
     * 查询已开检查
     *
     */
    ApiPatManageExam.loadExamRec = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "loadExamRec", { pvId: pvId });
    };
    /**
     * 作废检查
     *
     */
    ApiPatManageExam.cancel = function (appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageExam.baseUrl, "cancel", { appNo: appNo });
    };
    ApiPatManageExam.baseUrl = '/patManage/exam/exam/';
    return ApiPatManageExam;
}());
exports.ApiPatManageExam = ApiPatManageExam;
/**
 * 创建人：黄倩
 * 时间：2017/8/25
 * 说明：检查报告controller
 */
var ApiPatManageExamReport = /** @class */ (function () {
    function ApiPatManageExamReport() {
    }
    /**
     * 查询检查报告
     *
     */
    ApiPatManageExamReport.loadExamReportView = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageExamReport.baseUrl, "loadExamReportView", { pvId: pvId });
    };
    ApiPatManageExamReport.baseUrl = '/patManage/examReport/examReport/';
    return ApiPatManageExamReport;
}());
exports.ApiPatManageExamReport = ApiPatManageExamReport;
/**
 * 创建人： 黄倩
 * 时间:2017/7/26
 * 说明：检查申请模板controller
 */
var ApiPatManageExamMould = /** @class */ (function () {
    function ApiPatManageExamMould() {
    }
    /**
     * 查询检查申请模板
     *
     */
    ApiPatManageExamMould.select = function (inputname, radio, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiPatManageExamMould.baseUrl, "select", { inputname: inputname, radio: radio, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询检查申请明细信息
     *
     */
    ApiPatManageExamMould.selectExamMouldProject = function (mId) {
        return api_1.apiUtil.connection("POST", ApiPatManageExamMould.baseUrl, "selectExamMouldProject", { mId: mId });
    };
    /**
     * 添加检查申请明细
     *
     */
    ApiPatManageExamMould.insertMould = function (mclass, mlist) {
        return api_1.apiUtil.connection("POST", ApiPatManageExamMould.baseUrl, "insertMould", { mclass: mclass, mlist: mlist });
    };
    /**
     * 删除检查申请模板
     *
     */
    ApiPatManageExamMould.delete = function (mId) {
        return api_1.apiUtil.connection("POST", ApiPatManageExamMould.baseUrl, "delete", { mId: mId });
    };
    ApiPatManageExamMould.baseUrl = '/mould/mouldController/';
    return ApiPatManageExamMould;
}());
exports.ApiPatManageExamMould = ApiPatManageExamMould;
/**
 * 分诊患者信息控制器
 * Created by 包国强 on 2017/4/24.
 */
var ApiPatManageInDept = /** @class */ (function () {
    function ApiPatManageInDept() {
    }
    /**
     * 查询未入科患者
     *
     */
    ApiPatManageInDept.loadNotInDept = function (model, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiPatManageInDept.baseUrl, "loadNotInDept", { model: model, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询入科患者
     *
     */
    ApiPatManageInDept.loadBedCard = function (model, startIndex, pageSize, statu, appFlag) {
        return api_1.apiUtil.connection("POST", ApiPatManageInDept.baseUrl, "loadBedCard", { model: model, startIndex: startIndex, pageSize: pageSize, statu: statu, appFlag: appFlag });
    };
    /**
     * 统计病情等级,分区的人数
     *
     */
    ApiPatManageInDept.count = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageInDept.baseUrl, "count", { id: id });
    };
    /**
     * 查询抢救区中位数
     *
     */
    ApiPatManageInDept.loadRedAvg = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageInDept.baseUrl, "loadRedAvg", {});
    };
    /**
     * 查询就诊患者信息
     *
     */
    ApiPatManageInDept.loadVisitPatInfoView = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageInDept.baseUrl, "loadVisitPatInfoView", { pvId: pvId });
    };
    ApiPatManageInDept.baseUrl = '/patManage/inDept/';
    return ApiPatManageInDept;
}());
exports.ApiPatManageInDept = ApiPatManageInDept;
/**
 * 检验控制器
 * Created by 包国强 on 2017/6/16.
 */
var ApiPatManageLab = /** @class */ (function () {
    function ApiPatManageLab() {
    }
    /**
     * 保存检验申请
     *
     */
    ApiPatManageLab.save = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "save", { modelList: modelList });
    };
    /**
     * 查询历史急诊检验预约记录
     *
     */
    ApiPatManageLab.loadLabTestMaster = function (pvId, appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "loadLabTestMaster", { pvId: pvId, appNo: appNo });
    };
    /**
     * 查询历史急诊检验项目记录
     *
     */
    ApiPatManageLab.loadLabTestItems = function (appNo, appFlag) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "loadLabTestItems", { appNo: appNo, appFlag: appFlag });
    };
    /**
     * 查询检验项目
     *
     */
    ApiPatManageLab.loadLabItems = function (expand3, expand2, expand1) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "loadLabItems", { expand3: expand3, expand2: expand2, expand1: expand1 });
    };
    /**
     * 分页查询检验项目
     *
     */
    ApiPatManageLab.loadLabItemsModel = function (itemName, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "loadLabItemsModel", { itemName: itemName, page: page });
    };
    /**
     * 查询检验项目明细
     *
     */
    ApiPatManageLab.loadLabPriceItems = function (itemCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "loadLabPriceItems", { itemCode: itemCode });
    };
    /**
     * 查询已开检验
     *
     */
    ApiPatManageLab.loadLabRec = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "loadLabRec", { pvId: pvId });
    };
    /**
     * 作废检验
     *
     */
    ApiPatManageLab.cancel = function (appNo, itemNos) {
        return api_1.apiUtil.connection("POST", ApiPatManageLab.baseUrl, "cancel", { appNo: appNo, itemNos: itemNos });
    };
    ApiPatManageLab.baseUrl = '/patManage/lab/lab/';
    return ApiPatManageLab;
}());
exports.ApiPatManageLab = ApiPatManageLab;
var ApiPatManageLabReport = /** @class */ (function () {
    function ApiPatManageLabReport() {
    }
    /**
     * 查询检验记录
     *
     */
    ApiPatManageLabReport.loadLabRec = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabReport.baseUrl, "loadLabRec", { pvId: pvId });
    };
    /**
     * 查询检验项目记录
     *
     */
    ApiPatManageLabReport.loadLabItemsRec = function (appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabReport.baseUrl, "loadLabItemsRec", { appNo: appNo });
    };
    /**
     * 查询检验报告
     *
     */
    ApiPatManageLabReport.loadLabReport = function (appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabReport.baseUrl, "loadLabReport", { appNo: appNo });
    };
    ApiPatManageLabReport.baseUrl = '/labReport/labReport/';
    return ApiPatManageLabReport;
}());
exports.ApiPatManageLabReport = ApiPatManageLabReport;
var ApiPatManageLabTemp = /** @class */ (function () {
    function ApiPatManageLabTemp() {
    }
    ApiPatManageLabTemp.selectLabTemp = function (name, radio, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabTemp.baseUrl, "selectLabTemp", { name: name, radio: radio, startIndex: startIndex, pageSize: pageSize });
    };
    ApiPatManageLabTemp.selectLabTempItems = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabTemp.baseUrl, "selectLabTempItems", { id: id });
    };
    /**
     * 删除检验申请模板
     *
     */
    ApiPatManageLabTemp.updatelabtempItem1s = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabTemp.baseUrl, "updatelabtempItem1s", { id: id });
    };
    /**
     * 添加检验申请模板
     *
     */
    ApiPatManageLabTemp.insertLabTemp = function (lab, items) {
        return api_1.apiUtil.connection("POST", ApiPatManageLabTemp.baseUrl, "insertLabTemp", { lab: lab, items: items });
    };
    ApiPatManageLabTemp.baseUrl = '/temp/tempController/';
    return ApiPatManageLabTemp;
}());
exports.ApiPatManageLabTemp = ApiPatManageLabTemp;
/**
 * 体温单控制器
 * Created by 包国强 on 2017/7/10.
 */
var ApiPatManageNurseTemperatureChart = /** @class */ (function () {
    function ApiPatManageNurseTemperatureChart() {
    }
    ApiPatManageNurseTemperatureChart.loadTemperatureChart = function (patientId, visitId, timeType, time, id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNurseTemperatureChart.baseUrl, "loadTemperatureChart", { patientId: patientId, visitId: visitId, timeType: timeType, time: time, id: id });
    };
    ApiPatManageNurseTemperatureChart.baseUrl = '/patManage/nurse/TemperatureChart/';
    return ApiPatManageNurseTemperatureChart;
}());
exports.ApiPatManageNurseTemperatureChart = ApiPatManageNurseTemperatureChart;
/**
 * 急诊病人体症记录控制器
 * Created by 包国强 on 2017/6/16.
 */
var ApiPatManageNurseVitalSignsRec = /** @class */ (function () {
    function ApiPatManageNurseVitalSignsRec() {
    }
    /**
     * 保存急诊病人体症记录
     *
     */
    ApiPatManageNurseVitalSignsRec.save = function (modelList, pvId, recordingDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNurseVitalSignsRec.baseUrl, "save", { modelList: modelList, pvId: pvId, recordingDate: recordingDate });
    };
    /**
     * 查询急诊病人体症记录
     *
     */
    ApiPatManageNurseVitalSignsRec.loadVitalSignsRec = function (pvId, recordingDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNurseVitalSignsRec.baseUrl, "loadVitalSignsRec", { pvId: pvId, recordingDate: recordingDate });
    };
    /**
     * 查询急诊体温单护理类别表
     *
     */
    ApiPatManageNurseVitalSignsRec.loadVitalSignsClassDict = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageNurseVitalSignsRec.baseUrl, "loadVitalSignsClassDict", {});
    };
    /**
     * 查询急诊体温单护理项目表
     *
     */
    ApiPatManageNurseVitalSignsRec.loadVitalSignsItemDict = function (deptCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageNurseVitalSignsRec.baseUrl, "loadVitalSignsItemDict", { deptCode: deptCode });
    };
    ApiPatManageNurseVitalSignsRec.baseUrl = '/patManage/nurse/vitalSignsRec/';
    return ApiPatManageNurseVitalSignsRec;
}());
exports.ApiPatManageNurseVitalSignsRec = ApiPatManageNurseVitalSignsRec;
/**
 * 出入量维护控制器
 * Created by 毛琪 on 2017/6/9.
 */
var ApiPatManageNursingInOut = /** @class */ (function () {
    function ApiPatManageNursingInOut() {
    }
    /**
     * 查询所有的项目名称
     *
     */
    ApiPatManageNursingInOut.selectInOutItem = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "selectInOutItem", {});
    };
    /**
     * 根据患者id&时间段查询出入量记录
     *
     */
    ApiPatManageNursingInOut.findRecored = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "findRecored", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 根据患者id&时间段查询出入量记录指标
     *
     */
    ApiPatManageNursingInOut.findRecoredNull = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "findRecoredNull", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 根据患者id&时间段查询出入量记录 详细查询
     *
     */
    ApiPatManageNursingInOut.findRecoredDetail = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "findRecoredDetail", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 根据患者id&时间段查询静脉入量记录(注射执行医嘱)/详细查询
     *
     */
    ApiPatManageNursingInOut.findPerformDetail = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "findPerformDetail", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 根据患者id&时间段查询静脉入量记录(注射执行医嘱)/详细查询
     *
     */
    ApiPatManageNursingInOut.seelctxq = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "seelctxq", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 根据患者id&时间段查询执行医嘱
     *
     */
    ApiPatManageNursingInOut.findPerform = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "findPerform", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    //      /**
    //     * 更新出入量记录 (静脉入量不允许手动添加)
    //     *
    //     */
    ApiPatManageNursingInOut.saveRecord = function (nursingInOutRecord) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "saveRecord", { nursingInOutRecord: nursingInOutRecord });
    };
    /**
     * 删除出入量记录数据
     *
     */
    ApiPatManageNursingInOut.deleteRecored = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingInOut.baseUrl, "deleteRecored", { id: id });
    };
    ApiPatManageNursingInOut.baseUrl = '/inOut/nursingInOut/';
    return ApiPatManageNursingInOut;
}());
exports.ApiPatManageNursingInOut = ApiPatManageNursingInOut;
/**
 * 患者管理-护理记录控制器
 * Created by 毛琪 on 2017/6/14.
 */
var ApiPatManageNursingRecord = /** @class */ (function () {
    function ApiPatManageNursingRecord() {
    }
    /**
     * 根据类型&时间 /&记录人(name/code)/&记录内容 查询护理记录
     *
     */
    ApiPatManageNursingRecord.findRecordLike = function (pvId, type, recordContent, nurseCode, date) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "findRecordLike", { pvId: pvId, type: type, recordContent: recordContent, nurseCode: nurseCode, date: date });
    };
    /**
     * 根据记录id查询护理记录
     *
     */
    ApiPatManageNursingRecord.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "findById", { id: id });
    };
    /**
     * 查询所有模板类型
     *
     */
    ApiPatManageNursingRecord.findAllType = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "findAllType", {});
    };
    /**
     * 查询所有模板内容
     *
     */
    ApiPatManageNursingRecord.findAllItem = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "findAllItem", {});
    };
    /**
     * 根据类型id查询模板内容
     *
     */
    ApiPatManageNursingRecord.findByTypeId = function (typeId) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "findByTypeId", { typeId: typeId });
    };
    /**
     * 添加/更新类别信息
     *
     */
    ApiPatManageNursingRecord.saveOrUpdateCategory = function (data) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "saveOrUpdateCategory", { data: data });
    };
    /**
     * 添加/更新分类信息
     *
     */
    ApiPatManageNursingRecord.saveOrUpdateClassify = function (data) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "saveOrUpdateClassify", { data: data });
    };
    /**
     * 添加/更新模板信息
     *
     */
    ApiPatManageNursingRecord.saveOrUpdateItem = function (data) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "saveOrUpdateItem", { data: data });
    };
    /**
     * 删除类别信息
     *
     */
    ApiPatManageNursingRecord.delCategory = function (typeId) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "delCategory", { typeId: typeId });
    };
    /**
     * 删除分类信息(两个字段置空)
     *
     */
    ApiPatManageNursingRecord.delClassify = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "delClassify", { id: id });
    };
    /**
     * 删除指定模板信息
     *
     */
    ApiPatManageNursingRecord.delItem = function (itemId) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "delItem", { itemId: itemId });
    };
    /**
     * 根据患者标识查询病史记录
     *
     */
    ApiPatManageNursingRecord.findNode = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "findNode", { patientId: patientId });
    };
    /**
     * 更新记录
     *
     */
    ApiPatManageNursingRecord.saveOrUpdate = function (nursingNursingRecord) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "saveOrUpdate", { nursingNursingRecord: nursingNursingRecord });
    };
    /**
     * 根据记录id删除护理记录
     *
     */
    ApiPatManageNursingRecord.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingRecord.baseUrl, "delete", { id: id });
    };
    ApiPatManageNursingRecord.baseUrl = '/nursing/nursingNursingRecord/';
    return ApiPatManageNursingRecord;
}());
exports.ApiPatManageNursingRecord = ApiPatManageNursingRecord;
/**
 * 导管维护控制器
 * Created by 毛琪 on 2017/6/14.
 */
var ApiPatManageNursingTube = /** @class */ (function () {
    function ApiPatManageNursingTube() {
    }
    /**
     * 根据患者id查询导管记录
     *
     */
    ApiPatManageNursingTube.findByPvId = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "findByPvId", { pvId: pvId });
    };
    /**
     * 根据记录id查询导管记录
     *
     */
    ApiPatManageNursingTube.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "findById", { id: id });
    };
    /**
     * 查询所有的导管类型
     *
     */
    ApiPatManageNursingTube.findAllType = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "findAllType", {});
    };
    /**
     * 根据导管类型id查询导管名称
     *
     */
    ApiPatManageNursingTube.findDirByTypeId = function (typeId) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "findDirByTypeId", { typeId: typeId });
    };
    /**
     * 更新导管记录
     *
     */
    ApiPatManageNursingTube.saveOrUpdate = function (nursingTube) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "saveOrUpdate", { nursingTube: nursingTube });
    };
    /**
     * 根据导管记录id删除导管记录
     *
     */
    ApiPatManageNursingTube.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "delete", { id: id });
    };
    /**
     * 根据导管id作废导管记录 isDel=1
     *
     */
    ApiPatManageNursingTube.delByTubeId = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "delByTubeId", { id: id });
    };
    /**
     * 更新导管类型
     *
     */
    ApiPatManageNursingTube.saveUpdate = function (data) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingTube.baseUrl, "saveUpdate", { data: data });
    };
    ApiPatManageNursingTube.baseUrl = '/tube/nursingTube/';
    return ApiPatManageNursingTube;
}());
exports.ApiPatManageNursingTube = ApiPatManageNursingTube;
/**
 * 患者管理-观察项控制器
 * Created by 毛琪 on 2017/6/12.
 */
var ApiPatManageNursingVitalSign = /** @class */ (function () {
    function ApiPatManageNursingVitalSign() {
    }
    /**
     * 根据患者id&记录时间查询观察项记录
     *
     */
    ApiPatManageNursingVitalSign.findRecordByTime = function (pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingVitalSign.baseUrl, "findRecordByTime", { pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 查询所有观察项类型
     *
     */
    ApiPatManageNursingVitalSign.findAllItem = function () {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingVitalSign.baseUrl, "findAllItem", {});
    };
    /**
     * 根据患者id查询时间段内的体征记录
     *
     */
    ApiPatManageNursingVitalSign.findAllDat = function (itemIds, pvId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingVitalSign.baseUrl, "findAllDat", { itemIds: itemIds, pvId: pvId, startDate: startDate, endDate: endDate });
    };
    /**
     * 添加/修改观察项记录
     *
     */
    ApiPatManageNursingVitalSign.saveOrUpdate = function (nursingVitalSignRecord) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingVitalSign.baseUrl, "saveOrUpdate", { nursingVitalSignRecord: nursingVitalSignRecord });
    };
    /**
     * 添加多个观察项记录
     *
     */
    ApiPatManageNursingVitalSign.saveRecords = function (list) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingVitalSign.baseUrl, "saveRecords", { list: list });
    };
    /**
     * 根据记录id删除观察项记录
     *
     */
    ApiPatManageNursingVitalSign.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageNursingVitalSign.baseUrl, "delete", { id: id });
    };
    /**
     * 查询没有被删除的观察项信息
     *
     */
    ApiPatManageNursingVitalSign.findByIsDel = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageNursingVitalSign.baseUrl, "findByIsDel", {});
    };
    ApiPatManageNursingVitalSign.baseUrl = '/vitalSign/nursingVitalSign/';
    return ApiPatManageNursingVitalSign;
}());
exports.ApiPatManageNursingVitalSign = ApiPatManageNursingVitalSign;
/**
 * 手术控制器
 * Created by 包国强 on 2017/6/16.
 */
var ApiPatManageOperation = /** @class */ (function () {
    function ApiPatManageOperation() {
    }
    /**
     * 保存手术申请
     *
     */
    ApiPatManageOperation.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOperation.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 查询历史急诊手术安排
     *
     */
    ApiPatManageOperation.loadOperationSchedule = function (pvId, appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageOperation.baseUrl, "loadOperationSchedule", { pvId: pvId, appNo: appNo });
    };
    /**
     * 查询历史急诊安排手术名称
     *
     */
    ApiPatManageOperation.loadScheduledOperationName = function (pvId, appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageOperation.baseUrl, "loadScheduledOperationName", { pvId: pvId, appNo: appNo });
    };
    /**
     * 查询手术字典
     *
     */
    ApiPatManageOperation.loadOperationDict = function (inputCode, startIndex, pageSize) {
        return api_1.apiUtil.connection("GET", ApiPatManageOperation.baseUrl, "loadOperationDict", { inputCode: inputCode, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询已开手术
     *
     */
    ApiPatManageOperation.loadOperationRec = function (pvId, appFlag) {
        return api_1.apiUtil.connection("POST", ApiPatManageOperation.baseUrl, "loadOperationRec", { pvId: pvId, appFlag: appFlag });
    };
    /**
     * 作废手术
     *
     */
    ApiPatManageOperation.cancel = function (pvId, appNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageOperation.baseUrl, "cancel", { pvId: pvId, appNo: appNo });
    };
    /**
     * 查询手术次数
     *
     */
    ApiPatManageOperation.againOper = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOperation.baseUrl, "againOper", { pvId: pvId });
    };
    ApiPatManageOperation.baseUrl = '/patManage/operation/operation/';
    return ApiPatManageOperation;
}());
exports.ApiPatManageOperation = ApiPatManageOperation;
/**
 * 医嘱模板控制器
 * Created by 包国强 on 2017/6/16.
 */
var ApiPatManageOrdersGroupOrder = /** @class */ (function () {
    function ApiPatManageOrdersGroupOrder() {
    }
    /**
     * 保存医嘱模板
     *
     */
    ApiPatManageOrdersGroupOrder.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersGroupOrder.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 作废
     *
     */
    ApiPatManageOrdersGroupOrder.cancel = function (groupOrderId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersGroupOrder.baseUrl, "cancel", { groupOrderId: groupOrderId });
    };
    /**
     * 查询医嘱模板主记录
     *
     */
    ApiPatManageOrdersGroupOrder.loadGroupOrderMaster = function (inputCode, flag, staffId, deptCode) {
        return api_1.apiUtil.connection("GET", ApiPatManageOrdersGroupOrder.baseUrl, "loadGroupOrderMaster", { inputCode: inputCode, flag: flag, staffId: staffId, deptCode: deptCode });
    };
    /**
     * 查询医嘱模板子记录
     *
     */
    ApiPatManageOrdersGroupOrder.loadGroupOrderItems = function (groupOrderId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersGroupOrder.baseUrl, "loadGroupOrderItems", { groupOrderId: groupOrderId });
    };
    ApiPatManageOrdersGroupOrder.baseUrl = '/patManage/orders/orders/groupOrder/';
    return ApiPatManageOrdersGroupOrder;
}());
exports.ApiPatManageOrdersGroupOrder = ApiPatManageOrdersGroupOrder;
/**
 * 医嘱控制器
 * Created by 包国强 on 2017/4/24.
 */
var ApiPatManageOrders = /** @class */ (function () {
    function ApiPatManageOrders() {
    }
    /**
     * 保存医嘱
     *
     */
    ApiPatManageOrders.save = function (orderStatus, pvId, doctorRank, appFlag, modelList, dataList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "save", { orderStatus: orderStatus, pvId: pvId, doctorRank: doctorRank, appFlag: appFlag, modelList: modelList, dataList: dataList });
    };
    /**
     * 查询医嘱项目：药品
     *
     */
    ApiPatManageOrders.loadOrderDrug = function (inputCode, page, configType, deptCode, type) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadOrderDrug", { inputCode: inputCode, page: page, configType: configType, deptCode: deptCode, type: type });
    };
    /**
     * 查询医嘱项目：非药品
     *
     */
    ApiPatManageOrders.loadOrderOther = function (page, inputCode, itemClass) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadOrderOther", { page: page, inputCode: inputCode, itemClass: itemClass });
    };
    /**
     * 查询医嘱相关字典：急诊诊疗项目分类字典
     *
     */
    ApiPatManageOrders.loadClinicItemClassDict = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageOrders.baseUrl, "loadClinicItemClassDict", {});
    };
    /**
     * 查询医嘱相关字典：急诊给药途径字典
     *
     */
    ApiPatManageOrders.loadAdministrationDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiPatManageOrders.baseUrl, "loadAdministrationDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询医嘱相关字典：急诊医嘱执行频率字典
     *
     */
    ApiPatManageOrders.loadPerformFreqDict = function (inputCode, page) {
        return api_1.apiUtil.connection("GET", ApiPatManageOrders.baseUrl, "loadPerformFreqDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊医嘱计价项目
     *
     */
    ApiPatManageOrders.loadOrdersCosts = function (pvId, orderNo, orderSubNo, orderStatus, flag, serialNo, prescNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadOrdersCosts", { pvId: pvId, orderNo: orderNo, orderSubNo: orderSubNo, orderStatus: orderStatus, flag: flag, serialNo: serialNo, prescNo: prescNo });
    };
    /**
     * 查询患者急诊医嘱
     *
     */
    ApiPatManageOrders.loadOrders = function (pvId, orderClass, repeatIndicator, orderStatus, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadOrders", { pvId: pvId, orderClass: orderClass, repeatIndicator: repeatIndicator, orderStatus: orderStatus, page: page });
    };
    /**
     * 查询未保存的医嘱计价项目
     *
     */
    ApiPatManageOrders.loadOrdersCostsNoSave = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadOrdersCostsNoSave", { modelList: modelList });
    };
    /**
     * 作废整组医嘱
     *
     */
    ApiPatManageOrders.cancelOrders = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "cancelOrders", { modelList: modelList });
    };
    ApiPatManageOrders.cancelOrdersByIds = function (ids) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "cancelOrdersByIds", { ids: ids });
    };
    /**
     * 停止整组医嘱
     *
     */
    ApiPatManageOrders.stopOrders = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "stopOrders", { modelList: modelList });
    };
    /**
     * 停止单条医嘱
     *
     */
    ApiPatManageOrders.stopOrdersByIds = function (ids, stopDateTime) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "stopOrdersByIds", { ids: ids, stopDateTime: stopDateTime });
    };
    /**
     * 撤消整组医嘱
     *
     */
    ApiPatManageOrders.isDelOrders = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "isDelOrders", { modelList: modelList });
    };
    /**
     * 撤消单条医嘱
     *
     */
    ApiPatManageOrders.isDelOrdersByIds = function (ids) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "isDelOrdersByIds", { ids: ids });
    };
    /**
     * 查询急诊剂量单位字典
     *
     */
    ApiPatManageOrders.loadDosageUnitsDict = function (inputCode, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadDosageUnitsDict", { inputCode: inputCode, page: page });
    };
    /**
     * 查询默认执行时间
     *
     */
    ApiPatManageOrders.loadPerformSchedule = function (freqDesc, administration) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadPerformSchedule", { freqDesc: freqDesc, administration: administration });
    };
    /**
     * 查询医保提示信息: 药品
     * 特殊: 查询分为药品与非药品
     * 1.药品(itemClass为A或B): 以下属性值不允许不空
     * pvId(注: 查询当前患者费别),itemCode,itemClass,itemName,itemSpec,units
     * 2.非药品(itemClass不为A或B): 以下属性值不允许不空
     * orderCode,orderClass
     *
     */
    ApiPatManageOrders.loadDrugBz = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadDrugBz", { model: model });
    };
    /**
     * 查询医保提示信息： 非药品
     * 特殊: 查询分为药品与非药品
     * 1.药品(itemClass为A或B): 以下属性值不允许不空
     * pvId(注: 查询当前患者费别),itemCode,itemClass,itemName,itemSpec,units
     * 2.非药品(itemClass不为A或B): 以下属性值不允许不空
     * orderCode,orderClass
     *
     */
    ApiPatManageOrders.loadNoDrugBz = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrders.baseUrl, "loadNoDrugBz", { model: model });
    };
    ApiPatManageOrders.baseUrl = '/patManage/orders/orders/';
    return ApiPatManageOrders;
}());
exports.ApiPatManageOrders = ApiPatManageOrders;
/**
 * 医嘱执行计划控制器
 * Created by 包国强 on 2017/4/24.
 */
var ApiPatManageOrdersPlanRec = /** @class */ (function () {
    function ApiPatManageOrdersPlanRec() {
    }
    /**
     * 医嘱批量生成执行计划
     *
     */
    ApiPatManageOrdersPlanRec.convert = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "convert", { modelList: modelList });
    };
    /**
     * 医嘱生成执行计划
     *
     */
    ApiPatManageOrdersPlanRec.convertEntity = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "convertEntity", { model: model });
    };
    /**
     * 批量保存执行计划
     *
     */
    ApiPatManageOrdersPlanRec.save = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "save", { modelList: modelList });
    };
    /**
     * 保存执行计划
     *
     */
    ApiPatManageOrdersPlanRec.saveEntity = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "saveEntity", { model: model });
    };
    /**
     * 通过唯一键作废
     *
     */
    ApiPatManageOrdersPlanRec.deleteUnique = function (pvId, orderNo, orderSubNo) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "deleteUnique", { pvId: pvId, orderNo: orderNo, orderSubNo: orderSubNo });
    };
    /**
     * 通过主键作废
     *
     */
    ApiPatManageOrdersPlanRec.deleteById = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "deleteById", { id: id });
    };
    /**
     * 查询医嘱执行计划
     *
     */
    ApiPatManageOrdersPlanRec.loadOrdersPlanRec = function (pvId, repeatIndicator, planDateTimeFrom, planDateTimeTo, area, orderStatus, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "loadOrdersPlanRec", { pvId: pvId, repeatIndicator: repeatIndicator, planDateTimeFrom: planDateTimeFrom, planDateTimeTo: planDateTimeTo, area: area, orderStatus: orderStatus, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询 区域 医嘱执行计划
     *
     */
    ApiPatManageOrdersPlanRec.loadOrdersPlanRecByArea = function (pvId, area) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "loadOrdersPlanRecByArea", { pvId: pvId, area: area });
    };
    /**
     * 查询单条医嘱执行计划
     *
     */
    ApiPatManageOrdersPlanRec.loadOrdersPlanRecById = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "loadOrdersPlanRecById", { id: id });
    };
    /**
     * 通过区域查询 急诊医嘱分类设置主表
     *
     */
    ApiPatManageOrdersPlanRec.loadOrdersClassAreaMaster = function (area) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "loadOrdersClassAreaMaster", { area: area });
    };
    /**
     * 通过患者信息id查询 急诊医嘱分类设置主表
     *
     */
    ApiPatManageOrdersPlanRec.loadOrdersClassAreaMasterByPvId = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOrdersPlanRec.baseUrl, "loadOrdersClassAreaMasterByPvId", { pvId: pvId });
    };
    ApiPatManageOrdersPlanRec.baseUrl = '/patManage/orders/ordersPlanRec/';
    return ApiPatManageOrdersPlanRec;
}());
exports.ApiPatManageOrdersPlanRec = ApiPatManageOrdersPlanRec;
var ApiPatManageOutpBillingOutpbilling = /** @class */ (function () {
    function ApiPatManageOutpBillingOutpbilling() {
    }
    /**
     * 查询门诊计费模板
     *
     */
    ApiPatManageOutpBillingOutpbilling.select = function (inputName, radio, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpBillingOutpbilling.baseUrl, "select", { inputName: inputName, radio: radio, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 根据门诊模板的主表id查询到模板中的明细
     *
     */
    ApiPatManageOutpBillingOutpbilling.selectOutpBillingItems = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpBillingOutpbilling.baseUrl, "selectOutpBillingItems", { id: id });
    };
    /**
     * 新增门诊计费模板
     *
     */
    ApiPatManageOutpBillingOutpbilling.insetBillingModel = function (list, bill) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpBillingOutpbilling.baseUrl, "insetBillingModel", { list: list, bill: bill });
    };
    /**
     * 计费模板失效
     *
     */
    ApiPatManageOutpBillingOutpbilling.update = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpBillingOutpbilling.baseUrl, "update", { id: id });
    };
    ApiPatManageOutpBillingOutpbilling.baseUrl = '/patManage/outp/billing/outpbilling/';
    return ApiPatManageOutpBillingOutpbilling;
}());
exports.ApiPatManageOutpBillingOutpbilling = ApiPatManageOutpBillingOutpbilling;
/**
 * 退药操作
 * Created by  黄倩  2017/8/8.
 */
var ApiPatManageOutpChargebackOupt = /** @class */ (function () {
    function ApiPatManageOutpChargebackOupt() {
    }
    ApiPatManageOutpChargebackOupt.quitSelect = function (begin, end, dept, id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpChargebackOupt.baseUrl, "quitSelect", { begin: begin, end: end, dept: dept, id: id });
    };
    /**
     * 生成退药信息
     *
     */
    ApiPatManageOutpChargebackOupt.updateOutpOrdersCosts = function (modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpChargebackOupt.baseUrl, "updateOutpOrdersCosts", { modelList: modelList });
    };
    /**
     * 查询退药单信息
     *
     */
    ApiPatManageOutpChargebackOupt.selectquit = function (inputname, id, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpChargebackOupt.baseUrl, "selectquit", { inputname: inputname, id: id, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 查询退药单信息的详细详细
     *
     */
    ApiPatManageOutpChargebackOupt.selectOutp = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpChargebackOupt.baseUrl, "selectOutp", { id: id });
    };
    /**
     * 撤回退药
     *
     */
    ApiPatManageOutpChargebackOupt.delete = function (list) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpChargebackOupt.baseUrl, "delete", { list: list });
    };
    ApiPatManageOutpChargebackOupt.baseUrl = '/chargeback/ouptChargebackController/';
    return ApiPatManageOutpChargebackOupt;
}());
exports.ApiPatManageOutpChargebackOupt = ApiPatManageOutpChargebackOupt;
/**
 * 急诊就诊记录控制器
 * Created by 包国强 on 2017/7/18.
 */
var ApiPatManageOutpClinicMaster = /** @class */ (function () {
    function ApiPatManageOutpClinicMaster() {
    }
    /**
     * 查询门诊患者信息
     *
     *                     属性【workedIndicator】为0时,表示 初诊;其它则为未诊
     *                     属性【doctor】为不空时,表示 查询当前用户
     *                     属性【visitDept】为不空时,表示 查询当前科室
     *                     属性【patientId】为不空且其它条件为空时,表示 查询患者【patientId】的历史记录
     */
    ApiPatManageOutpClinicMaster.loadOutpPats = function (model, nowIndicator, inputCode, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadOutpPats", { model: model, nowIndicator: nowIndicator, inputCode: inputCode, page: page });
    };
    /**
     * 转诊
     *
     */
    ApiPatManageOutpClinicMaster.outpReferral = function (model, pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "outpReferral", { model: model, pvId: pvId });
    };
    /**
     * 查询门诊转诊号别视图
     *
     */
    ApiPatManageOutpClinicMaster.loadVdClinicLabel = function (model, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadVdClinicLabel", { model: model, page: page });
    };
    /**
     * 查询患者信息
     *
     */
    ApiPatManageOutpClinicMaster.loadPatInfo = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadPatInfo", { pvId: pvId });
    };
    /**
     * 查询转科科室记录
     *
     */
    ApiPatManageOutpClinicMaster.loadTransferDept = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadTransferDept", { pvId: pvId });
    };
    /**
     * 便民挂号
     *
     */
    ApiPatManageOutpClinicMaster.register = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "register", { model: model });
    };
    /**
     * 查询急诊门诊出诊安排
     *
     */
    ApiPatManageOutpClinicMaster.loadOutpDoctorSchedule = function (page, inputCode, doctor) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadOutpDoctorSchedule", { page: page, inputCode: inputCode, doctor: doctor });
    };
    /**
     * 查询检查报告结果
     *
     */
    ApiPatManageOutpClinicMaster.loadExamResult = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadExamResult", { pvId: pvId });
    };
    /**
     * 查询检验报告结果
     *
     */
    ApiPatManageOutpClinicMaster.loadLabResult = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadLabResult", { pvId: pvId });
    };
    /**
     * 查询门诊医生工作量统计
     *
     */
    ApiPatManageOutpClinicMaster.loadDoctorWorkReport = function (startDate, endDate, deptCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadDoctorWorkReport", { startDate: startDate, endDate: endDate, deptCode: deptCode });
    };
    /**
     * 查询门诊诊断统计
     *
     */
    ApiPatManageOutpClinicMaster.loadDiagReport = function (startDate, endDate, flag) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadDiagReport", { startDate: startDate, endDate: endDate, flag: flag });
    };
    /**
     * 查询门诊日志
     *
     */
    ApiPatManageOutpClinicMaster.loadOutpLogReport = function (page, startDate, endDate, name, deptCode, doctor, diag, cfzFlag) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpClinicMaster.baseUrl, "loadOutpLogReport", { page: page, startDate: startDate, endDate: endDate, name: name, deptCode: deptCode, doctor: doctor, diag: diag, cfzFlag: cfzFlag });
    };
    ApiPatManageOutpClinicMaster.baseUrl = '/patManage/outp/clinicMaster/';
    return ApiPatManageOutpClinicMaster;
}());
exports.ApiPatManageOutpClinicMaster = ApiPatManageOutpClinicMaster;
/**
 * 急诊检查治疗医嘱明细记录(处置)控制器
 * Created by 包国强 on 2017/7/18.
 */
var ApiPatManageOutpMDayRec = /** @class */ (function () {
    function ApiPatManageOutpMDayRec() {
    }
    /**
     * 保存疾病证明
     *
     */
    ApiPatManageOutpMDayRec.save = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMDayRec.baseUrl, "save", { model: model });
    };
    /**
     * 查询急诊疾病证明
     *
     */
    ApiPatManageOutpMDayRec.loadMDay = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMDayRec.baseUrl, "loadMDay", { pvId: pvId });
    };
    ApiPatManageOutpMDayRec.baseUrl = '/patManage/outp/mDayRec/';
    return ApiPatManageOutpMDayRec;
}());
exports.ApiPatManageOutpMDayRec = ApiPatManageOutpMDayRec;
/**
 * 急诊病历模板控制器
 * Created by 包国强 on 2017/8/21.
 */
var ApiPatManageOutpMrRec = /** @class */ (function () {
    function ApiPatManageOutpMrRec() {
    }
    /**
     * 保存急诊病历记录大模板
     *
     */
    ApiPatManageOutpMrRec.save = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrRec.baseUrl, "save", { model: model });
    };
    /**
     * 作废
     *
     */
    ApiPatManageOutpMrRec.cancel = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrRec.baseUrl, "cancel", { id: id });
    };
    /**
     * 查询急诊病历记录大模板
     *
     */
    ApiPatManageOutpMrRec.loadMrRecTemp = function (flag, deptCode, doctor, inputCode, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrRec.baseUrl, "loadMrRecTemp", { flag: flag, deptCode: deptCode, doctor: doctor, inputCode: inputCode, page: page });
    };
    /**
     * 查询模板名称总数
     *
     */
    ApiPatManageOutpMrRec.loadMrRecTempName = function (name) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrRec.baseUrl, "loadMrRecTempName", { name: name });
    };
    ApiPatManageOutpMrRec.baseUrl = '/patManage/outp/mr/mrRec/';
    return ApiPatManageOutpMrRec;
}());
exports.ApiPatManageOutpMrRec = ApiPatManageOutpMrRec;
/**
 * 急诊病历模板控制器
 * Created by 包国强 on 2017/8/21.
 */
var ApiPatManageOutpMrTemp = /** @class */ (function () {
    function ApiPatManageOutpMrTemp() {
    }
    /**
     * 保存急诊病历模板
     *
     */
    ApiPatManageOutpMrTemp.save = function (data, modelList) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrTemp.baseUrl, "save", { data: data, modelList: modelList });
    };
    /**
     * 作废
     *
     */
    ApiPatManageOutpMrTemp.cancel = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrTemp.baseUrl, "cancel", { id: id });
    };
    /**
     * 查询急诊病历模板主表
     *
     */
    ApiPatManageOutpMrTemp.loadMrTempMaster = function (flag, deptCode, doctor, code, inputCode, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrTemp.baseUrl, "loadMrTempMaster", { flag: flag, deptCode: deptCode, doctor: doctor, code: code, inputCode: inputCode, page: page });
    };
    /**
     * 查询急诊病历模板子表
     *
     */
    ApiPatManageOutpMrTemp.loadMrTempDetail = function (id, inputCode, page) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMrTemp.baseUrl, "loadMrTempDetail", { id: id, inputCode: inputCode, page: page });
    };
    ApiPatManageOutpMrTemp.baseUrl = '/patManage/outp/mr/mrTemp/';
    return ApiPatManageOutpMrTemp;
}());
exports.ApiPatManageOutpMrTemp = ApiPatManageOutpMrTemp;
/**
 * 急诊病历记录控制器
 * Created by 包国强 on 2017/8/21.
 */
var ApiPatManageOutpMr = /** @class */ (function () {
    function ApiPatManageOutpMr() {
    }
    /**
     * 保存急诊病历记录
     *
     */
    ApiPatManageOutpMr.save = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMr.baseUrl, "save", { model: model });
    };
    /**
     * 查询急诊病历记录
     *
     */
    ApiPatManageOutpMr.loadOutpMr = function (pvId, doctor) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMr.baseUrl, "loadOutpMr", { pvId: pvId, doctor: doctor });
    };
    /**
     * 查询急诊病历记录大模板
     *
     */
    ApiPatManageOutpMr.loadMrRecTemp = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpMr.baseUrl, "loadMrRecTemp", { id: id });
    };
    ApiPatManageOutpMr.baseUrl = '/patManage/outp/mr/outpMr/';
    return ApiPatManageOutpMr;
}());
exports.ApiPatManageOutpMr = ApiPatManageOutpMr;
/**
 * 急诊门诊医生收费明细控制器
 * Created by 包国强 on 2017/7/18.
 */
var ApiPatManageOutpOrdersBillDetail = /** @class */ (function () {
    function ApiPatManageOutpOrdersBillDetail() {
    }
    /**
     * 保存急诊门诊医生收费明细
     *
     */
    ApiPatManageOutpOrdersBillDetail.save = function (modelList, pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpOrdersBillDetail.baseUrl, "save", { modelList: modelList, pvId: pvId });
    };
    /**
     * 查询计价单
     *
     */
    ApiPatManageOutpOrdersBillDetail.loadCosts = function (page, pvId, startTime, endTime, flag, itemClass, inputCode, performedBy, orderedByDoctor, orderedByDept) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpOrdersBillDetail.baseUrl, "loadCosts", { page: page, pvId: pvId, startTime: startTime, endTime: endTime, flag: flag, itemClass: itemClass, inputCode: inputCode, performedBy: performedBy, orderedByDoctor: orderedByDoctor, orderedByDept: orderedByDept });
    };
    /**
     */
    ApiPatManageOutpOrdersBillDetail.loadCostsBack = function (page, pvId, startTime, endTime, flag, itemClass, inputCode, performedBy, orderedByDoctor, orderedByDept) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpOrdersBillDetail.baseUrl, "loadCostsBack", { page: page, pvId: pvId, startTime: startTime, endTime: endTime, flag: flag, itemClass: itemClass, inputCode: inputCode, performedBy: performedBy, orderedByDoctor: orderedByDoctor, orderedByDept: orderedByDept });
    };
    /**
     * 退费
     *
     */
    ApiPatManageOutpOrdersBillDetail.costsBack = function (modelList, pvId, deptId, staffId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpOrdersBillDetail.baseUrl, "costsBack", { modelList: modelList, pvId: pvId, deptId: deptId, staffId: staffId });
    };
    /**
     * 查询价表视图
     *
     */
    ApiPatManageOutpOrdersBillDetail.loadCurrentPriceList = function (page, inputCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageOutpOrdersBillDetail.baseUrl, "loadCurrentPriceList", { page: page, inputCode: inputCode });
    };
    ApiPatManageOutpOrdersBillDetail.baseUrl = '/patManage/outp/orders/outpBillDetail/';
    return ApiPatManageOutpOrdersBillDetail;
}());
exports.ApiPatManageOutpOrdersBillDetail = ApiPatManageOutpOrdersBillDetail;
/**
 * 概览信息控制器
 * Created by 包国强 on 2017/6/8.
 */
var ApiPatManageOverview = /** @class */ (function () {
    function ApiPatManageOverview() {
    }
    /**
     * 查询概览信息
     * 功能菜单: 概览
     *
     */
    ApiPatManageOverview.loadOverview = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOverview.baseUrl, "loadOverview", { pvId: pvId });
    };
    /**
     * 患者信息维护查询
     * 功能菜单: 概览-患者信息维护
     *
     */
    ApiPatManageOverview.loadMhPatientVisitById = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageOverview.baseUrl, "loadMhPatientVisitById", { pvId: pvId });
    };
    /**
     * 患者信息维护修改
     * 功能菜单: 概览-患者信息维护
     *
     */
    ApiPatManageOverview.updateMhPatientVisitById = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageOverview.baseUrl, "updateMhPatientVisitById", { model: model });
    };
    ApiPatManageOverview.dict = function () {
        return api_1.apiUtil.connection("GET", ApiPatManageOverview.baseUrl, "dict", {});
    };
    ApiPatManageOverview.baseUrl = '/patManage/overview/overview/';
    return ApiPatManageOverview;
}());
exports.ApiPatManageOverview = ApiPatManageOverview;
/**
 * 患者管理控制器
 * Created by 毛琪 on 2017/5/8.
 */
var ApiPatientVisit = /** @class */ (function () {
    function ApiPatientVisit() {
    }
    /**
     * 根据患者编号查询
     *
     */
    ApiPatientVisit.findPvById = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "findPvById", { patientId: patientId });
    };
    /**
     * 入科
     *
     */
    ApiPatientVisit.entryDept = function (patInHouse) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "entryDept", { patInHouse: patInHouse });
    };
    /**
     * 接诊
     *
     */
    ApiPatientVisit.receivePatient = function (id) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "receivePatient", { id: id });
    };
    /**
     * 出科
     *
     */
    ApiPatientVisit.graduatePatient = function (patInHouse) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "graduatePatient", { patInHouse: patInHouse });
    };
    /**
     * 出科召回查询
     *
     */
    ApiPatientVisit.findRecallPatient = function (startDate, endDate, name) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "findRecallPatient", { startDate: startDate, endDate: endDate, name: name });
    };
    /**
     * 出科召回
     *
     */
    ApiPatientVisit.recallPatient = function (id, bedId) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "recallPatient", { id: id, bedId: bedId });
    };
    /**
     * 转床
     *
     */
    ApiPatientVisit.transferBed = function (id, bedId, oldBedId) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "transferBed", { id: id, bedId: bedId, oldBedId: oldBedId });
    };
    /**
     * 判断是否有未执行医嘱(转住院/转区之前)
     *
     */
    ApiPatientVisit.transferHospitalInit = function (cureNo) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "transferHospitalInit", { cureNo: cureNo });
    };
    /**
     * 转住院
     *
     */
    ApiPatientVisit.transferHospital = function (patInHouse) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "transferHospital", { patInHouse: patInHouse });
    };
    /**
     * 转区
     *
     */
    ApiPatientVisit.transferArea = function (patInHouse) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "transferArea", { patInHouse: patInHouse });
    };
    /**
     * 查询患者是否入科
     *
     */
    ApiPatientVisit.judgeEntry = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiPatientVisit.baseUrl, "judgeEntry", { patientId: patientId });
    };
    ApiPatientVisit.baseUrl = '/patient/visit/';
    return ApiPatientVisit;
}());
exports.ApiPatientVisit = ApiPatientVisit;
/**
 * 打印控制器
 * Created by 包国强 on 2017/7/31.
 */
var ApiPatPrint = /** @class */ (function () {
    function ApiPatPrint() {
    }
    /**
     */
    ApiPatPrint.loadOrderClassExecutePrint = function (repeatIndicator, bedNoFrom, bedNoTo, timeFrom, timeTo, orderPrintIndicator, printContent, excuteTime, page) {
        return api_1.apiUtil.connection("POST", ApiPatPrint.baseUrl, "loadOrderClassExecutePrint", { repeatIndicator: repeatIndicator, bedNoFrom: bedNoFrom, bedNoTo: bedNoTo, timeFrom: timeFrom, timeTo: timeTo, orderPrintIndicator: orderPrintIndicator, printContent: printContent, excuteTime: excuteTime, page: page });
    };
    ApiPatPrint.baseUrl = '/pat/print/';
    return ApiPatPrint;
}());
exports.ApiPatPrint = ApiPatPrint;
/**
 * 报告调阅控制器
 * Created by 包国强 on 2017/7/26.
 */
var ApiPatManageReport = /** @class */ (function () {
    function ApiPatManageReport() {
    }
    /**
     * 查询集成视图
     *
     */
    ApiPatManageReport.loadReportView = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageReport.baseUrl, "loadReportView", { model: model });
    };
    /**
     * 就诊选择
     *
     */
    ApiPatManageReport.choice = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageReport.baseUrl, "choice", { pvId: pvId });
    };
    ApiPatManageReport.baseUrl = 'patManage/report/report/';
    return ApiPatManageReport;
}());
exports.ApiPatManageReport = ApiPatManageReport;
/**
 * 分诊患者信息控制器
 * Created by 包国强 on 2017/8/25.
 */
var ApiPatManageTransferRec = /** @class */ (function () {
    function ApiPatManageTransferRec() {
    }
    /**
     * 查询可入科患者
     *
     */
    ApiPatManageTransferRec.loadInDept = function (page, timeFrom, timeTo, inputCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "loadInDept", { page: page, timeFrom: timeFrom, timeTo: timeTo, inputCode: inputCode });
    };
    /**
     * 入科
     *
     */
    ApiPatManageTransferRec.inDept = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "inDept", { model: model });
    };
    /**
     * 查询可召回患者
     *
     */
    ApiPatManageTransferRec.loadTransferInDept = function (page, timeFrom, timeTo, inputCode) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "loadTransferInDept", { page: page, timeFrom: timeFrom, timeTo: timeTo, inputCode: inputCode });
    };
    /**
     * 召回
     *
     */
    ApiPatManageTransferRec.transferInDept = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "transferInDept", { model: model });
    };
    /**
     * 出科
     *
     */
    ApiPatManageTransferRec.outDept = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "outDept", { model: model });
    };
    /**
     * 医生接诊
     *
     */
    ApiPatManageTransferRec.receive = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "receive", { pvId: pvId });
    };
    /**
     * 医生结束就诊
     *
     */
    ApiPatManageTransferRec.finish = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "finish", { pvId: pvId });
    };
    /**
     * 转床
     *
     */
    ApiPatManageTransferRec.changeBed = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "changeBed", { model: model });
    };
    /**
     * 医生转区
     *
     */
    ApiPatManageTransferRec.transferArea = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "transferArea", { model: model });
    };
    /**
     * 急诊转住院
     *
     */
    ApiPatManageTransferRec.inHis = function (model) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "inHis", { model: model });
    };
    /**
     * 查询床位
     *
     */
    ApiPatManageTransferRec.loadBedDict = function (page, inputCode, status, areaId) {
        return api_1.apiUtil.connection("POST", ApiPatManageTransferRec.baseUrl, "loadBedDict", { page: page, inputCode: inputCode, status: status, areaId: areaId });
    };
    ApiPatManageTransferRec.baseUrl = '/patManage/transfer/transferRec/';
    return ApiPatManageTransferRec;
}());
exports.ApiPatManageTransferRec = ApiPatManageTransferRec;
/**
 * 质控统计控制器
 * Created by 毛琪 on 2017/6/22.
 */
var ApiQcQualityControl = /** @class */ (function () {
    function ApiQcQualityControl() {
    }
    /**
     * 医生不合格病历数
     *
     */
    ApiQcQualityControl.findQC13 = function (year, month, flag) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC13", { year: year, month: month, flag: flag });
    };
    /**
     * 质控病历合格不合格对比
     *
     */
    ApiQcQualityControl.findQC12 = function (year, month, flag) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC12", { year: year, month: month, flag: flag });
    };
    /**
     * 不合格病历原因统计
     *
     */
    ApiQcQualityControl.findQC14 = function (year, month, flag) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC14", { year: year, month: month, flag: flag });
    };
    /**
     * 自动质控项扣分分布比例
     *
     */
    ApiQcQualityControl.findQC11 = function (year, month, flag) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC11", { year: year, month: month, flag: flag });
    };
    /**
     * 查询STEMI患者平均门球时间病例(不传值查询所有)
     *
     */
    ApiQcQualityControl.findStemi = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findStemi", { year: year, month: month });
    };
    /**
     * 查询STEMI患者门药时间病例(不传值查询所有)
     *
     */
    ApiQcQualityControl.findMedicate = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findMedicate", { year: year, month: month });
    };
    /**
     * 获取医院名
     *
     */
    ApiQcQualityControl.findHosName = function () {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findHosName", {});
    };
    /**
     * 急诊科医患比 1
     * 急诊科护患比 2
     * 急诊各级患者比例 3
     * 急诊抢救室患者死亡率 4
     * 急诊手术患者死亡率 5
     * ROSC成功率 6
     * 非计划重返抢救室率 7
     *
     */
    ApiQcQualityControl.findQC1To7 = function (year, month, flag) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC1To7", { year: year, month: month, flag: flag });
    };
    /**
     * 抢救室滞留时间中位数 1
     *
     */
    ApiQcQualityControl.findQC81_1 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC81_1", { year: year, month: month });
    };
    /**
     * 抢救室滞留时间 2
     *
     */
    ApiQcQualityControl.findQC81_2 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC81_2", { year: year, month: month });
    };
    /**
     * 抢救室滞留时间中位数 查年
     *
     */
    ApiQcQualityControl.findQC82 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC82", { year: year, month: month });
    };
    /**
     * STEMI患者平均门药时间 1
     *
     */
    ApiQcQualityControl.findQC91_1 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC91_1", { year: year, month: month });
    };
    /**
     * STEMI患者门药时间 2
     *
     */
    ApiQcQualityControl.findQC91_2 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC91_2", { year: year, month: month });
    };
    /**
     * STEMI患者门药时间 查年 1
     *
     */
    ApiQcQualityControl.findQC92_1 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC92_1", { year: year, month: month });
    };
    /**
     * STEMI患者门药时间达标率 查年 2
     *
     */
    ApiQcQualityControl.findQC92_2 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC92_2", { year: year, month: month });
    };
    /**
     * STEMI患者平均门球时间 1
     *
     */
    ApiQcQualityControl.findQC101_1 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC101_1", { year: year, month: month });
    };
    /**
     * STEMI患者门球时间 2
     *
     */
    ApiQcQualityControl.findQC101_2 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC101_2", { year: year, month: month });
    };
    /**
     * STEMI患者门球时间 查年 1
     *
     */
    ApiQcQualityControl.findQC102_1 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC102_1", { year: year, month: month });
    };
    /**
     * STEMI患者门球时间达标率 查年 2
     *
     */
    ApiQcQualityControl.findQC102_2 = function (year, month) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findQC102_2", { year: year, month: month });
    };
    /**
     * 查询所有的质控患者
     *
     */
    ApiQcQualityControl.findPatient = function () {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findPatient", {});
    };
    /**
     * 根据患者id查询患者的病历
     *
     */
    ApiQcQualityControl.findMr = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findMr", { pvId: pvId });
    };
    /**
     * 根据患者id查询有效的质控项
     *
     */
    ApiQcQualityControl.findResult = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findResult", { pvId: pvId });
    };
    /**
     * 查询所有的质控项类别
     *
     */
    ApiQcQualityControl.findType = function () {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findType", {});
    };
    /**
     * 查询所有质控不合格原因模板表
     *
     */
    ApiQcQualityControl.findReason = function () {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findReason", {});
    };
    /**
     * 根据质控类别查询质控项目
     *
     */
    ApiQcQualityControl.findItemByTypeId = function (typeId) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findItemByTypeId", { typeId: typeId });
    };
    /**
     * 根据质控类别&项目类型查询质控项目
     *
     */
    ApiQcQualityControl.findItemByQcAndItem = function (typeId, itemId) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findItemByQcAndItem", { typeId: typeId, itemId: itemId });
    };
    /**
     * 根据质控类别&项目类型&项目名称查询质控项目
     *
     */
    ApiQcQualityControl.findItemByQcAndItemAndName = function (typeId, itemId, itemName) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findItemByQcAndItemAndName", { typeId: typeId, itemId: itemId, itemName: itemName });
    };
    /**
     * 根据质控项id&项目类型id&项目名称查询有效的质控项详细记录
     *
     */
    ApiQcQualityControl.findDetail = function (resultId, itemType, itemName) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "findDetail", { resultId: resultId, itemType: itemType, itemName: itemName });
    };
    /**
     * 添加手动质控项详细记录
     *
     */
    ApiQcQualityControl.saveResultDetail = function (qcResult, qcResultDetail) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "saveResultDetail", { qcResult: qcResult, qcResultDetail: qcResultDetail });
    };
    /**
     * 修改质控项详细记录
     *
     */
    ApiQcQualityControl.update = function (qcResultDetail) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "update", { qcResultDetail: qcResultDetail });
    };
    /**
     * 删除质控项详细记录
     *
     */
    ApiQcQualityControl.delete = function (detailId) {
        return api_1.apiUtil.connection("POST", ApiQcQualityControl.baseUrl, "delete", { detailId: detailId });
    };
    ApiQcQualityControl.baseUrl = '/qc/qualityControl/';
    return ApiQcQualityControl;
}());
exports.ApiQcQualityControl = ApiQcQualityControl;
/**
 * redis公共缓存控制器
 * Created by 包国强 on 2017/6/28.
 */
var ApiRedis = /** @class */ (function () {
    function ApiRedis() {
    }
    /**
     * 暂存redis
     *
     */
    ApiRedis.tempSave = function (key, value) {
        return api_1.apiUtil.connection("POST", ApiRedis.baseUrl, "tempSave", { key: key, value: value });
    };
    /**
     * 获取暂存key列表
     *
     */
    ApiRedis.loadTempSave = function (key) {
        return api_1.apiUtil.connection("POST", ApiRedis.baseUrl, "loadTempSave", { key: key });
    };
    /**
     * 获取暂存信息
     *
     */
    ApiRedis.loadTempSaveByKey = function (key) {
        return api_1.apiUtil.connection("POST", ApiRedis.baseUrl, "loadTempSaveByKey", { key: key });
    };
    /**
     * 删除暂存redis
     *
     */
    ApiRedis.delTempSave = function (key) {
        return api_1.apiUtil.connection("POST", ApiRedis.baseUrl, "delTempSave", { key: key });
    };
    ApiRedis.baseUrl = '/redis/redis/';
    return ApiRedis;
}());
exports.ApiRedis = ApiRedis;
var ApiSetTriageGreenRoad = /** @class */ (function () {
    function ApiSetTriageGreenRoad() {
    }
    /**
     * 查询所有绿色通道信息
     *
     */
    ApiSetTriageGreenRoad.findAllGreenRoad = function () {
        return api_1.apiUtil.connection("POST", ApiSetTriageGreenRoad.baseUrl, "findAllGreenRoad", {});
    };
    /**
     * 查询某个绿色通道信息
     *
     */
    ApiSetTriageGreenRoad.findSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiSetTriageGreenRoad.baseUrl, "findSomeOne", { id: id });
    };
    /**
     * 删除某个绿色通道信息
     *
     */
    ApiSetTriageGreenRoad.deleteSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiSetTriageGreenRoad.baseUrl, "deleteSomeOne", { id: id });
    };
    /**
     * 增加某个绿色通道信息
     *
     */
    ApiSetTriageGreenRoad.addSomeOne = function (regFromDict) {
        return api_1.apiUtil.connection("POST", ApiSetTriageGreenRoad.baseUrl, "addSomeOne", { regFromDict: regFromDict });
    };
    /**
     * 修改某个绿色通道信息
     *
     */
    ApiSetTriageGreenRoad.upDateSomeOne = function (regFromDict) {
        return api_1.apiUtil.connection("POST", ApiSetTriageGreenRoad.baseUrl, "upDateSomeOne", { regFromDict: regFromDict });
    };
    ApiSetTriageGreenRoad.baseUrl = '/setTriage/greenRoad/';
    return ApiSetTriageGreenRoad;
}());
exports.ApiSetTriageGreenRoad = ApiSetTriageGreenRoad;
/**
 * 其他分诊控制器
 * Created by Vinsher on 2017/5/2.
 */
var ApiSetTriageOtherAuth = /** @class */ (function () {
    function ApiSetTriageOtherAuth() {
    }
    /**
     * 查询所有其他分诊
     *
     */
    ApiSetTriageOtherAuth.findAllOtherTriage = function () {
        return api_1.apiUtil.connection("POST", ApiSetTriageOtherAuth.baseUrl, "findAllOtherTriage", {});
    };
    /**
     * 按id查询某个其他分诊
     *
     */
    ApiSetTriageOtherAuth.findSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiSetTriageOtherAuth.baseUrl, "findSomeOne", { id: id });
    };
    /**
     * 删除某个其他分诊
     *
     */
    ApiSetTriageOtherAuth.deleteSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiSetTriageOtherAuth.baseUrl, "deleteSomeOne", { id: id });
    };
    /**
     * 增加某个其他分诊信息
     *
     */
    ApiSetTriageOtherAuth.addSomeOne = function (other) {
        return api_1.apiUtil.connection("POST", ApiSetTriageOtherAuth.baseUrl, "addSomeOne", { other: other });
    };
    /**
     * 修改某个其他分诊信息
     *
     */
    ApiSetTriageOtherAuth.upDateSomeOne = function (other, id) {
        return api_1.apiUtil.connection("POST", ApiSetTriageOtherAuth.baseUrl, "upDateSomeOne", { other: other, id: id });
    };
    ApiSetTriageOtherAuth.baseUrl = '/setTriage/other/';
    return ApiSetTriageOtherAuth;
}());
exports.ApiSetTriageOtherAuth = ApiSetTriageOtherAuth;
/**
 * 生命体征控制器
 * Created by Vinsher on 2017/5/2.
 */
var ApiSetTriageVitalScore = /** @class */ (function () {
    function ApiSetTriageVitalScore() {
    }
    /**
     * 查询所有生命体征评级信息
     *
     */
    ApiSetTriageVitalScore.findAllVitalScore = function () {
        return api_1.apiUtil.connection("POST", ApiSetTriageVitalScore.baseUrl, "findAllVitalScore", {});
    };
    /**
     * 查询某个生命体征评级信息
     * 按id一个字段查询
     *
     */
    ApiSetTriageVitalScore.findSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiSetTriageVitalScore.baseUrl, "findSomeOne", { id: id });
    };
    /**
     * 删除某个生命体征评级信息
     * todo 判断条件的提示信息看前端怎么说 有待修改
     *
     */
    ApiSetTriageVitalScore.deleteSomeOne = function (id, illLevel) {
        return api_1.apiUtil.connection("POST", ApiSetTriageVitalScore.baseUrl, "deleteSomeOne", { id: id, illLevel: illLevel });
    };
    /**
     * 增加某个生命体征评级信息
     *
     *           illLevel value     患病等级
     */
    ApiSetTriageVitalScore.addSomeOne = function (id, illLevel, value) {
        return api_1.apiUtil.connection("POST", ApiSetTriageVitalScore.baseUrl, "addSomeOne", { id: id, illLevel: illLevel, value: value });
    };
    ApiSetTriageVitalScore.baseUrl = '/setTriage/vitalScore';
    return ApiSetTriageVitalScore;
}());
exports.ApiSetTriageVitalScore = ApiSetTriageVitalScore;
/**
 * 创建人:黄倩
 * 创建时间:2017/11/23
 * 统计字典表controller
 */
var ApiShiftItemDict = /** @class */ (function () {
    function ApiShiftItemDict() {
    }
    /**
     * 更新/新增统计项目
     *
     */
    ApiShiftItemDict.save = function (statisticsItemDict) {
        return api_1.apiUtil.connection("POST", ApiShiftItemDict.baseUrl, "save", { statisticsItemDict: statisticsItemDict });
    };
    /**
     * 作废统计项目
     *
     */
    ApiShiftItemDict.delete = function (idList) {
        return api_1.apiUtil.connection("POST", ApiShiftItemDict.baseUrl, "delete", { idList: idList });
    };
    /**
     * 查询所有的需要统计的项目名称
     *
     */
    ApiShiftItemDict.selectName = function (page, name) {
        return api_1.apiUtil.connection("POST", ApiShiftItemDict.baseUrl, "selectName", { page: page, name: name });
    };
    /**
     * 根据项目id查询项目信息
     *
     */
    ApiShiftItemDict.select = function (id) {
        return api_1.apiUtil.connection("POST", ApiShiftItemDict.baseUrl, "select", { id: id });
    };
    ApiShiftItemDict.baseUrl = '/shift/itemDict/';
    return ApiShiftItemDict;
}());
exports.ApiShiftItemDict = ApiShiftItemDict;
/**
 * 创建人:黄倩
 * 创建时间:2017/12/6
 * 说明:配置区域下需要进行统计的项目controller
 */
var ApiShiftStatisticsConfig = /** @class */ (function () {
    function ApiShiftStatisticsConfig() {
    }
    /**
     * 更新/新增区域下的统计项目
     *
     */
    ApiShiftStatisticsConfig.save = function (statistics) {
        return api_1.apiUtil.connection("POST", ApiShiftStatisticsConfig.baseUrl, "save", { statistics: statistics });
    };
    /**
     * 作废区域下的统计项目
     *
     */
    ApiShiftStatisticsConfig.delete = function (idList) {
        return api_1.apiUtil.connection("POST", ApiShiftStatisticsConfig.baseUrl, "delete", { idList: idList });
    };
    /**
     * 查询区域下的统计项目
     *
     */
    ApiShiftStatisticsConfig.select = function (areaId, name, page) {
        return api_1.apiUtil.connection("POST", ApiShiftStatisticsConfig.baseUrl, "select", { areaId: areaId, name: name, page: page });
    };
    ApiShiftStatisticsConfig.baseUrl = '/shift/statisticsConfig/';
    return ApiShiftStatisticsConfig;
}());
exports.ApiShiftStatisticsConfig = ApiShiftStatisticsConfig;
/**
 * 医生的排班安排控制器
 * Created by 黄倩 on 2017/8/22.
 */
var ApiShiftChangeMineClassesDoc = /** @class */ (function () {
    function ApiShiftChangeMineClassesDoc() {
    }
    /**
     * 添加医生的排班安排信息需要的字典信息
     *
     */
    ApiShiftChangeMineClassesDoc.selectDict = function (date, operation) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesDoc.baseUrl, "selectDict", { date: date, operation: operation });
    };
    /**
     * 添加医生的排班安排信息
     *
     */
    ApiShiftChangeMineClassesDoc.insert = function (master, details) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesDoc.baseUrl, "insert", { master: master, details: details });
    };
    /**
     * 查询一周里面医生排班安排的明细信息
     *
     */
    ApiShiftChangeMineClassesDoc.selectShift = function (begin) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesDoc.baseUrl, "selectShift", { begin: begin });
    };
    ApiShiftChangeMineClassesDoc.baseUrl = '/mineClasses/docMineClassesController/';
    return ApiShiftChangeMineClassesDoc;
}());
exports.ApiShiftChangeMineClassesDoc = ApiShiftChangeMineClassesDoc;
var ApiShiftChangeMineClassesNur = /** @class */ (function () {
    function ApiShiftChangeMineClassesNur() {
    }
    /**
     * 护士的排班安排信息需要的字典信息
     */
    ApiShiftChangeMineClassesNur.selectDict = function (date, operation) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesNur.baseUrl, "selectDict", { date: date, operation: operation });
    };
    /**
     * 添加护士的排班安排信息
     *
     */
    ApiShiftChangeMineClassesNur.insert = function (master, details) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesNur.baseUrl, "insert", { master: master, details: details });
    };
    /**
     * 查询一周里面护士排班安排的明细信息
     *
     */
    ApiShiftChangeMineClassesNur.selectShift = function (begin) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesNur.baseUrl, "selectShift", { begin: begin });
    };
    /**
     * 删除护士排班安排
     *
     */
    ApiShiftChangeMineClassesNur.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesNur.baseUrl, "delete", { id: id });
    };
    /**
     * 查询手术和检查的信息集合
     *
     */
    ApiShiftChangeMineClassesNur.selectinfromation = function (begin, date) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesNur.baseUrl, "selectinfromation", { begin: begin, date: date });
    };
    /**
     * 查询护士的繁忙程度
     *
     */
    ApiShiftChangeMineClassesNur.selectnur = function (userid, begin, end) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeMineClassesNur.baseUrl, "selectnur", { userid: userid, begin: begin, end: end });
    };
    ApiShiftChangeMineClassesNur.baseUrl = '/mineClasses/nurMineClassesController/';
    return ApiShiftChangeMineClassesNur;
}());
exports.ApiShiftChangeMineClassesNur = ApiShiftChangeMineClassesNur;
/**
 * 患者病情交接班
 * Created by 黄倩 on 2017/7/18.
 */
var ApiShiftChangePatientInfor = /** @class */ (function () {
    function ApiShiftChangePatientInfor() {
    }
    /**
     * 患者病情交接班记录信息
     *
     */
    ApiShiftChangePatientInfor.select = function (userid, id, begin) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "select", { userid: userid, id: id, begin: begin });
    };
    /**
     * 使患者交接班信息失效
     *
     */
    ApiShiftChangePatientInfor.update = function (id) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "update", { id: id });
    };
    /**
     * 添加患者修改患者病情小节
     *
     */
    ApiShiftChangePatientInfor.insertnodule = function (mainid, descrsption) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "insertnodule", { mainid: mainid, descrsption: descrsption });
    };
    /**
     * 添加患者修改患者数据采集
     *
     */
    ApiShiftChangePatientInfor.insertpdatum = function (mainid, pdatum) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "insertpdatum", { mainid: mainid, pdatum: pdatum });
    };
    /**
     * 添加患者修改患者病情的特殊事项
     *
     */
    ApiShiftChangePatientInfor.insertmatter = function (mainid, matter) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "insertmatter", { mainid: mainid, matter: matter });
    };
    /**
     * 交接班事项的dict
     *
     */
    ApiShiftChangePatientInfor.selectdict = function () {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "selectdict", {});
    };
    /**
     * 床位号信息
     *
     */
    ApiShiftChangePatientInfor.selectbeb = function (areaId) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "selectbeb", { areaId: areaId });
    };
    /**
     * 添加交接班主要信息
     *
     */
    ApiShiftChangePatientInfor.insertmain = function (main) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "insertmain", { main: main });
    };
    /**
     * 查询交接班的特殊事项
     *
     */
    ApiShiftChangePatientInfor.selectHandoverPatientMatter = function (main) {
        return api_1.apiUtil.connection("POST", ApiShiftChangePatientInfor.baseUrl, "selectHandoverPatientMatter", { main: main });
    };
    ApiShiftChangePatientInfor.baseUrl = '/shiftChange/patientInfor/patientInfor/';
    return ApiShiftChangePatientInfor;
}());
exports.ApiShiftChangePatientInfor = ApiShiftChangePatientInfor;
/**
 * 交接班
 * Created by 黄倩 on 2017/7/18.
 */
var ApiShiftChangeRecongnize = /** @class */ (function () {
    function ApiShiftChangeRecongnize() {
    }
    /**
     * 查询交接班
     *
     */
    ApiShiftChangeRecongnize.select = function (begin, deptid, user) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "select", { begin: begin, deptid: deptid, user: user });
    };
    /**
     * 科室概况
     *
     */
    ApiShiftChangeRecongnize.selectrecfresh = function (begin, id) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "selectrecfresh", { begin: begin, id: id });
    };
    ApiShiftChangeRecongnize.update = function (main, detail) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "update", { main: main, detail: detail });
    };
    /**
     * 刷新科室概况
     *
     */
    ApiShiftChangeRecongnize.selectrefresh = function (id, begin, end) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "selectrefresh", { id: id, begin: begin, end: end });
    };
    /**
     * 查询科室
     */
    ApiShiftChangeRecongnize.selectdict = function () {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "selectdict", {});
    };
    /**
     * 查询还没有完成的会诊信息
     *
     */
    ApiShiftChangeRecongnize.selectundone = function (id) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "selectundone", { id: id });
    };
    /**
     * 查询患者就医情况
     *
     */
    ApiShiftChangeRecongnize.selectrecords = function (id, begin, end) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "selectrecords", { id: id, begin: begin, end: end });
    };
    /**
     * 查询患者病情交接的特殊事项
     *
     */
    ApiShiftChangeRecongnize.selectHandoverMain = function (main) {
        return api_1.apiUtil.connection("POST", ApiShiftChangeRecongnize.baseUrl, "selectHandoverMain", { main: main });
    };
    ApiShiftChangeRecongnize.baseUrl = '/shiftChange/recongnize/recongnize/';
    return ApiShiftChangeRecongnize;
}());
exports.ApiShiftChangeRecongnize = ApiShiftChangeRecongnize;
/**
 * 交接班控制器
 * Created by 包国强 on 2017/4/24.
 */
var ApiShiftChange = /** @class */ (function () {
    function ApiShiftChange() {
    }
    /**
     * 查询时事交接班统计
     *
     */
    ApiShiftChange.loadStatistics = function (areaId, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiShiftChange.baseUrl, "loadStatistics", { areaId: areaId, startDate: startDate, endDate: endDate });
    };
    /**
     * 查询时事交接班统计
     *
     */
    ApiShiftChange.loadLog = function (areaId) {
        return api_1.apiUtil.connection("POST", ApiShiftChange.baseUrl, "loadLog", { areaId: areaId });
    };
    ApiShiftChange.baseUrl = '/shiftChange/shiftChange/';
    return ApiShiftChange;
}());
exports.ApiShiftChange = ApiShiftChange;
/**
 * 分诊患者信息控制器
 * Created by 包国强 on 2017/4/24.
 */
var ApiSplitMhPatientVisit = /** @class */ (function () {
    function ApiSplitMhPatientVisit() {
    }
    /**
     * 根据身份证号查询已诊患者id
     *
     */
    ApiSplitMhPatientVisit.loadPatientIdByIdNo = function (idNo) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadPatientIdByIdNo", { idNo: idNo });
    };
    /**
     * 挂号时,校验患者是/否已挂号
     *
     */
    ApiSplitMhPatientVisit.checkPatientId = function (patientId) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "checkPatientId", { patientId: patientId });
    };
    /**
     * 保存分诊
     *
     */
    ApiSplitMhPatientVisit.save = function (model) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "save", { model: model });
    };
    /**
     * 查询分诊
     *
     */
    ApiSplitMhPatientVisit.loadSplitInfo = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadSplitInfo", { pvId: pvId });
    };
    /**
     * 暂存分诊
     *
     */
    ApiSplitMhPatientVisit.tempSave = function (model) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "tempSave", { model: model });
    };
    /**
     * 获取暂存分诊key列表
     *
     */
    ApiSplitMhPatientVisit.loadTempSave = function () {
        return api_1.apiUtil.connection("GET", ApiSplitMhPatientVisit.baseUrl, "loadTempSave", {});
    };
    /**
     * 获取暂存分诊信息
     *
     */
    ApiSplitMhPatientVisit.loadTempSaveByKey = function (key) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadTempSaveByKey", { key: key });
    };
    /**
     * 删除暂存分诊
     *
     */
    ApiSplitMhPatientVisit.delTempSave = function (model) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "delTempSave", { model: model });
    };
    /**
     * 分诊患者列表查询
     *
     */
    ApiSplitMhPatientVisit.loadTriagePatsView = function (model, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadTriagePatsView", { model: model, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 根据患者ID更改退号状态
     *
     */
    ApiSplitMhPatientVisit.isBackNo = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "isBackNo", { pvId: pvId });
    };
    /**
     * 查询群伤事件
     *
     */
    ApiSplitMhPatientVisit.loadMhGroupInjury = function (happenDateStart, happenDateEnd) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadMhGroupInjury", { happenDateStart: happenDateStart, happenDateEnd: happenDateEnd });
    };
    /**
     * 关联群伤事件
     *
     */
    ApiSplitMhPatientVisit.updateMhGroupInjury = function (pvId, bulkinjuryId) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "updateMhGroupInjury", { pvId: pvId, bulkinjuryId: bulkinjuryId });
    };
    /**
     * 查询生命体征字典表
     *
     */
    ApiSplitMhPatientVisit.loadVitalSignDict = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadVitalSignDict", {});
    };
    /**
     * 查询字典表
     *
     */
    ApiSplitMhPatientVisit.dict = function () {
        return api_1.apiUtil.connection("GET", ApiSplitMhPatientVisit.baseUrl, "dict", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【身份证】
     *
     */
    ApiSplitMhPatientVisit.loadIdNo = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadIdNo", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【医保卡】
     *
     */
    ApiSplitMhPatientVisit.loadInsuranceNo = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadInsuranceNo", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【健康档案卡】
     *
     */
    ApiSplitMhPatientVisit.loadHealthCard = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadHealthCard", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【生命体征仪器字典数据】
     *
     */
    ApiSplitMhPatientVisit.loadVitalSignEquipment = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadVitalSignEquipment", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【生命体征设备数据】
     *
     */
    ApiSplitMhPatientVisit.loadVitalSign = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadVitalSign", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【建档】
     *
     */
    ApiSplitMhPatientVisit.buildPatRec = function () {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "buildPatRec", {});
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【患者编号与患者姓名检索】
     *
     */
    ApiSplitMhPatientVisit.loadPatBasicIno = function (patientId, name) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "loadPatBasicIno", { patientId: patientId, name: name });
    };
    /**
     * 对外接口: 【预检分诊】.【新分诊】.【挂号(当 模式为 先分诊后挂号时,启用,向his传数据挂号保存)】
     *
     */
    ApiSplitMhPatientVisit.register = function (model) {
        return api_1.apiUtil.connection("POST", ApiSplitMhPatientVisit.baseUrl, "register", { model: model });
    };
    ApiSplitMhPatientVisit.baseUrl = '/split/mhPatientVisit/';
    return ApiSplitMhPatientVisit;
}());
exports.ApiSplitMhPatientVisit = ApiSplitMhPatientVisit;
/**
 * 分诊查询统计
 * Created by 包国强 on 2017/5/20.
 */
var ApiStatisticsSplitTriage = /** @class */ (function () {
    function ApiStatisticsSplitTriage() {
    }
    /**
     * 查询分诊
     *
     */
    ApiStatisticsSplitTriage.loadTriageReport = function (type, startDate, endDate) {
        return api_1.apiUtil.connection("GET", ApiStatisticsSplitTriage.baseUrl, "loadTriageReport", { type: type, startDate: startDate, endDate: endDate });
    };
    /**
     * 保存分诊报表测试
     *
     */
    ApiStatisticsSplitTriage.saveTriageReportTest = function () {
        return api_1.apiUtil.connection("GET", ApiStatisticsSplitTriage.baseUrl, "saveTriageReportTest", {});
    };
    /**
     * 保存分诊报表
     *
     */
    ApiStatisticsSplitTriage.saveTriageReport = function () {
        return api_1.apiUtil.connection("GET", ApiStatisticsSplitTriage.baseUrl, "saveTriageReport", {});
    };
    /**
     * 保存所有分诊报表(测试使用，不对外开放)
     *
     */
    ApiStatisticsSplitTriage.saveAllTriageReport = function () {
        return api_1.apiUtil.connection("GET", ApiStatisticsSplitTriage.baseUrl, "saveAllTriageReport", {});
    };
    /**
     * 保存测试数据
     *
     */
    ApiStatisticsSplitTriage.saveYgjc = function () {
        return api_1.apiUtil.connection("GET", ApiStatisticsSplitTriage.baseUrl, "saveYgjc", {});
    };
    ApiStatisticsSplitTriage.baseUrl = '/statistics/split/triageStatistics/';
    return ApiStatisticsSplitTriage;
}());
exports.ApiStatisticsSplitTriage = ApiStatisticsSplitTriage;
/**
 * 统计视图控制器
 * Created by 毛琪 on 2017/6/21.
 */
var ApiStatisticsView = /** @class */ (function () {
    function ApiStatisticsView() {
    }
    /**
     * 转住院 15
     *
     */
    ApiStatisticsView.findS15 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS15", { startDate: startDate, endDate: endDate });
    };
    /**
     * 当天就诊时间挂号人数 按 时 分布 14
     *
     */
    ApiStatisticsView.findS14 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS14", {});
    };
    /**
     * 病人平均等待时间 13
     *
     */
    ApiStatisticsView.findS13 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS13", {});
    };
    /**
     * 当天每区床位占用比例 12
     *
     */
    ApiStatisticsView.findS12 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS12", {});
    };
    /**
     * 一段时间就诊时间分布 11
     *
     */
    ApiStatisticsView.findS11 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS11", { startDate: startDate, endDate: endDate });
    };
    /**
     * 挂号年龄分布 10
     *
     */
    ApiStatisticsView.findS10 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS10", { startDate: startDate, endDate: endDate });
    };
    /**
     * 留观时间 9
     *
     */
    ApiStatisticsView.findS9 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS9", {});
    };
    /**
     * 就诊死亡人数 8
     *
     */
    ApiStatisticsView.findS8 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS8", { startDate: startDate, endDate: endDate });
    };
    /**
     * 会诊人数就诊人数 7 会诊统计
     *
     */
    ApiStatisticsView.findS7 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS7", { startDate: startDate, endDate: endDate });
    };
    /**
     * 时间内在科停留时间 6
     *
     */
    ApiStatisticsView.findS6 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS6", { startDate: startDate, endDate: endDate });
    };
    /**
     * 一月内按天分挂号人数 5
     *
     */
    ApiStatisticsView.findS5 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS5", {});
    };
    /**
     * rems评分分布 4
     *
     */
    ApiStatisticsView.findS4 = function (startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS4", { startDate: startDate, endDate: endDate });
    };
    /**
     * 付费方式 3
     *
     */
    ApiStatisticsView.findS3 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS3", {});
    };
    /**
     * 在科病人状态比例 2
     *
     */
    ApiStatisticsView.findS2 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS2", {});
    };
    /**
     * 查询红黄绿区的在科患者
     *
     */
    ApiStatisticsView.findS1 = function () {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findS1", {});
    };
    /**
     * 根据条件查询统计视图
     *
     */
    ApiStatisticsView.findBy = function (visitPatsView, startDate, endDate) {
        return api_1.apiUtil.connection("POST", ApiStatisticsView.baseUrl, "findBy", { visitPatsView: visitPatsView, startDate: startDate, endDate: endDate });
    };
    ApiStatisticsView.baseUrl = '/statistics/viewStatistics/';
    return ApiStatisticsView;
}());
exports.ApiStatisticsView = ApiStatisticsView;
/**
 * 医嘱分类设置 controller
 * Created by 李潇潇 on 2017/7/7.
 */
var ApiSysManageCareSettings = /** @class */ (function () {
    function ApiSysManageCareSettings() {
    }
    /**
     * 查询所有未删除的区域信息
     *
     */
    ApiSysManageCareSettings.getOrdersClassMaster = function () {
        return api_1.apiUtil.connection("GET", ApiSysManageCareSettings.baseUrl, "getOrdersClassMaster", {});
    };
    /**
     * 插入区域信息
     *
     */
    ApiSysManageCareSettings.insertOrdersClassMaster = function (data) {
        return api_1.apiUtil.connection("POST", ApiSysManageCareSettings.baseUrl, "insertOrdersClassMaster", { data: data });
    };
    /**
     * 更新区域信息
     *
     */
    ApiSysManageCareSettings.saveOrUpdate = function (data) {
        return api_1.apiUtil.connection("POST", ApiSysManageCareSettings.baseUrl, "saveOrUpdate", { data: data });
    };
    /**
     * 更新区域信息
     *
     */
    ApiSysManageCareSettings.updateOrdersClassMaster = function (data) {
        return api_1.apiUtil.connection("POST", ApiSysManageCareSettings.baseUrl, "updateOrdersClassMaster", { data: data });
    };
    /**
     * 删除指定区域信息（更改isDel状态）
     *
     */
    ApiSysManageCareSettings.deleteOrdersClassMaster = function (id) {
        return api_1.apiUtil.connection("POST", ApiSysManageCareSettings.baseUrl, "deleteOrdersClassMaster", { id: id });
    };
    /**
     * 给药关联途径 controller
     *
     */
    ApiSysManageCareSettings.relevance = function (data, administration) {
        return api_1.apiUtil.connection("POST", ApiSysManageCareSettings.baseUrl, "relevance", { data: data, administration: administration });
    };
    ApiSysManageCareSettings.baseUrl = '/sysManage/careSettings';
    return ApiSysManageCareSettings;
}());
exports.ApiSysManageCareSettings = ApiSysManageCareSettings;
/**
 * 科室权限控制器
 * Created by 毛琪 on 2017/4/24.
 */
var ApiUserAuthDept = /** @class */ (function () {
    function ApiUserAuthDept() {
    }
    /**
     * 查询科室
     *
     */
    ApiUserAuthDept.findAllDept = function () {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "findAllDept", {});
    };
    /**
     * 根据科室查询所有角色 关联科室
     * true 有关联 已選中
     *
     */
    ApiUserAuthDept.findRoleByDid = function (deptId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "findRoleByDid", { deptId: deptId });
    };
    /**
     * 根据科室角色查询所有菜单 关联科室&角色
     * true 有关联 已選中
     *
     */
    ApiUserAuthDept.findMenuByDidARid = function (deptId, roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "findMenuByDidARid", { deptId: deptId, roleId: roleId });
    };
    /**
     * 添加科室
     *
     */
    ApiUserAuthDept.saveDept = function (dept) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "saveDept", { dept: dept });
    };
    /**
     * 添加科室角色
     *
     */
    ApiUserAuthDept.saveDeptRole = function (deptId, roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "saveDeptRole", { deptId: deptId, roleId: roleId });
    };
    /**
     * 添加科室角色菜单
     *
     */
    ApiUserAuthDept.saveDeptRoleMenu = function (deptId, roleId, menuId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "saveDeptRoleMenu", { deptId: deptId, roleId: roleId, menuId: menuId });
    };
    /**
     * 修改科室
     *
     */
    ApiUserAuthDept.updateDept = function (dept) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "updateDept", { dept: dept });
    };
    /**
     * 删除科室
     *
     */
    ApiUserAuthDept.deleteDept = function (deptId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "deleteDept", { deptId: deptId });
    };
    /**
     * 刪除科室角色
     *
     */
    ApiUserAuthDept.deleteDeptRole = function (deptId, roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "deleteDeptRole", { deptId: deptId, roleId: roleId });
    };
    /**
     * 删除科室角色菜单
     *
     */
    ApiUserAuthDept.deleteDeptRoleMenu = function (deptId, roleId, menuId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "deleteDeptRoleMenu", { deptId: deptId, roleId: roleId, menuId: menuId });
    };
    /**
     * 判断科室是否关联角色
     *
     */
    ApiUserAuthDept.judgeDept = function (deptId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "judgeDept", { deptId: deptId });
    };
    /**
     * 判断角色是否关联有菜单
     *
     */
    ApiUserAuthDept.judgeRoleMenu = function (roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthDept.baseUrl, "judgeRoleMenu", { roleId: roleId });
    };
    ApiUserAuthDept.baseUrl = '/auth/dept/';
    return ApiUserAuthDept;
}());
exports.ApiUserAuthDept = ApiUserAuthDept;
/**
 * 菜单权限控制器
 * Created by 毛琪 on 2017/4/24.
 */
var ApiUserAuthMenu = /** @class */ (function () {
    function ApiUserAuthMenu() {
    }
    /**
     * 查询所有菜单
     */
    ApiUserAuthMenu.findAllMenu = function () {
        return api_1.apiUtil.connection("POST", ApiUserAuthMenu.baseUrl, "findAllMenu", {});
    };
    /**
     * 添加菜单
     *
     */
    ApiUserAuthMenu.saveMenu = function (menu) {
        return api_1.apiUtil.connection("POST", ApiUserAuthMenu.baseUrl, "saveMenu", { menu: menu });
    };
    /**
     * 修改菜单
     *
     */
    ApiUserAuthMenu.updateMenu = function (menu) {
        return api_1.apiUtil.connection("POST", ApiUserAuthMenu.baseUrl, "updateMenu", { menu: menu });
    };
    /**
     * 删除菜单
     *
     */
    ApiUserAuthMenu.deleteMenu = function (menuId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthMenu.baseUrl, "deleteMenu", { menuId: menuId });
    };
    /**
     * 判断菜单是否有关联角色
     *
     */
    ApiUserAuthMenu.judgeMenu = function (menuId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthMenu.baseUrl, "judgeMenu", { menuId: menuId });
    };
    ApiUserAuthMenu.baseUrl = '/auth/menu/';
    return ApiUserAuthMenu;
}());
exports.ApiUserAuthMenu = ApiUserAuthMenu;
/**
 * 角色权限控制器
 * Created by 毛琪 on 2017/4/24.
 */
var ApiUserAuthRole = /** @class */ (function () {
    function ApiUserAuthRole() {
    }
    /**
     * 查询角色
     *
     */
    ApiUserAuthRole.findAllRole = function () {
        return api_1.apiUtil.connection("POST", ApiUserAuthRole.baseUrl, "findAllRole", {});
    };
    /**
     * 添加角色
     */
    ApiUserAuthRole.saveRole = function (roleDict) {
        return api_1.apiUtil.connection("POST", ApiUserAuthRole.baseUrl, "saveRole", { roleDict: roleDict });
    };
    /**
     * 修改角色
     *
     */
    ApiUserAuthRole.updateRole = function (role) {
        return api_1.apiUtil.connection("POST", ApiUserAuthRole.baseUrl, "updateRole", { role: role });
    };
    /**
     * 删除角色
     *
     */
    ApiUserAuthRole.deleteRole = function (roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthRole.baseUrl, "deleteRole", { roleId: roleId });
    };
    /**
     * 判断角色是否有用户/菜单/科室
     *
     */
    ApiUserAuthRole.judgeRole = function (roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuthRole.baseUrl, "judgeRole", { roleId: roleId });
    };
    ApiUserAuthRole.baseUrl = '/auth/role/';
    return ApiUserAuthRole;
}());
exports.ApiUserAuthRole = ApiUserAuthRole;
/**
 * 用户权限控制器
 * Created by 毛琪 on 2017/4/24.
 */
var ApiUserAuth = /** @class */ (function () {
    function ApiUserAuth() {
    }
    /**
     * 查询用户
     *
     */
    ApiUserAuth.findAllUser = function () {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "findAllUser", {});
    };
    /**
     * 根据用户查询所有科室 关联用户
     * true 有关联
     *
     */
    ApiUserAuth.findDeptByUid = function (userId) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "findDeptByUid", { userId: userId });
    };
    /**
     * 根据用户科室 查科室拥有的角色 关联用户&科室
     * true 有关联
     *
     * true 没有关联
     */
    ApiUserAuth.findRoleByDidAUid = function (deptId, userId) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "findRoleByDidAUid", { deptId: deptId, userId: userId });
    };
    /**
     * 添加用户
     *
     */
    ApiUserAuth.saveUser = function (user) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "saveUser", { user: user });
    };
    /**
     * 添加用户角色
     * 一个角色id对应一个科室id
     *
     */
    ApiUserAuth.saveUserDept = function (userId, deptId, roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "saveUserDept", { userId: userId, deptId: deptId, roleId: roleId });
    };
    /**
     * 刪除用戶角色
     *
     */
    ApiUserAuth.deleteUserDeptRole = function (userId, deptId, roleId) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "deleteUserDeptRole", { userId: userId, deptId: deptId, roleId: roleId });
    };
    /**
     * 修改用户
     *
     */
    ApiUserAuth.updateUser = function (user) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "updateUser", { user: user });
    };
    /**
     * 删除用户
     *
     */
    ApiUserAuth.deleteUser = function (userId) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "deleteUser", { userId: userId });
    };
    /**
     * 判断用户是否拥有关联
     *
     */
    ApiUserAuth.judgeUser = function (userId) {
        return api_1.apiUtil.connection("POST", ApiUserAuth.baseUrl, "judgeUser", { userId: userId });
    };
    ApiUserAuth.baseUrl = '/auth/user/';
    return ApiUserAuth;
}());
exports.ApiUserAuth = ApiUserAuth;
/**
 * 内容摘要 ：user info rest state api
 * 创建人　 ：陈佳慧
 * 创建日期 ：2017/4/6
 */
var ApiUserIndex = /** @class */ (function () {
    function ApiUserIndex() {
    }
    /**
     * 登录服务
     *
     */
    ApiUserIndex.login = function (name, password) {
        return api_1.apiUtil.connection("POST", ApiUserIndex.baseUrl, "login", { name: name, password: password });
    };
    /**
     * 用户登录后change角色
     *
     */
    ApiUserIndex.changeRole = function (roleId) {
        return api_1.apiUtil.connection("POST", ApiUserIndex.baseUrl, "changeRole", { roleId: roleId });
    };
    ApiUserIndex.menu = function (id) {
        return api_1.apiUtil.connection("GET", ApiUserIndex.baseUrl, "menu", { id: id });
    };
    /**
     * 查询是否过时,true:未过时;false:过时
     *
     */
    ApiUserIndex.loadToken = function (userName) {
        return api_1.apiUtil.connection("GET", ApiUserIndex.baseUrl, "loadToken", { userName: userName });
    };
    /**
     * 签名
     *
     */
    ApiUserIndex.loadSignature = function (userName, password) {
        return api_1.apiUtil.connection("POST", ApiUserIndex.baseUrl, "loadSignature", { userName: userName, password: password });
    };
    /**
     * 修改密码
     *
     */
    ApiUserIndex.updatePwd = function (userName, oldPwd, newPwd) {
        return api_1.apiUtil.connection("POST", ApiUserIndex.baseUrl, "updatePwd", { userName: userName, oldPwd: oldPwd, newPwd: newPwd });
    };
    ApiUserIndex.baseUrl = '/user/';
    return ApiUserIndex;
}());
exports.ApiUserIndex = ApiUserIndex;
/**
 * Created by Vinsher on 2017/4/25.
 */
var ApiUserMenuAuth = /** @class */ (function () {
    function ApiUserMenuAuth() {
    }
    /**
     * 增加在某科室的某角色的菜单
     *
     */
    ApiUserMenuAuth.addMenuAtDidRid = function (did, rid, mid) {
        return api_1.apiUtil.connection("POST", ApiUserMenuAuth.baseUrl, "addMenuAtDidRid", { did: did, rid: rid, mid: mid });
    };
    /**
     * 删除在某科室的某角色的某菜单
     *
     */
    ApiUserMenuAuth.deleteMenuAtDidRid = function (did, rid, mid) {
        return api_1.apiUtil.connection("POST", ApiUserMenuAuth.baseUrl, "deleteMenuAtDidRid", { did: did, rid: rid, mid: mid });
    };
    /**
     * 查询所有菜单
     */
    ApiUserMenuAuth.findAllMenu = function () {
        return api_1.apiUtil.connection("POST", ApiUserMenuAuth.baseUrl, "findAllMenu", {});
    };
    /**
     * 增加菜单
     *
     */
    ApiUserMenuAuth.addMenu = function (menu) {
        return api_1.apiUtil.connection("POST", ApiUserMenuAuth.baseUrl, "addMenu", { menu: menu });
    };
    /**
     * 删除菜单
     *
     */
    ApiUserMenuAuth.deleteMenu = function (menuId) {
        return api_1.apiUtil.connection("POST", ApiUserMenuAuth.baseUrl, "deleteMenu", { menuId: menuId });
    };
    ApiUserMenuAuth.baseUrl = '/menuAuth/MenuAuth/';
    return ApiUserMenuAuth;
}());
exports.ApiUserMenuAuth = ApiUserMenuAuth;
/**
 * 诊断信息字典表控制器（诊断名称）
 * Created by Vinsher on 2017/5/12.
 */
var ApiUserPatientBaseInformationPartDiagnosisDict = /** @class */ (function () {
    function ApiUserPatientBaseInformationPartDiagnosisDict() {
    }
    /**
     * 查询所有诊断名称
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisDict.findAllDiagnosis = function () {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisDict.baseUrl, "findAllDiagnosis", {});
    };
    /**
     * 增加诊断名称
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisDict.save = function (diagnosisDict) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisDict.baseUrl, "save", { diagnosisDict: diagnosisDict });
    };
    /**
     * 修改诊断信息
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisDict.update = function (diagnosisDict) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisDict.baseUrl, "update", { diagnosisDict: diagnosisDict });
    };
    /**
     * 根据id删除诊断信息（即删除某条诊断名称）
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisDict.baseUrl, "delete", { id: id });
    };
    ApiUserPatientBaseInformationPartDiagnosisDict.baseUrl = '/partInformation/diagnosisDict/';
    return ApiUserPatientBaseInformationPartDiagnosisDict;
}());
exports.ApiUserPatientBaseInformationPartDiagnosisDict = ApiUserPatientBaseInformationPartDiagnosisDict;
var ApiUserPatientBaseInformationPartDiagnosisType = /** @class */ (function () {
    function ApiUserPatientBaseInformationPartDiagnosisType() {
    }
    /**
     * 查询所有诊断类型
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisType.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisType.baseUrl, "findAll", {});
    };
    /**
     * 删除诊断类型
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisType.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisType.baseUrl, "delete", { id: id });
    };
    /**
     * 增加诊断类型
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisType.save = function (diagnosisTypeDict) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisType.baseUrl, "save", { diagnosisTypeDict: diagnosisTypeDict });
    };
    /**
     * 修改诊断类型
     *
     */
    ApiUserPatientBaseInformationPartDiagnosisType.update = function (diagnosisTypeDict) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartDiagnosisType.baseUrl, "update", { diagnosisTypeDict: diagnosisTypeDict });
    };
    ApiUserPatientBaseInformationPartDiagnosisType.baseUrl = '/partInformation/diagnosisType/';
    return ApiUserPatientBaseInformationPartDiagnosisType;
}());
exports.ApiUserPatientBaseInformationPartDiagnosisType = ApiUserPatientBaseInformationPartDiagnosisType;
/**
 * 费别的控制器
 * Created by Vinsher on 2017/5/3.
 */
var ApiUserPatientBaseInformationPartTheChargeSort = /** @class */ (function () {
    function ApiUserPatientBaseInformationPartTheChargeSort() {
    }
    /**
     * 查询所有费别
     */
    ApiUserPatientBaseInformationPartTheChargeSort.findAllChargeSort = function () {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheChargeSort.baseUrl, "findAllChargeSort", {});
    };
    /**
     * 查询某个费别信息
     *
     */
    ApiUserPatientBaseInformationPartTheChargeSort.findSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheChargeSort.baseUrl, "findSomeOne", { id: id });
    };
    /**
     * 删除某个费别信息
     *
     */
    ApiUserPatientBaseInformationPartTheChargeSort.deleteSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheChargeSort.baseUrl, "deleteSomeOne", { id: id });
    };
    /**
     * 增加某个费别信息
     *
     */
    ApiUserPatientBaseInformationPartTheChargeSort.addSomeOne = function (chargeSort) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheChargeSort.baseUrl, "addSomeOne", { chargeSort: chargeSort });
    };
    /**
     * 修改某个费别信息
     *
     */
    ApiUserPatientBaseInformationPartTheChargeSort.upDateSomeOne = function (chargeSort, id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheChargeSort.baseUrl, "upDateSomeOne", { chargeSort: chargeSort, id: id });
    };
    ApiUserPatientBaseInformationPartTheChargeSort.baseUrl = '/patientBaseInformation/partInformation/theChargeSort';
    return ApiUserPatientBaseInformationPartTheChargeSort;
}());
exports.ApiUserPatientBaseInformationPartTheChargeSort = ApiUserPatientBaseInformationPartTheChargeSort;
/**
 * 身份类别的增删查改
 * Created by Vinsher on 2017/5/3.
 */
var ApiUserPatientBaseInformationPartTheIdentity = /** @class */ (function () {
    function ApiUserPatientBaseInformationPartTheIdentity() {
    }
    /**
     * 查询所有的身份类别
     *
     */
    ApiUserPatientBaseInformationPartTheIdentity.findAllIdentity = function () {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheIdentity.baseUrl, "findAllIdentity", {});
    };
    /**
     * 查询某个身份信息
     *
     */
    ApiUserPatientBaseInformationPartTheIdentity.findSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheIdentity.baseUrl, "findSomeOne", { id: id });
    };
    /**
     * 删除某个身份信息
     *
     */
    ApiUserPatientBaseInformationPartTheIdentity.deleteSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheIdentity.baseUrl, "deleteSomeOne", { id: id });
    };
    /**
     * 增加某个身份信息
     *
     */
    ApiUserPatientBaseInformationPartTheIdentity.addSomeOne = function (identity) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheIdentity.baseUrl, "addSomeOne", { identity: identity });
    };
    /**
     * 修改某个身份信息
     *
     */
    ApiUserPatientBaseInformationPartTheIdentity.upDateSomeOne = function (identity) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheIdentity.baseUrl, "upDateSomeOne", { identity: identity });
    };
    ApiUserPatientBaseInformationPartTheIdentity.baseUrl = '/patientBaseInformation/partInformation/theIdentity/';
    return ApiUserPatientBaseInformationPartTheIdentity;
}());
exports.ApiUserPatientBaseInformationPartTheIdentity = ApiUserPatientBaseInformationPartTheIdentity;
var ApiUserPatientBaseInformationPartTheNationality = /** @class */ (function () {
    function ApiUserPatientBaseInformationPartTheNationality() {
    }
    /**
     * 查询所有的民族
     *
     */
    ApiUserPatientBaseInformationPartTheNationality.findAllNationality = function () {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheNationality.baseUrl, "findAllNationality", {});
    };
    /**
     * 查询某个民族信息
     *
     */
    ApiUserPatientBaseInformationPartTheNationality.findSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheNationality.baseUrl, "findSomeOne", { id: id });
    };
    /**
     * 删除某个民族信息
     *
     */
    ApiUserPatientBaseInformationPartTheNationality.deleteSomeOne = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheNationality.baseUrl, "deleteSomeOne", { id: id });
    };
    /**
     * 增加某个民族信息
     *
     */
    ApiUserPatientBaseInformationPartTheNationality.addSomeOne = function (nationality) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheNationality.baseUrl, "addSomeOne", { nationality: nationality });
    };
    /**
     * 修改某个民族信息
     *
     */
    ApiUserPatientBaseInformationPartTheNationality.upDateSomeOne = function (nationality, id) {
        return api_1.apiUtil.connection("POST", ApiUserPatientBaseInformationPartTheNationality.baseUrl, "upDateSomeOne", { nationality: nationality, id: id });
    };
    ApiUserPatientBaseInformationPartTheNationality.baseUrl = '/patientBaseInformation/partInformation/theNationality';
    return ApiUserPatientBaseInformationPartTheNationality;
}());
exports.ApiUserPatientBaseInformationPartTheNationality = ApiUserPatientBaseInformationPartTheNationality;
var ApiUserRoleAuth = /** @class */ (function () {
    function ApiUserRoleAuth() {
    }
    /**
     * 查找科室ID的角色
     *
     */
    ApiUserRoleAuth.findRoleByDid = function (did) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "findRoleByDid", { did: did });
    };
    /**
     * 增加科室ID的角色
     *
     */
    ApiUserRoleAuth.addRoleByDid = function (did, rid) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "addRoleByDid", { did: did, rid: rid });
    };
    /**
     * 向角色 科室 用户表中增加角色
     *
     */
    ApiUserRoleAuth.addRoleByUserDid = function (uid, rid, did) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "addRoleByUserDid", { uid: uid, rid: rid, did: did });
    };
    /**
     * 删除科室ID的角色
     *
     */
    ApiUserRoleAuth.deleteRoleByDid = function (roleList, did) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "deleteRoleByDid", { roleList: roleList, did: did });
    };
    /**
     * 找到角色表中所有角色
     */
    ApiUserRoleAuth.findAllRole = function () {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "findAllRole", {});
    };
    /**
     * 在角色表中增加角色
     *
     */
    ApiUserRoleAuth.addRole = function (addRole) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "addRole", { addRole: addRole });
    };
    /**
     * 删除角色表中的角色
     *
     */
    ApiUserRoleAuth.deleteRole = function (deleteRoleArray) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "deleteRole", { deleteRoleArray: deleteRoleArray });
    };
    /**
     * 修改角色表中的角色
     *
     */
    ApiUserRoleAuth.upDateRole = function (editRole) {
        return api_1.apiUtil.connection("POST", ApiUserRoleAuth.baseUrl, "upDateRole", { editRole: editRole });
    };
    ApiUserRoleAuth.baseUrl = '/roleAuth/RoleAuth/';
    return ApiUserRoleAuth;
}());
exports.ApiUserRoleAuth = ApiUserRoleAuth;
/**
 * 创建人：黄倩
 * 时间：2017/9/18
 * 说明：急诊区域字典管理controller
 */
var ApiUserSysAreaDict = /** @class */ (function () {
    function ApiUserSysAreaDict() {
    }
    /**
     * 查询急诊区域信息
     *
     */
    ApiUserSysAreaDict.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysAreaDict.baseUrl, "select", {});
    };
    ApiUserSysAreaDict.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysAreaDict.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加急诊区域信息
     *
     */
    ApiUserSysAreaDict.insert = function (areaDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysAreaDict.baseUrl, "insert", { areaDict: areaDict });
    };
    /**
     * 修改急诊区域信息
     *
     */
    ApiUserSysAreaDict.update = function (areaDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysAreaDict.baseUrl, "update", { areaDict: areaDict });
    };
    /**
     * 作废急诊区域信息
     *
     */
    ApiUserSysAreaDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysAreaDict.baseUrl, "delete", { id: id });
    };
    ApiUserSysAreaDict.baseUrl = '/sysArea/areaDictController/';
    return ApiUserSysAreaDict;
}());
exports.ApiUserSysAreaDict = ApiUserSysAreaDict;
var ApiUserSysDeptClinic = /** @class */ (function () {
    function ApiUserSysDeptClinic() {
    }
    /**
     * 查询科室临床属性
     *
     */
    ApiUserSysDeptClinic.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptClinic.baseUrl, "select", {});
    };
    ApiUserSysDeptClinic.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptClinic.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加科室临床属性
     *
     */
    ApiUserSysDeptClinic.insert = function (clinicAttrDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptClinic.baseUrl, "insert", { clinicAttrDict: clinicAttrDict });
    };
    /**
     * 更新科室临床属性
     *
     */
    ApiUserSysDeptClinic.update = function (clinicAttrDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptClinic.baseUrl, "update", { clinicAttrDict: clinicAttrDict });
    };
    /**
     * 删除科室临床属性字典
     *
     */
    ApiUserSysDeptClinic.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptClinic.baseUrl, "delete", { id: id });
    };
    ApiUserSysDeptClinic.baseUrl = '/sysDept/deptClinicController/';
    return ApiUserSysDeptClinic;
}());
exports.ApiUserSysDeptClinic = ApiUserSysDeptClinic;
/**
 * 创建人：黄倩
 * 时间：2017/9/4.
 * 说明：急诊科室
 */
var ApiUserSysDeptDict = /** @class */ (function () {
    function ApiUserSysDeptDict() {
    }
    /**
     * 查询急诊科室第一级科室
     */
    ApiUserSysDeptDict.selectmain = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptDict.baseUrl, "selectmain", {});
    };
    /**
     * 查询急诊科室的子科室
     *
     */
    ApiUserSysDeptDict.selectdict = function (deptcode, k) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptDict.baseUrl, "selectdict", { deptcode: deptcode, k: k });
    };
    /**
     * 查询急诊科室详情信息
     *
     */
    ApiUserSysDeptDict.seldectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptDict.baseUrl, "seldectid", { id: id });
    };
    /**
     * 添加急诊科室的子科室
     *
     */
    ApiUserSysDeptDict.insert = function (deptDict, deptcode, k) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptDict.baseUrl, "insert", { deptDict: deptDict, deptcode: deptcode, k: k });
    };
    /**
     * 修改急诊科室信息
     *
     */
    ApiUserSysDeptDict.update = function (deptDict, k) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptDict.baseUrl, "update", { deptDict: deptDict, k: k });
    };
    ApiUserSysDeptDict.baseUrl = '/sysDept/deptDictController/';
    return ApiUserSysDeptDict;
}());
exports.ApiUserSysDeptDict = ApiUserSysDeptDict;
/**
 * 创建人：黄倩
 * 时间：2017/9/4.
 * 说明：急诊科室内外科属性controller
 */
var ApiUserSysDeptIs = /** @class */ (function () {
    function ApiUserSysDeptIs() {
    }
    /**
     * 查询急诊科室内外科属性
     *
     */
    ApiUserSysDeptIs.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptIs.baseUrl, "select", {});
    };
    /**
     * 根据查询急诊科室内外科属性
     *
     */
    ApiUserSysDeptIs.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptIs.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加急诊科室内外科属性
     *
     */
    ApiUserSysDeptIs.insert = function (oiAttrDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptIs.baseUrl, "insert", { oiAttrDict: oiAttrDict });
    };
    /**
     * 修改急诊科室内外科属性
     *
     */
    ApiUserSysDeptIs.update = function (oiAttrDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptIs.baseUrl, "update", { oiAttrDict: oiAttrDict });
    };
    /**
     * 删除急诊科室内外科属性
     *
     */
    ApiUserSysDeptIs.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptIs.baseUrl, "delete", { id: id });
    };
    ApiUserSysDeptIs.baseUrl = '/sysDept/deptIsController/';
    return ApiUserSysDeptIs;
}());
exports.ApiUserSysDeptIs = ApiUserSysDeptIs;
/**
 * 创建人：黄倩
 * 时间：2017/9/4.
 * 说明：急诊科室门诊住院属性controller
 */
var ApiUserSysDeptOiDict = /** @class */ (function () {
    function ApiUserSysDeptOiDict() {
    }
    /**
     * 查询急诊科室门诊住院属性
     *
     */
    ApiUserSysDeptOiDict.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptOiDict.baseUrl, "select", {});
    };
    /**
     * 根据查询急诊科室门诊住院属性值
     *
     */
    ApiUserSysDeptOiDict.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptOiDict.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加急诊科室门诊住院属性值
     *
     */
    ApiUserSysDeptOiDict.insert = function (oiAttrDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptOiDict.baseUrl, "insert", { oiAttrDict: oiAttrDict });
    };
    /**
     * 修改急诊科室门诊住院属性值
     *
     */
    ApiUserSysDeptOiDict.update = function (oiAttrDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptOiDict.baseUrl, "update", { oiAttrDict: oiAttrDict });
    };
    /**
     * 删除急诊科室门诊住院属性值
     *
     */
    ApiUserSysDeptOiDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysDeptOiDict.baseUrl, "delete", { id: id });
    };
    ApiUserSysDeptOiDict.baseUrl = '/sysDept/deptOiDictController/';
    return ApiUserSysDeptOiDict;
}());
exports.ApiUserSysDeptOiDict = ApiUserSysDeptOiDict;
/**
 * 创建人：黄倩
 * 时间：2017/9/20
 * 说明：病情状态controller
 */
var ApiUserSysIllnessPatientStatusDictJpa = /** @class */ (function () {
    function ApiUserSysIllnessPatientStatusDictJpa() {
    }
    /**
     * 查询患者病情状态
     *
     */
    ApiUserSysIllnessPatientStatusDictJpa.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysIllnessPatientStatusDictJpa.baseUrl, "select", {});
    };
    /**
     * 指定id查询患者病情状态详情信息
     *
     */
    ApiUserSysIllnessPatientStatusDictJpa.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysIllnessPatientStatusDictJpa.baseUrl, "selectid", { id: id });
    };
    /**
     * 新增病情状态
     *
     */
    ApiUserSysIllnessPatientStatusDictJpa.insert = function (statusDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysIllnessPatientStatusDictJpa.baseUrl, "insert", { statusDict: statusDict });
    };
    /**
     * 更新病情状态
     *
     */
    ApiUserSysIllnessPatientStatusDictJpa.update = function (statusDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysIllnessPatientStatusDictJpa.baseUrl, "update", { statusDict: statusDict });
    };
    /**
     * 病情状态作废
     *
     */
    ApiUserSysIllnessPatientStatusDictJpa.delect = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysIllnessPatientStatusDictJpa.baseUrl, "delect", { id: id });
    };
    ApiUserSysIllnessPatientStatusDictJpa.baseUrl = '/sysIllness/PatientStatusDictJpa/';
    return ApiUserSysIllnessPatientStatusDictJpa;
}());
exports.ApiUserSysIllnessPatientStatusDictJpa = ApiUserSysIllnessPatientStatusDictJpa;
/**
 * 创建人：黄倩
 * 时间：2017/9/25
 * 说明：注射类型controller
 */
var ApiUserSysNursingInOutItemDetail = /** @class */ (function () {
    function ApiUserSysNursingInOutItemDetail() {
    }
    ApiUserSysNursingInOutItemDetail.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInOutItemDetail.baseUrl, "select", {});
    };
    /**
     * 根据id查询注射类型详情
     *
     */
    ApiUserSysNursingInOutItemDetail.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInOutItemDetail.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加新的注射类型详情
     *
     */
    ApiUserSysNursingInOutItemDetail.insert = function (itemDetail) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInOutItemDetail.baseUrl, "insert", { itemDetail: itemDetail });
    };
    /**
     * 修改注射类型详情
     *
     */
    ApiUserSysNursingInOutItemDetail.update = function (itemDetail) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInOutItemDetail.baseUrl, "update", { itemDetail: itemDetail });
    };
    /**
     * 根据id作废注射类型
     *
     */
    ApiUserSysNursingInOutItemDetail.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInOutItemDetail.baseUrl, "delete", { id: id });
    };
    ApiUserSysNursingInOutItemDetail.baseUrl = '/sysNursing/inOutItemDetailController/';
    return ApiUserSysNursingInOutItemDetail;
}());
exports.ApiUserSysNursingInOutItemDetail = ApiUserSysNursingInOutItemDetail;
var ApiUserSysNursingInoutItemDict = /** @class */ (function () {
    function ApiUserSysNursingInoutItemDict() {
    }
    /**
     * 注射类型中的注射方法配置的字典信息
     *
     */
    ApiUserSysNursingInoutItemDict.selectdict = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInoutItemDict.baseUrl, "selectdict", {});
    };
    /**
     * 注射类型中的注射方法
     *
     */
    ApiUserSysNursingInoutItemDict.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInoutItemDict.baseUrl, "select", {});
    };
    /**
     * 添加/更新 注射类型中的注射方法
     *
     */
    ApiUserSysNursingInoutItemDict.insert = function (inoutItemDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInoutItemDict.baseUrl, "insert", { inoutItemDict: inoutItemDict });
    };
    /**
     * 作废注射类型中的注射方法
     *
     */
    ApiUserSysNursingInoutItemDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingInoutItemDict.baseUrl, "delete", { id: id });
    };
    ApiUserSysNursingInoutItemDict.baseUrl = '/sysNursing/inoutItemDictController/';
    return ApiUserSysNursingInoutItemDict;
}());
exports.ApiUserSysNursingInoutItemDict = ApiUserSysNursingInoutItemDict;
/**
 * 创建人：黄倩
 * 时间：2017/9/25
 * 说明：出入量项目管理controller
 */
var ApiUserSysNursingOutItemDetai = /** @class */ (function () {
    function ApiUserSysNursingOutItemDetai() {
    }
    /**
     * 查询全部出入量项目信息
     *
     */
    ApiUserSysNursingOutItemDetai.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingOutItemDetai.baseUrl, "select", {});
    };
    /**
     * 根据id查询全部出入量项目详情
     *
     */
    ApiUserSysNursingOutItemDetai.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingOutItemDetai.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加出入量项目
     *
     */
    ApiUserSysNursingOutItemDetai.insert = function (inOutItemn) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingOutItemDetai.baseUrl, "insert", { inOutItemn: inOutItemn });
    };
    /**
     * 修改出入量项目信息
     *
     */
    ApiUserSysNursingOutItemDetai.update = function (inOutItemn) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingOutItemDetai.baseUrl, "update", { inOutItemn: inOutItemn });
    };
    /**
     * 作废出入量项目信息
     *
     */
    ApiUserSysNursingOutItemDetai.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysNursingOutItemDetai.baseUrl, "delete", { id: id });
    };
    ApiUserSysNursingOutItemDetai.baseUrl = '/sysNursing/outItemDetaiController/';
    return ApiUserSysNursingOutItemDetai;
}());
exports.ApiUserSysNursingOutItemDetai = ApiUserSysNursingOutItemDetai;
/**
 * 系统参数-参考事件维护控制器
 * Created by 毛琪 on 2017/7/1.
 */
var ApiUserSysParamQcEventTimeConfig = /** @class */ (function () {
    function ApiUserSysParamQcEventTimeConfig() {
    }
    /**
     * 查询所有参考事件
     *
     */
    ApiUserSysParamQcEventTimeConfig.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcEventTimeConfig.baseUrl, "findAll", {});
    };
    /**
     * 根据参考事件id查询参考事件
     *
     */
    ApiUserSysParamQcEventTimeConfig.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcEventTimeConfig.baseUrl, "findById", { id: id });
    };
    /**
     * 添加或修改参考事件
     *
     */
    ApiUserSysParamQcEventTimeConfig.saveOrUpdate = function (qcEventTimeConfig) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcEventTimeConfig.baseUrl, "saveOrUpdate", { qcEventTimeConfig: qcEventTimeConfig });
    };
    /**
     * 根据参考事件id删除参考事件
     *
     */
    ApiUserSysParamQcEventTimeConfig.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcEventTimeConfig.baseUrl, "delete", { id: id });
    };
    ApiUserSysParamQcEventTimeConfig.baseUrl = '/qc/qcEventTimeConfig/';
    return ApiUserSysParamQcEventTimeConfig;
}());
exports.ApiUserSysParamQcEventTimeConfig = ApiUserSysParamQcEventTimeConfig;
/**
 * 系统参数-不合格原因模板维护
 * Created by 毛琪 on 2017/7/1.
 */
var ApiUserSysParamQcUnQualigyReasonConfig = /** @class */ (function () {
    function ApiUserSysParamQcUnQualigyReasonConfig() {
    }
    /**
     * 查询所有不合格原因模板
     *
     */
    ApiUserSysParamQcUnQualigyReasonConfig.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcUnQualigyReasonConfig.baseUrl, "findAll", {});
    };
    /**
     * 根据不合格原因模板id查询不合格原因模板
     *
     */
    ApiUserSysParamQcUnQualigyReasonConfig.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcUnQualigyReasonConfig.baseUrl, "findById", { id: id });
    };
    /**
     * 添加或修改不合格原因模板
     *
     */
    ApiUserSysParamQcUnQualigyReasonConfig.saveOrUpdate = function (qcUnQualifyReason) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcUnQualigyReasonConfig.baseUrl, "saveOrUpdate", { qcUnQualifyReason: qcUnQualifyReason });
    };
    /**
     * 根据不合格原因模板id删除不合格原因模板
     *
     */
    ApiUserSysParamQcUnQualigyReasonConfig.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamQcUnQualigyReasonConfig.baseUrl, "delete", { id: id });
    };
    ApiUserSysParamQcUnQualigyReasonConfig.baseUrl = '/qc/qcUnQualigyReasonConfig/';
    return ApiUserSysParamQcUnQualigyReasonConfig;
}());
exports.ApiUserSysParamQcUnQualigyReasonConfig = ApiUserSysParamQcUnQualigyReasonConfig;
/**
 * 床位控制器
 * Created by 毛琪 on 2017/5/2.
 */
var ApiUserSysParamBed = /** @class */ (function () {
    function ApiUserSysParamBed() {
    }
    /**
     * 查询床位
     *
     */
    ApiUserSysParamBed.findAll = function (name, status, sex, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamBed.baseUrl, "findAll", { name: name, status: status, sex: sex, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 根据床位id查询
     *
     */
    ApiUserSysParamBed.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamBed.baseUrl, "findById", { id: id });
    };
    /**
     * 添加床位
     *
     */
    ApiUserSysParamBed.save = function (bedDict, mark) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamBed.baseUrl, "save", { bedDict: bedDict, mark: mark });
    };
    /**
     * 修改床位
     *
     */
    ApiUserSysParamBed.update = function (bedDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamBed.baseUrl, "update", { bedDict: bedDict });
    };
    /**
     * 根据主键删除床位
     *
     */
    ApiUserSysParamBed.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamBed.baseUrl, "delete", { id: id });
    };
    /**
     * 添加床位需要的字典信息
     */
    ApiUserSysParamBed.selectdict = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamBed.baseUrl, "selectdict", {});
    };
    ApiUserSysParamBed.baseUrl = '/triage/bed/';
    return ApiUserSysParamBed;
}());
exports.ApiUserSysParamBed = ApiUserSysParamBed;
/**
 * 群伤类型控制器
 * Created by 毛琪 on 2017/5/2.
 */
var ApiUserSysParamInjuryType = /** @class */ (function () {
    function ApiUserSysParamInjuryType() {
    }
    /**
     * 查询所有群伤类型
     */
    ApiUserSysParamInjuryType.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamInjuryType.baseUrl, "findAll", {});
    };
    /**
     * 根据群伤类型查询
     *
     */
    ApiUserSysParamInjuryType.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamInjuryType.baseUrl, "findById", { id: id });
    };
    /**
     * 添加群伤类型
     *
     */
    ApiUserSysParamInjuryType.save = function (injuryType) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamInjuryType.baseUrl, "save", { injuryType: injuryType });
    };
    /**
     * 修改群伤类型
     *
     */
    ApiUserSysParamInjuryType.update = function (injuryType) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamInjuryType.baseUrl, "update", { injuryType: injuryType });
    };
    /**
     * 根据id删除群伤类型
     *
     */
    ApiUserSysParamInjuryType.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamInjuryType.baseUrl, "delete", { id: id });
    };
    ApiUserSysParamInjuryType.baseUrl = '/triage/injuryType/';
    return ApiUserSysParamInjuryType;
}());
exports.ApiUserSysParamInjuryType = ApiUserSysParamInjuryType;
/**
 * 判定依据控制器
 * Created by 毛琪 on 2017/5/2.
 */
var ApiUserSysParamMhCriterion = /** @class */ (function () {
    function ApiUserSysParamMhCriterion() {
    }
    /**
     * 查询所有分类
     *
     */
    ApiUserSysParamMhCriterion.findAllType = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findAllType", {});
    };
    /**
     * 根据分类id查询分类
     *
     */
    ApiUserSysParamMhCriterion.findTypeById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findTypeById", { id: id });
    };
    /**
     * 根据分类id查询主诉
     *
     */
    ApiUserSysParamMhCriterion.findMainByTypeId = function (typeId, inputCode) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findMainByTypeId", { typeId: typeId, inputCode: inputCode });
    };
    /**
     * 根据主诉id查询
     *
     */
    ApiUserSysParamMhCriterion.findMainById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findMainById", { id: id });
    };
    /**
     * 根据判定依据id查询判定依据
     *
     */
    ApiUserSysParamMhCriterion.findItemByMainId = function (mainId, inputCode) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findItemByMainId", { mainId: mainId, inputCode: inputCode });
    };
    /**
     * 根据判定依据id查询
     *
     */
    ApiUserSysParamMhCriterion.findItemById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findItemById", { id: id });
    };
    /**
     * 根据三个id查询判定依据及相关分类主诉
     *
     */
    ApiUserSysParamMhCriterion.findItemByAllId = function (typeId, mainId, itemId) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "findItemByAllId", { typeId: typeId, mainId: mainId, itemId: itemId });
    };
    /**
     * 添加分类
     *
     */
    ApiUserSysParamMhCriterion.saveType = function (mhCriterionType) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "saveType", { mhCriterionType: mhCriterionType });
    };
    /**
     * 添加主诉
     *
     */
    ApiUserSysParamMhCriterion.saveMain = function (mhCriterionMain) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "saveMain", { mhCriterionMain: mhCriterionMain });
    };
    /**
     * 添加判定依据
     *
     */
    ApiUserSysParamMhCriterion.saveItem = function (mhCriterionItem) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "saveItem", { mhCriterionItem: mhCriterionItem });
    };
    /**
     * 修改分类
     *
     */
    ApiUserSysParamMhCriterion.updateType = function (mhCriterionType) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "updateType", { mhCriterionType: mhCriterionType });
    };
    /**
     * 修改主诉
     *
     */
    ApiUserSysParamMhCriterion.updateMain = function (mhCriterionMain) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "updateMain", { mhCriterionMain: mhCriterionMain });
    };
    /**
     * 修改判定依据
     *
     */
    ApiUserSysParamMhCriterion.updateItem = function (mhCriterionItem) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "updateItem", { mhCriterionItem: mhCriterionItem });
    };
    /**
     * 根据id删除分类
     *
     */
    ApiUserSysParamMhCriterion.deleteType = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "deleteType", { id: id });
    };
    /**
     * 根据id删除主诉
     *
     */
    ApiUserSysParamMhCriterion.deleteMain = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "deleteMain", { id: id });
    };
    /**
     * 根据id删除判定依据
     *
     */
    ApiUserSysParamMhCriterion.deleteItem = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhCriterion.baseUrl, "deleteItem", { id: id });
    };
    ApiUserSysParamMhCriterion.baseUrl = '/triage/mhCriterion/';
    return ApiUserSysParamMhCriterion;
}());
exports.ApiUserSysParamMhCriterion = ApiUserSysParamMhCriterion;
/**
 * 病人评分控制器
 * Created by 毛琪 on 2017/5/2.
 */
var ApiUserSysParamMhScoreType = /** @class */ (function () {
    function ApiUserSysParamMhScoreType() {
    }
    /**
     * 查询病人评分
     *
     */
    ApiUserSysParamMhScoreType.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhScoreType.baseUrl, "findAll", {});
    };
    /**
     * 根据病人评分id查询
     *
     */
    ApiUserSysParamMhScoreType.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhScoreType.baseUrl, "findById", { id: id });
    };
    /**
     * 添加病人评分
     *
     */
    ApiUserSysParamMhScoreType.save = function (mhScoreType) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhScoreType.baseUrl, "save", { mhScoreType: mhScoreType });
    };
    /**
     * 修改病人评分
     *
     */
    ApiUserSysParamMhScoreType.update = function (mhScoreType) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhScoreType.baseUrl, "update", { mhScoreType: mhScoreType });
    };
    /**
     * 根据主键删除病人评分
     *
     */
    ApiUserSysParamMhScoreType.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamMhScoreType.baseUrl, "delete", { id: id });
    };
    ApiUserSysParamMhScoreType.baseUrl = '/triage/mhScoreType/';
    return ApiUserSysParamMhScoreType;
}());
exports.ApiUserSysParamMhScoreType = ApiUserSysParamMhScoreType;
/**
 * 来院方式控制器
 * Created by 毛琪 on 2017/4/28.
 */
var ApiUserAuthSysParamTriage = /** @class */ (function () {
    function ApiUserAuthSysParamTriage() {
    }
    /**
     * 查询所有来院方式
     */
    ApiUserAuthSysParamTriage.findAllRf = function () {
        return api_1.apiUtil.connection("POST", ApiUserAuthSysParamTriage.baseUrl, "findAllRf", {});
    };
    /**
     * 根据来院方式查询
     *
     */
    ApiUserAuthSysParamTriage.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserAuthSysParamTriage.baseUrl, "findById", { id: id });
    };
    /**
     * 添加来院方式
     *
     */
    ApiUserAuthSysParamTriage.saveReg = function (regFrom) {
        return api_1.apiUtil.connection("POST", ApiUserAuthSysParamTriage.baseUrl, "saveReg", { regFrom: regFrom });
    };
    /**
     * 修改来院方式
     *
     */
    ApiUserAuthSysParamTriage.updateReg = function (regFrom) {
        return api_1.apiUtil.connection("POST", ApiUserAuthSysParamTriage.baseUrl, "updateReg", { regFrom: regFrom });
    };
    /**
     * 根据id删除来院方式
     *
     */
    ApiUserAuthSysParamTriage.deleteReg = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserAuthSysParamTriage.baseUrl, "deleteReg", { id: id });
    };
    ApiUserAuthSysParamTriage.baseUrl = '/triage/regFrom/';
    return ApiUserAuthSysParamTriage;
}());
exports.ApiUserAuthSysParamTriage = ApiUserAuthSysParamTriage;
/**
 * 分诊去向控制器
 * Created by 毛琪 on 2017/5/2.
 */
var ApiUserSysParamTriage = /** @class */ (function () {
    function ApiUserSysParamTriage() {
    }
    /**
     * 查询所有分诊去向
     */
    ApiUserSysParamTriage.findAll = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysParamTriage.baseUrl, "findAll", {});
    };
    /**
     * 根据分诊去向查询
     *
     */
    ApiUserSysParamTriage.findById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamTriage.baseUrl, "findById", { id: id });
    };
    /**
     * 添加分诊去向
     *
     */
    ApiUserSysParamTriage.save = function (triageTarget) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamTriage.baseUrl, "save", { triageTarget: triageTarget });
    };
    /**
     * 修改分诊去向
     *
     */
    ApiUserSysParamTriage.update = function (triageTarget) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamTriage.baseUrl, "update", { triageTarget: triageTarget });
    };
    /**
     * 根据主键删除分诊去向
     *
     */
    ApiUserSysParamTriage.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysParamTriage.baseUrl, "delete", { id: id });
    };
    ApiUserSysParamTriage.baseUrl = '/triage/triageTarget/';
    return ApiUserSysParamTriage;
}());
exports.ApiUserSysParamTriage = ApiUserSysParamTriage;
var ApiUserSysShiftShitfDocPost = /** @class */ (function () {
    function ApiUserSysShiftShitfDocPost() {
    }
    /**
     * 查询医生排班安排的职位信息.
     */
    ApiUserSysShiftShitfDocPost.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfDocPost.baseUrl, "select", {});
    };
    /**
     * 根据id查询医生排班安排的职位信息
     *
     */
    ApiUserSysShiftShitfDocPost.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfDocPost.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加医生排班安排的职位信息
     *
     */
    ApiUserSysShiftShitfDocPost.insert = function (docpost) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfDocPost.baseUrl, "insert", { docpost: docpost });
    };
    /**
     * 修改医生排班安排的职位信息
     *
     */
    ApiUserSysShiftShitfDocPost.update = function (docpost) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfDocPost.baseUrl, "update", { docpost: docpost });
    };
    /**
     * 删除医生排班安排的职位信息.
     *
     */
    ApiUserSysShiftShitfDocPost.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfDocPost.baseUrl, "delete", { id: id });
    };
    ApiUserSysShiftShitfDocPost.baseUrl = '/sysShiftr/ShitfDocPostController/';
    return ApiUserSysShiftShitfDocPost;
}());
exports.ApiUserSysShiftShitfDocPost = ApiUserSysShiftShitfDocPost;
var ApiUserSysShiftShitfNurPost = /** @class */ (function () {
    function ApiUserSysShiftShitfNurPost() {
    }
    /**
     * 查询护士排班安排的职位信息
     */
    ApiUserSysShiftShitfNurPost.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfNurPost.baseUrl, "select", {});
    };
    /**
     * 根据id查询护士排班安排的职位信息
     *
     */
    ApiUserSysShiftShitfNurPost.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfNurPost.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加护士排班安排的职位信息.
     *
     */
    ApiUserSysShiftShitfNurPost.insert = function (nurpost) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfNurPost.baseUrl, "insert", { nurpost: nurpost });
    };
    /**
     * 修改护士排班安排的职位信息
     *
     */
    ApiUserSysShiftShitfNurPost.update = function (docpost) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfNurPost.baseUrl, "update", { docpost: docpost });
    };
    /**
     * 删除护士排班安排的职位信息
     *
     */
    ApiUserSysShiftShitfNurPost.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysShiftShitfNurPost.baseUrl, "delete", { id: id });
    };
    ApiUserSysShiftShitfNurPost.baseUrl = '/sysShiftr/ShitfNurPostController/';
    return ApiUserSysShiftShitfNurPost;
}());
exports.ApiUserSysShiftShitfNurPost = ApiUserSysShiftShitfNurPost;
/**
 * 排班安排的班次
 * Created by 黄倩 on 2017/9/5.
 */
var ApiUserSysShift = /** @class */ (function () {
    function ApiUserSysShift() {
    }
    /**
     * 查询班次信息和需要用到的科室信息
     */
    ApiUserSysShift.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysShift.baseUrl, "select", {});
    };
    /**
     * 查询班次信息详情
     *
     */
    ApiUserSysShift.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysShift.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加科室的班次信息
     *
     */
    ApiUserSysShift.insert = function (shiftDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysShift.baseUrl, "insert", { shiftDict: shiftDict });
    };
    /**
     * 更新科室的班次信息
     * Created by 黄倩 on 2017/9/4.
     *
     */
    ApiUserSysShift.update = function (shiftDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysShift.baseUrl, "update", { shiftDict: shiftDict });
    };
    /**
     * 删除科室的班次信息
     * Created by 黄倩 on 2017/9/4.
     *
     */
    ApiUserSysShift.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysShift.baseUrl, "delete", { id: id });
    };
    ApiUserSysShift.baseUrl = '/sysShiftr/sysShiftController/';
    return ApiUserSysShift;
}());
exports.ApiUserSysShift = ApiUserSysShift;
/**
 * 工作人员的工作类别管理
 * Created by 黄倩 on 2017/9/15.
 */
var ApiUserSysStaffJobClassDict = /** @class */ (function () {
    function ApiUserSysStaffJobClassDict() {
    }
    ApiUserSysStaffJobClassDict.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffJobClassDict.baseUrl, "select", {});
    };
    /**
     * 根据id查询工作类别信息
     *
     */
    ApiUserSysStaffJobClassDict.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffJobClassDict.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加工作类别
     *
     */
    ApiUserSysStaffJobClassDict.insert = function (jobDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffJobClassDict.baseUrl, "insert", { jobDict: jobDict });
    };
    /**
     * 更新工作类别
     *
     */
    ApiUserSysStaffJobClassDict.update = function (jobDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffJobClassDict.baseUrl, "update", { jobDict: jobDict });
    };
    /**
     * 工作类别作废
     *
     */
    ApiUserSysStaffJobClassDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffJobClassDict.baseUrl, "delete", { id: id });
    };
    ApiUserSysStaffJobClassDict.baseUrl = '/sysStaff/jobClassDictController/';
    return ApiUserSysStaffJobClassDict;
}());
exports.ApiUserSysStaffJobClassDict = ApiUserSysStaffJobClassDict;
var ApiUserSysStaffTitleDict = /** @class */ (function () {
    function ApiUserSysStaffTitleDict() {
    }
    ApiUserSysStaffTitleDict.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffTitleDict.baseUrl, "select", {});
    };
    /**
     * 根据id查询所有的技术职务
     *
     */
    ApiUserSysStaffTitleDict.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffTitleDict.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加技术职务
     *
     */
    ApiUserSysStaffTitleDict.insert = function (jobDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffTitleDict.baseUrl, "insert", { jobDict: jobDict });
    };
    /**
     * 更新技术职务
     *
     */
    ApiUserSysStaffTitleDict.update = function (titleDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffTitleDict.baseUrl, "update", { titleDict: titleDict });
    };
    /**
     * 技术职务作废
     *
     */
    ApiUserSysStaffTitleDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysStaffTitleDict.baseUrl, "delete", { id: id });
    };
    ApiUserSysStaffTitleDict.baseUrl = '/sysStaff/titleDictController/';
    return ApiUserSysStaffTitleDict;
}());
exports.ApiUserSysStaffTitleDict = ApiUserSysStaffTitleDict;
/**
 * 群伤事件控制器
 * Created by 毛琪 on 2017/5/3.
 */
var ApiUserSysTriageInjuryEvent = /** @class */ (function () {
    function ApiUserSysTriageInjuryEvent() {
    }
    /**
     * 根据主键查询群伤事件
     *
     */
    ApiUserSysTriageInjuryEvent.findGIById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "findGIById", { id: id });
    };
    /**
     * 根据事件时间段和概要/备注/类型模糊查询
     *
     */
    ApiUserSysTriageInjuryEvent.findGILike = function (startDate, endDate, likeName) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "findGILike", { startDate: startDate, endDate: endDate, likeName: likeName });
    };
    /**
     * 根据事件id查询患者
     *
     */
    ApiUserSysTriageInjuryEvent.findPvById = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "findPvById", { id: id });
    };
    /**
     * 根据患者id查询分诊记录
     *
     */
    ApiUserSysTriageInjuryEvent.findTrByPvId = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "findTrByPvId", { pvId: pvId });
    };
    /**
     * 添加群伤事件
     *
     */
    ApiUserSysTriageInjuryEvent.save = function (mhGroupInjury) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "save", { mhGroupInjury: mhGroupInjury });
    };
    /**
     * 修改群伤事件
     *
     */
    ApiUserSysTriageInjuryEvent.updateGI = function (mhGroupInjury) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "updateGI", { mhGroupInjury: mhGroupInjury });
    };
    /**
     * 根据主键删除群伤事件
     *
     */
    ApiUserSysTriageInjuryEvent.deleteGI = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "deleteGI", { id: id });
    };
    /**
     * 删除群伤患者
     *
     */
    ApiUserSysTriageInjuryEvent.deletePvTr = function (pvId) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "deletePvTr", { pvId: pvId });
    };
    /**
     * 查询群伤事件下群伤人数
     *
     */
    ApiUserSysTriageInjuryEvent.findPvMans = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageInjuryEvent.baseUrl, "findPvMans", { id: id });
    };
    ApiUserSysTriageInjuryEvent.baseUrl = '/sysTriage/injuryEvent/';
    return ApiUserSysTriageInjuryEvent;
}());
exports.ApiUserSysTriageInjuryEvent = ApiUserSysTriageInjuryEvent;
/**
 * 新分诊查询控制器
 * Created by 毛琪 on 2017/5/3.
 */
var ApiUserSysTriageNew = /** @class */ (function () {
    function ApiUserSysTriageNew() {
    }
    /**
     * 查询所有身份
     */
    ApiUserSysTriageNew.findAllIdtity = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageNew.baseUrl, "findAllIdtity", {});
    };
    /**
     * 查询所有费别
     */
    ApiUserSysTriageNew.findAllCt = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageNew.baseUrl, "findAllCt", {});
    };
    /**
     * 查询所有民族
     */
    ApiUserSysTriageNew.findAllNation = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageNew.baseUrl, "findAllNation", {});
    };
    /**
     * 查询所有病情原因
     */
    ApiUserSysTriageNew.findAllCr = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageNew.baseUrl, "findAllCr", {});
    };
    /**
     * 根据身份inputCode进行模糊查询
     *
     */
    ApiUserSysTriageNew.findIdtityLike = function (inputCode) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageNew.baseUrl, "findIdtityLike", { inputCode: inputCode });
    };
    /**
     * 根据民族inputCode进行模糊查询
     *
     */
    ApiUserSysTriageNew.findNationLike = function (inputCode) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageNew.baseUrl, "findNationLike", { inputCode: inputCode });
    };
    ApiUserSysTriageNew.baseUrl = '/sysTriage/NewTriage/';
    return ApiUserSysTriageNew;
}());
exports.ApiUserSysTriageNew = ApiUserSysTriageNew;
var ApiUserSysTriageDict = /** @class */ (function () {
    function ApiUserSysTriageDict() {
    }
    /**
     * 查询分诊级别更改理由字典表
     */
    ApiUserSysTriageDict.select = function () {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageDict.baseUrl, "select", {});
    };
    /**
     * 根据id查询分诊级别更改理由字典表
     *
     */
    ApiUserSysTriageDict.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageDict.baseUrl, "selectid", { id: id });
    };
    /**
     * 添加分诊级别更改理由字典表
     *
     */
    ApiUserSysTriageDict.insert = function (reasonDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageDict.baseUrl, "insert", { reasonDict: reasonDict });
    };
    /**
     * 修改分诊级别更改理由字典表的数据
     *
     */
    ApiUserSysTriageDict.update = function (reasonDict) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageDict.baseUrl, "update", { reasonDict: reasonDict });
    };
    /**
     * 根据id删除分诊级别更改理由字典表数据
     *
     *           Created by 黄倩 on 2017/9/1.
     */
    ApiUserSysTriageDict.delete = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserSysTriageDict.baseUrl, "delete", { id: id });
    };
    ApiUserSysTriageDict.baseUrl = '/sysTriage/sysTriageDictController/';
    return ApiUserSysTriageDict;
}());
exports.ApiUserSysTriageDict = ApiUserSysTriageDict;
/**
 * 工作人员用户管理
 * Created by Vinsher on 2017/4/24.
 * Changed by jahv on 2017年12月02日21:30:17
 */
var ApiUserManager = /** @class */ (function () {
    function ApiUserManager() {
    }
    /**
     * 查询所有用户
     */
    ApiUserManager.findAllUser = function () {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "findAllUser", {});
    };
    /**
     * 根据id查询工作人员的用户信息
     *
     */
    ApiUserManager.selectid = function (id) {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "selectid", { id: id });
    };
    /**
     * 根据条件查询工作人员的信息并进行分页
     *
     */
    ApiUserManager.select = function (inputname, job, startIndex, pageSize) {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "select", { inputname: inputname, job: job, startIndex: startIndex, pageSize: pageSize });
    };
    /**
     * 删除用户
     *
     */
    ApiUserManager.deleteUser = function (userList) {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "deleteUser", { userList: userList });
    };
    /**
     * 增加用户
     *
     */
    ApiUserManager.addUserOne = function (userOne) {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "addUserOne", { userOne: userOne });
    };
    /**
     * 修改用户信息
     *
     */
    ApiUserManager.upDateUserOne = function (userOne) {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "upDateUserOne", { userOne: userOne });
    };
    /**
     * 添加工作人员的字典数据
     */
    ApiUserManager.selectDict = function () {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "selectDict", {});
    };
    /**
     * 修改密码
     *
     */
    ApiUserManager.updatePassword = function (pass1, pass2) {
        return api_1.apiUtil.connection("POST", ApiUserManager.baseUrl, "updatePassword", { pass1: pass1, pass2: pass2 });
    };
    ApiUserManager.baseUrl = '/user/manager/';
    return ApiUserManager;
}());
exports.ApiUserManager = ApiUserManager;
/**
 * Created by 黄倩 on 2017/8/5.
 * 医生工作量统计
 */
var ApiWorkAmount = /** @class */ (function () {
    function ApiWorkAmount() {
    }
    ApiWorkAmount.select = function (start, end) {
        return api_1.apiUtil.connection("POST", ApiWorkAmount.baseUrl, "select", { start: start, end: end });
    };
    ApiWorkAmount.baseUrl = '/workAmount/workAmountController/';
    return ApiWorkAmount;
}());
exports.ApiWorkAmount = ApiWorkAmount;
/**
 * 对外接口wss 控制器
 * Created by 包国强 on 2017/6/26.
 */
var ApiWss = /** @class */ (function () {
    function ApiWss() {
    }
    /**
     * 调用wss接口
     *
     */
    ApiWss.loadWss = function (action, message) {
        return api_1.apiUtil.connection("POST", ApiWss.baseUrl, "loadWss", { action: action, message: message });
    };
    ApiWss.baseUrl = '/wss/wss/';
    return ApiWss;
}());
exports.ApiWss = ApiWss;
