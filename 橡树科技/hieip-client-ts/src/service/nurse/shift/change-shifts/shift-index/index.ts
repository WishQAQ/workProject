import {BaseService} from 'tools/flux/BaseService'
import {JsonUtil} from 'tools/api/JsonUtil'
import {newShiftsModalService} from 'service/nurse/shift/change-shifts/new-shift'
import {shiftRecordService} from 'service/nurse/shift/change-shifts/shift-record'
import {message} from 'pkg/common/message'
import {ApiShiftChange} from 'pkg/api/nurse'
import {DeptDictDtoDict, NurseSchedulingClassesDictModelDtoClasses, GroupVsPatientModelDtoShift} from 'pkg/entity/nurse'
import shift from 'pkg/print-template/shift.ejs'
import {Print} from 'service/medical/print'
import moment from 'moment'

export interface ShiftIndexState {
    /** 控制弹框是否显示 */
    modalVisible?: boolean
    /** 展示形式 true图形 false表格 */
    displayMode?: boolean
    /** 表格中数据 */
    tableRowData ?: Array<object>
    /** 图表表格数据 */
    shiftTableData?: GroupVsPatientModelDtoShift[]
    /** 控制交接班详情下拉选择框是否显示 */
    btnMenuShow?: boolean
    /** 交接班详情下拉菜单数据 */
    btnMenuData?: Array<any>
    /** 交接班详情下拉菜单值 */
    btnMenuValue?: Array<any>
    /** 护理单元信息集合 */
    deptDict?: DeptDictDtoDict[]
    /**  选中的护理单元code */
    wardCode?: string
    /**  护理单元信息集合 */
    wardDict?: DeptDictDtoDict[]
    /**  选中的班段信息  */
    classesCode?: string
    /**  当前护理单元写的班段信息 */
    classesDict?: NurseSchedulingClassesDictModelDtoClasses[]
    /**  当前护理单元写的班段信息 */
    classesDictCopy?: NurseSchedulingClassesDictModelDtoClasses[]
    /** 选中的班段信息 */
    classesOpt?: NurseSchedulingClassesDictModelDtoClasses[]
    /**  当前的统计项目的信息  */
    titleData?: any[]
    date?: string
    begin?: Date
    end?: Date
    columns?: any[]
    title?: any[]
    shiftTableData1?: Array<any>
    shiftDate?: any[]
    defaultColumns?: any[]
    classNameWrap?: string,// 最外层class
    tableData?: Array<any>,// 表格数据
    childData?: any[],
    /** 详情选中的班次 */
    classCodes?: any[],
}
class ShiftIndexService extends BaseService<ShiftIndexState> {
    tableApi?: any
    defaultState = {
        modalVisible: false,
        wardCode: '',
        displayMode: true,
        btnMenuShow: false,
        tableRowData: [],
        shiftTableData: [],
        shiftTableData1: [],
        btnMenuData: [],
        btnMenuValue: [],
        classesCode: '',
        childData: [],
        defaultColumns: [
            {
                headerName: '项目',
                field: 'actionName',
                width: 10
            },
            {
                headerName: '床号',
                field: 'bedNo',
                width: 3
            },
            {
                headerName: '姓名',
                field: 'name',
                width: 10
            },
            {
                headerName: '诊断',
                field: 'diagnosis',
                width: 17
            }
        ],
        classCodes: [],
        classesDictCopy: [],
        shiftDate: []
    }

    serviceWillMount() {
        let {btnMenuData} = this.state
        let btnMenuValue = []
        // 提取数据中的所有值
        btnMenuData.forEach((item, i) => {
            btnMenuValue.push(item.key)
        })
        this.dispatch2({
            btnMenuValue: btnMenuValue
        })
        this.setWardCode('230102')
    }

    getInfo(wardCode) {
        let {btnMenuData} = this.state
        let btnMenuValue = []
        // 提取数据中的所有值
        btnMenuData.forEach((item, i) => {
            btnMenuValue.push(item.key)
        })
        this.dispatch2({
            btnMenuValue: btnMenuValue
        })
        this.setWardCode(wardCode)
    }

    /**
     * 进行赋值的方法
     */
    setWardCode(wardCode?: string) {
        let {date, begin, end} = this.state
        let time = new Date()
        date = moment(time).format('YYYY-MM-DD')
        begin = new Date(Date.parse(date + ' 00:00:00'))
        end = time
        return new Promise((resolve, reject) => {
            if (!wardCode) {
                message.tip('默认的护理单元id,不能为空')
                return
            }
            this.dispatch2({wardCode: wardCode, begin, end, date})
            resolve()
        }).then(() => {
            return new Promise((resolve, reject) => {
                this.shiftInfo()
                resolve()
            })
        })
    }

    setClassOpt = (classesDict) => {
        return new Promise((resolve, reject) => {
            let _columns = [
                {
                    headerName: '项目',
                    field: 'actionName',
                    width: 10
                },
                {
                    headerName: '床号',
                    field: 'bedNo',
                    width: 3
                },
                {
                    headerName: '姓名',
                    field: 'name',
                    width: 10
                },
                {
                    headerName: '诊断',
                    field: 'diagnosis',
                    width: 17
                }
            ]
            for (let key in classesDict) {
                if (classesDict[key].id) {
                    let entity = {
                        headerName: classesDict[key].classesName,
                        field: 'afternoon',
                        width: 20,
                        cellStyle: {'white-space': 'normal'}
                    }
                    _columns.push(entity)
                }
            }
            this.dispatch2({
                classesOpt: classesDict,
                columns: _columns,
            })
            resolve()
        })

    }
    /**
     *  交接班字典表信息
     * @returns {Promise<void>}
     */
    shiftInfo = () => {
        let {wardCode, date, begin, end} = this.state
        return ApiShiftChange.shiftInfo(wardCode, date, begin, end).then((data: any) => {
            for (let key in data) {
                if (data[key]) {
                    this.state[key] = data[key]
                }
            }
            this.dispatch2(this.state)
            let classCodes = []
            for (let i = 0; i < data.classesDict.length; i++) {
                classCodes.push(data.classesDict[i].classesCode)
            }
            this.dispatch2({
                classCodes: classCodes,
                classesCode: data.classesDict && data.classesDict[0].id,
                classesDictCopy: data.classesDict && [...data.classesDict],
                wardCode:data.wardDict[0].deptCode
            })
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     *  交接班的项目统计信息&患者交接的详情
     * @returns {Promise<void>}
     */
    finAllShift = () => {
        let {date, begin, end, wardCode, classesOpt} = this.state
        return ApiShiftChange.finAllShift(wardCode, date, begin, end, classesOpt).then((data) => {
            for (let key in data) {
                if (data[key]) {
                    this.state[key] = data[key]
                }
            }
            this.dispatch2(this.state)
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }

    /**
     * 组件将要挂载
     */
    componentWillMount() {
        this.getBed(this.state.tableData)
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
        this.dispatch2({childData: childData})
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

    /**
     * 设置值: 公共对外值改变
     */
    setStateJson2 = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }

    /**
     * 交接班详情下拉选择框显示事件
     * @param e Event
     */
    btnMenuShow = (e) => {
        // 禁止冒泡
        e.stopPropagation()
        this.dispatch({
            btnMenuShow: true
        })
    }
    /**
     * 交接班详情下拉选择框关闭事件
     * @param e Event
     */
    btnMenuHidden = (e) => {
        // 禁止冒泡
        e.stopPropagation()
        this.dispatch({
            btnMenuShow: false
        })
    }

    /**
     * 交接班详情下拉菜单选择事件
     * @param v Array<string> 选中值
     */
    checkBoxChange = (v) => {
        let {classesDictCopy} = this.state
        if (v.length > 0) {
            for (let i = 0; i < classesDictCopy.length; i++) {
                let classInfo = classesDictCopy[i]
                let tp = false
                for (let j = 0; j < v.length; j++) {
                    if (classInfo.classesCode.trim() !== v[j].trim()) {
                        tp = true
                        break
                    }
                }
                if (tp) {
                    classesDictCopy.splice(i, 1)
                    break
                }
            }
        } else {
            classesDictCopy = []
        }
        this.dispatch2({
            classCodes: v,
            classesDictCopy: classesDictCopy
        })
    }
    /**
     * 交接按钮事件
     * @param e Event
     * @param v boolean 值
     */
    shiftChange = (e, v) => {
        const {classesDictCopy} = this.state
        this.setClassOpt(classesDictCopy).then(() => {
            let {date, wardCode, classesOpt, begin, end} = this.state
            return ApiShiftChange.finShiftByInfo(wardCode, moment(date).format('YYYY-MM-DD'), begin, end, classesOpt).then((data) => {
                for (let key in data) {
                    if (data[key]) {
                        this.state[key] = data[key]
                    }
                }
                this.dispatch2(this.state)
                this.dispatch2({displayMode: v})
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })

        })

    }
    /**
     * 交接图表床位点击事件
     * @param v 交接图表床位点击所获取数据
     */
    bedBtnClick = (v) => {
        const {date, classesCode} = this.state
        v.classesCode = classesCode
        v.time = date
        v.radio = 2
        shiftRecordService.openModal(v)
    }

    /**
     * 渲染表格
     * @param params {}
     */
    onGridReady = (params) => {
        let {shiftDate} = this.state
        this.tableApi = params.api
        params.api.setRowData(shiftDate)
    }

    /**
     * 设置ag表格每一行的高度
     * @param params ag表格设置行高回掉参数
     * @returns {number} 返回数据
     */
    getRowHeight = (params) => {
        let obj = params.data,// 行数据
            maxLength = 0 // 最大行数
        params.api.columnController.gridColumns.forEach((item, i) => {
            let heightNum = this.textSize(obj[item.colId], item.actualWidth + 'px').height
            if (heightNum > maxLength) maxLength = heightNum
        })
        return maxLength
    }
    /**
     * 计算文本在ag-cell表格中可以显示的高度
     * @param text 文本内容
     * @param eleWidth 设置的宽度
     * @returns {{height: number}} 返回结果对象
     */
    textSize = (text, eleWidth) => {
        let div = document.createElement('div')
        let result = {height: 0}
        div.style.visibility = 'hidden'
        // 把样式设置成ag-cell一样
        div.style.width = eleWidth
        div.style.fontSize = '12px'
        div.style.lineHeight = '24px'
        div.style.padding = '3px'
        document.body.appendChild(div)
        div.innerHTML = text
        result.height = div.offsetHeight
        div.parentNode.removeChild(div)
        return result
    }

    /**
     * 交接详情表格双击事件
     * @param params 默认参数
     */
    doubleClick = (params) => {
        const {wardCode, date, classesCode} = this.state
        params.data.wardCode = wardCode
        params.data.time = date
        params.data.classesId = classesCode
        params.data.radio = 2
        shiftRecordService.openModal(params.data)
    }
    /**
     * 设置值: 公共对外值改变setStateJson2
     */
    setStateJson = (path, data) => {
        this.dispatch2(JsonUtil.json(path, this.state, data))
    }
    /**
     * 弹框关闭事件
     */
    modalClose = () => {
        this.dispatch({
            modalVisible: false
        })
    }
    /**
     * 弹框打开事件
     * @param {object} data 打开弹框所要展示的数据
     */
    openModal = (data?: object) => {
        this.dispatch({
            modalVisible: true
        })
    }
    /**
     * 根据是否交接设置每行显示颜色
     * @param params 数据
     * @param style 样式
     * @returns {any}
     */
    setRowClass = (params, style) => {
        let style1
        style1 = `${style.agCommonCell}`
        if (params.data.status === '未交班') style1 = `${style.agRedCell}`
        return style1
    }
    /**
     * 新增按钮事件
     */
    add = () => {
        let {wardCode} = this.state
        newShiftsModalService.openModal(wardCode)
    }

    /**
     * 下拉框改变值的公共方法
     */
    selectOnchange = (name?: string, e?: any) => {
        this.dispatch2({[name]: e})
    }
    /**
     * 点击查询按钮
     */
    search = () => {
        let {date, begin, end, wardCode} = this.state
        let time = new Date(date)
        date = moment(time).format('YYYY-MM-DD')
        begin = new Date(Date.parse(date + ' 00:00:00'))
        end = time
        return new Promise((resolve, reject) => {
            if (!wardCode) {
                message.tip('默认的护理单元id,不能为空')
                return
            }
            this.dispatch2({wardCode: wardCode, begin, end, date})
            resolve()
        }).then(() => {
            return new Promise((resolve, reject) => {
                this.shiftInfo()
                resolve()
            })
        })
    }
    /**
     * 打印
     */
    print = () => {
        const {wardCode, date} = this.state
        ApiShiftChange.shiftPrint(wardCode, date).then((data: any) => {
            if (data.ShiftData.length === 0) {
                message.tip('暂无交班数据', 'info', 'center')
            } else  this.emitPrint(data)
        }).catch(msg => message.tip(msg || '打印数据获取失败', 'error', 'center'))
    }
    emitPrint = (data) => {
        const {date} = this.state
        fetch(shift).then(res => res.text()).then(text => {
            data.date = date
            let obj = {
                data: data,
                contents: text,
            }
            Print.message(obj).then((response) => {
                // console.log(response)
            })
        })
    }
}

export const shiftIndexService = new ShiftIndexService('shiftIndex')