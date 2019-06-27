import qs from "qs"
const API = {
  selectHospitals: '/dict/findAllHospital',       //查询医院字典表
  findAllDoctorTitleDict: '/dict/findAllDoctorTitleDict',//职称字典表
  findAllJobClassDict: '/dict/findAllJobClassDict',//工作字典表
  fuzzyUser: '/infrastructure/userDict/fuzzyUser',//人员信息
  hospitalInfo: '/infrastructure/hospitalConfig/fuzzyHospitalConfig',//医院信息
  // hospitalInfo: '/workOrders/findDeptByCompanyNo',
  peopleInfo: '/infrastructure/userDict/insertUser',//人员信息增加、修改
  deleteUser: '/infrastructure/userDict/deleteUser',//人员信息删除

  deleteHospital: '/infrastructure/userDict/', // 医院信息删除  ？

  fuzzyRole: '/infrastructure/roleDict/fuzzyRole',//角色信息
  insertRole: '/infrastructure/roleDict/insertRole',//新增、修改角色信息
  deleteRole: '/infrastructure/roleDict/deleteRole',//角色删除
  selectMenuDict: '/infrastructure/menuDict/selectMenuDict',//查询所有菜单
  fuzzyMenuDict: '/infrastructure/menuDict/fuzzyMenuDict',//菜单字典
  insertMenuDict: '/infrastructure/menuDict/insertMenuDict',//菜单字典新增、修改
  deleteMenuDict: '/infrastructure/menuDict/deleteMenuDict',//菜单字典删除
  fuzzyGrantsDict: '/infrastructure/grantsDict/fuzzyGrantsDict',//权限点
  save: '/infrastructure/grantsDict/save',//权限点新增
  update: '/infrastructure/grantsDict/update',//权限点修改
  delete: '/infrastructure/grantsDict/delete',//权限点删除
  rolePoint: '/infrastructure/roleDict/selectRoleInfo',//角色权限配置
  configuration: '/infrastructure/roleDict/configuration',//角色权限配置
  roleVsHospital: '/infrastructure/userDict/roleVsHospital',//根据用户id查询医院/角色信息
  selectctChecked: '/infrastructure/userDict/selectctChecked',//配置用户权限  查询拥有的菜单、权限
  savaUser: '/infrastructure/userDict/savaUser',//配置用户权限 保存
  selectMneuHierarchy:'/infrastructure/menuDict/selectMneuHierarchy',//模糊查询角色
};

const api = {
  /**
   * 查询医院字典表
   * @param callback 回调
   */
  loadHospitals: (callback) => {
    fetch(API.selectHospitals,
      {method: "POST"}).then(res => {
      callback(res);
    });
  },
  /**
   * 查询职称字典表
   * @param callback
   */
  findAllDoctorTitleDict: (callback) => {
    fetch(API.findAllDoctorTitleDict,
      {method: "POST"}).then(res => {
      callback(res);
    });
  },
  /**
   * 查询工作字典表
   * @param callback
   */
  findAllJobClassDict: (callback) => {
    fetch(API.findAllJobClassDict,
      {method: "POST"}).then(res => {
      callback(res);
    });
  },
  /**
   * 人员信息
   * @param dataPack
   * @param callback
   */
  loadFuzzyUser: (dataPack, callback) => {
    fetch(API.fuzzyUser,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 医院信息
   * @param dataPack
   * @param callback
   */
  loadHospitalInfo: (dataPack, callback) => {
    fetch(API.hospitalInfo,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
    /**
     * 删除选中的医院信息
     * @param dataPack
     * @param callback
     */
  deleteHospitalInfo: (dataPack, callback) => {
        fetch(API.deleteHospital,
            {method: "POST", body: qs.stringify(dataPack)}).then(res => {
            callback(res);
        });
  },

  /**
   * 人员信息增加、修改
   * @param dataPack
   * @param callback
   */

  insertRole: (dataPack, callback) => {
    fetch(API.insertRole,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  deletePeople: (dataPack, callback) => {
    fetch(API.deleteUser,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 角色信息
   * @param dataPack
   * @param callback
   */
  fuzzyRole: (dataPack, callback) => {
    fetch(API.fuzzyRole,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 角色信息 ——权限配置
   * @param dataPack
   * @param callback
   */
  rolePoint: (dataPack, callback) => {
    fetch(API.rolePoint,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 角色信息 ——权限配置保存
   * @param dataPack
   * @param callback
   */
  configuration: (dataPack, callback) => {
    fetch(API.configuration,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 角色信息增加、修改
   * @param dataPack
   * @param callback
   */
  peopleInfo: (dataPack, callback) => {
    fetch(API.peopleInfo,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 角色信息删除
   * @param dataPack
   * @param callback
   */
  deleteRole: (dataPack, callback) => {
    fetch(API.deleteRole,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 菜单字典
   * @param dataPack
   * @param callback
   */
  fuzzyMenuDict: (dataPack, callback) => {
    fetch(API.fuzzyMenuDict,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 查询所有菜单——菜单字典
   * @param callback
   */
  selectMenuDict: (callback) => {
    fetch(API.selectMenuDict,
      {method: "POST"}).then(res => {
      callback(res);
    });
  },
  /**
   * 菜单字典增加、修改
   * @param dataPack
   * @param callback
   */
  insertMenuDict: (dataPack, callback) => {
    fetch(API.insertMenuDict,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 菜单字典删除
   * @param dataPack
   * @param callback
   */
  deleteMenuDict: (dataPack, callback) => {
    fetch(API.deleteMenuDict,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 权限点
   * @param dataPack
   * @param callback
   */
  fuzzyGrantsDict: (dataPack, callback) => {
    fetch(API.fuzzyGrantsDict,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 权限点新增
   * @param dataPack
   * @param callback
   */
  save: (dataPack, callback) => {
    fetch(API.save,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 权限点修改
   * @param dataPack
   * @param callback
   */
  update: (dataPack, callback) => {
    fetch(API.update,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 权限点删除
   * @param dataPack
   * @param callback
   */
  deletePoint: (dataPack, callback) => {
    fetch(API.delete,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 根据用户id查询医院/角色信息
   * @param dataPack
   * @param callback
   */
  roleVsHospital: (dataPack, callback) => {
    fetch(API.roleVsHospital,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 配置用户权限
   * @param dataPack
   * @param callback
   */
  selectctChecked: (dataPack, callback) => {
    fetch(API.selectctChecked,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 配置用户权限 保存
   * @param dataPack
   * @param callback
   */
  saveUser: (dataPack, callback) => {
    fetch(API.savaUser,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 模糊查询菜单
   * @param dataPack
   * @param callback
   */
  selectMneuHierarchy: (dataPack, callback) => {
    fetch(API.selectMneuHierarchy,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },
  /**
   * 给数组添加唯一的key
   * @param arr
   * @returns {*}
   */
  addArrKey: (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i]['key'] = i;
    }
    return arr;
  },
};

export default api