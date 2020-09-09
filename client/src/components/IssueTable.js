import React, { useState } from 'react';
import PropTypes from 'prop-types';

const IssueTable = ({ list, displayIssuesFunc }) => {
  const [sortColumn, setSortColumn] = useState(false);

  const sortNumber = (list) => {
    list.sort((a, b) =>
      sortColumn ? b.number - a.number : a.number - b.number
    );

    setSortColumn(!sortColumn);
  };

  const sortDate = (list) => sortNumber(list);

  const sortWord = (list, e) => {
    let name = e.target.getAttribute('name');

    list.sort((a, b) => {
      const wordA = a[name].toLowerCase();
      const wordB = b[name].toLowerCase();
      if (sortColumn) return wordA < wordB ? -1 : wordA > wordB ? 1 : 0;
      else return wordB < wordA ? -1 : wordB > wordA ? 1 : 0;
    });

    setSortColumn(!sortColumn);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="light-bg">
          <tr>
            <th>
              Issue #{' '}
              <i
                onClick={() => sortNumber(list)}
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
