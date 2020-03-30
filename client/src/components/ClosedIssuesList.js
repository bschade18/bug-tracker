import React, { Component } from "react";
import axios from "axios";
import ClosedIssue from "./ClosedIssue";

export default class ClosedIssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { issues: [], sortColumn: false };
  }

  componentDidMount() {
    axios
      .get("/issue/closed/all")
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
    return this.state.issues.map(currentissue => {
      return <ClosedIssue issue={currentissue} key={currentissue._id} />;
    });
  }

  sortNumber = () => {
    let sort;
    if (this.state.sortColumn) {
      sort = this.state.issues.sort((a, b) => {
        return b.number - a.number;
      });
    } else {
      sort = this.state.issues.sort((a, b) => {
        return a.number - b.number;
      });
    }
    this.setState({
      issues: sort,
      sortColumn: !this.state.sortColumn
    });
  };

  sortWord = e => {
    let name = e.target.getAttribute("name");
    let sort;

    if (this.state.sortColumn) {
      sort = this.state.issues.sort(function(a, b) {
        if (a[name].toLowerCase() < b[name].toLowerCase()) {
          return -1;
        }
        if (a[name].toLowerCase() > b[name].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      sort = this.state.issues.sort(function(a, b) {
        if (b[name].toLowerCase() < a[name].toLowerCase()) {
          return -1;
        }
        if (b[name].toLowerCase() > a[name].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({
      issues: sort,
      sortColumn: !this.state.sortColumn
    });
  };

  sortDate = () => {
    this.sortNumber();
  };

  render() {
    if (!this.state.issues.length) {
      return <div />;
    }
    return (
      <div className="container">
        <h5>Closed Issues</h5>
        <table className="table mt-4">
          <thead className="thead-light">
            <tr>
              <th>
                Issue #
                <i onClick={this.sortNumber} className="fa fa-fw fa-sort"></i>
              </th>
              <th>
                Title
                <i
                  name="issueTitle"
                  onClick={this.sortWord}
                  className="fa fa-fw fa-sort"
                ></i>
              </th>
              <th>
                Assigned To
                <i
                  name="assignedTo"
                  onClick={this.sortWord}
                  className="fa fa-fw fa-sort"
                ></i>
              </th>
              <th>
                Date Initiated
                <i onClick={this.sortDate} className="fa fa-fw fa-sort"></i>
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
