/**
 * description:头部页
 * LoginInfo-----信息登陆框组件
 */
import React, {Component} from "react";
import {Layout} from "antd";
import {LoginInfo} from "./login_info/login_info";
const {Header} = Layout;

export class ComponentPageHeader extends Component {
  render() {
    return (
      <Header
        style={{position: 'fixed', width: '100%', background: "#20a8d8", height: 50}}
      >
        <div className="logo"></div>
        <div className="public_style">
          <LoginInfo/>
          <span>
                    <a href="" className="public_icon exit_icon">
                        <i className="icon iconfont">&#xe626;</i>
                    </a>
                </span>
        </div>
      </Header>
    )
  }
}
