import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Issue = props => {
  const createdDate = props.issue.createdAt;
  const day = createdDate.substring(8, 10);
  const month = createdDate.substring(6, 7);
  const year = createdDate.substring(0, 4);
  const date = month + "/" + day + "/" + year;
  return (
    <tr>
      <td>{props.issue.number}</td>
      <td>{props.issue.status}</td>
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

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedTo: "",
      initatedBy: "",
      issues: [],
      wasSearch: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitAssignedTo = e => {
    e.preventDefault();

    const assignedTo = this.state.assignedTo;

    axios
      .get("/issue/search/" + assignedTo)
      .then(response => {
        this.setState({
          issues: response.data,
          wasSearch: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onSubmitInitiatedBy = e => {
    e.preventDefault();

    const initiatedBy = this.state.initiatedBy;

    axios
      .get("/issue/search/" + initiatedBy)
      .then(response => {
        this.setState({
          issues: response.data,
          wasSearch: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  searchResultsList() {
    const issues = this.state.issues;

    return issues.map(currentissue => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <h5>Advanced Search</h5>

            <form onSubmit={this.onSubmitAssignedTo}>
              <div className="form-group">
                <label>Search Assigned To: </label>
                <input
                  type="text"
                  name="assignedTo"
                  onChange={this.onChange}
                  id="assigned-to-search"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                >
                  Search
                </button>
              </div>
            </form>
            <form onSubmit={this.onSubmitInitiatedBy}>
              <div className="form-group">
                <label>Search Initiated By: </label>
                <input
                  type="text"
                  name="initiatedBy"
                  onChange={this.onChange}
                  id="initiated-by-search"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p></p>
        )}
        {this.state.wasSearch ? (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Issue # </th>
                <th>Status </th>
                <th>Title </th>
                <th>Assigned To </th>
                <th>Date Initiated </th>
                <th>Open Issue</th>
              </tr>
            </thead>
            <tbody>{this.searchResultsList()}</tbody>
          </table>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
