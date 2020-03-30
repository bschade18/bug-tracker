import React, { Component } from "react";
import axios from "axios";
import Issue from "./Issue";

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedTo: "",
      initiatedBy: "",
      initiatedStartDt: "",
      initiatedEndDt: "",
      issues: [],
      wasSearched: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      assignedTo,
      initiatedBy,
      initiatedStartDt,
      initiatedEndDt
    } = this.state;

    const dtStart = encodeURIComponent(initiatedStartDt);
    const dtEnd = encodeURIComponent(initiatedEndDt);

    let searchStr = "/issue/search/";

    if (assignedTo && initiatedBy && dtStart && dtEnd) {
      searchStr += `initiatedBy/${initiatedBy}/assignedTo/${assignedTo}/dtStart/${dtStart}/dtEnd/${dtEnd}`;
    } else if (dtStart && dtEnd && assignedTo) {
      searchStr += `assignedTo/${assignedTo}/dtStart/${dtStart}/dtEnd/${dtEnd}`;
    } else if (dtStart && dtEnd && initiatedBy) {
      searchStr += `initiatedBy/${initiatedBy}/dtStart/${dtStart}/dtEnd/${dtEnd}`;
    } else if (dtStart && dtEnd) {
      searchStr += `dtStart/${dtStart}/dtEnd/${dtEnd}`;
    } else if (assignedTo && initiatedBy) {
      searchStr += `initiatedBy/${initiatedBy}/assignedTo/${assignedTo}`;
    } else if (assignedTo) {
      searchStr += `assignedTo/${assignedTo}`;
    } else {
      searchStr += `initiatedBy/${initiatedBy}`;
    }

    this.search(searchStr);
  };

  search = searchStr => {
    axios
      .get(searchStr)
      .then(response => {
        this.setState({
          issues: response.data,
          wasSearched: true
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
