import React, { Component } from 'react';
import IssuesState from './context/issues/IssueState';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AddIssue from './components/pages/AddIssue';
import Main from './components/pages/Main';
import Navbar from './components/Navbar';
import ViewIssue from './components/pages/ViewIssue';
import AllIssuesList from './components/pages/AllIssuesList';
import AdvancedSearch from './components/pages/AdvancedSearch';
import Home from './components/pages/Home';

import axios from 'axios';
import Issue from './components/Issue';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      token: localStorage.getItem('token'),
      alert: null,
      issues: [],
      closedIssues: [],
    };
  }

  componentDidMount() {
    this.loadUser();
    this.getIssues();
    this.getClosedIssues();
  }

  getIssues = () => {
    axios
      .get('/issue')
      .then((response) => {
        this.setState({
          issues: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getClosedIssues = () => {
    axios
      .get('/issue/closed/recent')
      .then((response) => {
        this.setState({
          closedIssues: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type },
    });

    setTimeout(() => this.setState({ alert: null }), 4000);
  };

  render() {
    const { isAuthenticated, user } = this.state;
    return (
      <IssuesState>
        <Router>
          {isAuthenticated && (
            <Navbar
              authSuccess={this.authSuccess}
              isAuthenticated={isAuthenticated}
              logout={this.logout}
              user={user}
            />
          )}
          <Switch>
            <Route
              path="/"
              exact
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/main" />
                ) : (
                  <Home
                    {...props}
                    authSuccess={this.authSuccess}
                    isAuthenticated={isAuthenticated}
                    logout={this.logout}
                    user={user}
                  />
                )
              }
            />

            <Route
              path="/main"
              exact
              render={(props) => (
                <Main
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  showAlert={this.setAlert}
                  alert={this.state.alert}
                  allIssues={this.state.issues}
                  allClosedIssues={this.state.closedIssues}
                />
              )}
            />
            <Route
              path="/create"
              exact
              render={(props) => <AddIssue {...props} user={user} />}
            />
            <Route path="/review/:id" exact component={ViewIssue} />
            <Route
              path="/all"
              exact
              render={(props) => (
                <AllIssuesList
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              )}
            />
            <Route
              path="/advanced"
              exact
              render={(props) => (
                <AdvancedSearch
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              )}
            />
          </Switch>
        </Router>
      </IssuesState>
    );
  }
}

export default App;
