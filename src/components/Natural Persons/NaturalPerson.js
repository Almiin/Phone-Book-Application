import React, { Component } from "react";
import PersonModal from "./PersonModal";
import EditPersonModal from "./EditPersonModal";

class NaturalPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      person_id: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/persons")
      .then(res => res.json())
      .then(persons => this.setState({ persons }))
      .catch(error => console.log("parsing error", error));
  }

  deletePerson(person) {
    var data = {
      id: person
    };
    console.log(data);
    fetch("/deletePerson", {
      method: "DELETE",
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
        if (msg == "deleted") {
          alert("Natural Person has been deleted!");
          window.location.reload();
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  updatePerson(person) {
    this.setState({
      person_id: person
    });
    var data = {
      id: person
    };
    console.log(data);
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
                  <span>Natural Persons</span>
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
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.persons.map(person => {
                          return (
                            <tr key={person.person_id}>
                              <td>{person.name}</td>
                              <td>{person.surname}</td>
                              <td>{person.email}</td>
                              <td>{person.phone}</td>
                              <td>{person.date_of_birth}</td>
                              <td>{person.address}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-warning"
                                  data-toggle="modal"
                                  data-target="#editModal"
                                  onClick={() => this.updatePerson(person)}
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    this.deletePerson(person.person_id)
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
                  <PersonModal />
                </section>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <section>
                  <EditPersonModal persons={this.state.person_id} />
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

        <script type="text/javascript">
          // Animations initialization new WOW().init();
        </script>
      </div>
    );
  }
}

export default NaturalPerson;
