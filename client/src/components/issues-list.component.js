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

export default class IssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      closedIssues: [],
      number: "",
      id: "",
      projectTitle: "--All--",
      sort: false
    };

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

    axios
      .get("/issue/closed")
      .then(response => {
        this.setState({
          closedIssues: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  issuesList() {
    const openIssues = this.state.issues.filter(
      currentissue =>
        currentissue.status !== "Closed" &&
        currentissue.assignedTo === this.props.user.name
    );

    return openIssues.map(currentissue => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.filterList();
  };

  filterList() {
    const openIssues = this.state.issues.filter(
      currentissue =>
        currentissue.status !== "Closed" &&
        currentissue.assignedTo === this.props.user.name &&
        currentissue.projectTitle === this.state.projectTitle
    );

    return openIssues.map(currentissue => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

  completedIssuesList() {
    return this.state.closedIssues.map(currentissue => {
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

  sortStatus = () => {
    let sort;
    if (this.state.sort) {
      sort = this.state.issues.sort(function(a, b) {
        if (a.status.toUpperCase() < b.status.toUpperCase()) {
          return -1;
        }
        if (a.status.toUpperCase() > b.status.toUpperCase()) {
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
        if (b.status.toUpperCase() < a.status.toUpperCase()) {
          return -1;
        }
        if (b.status.toUpperCase() > a.status.toUpperCase()) {
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

  render() {
    const projects = this.state.issues.map(function(issue) {
      return issue.projectTitle;
    });

    const uniqueProjects = [...new Set(projects)];

    if (!this.state.issues.length) {
      return <div />;
    }
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <h5>My Open Issues</h5>
            <div className="form-group">
              <Link to="/create" id="submit-issue-link">
                Submit New Issue
              </Link>
            </div>
            <div className="form-group">
              <label>Project: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.projectTitle}
                name="projectTitle"
                onChange={this.onChange}
                id="project-title"
              >
                <option>--All--</option>
                {uniqueProjects.map(function(project) {
                  return (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  );
                })}
              </select>
            </div>
            {this.issuesList().length > 0 ? (
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>
                      Issue #{" "}
                      <i onClick={this.sortNumber} class="fa fa-fw fa-sort"></i>
                    </th>
                    <th>
                      Status{" "}
                      <i onClick={this.sortStatus} class="fa fa-fw fa-sort"></i>
                    </th>
                    <th>
                      Title{" "}
                      <i onClick={this.sortTitle} class="fa fa-fw fa-sort"></i>
                    </th>
                    <th>
                      Assigned To{" "}
                      <i
                        onClick={this.sortAssignedTo}
                        class="fa fa-fw fa-sort"
                      ></i>
                    </th>
                    <th>
                      Date Initiated{" "}
                      <i onClick={this.sortDate} class="fa fa-fw fa-sort"></i>
                    </th>
                    <th>Open Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.projectTitle === "--All--"
                    ? this.issuesList()
                    : this.filterList()}
                </tbody>
              </table>
            ) : (
              <p id="issues-message">You have no open issues</p>
            )}

            <h5 className="mt-5">Recently Closed Issues</h5>
            <table className="table mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Issue #</th>
                  <th>Status</th>
                  <th>Title</th>
                  <th>Assigned To</th>
                  <th>Date Initiated</th>
                  <th>Open Issue</th>
                </tr>
              </thead>
              <tbody>{this.completedIssuesList()}</tbody>
            </table>

            <div className="form-group">
              <Link to={"/closed"} id="see-more-link">
                see all...
              </Link>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Search Issue # </label>
                <input
                  type="text"
                  onChange={this.onChangeNumber}
                  id="issue-search"
                />
              </div>

              <div className="form-group">
                <Link to={"/review/" + this.state.id}>
                  <button
                    type="submit"
                    value="Search Issue"
                    className="btn btn-primary"
                  >
                    Search Issue
                  </button>
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}
