import React, { Component } from "react";
import axios from "axios";
import ClosedIssue from "./ClosedIssue";

export default class ClosedIssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { issues: [], sort: false };
  }

  componentDidMount() {
    axios
      .get("/issue/")
      .then(response => {
        this.setState({
          issues: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  closedIssuesList() {
    const closedIssues = this.state.issues.filter(
      currentissue => currentissue.status === "Closed"
    );

    return closedIssues.map(currentissue => {
      return <ClosedIssue issue={currentissue} key={currentissue._id} />;
    });
  }

  sortNumber = () => {
    let sort;
    if (this.state.sort) {
      sort = this.state.issues.sort(function(a, b) {
        return b.number - a.number;
      });

      this.setState({
        issues: sort,
        sort: !this.state.sort
      });
    } else {
      sort = this.state.issues.sort(function(a, b) {
        return a.number - b.number;
      });

      this.setState({
        issues: sort,
        sort: !this.state.sort
      });
    }
  };

  sortTitle = () => {
    let sort;
    if (this.state.sort) {
      sort = this.state.issues.sort(function(a, b) {
        if (a.issueTitle.toUpperCase() < b.issueTitle.toUpperCase()) {
          return -1;
        }
        if (a.issueTitle.toUpperCase() > b.issueTitle.toUpperCase()) {
          return 1;
        }

        return 0;
      });

      this.setState({
        issues: sort,
        sort: !this.state.sort
      });
    } else {
      sort = this.state.issues.sort(function(a, b) {
        if (b.issueTitle.toUpperCase() < a.issueTitle.toUpperCase()) {
          return -1;
        }
        if (b.issueTitle.toUpperCase() > a.issueTitle.toUpperCase()) {
          return 1;
        }

        return 0;
      });

      this.setState({
        issues: sort,
        sort: !this.state.sort
      });
    }
  };

  sortAssignedTo = () => {
    let sort;
    if (this.state.sort) {
      sort = this.state.issues.sort(function(a, b) {
        if (a.assignedTo.toUpperCase() < b.assignedTo.toUpperCase()) {
          return -1;
        }
        if (a.assignedTo.toUpperCase() > b.assignedTo.toUpperCase()) {
          return 1;
        }

        return 0;
      });

      this.setState({
        issues: sort,
        sort: !this.state.sort
      });
    } else {
      sort = this.state.issues.sort(function(a, b) {
        if (b.assignedTo.toUpperCase() < a.assignedTo.toUpperCase()) {
          return -1;
        }
        if (b.assignedTo.toUpperCase() > a.assignedTo.toUpperCase()) {
          return 1;
        }

        return 0;
      });

      this.setState({
        issues: sort,
        sort: !this.state.sort
      });
    }
  };

  sortDate = () => {
    this.sortNumber();
  };

  render() {
    if (!this.state.issues.length) {
      return <div />;
    }
    return (
      <div>
        <h5>Closed Issues</h5>
        <table className="table mt-4">
          <thead className="thead-light">
            <tr>
              <th>
                Issue #
                <i onClick={this.sortNumber} class="fa fa-fw fa-sort"></i>
              </th>
              <th>
                Title
                <i onClick={this.sortTitle} class="fa fa-fw fa-sort"></i>
              </th>
              <th>
                Assigned To
                <i onClick={this.sortAssignedTo} class="fa fa-fw fa-sort"></i>
              </th>
              <th>
                Date Initiated
                <i onClick={this.sortDate} class="fa fa-fw fa-sort"></i>
              </th>
              <th>Open Issue</th>
            </tr>
          </thead>
          <tbody>{this.closedIssuesList()}</tbody>
        </table>
      </div>
    );
  }
}
