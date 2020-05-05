import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

function Logout({ logout }) {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
