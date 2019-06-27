/**
 * Created by liulingli on 2017/5/24.
 */
import React, {Component} from "react";
import {OakIcon} from "./oakIcon";

export class CounterWidgetCard extends Component {

  render() {
    let {count, desc, bgColor, iconFont, ...other} = this.props;
    return (
      <div className="oak-counter-wedget-card" style={{backgroundColor: bgColor}}>
        <div className="oak-counter-wedget-card-content">
          <OakIcon className={iconFont} style={{fontSize: '4.4em', color: '#fff'}}/>
          <div className="layout-column">
            <p className="count">{count}</p>
            <p className="desc" style={{fontSize: '1em', color: '#fff'}}>{desc}</p>
          </div>
        </div>
      </div>
    )
  }
}