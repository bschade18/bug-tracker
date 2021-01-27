import React, { Fragment } from 'react';
import Spinner from './layout/Spinner';
import IssueTable from './IssueTable';
import Pagination from './Pagination';

interface SearchResultsProps {
  wasSearched: boolean,
  loading: boolean,
  issues: {}[],
  searchResultsList: () => JSX.Element[],
  pagination: {},
  page: number,
  totalPages: number,
  selectPage: (page: string) => void,
  pageNumbers: number[]
}

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
}: SearchResultsProps) => (
  <Fragment>
    {wasSearched &&
      (loading ? (
        <Spinner />
      ) : !issues[0] ? (
        <h3>No issues were found in search</h3>
      ) : (
        <Fragment>
          <IssueTable list={issues} displayIssuesFunc={searchResultsList} />
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


export default SearchResults;
