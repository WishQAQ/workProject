// basic
import React from 'react'
// scss
import styles from './style/index.scss'
import classNames from 'classnames'
// AnTd
import {Button, Icon, Radio, Input} from 'antd'
// oak component
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {DragMove} from 'pkg/common/dragging'

/* AnTd单选按钮组件*/
const RadioGroup = Radio.Group

/* AnTd输入框组件*/
const Search = Input.Search

export interface State {
    rowDataDisposal?: any,
    rowDataDisposalHistory?: any,
    rowDataPrescription?: any,
    rowDataPrescriptionHistory?: any,
    rowDataValuation?: any,
    rowDataTemplate?: any,
    rowDataTemplateDetail?: any,
    showValuationBox?: any,
    showDisposalHistoryBox?: any,
    showPrescriptionHistoryBox?: any,
    showTemplateBox?: any,
}

export default class OutpatientClinicPrescription extends React.Component<any, State> {

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
            headerName: '类别',
            field: 'category',
            width: 89,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '项目名称',
            field: 'category',
            width: 129,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '数量',
            field: 'category',
            width: 73,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位',
            field: 'category',
            width: 73,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '频次',
            field: 'category',
            width: 73,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '医生说明',
            field: 'category',
            width: 198,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '执行科室',
            field: 'category',
            width: 109,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '收费标识',
            field: 'category',
            width: 103,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '开单序号',
            field: 'category',
            width: 110,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '实收',
            field: 'category',
            width: 79,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    columnsPrescription = [
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
            headerName: '处方号',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '类别',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '药名',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '规格',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '厂商',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '药品数量',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '剂数',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位用量',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '途径',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '频次',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '天数',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '医生说明',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '实收',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '药局',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '属性',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '特病',
            field: 'number',
            width: 48,
            minWidth: 48,
            maxWidth: 48,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '离休',
            field: 'number',
            width: 48,
            minWidth: 48,
            maxWidth: 48,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '收费标识',
            field: 'number',
            width: 100,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    columnsDisposalHistory = [
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
            headerName: '类别',
            field: 'category',
            width: 72,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '项目名称',
            field: 'category',
            width: 109,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '数量',
            field: 'category',
            width: 59,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位',
            field: 'category',
            width: 59,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '频次',
            field: 'category',
            width: 59,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '医生说明',
            field: 'category',
            width: 203,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '执行科室',
            field: 'category',
            width: 87,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    columnsPrescriptionHistory = [
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
            headerName: '处方号',
            field: 'number',
            width: 60,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '药名',
            field: 'number',
            width: 59,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '规格',
            field: 'number',
            width: 49,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '厂商',
            field: 'number',
            width: 59,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '药品数量',
            field: 'number',
            width: 69,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位',
            field: 'number',
            width: 49,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '剂数',
            field: 'number',
            width: 53,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位用量',
            field: 'number',
            width: 65,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '途径',
            field: 'number',
            width: 43,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '频次',
            field: 'number',
            width: 49,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '天数',
            field: 'number',
            width: 59,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '医生说明',
            field: 'number',
            width: 209,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '药局',
            field: 'number',
            width: 48,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '属性',
            field: 'number',
            width: 141,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    columnsValuation = [
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
            headerName: '类别',
            field: 'number',
            width: 60,
            maxWidth: 60,
            minWidth: 60,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '计价项目',
            field: 'number',
            width: 162,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '金额',
            field: 'number',
            width: 60,
            maxWidth: 60,
            minWidth: 60,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位',
            field: 'number',
            width: 60,
            maxWidth: 60,
            minWidth: 60,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '数量',
            field: 'number',
            width: 60,
            maxWidth: 60,
            minWidth: 60,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '规格',
            field: 'number',
            width: 60,
            maxWidth: 60,
            minWidth: 60,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    columnsTemplate = [
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
            headerName: '子主题',
            field: 'number',
            width: 66,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '副主题',
            field: 'number',
            width: 54,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '范围',
            field: 'number',
            width: 45,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '适用',
            field: 'number',
            width: 57,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    columnsTemplateDetail = [
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
            headerName: '类别',
            field: 'number',
            width: 113,
            maxWidth: 113,
            minWidth: 113,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '项目名称',
            field: 'number',
            width: 198,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '规格',
            field: 'number',
            width: 51,
            maxWidth: 51,
            minWidth: 51,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '数量',
            field: 'number',
            width: 51,
            maxWidth: 51,
            minWidth: 51,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
        {
            headerName: '单位',
            field: 'number',
            width: 51,
            maxWidth: 51,
            minWidth: 51,
            cellClass: () => {
                return styles.tableColumn28
            }
        },
    ]

    constructor(props) {
        super(props)
        this.state = {
            rowDataDisposal: [
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
            ],
            rowDataDisposalHistory: [
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
                {category: '测试数据'},
            ],
            rowDataPrescription: [
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
            ],
            rowDataPrescriptionHistory: [
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
            ],
            rowDataValuation: [
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
            ],
            rowDataTemplate: [
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
            ],
            rowDataTemplateDetail: [
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
                {number: '测试数据'},
            ],
            showValuationBox: false,
            showDisposalHistoryBox: false,
            showPrescriptionHistoryBox: false,
            showTemplateBox: false,
        }
    }

    // 双击显示计价弹框
    onToggleValuationBox = (status) => {
        this.setState({
            showValuationBox: status
        })
    }

    // 历史处置
    onToggleDisposalHistoryBox = (status) => {
        this.setState({
            showDisposalHistoryBox: status
        })
    }

    // 历史处方
    onTogglePrescriptionHistoryBox = (status) => {
        this.setState({
            showPrescriptionHistoryBox: status
        })
    }

    // 模板
    onToggleTemplateBox = (status) => {
        this.setState({
            showTemplateBox: status
        })
    }

    render() {

        let {
            rowDataDisposal,
            rowDataDisposalHistory,
            rowDataPrescription,
            rowDataPrescriptionHistory,
            rowDataValuation,
            rowDataTemplate,
            rowDataTemplateDetail,
            showValuationBox,
            showDisposalHistoryBox,
            showPrescriptionHistoryBox,
            showTemplateBox,
        } = this.state

        return (
            <div className={styles.root}>
                <div className={styles.prescriptionTemplate}>
                    <div className={styles.templateLeft}><span>处置</span></div>
                    <div className={styles.templateRight}>
                        <div className={styles.templateTable}>
                            <Table
                                rowData={rowDataDisposal}
                                columnDefs={this.columnsDisposal}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                rowHeight={28}
                                rowSelection={'multiple'}
                                onCellDoubleClicked={() => {
                                    this.onToggleValuationBox(true)
                                }}
                            />
                        </div>
                        <div className={styles.templateOperate}>
                            <div className={styles.btnGroup}>
                                <Button className={classNames(styles.myButton, styles.myAdd)}>
                                    <IconFont iconName={'icon-tianjia'}/>新增
                                </Button>
                                <Button className={classNames(styles.myButton, styles.myDelete)}>
                                    <IconFont iconName={'icon-jianqu'}/>删除
                                </Button>
                                <Button className={classNames(styles.myButton, styles.mySave)}
                                        onClick={() => {
                                            this.onToggleDisposalHistoryBox(true)
                                        }}
                                >
                                    <IconFont iconName={'icon-baogao-copy'}/>历史处置
                                </Button>
                                <Button className={classNames(styles.myButton, styles.mySave)}
                                        onClick={() => {
                                            this.onToggleTemplateBox(true)
                                        }}
                                >
                                    <IconFont iconName={'icon-leimupinleifenleileibie'}/>模板
                                </Button>
                            </div>
                            <div className={styles.spend}>
                                <div className={styles.oneSpend}>总价：<span>25433.00</span></div>
                                <div className={styles.oneSpend}>实收：<span className={styles.speSpan}>24682.26</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.prescriptionTemplate}>
                    <div className={styles.templateLeft}><span>处方</span></div>
                    <div className={styles.templateRight}>
                        <div className={styles.templateTable}>
                            <Table
                                rowData={rowDataPrescription}
                                columnDefs={this.columnsPrescription}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                rowHeight={28}
                                rowSelection={'multiple'}
                                onCellDoubleClicked={() => {
                                    this.onToggleValuationBox(true)
                                }}
                            />
                        </div>
                        <div className={styles.templateOperate}>
                            <div className={styles.btnGroup}>
                                <Button className={classNames(styles.myButton, styles.mySave)}>
                                    <IconFont iconName={'icon-yemian'}/>新方
                                </Button>
                                <Button className={classNames(styles.myButton, styles.mySave)}>
                                    <IconFont iconName={'icon-tianjia'}/>添加
                                </Button>
                                <Button className={classNames(styles.myButton, styles.mySave)}>
                                    <IconFont iconName={'icon-tianjia'}/>插入
                                </Button>
                                <Button className={classNames(styles.myButton, styles.mySave)}>
                                    <IconFont iconName={'icon-zicaidan_hover'}/>子处方
                                </Button>
                                <Button className={classNames(styles.myButton, styles.myDelete)}>
                                    <IconFont iconName={'icon-jianqu'}/>删除
                                </Button>
                                <Button className={classNames(styles.myButton, styles.mySave)}
                                        onClick={() => {
                                            this.onTogglePrescriptionHistoryBox(true)
                                        }}
                                >
                                    <IconFont iconName={'icon-baogao-copy'}/>历史处方
                                </Button>
                            </div>
                            <div className={styles.spend}>
                                <div className={styles.oneSpend}>总价：<span>25433.00</span></div>
                                <div className={styles.oneSpend}>实收：<span className={styles.speSpan}>24682.26</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.valuationBox}>
                    <DragMove
                        onOk={() => {
                            this.onToggleValuationBox(false)
                        }}
                        onCancel={() => {
                            this.onToggleValuationBox(false)
                        }}
                        visible={showValuationBox}
                        title={<div className={styles.valuationBoxTitle}>
                            <span>计价项目</span>
                            <Button className={styles.titleBtn}>
                                <Icon type="plus"/>
                            </Button>
                            <Button className={styles.titleBtn}>
                                <Icon type="minus"/>
                            </Button>
                        </div>}
                        cwidth={498}
                        cheight={234}
                        move={false}
                        maskClosable={true}
                    >
                        <div className={styles.valuationTable}>
                            <Table
                                rowData={rowDataValuation}
                                columnDefs={this.columnsValuation}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                rowHeight={28}
                                rowSelection={'multiple'}
                            />
                        </div>
                    </DragMove>
                </div>
                <div className={classNames(styles.box, styles.DisposalHistoryBox)}>
                    <DragMove
                        onOk={() => {
                            this.onToggleDisposalHistoryBox(false)
                        }}
                        onCancel={() => {
                            this.onToggleDisposalHistoryBox(false)
                        }}
                        visible={showDisposalHistoryBox}
                        okText="复制"
                        cancelText="关闭"
                        title="历史处置"
                        cwidth={716}
                        cheight={526}
                    >
                        <div className={styles.boxTable}>
                            <Table
                                rowData={rowDataDisposalHistory}
                                columnDefs={this.columnsDisposalHistory}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc30)}
                                rowHeight={30}
                            />
                        </div>
                    </DragMove>
                </div>
                <div className={classNames(styles.box, styles.PrescriptionHistoryBox)}>
                    <DragMove
                        onOk={() => {
                            this.onTogglePrescriptionHistoryBox(false)
                        }}
                        onCancel={() => {
                            this.onTogglePrescriptionHistoryBox(false)
                        }}
                        visible={showPrescriptionHistoryBox}
                        okText="复制"
                        cancelText="关闭"
                        title="历史处方"
                        cwidth={1079}
                        cheight={526}
                    >
                        <div className={styles.boxTable}>
                            <Table
                                rowData={rowDataPrescriptionHistory}
                                columnDefs={this.columnsPrescriptionHistory}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc30)}
                                rowHeight={30}
                            />
                        </div>
                    </DragMove>
                </div>
                <div className={classNames(styles.box, styles.PrescriptionHistoryBox)}>
                    <DragMove
                        onOk={() => {
                            this.onTogglePrescriptionHistoryBox(false)
                        }}
                        onCancel={() => {
                            this.onTogglePrescriptionHistoryBox(false)
                        }}
                        visible={showPrescriptionHistoryBox}
                        okText="复制"
                        cancelText="关闭"
                        title="历史处方"
                        cwidth={1079}
                        cheight={526}
                    >
                        <div className={styles.boxTable}>
                            <Table
                                rowData={rowDataPrescriptionHistory}
                                columnDefs={this.columnsPrescriptionHistory}
                                agtableClassName={classNames(styles.tableEc, styles.tableEc30)}
                                rowHeight={30}
                            />
                        </div>
                    </DragMove>
                </div>
                <div className={classNames(styles.box, styles.templateBox)}>
                    <DragMove
                        onOk={() => {
                            this.onToggleTemplateBox(false)
                        }}
                        onCancel={() => {
                            this.onToggleTemplateBox(false)
                        }}
                        otherButton={[
                            {
                                antBtnText: '删除',
                                antBtnType: 'danger',
                                otherClick: (e) => {this.onToggleTemplateBox(false)},
                            },
                        ]}
                        visible={showTemplateBox}
                        okText="确定"
                        title="模板"
                        cwidth={802}
                        cheight={577}
                    >
                        <div className={classNames(styles.mySearchBox,styles.templateBoxSearch)}>
                            <div className={styles.templateBoxSearchName}>模板类型：</div>
                            <RadioGroup name="radiogroup"
                                        defaultValue={2}
                                        // onChange={dataListService.radioChange}
                                        className={styles.mySingleRadio}
                            >
                                <Radio value={2}>通用</Radio>
                                <Radio value={1}>处置</Radio>
                                <Radio value={0}>处方</Radio>
                            </RadioGroup>
                            <Search
                                placeholder="输入模板名称"
                                className={classNames(styles.mySearch,styles.templateBoxSearchText)}
                                // onSearch={dataListService.onchangMain.bind(this, 'cvName')}
                                enterButton={true}
                            />
                        </div>
                        <div className={styles.templateBoxMain}>
                            <div className={styles.templateBoxLeft}>
                                <div className={classNames(styles.title, styles.templateBoxLeftTitle)}>模板信息</div>
                                <div className={styles.templateBoxLeftTable}>
                                    <Table
                                        rowData={rowDataTemplate}
                                        columnDefs={this.columnsTemplate}
                                        agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                        rowHeight={28}
                                        rowSelection={'multiple'}
                                    />
                                </div>
                            </div>
                            <div className={styles.templateBoxRight}>
                                <div className={classNames(styles.title, styles.templateBoxRightTitle)}>模板明细项目</div>
                                <div className={styles.templateBoxRightTable}>
                                    <Table
                                        rowData={rowDataTemplateDetail}
                                        columnDefs={this.columnsTemplateDetail}
                                        agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                        rowHeight={28}
                                        rowSelection={'multiple'}
                                    />
                                </div>
                            </div>
                        </div>
                    </DragMove>
                </div>
            </div>
        )
    }

}