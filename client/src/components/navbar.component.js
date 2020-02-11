import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

export default class Navbar extends Component {
  render() {
    const { user } = this.props;
    const authLinks = (
      <Fragment>
        <span className="navbar-text mr-3">
          <strong>{user ? `${user.name}` : ""}</strong>
        </span>
        <Logout logout={this.props.logout} />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <LoginModal
          authSuccess={user => this.props.authSuccess(user)}
          isAuthenticated={this.props.isAuthenticated}
        />
        <RegisterModal
          authSuccess={user => this.props.authSuccess(user)}
          isAuthenticated={this.props.isAuthenticated}
        />
      </Fragment>
    );

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          {!this.props.isAuthenticated ? (
            <Fragment>
              <Fragment>
                <ul className="navbar-nav mr-auto">
                  <Link to="/" className="navbar-brand">
                    Issue Tracker
                  </Link>
                </ul>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    {this.props.isAuthenticated ? authLinks : guestLinks}
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
                  {this.props.isAuthenticated ? authLinks : guestLinks}
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    );
  }
}
