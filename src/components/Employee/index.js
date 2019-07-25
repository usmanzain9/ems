import React from "react";
import Modal from "react-responsive-modal";
import ModalWindow from "./dataModal";
import DeleteModal from "./deleteModal";
import EditModal from "./editModal";
import { getData, deleteData, empData } from "./employee";

class Employee extends React.Component {
  state = {
    add: false,
    edit: false,
    delete: false,
    data: [],
    filtered: [],
    deleteDocName: "",
    editDocName: {}
  };
  onModalOpen = modalName => {
    this.setState({ [modalName]: true });
  };
  onModalClose = modalName => {
    this.setState({ [modalName]: false });
  };
  handleData = () => {
    getData().then(() => {
      this.setState({ data: empData });
    });
  };
  handleSearchText = e => {
    const searchTerm = e.target.value.toLowerCase();
    const data = this.state.data;
    const filteredData = [];
    if (searchTerm !== "") {
      filteredData.push(
        data.filter(val => {
          if (val.fName.toLowerCase().includes(searchTerm)) {
            return val;
          }
        })
      );
    }
    if (filteredData.length > 0) {
      this.setState({ filtered: filteredData[0] });
    } else {
      this.setState({ filtered: [] });
    }
  };
  handleDelete = () => {
    deleteData(this.state.deleteDocName).then(() => {
      this.onModalClose("delete");
    });
  };
  componentDidMount = () => {
    this.handleData();
  };
  componentDidUpdate = () => {
    this.handleData();
  };
  render() {
    const filter = this.state.filtered.length === 0;
    return (
      <div className="ui container">
        <h2 style={{ marginTop: "20px" }}>Employee Information</h2>
        <table className="ui compact striped table">
          <thead>
            <tr className="full-width">
              <th colspan="2">
                <div className="ui fluid icon input">
                  <input
                    onChange={this.handleSearchText}
                    type="text"
                    placeholder="Search..."
                  />
                  <i className="search icon blue" />
                </div>
              </th>
              <th colspan="6">
                <div
                  onClick={() => {
                    this.onModalOpen("add");
                  }}
                  className="ui right floated primary small labeled icon button"
                >
                  <i className="user icon" /> Add User
                </div>
              </th>
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone No.</th>
              <th>Address</th>
              <th>CNIC</th>
              <th>Wage</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {filter &&
              this.state.data.map((data, i) => (
                <tr key={i}>
                  <td>{data.fName}</td>
                  <td>{data.lName}</td>
                  <td>{data.phone}</td>
                  <td>{data.address}</td>
                  <td>{data.cnic}</td>
                  <td>{data.wage}</td>
                  <td
                    onClick={() => {
                      this.onModalOpen("edit");
                      this.setState({ editDocName: data });
                    }}
                    className="collapsing center aligned"
                  >
                    <i className="pencil icon editIcon" />
                  </td>
                  <td
                    onClick={() => {
                      this.onModalOpen("delete");
                      this.setState({ deleteDocName: data.cnic });
                    }}
                    className="collapsing center aligned"
                  >
                    <i className="trash alternate outline icon deleteIcon" />
                  </td>
                </tr>
              ))}
            {!filter &&
              this.state.filtered.map((data, i) => (
                <tr key={i}>
                  <td>{data.fName}</td>
                  <td>{data.lName}</td>
                  <td>{data.phone}</td>
                  <td>{data.address}</td>
                  <td>{data.cnic}</td>
                  <td>{data.wage}</td>
                  <td
                    onClick={() => {
                      this.onModalOpen("edit");
                      this.setState({ editDocName: data });
                    }}
                    className="collapsing center aligned"
                  >
                    <i className="pencil icon editIcon" />
                  </td>
                  <td
                    onClick={() => {
                      this.onModalOpen("delete");
                      this.setState({ deleteDocName: data.cnic });
                    }}
                    className="collapsing center aligned"
                  >
                    <i className="trash alternate outline icon deleteIcon" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <Modal
            open={this.state.add}
            onClose={() => {
              this.onModalClose("add");
            }}
            center
          >
            <ModalWindow
              close={() => {
                this.onModalClose("add");
              }}
            />
          </Modal>
        </div>
        <div>
          <Modal
            open={this.state.delete}
            onClose={() => {
              this.onModalClose("delete");
            }}
            center
          >
            <DeleteModal
              delete={this.handleDelete}
              cancel={() => {
                this.onModalClose("delete");
              }}
            />
          </Modal>
        </div>
        <div>
          <Modal
            open={this.state.edit}
            onClose={() => this.onModalClose("edit")}
          >
            <EditModal
              editData={this.state.editDocName}
              close={() => this.onModalClose("edit")}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Employee;
