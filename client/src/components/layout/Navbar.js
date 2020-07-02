import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import PropTypes from 'prop-types';
import RegisterModal from '../auth/RegisterModal';

const Navbar = ({ auth: { user, isAuthenticated, loading } }) => {
  const guestLinks = (
    <Fragment>
      <div className="nav-item">
        <RegisterModal />
      </div>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <span className="navbar-text mr-3">
        <strong>{user ? `${user.name} (${user.team})` : ''}</strong>
      </span>
      <Logout />
    </Fragment>
  );

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top">
      <div className="container">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <Link to="/home" className="navbar-brand">
              <i className="fas fa-scroll"></i> Issue Tracker
            </Link>
          </ul>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {!loading && isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
