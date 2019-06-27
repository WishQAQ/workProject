/**
 * 交接班弹框
 * create by wx 2018.01.24
 */
import React from 'react'
import * as style from './style/index.scss'
import {DragMove} from 'pkg/common/dragging'
import {Rounded} from 'pkg/common/rounded'
import {HintInput as HInput} from 'pkg/common/input'
import {HintInput} from 'pkg/common/ag/input'
import {TimePicker} from 'pkg/common/timePicker'
import {Select} from 'pkg/common/select'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import {Checkbox,Input,Row, Col} from 'antd'
import {Images} from 'pkg/common/image/image'

const Option = Select.Option
const Search = Input.Search
const { TextArea } = Input

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {changeShiftsModalService, ChangeShiftsModalState} from 'service/hand-over/shift/change-shifts/modal'

export default class ChangeShiftsModal extends FluxComponent<ChangeShiftsModalState> {
    title = '交接班弹框'
    changeShiftsModalService = changeShiftsModalService

    columns = [
        {
            headerName: '现有人数',
            field: 'existingNumbers',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {verification:{regex:'/^[0-9]*$/'}}
        },
        {
            headerName: '新入',
            field: 'new',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '死亡',
            field: 'die',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '师干',
            field: 'shiGan',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '军人',
            field: 'shiGan',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '急诊',
            field: 'emergency',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '综合',
            field: 'comprehensive',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '胸痛',
            field: 'chestPain',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '腹痛',
            field: 'abdominalPain',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '创伤',
            field: 'trauma',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '发热',
            field: 'fever',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '骨科',
            field: 'orthopaedics',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '神内',
            field: 'god',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '儿科',
            field: 'pediatrics',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '妇产科',
            field: 'maternity',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '耳鼻喉',
            field: 'otorhinolaryngology',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        },
        {
            headerName: '总数',
            field: 'total',
            editable: true,
            cellEditorFramework: HintInput,
            cellEditorParams: {}
        }
    ]
    rowData = [
        {
            existingNumbers: 200,
            total: 400,
        }
    ]
    patientColumns = [
        {
            headerName: '项目',
            field: 'project',
            tooltipField: 'project',
        },
        {
            headerName: '床号',
            field: 'bedNumber',
            tooltipField: 'bedNumber',
        },
        {
            headerName: '姓名',
            field: 'name',
            tooltipField: 'name',
        }
    ]
    basicInfo = {
        name:'李四',
        age:25,
        id:1234,
        bedNum:1,
        costClassify:'自费',
        edicareId:1234567890456898,
        diagnose:'一切良好',
        nurse:'陈靖',
        illnessState:'一般',
        careLevel:'一级护理',
        doctor:'某某',
        place:'某某科',
        bedPlace:12
    }
    render() {
        const {modalVisible} = this.state
        return (
            <DragMove className={style.changeShiftsmodal}
                      cwidth={892}
                      cheight={662}
                      top={100}
                      title={'编辑交接班'}
                      onCancel={changeShiftsModalService.modalClose}
                      onOk={(v) => v}
                      visible={modalVisible}>
                <div className={style.modalheader}>
                    <Rounded leftShow={'交班日期'} className={`${style.rounded} ${style.date}`}>
                        <TimePicker isRange={false} className={style.timePicker} startPlaceholder=" "/>
                    </Rounded>
                    <Select
                        defaultValue="1"
                        showSearch={true}
                        className={style.select}
                        dropdownClassName={style.dropDownMenu}
                    >
                        <Option key={1} value="1">白班</Option>
                        <Option key={2} value="2">中班</Option>
                        <Option key={3} value="3">夜班</Option>
                    </Select>
                    <button className={`${style.btn} ${style.defualtBtn} ${style.searchBtn}`}>
                        <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                        <span>查询</span>
                    </button>
                    <button className={`${style.btn} ${style.greenBtn}`}>
                        <IconFont iconName={'icon-baocun1'} hover={true}/>
                        <span>保存</span>
                    </button>
                </div>
                <div className={style.modalmid}>
                    <div className={style.midTable}>
                        <Table columnDefs={this.columns}
                               rowData={this.rowData}
                               singleClickEdit={true}
                               suppressRowClickSelection={true}
                               suppressCellSelection={false}
                               stopEditingWhenGridLosesFocus={true}
                               rowHeight={26}
                               headerHeight={26}/>
                    </div>
                    <HInput className1={style.remarks} placeholder={'备注填写'} className2={style.midInput}/>
                </div>
                <div className={style.modalMain}>
                    <div className={style.mainLeft}>
                        <div className={style.title}>
                            <span>交班病人</span>
                            <Checkbox>全部</Checkbox>
                        </div>
                        <div className={style.searchInput}>
                            <Search
                                onSearch={value => (value)}
                                enterButton={true}/>
                        </div>
                        <div className={style.tableWrap}>
                            <Table columnDefs={this.patientColumns}
                                   // onCellClicked={(v)=>console.log(v)}
                                   rowData={this.rowData}
                                   headerHeight={25}
                                   rowHeight={25}/>
                        </div>
                    </div>
                    <div className={style.mainRight}>
                        <div className={`${style.basicInfo} ${style.wrapBorder}`}>
                            <Row>
                                <Col span={4}>
                                    <span>
                                        <Images name={'1'} className={style.img}/>
                                    </span>
                                    <span>{this.basicInfo.name}</span>
                                </Col>
                                <Col span={3}>
                                    <span>年龄:</span>
                                    <div>{this.basicInfo.age}</div>
                                </Col>
                                <Col span={4}>
                                    <span>ID:</span>
                                    <div>{this.basicInfo.id}</div>
                                </Col>
                                <Col span={3}>
                                    <span>床号:</span>
                                    <div>{this.basicInfo.bedNum}</div>
                                </Col>
                                <Col span={4}>
                                    <span>费别:</span>
                                    <div>{this.basicInfo.costClassify}</div>
                                </Col>
                                <Col span={6}>
                                    <span>医保号:</span>
                                    <div>{this.basicInfo.edicareId}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={14}>
                                    <span>诊断:</span>
                                    <div>{this.basicInfo.diagnose}</div>
                                </Col>
                                <Col span={10}>
                                    <span>主管护士:</span>
                                    <div>{this.basicInfo.nurse}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <span>病情级别:</span>
                                    <div>{this.basicInfo.illnessState}</div>
                                </Col>
                                <Col span={5}>
                                    <span>护理级别:</span>
                                    <div>{this.basicInfo.careLevel}</div>
                                </Col>
                                <Col span={5}>
                                    <span>负责医生:</span>
                                    <div>{this.basicInfo.doctor}</div>
                                </Col>
                                <Col span={4}>
                                    <span>病区:</span>
                                    <div>{this.basicInfo.place}</div>
                                </Col>
                                <Col span={6}>
                                    <span>床位:</span>
                                    <div>{this.basicInfo.bedPlace}</div>
                                </Col>
                            </Row>
                        </div>
                        <div className={`${style.infoCollect} ${style.wrapBorder}`}>
                            <div className={style.title}>
                                病人信息采集
                            </div>
                            <div className={style.collectBox}>
                                <Rounded leftShow={'心率'} className={style.rounded}>
                                    <HInput/>
                                </Rounded>
                                <Rounded leftShow={'血压'} className={style.rounded}>
                                    <HInput/>
                                </Rounded>
                                <Rounded leftShow={'体温'} className={style.rounded}>
                                    <HInput/>
                                </Rounded>
                                <Rounded leftShow={'入液量'} className={style.rounded}>
                                    <HInput/>
                                </Rounded>
                                <Rounded leftShow={'出液量'} className={style.rounded}>
                                    <HInput/>
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
                                    <button className={`${style.btn} ${style.greenBtn}`} onClick={changeShiftsModalService.shiftBtn}>
                                        <IconFont iconName={'icon-jiaobanguanli1'} hover={true}/>
                                        <span>交接</span>
                                    </button>
                                </div>
                                <TextArea className={style.shiftItemContent}/>
                            </div>
                            <div>
                                <div className={style.title}>
                                    <span>交班备注</span>
                                </div>
                                <TextArea className={style.shiftItemContent}/>
                            </div>
                        </div>
                    </div>
                </div>
            </DragMove>
        )
    }
}