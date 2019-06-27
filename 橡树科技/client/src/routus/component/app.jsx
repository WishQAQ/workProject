import React from "react";
import MuiThemeProvider from "material-oak/styles/MuiThemeProvider";
import {LoginPage} from "./login_page/login";
import {User} from "core";
import "../less/index.less";

//import '@blueprintjs/core/dist/blueprint.css'
//import '@blueprintjs/datetime/dist/blueprint-datetime.css'
// #import 'ag-grid/dist/styles/ag-grid.css'
// #import 'ag-grid/dist/styles/theme-blue.css'
// #import 'ag-grid/dist/styles/theme-fresh.css'

export class App extends React.Component {
  state = {
    id: User.id(),
    client: false
  };
  render() {
    return (
      <MuiThemeProvider>
        {User.isLogin() ? this.props.children : <LoginPage/>}
      </MuiThemeProvider>
    )
  }
}