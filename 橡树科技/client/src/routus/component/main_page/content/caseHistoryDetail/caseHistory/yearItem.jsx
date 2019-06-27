/**
 * Created by liulingli on 2017/6/22.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，单个患者信息病历详情按年分组
 */
import React, {Component} from "react";
import classNames from "classnames";
import {DateGroup} from "./dateGroup";

function getHospShort(hspName) {
  try {
    return hspName.replace(/重庆市沙坪坝区/g, '').replace(/卫生服务中心/g, '');
  } catch (error) {
    return hspName;
  }
}
export class YearItem extends Component {
  componentWillMount() {
    this.state = {
      show: true,
      yearData: this.props.yearData //按年分组的数组
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.yearData !== nextState.yearState) {
      this.setState({
        yearData: nextProps.yearData
      })
    }
  }
  //控制展开toggle
  expand = () => {
    this.setState({
      show: !this.state.show
    })
  };

  render() {
    let {yearData, show} = this.state;
    let {...other} = this.props;
    let className = show ? "" : "hide";
    return (
      <div className={classNames("years", className)}>
        <p className="show-year" title="收缩" onClick={this.expand}>
          <i className="circle-icon"/>
          {yearData.year}
          {/* <span className="hospital">{yearData.hospital?("（"+getHospShort(yearData.hospital)+"）"):""}</span>*/}
          <i className="icon-col"/>
        </p>
        <div className="group">
          {
            yearData.data.map((date, i) => {
              return <DateGroup key={i} dateData={date} isHosp={!yearData.hospital} { ...other } />
            })
          }
        </div>
      </div>
    )
  }
}