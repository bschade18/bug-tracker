import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const Issue = props => {
  const createdDate = props.issue.createdAt;
  const day = createdDate.substring(8, 10);
  const month = createdDate.substring(6, 7);
  const year = createdDate.substring(0, 4);
  const date = month + "/" + day + "/" + year;
  return (
    <tr>
      <td>{props.issue.number}</td>
      <td id="title">{props.issue.issueTitle}</td>
      <td>{props.issue.assignedTo}</td>
      <td>{date}</td>
      <td className="folder-container">
        <Link className="folder" to={"/review/" + props.issue._id}>
          <i className="icon-folder-open-alt"></i>
        </Link>
      </td>
    </tr>
  );
};

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
    console.log("hello");
    const closedIssues = this.state.issues.filter(
      currentissue => currentissue.status === "Closed"
    );

    return closedIssues.map(currentissue => {
      return <Issue issue={currentissue} key={currentissue._id} />;
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
        <table className="table">
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
