import React, { Fragment } from 'react';
import Spinner from './layout/Spinner';
import IssueTable from './IssueTable';
import Pagination from './Pagination';

interface SearchResultsProps {
  queried: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  issues: {}[];
  searchResultsList: () => JSX.Element[];
  pagination: {};
  page: number;
  totalPages: number;
  pageNumbers: number[];
  setPage: (page: number) => void;
  error: { message: string };
}

const SearchResults = ({
  queried,
  isLoading,
  isSuccess,
  isError,
  issues,
  searchResultsList,
  pagination,
  page,
  totalPages,
  pageNumbers,
  setPage,
  error,
}: SearchResultsProps) => (
  <Fragment>
    {queried &&
      (isLoading ? (
        <Spinner />
      ) : isError ? (
        <div className="error">
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : isSuccess && issues.length ? (
        <Fragment>
          <IssueTable list={issues} displayIssuesFunc={searchResultsList} />
          <Pagination
            pagination={pagination}
            pageNumbers={pageNumbers}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            component="AdvancedSearch"
          />
        </Fragment>
      ) : (
        <p>No issues found. Try another search</p>
      ))}
  </Fragment>
);

export default SearchResults;
