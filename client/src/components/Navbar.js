import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

function Navbar({ user, logout, authSuccess, isAuthenticated }) {
  const authLinks = (
    <Fragment>
      <span className="navbar-text mr-3">
        <strong>{user ? `${user.name}` : ""}</strong>
      </span>
      <Logout logout={logout} />
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <LoginModal
        authSuccess={user => authSuccess(user)}
        isAuthenticated={isAuthenticated}
      />
      <RegisterModal
        authSuccess={user => authSuccess(user)}
        isAuthenticated={isAuthenticated}
      />
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          {!isAuthenticated ? (
            <Fragment>
              <Fragment>
                <ul className="navbar-nav mr-auto">
                  <Link to="/" className="navbar-brand">
                    Issue Tracker
                  </Link>
                </ul>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    {isAuthenticated ? authLinks : guestLinks}
                  </ul>
                </div>
              </Fragment>
              <footer>
                <div className="py-3">© 2020 Schade Media, Inc.</div>
              </footer>
            </Fragment>
          ) : (
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <Link to="/" className="navbar-brand">
                  Issue Tracker
                </Link>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Issues
                  </Link>
                </li>
              </ul>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  {isAuthenticated ? authLinks : guestLinks}
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
