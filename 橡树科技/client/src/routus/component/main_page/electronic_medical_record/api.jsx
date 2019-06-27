//公用部分
import moment from "moment";
import qs from "qs"
import {message} from 'antd'

const API = {
    patientInfo: '/caseHistory/patientBaseInfo/loadPatientInfo',
    loadClinicRecList: '/caseHistory/patientBaseInfo/loadClinicRecList',
    loadData: '/wss/wss/loadWss',
    loadData1: '/wss/wss/loadWss1',
};

const api = {
    //查询患者信息(可能返回多个或一个)
    loadPatientInfo: (dataPack, callback) => {
        fetch(API.patientInfo,
            {method: "POST", body: qs.stringify(dataPack)}).then(res => {
            callback(res);
            /* if (res.success) {
               callback(res.data)
             }
             else {
               message.warning(res.msg);
               //console.error("response error", res);
             }*/
        });
    },
    //查询单个患者信息
    loadClinicRecList: (dataPack, callback) => {
        fetch(API.loadClinicRecList,
            {method: "POST", body: qs.stringify(dataPack)}).then(res => {
            callback(res);
            /*  if (res.success) {
                callback(res.data)
              }
              else {
                message.warning(res.msg);
                //console.error("response error", res);
              }*/
        });
    },
    //查询信息
    loadData: (param, callback) => {
        param.message = JSON.stringify(param.message);
        fetch(API.loadData, {method: "POST", body: qs.stringify(param)}).then(response => {
            callback(response);
            /* if (response.success) {
              callback(response.data)
             } else {
               message.warning(response.msg);
             }*/
        });
    }, //查询信息
    loadData1: (param, callback) => {
        param.message = JSON.stringify(param.message);
        fetch(API.loadData1, {method: "POST", body: qs.stringify(param)}).then(response => {
            callback(response);
            /* if (response.success) {
              callback(response.data)
             } else {
               console.error("response error", response);
             }*/
        });
    },
    //给数组添加唯一的key
    addArrKey: (arr) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i]['key'] = i;
        }
        return arr;
    },
};

export default api