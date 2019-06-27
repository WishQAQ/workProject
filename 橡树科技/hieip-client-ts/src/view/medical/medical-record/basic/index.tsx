import React from 'react'
import styles from './style/index.scss'
import {Col, Collapse, Row} from 'antd'
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {Select} from 'pkg/common/select'
import {TimePicker} from 'pkg/common/timePicker'
import classNames from 'classnames'
import classnames from 'classnames'
import {Btn} from 'pkg/common/button'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {basicService, BasicState} from 'service/medical/medical-record/basic/index'
import {DragMove} from 'pkg/common/dragging'
import {InputTable} from 'pkg/common/inputTable'
import {extend} from 'jquery'

// 自定义折叠面板
const Panel = Collapse.Panel
const regRex = new RegExp('/^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|' +
    '(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$/')

/**
 * 病案首页基本信息页面
 */
export default class BasicRecordView extends FluxComponent<BasicState> {
    title = 'BasicRecordView'
    basicService = basicService

    // 其它信息
    reactElementUl = <ul className={styles.bottomTitle}>
        <li className={styles.titleLeft}>其它信息</li>
        <li className={styles.titleRight}>
            <span>注：带</span>
            <span className={styles.leftSpan}>*</span>
            <span>为必填项</span>
        </li>
    </ul>

    // 上半部分主要信息
    main = [
        [
            {
                col: 6,
                text: '国籍',
                class: styles.input30,
                style: {},
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: styles.select,
                    onSelect: (key) => basicService.onSelectDataSet(key, 'patient', 'citizenship'),
                    allowClear: true,
                    dataOption: {value: 'countryName', key: 'countryCode'},
                },
            },
            {
                col: 6,
                text: '年龄不足一周',
                class: styles.input23,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'babyBirthWeight'),
                },
            },
            {
                col: 6,
                text: '新生儿出生体重',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'babyAgeDay'),
                },
            },
            {
                col: 6,
                text: '新生儿入院体重',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'babyAdminWeight'),
                },
            }
        ],
        [
            {
                col: 12,
                text: '出生地',
                class: styles.input30,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'address', 'patient', 'birthPlace'),
                    option: {
                        pageSize: 7,
                        showValue: 'areaName'
                    },
                },
            },
            {
                col: 6,
                text: '出生日期',
                class: styles.input30,
                style: {},
                dataType: TimePicker,
                dataParams: {
                    format: 'YYYY-MM-DD',
                    dateChange: (v) => basicService.onSelectDataSet(v, 'patient', 'dateOfBirth'),
                },
            },
            {
                col: 6,
                text: '籍贯',
                class: styles.input30,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'address', 'patient', 'jiguan'),
                    option: {
                        pageSize: 7,
                        showValue: 'userName'
                    },
                },
            }
        ],
        [
            {
                col: 6,
                text: '身份证号',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'idNo'),
                },
                rules: [
                    {
                        pattern: regRex,
                        message: '输入的身份证无效'
                    }
                ]
            },
            {
                col: 6,
                text: '职业',
                class: styles.input23,
                style: {},
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: styles.select,
                    onSelect: val => basicService.onSelectDataSet(val, 'patient', 'occupation'),
                    allowClear: true,
                    dataOption: {
                        value: 'occupationName',
                        key: 'occupationCode'
                    },
                },
            },
            {
                col: 6,
                text: '婚姻',
                class: styles.input30,
                style: {},
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: styles.select,
                    onSelect: val => basicService.onSelectDataSet(val, 'patient', 'maritalStatus'),
                    allowClear: true,
                    dataOption: {
                        value: 'name',
                        inputCode: 'inputCode',
                        key: 'id'
                    },
                },
            },
            {
                col: 6,
                text: '电话',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'homeTel'),
                },
            }
        ],
        [
            {
                col: 6,
                text: '民族',
                class: styles.input30,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'nation', 'patient', 'nation'),
                    option: {
                        pageSize: 7,
                        showValue: 'nationName'
                    },
                },
            },
            {
                col: 12,
                text: '现住址',
                class: styles.input23,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'address', 'patient', 'mailingAddress'),
                    option: {
                        pageSize: 7,
                        showValue: 'userName'
                    },
                },
            },
            {
                col: 6,
                text: '邮编',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'homeZip'),
                },
            }
        ],
        [
            {
                col: 12,
                text: '户口地址',
                class: styles.input30,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'address', 'patient', 'nomen'),
                    option: {
                        pageSize: 7,
                        showValue: 'areaName'
                    },
                },
            },
            {
                col: 12,
                text: '家庭邮编',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'zipCode'),
                },
            }
        ],
        [
            {
                col: 12,
                text: '工作单位及地址',
                class: styles.input30,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'address', 'patient', 'workTel'),
                    option: {
                        pageSize: 7,
                        showValue: 'areaName'
                    },
                },
            },
            {
                col: 6,
                text: '工作单位邮编',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'workZip'),
                },
            },
            {
                col: 6,
                text: '单位电话',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'phoneNumberBusiness'),
                },
            }
        ],
        [
            {
                col: 6,
                text: '联系人姓名',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'nextOfKin'),
                },
            },
            {
                col: 6,
                text: '联系人电话',
                class: styles.input23,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'nextOfKinPhone'),
                },
            },
            {
                col: 6,
                text: '联系人关系',
                class: styles.input30,
                style: {},
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: styles.select,
                    onSelect: val => basicService.onSelectDataSet(val, 'patient', 'relationship'),
                    allowClear: true,
                    dataOption: {
                        value: 'relationshipName',
                        key: 'relationshipCode'
                    },
                },
            },
            {
                col: 6,
                text: '联系人地址',
                class: styles.input30,
                style: {},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'address', 'patient', 'nextOfKinAddr'),
                    option: {
                        pageSize: 7,
                        showValue: 'areaName'
                    },
                },
            }
        ],
        [
            {
                col: 6,
                text: '入院日期',
                class: styles.input30,
                style: {pointerEvents: 'none'},
                dataType: TimePicker,
                dataParams: {
                    timePrecision: 1,
                    format: 'YYYY-MM-DD HH:mm:ss',
                    dateChange: (v) => basicService.onSelectDataSet(v, 'patient', 'admissionDateTime'),
                },
            },
            {
                col: 6,
                text: '入院科别',
                class: styles.input23,
                style: {pointerEvents: 'none'},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'deptDict', 'patient', 'deptAdmissionTo'),
                    option: {
                        pageSize: 7,
                        showValue: 'value'
                    },
                },
            },
            {
                col: 6,
                text: '入院病房',
                class: styles.input30,
                style: {pointerEvents: 'none'},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'adtRoomNo'),
                },
            },
            {
                col: 6,
                text: '入院途径',
                class: styles.input30,
                style: {},
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: styles.select,
                    onSelect: val => basicService.onSelectDataSet(val, 'patient', 'patientClass'),
                    allowClear: true,
                    dataOption: {
                        value: 'patientClassName',
                        key: 'patientClassCode'
                    },
                },
            }
        ],
        [
            {
                col: 6,
                text: '出院日期',
                class: styles.input30,
                style: {pointerEvents: 'none'},
                disable: true,
                dataType: TimePicker,
                dataParams: {
                    timePrecision: 1,
                    format: 'YYYY-MM-DD HH:mm:ss',
                    dateChange: (v) => basicService.onSelectDataSet(v, 'patient', 'dischargeDateTime'),
                },
            },
            {
                col: 6,
                text: '出院科别',
                disable: true,
                class: styles.input23,
                style: {pointerEvents: 'none'},
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'deptDict', 'patient', 'deptDischargeFrom'),
                    option: {
                        pageSize: 7,
                        showValue: 'value'
                    },
                },
            },
            {
                col: 6,
                text: '出院病房',
                disable: true,
                class: styles.input30,
                style: {pointerEvents: 'none'},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'ddtRoomNo'),
                },
            },
            {
                col: 6,
                text: '实际住院',
                class: styles.input30,
                style: {},
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'ryts'),
                },
            }
        ]
    ]

    // 下半部分其它信息
    other = [
        [
            {
                col: 12,
                text: '是否过敏药物',
                class: styles.input35,
                dataType: AgSelect,
                dataParams: {
                    className: styles.AgSelect,
                    dataOption: {value: 'value', key: 'key'},
                    isMulti: true,
                    onClick: basicService.onMoreSelect,
                }
            },
            {
                col: 6,
                text: '死亡患者尸检',
                class: styles.input30,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'autopsyIndicatorName')
                }
            },
            {
                col: 6,
                text: '血型/RH血型',
                class: styles.input30,
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: styles.select,
                    onSelect: val => basicService.onSelectDataSet(val, 'patient', 'bloodType'),
                    allowClear: true,
                    dataOption: {
                        value: 'name',
                        key: 'id',
                        inputCode: 'inputCode'
                    }
                }
            }
        ],
        [
            {
                col: 6,
                text: '科主任',
                class: styles.input35,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '300px',
                    className: classNames(styles.medicalInputTable, styles.specialInputTable),
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'director')
                }
            },
            {
                col: 6,
                text: '主（副主）任医生',
                class: styles.input23,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'chiefDoctor')
                }
            },
            {
                col: 6,
                text: '主治医生',
                class:
                styles.input30,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'attendingDoctor')
                }
            },
            {
                col: 6,
                text: '住院医师',
                class:
                styles.input30,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'doctorInCharge')
                }
            }
        ],
        [
            {
                col: 6,
                text: '责任护士',
                class: styles.input35,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '300px',
                    className: classNames(styles.medicalInputTable, styles.specialInputTable),
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'liabilityNurse'),
                }
            },
            {
                col: 6,
                text: '进修医师',
                class: styles.input23,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'advancedStudiesDoctor'),
                }
            },
            {
                col: 6,
                text: '实习医师',
                class: styles.input30,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'practiceDoctorOfGraduate'),
                }
            },
            {
                col: 6,
                text: '编码员',
                class: styles.input30,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'cataloger')

                }
            }
        ],
        [
            {
                col: 6,
                text: '病案质量',
                class: styles.input35,
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: classNames(styles.select, styles.specialInputTable),
                    onSelect: v => basicService.onSelectDataSet(v, 'patient', 'mrQuality'),
                    allowClear: true,
                    dataOption: {
                        value: 'name',
                        inputCode: 'inputCode',
                        key: 'id'
                    }
                }
            },
            {
                col: 6,
                text: '质控医师',
                class: styles.input23,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'doctorOfControlQuality')
                }
            },
            {
                col: 6,
                text: '质控护士',
                class: styles.input30,
                dataType: InputTable,
                dataParams: {
                    tableWidth: '265px',
                    className: styles.medicalInputTable,
                    callBackMethods: (v) => basicService.showMessage(v, 'workers', 'patient', 'nurseOfControlQuality')
                }
            },
            {
                col: 6,
                text: '质控日期',
                class: styles.input30,
                dataType: TimePicker,
                dataParams: {
                    timePrecision: 1,
                    format: 'YYYY-MM-DD HH:mm:ss',
                    dateChange: (v) => basicService.onSelectDataSet(v, 'patient', 'dateOfControlQuality')
                }
            }
        ],
        [
            {
                col: 6,
                text: '离院方式',
                class: styles.input35,
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: classNames(styles.select, styles.specialInputTable),
                    onSelect: v => basicService.onSelectDataSet(v, 'patient', 'dischargeDisposition'),
                    allowClear: true,
                    dataOption: {
                        value: 'name',
                        inputCode: 'inputCode',
                        key: 'id'
                    }
                }
            },
            {
                col: 6,
                text: '转院医疗机构名称',
                class: styles.input23,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'zymcSq')
                }
            },
            {
                col: 12,
                text: '是否有出院31天内再入院计划',
                class: styles.input12,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'zryjh')
                }
            }
        ],
        [
            {
                col: 12,
                text: '昏迷时间（颅内操作患者）：入院后',
                class: styles.input1233,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'timeMosaic'),
                    onClick: basicService.showTimeWindow
                }
            },
            {
                col: 12,
                text: '昏迷时间（颅内操作患者）：入院前',
                class: styles.input12,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'backComaDay')
                }
            }
        ],
        [
            {
                col: 6,
                text: '抢救次数',
                class: styles.input35,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: (v) => basicService.setInputNumber(v, 1, 'patient', 'emerTreatTimes')
                }
            },
            {
                col: 6,
                text: '挽救成功次数',
                class: styles.input23,
                dataType: HintInput,
                dataParams: {
                    className: styles.input,
                    onChange: v => basicService.setInputNumber(v, 1, 'patient', 'escEmerTimes')
                }
            },
            // {
            //     col: 12,
            //     text: '门诊住院诊断是否符合',
            //     class: styles.input12145,
            //     dataType: HintInput,
            //     dataParams: {
            //         className: styles.input,
            //         onChange: (v) => basicService.onChangeDataSet(v, 'patient', 'inandout')
            //     }
            // }
            {
                col: 12,
                text: '门诊住院诊断是否符合',
                class: styles.input35,
                dataType: Select,
                dataParams: {
                    showSearch: true,
                    className: classNames(styles.select, styles.specialInputTable),
                    onSelect: v => basicService.onSelectDataSet(v, 'patient', 'inandout'),
                    allowClear: true,
                    dataOption: {
                        value: 'name',
                        inputCode: 'inputCode',
                        key: 'id'
                    }
                }
            }
        ]
    ]

    render() {

        /*解构赋值*/
        const {
            patient,
            controlDict,
            isShowTime,
            patientClassDict,
            occupationDict,
            inputLength,
            inputTitle,
            inputData,
            ywgm,
            maritalStatus,
            mrQuality,
            bloodType,
            dischargeDisposition,
            timeMosaic,
            disableAll,
            allergies,
            inandout,
            relationshipDict
        } = this.state

        extend(true, this.main, [
            [
                {
                    dataParams: { // 国籍
                        value: patient ? patient.citizenship || '' : '',
                        data: controlDict ? controlDict : [],
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || controlDict[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                },
                {
                    dataParams: {  // 年龄不足一周
                        value: patient ? patient.babyBirthWeight || '' : ''
                    }
                },
                {
                    dataParams: { // 新生儿出生体重
                        value: patient ? patient.babyAgeDay || '' : ''
                    }
                },
                {
                    dataParams: { // 新生儿入院体重
                        value: patient ? patient.babyAdminWeight || '' : ''
                    }
                },
            ],
            [
                {
                    dataParams: { // 出生地
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                        oValue: patient ? patient.birthPlace || '' : '',
                    }
                },
                {
                    dataParams: { // 出生日期
                        oValue: patient ? patient.dateOfBirth || null : '',
                    }
                },
                {
                    dataParams: { // 籍贯
                        oValue: patient ? patient.jiguan || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                }
            ],
            [
                {
                    dataParams: { // 身份证号
                        value: patient ? patient.idNo || '' : '',
                    }
                },
                {
                    dataParams: { // 职业
                        data: occupationDict ? occupationDict : [],
                        value: patient ? patient.occupationName || '' : '',
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || occupationDict[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        },
                    }
                },
                {
                    dataParams: { // 婚姻
                        value: patient ? patient.maritalStatus || '' : '',
                        data: maritalStatus ? maritalStatus : [],
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || maritalStatus[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        },
                    }
                },
                {
                    dataParams: { // 电话
                        value: patient ? patient.homeTel || '' : '',
                    }
                },
            ],
            [
                {
                    dataParams: { // 民族
                        oValue: patient ? patient.nationName || patient.nation : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                },
                {
                    dataParams: { // 现住址
                        oValue: patient ? patient.mailingAddress || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                },
                {
                    dataParams: { // 邮编
                        value: patient ? patient.homeZip || '' : '',
                    }
                }
            ],
            [
                {
                    dataParams: { // 户口地址
                        oValue: patient ? patient.nomen || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                },
                {
                    dataParams: { // 家庭邮编
                        value: patient ? patient.zipCode || '' : '',
                    }
                },
            ],
            [
                {
                    dataParams: { // 工作单位及地址
                        oValue: patient ? patient.workTel || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    },
                },
                {
                    dataParams: { // 工作单位邮编
                        value: patient ? patient.workZip || '' : '',
                    },
                },
                {
                    dataParams: { // 单位电话
                        value: patient ? patient.phoneNumberBusiness || '' : '',
                    },
                }
            ],
            [
                {
                    dataParams: { // 联系人姓名
                        value: patient ? patient.nextOfKin || '' : '',
                    }
                },
                {
                    dataParams: { // 联系人电话
                        value: patient ? patient.nextOfKinPhone || '' : '',
                    }
                },
                {
                    dataParams: { // 联系人关系
                        value: patient ? patient.relationship || '' : '',
                        data: relationshipDict ? relationshipDict : [],
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || relationshipDict[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                },
                {
                    dataParams: { // 联系人地址
                        oValue: patient ? patient.nextOfKinAddr || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                },
            ],
            [
                {
                    dataParams: { // 入院日期
                        oValue: patient ? patient.admissionDateTime || '' : '',
                    }
                },
                {
                    dataParams: { // 入院科别
                        oValue: patient ? patient.deptAdmissionTo || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                },
                {
                    dataParams: { // 入院病房
                        value: patient ? patient.adtRoomNo || '' : '',
                    }
                },
                {
                    dataParams: { // 入院途径
                        data: patientClassDict ? patientClassDict : [],
                        value: patient ? patient.patientClass || '' : '',
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || patientClassDict[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        },
                    }
                }
            ],
            [
                {
                    dataParams: { // 出院日期
                        oValue: patient ? patient.dischargeDateTime || '' : '',
                    }
                },
                {
                    dataParams: { // 出院科别
                        oValue: patient ? patient.deptDischargeFrom || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                        },
                        data: inputData ? inputData : [],
                    }
                },
                {
                    dataParams: { // 出院病房
                        value: patient ? patient.ddtRoomNo || '' : '',
                    }
                },
                {
                    dataParams: { // 实际住院
                        value: patient ? patient.ryts || '' : '',
                    }
                },
            ]
        ])
        extend(true, this.other, [
            [
                {
                    dataParams: { // 过敏药物
                        value: [],
                        data: ywgm,
                    }
                },
                {
                    dataParams: { // 死亡患者尸检
                        value: patient ? patient.autopsyIndicatorName || '' : ''
                    }
                },
                {
                    dataParams: { // 血型/RH血型
                        data: bloodType ? bloodType : [],
                        value: patient ? patient.bloodType || '' : '',
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || bloodType[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                }
            ],
            [
                {
                    dataParams: { // 科主任
                        oValue: patient ? patient.director || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 主（副主）任医生
                        oValue: patient ? patient.chiefDoctor || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 主治医生
                        oValue: patient ? patient.attendingDoctor || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 住院医师
                        oValue: patient ? patient.doctorInCharge || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                }
            ],
            [
                {
                    dataParams: { // 责任护士
                        oValue: patient ? patient.liabilityNurse || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 进修医师
                        oValue: patient ? patient.advancedStudiesDoctor || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : [],
                    }
                },
                {
                    dataParams: { // 实习医师
                        oValue: patient ? patient.practiceDoctorOfGraduate || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 编码员
                        oValue: patient ? patient.cataloger || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                }
            ],
            [
                {
                    dataParams: { // 病案质量
                        value: patient ? patient.mrQuality || '' : '',
                        data: mrQuality ? mrQuality : [],
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || mrQuality[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                },
                {
                    dataParams: { // 质控医师
                        oValue: patient ? patient.doctorOfControlQuality || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 质控护士
                        oValue: patient ? patient.nurseOfControlQuality || '' : '',
                        option: {
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'userName'
                        },
                        data: inputData ? inputData : []
                    }
                },
                {
                    dataParams: { // 质控日期
                        oValue: patient ? patient.dateOfControlQuality || '' : ''
                    }
                },
            ],
            [
                {
                    dataParams: { // 离院方式
                        value: patient ? patient.dischargeDisposition || '' : '',
                        data: dischargeDisposition ? dischargeDisposition : [],
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || dischargeDisposition[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                },
                {
                    dataParams: { // 转院医疗机构名称
                        value: patient ? patient.zymcSq || '' : ''
                    }
                },
                {
                    dataParams: { // 是否有出院31天内再入院计划
                        value: patient ? patient.zryjh || '' : ''
                    }
                }
            ],
            [
                {
                    dataParams: { // 昏迷时间（颅内操作患者）：入院后
                        value: timeMosaic ? timeMosaic || '' : ''
                    }
                },
                {
                    dataParams: { // 昏迷时间（颅内操作患者）：入院前
                        value: patient ? patient.backComaDay || '' : ''
                    }
                }
            ],
            [
                {
                    dataParams: { // 抢救次数
                        value: patient ? patient.emerTreatTimes || '' : ''
                    }
                },
                {
                    dataParams: { // 挽救成功次数
                        value: patient ? patient.escEmerTimes || '' : ''
                    }
                },
                // {
                //     dataParams: { // 门诊住院诊断是否符合
                //         value: patient ? patient.inandout || '' : ''
                //     }
                // }
                {
                    dataParams: { // 门诊住院诊断是否符合
                        value: patient ? patient.inandout || '' : '',
                        data: inandout ? inandout : [],
                        filterOption: (input, option: any) => {
                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || inandout[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                },
            ],
        ])
        let dataParams: any = this.other[0][0].dataParams
        dataParams.value = allergies.length > 0 ? allergies : []

        return (
            <div className={classnames(styles.root, `${disableAll ? styles.pointer : ''}`)}>
                {/* 按钮 */}
                <div className={styles.btnGroup}>
                    <Btn btnParam={{
                        className: styles.buttonAlter,
                        icon: 'save',
                        onClick: basicService.saveDiag
                    }}
                         text={'保存'}/>
                    <Btn btnParam={{
                        className: styles.buttonSearch,
                        icon: 'printer',
                        onClick: basicService.print
                    }}
                         text={'打印'}/>
                </div>

                {/* 昏迷时间（颅内操作患者）：入院后 弹框 */}
                {
                    isShowTime ? (
                        <div className={styles.showSave}>
                            <DragMove
                                title={<div>
                                    <LabelBox text={'天'} className={styles.myLabelBoxTotal}>
                                        <HintInput
                                            value={patient ? patient.firstComaDay : ''}
                                            onChange={(v) => basicService.onChangeDataSet(v, 'patient', 'firstComaDay')}
                                        />
                                    </LabelBox>
                                    <LabelBox text={'小时'} className={styles.myLabelBoxTotal}>
                                        <HintInput
                                            value={patient ? patient.firstComaHour : ''}
                                            onChange={(v) => basicService.onChangeDataSet(v, 'patient', 'firstComaHour')}
                                        />
                                    </LabelBox>
                                    <LabelBox text={'分钟'} className={styles.myLabelBoxTotal}>
                                        <HintInput
                                            value={patient ? patient.firstComaMinute : ''}
                                            onChange={(v) => basicService.onChangeDataSet(v, 'patient', 'firstComaMinute')}
                                        />
                                    </LabelBox>
                                </div>}
                                visible={isShowTime}
                                onOk={basicService.comaTimeUpdate}
                                onCancel={basicService.handleCancel}
                                cancelText="取消"
                                okText="确认"
                                closable={true}
                                top={500}
                                left={380}
                            />
                        </div>
                    ) : null
                }

                {/*个人，单位，医院*/}
                <div className={styles.top}>
                    {/*display:'flex',alignItems:'center'*/}
                    <Row className={styles.topContent}>
                        <Col className={styles.left}>
                            <Row>
                                <Col className={styles.person}>个人</Col>
                                <Col className={styles.company}>单位</Col>
                                <Col className={styles.hospital}>医院</Col>
                            </Row>
                        </Col>
                        <Col className={styles.right}>
                            {
                                this.main.map((item: any, index) => {
                                    return (
                                        <Row key={index} className={styles.row}>
                                            {
                                                item.map((value1: any, key) => {
                                                    if (value1) {
                                                        return (
                                                            <Col span={value1.col} key={key}>
                                                                <LabelBox
                                                                    text={value1.text}
                                                                    className={value1.class}
                                                                    className2={styles.leftName}
                                                                    asterisk={
                                                                        value1.text === '国籍' ||
                                                                        value1.text === '出生地' ||
                                                                        value1.text === '籍贯' ||
                                                                        value1.text === '民族' ||
                                                                        value1.text === '身份证号' ||
                                                                        value1.text === '职业' ||
                                                                        value1.text === '出生日期' ||
                                                                        value1.text === '婚姻'
                                                                    }
                                                                    style={value1.style}
                                                                >
                                                                    {React.createElement(value1.dataType, value1.dataParams)}
                                                                </LabelBox>
                                                            </Col>
                                                        )
                                                    }
                                                })
                                            }
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </div>
                {/*其它信息*/}
                <div className={styles.bottom}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={this.reactElementUl} key="1" className={styles.topBox}>
                            <Row className={classNames(styles.topContent, styles.topContentOther)}>
                                <Col className={styles.middle}>
                                    {
                                        this.other.map((item: any, index) => {
                                            return (
                                                <Row key={index} className={styles.otherRow}>
                                                    {
                                                        item.map((value: any, key) => {
                                                            return (
                                                                <Col span={value.col} key={key}>
                                                                    <LabelBox
                                                                        text={value.text}
                                                                        className={value.class}
                                                                        className2={styles.leftName}
                                                                    >
                                                                        {React.createElement(value.dataType, value.dataParams)}
                                                                    </LabelBox>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }
}