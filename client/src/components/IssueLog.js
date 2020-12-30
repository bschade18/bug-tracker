import React from 'react';
import PropTypes from 'prop-types';

const IssueLog = ({ LogList }) => {
  return (
    <>
      <h5 className="mt-3">Issue History</h5>
      <table className="IssueLog table">
        <thead className="light-bg">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{LogList()}</tbody>
      </table>
    </>
  );
};

IssueLog.propTypes = {
  LogList: PropTypes.func.isRequired,
};

export default IssueLog;
