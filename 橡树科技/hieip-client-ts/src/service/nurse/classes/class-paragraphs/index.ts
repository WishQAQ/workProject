import {BaseService} from 'tools/flux/BaseService'
import {ApiClassesSchedulingDict, ApiDictDictionaries} from 'pkg/api/nurse'
import {message} from 'pkg/common/message'
import {DeptDictDtoDict, Page, NurseSchedulingClassesDictModelDtoClasses} from 'pkg/entity/nurse'
import {JsonUtil} from 'tools/api/JsonUtil'
import moment from 'moment'
export interface ClassParagraphsState {
    /* 班段维护的模糊查询值 */
    name?: string
    /* 护理单元的code */
    nursingCode?: string
    /* 类型 */
    type?: number
    /* 是否是两头班 */
    isTwo?: number
    /* 分页 */
    page?: Page
    /* 班段信息集合 */
    classesDict?: NurseSchedulingClassesDictModelDtoClasses[]
    /* 班段信息数量 */
    classLenght?: number
    /* table中菜单 */
    menu?: any[]
    /* 新建班段弹框的状态 */
    insetVisible?: boolean
    /* 更新班段弹框的状态 */
    updateVisible?: boolean
    /* 新增/更新班段信息的对象 */
    classas?: NurseSchedulingClassesDictModelDtoClasses
    /* 需要作废的id集合 */
    idList?: NurseSchedulingClassesDictModelDtoClasses[]
    /* 选中行数据的下标*/
    index?: number
    /* 护理单元的模糊查询值 */
    deptName?: string
    /* 护理单元信息集合 */
    deptDict?: DeptDictDtoDict[]
}
class ClassParagraphsService extends BaseService<ClassParagraphsState> {
    classApi: any
    defaultState = {
        page: {startIndex: 1, pageSize: 50},
        name: '',
        type: 1,
        classLenght: 0,
        menu: ['修改', '删除'],
        insetVisible: false,
        updateVisible: false,
        classas: {
            isTwoTime: 0,
            type: 0,
            isDelete: 0,
            isVacation: 0,
            isTransfer: 0,
            sumTime: '',
            dayOne: '0',
            dayTwo: '0',
            dayThree: '0',
            dayFour: '0'
        },
    }

    serviceWillMount() {
        this.getInfo()
    }

    getInfo = () => {
        return ApiDictDictionaries.finStaffVsGroup().then((data) => {
            this.dispatch2({deptDict: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 班段维护的模糊查询
     */
    finAll = () => {
        let {name, nursingCode, type, isTwo, page} = this.state
        return ApiClassesSchedulingDict.finAll(name, nursingCode, type, isTwo, page).then((data) => {
            this.dispatch2({classesDict: data, classLenght: data.total})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 将天 时分秒转换成秒杀
     */
    timeToSec = (time) => {
        if (!time) return 0
        let day = Number(time.split(':')[0])
        let hour = Number(time.split(':')[1])
        let min = Number(time.split(':')[2])
        return Number(day * 24) + hour + Number(min / 60)
    }
    /**
     * 保存/更新班段信息
     * @returns {Promise<void>}
     */
    save = () => {
        let {classas} = this.state
        if (!this.checkInput()) return false
        let oneSum = this.timeToSec(classas.dayThree + ':' + classas.timeThree) - this.timeToSec(classas.dayOne + ':' + classas.timeOne)
        if (classas.isTwoTime === 1) {
            oneSum += this.timeToSec(classas.dayFour + ':' + classas.timeFour) - this.timeToSec(classas.dayTwo + ':' + classas.timeTwo)
        }
        classas.sumTime = oneSum.toString()
        return ApiClassesSchedulingDict.save(classas).then((data) => {
            this.dispatch2({
                insetVisible: false,
                classas: {
                    isTwoTime: 0,
                    type: 0,
                    isDelete: 0,
                    isVacation: 0,
                    isTransfer: 0,
                    sumTime: '',
                    dayOne: '0',
                    dayTwo: '0',
                    dayThree: '0',
                    dayFour: '0'
                }
            })
            this.click()
            message.tip('保存成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '保存失败', 'error', 'center')
        })
    }

    checkInput = () => {
        const {classas} = this.state
        let info = ''
        if (classas) {
            if (!classas.classesName) {
                info = '请输入班段名称'
                message.tip(info, 'warning', 'center')
                return false
            }
            if (!classas.wardCode) {
                info = '请选择护理单元'
                message.tip(info, 'warning', 'center')
                return false
            }
            if (!classas.timeThree || !classas.timeOne) {
                info = '请选择班段时间1的开始到结束时间段'
                message.tip(info, 'warning', 'center')
                return false
            }
            if (!classas.timeFrom1 || !classas.timeTo1) {
                info = '请选择班段时间1的开始到结束时间段'
                message.tip(info, 'warning', 'center')
                return false
            }
            if (classas.isTwoTime === 1) {
                if (!classas.dayTwo || !classas.dayFour) {
                    info = '请选择班段时间2的开始到结束时间段的天数和结束时间的天数'
                    message.tip(info, 'warning', 'center')
                    return false
                }
                if (!classas.timeTwo || !classas.timeFour) {
                    info = '请选择班段时间2的开始到结束时间段'
                    message.tip(info, 'warning', 'center')
                    return false
                }
            }
        }
        return true
    }

    /**
     * 删除方法
     */
    delete = () => {
        let {idList} = this.state
        if (idList.length <= 0) {
            message.tip('请选择需要作废的班段信息', 'warning', 'center')
        }
        message.linkAge('确定要删除此班段', 5000, '确定', '取消', () => {
            return ApiClassesSchedulingDict.delete(idList).then((data) => {
                this.click()
            }).catch(err => {
                message.tip(err || '作废失败', 'error', 'center')
            })
        })
    }
    /**
     *  表格右键
     */
    menuClick = (menuIndex, dataIndex) => {
        if (menuIndex === 0) {// 修改
            let {classesDict} = this.state
            this.dispatch2({insetVisible: true, classas: classesDict[dataIndex]})
        } else {// 删除
            let {classas} = this.state
            message.linkAge('确定要删除此分组?', 5000, '确定', '取消', () => {
                return ApiClassesSchedulingDict.deleteId(classas.id).then((data) => {
                    this.click()
                }).catch(err => {
                    message.tip(err || '作废失败', 'error', 'center')
                })
            })
        }
    }
    /**
     * 分页
     */
    onGridReady = (parms) => {
        let {page} = this.getState()
        // 将table赋值给agApi，通过agApi动态为table赋值
        this.classApi = parms
        /** 获取当前表格能显示多少行 */
        page.pageSize = parms.api.paginationGetPageSize()
        this.dispatch2({page: page})
        this.finAll()
    }
    /**
     * 点击分页执行
     */
    onShowSize = (clickPage) => {
        let {page} = this.getState()
        page.startIndex = page.pageSize * (clickPage - 1)
        if (clickPage === 1) {
            page.startIndex = 1
        }
        this.dispatch2({page: page})
        this.finAll()
    }
    /**
     * 点击查询按钮的事件
     */
    click = () => {
        let {page} = this.state
        page.startIndex = 1
        this.dispatch2({page})
        this.finAll()
    }
    /**
     * 单选框的赋值
     */
    onchange = (name?: string, e?: any) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({[name]: e.target.value})
            resolve()
        }).then(() => {
            this.click()
        })
    }
    /**
     * 复选框的赋值
     */
    check = (name?: string, e?: any) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({[name]: e.target.checked ? 1 : 0})
            resolve()
        }).then(() => {
            this.click()
        })
    }
    /**
     * input框改变值的方法
     */
    textOnchange = (name?: string, e?: any) => {
        this.dispatch2({[name]: e.target.value})
    }
    /**
     * 点击新增按钮改变弹框状态的方法
     */
    insert = () => {
        this.dispatch2({
            insetVisible: true,
            classas: {
                isTwoTime: 0,
                type: 0,
                isDelete: 0,
                isVacation: 0,
                isTransfer: 0,
                sumTime: '',
                dayOne: '0',
                dayTwo: '0',
                dayThree: '0',
                dayFour: '0'
            }
        })
    }
    /**
     * 点击修改按钮改变弹框状态的方法
     */
    update = () => {
        this.dispatch2({updateVisible: true})
    }
    /**
     * 修改classes对象的属性值方法
     */
    updateEntity = (name?: String, e?: any) => {
        let anys = name.split('.')
        let val = e
        if (anys[1] === 'type') val = e.target.value
        this.dispatch2(JsonUtil.json2(anys, this.state, val))
    }
    /**
     * 改变天的方法
     */
    updateDay = (name?: String, e?: any) => {
        let {classas} = this.state
        let _classes = classas
        if (name === 'dayOne') {
            _classes.dayOne = e
            _classes.timeFrom1 = e + ':' + classas.timeOne
        } else if (name === 'dayThree') {
            _classes.dayThree = e
            _classes.timeTo1 = e + ':' + classas.timeThree
        } else if (name === 'dayTwo') {
            _classes.dayTwo = e
            _classes.timeFrom2 = e + ':' + classas.timeTwo
        } else {
            _classes.dayFour = e
            _classes.timeTo2 = e + ':' + classas.timeFour
        }
        this.dispatch2({classas: _classes})
    }
    /**
     * 修改classes对象复选框的属性值方法
     */
    updateMulti = (name?: String, e?: any) => {
        let anys = name.split('.')
        this.dispatch2(JsonUtil.json2(anys, this.state, e.target.checked ? 1 : 0))
    }
    /**
     *  IsTwoTime值改变的方法
     * @param {String} name
     * @param e
     */
    updateIsTwoTime = (name?: String, e?: any) => {
        let {classas} = this.state
        let _classes = classas
        if (e.target.checked ? 1 : 0 === 0) {
            _classes.timeFour = ''
            _classes.timeTwo = ''
            _classes.dayFour = ''
            _classes.dayTwo = ''
            _classes.timeFrom2 = ''
            _classes.timeTo2 = ''
            _classes.isTwoTime = e.target.checked ? 1 : 0
            this.dispatch2({classas: _classes})
        } else {
            _classes.timeFour = ''
            _classes.timeTwo = ''
            _classes.dayFour = '0'
            _classes.dayTwo = '0'
            _classes.timeFrom2 = ''
            _classes.timeTo2 = ''
            _classes.isTwoTime = e.target.checked ? 1 : 0
        }
        this.dispatch2({classas: _classes})
    }
    /**
     * 关闭新建弹框的方法
     */
    padlock = () => {
        this.dispatch2({
            insetVisible: false,
            classas: {
                isTwoTime: 0,
                type: 0,
                isDelete: 0,
                isVacation: 0,
                isTransfer: 0,
                sumTime: '',
                dayOne: '0',
                dayTwo: '0',
                dayThree: '0',
                dayFour: '0'
            }
        })
    }
    /**
     * 选中行获取
     */
    onCellClicked = (e) => {
        this.dispatch2({classas: e.data, index: e.rowIndex})
    }
    /**
     * 下拉框改变值
     */
    dropDown = (e) => {
        return new Promise((resolve, reject) => {
            this.dispatch2({nursingCode: e})
            resolve()
        }).then(() => {
            this.click()
        })
    }
    /**
     * 班段时间拼接方法
     */
    timeOnchange = (name?: String, title?: number, e?: any) => {
        let {classas} = this.state
        let _classes = classas
        if (title === 1) {
            _classes.timeOne = moment(e).format('HH:mm')
            _classes.timeFrom1 = classas.dayOne + ':' + moment(e).format('HH:mm')
        } else if (title === 2) {
            classas.timeThree = moment(e).format('HH:mm')
            _classes.timeTo1 = classas.dayThree + ':' + moment(e).format('HH:mm')
        } else if (title === 3) {
            _classes.timeTwo = moment(e).format('HH:mm')
            _classes.timeFrom2 = classas.dayTwo + ':' + moment(e).format('HH:mm')
        } else {
            _classes.timeFour = moment(e).format('HH:mm')
            _classes.timeTo2 = classas.dayFour + ':' + moment(e).format('HH:mm')
        }
        this.dispatch2({classas: _classes})
    }
    /**
     * 新增/更新input框值改变的方法
     */
    inputValue = (name?: string, e?: any) => {
        let anys = name.split('.')
        this.dispatch2(JsonUtil.json2(anys, this.state, e.target.value))
    }
    /**
     * 多选数据方法
     */
    onSelection = (val) => {
        this.dispatch2({idList: val.api.getSelectedRows()})
    }
}
export const classParagraphsService = new ClassParagraphsService('classParagraphs')