import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import LogIn from "../LogIn";
import Attendance from "../Attendance";
import Salary from "../Salary";
import Employee from "../Employee";
import PasswordForgetPage from "../PasswordForget";
import app from "firebase/app";
import "firebase/auth";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";

class Administrator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount = () => {
    this.listener = app.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  };
  componentWillUnmount = () => {
    this.listener();
  };

  render() {
    return (
      <Router>
        <div>
          <div className="sidebar">
            <Navigation authUser={this.state.authUser} />
          </div>
          <div className="content">
            <div className="ui menu navMenu">
              <div className="right menu">
                <div className="ui item">
                  <SignOutButton />
                </div>
              </div>
            </div>
            <div className="contentBody">
              <Route
                exact
                path={ROUTES.LANDING}
                render={() =>
                  this.state.authUser ? (
                    <Redirect to={ROUTES.ATTENDANCE} />
                  ) : (
                    <LogIn />
                  )
                }
              />
              <Route
                exact
                path={ROUTES.ATTENDANCE}
                render={() =>
                  !this.state.authUser ? (
                    <Redirect to={ROUTES.LANDING} />
                  ) : (
                    <Attendance />
                  )
                }
              />
              <Route path={ROUTES.SALARY} component={Salary} />
              <Route path={ROUTES.EMPINFO} component={Employee} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default Administrator;
