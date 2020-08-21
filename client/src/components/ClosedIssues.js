import React from 'react';
import PropTypes from 'prop-types';

const ClosedIssues = ({
  completedIssuesList,
  sortNumber,
  sortWord,
  sortDate,
  closed,
}) => {
  return (
    <div>
      <h5 className="mt-5">Recently Closed Issues</h5>
      {completedIssuesList().length === 0 ? (
        <p className="issues-message">
          <em>No closed issues</em>
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table mt-3">
            <thead className="light-bg">
              <tr>
                <th>
                  Issue #{' '}
                  <i
                    onClick={() => sortNumber(closed)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Status{' '}
                  <i
                    name="status"
                    onClick={(e) => sortWord(closed, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Title{' '}
                  <i
                    name="issueTitle"
                    onClick={(e) => sortWord(closed, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Assigned To{' '}
                  <i
                    name="assignedTo"
                    onClick={(e) => sortWord(closed, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Date Initiated{' '}
                  <i
                    onClick={() => sortDate(closed)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>Open Issue</th>
              </tr>
            </thead>
            <tbody>{completedIssuesList()}</tbody>
          </table>
        </div>
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
