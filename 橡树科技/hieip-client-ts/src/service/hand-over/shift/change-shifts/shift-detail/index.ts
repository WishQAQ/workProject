/**
 * 交接班下交班详情
 * Created by wx 2018.01.25
 */
import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {personModalService} from 'service/hand-over/shift/change-shifts/person-modal'

export interface ShiftDetailState {
    displayMode?: boolean,// 展示形式 true图形 false表格
    tableRowData?: Array<object>,// 表格中数据
    shiftTableData?: Array<any>,// 图表表格数据
    btnMenuShow?: boolean,// 控制交接班详情下拉选择框是否显示
    btnMenuData?:Array<any>,// 交接班详情下拉菜单数据
    btnMenuValue?:Array<any>,// 交接班详情下拉菜单值
}

class ShiftDetailService extends BaseService<ShiftDetailState> {
    tableApi ?: any
    defaultState = {
        displayMode: true,
        btnMenuShow: false,
        tableRowData: [
            {
                project: '轻度',
                bedNumber: 1,
                name: '张三',
                diagnose: '有慢性肠胃炎，肥胖症',
                morning: '心率:52 血压:58 体温:36 入液量:25 出液量:65 某某入院有什什么症状，这个那个嗯嗯消化良好肚子不痛肿块变小一切正常，减肥成功',
                afternoon: '心率:52 血压:58 体温:36 入液量:25 出液量:65 某某入院有什什么症状，这个那个嗯嗯消化良好肚子不痛肿块变小一切正常，减肥成功',
                night: '心率:52 血压:58 体温:36 入液量:25 出液量:65 某某入院有什什么症状，这个那个嗯嗯消化良好肚子不痛肿块变小一切正常，减肥成功'
            },
            {
                project: '轻度',
                bedNumber: 1,
                name: '张三',
                diagnose: '有慢性肠胃炎，肥胖症',
                morning: '心率:52 血压:58 体温:36 入液量:25 出液量:65 某某入院有什什么症状，',
                afternoon: '心率:52 血压:58 体温:36 入液量:25 出液量:65 某某入院有什什么症状，这个那个嗯嗯消化',
                night: '心率:52 血压:58 体温:36 入液量:25 出液量:65 某某入院有什什么症状，这个那个嗯嗯消化良好肚子不痛肿块变小一肥成功'
            },
            {
                project: '轻度',
                bedNumber: 1,
                name: '张三',
                diagnose: '有慢性肠胃炎，肥胖症',
                morning: '心率:52 血压:58 体温:36 入液量:25 出液量:65',
                afternoon: '心率:52 血压:58 体温:36 入液量:25 出液量:65',
                night: '心率:52 血压:58 体温:36 入液量:25 出液量:65'
            },
        ],
        shiftTableData: [],
        btnMenuData:[
            {
                name:'早班',
                key:'1',
            },
            {
                name:'大夜班',
                key:'2',
            },
            {
                name:'小夜班',
                key:'3',
            },
        ],
        btnMenuValue:[]
    }

    /**
     * 页面加载执行
     */
    serviceWillMount() {
        let {btnMenuData} = this.state
        let btnMenuValue=[]
        let shiftTableData = [
            {
                shift: '早班',
                shiftKey: '1',
                fireControl: '值班医师',
                hasChild: true,
                groupChild: [
                    {
                        groupName: '1组',
                        hasChild: true,
                        groupChild: [
                            {
                                groupName: '1-1组',
                                hasChild: false,
                                child: [
                                    {
                                        name: '张三',
                                        bedNum: 1,
                                        illnessState: 1,
                                        examinePro: '照片检查骨骼',
                                        examineTime: new Date(),
                                        examineDoctor: '刘敏'
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 2,
                                        illnessState: 1,
                                        examinePro: '照片检查骨骼',
                                        examineTime: new Date(),
                                        examineDoctor: '陈道明'
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 3,
                                        illnessState: 3,
                                        operationPro: '手术',
                                        operationTime: new Date(),
                                        operationDoctor: '漳卅'
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 4,
                                        illnessState: 1,
                                        examinePro: '检查B超',
                                        examineTime: new Date(),
                                        examineDoctor: '陈英'
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 5,
                                        illnessState: 3,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 6,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 7,
                                        illnessState: 2,
                                    },
                                    {
                                        name: '张三',
                                        bedNum: 8,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 9,
                                        illnessState: 3,
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 10,
                                        illnessState: 1
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 11,
                                        illnessState: 1
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 12,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 13,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 14,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 15,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 16,
                                        illnessState: 4,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 17,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '张三',
                                        bedNum: 18,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 19,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 20,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 21,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 22,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 23,
                                        illnessState: 1,
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        groupName: '2组',
                        hasChild: false,
                        child: [
                            {
                                name: '张三',
                                bedNum: 1,
                                illnessState: 1,
                                examinePro: '照片检查骨骼',
                                examineTime: new Date(),
                                examineDoctor: '刘敏'
                            },
                            {
                                name: '李四',
                                bedNum: 2,
                                illnessState: 1,
                                examinePro: '照片检查骨骼',
                                examineTime: new Date(),
                                examineDoctor: '陈道明'
                            },
                            {
                                name: '王五',
                                bedNum: 3,
                                illnessState: 3,
                                operationPro: '手术',
                                operationTime: new Date(),
                                operationDoctor: '漳卅'
                            },
                            {
                                name: '张小小',
                                bedNum: 4,
                                illnessState: 1,
                                examinePro: '检查B超',
                                examineTime: new Date(),
                                examineDoctor: '陈英'
                            },
                            {
                                name: '陈浩然',
                                bedNum: 5,
                                illnessState: 3,
                            },
                            {
                                name: '称开个',
                                bedNum: 6,
                                illnessState: 1,
                            },
                            {
                                name: '不知道撒名字',
                                bedNum: 7,
                                illnessState: 2,
                            },
                            {
                                name: '张三',
                                bedNum: 8,
                                illnessState: 1,
                            },
                            {
                                name: '李四',
                                bedNum: 9,
                                illnessState: 3,
                            },
                            {
                                name: '王五',
                                bedNum: 10,
                                illnessState: 1
                            },
                            {
                                name: '张小小',
                                bedNum: 11,
                                illnessState: 1
                            },
                            {
                                name: '陈浩然',
                                bedNum: 12,
                                illnessState: 1,
                            },
                            {
                                name: '称开个',
                                bedNum: 13,
                                illnessState: 1,
                            },
                            {
                                name: '不知道撒名字',
                                bedNum: 14,
                                illnessState: 1,
                            },
                            {
                                name: '陈浩然',
                                bedNum: 15,
                                illnessState: 1,
                            },
                            {
                                name: '称开个',
                                bedNum: 16,
                                illnessState: 4,
                            },
                            {
                                name: '不知道撒名字',
                                bedNum: 17,
                                illnessState: 1,
                            },
                            {
                                name: '张三',
                                bedNum: 18,
                                illnessState: 1,
                            },
                            {
                                name: '李四',
                                bedNum: 19,
                                illnessState: 1,
                            },
                            {
                                name: '王五',
                                bedNum: 20,
                                illnessState: 1,
                            },
                            {
                                name: '张小小',
                                bedNum: 21,
                                illnessState: 1,
                            },
                            {
                                name: '陈浩然',
                                bedNum: 22,
                                illnessState: 1,
                            },
                            {
                                name: '称开个',
                                bedNum: 23,
                                illnessState: 1,
                            },
                        ]
                    },
                ]
            },
            {
                shift: '小夜班',
                shiftKey:'2',
                fireControl: '值班医师',
                hasChild: true,
                groupChild: [
                    {
                        groupName: '3组',
                        hasChild: true,
                        groupChild: [
                            {
                                groupName: '3-1组',
                                hasChild: true,
                                groupChild: [
                                    {
                                        groupName: '3-1-1组',
                                        hasChild: false,
                                        child: [
                                            {
                                                name: '张三',
                                                bedNum: 1,
                                                illnessState: 1,
                                                examinePro: '照片检查骨骼',
                                                examineTime: new Date(),
                                                examineDoctor: '刘敏'
                                            },
                                            {
                                                name: '李四',
                                                bedNum: 2,
                                                illnessState: 1,
                                                examinePro: '照片检查骨骼',
                                                examineTime: new Date(),
                                                examineDoctor: '陈道明'
                                            },
                                            {
                                                name: '王五',
                                                bedNum: 3,
                                                illnessState: 3,
                                                operationPro: '手术',
                                                operationTime: new Date(),
                                                operationDoctor: '漳卅'
                                            },
                                            {
                                                name: '张小小',
                                                bedNum: 4,
                                                illnessState: 1,
                                                examinePro: '检查B超',
                                                examineTime: new Date(),
                                                examineDoctor: '陈英'
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 5,
                                                illnessState: 3,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 6,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '不知道撒名字',
                                                bedNum: 7,
                                                illnessState: 2,
                                            },
                                            {
                                                name: '张三',
                                                bedNum: 8,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '李四',
                                                bedNum: 9,
                                                illnessState: 3,
                                            },
                                            {
                                                name: '王五',
                                                bedNum: 10,
                                                illnessState: 1
                                            },
                                            {
                                                name: '张小小',
                                                bedNum: 11,
                                                illnessState: 1
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 12,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 13,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '不知道撒名字',
                                                bedNum: 14,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 15,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 16,
                                                illnessState: 4,
                                            },
                                            {
                                                name: '不知道撒名字',
                                                bedNum: 17,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '张三',
                                                bedNum: 18,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '李四',
                                                bedNum: 19,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '王五',
                                                bedNum: 20,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '张小小',
                                                bedNum: 21,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 22,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 23,
                                                illnessState: 1,
                                            },
                                        ]
                                    },
                                    {
                                        groupName: '3-1-2组',
                                        hasChild: false,
                                        child: [
                                            {
                                                name: '张三',
                                                bedNum: 1,
                                                illnessState: 1,
                                                examinePro: '照片检查骨骼',
                                                examineTime: new Date(),
                                                examineDoctor: '刘敏'
                                            },
                                            {
                                                name: '李四',
                                                bedNum: 2,
                                                illnessState: 1,
                                                examinePro: '照片检查骨骼',
                                                examineTime: new Date(),
                                                examineDoctor: '陈道明'
                                            },
                                            {
                                                name: '王五',
                                                bedNum: 3,
                                                illnessState: 3,
                                                operationPro: '手术',
                                                operationTime: new Date(),
                                                operationDoctor: '漳卅'
                                            },
                                            {
                                                name: '张小小',
                                                bedNum: 4,
                                                illnessState: 1,
                                                examinePro: '检查B超',
                                                examineTime: new Date(),
                                                examineDoctor: '陈英'
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 5,
                                                illnessState: 3,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 6,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '不知道撒名字',
                                                bedNum: 7,
                                                illnessState: 2,
                                            },
                                            {
                                                name: '张三',
                                                bedNum: 8,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '李四',
                                                bedNum: 9,
                                                illnessState: 3,
                                            },
                                            {
                                                name: '王五',
                                                bedNum: 10,
                                                illnessState: 1
                                            },
                                            {
                                                name: '张小小',
                                                bedNum: 11,
                                                illnessState: 1
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 12,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 13,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '不知道撒名字',
                                                bedNum: 14,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 15,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 16,
                                                illnessState: 4,
                                            },
                                            {
                                                name: '不知道撒名字',
                                                bedNum: 17,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '张三',
                                                bedNum: 18,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '李四',
                                                bedNum: 19,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '王五',
                                                bedNum: 20,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '张小小',
                                                bedNum: 21,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '陈浩然',
                                                bedNum: 22,
                                                illnessState: 1,
                                            },
                                            {
                                                name: '称开个',
                                                bedNum: 23,
                                                illnessState: 1,
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        groupName: '4组',
                        hasChild: true,
                        groupChild: [
                            {
                                groupName: '4-1组',
                                hasChild: false,
                                child: [
                                    {
                                        name: '张三',
                                        bedNum: 1,
                                        illnessState: 1,
                                        examinePro: '照片检查骨骼',
                                        examineTime: new Date(),
                                        examineDoctor: '刘敏'
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 2,
                                        illnessState: 1,
                                        examinePro: '照片检查骨骼',
                                        examineTime: new Date(),
                                        examineDoctor: '陈道明'
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 3,
                                        illnessState: 3,
                                        operationPro: '手术',
                                        operationTime: new Date(),
                                        operationDoctor: '漳卅'
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 4,
                                        illnessState: 1,
                                        examinePro: '检查B超',
                                        examineTime: new Date(),
                                        examineDoctor: '陈英'
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 5,
                                        illnessState: 3,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 6,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 7,
                                        illnessState: 2,
                                    },
                                    {
                                        name: '张三',
                                        bedNum: 8,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 9,
                                        illnessState: 3,
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 10,
                                        illnessState: 1
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 11,
                                        illnessState: 1
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 12,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 13,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 14,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 15,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 16,
                                        illnessState: 4,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 17,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '张三',
                                        bedNum: 18,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 19,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 20,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 21,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 22,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 23,
                                        illnessState: 1,
                                    },
                                ]
                            },
                            {
                                groupName: '4-2组',
                                hasChild: false,
                                child: [
                                    {
                                        name: '张三',
                                        bedNum: 1,
                                        illnessState: 1,
                                        examinePro: '照片检查骨骼',
                                        examineTime: new Date(),
                                        examineDoctor: '刘敏'
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 2,
                                        illnessState: 1,
                                        examinePro: '照片检查骨骼',
                                        examineTime: new Date(),
                                        examineDoctor: '陈道明'
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 3,
                                        illnessState: 3,
                                        operationPro: '手术',
                                        operationTime: new Date(),
                                        operationDoctor: '漳卅'
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 4,
                                        illnessState: 1,
                                        examinePro: '检查B超',
                                        examineTime: new Date(),
                                        examineDoctor: '陈英'
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 5,
                                        illnessState: 3,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 6,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 7,
                                        illnessState: 2,
                                    },
                                    {
                                        name: '张三',
                                        bedNum: 8,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 9,
                                        illnessState: 3,
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 10,
                                        illnessState: 1
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 11,
                                        illnessState: 1
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 12,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 13,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 14,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 15,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 16,
                                        illnessState: 4,
                                    },
                                    {
                                        name: '不知道撒名字',
                                        bedNum: 17,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '张三',
                                        bedNum: 18,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '李四',
                                        bedNum: 19,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '王五',
                                        bedNum: 20,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '张小小',
                                        bedNum: 21,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '陈浩然',
                                        bedNum: 22,
                                        illnessState: 1,
                                    },
                                    {
                                        name: '称开个',
                                        bedNum: 23,
                                        illnessState: 1,
                                    },
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                shift: '大夜班',
                shiftKey:'3',
                fireControl: '值班医师',
                hasChild: true,
                groupChild: [
                    {
                        groupName: '5组',
                        hasChild: false,
                        child: [
                            {
                                name: '张三',
                                bedNum: 1,
                                illnessState: 1,
                                examinePro: '照片检查骨骼',
                                examineTime: new Date(),
                                examineDoctor: '刘敏'
                            },
                            {
                                name: '李四',
                                bedNum: 2,
                                illnessState: 1,
                                examinePro: '照片检查骨骼',
                                examineTime: new Date(),
                                examineDoctor: '陈道明'
                            },
                            {
                                name: '王五',
                                bedNum: 3,
                                illnessState: 3,
                                operationPro: '手术',
                                operationTime: new Date(),
                                operationDoctor: '漳卅'
                            },
                            {
                                name: '张小小',
                                bedNum: 4,
                                illnessState: 1,
                                examinePro: '检查B超',
                                examineTime: new Date(),
                                examineDoctor: '陈英'
                            },
                            {
                                name: '陈浩然',
                                bedNum: 5,
                                illnessState: 3,
                            },
                            {
                                name: '称开个',
                                bedNum: 6,
                                illnessState: 1,
                            },
                            {
                                name: '不知道撒名字',
                                bedNum: 7,
                                illnessState: 2,
                            },
                            {
                                name: '张三',
                                bedNum: 8,
                                illnessState: 1,
                            },
                            {
                                name: '李四',
                                bedNum: 9,
                                illnessState: 3,
                            },
                            {
                                name: '王五',
                                bedNum: 10,
                                illnessState: 1
                            },
                            {
                                name: '张小小',
                                bedNum: 11,
                                illnessState: 1
                            },
                            {
                                name: '陈浩然',
                                bedNum: 12,
                                illnessState: 1,
                            },
                            {
                                name: '称开个',
                                bedNum: 13,
                                illnessState: 1,
                            },
                            {
                                name: '不知道撒名字',
                                bedNum: 14,
                                illnessState: 1,
                                testPro:'心脏',
                                testTime: new Date(),
                                testDoctor: '陈英'
                            },
                            {
                                name: '陈浩然',
                                bedNum: 15,
                                illnessState: 1,
                            },
                            {
                                name: '称开个',
                                bedNum: 16,
                                illnessState: 4,
                            },
                            {
                                name: '不知道撒名字',
                                bedNum: 17,
                                illnessState: 1,
                            },
                            {
                                name: '张三',
                                bedNum: 18,
                                illnessState: 1,
                            },
                            {
                                name: '李四',
                                bedNum: 19,
                                illnessState: 1,
                            },
                            {
                                name: '王五',
                                bedNum: 20,
                                illnessState: 1,
                            },
                            {
                                name: '张小小',
                                bedNum: 21,
                                illnessState: 1,
                            },
                            {
                                name: '陈浩然',
                                bedNum: 22,
                                illnessState: 1,
                            },
                            {
                                name: '称开个',
                                bedNum: 23,
                                illnessState: 1,
                            },
                        ]
                    }
                ]
            },
        ]
        this.dispatch({
            shiftTableData: shiftTableData
        })

        // 提取数据中的所有值
        btnMenuData.forEach((item,i)=>{
            btnMenuValue.push(item.key)
        })
        this.dispatch2({
            btnMenuValue:btnMenuValue
        })
    }

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 交接班详情下拉选择框显示事件
     * @param e Event
     */
    btnMenuShow = (e) => {
        // 禁止冒泡
        e.stopPropagation()
        this.dispatch({
            btnMenuShow: true
        })
    }
    /**
     * 交接班详情下拉选择框关闭事件
     * @param e Event
     */
    btnMenuHidden = (e)=>{
        // 禁止冒泡
        e.stopPropagation()
        this.dispatch({
            btnMenuShow: false
        })
    }

    /**
     * 交接班详情下拉菜单选择事件
     * @param v Array<string> 选中值
     */
    checkBoxChange=(v)=>{
        this.dispatch2({
            btnMenuValue:v
        })
        // console.log(this.state.btnMenuValue)
    }
    /**
     * 交接按钮事件
     * @param e Event
     * @param v boolean 值
     */
    shiftChange = (e,v) => {
        // console.log(v)
        this.dispatch({displayMode: v})
    }
    /**
     * 交接图表床位点击事件
     * @param v 交接图表床位点击所获取数据
     */
    bedBtnClick = (v) => {
        // openModal可以传数据
        personModalService.openModal()
    }

    /**
     * 渲染表格
     * @param params {}
     */
    onGridReady = (params) => {
        let {tableRowData} = this.state
        this.tableApi = params.api
        params.api.setRowData(tableRowData)
    }

    /**
     * 设置ag表格每一行的高度
     * @param params ag表格设置行高回掉参数
     * @returns {number} 返回数据
     */
    getRowHeight = (params) => {
        let obj = params.data,// 行数据
            maxLength = 0 // 最大行数
        params.api.columnController.gridColumns.forEach((item, i) => {
            let heightNum = this.textSize(obj[item.colId], item.actualWidth + 'px').height
            if (heightNum > maxLength) maxLength = heightNum
        })
        return maxLength
    }
    /**
     * 计算文本在ag-cell表格中可以显示的高度
     * @param text 文本内容
     * @param eleWidth 设置的宽度
     * @returns {{height: number}} 返回结果对象
     */
    textSize = (text, eleWidth) => {
        let div = document.createElement('div')
        let result = {height: 0}
        div.style.visibility = 'hidden'
        // 把样式设置成ag-cell一样
        div.style.width = eleWidth
        div.style.fontSize = '12px'
        div.style.lineHeight = '24px'
        div.style.padding = '3px'
        document.body.appendChild(div)
        div.innerHTML = text
        result.height = div.offsetHeight
        div.parentNode.removeChild(div)
        return result
    }

    /**
     * 交接详情表格双击事件
     * @param params 默认参数
     */
    doubleClick = (params) => {
        // console.log(params.data)
        personModalService.openModal(params.data)
    }
}

export const shiftDetailService = new ShiftDetailService('ShiftDetail')