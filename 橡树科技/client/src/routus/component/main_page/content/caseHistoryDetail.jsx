/**
 * Created by liulingli on 2017/6/15.
 * desc : 病历详情
 */
import React, {Component} from "react";
import {FlexContent} from "../../common/card/flexContent";
import {CardContainer} from "../../common/card/cardContainer";
import {CardText} from "../../common/card/cardText";
import {TimeLine} from "./caseHistoryDetail/timeLine";
import {PatientInfo} from "./caseHistoryDetail/patientInfo";
import {ShowDetail} from "./caseHistoryDetail/showDetail";

export class CaseHistoryDetail extends Component {
  componentWillMount() {
    this.state = {
      patientInfo: {},
      patientDetail: {
        type: "",
        data: {}
      }
    }
  }

  /**
   * @method 获取患者信息 子组件患者信息改变时需要传递患者信息给父组件
   * @param patientInfo
   */
  getPatientInfo = (patientInfo) => {
    this.setState({
      patientInfo: patientInfo
    })
  };

  /**
   * @method 左侧时间轴选择，需要给右侧传入当前应显示的组件类型和显示信息
   * @param type
   * @param data
   */
  getDetailComponent = (type, data) => {
    this.setState({
      patientDetail: {
        type: type,
        data: data
      }
    })
  };

  render() {
    let {patientInfo, patientDetail} = this.state;
    return (
      <div className="case-history-detail">
        <FlexContent className="patient-info">
          <CardContainer>
            <CardText>
              <PatientInfo patientInfo={patientInfo}/>
            </CardText>
          </CardContainer>
        </FlexContent>
        <FlexContent className="case-history-content">
          <CardContainer className="search-content flex-grow1">
            <CardText>
              <TimeLine
                getPatientInfo={this.getPatientInfo}
                getDetailComponent={this.getDetailComponent}
              />
            </CardText>
          </CardContainer>
          <CardContainer className="show-content flex-grow5">
            <CardText>
              <ShowDetail type={patientDetail.type} data={patientDetail.data}/>
            </CardText>
          </CardContainer>
        </FlexContent>
      </div>
    )
  }
}