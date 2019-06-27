/**
 * 个人交接记录弹框
 * create by wx 2018.01.31
 */
import React from 'react'
import * as style from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {HintInput as HInput} from 'pkg/common/input'
import {TimePicker} from 'pkg/common/timePicker'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {Input, Row, Col} from 'antd'
import {Images} from 'pkg/common/image/image'
import {RadioGroup} from 'pkg/common/radioGroup'
import {ColorIcon} from 'pkg/common/colorIcon'
import moment from 'moment'
const {TextArea} = Input

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {ShiftRecordState, shiftRecordService} from 'service/nurse/shift/change-shifts/shift-record'

export default class ShiftRecord extends FluxComponent<ShiftRecordState> {
    title = '个人交接记录弹框'
    shiftRecordService = shiftRecordService

    personColumns = [
        {
            headerName: '交班时间',
            field: 'createTime',
            width: 44,
            cellClass: (params) => {
                return shiftRecordService.setRowClass(params, style)
            },
            valueFormatter: (params: any) => {
                return moment(params.data.shiftTime).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            headerName: '班段',
            field: 'classesName',
            width: 18,
            cellClass: (params) => {
                return shiftRecordService.setRowClass(params, style)
            }
        },
        {
            headerName: '交班人员',
            field: 'createUserName',
            width: 20,
            cellClass: (params) => {
                return shiftRecordService.setRowClass(params, style)
            }
        },
        {
            headerName: '状态',
            field: 'status',
            width: 18,
            cellClass: (params) => {
                return shiftRecordService.setRowClass(params, style)
            }
        },
    ]

    radioData = [
        {value: '2', name: '全部'},
        {value: '0', name: '未交接'},
        {value: '1', name: '已交接'}
    ]
    radioDataOption = {key: 'value', value: 'name'}

    render() {
        const {modalVisible, modalLeftData, radioValue, time} = this.state
        const {patientLog, shiftChangeMaster,edit1} = this.state.modalRightData
        let isEdit=patientLog ? (patientLog.successorId ? true : false) : false
        return (
            <DragMove className={style.personModal}
                      cwidth={1034}
                      cheight={649}
                      top={56}
                      title={'个人交接记录'}
                      onCancel={shiftRecordService.modalClose}
                      onOk={(v) => v}
                      visible={modalVisible}>
                <div className={style.modalMain}>
                    <div className={style.mainLeft}>
                        <div className={style.title}>
                            <span>交班列表</span>
                            <RadioGroup className={style.radioGroup}
                                        value={radioValue + ''}
                                        onChange={(v) => shiftRecordService.changeModalLeftData(v)}
                                        data={this.radioData}
                                        dataOption={this.radioDataOption}
                                        isButton={true}/>
                        </div>
                        <div className={style.searchInput}>
                            <div>
                                <TimePicker className={style.time}
                                            oValue={time}
                                            dateChange={(v) => shiftRecordService.changeTime(v)}
                                            startPlaceholder={'输入日期'}
                                            isRange={false}/>
                                <span className={style.searchBtn}>
                                    <IconFont iconName={'icon-sousuo_sousuo'}/>
                                </span>
                            </div>
                        </div>
                        <div className={style.tableWrap}>
                            <Table columnDefs={this.personColumns}
                                   onCellClicked={(v) => shiftRecordService.selectDetail(v.data)}
                                   rowData={modalLeftData}
                                   headerHeight={25}
                                   rowHeight={25}/>
                        </div>
                    </div>
                    <div className={style.mainRight}>
                        <div className={`${style.basicInfo} ${style.wrapBorder}`}>
                            <Row>
                                <Col span={4}>
                                    <ColorIcon
                                        iconName={patientLog ? patientLog.sex === '男' ? 'icon-nantouxiang' : patientLog.sex === '女'
                                            ? 'icon-nvtouxiang' : 'icon-wumingshi' : ''}
                                        className={style.colorIcon}/>
                                    <span>{patientLog ? patientLog.name : ''}</span>
                                </Col>
                                <Col span={3}>
                                    <span>年龄:</span>
                                    <div>{patientLog.age}</div>
                                </Col>
                                <Col span={4}>
                                    <span>ID:</span>
                                    <div>{patientLog.id}</div>
                                </Col>
                                <Col span={3}>
                                    <span>床号:</span>
                                    <div>{patientLog.bedNo}</div>
                                </Col>
                                <Col span={4}>
                                    <span>费别:</span>
                                    <div>{patientLog.chargeType}</div>
                                </Col>
                                <Col span={6}>
                                    <span>医保号:</span>
                                    <div>{patientLog.insuranceNo}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={14}>
                                    <span>诊断:</span>
                                    <div>{patientLog.diagnosis}</div>
                                </Col>
                                <Col span={10}>
                                    <span>主管护士:</span>
                                    <div>{patientLog.dutyNurseName}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <span>病情级别:</span>
                                    <div>{patientLog.patientConditionName}</div>
                                </Col>
                                <Col span={5}>
                                    <span>护理级别:</span>
                                    <div>{patientLog.nursingClassName}</div>
                                </Col>
                                <Col span={5}>
                                    <span>负责医生:</span>
                                    <div>{patientLog.doctorInChargeName}</div>
                                </Col>
                                <Col span={4}>
                                    <span>病区:</span>
                                    <div>{patientLog.wardName}</div>
                                </Col>
                                <Col span={6}>
                                    <span>床位:</span>
                                    <div>{patientLog.bedLabel}</div>
                                </Col>
                            </Row>
                        </div>
                        <div className={`${style.infoCollect} ${style.wrapBorder}`}>
                            <div className={style.title}>
                                病人信息采集
                            </div>
                            <div className={style.collectBox}>
                                <Rounded leftShow={'心率'} className={style.rounded}>
                                    <HInput value={patientLog.pulse} disabled={isEdit}
                                            onChange={shiftRecordService.inputOnchage.bind(this, 'patientLog.pulse')}
                                    />
                                </Rounded>
                                <Rounded leftShow={'血压'} className={style.rounded}>
                                    <HInput value={patientLog.breathing} disabled={isEdit}
                                            onChange={shiftRecordService.inputOnchage.bind(this, 'patientLog.breathing')}
                                    />
                                </Rounded>
                                <Rounded leftShow={'体温'} className={style.rounded}>
                                    <HInput value={patientLog.temperature} disabled={isEdit}
                                            onChange={shiftRecordService.inputOnchage.bind(this, 'patientLog.temperature')}
                                    />
                                </Rounded>
                                <Rounded leftShow={'入液量'} className={style.rounded}>
                                    <HInput value={patientLog.enterLiquid} disabled={isEdit}
                                            onChange={shiftRecordService.inputOnchage.bind(this, 'patientLog.enterLiquid')}
                                    />
                                </Rounded>
                                <Rounded leftShow={'出液量'} className={style.rounded}>
                                    <HInput value={patientLog.appearLiquid} disabled={isEdit}
                                            onChange={shiftRecordService.inputOnchage.bind(this, 'patientLog.appearLiquid')}
                                    />
                                </Rounded>
                            </div>
                        </div>
                        <div className={`${style.shiftItem} ${style.wrapBorder}`}>
                            <div>
                                <div className={style.title}>
                                    <span>交班事项</span>
                                    <button className={`${style.btn} ${style.defualtBtn} ${style.bigBtn}`}>
                                        <IconFont iconName={'icon-iocnchexiao'} hover={true}/>
                                        <span>导入文本模框</span>
                                    </button>
                                    <button className={`${style.btn} ${style.defualtBtn} ${style.bigBtn}`}>
                                        <IconFont iconName={'icon-iocnchexiao'} hover={true}/>
                                        <span>导入护理记录</span>
                                    </button>
                                    <button className={`${style.btn} ${style.greenBtn}`}
                                            onClick={shiftRecordService.addPatientLog}
                                    >
                                        <IconFont iconName={'icon-baocun1'} hover={true}/>
                                        <span>保存</span>
                                    </button>
                                    <button className={`${style.btn} ${style.greenBtn}`}
                                            disabled={edit1}
                                            onClick={()=> shiftRecordService.shiftBtn
                                            (patientLog ? (patientLog.successorId ? '接班' : '交班') : '交班')}>
                                        <IconFont iconName={'icon-jiaobanguanli1'} hover={true}/>
                                        <span >{patientLog ? (patientLog.successorId ? '接班' : '交班') : '交班'}</span>
                                    </button>
                                </div>
                                <TextArea className={style.shiftItemContent} value={patientLog.transferContent} disabled={isEdit}
                                          onChange={shiftRecordService.textAreaOnchange.bind(this, 'patientLog.transferContent')}
                                />
                            </div>
                            <div>
                                <div className={style.title}>交班备注</div>
                                <TextArea className={style.shiftItemContent} value={shiftChangeMaster.remarks} disabled={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </DragMove>
        )
    }
}