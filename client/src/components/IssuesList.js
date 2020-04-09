import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Issue from './Issue';

export default class IssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      closedIssues: [],
      number: '',
      id: '',
      projectTitle: '--All--',
      sortColumn: false,
    };

    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  componentDidMount() {
    axios
      .get('/issue')
      .then((response) => {
        this.setState({
          issues: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('/issue/closed/recent')
      .then((response) => {
        this.setState({
          closedIssues: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.filterList();
  };

  filterList() {
    return this.state.issues
      .filter(
        (currentissue) =>
          currentissue.status !== 'Closed' &&
          currentissue.assignedTo === this.props.user.name &&
          currentissue.projectTitle === this.state.projectTitle
      )
      .map((currentissue) => {
        return <Issue issue={currentissue} key={currentissue._id} />;
      });
  }

  issuesList() {
    return this.state.issues
      .filter(
        (currentissue) =>
          currentissue.status !== 'Closed' &&
          currentissue.assignedTo === this.props.user.name
      )
      .map((currentissue) => {
        return <Issue issue={currentissue} key={currentissue._id} />;
      });
  }

  completedIssuesList() {
    return this.state.closedIssues.map((currentissue) => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

  onChangeNumber(e) {
    let searchedNumber = this.state.issues.filter((issue) => {
      return issue.number === Number(e.target.value);
    });

    if (searchedNumber[0] !== undefined) {
      this.setState({
        number: e.target.value,
        id: searchedNumber[0]._id,
      });
    }
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
      sortColumn: !this.state.sortColumn,
    });
  };

  sortWord = (e) => {
    let name = e.target.getAttribute('name');
    let sort;

    if (this.state.sortColumn) {
      sort = this.state.issues.sort(function (a, b) {
        if (a[name].toLowerCase() < b[name].toLowerCase()) {
          return -1;
        }
        if (a[name].toLowerCase() > b[name].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      sort = this.state.issues.sort(function (a, b) {
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
      sortColumn: !this.state.sortColumn,
    });
  };

  sortDate = () => {
    this.sortNumber();
  };

  // sorts on closed issues

  sortClosedNumber = () => {
    let sort;
    if (this.state.sortColumn) {
      sort = this.state.closedIssues.sort(function (a, b) {
        return b.number - a.number;
      });
    } else {
      sort = this.state.closedIssues.sort(function (a, b) {
        return a.number - b.number;
      });
    }

    this.setState({
      closedIssues: sort,
      sortColumn: !this.state.sortColumn,
    });
  };

  sortClosedWord = (e) => {
    let sort;
    let name = e.target.getAttribute('name');
    if (this.state.sortColumn) {
      sort = this.state.closedIssues.sort(function (a, b) {
        if (a[name].toLowerCase() < b[name].toLowerCase()) {
          return -1;
        }
        if (a[name].toLowerCase() > b[name].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    } else {
      sort = this.state.closedIssues.sort(function (a, b) {
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
      closedIssues: sort,
      sortColumn: !this.state.sortColumn,
    });
  };

  sortClosedDate = () => {
    this.sortClosedNumber();
  };

  render() {
    const projects = this.state.issues.map(function (issue) {
      return issue.projectTitle;
    });

    const uniqueProjects = [...new Set(projects)];

    const sortProjects = uniqueProjects.sort((a, b) => {
      const projA = a.toLowerCase();
      const projB = b.toLowerCase();
      if (projA < projB) return -1;
      if (projA > projB) return 1;
      return 0;
    });

    // if (!this.state.issues.length) {
    //   return <div />;
    // }
    return (
      <div className="container">
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
                {sortProjects.map(function (project) {
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
                      Issue #{' '}
                      <i
                        onClick={this.sortNumber}
                        className="fa fa-fw fa-sort"
                      ></i>
                    </th>
                    <th>
                      Status{' '}
                      <i
                        name="status"
                        onClick={this.sortWord}
                        className="fa fa-fw fa-sort"
                      ></i>
                    </th>
                    <th>
                      Title{' '}
                      <i
                        name="issueTitle"
                        onClick={this.sortWord}
                        className="fa fa-fw fa-sort"
                      ></i>
                    </th>
                    <th>
                      Assigned To{' '}
                      <i
                        name="assignedTo"
                        onClick={this.sortWord}
                        className="fa fa-fw fa-sort"
                      ></i>
                    </th>
                    <th>
                      Date Initiated{' '}
                      <i
                        onClick={this.sortDate}
                        className="fa fa-fw fa-sort"
                      ></i>
                    </th>
                    <th>Open Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.projectTitle === '--All--'
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
                  <th>
                    Issue #{' '}
                    <i
                      onClick={this.sortClosedNumber}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Status{' '}
                    <i
                      name="status"
                      onClick={this.sortClosedWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Title{' '}
                    <i
                      name="issueTitle"
                      onClick={this.sortClosedWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Assigned To{' '}
                    <i
                      name="assignedTo"
                      onClick={this.sortClosedWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Date Initiated{' '}
                    <i
                      onClick={this.sortClosedDate}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>Open Issue</th>
                </tr>
              </thead>
              <tbody>{this.completedIssuesList()}</tbody>
            </table>

            <div className="form-group">
              <Link to={'/all'} id="see-more-link">
                See All
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
                <Link to={'/review/' + this.state.id}>
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
            <div className="form-group">
              <Link to={'/advanced'} id="advanced-search-link">
                Advanced Search
              </Link>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}
