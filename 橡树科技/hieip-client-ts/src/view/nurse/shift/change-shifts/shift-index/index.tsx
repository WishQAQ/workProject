/**
 * 交班详情
 * Created by mou.
 */
import React from 'react'
import {Select} from 'pkg/common/select'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import style from './style/index.scss'
import {Divider, Checkbox, Table as AntTable} from 'antd'
import {TimePicker} from 'pkg/common/timePicker'

const Option = Select.Option
import {SelectItem} from 'pkg/ui/SelectItem'
import {Rounded} from 'pkg/common/rounded'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {ShiftIndexState, shiftIndexService} from 'service/nurse/shift/change-shifts/shift-index'

export default class ShiftIndex extends FluxComponent<ShiftIndexState> {
    div = null
    shiftDetail = null
    title = '交接班主界面'
    shiftIndexService = shiftIndexService

    componentDidUpdate() {
        // 动态设置高度
        if (this.shiftDetail && this.div) {
            this.shiftDetail.style.height = `calc(100% - ${(this.div.offsetHeight + 50) + 'px'})`
        }
    }

    render() {
        const {displayMode, btnMenuShow, classCodes} = this.state
        let {wardDict, classesDict, wardCode, classesCode, date, columns, title, titleData, shiftTableData} = this.state
        return (<div className={style.shiftIndex}>
            <div className={style.search}>
                <Select
                    showSearch={true}
                    className={style.select}
                    dropdownClassName={style.dropDownMenu}
                    value={wardCode ? wardCode : ''}
                    onChange={shiftIndexService.selectOnchange.bind(this, 'wardCode')}
                >{wardDict ? wardDict.map((item, i) => {
                    return <Option key={i} value={item.deptCode}>{item.deptName}</Option>
                }) : []
                }
                </Select>
                <SelectItem showSearch={true}
                            labelVal={'交接班'}
                            value={classesCode ? classesCode : ''}
                            dropdownClassName={style.dropDownMenu}
                            labelClass={style.selLabel}
                            selectItemClass={style.transfer}
                            selectClass={style.sel}
                            onChange={shiftIndexService.selectOnchange.bind(this, 'classesCode')}
                >
                    {
                        classesDict ? classesDict.map((item, i) => {
                            return (
                                <Option key={i} value={item.id}>{item.classesName}</Option>
                            )
                        }) : []
                    }
                </SelectItem>
                <Rounded leftShow={'日期'} className={style.date}>
                    <TimePicker isRange={false} className={style.timePicker} startPlaceholder=" "
                                oValue={date ? date : ''}
                                dateChange={shiftIndexService.selectOnchange.bind(this, 'date')}/>
                </Rounded>
                <button className={`${style.btn} ${style.defualtBtn} ${style.searchBtn}`}
                        onClick={shiftIndexService.search}
                >
                    <IconFont iconName={'icon-sousuo_sousuo'} hover={true}/>
                    <span>查询</span>
                </button>
                <button className={`${style.btn} ${style.blueBtn}`} onClick={shiftIndexService.add}>
                    <IconFont iconName={'icon-tianjia'} hover={true}/>
                    <span>新增</span>
                </button>
                <button className={`${style.btn} ${style.blueBtn}`} onClick={shiftIndexService.print}>
                    <IconFont iconName={'icon-ordinaryprint'} hover={true}/>
                    <span>打印</span>
                </button>
            </div>
            <div className={style.midTable} ref={(x) => {
                this.div = x
            }}>
                <AntTable columns={title ? title : []}
                          dataSource={titleData ? titleData : []}
                          pagination={false}
                          scroll={{y: 104}}
                          bordered={true}/>
            </div>
            <div className={style.shiftDetail} ref={(x) => this.shiftDetail = x}>
                <div className={style.title}>
                    <div className={displayMode ? `${style.shiftBtn} ${style.shiftBtnFocus}` : `${style.shiftBtn}`}
                         onClick={(e) => shiftIndexService.shiftChange(e, true)}
                    >
                        <span>交班详情</span>
                        <div
                            className={displayMode ? `${style.shiftBtnRight}` : `${style.shiftBtnRight} ${style.shiftBtnRightForbid}`}
                            onClick={shiftIndexService.btnMenuShow}
                        >
                            <div className={style.arrow}>
                                <IconFont iconName={'icon-shangyiyehoutuifanhui'} hover={true} iconClass={style.icon}/>
                            </div>
                        </div>
                        {/*遮罩层*/}
                        <hr className={btnMenuShow ? `${style.cover}` : `${style.coverHidden}`}
                            onClick={shiftIndexService.btnMenuHidden}
                        />
                        <div className={btnMenuShow ? `${style.btnMenu}` : `${style.btnMenuHidden}`}>
                            <Checkbox.Group
                                onChange={(v) => shiftIndexService.checkBoxChange(v)}
                                value={classCodes}
                            >
                                {
                                    classesDict ? classesDict.map((item, i) => {
                                        return (
                                            <Checkbox key={i}
                                                      value={item.classesCode}
                                                      className={style.checkedRow}>
                                                {item.classesName}
                                            </Checkbox>
                                        )
                                    }) : ''
                                }
                            </Checkbox.Group>
                        </div>
                    </div>
                    <button className={displayMode ? `${style.shiftBtn}` : `${style.shiftBtn} ${style.shiftBtnFocus}`}
                            onClick={(e) => shiftIndexService.shiftChange(e, false)}
                    >交接
                    </button>
                </div>
                <div className={style.shiftDetailMain}>
                    {
                        displayMode ?
                            <ShiftTable classNameWrap={style.shiftTableWrap}
                                        onClick={shiftIndexService.bedBtnClick}
                                        tableData={shiftTableData ? shiftTableData : []}/>
                            :
                            <Table headerHeight={25}
                                   getRowHeight={shiftIndexService.getRowHeight}
                                   onRowDoubleClicked={shiftIndexService.doubleClick}
                                   onGridReady={shiftIndexService.onGridReady}
                                   columnDefs={columns ? columns : []}
                            />
                    }
                </div>
            </div>
        </div>)
    }
}

interface ShiftTableProps {
    classNameWrap?: string,// 最外层class
    tableData?: Array<any>,// 表格数据
    onClick?: (v: object) => void,// 点击事件
}

interface ShiftTableState {
    childData: Array<any>,// 床位检查检验数据
}

class ShiftTable extends React.Component<ShiftTableProps, ShiftTableState> {
    constructor(props) {
        super(props)
        this.state = {
            childData: []
        }
    }

    /**
     * 组件将要挂载
     */
    componentWillMount() {
        if (this.props.tableData && this.props.tableData.length) {
            this.getBed(this.props.tableData)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tableData && nextProps.tableData.length) {
            this.getBed(nextProps.tableData)
        }
    }

    /**
     * 整理后台获取数据，初始化childData
     * @param shiftData [{}] 后台获取的数据
     */
    getBed = (shiftData) => {
        let childData = []
        shiftData.forEach((item, i) => {
            childData.push([])
            childData[i] = this.mapChild(item, childData[i])
        })
        this.setState({childData: childData})
    }

    /**
     * 遍历数据得到child信息
     * @param item {} 即groupChild
     * @param bedArray [] 数组用于保存Child值
     * @returns {any}  [] 返回bedArray
     */
    mapChild = (item, bedArray) => {
        if (item.hasChild) {
            item.groupChild.map((item1, i) => {
                if (item1.hasChild) {
                    this.mapChild(item1, bedArray)
                } else {
                    bedArray.push({'child': item1.patient, 'other': item1.item})
                }
            })
        } else {
            bedArray.push({'child': item.patient, 'other': item.item})
        }
        return bedArray
    }

    render() {
        const {classNameWrap, tableData} = this.props
        return (
            <div className={classNameWrap}>
                <div className={style.shiftTable}>
                    {
                        tableData && tableData !== [] && tableData.map((item, i) => {
                            return (
                                <div className={style.tableRow} key={i}>
                                    <div className={style.rowTitle}>
                                        <span>{item.classesName}</span>
                                    </div>
                                    <div className={style.row}>
                                        {i === 0 ?
                                            <div className={style.colTitle}>
                                                <div>人员</div>
                                                <div>床位</div>
                                                <div>检查 / 检验 / 手术</div>
                                            </div> : ''}
                                        <div className={i === 0 ? `${style.rowContentCol}` : `${style.rowContent}`}>
                                            <div className={style.peopleCol}>
                                                <div className={style.groupWrap}>
                                                    {
                                                        this.mapData(item, i)
                                                    }
                                                </div>
                                            </div>
                                            <div className={style.bedCol}>
                                                {
                                                    this.mapBed(this.state.childData[i])
                                                }
                                            </div>
                                            <div className={style.otherCol}>
                                                {
                                                    this.mapOther(this.state.childData[i])
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    /**
     * 按钮点击事件
     * @param e Event
     * @param v {} 床位详细数据
     */
    onBtnClick = (e, v) => {
        this.props.onClick(v)
    }

    /**
     * 检查检验手术遍历
     * @param data Array<object>
     */
    mapOther = (data) => {
        if (!data) return ''
        return data.map((item, j) => {
            return (
                <div key={j}
                     className={style.innerRow}
                     style={j === 0 ?
                         {height: `calc((100%)/${data.length})`} :
                         {height: `calc((100%)/${data.length}`}}>
                    {
                        item.other && item.other.map((detail, k) => {
                            return (
                                <div key={k}>
                                    {detail.mark === 1 ? <IconFont iconName={'icon-sousuo_sousuo'}/>
                                        : detail.mark === 2 ? <IconFont iconName={'icon-jianyanyubingli'}/>
                                            : <IconFont iconName={'icon-shoushu'} iconClass={style.shoushu}/>}
                                    <span className={style.bed} title={detail.bedNo + '号床'}>{detail.bedNo}号床</span>
                                    <Divider type="vertical"/>
                                    <span className={style.name

                                    } title={detail.name

                                    }>{detail.name

                                    }</span>
                                    <Divider type="vertical"/>
                                    <span className={style.time}>
                                        {detail.time}
                                        </span>
                                    <Divider type="vertical"/>
                                    <span title={detail.item}>{detail.item}</span>
                                </div>
                            )

                        })
                    }
                </div>
            )
        })
    }

    /**
     * 床位的遍历函数
     * @param data Array<object>
     */
    mapBed = (data) => {
        if (!data) return ''
        return data.map((bedItem, j) => {
            return (
                <div key={j}
                     className={style.innerRow}
                     style={j === 0 ?
                         {height: `calc((100%)/${data.length})`} :
                         {height: `calc((100%)/${data.length})`}}>
                    {
                        bedItem.child && bedItem.child.map((detail, k) => {
                            return (
                                <button className={
                                    detail.patientStatus === '4' ?
                                        `${style.greenBtn}` :
                                        detail.patientStatus === '3' ?
                                            `${style.yellowBtn}` :
                                            detail.patientStatus === '2' ? `${style.orangeBtn}` : `${style.redBtn}`}
                                        onClick={(e) => this.onBtnClick(e, detail)}
                                        key={k}>
                                    <IconFont iconName={'icon-chuangwei'}/>
                                    -{detail.bedLabel}
                                </button>
                            )
                        })
                    }
                </div>
            )
        })
    }

    /**
     * 分组遍历函数
     * @param data
     * @param index number 当前遍历下标
     * @returns {any[]}
     */
    mapData = (data, index) => {
        // if (data.hasChild) {
        return data.groupChild && data.groupChild.map((item, i) =>
                item.hasChild ?
                    <div key={i} style={{height: `calc(100% / ${data.groupChild.length})`}}
                         className={style.groupCol}>
                        <div>{item.groupName}</div>
                        <div className={style.row}>
                            {
                                this.mapData(item, index)
                            }
                        </div>
                    </div>
                    :
                    <div key={item.groupName}
                         style={{height: `calc(100% / ${data.groupChild.length})`}}
                         className={style.groupCol}>
                        <div>{item.groupName}</div>
                        <div className={style.people}>
                            {
                                item.staff && item.staff.map((item1, i) => {
                                    return <span key={i} title={item1.userName}>{item1.userName}</span>
                                })
                            }
                        </div>
                    </div>
            )
        // }
    }
}