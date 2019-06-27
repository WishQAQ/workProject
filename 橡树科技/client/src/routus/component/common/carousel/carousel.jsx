/**
 * Created by liulingli on 2017/6/14.
 * desc 轮播组件
 */
import React, {Component} from "react";
import classNames from "classnames";
import {CarouselContent} from "./carouselContent";

export class Carousel extends Component {
  componentWillMount() {
    this.state = {
      totalNum: this.props.totalNum,
      curIndex: this.props.curIndex || 0,
      time: this.props.time || 6000 //间隔6秒轮播
    }
  }

  componentDidMount() {
    this.createSetInterval();
  }

  /**
   * 添加定时器实现自动轮播
   */
  createSetInterval = () => {
    let disTimes = this.state.time;
    this.timer = setInterval(() => {
      let totalNum = this.state.totalNum;
      let curIndex = this.state.curIndex;
      curIndex++;
      if (curIndex > totalNum - 1) {
        curIndex = 0;
      }
      this.setState({
        curIndex: curIndex
      })
    }, disTimes);
  }
  /**
   * 清除自动轮播定时器
   */
  clearSetInterval = () => {
    this.timer && clearInterval(this.timer)
  }

  componentWillUnmount() {
    this.clearSetInterval();
  }

  /**
   * 创建导航圆点
   */
  creatNav = (num, curIndex) => {
    let html = [];
    for (let i = 0; i < num; i++) {
      html.push(<li key={i} className={curIndex == i ? 'active' : ''} onClick={this.goCurrent.bind(this, i)}></li>);
    }
    return html;
  }

  /**
   * 切换到某一页
   */
  goCurrent = (curIndex) => {
    this.clearSetInterval();
    this.setState({
      curIndex: curIndex
    })
    this.createSetInterval();
  }
  /**
   * 左右切换
   */
  change = (type) => {
    this.clearSetInterval();
    let totalNum = this.state.totalNum;
    let oldIndex = this.state.curIndex;
    let curIndex = oldIndex + type;
    if (curIndex > (totalNum - 1)) {
      curIndex = 0;
    }
    if (curIndex < 0) {
      curIndex = (totalNum - 1);
    }
    this.setState({
      curIndex: curIndex
    });
    this.createSetInterval();
  }
  /**
   * 鼠标移入轮播图，则清除定时器
   */
  onMouseEnter = () =>{
    this.clearSetInterval();
  }
  /**
   * 鼠标移除轮播图，则创建定时器
   */
  onMouseLeave = () =>{
    this.createSetInterval();
  }

  render() {
    let {totalNum, curIndex} = this.state;
    let {className, children} = this.props;
    let totalW = totalNum * 100 + "%";
    let width = 100 / totalNum + "%";
    let left = -100 * curIndex + "%";
    return (
      <div className={classNames("carousel", className)}>
        <i className="prev iconfont icon-zuoyou1" onClick={this.change.bind(this, -1)}/>
        <i className="next iconfont icon-zuoyou" onClick={this.change.bind(this, 1)}/>
        <ul className="carousel-nav">
          {
            this.creatNav(totalNum, curIndex)
          }
        </ul>
        <div
          className="carousel-content"
          style={{width: totalW, left: left}}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {children.map((i, v) => {
            return <CarouselContent key={v} style={{width: width}}>{i}</CarouselContent>;
          })}
        </div>
      </div>
    )
  }
}