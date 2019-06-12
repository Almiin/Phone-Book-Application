import React, { Component } from "react";
import { MDBInput } from "mdbreact";

class EntityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      business: "",
      description: "",
      jib: "",
      city: "",
      type_of_legal_entity: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    var data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      business: this.state.business,
      description: this.state.description,
      jib: this.state.jib,
      city: this.state.city,
      type_of_legal_entity: this.state.type_of_legal_entity
    };
    console.log(data);
    fetch("/addEntity", {
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
      .then(function(msg) {
        if (msg === "empty") {
          alert("Enter required fields.");
        } else {
          alert("Legal Entity has been added.");
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
        id="entityModal"
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
              <p className="heading lead">Add Legal Entity</p>

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
                      type="email"
                      className="form-control"
                      value={this.state.email}
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
                      aria-describedby="emailHelp"
                      label="Phone"
                      name="phone"
                      onChange={this.onChange}
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
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.business}
                      label="Business"
                      name="business"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.description}
                      label="Description"
                      name="description"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.jib}
                      label="JIB"
                      name="jib"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.city}
                      label="City"
                      name="city"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <MDBInput
                      type="text"
                      className="form-control"
                      value={this.state.type_of_legal_entity}
                      label="Type"
                      name="type_of_legal_entity"
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

export default EntityModal;
