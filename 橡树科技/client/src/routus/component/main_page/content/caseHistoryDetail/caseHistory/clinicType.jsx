/**
 * Created by liulingli on 2017/6/22.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，单个患者信息病历详情就诊类型（门诊，入院，出院）
 */
import React, {Component} from "react";
import classNames from "classnames";
import moment from "moment";
import {ClinicList} from "./clinicList";
let visitTypeKey = {
  "M": "门诊",
  "R": "入院",
  "C": "出院"
}
export class ClinicType extends Component {
  componentWillMount() {
    this.state = {
      type: this.props.type,
      show: false,
      zyListShow: false,
      jcListShow: false,
      jyListShow: false,
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.type !== this.state.type) {
      this.setState({
        type: nextProps.type
      })
    }
  }

  /**
   * 展开toggle
   */
  expand = () => {
    this.setState({
      show: !this.state.show
    })
  };
  listExpand = (type) => {
    if (type === "zybl") {
      this.setState({
        zyListShow: !this.state.zyListShow
      })
    } else if (type === "jc") {
      this.setState({
        jcListShow: !this.state.jcListShow
      })
    } else if (type === "jy") {
      this.setState({
        jyListShow: !this.state.jyListShow
      })
    }

  };
  /**
   * @method 单击右侧显示当前选择组件
   * @param type
   * @param data
   */
  onClick = (type, data) => {
    try {
      this.props.getDetailComponent(type, data);
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    let {...other} = this.props;
    let {type, show, zyListShow, jcListShow, jyListShow} = this.state;
    let className = show ? "" : "hide";
    return (
      <li className={classNames("type", className)}>
        <p onClick={this.expand}>
          <label className="label">
            ({
            moment(type.clinicDate).format("HH:mm") + " "
          }{type.deptName})
          </label>
          <label>{visitTypeKey[type.clinicType]}</label>
          {
            type.clinicType === "R" || type.clinicType === "M" ? <i className="icon-col"/> : ""
          }
        </p>
        {
          type.clinicType === "R" ?
            <ul className="links">
              <li className="link" onClick={this.onClick.bind(this, "basy", type)}><a className="a-link">病案首页</a></li>
              <li className="link" onClick={this.onClick.bind(this, "twd", type)}><a className="a-link">体温单</a></li>
              <li className="link" onClick={this.onClick.bind(this, "cfjl", type)}><a className="a-link">处方记录</a></li>
              <li className="link" onClick={this.onClick.bind(this, "yz", type)}><a className="a-link">医嘱</a></li>
              <li className="link">
                <a className={classNames("no-link", zyListShow ? "" : "hide")}
                   onClick={this.listExpand.bind(this, "zybl")}>住院病历 <i className="icon-col"/></a>
                {zyListShow ? <ClinicList data={type} typeShow="zybl" {...other}/> : ""}
              </li>
              <li className="link">
                <a className={classNames("no-link", jcListShow ? "" : "hide")}
                   onClick={this.listExpand.bind(this, "jc")}>检查 <i className="icon-col"/></a>
                {jcListShow ? <ClinicList data={type} typeShow="jc" {...other}/> : ""}
              </li>
              <li className="link">
                <a className={classNames("no-link", jyListShow ? "" : "hide")}
                   onClick={this.listExpand.bind(this, "jy")}>检验 <i className="icon-col"/></a>
                {jyListShow ? <ClinicList data={type} typeShow="jy" {...other}/> : ""}
              </li>
            </ul>
            : type.clinicType === "M" ?
            <ul className="links">
              <li className="link" onClick={() => this.onClick("blck", type)}><a>病历查看</a></li>
              <li className="link" onClick={() => this.onClick("cf", type)}><a>处方</a></li>
              <li className="link" onClick={() => this.onClick("cz", type)}><a>处置</a></li>
            </ul> : ""
        }
      </li>
    )
  }
}