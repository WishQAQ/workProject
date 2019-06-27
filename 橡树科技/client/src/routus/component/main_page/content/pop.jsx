import React, {Component} from "react";
import {ComponentPopMenu} from "./popMenu";

export class ComponentPop extends Component {
  render() {
    const {menuStyles, NewPanes, spanKey} = this.props;
    return (
      <div style={{top: menuStyles.top, left: menuStyles.left}}
           className={`popMenu ${menuStyles.active ? "" : "active_1" }`}
      >
        <ComponentPopMenu
          NewPanes={NewPanes}
          spanKey={spanKey}
        >
        </ComponentPopMenu>
      </div>
    )
  }
}