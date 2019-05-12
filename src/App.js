import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      name: "",
      surname: "",
      email: "",
      phone: "",
      date: "",
      address: "",
      password: "",
      msg: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/userAccounts")
      .then(res => res.json())
      .then(accounts => this.setState({ accounts }))
      .catch(error => console.log("parsing error", error));
  }

  handleSubmit = event => {
    event.preventDefault();
    var data = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      phone: this.state.phone,
      date: this.state.date,
      address: this.state.address,
      password: this.state.password
    };
    console.log(data);
    fetch("/addAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if (data == "success") {
          this.setState({ msg: "Added" });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  deleteAccount(account) {
    var data = {
      id: account.id
    };
    fetch("/deleteAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        if (data === "success") {
          this.setState({ msg: "User has been deleted." });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
            <div className="container-fluid">
              <a
                className="navbar-brand waves-effect"
                href="https://mdbootstrap.com/docs/jquery/"
                target="_blank"
              >
                <strong className="blue-text">MDB</strong>
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

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav nav-flex-icons">
                  <li className="nav-item">
                    <a
                      href="https://github.com/mdbootstrap/bootstrap-material-design"
                      className="nav-link border border-light rounded waves-effect"
                      target="_blank"
                    >
                      <i className="fab fa-github mr-2" />
                      MDB GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
              <a href="#" className="list-group-item active waves-effect">
                <i className="fas fa-user mr-3" />
                Accounts
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fas fa-user mr-3" />
                Natural Person
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fas fa-table mr-3" />
                Legal Entities
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fas fa-map mr-3" />
                Search Logs
              </a>
            </div>
          </div>
        </header>

        <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
            <div className="card mb-4 wow fadeIn">
              <div className="card-body d-sm-flex justify-content-between">
                <h4 className="mb-2 mb-sm-0 pt-1">
                  <a
                    href="https://mdbootstrap.com/docs/jquery/"
                    target="_blank"
                  >
                    Admin Panel
                  </a>
                  <span>/</span>
                  <span>Accounts</span>
                </h4>

                <form className="d-flex justify-content-center">
                  <input
                    type="search"
                    placeholder="Type your query"
                    aria-label="Search"
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-0 p"
                    type="submit"
                  >
                    <i className="fas fa-search" />
                  </button>
                </form>
              </div>
            </div>

            <div className="row wow fadeIn">
              <div className="col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-striped table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Surname</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Date of birth</th>
                          <th scope="col">Address</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.accounts.map(function(account, key) {
                          return (
                            <tr key={key}>
                              <td>{account.name}</td>
                              <td>{account.surname}</td>
                              <td>{account.email}</td>
                              <td>{account.phone}</td>
                              <td>{account.date_of_birth}</td>
                              <td>{account.address}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => {
                                    this.props.deleteAccount(account);
                                  }}
                                  className="btn btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card">
                <section>
                  <div
                    className="modal fade"
                    id="centralModalLGInfoDemo"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-lg modal-notify modal-info"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <p className="heading lead">Modal Info</p>

                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true" className="white-text">
                              &times;
                            </span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form onSubmit={this.handleSubmit} method="POST">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                placeholder="Name"
                                name="name"
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={this.state.surname}
                                placeholder="Enter surname"
                                name="surname"
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                name="email"
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={this.state.phone}
                                placeholder="Enter phone"
                                name="phone"
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="date"
                                className="form-control"
                                value={this.state.date}
                                placeholder="Enter date of birth"
                                name="date"
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={this.state.address}
                                placeholder="Enter address"
                                name="address"
                                onChange={this.onChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                placeholder="Password"
                                name="password"
                                onChange={this.onChange}
                              />
                            </div>

                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="col-md-4">
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-success btn-lg"
                      data-toggle="modal"
                      data-target="#centralModalLGInfoDemo"
                    >
                      Add acounts
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <script type="text/javascript">
          // Animations initialization new WOW().init();
        </script>
      </div>
    );
  }
}

export default App;
