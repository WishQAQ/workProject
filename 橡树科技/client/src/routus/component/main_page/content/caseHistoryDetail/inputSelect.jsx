/**
 * Created by liulingli on 2017/6/19.
 * desc : 病历详情左侧时间轴input输入框弹出选框
 */
import React, {Component} from "react";
import ReactDom from "react-dom";
import {Input} from "antd";
const Search = Input.Search;

export class InputSelect extends Component {
  componentWillMount() {
    this.state = {
      children: this.props.children,
      value: this.props.value || ''
    };
  }

  componentDidMount() {
    this.popup = document.createElement("div");
    document.body.appendChild(this.popup);
    this._renderLayer();
    document.removeEventListener("click", this.removeLayer);
    document.addEventListener("click", this.removeLayer);
  }

  /*  componentWillReceiveProps(nextProps,nextState){
   if(nextProps.children != nextState.children){
   this.setState({
   children : nextProps.children,
   })
   }
   if(nextProps.value != this.state.value){
   this.setState({
   value : nextProps.value,
   })
   }
   }*/
  componentWillUpdate(nextProps) {
    if (nextProps.children !== this.state.children) {
      this.setState({
        children: nextProps.children,
      })
    }
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      })
    }
    this._renderLayer();
  }

  componentWillUnmount() {//在组件卸载的时候，保证弹层也被卸载掉
    ReactDom.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
    document.removeEventListener("click", this.removeLayer)
  }

  _renderLayer = () => {//将弹层渲染到body下的div标签
    ReactDom.render(this.state.children[0], this.popup);
  };
  /**
   * @method 判断点击的是否是弹出层，不是则移除
   * @param e
   */
  removeLayer = (e) => {
    let target = e.target;
    let className = target.className || "";
    let id = target.id;
    let isExampe = true;
    if (target.tagName === "svg") {
      className = "";
    }
    let isQuery = className.indexOf("query-content") > -1;
    let isInput = className.indexOf("input-query") > -1;
    if (!isQuery) {
      let target1 = target;
      while (target1 = target1.parentNode) {
        let className = target1.className || '';
        isQuery = className.indexOf("query-content") > -1;
        if (isQuery) break;
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
    if (!isQuery && !isInput && isExampe) {
      this.props.hide(); //隐藏
    }
  };

  /**
   * @method 改变查询条件
   * @param e
   */
  onChange = (e) => {
    let value = e.target.value;
    this.props.onSearchChange(value);
  };

  /**
   * @method 双击清空查询条件
   * @param e
   */
  onDoubleClick = (e) => {
    let value = e.target.value;
    e.target.value = "";
    this.props.onSearchChange("");
  };

  render() {
    let {onClick, onSearch} = this.props;
    return (
      <div className="input-select">
        <Search
          className="input-query"
          placeholder="患者姓名/患者id/医保号/健康卡号..."
          style={{width: '100%'}}
          onClick={event => onClick(event)}
          onSearch={value => onSearch(value)}
          onChange={this.onChange}
          onDoubleClick={this.onDoubleClick}
        />
        {this.state.children[1]}
      </div>
    )
  }
}