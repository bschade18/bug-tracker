import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logout from './auth/Logout';

function Navbar({ user, logout }) {
  const authLinks = (
    <Fragment>
      <span className="navbar-text mr-3">
        <strong>{user ? `${user.name}` : ''}</strong>
      </span>
      <Logout logout={logout} />
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <Link to="/main" className="navbar-brand">
                Issue Tracker
              </Link>
              <li className="navbar-item">
                <Link to="/main" className="nav-link">
                  Issues
                </Link>
              </li>
            </ul>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav ml-auto">{authLinks}</ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
