import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import PropTypes from 'prop-types';

function Home({ authSuccess, isAuthenticated }) {
  const guestLinks = (
    <Fragment>
      <LoginModal
        authSuccess={(user) => authSuccess(user)}
        isAuthenticated={isAuthenticated}
      />
      <RegisterModal
        authSuccess={(user) => authSuccess(user)}
        isAuthenticated={isAuthenticated}
      />
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <Link to="/" className="navbar-brand">
              Issue Tracker
            </Link>
          </ul>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav ml-auto">{guestLinks}</ul>
          </div>

          <footer>
            <div className="py-3">© 2020 Schade Media, Inc.</div>
          </footer>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="h3">Log in or Register to start tracking issues! </h1>
        <div>Guest Email: guest@gmail.com</div>
        <div>Guest Password: guest123</div>
      </div>
    </div>
  );
}

Home.propTypes = {
  authSuccess: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Home;
