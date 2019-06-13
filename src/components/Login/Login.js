import React, { Component } from "react";
import Background from "../../assets/img/slika.png";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    if (this.state.email == "" || this.state.password == "") {
      alert("All fields are required");
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      })
      .then(token => {
        localStorage.setItem("token", token.token);
        var tokenStorage = localStorage.getItem("token");

        if (tokenStorage != "undefined" || tokenStorage == "") {
          setTimeout(
            function() {
              this.props.history.push("/accounts");
            }.bind(this),
            1000
          );
        }
      })
      .then(msg => {
        if (msg === "notExists") {
          alert("Email is not correct or user does not exists");
        } else if (msg === "incorrectPass") {
          alert("Password is not correct");
        } else if (msg === "empty") {
          alert("All fields are required");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  onChange = (e, res) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div
                    className="col-lg-6 d-none d-lg-block bg-login-image"
                    style={{
                      backgroundImage: `url(${Background})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover"
                    }}
                  />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form
                        className="user"
                        onSubmit={this.handleSubmit}
                        method="GET"
                        autoComplete="off"
                      >
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            value={this.state.email}
                            onChange={this.onChange}
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            value={this.state.password}
                            onChange={this.onChange}
                            name="password"
                            placeholder="Password"
                          />
                        </div>

                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                          //onClick={this.props.history.push("/navbar")}
                        >
                          Login
                        </button>
                      </form>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
