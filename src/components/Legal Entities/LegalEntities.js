import React, { Component } from "react";
import EntityModal from "./EntityModal";
import EditEntityModal from "./EditEntityModal";

class LegalEntities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      entity_id: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/entities")
      .then(res => res.json())
      .then(entities => this.setState({ entities }))
      .catch(error => console.log("parsing error", error));
  }

  deleteEntity(entity) {
    var data = {
      id: entity
    };
    console.log(data);
    fetch("/deleteEntity", {
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
          alert("Legal Entity has been deleted!");
          window.location.reload();
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  updateEntity(entity) {
    this.setState({
      entity_id: entity
    });
    var data = {
      id: entity
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
                  <span>Legal Entities</span>
                </h4>
              </div>
            </div>

            <div className="row wow fadeIn">
              <div className="col-md-13 mb-4">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-striped table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Address</th>
                          <th scope="col">Business</th>
                          <th scope="col">Description</th>
                          <th scope="col">JIB</th>
                          <th scope="col">City</th>
                          <th scope="col">Type</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.entities.map(entity => {
                          return (
                            <tr key={entity.entity_id}>
                              <td>{entity.name}</td>
                              <td>{entity.email}</td>
                              <td>{entity.phone}</td>
                              <td>{entity.address}</td>
                              <td>{entity.business}</td>
                              <td>{entity.description}</td>
                              <td>{entity.jib}</td>
                              <td>{entity.city}</td>
                              <td>{entity.type_of_legal_entity}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-warning"
                                  data-toggle="modal"
                                  data-target="#editModal"
                                  onClick={() => this.updateEntity(entity)}
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    this.deleteEntity(entity.entity_id)
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
                  <EntityModal />
                </section>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <section>
                  <EditEntityModal entities={this.state.entity_id} />
                </section>
              </div>
            </div>
            <div className="text-left">
              <button
                type="button"
                className="btn btn-success btn-lg"
                data-toggle="modal"
                data-target="#entityModal"
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

export default LegalEntities;
