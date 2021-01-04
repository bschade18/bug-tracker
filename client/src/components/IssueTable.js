import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sortNumber, sortDate, sortWord } from '../utils/sort';

const IssueTable = ({ list, displayIssuesFunc }) => {
  const [sortColumn, setSortColumn] = useState(false);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="light-bg">
          <tr>
            <th>
              Issue #{' '}
              <i
                onClick={() => sortNumber(list, sortColumn, setSortColumn)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Status{' '}
              <i
                name="status"
                onClick={(e) => sortWord(list, sortColumn, setSortColumn, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Title{' '}
              <i
                name="issueTitle"
                onClick={(e) => sortWord(list, sortColumn, setSortColumn, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Assigned To{' '}
              <i
                name="assignedTo"
                onClick={(e) => sortWord(list, sortColumn, setSortColumn, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Date Initiated{' '}
              <i
                onClick={() => sortDate(list, sortColumn, setSortColumn)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>Open Issue</th>
          </tr>
        </thead>
        <tbody>{displayIssuesFunc()}</tbody>
      </table>
    </div>
  );
};

IssueTable.propTypes = {
  list: PropTypes.array.isRequired,
  displayIssuesFunc: PropTypes.func.isRequired,
};

export default IssueTable;
