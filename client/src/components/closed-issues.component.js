import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const Issue = props => (
  <tr>
    <td>{props.issue.number}</td>
    <td id="title">{props.issue.issueTitle}</td>
    <td>{props.issue.assignedTo}</td>
    <td>{props.issue.createdAt.substring(0, 10)}</td>
    <td className="folder-container">
      <Link className="folder" to={"/review/" + props.issue._id}>
        <i className="icon-folder-open-alt"></i>
      </Link>
    </td>
  </tr>
);

export default class ClosedIssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { issues: [] };
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
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

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
              <th>Issue #</th>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Date Initiated</th>
              <th>Open Issue</th>
            </tr>
          </thead>
          <tbody>{this.closedIssuesList()}</tbody>
        </table>
      </div>
    );
  }
}
