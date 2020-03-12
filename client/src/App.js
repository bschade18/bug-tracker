import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateIssue from "./components/add-issue.component";
import IssuesList from "./components/issues-list.component";
import Navbar from "./components/navbar.component";
import ReviewIssue from "./components/issue.component";
import ClosedIssuesList from "./components/closed-issues.component";
import AdvancedSearch from "./components/advanced-search.component";

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
    this.setState({
      isAuthenticated: true,
      isLoading: false,
      user: user
    });
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

    window.location = "/";
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
                user={this.state.user}
              />
            )}
          ></Route>
          <Route
            path="/create"
            render={props => <CreateIssue {...props} user={this.state.user} />}
          />
          <Route path="/review/:id" component={ReviewIssue} />
          <Route
            path="/closed"
            render={props => (
              <ClosedIssuesList
                {...props}
                isAuthenticated={this.state.isAuthenticated}
                user={this.state.user}
              />
            )}
          ></Route>
          <Route
            path="/advanced"
            render={props => (
              <AdvancedSearch
                {...props}
                isAuthenticated={this.state.isAuthenticated}
                user={this.state.user}
              />
            )}
          ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
