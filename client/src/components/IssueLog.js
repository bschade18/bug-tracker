import React from 'react';

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

export default IssueLog;
