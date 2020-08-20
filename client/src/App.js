import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddIssue from './components/AddIssue';
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import ViewIssue from './components/ViewIssue';
import AllIssuesList from './components/AllIssuesList';
import AdvancedSearch from './components/AdvancedSearch';
import NotFound from './components/layout/NotFound';
import Landing from './components/Landing';
import { loadUser } from './actions/authActions';
import PrivateRoute from '../src/components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import store from './store';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/issue/new" component={AddIssue} />
          <PrivateRoute exact path="/issue/:id" component={ViewIssue} />
          <PrivateRoute exact path="/issues" component={AllIssuesList} />
          <PrivateRoute exact path="/search" component={AdvancedSearch} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
