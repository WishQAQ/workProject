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
import {MyTree} from '../component/tree2'
import {PeopleInfoAdd} from '../content/peopleInfoAdd'
import api from '../api'
import moment from 'moment'
import css from '../style/content/people_hospital_info.scss'
// wjl 单位页面
import {PeopleAdd} from './people_add'

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
        headerName: '单位简称',
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
        headerName: '单位号',
        field: 'hospitalNo',
        width: 100
    }, {
        headerName: '单位名称简称',
        field: 'abbreviation',
        width: 100
    },
    {
        headerName: '单位全称',
        field: 'hospitalNameFull',
        width: 100
    },
    {
        headerName: '单位商户号',
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
            title: '权限设置',//modal 标题
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
            paramHos: {
                hospitalName: '', //单位简称
                patientIdHead: '', //病人ID
                serverIp: '', // 同步IP地址
                serverPort: '', //同步服务器端口
                hospitalNo: '', //医院号 单位号
                abbreviation: '', // 医院名称简称
                hospitalNameFull: '', //医院名称全称
                hospitalAccount: '',// 医院商户号
                dataSource: '', // 医院链接数据源
                emrEnable: '', // 是否启用区域EMR
                citywideApplicationCode: '', //亚德程序编码
                citywideApplicationName: '', // 亚德医院名称 字段没找到暂用
                id: '' // id

            }, // 单位模态框内容
            rowData: {},//保存点击的当前行的data
            rowDataHos: {}, // 保存点击当前行的data 医院信息的data
            selectData: [],//选择的行
            selectDataHos: [], // 选者的行 医院
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
                roleMenu: [],
            },
            checkRoles: [],//tree role选中的角色
            checkHospital: [], // tree hospital选中的值
            checkMenus: [],//选中的菜单
            checkGrants: [],//选中的权限
            defaultRole: '',//默认角色
            defaultHospital: '',//默认医院
            defaultMenu: '',//默认菜单
            defaultGrant: '',//默认权限
            menuList: [],//菜单列表
            grantsList: [],//权限列表
            roleMap: new Map(),
            hospitalMap: new Map(),
            role: '',//模糊查询角色的值
            menu: '',//模糊查询菜单的值
            grant: '',//模糊查询权限的值
            hospital: '',//模糊查询医院的值
            checkVal: '',//用户、医院选中的角色
            activeCheck: '',//当前选中的项
            clickCheck: '',//点击的项
            // 新增单位信息功能 by wjl
            newVisible: false, // 新增单位弹框状态
            hospitalTitle:'部门设置'  //部门设置title
        }
    }

    /**
     * 获取当前用户的拥有的角色、权限、菜单、医院
     */
    getRoleVsHospital = () => {
        const {param} = this.state;
        const {roleVsHospital} = api;
        let dataPack = {
            name: '',
            userId: param.id,
        };
        roleVsHospital(dataPack, response => {
                if (response.success) {
                    const data = response.data;
                    console.log(data);
                    this.setState({
                        roleVsHospital: data,
                        checkRoles: data.role ? data.role : [],
                        checkHospital: data.hospital ? data.hospital : [],
                        defaultHospital: data.defaultHospital,
                        defaultRole: data.defaultRole,
                        checkMenus: [],
                        roleMap: data.roleMap ? new Map(Object.entries(data.roleMap)) : new Map(),
                        hospitalMap: data.hospitalMap ? new Map(Object.entries(data.hospitalMap)) : new Map(),
                        defaultMenu: '',
                        checkGrants: [],
                        defaultGrant: ''
                    })
                } else {
                    message.warn('查询初始化数据失败' + response.msg);
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
        // 切换时,需要去缓存数据,并且要清空数据
        let {activeCheck} = this.state;
        new Promise((success, error) => {
            if (activeCheck) {
                this.sure().then(() => {
                    success()
                }).catch(() => {
                    error()
                })
            } else success()
        }).then(() => {
            this.setState({
                activeModalTab: key,
                name: '',
                activeCheck: '',
                checkMenus: [],
                checkGrants: [],
                defaultMenu: '',
                defaultGrant: '',
                defaultHospital: '',
                inputShow: false,
            })
        })
    };
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
     * 医院新增点击
     */
    addHospital = ()=> {
        this.setState({
            newVisible: true,
            title: '医院信息—新增',
            width: '420px',
            height: '485px',
            paramHos: {
                hospitalName: '',
                patientIdHead: '',
                serverIp: '',
                serverPort: '',
                hospitalNo: '',
                abbreviation: '',
                hospitalNameFull: '',
                hospitalAccount: '',
                dataSource: '',
                emrEnable: '',
                citywideApplicationCode: '',
                id: ''
            }
        })
    }

    /**
     * 关闭模态框
     */
    handleCancel = () => {
        this.setState({
            visible: false,
            infoVisible: false,
            isCache: false,
            isFirst: true,
            checkGrants: [],
            checkHospital: [],
            checkMenus: [],
            checkRoles: [],
            defaultMenu: '',
            defaultRole: '',
            defaultGrant: '',
            defaultHospital: '',
            activeCheck: '',
            menuList: [],
            grantsList: [],
            roleMap: new Map(),
            hospitalMap: new Map(),
            newVisible: false,
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
     *  选中的行id list 单位信息
     * @param data
     */
    onSelectionHos = (data) => {
        let selectDataHos = [];
        for (let i = 0; i < data.length; i++) {
            selectDataHos.push(data[i].data.id)
        }
        this.setState({
            selectDataHos: selectDataHos
        })
    }
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
     * 删除医院信息
     */
    deleteHospitalInfo = () => {
        const {selectDataHos} = this.state;
        const {deleteHospitalInfo} = api;
        if (selectDataHos.length === 0) {
            message.warning('请选择要删除的行');
            return false;
        }
        let react = this;
        confirm({
            content: '您确定要删除吗？',
            onOk() {
                let hospitalId = {
                    hospitalId: selectDataHos,
                };
                hospitalId.hospitalId = JSON.stringify(hospitalId.hospitalId);
                deleteHospitalInfo(hospitalId, response => {
                    if (response.success) {
                        react.refs.agtable.onReverSource();
                        react.setState({
                            selectDataHos: [],
                        })
                    } else {
                        console.error('response error', response)
                    }
                })
            },
            onCancel() {
            },
        });
    }
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
     * 单位信息行点击
     * @param row
     */
    companyRowClick = (row) => {
        console.log(row.data)
        this.setState({
            paramHos: row.data,
            rowDataHos: row.data
        })
    }
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
    /**
     * 医院信息的修改
     */
    editHospital = () => {
        let {selectDataHos, rowDataHos} = this.state;
        if (selectDataHos.length === 0) {
            message.warning('请选择要修改的行')
        } else {
            this.setState({
                infoVisibleHospital: true,
                title: '医院信息-修改',
                width: '420px',
                height: '485px',
                paramHos: rowDataHos
            })
        }

    }

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
    /**
     * 保存医院信息
     */
    saveCompanyInfo = () => {
        const {paramHos} = this.state;
    }

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
     *  检测医院模态框输入项是否输入
     */
    checkInput = () => {
        const {paramHos} = this.state

    }
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
    onChangeHos = (type, e) => {
        if (!type) {return}
        let {paramHos} = this.state;
        paramHos[type] = e.target.value;
        this.setState({
            paramHos: paramHos
        })
    }

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
     * @param active
     * @param isCheck
     */
    getCheckValues = (type, val, active, isCheck) => {
        let {activeCheck, roleMap, hospitalMap, activeModalTab} = this.state;
        if (type === 'checkRoles' || type === 'checkHospital') {
            if (!isCheck) { // 选中
                new Promise((success, error) => {
                    if (activeCheck) { // 如果当前选中的已经存在值,那么需要进行缓存数据
                        this.sure().then(() => {
                            success()
                        }).catch((msg) => error(msg));
                    } else success()
                }).then(() => {
                    if (!isCheck) { // 勾选中的值
                        activeCheck = active
                    } else {
                        activeCheck = '';
                    }
                    this.setState({
                        isFirst: false,
                        activeCheck: activeCheck,
                        clickCheck: active,
                        [type]: val,
                    }, () => {
                        this._getSelectCheck('', active);
                    })
                })
            } else { // 没选中
                if (activeModalTab === 'role') {
                    roleMap.delete(active.toString())
                } else {
                    hospitalMap.delete(active.toString())
                }
                this.setState({
                    [type]: val,
                    roleMap: roleMap,
                    hospitalMap: hospitalMap
                });
            }
        } else {
            this.setState({
                [type]: val
            })
        }
    };

    _getSelectCheck(type, val) {
        // 判断map中是否存在值,不存在在数据库中去加载
        let {activeModalTab, roleMap, hospitalMap} = this.state;
        console.log(activeModalTab, roleMap, hospitalMap)
        let value = activeModalTab === 'role' ? roleMap.get(val.toString()) : hospitalMap.get(val.toString());
        if (value) {
            this.setState({
                checkMenus: value.checkMenus ? value.checkMenus : [],
                checkGrants: value.checkGrants ? value.checkGrants : [],
                activeCheck: val,
                defaultMenu: parseInt(value.defaultMenu),
                defaultGrant: value.defaultGrant,
            });
        } else {
            this.setState({
                checkMenus: [],
                checkGrants: [],
                activeCheck: val,
                defaultMenu: '',
                defaultGrant: '',
            });
        }

    }

    /** 获取选中的菜单和权限 */
    getSelectCheck = (type, val) => {
        if (type === 'role' || type === 'hospital') {
            console.log(type, val, 'getSelectCheck');
            let {activeCheck} = this.state;
            new Promise((success, error) => {
                if (activeCheck) {
                    this.sure().then(() => {
                        success();
                    }).catch(() => {
                        error()
                    })
                } else success()
            }).then(() => {
                this._getSelectCheck(type, val)
            })

        } else
            this._getSelectCheck(type, val)
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
        this.sure().then(() => {
            let {
                roleMap,
                hospitalMap,
                checkHospital,
                checkRoles,
                defaultRole,
                param,
                defaultHospital
            } = this.state;
            defaultRole = defaultRole ? defaultRole.toString() : defaultRole
            defaultHospital = defaultHospital ? defaultHospital.toString() : defaultHospital
            let menuList = [], grantsList = [], userVsRolesList = [], userVsHospitalsList = [];
            checkHospital.forEach((value) => {
                userVsHospitalsList.push({
                    userId: param.id,
                    hospitalNo: value,
                    isDefault: defaultHospital === value ? 1 : 0
                })
            });
            checkRoles.forEach((value) => {
                userVsRolesList.push({
                    userId: param.id,
                    roleId: value,
                    isDefault: defaultRole === value ? 1 : 0
                })
            })
            roleMap.forEach((value) => {
                menuList = menuList.concat(value.menuList)
                grantsList = grantsList.concat(value.grantsList)
            });
            hospitalMap.forEach((value) => {
                menuList = menuList.concat(value.menuList)
                grantsList = grantsList.concat(value.grantsList)
            });
            let dataPack = {
                userId: param.id,
                menuList: JSON.stringify(menuList),
                grantsList: JSON.stringify(grantsList),
                userVsRolesList: JSON.stringify(userVsRolesList),
                userVsHospitalsList: JSON.stringify(userVsHospitalsList)
            };
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
                        grantsList: []
                    });
                    message.info('保存成功');
                } else {
                    message.info('保存失败' + response.msg);
                    console.error('response error', response)
                }
            })
        })

    };
    getList = (checkMenus, defaultMenu, menuList, check, key1, key2) => {
        const {param} = this.state;
        defaultMenu = defaultMenu ? defaultMenu.toString() : defaultMenu
        for (let i = 0; i < checkMenus.length; i++) {
            let object = {
                [key2]: checkMenus[i],
                userId: param.id,
                isDefault: checkMenus[i] === defaultMenu ? 1 : 0,
            }
            if (key1) object[key1] = check
            menuList.push(object);
        }
        return menuList;
    };
    /**
     * 缓存数据
     * @returns {Promise<any>}
     */
    sure = () => {
        return new Promise((success, error) => {
            try {
                let {
                    activeCheck,
                    roleMap,
                    hospitalMap,
                    activeModalTab,
                    checkGrants,
                    checkMenus,
                    defaultGrant,
                    defaultMenu
                } = this.state;
                let _name = activeModalTab === 'role' ? 'roleId' : 'hospitalNo'
                let _value = {
                    menuList: this.getList(checkMenus, defaultMenu, [], activeCheck, _name, 'menuId'),
                    checkMenus: checkMenus,
                    defaultMenu: defaultMenu,
                    defaultGrant: defaultGrant,
                    checkGrants: checkGrants,
                    grantsList: this.getList(checkGrants, defaultGrant, [], activeCheck, _name, 'code'),
                }
                if (_name === 'roleId') roleMap.set(activeCheck.toString(), _value)
                else hospitalMap.set(activeCheck.toString(), _value);
                this.setState({
                    roleMap: roleMap,
                    hospitalMap: hospitalMap
                });
                success();
            } catch (msg) {
                error(msg);
            }
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

    /**
     * 部门设置 by wjl
     */
    permissionHospitalInfo = () => {
        this.setState({newVisible: true})

    }

    render() {
        const {
            activeTab,
            infoVisible,
            defaultHospital,
            checkHospital,
            width,
            height,
            title,
            visible,
            inputShow,
            name,
            param,
            roleVsHospital,
            checkMenus,
            checkRoles,
            checkGrants,
            defaultGrant,
            defaultMenu,
            defaultRole,
            activeModalTab,
            isCache,
            isFirst,
            activeCheck,
            paramHos,
            newVisible,
            hospitalTitle,
        } = this.state;
        return (
            <div className={css.peoHospitalInfo}>
                <Tabs onChange={this.callback} type="card" className={css.infoTab}>
                    <TabPane tab='人员信息' key='1'>
                        <AgTable ref="agtable" columns={peopleColumns} data={this.getData} rowClick={this.rowClick}
                                 onSelection={this.onSelection}/>
                    </TabPane>
                    <TabPane tab='单位信息' key='2'>
                        <AgTable ref="hospitalTable" columns={hospitalColumns} data={this.getHospitalData}
                                 onSelection={this.onSelectionHos} rowClick={this.companyRowClick}/>
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
                    <ButtonGroup>
                        <Button onClick={this.addHospital}><i className="icon iconfont icon-jia-"></i>新增</Button>
                        <Button onClick={this.editHospital}><i className="icon iconfont icon-xiugai"></i>修改</Button>
                        <Button onClick={this.deleteHospitalInfo}><i className="icon iconfont icon-jian"></i>删除</Button>
                        <Button onClick={this.permissionHospitalInfo}><i className="icon iconfont icon-quanxian"></i>部门设置</Button>
                    </ButtonGroup>
                    &nbsp;&nbsp;
                    <div className={`${css.flex} ${css.margin0}`}>
                        <Input className={`${inputShow ? css.show : null}`} value={name}
                               onChange={this.onChangeName.bind(this, 'name')} onPressEnter={this.inputShow}/>
                        <Button ghost className={`${css.ghost} ${inputShow ? css.radiusBtn : null}`}
                                onClick={this.inputShow}><Icon
                            type="search"/></Button>
                    </div>
                </div>}
                <Setting visible={visible} title={title} save={this.saveUser} width={width} height={height}
                         className={css.modalTab} handleCancel={this.handleCancel} sure={this.sure}>
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
                                        type='role'
                                        isFirst={isFirst}
                                        activeCheck={activeCheck}
                                        getSelectCheck={this.getSelectCheck}
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue}
                                        sure={this.sure}
                                        changeIsCache={this.changeIsCache}
                                />
                            </div>
                            <div className={css.myTree}>
                                <MyTree data={roleVsHospital.menuDict} checkData={checkMenus}
                                        keys={['id', 'name', 'defaultMenu', 'checkMenus']} defaultValue={defaultMenu}
                                        getCheckValues={this.getCheckValues}
                                        type='menu'
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
                                        type='grant'
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
                                        checkData={checkHospital}
                                        keys={['hospitalNo', 'hospitalName', 'defaultHospital', 'checkHospital']}
                                        defaultValue={defaultHospital}
                                        type='hospital'
                                        isCache={isCache} isFirst={isFirst} activeCheck={activeCheck}
                                        getSelectCheck={this.getSelectCheck} getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} sure={this.sure}
                                        changeIsCache={this.changeIsCache}
                                />
                            </div>
                            <div className={css.myTree}>
                                <MyTree data={roleVsHospital.menuDict} checkData={checkMenus}
                                        keys={['id', 'name', 'defaultMenu', 'checkMenus']} defaultValue={defaultMenu}
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} changeIsCache={this.changeIsCache}
                                />
                            </div>
                            <div className={css.myTree}>
                                <Input addonAfter={<Icon type="search" onClick={this.fuzzyGrant}/>}
                                       onPressEnter={this.fuzzyGrant}
                                       type='menu'
                                       onChange={this.getFuzzyValue.bind(this, 'grant')}/>
                                <MyTree data={roleVsHospital.grantsDict.data} checkData={checkGrants}
                                        keys={['appCode', 'appName', 'defaultGrant', 'checkGrants']}
                                        defaultValue={defaultGrant}
                                        type='grant'
                                        getCheckValues={this.getCheckValues}
                                        setDefaultValue={this.setDefaultValue} changeIsCache={this.changeIsCache}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                    <div className={css.title}>人员角色色医院菜单权限点</div>
                </Setting>
                <InfoModal visible={infoVisible} title={title} handleCancel={this.handleCancel}
                           save={this.savePeopleInfo}
                           width={width}
                           height={height}>
                    <PeopleInfoAdd onChange={this.onChange} param={param}/>
                </InfoModal>
                {/*医院信息弹窗*/}
                <InfoModal visible={newVisible}
                           title={hospitalTitle}
                           handleCancel={this.handleCancel}
                           save={this.savePeopleInfo}
                           width={width}
                           height={height}>
                    <PeopleAdd/>
                </InfoModal>
            </div>
        )
    }
}
