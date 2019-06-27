/**
 * Created by liulingli on 2017/6/22.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，单个患者信息病历详情按医院分组
 */
import React, {Component} from "react";
import classNames from "classnames";
import {ClinicType} from "./clinicType";

function getHospShort(hspName) {
  try {
    return hspName.replace(/重庆市沙坪坝区/g, '').replace(/卫生服务中心/g, '');
  } catch (error) {
    return hspName;
  }
}
export class HospitalData extends Component {
  componentWillMount() {
    this.state = {
      hospData: this.props.hospData,
      isHosp: this.props.isHosp,
      show: true
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.hospData !== nextState.hospData) {
      this.setState({
        hospData: nextProps.hospData
      })
    }
    if (nextProps.isHosp !== nextState.isHosp) {
      this.setState({
        isHosp: nextProps.isHosp
      })
    }
  }

  /**
   * @method 控制展开toggle
   */
  expand = () => {
    this.setState({
      show: !this.state.show
    })
  };

  render() {
    let {hospData, isHosp, show} = this.state;
    let {...other} = this.props;
    let className = show ? "" : "hide";
    return (
      <div className={classNames("hosp-list", className)}>
        {
          <p className="hospital" onClick={this.expand}>
            {getHospShort(hospData.hospital)}
            <i className="icon-col"/>
          </p>
        }
        <ul className="type-list">
          {
            hospData.data.map((type, i) => {
              return <ClinicType key={i} type={type} isHosp={isHosp} { ...other }/>
            })
          }
        </ul>
      </div>
    )
  }
}