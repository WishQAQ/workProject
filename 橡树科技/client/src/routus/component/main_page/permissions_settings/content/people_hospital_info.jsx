/**
 * description:人员信息、医院信息
 * author: mou
 * time:2018-1-6
 */
import React from 'react'
import {Tabs, Button, Icon, Input, message, Modal} from 'antd';
import {AgTable} from '../component/agTable'
import {Setting} from '../component/modal'
import {InfoModal} from '../component/infoModal'
import {MyTree} from '../component/tree'
import {PeopleInfoAdd} from '../content/peopleInfoAdd'
import api from '../api'
import moment from 'moment'
import css from '../style/content/people_hospital_info.scss'

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
/** 人员信息表头 */
const peopleColumns = [
    {
        headerName: '',
        field: '',
        checkboxSelection: true,
        maxWidth: 25,
    },
    {
        headerName: '登录用户名',
        field: 'userName',
        width: 100
    },
    {
        headerName: '姓名',
        field: 'name',
        width: 100
    },
    {
        headerName: '工作',
        field: 'job',
        width: 100
    },
    {
        headerName: '职称',
        field: 'title',
        width: 100
    },
    {
        headerName: '创建时间',
        field: 'createDate',
        width: 100,
        valueFormatter(value) {
            return value ? moment(value).format('YYYY-MM-DD HH:MM:SS') : null
        }
    },
    {
        headerName: '医院名称',
        field: 'hospitalName',
        width: 100
    },
    {
        headerName: '公卫ID',
        field: 'vsId',
        width: 100
    },
    {
        headerName: '公卫名称',
        field: 'vsName',
        width: 100
    },
    {
        headerName: '公卫账号',
        field: 'vsUserName',
        width: 100
    },
];
/** 医院信息表头 */
const hospitalColumns = [
    {
        headerName: '医院简称',
        field: 'hospitalName',
        width: 100
    },
    {
        headerName: '病人ID前缀',
        field: 'patientIdHead',
        width: 100
    },
    {
        headerName: '同步应用服务器地址',
        field: 'serverIp',
        width: 100
    },
    {
        headerName: '同步应用服务器端口',
        field: 'serverPort',
        width: 100
    },
    {
        headerName: '医院号',
        field: 'hospitalNo',
        width: 100
    }, {
        headerName: '医院名称简称',
        field: 'abbreviation',
        width: 100
    },
    {
        headerName: '医院全称',
        field: 'hospitalNameFull',
        width: 100
    },
    {
        headerName: '医院商户号',
        field: 'hospitalAccount',
        width: 100
    },
    {
        headerName: '病历链接数据源',
        field: 'dataSource',
        width: 100
    },
    {
        headerName: '是否启用区域EMR',
        field: 'emrEnable',
        width: 100,
        valueFormatter(value) {
            let back;
            value === '1' ? back = '启用' : back === '停用';
            return back
        },
    }, {
        headerName: '亚德程序编码',
        field: 'citywideApplicationCode',
        width: 100
    },
    {
        headerName: '亚德医院名称',
        field: 'citywideHospitalName',
        width: 100
    },
];

export class PeopleHospitalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',//tab 当前tab
            activeModalTab: 'role',//模态框当前tab
            infoVisible: false,//modal 新增是否显示
            infoVisibleHospital: false, // 医院新增是否显示
            title: '权限设置',//modal 标题
            titleHospital: '', // 医院modal标题
            width: '738px',//modal  宽度
            height: '604px',//modal 高度
            visible: false,//权限点modal是否显示
            inputShow: false,//input 输入框是否显示
            param: {
                userName: '',
                password: '',
                name: '',
                job: '',
                title: '',
                hospitalCode: '',
                vsId: '',
                vsName: '',
                vsUserName: '',
            },//模态框内容
            rowData: {},//保存点击的当前行的data
            selectData: [],//选择的行
            name: '',//模糊查询 input 的值
            startIndex: 1,
            pageSize: 100,
            roleVsHospital: {
                roleDict: {data: []},
                hospitalDict: {data: []},
                menuDict: [],
                grantsDict: {data: []},
                role: [],
                roleGrants: [],
                roleMneu: [],
            },
            checkRoles: [],//选中的角色
            checkMenus: [],//选中的菜单
            checkGrants: [],//选中的权限
            defaultRole: '',//默认角色
            defaultMenu: '',//默认菜单
            defaultGrant: '',//默认权限
            menuList: [],//菜单列表
            grantsList: [],//权限列表
            userVsRolesList: [],//角色列表
            userVsHospitalsList: [],//医院列表
            role: '',//模糊查询角色的值
            menu: '',//模糊查询菜单的值
            grant: '',//模糊查询权限的值
            hospital: '',//模糊查询医院的值
            checkVal: '',//用户、医院选中的角色
            isCache: false,//是否缓存当前编辑的权限
            isFirst: true,//第一次点击勾选
            activeCheck: '',//当前选中的项
        }
    }

    /**
     * 获取当前用户的拥有的角色、权限、菜单、医院
     */
    getRoleVsHospital = () => {
        const {param, activeModalTab,userVsHospitalsList,userVsRolesList} = this.state;
        const {roleVsHospital} = api;
        let dataPack = {
            name: '',
            userId: param.id,
            select: activeModalTab === 'role' ? 1 : 0
        };
        roleVsHospital(dataPack, response => {
                if (response.success) {
                    const data = response.data;
                    data.roleMneu = [];
                    data.roleGrants = [];
                    let roles = [];
                    let defaultRole;
                    if (data.role && data.role.length) {
                        for (let i = 0; i < data.role.length; i++) {
                            roles.push(data.role[i].roleId);
                            if (data.role[i].isDefault)
                                defaultRole = data.role[i].roleId
                        }
                    }
                    if (data.hospital && data.hospital.length) {
                        for (let i = 0; i < data.hospital.length; i++) {
                            roles.push(data.hospital[i].hospitalNo);
                            if (data.hospital[i].isDefault)
                                defaultRole = data.hospital[i].hospitalNo
                        }
                    }
                    if(activeModalTab==='role'){

                    }
                    this.setState({
                        roleVsHospital: data,
                        userVsHospitalsList: data.hospital,
                        userVsRolesList: data.role,
                        checkRoles: roles,
                        defaultRole: defaultRole,
                        checkMenus: [],
                        defaultMenu: '',
                        checkGrants: [],
                        defaultGrant: ''
                    })
                }
                else {
                    console.error('response error', response)
                }
            }
        )
    };

    /**
     * 切换tabPane
     * @param key
     */
    callback = (key) => {
        this.setState({
            activeTab: key,
            name: '',
            inputShow: false,
        })
    };
    /**
     * 面板点击
     * @param key
     */
    modalCallBack = (key) => {
        this.setState({
            activeModalTab: key,
            menuList: [],
            grantsList: [],
            userVsRolesList: [],
            userVsHospitalsList: [],
            checkMenus: [],
            checkRoles: [],
            checkedGrant: [],
            defaultGrant: '',
            defaultRole: '',
            defaultMenu: '',
            activeCheck: '',
            isCache: false,
            isFirst: true
        }, () => {
            this.getRoleVsHospital();
        })
    };
    /**
     * 表格添加class
     * @param record
     * @param index
     * @returns {*}
     */
    /*  rowClassName = (record, index) => {
     const {selectedRowKeys} = this.state;
     if (selectedRowKeys && selectedRowKeys.length) {
     for (let i = 0; i < selectedRowKeys.length; i++) {
     if (selectedRowKeys[i] === index) {
     return css.rowActive
     }
     }
     }
     };*/
    /**
     * 点击新增
     */
    add = () => {
        this.setState({
            infoVisible: true,
            title: '人员信息—新增',
            width: '420px',
            height: '360px',
            param: {
                userName: '',
                password: '',
                name: '',
                job: '',
                title: '',
                hospitalCode: '',
                vsId: '',
                vsName: '',
                vsUserName: '',
            },//模态框内容
        })
    };
    /**
     * 关闭模态框
     */
    handleCancel = () => {
        this.setState({
            visible: false,
            infoVisible: false,
        })
    };
    /**
     * 权限设置
     */
    permission = () => {
        let {selectData, rowData} = this.state;
        if (selectData.length === 0) {
            message.warning('请选择要配置权限的人')
        } else {
            this.setState({
                activeModalTab: 'role',
                param: rowData,
            }, () => {
                this.getRoleVsHospital();
                this.setState({
                    title: '权限设置',
                    width: '738px',
                    height: '604px',
                    visible: true,
                });
            })
        }
    };
    /**
     * 模糊查询输入框是否可见
     */
    inputShow = () => {
        let {inputShow} = this.state;
        const {activeTab} = this.state;
        if (inputShow) {
            if (activeTab === '1') {
                this.refs.agtable.onReverSource();
            } else {
                this.refs.hospitalTable.onReverSource()
            }
        }
        this.setState({
            inputShow: !inputShow,
            rowData: {},
            param: {
                userName: '',
                password: '',
                name: '',
                job: '',
                title: '',
                hospitalCode: '',
                vsId: '',
                vsName: '',
                vsUserName: '',
            },
            selectData: [],
        }, () => {
            if (this.state.inputShow) {
                this.refs.name.focus()
            }
        })
    };
    /**
     * 获取选中行的id list
     * @param data
     */
    onSelection = (data) => {
        let selectData = [];
        for (let i = 0; i < data.length; i++) {
            selectData.push(data[i].data.id)
        }
        this.setState({
            selectData: selectData
        })
    };
    /**
     * 删除用户信息
     */
    delete = () => {
        const {selectData} = this.state;
        const {deletePeople} = api;
        if (selectData.length === 0) {
            message.warning('请选择要删除的行');
            return false;
        }
        let react = this;
        confirm({
            content: '您确定要删除吗？',
            onOk() {
                let userId = {
                    userId: selectData,
                };
                userId.userId = JSON.stringify(userId.userId);
                deletePeople(userId, response => {
                    if (response.success) {
                        react.refs.agtable.onReverSource();
                        react.setState({
                            selectData: [],
                        })
                    } else {
                        console.error('response error', response)
                    }
                })
            },
            onCancel() {
            },
        });
    };
    /**
     * 人员信息 行点击
     * @param row
     */
    rowClick = (row) => {
        this.setState({
            param: row.data,
            rowData: row.data
        })
    };
    /**
     * 人员信息编辑
     */
    edit = () => {
        let {selectData, rowData} = this.state;
        if (selectData.length === 0) {
            message.warning('请选择要修改的行')
        } else {
            this.setState({
                infoVisible: true,
                title: '人员信息—修改',
                width: '420px',
                height: '360px',
                param: rowData
            })
        }
    };
    /** 保存人员信息 */
    savePeopleInfo = () => {
        if (!this.checkInput()) {
            return false;
        }
        const {param} = this.state;
        const {peopleInfo} = api;
        peopleInfo(param, response => {
            if (response.success) {
                this.setState({
                    infoVisible: false
                });
                this.refs.agtable.onReverSource();
            } else {
                console.error("response error", response);
            }
        })
    };
    /** 检测比输入项是否输入 */
    checkInput = () => {
        const {param} = this.state;
        if (param.userName === '') {
            message.warning('登录用户名不能为空');
            return false
        }
        if (param.password === '') {
            message.warning('登陆密码不能为空');
            return false
        }
        if (param.name === '') {
            message.warning('姓名不能为空');
            return false
        }
        if (param.hospitalCode === '') {
            message.warning('医院名称为空');
            return false
        }
        return true
    };
    /**
     * 获取人员信息
     * @param index 模糊查询的名称
     * @param callback 回调
     */
    getData = (index, callback) => {
        let {name, startIndex, pageSize} = this.state;
        if (index) {
            startIndex = index
        }
        const {loadFuzzyUser} = api;
        let param = {
            name: name,
            startIndex: startIndex,//当前页
            pageSize: pageSize,//当前显示多少条
        };
        loadFuzzyUser(param, response => {
            if (response.success) {
                const data = response.data;
                callback && callback(data);
            }
            else {
                console.error("response error", response);
            }

        });
    };
    /**
     * 获取医院信息
     * @param index 模糊查询的名称
     * @param callback 回调
     */
    getHospitalData = (index, callback) => {
        const {loadHospitalInfo} = api;
        let {name, startIndex, pageSize} = this.state;
        if (index) {
            startIndex = index
        }
        let param = {
            name: name,
            startIndex: startIndex,//当前页
            pageSize: pageSize,//当前显示多少条
        };
        loadHospitalInfo(param, response => {
            if (response.success) {
                const data = response.data;
                callback(data);
            }
            else {
                console.error("response error", response);
            }

        });
    };
    /**
     * 模态框值改变
     * @param type 当前是哪个输入框
     * @param e 值
     */
    onChange = (type, e) => {
        let {param} = this.state;
        if (type === 'job' || type === 'title' || type === 'hospitalCode') {
            param[type] = e
        } else {
            param[type] = e.target.value
        }
        this.setState({
            param: param
        })
    };
    /**
     * 模糊查询的值
     * @param type
     * @param e
     */
    onChangeName = (type, e) => {
        this.setState({
            [type]: e.target.value
        })
    };
    /**
     * 获取选中的角色、医院拥有的菜单和权限
     * @param type
     * @param val
     *  * @param sure
     */
    getCheckValues = (type, val, sure) => {
        if (type === 'checkRoles') {
            this.setState({
                isFirst: false,
                isCache: false,
                activeCheck: val[val.length - 1]
            })
        }
        this.setState({
            [type]: val,
            //  isCache: false,
        }, () => {
            if (sure && sure === 'sure') {
                this.sure()
            }
        });
    };
    /** 获取选中的菜单和权限 */
    getSelectCheck = (type, val) => {
        let {param, activeModalTab, menuList, grantsList, defaultMenu, defaultGrant} = this.state;
        let checkMenu = [], checkGrant = [];
        let key;
        if (activeModalTab === 'role') {
            key = 'roleId'
        } else {
            key = 'hospitalNo'
        }
        for (let i = 0; i < menuList.length; i++) {
            if (val.toString() === menuList[i][key]) {
                checkMenu.push(menuList[i].menuId);
                if (menuList[i].isDefault) {
                    defaultMenu = menuList[i].menuId;
                }
            }
        }
        for (let i = 0; i < grantsList.length; i++) {
            if (val.toString() === grantsList[i][key]) {
                checkGrant.push(grantsList[i].code);
                if (menuList[i].isDefault) {
                    defaultGrant = menuList[i].code;
                }
            }
        }
        if (checkMenu.length !== 0 || checkGrant.length !== 0) {
            this.setState({
                checkMenus: checkMenu,
                checkGrants: checkGrant,
                defaultMenu: parseInt(defaultMenu),
                defaultGrant: defaultGrant,
            });
            return
        }

        const {selectctChecked} = api;
        let dataPack = {
            rodis: 1,
            hospitalCode: param.hospitalCode,
            userId: param.id,
            roleId: val
        };
        if (activeModalTab === 'role') {
            dataPack.rodis = 1;
        } else {
            dataPack.rodis = 0;
            dataPack.hospitalCode = val
        }
        selectctChecked(dataPack, response => {
            if (response.success) {
                const data = response.data;
                let menus = [], grants = [], defaultMenu, defaultGrant;
                if (activeModalTab === 'role') {
                    for (let i = 0; i < data.roleMneu.length; i++) {
                        menus.push(data.roleMneu[i].menuId);
                        if (data.roleMneu[i].isDefault) {
                            defaultMenu = data.roleMneu[i].menuId
                        }
                    }
                    for (let j = 0; j < data.roleGrants.length; j++) {
                        grants.push(data.roleGrants[j].code);
                        if (data.roleGrants[j].isDefault) {
                            defaultGrant = data.roleGrants[j].code
                        }
                    }
                } else {
                    for (let i = 0; i < data.hospitalMneu.length; i++) {
                        menus.push(data.hospitalMneu[i].menuId);
                        if (data.hospitalMneu[i].isDefault) {
                            defaultMenu = data.hospitalMneu[i].menuId
                        }
                    }
                    for (let j = 0; j < data.hospitalGrants.length; j++) {
                        grants.push(data.hospitalGrants[j].code);
                        if (data.hospitalGrants[j].isDefault) {
                            defaultGrant = data.hospitalGrants[j].code
                        }
                    }
                }
                this.setState({
                    checkMenus: menus,
                    checkGrants: grants,
                    defaultMenu: defaultMenu,
                    defaultGrant: defaultGrant,
                    //  roleVsHospital:data,
                })
            } else {
                console.error('response error', response)
            }
        })
    };
    /**
     * 设置默认菜单、权限、角色、医院
     * @param type
     * @param val
     */
    setDefaultValue = (type, val) => {
        this.setState({
            [type]: val
        })
    };
    /** 保存权限配置 */
    saveUser = () => {
        const {saveUser} = api;
        const {menuList, grantsList, userVsHospitalsList, userVsRolesList, activeModalTab} = this.state;
        let dataPack = {};
        dataPack.menuList = menuList;
        dataPack.grantsList = grantsList;
        dataPack.userVsRolesList = userVsRolesList;
        dataPack.userVsHospitalsList = userVsHospitalsList;
        dataPack.menuList = JSON.stringify(dataPack.menuList);
        dataPack.grantsList = JSON.stringify(dataPack.grantsList);
        dataPack.userVsRolesList = JSON.stringify(dataPack.userVsRolesList);
        dataPack.userVsHospitalsList = JSON.stringify(dataPack.userVsHospitalsList);
        if (activeModalTab === 'role') {
            dataPack.rodis = 1;
        } else {
            dataPack.rodis = 0;
        }
        saveUser(dataPack, response => {
            if (response.success) {
                this.setState({
                    visible: false,
                    isCache: false,
                    isFirst: true,
                    activeCheck: '',
                    defaultMenu: '',
                    defaultGrant: '',
                    defaultRole: '',
                    checkRoles: [],
                    checkMenus: [],
                    checkGrants: [],
                    menuList: [],
                    grantsList: [],
                    userVsHospitalsList: [],
                    userVsRolesList: []
                });
            } else {
                console.error('response error', response)
            }
        })
    };
    /** 点击确定 */
    sure = () => {
        let {param, checkGrants, checkRoles, checkMenus, defaultGrant, defaultMenu, activeModalTab, defaultRole} = this.state;
        let {menuList, grantsList, userVsRolesList, userVsHospitalsList} = this.state;
        for (let i = 0; i < checkMenus.length; i++) {
            if (defaultMenu !== '' && defaultMenu !== undefined && defaultMenu !== null) {
                defaultMenu = defaultMenu.toString()
            }
            if (activeModalTab === 'role') {
                if (checkMenus[i] === defaultMenu) {
                    menuList.push({
                        isDefault: 1,
                        menuId: checkMenus[i],
                        userId: param.id,
                        roleId: checkRoles[checkRoles.length - 1]
                    });
                } else {
                    menuList.push({
                        menuId: checkMenus[i],
                        userId: param.id,
                        roleId: checkRoles[checkRoles.length - 1]
                    });
                }
            } else {
                if (checkMenus[i] === defaultMenu) {
                    menuList.push({
                        isDefault: 1,
                        menuId: checkMenus[i],
                        userId: param.id,
                        hospitalNo: checkRoles[checkRoles.length - 1]
                    });
                } else {
                    menuList.push({
                        menuId: checkMenus[i],
                        userId: param.id,
                        hospitalNo: checkRoles[checkRoles.length - 1]
                    });
                }
            }

        }
        for (let i = 0; i < checkGrants.length; i++) {
            if (activeModalTab === 'role') {
                if (checkGrants[i] === defaultGrant) {
                    grantsList.push({
                        isDefault: 1,
                        code: checkGrants[i],
                        userId: param.id,
                        roleId: checkRoles[checkRoles.length - 1]
                    });
                } else {
                    grantsList.push({
                        code: checkGrants[i],
                        userId: param.id,
                        roleId: checkRoles[checkRoles.length - 1]
                    });
                }
            } else {
                if (checkGrants[i] === defaultGrant) {
                    grantsList.push({
                        isDefault: 1,
                        code: checkGrants[i],
                        userId: param.id,
                        hospitalNo: checkRoles[checkRoles.length - 1]
                    });
                } else {
                    grantsList.push({
                        code: checkGrants[i],
                        userId: param.id,
                        hospitalNo: checkRoles[checkRoles.length - 1]
                    });
                }
            }
        }
        userVsRolesList = [], userVsHospitalsList = [];
        console.log(defaultRole);
        for (let i = 0; i < checkRoles.length; i++) {
            if (activeModalTab === 'role') {
                if (defaultRole !== '' && defaultRole !== undefined) {
                    defaultRole = defaultRole.toString();
                }
                if (checkRoles[i] === defaultRole) {
                    userVsRolesList.push({
                        isDefault: 1,
                        roleId: checkRoles[i],
                        userId: param.id
                    });
                } else {
                    userVsRolesList.push({
                        roleId: checkRoles[i],
                        userId: param.id
                    });
                }
            } else {
                if (checkRoles[i] === defaultRole) {
                    userVsHospitalsList.push({
                        isDefault: 1,
                        hospitalNo: checkRoles[i],
                        userId: param.id
                    });
                } else {
                    userVsHospitalsList.push({
                        hospitalNo: checkRoles[i],
                        userId: param.id
                    });
                }
            }
        }
        this.setState({
            isCache: true,
            isFirst: false,
            checkMenus: [],
            checkGrants: [],
            defaultMenu: '',
            defaultGrant: '',
            menuList: menuList,
            grantsList: grantsList,
            userVsHospitalsList: userVsHospitalsList,
            userVsRolesList: userVsRolesList,
        })
    };
    /**
     * 模糊查询
     * @param type
     * @param e
     */
    getFuzzyValue = (type, e) => {
        this.setState({
            [type]: e.target.value
        })
    };
    /** 模糊查询角色 */
    fuzzyRole = () => {
        const {fuzzyRole} = api;
        const {role} = this.state;
        let {roleVsHospital} = this.state;
        let dataPack = {
            name: role
        };
        fuzzyRole(dataPack, response => {
            if (response.success) {
                const data = response.data;
                roleVsHospital.roleDict.data = data;
                this.setState({
                    roleVsHospital
                })
            } else {
                console.error('response error', response)
            }
        })
    };

    /** 模糊查询医院 */
    fuzzyHospital = () => {
        const {loadHospitalInfo} = api;
        const {hospital} = this.state;
        let {roleVsHospital} = this.state;
        let dataPack = {
            name: hospital
        };
        loadHospitalInfo(dataPack, response => {
            if (response.success) {
                const data = response.data;
                roleVsHospital.hospitalDict.data = data;
                this.setState({
                    roleVsHospital
                })

            } else {
                console.error('response error', response)
            }
        })
    };

    /** 模糊查询菜单 */
    fuzzyMenu = (menus) => {
        console.log(menus);
        let {roleVsHospital} = this.state;
        console.log(roleVsHospital.menuDict);
        for (let i = 0; i < roleVsHospital.menuDict.length; i++) {
            if (roleVsHospital.menuDict[i].children) {

            }
        }
        /* roleVsHospital.menuDict = menus;
         this.setState({
         roleVsHospital
         })*/
        /* const {fuzzyMenuDict} = api;
         const {menu} = this.state;
         let {roleVsHospital} = this.state;
         let dataPack = {
         name: menu
         };
         fuzzyMenuDict(dataPack, response => {
         if (response.success) {
         const data = response.data;
         roleVsHospital.menuDict = data;
         this.setState({
         roleVsHospital
         })
         } else {
         console.error('response error', response)
         }
         })*/
    };

    /** 模糊查询权限 */
    fuzzyGrant = () => {
        const {fuzzyGrantsDict} = api;
        const {grant} = this.state;
        let {roleVsHospital} = this.state;
        let dataPack = {
            name: grant
        };
        fuzzyGrantsDict(dataPack, response => {
            if (response.success) {
                const data = response.data;
                roleVsHospital.grantsDict.data = data;
                this.setState({
                    roleVsHospital
                })
            } else {
                console.error('response error', response)
            }
        })
    };
    /**
     * 获取当前选中的角色
     * @param val
     */
    getCheckVal = (val) => {
        let {checkRoles} = this.state;
        let set = new Set(checkRoles);
        let checkVal = '';
        val.filter(v => {
            if (!set.has(v)) {
                checkVal = v;
            } else {
                checkVal = '';
            }
        });
        this.setState({
            checkVal: checkVal
        });
    };

    changeIsCache = (bool) => {
        this.setState({
            isCache: bool,
            checkMenus: [],
            checkGrants: [],
            defaultMenu: '',
            defaultGrant: '',
        })
    };

    render() {
        const {activeTab, infoVisible, infoVisibleHospital, width, height, title, visible, inputShow, name, param, roleVsHospital, checkMenus, checkRoles, checkGrants, defaultGrant, defaultMenu, defaultRole, activeModalTab, checkVal, isCache, isFirst, activeCheck} = this.state;
        return (
            <div className={css.peoHospitalInfo}>
                <Tabs onChange={this.callback} type="card" className={css.infoTab}>
                    <TabPane tab='人员信息' key='1'>
                        <AgTable ref="agtable" columns={peopleColumns} data={this.getData} rowClick={this.rowClick}
                                 onSelection={this.onSelection}/>
                    </TabPane>
                    <TabPane tab='医院信息' key='2'>
                        <AgTable ref="hospitalTable" columns={hospitalColumns} data={this.getHospitalData}
                                 onSelection={this.onSelection}/>
                    </TabPane>
                </Tabs>
                {activeTab === '1' ? <div className={css.btnGroup}>
                    <ButtonGroup>
                        <Button onClick={this.add}><i className="icon iconfont icon-jia-"></i>新增</Button>
                        <Button onClick={this.edit}><i className="icon iconfont icon-xiugai"></i>修改</Button>
                        <Button onClick={this.delete}><i className="icon iconfont icon-jian"></i>删除</Button>
                        <Button onClick={this.permission}><i className="icon iconfont icon-quanxian"></i>权限设置</Button>
                    </ButtonGroup>
                    <div className={css.flex}>
                        <Input className={`${inputShow ? css.show : null}`} value={name} ref="name"
                               onChange={this.onChangeName.bind(this, 'name')} onPressEnter={this.inputShow}/>
                        <Button ghost className={`${css.ghost} ${inputShow ? css.radiusBtn : null}`}
                                onClick={this.inputShow}><Icon
                            type="search"/></Button>
                    </div>
                </div> : <div className={css.btnGroup}>
                    <div className={`${css.flex} ${css.margin0}`}>
                        <Input className={`${inputShow ? css.show : null}`} value={name}
                               onChange={this.onChangeName.bind(this, 'name')} onPressEnter={this.inputShow}/>
                        <Button ghost className={`${css.ghost} ${inputShow ? css.radiusBtn : null}`}
                                onClick={this.inputShow}><Icon
                            type="search"/></Button>
                    </div>
                </div>}
                <Setting visible={visible} title={title} save={this.saveUser} width={width} height={height}
                         className={css.modalTab} handleCancel={this.handleCancel} sure={this.sure} showSure={true}>
                    <Tabs onChange={this.modalCallBack} type="card" activeKey={activeModalTab}>
                        <TabPane tab='人员对应角色' key='role' className={css.role}>
                            <div className={css.myTree}>
                                <Input addonAfter={<Icon type="search" onClick={this.fuzzyRole}/>}
                                       onPressEnter={this.fuzzyRole}
                                       onChange={this.getFuzzyValue.bind(this, 'role')}/>
                                <MyTree data={roleVsHospital.roleDict ? roleVsHospital.roleDict.data : []}
                                        checkData={checkRoles}
                                        keys={['id', 'name', 'defaultRole', 'checkRoles']} defaultValue={defaultRole}
                                        isCache={isCache}
                                        isFirst={isFirst} activeCheck={activeCheck}
                                        getSelectCheck={this.getSelectCheck} getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} sure={this.sure}
                                        changeIsCache={this.changeIsCache}
                                />
                            </div>
                            <div className={css.myTree}>
                                {/* <Input addonAfter={<Icon type="search" onClick={this.fuzzyMenu}/>} onPressEnter={this.fuzzyMenu}
                 onChange={this.getFuzzyValue.bind(this, 'menu')}/>*/}
                                <MyTree data={roleVsHospital.menuDict} checkData={checkMenus}
                                        keys={['id', 'name', 'defaultMenu', 'checkMenus']} defaultValue={defaultMenu}
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} changeIsCache={this.changeIsCache}
                                        fuzzyMenu={this.fuzzyMenu}
                                />
                            </div>
                            <div className={css.myTree}>
                                <Input addonAfter={<Icon type="search" onClick={this.fuzzyGrant}/>}
                                       onPressEnter={this.fuzzyGrant}
                                       onChange={this.getFuzzyValue.bind(this, 'grant')}/>
                                <MyTree data={roleVsHospital.grantsDict.data} checkData={checkGrants}
                                        keys={['appCode', 'appName', 'defaultGrant', 'checkGrants']}
                                        defaultValue={defaultGrant}
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} changeIsCache={this.changeIsCache}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab='人员对应医院' key='hospital' className={css.role}>
                            <div className={css.myTree}>
                                <Input addonAfter={<Icon type="search" onClick={this.fuzzyHospital}/>}
                                       onPressEnter={this.fuzzyHospital}
                                       onChange={this.getFuzzyValue.bind(this, 'hospital')}/>
                                <MyTree data={roleVsHospital.hospitalDict ? roleVsHospital.hospitalDict.data : []}
                                        checkData={checkRoles}
                                        keys={['hospitalNo', 'hospitalName', 'defaultRole', 'checkRoles']}
                                        defaultValue={defaultRole}
                                        isCache={isCache} isFirst={isFirst} activeCheck={activeCheck}
                                        getSelectCheck={this.getSelectCheck} getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} sure={this.sure}
                                        changeIsCache={this.changeIsCache}
                                />
                            </div>
                            <div className={css.myTree}>
                                {/* <Input addonAfter={<Icon type="search" onClick={this.fuzzyMenu}/>} onPressEnter={this.fuzzyMenu}
                 onChange={this.getFuzzyValue.bind(this, 'menu')}/>*/}
                                <MyTree data={roleVsHospital.menuDict} checkData={checkMenus}
                                        keys={['id', 'name', 'defaultMenu', 'checkMenus']} defaultValue={defaultMenu}
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} changeIsCache={this.changeIsCache}
                                />
                            </div>
                            <div className={css.myTree}>
                                <Input addonAfter={<Icon type="search" onClick={this.fuzzyGrant}/>}
                                       onPressEnter={this.fuzzyGrant}
                                       onChange={this.getFuzzyValue.bind(this, 'grant')}/>
                                <MyTree data={roleVsHospital.grantsDict.data} checkData={checkGrants}
                                        keys={['appCode', 'appName', 'defaultGrant', 'checkGrants']}
                                        defaultValue={defaultGrant}
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} changeIsCache={this.changeIsCache}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                    <div className={css.title}>人员角色医院菜单权限点</div>
                </Setting>

                <InfoModal visible={infoVisible} title={title} handleCancel={this.handleCancel}
                           save={this.savePeopleInfo}
                           width={width}
                           height={height}>
                    <PeopleInfoAdd onChange={this.onChange} param={param}/>
                </InfoModal>

            </div>
        )
    }
}
