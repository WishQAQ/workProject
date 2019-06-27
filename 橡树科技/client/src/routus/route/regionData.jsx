import {Grading} from "../component/main_page/electronic_medical_record/content/grading";
import {HistoryWorkOrder} from "../component/main_page/work_order/historyWorkOrder";
import {Statistics} from "../component/main_page/work_order/statistics";

export default [{
  path: '/regionData/hospitalExpenses',// 门诊挂号量统计
  component: require('../component/main_page/content/hospitalExpenses').HospitalExpenses
},
  {
    path: '/regionData/outPatientPrescriptions',    //门诊处方
    component: require('../component/main_page/content/outpatientPrescriptions').OutpatientPrescriptions,
  },
  {
    path: '/regionData/outEnStatic',    //出入院流量统计
    component: require('../component/main_page/content/outEnStatic').OutEnStatic,
  }, {
    path: '/regionData/costDetStatic',    //费用明细汇总
    component: require('../component/main_page/content/costDetStatic').CostDetStatic,
  },
  {
    path: '/regionData/patInfoStatic',    //患者信息
    component: require('../component/main_page/content/patInfoStatic').PatInfoStatic,
  }, {
    path: '/regionData/detOfCharge',    //门诊费用明细
    component: require('../component/main_page/content/detOfCharge').Cost,
  }, {
    path: '/regionData/eleMedical',    //电子病历共享
    component: require('../component/main_page/electronic_medical_record/index1').EleMedical,
  },{

    path: '/regionData/grading',    //分级诊疗
    component: require('../component/main_page/electronic_medical_record/content/grading').Grading,
},{
        path: '/regionData/temporary',    //临检分诊
        component: require('../component/main_page/electronic_medical_record/content/temporary').Temporary,
    },{
        path: '/regionData/temporaryConfirm',    //临检分诊确认
        component: require('../component/main_page/electronic_medical_record/content/temporaryConfirm').TemporaryConfirm,
    },{
    path: '/regionData/referral',    //就转诊
    component: require('../component/main_page/referral/index').Referral,
  },
  {
    path: '/regionData/permissionSettings',    //权限设置
    component: require('../component/main_page/permissions_settings/index').PermissionsSettings,
  },
    {
        path: '/regionData/workOrder',    //我的工单
        component: require('../component/main_page/work_order/workOrder').WorkOrder,
    },
    {
        path: '/regionData/historyWorkOrder',    //历史工单
        component: require('../component/main_page/work_order/historyWorkOrder').HistoryWorkOrder,
    },
    {
        path: '/regionData/statistics',    //统计信息
        component: require('../component/main_page/work_order/statistics').Statistics,
    }];
