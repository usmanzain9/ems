import React from "react";
import Modal from "react-responsive-modal";
import { validateLoad } from "../../services/validation";
import { getData, setData, empData } from "./salary";

class Salary extends React.Component {
  state = {
    loanModal: false,
    data: [],
    loanDoc: "",
    loanVal: "",
    error: {}
  };
  openLoanModal = () => {
    this.setState({ loanModal: true });
  };
  closeLoanModal = () => {
    this.setState({ loanModal: false });
  };
  handleData = () => {
    getData().then(() => {
      this.setState({ data: empData });
    });
  };
  onLoanChange = e => {
    this.setState({ loanVal: e.target.value });
  };
  onModalSubmit = e => {
    e.preventDefault();
    const { loanDoc, loanVal } = this.state;
    const result = validateLoad(loanVal);

    if (result.error == null) {
      setData(loanDoc, loanVal)
        .then(this.handleData)
        .then(this.closeLoanModal);
    } else {
      this.setState({ error: result.error });
    }
  };
  componentDidMount = () => {
    this.handleData();
  };

  render() {
    const errDetails = this.state.error.details;
    const check = this.state.data != null;
    return (
      <div className="ui container">
        <h2 style={{ marginTop: "20px" }}>Employee Salary Information</h2>
        <table className="ui striped compact table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Loan Amount</th>
              <th>Wage</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {check &&
              this.state.data.map((data, i) => (
                <tr key={i}>
                  <td>{data.fName}</td>
                  <td>{data.loan}</td>
                  <td>{data.wage}</td>
                  <td
                    onClick={() => {
                      this.openLoanModal();
                      this.setState({ loanDoc: data.cnic, loanVal: data.loan });
                    }}
                    className="collapsing center aligned"
                  >
                    <i className="icon plus circle" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal open={this.state.loanModal} onClose={this.closeLoanModal}>
          <div className="ui segment">
            <form className="ui form">
              <div className="field">
                <label>Loan Amount</label>
                <div className="field">
                  <div className="sixteen wide field">
                    <input
                      value={this.state.data.loanVal}
                      name="address"
                      onChange={this.onLoanChange}
                      type="text"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={this.onModalSubmit}
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
        </Modal>
      </div>
    );
  }
}

export default Salary;
