import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateIssue from "./components/add-issue.component";
import IssuesList from "./components/issues-list.component";
import Navbar from "./components/navbar.component";
import ReviewIssue from "./components/issue.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={IssuesList} />
        <Route path="/create" component={CreateIssue} />
        <Route path="/review/:id" component={ReviewIssue} />
        <Route path="/adduser" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
