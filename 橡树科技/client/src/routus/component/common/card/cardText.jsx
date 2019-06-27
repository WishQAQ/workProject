/**
 * Created by liulingli on 2017/5/22.
 */
import React, {Component} from "react";
import classNames from "classnames";

export class CardText extends Component {

  render() {
    let {children, className, ...other} = this.props;
    return (
      <div className={classNames("card-text", className)}>
        {children}
      </div>
    )

  }
}