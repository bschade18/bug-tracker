import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddIssue from './components/pages/AddIssue';
import Main from './components/pages/Main';
import Navbar from './components/Navbar';
import ViewIssue from './components/pages/ViewIssue';
import AllIssuesList from './components/pages/AllIssuesList';
import AdvancedSearch from './components/pages/AdvancedSearch';
import NotFound from './components/layout/NotFound';
import Home from './components/pages/Home';
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
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/main" component={Main} />
          <PrivateRoute exact path="/create" component={AddIssue} />
          <PrivateRoute exact path="/review/:id" component={ViewIssue} />
          <PrivateRoute exact path="/all" component={AllIssuesList} />
          <PrivateRoute exact path="/advanced" component={AdvancedSearch} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
