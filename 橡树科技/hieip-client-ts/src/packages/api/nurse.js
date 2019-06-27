"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var api_1 = require("../../tools/api");
/**
 * 创建人:黄倩
 * 创建时间:2018/2/6
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
        return api_1.medicalApi.connection("POST", ApiClassesExchange.baseUrl, "selecClasses", { page: page, name: name, state: state, begin: begin, end: end });
    };
    /**
     * 根据用户id查询调班申请记录
     *
     */
    ApiClassesExchange.select = function (page, id, state, begin, end) {
        return api_1.medicalApi.connection("POST", ApiClassesExchange.baseUrl, "select", { page: page, id: id, state: state, begin: begin, end: end });
    };
    /**
     * 调班记录审核
     *
     */
    ApiClassesExchange.updateState = function (exchangeClasses) {
        return api_1.medicalApi.connection("POST", ApiClassesExchange.baseUrl, "updateState", { exchangeClasses: exchangeClasses });
    };
    /**
     * 调班申请
     *
     */
    ApiClassesExchange.save = function (exchangeClasses) {
        return api_1.medicalApi.connection("POST", ApiClassesExchange.baseUrl, "save", { exchangeClasses: exchangeClasses });
    };
    /**
     * 作废调班申请
     *
     */
    ApiClassesExchange.delete = function (idList) {
        return api_1.medicalApi.connection("POST", ApiClassesExchange.baseUrl, "delete", { idList: idList });
    };
    ApiClassesExchange.baseUrl = '/classes/exchangeClasses/';
    return ApiClassesExchange;
}());
exports.ApiClassesExchange = ApiClassesExchange;
/**
 * 分组维护
 * Created by 黄倩
 * on 2018/1/31
 */
var ApiClassesGroupTitleDict = /** @class */ (function () {
    function ApiClassesGroupTitleDict() {
    }
    /**
     * 查询所有职称
     */
    ApiClassesGroupTitleDict.finAll = function () {
        return api_1.medicalApi.connection("POST", ApiClassesGroupTitleDict.baseUrl, "finAll", {});
    };
    ApiClassesGroupTitleDict.baseUrl = '/classes/groupTitleDict/';
    return ApiClassesGroupTitleDict;
}());
exports.ApiClassesGroupTitleDict = ApiClassesGroupTitleDict;
/**
 * 分组维护
 * Created by 黄倩
 * on 2018/1/31
 */
var ApiClassesNurseGroupDict = /** @class */ (function () {
    function ApiClassesNurseGroupDict() {
    }
    /**
     * 新增/更新分组信息
     */
    ApiClassesNurseGroupDict.save = function (nurseGroupDict, nurseGroupVsClasses) {
        return api_1.medicalApi.connection("POST", ApiClassesNurseGroupDict.baseUrl, "save", { nurseGroupDict: nurseGroupDict, nurseGroupVsClasses: nurseGroupVsClasses });
    };
    /**
     * 作废分组信息
     */
    ApiClassesNurseGroupDict.delete = function (id) {
        return api_1.medicalApi.connection("POST", ApiClassesNurseGroupDict.baseUrl, "delete", { id: id });
    };
    /**
     * 模糊查询分组信息
     */
    ApiClassesNurseGroupDict.finAll = function (nursingCode, name, page) {
        return api_1.medicalApi.connection("POST", ApiClassesNurseGroupDict.baseUrl, "finAll", { nursingCode: nursingCode, name: name, page: page });
    };
    /**
     *  根据护理单元查班段信息和根据分组id查询允许使用班段信息
     */
    ApiClassesNurseGroupDict.finBygroupClasses = function (groupId, nursingCode) {
        return api_1.medicalApi.connection("POST", ApiClassesNurseGroupDict.baseUrl, "finBygroupClasses", { groupId: groupId, nursingCode: nursingCode });
    };
    /**
     * 根据护理单元查询人员信息
     */
    ApiClassesNurseGroupDict.finByGroupVsStaff = function (nursingCode, name, groupId) {
        return api_1.medicalApi.connection("POST", ApiClassesNurseGroupDict.baseUrl, "finByGroupVsStaff", { nursingCode: nursingCode, name: name, groupId: groupId });
    };
    /**
     * 保存分组下的人员信息
     */
    ApiClassesNurseGroupDict.saveGroupVsStaff = function (groupVsStaffs, groupId) {
        return api_1.medicalApi.connection("POST", ApiClassesNurseGroupDict.baseUrl, "saveGroupVsStaff", { groupVsStaffs: groupVsStaffs, groupId: groupId });
    };
    ApiClassesNurseGroupDict.baseUrl = '/classes/nurseGroupDict/';
    return ApiClassesNurseGroupDict;
}());
exports.ApiClassesNurseGroupDict = ApiClassesNurseGroupDict;
/**
 * 班段维护
 * Created by 黄倩
 * on 2018/1/30
 */
var ApiClassesSchedulingDict = /** @class */ (function () {
    function ApiClassesSchedulingDict() {
    }
    /**
     * 更新/新增班段信息
     */
    ApiClassesSchedulingDict.save = function (classesDict) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingDict.baseUrl, "save", { classesDict: classesDict });
    };
    /**
     * 模糊查询班段信息
     */
    ApiClassesSchedulingDict.finAll = function (name, nursingCode, type, isTwo, page) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingDict.baseUrl, "finAll", { name: name, nursingCode: nursingCode, type: type, isTwo: isTwo, page: page });
    };
    /**
     * 作废班段信息
     */
    ApiClassesSchedulingDict.delete = function (idList) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingDict.baseUrl, "delete", { idList: idList });
    };
    /**
     * 根据id删除班段信息
     */
    ApiClassesSchedulingDict.deleteId = function (id) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingDict.baseUrl, "deleteId", { id: id });
    };
    /**
     *  根据护理单元code查询班段信息
     */
    ApiClassesSchedulingDict.finByWardCode = function (nursingCode) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingDict.baseUrl, "finByWardCode", { nursingCode: nursingCode });
    };
    ApiClassesSchedulingDict.baseUrl = '/classes/schedulingClassesDict/';
    return ApiClassesSchedulingDict;
}());
exports.ApiClassesSchedulingDict = ApiClassesSchedulingDict;
/**
 * 排班
 * Created by 黄倩
 * on 2018/1/30
 */
var ApiClassesSchedulingIndex = /** @class */ (function () {
    function ApiClassesSchedulingIndex() {
    }
    /**
     *  排班查询
     */
    ApiClassesSchedulingIndex.finAll = function (currentTime, nursingCode) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingIndex.baseUrl, "finAll", { currentTime: currentTime, nursingCode: nursingCode });
    };
    /**
     *  排班打印
     */
    ApiClassesSchedulingIndex.finSheduling = function (parentId, nursingCode, currentTime) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingIndex.baseUrl, "finSheduling", { parentId: parentId, nursingCode: nursingCode, currentTime: currentTime });
    };
    /**
     *   排班保存
     */
    ApiClassesSchedulingIndex.save = function (schedulingIndices) {
        return api_1.medicalApi.connection("POST", ApiClassesSchedulingIndex.baseUrl, "save", { schedulingIndices: schedulingIndices });
    };
    ApiClassesSchedulingIndex.baseUrl = '/classes/schedulingIndex/';
    return ApiClassesSchedulingIndex;
}());
exports.ApiClassesSchedulingIndex = ApiClassesSchedulingIndex;
/**
 * 护理单元
 * Created by 黄倩
 * on 2018/1/31
 */
var ApiDictDictionaries = /** @class */ (function () {
    function ApiDictDictionaries() {
    }
    /**
     * 查询工作人员用户的工作范围
     */
    ApiDictDictionaries.finStaffVsGroup = function () {
        return api_1.medicalApi.connection("POST", ApiDictDictionaries.baseUrl, "finStaffVsGroup", {});
    };
    ApiDictDictionaries.baseUrl = '/dict/dictionaries/';
    return ApiDictDictionaries;
}());
exports.ApiDictDictionaries = ApiDictDictionaries;
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 护理记录单配置表Controller
 */
var ApiRecordNursing = /** @class */ (function () {
    function ApiRecordNursing() {
    }
    /**
     * 新增护理记录单配置主表
     */
    ApiRecordNursing.save = function (nuringRecordConfigMater) {
        return api_1.medicalApi.connection("POST", ApiRecordNursing.baseUrl, "save", { nuringRecordConfigMater: nuringRecordConfigMater });
    };
    /**
     * 查询所有科室
     */
    ApiRecordNursing.findAllDeptDict = function () {
        return api_1.medicalApi.connection("POST", ApiRecordNursing.baseUrl, "findAllDeptDict", {});
    };
    /**
     * 查询护理记录单主配置表
     */
    ApiRecordNursing.findNurseRecordConfigMater = function (page, recordType, type, recordName) {
        return api_1.medicalApi.connection("POST", ApiRecordNursing.baseUrl, "findNurseRecordConfigMater", { page: page, recordType: recordType, type: type, recordName: recordName });
    };
    /**
     * 删除护理记录单主配置表(物理删除 is_delete字段修改成0)
     */
    ApiRecordNursing.deleteNurseRecordConfigMater = function (ids) {
        return api_1.medicalApi.connection("POST", ApiRecordNursing.baseUrl, "deleteNurseRecordConfigMater", { ids: ids });
    };
    ApiRecordNursing.baseUrl = '/record/NursingRecord/';
    return ApiRecordNursing;
}());
exports.ApiRecordNursing = ApiRecordNursing;
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 护理记录单明细表Controller
 */
var ApiRecordNursingDetail = /** @class */ (function () {
    function ApiRecordNursingDetail() {
    }
    /**
     * 新增和修改护理记录单明细表
     */
    ApiRecordNursingDetail.updateNursingRecordDetail = function (nurseRecordConfigDetail) {
        return api_1.medicalApi.connection("POST", ApiRecordNursingDetail.baseUrl, "updateNursingRecordDetail", { nurseRecordConfigDetail: nurseRecordConfigDetail });
    };
    /**
     * 删除护理记录单明细表，IS_DELETE字段改为0
     */
    ApiRecordNursingDetail.deletegRecordDetail = function (ids) {
        return api_1.medicalApi.connection("POST", ApiRecordNursingDetail.baseUrl, "deletegRecordDetail", { ids: ids });
    };
    /**
     * 根据护理记录单主配置表id，查询所有护理记录单明细表
     */
    ApiRecordNursingDetail.findAllByNurseRecordConfigMaterId = function (page, id) {
        return api_1.medicalApi.connection("POST", ApiRecordNursingDetail.baseUrl, "findAllByNurseRecordConfigMaterId", { page: page, id: id });
    };
    /**
     * 根据护理记录单明细表id，查询对应的明细表
     */
    ApiRecordNursingDetail.findNurseRecordConfigDetailById = function (id) {
        return api_1.medicalApi.connection("POST", ApiRecordNursingDetail.baseUrl, "findNurseRecordConfigDetailById", { id: id });
    };
    /**
     * 查询患者护理记录中所有可用的col字段
     */
    ApiRecordNursingDetail.findCoLs = function (id) {
        return api_1.medicalApi.connection("POST", ApiRecordNursingDetail.baseUrl, "findCoLs", { id: id });
    };
    /**
     * 查询护理记录单明细表中所有类型
     */
    ApiRecordNursingDetail.findAllType = function () {
        return api_1.medicalApi.connection("GET", ApiRecordNursingDetail.baseUrl, "findAllType", {});
    };
    ApiRecordNursingDetail.baseUrl = '/record/NursingRecordDetail/';
    return ApiRecordNursingDetail;
}());
exports.ApiRecordNursingDetail = ApiRecordNursingDetail;
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 患者护理记录Controller
 */
var ApiRecordPatientCare = /** @class */ (function () {
    function ApiRecordPatientCare() {
    }
    /**
     * 加载患者信息列表
     */
    ApiRecordPatientCare.findPatMasterIndexModel = function (page, name) {
        return api_1.medicalApi.connection("POST", ApiRecordPatientCare.baseUrl, "findPatMasterIndexModel", { page: page, name: name });
    };
    ApiRecordPatientCare.baseUrl = '/record/PatientCareRecord/';
    return ApiRecordPatientCare;
}());
exports.ApiRecordPatientCare = ApiRecordPatientCare;
/**
 * 创建人:徐庆
 * 创建时间:2018/3/6
 * 病人状态变化字典（换页事件）Controller
 */
var ApiRecordPatientStatusChg = /** @class */ (function () {
    function ApiRecordPatientStatusChg() {
    }
    /**
     * 查询所有换页事件
     */
    ApiRecordPatientStatusChg.findAll = function () {
        return api_1.medicalApi.connection("POST", ApiRecordPatientStatusChg.baseUrl, "findAll", {});
    };
    ApiRecordPatientStatusChg.baseUrl = '/record/PatientStatusChg/';
    return ApiRecordPatientStatusChg;
}());
exports.ApiRecordPatientStatusChg = ApiRecordPatientStatusChg;
/**
 * 创建人:黄倩
 * 创建时间:2018/2/6
 * 说明调班记录表信息Controller
 */
var ApiShiftChange = /** @class */ (function () {
    function ApiShiftChange() {
    }
    /**
     *  交接班字典信息
     */
    ApiShiftChange.shiftInfo = function (wardCode, date, begin, end) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "shiftInfo", { wardCode: wardCode, date: date, begin: begin, end: end });
    };
    /**
     * 根据条件查询交接班的信息
     */
    ApiShiftChange.finAllShiftInfo = function (time, wardCode, patientId, visitId, classesId) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finAllShiftInfo", { time: time, wardCode: wardCode, patientId: patientId, visitId: visitId, classesId: classesId });
    };
    /**
     * 条件改变查询交接班患者信息界面的信息
     */
    ApiShiftChange.finShiftByInfo = function (wardCode, date, begin, end, classesOpt) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finShiftByInfo", { wardCode: wardCode, date: date, begin: begin, end: end, classesOpt: classesOpt });
    };
    /**
     * 条件改变查询患者的交详情见面信息
     */
    ApiShiftChange.finAllShift = function (wardCode, date, begin, end, classesOpt) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finAllShift", { wardCode: wardCode, date: date, begin: begin, end: end, classesOpt: classesOpt });
    };
    /**
     *  条件改变查询患者交接信息界面
     */
    ApiShiftChange.finByshift = function (wardCode, date) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finByshift", { wardCode: wardCode, date: date });
    };
    /**
     * 查询交接班患者信息
     */
    ApiShiftChange.newShift = function (opt, deptCode, begin, end, name) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "newShift", { opt: opt, deptCode: deptCode, begin: begin, end: end, name: name });
    };
    /**
     *  查询患者信息
     */
    ApiShiftChange.finShiftVsPatient = function (opt, deptCode, name) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finShiftVsPatient", { opt: opt, deptCode: deptCode, name: name });
    };
    /**
     *   查询患者交接班的详情信息
     */
    ApiShiftChange.finShiftByRecord = function (wardCode, classesId, patientId, visitId, radio, time) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finShiftByRecord", { wardCode: wardCode, classesId: classesId, patientId: patientId, visitId: visitId, radio: radio, time: time });
    };
    /**
     *  交接班信息保存/更新
     */
    ApiShiftChange.save = function (shiftChangeMaster, patientLog, statistics) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "save", { shiftChangeMaster: shiftChangeMaster, patientLog: patientLog, statistics: statistics });
    };
    /**
     *  根据主表id查询患者交接信息
     */
    ApiShiftChange.finShiftByRecordInfo = function (shiftChangeId, wardCode, patientLogId) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "finShiftByRecordInfo", { shiftChangeId: shiftChangeId, wardCode: wardCode, patientLogId: patientLogId });
    };
    /**
     *  交班
     */
    ApiShiftChange.savaLastUpdateUser = function (mainId) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "savaLastUpdateUser", { mainId: mainId });
    };
    /**
     *  接班
     */
    ApiShiftChange.takeShift = function (mainId) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "takeShift", { mainId: mainId });
    };
    /**
     * 交接班打印
     */
    ApiShiftChange.shiftPrint = function (deptCode, currentTime) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "shiftPrint", { deptCode: deptCode, currentTime: currentTime });
    };
    /**
     *  修改患者交接班信息
     */
    ApiShiftChange.updatePatientLog = function (patient) {
        return api_1.medicalApi.connection("POST", ApiShiftChange.baseUrl, "updatePatientLog", { patient: patient });
    };
    ApiShiftChange.baseUrl = '/shift/shiftChange/';
    return ApiShiftChange;
}());
exports.ApiShiftChange = ApiShiftChange;
