import React from "react";
import { NavLink } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const Navigation = ({ authUser }) => {
  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => (
  <div className="ui fluid secondary vertical menu">
    <div className="item sidebarHeader">
      <h3>Zain Lightings</h3>
    </div>
    <div className="ui fluid secondary vertical pointing menu">
      <NavLink
        activeClassName="active blue"
        className="item"
        to={ROUTES.ATTENDANCE}
      >
        <h4>Attendance</h4>
      </NavLink>
      <NavLink
        activeClassName="active blue"
        className="item"
        to={ROUTES.EMPINFO}
      >
        <h4>Employee Data</h4>
      </NavLink>
      <NavLink
        activeClassName="active blue"
        className="item"
        to={ROUTES.SALARY}
      >
        <h4>Salary</h4>
      </NavLink>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className="ui menu borderless">
    <div className="header item">Zain Lightings</div>
  </div>
);

export default Navigation;
