import React from 'react';
import PropTypes from 'prop-types';

const IssueLog = ({ LogList }) => {
  return (
    <table className="table">
      <thead className="light-bg">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{LogList()}</tbody>
    </table>
  );
};

IssueLog.propTypes = {
  LogList: PropTypes.func.isRequired,
};

export default IssueLog;
