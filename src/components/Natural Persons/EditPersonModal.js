import React, { Component } from "react";
import { MDBInput } from "mdbreact";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      phone: "",
      date: "",
      address: "",
      person_id: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.persons.name,
      surname: nextProps.persons.surname,
      email: nextProps.persons.email,
      phone: nextProps.persons.phone,
      date: nextProps.persons.date_of_birth,
      address: nextProps.persons.address,
      person_id: nextProps.persons.person_id
    });
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
      person: this.state.person_id
    };
    console.log(data);
    fetch("/updatePerson", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(msg) {
        if (msg === "empty") {
          alert("Enter required fields.");
        } else {
          alert("Natural Person has been updated.");
          window.location.reload();
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

  render() {
    return (
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          style={{ width: "70%" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Update Natural Person</p>

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
              <form
                onSubmit={this.handleSubmit}
                method="POST"
                autoComplete="off"
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      label="Name"
                      name="name"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.surname}
                      label="Surname"
                      name="surname"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="email"
                      className="form-control"
                      value={this.state.email}
                      aria-describedby="emailHelp"
                      label="Email"
                      name="email"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.phone}
                      label="Phone Number"
                      name="phone"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.date}
                      label="Date of Birth"
                      name="date"
                      onChange={this.onChange}
                      disabled
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      label="Address"
                      name="address"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditModal;
