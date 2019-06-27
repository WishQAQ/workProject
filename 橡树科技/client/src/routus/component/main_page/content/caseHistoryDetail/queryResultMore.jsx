/**
 * Created by liulingli on 2017/6/20.
 * desc : 病历详情左侧时间轴input输入框弹出选框查询结果弹出窗，患者列表
 */
import React, {Component} from "react";

export class QueryResultMore extends Component {
  componentWillMount() {
    this.state = {
      patientLists: this.props.patientLists,
      isShow: this.props.isShow
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.patientLists !== this.state.patientLists) {
      this.setState({
        patientLists: nextProps.patientLists
      })
    }
    if (nextProps.isShow !== this.state.isShow) {
      this.setState({
        isShow: nextProps.isShow
      })
    }
  }

  componentDidMount() {
    //监听document的click事件
    document.body.removeEventListener("click", this.showQueryResult);
    document.body.addEventListener("click", this.showQueryResult);
  }

  componentWillUnmount() {
    //移除document的click事件
    document.body.removeEventListener("click", this.showQueryResult);
  }

  /**
   * @method 判断点击的是否是查询弹出层
   * @param event
   */
  showQueryResult = (event) => {
    let target = event.target;
    let id = target.id;
    let isExampe = true;
    let isResult = target.className.indexOf("query-result-more") > -1;
    if (!isResult) {
      let target1 = target;
      while (target1 = target1.parentNode) {
        let className = target1.className || '';
        isResult = className.indexOf("query-result-more") > -1;
        if (isResult) break;
      }
    }
    if (!id) {
      let target2 = target;
      while (target2 = target2.parentNode) {
        let id = target2.id || '';
        isExampe = id.indexOf("example") > -1;
        if (isExampe) break;
      }
    }
    if (!isResult && isExampe) {
      if (this.state.isShow) {
        this.setState({
          isShow: false
        });
        this.props.showChange(false);
      }
    }
  };

  /**
   * @method 点击单个患者，将该患者信息传递给父组件
   * @param patientInfo
   */
  onClick = (patientInfo) => {
    try {
      this.props.onLoad(patientInfo);
      //this.props.showChange(false);
    } catch (err) {
      throw(err);
    }
  };


  render() {
    let {patientLists, isShow} = this.state;
    let style = {
      display: isShow ? "block" : "none"
    };
    return (
      <div className="query-result-more" style={style}>
        <p className="prompt">提示：双击加载患者信息</p>
        <ul className="result-list">
          {
            patientLists.map((v, i) => {
              return (
                <li key={i} onDoubleClick={() => this.onClick(v)}>
                  {i + 1}、 {v.name}—{v.birthday}—{v.sex}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}