/**
 * Created by liulingli on 2017/5/20.
 */
import React, {Component} from "react";
import classNames from "classnames";
import Paper from "material-oak/Paper";

export class CardContainer extends Component {
  render() {
    const {children, className} = this.props;
    return (
      <div className={classNames("card-container", className)}>
        <Paper zDepth={1} className="paper">
          {children}
        </Paper>
      </div>
    )
  }
}