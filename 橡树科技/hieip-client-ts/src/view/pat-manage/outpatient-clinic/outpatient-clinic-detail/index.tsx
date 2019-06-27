// basic
import React from 'react'
import moment from 'moment'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// oak Component
import {IconFont} from 'pkg/common/icon'
import {DragMove} from 'pkg/common/dragging'
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {Select} from 'pkg/common/select'
import {Table} from 'pkg/common/table'
import {AgRadioGroup} from 'pkg/common/ag/radio'
import {Charts} from 'pkg/common/echarts'
// antd
import {Tabs, Button, Tree, Radio, Row, Col, Checkbox, Popover, Input, Modal} from 'antd'
// lazyLoader
import {LazyLoader} from 'tools/lazyLoader'
// page
import OutpatientClinicRecord from './record/index'
import OutpatientClinicReport from './report/index'
import OutpatientClinicPrescription from './prescription/index'
// service
import {inspectionService} from 'service/pat-manage/patien-opt/lab/apply'
import {examService} from 'service/pat-manage/patien-opt/exam/apply'
import {outpatientClinicDetailService, OutpatientClinicDetailState} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-detail'
// ui
import NormalTree from 'pkg/ui/normal-tree'
import {FluxComponent} from 'tools/flux/FluxComponent'
// model
import {Select as AgSelect} from 'pkg/common/ag/select'

// antd卡片式页签
const TabPane = Tabs.TabPane
// antd树形控件
const TreeNode = Tree.TreeNode
// antd单选按钮组件
const RadioGroup = Radio.Group
// antd输入框
const Search = Input.Search

export interface State {
    showRegistrationBox?: any,          // 门诊住院登记弹框
    showPrintBox?: any,                 // 打印弹框
    showDiagnosisBox?: any,             // 诊断弹框
    showInfusionListBox?: any           // 打印 -> 输液单途径设置 弹框
    showOperationBox?: any              // 手术申请
    showTestBox?: any                   // 检验申请
    showExaminationBox?: any            // 检查申请
    showHospitalBedsBox?: any           // 住院床位使用情况
    admissionDepartmentType?: any,     // 门诊住院登记 -> 入院科室
    admissionDepartment?: any,          // 门诊住院登记 -> 入院科室
    reserve?: any,                       // 门诊住院登记 -> 预交金
    expandedKeys?: any,                 // 打印 -> 树形控件
    autoExpandParent?: any,             // 打印 -> 树形控件
    checkedKeys?: any,                  // 打印 -> 树形控件
    selectedKeys?: any,                 // 打印 -> 树形控件
    rowDataPrintSelected?: any,        // 打印 -> 已选项目 表格
    rowDataInfusionList?: any,         // 打印 -> 输液单途径设置 -> 项目名称 表格
    rowDataDisposal?: any,              // 诊断
    rowDataSurgery?: any,              // 手术申请 -> 手术名称 表格
    rowDataTest?: any,                  // 检验申请 -> 检验项目
    rowDataTestTemplate?: any,         // 检验申请 -> 模板名称
    rowDataExamination?: any,          // 检查申请 -> 检查项目
    rowDataExaminationTemplate?: any, // 检查申请 -> 模板名称
    rowDataHB?: any,                    // 住院床位使用情况
    rcSurgeryBasic?: any,              // 手术申请 -> 基本信息
    figureOrTable?: any                // 住院床位使用情况 -> 切换图表
    hbOption?: any,                    // 住院床位使用情况 -> 图
}

export default class OutpatientClinicDetail extends FluxComponent<OutpatientClinicDetailState> {
    title = '门诊综合页面'
    outpatientClinicDetailService = outpatientClinicDetailService

    // 按钮
    operations = <div className={styles.btnGroup}>
        <Button className={classNames(styles.myButton, styles.myExtra)}
                onClick={outpatientClinicDetailService.diagnosisOpen}>
            <IconFont iconName={'icon-zhenduan-'}/>诊断
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}
        >
            <IconFont iconName={'icon-jiancha'}/>检查申请
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}
        >
            <IconFont iconName={'icon-jianyanbaogao'}/>检验申请
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}
        >
            <IconFont iconName={'icon-shoushu'}/>手术申请
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}
        >
            <IconFont iconName={'icon-ordinaryprint'}/>打印
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}
        >
            <IconFont iconName={'icon-chuangwei'}/>床位情况
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra, styles.myButtonMargin24)}
        >
            <IconFont iconName={'icon-yiyuan'}/>住院登记
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}>
            <IconFont iconName={'icon-baocun2'}/>保存
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}>
            <IconFont iconName={'icon-jieshu'}/>结束就诊
        </Button>
        <Button className={classNames(styles.myButton, styles.myExtra)}>
            <IconFont iconName={'icon-hushi'}/>转住院
        </Button>
    </div>

    // 树形控件
    treeData = [
        {
            title: '检查申请单',
            key: '0-0',
            children: [
                {
                    title: '检查项目',
                    key: '0-0-0',
                    children: [
                        {title: '检查项目', key: '0-0-0-0'},
                        {title: '检查项目', key: '0-0-0-1'},
                        {title: '检查项目', key: '0-0-0-2'},
                        {title: '检查申请单', key: '0-0-0-3'},
                    ],
                },
                {
                    title: '检查项目',
                    key: '0-0-1',
                    children: [
                        {title: '检查项目', key: '0-0-1-0'},
                        {title: '检查项目', key: '0-0-1-1'},
                        {title: '检查项目', key: '0-0-1-2'},
                        {title: '检查申请单', key: '0-0-1-3'},
                    ],
                },
                {
                    title: '检查项目',
                    key: '0-0-2',
                    children: [
                        {title: '检查项目', key: '0-0-2-0'},
                        {title: '检查项目', key: '0-0-2-1'},
                        {title: '检查项目', key: '0-0-2-2'},
                        {title: '检查申请单', key: '0-0-2-3'},
                    ],
                }
            ],
        },
        {
            title: '检验申请单',
            key: '0-1',
            children: [
                {title: '0-1-0-0', key: '0-1-0-0'},
                {title: '0-1-0-1', key: '0-1-0-1'},
                {title: '0-1-0-2', key: '0-1-0-2'},
            ],
        },
        {
            title: '手术申请单',
            key: '0-2',
        }
    ]

    // 打印弹框 -> 已选项目
    columnsPrintSelected = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '类型',
            field: 'number',
            width: 150,
            maxWidth: 150,
            minWidth: 150,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '项目名称',
            field: 'number',
            width: 275,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 打印弹框 -> 输液单途径设置
    columnsInfusionList = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '项目名称',
            field: 'number',
            width: 363,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 诊断弹框
    columnsDisposal = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '诊断类型',
            field: 'diagnosisTypeName',
            width: 182,
            maxWidth: 182,
            minWidth: 182,
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                data: [],
                dataOption: {key: 'key', value: 'value'},
                open: true,
            },
            cellClass: () => {
                return styles.tableColumn28
            },
            valueFormatter: (params) => {
                return outpatientClinicDetailService.showDiagnosisTypeD(params)
            },
        },
        {
            headerName: '诊断名称',
            field: 'diagnosisDesc',
            width: 219,
            maxWidth: 219,
            minWidth: 219,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '初诊/复诊',
            field: 'number',
            width: 133,
            cellClass: () => {
                return classNames(styles.tableColumn28, styles.tableColumnRadio)
            },
            cellRendererFramework: AgRadioGroup, // 设置为单选按钮
            cellRendererParams: {
                name: 'testRadio',
                defaultValue: '1',
                onChange: () => {
                    return
                },
                agChildren: [
                    {value: '1', text: '初诊'},
                    {value: '2', text: '复诊'},
                ],
                className: styles.agSingleRadio,
            }
        },
    ]

    // 手术申请弹框
    columnsSurgery = [
        {
            headerName: '手术名称',
            field: 'number',
            width: 377,
            minWidth: 377,
            maxWidth: 377,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '手术等级',
            field: 'number',
            width: 217,
            minWidth: 217,
            maxWidth: 217,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '手术规模',
            field: 'number',
            width: 292,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 检验申请弹框 -> 检验项目类型
    columnsTest = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '检验项目类型',
            field: 'number',
            width: 133,
            minWidth: 133,
            maxWidth: 133,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '检验项目',
            field: 'number',
            width: 220,
            minWidth: 220,
            maxWidth: 220,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '标本',
            field: 'number',
            width: 84,
            minWidth: 84,
            maxWidth: 84,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '金额',
            field: 'number',
            width: 198,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 检验申请弹框 -> 模板名称
    columnsTestTemplate = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '模板名称',
            field: 'number',
            width: 221,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 检查申请弹框 -> 检查项目
    columnsExamination = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '检查项目',
            field: 'number',
            width: 222,
            maxWidth: 222,
            minWidth: 222,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '检查类型',
            field: 'number',
            width: 163,
            maxWidth: 163,
            minWidth: 163,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '检查费用',
            field: 'number',
            width: 120,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 检查申请弹框 -> 模板名称
    columnsExaminationTemplate = [
        {
            headerName: '',
            field: '',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 33,
            maxWidth: 33,
            minWidth: 33,
            cellClass: () => {
                return styles.tableSelectAll
            }
        },
        {
            headerName: '模板名称',
            field: 'number',
            width: 160,
            maxWidth: 160,
            minWidth: 160,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '类型',
            field: 'number',
            width: 90,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    // 住院床位使用情况弹框
    columnsHB = [
        {
            headerName: '',
            field: 'number',
            width: 98,
            maxWidth: 98,
            minWidth: 98,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '已占用床位数',
            field: 'number',
            width: 171,
            maxWidth: 171,
            minWidth: 171,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '剩余床位数',
            field: 'number',
            width: 173,
            maxWidth: 173,
            minWidth: 173,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '总床位数',
            field: 'number',
            width: 175,
            cellClass: () => {
                return styles.tableColumn28
            }
        }
    ]

    // 手术申请
    rcSurgeryBasic = [
        [
            {
                col: 24,
                text: '术前诊断',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 6,
                text: '病情',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '手术时间',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '手术室',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '手术间',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 6,
                text: '台次',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '手术部位',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '手术科室',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '手术医生',
                asterisk: true,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 6,
                text: '输/供血方式',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '隔离标志',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 12,
                text: '申请标志',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 6,
                text: '申请时间',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '申请医生',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: 'ASA',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '输血医生',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 24,
                text: '手术助手',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 18,
                text: '麻醉信息',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '第一台护士',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
        [
            {
                col: 6,
                text: '第二台护士',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 6,
                text: '第一供应护士',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
            {
                col: 12,
                text: '第二供应护士',
                asterisk: false,
                data:
                    <HintInput
                        className={styles.myRcLabelBoxInput}
                        // value={patient ? patient.babyAgeDay : ''}
                        // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                    />
            },
        ],
    ]

    render() {

        let {
            showDiagnosisBox,
            diagnosisData,
        } = this.state

        return (
            <div className={styles.root}>
                {/*标签页*/}
                <div className={styles.myTabs}>
                    <Tabs type="card" tabBarExtraContent={this.operations}>
                        <TabPane tab="病历" key="1">
                            <LazyLoader lazyModule={OutpatientClinicRecord}/>
                        </TabPane>
                        <TabPane tab="处置/处方" key="2">
                            <LazyLoader lazyModule={OutpatientClinicPrescription}/>
                        </TabPane>
                        <TabPane tab="报告" key="3">
                            <LazyLoader lazyModule={OutpatientClinicReport}/>
                        </TabPane>
                    </Tabs>
                </div>
                {/*门诊住院登记-患者登记*/}
                <div className={classNames(styles.box, styles.admissionBox)}>
                    <DragMove
                        otherButton={[
                            {
                                antBtnText: '打印',
                                antBtnType: '',
                            },
                        ]}
                        visible={false}
                        okText="保存"
                        cancelText="取消"
                        title="门诊住院登记-患者信息"
                        cwidth={393}
                        cheight={290}
                    >
                        <div className={classNames(styles.myLabelBoxBox, styles.admissionLabelBox)}>
                            <LabelBox text={'患者姓名'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                            <i className={styles.specialMiddle}/>
                            <LabelBox text={'性别'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                        </div>
                        <div className={classNames(styles.myLabelBoxBox, styles.admissionLabelBox)}>
                            <LabelBox text={'身份证号'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                        </div>
                        <div className={classNames(styles.myLabelBoxBox, styles.admissionLabelBox)}>
                            <LabelBox text={'身份'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                            <i className={styles.specialMiddle}/>
                            <LabelBox text={'年龄'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                        </div>
                        <div className={classNames(styles.myLabelBoxBox, styles.admissionLabelBox)}>
                            <LabelBox text={'来源'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                            <i className={styles.specialMiddle}/>
                            <LabelBox text={'费别'} className={styles.myLabelBoxTotal}>
                                <input
                                    className={styles.readOnly}
                                    readOnly={true}
                                    value={'125485582'}
                                />
                            </LabelBox>
                        </div>
                        <div className={classNames(styles.myLabelBoxBox, styles.admissionLabelBox)}>
                            <LabelBox text={'入院科室'} className={styles.myLabelBoxTotal} asterisk={true}>
                                <Select
                                    value={''}
                                    className={styles.mySelect}
                                    data={[]}
                                    dataOption={{value: 'value', key: 'key'}}
                                />
                            </LabelBox>
                            <i className={styles.specialMiddle}/>
                            <LabelBox text={'预交金'} className={styles.myLabelBoxTotal}>
                                <HintInput
                                    value={''}
                                />
                            </LabelBox>
                        </div>
                    </DragMove>
                </div>
                {/*打印*/}
                <div className={classNames(styles.box, styles.printBox)}>
                    <DragMove
                        otherButton={[
                            {
                                antBtnText: '输液单途径设置',
                                antBtnType: '',
                            },
                        ]}
                        visible={false}
                        okText="打印"
                        cancelText="取消"
                        title="打印"
                        cwidth={751}
                        cheight={627}
                    >
                        <div className={styles.printMain}>
                            <div className={styles.printLeft}>
                                <div className={classNames(styles.myCardTitle, styles.printLeftTitle)}>类型</div>
                                <div className={styles.printLeftMain}>
                                    <Tree
                                        // checkable={true}
                                        // onExpand={this.onExpandPrint}
                                        // expandedKeys={this.state.expandedKeys}
                                        // autoExpandParent={this.state.autoExpandParent}
                                        // onCheck={this.onCheckPrint}
                                        // checkedKeys={this.state.checkedKeys}
                                        // onSelect={this.onSelectPrint}
                                        // selectedKeys={this.state.selectedKeys}
                                    >
                                        {[]}
                                    </Tree>
                                </div>
                            </div>
                            <div className={styles.printRight}>
                                <div className={classNames(styles.myCardTitle, styles.printRightTitle)}>已选项目</div>
                                <div className={styles.printRightTable}>
                                    <Table
                                        rowData={[]}
                                        columnDefs={this.columnsPrintSelected}
                                        agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                        rowHeight={28}
                                        rowSelection={'multiple'}
                                    />
                                </div>
                            </div>
                        </div>
                    </DragMove>
                </div>
                {/*输液单途径设置*/}
                <div className={classNames(styles.box, styles.InfusionListBox)}>
                    <DragMove
                        visible={false}
                        okText="保存"
                        title="输液单途径设置"
                        cwidth={424}
                        cheight={410}
                    >
                        <div className={classNames(styles.infusionListTable)}>
                            <Table
                                rowData={[]}
                                columnDefs={this.columnsInfusionList}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                rowHeight={28}
                                rowSelection={'multiple'}
                            />
                        </div>
                    </DragMove>
                </div>
                {/*诊断*/}
                <div className={classNames(styles.box, styles.diagnosisBox)}>
                    <DragMove
                        otherButton={[
                            {
                                antBtnText: '新增',
                                antBtnType: 'add',
                            },
                            {
                                antBtnText: '删除',
                                antBtnType: 'danger',
                            },
                        ]}
                        visible={showDiagnosisBox}
                        okText="保存"
                        title="诊断"
                        onOk={outpatientClinicDetailService.diagnosisClose}
                        onCancel={outpatientClinicDetailService.diagnosisClose}
                        cwidth={598}
                        cheight={526}
                    >
                        <div className={styles.diagnosisTable}>
                            <Table
                                rowData={diagnosisData} // 数据
                                columnDefs={this.columnsDisposal} // 列规则
                                agtableClassName={classNames(styles.tableEc, styles.tableEc30)} // 样式
                                rowHeight={28} // 行高
                                suppressCellSelection={false} // 开启单元格选中
                                singleClickEdit={true} // 点击启动编辑加载组件
                                stopEditingWhenGridLosesFocus={true} // 焦点离开关闭编辑模式
                            />
                        </div>
                    </DragMove>
                </div>
                {/*手术申请*/}
                <div className={classNames(styles.box, styles.OperationBox)}>
                    <DragMove
                        visible={false}
                        title="手术申请"
                        cwidth={916}
                        cheight={624}
                    >
                        <div className={styles.surgeryBasic}>
                            {
                                this.rcSurgeryBasic === [] ? null : (
                                    this.rcSurgeryBasic.map((item, key) => {
                                        return (
                                            <Row key={key}>
                                                {
                                                    item.map((value, index) => {
                                                        return (
                                                            <Col span={value.col} key={index}>
                                                                <LabelBox
                                                                    text={value.text}
                                                                    asterisk={value.asterisk}
                                                                    className={classNames(
                                                                        styles.myRcLabelBox,
                                                                        this.rcSurgeryBasic.length - 1 === key ? styles.isBottom : null,
                                                                        item.length - 1 === index ? styles.isRight : null
                                                                    )}
                                                                    className2={classNames(
                                                                        styles.myRcLabelBoxText, styles.myRcLabelBoxText86And10,
                                                                        value.text.replace(/\//g, '').length === 5
                                                                            ? styles.myRcLabelBoxText86And10R9 : value.text
                                                                                .replace(/\//g, '').length === 6
                                                                            ? styles.myRcLabelBoxText86And6 : null
                                                                    )}
                                                                >
                                                                    {value.data}
                                                                </LabelBox>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        )
                                    })
                                )
                            }
                        </div>
                        <div className={classNames(styles.surgeryTable)}>
                            <Table
                                rowData={[]}
                                columnDefs={this.columnsSurgery}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                rowHeight={28}
                            />
                        </div>
                        <div className={classNames(styles.btnGroup, styles.operationBtnGroup)}>
                            <Button className={classNames(styles.myButton, styles.myAdd, styles.OperationBtn)}
                            >
                                <IconFont iconName={'icon-tianjia'}/>新增
                            </Button>
                            <Button className={classNames(styles.myButton, styles.myDelete, styles.OperationBtn)}
                            >
                                <IconFont iconName={'icon-jianqu'}/>删除
                            </Button>
                            <Button className={classNames(styles.myButton, styles.mySave, styles.OperationBtn)}
                            >
                                <IconFont iconName={'icon-iconfontshequyijujue'}/>清空
                            </Button>
                            <Button className={classNames(styles.myButton, styles.mySave, styles.OperationBtn)}
                            >
                                <IconFont iconName={'icon-baocun2'}/>保存
                            </Button>
                        </div>
                    </DragMove>
                </div>
                {/*检验申请*/}
                <div className={classNames(styles.box, styles.testBox)}>
                    <DragMove
                        visible={false}
                        okText="保存"
                        cancelText="取消"
                        title="检验申请"
                        cwidth={957}
                        cheight={704}
                    >
                        <div className={styles.testBody}>
                            <div className={styles.testBodyLeft}>
                                <div className={styles.testBodyRc}>
                                    <div className={styles.testBodyRcS}>
                                        <LabelBox
                                            text="检验目的"
                                            className={classNames(styles.myRcLabelBox)}
                                            className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText67And7)}
                                        >
                                            <HintInput
                                                className={styles.myRcLabelBoxInput}
                                                // value={patient ? patient.babyAgeDay : ''}
                                                // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                            />
                                        </LabelBox>
                                        <div className={classNames(styles.testBodyRcSC, styles.isRight)}>
                                            <Checkbox onChange={(e) => {
                                                return e
                                            }}>紧急</Checkbox>
                                        </div>
                                    </div>
                                    <LabelBox
                                        text="临床诊断"
                                        className={classNames(styles.myRcLabelBox, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText67And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                    <LabelBox
                                        text="标本说明"
                                        className={classNames(styles.myRcLabelBox, styles.isBottom, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText67And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                </div>
                                <div className={styles.testBodyUl}>
                                    <div className={classNames(styles.myLabelBoxBox, styles.testBodyUlTitle)}>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'患者姓名'} className={classNames(styles.myLabelBoxTotal, styles.testBodyUlTotal)}>
                                            <HintInput
                                                value={''}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'发往科室'} className={classNames(styles.myLabelBoxTotal, styles.testBodyUlTotal)}>
                                            <HintInput
                                                value={''}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'标本'} className={classNames(styles.myLabelBoxTotal, styles.testBodyUlTotal)}>
                                            <HintInput
                                                value={''}
                                            />
                                        </LabelBox>
                                    </div>
                                    <div className={styles.testBodyUlBody}>
                                        {/*from view/pat-manage/patient-opt/lab/apply/leftApply/middleApply*/}
                                        <ul className={styles.labUl}>
                                            {
                                                !inspectionService.state ? null : (
                                                    !inspectionService.state.clinicItemNameDict ? null : (
                                                        inspectionService.state.clinicItemNameDict.map((e, index) => {
                                                            return <Popover
                                                                key={index}
                                                                placement="top"
                                                                trigger={'click'}
                                                                overlayClassName={styles.popover}
                                                                content={
                                                                    inspectionService.state.spection.map((e, key) => {
                                                                        if (inspectionService.state.spection.length === 0) {
                                                                            return <p key={key}>{''}</p>
                                                                        }
                                                                        else {
                                                                            return <p key={key}>{e}</p>
                                                                        }
                                                                    })
                                                                }
                                                            >
                                                                <li
                                                                    onClick={inspectionService.loadLabPriceItems.bind(this, e.itemCode)}
                                                                    onDoubleClick={inspectionService.index.bind(this, e)}
                                                                >
                                                                    <span>【{e.expand1}】</span>
                                                                    <span>{e.itemName}</span>
                                                                </li>
                                                            </Popover>
                                                        })))}
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.testBodyAg}>
                                    <div className={classNames(styles.myLabelBoxBox, styles.testBodyAgTitle)}>
                                        <div className={styles.testBodyAgTitleName}>申请项目</div>
                                        <div className={styles.testBodyAgTotalD}>
                                            <LabelBox text={'项目名称'}
                                                      className={classNames(styles.myLabelBoxTotal, styles.testBodyAgTotal)}>
                                                <HintInput
                                                    value={''}
                                                />
                                            </LabelBox>
                                        </div>
                                        <i className={styles.specialMiddle}/>
                                        <div className={classNames(styles.btnGroup)}>
                                            <Button className={classNames(styles.myButton, styles.myDelete, styles.OperationBtn)}
                                            >
                                                <IconFont iconName={'icon-jianqu'}/>删除
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={classNames(styles.testBodyTable)}>
                                        <Table
                                            rowData={[]}
                                            columnDefs={this.columnsTest}
                                            agtableClassName={classNames(styles.tableEc, styles.tableF629)}
                                            rowHeight={28}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.testBodyRight}>
                                <div className={classNames(styles.myCardTitle, styles.testBodyRightTitle)}>模板-检验项目</div>
                                <div className={styles.myCardBody}>
                                    <div className={classNames(styles.mySearchBox, styles.testBodyRightRadio)}>
                                        <div className={styles.testBodyRightSearchName}>模板类型：</div>
                                        <RadioGroup name="radiogroup"
                                                    defaultValue={2}
                                            // onChange={dataListService.radioChange}
                                                    className={styles.mySingleRadio}
                                        >
                                            <Radio value={2}>全院</Radio>
                                            <Radio value={1}>科室</Radio>
                                            <Radio value={0}>个人</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div className={classNames(styles.mySearchBox, styles.padding8Search)}>
                                        <Search
                                            // onSearch={dataListService.onchangMain.bind(this, 'beName')}
                                            enterButton={true}
                                            placeholder="模板名称"
                                            className={styles.mySearch}
                                        />
                                    </div>
                                    <div className={classNames(styles.testBodyRightTable)}>
                                        <Table
                                            rowData={[]}
                                            columnDefs={this.columnsTestTemplate}
                                            agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                            rowHeight={28}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DragMove>
                </div>
                {/*检查申请*/}
                <div className={classNames(styles.box, styles.examinationBox)}>
                    <DragMove
                        visible={false}
                        okText="保存"
                        cancelText="取消"
                        title="检查申请"
                        cwidth={1055}
                        cheight={699}
                    >
                        <div className={styles.examinationBody}>
                            <div className={styles.examinationBodyLeft}>
                                <div className={styles.examinationBodyRc}>
                                    <div className={styles.examinationBodyRcS}>
                                        <LabelBox
                                            text="检查目的"
                                            className={classNames(styles.myRcLabelBox)}
                                            className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                        >
                                            <HintInput
                                                className={styles.myRcLabelBoxInput}
                                                // value={patient ? patient.babyAgeDay : ''}
                                                // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                            />
                                        </LabelBox>
                                        <div className={classNames(styles.examinationBodyRcSC, styles.isRight)}>
                                            <Checkbox onChange={(e) => {
                                                return e
                                            }}>紧急</Checkbox>
                                        </div>
                                    </div>
                                    <LabelBox
                                        text="体征"
                                        className={classNames(styles.myRcLabelBox, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                    <LabelBox
                                        text="病状"
                                        className={classNames(styles.myRcLabelBox, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                    <LabelBox
                                        text="相关化验结果"
                                        className={classNames(styles.myRcLabelBox, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                    <LabelBox
                                        text="临床诊断"
                                        className={classNames(styles.myRcLabelBox, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                    <LabelBox
                                        text="附加说明"
                                        className={classNames(styles.myRcLabelBox, styles.isRight)}
                                        className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                    >
                                        <HintInput
                                            className={styles.myRcLabelBoxInput}
                                            // value={patient ? patient.babyAgeDay : ''}
                                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                        />
                                    </LabelBox>
                                    <div className={styles.examinationBodyRcS}>
                                        <LabelBox
                                            text="重点关注病原体"
                                            className={classNames(styles.myRcLabelBox, styles.isBottom)}
                                            className2={classNames(styles.myRcLabelBoxText, styles.myRcLabelBoxText110And7)}
                                        >
                                            <HintInput
                                                className={styles.myRcLabelBoxInput}
                                                // value={patient ? patient.babyAgeDay : ''}
                                                // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                                            />
                                        </LabelBox>
                                        <div className={classNames(styles.examinationBodyRcSC, styles.isBottom, styles.isRightConnect)}>
                                            <Checkbox onChange={(e) => {
                                                return e
                                            }}>多重耐药菌</Checkbox>
                                        </div>
                                        <div className={classNames(styles.examinationBodyRcSC, styles.isBottom, styles.isRight)}>
                                            <Checkbox onChange={(e) => {
                                                return e
                                            }}>特殊感染病原体</Checkbox>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.examinationBodyTree}>
                                    <div className={classNames(styles.myLabelBoxBox, styles.examinationBodyTreeTitle)}>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'检查类型'} className={
                                            classNames(styles.myLabelBoxTotal, styles.examinationBodyTreeTotal)}>
                                            <HintInput
                                                value={''}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'发往科室'} className={
                                            classNames(styles.myLabelBoxTotal, styles.examinationBodyTreeTotal)}>
                                            <HintInput
                                                value={''}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <LabelBox text={'项目名称'} className={
                                            classNames(styles.myLabelBoxTotal, styles.examinationBodyTreeTotal)}>
                                            <HintInput
                                                value={''}
                                            />
                                        </LabelBox>
                                        <i className={styles.specialMiddle}/>
                                        <div className={classNames(styles.btnGroup)}>
                                            <Button className={classNames(styles.myButton, styles.myDelete, styles.OperationBtn)}
                                            >
                                                <IconFont iconName={'icon-jianqu'}/>删除
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={styles.examinationBodyTreeMain}>
                                        <div className={styles.examinationBodyTreeMainList}>
                                            <div className={styles.examinationBodyTreeMainListTitle}>检查项目筛选</div>
                                            {/*from view/pat-manage/patient-opt/exam/apply/leftApply/applyBottom*/}
                                            {examService.state.examClassTree ?
                                                <NormalTree
                                                    examTreeData={examService.state.examClassTree}
                                                    examTreeDataSec={examService.state.examSubClassTree ?
                                                        examService.state.examSubClassTree : []}
                                                    onClick={examService.examClassTree}
                                                    treeClick={examService.loadItemCost}
                                                    open={examService.state.openTree}
                                                />
                                                : <div key={'no'} className={styles.noTreeData}>{'暂无数据'}</div>
                                            }
                                        </div>
                                        <div className={classNames(styles.examinationBodyTreeMainTable)}>
                                            <Table
                                                rowData={[]}
                                                columnDefs={this.columnsExamination}
                                                agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                                rowHeight={28}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.examinationBodyRight}>
                                <div className={classNames(styles.myCardTitle, styles.examinationBodyRightTitle)}>模板-检验项目</div>
                                <div className={styles.myCardBody}>
                                    <div className={classNames(styles.mySearchBox, styles.examinationBodyRightRadio)}>
                                        <div className={styles.examinationBodyRightSearchName}>模板类型：</div>
                                        <RadioGroup name="radiogroup"
                                                    defaultValue={2}
                                            // onChange={dataListService.radioChange}
                                                    className={styles.mySingleRadio}
                                        >
                                            <Radio value={2}>全院</Radio>
                                            <Radio value={1}>科室</Radio>
                                            <Radio value={0}>个人</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div className={classNames(styles.mySearchBox, styles.padding8Search)}>
                                        <Search
                                            // onSearch={dataListService.onchangMain.bind(this, 'beName')}
                                            enterButton={true}
                                            placeholder="模板名称"
                                            className={styles.mySearch}
                                        />
                                    </div>
                                    <div className={classNames(styles.examinationBodyRightTable)}>
                                        <Table
                                            rowData={[]}
                                            columnDefs={this.columnsExaminationTemplate}
                                            agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                            rowHeight={28}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DragMove>
                </div>
                {/*住院床位使用情况*/}
                <div className={styles.hospitalBeds}>
                    <DragMove
                        visible={false}
                        cwidth={664}
                        cheight={347}
                        maskClosable={true}
                    >
                        <div className={styles.hbHeader}>
                            <div className={styles.hbHeaderName}>住院床位使用情况</div>
                            <div className={styles.hbHeaderBtnGroup}>
                                    <span className={classNames(styles.myIconSpan, 0 === 0 ? styles.myIconSpanActive : null)}
                                    >
                                        <IconFont iconName={'icon-tubiaoqiehuan'}/></span>
                                <span className={classNames(styles.myIconSpan, 1 === 1 ? styles.myIconSpanActive : null)}
                                >
                                        <IconFont iconName={'icon-biaoge1'}/></span>
                            </div>
                        </div>
                        {
                            0 === 0 ?
                                <div>
                                    <Charts
                                        echOption={[]}
                                        echID={'main'}
                                        echClassName={styles.hbEch}
                                    />
                                </div> :
                                <div>
                                    {/*斜线框*/}
                                    <div className={styles.hbTableI}>
                                        <span>科室</span>
                                        <span/>
                                        <span>数量</span>
                                    </div>
                                    <div className={styles.hbTable}>
                                        <Table
                                            rowData={[]}
                                            columnDefs={this.columnsHB}
                                            agtableClassName={classNames(styles.tableEc, styles.tableEc30)}
                                            rowHeight={28}
                                        />
                                    </div>
                                </div>
                        }
                    </DragMove>
                </div>
            </div>
        )
    }
}
