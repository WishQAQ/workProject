/**
 * Created by liulingli on 2017/6/14.
 * desc 轮播组件内容
 */
import React, {Component} from "react";
import classNames from "classnames";

export class CarouselContent extends Component {
  componentWillMount() {
    this.state = {
      className: this.props.className,
      children: this.props.children
    }
  }

  componentWillReceiveProp(nextProps) {
    if (this.state.className != nextProps.className) {
      this.setState({
        className: nextProps.className
      })
    }
    if (this.state.children != nextProps.children) {
      this.setState({
        className: nextProps.children
      })
    }
  }

  render() {
    let {className, style} = this.props;
    return (
      <div className={classNames("carousel-div", className)} style={style}>
        {this.props.children}
      </div>)
  }
}