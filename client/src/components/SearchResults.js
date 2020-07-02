import React, { Fragment } from 'react';
import Spinner from './layout/Spinner';

const SearchResults = ({
  wasSearched,
  loading,
  issues,
  searchResultsList,
  pagination,
  page,
  totalPages,
  selectPage,
  rows,
}) => (
  <Fragment>
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
  </Fragment>
);

export default SearchResults;
