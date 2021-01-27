import React, { Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';

interface LogoutProps {
  logout: () => void
}

function Logout({ logout } : LogoutProps) {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        <i className="fas fa-sign-out-alt"></i> Logout
      </NavLink>
    </Fragment>
  );
}


export default connect(null, { logout })(Logout);
