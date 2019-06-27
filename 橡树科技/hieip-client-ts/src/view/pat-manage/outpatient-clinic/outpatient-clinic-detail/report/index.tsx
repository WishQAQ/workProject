// basic
import React, {Component} from 'react'
import moment from 'moment'
// scss
import classNames from 'classnames'
import styles from './style/index.scss'
// oak Component
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {LabelBox} from 'pkg/ui/labelBox'
import {HintInput} from 'pkg/common/input'
import {Charts} from 'pkg/common/echarts'
// antd
import {Tabs, Button, Input, Col, Row, Menu,} from 'antd'
// service
import {
    outpatientClinicDetailReportService, OutpatientClinicDetailReportState
} from 'service/pat-manage/outpatient-clinic/outpatient-clinic-detail/report'
import {FluxComponent} from 'tools/flux/FluxComponent'

// 卡片式页签
const TabPane = Tabs.TabPane
// 用于多行输入
const {TextArea} = Input

export default class OutpatientClinicReport extends FluxComponent<OutpatientClinicDetailReportState> {

    title: '门诊医生站-报告'
    outpatientClinicDetailReportService = outpatientClinicDetailReportService

    // 检查按钮
    examOperations = <Button className={styles.myButton}><IconFont iconName={'icon-tuxiang'}/>图像</Button>

    // 检验按钮
    inspectOperations = <Button className={styles.myButton}><IconFont iconName={'icon-ordinaryprint'}/>打印申请单</Button>

    columnsExam = [
        {
            headerName: '检查主题',
            field: 'theme',
            width: 116,
            maxWidth: 116,
            minWidth: 116,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '状态',
            field: 'status',
            width: 47,
            maxWidth: 47,
            minWidth: 47,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '申请时间',
            field: 'applyTime',
            width: 127,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
    ]

    columnsInspect = [
        {
            headerName: '检验主题',
            field: 'theme',
            width: 116,
            maxWidth: 116,
            minWidth: 116,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '状态',
            field: 'status',
            width: 47,
            maxWidth: 47,
            minWidth: 47,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '申请时间',
            field: 'applyTime',
            width: 127,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
    ]

    columnsInspectDetail = [
        {
            headerName: '检验项目',
            field: 'theme',
            width: 89,
            maxWidth: 89,
            minWidth: 89,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '检查状态',
            field: 'status',
            width: 73,
            maxWidth: 73,
            minWidth: 73,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
        {
            headerName: '报告时间',
            field: 'applyTime',
            width: 128,
            cellClass: (params: any) => {
                return styles.tableColumn24
            }
        },
    ]

    columnsInspectContent = [
        {
            headerName: '报告项目名称',
            field: 'theme',
            width: 336,
            cellClass: (params: any) => {
                return styles.tableColumn26
            }
        },
        {
            headerName: '结果',
            field: 'status',
            width: 85,
            maxWidth: 85,
            minWidth: 85,
            cellClass: (params: any) => {
                return styles.tableColumn26
            }
        },
        {
            headerName: '异常',
            field: 'appliTime',
            width: 85,
            maxWidth: 85,
            minWidth: 85,
            cellClass: (params: any) => {
                return styles.tableColumn26
            }
        },
        {
            headerName: '单位',
            field: 'unit',
            width: 120,
            maxWidth: 120,
            minWidth: 120,
            cellClass: (params: any) => {
                return styles.tableColumn26
            }
        },
        {
            headerName: '参考值',
            field: 'reference',
            width: 97,
            maxWidth: 97,
            minWidth: 97,
            cellClass: (params: any) => {
                return styles.tableColumn26
            }
        },
        {
            headerName: '趋势图',
            field: 'trend',
            width: 67,
            maxWidth: 67,
            minWidth: 67,
            cellClass: (params: any) => {
                return styles.tableColumn26
            },
            cellRendererFramework: MyButton,
            cellRendererParams: {
                btnClassName: styles.alterButton,
                getValue: (e, props) => {
                    outpatientClinicDetailReportService.setInspectContentOption(e, props)
                }
            },
        },
    ]

    render() {

        let examTitle = [
            [
                {
                    col: 6,
                    text: '检查类型',
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
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 6,
                    text: '申请时间',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 6,
                    text: '检查状态',
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
                    text: '检查医生',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 6,
                    text: '检查时间',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 12,
                    text: '报告时间',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
            ],
        ]
        let examBody = [
            [
                {
                    col: 24,
                    text: '结果',
                    data:
                        <TextArea
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                }
            ],
            [
                {
                    col: 24,
                    text: '检查参数',
                    data:
                        <TextArea
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                }
            ],
            [
                {
                    col: 24,
                    text: '检查所见',
                    data:
                        <TextArea
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                }
            ],
            [
                {
                    col: 24,
                    text: '印象',
                    data:
                        <TextArea
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                }
            ],
            [
                {
                    col: 24,
                    text: '建议',
                    data:
                        <TextArea
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                }
            ],
        ]
        let inspectTitle = [
            [
                {
                    col: 12,
                    text: '检验主题',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 6,
                    text: '标本',
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
                    col: 12,
                    text: '检验目的',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 6,
                    text: '申请时间',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
                {
                    col: 6,
                    text: '报告者',
                    data:
                        <HintInput
                            className={styles.myRcLabelBoxInput}
                            // value={patient ? patient.babyAgeDay : ''}
                            // onChange={(v) => basicService.onChangeDataSet(v, 'patient.babyAgeDay')}
                        />
                },
            ],
        ]

        let {
            operations,
            rowDataExam,
            rowDataInspect,
            rowDataInspectDetail,
            rowDataInspectContent,
            isShowTrendBox,
            isShowTrendBoxTop,
            examDetailList,
            inspectContentOption,
            trendBoxDisplace
        } = this.state

        return (
            <div>
                <div className={styles.root}>
                    <div className={styles.myInsideTabs}>
                        <Tabs tabBarExtraContent={operations === '1' ? this.examOperations : this.inspectOperations}
                              onChange={(key) => {
                                  outpatientClinicDetailReportService.changeReport(key)
                              }}>
                            <TabPane tab="检查报告" key="1">
                                <div className={styles.examTable}>
                                    <Table
                                        rowData={rowDataExam}
                                        columnDefs={this.columnsExam}
                                        agtableClassName={classNames(styles.tableEc, styles.tableEc26)}
                                        rowHeight={24}
                                    />
                                </div>
                                <div className={classNames(styles.examUlTitle)}>
                                    检查项目
                                </div>
                                <Menu
                                    onClick={outpatientClinicDetailReportService.handleClick}
                                    mode="inline"
                                    className={styles.examDetailMenu}
                                >
                                    {
                                        examDetailList === [] ? null : (
                                            examDetailList.map((item, key) => {
                                                return (
                                                    <Menu.Item key={key}>{item.name}</Menu.Item>
                                                )
                                            })
                                        )
                                    }
                                </Menu>
                                <div className={styles.examFixed}>
                                    <div className={styles.examTitle}>
                                        {
                                            examTitle === [] ? null : (
                                                examTitle.map((item, key) => {
                                                    return (
                                                        <Row key={key}>
                                                            {
                                                                item.map((value, index) => {
                                                                    return (
                                                                        <Col span={value.col} key={index}>
                                                                            <LabelBox
                                                                                text={value.text}
                                                                                className={classNames(
                                                                                    styles.myRcLabelBox,
                                                                                    examTitle.length - 1 === key ? styles.isBottom : null,
                                                                                    item.length - 1 === index ? styles.isRight : null
                                                                                )}
                                                                                className2={classNames(
                                                                                    styles.myRcLabelBoxText,
                                                                                    styles.myRcLabelBoxText73And12)}
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
                                    <div className={styles.examBody}>
                                        {
                                            examBody === [] ? null : (
                                                examBody.map((item, key) => {
                                                    return (
                                                        <Row key={key}>
                                                            {
                                                                item.map((value, index) => {
                                                                    return (
                                                                        <Col span={value.col} key={index}>
                                                                            <LabelBox
                                                                                text={value.text}
                                                                                className={classNames(
                                                                                    styles.myRcLabelBox,
                                                                                    styles.myRcLabelBoxColH,
                                                                                    examBody.length - 1 === key ?
                                                                                        styles.isBottom : null,
                                                                                    item.length - 1 === index ? styles.isRight : null
                                                                                )}
                                                                                className2={classNames(
                                                                                    styles.myRcLabelBoxText,
                                                                                    styles.myRcLabelBoxText73And12)}
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
                                </div>
                            </TabPane>
                            <TabPane tab="检验报告" key="2">
                                <div className={styles.inspectTable}>
                                    <Table
                                        rowData={rowDataInspect}
                                        columnDefs={this.columnsInspect}
                                        agtableClassName={classNames(styles.tableEc, styles.tableEc26)}
                                        rowHeight={24}
                                    />
                                </div>
                                <div className={styles.inspectDetail}>
                                    <Table
                                        rowData={rowDataInspectDetail}
                                        columnDefs={this.columnsInspectDetail}
                                        agtableClassName={classNames(styles.tableEc, styles.tableBe26)}
                                        rowHeight={24}
                                    />
                                </div>
                                <div className={styles.inspectFixed}>
                                    <div className={styles.examTitle}>
                                        {
                                            inspectTitle === [] ? null : (
                                                inspectTitle.map((item, key) => {
                                                    return (
                                                        <Row key={key}>
                                                            {
                                                                item.map((value, index) => {
                                                                    return (
                                                                        <Col span={value.col} key={index}>
                                                                            <LabelBox
                                                                                text={value.text}
                                                                                className={classNames(
                                                                                    styles.myRcLabelBox,
                                                                                    inspectTitle.length - 1 === key ?
                                                                                        styles.isBottom : null,
                                                                                    item.length - 1 === index ? styles.isRight : null
                                                                                )}
                                                                                className2={classNames(
                                                                                    styles.myRcLabelBoxText,
                                                                                    styles.myRcLabelBoxText73And12)}
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
                                    <div className={styles.inspectContent}>
                                        <Table
                                            rowData={rowDataInspectContent}
                                            columnDefs={this.columnsInspectContent}
                                            agtableClassName={classNames(styles.tableEc, styles.tableEc28)}
                                            onGridReady={outpatientClinicDetailReportService.loadTrendApi}
                                            rowHeight={26}
                                        />
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                {
                    !isShowTrendBox ? null :
                        <div style={{top: isShowTrendBoxTop}} className={classNames(styles.trendBox,
                            trendBoxDisplace ? styles.trendBoxDisplace : null
                        )}>
                            <Charts
                                echOption={inspectContentOption}
                                echID={'main'}
                                echClassName={styles.trendEch}
                            />
                        </div>
                }
                {!isShowTrendBox ? null : <div className={styles.maskLayer} onClick={outpatientClinicDetailReportService.showTrendBox}/>}
            </div>
        )
    }
}

export interface ButtonState {
    // 父组件的函数
    getValue?: (e, props?: any) => void,
    // 按钮样式
    btnClassName?: string,
}

class MyButton extends React.Component<ButtonState> {

    handleClick = (e, props?: any) => {
        this.props.getValue(e, props)
    }

    render() {
        let props = this.props
        return (
            <Button onMouseUp={(e) => {
                this.handleClick(e, props)
            }} className={this.props.btnClassName}>
                <IconFont iconName={'icon-zhexiantu'}/>
            </Button>
        )
    }
}
