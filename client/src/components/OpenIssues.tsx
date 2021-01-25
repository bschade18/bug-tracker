import React, { Fragment } from 'react';
import IssueTable from './IssueTable';


interface Issue {
  createdAt: string, 
  number: number, 
  status: string, 
  issueTitle: string, 
  projectTitle: string, 
  _id: string
} 

interface openIssuesProps {
  issues: Issue[],
  issuesList: () => JSX.Element[]
}

const OpenIssues : React.FC<openIssuesProps> = ({ issuesList, issues }) => {
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


export default OpenIssues;
