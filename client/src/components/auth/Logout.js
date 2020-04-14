import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';

function Logout({ logout }) {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
}

export default Logout;
