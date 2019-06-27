//公用部分
import moment from "moment";
import qs from "qs";
import data from './data'

const API = {
    selectHospitals: '/dict/findAllHospital',      //查询所有的医院
    selectHospitalsInfo: '/medicalReform/HspYg/getSingleHositalInfo'  //查询数据
};

const api = {
    //查询医院字典表
    loadHospitals: (callback) => {
        callback(data.hospitals)
        /* fetch(API.selectHospitals,
         {method: "POST"}).then(res => {
         if (res.success) {
         callback(res.data)
         }
         else {
         console.error("response error", res);
         }
         });*/
    },
    selectHospitalsInfo: (dataPack, callback) => {
        callback(data.year)
        /* fetch(API.selectHospitalsInfo,
         {method: "POST", body: qs.stringify(dataPack)}).then(res => {
         if (res.success) {
         callback(res.data)
         }
         else {
         console.error("response error", res);
         }
         });*/
    }
};

export default api