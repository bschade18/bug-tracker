import React, { Fragment } from "react";
import { NavLink } from "reactstrap";

function Logout(props) {
  return (
    <Fragment>
      <NavLink onClick={props.logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
}

export default Logout;
