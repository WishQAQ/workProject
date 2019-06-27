/**
 * Created by jahv on 2016/12/6.
 */
import React from "react";
import ReactDom from "react-dom";
import {browserHistory, Router,Route} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Home,LoginPage} from "./routus";
import regionData from "./routus/route/regionData";
import "core/component/fetch";
injectTapEventPlugin();


ReactDom.render((
   <Router history={browserHistory} >
   <Route path='/' component={LoginPage}/>
   <Route  component={Home}>
   {
   regionData.map(data=>{
   return <Route path={data.path} component={data.component} key={data.path}/>
   })
   }
   </Route>
   </Router>
), document.getElementById('example'));