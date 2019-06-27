//公用部分
import moment from "moment";
import qs from "qs"

const API = {
    //  identify:{reqId:'12',code:'hsp1-wss',user:'admin',password:'1'},
    selectHospitals: '/dict/findAllHospital',       //查询所有的医院
    selectDept: '/dict/findAllDeptDict',           //查询所有的科室
    rest: '/wss/wss/loadWss',                       //院长查询接口
    changeRole: '/infrastructure/LoginController/changeRole',         //改变角色
    selectHospitalsInfo: '/medicalReform/HspYg/getSingleHositalInfo',  //查询数据
    selectGrant: '/system/systems/selectGrantsList',     //查询拥有权限点信息（菜单）
    selectMenu: '/system/systems/selectMenu',   //查询菜单
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
    loadDept: (callback) => {
        fetch(API.selectDept,
            {method: "POST"}).then(res => {
            if (res.success) {
                callback(res.data)
            }
            else {
                console.error("response error", res);
            }
        });
    },
    //门诊挂号量、门诊处方
    selRest: (dataPack, callback) => {
        dataPack.message = JSON.stringify(dataPack.message);
        // dataPack.identify = JSON.stringify(API.identify);
        fetch(API.rest,
            {method: "POST", body: qs.stringify(dataPack)}).then(res => {
            callback(res)
            /* if (res.success) {
               callback(res.data)
             }
             else {
               console.error("response error", res);
             }*/
        });
    },
    //改变角色
    changeRole: (dataPack, callback) => {
        fetch(API.changeRole,
            {method: "POST", body: qs.stringify(dataPack)}).then(res => {
            callback(res);
        });
    },

    //查询首页图表总的详细信息
    selDetail: (dataPack, callback) => {
        callback(data.detail)
    },
    //查询权限
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
    //查询门诊处方的图表
    selOutPaPre: (dataPack, callback) => {
        callback(data.outPatient)
    },
    //查询出入院流量统计
    selOutIn: (dataPack, callback) => {
        callback(data.outIn)
    },
    //查询患者信息统计
    selPatInfo: (dataPack, callback) => {
        callback(data.patInfoStatic)
    },
    //查询费用明细
    selCost: (dataPack, callback) => {
        callback(data.detOfCharge)
    },
};

export default api