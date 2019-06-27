/**
 * Created by liulingli on 2017/5/24.
 */
import React, {Component} from "react";
import classNames from "classnames";
import {CounterWidgetCard} from "./counterWidgetCard";

export class CounterWidget extends Component {

  render() {
    let {bgColor, count, desc, iconFont, className, ...other} = this.props;
    return (
      <div className={classNames("oak-counter-wedget", className)}>
        <CounterWidgetCard
          bgColor={bgColor}
          count={count}
          desc={desc}
          iconFont={iconFont}
        />
      </div>
    )
  }
}




