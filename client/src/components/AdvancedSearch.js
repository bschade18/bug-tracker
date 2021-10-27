import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import Issue from './Issue';
import SearchResults from './SearchResults';
import { renderPageNumbers } from '../utils/setPages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdvancedSearch = ({ user, limit = 20 }) => {
  const [searchData, setSearchData] = useState({
    assignedTo: '',
    initiatedBy: '',
    initiatedStartDt: null,
    initiatedEndDt: null,
    issueStatus: '',
  });
  const [issues, setIssues] = useState([]);
  const [queried, setQueried] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [totalPages, setTotalPages] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const {
    assignedTo,
    initiatedBy,
    initiatedStartDt,
    initiatedEndDt,
    issueStatus,
  } = searchData;

  useEffect(() => {
    if (!queried) {
      return;
    }

    setStatus('loading');

    axios
      .get(`/issues?team=${user.team}&${searchString}`)
      .then(({ data }) => {
        setTotalPages(Math.ceil(data.count / limit));
        return axios.get(
          `/issues?team=${user.team}&${searchString}&limit=${limit}`
        );
      })
      .then(({ data }) => {
        setIssues(data.data);
        setPagination({ ...data.pagination });
        setPage(1);
        setStatus('success');
      })
      .catch((error) => {
        setError(error);
        setStatus('error');
      });
  }, [queried, user.team, searchString, limit]);

  useEffect(() => {
    if (!queried) {
      return;
    }

    setStatus('loading');

    axios
      .get(
        `/issues?team=${user.team}&${searchString}&page=${page}&limit=${limit}`
      )
      .then(({ data }) => {
        setIssues(data.data);
        setPagination({ ...data.pagination });
        setPage(page);
        setStatus('success');
      })
      .catch((error) => {
        setError(error);
        setStatus('error');
      });
  }, [page, limit]);

  const searchUrl = () => {
    let string = '';

    if (initiatedBy) {
      string += `name=${initiatedBy}`;
    }

    if (assignedTo) {
      string += `&assignedTo=${assignedTo}`;
    }

    if (issueStatus) {
      string += `&status=${issueStatus}`;
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

    return string;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setQueried('true');
    setSearchString(searchUrl());
  };

  const onChange = (e) =>
    setSearchData({ ...searchData, [e.target.name]: e.target.value });

  const onChangeDateInitStart = (date) =>
    setSearchData({ ...searchData, initiatedStartDt: date });

  const onChangeDateInitEnd = (date) =>
    setSearchData({ ...searchData, initiatedEndDt: date });

  const searchResultsList = () =>
    issues.map((issue) => <Issue issue={issue} key={issue._id} />);

  return (
    <div className="container mt-3">
      <SearchForm
        onSubmit={onSubmit}
        onChange={onChange}
        initiatedStartDt={initiatedStartDt}
        onChangeDateInitStart={onChangeDateInitStart}
        initiatedEndDt={initiatedEndDt}
        onChangeDateInitEnd={onChangeDateInitEnd}
      />
      <SearchResults
        queried={queried}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        issues={issues}
        searchResultsList={searchResultsList}
        pagination={pagination}
        pageNumbers={renderPageNumbers(totalPages, page, setPage)}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        error={error}
      />
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
