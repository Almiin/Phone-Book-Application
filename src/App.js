import React, { Component } from "react";

import Navbar from "./components/Navbar/Navbar.js";
import Login from "./components/Login/Login.js";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/accounts" component={Navbar} />
        <Route path="/legalEntities" component={Navbar} />
        <Route path="/naturalPerson" component={Navbar} />
      </Router>
    );
  }
}

export default App;
