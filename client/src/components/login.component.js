import React, { Component, Fragment } from "react";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";

export default class Login extends Component {
  render() {
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
      <div className="collpase navbar-collapse">
        <h1>Test Login Page</h1>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav ml-auto">{guestLinks}</ul>
        </div>
      </div>
    );
  }
}
