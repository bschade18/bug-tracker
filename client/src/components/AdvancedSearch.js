import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import Issue from './Issue';
import SearchResults from './SearchResults';
import { renderPageNumbers } from '../utils/setPages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdvancedSearch = ({ user }) => {
  const [searchData, setSearchData] = useState({
    assignedTo: '',
    initiatedBy: '',
    initiatedStartDt: null,
    initiatedEndDt: null,
    status: '',
  });
  const [issues, setIssues] = useState([]);
  const [wasSearched, setWasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
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
      .get(`/issues?team=${user.team}&${string}`)
      .then((res) => {
        setTotalPages(Math.ceil(res.data.count / limit));
        return axios.get(`/issues?team=${user.team}&${string}&limit=${limit}`);
      })
      .then((res) => {
        setIssues(res.data.data);
        setWasSearched(true);
        setPagination({ ...res.data.pagination });
        setPage(1);
        setSearchString(string);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const onChange = (e) =>
    setSearchData({ ...searchData, [e.target.name]: e.target.value });

  const onChangeDateInitStart = (date) =>
    setSearchData({ ...searchData, initiatedStartDt: date });

  const onChangeDateInitEnd = (date) =>
    setSearchData({ ...searchData, initiatedEndDt: date });

  const searchResultsList = () =>
    issues.map((issue) => {
      return <Issue issue={issue} key={issue._id} />;
    });

  const selectPage = (page) => {
    let string = searchString;

    if (page === 'next') {
      page = pagination.next.page;
    } else if (page === 'prev') {
      page = pagination.prev.page;
    }
    axios
      .get(`/issues?team=${user.team}&${string}&page=${page}&limit=20`)
      .then((res) => {
        setIssues(res.data.data);
        setPagination({ ...res.data.pagination });
        setPage(page);
      })
      .catch((error) => console.log(error));
  };

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
        wasSearched={wasSearched}
        loading={loading}
        issues={issues}
        searchResultsList={searchResultsList}
        pagination={pagination}
        selectPage={selectPage}
        pageNumbers={renderPageNumbers(totalPages, page, selectPage)}
        totalPages={totalPages}
        page={page}
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
