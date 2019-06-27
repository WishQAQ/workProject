import React, {Component} from "react";

export class ComponentPopMenu extends Component {
  closeAll = () => {
    const NewPanes = this.props.NewPanes;
    NewPanes.splice(1, NewPanes.length);
  }
  closeOther = () => {
    const NewPanes = this.props.NewPanes;
    const spanKey = this.props.spanKey;
    NewPanes.map((i) => {
      if (spanKey === i.key) {
        NewPanes.splice(1, NewPanes.length, i);
      }
    })
  }

  render() {
    return (
      <div>
        <div className="popMenuItem" onClick={this.closeAll}>
          关闭所有标签
        </div>
        <div className="popMenuItem" onClick={this.closeOther}>
          关闭其他标签
        </div>
      </div>
    )
  }
}