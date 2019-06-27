import {BaseService} from 'tools/flux/BaseService'
import {
    ApiClassesNurseGroupDict,
    ApiDictDictionaries,
    ApiClassesSchedulingDict,
    ApiClassesGroupTitleDict
} from 'pkg/api/nurse'
import {
    NurseGroupDictModelDtoClasses,
    Page,
    DeptDictDtoDict,
    NurseGroupTitleDictEntityClasses,
    UserDictModelDtoDict,
    NurseGroupVsStaffEntityClasses,
    NurseGroupVsClassesModelDtoClasses,
} from 'pkg/entity/nurse'
import {ApiDictInput} from 'pkg/api/medical'
import {message} from 'pkg/common/message'
import {JsonUtil} from 'tools/api/JsonUtil'
import {resolve} from 'url'

export interface NurseGroupState {
    /** */
    /** 模糊查询返回的分组信息集合 */
    groupDict?: NurseGroupDictModelDtoClasses[]
    /** 模糊查询返回分组数据的条数 */
    groupLenght?: number
    /** 护理单元的code */
    nursingCode?: string
    /** 分组名称模糊查询的值 */
    name?: string
    /**  分页对象 */
    page?: Page
    /**  打开弹框的值 */
    modify?: boolean,
    /**  打开弹框的值 */
    personnel?: boolean
    /** 右键菜单 */
    menu?: any[]
    targetKeys?: any[]
    /** 护理单元的模糊查询值 */
    deptName?: string
    /** 角色id */
    roleId?: number
    /** 护理单元信息集合 */
    deptDict?: DeptDictDtoDict[]
    /**  选中分组信息的集合 */
    index?: number
    /**  选中分组的对象 */
    group?: NurseGroupDictModelDtoClasses
    /** input 模糊查询组件的表编码 */
    nurseDroupDict?: string
    /** input 模糊查询组件的分页 */
    inputPage?: Page
    /* input 模糊查询组件的 模糊查询值 */
    inputCode?: string
    /* input 模糊查询组件的title */
    inputTitle?: any[]
    /* input 模糊查询组件的数据长度  */
    inputLength?: number
    /*  input 模糊查询组件的数据 */
    inputData?: any
    /* 班段字典 */
    nurseDict?: NurseGroupVsClassesModelDtoClasses[]
    /* 班段的值 */
    nurseGroupVsClasses?: NurseGroupVsClassesModelDtoClasses[]
    /* 是否显示父分组 */
    isShowParent?: boolean
    /* 人员 */
    groupVsStaff?: UserDictModelDtoDict[]
    /* 职称字典 */
    titleDict?: NurseGroupTitleDictEntityClasses[]
    /* 职称字典保存 */
    groupVsStaffs?: NurseGroupVsStaffEntityClasses[]
    /* 人员选择的职称和人员 */
    userOpt?: Array<UserDictModelDtoDict>
    /* 人员选中项 */
    selectedKeys?: Array<string>
    /* 分组id */
    groupId?: number
}

class NurseGroupService extends BaseService<NurseGroupState> {
    groupApi: any
    defaultState = {
        name: '',
        page: {startIndex: 1, pageSize: 50},
        modify: false,
        personnel: false,
        menu: ['修改', '删除', '添加子分组', '人员'],
        deptName: '',
        roleId: 1,
        group: {type: 1},
        nurseDroupDict: 'nurseDroupDict',
        inputPage: {startIndex: 1, pageSize: 10},
        isShowParent: false,
        groupVsStaff: [],
        targetKeys: [],
        groupVsStaffs: [],
        userOpt: [],
        selectedKeys: [],
        groupId: null,
    }

    /**
     * 护理单元
     * @returns {Promise<void>}
     */
    serviceWillMount() {
        return ApiDictDictionaries.finStaffVsGroup().then((data) => {
            this.dispatch2({deptDict: data})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }

    /**
     * 班段维护的模糊查询
     * @returns {Promise<void>}
     */
    finAll = () => {
        let {nursingCode, name, page} = this.state
        return ApiClassesNurseGroupDict.finAll(nursingCode, name, page).then((data) => {
            this.dispatch2({groupDict: data, groupLenght: data.total})
        }).catch(err => {
            message.tip(err || '获取信息失败', 'error', 'center')
        })
    }
    /**
     * 右键作废
     */
    menuClick = (menuIndex, dataIndex) => {
        const {groupDict} = this.state
        switch (menuIndex) {
            case 0:
                this.finBygroupClasses(dataIndex)
                break
            case 1:
                this.deleteData(dataIndex)
                break
            case 2:
                this.dispatch2({
                    isShowParent: true,
                    modify: true,
                    group: {type: 1, parentId: groupDict[dataIndex].id, parentName: groupDict[dataIndex].groupName}
                })
                break
            default:
                this.dispatch2({
                    groupId: groupDict[dataIndex].id
                })
                this.finByGroupVsStaff(dataIndex)
                break
        }
    }
    /**
     * 修改弹框关闭
     */
    closeChange = () => {
        this.dispatch2({modify: false, nurseGroupVsClasses: [], isShowParent: false, group: {type: 1}})
    }
    /**
     * 人员列表关闭
     */
    closePerson = () => {
        this.dispatch2({personnel: false, targetKeys: [], groupVsStaffs: [], userOpt: [], selectedKeys: []})
    }
    /**
     * 筛选
     * @param inputValue
     * @param option
     * @return {boolean}
     */
    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1
    }
    /**
     * 分页
     */
    onGridReady = (parms) => {
        let {page} = this.getState()
        // 将table赋值给agApi，通过agApi动态为table赋值
        this.groupApi = parms
        /** 获取当前表格能显示多少行 */
        page.pageSize = parms.api.paginationGetPageSize()
        this.dispatch2({page: page})
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
     *  分组名称模糊查询值改变方法
     * @param e
     */
    onchange = (e) => {
        this.dispatch2({name: e.target.value})
    }
    /**
     * 点击查询按钮的事件
     */
    click = () => {
        return new Promise((resolve, reject) => {
            let {page} = this.state
            page.startIndex = 1
            this.dispatch2({page})
            resolve()
        }).then(() => {
            this.finAll()
        })
    }
    /**
     * 点击新增按钮的方法
     */
    onClick = () => {
        this.dispatch2({modify: true, group: {type: 1}, nurseGroupVsClasses: []})
    }
    /***
     * 点击护理单元查询分组信息
     * @param e
     * @returns {Promise<void>}
     */
    deptClick = (e) => {
        return new Promise((resolve, reject) => {
            let {page} = this.state
            page.startIndex = 1
            this.dispatch2({nursingCode: e.key, page})
            resolve()
        }).then(() => {
            this.finAll()
            this.finAllDict()
            this.finByWardCode()
        })
    }
    /**
     * 选中分组的信息赋值的方法
     * @param e
     */
    groupClick = (e) => {
        this.dispatch2({index: e.rowIndex, group: e.data})
    }
    handleChange = (targetKeys, direction, move) => {
        let {userOpt, groupVsStaff} = this.state
        if (direction === 'left') {
            for (let i = 0; i < move.length; i++) {
                for (let j = 0; j < userOpt.length; j++) {
                    if (move[i] === userOpt[j].userId) {
                        delete userOpt[j].position
                        userOpt.splice(j, 1)
                        break
                    }
                }
                /*** 把isOpt设为可选*/
                for (let k = 0; k < groupVsStaff.length; k++) {
                    if (move[i] === groupVsStaff[k].empNo) {
                        groupVsStaff[k].isOpt = 0
                        break
                    }
                }
            }
        } else {
            for (let i = 0; i < move.length; i++) {
                for (let k = 0; k < groupVsStaff.length; k++) {
                    if (move[i] === groupVsStaff[k].empNo) {
                        groupVsStaff[k].isOpt = 1
                        break
                    }
                }
            }
        }
        this.dispatch2({targetKeys, userOpt, groupVsStaff, selectedKeys: []})
    }

    /**
     * 查询input 模糊查询组件的tltle
     */
    loadColumns = () => {
        let {nurseDroupDict} = this.getState()
        return new Promise((resolve,reject)=>{
            return ApiDictInput.loadColumns(nurseDroupDict).then((data) => {
                this.dispatch2({inputTitle: data})
                resolve()
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })
        })
    }
    /**
     * 查询input 模糊查询组件的数据
     */
    loadData = () => {
        let {nurseDroupDict, inputPage, inputCode} = this.getState()
        return new Promise((resolve, reject) => {
            return ApiDictInput.loadData(inputPage, nurseDroupDict, inputCode).then((data) => {
                this.dispatch2({inputLength: data.total, inputData: data})
                resolve()
            }).catch(err => {
                message.tip(err || '获取信息失败', 'error', 'center')
            })
        })
    }

    /**
     * 获取父分组的数据
     */
    showMessage = (v, name?: string) => {
        let {group} = this.state
        let path = name + '.deCvId'
        if ((group.parentId !== undefined) && (group.parentId === v.data.id )) {
            message.tip('不能选择自己作为自己的父分组ID', 'warning', 'center')
            return false
        }
        group.parentName = v.value
        switch (v.type) {
            case 'pageEvent': {
                group.parentId = v.data.id
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value,
                    group: group
                })
                this.loadData()
                break
            }
            case 'enterEvent': {
                let b = path.split('.')
                group.parentId = v.data.id
                this.dispatch(JsonUtil.json2(b, this.state, v.data.id ? v.data.id : ''))
                this.dispatch2({group: group})
                break
            }
            case 'changeEvent': {
                let a = path.split('.')
                group.parentId = v.data.id
                this.dispatch(JsonUtil.json2(a, this.state, v.value))
                this.dispatch2({
                    inputPage: {pageSize: v.pageSize, startIndex: v.pageCurrent},
                    inputCode: v.value,
                    group: group
                })
                this.loadData()
                break
            }
            default:
                this.loadData()
                this.loadColumns()
        }
    }
    /**
     * 获取该护理单元的班段
     */
    finByWardCode = () => {
        let {nursingCode} = this.getState()
        if (nursingCode !== '' && nursingCode !== undefined && nursingCode !== null) {
            return ApiClassesSchedulingDict.finByWardCode(nursingCode).then((data) => {
                this.dispatch2({nurseDict: data})
            }).catch(err => {
                message.tip(err || '获取班段信息失败', 'error', 'center')
            })
        } else {
            message.tip('请选择护理单元列表', 'warning', 'center')
        }

    }
    /**
     * 获取班段字典的值
     */
    onchangeGroupValue = (type, val) => {
        let {group} = this.getState()
        if (type === 'nurseGroupVsClasses') {
            this.dispatch2({nurseGroupVsClasses: val})
        } else {
            group[type] = val
            this.dispatch2({group: group})
        }
    }
    /**
     * 新增/更新分组信息
     */
    save = () => {
        let {group, nurseGroupVsClasses, nursingCode, isShowParent} = this.state
        group.wardCode = nursingCode
        let info = ''
        if (group) {
            if (!group.wardCode) {
                info = '请选择护理单元'
                message.tip(info, 'error', 'center')
                return false
            }
            if (isShowParent && !group.parentName) {
                info = '请选择父分组ID'
                message.tip(info, 'error', 'center')
                return false
            }
            if (!group.groupName) {
                info = '请输入分组名称'
                message.tip(info, 'error', 'center')
                return false
            }
            if (!group.groupNameAbbreviation) {
                info = '请输入分组简称'
                message.tip(info, 'error', 'center')
                return false
            }
            if (!group.serialNo) {
                info = '请输入分组排序号'
                message.tip(info, 'error', 'center')
                return false
            }
        }
        ApiClassesNurseGroupDict.save(group, nurseGroupVsClasses).then(() => {
            this.finAll()
            this.dispatch2({modify: false, nurseGroupVsClasses: [], isShowParent: false, group: {type: 1}})
            message.tip('保存成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '保存失败', 'error', 'center')
        })
    }
    /**
     *  根据护理单元查班段信息和根据分组id查询允许使用班段信息
     */
    finBygroupClasses = (dataIndex) => {
        const {nursingCode, groupDict} = this.state
        ApiClassesNurseGroupDict.finBygroupClasses(groupDict[dataIndex].id, nursingCode).then((data) => {
            this.dispatch2({
                modify: true,
                index: dataIndex,
                group: groupDict[dataIndex],
                nurseGroupVsClasses: data,
                isShowParent: groupDict[dataIndex].parentId ? true : false
            })
        }).catch(err => {
            message.tip(err || '班段信息查询失败', 'error', 'center')
        })
    }
    /**
     * 根据护理单元查询人员信息
     */
    finByGroupVsStaff = (dataIndex) => {
        const {nursingCode, groupDict} = this.state
        ApiClassesNurseGroupDict.finByGroupVsStaff(nursingCode, '', groupDict[dataIndex].id).then((data: any) => {
            let targetKeys = []
            for (let i = 0; i < data.optUser.length; i++) {
                targetKeys.push(data.optUser[i].userId)
            }
            this.dispatch2({
                groupVsStaff: data.userDict,
                personnel: true,
                group: groupDict[dataIndex],
                targetKeys: targetKeys,
                userOpt: data.optUser
            })
        }).catch(err => {
            message.tip(err || '人员信息查询失败', 'error', 'center')
        })
    }
    /** 查询职称字典表 */
    finAllDict = () => {
        ApiClassesGroupTitleDict.finAll().then(data => {
            this.dispatch2({titleDict: data})
        }).catch(err => {
            message.tip(err || '职称字典查询失败', 'error', 'center')
        })
    }
    /** 保存人员 */
    saveGroupVsStaff = () => {
        const {userOpt, groupId} = this.state
        ApiClassesNurseGroupDict.saveGroupVsStaff(userOpt, groupId).then(() => {
            this.dispatch2({personnel: false, targetKeys: [], groupVsStaffs: [], userOpt: [], selectedKeys: []})
            message.tip('保存成功', 'success', 'center')
        }).catch(err => {
            message.tip(err || '保存失败', 'error', 'center')
        })
    }
    /** 选择职称 */
    changeTitle = (staff, value) => {
        let {group, userOpt} = this.state
        for (let i = 0; i < userOpt.length; i++) {
            if (userOpt[i].userId === staff.empNo) {
                userOpt = userOpt.splice(i, 1)
                break
            }
        }
        userOpt.push({
            position: value,
            title: value,
            empNo: staff.empNo,
            nurseGroupId: group.id,
            userId: staff.empNo,
        })
        this.dispatch2({
            userOpt: userOpt
        })
    }
    /** 选中项发生改变 */
    onSelectChange = (sourceSelectedKeys, targetKeys) => {
        let {groupVsStaff} = this.state
        let tp
        if (sourceSelectedKeys.length > 0) {
            for (let j = 0; j < sourceSelectedKeys.length; j++) {
                tp = false
                for (let i = 0; i < groupVsStaff.length; i++) {
                    if (groupVsStaff[i].empNo === sourceSelectedKeys[j] && groupVsStaff[i].isOpt) {
                        sourceSelectedKeys.splice(j, 1)
                        message.tip('该人员已配置', 'info', 'center')
                        tp = true
                    }
                }
                if (!tp) {
                    this.dispatch2({selectedKeys: sourceSelectedKeys})
                }
            }
        } else if (targetKeys.length > 0) {
            for (let j = 0; j < targetKeys.length; j++) {
                tp = false
                for (let i = 0; i < groupVsStaff.length; i++) {
                    if (groupVsStaff[i].empNo === targetKeys[j] && groupVsStaff[i].isOpt) {
                        tp = true
                        break
                    }
                }
                if (tp) {
                    this.dispatch2({selectedKeys: targetKeys})
                }
            }
        } else {
            this.dispatch2({selectedKeys: []})
        }
    }
    deleteData = (dataIndex) => {
        let {groupDict} = this.state
        message.linkAge('确定要删除此分组?', 5000, '确定', '取消', () => {
            return ApiClassesNurseGroupDict.delete(groupDict[dataIndex].id).then(() => {
                message.tip('删除成功', 'success', 'center')
                this.click()
            }).catch(err => {
                message.tip(err || '作废失败', 'error', 'center')
            })
        })
    }

    deleteTableData = () => {
        this.deleteData(this.state.index)
    }
}

export const nurseGroupService = new NurseGroupService('nurseGroup')