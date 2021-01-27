import React from 'react';
import IssueTable from './IssueTable';

interface ClosedIssuesProps {
  closed: {}[],
  completedIssuesList: () => JSX.Element[]
}

const ClosedIssues = ({ completedIssuesList, closed } : ClosedIssuesProps) => (
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



export default ClosedIssues;
