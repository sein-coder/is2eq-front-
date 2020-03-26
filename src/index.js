import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "layouts/SignIn.js";
import SignUp from "layouts/SignUp.js";
import Home from "layouts/Home.js";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/home" component={Home}/>
      <Redirect from="/" to="/signin" />
    </Switch>
  </Router>,
  document.getElementById("root")
);