import React, {Component} from "react";
import {Button, Popover} from "antd";
export class LoginInfo extends Component {
  render() {
    const content = (//登陆信息框
      <div style={{border: '1px solid #fff'}}>
        <div className="testBg">
        </div>
        <div>
          <p className="upContent">
            <a href="#">个人信息</a>
            <a href="#">个人中心</a>
            <a href="#">个人需求</a>
          </p>
          <p className="downContent">
            <Button type="primary">登陆</Button>
            <Button type="primary">退出</Button>
          </p>
        </div>
      </div>
    );
    return (
      <Popover content={content} style={{top: 40}}>
        <div className="loginInfo">
          <div className="photoInfo">
            <div className="photo"></div>
            <span style={{marginLeft: 25 + '%'}}>Alexander Pierce</span>
          </div>
        </div>
      </Popover>
    )
  }
}