import React, { Component } from "react";
import AccountModal from "./AccountModal";
import EditModal from "./EditAccountModal";

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accounts_id: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/userAccounts", {
      headers: { jwt: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(accounts => this.setState({ accounts }))
      .catch(error => console.log("parsing error", error));
  }

  deleteAccount(account) {
    var data = {
      id: account
    };
    console.log(data);
    fetch("/deleteAccount", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(msg) {
        if (msg == "deleted") {
          alert("User has been deleted!");
          window.location.reload();
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  updateAccount(account) {
    this.setState({
      accounts_id: account
    });
    var data = {
      id: account
    };
    return data;
  }

  render() {
    return (
      <div className="App">
        <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
            <div className="card mb-4 wow fadeIn">
              <div className="card-body d-sm-flex justify-content-between">
                <h4 className="mb-2 mb-sm-0 pt-1">
                  <a style={{ color: "#007bff" }}>Admin Panel</a>
                  <span>/</span>
                  <span>Accounts</span>
                </h4>
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
                          <th scope="col">Type</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.accounts.map(account => {
                          return (
                            <tr key={account.accounts_id}>
                              <td>{account.name}</td>
                              <td>{account.surname}</td>
                              <td>{account.email}</td>
                              <td>{account.phone}</td>
                              <td>{account.date_of_birth}</td>
                              <td>{account.address}</td>
                              <td>{account.type}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-warning"
                                  data-toggle="modal"
                                  data-target="#editModal"
                                  onClick={() => this.updateAccount(account)}
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    this.deleteAccount(account.accounts_id)
                                  }
                                  className="btn btn-sm btn-danger"
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
                  <AccountModal />
                </section>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <section>
                  <EditModal accounts={this.state.accounts_id} />
                </section>
              </div>
            </div>
            <div className="text-left">
              <button
                type="button"
                className="btn btn-success btn-lg"
                data-toggle="modal"
                data-target="#centralModalLGInfoDemo"
              >
                Add
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Accounts;
