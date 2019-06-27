// basic
import React from 'react'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// oak component
import {Table} from 'pkg/common/table'
import {Select} from 'pkg/common/select'
import {DragMove} from 'pkg/common/dragging'
import {Select as AgSelect} from 'pkg/common/ag/select'
import {HintInput} from 'pkg/common/input'
import {LabelBox} from 'pkg/ui/labelBox'
import {TimePicker} from 'pkg/common/timePicker'
import {RadioGroup} from 'pkg/common/radioGroup'
// antd
import {Checkbox, Input, Radio} from 'antd'
// tools
import moment from 'moment'
import {extend} from 'jquery'
// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {OutpatientClinicListState, outpatientClinicListService} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-list'

// antd输入框, antd单选按钮, antd多选框
const Search = Input.Search
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

export default class OutpatientClinicList extends FluxComponent<OutpatientClinicListState> {

    title: '门诊医生站-患者列表'
    outpatientClinicListService = outpatientClinicListService

    // 右键单击弹出信息
    tableRightClickList = ['转科', '修改患者信息', '预约下次门诊']

    // 多选框
    options = [{label: `当天`, value: 'today'}, {label: `全科`, value: 'allDept'},]

    // 基本信息
    columnsList = [
        {
            headerName: '诊号',
            field: 'visitNo',
            width: 34,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '姓名',
            field: 'name',
            width: 54,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '患者ID',
            field: 'patientId',
            width: 85,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '费别',
            field: 'chargeType',
            width: 54,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '接诊科室',
            field: 'visitDeptName',
            width: 130,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '接诊时间',
            field: 'visitDate',
            width: 130,
            cellClass: (params: any) => {
                return styles.tableColumn24
            },
            valueFormatter: (params: any) => {
                return moment(params.value).format('YYYY-MM-DD hh:mm:ss')
            }
        },
    ]

    // 详细信息
    columnsDetail = [
        {
            headerName: '就诊时间',
            field: 'visitDate',
            width: 113,
            maxWidth: 113,
            minWidth: 113,
            cellClass: (params: any) => {
                return styles.tableColumn24
            },
            valueFormatter: (params: any) => {
                return moment(params.value).format('YYYY-MM-DD hh:mm:ss')
            }
        },
        {
            headerName: '科室',
            field: 'visitDeptName',
            width: 65,
            maxWidth: 65,
            minWidth: 65,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '医生',
            field: 'doctorName',
            width: 42,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        }
    ]

    // 转科表格
    columnsTurn = [
        {
            headerName: '诊室',
            field: 'clinicDeptName',
            width: 144,
            maxWidth: 144,
            minWidth: 144,
            cellClass: (params: any) => {
                return styles.tableColumn28Edit
            }
        },
        {
            headerName: '门诊号别',
            field: 'clinicLabel',
            width: 179,
            maxWidth: 179,
            minWidth: 179,
            cellClass: (params: any) => {
                return styles.tableColumn28Edit
            }
        },
        {
            headerName: '出诊时间',
            field: 'timeDesc',
            width: 89,
            maxWidth: 89,
            minWidth: 89,
            cellClass: (params: any) => {
                return styles.tableColumn28Edit
            }
        },
        {
            headerName: '号类',
            field: 'clinicType',
            width: 100,
            cellClass: (params: any) => {
                return styles.tableColumn28Edit
            }
        },
        {
            headerName: '医生',
            field: 'doctorName',
            width: 114,
            maxWidth: 114,
            minWidth: 114,
            cellClass: () => {
                return classNames(styles.tableColumn28Edit)
            },
            editable: true,
            cellEditorFramework: AgSelect,
            cellEditorParams: {
                className: styles.agSelectC,
                dataOption: {
                    value: 'value',
                    key: 'key',
                    inputCode: 'inputCode'
                },
                onClick: (v) => {
                    outpatientClinicListService.setDoctorId(v)
                },
                callData: (data, callback) => {
                    outpatientClinicListService.setDoctor(data, callback)
                },
                open: true,
                isMask: false,
            },
        },
    ]

    // 修改患者信息
    patientInfo = [
        {
            labelBoxArray: [
                {
                    text: '患者ID',
                    asterisk: false,
                    dataType: Input,
                    dataParams: {
                        className: styles.readOnly,
                        readOnly: true,
                    },
                },
                {
                    text: '就诊号',
                    asterisk: false,
                    dataType: Input,
                    dataParams: {
                        className: styles.readOnly,
                        readOnly: true,
                    },
                },
            ],
        },
        {
            labelBoxArray: [
                {
                    text: '姓名',
                    asterisk: true,
                    dataType: HintInput,
                    dataParams: {
                        onChange: (e) => {
                            outpatientClinicListService.setPatInfo('name', e.target.value)
                        },
                    },
                },
                {
                    text: '性别',
                    asterisk: true,
                    dataType: RadioGroup,
                    dataParams: {
                        dataOption: {value: 'value', key: 'key'},
                        onChange: (o) => {
                            outpatientClinicListService.setPatInfo('sex', o.key)
                        },
                        className: styles.mySingleRadio,
                    },
                },
            ],
        },
        {
            labelBoxArray: [
                {
                    text: '出生日期',
                    asterisk: true,
                    dataType: TimePicker,
                    dataParams: {
                        dateChange: (t) => {
                            outpatientClinicListService.setPatInfo('dateOfBirth', t)
                        },
                        className:styles.myTime
                    },
                }
            ],
        },
        {
            labelBoxArray: [
                {
                    text: '费别',
                    asterisk: false,
                    dataType: Select,
                    dataParams: {
                        className: styles.mySelect,
                        onSelect: (i, o) => {
                            outpatientClinicListService.setPatInfo('chargeType', o.props.value, o.key)
                        },
                        dataOption: {value: 'value', key: 'key'},
                    },
                },
                {
                    text: '身份',
                    asterisk: false,
                    dataType: Select,
                    dataParams: {
                        className: styles.mySelect,
                        onSelect: (i, o) => {
                            outpatientClinicListService.setPatInfo('identity', o.props.value, o.key)
                        },
                        dataOption: {value: 'value', key: 'key'},
                    },
                },
            ],
        },
        {
            labelBoxArray: [
                {
                    text: '身份证号码',
                    asterisk: true,
                    dataType: HintInput,
                    dataParams: {
                        onChange: (e) => {
                            outpatientClinicListService.setPatInfo('idNo', e.target.value)
                        },
                    },
                },
            ],
        },
        {
            labelBoxArray: [
                {
                    text: '联系人',
                    asterisk: false,
                    dataType: HintInput,
                    dataParams: {
                        onChange: (e) => {
                            outpatientClinicListService.setPatInfo('nextOfKin', e.target.value)
                        },
                    },
                },
                {
                    text: '联系人电话',
                    asterisk: false,
                    dataType: HintInput,
                    dataParams: {
                        onChange: (e) => {
                            outpatientClinicListService.setPatInfo('nextOfKinPhone', e.target.value)
                        },
                    },
                },
            ],
        },
        {
            labelBoxArray: [
                {
                    text: '地址',
                    asterisk: false,
                    dataType: HintInput,
                    dataParams: {
                        onChange: (e) => {
                            outpatientClinicListService.setPatInfo('mailingAddress', e.target.value)
                        },
                    },
                },
            ],
        },
    ]

    render() {

        let {
            rowDataList,
            rowDataDetail,
            outpDept,
            modal,
            isTurnBox,
            isModifyBox,
            rowDataTurn,
            isFirstVisit,
            firstVisit,
            secondVisit,
            defaultSelect,
            userInput,
            curPatInfo,
            dictSex,
            dictChargeType,
            dictIdentity,
            chargeTypeIndex,
            identityIndex,
        } = this.state

        extend(true, this.patientInfo, [
                {
                    labelBoxArray: [
                        // 患者ID
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.patientId ? curPatInfo.patientId : null
                            }
                        },
                        // 就诊号
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.visitNo ? curPatInfo.visitNo : null
                            }
                        }
                    ]
                },
                {
                    labelBoxArray: [
                        // 姓名
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.name ? curPatInfo.name : null
                            }
                        },
                        // 性别
                        {
                            dataParams: {
                                data: dictSex,
                                value: !curPatInfo ? null : String(curPatInfo.sex) ? String(curPatInfo.sex) : null,
                            }
                        }
                    ]
                },
                {
                    labelBoxArray: [
                        // 出生日期
                        {
                            dataParams: {
                                oValue: !curPatInfo ? null : curPatInfo.dateOfBirth ? curPatInfo.dateOfBirth : null
                            }
                        },
                    ]
                },
                {
                    labelBoxArray: [
                        // 费别
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.chargeType ? dictChargeType[chargeTypeIndex].value : null,
                                data: dictChargeType
                            }
                        },
                        // 身份
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.identity ? dictIdentity[identityIndex].value : null,
                                data: dictIdentity
                            }
                        },
                    ]
                },
                {
                    labelBoxArray: [
                        // 身份证号码
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.idNo ? curPatInfo.idNo : null
                            }
                        },
                    ]
                },
                {
                    labelBoxArray: [
                        // 联系人
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.nextOfKin ? curPatInfo.nextOfKin : null
                            }
                        },
                        // 联系人电话
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.nextOfKinPhone ? curPatInfo.nextOfKinPhone : null
                            }
                        },
                    ]
                },
                {
                    labelBoxArray: [
                        // 地址
                        {
                            dataParams: {
                                value: !curPatInfo ? null : curPatInfo.mailingAddress ? curPatInfo.mailingAddress : null
                            }
                        },
                    ]
                },
            ]
        )

        return (
            <div className={styles.root}>
                {/* 头部：初诊、复诊、下拉框 */}
                <div className={styles.patientListTitle}>
                    <button className={
                        classNames(styles.titleButton, isFirstVisit ? styles.titleButtonActive : null)}
                            onClick={() => {
                                outpatientClinicListService.toggleBtnClick(0)
                            }}>
                        初诊({firstVisit})
                    </button>
                    <button className={
                        classNames(styles.titleButton, isFirstVisit ? null : styles.titleButtonActive)}
                            onClick={() => {
                                outpatientClinicListService.toggleBtnClick(1)
                            }}>
                        复诊({secondVisit})
                    </button>
                    <Select
                        data={outpDept}
                        dataOption={{value: 'value', key: 'key', inputCode: 'inputCode'}}
                        value={!modal ? '' : modal.visitDeptName ? modal.visitDeptName : ''}
                        filterOption={
                            (input, option) => {
                                if (outpDept[option.key].inputCode || outpDept[option.key].inputCodeWb) {
                                    return String(option.props.children).indexOf(input) >= 0 ||
                                    outpDept[option.key].inputCode.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                    outpDept[option.key].inputCodeWb.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }else{
                                    return String(option.props.children).indexOf(input) >= 0
                                }
                            }
                        }
                        onSelect={outpatientClinicListService.handleChange}
                        className={classNames(styles.titleSelect)}
                        dropdownClassName={styles.titleSelectDropDown}
                        allowClear={true}
                        showSearch={true}/>
                </div>
                {/* 查询：当天、全科，输入框 */}
                <div>
                    <div className={styles.myCheckBox}>
                        <CheckboxGroup
                            onChange={(array) => {
                                outpatientClinicListService.searchTodayOrAllDept(array)
                            }}
                            options={this.options}
                            defaultValue={defaultSelect ? defaultSelect : []}
                        />
                    </div>
                    <div className={classNames(styles.mySearchBox, styles.padding8Search)}>
                        <Search
                            onSearch={(input) => {
                                outpatientClinicListService.searchInput(input)
                            }}
                            onChange={outpatientClinicListService.loadInput}
                            enterButton={true}
                            placeholder="姓名/姓名首字母/患者ID"
                            className={styles.mySearch}
                            defaultValue={userInput ? userInput : ''}
                        />
                    </div>
                </div>
                {/* 诊号 ag表格*/}
                <div className={styles.tableList}>
                    <Table
                        rowData={rowDataList}
                        ContextMenuList={this.tableRightClickList}
                        customWith={true}
                        columnDefs={this.columnsList}
                        agtableClassName={classNames(styles.tableEc, styles.tableEc26)}
                        rowHeight={24}
                        menuClik={outpatientClinicListService.menuClick}
                        onCellContextMenu={outpatientClinicListService.loadPatInfo}
                        onRowClicked={outpatientClinicListService.loadPatInfo}
                        onGridReady={outpatientClinicListService.onGridReadyList}
                        rowClassRules={{
                            [styles.oneLineOrange]: (params) => {
                                if (params.data.registerDept !== params.data.visitDept) {
                                    return true
                                } else {
                                    return false
                                }
                            },
                        }}
                    />
                </div>
                {/* 就诊时间 ag表格*/}
                <div className={styles.tableDetail}>
                    <Table
                        rowData={rowDataDetail}
                        columnDefs={this.columnsDetail}
                        agtableClassName={classNames(styles.tableEc, styles.tableBe26)}
                        rowHeight={24}
                        onGridReady={outpatientClinicListService.onGridReadyDetail}
                        // onRowClicked={outpatientClinicListService.test}
                    />
                </div>
                {/*转科弹框*/}
                <div className={classNames(styles.box, styles.turnBox)}>
                    <DragMove
                        onOk={() => {
                            outpatientClinicListService.closeTurn(1)
                        }}
                        onCancel={() => {
                            outpatientClinicListService.closeTurn(0)
                        }}
                        visible={isTurnBox}
                        okText="转科"
                        cancelText="取消"
                        title="转科"
                        cwidth={670}
                        cheight={506}
                    >
                        <div className={styles.turnMiddle}>
                            <div className={classNames(styles.mySearchBox, styles.width217Search)}>
                                <Search
                                    onSearch={(input) => {
                                        outpatientClinicListService.searchTurnInput(input)
                                    }}
                                    enterButton={true}
                                    placeholder="输入科室名称模糊查询"
                                    className={styles.mySearch}
                                />
                            </div>
                            <div className={styles.turnTable}>
                                <Table
                                    rowData={rowDataTurn}
                                    columnDefs={this.columnsTurn}
                                    agtableClassName={classNames(styles.tableEc, styles.tableEc26)}
                                    rowHeight={28}
                                    onRowClicked={outpatientClinicListService.loadCurRow}
                                    singleClickEdit={true} // 点击启动编辑加载组件
                                    suppressDragLeaveHidesColumns={true} // 关闭拖动列到表格外删除列
                                    suppressMovableColumns={true} // 关闭拖动换列
                                    suppressCellSelection={false} // 如果为true，则单元格将不可选/。这意味着单击单元格时单元格不会获得键盘焦点
                                    stopEditingWhenGridLosesFocus={true} // 网格失去焦点时停止单元格编辑
                                    suppressScrollOnNewData={true} // 获取新数据不会滚动到顶部
                                />
                            </div>
                        </div>
                    </DragMove>
                </div>
                {/* 修改患者信息弹框 */}
                <div className={classNames(styles.box, styles.patientBox)}>
                    <DragMove
                        onOk={() => {
                            outpatientClinicListService.closeModify(1)
                        }}
                        onCancel={() => {
                            outpatientClinicListService.closeModify(0)
                        }}
                        visible={isModifyBox}
                        okText="保存"
                        title="修改患者信息"
                        cwidth={444}
                        cheight={360}
                    >
                        {
                            this.patientInfo.map((item: any, key) => {
                                return (
                                    <div className={classNames(styles.myLabelBoxBox, styles.patientLabelBox)} key={key}>
                                        {
                                            item.labelBoxArray.map((value: any, index) => {
                                                return (
                                                    <LabelBox
                                                        className={styles.myLabelBoxTotal}
                                                        text={value.text}
                                                        asterisk={value.asterisk}
                                                        key={index}
                                                    >
                                                        {React.createElement(value.dataType, value.dataParams)}
                                                    </LabelBox>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </DragMove>
                </div>
            </div>
        )
    }
}