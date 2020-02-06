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
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
        <Logout logout={this.props.logout} />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <LoginModal authSuccess={this.props.authSuccess} />
        <RegisterModal authSuccess={this.props.authSuccess} />
      </Fragment>
    );

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <Link to="/" className="navbar-brand">
              IssueTracker
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
      </nav>
    );
  }
}
