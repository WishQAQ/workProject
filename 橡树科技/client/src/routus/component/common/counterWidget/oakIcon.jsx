/**
 * Created by liulingli on 2017/5/24.
 */
import React, {Component} from "react";
import classNames from "classnames";

export class OakIcon extends Component {
  render() {
    let {className, style, ...other} = this.props;
    return (
      <div className={classNames("iconfont oak-icon", className)} style={style}>
      </div>
    )
  }
}
