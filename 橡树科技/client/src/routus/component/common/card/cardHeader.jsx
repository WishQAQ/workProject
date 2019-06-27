/**
 * Created by liulingli on 2017/5/22.
 */
import React, {Component} from "react";

export class CardHeader extends Component {
  componentWillMount() {
    this.state = {
      title: this.props.title,
      children: this.props.children
    }
  }

  componentWillReceiveProps(nextProps) {
    let {title, children} = this.state;
    if (nextProps.title != title) {
      title = nextProps.title;
    }
    if (nextProps.children != children) {
      children = nextProps.children;
    }
    this.setState({
      title: title,
      children: children
    })
  }

  render() {
    const {title, children, ...other} = this.state;
    return (
      <div className="card-header">
        <h2>{title}</h2>
        <div className="card-header-buttons">
          {children}
        </div>
      </div>
    )
  }
}