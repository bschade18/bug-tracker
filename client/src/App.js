import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import AddIssue from './components/AddIssue';
import Main from './components/Main';
import Navbar from './components/Navbar';
import ViewIssue from './components/ViewIssue';
import AllIssuesList from './components/AllIssuesList';
import AdvancedSearch from './components/AdvancedSearch';
import Home from './components/Home';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      user: null,
      isLoading: false,
      token: localStorage.getItem('token'),
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  authSuccess = (user) => {
    this.setState({
      isAuthenticated: true,
      isLoading: false,
      user: user,
    });
  };

  loadUser = () => {
    this.setState({
      isLoading: true,
    });

    axios
      .get('/auth/user', this.tokenConfig())
      .then((res) => this.userLoaded(res.data))
      .catch((err) => console.log(err));
  };

  userLoaded = (user) => {
    this.setState({
      isAuthenticated: true,
      isLoading: false,
      user: user,
    });
  };

  tokenConfig = () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };

  authenticate = () => {
    this.setState({
      isAuthenticated: true,
    });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      isAuthenticated: false,
      user: null,
      token: null,
    });

    window.location = '/';
  };
  render() {
    return (
      <Router>
        {this.state.isAuthenticated && (
          <Navbar
            authSuccess={this.authSuccess}
            isAuthenticated={this.state.isAuthenticated}
            logout={this.logout}
            user={this.state.user}
          />
        )}

        <Route
          path="/"
          exact
          render={(props) =>
            this.state.isAuthenticated ? (
              <Redirect to="/main" />
            ) : (
              <Home
                {...props}
                authSuccess={this.authSuccess}
                isAuthenticated={this.state.isAuthenticated}
                logout={this.logout}
                user={this.state.user}
              />
            )
          }
        />
        <br />
        <Route
          path="/main"
          exact
          render={(props) => (
            <Main
              {...props}
              isAuthenticated={this.state.isAuthenticated}
              user={this.state.user}
            />
          )}
        ></Route>
        <Route
          path="/create"
          render={(props) => <AddIssue {...props} user={this.state.user} />}
        />
        <Route path="/review/:id" component={ViewIssue} />
        <Route
          path="/all"
          render={(props) => (
            <AllIssuesList
              {...props}
              isAuthenticated={this.state.isAuthenticated}
              user={this.state.user}
            />
          )}
        ></Route>
        <Route
          path="/advanced"
          render={(props) => (
            <AdvancedSearch
              {...props}
              isAuthenticated={this.state.isAuthenticated}
              user={this.state.user}
            />
          )}
        ></Route>
      </Router>
    );
  }
}

export default App;
