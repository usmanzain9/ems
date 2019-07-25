import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget";

const LogIn = () => {
  return (
    <div className="ui container loginForm">
      <div className="ui two column centered grid">
        <div className="column">
          <h1 className="ui center aligned header">Sign In</h1>
          <SignInPage />
        </div>
      </div>
    </div>
  );
};

class SignInBase extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const Joi = require("@hapi/joi");
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 })
    });
    const result = Joi.validate({ email }, schema);
    console.log(result);

    this.props.firebase
      .doSignIn(email, password)
      .then(() => {
        this.setState({ email, password });
        this.props.history.push(ROUTES.ATTENDANCE);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <div className="ui raised blue segment">
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
              placeholder="example@example.com"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={this.onChange}
              name="password"
            />
          </div>
          <PasswordForgetLink />
          <button disabled={isInvalid} className="ui button" type="submit">
            Submit
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}
const SignInPage = withRouter(withFirebase(SignInBase));

export default LogIn;
export { SignInPage };
