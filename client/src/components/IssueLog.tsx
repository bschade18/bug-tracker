import React, { useState } from 'react';
import { sortDate } from '../utils/sort';
import PropTypes from 'prop-types';

interface IssueLogProps {
logList: () => JSX.Element,
issueLog: {}[]
}

const IssueLog = ({ logList, issueLog } : IssueLogProps) => {
  const [sortColumn, setSortColumn] = useState(false);
  return (
    <>
      <h5 className="mt-3">Issue History</h5>
      <table className="IssueLog table">
        <thead className="light-bg">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>
              Date
              <i
                onClick={() =>
                  sortDate(issueLog, 'date', sortColumn, setSortColumn)
                }
                className="fa fa-fw fa-sort"
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>{logList()}</tbody>
      </table>
    </>
  );
};

IssueLog.propTypes = {
  LogList: PropTypes.func.isRequired,
  issueLog: PropTypes.array.isRequired,
};

export default IssueLog;
