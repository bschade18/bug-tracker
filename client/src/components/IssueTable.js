import React from 'react';

const IssueTable = ({
  list,
  displayIssuesFunc,
  sortNumber,
  sortWord,
  sortDate,
}) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="light-bg">
          <tr>
            <th>
              Issue #{' '}
              <i
                onClick={(e) => sortNumber(list, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Status{' '}
              <i
                name="status"
                onClick={(e) => sortWord(list, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Title{' '}
              <i
                name="issueTitle"
                onClick={(e) => sortWord(list, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Assigned To{' '}
              <i
                name="assignedTo"
                onClick={(e) => sortWord(list, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Date Initiated{' '}
              <i
                onClick={() => sortDate(list)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>Open Issue</th>
          </tr>
        </thead>
        {/* <tbody>{issuesList()}</tbody> */}
        <tbody>{displayIssuesFunc()}</tbody>
      </table>
    </div>
  );
};

export default IssueTable;
