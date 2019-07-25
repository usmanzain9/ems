import React from "react";
import { updateData } from "./employee";
import { validate } from "../../services/validation";

class EditModal extends React.Component {
  state = {
    fName: "",
    lName: "",
    address: "",
    phone: "",
    cnic: "",
    wage: "",
    error: {}
  };
  componentDidMount = () => {
    const { fName, lName, address, cnic, wage, phone } = this.props.editData;
    this.setState({ fName, lName, address, phone, cnic, wage });
  };
  handleSubmit = e => {
    e.preventDefault();
    const result = validate(this.state);
    const { fName, lName, address, phone, cnic, wage } = this.state;
    if (result.error == null) {
      updateData(this.state.cnic, {
        fName,
        lName,
        address,
        phone,
        cnic,
        wage
      }).then(this.props.close);
    } else {
      this.setState({ error: result.error });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { fName, lName, address, phone, cnic, wage } = this.state;
    const errDetails = this.state.error.details;
    return (
      <div className="ui segment blue">
        <form className="ui form">
          <h4 className="ui dividing header">Employee Data</h4>
          <div className="field">
            <label>Name</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  value={fName}
                  name="fName"
                  onChange={this.onChange}
                  placeholder="First Name"
                />
              </div>
              <div className="field">
                <input
                  value={lName}
                  name="lName"
                  onChange={this.onChange}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Address</label>
            <div className="field">
              <div className="sixteen wide field">
                <input
                  value={address}
                  name="address"
                  onChange={this.onChange}
                  type="text"
                  placeholder="Street Address"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>CNIC</label>
                <input
                  value={cnic}
                  name="cnic"
                  onChange={this.onChange}
                  type="text"
                />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  value={phone}
                  name="phone"
                  onChange={this.onChange}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Wage</label>
            <div className="field">
              <div className="sixteen wide field">
                <input
                  value={wage}
                  name="wage"
                  onChange={this.onChange}
                  type="text"
                  placeholder="Rs. 5,000"
                />
              </div>
            </div>
          </div>
          <button
            onClick={this.handleSubmit}
            className="ui blue button"
            tabIndex="0"
          >
            Save
          </button>
        </form>
        {errDetails !== undefined && (
          <div className="ui error message">
            <div className="header">
              There were some errors with your submission
            </div>
            <ul className="list">
              {errDetails.map(err => {
                return <li>{err.message}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default EditModal;
