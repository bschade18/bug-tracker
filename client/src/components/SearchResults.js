import React, { Fragment } from 'react';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import IssueTable from './IssueTable';

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
};

export default SearchResults;
