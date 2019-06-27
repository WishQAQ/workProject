/**
 * Created by liulingli on 2017/5/31.
 */
import React, {Component} from "react";
import classNames from "classnames";

export class FlexContent extends Component {

  render() {
    let {className, children} = this.props;
    return (
      <div className={classNames("flex-content", className)}>
        {children}
      </div>
    )
  }
}