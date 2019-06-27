/**
 * Created by liulingli on 2017/6/20.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，单个患者信息
 */
import React, {Component} from "react";
import {CaseHistory} from "./caseHistory";

export class QueryResultAlone extends Component {
  componentWillMount() {
    this.state = {
      clinicRecList: this.props.clinicRecList, //患者区域就诊事件
      patientLists: this.props.patientLists //患者列表，判断当前查询出的患者人数，如果为0显示空
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.clinicRecList !== this.state.clinicRecList || nextProps.patientLists !== this.state.patientLists) {
      this.setState({
        clinicRecList: nextProps.clinicRecList,
        patientLists: nextProps.patientLists
      })
    }
  }

  render() {
    let {clinicRecList, patientLists} = this.state;
    let {...other} = this.props;
    return (
      <div className="query-result-alone">
        {
          clinicRecList ?
            patientLists.length === 0 ?
              <div className="no-info">
                <i className="iconfont icon-404"/><span>没有找到该患者</span>
              </div>
              :
              <CaseHistory clinicRecList={clinicRecList} {...other}/>
            :
            ""
        }
      </div>
    )
  }
}