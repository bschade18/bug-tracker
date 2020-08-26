import React from 'react';
import PropTypes from 'prop-types';
import IssueTable from './IssueTable';

const ClosedIssues = ({ completedIssuesList, closed }) => {
  return (
    <div className="ClosedIssues">
      <h5 className="mt-5 lg-heading">Recently Closed Issues</h5>
      {completedIssuesList().length === 0 ? (
        <p className="issues-message mt-4">
          <em>There are no closed issues to display</em>
        </p>
      ) : (
        <IssueTable list={closed} displayIssuesFunc={completedIssuesList} />
      )}
    </div>
  );
};

ClosedIssues.propTypes = {
  completedIssuesList: PropTypes.func.isRequired,
  closed: PropTypes.array.isRequired,
};

export default ClosedIssues;
