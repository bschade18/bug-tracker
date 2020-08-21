import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Issue from './Issue';
import Spinner from './layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AllIssuesList = ({ user }) => {
  const [issues, setIssues] = useState([]);
  const [sortColumn, setSortColumn] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/issues?team=${user.team}&limit=20`)
      .then((res) => {
        setIssues(res.data.data);
        setPagination(res.data.pagination);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user.team]);

  const IssuesList = () => {
    return issues.map((issue) => {
      return <Issue issue={issue} key={issue._id} />;
    });
  };

  const sortNumber = () => {
    let sort;
    sort = issues.sort((a, b) =>
      sortColumn ? b.number - a.number : a.number - b.number
    );

    setIssues(sort);
    setSortColumn(!sortColumn);
  };

  const sortWord = (e) => {
    let name = e.target.getAttribute('name');
    let sort;

    sort = issues.sort((a, b) => {
      const wordA = a[name].toLowerCase();
      const wordB = b[name].toLowerCase();
      if (sortColumn) return wordA < wordB ? -1 : wordA > wordB ? 1 : 0;
      else return wordB < wordA ? -1 : wordB > wordA ? 1 : 0;
    });

    setIssues(sort);
    setSortColumn(!sortColumn);
  };

  const sortDate = () => sortNumber();

  const selectPage = (page) => {
    if (page === 'next') {
      page = pagination.next.page;
    } else if (page === 'prev') {
      page = pagination.prev.page;
    }
    axios
      .get(`/issues?team=${user.team}&page=${page}&limit=20`)
      .then((res) => {
        setIssues(res.data.data);
        setPagination(res.data.pagination);
        setPage(page);
      })
      .catch((err) => console.log(err));
  };

  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <li key={i} className={page === i ? 'page-item active' : 'page-item'}>
        <a onClick={() => selectPage(i)} className="page-link" href="#!">
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="container mt-3">
      {loading ? (
        <Spinner />
      ) : !issues[0] ? (
        <h3>You have not submitted any issues yet</h3>
      ) : (
        <Fragment>
          <h5>All Issues</h5>
          <div className="table-responsive">
            <table className="table mt-4">
              <thead className="light-bg">
                <tr>
                  <th>
                    Issue #
                    <i onClick={sortNumber} className="fa fa-fw fa-sort"></i>
                  </th>
                  <th>
                    Status
                    <i
                      name="status"
                      onClick={sortWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Title
                    <i
                      name="issueTitle"
                      onClick={sortWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Assigned To
                    <i
                      name="assignedTo"
                      onClick={sortWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Date Initiated
                    <i onClick={sortDate} className="fa fa-fw fa-sort"></i>
                  </th>
                  <th>Open Issue</th>
                </tr>
              </thead>
              <tbody>{IssuesList()}</tbody>
            </table>
          </div>
          <nav>
            <ul className="pagination">
              <li
                className={pagination.prev ? 'page-item' : 'page-item disabled'}
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
              {pageNumbers}
              <li
                className={pagination.next ? 'page-item' : 'page-item disabled'}
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
      )}
    </div>
  );
};

AllIssuesList.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AllIssuesList);
