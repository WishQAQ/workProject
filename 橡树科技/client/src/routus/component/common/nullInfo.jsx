/**
 * Created by liulingli on 2017/7/7.
 * desc 查询数据为空时的显示组件
 */
import React, {Component} from "react";
import classNames from "classnames";

export class NullInfo extends Component {

  render() {
    let {className, tips} = this.props;
    return (
      <div className={classNames("no-info", className)}>
        <i className="iconfont icon-404"/>
        <span>{tips ? tips : "暂无数据"}</span>
      </div>
    )
  }
}