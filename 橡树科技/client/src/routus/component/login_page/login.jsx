import React, {Component} from "react";
import {Button, Checkbox, Form, Input, message, Select, Icon} from "antd";
import qs from "qs";
import {Store, User} from "core";
import {browserHistory} from "react-router";
import api from './api'
import css from './../../less/login/login.scss'

const Option = Select.Option;

export class LoginPage extends Component {

    constructor(props) {
        super(props);
        // 第三方系统登录设置 判断是否有userName
        let userName = this.getParamValue('userName')
        let param=null
        if (!!userName) { // 用户名不为空
             param={
                userName: userName,
                password: this.getParamValue('password'),
                hospitalNo: this.getParamValue('hospitalNo')
            }
            Store.session.set('patientInfo',this.getParamValue('patientInfo'))
        }
        this.state = {
            userContent: false,
            pwdContent: false,
            version: "",
            hospitals: [],//医院字典表
            roles: [],//角色列表
            roleId: '',
            roleName: '',
            userName: '',
            password: '',
            param: param,
            hospitalNo: '',
            tip: '',
            tipShow: false,
            isRemember: false,
            hospitalName: '',
        }
    }

    getParamValue = (name) => {
        if (!name) return null;
        let regular = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        console.log(window.location.search)
        let r = window.location.search.substr(1).match(regular);
        if (r != null) return r[2];
        return null;
    }

    componentWillMount() {
        window._fetch('/package.json').then(res => res.ok ? res.json() : "获取配置文件失败").then(json => {
            this.setState({version: json.version})
        });
        // 加载第三方用户
        let {param}=this.state
        if(!!param){
            fetch('/infrastructure/LoginController/otherSystemLogin',{method:'POST',body:qs.stringify(param)}).then(data=>{
                if(data.success){
                    if (User.login(data.data)) {
                        let roleList=[{
                            roleName:data.data.role.name,
                            roleId:data.data.role.id
                        }]
                        User.setRoles(JSON.stringify(roleList))
                        /**判断用户是否有权限菜单*/
                        let {defaultMenus,menusModel}=data.data;
                        if (menusModel &&  menusModel.length > 0&& defaultMenus) {
                            console.log(defaultMenus.url);
                            browserHistory.replace(defaultMenus.url);
                        } else {
                            this.setState({
                                tip: '该用户没有权限菜单',
                                tipShow: true
                            });
                            setTimeout(() => {
                                this.setState({
                                    tip: '',
                                    tipShow: false
                                })
                            }, 3000);
                        }
                    }
                }else{
                    this.setState({
                        tip: data.msg,
                        tipShow: true
                    });
                    setTimeout(() => {
                        this.setState({
                            tip: '',
                            tipShow: false
                        })
                    }, 3000);
                }
            })
        }
        /**查询医院字典表*/
        const {loadHospitals} = api;
        loadHospitals(res => {
            this.setState({
                hospitals: res
            })
        })
    }

    componentDidMount() {
        const user = JSON.parse(User.getRemember());
        const {selectRoles} = api;
        if (user) {
            const param = {
                userName: user.userName,
                hospitalNo: user.hospitalNo
            };
            selectRoles(param, res => {
                this.setState({
                    roles: res.data
                }, () => {
                    this.setState({
                        roleName: user.roleName,
                        hospitalName: user.hospitalName,
                        userName: user.userName,
                        password: user.password,
                        roleId: user.roleId,
                        hospitalNo: user.hospitalNo,
                        isRemember: true
                    })
                });
            });
        }
    }

//输入用户名和密码
    inputValue = (type, e) => {
        switch (type) {
            case 'userName':
                document.getElementById("password").focus();
                break;
            case 'password':
                this.handleSubmit();
                break;
        }
    };
    changeValue = (type, e) => {
        const {hospitals, roles} = this.state;
        let val;
        switch (type) {
            case 'hospitalNo':
                let hospitalName;
                for (let i = 0; i < hospitals.length; i++) {
                    if (hospitals[i].hospitalNo === e) {
                        hospitalName = hospitals[i].abbreviation;
                        break;
                    }
                }
                val = e;
                this.setState({
                    hospitalName: hospitalName
                });
                break;
            case 'roleId':
                let roleName;
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].roleId.toString() === e) {
                        roleName = roles[i].roleName;
                        break;
                    }
                }
                val = e;
                this.setState({
                    roleName: roleName
                });
                val = e;
                break;
            default:
                val = e.target.value;
                break;
        }
        this.setState({
            [type]: val
        })
    };
    //登录 CQ admin
    handleSubmit = () => {
        if (!this.checkInput()) {
            return false
        }
        const {roleId, password, hospitalNo, userName, isRemember, roleName, hospitalName} = this.state;
        const {login} = api;
        const param = {
            roleId: roleId,
            password: password,
            hospitalNo: hospitalNo,
            userName: userName
        };
        login(param, res => {
            if (res.success) {
                if (User.login(res.data)) {
                    /**判断用户是否有权限菜单*/
                    let {defaultMenus,menusModel}=res.data;
                    if (menusModel &&  menusModel.length > 0&& defaultMenus) {
                        browserHistory.replace(defaultMenus.url);
                    }else {
                        this.setState({
                            tip: '该用户没有权限菜单',
                            tipShow: true
                        });
                        setTimeout(() => {
                            this.setState({
                                tip: '',
                                tipShow: false
                            })
                        }, 3000);
                    }
                }
                if (isRemember) {
                    const user = {
                        roleName: roleName,
                        hospitalName: hospitalName,
                        userName: userName,
                        password: password,
                        roleId: roleId,
                        hospitalNo: hospitalNo,
                    };
                    User.setRemember(JSON.stringify(user))
                } else {
                    User.removeRemember();
                }
            } else {
                this.setState({
                    tip: res.msg,
                    tipShow: true
                });
                setTimeout(() => {
                    this.setState({
                        tip: '',
                        tipShow: false
                    })
                }, 3000);
            }
        })
    };
    //文本框失去焦点获取用户的角色
    inputOnBlur = () => {
        const {selectRoles} = api;
        const {userName, hospitalNo, tip, tipShow} = this.state;
        const param = {
            userName: userName,
            hospitalNo: hospitalNo
        };
        let tipC;
        if (hospitalNo === "") {
            tipC = '请选择医院';
            this.setState({
                tip: tipC,
                tipShow: true
            });
            setTimeout(() => {
                this.setState({
                    tip: '',
                    tipShow: false
                })
            }, 3000);
            return false
        }
        if (userName === "") {
            tipC = '用户名不能为空';
            this.setState({
                tip: tipC,
                tipShow: true
            });
            setTimeout(() => {
                this.setState({
                    tip: '',
                    tipShow: false
                })
            }, 3000);
            return false
        }
        selectRoles(param, res => {
            if (res.success) {
                this.setState({
                    roles: res.data,
                    roleName: res.data[0].roleName,
                    roleId: res.data[0].roleId
                });
                User.setRoles(JSON.stringify(res.data));
            } else {
                this.setState({
                    roles: [],
                    roleName: '',
                    roleId: '',
                    tip: res.msg,
                    tipShow: true
                });
                setTimeout(() => {
                    this.setState({
                        tip: '',
                        tipShow: false
                    })
                }, 3000);
            }
        })
    };
    //检测是否输入
    checkInput = () => {
        const {password, hospitalNo, userName, roleId} = this.state;
        let tipC;
        if (hospitalNo === "") {
            tipC = '请选择医院';
            this.setState({
                tip: tipC,
                tipShow: true
            });
            setTimeout(() => {
                this.setState({
                    tip: '',
                    tipShow: false
                })
            }, 3000);
            return false
        }
        if (userName === "") {
            tipC = '用户名不能为空';
            this.setState({
                tip: tipC,
                tipShow: true
            });
            setTimeout(() => {
                this.setState({
                    tip: '',
                    tipShow: false
                })
            }, 3000);
            return false
        }
        if (roleId === "") {
            tipC = '当前医院无此角色';
            this.setState({
                tip: tipC,
                tipShow: true
            });
            setTimeout(() => {
                this.setState({
                    tip: '',
                    tipShow: false
                })
            }, 3000);
            return false
        }
        if (password === "") {
            tipC = '密码不能为空';
            this.setState({
                tip: tipC,
                tipShow: true
            });
            setTimeout(() => {
                this.setState({
                    tip: '',
                    tipShow: false
                })
            }, 3000);
            return false
        }
        return true;
    };
    //记住用户
    remember = (e) => {
        this.setState({
            isRemember: e.target.checked
        });
    };

    render() {
        const {roles, hospitals, userName, password, roleName, tipShow, tip, isRemember, hospitalNo, roleId} = this.state;
        return (
            <div className={css.login}>
                <div className={css.loginImg}>
                    <div className={css.loginMask}>
                        <div className={css.loginContent}>
                            <div className={css.titleLogin}>
                                <div className={css.loginLogo}></div>
                            </div>
                            <div className={css.content}>
                                <div className={css.titleLogin2}>
                                    <div className={css.hospital}>
                                        <i className="icon iconfont icon-yiyuan"/>
                                        {hospitalNo !== "" ? <Select
                                            showSearch
                                            className={css.select}
                                            dropdownClassName={css.dropSelect}
                                            value={hospitalNo}
                                            onChange={this.changeValue.bind(this, 'hospitalNo')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {hospitals.map((hospital, index) =>
                                                <Option value={hospital.hospitalNo}
                                                        key={hospital.hospitalNo}>{hospital.abbreviation}</Option>
                                            )}
                                        </Select> : <Select
                                            showSearch
                                            className={css.select}
                                            dropdownClassName={css.dropSelect}
                                            placeholder="请选择医院"
                                            onChange={this.changeValue.bind(this, 'hospitalNo')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {hospitals.map((hospital, index) =>
                                                <Option value={hospital.hospitalNo}
                                                        key={hospital.hospitalNo}>{hospital.abbreviation}</Option>
                                            )}
                                        </Select>}
                                    </div>
                                    <Input
                                        className={css.input}
                                        placeholder="用户名"
                                        id="userName"
                                        onPressEnter={this.inputValue.bind(this, 'userName')}
                                        onChange={this.changeValue.bind(this, 'userName')}
                                        onBlur={this.inputOnBlur.bind(this)}
                                        prefix={<i
                                            className={`${css.iStyle} ${css.icon1} icon iconfont icon-yonghu`}></i>}
                                        value={userName}
                                    />
                                    <Input
                                        className={css.input}
                                        placeholder="密码"
                                        type="password"
                                        id="password"
                                        onPressEnter={this.inputValue.bind(this, 'password')}
                                        onChange={this.changeValue.bind(this, 'password')}
                                        prefix={<i
                                            className={`${css.iStyle} ${css.icon1} icon iconfont icon-mima1`}></i>}
                                        value={password}
                                    />
                                    <div className={css.role}>
                                        {roles && roles.length ? <Select
                                            className={css.role}
                                            dropdownClassName={css.dropSelect}
                                            onChange={this.changeValue.bind(this, 'roleId')}
                                            value={roleName}
                                        >
                                            {roles.map((role, index) =>
                                                <Option value={role.roleId.toString()}
                                                        key={role.roleId}>{role.roleName}</Option>
                                            )}
                                        </Select> : null}
                                    </div>
                                    <div className={css.sub}>
                                        <Button type="primary" onClick={this.handleSubmit}
                                                className={`login-form-button ${css.btnStyle}`}>登陆</Button>
                                        <Checkbox checked={isRemember} onChange={this.remember}>记住用户</Checkbox>
                                    </div>
                                </div>
                                <div className={`text-center ${css.copyright}`}>
                  <span>版权所有&copy; 2017-06 橡树科技 版本号：V{this.state.version}
                      {tipShow ? <div className={`text-center ${css.tips}`}>
                          <span><Icon type="close-circle-o"/>{tip}</span>
                      </div> : null}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}