/**
 * 交班详情
 * Created by mou.
 */
import React from 'react'
import {Select} from 'pkg/common/select'
import {IconFont} from 'pkg/common/icon'
import {Table} from 'pkg/common/table'
import style from './style/shiftDetail.scss'
import {Divider, Checkbox} from 'antd'

const Option = Select.Option

// service
import {FluxComponent} from 'tools/flux/FluxComponent'
import {shiftDetailService, ShiftDetailState} from 'service/hand-over/shift/change-shifts/shift-detail'

export default class ShiftDetail extends FluxComponent<ShiftDetailState> {
    title = '交接班下交班详情'
    shiftDetailService = shiftDetailService

    columns = [
        {
            headerName: '项目',
            field: 'project',
            width: 10
        },
        {
            headerName: '床号',
            field: 'bedNumber',
            width: 3
        },
        {
            headerName: '姓名',
            field: 'name',
            width: 10
        },
        {
            headerName: '诊断',
            field: 'diagnose',
            width: 17
        },
        {
            headerName: '早班',
            field: 'morning',
            width: 20,
            cellStyle: {'white-space': 'normal'}
        },
        {
            headerName: '中班',
            field: 'afternoon',
            width: 20,
            cellStyle: {'white-space': 'normal'}
        },
        {
            headerName: '晚班',
            field: 'night',
            width: 20,
            cellStyle: {'white-space': 'normal'}
        },
    ]

    render() {
        const {displayMode, shiftTableData, btnMenuShow, btnMenuData,btnMenuValue} = this.state
        return (<div className={style.shiftDetail}>
            <div className={style.title}>
                <div className={displayMode?`${style.shiftBtn} ${style.shiftBtnFocus}`:`${style.shiftBtn}`}
                     onClick={(e)=>shiftDetailService.shiftChange(e,true)}>
                    <span>交班详情</span>
                    <div className={displayMode?`${style.shiftBtnRight}`:`${style.shiftBtnRight} ${style.shiftBtnRightForbid}`}
                         onClick={shiftDetailService.btnMenuShow}>
                        <div className={style.arrow}>
                            <IconFont iconName={'icon-shangyiyehoutuifanhui'} hover={true} iconClass={style.icon}/>
                        </div>
                    </div>
                    {/*遮罩层*/}
                    <hr className={btnMenuShow?`${style.cover}`:`${style.coverHidden}`} onClick={shiftDetailService.btnMenuHidden}/>

                    <div className={btnMenuShow ? `${style.btnMenu}` : `${style.btnMenuHidden}`}>
                        <Checkbox.Group
                            onChange={shiftDetailService.checkBoxChange}
                            value={btnMenuValue}
                        >
                            {
                                btnMenuData.map((item, i) => {
                                    return (
                                        <Checkbox key={i}
                                                  value={item.key}
                                                  className={style.checkedRow}>
                                            {item.name}
                                        </Checkbox>
                                    )
                                })
                            }
                        </Checkbox.Group>
                    </div>
                </div>
                <button className={displayMode?`${style.shiftBtn}`:`${style.shiftBtn} ${style.shiftBtnFocus}`}
                        onClick={(e)=>shiftDetailService.shiftChange(e,false)}>交接</button>
            </div>
            <div className={style.shiftDetailMain}>
                {
                    displayMode ?
                        <ShiftTable classNameWrap={style.shiftTableWrap}
                                    onClick={shiftDetailService.bedBtnClick}
                                    tableData={shiftTableData}/>
                        :
                        <Table headerHeight={25}
                               getRowHeight={shiftDetailService.getRowHeight}
                               onRowDoubleClicked={shiftDetailService.doubleClick}
                               onGridReady={shiftDetailService.onGridReady}
                               columnDefs={this.columns}/>
                }
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
    componentWillMount(){
        this.getBed(this.props.tableData)
    }

    componentWillReceiveProps(nextProps){
        this.getBed(nextProps.tableData)
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
                    bedArray.push(item1.child)
                }
            })
        } else {
            bedArray.push(item.child)
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
                                        <span>{item.shift}</span>
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
                                                <div className={style.fireControl}>
                                                    消防:{item.fireControl}
                                                </div>
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
                         {height: `calc((100% - 26px)/${data.length} + 26px)`} :
                         {height: `calc((100% - 26px)/${data.length}`}}>
                    {
                        item.map((detail, k) => {
                            if (detail.hasOwnProperty('examinePro')) {
                                return (
                                    <div key={k}>
                                        <IconFont iconName={'icon-sousuo_sousuo'}/>
                                        <span className={style.bed} title={detail.bedNum + '号床'}>{detail.bedNum}号床</span>
                                        <Divider type="vertical"/>
                                        <span className={style.name} title={detail.examineDoctor}>{detail.examineDoctor}</span>
                                        <Divider type="vertical"/>
                                        <span className={style.time}>
                                            {detail.examineTime.getHours() + ':' + detail.examineTime.getMinutes()}
                                            </span>
                                        <Divider type="vertical"/>
                                        <span title={detail.examinePro}>{detail.examinePro}</span>
                                    </div>
                                )
                            }
                            if (detail.hasOwnProperty('testPro')) {
                                return (
                                    <div key={k}>
                                        <IconFont iconName={'icon-jianyanyubingli'}/>
                                        <span className={style.bed} title={detail.bedNum + '号床'}>{detail.bedNum}号床</span>
                                        <Divider type="vertical"/>
                                        <span className={style.name} title={detail.testDoctor}>{detail.testDoctor}</span>
                                        <Divider type="vertical"/>
                                        <span className={style.time}>
                                            {detail.testTime.getHours() + ':' + detail.testTime.getMinutes()}
                                        </span>
                                        <Divider type="vertical"/>
                                        <span title={detail.testPro}>{detail.testPro}</span>
                                    </div>
                                )
                            }
                            if (detail.hasOwnProperty('operationPro')) {
                                return (
                                    <div key={k}>
                                        <IconFont iconName={'icon-shoushu'}/>
                                        <span className={style.bed} title={detail.bedNum + '号床'}>{detail.bedNum}号床</span>
                                        <Divider type="vertical"/>
                                        <span className={style.name} title={detail.operationDoctor}>{detail.operationDoctor}</span>
                                        <Divider type="vertical"/>
                                        <span className={style.time}>
                                            {detail.operationTime.getHours() + ':' + detail.operationTime.getMinutes()}
                                        </span>
                                        <Divider type="vertical"/>
                                        <span title={detail.operationPro}>{detail.operationPro}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        })
        // coso
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
                         {height: `calc((100% - 26px)/${data.length} + 26px)`} :
                         {height: `calc((100% - 26px)/${data.length}`}}>
                    {
                        bedItem.map((detail, k) => {
                            return (
                                <button className={
                                    detail.illnessState === 1 ?
                                        `${style.greenBtn}` :
                                        detail.illnessState === 2 ?
                                            `${style.yellowBtn}` :
                                            detail.illnessState === 3 ? `${style.orangeBtn}` : `${style.redBtn}`}
                                        onClick={(e) => this.onBtnClick(e, detail)}
                                        key={k}>
                                    <IconFont iconName={'icon-chuangwei'}/>
                                    -{detail.bedNum}
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
        return data.groupChild.map((item, i) =>
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
                            item.child.map((item1, i) => {
                                return <span key={i} title={item1.name}>{item1.name}</span>
                            })
                        }
                    </div>
                </div>
        )
        // }
    }
}