/**
 * Created by liulingli on 2017/6/22.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，检查、检验、住院病历列表
 */
import React, {Component} from "react";
import qs from "qs";
export class ClinicList extends Component {
  componentWillMount() {
    this.state = {
      typeShow: this.props.typeShow,
      data: this.props.data,
      listArray: []
    }
  }

  componentDidMount() {
    this.getListArray(this.state.data, this.state.typeShow);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== nextState.data) {
      this.setState({
        data: nextProps.data
      })
    }
    if (nextProps.typeShow !== nextState.typeShow) {
      this.setState({
        typeShow: nextProps.typeShow
      })
    }
    this.getListArray(nextProps.data, nextProps.type);
  }

  /**
   * @method 单击右侧显示当前类别组件
   * @param type
   * @param list
   * @param data
   */
  onClick = (type, list, data) => {
    if (type) {
      let param = {
        hspCode: data.hspCode,
        patientId: data.patientId,
        visitId: data.clinicNo,
        fileNo: list.fileNo
      };
      this.props.getDetailComponent(type, param);
    }
  };
  /**
   * @method 查询住院病历、检查、检验详细列表
   * @param data
   * @param type
   */
  getListArray = (data, type) => {
    if (type === "zybl") {
      console.log("visitId",data)
      let param = {
        patientId: data.patientId,
        visitId: data.clinicNo,
        hspCode: data.hspCode
      };
      fetch("/caseHistory/PatientMedicalHistory/getEmrList", {
        method: "POST",
        body: qs.stringify(param)
      }).then(response => {
        console.log(response);
        if (response.success) {
          let data = response.data;
          this.setState({
            listArray: data
          })
        } else {
          throw new Error(response.message);
        }
      })
    } else if (type === "jc") {

    } else if (type === "jy") {

    }
  };

  render() {
    let {listArray, typeShow, data} = this.state;
    return (
      <ul className="clinic-list">
        {
          listArray.map((v, i) => {
            return <li
                    key={i}
                    onClick={this.onClick.bind(this, typeShow, v, data)}
                    title={v.topic}
            >
              <a className="a-link"><i className="border-left"/>{v.topic}</a>
            </li>
          })
        }
      </ul>
    )
  }
}