import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Issue from './Issue';
import Spinner from './layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IssueTable from './IssueTable';
import Pagination from './Pagination';
import { renderPageNumbers } from '../utils/setPages';

const AllIssuesList = ({ user }) => {
  const [issues, setIssues] = useState([]);
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

  const IssuesList = () =>
    issues.map((issue) => <Issue issue={issue} key={issue._id} />);

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

  return (
    <div className="container mt-3">
      {loading ? (
        <Spinner />
      ) : !issues[0] ? (
        <h3>You have not submitted any issues yet</h3>
      ) : (
        <Fragment>
          <h5 className="lg-heading">All Issues</h5>
          <IssueTable list={issues} displayIssuesFunc={IssuesList} />
          <Pagination
            pagination={pagination}
            selectPage={selectPage}
            pageNumbers={renderPageNumbers(totalPages, page, selectPage)}
          />
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
