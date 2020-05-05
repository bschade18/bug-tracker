import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Issue from '../Issue';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdvancedSearch = ({ isAuthenticated }) => {
  const [searchData, setSearchData] = useState({
    assignedTo: '',
    initiatedBy: '',
    initiatedStartDt: '',
    initiatedEndDt: '',
  });
  const [issues, setIssues] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [searchString, setSearchString] = useState('');

  const {
    assignedTo,
    initiatedBy,
    initiatedStartDt,
    initiatedEndDt,
  } = searchData;

  useEffect(() => {
    axios
      .get(`/issue?page=${page}&limit=20`)
      .then((response) => {
        setIssues(response.data.data);
        setPagination(response.data.pagination);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    let string = '';

    if (initiatedBy) {
      string += `name=${initiatedBy}`;
    }

    if (assignedTo) {
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
        setTotalPages(Math.ceil(response.data.count / limit));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/issue?${string}&limit=${limit}&page=1`)
      .then((response) => {
        setIssues(response.data.data);
        setWasSearched(true);
        setPagination(response.data.pagination);
        setPage(1);
        setSearchString(string);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const searchResultsList = () => {
    return issues.map((currentissue) => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  };

  const selectPage = (page) => {
    let string = searchString;

    if (page === 'next') {
      page = pagination.next.page;
    } else if (page === 'prev') {
      page = pagination.prev.page;
    }
    axios
      .get(`/issue?${string}&page=${page}&limit=20`)
      .then((response) => {
        setIssues(response.data.data);
        setPagination(response.data.pagination);
        setPage(page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let rows = [];
  for (let i = 1; i <= totalPages; i++) {
    rows.push(
      <li key={i} className={page === i ? 'page-item active' : 'page-item'}>
        <a className="page-link" onClick={() => selectPage(i)} href="#!">
          {i}
        </a>
      </li>
    );
  }
  return (
    <div className="container mt-3">
      {isAuthenticated ? (
        <div>
          <h5>Advanced Search</h5>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                placeholder="Assigned To"
                type="text"
                name="assignedTo"
                className="form-control mt-3"
                onChange={onChange}
                id="assigned-to-search"
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Initiated By"
                type="text"
                name="initiatedBy"
                className="form-control mt-3"
                onChange={onChange}
                id="initiated-by-search"
              />
            </div>

            <input
              type="text"
              name="initiatedStartDt"
              onChange={onChange}
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
              onChange={onChange}
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

      {wasSearched ? (
        !issues[0] ? (
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
              <tbody>{searchResultsList()}</tbody>
            </table>

            <nav>
              <ul className="pagination">
                <li
                  className={
                    pagination.prev ? 'page-item' : 'page-item disabled'
                  }
                >
                  <a
                    className="page-link"
                    onClick={() => selectPage('prev')}
                    href="#!"
                  >
                    <span>&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>

                {rows}

                <li
                  className={
                    page !== totalPages ? 'page-item' : 'page-item disabled'
                  }
                >
                  <a
                    className="page-link"
                    onClick={() => selectPage('next')}
                    href="#!"
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
};

AdvancedSearch.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AdvancedSearch);
