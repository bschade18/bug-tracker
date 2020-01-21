import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const Issue = props => (
  <tr>
    <td>{props.issue.number}</td>
    <td>{props.issue.issueTitle}</td>
    <td>{props.issue.assignedTo}</td>
    <td>{props.issue.date.substring(0, 10)}</td>
    <td className="folder-container">
      <Link className="folder" to={"/review/" + props.issue._id}>
        <i className="icon-folder-open-alt"></i>
      </Link>
    </td>
  </tr>
);

export default class IssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { issues: [], number: "", id: "" };

    this.onChangeNumber = this.onChangeNumber.bind(this);
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

  issuesList() {
    return this.state.issues.map(currentissue => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

  onChangeNumber(e) {
    let searchedNumber = this.state.issues.filter(issue => {
      return issue.number === Number(e.target.value);
    });

    if (searchedNumber[0] !== undefined) {
      this.setState({
        number: e.target.value,
        id: searchedNumber[0]._id
      });
    }
  }

  render() {
    return (
      <div>
        <h3>Logged Issues</h3>
        <div className="form-group">
          <Link to="/create" id="submit-issue-link">
            Submit New Issue
          </Link>
        </div>
        <div className="form-group">
          <Link to="/adduser" id="add-user-link">
            Add User
          </Link>
        </div>
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
          <tbody>{this.issuesList()}</tbody>
        </table>

        <div className="form-group">
          <label>Search Issue # </label>
          <input onChange={this.onChangeNumber} type="text" id="issue-search" />
        </div>
        <div className="form-group">
          <Link to={"/review/" + this.state.id}>
            <button value="Search Issue" className="btn btn-primary">
              Search Issue
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
