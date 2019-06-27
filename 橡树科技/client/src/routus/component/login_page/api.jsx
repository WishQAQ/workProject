//公用部分
import qs from "qs"
const API = {
  selectHospitals: '/dict/findAllHospital',       //查询所有的医院
  selectRoles: '/infrastructure/LoginController/getRoleList',//查询角色列表
  login: '/infrastructure/LoginController/login',//登录
  selectGrant: '/system/systems/selectGrantsList',     //查询拥有权限点信息（菜单）
};


const api = {
  //查询医院字典表
  loadHospitals: (callback) => {
    fetch(API.selectHospitals,
      {method: "POST"}).then(res => {
      if (res.success) {
        callback(res.data)
      }
      else {
        console.error("response error", res);
      }
    });
  },
  //查询角色列表
  selectRoles: (dataPack, callback) => {
    fetch(API.selectRoles,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },  //登录
  login: (dataPack, callback) => {
    fetch(API.login,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      callback(res);
    });
  },  //查询权限
  selectGrant: (dataPack, callback) => {
    fetch(API.selectGrant,
      {method: "POST", body: qs.stringify(dataPack)}).then(res => {
      if (res.success) {
        callback(res.data)
      }
      else {
        console.error("response error", res);
      }
    });
  },
};

export default api
