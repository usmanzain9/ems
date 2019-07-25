import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const forgetPassword = () => (
  <div style={{ marginTop: "20px" }} className="ui container">
    <h1>Enter your email.</h1>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: "",
  error: null
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <div>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="six wide field">
            <label>Email</label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </div>
          <button
            className="ui button primary"
            disabled={isInvalid}
            type="submit"
          >
            Reset My Password
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export default forgetPassword;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
