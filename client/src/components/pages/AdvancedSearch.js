import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Issue from '../Issue';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

const AdvancedSearch = ({ user }) => {
  const [searchData, setSearchData] = useState({
    assignedTo: '',
    initiatedBy: '',
    initiatedStartDt: '',
    initiatedEndDt: '',
    status: '',
  });
  const [issues, setIssues] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    assignedTo,
    initiatedBy,
    initiatedStartDt,
    initiatedEndDt,
    status,
  } = searchData;

  useEffect(() => {
    axios
      .get(`/issue?team=${user.team}&page=${page}&limit=20`)
      .then((response) => {
        setIssues(response.data.data);
        setPagination(response.data.pagination);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [user.team]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let string = '';

    if (initiatedBy) {
      string += `name=${initiatedBy}`;
    }

    if (assignedTo) {
      string += `&assignedTo=${assignedTo}`;
    }

    if (status) {
      string += `&status=${status}`;
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
      .get(`/issue?team=${user.team}&${string}`)
      .then((response) => {
        setTotalPages(Math.ceil(response.data.count / limit));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/issue?team=${user.team}&${string}&limit=${limit}&page=1`)
      .then((response) => {
        setIssues(response.data.data);
        setWasSearched(true);
        setPagination(response.data.pagination);
        setPage(1);
        setSearchString(string);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const onChangeDateInitStart = (date) => {
    setSearchData({ ...searchData, initiatedStartDt: date });
  };

  const onChangeDateInitEnd = (date) => {
    setSearchData({ ...searchData, initiatedEndDt: date });
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
      .get(`/issue?team=${user.team}&${string}&page=${page}&limit=20`)
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
              className="form-control mt-4"
              onChange={onChange}
              id="initiated-by-search"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Status"
              type="text"
              name="status"
              className="form-control mt-4"
              onChange={onChange}
              id="status"
            />
          </div>
          <div className="form-group">
            <DatePicker
              name="initiatedStartDt"
              selected={initiatedStartDt}
              onChange={onChangeDateInitStart}
              id="init-start-dt"
              className="mt-1 form-control"
              placeholderText="Date Initiated - Start"
            />
          </div>
          <div className="form-group">
            <DatePicker
              name="initiatedEndDt"
              selected={initiatedEndDt}
              onChange={onChangeDateInitEnd}
              id="init-end-dt"
              className="mt-1 form-control"
              placeholderText="Date Initiated - End"
            />
          </div>
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

      {wasSearched &&
        (loading ? (
          <Spinner />
        ) : !issues[0] ? (
          <h3>No issues were found in search</h3>
        ) : (
          <Fragment>
            <div className="table-responsive">
              <table className="table mt-5">
                <thead className="light-bg">
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
            </div>
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
        ))}
    </div>
  );
};

AdvancedSearch.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AdvancedSearch);
