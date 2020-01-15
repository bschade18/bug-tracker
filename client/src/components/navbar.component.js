import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
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
        </div>
      </nav>
    );
  }
}
