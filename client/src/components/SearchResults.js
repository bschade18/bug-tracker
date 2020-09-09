import React, { Fragment } from 'react';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import IssueTable from './IssueTable';
import Pagination from './Pagination';

const SearchResults = ({
  wasSearched,
  loading,
  issues,
  searchResultsList,
  pagination,
  page,
  totalPages,
  selectPage,
  pageNumbers,
  sortDate,
  sortNumber,
  sortWord,
}) => (
  <Fragment>
    {wasSearched &&
      (loading ? (
        <Spinner />
      ) : !issues[0] ? (
        <h3>No issues were found in search</h3>
      ) : (
        <Fragment>
          <IssueTable
            list={issues}
            displayIssuesFunc={searchResultsList}
            sortNumber={sortNumber}
            sortWord={sortWord}
            sortDate={sortDate}
          />
          <Pagination
            pagination={pagination}
            selectPage={selectPage}
            pageNumbers={pageNumbers}
            page={page}
            totalPages={totalPages}
            component="AdvancedSearch"
          />
        </Fragment>
      ))}
  </Fragment>
);

SearchResults.propTypes = {
  wasSearched: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  issues: PropTypes.array.isRequired,
  searchResultsList: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  selectPage: PropTypes.func.isRequired,
  pageNumbers: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  sortDate: PropTypes.func,
  sortNumber: PropTypes.func,
  sotWord: PropTypes.func,
};

export default SearchResults;
