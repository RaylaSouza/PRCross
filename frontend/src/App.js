import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Menu from "./components/Menu/Menu";
import Login from './contariners/Login/Login';
import Register from './contariners/Register/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Menu} />
        <Route path="/workout" exact component={Menu} />
        <Route path="/timer" exact component={Menu} />
        <Route path="/workout/days" exact component={Menu} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
