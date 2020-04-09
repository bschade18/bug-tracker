import React, { Component } from 'react';
import axios from 'axios';
import Issue from './Issue';

export default class AllIssuesList extends Component {
  constructor(props) {
    super(props);

    this.state = { issues: [], sortColumn: false, page: 1, pagination: null };
  }

  componentDidMount() {
    let page = this.state.page;
    axios
      .get(`/issue?page=${page}`)
      .then((response) => {
        this.setState({
          issues: response.data.data,
          pagination: response.data.pagination,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  IssuesList() {
    return this.state.issues.map((issue) => {
      return <Issue issue={issue} key={issue._id} />;
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

  nextPage = () => {
    let page = this.state.pagination.next.page;
    console.log(page);
    axios
      .get(`/issue?page=${page}`)
      .then((response) => {
        this.setState({
          issues: response.data.data,
          pagination: response.data.pagination,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  prevPage = () => {
    let page = this.state.pagination.prev.page;
    axios
      .get(`/issue?page=${page}`)
      .then((response) => {
        this.setState({
          issues: response.data.data,
          pagination: response.data.pagination,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (!this.state.issues.length) {
      return <div />;
    }
    return (
      <div className="container">
        <h5>All Issues</h5>
        <table className="table mt-4">
          <thead className="thead-light">
            <tr>
              <th>
                Issue #
                <i onClick={this.sortNumber} className="fa fa-fw fa-sort"></i>
              </th>
              <th>
                Status
                <i
                  name="status"
                  onClick={this.sortWord}
                  className="fa fa-fw fa-sort"
                ></i>
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
          <tbody>{this.IssuesList()}</tbody>
        </table>
        <div className="pagination-btns">
          <div className="form-group">
            <button
              value="Next Page"
              type="button"
              className={
                this.state.pagination.prev
                  ? 'btn btn-primary'
                  : 'btn btn-primary disabled'
              }
              onClick={this.prevPage}
              disabled={this.state.pagination.prev ? false : true}
            >
              Prev Page
            </button>
          </div>

          <div className="form-group">
            <button
              value="Next Page"
              className={
                this.state.pagination.next
                  ? 'btn btn-primary'
                  : 'btn btn-primary disabled'
              }
              onClick={this.nextPage}
              disabled={this.state.pagination.next ? false : true}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
