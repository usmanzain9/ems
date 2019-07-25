import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SignOutButton extends React.Component {
  handleSignOut = () => {
    const { firebase, history } = this.props;
    firebase.doSignOut().then(() => {
      history.push(ROUTES.LANDING);
    });
  };
  render() {
    return (
      <button className="ui button" type="button" onClick={this.handleSignOut}>
        Sign out
      </button>
    );
  }
}

export default withRouter(withFirebase(SignOutButton));
