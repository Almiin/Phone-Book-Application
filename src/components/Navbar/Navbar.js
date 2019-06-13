import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Accounts from "../Accounts/Accounts";
import NaturalPerson from "../Natural Persons/NaturalPerson";
import LegalEntities from "../Legal Entities/LegalEntities";

class Navbar extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
              <div className="container-fluid">
                <a className="navbar-brand waves-effect" href="/home">
                  <strong className="blue-text">Phone Book App</strong>
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
              </div>

              <button
                onClick={() => {
                  localStorage.clear();
                  setTimeout(
                    function() {
                      this.props.history.push("/");
                    }.bind(this),
                    1000
                  );
                }}
                className="btn btn-info btn-sm"
              >
                Logout
              </button>
            </nav>

            <div className="sidebar-fixed position-fixed">
              <a className="logo-wrapper waves-effect">
                <img
                  src="https://mdbootstrap.com/img/logo/mdb-email.png"
                  className="img-fluid"
                  alt=""
                />
              </a>

              <div className="list-group list-group-flush">
                <NavLink
                  to="/accounts"
                  className="list-group-item list-group-item-action waves-effect"
                >
                  <i className="fas fa-user mr-3" />
                  Accounts
                </NavLink>
                <NavLink
                  to="/naturalPerson"
                  className="list-group-item list-group-item-action waves-effect"
                >
                  <i className="fas fa-user mr-3" />
                  Natural Persons
                </NavLink>
                <NavLink
                  to="/legalEntities"
                  className="list-group-item list-group-item-action waves-effect"
                >
                  <i className="fas fa-table mr-3" />
                  Legal Entities
                </NavLink>
              </div>
            </div>
          </header>

          <script type="text/javascript">
            // Animations initialization new WOW().init();
          </script>
        </div>
        <Route path="/accounts" exact component={Accounts} />
        <Route path="/naturalPerson" component={NaturalPerson} />
        <Route path="/legalEntities" component={LegalEntities} />
      </Router>
    );
  }
}

export default Navbar;
