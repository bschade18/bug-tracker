import React, { Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Logout({ logout }) {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        <i className="fas fa-sign-out-alt"></i> Logout
      </NavLink>
    </Fragment>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
