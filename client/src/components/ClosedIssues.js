import React from 'react';
import PropTypes from 'prop-types';
import IssueTable from './IssueTable';

const ClosedIssues = ({
  completedIssuesList,
  sortNumber,
  sortWord,
  sortDate,
  closed,
}) => {
  return (
    <div>
      <h5 className="mt-5 lg-heading">Recently Closed Issues</h5>
      {completedIssuesList().length === 0 ? (
        <p className="issues-message">
          <em>No closed issues</em>
        </p>
      ) : (
        <IssueTable
          list={closed}
          displayIssuesFunc={completedIssuesList}
          sortNumber={sortNumber}
          sortWord={sortWord}
          sortDate={sortDate}
        />
      )}
    </div>
  );
};

ClosedIssues.propTypes = {
  completedIssuesList: PropTypes.func.isRequired,
  sortNumber: PropTypes.func.isRequired,
  sortWord: PropTypes.func.isRequired,
  sortDate: PropTypes.func.isRequired,
  closed: PropTypes.array.isRequired,
};

export default ClosedIssues;
