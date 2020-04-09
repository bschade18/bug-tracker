import React, { Component } from 'react';
import axios from 'axios';
import Issue from './Issue';

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedTo: '',
      initiatedBy: '',
      initiatedStartDt: '',
      initiatedEndDt: '',
      issues: [],
      wasSearched: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let string = '';

    if (this.state.initiatedBy) {
      string += `name=${this.state.initiatedBy}`;
    }

    if (this.state.assignedTo) {
      string += `&assignedTo=${this.state.assignedTo}`;
    }

    if (this.state.initiatedStartDt && !this.state.initiatedEndDt) {
      string += `&createdAt[gte]=${this.state.initiatedStartDt}`;
    }

    if (!this.state.initiatedStartDt && this.state.initiatedEndDt) {
      string += `&createdAt[lte]=${this.state.initiatedEndDt}`;
    }

    if (this.state.initiatedStartDt && this.state.initiatedEndDt) {
      string += `&createdAt[gte]=${this.state.initiatedStartDt}&createdAt[lte]=${this.state.initiatedEndDt}`;
    }

    axios
      .get(`/issue?${string}`)
      .then((response) => {
        this.setState({
          issues: response.data.data,
          wasSearched: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchResultsList() {
    const issues = this.state.issues;

    return issues.map((currentissue) => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  }

  render() {
    return (
      <div className="container">
        {this.props.isAuthenticated ? (
          <div>
            <h5>Advanced Search</h5>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  placeholder="Assigned To"
                  type="text"
                  name="assignedTo"
                  className="form-control mt-3"
                  onChange={this.onChange}
                  id="assigned-to-search"
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Initiated By"
                  type="text"
                  name="initiatedBy"
                  className="form-control mt-3"
                  onChange={this.onChange}
                  id="initiated-by-search"
                />
              </div>

              <input
                type="text"
                name="initiatedStartDt"
                onChange={this.onChange}
                id="init-start-dt"
                placeholder="Date Initiated - dd/mm/yyyy"
                className="mt-3 form-control"
              />

              <p id="to" className="ml-2 mt-3">
                to
              </p>

              <input
                type="text"
                name="initiatedEndDt"
                onChange={this.onChange}
                id="init-end-dt"
                placeholder="Date Initiated - dd/mm/yyyy"
                className="ml-2 mt-3 form-control"
              />

              <div className="form-group">
                <button
                  type="submit"
                  value="Search"
                  className="btn btn-primary mt-5"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p></p>
        )}
        {this.state.wasSearched ? (
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
