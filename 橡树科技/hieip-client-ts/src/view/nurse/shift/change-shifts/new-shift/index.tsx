/**
 * 交接班弹框
 * create by wx 2018.01.24
 */
import React from 'react'
import * as style from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {HintInput as HInput} from 'pkg/common/input'
import {TimePicker} from 'pkg/common/timePicker'
import {Select} from 'pkg/common/select'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {Checkbox, Input, Row, Col} from 'antd'
import {ColorIcon} from 'pkg/common/colorIcon'
import $ from 'jquery'

const Option = Select.Option
const Search = Input.Search
const {TextArea} = Input

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {newShiftsModalService, NewShiftsModalState} from 'service/nurse/shift/change-shifts/new-shift'
import {NumberInput} from 'pkg/common/number-input'
import {JsonUtil} from 'tools/api/JsonUtil'
const patientColumns = [
    {
        headerName: '项目',
        field: 'actionName',
        tooltipField: 'actionName',
    },
    {
        headerName: '床号',
        field: 'bedLabel',
        tooltipField: 'bedLabel',
    },
    {
        headerName: '姓名',
        field: 'name',
        tooltipField: 'name',
    }
]
export default class NewShift extends FluxComponent<NewShiftsModalState> {
    title = '交接班弹框'
    newShiftsModalService = newShiftsModalService

    render() {
        let {
            modalVisible,
            patient,
            classesDict,
            patientLog,
            begin,
            opt,
            shiftChangeMaster,
            colsAndData,
            patientList,
            edit1,
            edit,
            classValue} = this.state
        let colsAndDataClone = $.extend(true, {}, colsAndData)
        colsAndDataClone = newShiftsModalService.cloneCols(colsAndDataClone)
        let isEdit=patientLog ? (patientLog.successorId ? true : false) : false
        return (<DragMove className={style.changeShiftsmodal}
                          cwidth={892}
                          cheight={662}
                          top={56}
                          title={'编辑交接班'}
                          onCancel={newShiftsModalService.modalClose}
                          onOk={(v) => v}
                          visible={modalVisible}>
            <div className={style.modalheader}>
                <Rounded leftShow={'交班日期'} className={`${style.rounded} ${style.date}`}>
                    <TimePicker className={style.timePicker} oValue={begin}
                                dateChange={newShiftsModalService.timeOnchage}/>
                </Rounded>
                <div className={style.nurseParagraph}>
                    <div>
                        <span>班段</span>
                        <Select
                            showSearch={true}
                            className={style.select}
                            dropdownClassName={style.dropDownMenu}
                            onChange={newShiftsModalService.selectOnChange}
                            value={classValue}
                        >{
                            classesDict ? classesDict.map((data, i) =>
                                <Option key={i} value={i.toString()}>{data.classesName}</Option>) : null}
                        </Select>
                    </div>
                </div>
                {/*  <button className={`${style.btn} ${style.defualtBtn} ${style.searchBtn}`}
                 >
                 <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                 <span>查询</span>
                 </button>*/}
                <button className={`${style.btn} ${style.greenBtn}`} onClick={newShiftsModalService.save}>
                    <IconFont iconName={'icon-baocun1'} hover={true}/>
                    <span>保存</span>
                </button>
            </div>
            <div className={style.modalmid}>
                <div className={style.midTable}>
                    <Table
                        columnDefs={colsAndDataClone && colsAndDataClone.cols}
                        rowData={colsAndDataClone && colsAndDataClone.data}
                        singleClickEdit={true}
                        suppressRowClickSelection={true}
                        suppressCellSelection={false}
                        stopEditingWhenGridLosesFocus={true}
                        rowHeight={26}
                        headerHeight={26}
                        onGridReady={newShiftsModalService.onGridReady}
                        onCellValueChanged={(v) => {
                            newShiftsModalService.regCellValue(v.value)
                        }}
                    />
                </div>
                <HInput className1={style.remarks} placeholder={'备注填写'} className2={style.midInput}/>
            </div>
            <div className={style.modalMain}>
                <div className={style.mainLeft}>
                    <div className={style.title}>
                        <span>交班病人</span>
                        <Checkbox checked={opt === 0 ? false : true}
                                  onChange={newShiftsModalService.onchange}>全部</Checkbox>
                    </div>
                    <div className={style.searchInput}>
                        <Search
                            onSearch={newShiftsModalService.searchOnchage}
                            enterButton={true}
                            onKeyDown={newShiftsModalService.finShiftVsPatient}
                        />
                    </div>
                    <div className={style.tableWrap}>
                        <Table columnDefs={patientColumns}
                               rowData={patient ? patient : []}
                               headerHeight={25}
                               rowHeight={25}
                               onCellClicked={newShiftsModalService.onCellClicked}
                        />
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
                                <div>{patientLog ? patientLog.age : ''}</div>
                            </Col>
                            {/*<Col span={4}>*/}
                            {/*<span>ID:</span>*/}
                            {/*<div>{''}</div>*/}
                            {/*</Col>*/}
                            <Col span={3}>
                                <span>床号:</span>
                                <div>{patientLog ? patientLog.bedLabel : ''}</div>
                            </Col>
                            <Col span={4}>
                                <span>费别:</span>
                                <div>{patientLog ? patientLog.chargeType : ''}</div>
                            </Col>
                            <Col span={10}>
                                <span>医保号:</span>
                                <div>{patientLog ? patientLog.insuranceNo : ''}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={14}>
                                <span>诊断:</span>
                                <div>{patientLog ? patientLog.diagnosis : ''}</div>
                            </Col>
                            <Col span={10}>
                                <span>主管护士:</span>
                                <div>{patientLog ? patientLog.dutyNurseName : ''}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <span>病情级别:</span>
                                <div>{patientLog ? patientLog.patientConditionName : ''}</div>
                            </Col>
                            <Col span={5}>
                                <span>护理级别:</span>
                                <div>{patientLog ? patientLog.nursingClassName : ''}</div>
                            </Col>
                            <Col span={5}>
                                <span>负责医生:</span>
                                <div>{patientLog ? patientLog.doctorInChargeName : ''}</div>
                            </Col>
                            <Col span={4}>
                                <span>病区:</span>
                                <div>{patientLog ? patientLog.wardName : ''}</div>
                            </Col>
                            {/*<Col span={6}>*/}
                            {/*<span>床位:</span>*/}
                            {/*<div>{''}</div>*/}
                            {/*</Col>*/}
                        </Row>
                    </div>
                    <div className={`${style.infoCollect} ${style.wrapBorder}`}>
                        <div className={style.title}>
                            病人信息采集
                        </div>
                        <div className={style.collectBox}>
                            <Rounded leftShow={'心率'} className={style.rounded}>
                                <NumberInput value={patientLog ? patientLog.pulse : ''} disabled={isEdit}
                                             onChange={newShiftsModalService.inputOnchage.bind(this, 'patientLog.pulse')}/>
                            </Rounded>
                            <Rounded leftShow={'血压'} className={style.rounded}>
                                <NumberInput value={patientLog ? patientLog.breathing : ''} disabled={isEdit}
                                             onChange={newShiftsModalService.inputOnchage.bind(this, 'patientLog.breathing')}/>
                            </Rounded>
                            <Rounded leftShow={'体温'} className={style.rounded}>
                                <NumberInput value={patientLog ? patientLog.temperature : ''} disabled={isEdit}
                                             onChange={newShiftsModalService.inputOnchage.bind(this, 'patientLog.temperature')}/>
                            </Rounded>
                            <Rounded leftShow={'入液量'} className={style.rounded}>
                                <NumberInput value={patientLog ? patientLog.enterLiquid : ''} disabled={isEdit}
                                             onChange={newShiftsModalService.inputOnchage.bind(this, 'patientLog.enterLiquid')}/>
                            </Rounded>
                            <Rounded leftShow={'出液量'} className={style.rounded}>
                                <NumberInput value={patientLog ? patientLog.appearLiquid : ''} disabled={isEdit}
                                             onChange={newShiftsModalService.inputOnchage.bind(this, 'patientLog.appearLiquid')}/>
                            </Rounded>
                        </div>
                    </div>
                    <div className={`${style.shiftItem} ${style.wrapBorder}`}>
                        <div>
                            <div className={style.title}>
                                <span>交班事项</span>
                                <button className={`${style.btn} ${style.defualtBtn}`}>
                                    <IconFont iconName={'icon-iocnchexiao'} hover={true}/>
                                    <span>导入文本模框</span>
                                </button>
                                <button className={`${style.btn} ${style.defualtBtn}`}>
                                    <IconFont iconName={'icon-iocnchexiao'} hover={true}/>
                                    <span>导入护理记录</span>
                                </button>
                                <button className={`${style.btn} ${style.greenBtn}`}
                                        disabled={edit1}
                                        onClick={()=> newShiftsModalService.shiftBtn
                                        (patientLog ? (patientLog.successorId ? '接班' : '交班') : '交班')}>
                                    <IconFont iconName={'icon-jiaobanguanli1'} hover={true}/>
                                    <span >{patientLog ? (patientLog.successorId ? '接班' : '交班') : '交班'}</span>
                                </button>
                                        <button className={`${style.btn} ${style.greenBtn}`}
                                                onClick={newShiftsModalService.addPatientLog}>
                                            <IconFont iconName={'icon-baocun1'} hover={true}/>
                                            <span>保存</span>
                                        </button>
                            </div>
                            <TextArea className={style.shiftItemContent}
                                      disabled={isEdit}
                                      value={patientLog ? patientLog.transferContent ? patientLog.transferContent : '' : ''}
                                      onChange={newShiftsModalService.textAreaOnchange.bind(this, 'patientLog.transferContent')}
                            />
                        </div>
                        <div>
                            <div className={style.title}>
                                <span>交班备注</span>
                            </div>
                            <TextArea className={style.shiftItemContent}
                                      disabled={isEdit}
                                      value={shiftChangeMaster ? shiftChangeMaster.remarks ? shiftChangeMaster.remarks : '' : ''}
                                      onChange={newShiftsModalService.textAreaOnchange.bind(this, 'shiftChangeMaster.remarks')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DragMove>
    )
    }
    }