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
      initiatedBy: "",
      initiatedStartDt: "",
      initiatedEndDt: "",
      issues: [],
      wasSearch: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitDt = e => {
    e.preventDefault();

    const dtStart = encodeURIComponent(this.state.initiatedStartDt);
    const dtEnd = encodeURIComponent(this.state.initiatedEndDt);

    console.log(dtStart);
    console.log(dtEnd);

    axios
      .get("/issue/search/dtStart/" + dtStart + "/dtEnd/" + dtEnd)
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

  onSubmit = e => {
    e.preventDefault();

    const assignedTo = this.state.assignedTo;
    const initiatedBy = this.state.initiatedBy;
    const dtStart = encodeURIComponent(this.state.initiatedStartDt);
    const dtEnd = encodeURIComponent(this.state.initiatedEndDt);

    if (assignedTo && initiatedBy && dtStart && dtEnd) {
      axios
        .get(
          "/issue/search/initiatedBy/" +
            initiatedBy +
            "/assignedTo/" +
            assignedTo +
            "/dtStart/" +
            dtStart +
            "/dtEnd/" +
            dtEnd
        )
        .then(response => {
          this.setState({
            issues: response.data,
            wasSearch: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (dtStart && dtEnd) {
      axios
        .get("/issue/search/dtStart/" + dtStart + "/dtEnd/" + dtEnd)
        .then(response => {
          this.setState({
            issues: response.data,
            wasSearch: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (assignedTo && initiatedBy) {
      axios
        .get(
          "/issue/search/initiatedBy/" +
            initiatedBy +
            "/assignedTo/" +
            assignedTo
        )
        .then(response => {
          this.setState({
            issues: response.data,
            wasSearch: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (assignedTo) {
      axios
        .get("/issue/search/assignedTo/" + assignedTo)
        .then(response => {
          this.setState({
            issues: response.data,
            wasSearch: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .get("/issue/search/initiatedBy/" + initiatedBy)
        .then(response => {
          this.setState({
            issues: response.data,
            wasSearch: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
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

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Assigned To: </label>
                <input
                  type="text"
                  name="assignedTo"
                  onChange={this.onChange}
                  id="assigned-to-search"
                />
              </div>

              <div className="form-group">
                <label>Initiated By: </label>
                <input
                  type="text"
                  name="initiatedBy"
                  onChange={this.onChange}
                  id="initiated-by-search"
                />
              </div>

              <label>Date Range Initiated: </label>
              <input
                type="text"
                name="initiatedStartDt"
                onChange={this.onChange}
                id="init-start-dt"
                placeholder="dd/mm/yyyy"
                className="ml-2"
              />

              <p id="to" className="ml-2">
                to
              </p>

              <input
                type="text"
                name="initiatedEndDt"
                onChange={this.onChange}
                id="init-end-dt"
                placeholder="dd/mm/yyyy"
                className="ml-2"
              />

              <div className="form-group">
                <button
                  type="submit"
                  value="Search"
                  className="btn btn-primary mt-3"
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
          <table className="table mt-5">
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
