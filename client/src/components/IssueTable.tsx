import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sortNumber, sortDate, sortWord } from '../utils/sort';

interface IssueTableProps {
  list: {}[],
  displayIssuesFunc: () => JSX.Element[]
}

const IssueTable = ({ list, displayIssuesFunc }: IssueTableProps) => {
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
              // @ts-ignore
                name="status"
                onClick={(e) => sortWord(list, sortColumn, setSortColumn, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Title{' '}
              <i
              // @ts-ignore
                name="issueTitle"
                onClick={(e) => sortWord(list, sortColumn, setSortColumn, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Project{' '}
              <i
              // @ts-ignore
                name="projectTitle"
                onClick={(e) => sortWord(list, sortColumn, setSortColumn, e)}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Date Initiated{' '}
              <i
                onClick={() =>
                  sortDate(list, 'createdAt', sortColumn, setSortColumn)
                }
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
