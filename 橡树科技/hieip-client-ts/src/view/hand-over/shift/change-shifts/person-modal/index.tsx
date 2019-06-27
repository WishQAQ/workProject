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
import moment from 'moment'
const {TextArea} = Input

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {personModalService, PersonModalState} from 'service/hand-over/shift/change-shifts/person-modal'

export default class PersonModal extends FluxComponent<PersonModalState> {
    title = '个人交接记录弹框'
    personModalService = personModalService

    personColumns = [
        {
            headerName: '交班时间',
            field: 'shiftTime',
            width: 44,
            cellClass:(params)=>{
                return personModalService.setRowClass(params,style)
            },
            valueFormatter: (params: any) => {
                return moment(params.data.shiftTime).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            headerName: '班段',
            field: 'paragraphs',
            width: 18,
            cellClass:(params)=>{
                return personModalService.setRowClass(params,style)
            }
        },
        {
            headerName: '交班人员',
            field: 'name',
            width: 20,
            cellClass:(params)=>{
                return personModalService.setRowClass(params,style)
            }
        },
        {
            headerName: '状态',
            field: 'status',
            width: 18,
            cellClass:(params)=>{
                return personModalService.setRowClass(params,style)
            }
        },
    ]
    rowData = [
        {
            shiftTime: new Date(),
            paragraphs: '白班',
            name: '小刘',
            status: '已交班'
        },
        {
            shiftTime: new Date(),
            paragraphs: '晚班',
            name: '小刘',
            status: '未交班'
        },
        {
            shiftTime: new Date(),
            paragraphs: '白班',
            name: '小刘',
            status: '已交班'
        },
        {
            shiftTime: new Date(),
            paragraphs: '晚班',
            name: '小刘',
            status: '未交班'
        },
    ]
    basicInfo = {
        name: '李四',
        age: 25,
        id: 1234,
        bedNum: 1,
        costClassify: '自费',
        edicareId: 1234567890456898,
        diagnose: '一切良好',
        nurse: '陈靖',
        illnessState: '一般',
        careLevel: '一级护理',
        doctor: '某某',
        place: '某某科',
        bedPlace: 12
    }
    radioData = [
        {value: '1', name: '全部'},
        {value: '2', name: '未交接'},
        {value: '3', name: '已交接'}
    ]
    radioDataOption = {key: 'value', value: 'name'}

    render() {
        const {modalVisible}=this.state
        return (
            <DragMove className={style.personModal}
                      cwidth={1034}
                      cheight={649}
                      top={100}
                      title={'个人交接记录'}
                      onCancel={personModalService.modalClose}
                      onOk={(v) => v}
                      visible={modalVisible}>
                <div className={style.modalMain}>
                    <div className={style.mainLeft}>
                        <div className={style.title}>
                            <span>交班列表</span>
                            <RadioGroup className={style.radioGroup}
                                        value={'1'}
                                // onChange={(v)=>console.log(v)}
                                        data={this.radioData}
                                        dataOption={this.radioDataOption}
                                        isButton={true}/>
                        </div>
                        <div className={style.searchInput}>
                            <div>
                                <TimePicker className={style.time}
                                            startPlaceholder={'输入日期'}
                                            isRange={false}/>
                                <span className={style.searchBtn}>
                                    <IconFont iconName={'icon-sousuo_sousuo'}/>
                                </span>
                            </div>
                        </div>
                        <div className={style.tableWrap}>
                            <Table columnDefs={this.personColumns}
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
                                    <button className={`${style.btn} ${style.defualtBtn} ${style.bigBtn}`}>
                                        <IconFont iconName={'icon-iocnchexiao'} hover={true}/>
                                        <span>导入文本模框</span>
                                    </button>
                                    <button className={`${style.btn} ${style.defualtBtn} ${style.bigBtn}`}>
                                        <IconFont iconName={'icon-iocnchexiao'} hover={true}/>
                                        <span>导入护理记录</span>
                                    </button>
                                    <button className={`${style.btn} ${style.greenBtn}`}>
                                        <IconFont iconName={'icon-baocun1'} hover={true}/>
                                        <span>保存</span>
                                    </button>
                                    <button className={`${style.btn} ${style.greenBtn}`} onClick={personModalService.shiftBtn}>
                                        <IconFont iconName={'icon-jiaobanguanli1'} hover={true}/>
                                        <span>交接</span>
                                    </button>
                                </div>
                                <TextArea className={style.shiftItemContent}/>
                            </div>
                            <div>
                                <div className={style.title}>交班备注</div>
                                <TextArea className={style.shiftItemContent}/>
                            </div>
                        </div>
                    </div>
                </div>
            </DragMove>
        )
    }
}