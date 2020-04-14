import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Issue from '../Issue';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedTo: '',
      initiatedBy: '',
      initiatedStartDt: '',
      initiatedEndDt: '',
      issues: [],
      wasSearched: false,
      page: 1,
      pagination: null,
      totalPages: null,
      searchString: '',
    };
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    let page = this.state.page;
    axios
      .get(`/issue?page=${page}&limit=20`)
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      initiatedBy,
      assignedTo,
      initiatedStartDt,
      initiatedEndDt,
    } = this.state;

    let string = '';

    if (initiatedBy) {
      string += `name=${initiatedBy}`;
    }

    if (this.state.assignedTo) {
      string += `&assignedTo=${assignedTo}`;
    }

    if (initiatedStartDt && !initiatedEndDt) {
      string += `&createdAt[gte]=${initiatedStartDt}`;
    }

    if (!initiatedStartDt && initiatedEndDt) {
      string += `&createdAt[lte]=${initiatedEndDt}`;
    }

    if (initiatedStartDt && initiatedEndDt) {
      string += `&createdAt[gte]=${initiatedStartDt}&createdAt[lte]=${initiatedEndDt}`;
    }

    const limit = 20;
    axios
      .get(`/issue?${string}`)
      .then((response) => {
        this.setState({
          totalPages: Math.ceil(response.data.count / limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/issue?${string}&limit=${limit}&page=1`)
      .then((response) => {
        this.setState({
          issues: response.data.data,
          wasSearched: true,
          pagination: response.data.pagination,
          page: 1,
          searchString: string,
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

  selectPage = (page) => {
    const {
      searchString,
      pagination: { next, prev },
    } = this.state;
    let string = searchString;

    if (page === 'next') {
      page = next.page;
    } else if (page === 'prev') {
      page = prev.page;
    }
    axios
      .get(`/issue?${string}&page=${page}&limit=20`)
      .then((response) => {
        this.setState({
          issues: response.data.data,
          pagination: response.data.pagination,
          page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let rows = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      rows.push(
        <li
          key={i}
          className={this.state.page === i ? 'page-item active' : 'page-item'}
        >
          <a className="page-link" onClick={() => this.selectPage(i)} href="#">
            {i}
          </a>
        </li>
      );
    }
    return (
      <div className="container mt-3">
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
          !this.state.issues[0] ? (
            <Spinner />
          ) : (
            <Fragment>
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

              <nav>
                <ul className="pagination">
                  <li
                    className={
                      this.state.pagination.prev
                        ? 'page-item'
                        : 'page-item disabled'
                    }
                  >
                    <a
                      className="page-link"
                      onClick={() => this.selectPage('prev')}
                      href="#"
                    >
                      <span>&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>

                  {rows}

                  <li
                    className={
                      this.state.page !== this.state.totalPages
                        ? 'page-item'
                        : 'page-item disabled'
                    }
                  >
                    <a
                      className="page-link"
                      onClick={() => this.selectPage('next')}
                      href="#"
                    >
                      <span>&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </Fragment>
          )
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default AdvancedSearch;
