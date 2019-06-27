import React from 'react'
import classnames from 'classnames'
import {Col, Divider, Form, Icon, Input, Radio, Row, Select, Tag} from 'antd'
import {InfoFormProps, SickInfoType} from './Form'
import {Images} from 'pkg/common/image/image'
import {TimePickerPrefix} from 'pkg/common/timePickerPrefix'
import {SelectPrefix} from 'pkg/common/selectPrefix'
import {InputTable} from 'pkg/common/inputTable'
import {PrefixContainer} from 'pkg/common/prefixContainer'
import CustomTagGroup from 'pkg/common/customTagGroup'
import styles from './style/index.scss'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const FormItem = Form.Item
const Option = Select.Option
const CheckableTag = Tag.CheckableTag

let reg = '^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}' +
    '((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$'
const regRex = new RegExp(reg)

class SickInfoForm extends React.Component<InfoFormProps, any> {
    static defaultProps = {
        sexDict: [
            {key: 'male', value: 'male', children: '男'},
            {key: 'female', value: 'female', children: '女'},
            {key: 'unknown', value: 'unknown', children: '未知'}
        ],
        chargeTypeDict: [
            {key: '1', value: '1', children: 'aaa'},
            {key: '2', value: '2', children: 'bbb'}
        ],
        identityDict: [
            {key: '1', value: '1', children: '1'},
            {key: '2', value: '2', children: '2'}
        ],
        nationDict: [
            {key: '1', value: '1', children: '1'},
            {key: '2', value: '2', children: '2'}
        ],
        regFromDict: [
            {key: '1', value: '1', children: '1'},
            {key: '2', value: '2', children: '2'}
        ],
        greenRoadDict: [
            {key: '1', value: '1', children: '1'},
            {key: '2', value: '2', children: '2'}
        ],
        otherDict: [
            {key: '1', value: '1', children: '1'},
            {key: '2', value: '2', children: '2'}
        ],
        allergyDict: [
            {key: '1', value: '1', children: '1'},
            {key: '2', value: '2', children: '2'}
        ]
    }

    constructor(props) {        super(props)
        this.state = {
            patientSick: '3'
        }
    }

    /**
     *
     * 性别改变的回调函数
     *
     */
    onGenderChange = (value) => {
        this.setState({patientSick: value})
        this.props.onChange({sex: {name: 'sex', value: value}})
    }

    /**
     *
     * 群伤标识清空按钮
     *
     */
    onClearClick = () => {
        const {resetFields} = this.props.form
        resetFields(['bulkinjuryName'])
    }

    /**
     * 输入身份证获取生日和性别
     */
    getIdCard = (e) => {
        // console.log(e)
    }

    render() {
        const {patientSick} = this.state
        const {
            className, form,
            sexDict, chargeTypeDict, identityDict, nationDict, regFromDict, greenRoadDict, otherDict,
            bulkinjuryName,
            alergyDrugsDict,
            alergyDrugsDictColumns,
            onChange,
            onChangeAlergyDrugsDict,
            allergy
        } = this.props

        const {getFieldDecorator} = form

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }

        // noinspection TsLint
        const formItemConfig: Array<SickInfoType> = [
            {
                name: 'patientId',
                elementName: Input,
                elementProps: {
                    placeholder: '请输入患者编号',
                    addonBefore: '患者编号'
                },
                rules: [{
                    required: true,
                    message: '患者编号不能为空'
                }]
            },
            {
                name: 'name',
                elementName: Input,
                elementProps: {
                    placeholder: '请输入患者姓名',
                    addonBefore: '患者姓名'
                },
                rules: [{
                    required: true,
                    message: '患者姓名不能为空'
                }]
            },
            {
                name: 'happenDate',
                elementName: TimePickerPrefix,
                valuePropName: 'oValue',
                trigger: 'dateChange',
                elementProps: {
                    prefixClassName: styles.timepickerPrefix,
                    timePickerClassName: styles.timepicker,
                    placeholder: '请输入患者发病时间',
                    valuePropName: 'oValue',
                    prefixVal: '发病时间'
                }
            },
            {
                name: 'idNo',
                elementName: Input,
                span: 24,
                elementProps: {
                    addonBefore: '身份证号',
                    placeholder: '请输入患者身份证号',
                    onChange: (e) => {
                        this.getIdCard(e)
                    }
                },
                rules: [
                    {
                        pattern: regRex,
                        message: '输入的身份证无效'
                    }
                ]
            },
            {
                name: 'chargeType',
                span: 12,
                elementName: SelectPrefix,
                elementProps: {
                    showSearch: true,
                    prefixVal: '费别',
                    optionFilterProps: 'key',
                    placeholder: '请选择费用类别',
                    notFoundContent: '未查找到数据',
                    children: chargeTypeDict.map(item => React.createElement(Option, item))
                }
            },
            {
                name: 'nextOfKinPhone',
                span: 12,
                elementName: Input,
                elementProps: {
                    addonBefore: '电话',
                    placeholder: '请输入患者电话号码'
                }
            },
            {
                name: 'dateOfBirth',
                elementName: TimePickerPrefix,
                valuePropName: 'oValue',
                trigger: 'dateChange',
                span: 12,
                elementProps: {
                    prefixClassName: styles.timepickerPrefix,
                    timePickerClassName: styles.timepicker,
                    placeholder: '请输入患者出生日期',
                    valuePropName: 'oValue',
                    prefixVal: '出生日期'
                }
            },
            {
                name: 'nextOfKin',
                elementName: Input,
                span: 12,
                elementProps: {
                    addonBefore: '联系人',
                    placeholder: '患者联系人或监护人'
                }
            },
            {
                name: 'identity',
                elementName: SelectPrefix,
                span: 12,
                elementProps: {
                    prefixVal: '身份',
                    showSearch: true,
                    placeholder: '请输入患者身份',
                    optionFilterProps: 'key',
                    notFoundContent: '未查找到数据',
                    children: identityDict.map(item => React.createElement(Option, item))
                }
            },
            {
                name: 'nation',
                elementName: SelectPrefix,
                span: 12,
                elementProps: {
                    prefixVal: '民族',
                    showSearch: true,
                    placeholder: '患者民族',
                    notFoundContent: '未查找到数据',
                    optionFilterProps: 'key',
                    children: nationDict.length === 0 ? '' : nationDict.map(item => React.createElement(Option, item))
                }
            },
            {
                name: 'mailingAddress',
                elementName: Input,
                span: 24,
                elementProps: {
                    addonBefore: '地址',
                    placeholder: '家庭住址'
                }
            },
            {
                elementName: Divider,
                span: 24,
                elementProps: {
                    style: {margin: '2px 0 5px 0'}
                }
            },
            {
                name: 'registerFrom',
                label: '来院方式',
                elementName: RadioGroup,
                span: 24,
                formItemLayout,
                rules: [{required: true, message: '请选择来院方式'}],
                elementProps: {
                    className: styles.nowrap,
                    children: regFromDict.map(item => React.createElement(RadioButton, item))
                }
            },
            {
                name: 'greenRoad',
                label: '绿色通道',
                elementName: CustomTagGroup,
                valuePropName: 'selectedTags',
                span: 24,
                formItemLayout,
                rules: [{required: false, message: '请选择绿色通道'}],
                elementProps: {
                    allItems: greenRoadDict
                }
            },
            {
                name: 'specialSign',
                label: '其他',
                formItemLayout,
                elementName: CustomTagGroup,
                valuePropName: 'selectedTags',
                span: 24,
                elementProps: {
                    allItems: otherDict
                }
            },
            {
                name: 'crbFlag',
                label: '疑似传染病',
                formItemLayout,
                elementName: RadioGroup,
                span: 24,
                elementProps: {
                    className: styles.nowrap,
                    children: [
                        <RadioButton key={1} value="1">是</RadioButton>,
                        <RadioButton key={0} value="0">否</RadioButton>
                    ]
                }
            },
            {
                name: 'allergy',
                label: '过敏史',
                formItemLayout,
                elementName: InputTable,
                span: 24,
                elementProps: {
                    className: styles.inputTable,
                    style: {width: '100%', height: 26},
                    data: alergyDrugsDict,
                    option: {
                        total: alergyDrugsDict.total,
                        // columns: [
                        //     {title: '药品代码', field: 'key'},
                        //     {title: '药品名称', field: 'value'},
                        // ],
                        columns: alergyDrugsDictColumns,
                        pageSize: 7,
                        showValue: 'value',
                        multiSaveKey: 'key'
                    },
                    isMulti: true,
                    isMask: true,
                    maxHeight: 185,
                    oValue: allergy,
                    callBackMethods: (e) => {
                        switch (e.type) {
                            case 'enterEvent':
                            case 'removeEvent': {
                                onChange({allergy: {name: 'allergy', value: e.multiValue}})
                                break
                            }
                            default:
                                onChangeAlergyDrugsDict(
                                    {
                                        startIndex: e.pageCurrent,
                                        pageSize: e.pageSize
                                    },
                                    e.value)
                                break
                        }
                    }
                }
            },
            {
                name: 'bulkinjuryName',
                label: '群伤标识',
                formItemLayout,
                elementName: Input,
                span: 24,
                elementProps: {
                    size: 'default',
                    disabled: true,
                    addonAfter: <Icon
                        onClick={this.onClearClick}
                        type="delete"
                        className={styles.bulkinjuryNameDelete}
                    />
                }
            }
        ]

        return (
            <Form className={classnames([styles.cardContent], className)}>
                <Row gutter={10}>
                    <Col span={24}>
                        <Row type="flex" align="middle" className={styles.cardHeader}>
                            <Col span={18}>
                                {
                                    formItemConfig.slice(0, 3).map((row, index) => {
                                        return <FormItem key={index} wrapperCol={{span: 24}}>
                                            {
                                                row.name ?
                                                    getFieldDecorator(row.name, row)(
                                                        React.createElement(row.elementName, row.elementProps)
                                                    ) :
                                                    React.createElement(row.elementName, row.elementProps)
                                            }
                                        </FormItem>
                                    })
                                }
                            </Col>
                            <Col span={6}>
                                <div className={styles.sickPhoto}>
                                    <Images name={`${patientSick}`} className={styles.sickImage}/>
                                    <Select
                                        className={styles.sickGender}
                                        onChange={this.onGenderChange}
                                    >
                                        {sexDict.map(item => React.createElement(Option, item))}
                                    </Select>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={5}>
                            {
                                formItemConfig.slice(3).map((row, index) => {
                                    if (
                                        row.name === 'bulkinjuryName' &&
                                        (bulkinjuryName === undefined || bulkinjuryName.length === 0)
                                    ) return
                                    return <Col span={row.span} key={`col-${index}`}>
                                        {row.name ?
                                            <FormItem label={row.label || ''} {...row.formItemLayout} >
                                                {
                                                    getFieldDecorator(row.name, row)(
                                                        React.createElement(row.elementName, row.elementProps)
                                                    )
                                                }
                                            </FormItem> :
                                            React.createElement(row.elementName, row.elementProps)}
                                    </Col>
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const InfoForm = Form.create<any>({
    onFieldsChange(props: any, changeFields) {
        props.onChange(changeFields)
    },
    mapPropsToFields(props: any) {
        return {
            patientId: Form.createFormField({
                value: props.patientId
            }),
            name: Form.createFormField({
                value: props.name
            }),
            sex: Form.createFormField({
                value: props.sex
            }),
            chargeType: Form.createFormField({
                value: props.chargeType
            }),
            idNo: Form.createFormField({
                value: props.idNo
            }),
            nextOfKinPhone: Form.createFormField({
                value: props.nextOfKinPhone
            }),
            happenDate: Form.createFormField({
                value: props.happenDate
            }),
            dateOfBirth: Form.createFormField({
                value: props.dateOfBirth
            }),
            identity: Form.createFormField({
                value: props.identity
            }),
            nation: Form.createFormField({
                value: props.nation
            }),
            nextOfKin: Form.createFormField({
                value: props.nextOfKin
            }),
            mailingAddress: Form.createFormField({
                value: props.mailingAddress
            }),
            registerFrom: Form.createFormField({
                value: props.registerFrom
            }),
            greenRoad: Form.createFormField({
                value: props.greenRoad
            }),
            specialSign: Form.createFormField({
                value: props.specialSign
            }),
            crbFlag: Form.createFormField({
                value: props.crbFlag
            }),
            bulkinjuryName: Form.createFormField({
                value: props.bulkinjuryName
            })
        }
    }
})(SickInfoForm) as any

export default InfoForm
