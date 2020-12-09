import React, { Fragment } from 'react';
import IssueTable from './IssueTable';
import PropTypes from 'prop-types';

const OpenIssues = ({ issuesList, issues }) => {
  return (
    <Fragment>
      {issuesList().length ? (
        <IssueTable list={issues} displayIssuesFunc={issuesList} />
      ) : (
        <p className="issues-message mt-4">
          <em>There are no issues assigned to you</em>
        </p>
      )}
    </Fragment>
  );
};

OpenIssues.propTypes = {
  issuesList: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
};

export default OpenIssues;
