import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateIssue from "./components/add-issue.component";
import IssuesList from "./components/issues-list.component";
import Navbar from "./components/navbar.component";
import ReviewIssue from "./components/issue.component";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      user: null,
      isLoading: false,
      token: localStorage.getItem("token")
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  authSuccess = user => {
    setTimeout(
      () =>
        this.setState({
          isAuthenticated: true,
          isLoading: false,
          user: user
        }),
      300
    );
  };

  loadUser = () => {
    this.setState({
      isLoading: true
    });

    axios
      .get("/auth/user", this.tokenConfig())
      .then(res => this.userLoaded(res.data));
  };

  userLoaded = user => {
    this.setState({
      isAuthenticated: true,
      isLoading: false,
      user: user
    });
  };

  tokenConfig = () => {
    // get token from local storage
    const token = localStorage.getItem("token");

    // headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    // if token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  };

  authenticate = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  };
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar
            authSuccess={this.authSuccess}
            isAuthenticated={this.state.isAuthenticated}
            logout={this.logout}
            user={this.state.user}
          />
          <br />
          <Route
            path="/"
            exact
            render={props => (
              <IssuesList
                {...props}
                isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
          <Route path="/create" component={CreateIssue} />
          <Route path="/review/:id" component={ReviewIssue} />
        </div>
      </Router>
    );
  }
}

export default App;
